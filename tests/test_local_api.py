import io
import json
import tempfile
import threading
import unittest
from contextlib import redirect_stderr, redirect_stdout
from unittest.mock import MagicMock, patch
from http.server import ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen

import start
from start import QUESTION_DIRECTORIES, make_handler


class LocalApiTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.temp_dir = tempfile.TemporaryDirectory()
        root = Path(cls.temp_dir.name)
        static_root = root / "web"
        static_root.mkdir()
        (static_root / "index.html").write_text("local app", encoding="utf-8")
        cls.static_root = static_root
        cls.submissions_root = root / "提交资料"
        server = ThreadingHTTPServer(
            ("127.0.0.1", 0), make_handler(static_root, cls.submissions_root)
        )
        cls.server = server
        cls.base_url = f"http://127.0.0.1:{server.server_port}"
        cls.thread = threading.Thread(target=server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls) -> None:
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join(timeout=2)
        cls.temp_dir.cleanup()

    def post_json(self, path: str, payload: dict) -> tuple[int, dict]:
        return self.json_request(path, payload, "POST")

    def get_json(self, path: str) -> tuple[int, dict]:
        try:
            with urlopen(self.base_url + path, timeout=3) as response:
                return response.status, json.loads(response.read().decode("utf-8"))
        except HTTPError as error:
            with error:
                return error.code, json.loads(error.read().decode("utf-8"))

    def json_request(self, path: str, payload: dict, method: str) -> tuple[int, dict]:
        request = Request(
            self.base_url + path,
            data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method=method,
        )
        try:
            with urlopen(request, timeout=3) as response:
                return response.status, json.loads(response.read().decode("utf-8"))
        except HTTPError as error:
            with error:
                return error.code, json.loads(error.read().decode("utf-8"))

    def post_file(self, path: str, profile: dict, filename: str, content: bytes) -> tuple[int, dict]:
        boundary = "DeepBlueBoundary42"
        fields = []
        for key in ("name", "studentId"):
            fields.append(
                f"--{boundary}\r\nContent-Disposition: form-data; name=\"{key}\"\r\n\r\n"
                f"{profile[key]}\r\n"
            )
        fields.append(
            f"--{boundary}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"{filename}\"\r\n"
            "Content-Type: application/octet-stream\r\n\r\n"
        )
        body = "".join(fields).encode("utf-8") + content + f"\r\n--{boundary}--\r\n".encode()
        request = Request(
            self.base_url + path,
            data=body,
            headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
            method="POST",
        )
        try:
            with urlopen(request, timeout=3) as response:
                return response.status, json.loads(response.read().decode("utf-8"))
        except HTTPError as error:
            with error:
                return error.code, json.loads(error.read().decode("utf-8"))

    def test_profile_txt_files_restore_and_path_rejection(self) -> None:
        profile_payload = {"name": "林同学", "studentId": "2026 001"}
        status, profile_response = self.post_json("/api/profile", profile_payload)
        self.assertEqual(status, 200)
        directory_name = "林同学_2026 001"
        student_dir = self.submissions_root / directory_name
        self.assertEqual(profile_response["profile"]["directoryName"], directory_name)
        self.assertTrue((student_dir / "学生信息.txt").is_file())
        self.assertFalse((student_dir / QUESTION_DIRECTORIES["Q01"]).exists())

        answer = "第一行：课程助理。\n第二行：使用本地资料。\n链接：https://example.org/project"
        status, saved = self.post_json(
            "/api/answers/Q01",
            {
                **profile_payload,
                "fields": {"answer": answer, "unrecognized": "must not be persisted"},
            },
        )
        self.assertEqual(status, 200)
        self.assertEqual(saved["questionId"], "Q01")
        question_dir = student_dir / QUESTION_DIRECTORIES["Q01"]
        self.assertEqual((question_dir / "回答.txt").read_text(encoding="utf-8"), answer)
        self.assertFalse((question_dir / "回答.md").exists())
        self.assertFalse((question_dir / "回答.json").exists())

        status, restored = self.post_json("/api/profile", profile_payload)
        self.assertEqual(status, 200)
        self.assertEqual(restored["answers"]["Q01"]["answer"], answer)
        status, uploaded = self.post_file(
            "/api/attachments/Q01", profile_payload, "概念图.png", b"\x89PNG\r\noriginal-image-bytes"
        )
        self.assertEqual(status, 200)
        self.assertEqual(uploaded["attachment"]["name"], "概念图.png")
        attachment_path = student_dir / QUESTION_DIRECTORIES["Q01"] / "概念图.png"
        self.assertEqual(attachment_path.read_bytes(), b"\x89PNG\r\noriginal-image-bytes")

        allowed_examples = [
            ("/api/attachments/Q01", "concept-notes.pdf", b"%PDF-1.7 fictional test bytes"),
            ("/api/attachments/Q03", "setup-proof.docx", b"PK fictional DOCX test bytes"),
            (
                "/api/attachments/Q10",
                "模拟课表.xlsx",
                (start.ROOT / "samples" / "模拟课表.xlsx").read_bytes(),
            ),
        ]
        for endpoint, filename, content in allowed_examples:
            with self.subTest(filename=filename):
                status, upload = self.post_file(endpoint, profile_payload, filename, content)
                self.assertEqual(status, 200)
                self.assertEqual(upload["attachment"]["name"], filename)
                saved_path = (
                    student_dir
                    / QUESTION_DIRECTORIES[endpoint.rsplit("/", 1)[-1]]
                    / filename
                )
                self.assertEqual(saved_path.read_bytes(), content)

        status, duplicate = self.post_file(
            "/api/attachments/Q01", profile_payload, "概念图.png", b"\x89PNG\r\noriginal-image-bytes"
        )
        self.assertEqual(status, 200)
        self.assertEqual(duplicate["attachment"]["name"], "概念图.png")

        status, project_zip = self.post_file(
            "/api/attachments/Q10", profile_payload, "source.zip", b"source archive bytes"
        )
        self.assertEqual(status, 200)
        self.assertEqual(project_zip["attachment"]["name"], "source.zip")
        self.assertEqual(
            (student_dir / QUESTION_DIRECTORIES["Q10"] / "source.zip").read_bytes(),
            b"source archive bytes",
        )
        project_answer = {
            **profile_payload,
            "fields": {"repository": "https://github.com/example/student-project"},
        }
        status, project_saved = self.post_json("/api/answers/Q10", project_answer)
        self.assertEqual(status, 200)
        self.assertEqual(project_saved["questionId"], "Q10")
        project_dir = student_dir / QUESTION_DIRECTORIES["Q10"]
        self.assertEqual(
            (project_dir / "GitHub仓库链接.txt").read_text(encoding="utf-8"),
            "https://github.com/example/student-project",
        )
        self.assertEqual((project_dir / "source.zip").read_bytes(), b"source archive bytes")

        replacement = "更新后的答案"
        status, _ = self.post_json(
            "/api/answers/Q01", {**profile_payload, "fields": {"answer": replacement}}
        )
        self.assertEqual(status, 200)
        self.assertEqual((question_dir / "回答.txt").read_text(encoding="utf-8"), replacement)

        status, tree_response = self.get_json(
            "/api/submission/files?" + urlencode(profile_payload)
        )
        self.assertEqual(status, 200)
        tree = tree_response["fileTree"]
        self.assertEqual(tree["directoryName"], directory_name)
        self.assertIn("学生信息.txt", [item["name"] for item in tree["rootFiles"]])
        q01 = next(item for item in tree["questions"] if item["id"] == "Q01")
        self.assertCountEqual(
            [item["name"] for item in q01["files"]],
            ["回答.txt", "概念图.png", "concept-notes.pdf"],
        )

        status, removed_answer = self.json_request(
            "/api/files/Q01", {**profile_payload, "filename": "回答.txt"}, "DELETE"
        )
        self.assertEqual(status, 200)
        self.assertFalse((question_dir / "回答.txt").exists())

        old_limit = start.MAX_UPLOAD_BYTES
        start.MAX_UPLOAD_BYTES = 8
        try:
            status, too_large = self.post_file(
                "/api/attachments/Q01", profile_payload, "large.txt", b"too large for test"
            )
        finally:
            start.MAX_UPLOAD_BYTES = old_limit
        self.assertEqual(status, 413)
        self.assertIn("50 MB", too_large["error"])

        status, unsupported = self.post_file(
            "/api/attachments/Q01", profile_payload, "archive.exe", b"not allowed"
        )
        self.assertEqual(status, 415)

        status, restored = self.post_json("/api/profile", profile_payload)
        self.assertEqual(status, 200)
        self.assertCountEqual(
            [item["name"] for item in restored["attachments"]["Q01"]],
            ["概念图.png", "concept-notes.pdf"],
        )

        status, removed = self.json_request(
            "/api/attachments/Q01",
            {**profile_payload, "filename": "概念图.png"},
            "DELETE",
        )
        self.assertEqual(status, 200)
        self.assertFalse(attachment_path.exists())

        status, failure = self.post_json(
            "/api/profile", {"name": "林同学", "studentId": "../escape"}
        )
        self.assertEqual(status, 400)
        self.assertIn("学号", failure["error"])
        self.assertFalse((self.submissions_root.parent / "escape_林同学").exists())

        with self.assertRaises(start.RequestProblem):
            start.validate_attachment_name("../outside.txt")

    def test_open_submission_directory_opens_only_existing_profile_directory(self) -> None:
        profile_payload = {"name": "林同学", "studentId": "OPEN-001"}
        status, _ = self.post_json("/api/profile", profile_payload)
        self.assertEqual(status, 200)
        expected_dir = self.submissions_root / "林同学_OPEN-001"
        with patch("start.open_directory") as open_mock:
            status, response = self.post_json("/api/submission/open", profile_payload)
        self.assertEqual(status, 200)
        self.assertEqual(response["directoryName"], expected_dir.name)
        open_mock.assert_called_once_with(expected_dir.resolve())

        missing_status, missing = self.post_json(
            "/api/submission/open", {"name": "尚未创建", "studentId": "OPEN-002"}
        )
        self.assertEqual(missing_status, 404)
        self.assertIn("先保存学生信息", missing["error"])

    def test_open_submission_directory_reports_system_error(self) -> None:
        profile_payload = {"name": "林同学", "studentId": "OPEN-003"}
        self.post_json("/api/profile", profile_payload)
        with patch("start.open_directory", side_effect=OSError("file manager unavailable")):
            status, response = self.post_json("/api/submission/open", profile_payload)
        self.assertEqual(status, 500)
        self.assertIn("系统文件管理器", response["error"])

    def test_legacy_submission_migrates_without_losing_answers_or_attachments(self) -> None:
        profile = {"name": "兼容同学", "studentId": "MIGRATE-01"}
        legacy_dir = self.submissions_root / "MIGRATE-01_兼容同学"
        question_dir = legacy_dir / QUESTION_DIRECTORIES["Q09"]
        legacy_attachments = question_dir / "附件"
        legacy_attachments.mkdir(parents=True)
        (legacy_dir / "学生信息.md").write_text("旧资料", encoding="utf-8")
        (question_dir / "回答.json").write_text(
            json.dumps({"questionId": "Q09", "fields": {"repository": "https://github.com/a/b", "answer": "旧答案"}}),
            encoding="utf-8",
        )
        (legacy_attachments / "old.zip").write_bytes(b"legacy archive")

        status, restored = self.post_json("/api/profile", profile)
        self.assertEqual(status, 200)
        self.assertEqual(restored["answers"]["Q09"]["answer"], "旧答案")
        new_dir = self.submissions_root / "兼容同学_MIGRATE-01"
        new_question_dir = new_dir / QUESTION_DIRECTORIES["Q09"]
        self.assertFalse(legacy_dir.exists())
        self.assertEqual((new_question_dir / "回答.txt").read_text(encoding="utf-8"), "旧答案")
        self.assertEqual(
            (new_question_dir / "GitHub仓库链接.txt").read_text(encoding="utf-8"),
            "https://github.com/a/b",
        )
        self.assertEqual((new_question_dir / "old.zip").read_bytes(), b"legacy archive")
        self.assertFalse((new_question_dir / "附件").exists())

    def test_legacy_and_new_directory_conflict_is_not_overwritten(self) -> None:
        profile = {"name": "冲突同学", "studentId": "CONFLICT-01"}
        legacy_dir = self.submissions_root / "CONFLICT-01_冲突同学"
        new_dir = self.submissions_root / "冲突同学_CONFLICT-01"
        legacy_dir.mkdir(parents=True)
        new_dir.mkdir(parents=True)
        (legacy_dir / "keep.txt").write_text("legacy", encoding="utf-8")
        (new_dir / "keep.txt").write_text("new", encoding="utf-8")
        status, response = self.post_json("/api/profile", profile)
        self.assertEqual(status, 409)
        self.assertIn("同时存在", response["error"])
        self.assertEqual((legacy_dir / "keep.txt").read_text(encoding="utf-8"), "legacy")
        self.assertEqual((new_dir / "keep.txt").read_text(encoding="utf-8"), "new")

    def test_main_starts_loopback_server_and_opens_browser(self) -> None:
        fake_server = MagicMock()
        output = io.StringIO()
        with (
            patch("start.ThreadingHTTPServer", return_value=fake_server) as server_factory,
            patch("start.webbrowser.open", return_value=True) as browser_open,
            redirect_stdout(output),
        ):
            result = start.main()
        self.assertEqual(result, 0)
        self.assertEqual(server_factory.call_args.args[0], ("127.0.0.1", 8765))
        browser_open.assert_called_once_with("http://127.0.0.1:8765")
        fake_server.serve_forever.assert_called_once()
        fake_server.server_close.assert_called_once()

    def test_main_reports_port_conflict_without_silently_changing_port(self) -> None:
        error_output = io.StringIO()
        with (
            patch("start.ThreadingHTTPServer", side_effect=OSError("address in use")),
            patch("start.webbrowser.open") as browser_open,
            redirect_stderr(error_output),
        ):
            result = start.main()
        self.assertEqual(result, 1)
        self.assertIn("127.0.0.1:8765", error_output.getvalue())
        self.assertIn("关闭占用 8765 端口", error_output.getvalue())
        browser_open.assert_not_called()

    def test_packaged_learning_resources_serve_from_local_distribution(self) -> None:
        if not (start.WEB_ROOT / "materials" / "AI核心概念速读.md").is_file():
            self.skipTest("先运行前端生产构建以生成随包学习资料。")
        server = ThreadingHTTPServer(
            ("127.0.0.1", 0), make_handler(start.WEB_ROOT, self.submissions_root)
        )
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            base_url = f"http://127.0.0.1:{server.server_port}"
            resources = {
                "/materials/AI核心概念速读.md": "Token",
                "/templates/项目说明模板.md": "完成标准",
                "/samples/模拟课表.xlsx": "PK",
            }
            for path, expected in resources.items():
                with urlopen(base_url + quote(path, safe="/"), timeout=3) as response:
                    body = response.read()
                self.assertIn(expected.encode("utf-8"), body, path)
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=2)

    def test_answers_restore_from_disk_on_fresh_server_and_students_are_isolated(self) -> None:
        first_profile = {"name": "周同学", "studentId": "2026 A"}
        answer = "保存后在新服务实例中恢复。"
        status, _ = self.post_json("/api/answers/Q02", {**first_profile, "fields": {"answer": answer}})
        self.assertEqual(status, 200)

        server = ThreadingHTTPServer(
            ("127.0.0.1", 0), make_handler(self.static_root, self.submissions_root)
        )
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        original_url = self.base_url
        self.base_url = f"http://127.0.0.1:{server.server_port}"
        try:
            status, restored = self.post_json("/api/profile", first_profile)
            self.assertEqual(status, 200)
            self.assertEqual(restored["answers"]["Q02"]["answer"], answer)

            second_profile = {"name": "周同学", "studentId": "2026 B"}
            status, second = self.post_json("/api/profile", second_profile)
            self.assertEqual(status, 200)
            self.assertNotIn("Q02", second["answers"])
            self.assertNotEqual(
                restored["profile"]["directoryName"],
                second["profile"]["directoryName"],
            )
        finally:
            self.base_url = original_url
            server.shutdown()
            server.server_close()
            thread.join(timeout=2)

    def test_existing_profiles_endpoint_lists_profiles_from_submission_folders(self) -> None:
        profile = {"name": "目录扫描接口测试", "studentId": "SCAN-API-01"}
        status, _ = self.post_json("/api/profile", profile)
        self.assertEqual(status, 200)

        status, response = self.get_json("/api/profiles")
        self.assertEqual(status, 200)
        self.assertIn(
            {
                "name": profile["name"],
                "studentId": profile["studentId"],
                "directoryName": f"{profile['name']}_{profile['studentId']}",
            },
            response["profiles"],
        )

        info_file = self.submissions_root / f"{profile['name']}_{profile['studentId']}" / "学生信息.txt"
        info_bytes = info_file.read_bytes()
        info_mtime = info_file.stat().st_mtime_ns
        status, loaded = self.get_json("/api/profile?" + urlencode(profile))
        self.assertEqual(status, 200)
        self.assertEqual(loaded["profile"]["directoryName"], f"{profile['name']}_{profile['studentId']}")
        self.assertEqual(info_file.read_bytes(), info_bytes)
        self.assertEqual(info_file.stat().st_mtime_ns, info_mtime)

    def test_profile_directory_scan_is_read_only_and_rejects_invalid_entries(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary) / "提交资料"
            self.assertEqual(start.list_existing_profiles(root), [])
            self.assertFalse(root.exists())

            root.mkdir()
            valid = root / "林_同学_2026_001"
            valid.mkdir()
            info = valid / "学生信息.txt"
            info.write_text(start.profile_text("林_同学", "2026_001"), encoding="utf-8")
            original_info = info.read_bytes()

            mismatched = root / "错误名称_42"
            mismatched.mkdir()
            (mismatched / "学生信息.txt").write_text(
                start.profile_text("其他人", "42"), encoding="utf-8"
            )
            broken = root / "乱码_43"
            broken.mkdir()
            (broken / "学生信息.txt").write_bytes(b"\xff\xfe")
            missing_info = root / "缺少信息_44"
            missing_info.mkdir()
            try:
                (root / "外部链接_45").symlink_to(valid, target_is_directory=True)
            except OSError:
                pass

            found = start.list_existing_profiles(root)
            self.assertEqual(
                found,
                [{"name": "林_同学", "studentId": "2026_001", "directoryName": valid.name}],
            )
            self.assertEqual(info.read_bytes(), original_info)
            self.assertFalse((valid / "Q01_AI核心概念").exists())


if __name__ == "__main__":
    unittest.main()
