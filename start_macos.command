#!/bin/bash
cd "$(dirname "$0")"

if ! command -v python3 >/dev/null 2>&1; then
  echo "没有找到 Python 3。请安装 Python 3.10 或更高版本后重新启动。"
  read -r -p "按回车键关闭窗口。"
  exit 1
fi

python3 start.py
status=$?
if [ "$status" -ne 0 ]; then
  read -r -p "启动失败。按回车键关闭窗口。"
fi
exit "$status"
