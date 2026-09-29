import "./style.css";
import questionData from "../../content/questions.json";
import {
  createProfile,
  deleteSubmissionFile,
  getSubmissionFileTree,
  openSubmissionDirectory,
  saveAnswer,
  uploadAttachment,
  type StudentProfile,
  type StoredAnswer,
  type SubmissionFile,
  type SubmissionFileTree,
} from "./api";
import type { Phase, Question, QuestionData } from "./types";

/*
THESIS: Every answer belongs to a visible question folder and is saved only when the student submits it.
OWN-WORLD: The existing deep-blue and paper-white workbench, now organized around a compact exam card and a real local file tree.
STORY: Identify yourself, choose any question, work freely, then submit or revise its files at any time.
FIRST VIEWPORT: Identity form first; after entry, question work at left and the ten-question card plus submission tree at right.
FORM: Existing blue Operate system; keep task controls familiar and remove duplicate route chrome and explanatory copy.
*/

const root = document.querySelector<HTMLDivElement>("#app");
if (!root) throw new Error("找不到页面挂载节点 #app");

const data = questionData as QuestionData;
const questionsById = new Map(data.questions.map((question) => [question.id, question]));
const phasesById = new Map(data.phases.map((phase) => [phase.id, phase]));
const answerDrafts = new Map<string, StoredAnswer>();
const committedAnswers = new Map<string, StoredAnswer>();
const pendingFiles = new Map<string, File[]>();
const saveStates = new Map<string, SaveState>();
const attachmentMessages = new Map<string, string>();
let activeQuestionId: string | null = null;
let activeProfile: StudentProfile | null = null;
let fileTree: SubmissionFileTree | null = null;
let profileSubmitting = false;
let answerSubmitting: string | null = null;
let directoryMessage = "";
let narrowSideTab = "exam";

type SaveState = "empty" | "dirty" | "review-required" | "saving" | "saved" | "error";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character] ?? character);
}

function getAnswer(questionId: string): StoredAnswer {
  let answer = answerDrafts.get(questionId);
  if (!answer) {
    answer = {};
    answerDrafts.set(questionId, answer);
  }
  return answer;
}

