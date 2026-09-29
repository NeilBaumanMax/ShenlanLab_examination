(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const i=document.querySelector("#app");if(!i)throw new Error("找不到页面挂载节点 #app");i.innerHTML=`
  <main class="startup">
    <p class="startup__eyebrow">深蓝科技部 · 新生招新</p>
    <h1>AI Agent 闯关答题</h1>
    <p>应用基础页面已就绪，关卡内容正在施工中。</p>
  </main>
`;
