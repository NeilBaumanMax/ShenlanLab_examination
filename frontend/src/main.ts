import "./style.css";
import questionData from "../../content/questions.json";
import { createProfile, saveAnswer, type StudentProfile } from "./api";
import type { Phase, Question, QuestionData } from "./types";

/*
THESIS: A student should always know which task they are on and what a good answer needs to explain.
OWN-WORLD: Deep blue route rail, paper-white reading surface, quiet blue selection and clear work states.
STORY: See the whole route, open any task, understand its expectations, then write and submit locally.
FIRST VIEWPORT: Route rail on the left; selected task and learning materials in the center; save state and route progress at right.
FORM: The user-pinned blue technology brief, composed as an Operate workbench; no random concept seed because the brief fixes the direction.
*/

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("找不到页面挂载节点 #app");
}

const data = questionData as QuestionData;
const questionsById = new Map(data.questions.map((question) => [question.id, question]));
const phasesById = new Map(data.phases.map((phase) => [phase.id, phase]));
const answerDrafts = new Map<string, Record<string, string>>();
const attachmentDrafts = new Map<string, string[]>();
const saveStates = new Map<string, SaveState>();
const saveErrors = new Map<string, string>();
const pendingSaves = new Map<string, ReturnType<typeof setTimeout>>();
const answerRevisions = new Map<string, number>();
let activeQuestionId: string | null = null;
let activeProfile: StudentProfile | null = null;
let profileSubmitting = false;

type SaveState = "not-started" | "profile-required" | "pending" | "saving" | "saved" | "error";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });
}

function getAnswer(questionId: string): Record<string, string> {
  let answer = answerDrafts.get(questionId);
  if (!answer) {
    answer = {};
    answerDrafts.set(questionId, answer);
  }
  return answer;
}

function progressCount(): number {
  return [...answerDrafts.values()].filter((fields) =>
    Object.values(fields).some((value) => value.trim().length > 0),
  ).length;
}

function hasAnswer(questionId: string): boolean {
  return Object.values(answerDrafts.get(questionId) ?? {}).some((value) => value.trim().length > 0);
}

function statusLabel(status: SaveState): string {
  const labels: Record<SaveState, string> = {
    "not-started": "未开始",
    "profile-required": "先填写学生信息",
    pending: "待保存",
    saving: "保存中",
    saved: "已保存",
    error: "保存失败",
  };
  return labels[status];
}

function statusClass(status: SaveState): string {
  if (status === "saved") return "is-saved";
  if (status === "error") return "is-error";
  if (status === "pending" || status === "saving" || status === "profile-required") return "is-pending";
  return "";
}

function statusGuidance(questionId: string, status: SaveState): string {
  if (status === "profile-required") return "先填写姓名和学号，创建本机提交目录后即可保存。";
  if (status === "error") return `${saveErrors.get(questionId) ?? "本机保存失败。"} 修改答案后会自动重试。`;
  if (status === "saved") return "答案已保存到本机个人资料目录。";
  return "保存到本机，不会上传。输入后稍等片刻，直到显示“已保存”。";
}

function phaseQuestionCount(phase: Phase): number {
  return phase.questionIds.filter((id) => {
    const fields = answerDrafts.get(id);
    return fields && Object.values(fields).some((value) => value.trim().length > 0);
  }).length;
}

function renderNavigation(): string {
  return data.phases
    .map((phase) => {
      const links = phase.questionIds
        .map((id) => {
          const question = questionsById.get(id);
          if (!question) return "";
          const answered = hasAnswer(id);
          const current = activeQuestionId === id;
          return `
            <button class="route-link${current ? " is-current" : ""}${answered ? " is-answered" : ""}"
              type="button" data-question="${escapeHtml(id)}" ${current ? 'aria-current="page"' : ""}>
              <span class="route-link__marker" aria-hidden="true">${answered ? "✓" : escapeHtml(id.slice(1))}</span>
              <span>${escapeHtml(question.shortTitle)}</span>
            </button>`;
        })
        .join("");

      return `
        <section class="route-group" aria-label="${escapeHtml(phase.title)}" data-phase="${escapeHtml(phase.id)}">
          <div class="route-group__heading">
            <span>${escapeHtml(phase.title)}</span>
            <span class="route-group__count">${phaseQuestionCount(phase)}/${phase.questionIds.length}</span>
          </div>
          <div class="route-group__links">${links}</div>
        </section>`;
    })
    .join("");
}

