#!/usr/bin/env python3
"""Start the local, loopback-only web app and answer storage API."""

from __future__ import annotations

import json
import os
import re
import sys
import tempfile
import unicodedata
from datetime import datetime, timezone
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent
WEB_ROOT = ROOT / "web" / "dist"
SUBMISSIONS_ROOT = ROOT / "提交资料"
QUESTIONS_PATH = ROOT / "content" / "questions.json"
HOST = "127.0.0.1"
PORT = 8765
MINIMUM_PYTHON = (3, 10)
MAX_JSON_BYTES = 1024 * 1024

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
    directory_name = f"{safe_student_id}_{safe_name}"
    candidate = root / directory_name
    student_dir = candidate.resolve()
    if student_dir != candidate or student_dir.parent != root:
        raise RequestProblem(400, "学生资料目录无效，请检查姓名和学号。")
    return safe_name, student_dir, directory_name, safe_student_id


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


def profile_markdown(name: str, student_id: str) -> str:
    return (
        "# 学生信息\n\n"
        f"- 姓名：{name}\n"
        f"- 学号：{student_id}\n"
        "- 保存位置：本机提交资料目录\n"
    )


def read_existing_answers(student_dir: Path) -> dict[str, dict[str, str]]:
    answers: dict[str, dict[str, str]] = {}
    for question_id, directory in QUESTION_DIRECTORIES.items():
        answer_path = student_dir / directory / "回答.json"
        if not answer_path.resolve().is_relative_to(student_dir.resolve()):
            continue
        try:
            payload = json.loads(answer_path.read_text(encoding="utf-8"))
        except (FileNotFoundError, json.JSONDecodeError, OSError):
            continue
        if not isinstance(payload, dict):
            continue
        fields = payload.get("fields")
        if payload.get("questionId") == question_id and isinstance(fields, dict):
            answers[question_id] = {
                key: value for key, value in fields.items() if isinstance(value, str)
            }
    return answers


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


def answer_markdown(question: dict[str, Any], fields: dict[str, str]) -> str:
    field_labels = {
        field["id"]: field["label"] for field in question.get("fields", [])
    }
    field_labels["answer"] = question["answerLabel"]
    parts = [f"# {question['id']} {question['title']}", ""]
    for key, label in field_labels.items():
        value = fields.get(key, "").strip()
        parts.extend([f"## {label}", "", value or "（未填写）", ""])
    return "\n".join(parts).rstrip() + "\n"


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

    def do_GET(self) -> None:
        parsed = urlsplit(self.path)
        if parsed.path == "/api/health":
            self.send_json(200, {"ok": True, "storage": "local"})
            return
        if parsed.path.startswith("/api/"):
            self.send_json(404, {"error": "没有找到该本地功能。"})
            return
        super().do_GET()

    def do_POST(self) -> None:
        parsed = urlsplit(self.path)
        try:
            payload = self.read_json()
            if parsed.path == "/api/profile":
                self.handle_profile(payload)
            elif parsed.path.startswith("/api/answers/"):
                self.handle_answer(parsed.path, payload)
            else:
                self.send_json(404, {"error": "没有找到该本地功能。"})
        except RequestProblem as problem:
            self.send_json(problem.status, {"error": problem.message})
        except OSError:
            self.send_json(500, {"error": "无法写入本机提交目录，请检查磁盘空间和文件权限。"})

    def do_PUT(self) -> None:
        self.do_POST()

    def handle_profile(self, payload: dict[str, Any]) -> None:
        name, student_dir, directory_name, student_id = resolve_student_directory(
            payload.get("name"), payload.get("studentId"), self.submissions_root
        )
        student_dir.mkdir(parents=True, exist_ok=True)
        atomic_write_text(student_dir / "学生信息.md", profile_markdown(name, student_id))
        self.send_json(
            200,
            {
                "profile": {"name": name, "studentId": student_id, "directoryName": directory_name},
                "answers": read_existing_answers(student_dir),
            },
        )

    def handle_answer(self, path: str, payload: dict[str, Any]) -> None:
        question_id = unquote(path.rsplit("/", 1)[-1])
        if question_id not in QUESTION_DIRECTORIES or question_id not in QUESTIONS:
            raise RequestProblem(404, "没有找到这道题。")
        name, student_dir, _, student_id = resolve_student_directory(
            payload.get("name"), payload.get("studentId"), self.submissions_root
        )
        fields = validate_answer_fields(question_id, payload.get("fields"))
        question = QUESTIONS[question_id]
        question_dir = student_dir / QUESTION_DIRECTORIES[question_id]
        question_dir.mkdir(parents=True, exist_ok=True)
        if question_dir.resolve().parent != student_dir.resolve():
            raise RequestProblem(400, "题目资料目录无效，已阻止写入。")
        saved_at = datetime.now(timezone.utc).isoformat(timespec="seconds")
        answer_json = {
            "questionId": question_id,
            "title": question["title"],
            "fields": fields,
            "updatedAt": saved_at,
        }
        atomic_write_text(
            question_dir / "回答.json",
            json.dumps(answer_json, ensure_ascii=False, indent=2) + "\n",
        )
        atomic_write_text(question_dir / "回答.md", answer_markdown(question, fields))
        atomic_write_text(student_dir / "学生信息.md", profile_markdown(name, student_id))
        self.send_json(200, {"ok": True, "questionId": question_id, "savedAt": saved_at})

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
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n正在停止本地服务…")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
