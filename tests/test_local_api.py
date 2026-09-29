import json
import tempfile
import threading
import unittest
from http.server import ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

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
        request = Request(
            self.base_url + path,
            data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
            headers={"Content-Type": "application/json"},
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

        status, failure = self.post_json(
            "/api/profile", {"name": "林同学", "studentId": "../escape"}
        )
        self.assertEqual(status, 400)
        self.assertIn("学号", failure["error"])
        self.assertFalse((self.submissions_root.parent / "escape_林同学").exists())


if __name__ == "__main__":
    unittest.main()
