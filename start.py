#!/usr/bin/env python3
"""Start the local, loopback-only web app and answer storage API."""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import tempfile
import unicodedata
import webbrowser
from email import policy
from email.parser import BytesParser
from datetime import datetime, timezone
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import RLock
from typing import Any
from urllib.parse import parse_qs, unquote, urlsplit


ROOT = Path(__file__).resolve().parent
WEB_ROOT = ROOT / "web" / "dist"
SUBMISSIONS_ROOT = ROOT / "提交资料"
QUESTIONS_PATH = ROOT / "content" / "questions.json"
HOST = "127.0.0.1"
PORT = 8765
MINIMUM_PYTHON = (3, 10)
MAX_JSON_BYTES = 1024 * 1024
MAX_UPLOAD_BYTES = 50 * 1024 * 1024
MAX_MULTIPART_OVERHEAD = 256 * 1024
STORAGE_LOCK = RLock()

QUESTION_DIRECTORIES = {
    "Q01": "Q01_AI核心概念",
    "Q02": "Q02_AI发展与工程方法",
    "Q03": "Q03_Agent安装配置",
    "Q04": "Q04_CLI命令",
    "Q05": "Q05_Skill与MCP",
    "Q06": "Q06_GitHub与SSH",
    "Q07": "Q07_Git提交树与分支",
    "Q08": "Q08_安全与版本习惯",
    "Q09": "Q09_Vibecoding实战",
    "Q10": "Q10_作品复盘",
}


class RequestProblem(Exception):
    def __init__(self, status: int, message: str):
        super().__init__(message)
        self.status = status
        self.message = message


def load_questions() -> dict[str, dict[str, Any]]:
    with QUESTIONS_PATH.open("r", encoding="utf-8") as source:
        data = json.load(source)
    return {question["id"]: question for question in data["questions"]}


QUESTIONS = load_questions()


def validate_component(value: Any, label: str) -> str:
    if not isinstance(value, str):
        raise RequestProblem(400, f"请填写{label}。")
    normalized = unicodedata.normalize("NFC", value).strip()
    if not normalized:
        raise RequestProblem(400, f"请填写{label}。")
    if len(normalized) > 48:
        raise RequestProblem(400, f"{label}最多 48 个字符。")
    if normalized in {".", ".."} or not all(
        char.isalnum() or char in " _-()·" for char in normalized
    ):
        raise RequestProblem(400, f"{label}含有不支持的字符，请移除斜线、冒号和控制字符。")
    return normalized


def resolve_student_directory(
    name: Any,
    student_id: Any,
    submissions_root: Path = SUBMISSIONS_ROOT,
) -> tuple[str, Path, str, str]:
    safe_name = validate_component(name, "姓名")
    safe_student_id = validate_component(student_id, "学号")
    root = submissions_root.resolve()
    directory_name = f"{safe_name}_{safe_student_id}"
    candidate = root / directory_name
    student_dir = candidate.resolve()
    if student_dir != candidate or student_dir.parent != root:
        raise RequestProblem(400, "学生资料目录无效，请检查姓名和学号。")
    return safe_name, student_dir, directory_name, safe_student_id


def ensure_student_directory(
    name: str, student_id: str, student_dir: Path, submissions_root: Path
) -> None:
    legacy = submissions_root.resolve() / f"{student_id}_{name}"
    if legacy == student_dir:
        student_dir.mkdir(parents=True, exist_ok=True)
        return
    if legacy.exists() and student_dir.exists():
        raise RequestProblem(
            409,
            "检测到旧命名和新命名的答题目录同时存在。为避免覆盖资料，请先备份并手动合并后再继续。",
        )
    if legacy.exists():
        try:
            legacy.rename(student_dir)
        except OSError as error:
            raise RequestProblem(500, "无法迁移旧答题目录，请检查文件权限和磁盘空间。") from error
        for question_id in QUESTION_DIRECTORIES:
            question_dir = question_directory(student_dir, question_id)
            old_attachments = question_dir / "附件"
            if not old_attachments.is_dir():
                continue
            for old_file in sorted(old_attachments.iterdir(), key=lambda item: item.name.casefold()):
                if old_file.is_file() and old_file.resolve().parent == old_attachments.resolve():
                    filename, should_write = unique_attachment_name(
                        question_dir, validate_attachment_name(old_file.name), old_file.read_bytes()
                    )
                    destination = question_dir / filename
                    if should_write:
                        old_file.rename(destination)
                    else:
                        old_file.unlink()
            old_attachments.rmdir()
        for question_id in QUESTION_DIRECTORIES:
            fields = read_existing_answers(student_dir).get(question_id)
            if fields is not None:
                write_answer_files(student_dir, question_id, fields)
        old_profile = student_dir / "学生信息.md"
        if old_profile.is_file():
            old_profile.unlink()
    else:
        student_dir.mkdir(parents=True, exist_ok=True)


