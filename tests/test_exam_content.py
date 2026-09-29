from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

import start


ROOT = Path(__file__).resolve().parents[1]


class ExamContentTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.data = json.loads((ROOT / "content" / "questions.json").read_text(encoding="utf-8"))
        cls.source = (ROOT / "content" / "latest-exam.md").read_text(encoding="utf-8")

    def test_exam_has_three_requested_stages_and_every_question_once(self) -> None:
        phases = self.data["phases"]
        self.assertEqual(len(phases), 3)
        self.assertEqual([phase["questionIds"] for phase in phases], [
            ["Q01", "Q02"],
            ["Q03", "Q04", "Q05", "Q06", "Q07", "Q08"],
            ["Q09", "Q10", "Q11"],
        ])
        grouped = [question_id for phase in phases for question_id in phase["questionIds"]]
        self.assertEqual(grouped, [f"Q{number:02d}" for number in range(1, 12)])
        self.assertEqual(len(self.data["questions"]), 11)
        self.assertEqual({question["id"] for question in self.data["questions"]}, set(grouped))

    def test_page_titles_match_the_latest_source_document(self) -> None:
        source_titles = {
            f"Q{int(number):02d}": title.strip()
            for number, title in re.findall(r"^### 第\s*(\d+)\s*题：([^\n]+)", self.source, re.MULTILINE)
        }
        page_titles = {question["id"]: question["title"] for question in self.data["questions"]}
        self.assertEqual(source_titles, page_titles)

    def test_every_question_has_a_directory_and_supported_attachment_rules(self) -> None:
        ids = {question["id"] for question in self.data["questions"]}
        self.assertTrue(ids.issubset(start.QUESTION_DIRECTORIES))
        for question in self.data["questions"]:
            with self.subTest(question=question["id"]):
                self.assertTrue(question["allowedExtensions"])
                self.assertTrue(question["answerLabel"])


if __name__ == "__main__":
    unittest.main()
