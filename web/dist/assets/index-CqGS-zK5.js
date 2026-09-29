(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const L=[{id:"foundations",title:"AI 基础概念",summary:"把 Agent 相关术语连成一张能解释实际任务的概念图。",questionIds:["Q01","Q02"]},{id:"agent-tools",title:"安装并使用 AI Agent",summary:"在自己的项目目录中启动 Agent，并学会查资料和扩展能力。",questionIds:["Q03","Q04","Q05"]},{id:"version-control",title:"GitHub、提交历史和分支",summary:"用版本记录保存项目、表达修改，并保护敏感信息。",questionIds:["Q06","Q07","Q08"]},{id:"build-and-reflect",title:"Vibecoding 实战",summary:"从真实问题出发，完成一个小工具并对结果负责。",questionIds:["Q09","Q10"]}],T=[{id:"Q01",phaseId:"foundations",title:"AI 核心概念串讲",shortTitle:"AI 核心概念",theme:"先建立 Agent 工作方式的概念地图。",task:"观看指定概念视频，围绕 LLM、Token、Context、Prompt、Tool、MCP、Agent、Agent Skill，选择一个熟悉的学习或生活场景，用自己的话讲清这些概念如何配合。",expectation:"用具体例子解释概念之间的关系，不要只抄术语定义；可以用文字，也可以上传手绘图或概念图。",assessment:"理解概念、组织表达，以及把抽象概念联系到实际任务的能力。",outcome:"建立 Agent 工作方式的基本概念图。",answerType:"textarea",answerLabel:"我的概念串讲",placeholder:"选一个你熟悉的场景，按任务发生的顺序讲讲这些概念如何配合……",resources:[{label:"从 LLM 到 Agent Skill（Bilibili）",url:"https://www.bilibili.com/video/BV1E7wtzaEdq/"},{label:"MCP 官方入门",url:"https://modelcontextprotocol.io/docs/getting-started/intro"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]},{id:"Q02",phaseId:"foundations",title:"从聊天机器人到 Agent",shortTitle:"聊天机器人与 Agent",theme:"判断不同 AI 工作方式适合解决什么问题。",task:"比较 AI 聊天机器人、固定 AI 工作流和 AI Agent；说明提示词工程、上下文工程、Harness 工程分别主要解决什么问题。",expectation:"讲清不同方法的使用场景，并理解它们可以同时存在，不是简单的新旧替代关系。",assessment:"概括、比较和判断适用场景的能力。",outcome:"能按任务选择 AI 使用方式，而不是所有问题都只靠同一种聊天提示。",answerType:"textarea",answerLabel:"比较与场景判断",placeholder:"可以选择一个任务，分别判断三种方式是否合适，并说明原因……",resources:[{label:"Claude Code 文档：概览与工作方式",url:"https://code.claude.com/docs/en/overview"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]},{id:"Q03",phaseId:"agent-tools",title:"配置 AI Agent",shortTitle:"Agent 安装配置",theme:"让 Agent 在自己的项目目录里开始工作。",task:"根据资料安装 Claude Code CLI，使用 CC Switch 配置模型提供方（推荐 DeepSeek）；也可使用 DeepSeek Harness 或其他 AI Agent。进入自己的项目目录，让 Agent 阅读项目说明并回答项目当前状态。",expectation:"能按说明完成安装，知道 Agent 当前工作目录；遇到问题会根据报错查资料。截图中的密钥必须打码。",assessment:"工具配置、文档查找、基础排错和工作目录意识。",outcome:"能够在本机项目中启动一个 AI Agent。",answerType:"mixed",answerLabel:"安装与运行结果",fields:[{id:"method",label:"我使用的 Agent 与安装方式",type:"text",placeholder:"例如：Claude Code CLI，通过 npm 安装"},{id:"model",label:"配置的模型提供方",type:"text",placeholder:"例如：DeepSeek；不要填写 API Key"}],placeholder:"记录一次成功启动的结果，或遇到的问题和你采取的排查步骤……",resources:[{label:"Claude Code 安装文档",url:"https://code.claude.com/docs/en/getting-started"},{label:"CC Switch 官网",url:"https://ccswitch.io/"},{label:"DeepSeek Anthropic API 兼容说明",url:"https://api-docs.deepseek.com/guides/anthropic_api/"},{label:"Python 官方下载",url:"https://www.python.org/downloads/"},{label:"Node.js 官方下载",url:"https://nodejs.org/"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]},{id:"Q04",phaseId:"agent-tools",title:"CLI 基础命令",shortTitle:"CLI 命令",theme:"遇到新命令时，先会找到并读懂帮助。",task:"查阅你正在使用的 Agent 当前版本命令说明，选择 3 个实际使用过的命令，说明用途，并演示其中一个。",expectation:"会查看帮助文档，能解释命令对当前任务有什么帮助，不依赖死记。",assessment:"自主查阅、理解和使用 CLI 的能力。",outcome:"能够自行探索 Agent 的基本操作。",answerType:"textarea",answerLabel:"命令与演示",placeholder:"列出命令、用途和一个实际演示；粘贴命令前确认没有密钥或私人信息。",resources:[{label:"Claude Code CLI 命令参考",url:"https://code.claude.com/docs/en/cli-usage"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".txt",".md"]},{id:"Q05",phaseId:"agent-tools",title:"Skill、Tool 与 MCP",shortTitle:"Skill 与 MCP",theme:"理解 Agent 如何按需使用可复用指引和外部能力。",task:"在项目中编写一个解决具体重复任务的简单 Skill；连接一个提供的只读示例 MCP；说明 Tool、Skill、MCP 的不同，并提出自己想制作的 Tool 或 MCP 服务。",expectation:"能说清 Skill 解决的重复任务、MCP 连接的数据或能力，以及应该限制的权限。",assessment:"Agent 扩展方式的理解、动手能力和安全意识。",outcome:"能添加或创建 Skill、使用现成 MCP，并提出扩展思路。",answerType:"mixed",answerLabel:"Skill 与 MCP 实践",fields:[{id:"skill",label:"Skill 文件或链接",type:"text",placeholder:"本地路径或可访问的链接"}],placeholder:"说明 Skill 解决什么重复任务、MCP 能访问什么，以及你会怎样限制权限……",resources:[{label:"Claude Code Skills 文档",url:"https://code.claude.com/docs/en/skills"},{label:"Claude Code MCP 文档",url:"https://code.claude.com/docs/en/mcp"},{label:"MCP 官方入门",url:"https://modelcontextprotocol.io/docs/getting-started/intro"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]},{id:"Q06",phaseId:"version-control",title:"创建 GitHub 仓库并连接本地项目",shortTitle:"GitHub 与 SSH",theme:"让本地项目拥有可分享的远端版本记录。",task:"创建个人 GitHub 仓库，通过 SSH 连接，在本地克隆或关联仓库，完成一次提交并推送。",expectation:"能查看 Git 状态和远端地址，知道本地提交与 GitHub 远端仓库不是同一个位置。网络加速工具是可选帮助，不是门槛。",assessment:"GitHub 仓库、本地 Git 操作、SSH 和远端同步的基础能力。",outcome:"能把项目版本可靠地保存并分享。",answerType:"mixed",answerLabel:"仓库与操作记录",fields:[{id:"repository",label:"GitHub 仓库链接",type:"url",placeholder:"https://github.com/用户名/仓库名"}],placeholder:"记录你如何确认本地仓库与远端已连接，以及如何验证推送成功……",resources:[{label:"GitHub：创建仓库",url:"https://docs.github.com/en/get-started/start-your-journey/creating-a-repository-for-your-project-on-github"},{label:"GitHub：SSH 连接",url:"https://docs.github.com/en/authentication/connecting-to-github-with-ssh"},{label:"Pro Git 中文版",url:"https://git-scm.com/book/zh/v2"},{label:"Git & GitHub 实战入门（Bilibili）",url:"https://www.bilibili.com/video/BV1KarSY8E8v/"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".txt",".md"]},{id:"Q07",phaseId:"version-control",title:"画出 Git 提交树和分支关系",shortTitle:"提交树与分支",theme:"看懂文件从工作区进入提交，再同步到远端的路径。",task:"画出工作区、暂存区、本地仓库和 GitHub 远端仓库的关系；在图中表示 `add`、`commit`、`push`、`fetch`、`pull`；再画一个 `main` 与功能分支合并的提交历史示意图。",expectation:"形式不限，可以手绘、流程图或文字图；重点是关系正确。",assessment:"对提交记录、分支和本地/远端版本关系的理解。",outcome:"能读懂基本提交历史，并用分支记录独立功能修改。",answerType:"textarea",answerLabel:"关系图说明",placeholder:"可直接在这里用文字和代码块画图，也可以在下方上传图片或文档。",resources:[{label:"Pro Git：Git 分支",url:"https://git-scm.com/book/zh/v2/Git-分支-分支简介"},{label:"Git & GitHub 实战入门（Bilibili）",url:"https://www.bilibili.com/video/BV1KarSY8E8v/"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]},{id:"Q08",phaseId:"version-control",title:"安全和版本习惯",shortTitle:"安全与版本习惯",theme:"提交前想清楚哪些内容可以分享、记录应该表达什么。",task:"说明为什么 API Key、密码和隐私数据不应提交到 GitHub；用一段文字说明一次合理的小项目提交顺序。",expectation:"知道 `.gitignore` 的作用，提交记录能说明改了什么；不会为了“绿格子”提交无意义内容。",assessment:"版本管理习惯和基本信息安全意识。",outcome:"知道如何避免把敏感信息和无关文件放进仓库。",answerType:"textarea",answerLabel:"安全说明与提交顺序",placeholder:"描述你会检查哪些文件、如何拆分提交，以及发现密钥误提交后第一时间会做什么……",resources:[{label:"GitHub：敏感数据最佳实践",url:"https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning"},{label:"Pro Git 中文版",url:"https://git-scm.com/book/zh/v2"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".txt",".md"]},{id:"Q09",phaseId:"build-and-reflect",title:"选一个实际问题并完成小工具",shortTitle:"Vibecoding 实战",theme:"完成一次发现问题、拆分任务、实现和验证的闭环。",task:"使用 AI Agent 解决一个生活、学习或班级事务中的小问题。可以导入模拟课表后按班级、时间和教室查看课程，也可以整理模拟活动报名表或提出自己的问题。",expectation:"问题来自真实观察、项目范围可完成；至少有一个能运行的核心流程，页面清楚、操作易懂；能指出 Agent 的错误并检查结果。",assessment:"想法、需求表达、项目推进、审美、验证与复盘。",outcome:"完成“发现问题—拆分任务—Agent 辅助实现—实际验证—分享作品”的闭环。",answerType:"mixed",answerLabel:"作品提交与验证",fields:[{id:"repository",label:"GitHub 仓库链接（优先）",type:"url",placeholder:"https://github.com/用户名/仓库名"}],placeholder:"描述你解决的问题、核心功能、完成标准和验证结果。GitHub 链接或源码 ZIP 至少提交一种。",resources:[{label:"项目说明模板",url:"#materials-project-template"},{label:"AI 使用记录模板",url:"#materials-ai-log-template"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".zip",".txt",".md"]},{id:"Q10",phaseId:"build-and-reflect",title:"作品复盘",shortTitle:"作品复盘",theme:"为作品负责，也把一次实践变成下一次的经验。",task:"说明最初的想法、Agent 做了哪些工作、自己如何验证、遇到的一次问题和下一步改进方向。",expectation:"真实说明过程，不把 Agent 生成的内容都当作正确结果。",assessment:"责任意识、复盘能力和独立判断。",outcome:"能够为自己的作品负责，并从一次实践中总结方法。",answerType:"textarea",answerLabel:"我的复盘",placeholder:"可以从“最初想法 / Agent 的帮助 / 我做的验证 / 遇到的问题 / 下一步”依次写起……",resources:[{label:"AI 使用记录模板",url:"#materials-ai-log-template"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]}],P={phases:L,questions:T},r=document.querySelector("#app");if(!r)throw new Error("找不到页面挂载节点 #app");const d=P,f=new Map(d.questions.map(e=>[e.id,e])),Q=new Map(d.phases.map(e=>[e.id,e])),u=new Map,g=new Map;let h=null;function s(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]??t)}function A(e){let t=u.get(e);return t||(t={},u.set(e,t)),t}function S(){return[...u.values()].filter(e=>Object.values(e).some(t=>t.trim().length>0)).length}function w(e){return e.questionIds.filter(t=>{const n=u.get(t);return n&&Object.values(n).some(l=>l.trim().length>0)}).length}function E(){return d.phases.map(e=>{const t=e.questionIds.map(n=>{const l=f.get(n);if(!l)return"";const o=w(e)>0&&Object.values(u.get(n)??{}).some(p=>p.trim().length>0),i=h===n;return`
            <button class="route-link${i?" is-current":""}${o?" is-answered":""}"
              type="button" data-question="${s(n)}" ${i?'aria-current="page"':""}>
              <span class="route-link__marker" aria-hidden="true">${o?"✓":s(n.slice(1))}</span>
              <span>${s(l.shortTitle)}</span>
            </button>`}).join("");return`
        <section class="route-group" aria-label="${s(e.title)}">
          <div class="route-group__heading">
            <span>${s(e.title)}</span>
            <span class="route-group__count">${w(e)}/${e.questionIds.length}</span>
          </div>
          <div class="route-group__links">${t}</div>
        </section>`}).join("")}function C(e){const t=S();r.innerHTML=`
    <div class="app-shell">
      <aside class="route-rail" aria-label="学习路线">
        <a class="brand" href="#home" data-home>
          <span class="brand__seal" aria-hidden="true">深</span>
          <span class="brand__text"><strong>深蓝科技部</strong><small>AI AGENT QUEST</small></span>
        </a>
        <button class="route-home${h===null?" is-current":""}" type="button" data-home>
          <span class="route-home__symbol" aria-hidden="true">⌂</span>路线总览
        </button>
        <div class="route-rail__label">学习路线 <span>10 题</span></div>
        <nav class="route-nav">${E()}</nav>
        <div class="route-rail__foot">
          <div class="privacy-mark" aria-hidden="true">◉</div>
          <div><strong>答案留在本机</strong><span>本地保存 · 不上传</span></div>
        </div>
      </aside>

      <div class="app-main">
        <header class="topbar">
          <div class="topbar__context"><span class="topbar__dot"></span>本地学习空间</div>
          <div class="topbar__actions">
            <span class="topbar__progress">已填写 <strong>${t}</strong> / 10</span>
            <details class="identity-menu">
              <summary><span class="identity-avatar" aria-hidden="true">学</span><span>学生信息</span><span class="chevron" aria-hidden="true">⌄</span></summary>
              <div class="identity-menu__panel">
                <p>填写后，答题资料会保存在这台电脑。</p>
                <label>姓名<input name="studentName" autocomplete="name" placeholder="你的姓名"></label>
                <label>学号<input name="studentId" autocomplete="off" placeholder="你的学号"></label>
                <span class="save-note">学生信息保存在本地文件夹</span>
              </div>
            </details>
          </div>
        </header>
        <main class="workspace" id="main-content">${e}</main>
      </div>
    </div>`}function y(){var t;const e=d.phases.map((n,l)=>`
      <button class="phase-row" type="button" data-question="${s(n.questionIds[0]??"Q01")}">
        <span class="phase-row__number">0${l+1}</span>
        <span class="phase-row__copy"><strong>${s(n.title)}</strong><small>${s(n.summary)}</small></span>
        <span class="phase-row__count">${n.questionIds.length} 道任务</span>
        <span class="phase-row__arrow" aria-hidden="true">↗</span>
      </button>`).join("");C(`
    <section class="welcome-grid">
      <div class="welcome-copy">
        <p class="eyebrow"><span class="eyebrow__line"></span>新生招新 · 学习挑战</p>
        <h1>把好奇心，<br><span>变成能运行的作品。</span></h1>
        <p class="welcome-copy__body">从 AI 基础概念开始，亲手配置 Agent、理解 Git，再用它解决一个真实的小问题。按推荐路线学习，也可以随时跳到任何一题。</p>
        <div class="welcome-actions">
          <button class="button button--primary" type="button" data-question="Q01">从第一题开始 <span aria-hidden="true">→</span></button>
          <span class="welcome-actions__meta">4 个阶段 <i></i> 10 道任务 <i></i> 自由跳转</span>
        </div>
      </div>
      <aside class="welcome-note">
        <div class="welcome-note__top"><span class="welcome-note__icon" aria-hidden="true">↳</span><span>这次挑战的核心</span></div>
        <h2>会提问，也会验证。</h2>
        <p>可以使用 AI Agent 和学习资料。请检查它的结果，并用自己的话解释你做了什么、为什么这样做。</p>
        <div class="welcome-note__rule"><span class="rule-dot"></span>作品由你负责，过程可以复盘</div>
      </aside>
    </section>

    <section class="route-overview" aria-labelledby="route-heading">
      <div class="section-heading">
        <div><p class="section-kicker">推荐学习顺序</p><h2 id="route-heading">你的学习路线</h2></div>
        <span class="section-heading__hint">按顺序学习，或自由选择一关</span>
      </div>
      <div class="phase-list">${e}</div>
    </section>

    <section class="privacy-strip">
      <span class="privacy-strip__icon" aria-hidden="true">⌂</span>
      <p><strong>答题资料只保存在你的电脑</strong><span>重新开始前请打开同一份解压目录。完成后由你手动压缩提交资料并发送邮件。</span></p>
      <button class="text-button" type="button" data-checklist>查看提交方式 <span aria-hidden="true">→</span></button>
    </section>

    <dialog class="checklist-dialog" aria-labelledby="checklist-title">
      <form method="dialog"><button class="dialog-close" aria-label="关闭">×</button></form>
      <p class="section-kicker">提交资料</p><h2 id="checklist-title">完成后这样提交</h2>
      <ol><li>检查每题的答案与附件。</li><li>项目实战题提交 GitHub 链接或源码 ZIP。</li><li>点击“打开提交目录”，手动压缩自己的资料文件夹。</li><li>通过 QQ 邮箱发送给组织者。</li></ol>
      <p class="dialog-note">App 不会自动打包或发送邮件。源码 ZIP 建议排除依赖目录、构建缓存、密钥和私人数据。</p>
      <form method="dialog"><button class="button button--primary">知道了</button></form>
    </dialog>`),(t=r.querySelector("[data-checklist]"))==null||t.addEventListener("click",()=>{var n;(n=r.querySelector(".checklist-dialog"))==null||n.showModal()})}function v(e){var x,k,$;const t=Q.get(e.phaseId),n=A(e.id),l=t?d.phases.findIndex(a=>a.id===t.id)+1:1,o=d.questions.findIndex(a=>a.id===e.id)+1,i=e.resources.map(a=>{const c=a.url.startsWith("https://")||a.url.startsWith("http://");return`<a class="resource-link" href="${s(a.url)}" ${c?'target="_blank" rel="noreferrer"':""}>
        <span class="resource-link__mark" aria-hidden="true">${c?"↗":"↳"}</span>${s(a.label)}
      </a>`}).join(""),p=(e.fields??[]).map(a=>`
      <label class="answer-field" for="${s(e.id)}-${s(a.id)}">
        <span>${s(a.label)}</span>
        <input id="${s(e.id)}-${s(a.id)}" name="${s(a.id)}" type="${a.type==="url"?"url":"text"}"
          value="${s(n[a.id]??"")}" placeholder="${s(a.placeholder??"")}" data-answer-field="${s(a.id)}">
      </label>`).join(""),_=g.get(e.id)??[],j=e.allowedExtensions.join(",");C(`
    <div class="question-heading">
      <div class="breadcrumbs"><button type="button" data-home>路线总览</button><span>/</span><span>${s((t==null?void 0:t.title)??"学习任务")}</span></div>
      <div class="question-heading__row">
        <div><p class="eyebrow"><span class="eyebrow__line"></span>阶段 ${l} · 任务 ${String(o).padStart(2,"0")}</p>
          <h1>${s(e.title)}</h1><p class="question-heading__theme">${s(e.theme)}</p></div>
        <span class="question-index">${String(o).padStart(2,"0")}<i> / 10</i></span>
      </div>
    </div>
    <div class="question-layout">
      <article class="question-document">
        <section class="document-section document-section--resources">
          <div class="document-section__heading"><span class="section-icon" aria-hidden="true">↗</span><h2>学习材料</h2></div>
          <div class="resource-list">${i||'<span class="quiet-copy">本题暂无外部资料。</span>'}</div>
        </section>
        <section class="document-section">
          <div class="document-section__heading"><span class="section-icon" aria-hidden="true">◎</span><h2>题目任务</h2></div>
          <p class="document-copy">${s(e.task)}</p>
        </section>
        <section class="document-section document-section--soft">
          <div class="document-section__heading"><span class="section-icon" aria-hidden="true">✳</span><h2>我的期待</h2></div>
          <p class="document-copy">${s(e.expectation)}</p>
        </section>
        <div class="two-notes">
          <section class="document-section document-section--compact">
            <div class="document-section__heading"><span class="small-rule"></span><h2>核心考察</h2></div>
            <p class="document-copy">${s(e.assessment)}</p>
          </section>
          <section class="document-section document-section--compact">
            <div class="document-section__heading"><span class="small-rule small-rule--pale"></span><h2>能力收获</h2></div>
            <p class="document-copy">${s(e.outcome)}</p>
          </section>
        </div>
        <form class="answer-form" autocomplete="off">
          <div class="answer-form__heading"><div><p class="section-kicker">本题作答</p><h2>我的回答</h2></div>
            <span class="save-state" data-save-state><span class="save-state__dot"></span>未开始</span></div>
          ${p}
          <label class="answer-field" for="answer-${s(e.id)}"><span>${s(e.answerLabel)}</span>
            <textarea id="answer-${s(e.id)}" name="answer" rows="7" data-answer-field="answer" placeholder="${s(e.placeholder)}">${s(n.answer??"")}</textarea>
          </label>
          <div class="attachment-box">
            <div><strong>添加附件</strong><span>单个文件不超过 50 MB。不会自动打开或运行附件。</span></div>
            <label class="button button--secondary upload-button">选择文件<input type="file" multiple accept="${s(j)}" data-attachments></label>
            <ul class="attachment-list">${_.map(a=>`<li>${s(a)}<button type="button" aria-label="移除 ${s(a)}" data-remove-file="${s(a)}">移除</button></li>`).join("")}</ul>
          </div>
          <p class="form-footnote">请勿在答案或附件中填写 API Key、密码或私人信息。</p>
        </form>
        <div class="question-pager">
          <button class="button button--secondary" type="button" data-previous="${s(e.id)}" ${o===1?"disabled":""}>← 上一题</button>
          <span>${String(o).padStart(2,"0")} / 10</span>
          <button class="button button--primary" type="button" data-next="${s(e.id)}">${o===10?"回到路线总览":"下一题"} <span aria-hidden="true">→</span></button>
        </div>
      </article>
      <aside class="question-aside">
        <section class="save-card">
          <div class="save-card__top"><span class="save-card__symbol" aria-hidden="true">⌂</span><span class="local-badge">本机</span></div>
          <h2>你的进度，<br>留在这台电脑。</h2>
          <p>填写姓名和学号后，答案会保存到个人提交目录。重新打开同一份 App 可以接着完成。</p>
          <div class="save-card__state"><span class="save-state__dot"></span><span>自动保存接入施工中</span></div>
        </section>
        <section class="aside-route">
          <div class="aside-route__heading"><h2>本阶段</h2><span>${w(t??d.phases[0])}/${(t==null?void 0:t.questionIds.length)??0} 已填写</span></div>
          ${((t==null?void 0:t.questionIds)??[]).map(a=>{const c=f.get(a);if(!c)return"";const m=Object.values(u.get(a)??{}).some(b=>b.trim().length>0);return`<button type="button" class="aside-route__item${a===e.id?" is-current":""}" data-question="${s(a)}"><span class="aside-route__check">${m?"✓":""}</span><span>${s(c.shortTitle)}</span></button>`}).join("")}
        </section>
        <button type="button" class="checklist-link" data-checklist>查看完整提交方式 <span aria-hidden="true">→</span></button>
      </aside>
    </div>
    <dialog class="checklist-dialog" aria-labelledby="checklist-title">
      <form method="dialog"><button class="dialog-close" aria-label="关闭">×</button></form>
      <p class="section-kicker">提交资料</p><h2 id="checklist-title">完成后这样提交</h2>
      <ol><li>检查每题的答案与附件。</li><li>项目实战题提交 GitHub 链接或源码 ZIP。</li><li>点击“打开提交目录”，手动压缩自己的资料文件夹。</li><li>通过 QQ 邮箱发送给组织者。</li></ol>
      <p class="dialog-note">App 不会自动打包或发送邮件。源码 ZIP 建议排除依赖目录、构建缓存、密钥和私人数据。</p>
      <form method="dialog"><button class="button button--primary">知道了</button></form>
    </dialog>`),r.querySelectorAll("[data-answer-field]").forEach(a=>{a.addEventListener("input",()=>{A(e.id)[a.dataset.answerField??"answer"]=a.value,G()})}),(x=r.querySelector("[data-attachments]"))==null||x.addEventListener("change",a=>{const c=a.currentTarget,m=g.get(e.id)??[];for(const b of Array.from(c.files??[]))m.includes(b.name)||m.push(b.name);g.set(e.id,m),v(e)}),r.querySelectorAll("[data-remove-file]").forEach(a=>{a.addEventListener("click",()=>{g.set(e.id,_.filter(c=>c!==a.dataset.removeFile)),v(e)})}),r.querySelectorAll("[data-checklist]").forEach(a=>{a.addEventListener("click",()=>{var c;return(c=r.querySelector(".checklist-dialog"))==null?void 0:c.showModal()})}),(k=r.querySelector("[data-previous]"))==null||k.addEventListener("click",()=>I(e.id,-1)),($=r.querySelector("[data-next]"))==null||$.addEventListener("click",()=>I(e.id,1))}function G(){const e=r.querySelector("[data-save-state]");e&&(e.classList.add("is-pending"),e.innerHTML='<span class="save-state__dot"></span>待保存');const t=r.querySelector(".topbar__progress strong");t&&(t.textContent=String(S()))}function I(e,t){const n=d.questions.findIndex(o=>o.id===e),l=d.questions[n+t];l?(h=l.id,v(l),window.scrollTo({top:0,behavior:"smooth"})):t>0&&(h=null,y(),window.scrollTo({top:0,behavior:"smooth"}))}function H(e){h=e;const t=f.get(e);t&&v(t)}r.addEventListener("click",e=>{const t=e.target;if(!(t instanceof Element))return;const n=t.closest("[data-question]");if(n!=null&&n.dataset.question){H(n.dataset.question),window.scrollTo({top:0,behavior:"smooth"});return}t.closest("[data-home]")&&(h=null,y(),window.scrollTo({top:0,behavior:"smooth"}))});y();
