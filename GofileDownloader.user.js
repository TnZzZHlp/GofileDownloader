// ==UserScript==
// @name         Gofile Downloader
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Gofile 文件下载器（点击按钮触发下载）
// @match        https://gofile.io/*
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function () {
    "use strict";
    console.log("[Userscript] Gofile Downloader 启动");

    const appdata = unsafeWindow.appdata;
    if (!appdata) {
        console.warn("[Userscript] 无法找到 appdata");
        return;
    }

    // 下载所有文件的函数
    function downloadAll() {
        Object.values(appdata.children).forEach((child) => {
            if (child && child.link) {
                const a = document.createElement("a");
                a.href = child.link;
                a.download = child.filename || "";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });
    }

    // 在右下角创建一个按钮
    const btn = document.createElement("button");
    btn.textContent = "下载所有文件";
    btn.style.cssText = [
        "position: fixed",
        "bottom: 20px",
        "right: 20px",
        "z-index: 9999",
        "padding: 8px 12px",
        "background: #007bff",
        "color: #fff",
        "border: none",
        "border-radius: 4px",
        "cursor: pointer",
    ].join(";");
    document.body.appendChild(btn);

    // 点击按钮时触发下载
    btn.addEventListener("click", downloadAll);
})();