function renderShell(content: string): void {
  const count = progressCount();
  root!.innerHTML = `
    <div class="app-shell">
      <aside class="route-rail" aria-label="学习路线">
        <a class="brand" href="#home" data-home>
          <span class="brand__seal" aria-hidden="true">深</span>
          <span class="brand__text"><strong>深蓝科技部</strong><small>AI AGENT QUEST</small></span>
        </a>
        <button class="route-home${activeQuestionId === null ? " is-current" : ""}" type="button" data-home>
          <span class="route-home__symbol" aria-hidden="true">⌂</span>路线总览
        </button>
        <div class="route-rail__label">学习路线 <span>10 题</span></div>
        <nav class="route-nav">${renderNavigation()}</nav>
        <div class="route-rail__foot">
          <div class="privacy-mark" aria-hidden="true">◉</div>
          <div><strong>答案留在本机</strong><span>本地保存 · 不上传</span></div>
        </div>
      </aside>

      <div class="app-main">
        <header class="topbar">
          <div class="topbar__context"><span class="topbar__dot"></span>本地学习空间</div>
          <div class="topbar__actions">
            <span class="topbar__progress">已填写 <strong>${count}</strong> / 10</span>
            <details class="identity-menu">
              <summary><span class="identity-avatar" aria-hidden="true">${activeProfile ? escapeHtml(activeProfile.name.slice(0, 1)) : "学"}</span><span>${activeProfile ? escapeHtml(activeProfile.name) : "学生信息"}</span><span class="chevron" aria-hidden="true">⌄</span></summary>
              <form class="identity-menu__panel" data-profile-form>
                <p>填写姓名和学号，用于命名本机答题资料目录。重新打开时填写相同信息即可恢复。</p>
                <label>姓名<input name="name" autocomplete="name" maxlength="48" required value="${escapeHtml(activeProfile?.name ?? "")}" placeholder="你的姓名"></label>
                <label>学号<input name="studentId" autocomplete="off" maxlength="48" required value="${escapeHtml(activeProfile?.studentId ?? "")}" placeholder="你的学号"></label>
                <button class="button button--primary" type="submit" ${profileSubmitting ? "disabled" : ""}>${profileSubmitting ? "正在打开本机资料…" : "保存身份并恢复进度"}</button>
                <span class="save-note" data-profile-message role="status">${activeProfile ? `当前目录：${escapeHtml(activeProfile.directoryName)}` : "身份信息仅用于本地目录，不会上传。"}</span>
              </form>
            </details>
          </div>
        </header>
        <main class="workspace" id="main-content">${content}</main>
      </div>
    </div>`;

  root!.querySelector<HTMLFormElement>("[data-profile-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const message = form.querySelector<HTMLElement>("[data-profile-message]");
    const button = form.querySelector<HTMLButtonElement>("button[type='submit']");
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "");
    const studentId = String(formData.get("studentId") ?? "");
    if (activeProfile && (name.trim() !== activeProfile.name || studentId.trim() !== activeProfile.studentId)) {
      if (message) message.textContent = "此运行中的 App 已关联当前学生目录。若要换用其他身份，请重新启动后再填写。";
      return;
    }
    profileSubmitting = true;
    if (button) button.disabled = true;
    if (message) message.textContent = "正在读取本机已有进度…";
    try {
      const response = await createProfile(name, studentId);
      const unsavedDrafts = new Map(answerDrafts);
      answerDrafts.clear();
      for (const [questionId, fields] of Object.entries(response.answers)) {
        answerDrafts.set(questionId, fields);
        saveStates.set(questionId, "saved");
      }
      const draftsToSave: string[] = [];
      for (const [questionId, fields] of unsavedDrafts) {
        if (Object.values(fields).some((value) => value.trim().length > 0)) {
          answerDrafts.set(questionId, fields);
          if (JSON.stringify(fields) !== JSON.stringify(response.answers[questionId] ?? {})) draftsToSave.push(questionId);
        }
      }
      activeProfile = response.profile;
      profileSubmitting = false;
      const details = root!.querySelector<HTMLDetailsElement>(".identity-menu");
      if (details) details.open = false;
      if (activeQuestionId) {
        const current = questionsById.get(activeQuestionId);
        if (current) renderQuestion(current);
        else renderHome();
      } else {
        renderHome();
      }
      for (const questionId of draftsToSave) scheduleAnswerSave(questionId);
    } catch (error) {
      profileSubmitting = false;
      if (button) button.disabled = false;
      if (message) message.textContent = error instanceof Error ? error.message : "无法打开本机资料，请重试。";
    }
  });
}

