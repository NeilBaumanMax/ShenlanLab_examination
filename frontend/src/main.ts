import "./style.css";

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("找不到页面挂载节点 #app");
}

root.innerHTML = `
  <main class="startup">
    <p class="startup__eyebrow">深蓝科技部 · 新生招新</p>
    <h1>AI Agent 闯关答题</h1>
    <p>应用基础页面已就绪，关卡内容正在施工中。</p>
  </main>
`;