function hasPotentialSecret(text: string): boolean {
  return [
    /sk-(?:ant-)?[A-Za-z0-9_-]{16,}/i,
    /gh[pousr]_[A-Za-z0-9]{20,}/,
    /AIza[0-9A-Za-z_-]{30,}/,
    /AKIA[0-9A-Z]{16}/,
    /(?:api[_ -]?key|password|secret|密钥|密码)\s*[:=：]\s*["']?[A-Za-z0-9_./+=-]{8,}/i,
  ].some((pattern) => pattern.test(text));
}

function hasData(fields: StoredAnswer | undefined): boolean {
  return Object.values(fields ?? {}).some((value) => value.trim().length > 0);
}

function hasSubmittedFiles(questionId: string): boolean {
  return (fileTree?.questions.find((item) => item.id === questionId)?.files.length ?? 0) > 0;
}

function isSubmitted(questionId: string): boolean {
  return hasData(committedAnswers.get(questionId)) || hasSubmittedFiles(questionId);
}

function normalizedAnswer(fields: StoredAnswer | undefined): string {
  return JSON.stringify(Object.fromEntries(Object.entries(fields ?? {}).sort(([a], [b]) => a.localeCompare(b))));
}

function hasChanges(questionId: string): boolean {
  return normalizedAnswer(answerDrafts.get(questionId)) !== normalizedAnswer(committedAnswers.get(questionId))
    || (pendingFiles.get(questionId)?.length ?? 0) > 0;
}

function questionState(questionId: string): SaveState {
  const state = saveStates.get(questionId);
  if (state === "saving" || state === "error" || state === "review-required") return state;
  if (hasChanges(questionId)) return "dirty";
  return isSubmitted(questionId) ? "saved" : "empty";
}

function statusLabel(state: SaveState): string {
  return ({
    empty: "未提交", dirty: "有修改", "review-required": "检查内容", saving: "提交中", saved: "已提交", error: "提交失败",
  })[state];
}

function statusClass(state: SaveState): string {
  return state === "saved" ? "is-saved" : state === "dirty" || state === "saving" || state === "review-required"
    ? "is-pending" : state === "error" ? "is-error" : "";
}

function progressCount(): number {
  return data.questions.filter((question) => isSubmitted(question.id)).length;
}

function hydrateProfile(response: Awaited<ReturnType<typeof createProfile>>): void {
  activeProfile = response.profile;
  fileTree = response.fileTree;
  answerDrafts.clear();
  committedAnswers.clear();
  pendingFiles.clear();
  for (const question of data.questions) {
    const fields = response.answers[question.id] ?? {};
    answerDrafts.set(question.id, { ...fields });
    committedAnswers.set(question.id, { ...fields });
    if (hasData(fields) || response.attachments[question.id]?.length) saveStates.set(question.id, "saved");
    else saveStates.set(question.id, "empty");
  }
}

function renderIdentityGate(): void {
  root!.innerHTML = `
    <main class="identity-gate">
      <section class="identity-panel" aria-labelledby="identity-title">
        <a class="brand" href="#" aria-label="深蓝科技部答题 App">
          <span class="brand__seal" aria-hidden="true">深</span>
          <span class="brand__text"><strong>深蓝科技部</strong><small>AI AGENT QUEST</small></span>
        </a>
        <h1 id="identity-title">先登记，再开始答题</h1>
        <form class="identity-form" data-profile-form>
          <label>姓名<input name="name" autocomplete="name" maxlength="48" required placeholder="请输入姓名"></label>
          <label>学号<input name="studentId" autocomplete="off" maxlength="48" required placeholder="请输入学号"></label>
          <p class="identity-path" data-profile-message>提交文件保存在本机：提交资料/姓名_学号</p>
          <button class="button button--primary" type="submit" ${profileSubmitting ? "disabled" : ""}>
            ${profileSubmitting ? "正在读取进度…" : "进入答题"}
          </button>
        </form>
      </section>
    </main>`;
}

function renderExamCard(): string {
  const buttons = data.questions.map((question, index) => {
    const state = questionState(question.id);
    const label = `${index + 1} ${question.shortTitle}，${statusLabel(state)}`;
    return `<button type="button" class="exam-number ${statusClass(state)}${activeQuestionId === question.id ? " is-current" : ""}"
      data-question="${escapeHtml(question.id)}" aria-label="${escapeHtml(label)}"${activeQuestionId === question.id ? ' aria-current="step"' : ""}>
      <span>${String(index + 1).padStart(2, "0")}</span>${state === "saved" ? '<i aria-hidden="true">✓</i>' : ""}
    </button>`;
  }).join("");
  return `<section class="side-panel exam-panel" aria-labelledby="exam-title">
    <div class="side-panel__heading"><h2 id="exam-title">答题卡</h2><span>${progressCount()} / 10 已提交</span></div>
    <div class="exam-grid">${buttons}</div>
    <div class="exam-legend"><span><i class="legend-empty"></i>未提交</span><span><i class="legend-dirty"></i>有修改</span><span><i class="legend-saved">✓</i>已提交</span></div>
  </section>`;
}

function renderFileItem(questionId: string, file: SubmissionFile): string {
  const deleteLabel = `删除 ${questionsById.get(questionId)?.shortTitle ?? questionId} 中的 ${file.name}`;
  return `<li class="file-row"><span class="file-glyph" aria-hidden="true">${file.name.toLowerCase().endsWith(".txt") ? "TXT" : "FILE"}</span>
    <span class="file-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</span>
    <button class="file-delete" type="button" data-delete-file data-question-id="${escapeHtml(questionId)}" data-filename="${escapeHtml(file.name)}" aria-label="${escapeHtml(deleteLabel)}">×</button></li>`;
}

function renderFileTree(): string {
  if (!fileTree) return `<p class="tree-empty">填写身份后显示你的提交文件。</p>`;
  const rootFiles = fileTree.rootFiles.map((file) => `<li class="file-row"><span class="file-glyph" aria-hidden="true">TXT</span><span class="file-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</span></li>`).join("");
  const directories = fileTree.questions.map((directory) => {
    const question = questionsById.get(directory.id);
    const files = directory.files.length
      ? directory.files.map((file) => renderFileItem(directory.id, file)).join("")
      : `<li class="tree-empty tree-empty--small">暂无文件</li>`;
    return `<details class="tree-directory"${activeQuestionId === directory.id ? " open" : ""}>
      <summary><span class="folder-icon" aria-hidden="true">▸</span><span>${escapeHtml(directory.id)} ${escapeHtml(question?.shortTitle ?? directory.directoryName)}</span><small>${directory.files.length}</small></summary>
      <button class="tree-open-question" type="button" data-question="${escapeHtml(directory.id)}">打开本题</button>
      <ul>${files}</ul>
    </details>`;
  }).join("");
  return `<div class="file-tree" aria-label="提交文件目录">
    <div class="tree-root"><span class="folder-icon" aria-hidden="true">▾</span><strong>${escapeHtml(fileTree.directoryName)}</strong></div>
    <ul class="tree-root-files">${rootFiles || `<li class="tree-empty tree-empty--small">暂无根目录文件</li>`}</ul>
    ${directories}
  </div>`;
}

function renderSidePanel(): string {
  return `<aside class="workspace-side" aria-label="答题状态和提交文件">
    <div class="side-tabs" role="tablist" aria-label="侧栏内容">
      <button type="button" role="tab" aria-selected="${narrowSideTab === "exam"}" data-side-tab="exam">答题卡</button>
      <button type="button" role="tab" aria-selected="${narrowSideTab === "files"}" data-side-tab="files">提交文件</button>
    </div>
    <div class="side-panels">
      <div class="side-tab-panel${narrowSideTab === "files" ? " is-mobile-hidden" : ""}" data-side-panel="exam">${renderExamCard()}</div>
      <div class="side-tab-panel${narrowSideTab === "exam" ? " is-mobile-hidden" : ""}" data-side-panel="files">
        <section class="side-panel file-panel" aria-labelledby="files-title">
          <div class="side-panel__heading"><h2 id="files-title">提交文件</h2><button type="button" class="text-button" data-open-directory>打开文件夹</button></div>
          <p class="directory-path">提交资料/${escapeHtml(activeProfile?.directoryName ?? "")}</p>
          ${renderFileTree()}
          <p class="directory-message" role="status" data-directory-message>${escapeHtml(directoryMessage)}</p>
        </section>
      </div>
    </div>
  </aside>`;
}

function renderShell(content: string): void {
  root!.innerHTML = `<div class="app-shell">
    <header class="topbar">
      <button class="brand" type="button" data-home>
        <span class="brand__seal" aria-hidden="true">深</span>
        <span class="brand__text"><strong>深蓝科技部</strong><small>AI AGENT QUEST</small></span>
      </button>
      <div class="topbar__identity"><span class="identity-avatar" aria-hidden="true">${escapeHtml(activeProfile?.name.slice(0, 1) ?? "")}</span>
        <span>${escapeHtml(activeProfile?.name ?? "")} <small>${escapeHtml(activeProfile?.studentId ?? "")}</small></span>
      </div>
    </header>
    <div class="workbench"><main class="workspace" id="main-content">${content}</main>${renderSidePanel()}</div>
  </div>`;
}

function renderHome(): void {
  const phases = data.phases.map((phase: Phase, index) => `
    <button class="phase-row" type="button" data-question="${escapeHtml(phase.questionIds[0] ?? "Q01")}">
      <span class="phase-row__number">0${index + 1}</span>
      <span class="phase-row__copy"><strong>${escapeHtml(phase.title)}</strong><small>${escapeHtml(phase.summary)}</small></span>
      <span class="phase-row__count">${phase.questionIds.length} 题</span><span aria-hidden="true">→</span>
    </button>`).join("");
  const next = data.questions.find((question) => !isSubmitted(question.id)) ?? data.questions[0];
  renderShell(`<section class="home-heading">
    <p class="eyebrow">AI Agent 闯关答题</p>
    <h1>选择一道题，开始作答</h1>
    <p>提交后文件保存在本机，可随时修改并重新提交。</p>
    <button class="button button--primary" type="button" data-question="${escapeHtml(next.id)}">${progressCount() ? "继续答题" : "从第 1 题开始"} <span aria-hidden="true">→</span></button>
  </section>
  <section class="route-overview" aria-labelledby="route-heading"><h2 id="route-heading">学习路线</h2><div class="phase-list">${phases}</div></section>
  <p class="privacy-note">答案只保存在这台电脑。完成后请自行压缩个人目录并提交。</p>`);
}

function renderQuestion(question: Question): void {
  activeQuestionId = question.id;
  const phase = phasesById.get(question.phaseId);
  const questionPosition = data.questions.findIndex((item) => item.id === question.id) + 1;
  const answer = getAnswer(question.id);
  const resources = question.resources.map((resource) => {
    const external = /^https?:\/\//.test(resource.url);
    return `<a class="resource-link" href="${escapeHtml(resource.url)}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${escapeHtml(resource.label)} <span aria-hidden="true">↗</span></a>`;
  }).join("");
  const fields = (question.fields ?? []).map((field) => `
    <label class="answer-field" for="${escapeHtml(question.id)}-${escapeHtml(field.id)}"><span>${escapeHtml(field.label)}</span>
      <input id="${escapeHtml(question.id)}-${escapeHtml(field.id)}" type="${field.type === "url" ? "url" : "text"}" value="${escapeHtml(answer[field.id] ?? "")}"
        placeholder="${escapeHtml(field.placeholder ?? "")}" data-answer-field="${escapeHtml(field.id)}" data-question-id="${escapeHtml(question.id)}">
    </label>`).join("");
  const state = questionState(question.id);
  const staged = pendingFiles.get(question.id) ?? [];
  const stagedList = staged.length ? `<ul class="staged-files">${staged.map((file, index) => `<li><span>${escapeHtml(file.name)}</span><button type="button" data-remove-staged="${index}" data-question-id="${escapeHtml(question.id)}">移除</button></li>`).join("")}</ul>` : "";
  const message = attachmentMessages.get(question.id) ?? "";
  const dirtyWarning = state === "dirty" ? "修改尚未提交" : state === "saved" ? "本题已提交；可修改后再次提交" : "填写答案后点击提交本题";
  renderShell(`<article class="question-view">
    <div class="question-heading">
      <div class="breadcrumbs"><button type="button" data-home>全部题目</button><span>/</span><span>${escapeHtml(phase?.title ?? "任务")}</span></div>
      <div class="question-heading__row"><div><p class="eyebrow">第 ${questionPosition} 题 · ${escapeHtml(phase?.title ?? "")}</p><h1>${escapeHtml(question.title)}</h1></div><span class="question-index">${String(questionPosition).padStart(2, "0")}<i> / 10</i></span></div>
    </div>
    <section class="task-block"><h2>题目</h2><p>${escapeHtml(question.task)}</p>
      <details class="task-expectation"><summary>提交要求</summary><p>${escapeHtml(question.expectation)}</p><p>${escapeHtml(question.assessment)}</p><p>${escapeHtml(question.outcome)}</p></details>
    </section>
    ${resources ? `<nav class="resource-list" aria-label="本题资料">${resources}</nav>` : ""}
    <form class="answer-form" data-answer-form data-question-id="${escapeHtml(question.id)}" autocomplete="off">
      <div class="answer-form__heading"><h2>我的答案</h2><span class="save-state ${statusClass(state)}" data-current-state role="status">${statusLabel(state)}</span></div>
      ${fields}
      <label class="answer-field" for="answer-${escapeHtml(question.id)}"><span>${escapeHtml(question.answerLabel)}</span>
        <textarea id="answer-${escapeHtml(question.id)}" rows="7" data-answer-field="answer" data-question-id="${escapeHtml(question.id)}" placeholder="${escapeHtml(question.placeholder)}">${escapeHtml(answer.answer ?? "")}</textarea>
      </label>
      <div class="attachment-box"><div><strong>添加图片或文件</strong><span>单个文件不超过 50 MB</span></div>
        <label class="button button--secondary upload-button">选择文件<input type="file" multiple accept="${escapeHtml(question.allowedExtensions.join(","))}" data-staged-files="${escapeHtml(question.id)}"></label>
        ${stagedList}
      </div>
      <p class="form-message" data-form-message role="status">${escapeHtml(message || dirtyWarning)}</p>
      <p class="form-warning" data-credential-warning>不要提交 API Key、密码或私人信息。</p>
      <div class="answer-actions"><button class="button button--primary" type="submit" data-submit-question ${answerSubmitting === question.id ? "disabled" : ""}>${answerSubmitting === question.id ? "正在提交…" : "提交本题"}</button>
        <span>可再次修改并提交覆盖</span></div>
    </form>
    <nav class="question-pager" aria-label="题目导航">
      <button class="button button--secondary" type="button" data-step="-1"${questionPosition === 1 ? " disabled" : ""}>← 上一题</button>
      <button class="button button--secondary" type="button" data-step="1">${questionPosition === 10 ? "回到题目列表" : "下一题 →"}</button>
    </nav>
  </article>`);
}

async function refreshFileTree(): Promise<void> {
  if (!activeProfile) return;
  const result = await getSubmissionFileTree(activeProfile);
  fileTree = result.fileTree;
}

function updateLiveStatus(questionId: string): void {
  const state = questionState(questionId);
  const current = root!.querySelector<HTMLElement>("[data-current-state]");
  if (activeQuestionId === questionId && current) {
    current.className = `save-state ${statusClass(state)}`.trim();
    current.textContent = statusLabel(state);
  }
  root!.querySelectorAll<HTMLButtonElement>(".exam-number[data-question]").forEach((button) => {
    const id = button.dataset.question ?? "";
    const next = questionState(id);
    const number = data.questions.findIndex((question) => question.id === id) + 1;
    button.className = `exam-number ${statusClass(next)}${id === activeQuestionId ? " is-current" : ""}`.trim();
    button.setAttribute("aria-label", `${number} ${questionsById.get(id)?.shortTitle ?? id}，${statusLabel(next)}`);
    button.innerHTML = `<span>${String(number).padStart(2, "0")}</span>${next === "saved" ? '<i aria-hidden="true">✓</i>' : ""}`;
  });
  const count = root!.querySelector<HTMLElement>(".side-panel__heading span");
  if (count) count.textContent = `${progressCount()} / 10 已提交`;
}

function updateDraftStatus(questionId: string): void {
  const answer = getAnswer(questionId);
  const warning = root!.querySelector<HTMLElement>("[data-credential-warning]");
  const secret = hasPotentialSecret(Object.values(answer).join("\n"));
  if (warning) {
    warning.textContent = secret ? "检测到疑似密钥或密码。请删除或打码后再提交；仅在本机检查。" : "不要提交 API Key、密码或私人信息。";
    warning.classList.toggle("is-warning", secret);
  }
  saveStates.set(questionId, secret ? "review-required" : hasChanges(questionId) ? "dirty" : isSubmitted(questionId) ? "saved" : "empty");
  const message = root!.querySelector<HTMLElement>("[data-form-message]");
  if (message && !attachmentMessages.has(questionId)) message.textContent = secret ? "请检查敏感内容后再提交。" : hasChanges(questionId) ? "修改尚未提交" : isSubmitted(questionId) ? "本题已提交；可修改后再次提交" : "填写答案后点击提交本题";
  updateLiveStatus(questionId);
}

async function submitQuestion(question: Question, form: HTMLFormElement): Promise<void> {
  if (!activeProfile || answerSubmitting) return;
  const fields = { ...getAnswer(question.id) };
  if (hasPotentialSecret(Object.values(fields).join("\n"))) {
    saveStates.set(question.id, "review-required");
    updateDraftStatus(question.id);
    return;
  }
  const files = [...(pendingFiles.get(question.id) ?? [])];
  for (const file of files) {
    if ([".txt", ".md"].includes(file.name.slice(file.name.lastIndexOf(".")).toLowerCase()) && hasPotentialSecret(await file.text())) {
      if (!window.confirm(`${file.name} 可能包含密钥或密码。仍要保存到本机吗？`)) return;
    }
  }
  answerSubmitting = question.id;
  saveStates.set(question.id, "saving");
  const message = form.querySelector<HTMLElement>("[data-form-message]");
  if (message) message.textContent = "正在保存本题文件…";
  const submitButton = form.querySelector<HTMLButtonElement>("[data-submit-question]");
  if (submitButton) { submitButton.disabled = true; submitButton.textContent = "正在提交…"; }
  updateLiveStatus(question.id);
  let uploadedCount = 0;
  try {
    await saveAnswer(activeProfile, question.id, fields);
    committedAnswers.set(question.id, { ...fields });
    for (const file of files) {
      await uploadAttachment(activeProfile, question.id, file);
      const remaining = (pendingFiles.get(question.id) ?? []).filter((candidate) => candidate !== file);
      pendingFiles.set(question.id, remaining);
      uploadedCount += 1;
    }
    await refreshFileTree();
    saveStates.set(question.id, "saved");
    attachmentMessages.delete(question.id);
    directoryMessage = "文件列表已更新。";
  } catch (error) {
    saveStates.set(question.id, "error");
    const detail = error instanceof Error ? error.message : "提交失败，请重试。";
    attachmentMessages.set(question.id, uploadedCount ? `答案已保存，部分文件未提交：${detail}` : detail);
  } finally {
    answerSubmitting = null;
    if (activeQuestionId === question.id) renderQuestion(question);
    else renderHome();
  }
}

function filenameField(question: Question, filename: string): string | null {
  if (filename === "回答.txt") return "answer";
  return (question.fields ?? []).find((field) => {
    const fieldName = field.id === "repository" ? "GitHub仓库链接.txt" : `${field.label.replace(/[^\p{L}\p{N} _()·-]/gu, "")}.txt`;
    return fieldName === filename;
  })?.id ?? null;
}

async function deleteFile(questionId: string, filename: string): Promise<void> {
  if (!activeProfile || !window.confirm(`删除 ${filename}？此操作无法撤销。`)) return;
  try {
    await deleteSubmissionFile(activeProfile, questionId, filename);
    const question = questionsById.get(questionId);
    const field = question ? filenameField(question, filename) : null;
    if (field) {
      answerDrafts.set(questionId, { ...getAnswer(questionId), [field]: "" });
      committedAnswers.set(questionId, { ...(committedAnswers.get(questionId) ?? {}), [field]: "" });
    }
    await refreshFileTree();
    saveStates.set(questionId, isSubmitted(questionId) ? "saved" : "empty");
    directoryMessage = `${filename} 已删除。`;
  } catch (error) {
    directoryMessage = error instanceof Error ? error.message : "无法删除文件。";
  }
  if (activeQuestionId) renderQuestion(questionsById.get(activeQuestionId)!);
  else renderHome();
}

root.addEventListener("submit", (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  event.preventDefault();
  if (form.matches("[data-profile-form]")) {
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "");
    const studentId = String(formData.get("studentId") ?? "");
    profileSubmitting = true;
    renderIdentityGate();
    void createProfile(name, studentId).then((response) => {
      hydrateProfile(response);
      profileSubmitting = false;
      renderHome();
    }).catch((error: unknown) => {
      profileSubmitting = false;
      renderIdentityGate();
      const status = root!.querySelector<HTMLElement>("[data-profile-message]");
      if (status) status.textContent = error instanceof Error ? error.message : "无法读取本机资料，请重试。";
      root!.querySelector<HTMLInputElement>('input[name="name"]')?.setAttribute("value", name);
      root!.querySelector<HTMLInputElement>('input[name="studentId"]')?.setAttribute("value", studentId);
    });
    return;
  }
  if (form.matches("[data-answer-form]")) {
    const question = questionsById.get(form.dataset.questionId ?? "");
    if (question) void submitQuestion(question, form);
  }
});

