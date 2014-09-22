// handle multiple browsers for requestAnimationFrame()
window.requestAnimationFrame = (function () {
    var lastTime = 0;
    return window.requestAnimationFrame || window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'] || window['oRequestAnimationFrame'] || function (callback) {
        // return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
})();

// handle multiple browsers for cancelAnimationFrame()
window.cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame || window['webkitCancelAnimationFrame'] || window['mozCancelAnimationFrame'] || window['oCancelAnimationFrame'] || function (id) {
        window.clearTimeout(id);
    };
})();
//# sourceMappingURL=RequestAnimationFrame.js.map
