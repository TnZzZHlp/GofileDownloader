// ==UserScript==
// @name         Gofile Downloader
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Gofile 文件下载器（点击按钮触发下载）
// @match        https://gofile.io/*
// @run-at       document-end
// ==/UserScript==

(function () {
    "use strict";

    function initDownloader() {
        function downloadAll() {
            document
                .querySelectorAll("button.item_download.border.border-gray-600")
                .forEach((btn) => btn.click());
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
    }

    initDownloader();
})();