root.addEventListener("input", (event) => {
  const field = event.target;
  if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) || !field.matches("[data-answer-field]")) return;
  const questionId = field.dataset.questionId ?? "";
  getAnswer(questionId)[field.dataset.answerField ?? "answer"] = field.value;
  updateDraftStatus(questionId);
});

root.addEventListener("change", (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.matches("[data-staged-files]")) return;
  const questionId = input.dataset.stagedFiles ?? "";
  const question = questionsById.get(questionId);
  if (!question) return;
  const allowed = new Set(question.allowedExtensions.map((extension) => extension.toLowerCase()));
  const staged = pendingFiles.get(questionId) ?? [];
  const errors: string[] = [];
  for (const file of Array.from(input.files ?? [])) {
    const extensionIndex = file.name.lastIndexOf(".");
    const extension = extensionIndex >= 0 ? file.name.slice(extensionIndex).toLowerCase() : "";
    if (!allowed.has(extension)) errors.push(`${file.name}：不支持此文件类型。`);
    else if (file.size > data.uploadDefaults.maxFileBytes) errors.push(`${file.name}：超过 50 MB。`);
    else if (!staged.some((candidate) => candidate.name === file.name && candidate.size === file.size)) staged.push(file);
  }
  pendingFiles.set(questionId, staged);
  if (errors.length) attachmentMessages.set(questionId, errors.join(" "));
  else attachmentMessages.delete(questionId);
  saveStates.set(questionId, hasChanges(questionId) ? "dirty" : isSubmitted(questionId) ? "saved" : "empty");
  if (activeQuestionId === questionId) renderQuestion(question);
});