function renderHome(): void {
  const phases = data.phases
    .map((phase, index) => `
      <button class="phase-row" type="button" data-question="${escapeHtml(phase.questionIds[0] ?? "Q01")}">
        <span class="phase-row__number">0${index + 1}</span>
        <span class="phase-row__copy"><strong>${escapeHtml(phase.title)}</strong><small>${escapeHtml(phase.summary)}</small></span>
        <span class="phase-row__count">${phase.questionIds.length} 道任务</span>
        <span class="phase-row__arrow" aria-hidden="true">↗</span>
      </button>`)
    .join("");

  renderShell(`
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
      <div class="phase-list">${phases}</div>
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
    </dialog>`);

  root!.querySelector<HTMLButtonElement>("[data-checklist]")?.addEventListener("click", () => {
    root!.querySelector<HTMLDialogElement>(".checklist-dialog")?.showModal();
  });
}

function renderQuestion(question: Question): void {
  const phase = phasesById.get(question.phaseId);
  const answer = getAnswer(question.id);
  const phasePosition = phase ? data.phases.findIndex((item) => item.id === phase.id) + 1 : 1;
  const questionPosition = data.questions.findIndex((item) => item.id === question.id) + 1;
  const resources = question.resources
    .map((resource) => {
      const external = resource.url.startsWith("https://") || resource.url.startsWith("http://");
      return `<a class="resource-link" href="${escapeHtml(resource.url)}" ${external ? 'target="_blank" rel="noreferrer"' : ""}>
        <span class="resource-link__mark" aria-hidden="true">${external ? "↗" : "↳"}</span>${escapeHtml(resource.label)}
      </a>`;
    })
    .join("");
  const fields = (question.fields ?? [])
    .map((field) => `
      <label class="answer-field" for="${escapeHtml(question.id)}-${escapeHtml(field.id)}">
        <span>${escapeHtml(field.label)}</span>
        <input id="${escapeHtml(question.id)}-${escapeHtml(field.id)}" name="${escapeHtml(field.id)}" type="${field.type === "url" ? "url" : "text"}"
          value="${escapeHtml(answer[field.id] ?? "")}" placeholder="${escapeHtml(field.placeholder ?? "")}" data-answer-field="${escapeHtml(field.id)}">
      </label>`)
    .join("");
  const attachments = attachmentDrafts.get(question.id) ?? [];
  const allowedExtensions = question.allowedExtensions.join(",");
  const currentSaveState = saveStates.get(question.id) ?? "not-started";

  renderShell(`
    <div class="question-heading">
      <div class="breadcrumbs"><button type="button" data-home>路线总览</button><span>/</span><span>${escapeHtml(phase?.title ?? "学习任务")}</span></div>
      <div class="question-heading__row">
        <div><p class="eyebrow"><span class="eyebrow__line"></span>阶段 ${phasePosition} · 任务 ${String(questionPosition).padStart(2, "0")}</p>
          <h1>${escapeHtml(question.title)}</h1><p class="question-heading__theme">${escapeHtml(question.theme)}</p></div>
        <span class="question-index">${String(questionPosition).padStart(2, "0")}<i> / 10</i></span>
      </div>
    </div>
    <div class="question-layout">
      <article class="question-document">
        <section class="document-section document-section--resources">
          <div class="document-section__heading"><span class="section-icon" aria-hidden="true">↗</span><h2>学习材料</h2></div>
          <div class="resource-list">${resources || '<span class="quiet-copy">本题暂无外部资料。</span>'}</div>
        </section>
        <section class="document-section">
          <div class="document-section__heading"><span class="section-icon" aria-hidden="true">◎</span><h2>题目任务</h2></div>
          <p class="document-copy">${escapeHtml(question.task)}</p>
        </section>
        <section class="document-section document-section--soft">
          <div class="document-section__heading"><span class="section-icon" aria-hidden="true">✳</span><h2>我的期待</h2></div>
          <p class="document-copy">${escapeHtml(question.expectation)}</p>
        </section>
        <div class="two-notes">
          <section class="document-section document-section--compact">
            <div class="document-section__heading"><span class="small-rule"></span><h2>核心考察</h2></div>
            <p class="document-copy">${escapeHtml(question.assessment)}</p>
          </section>
          <section class="document-section document-section--compact">
            <div class="document-section__heading"><span class="small-rule small-rule--pale"></span><h2>能力收获</h2></div>
            <p class="document-copy">${escapeHtml(question.outcome)}</p>
          </section>
        </div>
        <form class="answer-form" autocomplete="off">
          <div class="answer-form__heading"><div><p class="section-kicker">本题作答</p><h2>我的回答</h2></div>
            <span class="save-state ${statusClass(currentSaveState)}" data-save-state aria-live="polite"><span class="save-state__dot"></span>${statusLabel(currentSaveState)}</span></div>
          <p class="save-guidance" data-save-guidance>${escapeHtml(statusGuidance(question.id, currentSaveState))}</p>
          ${fields}
          <label class="answer-field" for="answer-${escapeHtml(question.id)}"><span>${escapeHtml(question.answerLabel)}</span>
            <textarea id="answer-${escapeHtml(question.id)}" name="answer" rows="7" data-answer-field="answer" placeholder="${escapeHtml(question.placeholder)}">${escapeHtml(answer.answer ?? "")}</textarea>
          </label>
          <div class="attachment-box">
            <div><strong>添加附件</strong><span>单个文件不超过 50 MB。不会自动打开或运行附件。</span></div>
            <label class="button button--secondary upload-button">选择文件<input type="file" multiple accept="${escapeHtml(allowedExtensions)}" data-attachments></label>
            <ul class="attachment-list">${attachments.map((name) => `<li>${escapeHtml(name)}<button type="button" aria-label="移除 ${escapeHtml(name)}" data-remove-file="${escapeHtml(name)}">移除</button></li>`).join("")}</ul>
          </div>
          <p class="form-footnote">请勿在答案或附件中填写 API Key、密码或私人信息。</p>
        </form>
        <div class="question-pager">
          <button class="button button--secondary" type="button" data-previous="${escapeHtml(question.id)}" ${questionPosition === 1 ? "disabled" : ""}>← 上一题</button>
          <span>${String(questionPosition).padStart(2, "0")} / 10</span>
          <button class="button button--primary" type="button" data-next="${escapeHtml(question.id)}">${questionPosition === 10 ? "回到路线总览" : "下一题"} <span aria-hidden="true">→</span></button>
        </div>
      </article>
      <aside class="question-aside">
        <section class="save-card">
          <div class="save-card__top"><span class="save-card__symbol" aria-hidden="true">⌂</span><span class="local-badge">本机</span></div>
          <h2>你的进度，<br>留在这台电脑。</h2>
          <p>填写姓名和学号后，答案会保存到个人提交目录。重新打开同一份 App 可以接着完成。</p>
          <div class="save-card__state ${statusClass(currentSaveState)}" data-local-save-state><span class="save-state__dot"></span><span>${statusLabel(currentSaveState)}</span></div>
        </section>
        <section class="aside-route">
          <div class="aside-route__heading"><h2>本阶段</h2><span>${phaseQuestionCount(phase ?? data.phases[0])}/${phase?.questionIds.length ?? 0} 已填写</span></div>
          ${(phase?.questionIds ?? []).map((id) => {
            const item = questionsById.get(id);
            if (!item) return "";
            const answered = hasAnswer(id);
            return `<button type="button" class="aside-route__item${id === question.id ? " is-current" : ""}" data-question="${escapeHtml(id)}"><span class="aside-route__check">${answered ? "✓" : ""}</span><span>${escapeHtml(item.shortTitle)}</span></button>`;
          }).join("")}
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
    </dialog>`);

  root!.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[data-answer-field]").forEach((field) => {
    field.addEventListener("input", () => {
      getAnswer(question.id)[field.dataset.answerField ?? "answer"] = field.value;
      updateDraftStatus(question.id);
    });
  });
  root!.querySelector<HTMLInputElement>("[data-attachments]")?.addEventListener("change", (event) => {
    const input = event.currentTarget as HTMLInputElement;
    const names = attachmentDrafts.get(question.id) ?? [];
    for (const file of Array.from(input.files ?? [])) {
      if (!names.includes(file.name)) names.push(file.name);
    }
    attachmentDrafts.set(question.id, names);
    renderQuestion(question);
  });
  root!.querySelectorAll<HTMLButtonElement>("[data-remove-file]").forEach((button) => {
    button.addEventListener("click", () => {
      attachmentDrafts.set(question.id, attachments.filter((name) => name !== button.dataset.removeFile));
      renderQuestion(question);
    });
  });
  root!.querySelectorAll<HTMLButtonElement>("[data-checklist]").forEach((button) => {
    button.addEventListener("click", () => root!.querySelector<HTMLDialogElement>(".checklist-dialog")?.showModal());
  });
  root!.querySelector<HTMLButtonElement>("[data-previous]")?.addEventListener("click", () => moveQuestion(question.id, -1));
  root!.querySelector<HTMLButtonElement>("[data-next]")?.addEventListener("click", () => moveQuestion(question.id, 1));
}

