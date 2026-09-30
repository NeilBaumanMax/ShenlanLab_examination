(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const pn=[{id:"understand-ai",title:"先认识 AI",summary:"理解 AI 核心概念，并比较聊天、工作流与 Agent。",questionIds:["Q01","Q02"],tone:"sky"},{id:"agent-and-github",title:"安装 Agent 与 GitHub 项目管理",summary:"在项目目录使用 Agent，练习 Skill、GitHub、提交与分支。",questionIds:["Q03","Q04","Q05","Q06","Q07","Q08"],tone:"indigo"},{id:"vibecoding",title:"Vibecoding 实战与复盘",summary:"连接工作区，解决真实问题，完成作品并复盘学习过程。",questionIds:["Q09","Q10","Q11"],tone:"teal"}],gn=[{id:"Q01",phaseId:"understand-ai",title:"用自己的话串起 AI 核心概念",shortTitle:"AI 核心概念",theme:"建立概念联系",answerLabel:"我的概念图与说明",placeholder:"用自己的话解释概念之间的联系，并说明一个具体场景……",allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]},{id:"Q02",phaseId:"understand-ai",title:"从AI聊天机器人到工作流，再到 AI Agent",shortTitle:"聊天、工作流与 Agent",theme:"比较方法与场景",answerLabel:"比较表与场景分析",placeholder:"比较三种做法，并补充提示词、上下文和 Harness 工程之间的关系……",allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]},{id:"Q03",phaseId:"agent-and-github",title:"让一个 AI Agent 在你的项目文件夹中工作",shortTitle:"安装与运行 Agent",theme:"在指定工作区启动 Agent",answerLabel:"安装、配置与验证记录",placeholder:"记录 Agent、操作系统、安装和配置方式、启动与验证过程；不要填写 API Key。",allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md",".py",".html"]},{id:"Q04",phaseId:"agent-and-github",title:"探索 Agent 的命令行操作",shortTitle:"CLI 命令",theme:"从帮助信息中探索命令",answerLabel:"命令、用途与结果",placeholder:"记录至少 5 个实际尝试的操作，并回答题目中的问题。",allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".txt",".md"]},{id:"Q05",phaseId:"agent-and-github",title:"给 Agent 增加 Skill",shortTitle:"制作并测试 Skill",theme:"把重复任务整理为可复用说明",answerLabel:"Skill 文件、设计与测试记录",placeholder:"说明真实任务、Skill 设计、调用测试、修改过程和实际价值。",allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".zip",".txt",".md"]},{id:"Q06",phaseId:"agent-and-github",title:"创建 GitHub 仓库并连接本地项目",shortTitle:"GitHub 与 SSH",theme:"让本地项目拥有远端版本记录",answerLabel:"仓库链接与操作记录",placeholder:"填写 GitHub 仓库链接，并记录提交、推送及 SSH 连接验证。",allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".txt",".md"]},{id:"Q07",phaseId:"agent-and-github",title:"画出本地仓库、远端仓库和分支提交树",shortTitle:"仓库与分支关系图",theme:"看懂改动、提交和同步方向",answerLabel:"关系图与说明",placeholder:"用箭头表示工作区、暂存区、本地仓库、远端、命令与分支的关系。",allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]},{id:"Q08",phaseId:"agent-and-github",title:"实际创建分支并安全地保存版本",shortTitle:"分支与安全提交",theme:"实践分支并保护敏感信息",answerLabel:"操作记录与问题回答",placeholder:"记录分支、修改、提交、推送和合并，并回答题目中的问题。",allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".txt",".md"]},{id:"Q09",phaseId:"vibecoding",title:"搭建工作区并连接 GitHub",shortTitle:"准备实战工作区",theme:"为作品开发准备工作区与远端仓库",answerLabel:"工作区、仓库与验证记录",placeholder:"填写项目文件夹、仓库链接，记录工作区与 SSH 远端验证结果。",fields:[{id:"repository",label:"GitHub 仓库网页链接",type:"url",placeholder:"https://github.com/用户名/仓库名"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".txt",".md"]},{id:"Q10",phaseId:"vibecoding",title:"终极实战——完成一个可运行的小工具",shortTitle:"完成一个可运行的小工具",theme:"完成从问题到验证的项目闭环",answerLabel:"作品、运行说明与验证记录",placeholder:"说明问题、需求、Agent 协作、试运行发现、修改验证和作品使用方式。",fields:[{id:"repository",label:"GitHub 仓库链接（优先）",type:"url",placeholder:"https://github.com/用户名/仓库名"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".xlsx",".zip",".txt",".md"]},{id:"Q11",phaseId:"vibecoding",title:"复盘你的作品与学习过程",shortTitle:"作品与学习复盘",theme:"总结判断、困难和下一步",answerLabel:"我的复盘",placeholder:"按题目中的六个问题复盘；建议 300—600 字，也可以补充录音、视频或图文。",allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".mp3",".m4a",".mp4",".mov",".txt",".md"]}],mn={maxFileBytes:52428800},hn={phases:pn,questions:gn,uploadDefaults:mn},B=`# 深蓝科技部 AI Agent 应用方向招新考核题

> **考核方式：**自主学习 + 实践作品
> **考核目的：**通过一组循序渐进的任务，帮助你从理解 AI Agent，到配置和使用工具，再到管理项目、完成一个解决实际问题的小作品。
> **适用对象：**对 AI、软件工具、学习和动手实践感兴趣的大一新生。
> **重要说明：**本考核不要求你入学前会编程，也不以背诵命令和术语为主要标准。

---

## 一、我们为什么这样设计考核

深蓝科技部 AI Agent 应用方向，希望招募愿意学习、愿意思考、愿意把想法做成作品的同学。

我们更关心：

- 你能不能主动查资料、尝试并记录过程；
- 你能不能把一个模糊的问题说清楚，再拆成可以完成的小任务；
- 你会不会检查 AI Agent 的回答和代码，而不是直接照单全收；
- 遇到报错时，你能不能定位问题、继续尝试或准确求助；
- 你能不能把自己的想法做成一个别人看得懂、用得起来的小工具；
- 你能不能讲清楚作品是怎么做出来的，以及下一步还能怎么改进。

你可以使用课程资料、官方文档、搜索引擎和 AI Agent。使用 AI 不会扣分；关键是你要理解自己提交的内容，能说明哪些部分由 Agent 协助完成、哪些地方由你判断和修改。

### 推荐闯关顺序

| 阶段 | 主题 | 你将完成什么 |
|---|---|---|
| 第一阶段 | AI 基础概念 | 建立对大模型、上下文、工具、工作流、Agent 等概念的初步理解 |
| 第二阶段 | 安装并使用 AI Agent | 在自己的项目文件夹中运行 Agent，体验 CLI、Skill、Tool 和 MCP |
| 第三阶段 | GitHub 与项目管理 | 创建远端仓库，理解本地和远端，练习提交、分支和版本管理 |
| 第四阶段 | Vibecoding 实战 | 找到一个真实小问题，设计、实现、检查并展示自己的工具 |

所有题目都可以随时查看和回看。建议按顺序完成，但不设置闯关锁定。

---

## 二、作答与提交说明

1. 请在答题 App 中填写姓名、学号，并按题目保存答案和附件。
2. 文字答案建议用自己的话写。可以引用资料，但请标明资料来源。
3. 题目允许使用 AI Agent。涉及作品时，请保留关键过程、提交记录或验证结果。
4. 项目实战提交以下任意一种：
   - **GitHub 仓库链接**，推荐，便于查看项目过程和版本记录；
   - **源码压缩包**，至少包含源码、运行说明和必要的示例数据。
5. 请勿提交 API Key、密码、私人聊天记录、身份证件或未经授权的个人数据。
6. 完成后，在答题 App 中打开个人提交目录，手动压缩该目录，再按组织者提供的邮箱信息发送。App 不会自动上传答案或代发邮件。
7. 如果网络或设备问题导致某项工具暂时无法安装，请记录你尝试过什么、遇到什么错误、如何排查；这类问题不作为主要扣分项。

### 提交前自查

- [ ] 姓名、学号填写正确；
- [ ] 每道必做题都有回答或过程说明；
- [ ] 实战作品可以打开，或已说明如何运行；
- [ ] 已提交 GitHub 链接或源码压缩包；
- [ ] 没有把 API Key、密码或私人数据放进提交内容；
- [ ] 已检查压缩包内的文件能正常打开。

---

## 第一阶段：先认识 AI

> 请用自己的话回答本阶段的问题。可以使用生成式 AI 辅助学习，但要理解并核对答案。

### 第 1 题：用自己的话串起 AI 核心概念

#### 任务

观看推荐的 AI 概念视频，并查阅资料，用自己的理解阐述下面 AI 核心关键词，也可以增加自己对其中联系的思考。也可以选一个学习或生活中使用 AI 的具体场景，说明这些概念在任务中分别起什么作用、彼此如何联系，以及哪些环节需要人检查。可以用文字说明，可以附加图片说明。

**推荐视频：**[从 LLM 到 Agent Skill，一期视频带你打通底层逻辑！](https://www.bilibili.com/video/BV1E7wtzaEdq/)

- 大语言模型（LLM）
- Token
- 上下文（Context）
- 提示词（Prompt）
- 工具（Tool）
- Skill
- MCP
- AI Agent


#### 我们希望看到

- 不要求背诵标准定义；
- 尽量用自己的例子，自己的语言解释概念之间的关系；
- 能指出哪些环节由模型完成，哪些环节需要工具、资料或人的检查；
- 可以手绘拍照，也可以用在线或本地工具绘图。

#### 核心考察

概念理解、信息整理和语言表达能力。

#### 完成后应获得的能力

能初步看懂一个 Agent 任务中“模型、上下文、工具和人”分别在做什么。

#### 提交内容

- 概念图或结构化文字；
- 对所选场景的说明；
- 至少列出一个参考资料链接。

**建议答题：**概念图 + 文字说明。

---

### 第 2 题：从AI聊天机器人到工作流，再到 AI Agent

#### 阅读导读

人工智能并不是近几年才出现的。1956 年，达特茅斯夏季研究项目推动“人工智能”成为一个明确的研究领域。早期研究者尝试用规则、逻辑和搜索，让计算机解决问题。后来，机器学习和神经网络逐渐发展，数据、算法和计算能力的提升，让 AI 能处理越来越复杂的任务。

一些广为人知的事件让公众看到 AI 能力的变化：1997 年，IBM 的 Deep Blue 在国际象棋比赛中战胜了世界冠军卡斯帕罗夫；2012 年，深度神经网络在图像识别比赛中取得突出成绩；2016 年，AlphaGo 以 4 比 1 战胜围棋选手李世石。AlphaGo 把深度神经网络与搜索等方法结合起来，在围棋这个特定任务上表现出色。这些事件展示了 AI 在不同任务上的进步，但不代表后一个系统就是由前一个系统直接发展而来。

2017 年，研究者提出 Transformer 架构。它后来成为许多大语言模型的重要基础。此后，模型规模、训练数据、计算资源和训练方法等方面不断发展，AI 开始能够根据自然语言生成文章、总结资料、编写代码和回答问题。2022 年底，ChatGPT 以聊天界面面向公众开放，让很多人第一次频繁地用自然语言与大语言模型互动。聊天机器人的主要使用方式是人提出问题或要求，模型生成回答；用户通常需要自己判断回答是否可靠，并决定接下来怎么做。

随着模型能力和软件接口的发展，AI 也逐渐进入更复杂的工作流程。开发者可以让模型调用外部函数或工具，也可以把模型放进预先设计好的固定步骤中。例如，系统可以按“读取表格—提取信息—检查格式—生成报告”的顺序完成一项重复工作。这里的步骤和流程通常主要由开发者预先安排，AI 负责其中一个或几个环节。固定工作流并不是全新的 AI 发展阶段；它是把模型接入已有软件流程的一种常见方式，适合步骤较明确、重复性较高的任务。

AI Agent 则更强调围绕一个目标连续行动：它可以根据当前任务决定下一步，调用工具或读取资料，观察结果后再继续，必要时调整计划。MCP 等协议尝试让 AI 应用更方便地连接外部工具和数据。2025 年末开始出现、并在 2026 年受到关注的 OpenClaw，是个人 Agent 应用的一个例子：用户可以通过常见聊天软件交代任务，由它连接工具并在指定环境中执行操作。OpenClaw 不是 AI Agent 的起点，也不代表所有 Agent 都以同样方式工作；它只是一个能帮助我们观察“AI 从回答问题走向执行任务”的具体案例。

从聊天问答、固定工作流到 Agent，可以看作 AI 使用方式不断扩展的一条学习线索，而不是所有技术严格按顺序出现、后一种完全取代前一种。很多任务用一次问答就够了；有些适合交给步骤固定的工作流；需要根据过程结果灵活调整并使用工具的任务，才可能更适合 Agent。随着 AI 开始处理更长、更复杂的任务，人们也更关注怎样把要求说清楚、怎样准备相关信息，以及怎样设置工具、权限、检查和评估等运行条件。提示词工程、上下文工程和 Harness 工程等说法，正是在这样的应用背景下逐渐受到关注；它们的含义和边界仍可能因资料与实践而有所不同。


#### 任务

请先根据资料，梳理 AI 使用方式从聊天机器人、固定 AI 工作流到 AI Agent 的变化，比较三者的区别和联系，并举例说明三者的使用场景。

然后用自己的话说明：

- 提示词工程主要在改进什么；
- 上下文工程主要在组织什么；
- Harness 工程通常会关注 Agent 周围的哪些运行条件，例如工具、权限、上下文、检查和评估；你对Harness 工程的理解。
- 这些做法之间是什么关系，是否一定是后一种完全取代前一种。

> “Harness 工程”在不同资料中的用法可能不完全一样。请说明你参考了什么资料，以及你在本题中的理解，不要求把它当成唯一固定的定义。

#### 我们希望看到

- 能比较适用场景，而不是只说哪种技术“更先进”；
- 能认识到很多任务用普通聊天或固定工作流更简单；
- 能结合一个具体例子说明自己会如何选择。

#### 核心考察

比较、归纳和根据任务选择合适方法的能力。

#### 完成后应获得的能力

能先分析任务，再决定使用普通对话、固定工作流还是 Agent。

#### 提交内容

完成下表，并补充一段自己的判断。

| 做法 | 适合什么任务 | 需要人做什么 | 可能的不足 |
|---|---|---|---|
| AI 聊天机器人 |  |  |  |
| 固定 AI 工作流 |  |  |  |
| AI Agent |  |  |  |

**建议答题：**表格 + 200—400 字场景分析。

---

## 第二阶段：安装并使用 AI Agent


### 第 3 题：让一个 AI Agent 在你的项目文件夹中工作

熟悉了 AI 的相关核心概念，下面我们来在自己的电脑上部署属于自己的第一个 AI Agent。

本题及后续题目会涉及 Claude Code CLI 的安装与使用、模型切换、常用命令，以及 Git 的安装和基础操作。可以参考下面的视频完成相关配置和练习：

**推荐视频：**[Claude Code 零基础终极教程：安装、换模型、插件、Hooks、Skills、Subagents、实战项目一次讲透！](https://www.bilibili.com/video/BV1TTR8BaEnL?vd_source=f2566932bb9532578531c4d07b1de85d)

也可以自行搜索其他资料。遇到安装、配置或报错问题时，鼓励使用 AI 工具帮助查询原因、整理操作步骤并协助排查；但请自己核对命令、下载来源、当前目录和最终结果，避免直接执行不理解的命令。

#### 任务

选择一种你能使用的 Agent 完成配置。推荐路线：

1. Claude Code CLI + CC Switch + DeepSeek（推荐）；
2. DeepSeek Harness；
3. 其他你已经能正常使用的 AI Agent。

建议选择：Claude Code CLI + CC Switch + DeepSeek，安装CCSwitch，并为Claude配置DeepSeek API Key。

- [CC Switch 官网](https://ccswitch.io/zh/)
- [CC Switch GitHub Releases](https://github.com/farion1231/cc-switch/releases)

建立一个专门的练习文件夹，例如 **agent-practice**，自定义文件夹路径。在Windows的Powershell或Macos的终端中，进入agent-practice文件夹，并启动Claude Code CLI：
尝试验证Claude是否可用，可以选择其下任意一种方式验证配置：

1. 生成一段你的自我介绍文字保存为.md格式；
2. 用Python在屏幕上打印出HelloWorld；
3. 用HTML呈现出一张九九乘法表；

请记录安装、配置、启动和验证过程。不同系统和安装方式的步骤可能不同，以工具当前官方文档为准。

#### 我们希望看到

- 你知道 Agent 如何在指定的文件夹或工作区中施工；
- 学会使用CLI版的AI Agent，熟悉并习惯在命令行中操作；
- 能够配置自己的大模型给AI Agent；
- 牢记自己的API Key等敏感数据不能外泄。

#### 核心考察

AI Agent配置、基本使用方法、熟悉并习惯用命令行操作。

#### 完成后应获得的能力

能在自己的项目文件夹中启动一个 Agent，并让它完成一项范围明确的小任务。

#### 提交内容

- 使用的 Agent、操作系统和安装方式；
- 启动与验证AI Agent的过程；
- 运行记录和结果（比如提交运行结果的截图或者提交运行结果文件）。

#### 安全提醒

- 不要把 API Key 写进答案、截图、源码或公开仓库；
- 不要让 Agent 在整个磁盘或包含私人文件的目录中随意操作；
- 对删除文件、安装软件、运行脚本等操作，先读懂命令并确认影响范围。

---

### 第 4 题：探索 Agent 的命令行操作

非常好，你已经安装并成功配置了自己的AI Agent。下面我们来熟悉一下操作。

#### 任务

根据你安装的 Agent 当前版本，使用帮助命令或官方文档，找出并实际尝试至少 5 个对你有用的操作。可以参考 GitHub 仓库 [KimYx0207/AI-Coding-Guide-Zh](https://github.com/KimYx0207/AI-Coding-Guide-Zh) 教程的“ 02-基础使用完整指南.md 的 第二部分：5分钟快速开始 ”，或者自行查找Claude code CLI常用命令，Claude Code 用户可以从 **claude --version**、**claude --help** 和会话内的 **/help** 开始，再继续探索其他命令。也可以选择恢复会话、查看权限或检查扩展配置等操作。

例如：

1. 进入项目文件夹 cd C:\\你的项目路径
2. claude，用来启动Claude Code
3. claude --resume，用来恢复历史对话
4. /skills，用来调用skill；/model，用来切换模型；/exit， 退出Claude，等等...


完成后回答：

1. 你尝试了哪些命令或操作？
2. 每个操作是用来做什么的？
3. 你觉得哪些命令更常用，列出来两个（除了进入项目路径和启动Claude）？
4. 如何查看当前Claude版本？你如何查看当前版本支持哪些命令？

#### 我们希望看到

- 命令以你安装版本的实际帮助信息为准；
- 不要求记住大量命令，只需要记住常用命令；
- 能说明命令对当前任务有什么帮助；
- 遇到Claude版本差异时，能通过帮助文档确认，而不是照抄过时教程。

#### 核心考察

自主探索、查阅文档和解释工具行为的能力。

#### 完成后应获得的能力

学会Claude code CLI的命令行操作。

#### 提交内容

| 命令或操作 | 我查到的用途 | 我实际做了什么 | 结果 |
|---|---|---|---|
| 1 |  |  |  |
| 2 |  |  |  |
| 3 |  |  |  |

---

### 第 5 题：给 Agent 增加 Skill

#### 阅读导读：什么是 Skill？

大语言模型掌握了很多通用知识，但它并不知道你的具体要求和做事习惯。

例如，同样是“整理课程资料”，有人希望按照课程名称分类，有人希望按照日期分类；有人只需要移动文件，有人还要求统一命名、生成目录并标记缺失内容。如果每次执行任务都重新解释这些规则，不仅麻烦，还容易遗漏步骤。

Skill 可以理解成一份写给 Agent 的“工作说明书”。它把完成某类任务需要的规则、步骤、格式和注意事项保存下来。当 Agent 再次遇到类似任务时，就可以读取这份说明，按照相对统一的方法完成工作。

Skill 不会重新训练大模型，也不会让模型凭空获得新的知识。它的实质是一个可以重复使用的上下文包：把原本需要反复输入的提示词、操作步骤、项目规则和输出要求整理成文件，在需要时加载给 Agent。

在本次考核中，可以把 Claude Code CLI 理解为 Agent 的运行环境，把 DeepSeek API 理解为提供语言理解和生成能力的模型。Skill 由 Claude Code 发现和加载，再交给模型理解和执行。因此，Skill 写得是否清楚，会直接影响 Agent 能否正确完成任务。

##### Skill 为什么会出现？

当 Agent 开始处理实际任务后，人们逐渐发现只依靠临时对话存在一些问题：

- 相同的要求需要反复输入；
- 复杂任务容易遗漏步骤；
- 每次输出的格式可能不同；
- 个人或团队的经验难以保存和共享；
- 大量长期说明一直放在对话中，会占用上下文；
- 更换对话后，之前总结出的做法可能无法继续使用。

Skill 可以把这些经验保存为独立文件，需要时再加载。这样既能减少重复说明，也能让同一类任务的处理过程更加稳定。

Agent Skills 最初由 Anthropic 提出，后来被发布为开放标准。Claude Code 按照这一标准使用 Skill，并增加了手动调用、自动判断是否使用等功能。

##### 一个标准 Skill 由什么组成？

一个 Skill 是一个独立文件夹，其中必须包含一个名为 \`SKILL.md\` 的文件。

\`\`\`text
course-file-organizer/
├── SKILL.md          # 必需：名称、用途和执行说明
├── references/       # 可选：补充规则和参考资料
├── assets/           # 可选：模板或示例文件
└── scripts/          # 可选：辅助执行的脚本
\`\`\`

本题不要求必须添加其他文件。只要能够写好并正确使用 \`SKILL.md\`，就可以完成基础任务。

\`SKILL.md\` 主要由两部分组成。

第一部分是文件开头的基本信息：

\`\`\`yaml
---
name: course-file-organizer
description: Use this skill when organizing course files by course name, file type, and date.
---
\`\`\`

其中：

- \`name\` 是 Skill 的名称；
- 名称建议使用小写英文字母、数字和连字符；
- \`description\` 要说明这个 Skill 能做什么，以及什么情况下应该使用；
- Skill 文件夹名称应与 \`name\` 保持一致。

第二部分是具体的执行说明，一般包括：

- 任务目标；
- 适用场景；
- 输入内容；
- 处理步骤；
- 输出格式；
- 不能执行的操作；
- 遇到异常情况时如何处理；
- 输入和输出示例。

一个简单的 \`SKILL.md\` 可以这样写：

\`\`\`markdown
---
name: course-file-organizer
description: Use this skill when organizing course files into folders and generating a file list.
---

# 任务目标

按照课程名称和文件类型整理课程资料。

# 输入

一个包含课程资料的指定文件夹。

# 处理步骤

1. 读取文件名称和类型。
2. 判断文件属于哪一门课程。
3. 按照课程名称建立分类。
4. 在每门课程下区分课件、作业和其他资料。
5. 生成整理结果清单。

# 输出要求

输出文件分类结果、无法判断的文件和需要人工确认的问题。

# 注意事项

- 不处理指定文件夹之外的内容。
- 无法判断所属课程时，不要自行猜测。
- 执行前先说明计划。
- 保留原始文件。
\`\`\`

##### Agent 怎样使用 Skill？

Claude Code 启动后，会先读取可用 Skill 的名称和简介。当用户提出的任务与某个 Skill 的 \`description\` 相符时，Agent 可以继续读取完整的 \`SKILL.md\`，再按照其中的要求完成任务。

这个过程可以分为三步：

1. **发现：**读取 Skill 的名称和简介；
2. **判断：**根据当前任务判断是否需要使用；
3. **执行：**加载完整说明并按照步骤完成任务。

因此，\`description\` 非常重要。如果写得太模糊，Agent 可能不知道什么时候应该使用；如果写得范围太大，Agent 又可能在无关任务中错误使用。

在 Claude Code 中，Skill 可以由 Agent 根据任务自动选择，也可以通过 \`/skill-name\` 手动调用。

##### 什么情况下适合制作 Skill？

以下任务比较适合制作 Skill：

- 同类任务会重复出现；
- 任务具有相对固定的步骤；
- 输出需要遵守统一格式；
- Agent 经常遗漏某些检查项；
- 任务包含个人或项目特有的规则；
- 希望把自己的处理方法保存下来继续使用。

以下情况通常没有必要制作 Skill：

- 任务只需要执行一次；
- 任务只有一个非常简单的步骤；
- 要求还没有确定，经常发生较大变化；
- Agent 在没有额外说明的情况下已经能稳定完成。

判断是否需要 Skill 时，可以问自己：

> “下一次遇到类似任务时，我是否还需要把这些要求重新讲一遍？”

如果答案是“需要”，这项任务就可能适合制作 Skill。

##### 怎样写好一个 Skill？

可以按照下面的过程制作：

1. 选择一个自己真正遇到过的重复任务；
2. 明确 Skill 解决的具体问题；
3. 写清楚它应该在什么情况下使用；
4. 确定输入内容和输出格式；
5. 把完成任务的过程整理成清楚的步骤；
6. 加入容易出错的地方和操作边界；
7. 使用不同的例子进行测试；
8. 根据测试结果修改说明。

Skill 不应该只写“帮助我学习”“认真检查文件”或“根据情况完成任务”。这样的描述没有明确的输入、步骤和结果，难以重复使用。

评价一个 Skill 时，也不能只看文件是否存在，还要观察：

- Agent 能否在合适的时候使用它；
- Agent 是否按照规定步骤执行；
- 不同输入下的输出是否稳定；
- 是否出现不应该执行的操作；
- Skill 是否比临时输入一段提示词更有复用价值。

> 建议搜索词：\`Agent Skills specification\`、\`Claude Code skills\`、\`SKILL.md\`、\`Claude Code create custom skill\`、\`Skill progressive disclosure\`。

##### Skill 资源推荐

**作者的 Skill 小站：**[Neil's Skill Hub](http://118.195.247.102/)

![Neil's Skill Hub 页面，提供按工具、用途和标签整理的 Agent Skill 推荐](/assets/q05-neils-skill-hub.jpg)

**推荐 Skill 库：**[skills.sh](https://www.skills.sh/)

![skills.sh 页面，提供开放的 Agent Skills 生态与 Skill 检索入口](/assets/q05-skills-sh.jpg)

#### 任务

围绕一个具体、可重复的小任务，为 Claude Code 制作一个自己的 Skill。

建议场景：

- 整理课程资料；
- 检查活动报名表；
- 统一实验报告格式；
- 整理课堂笔记；
- 检查项目文件命名；
- 生成每周学习总结；
- 其他来自你日常学习或生活的真实任务。

请完成以下内容：

1. **选择一个具体任务。**
   说明这个任务在什么情况下出现、目前有什么问题，以及为什么值得制作成 Skill。

2. **创建 Skill 文件夹和 \`SKILL.md\`。**
   Skill 中至少要写清：

   - Skill 名称；
   - 适用场景和触发条件；
   - 需要接收什么输入；
   - 具体处理步骤；
   - 输出内容和格式；
   - 注意事项和操作边界；
   - 遇到无法判断的情况时如何处理。

3. **把 Skill 加入 Claude Code。**
   可以将项目共用的 Skill 放在：

   \`\`\`text
   .claude/skills/<skill-name>/SKILL.md
   \`\`\`

   也可以将个人使用的 Skill 放在：

   \`\`\`text
   ~/.claude/skills/<skill-name>/SKILL.md
   \`\`\`

4. **实际调用并测试 Skill。**
   至少使用一个例子进行测试，记录：

   - 输入了什么任务；
   - Skill 是否被正确使用；
   - Agent 执行了哪些步骤；
   - 最终输出是否符合要求；
   - 测试后修改了哪些内容。

5. **说明 Skill 的实际价值。**
   用自己的话说明：

   - 如果没有这个 Skill，你原本需要怎样完成任务；
   - 使用 Skill 后发生了什么变化；
   - 这个 Skill 还有哪些不足；
   - 它是否值得继续使用。

#### 我们希望看到

- Skill 解决的是一个具体、可重复的问题；
- 能区分一次性提示词和可复用 Skill；
- \`description\` 能说明它做什么以及什么时候使用；
- 执行步骤清楚，换一个相似输入后仍然可以使用；
- 明确 Agent 可以做什么、不能做什么；
- 能根据实际测试结果修改 Skill；
- 使用自己的语言说明设计思路。

#### 核心考察

发现重复任务、整理处理规则、编写可复用说明、设置操作边界和根据测试结果改进 Skill 的能力。

#### 完成后应获得的能力

能理解 Skill 的作用和基本结构，并能在 Claude Code 中创建、调用、测试和改进一个自己的 Skill。

#### 提交内容

- 完整的 Skill 文件夹；
- \`SKILL.md\` 文件；
- Skill 设计说明；
- 至少一个测试例子；
- Agent 实际调用 Skill 的记录或截图；
- 测试结果和修改说明；
- 一段自己的总结：这个 Skill 解决了什么问题，以及它是否真正有用。

**建议答题：**Skill 文件 + 至少一组测试记录 + 设计与使用说明文档。

---

## 第三阶段：GitHub 与项目管理

### 第 6 题：创建 GitHub 仓库并连接本地项目

#### 导读

使用 AI Agent 开发项目时，我们常常只关注最终结果，却忽略了项目过程的管理。一条指令可能让 Agent 同时修改多个文件；连续执行几轮后，我们可能已经说不清它改了什么、项目进行到哪一步，也不知道从哪个版本开始出现问题。

当 Agent 的修改方向错误、项目突然无法运行，或者我们想同时尝试两种方案时，如果没有保存清楚的版本，就很难比较、恢复和继续开发。多人协作或更换 Agent 后，这个问题会更加明显：新的参与者不知道前面完成了什么，也不知道当前文件是否可靠。

Git 就是为项目记录变化和管理版本的工具。它可以为项目建立一个个明确的存档点，帮助我们查看修改、保留阶段成果，并在出现问题时回到之前的版本。GitHub 则可以保存远端仓库，用于备份、展示和协作。

因此，这道题不是要求大家机械背诵 Git 命令，而是希望大家从一开始就建立版本管理意识：让 AI Agent 的每次重要修改都有记录，让项目能够查看、同步和恢复。后面的所有实战项目也都需要通过 GitHub 仓库提交。

#### 任务

创建自己的 GitHub 账号和一个练习仓库，再将它与本地练习文件夹连接。推荐学习 SSH 连接方式，并完成一次提交和推送。

请尝试理解并使用以下 Git 操作中的必要部分：

- **git status**：查看当前文件变化；
- **git add**：把文件加入暂存区；
- **git commit**：创建一次有说明的提交；
- **git remote -v**：查看远端仓库地址；
- **git push**：把本地提交推送到 GitHub。

#### 我们希望看到

- 能打开并展示自己的仓库链接；
- 知道本地电脑中的项目和 GitHub 上的仓库是两个位置；
- 能说明 SSH 在本地 Git 与 GitHub 之间起什么作用；
- 不提交私钥、API Key、密码或个人敏感数据。

#### 核心考察

GitHub 仓库、Git 基本操作、SSH 连接和远端同步意识。

#### 完成后应获得的能力

能把本地项目保存到 GitHub，并将仓库链接分享给别人。

#### 提交内容

- GitHub 仓库链接；
- 你实际完成的操作步骤；
- 至少一条提交记录；
- 可选：SSH 连接成功测试结果截图。

> 请同学们规范使用网络工具，如果网络问题无法访问GitHub，推荐使用瓦特工具箱 [Watt Toolkit 项目页](https://github.com/BeyondDimension/SteamTools)，或者自行百度搜索"瓦特工具箱"下载（原名Steam++）。

---

### 第 7 题：画出本地仓库、远端仓库和分支提交树

#### 导读

完成上一题后，你已经可以把本地项目提交并推送到 GitHub。但“命令执行成功”并不代表真正理解了项目版本是怎样变化的。遇到文件没有被提交、本地已经更新但 GitHub 没有变化、拉取后出现冲突等情况时，只会照着教程输入命令，很容易不知道问题发生在哪里。

在使用 AI Agent 开发时，这种理解更加重要。Agent 可以帮助执行 Git 命令，但如果你不知道当前修改位于哪个分支、哪些内容只在本地、哪些内容已经推送到远端，就可能把未完成的功能合并进主分支，或者让一个 Agent 的修改覆盖另一个 Agent 的工作。

分支还可以为不同任务提供相对独立的开发空间。例如，主分支保留当前可以正常运行的版本，新功能先在功能分支中开发和检查，确认没有问题后再合并回来。后续进行多人协作或多个 Agent 并行开发时，也会用到这种思路。

因此，这道题要求你把 Git 的工作区域、提交记录、分支和远端仓库画成一张图。画图的目的，是在脑中建立完整的项目版本地图，知道每条命令把内容从哪里带到哪里，并能够判断当前修改究竟处于什么位置。

#### 任务

自己画一张图，说明以下内容之间的关系：

- 工作区；
- 暂存区；
- 本地仓库；
- GitHub 远端仓库；
- **add**、**commit**、**push**、**fetch**、**pull**；
- **main** 分支；
- 一个功能分支；
- 功能分支如何合并回主分支。

可以手绘拍照、用绘图软件制作，或使用文字图示。请在图中用箭头表示内容的流动方向，并补充说明一次“本地有新提交，远端还没有”的情况。

#### 我们希望看到

- 重点是关系和方向正确，不看图画得是否专业；
- 能区分工作区改动、提交记录和远端同步；
- 能解释分支是怎样帮助隔离一个功能的修改。

#### 核心考察

对 Git 工作区域、提交历史、分支和远端同步的整体理解。

#### 完成后应获得的能力

能看懂简单提交历史，也能用图向别人解释项目版本是如何变化的。

#### 提交内容

- 一张关系图；
- 文字解释；
- 如果使用 Agent 帮助画图，请说明你检查或修改了什么。

---

### 第 8 题：实际创建分支并安全地保存版本

#### 任务

在练习仓库中完成一次小型分支练习：

1. 从主分支创建一个功能分支；
2. 在功能分支中新增或修改一个文件；
3. 创建至少一次有意义的提交；
4. 将分支推送到 GitHub；
5. 将功能分支合并回主分支，或说明你选择的合并方式；
6. 查看提交历史，确认分支和提交结果。

再回答：

- **.gitignore** 的作用是什么？
- 为什么 API Key、密码和私人数据不能提交到公开仓库？
- 如果发现某次提交有问题，你会如何查找和处理？

#### 我们希望看到

- 提交记录能看出每一步做了什么；
- 能用 Git 状态、提交历史或 GitHub 页面检查结果；
- 不需要掌握复杂的冲突处理；如果遇到冲突，请记录你如何理解和处理；
- 不以提交次数多少或 GitHub 绿格数量作为评价标准。

#### 核心考察

版本管理习惯、分支实践、检查意识和基本信息安全意识。

#### 完成后应获得的能力

能用分支完成一个独立的小改动，并把过程保存成可检查的版本记录。

#### 提交内容

- 仓库链接；
- 分支名称和提交记录；
- 一段简短说明；
- 可选：提交历史截图或终端输出。

---

## 第四阶段：Vibecoding 实战

### 第 9 题：搭建工作区并连接 GitHub

#### 导读

前面的题目分别学习了 Agent、Git 和 GitHub。真正开始做项目时，需要先让它们在同一个工作区中配合起来。

Claude Code 从哪个文件夹启动，就会围绕那个位置读取和修改项目文件。如果工作区选错，Agent 可能找不到项目，也可能把文件写到错误的位置。项目还需要连接 GitHub 仓库，让接下来的修改有记录、能同步，并在出现问题时可以查看之前的版本。

这一题先把开发环境和仓库准备好。完成后，你就可以在第 10 题中专心选择问题、设计工具并开始实战。

#### 任务

请按顺序完成以下步骤。可以请 Agent 帮助你操作和排查问题，但要自己确认它所在的文件夹和连接的仓库是否正确。

1. **安装并打开 VS Code。**
   从 [VS Code 官网](https://code.visualstudio.com/)下载安装，推荐进行汉化。创建一个用于后续实战的独立项目文件夹，并用 VS Code 打开这个文件夹。

2. **在工作区中启动 Claude Code。**
   打开 VS Code 的集成终端，确认终端当前位于刚才创建的项目文件夹，再输入 \`claude\` 启动 Agent。请让 Agent 告诉你它当前位于哪个文件夹，并核对结果。[VS Code 集成终端说明](https://code.visualstudio.com/docs/terminal/getting-started)。

3. **创建实战项目的 GitHub 仓库。**
   使用已有的 GitHub 账号，为后续实战新建一个仓库。记下仓库网页链接和 SSH 地址。可以继续使用第 6 题配置好的 SSH 密钥；如果尚未配置，请参照 [GitHub 的 SSH 指引](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) 完成配置。私钥只保存在自己电脑上。

4. **让 Agent 连接本地与远端，并验证。**
   在当前工作区中，请 Agent 初始化本地 Git 仓库，将刚创建的 GitHub 仓库设为 \`origin\`，并使用 **SSH 地址**连接。添加一个简单的 \`README.md\`，完成首次提交和推送。然后由你检查：

   - \`git status\`：当前工作区是否还有未提交的变化；
   - \`git remote -v\`：\`origin\` 是否指向你自己的仓库，且使用 SSH 地址；
   - \`git branch --show-current\`：当前处于哪个分支；
   - GitHub 网页：是否能看到 \`README.md\` 和首次提交。

   如果需要检查 SSH 身份验证，可以使用 \`ssh -T git@github.com\`，根据 GitHub 返回的身份提示判断连接情况。[GitHub SSH 测试说明](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)。
5. **打开 VS Code 的源代码管理面板。**
   按 \`Ctrl+Shift+G\` 打开 Source Control 面板。这里可以查看文件改动、暂存和提交；有 Git 仓库时还可以查看分支与提交历史，以及远端仓库的同步状态。

#### 我们希望看到

- 能用 VS Code 打开一个独立的项目工作区；
- 能从该工作区的终端启动 Claude Code，并确认 Agent 所在位置；
- 能区分 GitHub 仓库网页链接与用于 Git 连接的 SSH 地址；
- 能让本地项目连接到正确的远端仓库；
- 能通过首次推送证明连接已经生效；
- 能检查 Agent 执行的命令和结果，不把私钥、API Key 或密码提交到仓库。

#### 核心考察

工作区意识、VS Code 终端使用、Agent 启动、SSH 连接和本地与远端仓库的核对能力。

#### 完成后应获得的能力

能独立准备一个供 Claude Code 开发的项目工作区，并确认它已经通过 Git 与自己的 GitHub 仓库连接，为第 10 题的实战做好准备。

#### 提交内容

- 项目工作区的文件夹名称；
- GitHub 仓库网页链接；
- 在 VS Code 终端启动 Claude Code 的截图或操作记录；
- \`git status\`、\`git remote -v\`、\`git branch --show-current\` 的结果；
- GitHub 上可见的 \`README.md\` 和首次提交；
- 简短说明：你怎样确认 Agent 操作的是正确工作区、连接的是正确仓库。

**本题完成标准：** 在正确的工作区启动 Claude Code，且首次提交能够通过 SSH 推送到自己的 GitHub 仓库。


---

### 第 10 题：终极实战——完成一个可运行的小工具

在第 9 题准备好的工作区和 GitHub 仓库中，选择一个实际问题，使用 AI Agent 完成一个可运行的小工具。

#### 导读

第 9 题已经准备好了工作区、Claude Code 和 GitHub 仓库。接下来要做的，是用这些工具解决一个真实的小问题。

AI Agent 可以很快生成代码和页面，但“生成了”不等于“能用”。工具能否接收正确的输入、完成核心操作、给出可信的结果，还需要你亲自试运行和检查。遇到问题后，你可以把现象告诉 Agent，一起修改，再重新验证。

这道题希望你完整经历一次从发现问题、做出工具，到试用和改进的过程。作品不必复杂，但应让一个没参与开发的人看懂运行说明，并实际完成主要操作。GitHub 中的提交记录也应能看出项目是怎样一步步完成的。

#### 任务

使用你选择的 Agent，根据第 9 题的计划完成小工具。可以使用网页、脚本、桌面程序或其他适合的形式，不限制编程语言。

开发过程中，请至少完成一次“提出需求—查看 Agent 方案—试运行—发现问题—修改验证”的循环。

最后请让另一个同学，或没有参与开发的人，按照你的说明尝试使用。如果暂时找不到试用者，你可以录制或截图展示完整操作流程。

#### 我们希望看到

我们主要看以下方面：

- 工具是否解决了你提出的问题；
- 核心流程能否实际运行；
- 页面或操作是否清楚、整洁、容易理解；
- 你有没有检查数据、边界情况和 Agent 生成结果；
- 你有没有根据试用或测试反馈做改进；
- 你能不能解释作品中最重要的部分。

不要求代码多，也不要求一定使用某个框架。一个小而完整、经过检查的工具，比一个功能很多却无法运行的项目更好。

#### 核心考察

项目推进、与 Agent 协作、功能验证、审美和迭代能力。

#### 完成后应获得的能力

能够独立推进一个小型项目，并对 Agent 生成的结果进行检查和改进。

#### 提交内容

- GitHub 仓库链接或源码压缩包（二选一）；
- 项目运行说明；
- 一组可公开使用的示例数据；
- 至少 2 张作品截图，或一段简短演示；
- 功能验证记录：测试了什么、结果怎样、改了什么；
- 如采用 GitHub，保留能反映开发过程的提交记录。

#### 源码压缩包说明

请包含源码、运行说明、必要的配置模板和示例数据。请勿包含 API Key、个人数据、缓存、超大依赖目录或与运行无关的临时文件。若项目需要安装依赖，请提供依赖清单或锁定文件。

---

### 第 11 题：复盘你的作品与学习过程

#### 任务

用自己的话回答：

1. 你最初发现了什么问题？为什么选择它？
2. Agent 帮你完成了哪些工作？哪些部分由你决定或修改？
3. 遇到的最困难问题是什么？你是怎样排查的？
4. 你发现过 Agent 的错误或不合适建议吗？如何确认并修正？
5. 如果再给你一天，你最想改进什么？
6. 这次经历中，你学会了什么以前不会的东西？

#### 我们希望看到

- 真实说明过程，不需要把项目包装得十全十美；
- 能讲出自己的判断和参与，而不是只说“AI 帮我做完了”；
- 能从一次错误、返工或反馈中总结经验。

#### 核心考察

责任意识、反思能力、表达能力和持续学习意愿。

#### 完成后应获得的能力

能回顾一次 AI Agent 项目，并说明自己的成长、判断和下一步计划。

#### 提交内容

建议写 300—600 字，也可以用录音、视频或图文方式补充。

---

## 三、我们如何看待你的表现

考核以学习和实践为主，不要求所有作品都达到商业产品水平。组织者会综合观察：

| 关注方面 | 我们希望看到的表现 |
|---|---|
| 学习主动性 | 会找资料、动手试、记录问题，也知道何时寻求帮助 |
| 理解与表达 | 能用自己的话说明概念、过程和选择 |
| 问题与想法 | 能发现真实需求，并提出有价值、范围合适的方案 |
| 实践与完成度 | 核心功能能运行，交付内容清楚，别人能够尝试 |
| 检查与责任 | 会验证 Agent 的产出，保护密钥和个人信息 |
| 复盘与成长 | 能说出困难、修改过程和下一步改进方向 |

**不会因为你暂时不会某条命令、某种语言或某个软件而直接否定你的表现。**如果你确实尝试了，请留下过程和判断，这些同样能帮助组织者了解你的学习方式。

---

## 四、建议组织者随题提供的资料

为了让考核真正起到引导学习的作用，建议配套准备以下材料：

- AI 核心概念视频和一页概念速读；
- Claude Code、CC Switch、DeepSeek 或 DeepSeek Harness 的安装配置图文；
- 按 Windows、macOS 分开的常见问题说明；
- GitHub、SSH、分支和提交树的入门资料；
- Skill 示例文件、Tool 设计模板、只读 MCP 起步工程和逐步连接说明；
- 项目需求模板、README 模板、AI 使用记录模板、.gitignore 示例；
- 可公开使用的模拟课表 Excel、活动报名表等样例数据；
- 一份“提交前检查清单”和常见报错说明；
- 如使用 DeepSeek API，建议提供测试额度或允许使用其他可用 Agent，不把学生是否能自行付费作为考核条件。

---

## 五、学习资料与工具入口

### AI 概念与 Agent

- [AI 核心概念串讲视频：从 LLM 到 Agent Skill（Bilibili）](https://www.bilibili.com/video/BV1E7wtzaEdq/)
- [Claude Code 中文概述与安装说明](https://code.claude.com/docs/zh-CN/overview)
- [Claude Code 命令说明](https://code.claude.com/docs/zh-CN/commands)
- [Claude Code Skills 指南](https://code.claude.com/docs/zh-CN/skills)
- [Claude Code MCP 指南](https://code.claude.com/docs/zh-CN/mcp)
- [MCP 官方入门介绍](https://modelcontextprotocol.io/docs/getting-started/intro)
- [DeepSeek 接入 Claude Code 官方指南](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/)
- [DeepSeek Harness 与 API 入门资料](https://api-docs.deepseek.com/guides/harness)

### 安装配置工具

- [CC Switch 官网](https://ccswitch.io/zh/)
- [CC Switch GitHub Releases](https://github.com/farion1231/cc-switch/releases)
- [DeepSeek 开放平台](https://platform.deepseek.com/)
- [Node.js 官网](https://nodejs.org/)（仅在所选安装方式需要 Node.js/npm 时使用）
- [Watt Toolkit 项目页](https://github.com/BeyondDimension/SteamTools)（可选网络工具；请遵守所在网络的使用规定，不作为考核要求）

### Git 与 GitHub

- [Git 入门视频：Git & GitHub 实战（Bilibili）](https://www.bilibili.com/video/BV1KarSY8E8v/)
- [GitHub：创建一个仓库](https://docs.github.com/en/get-started/start-your-journey/creating-a-repository-for-your-project-on-github)
- [GitHub：通过 SSH 连接](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [GitHub：管理远端仓库](https://docs.github.com/en/get-started/git-basics/managing-remote-repositories)
- [Pro Git 中文版](https://git-scm.com/book/zh/v2)

> 安装方式、命令名称、模型和配置项会随工具更新。请以工具当前官方文档和本次随附的操作说明为准；不要把 API Key 发给组织者或放进仓库。

---

## 六、最终提交清单

请确认个人答题资料中包含：

- [ ] 姓名和学号；
- [ ] AI 基础概念图与场景说明；
- [ ] AI 聊天、工作流、Agent 与工程方法的比较；
- [ ] Agent 安装、运行与命令探索记录；
- [ ] Skill 文件、Tool 设计和 MCP 学习记录；
- [ ] GitHub 仓库、Git 操作和分支练习；
- [ ] 本地仓库、远端仓库与分支关系图；
- [ ] 实战项目计划、作品、运行说明和验证记录；
- [ ] 作品复盘；
- [ ] 没有 API Key、密码或未经授权的个人信息。

**感谢你认真完成这段学习旅程。我们期待看到的不是一个“完美答案”，而是你如何学习、思考、尝试，并把想法一步步做出来。**
`;function F(n){return n.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]??e)}function L(n){const e=[];let t=F(n).replace(/`([^`]+)`/g,(s,i)=>{const a=`\0CODE${e.length}\0`;return e.push(`<code>${i}</code>`),a});return t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noreferrer">$1</a>'),t=t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),t=t.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g,"$1<em>$2</em>"),t.replace(/\u0000CODE(\d+)\u0000/g,(s,i)=>e[Number(i)]??"")}function nn(n){return n.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(e=>e.trim())}function fn(n){return/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(n)}function X(n){return/^\s*[-*+]\s+/.test(n)}function V(n){return/^\s*\d+[.)]\s+/.test(n)}function bn(n,e){const t=n[e]??"";return/^```/.test(t)||/^#{1,6}\s/.test(t)||/^>/.test(t)||/^!\[[^\]]*\]\(\/assets\/[^)\s]+\)\s*$/.test(t)||X(t)||V(t)||/^\s*\|/.test(t)||/^\s*(---+|\*\*\*+)\s*$/.test(t)}function An(n){const e=n.replace(/<[^>]*>/g,"").trim();return e==="任务"?" md-heading--task":e==="我们希望看到"?" md-heading--expectation":e==="核心考察"?" md-heading--assessment":e.includes("安全提醒")?" md-heading--safety":e.includes("提交内容")?" md-heading--submission":e.includes("阅读导读")||e==="导读"?" md-heading--reading":""}function b(n){var i;const e=n.replace(/\r\n?/g,`
`).split(`
`),t=[];let s=0;for(;s<e.length;){const a=e[s]??"";if(!a.trim()){s+=1;continue}if(a.startsWith("```")){const c=[];for(s+=1;s<e.length&&!e[s].startsWith("```");)c.push(e[s++]);s<e.length&&(s+=1),t.push(`<pre><code>${F(c.join(`
`))}</code></pre>`);continue}const r=a.match(/^!\[([^\]]*)\]\((\/assets\/[^)\s]+)\)\s*$/);if(r){t.push(`<figure class="md-figure"><img src="${F(r[2])}" loading="lazy" decoding="async" alt="${F(r[1])}"></figure>`),s+=1;continue}const d=a.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);if(d){const c=Math.min(Number(d[1].length)+1,6),o=L(d[2]);t.push(`<h${c} class="md-heading${An(o)}">${o}</h${c}>`),s+=1;continue}if(s+1<e.length&&/^\s*\|/.test(a)&&fn(e[s+1])){const c=nn(a);s+=2;const o=[];for(;s<e.length&&/^\s*\|/.test(e[s]);)o.push(nn(e[s++]));t.push(`<div class="md-table-wrap"><table><thead><tr>${c.map(m=>`<th>${L(m)}</th>`).join("")}</tr></thead><tbody>${o.map(m=>`<tr>${c.map((h,H)=>`<td>${L(m[H]??"")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);continue}if(/^>\s?/.test(a)){const c=[];for(;s<e.length&&/^>\s?/.test(e[s]);)c.push(L(e[s++].replace(/^>\s?/,"")));t.push(`<blockquote>${c.map(o=>`<p>${o}</p>`).join("")}</blockquote>`);continue}if(X(a)||V(a)){const c=V(a),o=c?Number(((i=a.match(/^\s*(\d+)/))==null?void 0:i[1])??1):1,m=[];for(;s<e.length&&(c?V(e[s]):X(e[s]));){const h=e[s++].replace(c?/^\s*\d+[.)]\s+/:/^\s*[-*+]\s+/,""),H=h.match(/^\[([ xX])\]\s+(.*)$/);m.push(H?`<li class="md-checkbox"><span aria-hidden="true">${H[1].trim()?"☑":"☐"}</span>${L(H[2])}</li>`:`<li>${L(h)}</li>`)}t.push(c?`<ol start="${o}">${m.join("")}</ol>`:`<ul>${m.join("")}</ul>`);continue}if(/^\s*(---+|\*\*\*+)\s*$/.test(a)){t.push("<hr>"),s+=1;continue}const u=[a.trim()];for(s+=1;s<e.length&&e[s].trim()&&!bn(e,s);)u.push(e[s++].trim());t.push(`<p>${u.map(L).join("<br>")}</p>`)}return t.join(`
`)}function Sn(n){const e=[...n.matchAll(/^### 第\s*(\d+)\s*题：[^\n]*\n/gm)],t=new Map;return e.forEach((s,i)=>{var c;const a=s.index+s[0].length,r=((c=e[i+1])==null?void 0:c.index)??n.length,d=n.indexOf(`
## `,a),u=d>=0?Math.min(r,d):r;t.set(`Q${String(Number(s[1])).padStart(2,"0")}`,n.slice(a,u).trim())}),t}function yn(n,e){const t=n.indexOf(e);if(t<0)return"";const s=n.indexOf(`
`,t)+1,i=n.indexOf(`
## `,s);return n.slice(s,i<0?n.length:i).trim()}function wn(n){const e=n.indexOf("## 一、我们为什么这样设计考核");if(e<0)return"";const t=n.indexOf(`
`,e)+1,s=n.indexOf("### 推荐闯关顺序",t);return n.slice(t,s<0?n.length:s).trim()}function $n(n){const e=n.indexOf(`
## 一、我们为什么这样设计考核`);return e<0?"":n.slice(0,e).replace(/^# [^\n]*\n/,"").trim()}function In(n){return["## 二、作答与提交说明","## 三、我们如何看待你的表现","## 四、建议组织者随题提供的资料","## 五、学习资料与工具入口","## 六、最终提交清单"].map(t=>yn(n,t)).filter(Boolean)}function vn(n){const e=/^#### (阅读导读[^\n]*|导读)\s*$/m.exec(n),t=/^#### 任务\s*$/m.exec(n);return!e||!t||t.index<=e.index?{reading:"",task:n}:{reading:n.slice(e.index+e[0].length,t.index).trim(),task:n.slice(0,e.index)+n.slice(t.index)}}async function T(n,e){let t;try{t=await fetch(n,{...e,headers:{"Content-Type":"application/json",...e.headers}})}catch{throw new Error("无法连接本机服务。请确认启动窗口仍在运行，再刷新页面。")}const s=await t.json().catch(()=>({}));if(!t.ok)throw new Error(s.error??"本机保存失败，请稍后重试。");return s}function Cn(n,e){return T("/api/profile",{method:"POST",body:JSON.stringify({name:n,studentId:e})})}function xn(){return T("/api/profiles",{method:"GET"})}function kn(n){const e=new URLSearchParams({name:n.name,studentId:n.studentId});return T(`/api/profile?${e.toString()}`,{method:"GET"})}function Hn(n,e,t){return T(`/api/answers/${encodeURIComponent(e)}`,{method:"PUT",body:JSON.stringify({name:n.name,studentId:n.studentId,fields:t})})}async function Ln(n,e,t){const s=new FormData;s.append("name",n.name),s.append("studentId",n.studentId),s.append("file",t,t.name);let i;try{i=await fetch(`/api/attachments/${encodeURIComponent(e)}`,{method:"POST",body:s})}catch{throw new Error("无法连接本机服务。请确认启动窗口仍在运行，再重试。")}const a=await i.json().catch(()=>({}));if(!i.ok||!a.attachment)throw new Error(a.error??"附件保存失败，请重试。");return a.attachment}function Gn(n,e,t){return T(`/api/files/${encodeURIComponent(e)}`,{method:"DELETE",body:JSON.stringify({name:n.name,studentId:n.studentId,filename:t})})}function En(n){const e=new URLSearchParams({name:n.name,studentId:n.studentId});return T(`/api/submission/files?${e.toString()}`,{method:"GET"})}function Tn(n){return T("/api/submission/open",{method:"POST",body:JSON.stringify({name:n.name,studentId:n.studentId})})}const f=document.querySelector("#app");if(!f)throw new Error("找不到页面挂载节点 #app");const g=hn,tn=Sn(B);if(g.questions.length!==11||g.phases.length!==3||tn.size!==11)throw new Error("考核题库结构异常：需要三个阶段和完整的 11 道题目。");const S=new Map(g.questions.map(n=>[n.id,n])),jn=new Map(g.phases.map(n=>[n.id,n])),j=new Map,G=new Map,I=new Map,$=new Map,_=new Map;let A=null,p=null,D=[],C=null,q=!1,y="",R=!1,O=null,k="",P="exam",w=!1,N=!1;function l(n){return n.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]??e)}function K(n){let e=j.get(n);return e||(e={},j.set(n,e)),e}function Y(n){return[/sk-(?:ant-)?[A-Za-z0-9_-]{16,}/i,/gh[pousr]_[A-Za-z0-9]{20,}/,/AIza[0-9A-Za-z_-]{30,}/,/AKIA[0-9A-Z]{16}/,/(?:api[_ -]?key|password|secret|密钥|密码)\s*[:=：]\s*["']?[A-Za-z0-9_./+=-]{8,}/i].some(e=>e.test(n))}function sn(n){return Object.values(n??{}).some(e=>e.trim().length>0)}function _n(n){var e;return(((e=C==null?void 0:C.questions.find(t=>t.id===n))==null?void 0:e.files.length)??0)>0}function E(n){return sn(G.get(n))||_n(n)}function en(n){return JSON.stringify(Object.fromEntries(Object.entries(n??{}).sort(([e],[t])=>e.localeCompare(t))))}function M(n){var e;return en(j.get(n))!==en(G.get(n))||(((e=I.get(n))==null?void 0:e.length)??0)>0}function U(n){const e=$.get(n);return e==="saving"||e==="error"||e==="review-required"?e:M(n)?"dirty":E(n)?"saved":"empty"}function W(n){return{empty:"未提交",dirty:"有修改","review-required":"检查内容",saving:"提交中",saved:"已提交",error:"提交失败"}[n]}function Z(n){return n==="saved"?"is-saved":n==="dirty"||n==="saving"||n==="review-required"?"is-pending":n==="error"?"is-error":""}function Q(){return g.questions.filter(n=>E(n.id)).length}function an(n){var e;p=n.profile,C=n.fileTree,j.clear(),G.clear(),I.clear();for(const t of g.questions){const s=n.answers[t.id]??{};j.set(t.id,{...s}),G.set(t.id,{...s}),sn(s)||(e=n.attachments[t.id])!=null&&e.length?$.set(t.id,"saved"):$.set(t.id,"empty")}}function z(n=!1){R=n;const e=n?(p==null?void 0:p.name)??"":"",t=n?(p==null?void 0:p.studentId)??"":"";f.innerHTML=`
    <main class="identity-gate">
      <section class="identity-panel" aria-labelledby="identity-title">
        <a class="brand" href="#" aria-label="深蓝科技部 AI Agent 应用考核">
          <span class="brand__seal" aria-hidden="true">深</span>
          <span class="brand__text"><strong>深蓝科技部 AI Agent 应用考核</strong><small>APPLICATION ASSESSMENT</small></span>
        </a>
        <h1 id="identity-title">${n?"修改身份":"首次登记"}</h1>
        <form class="identity-form" data-profile-form>
          <label>姓名<input name="name" autocomplete="name" maxlength="48" required placeholder="请输入姓名" value="${l(e)}"></label>
          <label>学号<input name="studentId" autocomplete="off" maxlength="48" required placeholder="请输入学号" value="${l(t)}"></label>
          <p class="identity-path" data-profile-message role="status" aria-live="polite">${l(y||(n?"更换后使用对应本机目录；原目录和答案保留不动。":"提交文件保存在本机：提交资料/姓名_学号"))}</p>
          <div class="identity-form__actions">
            <button class="button button--primary" type="submit" ${q?"disabled":""}>
              ${q?"正在读取资料…":n?"切换身份":"进入答题"}
            </button>
            ${n?'<button class="button button--quiet" type="button" data-cancel-identity>取消</button>':""}
          </div>
        </form>
      </section>
    </main>`}function Mn(n){const e=n.map(t=>`
    <button class="profile-option" type="button" data-use-profile data-name="${l(t.name)}" data-student-id="${l(t.studentId)}">
      <span class="identity-avatar" aria-hidden="true">${l(t.name.slice(0,1))}</span>
      <span><strong>${l(t.name)}</strong><small>${l(t.studentId)}</small></span>
      <span class="profile-option__arrow" aria-hidden="true">→</span>
    </button>`).join("");f.innerHTML=`
    <main class="identity-gate">
      <section class="identity-panel" aria-labelledby="identity-title">
        <a class="brand" href="#" aria-label="深蓝科技部 AI Agent 应用考核">
          <span class="brand__seal" aria-hidden="true">深</span>
          <span class="brand__text"><strong>深蓝科技部 AI Agent 应用考核</strong><small>APPLICATION ASSESSMENT</small></span>
        </a>
        <h1 id="identity-title">选择本机资料</h1>
        <div class="profile-list">${e}</div>
        <button class="text-button profile-add" type="button" data-new-profile>使用其他身份</button>
      </section>
    </main>`}function J(n=""){f.innerHTML=`
    <main class="identity-gate">
      <section class="identity-panel" aria-labelledby="identity-title" aria-live="polite">
        <a class="brand" href="#" aria-label="深蓝科技部 AI Agent 应用考核">
          <span class="brand__seal" aria-hidden="true">深</span>
          <span class="brand__text"><strong>深蓝科技部 AI Agent 应用考核</strong><small>APPLICATION ASSESSMENT</small></span>
        </a>
        <h1 id="identity-title">${n?"无法读取本机资料":"正在读取本机资料…"}</h1>
        <p class="identity-path">${l(n||"正在扫描本机提交目录。")}</p>
        ${n?'<button class="button button--primary" type="button" data-retry-profiles>重试</button>':'<span class="identity-loading" role="status">请稍候</span>'}
      </section>
    </main>`}function ln(n){y="",J();const e=p==null?void 0:p.directoryName;kn(n).then(t=>{an(t),D=[t.profile,...D.filter(s=>s.directoryName!==t.profile.directoryName)],k=e&&e!==t.profile.directoryName?`已切换到 ${t.profile.directoryName}；原目录和答案保留不动。`:"",v()}).catch(t=>{y=t instanceof Error?t.message:"无法读取本机资料，请重试。",J(y)})}function on(){y="",J(),xn().then(({profiles:n})=>{D=n,n.length===0?z():n.length===1?ln(n[0]):Mn(n)}).catch(n=>{y=n instanceof Error?n.message:"无法读取本机资料，请重试。",J(y)})}function Pn(){const n=g.phases.map((e,t)=>{const i=e.questionIds.map(a=>S.get(a)).filter(a=>!!a).map(a=>{const r=U(a.id),d=g.questions.findIndex(c=>c.id===a.id)+1,u=`${d} ${a.shortTitle}，${W(r)}`;return`<button type="button" class="exam-number ${Z(r)}${A===a.id?" is-current":""}"
        data-question="${l(a.id)}" aria-label="${l(u)}"${A===a.id?' aria-current="step"':""}>
        <span>${String(d).padStart(2,"0")}</span>${r==="saved"?'<i aria-hidden="true">✓</i>':""}
      </button>`}).join("");return`<section class="exam-phase exam-phase--${e.tone}"><h3><span>0${t+1}</span>${l(e.title)}</h3><div class="exam-grid">${i}</div></section>`}).join("");return`<section class="side-panel exam-panel" aria-labelledby="exam-title">
    <div class="side-panel__heading"><h2 id="exam-title">答题卡</h2><span>${Q()} / ${g.questions.length} 已提交</span></div>
    <div class="exam-phases">${n}</div>
    <div class="exam-legend"><span><i class="legend-empty"></i>未提交</span><span><i class="legend-dirty"></i>有修改</span><span><i class="legend-saved">✓</i>已提交</span></div>
  </section>`}function Nn(n,e){var s;const t=`删除 ${((s=S.get(n))==null?void 0:s.shortTitle)??n} 中的 ${e.name}`;return`<li class="file-row"><span class="file-glyph" aria-hidden="true">${e.name.toLowerCase().endsWith(".txt")?"TXT":"FILE"}</span>
    <span class="file-name" title="${l(e.name)}">${l(e.name)}</span>
    <button class="file-delete" type="button" data-delete-file data-question-id="${l(n)}" data-filename="${l(e.name)}" aria-label="${l(t)}">×</button></li>`}function qn(){if(!C)return'<p class="tree-empty">填写身份后显示你的提交文件。</p>';const n=C.rootFiles.map(s=>`<li class="file-row"><span class="file-glyph" aria-hidden="true">TXT</span><span class="file-name" title="${l(s.name)}">${l(s.name)}</span></li>`).join(""),e=new Map(C.questions.map(s=>[s.id,s])),t=g.phases.map((s,i)=>{const a=s.questionIds.map(r=>{const d=e.get(r);if(!d)return"";const u=S.get(r),c=d.files.length?d.files.map(o=>Nn(r,o)).join(""):'<li class="tree-empty tree-empty--small">暂无文件</li>';return`<details class="tree-directory"${A===r?" open":""}>
        <summary><span class="folder-icon" aria-hidden="true">▸</span><span>${l(r)} ${l((u==null?void 0:u.shortTitle)??d.directoryName)}</span><small>${d.files.length}</small></summary>
        <button class="tree-open-question" type="button" data-question="${l(r)}">打开本题</button>
        <ul>${c}</ul>
      </details>`}).join("");return`<section class="tree-phase tree-phase--${s.tone}"><h3><span>0${i+1}</span>${l(s.title)}</h3>${a}</section>`}).join("");return`<div class="file-tree" aria-label="提交文件目录">
    <div class="tree-root"><span class="folder-icon" aria-hidden="true">▾</span><strong>${l(C.directoryName)}</strong></div>
    <ul class="tree-root-files">${n||'<li class="tree-empty tree-empty--small">暂无根目录文件</li>'}</ul>
    ${t}
  </div>`}function On(){return`<aside class="workspace-side" aria-label="答题状态和提交文件">
    <button class="support-collapse-button" type="button" data-toggle-support aria-expanded="true" aria-label="收起答题卡和提交文件" title="收起右侧工作区">›</button>
    <button class="support-compact" type="button" data-toggle-support aria-expanded="false" aria-label="展开答题卡和提交文件">
      <span aria-hidden="true">‹</span><strong data-compact-progress>${Q()}/${g.questions.length}</strong><small>答题卡</small>
    </button>
    <div class="side-tabs" role="tablist" aria-label="侧栏内容">
      <button type="button" role="tab" aria-selected="${P==="exam"}" data-side-tab="exam">答题卡</button>
      <button type="button" role="tab" aria-selected="${P==="files"}" data-side-tab="files">提交文件</button>
    </div>
    <div class="side-panels">
      <div class="side-tab-panel${P==="files"?" is-mobile-hidden":""}" data-side-panel="exam">${Pn()}</div>
      <div class="side-tab-panel${P==="exam"?" is-mobile-hidden":""}" data-side-panel="files">
        <section class="side-panel file-panel" aria-labelledby="files-title">
          <div class="side-panel__heading"><h2 id="files-title">提交文件</h2><button type="button" class="text-button" data-open-directory>打开文件夹</button></div>
          <p class="directory-path">提交资料/${l((p==null?void 0:p.directoryName)??"")}</p>
          ${qn()}
          <p class="directory-message" role="status" data-directory-message>${l(k)}</p>
        </section>
      </div>
    </div>
  </aside>`}function rn(n){f.innerHTML=`<div class="app-shell${w?" is-nav-collapsed":""}${N?" is-support-collapsed":""}">
    <header class="topbar">
      <button class="rail-toggle" type="button" data-toggle-nav aria-expanded="${!w}" aria-label="${w?"展开左侧导航":"收起左侧导航"}" title="${w?"展开左侧导航":"收起左侧导航"}">${w?"›":"‹"}</button>
      <div class="topbar__left">
        <button class="brand" type="button" data-home>
          <span class="brand__seal" aria-hidden="true">深</span>
          <span class="brand__text"><strong>深蓝科技部 AI Agent 应用考核</strong><small>APPLICATION ASSESSMENT</small></span>
        </button>
        <nav class="project-links" aria-label="项目链接">
          <a href="https://github.com/NeilBaumanMax/ShenlanLab_examination" target="_blank" rel="noopener noreferrer">项目仓库 <span aria-hidden="true">↗</span></a>
          <a href="https://github.com/NeilBaumanMax" target="_blank" rel="noopener noreferrer">作者 GitHub <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
      <div class="topbar__identity"><span class="identity-avatar" aria-hidden="true">${l((p==null?void 0:p.name.slice(0,1))??"")}</span>
        <span>${l((p==null?void 0:p.name)??"")} <small>${l((p==null?void 0:p.studentId)??"")}</small></span>
        <button class="text-button" type="button" data-edit-profile>修改身份</button>
      </div>
    </header>
    <div class="workbench"><main class="workspace" id="main-content">${n}</main>${On()}</div>
  </div>`}function v(){const n=g.phases.map((r,d)=>{const u=r.questionIds.map(c=>{const o=S.get(c);return`<button class="phase-question" type="button" data-question="${l(c)}"><span>${c.slice(1)}</span>${l(o.shortTitle)}<b aria-hidden="true">→</b></button>`}).join("");return`<section class="phase-card phase-card--${r.tone}">
      <div class="phase-card__heading"><span class="phase-card__number">0${d+1}</span><div><h3>${l(r.title)}</h3><p>${l(r.summary)}</p></div><span class="phase-card__count">${r.questionIds.length} 题</span></div>
      <div class="phase-card__questions">${u}</div>
    </section>`}).join(""),e=g.questions.find(r=>!E(r.id))??g.questions[0],t=In(B),s=["作答与提交说明","我们如何看待你的表现","建议组织者随题提供的资料","学习资料与工具入口","最终提交清单"],i=`<details class="overview-details"><summary>考核方式、对象与目的</summary><div class="overview-details__content">${b($n(B))}</div></details>`,a=t.map((r,d)=>`<details class="overview-details"><summary>${s[d]??"补充说明"}</summary><div class="overview-details__content">${b(r)}</div></details>`).join("");rn(`<section class="home-heading">
    <p class="eyebrow">AI Agent 应用考核</p>
    <h1>从认识 AI 到完成自己的作品</h1>
    <p>自主学习，动手实践。无需预先会编程；使用 AI 没有问题，关键是理解并核对自己的提交。</p>
    <button class="button button--primary" type="button" data-question="${l(e.id)}">${Q()?"继续答题":"从第 1 题开始"} <span aria-hidden="true">→</span></button>
  </section>
  <section class="overview-intro">${b(wn(B))}</section>
  <section class="route-overview" aria-labelledby="route-heading"><div class="route-overview__heading"><div><p class="eyebrow">3 个阶段 · 11 道题</p><h2 id="route-heading">学习路线</h2></div><span>可随时跳转与回看</span></div><div class="phase-list">${n}</div></section>
  <section class="overview-extra"><h2>考核说明</h2>${i}${a}</section>
  <p class="privacy-note">答案保存在本机。完成后请打开个人提交目录，手动压缩并按组织者提供的信息发送。</p>`)}function Dn(n,e){if(n.id==="Q01"){const t=["- 大语言模型（LLM）","- Token","- 上下文（Context）","- 提示词（Prompt）","- 工具（Tool）","- Skill","- MCP","- AI Agent"].join(`
`),s=e.indexOf(t);if(s<0)return b(e);const i=s+t.length;return`${b(e.slice(0,s))}
      <div class="q01-concept-layout">
        <div class="q01-concept-list">${b(t)}</div>
        <figure class="q01-concept-figure">
          <img src="/assets/q01-ai-agent-concepts.jpg" width="1536" height="1024" decoding="async" alt="AI Agent 核心概念图，展示 LLM、Prompt、Token、上下文、工具、Skill 与 MCP 等概念之间的联系">
        </figure>
      </div>
      ${b(e.slice(i))}`}if(n.id==="Q03"){const t=e.indexOf(`
#### 任务`);return t<0?b(e):`${b(e.slice(0,t))}
      <figure class="q03-setup-figure">
        <img src="/assets/q03-claude-code-terminal.png" width="1430" height="732" loading="lazy" decoding="async" alt="macOS 终端中运行 Claude Code 的界面，显示模型信息、自动更新状态和认证配置提醒">
      </figure>
      ${b(e.slice(t))}`}if(n.id==="Q04"){const t=`
#### 任务

`,s=e.indexOf(t),i=s>=0?e.indexOf(`

`,s+t.length):-1;return i<0?b(e):`${b(e.slice(0,i))}
      <figure class="q04-command-figure">
        <img src="/assets/q04-claude-code-command-cheatsheet.jpg" width="1122" height="1402" loading="lazy" decoding="async" alt="Claude Code CLI 常用命令速查图，涵盖安装启动、会话管理、自动化模式、斜杠命令和使用建议">
      </figure>
      ${b(e.slice(i))}`}return b(e)}function Qn(n,e){if(n.id!=="Q02")return b(e);const t=e.lastIndexOf(`

`);return t<0?b(e):`${b(e.slice(0,t))}
    <figure class="q02-reading-figure">
      <img src="/assets/q02-ai-application-examples.jpg" width="1448" height="1086" loading="lazy" decoding="async" alt="AI 应用示例图，对比 AI 聊天机器人、固定 AI 工作流和 AI Agent 三种应用模式">
    </figure>
    ${b(e.slice(t))}`}function x(n){A=n.id;const e=jn.get(n.phaseId),t=g.questions.findIndex(h=>h.id===n.id)+1,s=K(n.id),i=(n.fields??[]).map(h=>`
    <label class="answer-field" for="${l(n.id)}-${l(h.id)}"><span>${l(h.label)}</span>
      <input id="${l(n.id)}-${l(h.id)}" type="${h.type==="url"?"url":"text"}" value="${l(s[h.id]??"")}"
        placeholder="${l(h.placeholder??"")}" data-answer-field="${l(h.id)}" data-question-id="${l(n.id)}">
    </label>`).join(""),a=U(n.id),r=I.get(n.id)??[],d=r.length?`<ul class="staged-files">${r.map((h,H)=>`<li><span>${l(h.name)}</span><button type="button" data-remove-staged="${H}" data-question-id="${l(n.id)}">移除</button></li>`).join("")}</ul>`:"",u=_.get(n.id)??"",c=a==="dirty"?"修改尚未提交":a==="saved"?"本题已提交；可修改后再次提交":"填写答案后点击提交本题",{reading:o,task:m}=vn(tn.get(n.id)??"题目内容暂缺，请检查题库文件。");rn(`<article class="question-view">
    <div class="question-heading">
      <div class="breadcrumbs"><button type="button" data-home>全部题目</button><span>/</span><span>${l((e==null?void 0:e.title)??"任务")}</span></div>
      <div class="question-heading__row"><div><p class="eyebrow">阶段 0${g.phases.indexOf(e)+1} · 第 ${t} 题</p><h1>${l(n.title)}</h1><p class="question-theme">${l(n.theme)}</p><a class="question-jump" href="#answer-form">跳到作答区 ↓</a></div><span class="question-index">${String(t).padStart(2,"0")}<i> / ${g.questions.length}</i></span></div>
    </div>
    <section class="question-content" aria-label="完整题目内容">
      ${o?`<details class="reading-guide" open><summary>阅读导读</summary><div>${Qn(n,o)}</div></details>`:""}
      ${Dn(n,m)}
    </section>
    <form id="answer-form" class="answer-form" data-answer-form data-question-id="${l(n.id)}" autocomplete="off">
      <div class="answer-form__heading"><h2>我的答案</h2><span class="save-state ${Z(a)}" data-current-state role="status">${W(a)}</span></div>
      ${i}
      <label class="answer-field" for="answer-${l(n.id)}"><span>${l(n.answerLabel)}</span>
        <textarea id="answer-${l(n.id)}" rows="7" data-answer-field="answer" data-question-id="${l(n.id)}" placeholder="${l(n.placeholder)}">${l(s.answer??"")}</textarea>
      </label>
      <div class="attachment-box"><div><strong>添加图片或文件</strong><span>单个文件不超过 50 MB</span></div>
        <label class="button button--secondary upload-button">选择文件<input type="file" multiple accept="${l(n.allowedExtensions.join(","))}" data-staged-files="${l(n.id)}"></label>
        ${d}
      </div>
      <p class="form-message" data-form-message role="status">${l(u||c)}</p>
      <p class="form-warning" data-credential-warning>不要提交 API Key、密码或私人信息。</p>
      <div class="answer-actions"><button class="button button--primary" type="submit" data-submit-question ${O===n.id?"disabled":""}>${O===n.id?"正在提交…":"提交本题"}</button>
        <span>可再次修改并提交覆盖</span></div>
    </form>
    <nav class="question-pager" aria-label="题目导航">
      <button class="button button--secondary" type="button" data-step="-1"${t===1?" disabled":""}>← 上一题</button>
      <button class="button button--secondary" type="button" data-step="1">${t===g.questions.length?"回到题目列表":"下一题 →"}</button>
    </nav>
  </article>`)}async function dn(){if(!p)return;C=(await En(p)).fileTree}function cn(n){const e=U(n),t=f.querySelector("[data-current-state]");A===n&&t&&(t.className=`save-state ${Z(e)}`.trim(),t.textContent=W(e)),f.querySelectorAll(".exam-number[data-question]").forEach(a=>{var c;const r=a.dataset.question??"",d=U(r),u=g.questions.findIndex(o=>o.id===r)+1;a.className=`exam-number ${Z(d)}${r===A?" is-current":""}`.trim(),a.setAttribute("aria-label",`${u} ${((c=S.get(r))==null?void 0:c.shortTitle)??r}，${W(d)}`),a.innerHTML=`<span>${String(u).padStart(2,"0")}</span>${d==="saved"?'<i aria-hidden="true">✓</i>':""}`});const s=f.querySelector(".side-panel__heading span");s&&(s.textContent=`${Q()} / ${g.questions.length} 已提交`);const i=f.querySelector("[data-compact-progress]");i&&(i.textContent=`${Q()}/${g.questions.length}`)}function un(n){const e=K(n),t=f.querySelector("[data-credential-warning]"),s=Y(Object.values(e).join(`
`));t&&(t.textContent=s?"检测到疑似密钥或密码。请删除或打码后再提交；仅在本机检查。":"不要提交 API Key、密码或私人信息。",t.classList.toggle("is-warning",s)),$.set(n,s?"review-required":M(n)?"dirty":E(n)?"saved":"empty");const i=f.querySelector("[data-form-message]");i&&!_.has(n)&&(i.textContent=s?"请检查敏感内容后再提交。":M(n)?"修改尚未提交":E(n)?"本题已提交；可修改后再次提交":"填写答案后点击提交本题"),cn(n)}async function zn(n,e){if(!p||O)return;const t={...K(n.id)};if(Y(Object.values(t).join(`
`))){$.set(n.id,"review-required"),un(n.id);return}const s=[...I.get(n.id)??[]];for(const d of s)if([".txt",".md"].includes(d.name.slice(d.name.lastIndexOf(".")).toLowerCase())&&Y(await d.text())&&!window.confirm(`${d.name} 可能包含密钥或密码。仍要保存到本机吗？`))return;O=n.id,$.set(n.id,"saving");const i=e.querySelector("[data-form-message]");i&&(i.textContent="正在保存本题文件…");const a=e.querySelector("[data-submit-question]");a&&(a.disabled=!0,a.textContent="正在提交…"),cn(n.id);let r=0;try{await Hn(p,n.id,t),G.set(n.id,{...t});for(const d of s){await Ln(p,n.id,d);const u=(I.get(n.id)??[]).filter(c=>c!==d);I.set(n.id,u),r+=1}await dn(),$.set(n.id,"saved"),_.delete(n.id),k="文件列表已更新。"}catch(d){$.set(n.id,"error");const u=d instanceof Error?d.message:"提交失败，请重试。";_.set(n.id,r?`答案已保存，部分文件未提交：${u}`:u)}finally{O=null,A===n.id?x(n):v()}}function Kn(n,e){var t;return e==="回答.txt"?"answer":((t=(n.fields??[]).find(s=>(s.id==="repository"?"GitHub仓库链接.txt":`${s.label.replace(/[^\p{L}\p{N} _()·-]/gu,"")}.txt`)===e))==null?void 0:t.id)??null}async function Bn(n,e){if(!(!p||!window.confirm(`删除 ${e}？此操作无法撤销。`))){try{await Gn(p,n,e);const t=S.get(n),s=t?Kn(t,e):null;s&&(j.set(n,{...K(n),[s]:""}),G.set(n,{...G.get(n)??{},[s]:""})),await dn(),$.set(n,E(n)?"saved":"empty"),k=`${e} 已删除。`}catch(t){k=t instanceof Error?t.message:"无法删除文件。"}A?x(S.get(A)):v()}}f.addEventListener("submit",n=>{const e=n.target;if(e instanceof HTMLFormElement){if(n.preventDefault(),e.matches("[data-profile-form]")){const t=new FormData(e),s=String(t.get("name")??""),i=String(t.get("studentId")??""),a=R;if(a&&g.questions.some(u=>M(u.id))&&!window.confirm("切换身份会丢弃当前页面尚未提交的草稿，继续吗？"))return;q=!0,y="",z(a);const r=f.querySelector('input[name="name"]'),d=f.querySelector('input[name="studentId"]');r&&(r.value=s),d&&(d.value=i),Cn(s,i).then(u=>{an(u),D=[u.profile,...D.filter(c=>c.directoryName!==u.profile.directoryName)],k=a?`当前资料：${u.profile.directoryName}。原目录和答案保留不动。`:"资料已保存到本机提交目录。",R=!1,q=!1,v()}).catch(u=>{q=!1,y=u instanceof Error?u.message:"无法读取本机资料，请重试。",z(a);const c=f.querySelector("[data-profile-message]");c&&(c.textContent=y);const o=f.querySelector('input[name="name"]'),m=f.querySelector('input[name="studentId"]');o&&(o.value=s),m&&(m.value=i)});return}if(e.matches("[data-answer-form]")){const t=S.get(e.dataset.questionId??"");t&&zn(t,e)}}});f.addEventListener("input",n=>{const e=n.target;if(!(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement)||!e.matches("[data-answer-field]"))return;const t=e.dataset.questionId??"";K(t)[e.dataset.answerField??"answer"]=e.value,un(t)});f.addEventListener("change",n=>{const e=n.target;if(!(e instanceof HTMLInputElement)||!e.matches("[data-staged-files]"))return;const t=e.dataset.stagedFiles??"",s=S.get(t);if(!s)return;const i=new Set(s.allowedExtensions.map(d=>d.toLowerCase())),a=I.get(t)??[],r=[];for(const d of Array.from(e.files??[])){const u=d.name.lastIndexOf("."),c=u>=0?d.name.slice(u).toLowerCase():"";i.has(c)?d.size>g.uploadDefaults.maxFileBytes?r.push(`${d.name}：超过 50 MB。`):a.some(o=>o.name===d.name&&o.size===d.size)||a.push(d):r.push(`${d.name}：不支持此文件类型。`)}I.set(t,a),r.length?_.set(t,r.join(" ")):_.delete(t),$.set(t,M(t)?"dirty":E(t)?"saved":"empty"),A===t&&x(s)});f.addEventListener("click",n=>{const e=n.target;if(!(e instanceof Element))return;const t=e.closest("[data-toggle-nav]");if(t){w=!w;const o=t.closest(".app-shell");o==null||o.classList.toggle("is-nav-collapsed",w),t.setAttribute("aria-expanded",String(!w)),t.setAttribute("aria-label",w?"展开左侧导航":"收起左侧导航"),t.title=w?"展开左侧导航":"收起左侧导航",t.textContent=w?"›":"‹";return}const s=e.closest("[data-toggle-support]");if(s){N=!N;const o=s.closest(".app-shell");o==null||o.classList.toggle("is-support-collapsed",N),o==null||o.querySelectorAll("[data-toggle-support]").forEach(m=>{m.setAttribute("aria-expanded",String(!N))});return}if(e.closest("[data-retry-profiles]")){on();return}if(e.closest("[data-use-profile]")){const o=e.closest("[data-use-profile]");o!=null&&o.dataset.name&&o.dataset.studentId&&ln({name:o.dataset.name,studentId:o.dataset.studentId});return}if(e.closest("[data-new-profile]")){y="",z();return}if(e.closest("[data-edit-profile]")&&p){y="",z(!0);return}if(e.closest("[data-cancel-identity]")){y="",R=!1,v();return}const i=e.closest("[data-side-tab]");if(i){P=i.dataset.sideTab??"exam",A?x(S.get(A)):v();return}const a=e.closest("[data-delete-file]");if(a){Bn(a.dataset.questionId??"",a.dataset.filename??"");return}const r=e.closest("[data-open-directory]");if(r&&p){r.disabled=!0,Tn(p).then(o=>{k=`已打开 ${o.directoryName}`}).catch(o=>{k=o instanceof Error?o.message:"无法打开提交目录。"}).finally(()=>{A?x(S.get(A)):v()});return}const d=e.closest("[data-remove-staged]");if(d){const o=d.dataset.questionId??"",m=I.get(o)??[];m.splice(Number(d.dataset.removeStaged),1),I.set(o,m);const h=S.get(o);h&&A===o&&x(h);return}const u=e.closest("[data-step]");if(u&&A){const o=g.questions.findIndex(h=>h.id===A),m=g.questions[o+Number(u.dataset.step)];m?x(m):v(),window.scrollTo({top:0,behavior:"smooth"});return}const c=e.closest("[data-question]");if(c!=null&&c.dataset.question){const o=S.get(c.dataset.question);o&&x(o),window.scrollTo({top:0,behavior:"smooth"});return}e.closest("[data-home]")&&(A=null,v(),window.scrollTo({top:0,behavior:"smooth"}))});window.addEventListener("beforeunload",n=>{g.questions.some(t=>M(t.id))&&(n.preventDefault(),n.returnValue="")});try{window.localStorage.removeItem("shenlanlab.student-profile.v1")}catch{}on();
