#!/usr/bin/env python3
"""Create a clean, self-contained student distribution ZIP."""

from __future__ import annotations

import sys
import tempfile
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "release" / "DeepBlue-Agent-Quest.zip"
PACKAGE_ROOT = "DeepBlue-Agent-Quest"
PACKAGE_PATHS = (
    ".gitignore",
    "运行说明.md",
    "start.py",
    "start_windows.bat",
    "start_macos.command",
    "frontend/index.html",
    "frontend/package.json",
    "frontend/package-lock.json",
    "frontend/tsconfig.json",
    "frontend/vite.config.ts",
    "frontend/src",
    "web/dist",
    "content/questions.json",
    "content/latest-exam.md",
    "materials",
    "templates",
    "samples",
)


def package_files() -> list[Path]:
    files: list[Path] = []
    for relative in PACKAGE_PATHS:
        source = ROOT / relative
        if not source.exists():
            raise FileNotFoundError(f"打包所需文件不存在：{relative}")
        if source.is_file():
            files.append(source)
        else:
            files.extend(path for path in source.rglob("*") if path.is_file())
    return sorted(set(files))


def main() -> int:
    if not (ROOT / "web" / "dist" / "index.html").is_file():
        print("没有找到生产网页，请先在 frontend 目录运行 npm run build。", file=sys.stderr)
        return 2
    if OUTPUT.exists():
        print(f"目标压缩包已存在，为避免覆盖请先移走或改名：{OUTPUT}", file=sys.stderr)
        return 2

    files = package_files()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    temporary_path: Path | None = None
    try:
        with tempfile.NamedTemporaryFile(
            prefix="DeepBlue-Agent-Quest-", suffix=".zip.tmp", dir=OUTPUT.parent, delete=False
        ) as temporary:
            temporary_path = Path(temporary.name)
        with zipfile.ZipFile(temporary_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            for source in files:
                relative = source.relative_to(ROOT).as_posix()
                archive.write(source, f"{PACKAGE_ROOT}/{relative}")
        temporary_path.replace(OUTPUT)
    except Exception:
        if temporary_path is not None:
            temporary_path.unlink(missing_ok=True)
        raise

    print(f"已生成 {OUTPUT.relative_to(ROOT)}，共 {len(files)} 个文件。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