function updateDraftStatus(questionId: string): void {
  saveErrors.delete(questionId);
  if (activeProfile) {
    saveStates.set(questionId, "pending");
    scheduleAnswerSave(questionId);
  } else {
    saveStates.set(questionId, "profile-required");
  }
  renderCurrentSaveState(questionId);
  const count = root!.querySelector<HTMLElement>(".topbar__progress strong");
  if (count) count.textContent = String(progressCount());
  for (const phase of data.phases) {
    const counter = root!.querySelector<HTMLElement>(`[data-phase="${CSS.escape(phase.id)}"] .route-group__count`);
    if (counter) counter.textContent = `${phaseQuestionCount(phase)}/${phase.questionIds.length}`;
  }
  root!.querySelectorAll<HTMLButtonElement>(".route-link[data-question]").forEach((button) => {
    const answered = hasAnswer(button.dataset.question ?? "");
    button.classList.toggle("is-answered", answered);
    const marker = button.querySelector<HTMLElement>(".route-link__marker");
    if (marker) marker.textContent = answered ? "✓" : (button.dataset.question ?? "").slice(1);
  });
  root!.querySelectorAll<HTMLButtonElement>(".aside-route__item[data-question]").forEach((button) => {
    const answered = hasAnswer(button.dataset.question ?? "");
    const marker = button.querySelector<HTMLElement>(".aside-route__check");
    if (marker) marker.textContent = answered ? "✓" : "";
  });
  const asideCounter = root!.querySelector<HTMLElement>(".aside-route__heading span");
  const currentQuestion = questionsById.get(questionId);
  const currentPhase = currentQuestion ? phasesById.get(currentQuestion.phaseId) : undefined;
  if (asideCounter && currentPhase) asideCounter.textContent = `${phaseQuestionCount(currentPhase)}/${currentPhase.questionIds.length} 已填写`;
}

