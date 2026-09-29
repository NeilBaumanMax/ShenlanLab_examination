#!/usr/bin/env python3
"""Start the local, loopback-only web server for the application."""

from __future__ import annotations

import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from functools import partial


ROOT = Path(__file__).resolve().parent
WEB_ROOT = ROOT / "web" / "dist"
HOST = "127.0.0.1"
PORT = 8765
MINIMUM_PYTHON = (3, 10)


def main() -> int:
    if sys.version_info < MINIMUM_PYTHON:
        print("需要 Python 3.10 或更高版本。请安装新版 Python 后重新启动。", file=sys.stderr)
        return 2

    if not (WEB_ROOT / "index.html").is_file():
        print("没有找到已构建的网页。请先在 frontend 目录运行 npm install 和 npm run build。", file=sys.stderr)
        return 2

    handler = partial(SimpleHTTPRequestHandler, directory=str(WEB_ROOT))
    try:
        server = ThreadingHTTPServer((HOST, PORT), handler)
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
