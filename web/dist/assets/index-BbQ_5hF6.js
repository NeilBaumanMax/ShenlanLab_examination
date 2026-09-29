(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function s(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=s(a);fetch(a.href,i)}})();const se=[{id:"foundations",title:"AI 基础概念",summary:"把 Agent 相关术语连成一张能解释实际任务的概念图。",questionIds:["Q01","Q02"]},{id:"agent-tools",title:"安装并使用 AI Agent",summary:"在自己的项目目录中启动 Agent，并学会查资料和扩展能力。",questionIds:["Q03","Q04","Q05"]},{id:"version-control",title:"GitHub、提交历史和分支",summary:"用版本记录保存项目、表达修改，并保护敏感信息。",questionIds:["Q06","Q07","Q08"]},{id:"build-and-reflect",title:"Vibecoding 实战",summary:"从真实问题出发，完成一个小工具并对结果负责。",questionIds:["Q09","Q10"]}],ae=[{id:"Q01",phaseId:"foundations",title:"AI 核心概念串讲",shortTitle:"AI 核心概念",theme:"先建立 Agent 工作方式的概念地图。",task:"观看指定概念视频，围绕 LLM、Token、Context、Prompt、Tool、MCP、Agent、Agent Skill，选择一个熟悉的学习或生活场景，用自己的话讲清这些概念如何配合。",expectation:"用具体例子解释概念之间的关系，不要只抄术语定义；可以用文字，也可以上传手绘图或概念图。",assessment:"理解概念、组织表达，以及把抽象概念联系到实际任务的能力。",outcome:"建立 Agent 工作方式的基本概念图。",answerType:"textarea",answerLabel:"我的概念串讲",placeholder:"选一个你熟悉的场景，按任务发生的顺序讲讲这些概念如何配合……",resources:[{label:"从 LLM 到 Agent Skill（Bilibili）",url:"https://www.bilibili.com/video/BV1E7wtzaEdq/"},{label:"MCP 官方入门",url:"https://modelcontextprotocol.io/docs/getting-started/intro"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]},{id:"Q02",phaseId:"foundations",title:"从聊天机器人到 Agent",shortTitle:"聊天机器人与 Agent",theme:"判断不同 AI 工作方式适合解决什么问题。",task:"比较 AI 聊天机器人、固定 AI 工作流和 AI Agent；说明提示词工程、上下文工程、Harness 工程分别主要解决什么问题。",expectation:"讲清不同方法的使用场景，并理解它们可以同时存在，不是简单的新旧替代关系。",assessment:"概括、比较和判断适用场景的能力。",outcome:"能按任务选择 AI 使用方式，而不是所有问题都只靠同一种聊天提示。",answerType:"textarea",answerLabel:"比较与场景判断",placeholder:"可以选择一个任务，分别判断三种方式是否合适，并说明原因……",resources:[{label:"Claude Code 文档：概览与工作方式",url:"https://code.claude.com/docs/en/overview"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]},{id:"Q03",phaseId:"agent-tools",title:"配置 AI Agent",shortTitle:"Agent 安装配置",theme:"让 Agent 在自己的项目目录里开始工作。",task:"根据资料安装 Claude Code CLI，使用 CC Switch 配置模型提供方（推荐 DeepSeek）；也可使用 DeepSeek Harness 或其他 AI Agent。进入自己的项目目录，让 Agent 阅读项目说明并回答项目当前状态。",expectation:"能按说明完成安装，知道 Agent 当前工作目录；遇到问题会根据报错查资料。截图中的密钥必须打码。",assessment:"工具配置、文档查找、基础排错和工作目录意识。",outcome:"能够在本机项目中启动一个 AI Agent。",answerType:"mixed",answerLabel:"安装与运行结果",fields:[{id:"method",label:"我使用的 Agent 与安装方式",type:"text",placeholder:"例如：Claude Code CLI，通过 npm 安装"},{id:"model",label:"配置的模型提供方",type:"text",placeholder:"例如：DeepSeek；不要填写 API Key"}],placeholder:"记录一次成功启动的结果，或遇到的问题和你采取的排查步骤……",resources:[{label:"Claude Code 安装文档",url:"https://code.claude.com/docs/en/getting-started"},{label:"CC Switch 官网",url:"https://ccswitch.io/"},{label:"DeepSeek Anthropic API 兼容说明",url:"https://api-docs.deepseek.com/guides/anthropic_api/"},{label:"Python 官方下载",url:"https://www.python.org/downloads/"},{label:"Node.js 官方下载",url:"https://nodejs.org/"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]},{id:"Q04",phaseId:"agent-tools",title:"CLI 基础命令",shortTitle:"CLI 命令",theme:"遇到新命令时，先会找到并读懂帮助。",task:"查阅你正在使用的 Agent 当前版本命令说明，选择 3 个实际使用过的命令，说明用途，并演示其中一个。",expectation:"会查看帮助文档，能解释命令对当前任务有什么帮助，不依赖死记。",assessment:"自主查阅、理解和使用 CLI 的能力。",outcome:"能够自行探索 Agent 的基本操作。",answerType:"textarea",answerLabel:"命令与演示",placeholder:"列出命令、用途和一个实际演示；粘贴命令前确认没有密钥或私人信息。",resources:[{label:"Claude Code CLI 命令参考",url:"https://code.claude.com/docs/en/cli-usage"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".txt",".md"]},{id:"Q05",phaseId:"agent-tools",title:"Skill、Tool 与 MCP",shortTitle:"Skill 与 MCP",theme:"理解 Agent 如何按需使用可复用指引和外部能力。",task:"在项目中编写一个解决具体重复任务的简单 Skill；连接一个提供的只读示例 MCP；说明 Tool、Skill、MCP 的不同，并提出自己想制作的 Tool 或 MCP 服务。",expectation:"能说清 Skill 解决的重复任务、MCP 连接的数据或能力，以及应该限制的权限。",assessment:"Agent 扩展方式的理解、动手能力和安全意识。",outcome:"能添加或创建 Skill、使用现成 MCP，并提出扩展思路。",answerType:"mixed",answerLabel:"Skill 与 MCP 实践",fields:[{id:"skill",label:"Skill 文件或链接",type:"text",placeholder:"本地路径或可访问的链接"}],placeholder:"说明 Skill 解决什么重复任务、MCP 能访问什么，以及你会怎样限制权限……",resources:[{label:"Claude Code Skills 文档",url:"https://code.claude.com/docs/en/skills"},{label:"Claude Code MCP 文档",url:"https://code.claude.com/docs/en/mcp"},{label:"MCP 官方入门",url:"https://modelcontextprotocol.io/docs/getting-started/intro"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]},{id:"Q06",phaseId:"version-control",title:"创建 GitHub 仓库并连接本地项目",shortTitle:"GitHub 与 SSH",theme:"让本地项目拥有可分享的远端版本记录。",task:"创建个人 GitHub 仓库，通过 SSH 连接，在本地克隆或关联仓库，完成一次提交并推送。",expectation:"能查看 Git 状态和远端地址，知道本地提交与 GitHub 远端仓库不是同一个位置。网络加速工具是可选帮助，不是门槛。",assessment:"GitHub 仓库、本地 Git 操作、SSH 和远端同步的基础能力。",outcome:"能把项目版本可靠地保存并分享。",answerType:"mixed",answerLabel:"仓库与操作记录",fields:[{id:"repository",label:"GitHub 仓库链接",type:"url",placeholder:"https://github.com/用户名/仓库名"}],placeholder:"记录你如何确认本地仓库与远端已连接，以及如何验证推送成功……",resources:[{label:"GitHub：创建仓库",url:"https://docs.github.com/en/get-started/start-your-journey/creating-a-repository-for-your-project-on-github"},{label:"GitHub：SSH 连接",url:"https://docs.github.com/en/authentication/connecting-to-github-with-ssh"},{label:"Pro Git 中文版",url:"https://git-scm.com/book/zh/v2"},{label:"Git & GitHub 实战入门（Bilibili）",url:"https://www.bilibili.com/video/BV1KarSY8E8v/"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".txt",".md"]},{id:"Q07",phaseId:"version-control",title:"画出 Git 提交树和分支关系",shortTitle:"提交树与分支",theme:"看懂文件从工作区进入提交，再同步到远端的路径。",task:"画出工作区、暂存区、本地仓库和 GitHub 远端仓库的关系；在图中表示 `add`、`commit`、`push`、`fetch`、`pull`；再画一个 `main` 与功能分支合并的提交历史示意图。",expectation:"形式不限，可以手绘、流程图或文字图；重点是关系正确。",assessment:"对提交记录、分支和本地/远端版本关系的理解。",outcome:"能读懂基本提交历史，并用分支记录独立功能修改。",answerType:"textarea",answerLabel:"关系图说明",placeholder:"可直接在这里用文字和代码块画图，也可以在下方上传图片或文档。",resources:[{label:"Pro Git：Git 分支",url:"https://git-scm.com/book/zh/v2/Git-分支-分支简介"},{label:"Git & GitHub 实战入门（Bilibili）",url:"https://www.bilibili.com/video/BV1KarSY8E8v/"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]},{id:"Q08",phaseId:"version-control",title:"安全和版本习惯",shortTitle:"安全与版本习惯",theme:"提交前想清楚哪些内容可以分享、记录应该表达什么。",task:"说明为什么 API Key、密码和隐私数据不应提交到 GitHub；用一段文字说明一次合理的小项目提交顺序。",expectation:"知道 `.gitignore` 的作用，提交记录能说明改了什么；不会为了“绿格子”提交无意义内容。",assessment:"版本管理习惯和基本信息安全意识。",outcome:"知道如何避免把敏感信息和无关文件放进仓库。",answerType:"textarea",answerLabel:"安全说明与提交顺序",placeholder:"描述你会检查哪些文件、如何拆分提交，以及发现密钥误提交后第一时间会做什么……",resources:[{label:"GitHub：敏感数据最佳实践",url:"https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning"},{label:"Pro Git 中文版",url:"https://git-scm.com/book/zh/v2"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".txt",".md"]},{id:"Q09",phaseId:"build-and-reflect",title:"选一个实际问题并完成小工具",shortTitle:"Vibecoding 实战",theme:"完成一次发现问题、拆分任务、实现和验证的闭环。",task:"使用 AI Agent 解决一个生活、学习或班级事务中的小问题。可以导入模拟课表后按班级、时间和教室查看课程，也可以整理模拟活动报名表或提出自己的问题。",expectation:"问题来自真实观察、项目范围可完成；至少有一个能运行的核心流程，页面清楚、操作易懂；能指出 Agent 的错误并检查结果。",assessment:"想法、需求表达、项目推进、审美、验证与复盘。",outcome:"完成“发现问题—拆分任务—Agent 辅助实现—实际验证—分享作品”的闭环。",answerType:"mixed",answerLabel:"作品提交与验证",fields:[{id:"repository",label:"GitHub 仓库链接（优先）",type:"url",placeholder:"https://github.com/用户名/仓库名"}],placeholder:"描述你解决的问题、核心功能、完成标准和验证结果。GitHub 链接或源码 ZIP 至少提交一种。",resources:[{label:"项目说明模板",url:"#materials-project-template"},{label:"AI 使用记录模板",url:"#materials-ai-log-template"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".xlsx",".zip",".txt",".md"]},{id:"Q10",phaseId:"build-and-reflect",title:"作品复盘",shortTitle:"作品复盘",theme:"为作品负责，也把一次实践变成下一次的经验。",task:"说明最初的想法、Agent 做了哪些工作、自己如何验证、遇到的一次问题和下一步改进方向。",expectation:"真实说明过程，不把 Agent 生成的内容都当作正确结果。",assessment:"责任意识、复盘能力和独立判断。",outcome:"能够为自己的作品负责，并从一次实践中总结方法。",answerType:"textarea",answerLabel:"我的复盘",placeholder:"可以从“最初想法 / Agent 的帮助 / 我做的验证 / 遇到的问题 / 下一步”依次写起……",resources:[{label:"AI 使用记录模板",url:"#materials-ai-log-template"}],allowedExtensions:[".png",".jpg",".jpeg",".webp",".pdf",".docx",".txt",".md"]}],ne={maxFileBytes:52428800,accept:".png,.jpg,.jpeg,.webp,.pdf,.docx,.xlsx,.txt,.md"},oe={phases:se,questions:ae,uploadDefaults:ne};async function B(e,t){let s;try{s=await fetch(e,{...t,headers:{"Content-Type":"application/json",...t.headers}})}catch{throw new Error("无法连接本机服务。请确认启动窗口仍在运行，再刷新页面。")}const n=await s.json().catch(()=>({}));if(!s.ok)throw new Error(n.error??"本机保存失败，请稍后重试。");return n}function ie(e,t){return B("/api/profile",{method:"POST",body:JSON.stringify({name:e,studentId:t})})}function F(e,t,s,n=!1){return B(`/api/answers/${encodeURIComponent(t)}`,{method:"PUT",keepalive:n,body:JSON.stringify({name:e.name,studentId:e.studentId,fields:s})})}async function re(e,t,s){const n=new FormData;n.append("name",e.name),n.append("studentId",e.studentId),n.append("file",s,s.name);let a;try{a=await fetch(`/api/attachments/${encodeURIComponent(t)}`,{method:"POST",body:n})}catch{throw new Error("无法连接本机服务。请确认启动窗口仍在运行，再重试。")}const i=await a.json().catch(()=>({}));if(!a.ok||!i.attachment)throw new Error(i.error??"附件保存失败，请重试。");return i.attachment}function le(e,t,s){return B(`/api/attachments/${encodeURIComponent(t)}`,{method:"DELETE",body:JSON.stringify({name:e.name,studentId:e.studentId,filename:s})})}function ce(e){return B("/api/submission/open",{method:"POST",body:JSON.stringify({name:e.name,studentId:e.studentId})})}const p=document.querySelector("#app");if(!p)throw new Error("找不到页面挂载节点 #app");const v=oe,D=new Map(v.questions.map(e=>[e.id,e])),R=new Map(v.phases.map(e=>[e.id,e])),S=new Map,_=new Map,m=new Map,Q=new Map,k=new Map,y=new Map,P=new Map,b=new Map,I=new Set;let $=null,c=null,H=!1;function r(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]??t)}function x(e){let t=S.get(e);return t||(t={},S.set(e,t)),t}function K(){return v.questions.filter(e=>T(e.id)).length}function T(e){var t;return Object.values(S.get(e)??{}).some(s=>s.trim().length>0)||(((t=_.get(e))==null?void 0:t.length)??0)>0}function j(e){return[/sk-(?:ant-)?[A-Za-z0-9_-]{16,}/i,/gh[pousr]_[A-Za-z0-9]{20,}/,/AIza[0-9A-Za-z_-]{30,}/,/AKIA[0-9A-Z]{16}/,/(?:api[_ -]?key|password|secret|密钥|密码)\s*[:=：]\s*["']?[A-Za-z0-9_./+=-]{8,}/i].some(s=>s.test(e))}function N(e){return{"not-started":"未开始","profile-required":"先填写学生信息","review-required":"请检查敏感信息",pending:"待保存",saving:"保存中",saved:"已保存",error:"保存失败"}[e]}function Z(e){return e==="saved"?"is-saved":e==="error"?"is-error":e==="pending"||e==="saving"||e==="profile-required"||e==="review-required"?"is-pending":""}function V(e,t){return t==="review-required"?"检测到内容可能包含密钥或密码。请删除或打码后再保存；检查仅在本机进行。":t==="profile-required"?"先填写姓名和学号，创建本机提交目录后即可保存。":t==="error"?`${Q.get(e)??"本机保存失败。"} 修改答案后会自动重试。`:t==="saved"?"答案已保存到本机个人资料目录。":"保存到本机，不会上传。输入后稍等片刻，直到显示“已保存”。"}function z(e){return e.questionIds.filter(T).length}function W(){const e=v.questions.filter(o=>!T(o.id)),t=[..._.values()].reduce((o,h)=>o+h.length,0),n=((S.get("Q09")??{}).repository??"").trim();let a=!1;try{const o=new URL(n);a=o.protocol==="https:"&&o.hostname==="github.com"}catch{a=!1}const i=(_.get("Q09")??[]).some(o=>o.toLowerCase().endsWith(".zip")),d=a||i?`项目实战材料已提供${a&&i?"链接和 ZIP":a?"GitHub 链接":"源码 ZIP"}。`:"项目实战题还需要 GitHub 链接或源码 ZIP。";return`
    <div class="checklist-summary">
      <p><strong>${K()} / 10</strong> 道题已有答案或附件 <span>· ${t} 个附件</span></p>
      <p>${r(d)}</p>
      ${e.length?`<details class="checklist-missing"><summary>查看 ${e.length} 道还没有作答的题目</summary><ul>${e.map(o=>`<li>${r(o.id)} · ${r(o.title)}</li>`).join("")}</ul></details>`:"<p>十道题都已有作答或附件。</p>"}
    </div>`}function Y(){p.querySelectorAll("[data-checklist]").forEach(e=>{e.addEventListener("click",()=>{var t;return(t=p.querySelector(".checklist-dialog"))==null?void 0:t.showModal()})}),p.querySelectorAll("[data-open-directory]").forEach(e=>{e.addEventListener("click",async()=>{const t=e.closest(".checklist-dialog"),s=t==null?void 0:t.querySelector("[data-open-directory-status]");if(!c){s&&(s.textContent="请先在右上角填写并保存姓名和学号。");return}e.disabled=!0,s&&(s.textContent="正在打开本机提交目录…");try{const n=await ce(c);s&&(s.textContent=`已打开 ${n.directoryName}。`)}catch(n){s&&(s.textContent=n instanceof Error?n.message:"无法打开目录，请检查本机服务。")}finally{e.disabled=!1}})})}function de(){return v.phases.map(e=>{const t=e.questionIds.map(s=>{const n=D.get(s);if(!n)return"";const a=T(s),i=$===s;return`
            <button class="route-link${i?" is-current":""}${a?" is-answered":""}"
              type="button" data-question="${r(s)}" ${i?'aria-current="page"':""}>
              <span class="route-link__marker" aria-hidden="true">${a?"✓":r(s.slice(1))}</span>
              <span>${r(n.shortTitle)}</span>
            </button>`}).join("");return`
        <section class="route-group" aria-label="${r(e.title)}" data-phase="${r(e.id)}">
          <div class="route-group__heading">
            <span>${r(e.title)}</span>
            <span class="route-group__count">${z(e)}/${e.questionIds.length}</span>
          </div>
          <div class="route-group__links">${t}</div>
        </section>`}).join("")}function X(e){var s;const t=K();p.innerHTML=`
    <div class="app-shell">
      <aside class="route-rail" aria-label="学习路线">
        <a class="brand" href="#home" data-home>
          <span class="brand__seal" aria-hidden="true">深</span>
          <span class="brand__text"><strong>深蓝科技部</strong><small>AI AGENT QUEST</small></span>
        </a>
        <button class="route-home${$===null?" is-current":""}" type="button" data-home>
          <span class="route-home__symbol" aria-hidden="true">⌂</span>路线总览
        </button>
        <div class="route-rail__label">学习路线 <span>10 题</span></div>
        <nav class="route-nav">${de()}</nav>
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
              <summary><span class="identity-avatar" aria-hidden="true">${c?r(c.name.slice(0,1)):"学"}</span><span>${c?r(c.name):"学生信息"}</span><span class="chevron" aria-hidden="true">⌄</span></summary>
              <form class="identity-menu__panel" data-profile-form>
                <p>填写姓名和学号，用于命名本机答题资料目录。重新打开时填写相同信息即可恢复。</p>
                <label>姓名<input name="name" autocomplete="name" maxlength="48" required value="${r((c==null?void 0:c.name)??"")}" placeholder="你的姓名"></label>
                <label>学号<input name="studentId" autocomplete="off" maxlength="48" required value="${r((c==null?void 0:c.studentId)??"")}" placeholder="你的学号"></label>
                <button class="button button--primary" type="submit" ${H?"disabled":""}>${H?"正在打开本机资料…":"保存身份并恢复进度"}</button>
                <span class="save-note" data-profile-message role="status">${c?`当前目录：${r(c.directoryName)}`:"身份信息仅用于本地目录，不会上传。"}</span>
              </form>
            </details>
          </div>
        </header>
        <main class="workspace" id="main-content">${e}</main>
      </div>
    </div>`,(s=p.querySelector("[data-profile-form]"))==null||s.addEventListener("submit",async n=>{n.preventDefault();const a=n.currentTarget,i=a.querySelector("[data-profile-message]"),d=a.querySelector("button[type='submit']"),o=new FormData(a),h=String(o.get("name")??""),g=String(o.get("studentId")??"");if(c&&(h.trim()!==c.name||g.trim()!==c.studentId)){i&&(i.textContent="此运行中的 App 已关联当前学生目录。若要换用其他身份，请重新启动后再填写。");return}H=!0,d&&(d.disabled=!0),i&&(i.textContent="正在读取本机已有进度…");try{const f=await ie(h,g),M=new Map(S);S.clear();for(const[u,w]of Object.entries(f.answers))S.set(u,w),m.set(u,j(Object.values(w).join(`
`))?"review-required":"saved");for(const[u,w]of Object.entries(f.attachments??{}))_.set(u,w.map(l=>l.name));const E=[];for(const[u,w]of M)Object.values(w).some(l=>l.trim().length>0)&&(S.set(u,w),j(Object.values(w).join(`
`))?m.set(u,"review-required"):JSON.stringify(w)!==JSON.stringify(f.answers[u]??{})&&(m.set(u,"pending"),E.push(u)));c=f.profile,H=!1;const G=p.querySelector(".identity-menu");if(G&&(G.open=!1),$){const u=D.get($);u?A(u):O()}else O();for(const u of E)J(u)}catch(f){H=!1,d&&(d.disabled=!1),i&&(i.textContent=f instanceof Error?f.message:"无法打开本机资料，请重试。")}})}function O(){const e=v.phases.map((t,s)=>`
      <button class="phase-row" type="button" data-question="${r(t.questionIds[0]??"Q01")}">
        <span class="phase-row__number">0${s+1}</span>
        <span class="phase-row__copy"><strong>${r(t.title)}</strong><small>${r(t.summary)}</small></span>
        <span class="phase-row__count">${t.questionIds.length} 道任务</span>
        <span class="phase-row__arrow" aria-hidden="true">↗</span>
      </button>`).join("");X(`
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
      ${W()}
      <ol><li>检查每题的答案与附件。</li><li>项目实战题提交 GitHub 链接或源码 ZIP。</li><li>打开个人提交目录，手动压缩自己的资料文件夹。</li><li>通过 QQ 邮箱发送给组织者。</li></ol>
      <p class="dialog-note">App 不会自动打包或发送邮件。源码 ZIP 建议排除依赖目录、构建缓存、密钥和私人数据。</p>
      <p class="directory-status" data-open-directory-status role="status"></p>
      <div class="checklist-actions"><button class="button button--secondary" type="button" data-open-directory>打开提交目录</button><form method="dialog"><button class="button button--primary">知道了</button></form></div>
    </dialog>`),Y()}function A(e){var G,u,w;const t=R.get(e.phaseId),s=x(e.id),n=t?v.phases.findIndex(l=>l.id===t.id)+1:1,a=v.questions.findIndex(l=>l.id===e.id)+1,i=e.resources.map(l=>{const L=l.url.startsWith("https://")||l.url.startsWith("http://");return`<a class="resource-link" href="${r(l.url)}" ${L?'target="_blank" rel="noreferrer"':""}>
        <span class="resource-link__mark" aria-hidden="true">${L?"↗":"↳"}</span>${r(l.label)}
      </a>`}).join(""),d=(e.fields??[]).map(l=>`
      <label class="answer-field" for="${r(e.id)}-${r(l.id)}">
        <span>${r(l.label)}</span>
        <input id="${r(e.id)}-${r(l.id)}" name="${r(l.id)}" type="${l.type==="url"?"url":"text"}"
          value="${r(s[l.id]??"")}" placeholder="${r(l.placeholder??"")}" data-answer-field="${r(l.id)}">
      </label>`).join(""),o=_.get(e.id)??[],h=e.allowedExtensions.join(","),g=m.get(e.id)??"not-started",f=j(Object.values(s).join(`
`)),M=k.get(e.id)??(c?"":"先填写学生信息，再添加附件。"),E=I.has(e.id);X(`
    <div class="question-heading">
      <div class="breadcrumbs"><button type="button" data-home>路线总览</button><span>/</span><span>${r((t==null?void 0:t.title)??"学习任务")}</span></div>
      <div class="question-heading__row">
        <div><p class="eyebrow"><span class="eyebrow__line"></span>阶段 ${n} · 任务 ${String(a).padStart(2,"0")}</p>
          <h1>${r(e.title)}</h1><p class="question-heading__theme">${r(e.theme)}</p></div>
        <span class="question-index">${String(a).padStart(2,"0")}<i> / 10</i></span>
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
          <p class="document-copy">${r(e.task)}</p>
        </section>
        <section class="document-section document-section--soft">
          <div class="document-section__heading"><span class="section-icon" aria-hidden="true">✳</span><h2>我的期待</h2></div>
          <p class="document-copy">${r(e.expectation)}</p>
        </section>
        <div class="two-notes">
          <section class="document-section document-section--compact">
            <div class="document-section__heading"><span class="small-rule"></span><h2>核心考察</h2></div>
            <p class="document-copy">${r(e.assessment)}</p>
          </section>
          <section class="document-section document-section--compact">
            <div class="document-section__heading"><span class="small-rule small-rule--pale"></span><h2>能力收获</h2></div>
            <p class="document-copy">${r(e.outcome)}</p>
          </section>
        </div>
        <form class="answer-form" autocomplete="off">
          <div class="answer-form__heading"><div><p class="section-kicker">本题作答</p><h2>我的回答</h2></div>
            <span class="save-state ${Z(g)}" data-save-state aria-live="polite"><span class="save-state__dot"></span>${N(g)}</span></div>
          <p class="save-guidance" data-save-guidance>${r(V(e.id,g))}</p>
          ${d}
          <label class="answer-field" for="answer-${r(e.id)}"><span>${r(e.answerLabel)}</span>
            <textarea id="answer-${r(e.id)}" name="answer" rows="7" data-answer-field="answer" placeholder="${r(e.placeholder)}">${r(s.answer??"")}</textarea>
          </label>
          <div class="attachment-box">
            <div><strong>添加附件</strong><span>单个文件不超过 50 MB。不会自动打开或运行附件。</span></div>
            <label class="button button--secondary upload-button${!c||E?" is-disabled":""}">${E?"上传中…":"选择文件"}<input type="file" multiple accept="${r(h)}" data-attachments ${!c||E?"disabled":""}></label>
            <ul class="attachment-list">${o.map(l=>`<li>${r(l)}<button type="button" aria-label="移除 ${r(l)}" data-remove-file="${r(l)}" ${E?"disabled":""}>移除</button></li>`).join("")}</ul>
          </div>
          <p class="attachment-message" data-attachment-message role="status" ${M?"":"hidden"}>${r(M)}</p>
          <p class="form-footnote${f?" is-warning":""}" data-credential-warning role="status">${f?"检测到内容可能包含密钥或密码。请删除或打码后再保存；检查仅在本机进行。":"请勿在答案或附件中填写 API Key、密码或私人信息。"}</p>
        </form>
        <div class="question-pager">
          <button class="button button--secondary" type="button" data-previous="${r(e.id)}" ${a===1?"disabled":""}>← 上一题</button>
          <span>${String(a).padStart(2,"0")} / 10</span>
          <button class="button button--primary" type="button" data-next="${r(e.id)}">${a===10?"回到路线总览":"下一题"} <span aria-hidden="true">→</span></button>
        </div>
      </article>
      <aside class="question-aside">
        <section class="save-card">
          <div class="save-card__top"><span class="save-card__symbol" aria-hidden="true">⌂</span><span class="local-badge">本机</span></div>
          <h2>你的进度，<br>留在这台电脑。</h2>
          <p>填写姓名和学号后，答案会保存到个人提交目录。重新打开同一份 App 可以接着完成。</p>
          <div class="save-card__state ${Z(g)}" data-local-save-state><span class="save-state__dot"></span><span>${N(g)}</span></div>
        </section>
        <section class="aside-route">
          <div class="aside-route__heading"><h2>本阶段</h2><span>${z(t??v.phases[0])}/${(t==null?void 0:t.questionIds.length)??0} 已填写</span></div>
          ${((t==null?void 0:t.questionIds)??[]).map(l=>{const L=D.get(l);if(!L)return"";const te=T(l);return`<button type="button" class="aside-route__item${l===e.id?" is-current":""}" data-question="${r(l)}"><span class="aside-route__check">${te?"✓":""}</span><span>${r(L.shortTitle)}</span></button>`}).join("")}
        </section>
        <button type="button" class="checklist-link" data-checklist>查看完整提交方式 <span aria-hidden="true">→</span></button>
      </aside>
    </div>
    <dialog class="checklist-dialog" aria-labelledby="checklist-title">
      <form method="dialog"><button class="dialog-close" aria-label="关闭">×</button></form>
      <p class="section-kicker">提交资料</p><h2 id="checklist-title">完成后这样提交</h2>
      ${W()}
      <ol><li>检查每题的答案与附件。</li><li>项目实战题提交 GitHub 链接或源码 ZIP。</li><li>打开个人提交目录，手动压缩自己的资料文件夹。</li><li>通过 QQ 邮箱发送给组织者。</li></ol>
      <p class="dialog-note">App 不会自动打包或发送邮件。源码 ZIP 建议排除依赖目录、构建缓存、密钥和私人数据。</p>
      <p class="directory-status" data-open-directory-status role="status"></p>
      <div class="checklist-actions"><button class="button button--secondary" type="button" data-open-directory>打开提交目录</button><form method="dialog"><button class="button button--primary">知道了</button></form></div>
    </dialog>`),p.querySelectorAll("[data-answer-field]").forEach(l=>{l.addEventListener("input",()=>{x(e.id)[l.dataset.answerField??"answer"]=l.value,me(e.id)})}),(G=p.querySelector("[data-attachments]"))==null||G.addEventListener("change",l=>{const L=l.currentTarget;pe(e,Array.from(L.files??[]))}),p.querySelectorAll("[data-remove-file]").forEach(l=>{l.addEventListener("click",()=>{ue(e,l.dataset.removeFile??"")})}),Y(),(u=p.querySelector("[data-previous]"))==null||u.addEventListener("click",()=>U(e.id,-1)),(w=p.querySelector("[data-next]"))==null||w.addEventListener("click",()=>U(e.id,1))}async function pe(e,t){if(!c){k.set(e.id,"先填写学生信息，再添加附件。"),A(e);return}const s=c;if(!t.length)return;k.delete(e.id),I.add(e.id),A(e);const n=_.get(e.id)??[],a=new Set(e.allowedExtensions.map(o=>o.toLowerCase()));let i=0;const d=[];try{for(const o of t){const h=o.name.lastIndexOf("."),g=h>=0?o.name.slice(h).toLowerCase():"";if(!a.has(g)){d.push(`${o.name}：本题不支持这种文件类型。`);continue}if(o.size>v.uploadDefaults.maxFileBytes){d.push(`${o.name}：单个附件不能超过 50 MB。`);continue}try{if([".txt",".md"].includes(g)&&j(await o.text())&&!window.confirm(`${o.name} 可能包含 API Key 或密码。建议先打码。确认仍要将它保存在本机答题目录吗？`))continue;await q(e.id);const f=await re(s,e.id,o);n.includes(f.name)||n.push(f.name),_.set(e.id,n),i+=1}catch(f){d.push(`${o.name}：${f instanceof Error?f.message:"保存失败，请重试。"}`)}}}finally{I.delete(e.id),d.length?k.set(e.id,d.join(" ")):i&&k.set(e.id,`${i} 个附件已保存到本机。`),A(e)}}async function ue(e,t){if(!c||I.has(e.id))return;const s=c;k.delete(e.id),I.add(e.id),A(e);try{await q(e.id),await le(s,e.id,t),_.set(e.id,(_.get(e.id)??[]).filter(n=>n!==t)),k.set(e.id,"附件已从本机资料目录移除。")}catch(n){k.set(e.id,n instanceof Error?n.message:"无法移除附件，请重试。")}finally{I.delete(e.id),A(e)}}function me(e){if(Q.delete(e),j(Object.values(x(e)).join(`
`))){const o=y.get(e);o&&clearTimeout(o),y.delete(e),m.set(e,"review-required")}else c?(m.set(e,"pending"),J(e)):m.set(e,"profile-required");C(e);const s=p.querySelector(".topbar__progress strong");s&&(s.textContent=String(K()));for(const o of v.phases){const h=p.querySelector(`[data-phase="${CSS.escape(o.id)}"] .route-group__count`);h&&(h.textContent=`${z(o)}/${o.questionIds.length}`)}p.querySelectorAll(".route-link[data-question]").forEach(o=>{const h=T(o.dataset.question??"");o.classList.toggle("is-answered",h);const g=o.querySelector(".route-link__marker");g&&(g.textContent=h?"✓":(o.dataset.question??"").slice(1))}),p.querySelectorAll(".aside-route__item[data-question]").forEach(o=>{const h=T(o.dataset.question??""),g=o.querySelector(".aside-route__check");g&&(g.textContent=h?"✓":"")});const n=p.querySelector(".aside-route__heading span"),a=D.get(e),i=a?R.get(a.phaseId):void 0;n&&i&&(n.textContent=`${z(i)}/${i.questionIds.length} 已填写`);const d=p.querySelector("[data-credential-warning]");if(d){const o=j(Object.values(x(e)).join(`
`));d.classList.toggle("is-warning",o),d.textContent=o?"检测到内容可能包含密钥或密码。请删除或打码后再保存；检查仅在本机进行。":"请勿在答案或附件中填写 API Key、密码或私人信息。"}}function J(e){if(!c||j(Object.values(x(e)).join(`
`)))return;const t=y.get(e);t&&clearTimeout(t);const s=(P.get(e)??0)+1;P.set(e,s),m.set(e,"pending"),y.set(e,setTimeout(async()=>{if(y.delete(e),!c)return;const n=c,a={...x(e)};m.set(e,"saving"),C(e);const i=b.get(e),d=(i?i.catch(()=>{}):Promise.resolve()).then(()=>F(n,e,a));b.set(e,d);try{if(await d,P.get(e)===s)m.set(e,"saved");else return}catch(o){if(P.get(e)===s)m.set(e,"error"),Q.set(e,o instanceof Error?o.message:"本机保存失败，请检查启动窗口和资料目录权限。");else return}finally{b.get(e)===d&&b.delete(e)}C(e)},650))}async function q(e){if(!c)return;if(j(Object.values(x(e)).join(`
`)))throw new Error("答案可能包含密钥或密码；请先删除或打码，附件操作暂未继续。");const t=y.get(e);t&&clearTimeout(t),y.delete(e);const s=b.get(e);s&&await s.catch(()=>{});const n=c,a=P.get(e)??0,i={...x(e)},d=F(n,e,i);b.set(e,d),m.set(e,"saving"),C(e);try{await d,b.get(e)===d&&b.delete(e),P.get(e)===a?m.set(e,"saved"):J(e),C(e)}catch(o){throw b.get(e)===d&&b.delete(e),m.set(e,"error"),Q.set(e,o instanceof Error?o.message:"本机保存失败，请重试。"),C(e),o}}function ee(){if(!c)return;const e=c,t=new Set([...y.keys(),...[...m.entries()].filter(([,s])=>s==="pending"||s==="saving").map(([s])=>s)]);for(const s of t){const n=y.get(s);n&&clearTimeout(n),y.delete(s);const a={...x(s)},i=F(e,s,a,!0);b.set(s,i),i.then(()=>{m.set(s,"saved"),Q.delete(s),C(s)}).catch(()=>{m.set(s,"error"),Q.set(s,"离开页面前保存失败，请重新打开本机服务并检查提交目录。"),C(s)}).finally(()=>{b.get(s)===i&&b.delete(s)})}}window.addEventListener("pagehide",ee);document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&ee()});function C(e){if($!==e)return;const t=m.get(e)??"not-started",s=p.querySelector("[data-save-state]");s&&(s.className=`save-state ${Z(t)}`.trim(),s.innerHTML=`<span class="save-state__dot"></span>${N(t)}`);const n=p.querySelector("[data-save-guidance]");n&&(n.textContent=V(e,t));const a=p.querySelector("[data-local-save-state]");if(a){a.className=`save-card__state ${Z(t)}`.trim();const i=a.querySelector("span:last-child");i&&(i.textContent=N(t))}}function U(e,t){const s=v.questions.findIndex(a=>a.id===e),n=v.questions[s+t];n?($=n.id,A(n),window.scrollTo({top:0,behavior:"smooth"})):t>0&&($=null,O(),window.scrollTo({top:0,behavior:"smooth"}))}function he(e){$=e;const t=D.get(e);t&&A(t)}p.addEventListener("click",e=>{const t=e.target;if(!(t instanceof Element))return;const s=t.closest("[data-question]");if(s!=null&&s.dataset.question){he(s.dataset.question),window.scrollTo({top:0,behavior:"smooth"});return}t.closest("[data-home]")&&($=null,O(),window.scrollTo({top:0,behavior:"smooth"}))});O();