function scheduleAnswerSave(questionId: string): void {
  if (!activeProfile) return;
  const previousTimer = pendingSaves.get(questionId);
  if (previousTimer) clearTimeout(previousTimer);
  const revision = (answerRevisions.get(questionId) ?? 0) + 1;
  answerRevisions.set(questionId, revision);
  saveStates.set(questionId, "pending");
  pendingSaves.set(questionId, setTimeout(async () => {
    pendingSaves.delete(questionId);
    if (!activeProfile) return;
    const profile = activeProfile;
    const snapshot = { ...getAnswer(questionId) };
    saveStates.set(questionId, "saving");
    renderCurrentSaveState(questionId);
    try {
      await saveAnswer(profile, questionId, snapshot);
      if (answerRevisions.get(questionId) === revision) saveStates.set(questionId, "saved");
      else return;
    } catch (error) {
      if (answerRevisions.get(questionId) === revision) {
        saveStates.set(questionId, "error");
        saveErrors.set(questionId, error instanceof Error ? error.message : "本机保存失败，请检查启动窗口和资料目录权限。");
      }
      else return;
    }
    renderCurrentSaveState(questionId);
  }, 650));
}

function flushPendingAnswers(): void {
  if (!activeProfile) return;
  const profile = activeProfile;
  for (const [questionId, timer] of pendingSaves) {
    clearTimeout(timer);
    pendingSaves.delete(questionId);
    const snapshot = { ...getAnswer(questionId) };
    void saveAnswer(profile, questionId, snapshot, true).then(() => {
      saveStates.set(questionId, "saved");
      saveErrors.delete(questionId);
      renderCurrentSaveState(questionId);
    }).catch(() => {
      saveStates.set(questionId, "error");
      saveErrors.set(questionId, "离开页面前保存失败，请重新打开本机服务并检查提交目录。");
      renderCurrentSaveState(questionId);
    });
  }
}