def atomic_write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp_name: str | None = None
    try:
        with tempfile.NamedTemporaryFile(
            "w", encoding="utf-8", newline="\n", dir=path.parent, delete=False
        ) as target:
            temp_name = target.name
            target.write(content)
            target.flush()
            os.fsync(target.fileno())
        os.replace(temp_name, path)
    finally:
        if temp_name and os.path.exists(temp_name):
            os.unlink(temp_name)


def atomic_write_bytes(path: Path, content: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp_name: str | None = None
    try:
        with tempfile.NamedTemporaryFile("wb", dir=path.parent, delete=False) as target:
            temp_name = target.name
            target.write(content)
            target.flush()
            os.fsync(target.fileno())
        os.replace(temp_name, path)
    finally:
        if temp_name and os.path.exists(temp_name):
            os.unlink(temp_name)


def profile_text(name: str, student_id: str) -> str:
    return (
        f"姓名：{name}\n"
        f"学号：{student_id}\n"
    )


def list_existing_profiles(submissions_root: Path) -> list[dict[str, str]]:
    """List safe, self-consistent student folders without creating or migrating files."""
    root = submissions_root.resolve()
    try:
        children = sorted(root.iterdir(), key=lambda item: item.name.casefold())
    except FileNotFoundError:
        return []
    profiles: list[dict[str, str]] = []
    for directory in children:
        if directory.is_symlink() or not directory.is_dir():
            continue
        resolved = directory.resolve()
        if resolved.parent != root:
            continue
        info_file = directory / "学生信息.txt"
        if info_file.is_symlink() or not info_file.is_file() or info_file.resolve().parent != resolved:
            continue
        try:
            fields: dict[str, str] = {}
            for line in info_file.read_text(encoding="utf-8").splitlines():
                key, separator, value = line.partition("：")
                if separator and key in {"姓名", "学号"}:
                    fields[key] = value
            name = validate_component(fields.get("姓名"), "姓名")
            student_id = validate_component(fields.get("学号"), "学号")
        except (OSError, UnicodeError, RequestProblem):
            continue
        directory_name = f"{name}_{student_id}"
        if directory.name != directory_name:
            continue
        profiles.append({
            "name": name,
            "studentId": student_id,
            "directoryName": directory_name,
        })
    return profiles


def read_existing_answers(student_dir: Path) -> dict[str, dict[str, str]]:
    answers: dict[str, dict[str, str]] = {}
    for question_id, directory in QUESTION_DIRECTORIES.items():
        answer_path = student_dir / directory / "回答.json"
        if not answer_path.resolve().is_relative_to(student_dir.resolve()):
            continue
        try:
            payload = json.loads(answer_path.read_text(encoding="utf-8"))
        except (FileNotFoundError, json.JSONDecodeError, OSError):
            payload = {}
        if isinstance(payload, dict) and payload.get("questionId") == question_id and isinstance(payload.get("fields"), dict):
            fields = payload["fields"]
            answers[question_id] = {
                key: value for key, value in fields.items() if isinstance(value, str)
            }
            continue
        text_path = student_dir / directory / "回答.txt"
        if text_path.is_file():
            answers[question_id] = {"answer": text_path.read_text(encoding="utf-8")}
        question = QUESTIONS[question_id]
        for field in question.get("fields", []):
            filename = field_filename(field["id"], field["label"])
            field_path = student_dir / directory / filename
            if field_path.is_file():
                answers.setdefault(question_id, {})[field["id"]] = field_path.read_text(encoding="utf-8")
    return answers


def read_existing_attachments(student_dir: Path) -> dict[str, list[dict[str, Any]]]:
    attachments: dict[str, list[dict[str, Any]]] = {}
    for question_id in QUESTION_DIRECTORIES:
        items = list_attachments(student_dir, question_id)
        if items:
            attachments[question_id] = items
    return attachments


def validate_answer_fields(question_id: str, fields: Any) -> dict[str, str]:
    if not isinstance(fields, dict):
        raise RequestProblem(400, "答案内容格式不正确。")
    question = QUESTIONS[question_id]
    allowed = {"answer", *(field["id"] for field in question.get("fields", []))}
    result: dict[str, str] = {}
    total = 0
    for key, value in fields.items():
        if key not in allowed:
            continue
        if not isinstance(value, str):
            raise RequestProblem(400, "答案内容格式不正确。")
        total += len(value.encode("utf-8"))
        if total > 512 * 1024:
            raise RequestProblem(413, "单题文字答案过长，请精简内容或将资料作为附件。")
        result[key] = value
    for key in allowed:
        result.setdefault(key, "")
    return result


def answer_markdown(
    question: dict[str, Any], fields: dict[str, str], attachment_names: list[str] | None = None
) -> str:
    field_labels = {
        field["id"]: field["label"] for field in question.get("fields", [])
    }
    field_labels["answer"] = question["answerLabel"]
    parts = [f"# {question['id']} {question['title']}", ""]
    for key, label in field_labels.items():
        value = fields.get(key, "").strip()
        parts.extend([f"## {label}", "", value or "（未填写）", ""])
    if attachment_names:
        parts.extend(["## 附件", ""])
        parts.extend(f"- {name}" for name in attachment_names)
        parts.append("")
    return "\n".join(parts).rstrip() + "\n"


def question_directory(student_dir: Path, question_id: str, create: bool = False) -> Path:
    if question_id not in QUESTION_DIRECTORIES:
        raise RequestProblem(404, "没有找到这道题。")
    root = student_dir.resolve()
    candidate = root / QUESTION_DIRECTORIES[question_id]
    resolved = candidate.resolve()
    if resolved != candidate or resolved.parent != root:
        raise RequestProblem(400, "题目资料目录无效，已阻止访问。")
    if create:
        candidate.mkdir(parents=True, exist_ok=True)
    return candidate


def attachment_directory(student_dir: Path, question_id: str, create: bool = False) -> Path:
    return question_directory(student_dir, question_id, create=create)


def field_filename(field_id: str, label: str) -> str:
    if field_id == "repository":
        return "GitHub仓库链接.txt"
    safe_label = "".join(char for char in label if char.isalnum() or char in " _-()·")
    return f"{safe_label or field_id}.txt"


def list_attachments(student_dir: Path, question_id: str) -> list[dict[str, Any]]:
    try:
        directory = attachment_directory(student_dir, question_id)
    except (FileNotFoundError, OSError):
        return []
    if not directory.is_dir():
        return []
    items: list[dict[str, Any]] = []
    generated = {"回答.txt", "回答.md", "回答.json"}
    generated.update(
        field_filename(field["id"], field["label"])
        for field in QUESTIONS[question_id].get("fields", [])
    )
    for path in sorted(directory.iterdir(), key=lambda item: item.name.casefold()):
        try:
            if path.name not in generated and path.is_file() and path.resolve().parent == directory.resolve():
                items.append({"name": path.name, "size": path.stat().st_size})
        except OSError:
            continue
    return items


def list_direct_files(directory: Path) -> list[dict[str, Any]]:
    if not directory.is_dir():
        return []
    items: list[dict[str, Any]] = []
    for path in sorted(directory.iterdir(), key=lambda item: item.name.casefold()):
        try:
            if path.is_file() and path.resolve().parent == directory.resolve():
                items.append({"name": path.name, "size": path.stat().st_size})
        except OSError:
            continue
    return items


def build_file_tree(student_dir: Path, directory_name: str) -> dict[str, Any]:
    root = student_dir.resolve()
    questions = []
    for question_id, directory_name_for_question in QUESTION_DIRECTORIES.items():
        directory = question_directory(root, question_id)
        questions.append(
            {
                "id": question_id,
                "directoryName": directory_name_for_question,
                "files": list_direct_files(directory),
            }
        )
    return {
        "directoryName": directory_name,
        "rootFiles": list_direct_files(root),
        "questions": questions,
    }


def read_answer_fields(student_dir: Path, question_id: str) -> dict[str, str]:
    answer_path = question_directory(student_dir, question_id) / "回答.json"
    try:
        payload = json.loads(answer_path.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError, OSError):
        payload = {}
    fields = payload.get("fields", {}) if isinstance(payload, dict) else {}
    try:
        return validate_answer_fields(question_id, fields)
    except RequestProblem:
        return validate_answer_fields(question_id, {})


def write_answer_files(student_dir: Path, question_id: str, fields: dict[str, str]) -> str:
    question_dir = question_directory(student_dir, question_id, create=True)
    if question_dir.resolve().parent != student_dir.resolve():
        raise RequestProblem(400, "题目资料目录无效，已阻止写入。")
    saved_at = datetime.now(timezone.utc).isoformat(timespec="seconds")
    question = QUESTIONS[question_id]
    answer_path = question_dir / "回答.txt"
    if fields.get("answer", "").strip():
        atomic_write_text(answer_path, fields["answer"])
    elif answer_path.exists():
        answer_path.unlink()
    for field in question.get("fields", []):
        path = question_dir / field_filename(field["id"], field["label"])
        value = fields.get(field["id"], "").strip()
        if value:
            atomic_write_text(path, value)
        elif path.exists():
            path.unlink()
    for obsolete_name in ("回答.md", "回答.json"):
        obsolete = question_dir / obsolete_name
        if obsolete.is_file():
            obsolete.unlink()
    return saved_at


def validate_attachment_name(value: Any) -> str:
    if not isinstance(value, str):
        raise RequestProblem(400, "附件文件名无效。")
    name = unicodedata.normalize("NFC", value).strip()
    if (
        not name
        or len(name) > 180
        or name in {".", ".."}
        or "/" in name
        or "\\" in name
        or any(unicodedata.category(char).startswith("C") for char in name)
        or not all(char.isalnum() or char in " ._()-·" for char in name)
    ):
        raise RequestProblem(400, "附件文件名含有不支持的字符，请重命名后重试。")
    return name


def unique_attachment_name(directory: Path, filename: str, content: bytes) -> tuple[str, bool]:
    original = Path(filename)
    stem, suffix = original.stem, original.suffix
    candidate = filename
    number = 2
    while (directory / candidate).exists():
        existing = directory / candidate
        if existing.is_file() and existing.resolve().parent == directory.resolve():
            try:
                if existing.read_bytes() == content:
                    return candidate, False
            except OSError:
                pass
        candidate = f"{stem} ({number}){suffix}"
        number += 1
        if number > 1000:
            raise RequestProblem(409, "同名附件过多，请修改文件名后重试。")
    return candidate, True


class LocalRequestHandler(SimpleHTTPRequestHandler):
    server_version = "DeepBlueLocalApp/1.0"

    def __init__(self, *args: Any, directory: str, submissions_root: Path, **kwargs: Any):
        self.submissions_root = submissions_root
        super().__init__(*args, directory=directory, **kwargs)

    def log_message(self, format: str, *args: Any) -> None:
        # Request bodies contain student information and answers; never log them.
        sys.stderr.write(f"{self.address_string()} - {format % args}\n")

    def send_json(self, status: int, payload: dict[str, Any]) -> None:
        encoded = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(encoded)

    def read_json(self) -> dict[str, Any]:
        content_type = self.headers.get_content_type()
        if content_type != "application/json":
            raise RequestProblem(415, "请求格式不正确，请刷新页面后重试。")
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError as error:
            raise RequestProblem(400, "请求数据长度无效。") from error
        if length <= 0:
            raise RequestProblem(400, "请求内容为空。")
        if length > MAX_JSON_BYTES:
            raise RequestProblem(413, "请求内容过大，请减少单次提交的文字。")
        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as error:
            raise RequestProblem(400, "请求内容无法读取，请检查后重试。") from error
        if not isinstance(payload, dict):
            raise RequestProblem(400, "请求内容格式不正确。")
        return payload

    def read_multipart(self) -> tuple[dict[str, str], str, bytes]:
        if self.headers.get_content_type() != "multipart/form-data":
            raise RequestProblem(415, "上传格式不正确，请重新选择附件。")
        boundary = self.headers.get_param("boundary")
        if not isinstance(boundary, str) or not re.fullmatch(r"[A-Za-z0-9'()+_,./:=?-]{1,70}", boundary):
            raise RequestProblem(400, "上传请求边界无效，请刷新页面后重试。")
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError as error:
            raise RequestProblem(400, "上传数据长度无效。") from error
        if length <= 0:
            raise RequestProblem(400, "请选择一个附件。")
        if length > MAX_UPLOAD_BYTES + MAX_MULTIPART_OVERHEAD:
            raise RequestProblem(413, "单个附件不能超过 50 MB。")
        body = self.rfile.read(length)
        mime = (
            f"Content-Type: multipart/form-data; boundary={boundary}\r\n"
            "MIME-Version: 1.0\r\n\r\n"
        ).encode("ascii") + body
        message = BytesParser(policy=policy.default).parsebytes(mime)
        if not message.is_multipart():
            raise RequestProblem(400, "上传内容无法读取，请重新选择附件。")
        fields: dict[str, str] = {}
        selected_file: tuple[str, bytes] | None = None
        for part in message.iter_parts():
            field_name = part.get_param("name", header="content-disposition")
            filename = part.get_filename()
            payload = part.get_payload(decode=True) or b""
            if field_name == "file" and filename is not None:
                if selected_file is not None:
                    raise RequestProblem(400, "一次只能上传一个附件，请重试。")
                selected_file = (filename, payload)
            elif field_name in {"name", "studentId"}:
                charset = part.get_content_charset() or "utf-8"
                try:
                    fields[field_name] = payload.decode(charset)
                except (LookupError, UnicodeDecodeError) as error:
                    raise RequestProblem(400, "学生信息无法读取，请重新填写。") from error
        if selected_file is None:
            raise RequestProblem(400, "请选择一个附件。")
        return fields, selected_file[0], selected_file[1]

    def do_GET(self) -> None:
        parsed = urlsplit(self.path)
        if parsed.path == "/api/health":
            self.send_json(200, {"ok": True, "storage": "local"})
            return
        if parsed.path == "/api/profiles":
            try:
                with STORAGE_LOCK:
                    profiles = list_existing_profiles(self.submissions_root)
                self.send_json(200, {"profiles": profiles})
            except OSError:
                self.send_json(500, {"error": "无法读取本机提交目录，请检查文件权限后重试。"})
            return
        if parsed.path == "/api/profile":
            query = parse_qs(parsed.query)
            try:
                self.handle_existing_profile({
                    "name": (query.get("name") or [""])[0],
                    "studentId": (query.get("studentId") or [""])[0],
                })
            except RequestProblem as problem:
                self.send_json(problem.status, {"error": problem.message})
            except OSError:
                self.send_json(500, {"error": "无法读取本机提交资料，请检查文件权限后重试。"})
            return
        if parsed.path == "/api/submission/files":
            query = parse_qs(parsed.query)
            try:
                self.handle_file_tree(
                    {"name": (query.get("name") or [""])[0], "studentId": (query.get("studentId") or [""])[0]}
                )
            except RequestProblem as problem:
                self.send_json(problem.status, {"error": problem.message})
            return
        if parsed.path.startswith("/api/"):
            self.send_json(404, {"error": "没有找到该本地功能。"})
            return
        super().do_GET()

    def do_POST(self) -> None:
        parsed = urlsplit(self.path)
        try:
            if parsed.path.startswith("/api/attachments/"):
                self.handle_upload(parsed.path)
                return
            payload = self.read_json()
            if parsed.path == "/api/profile":
                self.handle_profile(payload)
            elif parsed.path == "/api/submission/open":
                self.handle_open_submission_directory(payload)
            elif parsed.path.startswith("/api/answers/"):
                self.handle_answer(parsed.path, payload)
            else:
                self.send_json(404, {"error": "没有找到该本地功能。"})
        except RequestProblem as problem:
            self.send_json(problem.status, {"error": problem.message})
        except OSError:
            self.send_json(500, {"error": "无法写入本机提交目录，请检查磁盘空间和文件权限。"})

    def do_DELETE(self) -> None:
        parsed = urlsplit(self.path)
        try:
            if not (parsed.path.startswith("/api/attachments/") or parsed.path.startswith("/api/files/")):
                self.send_json(404, {"error": "没有找到该本地功能。"})
                return
            self.handle_file_delete(parsed.path, self.read_json())
        except RequestProblem as problem:
            self.send_json(problem.status, {"error": problem.message})
        except OSError:
            self.send_json(500, {"error": "无法修改本机附件，请检查磁盘空间和文件权限。"})

    def do_PUT(self) -> None:
        self.do_POST()

    def handle_profile(self, payload: dict[str, Any]) -> None:
        name, student_dir, directory_name, student_id = resolve_student_directory(
            payload.get("name"), payload.get("studentId"), self.submissions_root
        )
        with STORAGE_LOCK:
            ensure_student_directory(name, student_id, student_dir, self.submissions_root)
            atomic_write_text(student_dir / "学生信息.txt", profile_text(name, student_id))
            response = self.profile_response(name, student_id)
        self.send_json(200, response)

    def handle_existing_profile(self, payload: dict[str, Any]) -> None:
        name = validate_component(payload.get("name"), "姓名")
        student_id = validate_component(payload.get("studentId"), "学号")
        with STORAGE_LOCK:
            response = self.profile_response(name, student_id)
        self.send_json(200, response)

    def profile_response(self, name: str, student_id: str) -> dict[str, Any]:
        name, student_dir, directory_name, student_id = resolve_student_directory(
            name, student_id, self.submissions_root
        )
        profiles = list_existing_profiles(self.submissions_root)
        if not any(item["directoryName"] == directory_name for item in profiles):
            raise RequestProblem(404, "没有找到这份本机答题资料，请重新选择。")
        answers = read_existing_answers(student_dir)
        attachments = read_existing_attachments(student_dir)
        file_tree = build_file_tree(student_dir, directory_name)
        return {
            "profile": {"name": name, "studentId": student_id, "directoryName": directory_name},
            "answers": answers,
            "attachments": attachments,
            "fileTree": file_tree,
        }

    def handle_answer(self, path: str, payload: dict[str, Any]) -> None:
        question_id = unquote(path.rsplit("/", 1)[-1])
        if question_id not in QUESTION_DIRECTORIES or question_id not in QUESTIONS:
            raise RequestProblem(404, "没有找到这道题。")
        name, student_dir, _, student_id = resolve_student_directory(
            payload.get("name"), payload.get("studentId"), self.submissions_root
        )
        fields = validate_answer_fields(question_id, payload.get("fields"))
        with STORAGE_LOCK:
            ensure_student_directory(name, student_id, student_dir, self.submissions_root)
            saved_at = write_answer_files(student_dir, question_id, fields)
            atomic_write_text(student_dir / "学生信息.txt", profile_text(name, student_id))
        self.send_json(200, {"ok": True, "questionId": question_id, "savedAt": saved_at})

    def handle_upload(self, path: str) -> None:
        question_id = unquote(path.rsplit("/", 1)[-1])
        if question_id not in QUESTION_DIRECTORIES or question_id not in QUESTIONS:
            raise RequestProblem(404, "没有找到这道题。")
        fields, raw_filename, content = self.read_multipart()
        name, student_dir, _, student_id = resolve_student_directory(
            fields.get("name"), fields.get("studentId"), self.submissions_root
        )
        filename = validate_attachment_name(raw_filename)
        extension = Path(filename).suffix.lower()
        allowed = {suffix.lower() for suffix in QUESTIONS[question_id].get("allowedExtensions", [])}
        if extension not in allowed:
            raise RequestProblem(415, "本题不支持这种附件格式，请查看文件类型说明。")
        if len(content) > MAX_UPLOAD_BYTES:
            raise RequestProblem(413, "单个附件不能超过 50 MB。")
        with STORAGE_LOCK:
            ensure_student_directory(name, student_id, student_dir, self.submissions_root)
            directory = attachment_directory(student_dir, question_id, create=True)
            generated = {"回答.txt", "回答.md", "回答.json", "学生信息.txt"}
            generated.update(
                field_filename(field["id"], field["label"])
                for field in QUESTIONS[question_id].get("fields", [])
            )
            if filename in generated:
                raise RequestProblem(400, "附件文件名与系统答案文件重名，请先重命名附件。")
            stored_name, should_write = unique_attachment_name(directory, filename, content)
            if should_write:
                atomic_write_bytes(directory / stored_name, content)
            info = next(item for item in list_attachments(student_dir, question_id) if item["name"] == stored_name)
        self.send_json(200, {"ok": True, "questionId": question_id, "attachment": info})

    def handle_file_delete(self, path: str, payload: dict[str, Any]) -> None:
        question_id = unquote(path.rsplit("/", 1)[-1])
        if question_id not in QUESTION_DIRECTORIES or question_id not in QUESTIONS:
            raise RequestProblem(404, "没有找到这道题。")
        name, student_dir, _, student_id = resolve_student_directory(
            payload.get("name"), payload.get("studentId"), self.submissions_root
        )
        filename = validate_attachment_name(payload.get("filename"))
        with STORAGE_LOCK:
            ensure_student_directory(name, student_id, student_dir, self.submissions_root)
            directory = question_directory(student_dir, question_id)
            target = directory / filename
            if target.resolve().parent != directory.resolve() or not target.is_file():
                raise RequestProblem(404, "没有找到要删除的文件。")
            target.unlink()
        self.send_json(200, {"ok": True, "questionId": question_id, "filename": filename})

    def handle_file_tree(self, payload: dict[str, Any]) -> None:
        name, student_dir, directory_name, _ = resolve_student_directory(
            payload.get("name"), payload.get("studentId"), self.submissions_root
        )
        del name
        if not student_dir.is_dir():
            raise RequestProblem(404, "还没有本机答题目录，请先填写身份信息。")
        self.send_json(200, {"fileTree": build_file_tree(student_dir, directory_name)})

    def handle_open_submission_directory(self, payload: dict[str, Any]) -> None:
        name, student_dir, directory_name, student_id = resolve_student_directory(
            payload.get("name"), payload.get("studentId"), self.submissions_root
        )
        legacy_dir = self.submissions_root.resolve() / f"{student_id}_{name}"
        if not student_dir.is_dir() and not legacy_dir.is_dir():
            raise RequestProblem(404, "还没有本机答题目录，请先保存学生信息。")
        with STORAGE_LOCK:
            ensure_student_directory(name, student_id, student_dir, self.submissions_root)
        try:
            open_directory(student_dir)
        except OSError as error:
            raise RequestProblem(500, "无法打开本机提交目录，请检查系统文件管理器。") from error
        self.send_json(200, {"ok": True, "directoryName": directory_name})

    def send_error(self, code: int, message: str | None = None, explain: str | None = None) -> None:
        if urlsplit(self.path).path.startswith("/api/"):
            self.send_json(code, {"error": message or "本机服务无法完成请求。"})
            return
        super().send_error(code, message, explain)


def make_handler(static_root: Path, submissions_root: Path):
    return partial(
        LocalRequestHandler,
        directory=str(static_root),
        submissions_root=submissions_root,
    )


def open_directory(path: Path) -> None:
    if sys.platform == "darwin":
        subprocess.Popen(["open", str(path)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    elif os.name == "nt":
        os.startfile(str(path))  # type: ignore[attr-defined]
    else:
        subprocess.Popen(["xdg-open", str(path)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main() -> int:
    if sys.version_info < MINIMUM_PYTHON:
        print("需要 Python 3.10 或更高版本。请安装新版 Python 后重新启动。", file=sys.stderr)
        return 2

    if not (WEB_ROOT / "index.html").is_file():
        print("没有找到已构建的网页。请先在 frontend 目录运行 npm install 和 npm run build。", file=sys.stderr)
        return 2

    try:
        server = ThreadingHTTPServer(
            (HOST, PORT), make_handler(WEB_ROOT, SUBMISSIONS_ROOT)
        )
    except OSError as error:
        print(f"无法启动本地服务（{HOST}:{PORT}）：{error}", file=sys.stderr)
        print("请关闭占用 8765 端口的程序后重试。", file=sys.stderr)
        return 1

    print(f"本地答题 App 已启动：http://{HOST}:{PORT}")
    print("按 Ctrl+C 停止服务。答题数据只保存在本机。")
    try:
        if not webbrowser.open(f"http://{HOST}:{PORT}"):
            print("未能自动打开浏览器，请手动访问上方地址。")
    except Exception as error:
        print(f"未能自动打开浏览器（{error}），请手动访问上方地址。")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n正在停止本地服务…")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
