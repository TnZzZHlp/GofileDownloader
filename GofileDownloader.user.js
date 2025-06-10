// ==UserScript==
// @name         Gofile Downloader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Gofile 文件下载器
// @match        https://gofile.io/*    // 根据实际页面 URL 修改或精确匹配
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function () {
    "use strict";
    // 通过 unsafeWindow 获取页面上下文里的全局变量
    const appdata = unsafeWindow.appdata;
    if (!appdata) {
        console.warn("[Userscript] 无法找到 appdata");
        return;
    }
    Object.values(appdata.children).forEach((child) => {
        if (child && child.link) {
            const a = document.createElement("a");
            a.href = child.link;
            // 如果你有 filename 字段，可以这样设置下载时的文件名
            a.download = child.filename || "";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
})();
