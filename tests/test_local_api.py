import json
import tempfile
import threading
import unittest
from http.server import ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError
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

    def test_profile_answer_markdown_json_restore_and_path_rejection(self) -> None:
        profile_payload = {"name": "林同学", "studentId": "2026 001"}
        status, profile_response = self.post_json("/api/profile", profile_payload)
        self.assertEqual(status, 200)
        directory_name = "2026 001_林同学"
        student_dir = self.submissions_root / directory_name
        self.assertEqual(profile_response["profile"]["directoryName"], directory_name)
        self.assertTrue((student_dir / "学生信息.md").is_file())
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
        markdown = (question_dir / "回答.md").read_text(encoding="utf-8")
        saved_json = json.loads((question_dir / "回答.json").read_text(encoding="utf-8"))
        self.assertIn(answer, markdown)
        self.assertEqual(saved_json["fields"]["answer"], answer)
        self.assertNotIn("unrecognized", saved_json["fields"])

        status, restored = self.post_json("/api/profile", profile_payload)
        self.assertEqual(status, 200)
        self.assertEqual(restored["answers"]["Q01"]["answer"], answer)
        status, uploaded = self.post_file(
            "/api/attachments/Q01", profile_payload, "概念图.png", b"\x89PNG\r\noriginal-image-bytes"
        )
        self.assertEqual(status, 200)
        self.assertEqual(uploaded["attachment"]["name"], "概念图.png")
        attachment_path = student_dir / QUESTION_DIRECTORIES["Q01"] / "附件" / "概念图.png"
        self.assertEqual(attachment_path.read_bytes(), b"\x89PNG\r\noriginal-image-bytes")
        self.assertIn("概念图.png", (student_dir / QUESTION_DIRECTORIES["Q01"] / "回答.md").read_text(encoding="utf-8"))

        status, duplicate = self.post_file(
            "/api/attachments/Q01", profile_payload, "概念图.png", b"\x89PNG\r\noriginal-image-bytes"
        )
        self.assertEqual(status, 200)
        self.assertEqual(duplicate["attachment"]["name"], "概念图.png")

        status, project_zip = self.post_file(
            "/api/attachments/Q09", profile_payload, "source.zip", b"source archive bytes"
        )
        self.assertEqual(status, 200)
        self.assertEqual(project_zip["attachment"]["name"], "source.zip")
        self.assertEqual(
            (student_dir / QUESTION_DIRECTORIES["Q09"] / "附件" / "source.zip").read_bytes(),
            b"source archive bytes",
        )

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
        self.assertEqual(restored["attachments"]["Q01"][0]["name"], "概念图.png")

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


if __name__ == "__main__":
    unittest.main()