root.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const tab = target.closest<HTMLButtonElement>("[data-side-tab]");
  if (tab) { narrowSideTab = tab.dataset.sideTab ?? "exam"; if (activeQuestionId) renderQuestion(questionsById.get(activeQuestionId)!); else renderHome(); return; }
  const deleteButton = target.closest<HTMLButtonElement>("[data-delete-file]");
  if (deleteButton) { void deleteFile(deleteButton.dataset.questionId ?? "", deleteButton.dataset.filename ?? ""); return; }
  const openButton = target.closest<HTMLButtonElement>("[data-open-directory]");
  if (openButton && activeProfile) {
    openButton.disabled = true;
    void openSubmissionDirectory(activeProfile).then((result) => { directoryMessage = `已打开 ${result.directoryName}`; })
      .catch((error: unknown) => { directoryMessage = error instanceof Error ? error.message : "无法打开提交目录。"; })
      .finally(() => { if (activeQuestionId) renderQuestion(questionsById.get(activeQuestionId)!); else renderHome(); });
    return;
  }
  const removeStaged = target.closest<HTMLButtonElement>("[data-remove-staged]");
  if (removeStaged) {
    const questionId = removeStaged.dataset.questionId ?? "";
    const files = pendingFiles.get(questionId) ?? [];
    files.splice(Number(removeStaged.dataset.removeStaged), 1);
    pendingFiles.set(questionId, files);
    const question = questionsById.get(questionId);
    if (question && activeQuestionId === questionId) renderQuestion(question);
    return;
  }
  const step = target.closest<HTMLButtonElement>("[data-step]");
  if (step && activeQuestionId) {
    const currentIndex = data.questions.findIndex((question) => question.id === activeQuestionId);
    const next = data.questions[currentIndex + Number(step.dataset.step)];
    if (next) renderQuestion(next);
    else renderHome();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const questionButton = target.closest<HTMLElement>("[data-question]");
  if (questionButton?.dataset.question) {
    const question = questionsById.get(questionButton.dataset.question);
    if (question) renderQuestion(question);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (target.closest("[data-home]")) { activeQuestionId = null; renderHome(); window.scrollTo({ top: 0, behavior: "smooth" }); }
});

window.addEventListener("beforeunload", (event) => {
  const dirty = data.questions.some((question) => hasChanges(question.id));
  if (dirty) { event.preventDefault(); event.returnValue = ""; }
});

renderIdentityGate();
