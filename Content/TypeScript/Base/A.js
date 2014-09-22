// handle multiple browsers for requestAnimationFrame()
window['requestAFrame'] = (function () {
    return window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'] || window['oRequestAnimationFrame'] || function (callback) {
        return window.setTimeout(callback, 1000 / 60);
    };
})();

// handle multiple browsers for cancelAnimationFrame()
window.cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame || window['webkitCancelAnimationFrame'] || window['mozCancelAnimationFrame'] || window['oCancelAnimationFrame'] || function (id) {
        window.clearTimeout(id);
    };
})();
//# sourceMappingURL=A.js.map
