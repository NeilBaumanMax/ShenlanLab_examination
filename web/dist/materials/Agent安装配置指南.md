# Agent 安装与配置指南

先分清两件事：运行本答题 App 只需要 Python 3.10+；安装 Claude Code CLI 等 AI Agent 是另一项学习任务，可能需要网络、账号或模型服务。学生运行 App 不需要 Node.js。

## 选择一条适合自己的路线

蓝图推荐体验 Claude Code CLI，并可用 CC Switch 配置模型提供方（例如 DeepSeek）。也接受 DeepSeek Harness 或其他 AI Agent。不要把某个厂商或安装器当作唯一选项；先确认当前操作系统、账号条件和官方支持情况。

### Claude Code 官方安装路线

打开[官方安装文档](https://code.claude.com/docs/en/getting-started)，选择与你的操作系统匹配的安装方式。官方目前提供 macOS/Linux/WSL 的安装脚本、Windows PowerShell 安装方式，以及 Homebrew、WinGet 和 npm 等选项。命令会调整，安装前应以该页面为准。

npm 安装路线需要先安装 Node.js/npm；官方文档在 2026-09-29 标注 npm 包要求 Node.js 22 或更高版本。原生安装路线不应因此被误解为也必须先安装 Node.js。不要为解决权限问题而随意使用管理员权限或 `sudo npm`。

安装后打开一个新的终端窗口检查：

```text
claude --version
claude doctor
```

进入你自己的练习项目目录，再启动 `claude`。确认它读取的是当前项目，而不是其他目录。遇到 PATH 或登录问题，按官方排错页面处理。

### 使用 CC Switch 配置模型

从 [CC Switch 官网](https://ccswitch.io/) 或[官方 Releases](https://github.com/farion1231/cc-switch/releases)获取适合系统的版本，阅读该版本说明，再按应用界面添加模型服务。推荐了解 [DeepSeek 开放平台](https://platform.deepseek.com/)及其[Anthropic API 兼容说明](https://api-docs.deepseek.com/guides/anthropic_api/)。字段名称、套餐、端点和价格都可能变化，按服务商和 CC Switch 当前官方说明填写。

API Key 是密码。只粘贴到可信的本机配置界面或系统认可的密钥管理位置，不要把它填进本答题 App、截图、Skill 文件、项目文档或 Git 仓库。测试前确认项目目录和模型提供方；先用无敏感信息的小任务检查是否能正常回复。

## 在项目目录里工作

1. 新建一个专门的练习文件夹，不要直接在下载目录、系统目录或包含私人资料的文件夹中试用。
2. 打开终端并切换到该目录，再启动 Agent。
3. 让 Agent 先列出它看见的项目文件和当前状态。核对它没有越出预期目录。
4. 给它一个小而具体的任务，阅读修改结果，再亲自运行或检查。
5. 将成功步骤、命令和错误记录下来，但删去账号、Token、API Key 和私人路径。

## 其他 Agent 路线

如果 Claude Code、CC Switch 或模型服务无法使用，可以选其他可获得的 Agent，记录名称、安装渠道、模型或服务配置方式，以及你用什么简单任务验证它已运行。重点是能解释工作目录、工具权限和验证步骤；不要求所有人使用同一款产品。

进一步阅读：[CLI 命令参考](https://code.claude.com/docs/en/cli-usage)、[Claude Code 安装](https://code.claude.com/docs/en/getting-started)、[Python](https://www.python.org/downloads/)、[Node.js](https://nodejs.org/en/download)。
