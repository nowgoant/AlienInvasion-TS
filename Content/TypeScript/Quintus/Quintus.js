/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../base/requestanimationframe.ts" />
/// <reference path="../typings/dynamicclass.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Quintus;
(function (Quintus) {
    var nativeKeys = Object.keys, ObjProto = Object.prototype, hasOwnProperty = ObjProto.hasOwnProperty;

    var keys = nativeKeys || function (obj) {
        if (obj !== Object(obj))
            throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj)
            if (hasOwnProperty.call(obj, key))
                keys[keys.length] = key;
        return keys;
    };

    var Evented = (function () {
        function Evented() {
            this.listeners = {};
            this.binds = [];
        }
        Evented.prototype.bind = function (event, target, callback) {
            // Handle the case where there is no target provided
            if (!callback) {
                callback = target;
                target = null;
            }

            // Handle case for callback that is a string
            if ($.type(callback) == "string") {
                callback = target[callback];
            }

            this.listeners = this.listeners || {};
            this.listeners[event] = this.listeners[event] || [];
            this.listeners[event].push([target || this, callback]);

            if (target) {
                if (!target.binds) {
                    target.binds = [];
                }
                target.binds.push([this, event, callback]);
            }
        };

        // Triggers an event on an object,
        // triggering all listeners on the object
        Evented.prototype.trigger = function (event, data) {
            if (this.listeners && this.listeners[event]) {
                for (var i = 0, len = this.listeners[event].length; i < len; i++) {
                    var listener = this.listeners[event][i];
                    listener[1].call(listener[0], data);
                }
            }
        };
        Evented.prototype.unbind = function (event, target, callback) {
            if (!target) {
                if (this.listeners[event]) {
                    delete this.listeners[event];
                    return;
                }
            } else {
                var l = this.listeners && this.listeners[event];
                if (l) {
                    for (var i = l.length - 1; i >= 0; i--) {
                        if (l[i][0] == target) {
                            if (!callback || callback == l[i][1]) {
                                this.listeners[event].splice(i, 1);
                            }
                        }
                    }
                }
            }
        };

        // Removes any bound methods from
        // this object
        Evented.prototype.debind = function () {
            if (this.binds) {
                for (var i = 0, len = this.binds.length; i < len; i++) {
                    var boundEvent = this.binds[i], source = boundEvent[0], event = boundEvent[1];
                    source.unbind(event, this);
                }
            }
        };

        Evented.prototype.extend = function (prop) {
            if (!$.isEmptyObject(prop) && $.isPlainObject(prop)) {
                $.extend(this, prop);
            }
        };
        return Evented;
    })();
    Quintus.Evented = Evented;

    var Q = (function (_super) {
        __extends(Q, _super);
        function Q(opts) {
            _super.call(this);
            this.options = {};
            this.components = {};
            $.extend(this.options, opts);
        }
        Q._normalizeArg = function (arg) {
            if ($.type(arg) == "string") {
                arg = arg.replace(/\s+/g, '').split(",");
            }
            if (!$.isArray(arg)) {
                arg = [arg];
            }
            return arg;
        };

        Q.prototype.extend = function (obj) {
            $.extend(this, obj);
            return this;
        };
        Q.prototype.include = function (mod) {
            $.each(Q._normalizeArg(mod), function (m) {
                m = Quintus[m] || m;
                m(this);
            });
            return Quintus;
        };
        Q.prototype.gameLoop = function (callback) {
            var self = this;
            self.lastGameLoopFrame = new Date().getTime();

            this.gameLoopCallbackWrapper = function (now) {
                self.loop = window.requestAnimationFrame(self.gameLoopCallbackWrapper);
                var dt = now - self.lastGameLoopFrame;
                if (dt > 100) {
                    dt = 100;
                }
                callback.apply(self, [dt / 1000]);
                self.lastGameLoopFrame = now;
            };

            window.requestAnimationFrame(this.gameLoopCallbackWrapper);
        };
        Q.prototype.pauseGame = function () {
            if (this.loop) {
                cancelAnimationFrame(this.loop);
            }
            this.loop = null;
        };
        Q.prototype.unpauseGame = function () {
            if (!this.loop) {
                this.lastGameLoopFrame = new Date().getTime();
                this.loop = requestAnimationFrame(this.gameLoopCallbackWrapper.bind(this));
            }
        };
        Q.prototype.register = function (name, methods) {
            methods.name = name;
            this.components[name] = DynamicClass.extend(Component, methods);
            console.log(this.components[name]);
        };
        return Q;
    })(Evented);
    Quintus.Q = Q;

    var Component = (function (_super) {
        __extends(Component, _super);
        function Component() {
            _super.apply(this, arguments);
            this.activeComponents = [];
        }
        Component.prototype.init = function (entity) {
            this.entity = entity;
            entity[this.name] = this;
            entity.activeComponents.push(this.name);
            if (this.added)
                this.added();
        };
        Component.prototype.destroy = function () {
            if (this.extend) {
                var extensions = keys(this.extend);
                for (var i = 0, len = extensions.length; i < len; i++) {
                    delete this.entity[extensions[i]];
                }
            }

            delete this.entity[this.name];

            var idx = this.entity.activeComponents.indexOf(this.name);
            if (idx != -1) {
                this.entity.activeComponents.splice(idx, 1);
            }

            this.debind();
            if (this.destroyed)
                this.destroyed();
        };
        return Component;
    })(Evented);
    Quintus.Component = Component;

    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        function GameObject(obj) {
            _super.call(this, obj);
        }
        GameObject.prototype.has = function (component) {
            return this[component] ? true : false;
        };
        GameObject.prototype.add = function (components) {
            components = Q._normalizeArg(components);
            if (!this.activeComponents) {
                this.activeComponents = [];
            }

            for (var i = 0, len = components.length; i < len; i++) {
                var name = components[i], comp = this.components[name];
                if (!this.has(name) && comp) {
                    var c = new comp(this);
                    this.trigger('addComponent', comp);
                }
            }
            return this;
        };
        GameObject.prototype.del = function (components) {
            components = Q._normalizeArg(components);

            for (var i = 0, len = components.length; i < len; i++) {
                var name = components[i];
                if (name && this.has(name)) {
                    this.trigger('delComponent', this[name]);
                    this[name].destroy();
                }
            }
            return this;
        };
        GameObject.prototype.destroy = function () {
            if (this.destroyed) {
                return;
            }
            this.debind();
            if (this.parent && this.parent.remove) {
                this.parent.remove(this);
            }
            this.trigger('removed');
            this.destroyed = true;
        };
        return GameObject;
    })(Q);
    Quintus.GameObject = GameObject;
})(Quintus || (Quintus = {}));
//# sourceMappingURL=Quintus.js.map