window.addEventListener("pagehide", flushPendingAnswers);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") flushPendingAnswers();
});

function renderCurrentSaveState(questionId: string): void {
  if (activeQuestionId !== questionId) return;
  const state = saveStates.get(questionId) ?? "not-started";
  const status = root!.querySelector<HTMLElement>("[data-save-state]");
  if (status) {
    status.className = `save-state ${statusClass(state)}`.trim();
    status.innerHTML = `<span class="save-state__dot"></span>${statusLabel(state)}`;
  }
  const guidance = root!.querySelector<HTMLElement>("[data-save-guidance]");
  if (guidance) guidance.textContent = statusGuidance(questionId, state);
  const localState = root!.querySelector<HTMLElement>("[data-local-save-state]");
  if (localState) {
    localState.className = `save-card__state ${statusClass(state)}`.trim();
    const label = localState.querySelector("span:last-child");
    if (label) label.textContent = statusLabel(state);
  }
}

function moveQuestion(currentId: string, offset: number): void {
  const index = data.questions.findIndex((question) => question.id === currentId);
  const nextQuestion = data.questions[index + offset];
  if (nextQuestion) {
    activeQuestionId = nextQuestion.id;
    renderQuestion(nextQuestion);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (offset > 0) {
    activeQuestionId = null;
    renderHome();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function showQuestion(questionId: string): void {
  activeQuestionId = questionId;
  const question = questionsById.get(questionId);
  if (question) renderQuestion(question);
}

root.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const questionButton = target.closest<HTMLElement>("[data-question]");
  if (questionButton?.dataset.question) {
    showQuestion(questionButton.dataset.question);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (target.closest("[data-home]")) {
    activeQuestionId = null;
    renderHome();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

renderHome();
