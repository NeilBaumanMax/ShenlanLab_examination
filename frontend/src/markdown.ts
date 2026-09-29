function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character] ?? character);
}

function renderInline(source: string): string {
  const code: string[] = [];
  let value = escapeHtml(source).replace(/`([^`]+)`/g, (_match, content: string) => {
    const marker = `\u0000CODE${code.length}\u0000`;
    code.push(`<code>${content}</code>`);
    return marker;
  });
  value = value.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  value = value.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  value = value.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>");
  return value.replace(/\u0000CODE(\d+)\u0000/g, (_match, index: string) => code[Number(index)] ?? "");
}

function cells(line: string): string[] {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function isTableDivider(line: string): boolean {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function isUnorderedList(line: string): boolean {
  return /^\s*[-*+]\s+/.test(line);
}

function isOrderedList(line: string): boolean {
  return /^\s*\d+[.)]\s+/.test(line);
}

function isBlockStart(lines: string[], index: number): boolean {
  const line = lines[index] ?? "";
  return /^```/.test(line) || /^#{1,6}\s/.test(line) || /^>/.test(line) ||
    isUnorderedList(line) || isOrderedList(line) || /^\s*\|/.test(line) ||
    /^\s*(---+|\*\*\*+)\s*$/.test(line);
}

function headingClass(title: string): string {
  const label = title.replace(/<[^>]*>/g, "").trim();
  if (label === "任务") return " md-heading--task";
  if (label === "我们希望看到") return " md-heading--expectation";
  if (label === "核心考察") return " md-heading--assessment";
  if (label.includes("安全提醒")) return " md-heading--safety";
  if (label.includes("提交内容")) return " md-heading--submission";
  if (label.includes("阅读导读") || label === "导读") return " md-heading--reading";
  return "";
}

export function renderMarkdown(source: string): string {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const html: string[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index] ?? "";
    if (!line.trim()) { index += 1; continue; }

    if (line.startsWith("```")) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index]!.startsWith("```")) code.push(lines[index++]!);
      if (index < lines.length) index += 1;
      html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      const level = Math.min(Number(heading[1]!.length) + 1, 6);
      const title = renderInline(heading[2]!);
      html.push(`<h${level} class="md-heading${headingClass(title)}">${title}</h${level}>`);
      index += 1;
      continue;
    }

    if (index + 1 < lines.length && /^\s*\|/.test(line) && isTableDivider(lines[index + 1]!)) {
      const headers = cells(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && /^\s*\|/.test(lines[index]!)) rows.push(cells(lines[index++]!));
      html.push(`<div class="md-table-wrap"><table><thead><tr>${headers.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${headers.map((_cell, cellIndex) => `<td>${renderInline(row[cellIndex] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index]!)) quote.push(renderInline(lines[index++]!.replace(/^>\s?/, "")));
      html.push(`<blockquote>${quote.map((item) => `<p>${item}</p>`).join("")}</blockquote>`);
      continue;
    }

    if (isUnorderedList(line) || isOrderedList(line)) {
      const ordered = isOrderedList(line);
      const firstNumber = ordered ? Number(line.match(/^\s*(\d+)/)?.[1] ?? 1) : 1;
      const items: string[] = [];
      while (index < lines.length && (ordered ? isOrderedList(lines[index]!) : isUnorderedList(lines[index]!))) {
        const item = lines[index++]!.replace(ordered ? /^\s*\d+[.)]\s+/ : /^\s*[-*+]\s+/, "");
        const checkbox = item.match(/^\[([ xX])\]\s+(.*)$/);
        items.push(checkbox
          ? `<li class="md-checkbox"><span aria-hidden="true">${checkbox[1]!.trim() ? "☑" : "☐"}</span>${renderInline(checkbox[2]!)}</li>`
          : `<li>${renderInline(item)}</li>`);
      }
      html.push(ordered
        ? `<ol start="${firstNumber}">${items.join("")}</ol>`
        : `<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\s*(---+|\*\*\*+)\s*$/.test(line)) { html.push("<hr>"); index += 1; continue; }

    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index]!.trim() && !isBlockStart(lines, index)) paragraph.push(lines[index++]!.trim());
    html.push(`<p>${paragraph.map(renderInline).join("<br>")}</p>`);
  }
  return html.join("\n");
}

export function extractQuestionMarkdown(document: string): Map<string, string> {
  const headings = [...document.matchAll(/^### 第\s*(\d+)\s*题：[^\n]*\n/gm)];
  const questions = new Map<string, string>();
  headings.forEach((heading, position) => {
    const start = heading.index! + heading[0].length;
    const nextQuestion = headings[position + 1]?.index ?? document.length;
    const nextGlobalSection = document.indexOf("\n## 三、我们如何看待你的表现", start);
    const end = nextGlobalSection >= 0 ? Math.min(nextQuestion, nextGlobalSection) : nextQuestion;
    questions.set(`Q${String(Number(heading[1])).padStart(2, "0")}`, document.slice(start, end).trim());
  });
  return questions;
}

export function extractSection(document: string, heading: string): string {
  const startAt = document.indexOf(heading);
  if (startAt < 0) return "";
  const start = document.indexOf("\n", startAt) + 1;
  const next = document.indexOf("\n## ", start);
  return document.slice(start, next < 0 ? document.length : next).trim();
}

export function extractIntroduction(document: string): string {
  const startAt = document.indexOf("## 一、我们为什么这样设计考核");
  if (startAt < 0) return "";
  const start = document.indexOf("\n", startAt) + 1;
  const end = document.indexOf("### 推荐闯关顺序", start);
  return document.slice(start, end < 0 ? document.length : end).trim();
}

export function extractExamSummary(document: string): string {
  const end = document.indexOf("\n## 一、我们为什么这样设计考核");
  if (end < 0) return "";
  return document.slice(0, end).replace(/^# [^\n]*\n/, "").trim();
}

export function extractStudentOverview(document: string): string[] {
  const headings = [
    "## 二、作答与提交说明",
    "## 三、我们如何看待你的表现",
    "## 五、学习资料与工具入口",
    "## 六、最终提交清单",
  ];
  return headings.map((heading) => extractSection(document, heading)).filter(Boolean);
}

export function splitReadingGuide(markdown: string): { reading: string; task: string } {
  const readingHeading = /^#### (阅读导读[^\n]*|导读)\s*$/m.exec(markdown);
  const taskHeading = /^#### 任务\s*$/m.exec(markdown);
  if (!readingHeading || !taskHeading || taskHeading.index <= readingHeading.index) return { reading: "", task: markdown };
  return {
    reading: markdown.slice(readingHeading.index + readingHeading[0].length, taskHeading.index).trim(),
    task: markdown.slice(0, readingHeading.index) + markdown.slice(taskHeading.index),
  };
}
