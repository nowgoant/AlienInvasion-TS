/// <reference path="quintus.ts" />
var Quintus;
(function (Quintus) {
    function translateBuilder(attribute) {
        return function (dom, x, y) {
            dom.style[attribute] = "translate(" + Math.floor(x) + "px," + Math.floor(y) + "px)";
        };
    }

    function translate3DBuilder(attribute) {
        return function (dom, x, y) {
            dom.style[attribute] = "translate3d(" + Math.floor(x) + "px," + Math.floor(y) + "px,0px)";
        };
    }

    function scaleBuilder(attribute) {
        return function (dom, scale) {
            dom.style[attribute + 'Origin'] = "0% 0%";
            dom.style[attribute] = "scale(" + scale + ")";
        };
    }

    function fallbackTranslate(dom, x, y) {
        dom.style.left = x + "px";
        dom.style.top = y + "px";
    }

    var has3d = ('WebKitCSSMatrix' in window && 'm11' in new window['WebKitCSSMatrix']());
    var dummyStyle = document.createElement('div').style;
    var transformMethods = [
        'transform',
        'webkitTransform',
        'MozTransform',
        'msTransform'];
})(Quintus || (Quintus = {}));
//# sourceMappingURL=Quintus.Translate.js.map
