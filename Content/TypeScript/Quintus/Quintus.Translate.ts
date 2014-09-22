/// <reference path="quintus.ts" />

module Quintus {
    function translateBuilder(attribute) {
        return function (dom, x, y) {
            dom.style[attribute] =
            "translate(" + Math.floor(x) + "px," +
            Math.floor(y) + "px)";
        };
    }

    function translate3DBuilder(attribute) {
        return function (dom, x, y) {
            dom.style[attribute] =
            "translate3d(" + Math.floor(x) + "px," +
            Math.floor(y) + "px,0px)";
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

    var has3d = ('WebKitCSSMatrix' in window &&
        'm11' in new window['WebKitCSSMatrix']());
    var dummyStyle = document.createElement('div').style;
    var transformMethods = ['transform',
        'webkitTransform',
        'MozTransform',
        'msTransform'];
  

    //for (var i = 0; i < transformMethods.length; i++) {
    //    var transformName = transformMethods[i];
    //    if (!_.isUndefined(dummyStyle[transformName])) {
    //        if (has3d) {
    //            Q.positionDOM = translate3DBuilder(transformName);
    //        } else {
    //            Q.positionDOM = translateBuilder(transformName);
    //        }
    //        break;
    //    }
    //}

    //Q.positionDOM = Q.positionDOM || fallbackTranslate;

}