/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../base/requestanimationframe.ts" />
/// <reference path="../typings/dynamicclass.d.ts" />

module Quintus {
    var nativeKeys = Object.keys,
        ObjProto = Object.prototype,
        hasOwnProperty = ObjProto.hasOwnProperty;

    var keys = nativeKeys || function (obj) {
        if (obj !== Object(obj)) throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj) if (hasOwnProperty.call(obj, key)) keys[keys.length] = key;
        return keys;
    };


    export class Evented {
        listeners = {};
        binds = [];
        bind(event: string, target, callback) {
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
                if (!target.binds) { target.binds = []; }
                target.binds.push([this, event, callback]);
            }
        }
        // Triggers an event on an object, 
        // triggering all listeners on the object
        trigger(event, data?: any) {
            if (this.listeners && this.listeners[event]) {
                for (var i = 0, len = this.listeners[event].length; i < len; i++) {
                    var listener = this.listeners[event][i];
                    listener[1].call(listener[0], data);
                }
            }
        }
        unbind(event, target, callback) {
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
        }

        // Removes any bound methods from 
        // this object
        debind() {
            if (this.binds) {
                for (var i = 0, len = this.binds.length; i < len; i++) {
                    var boundEvent = this.binds[i],
                        source = boundEvent[0],
                        event = boundEvent[1];
                    source.unbind(event, this);
                }
            }
        }

        extend(prop) {
            if (!$.isEmptyObject(prop) && $.isPlainObject(prop)) {
                $.extend(this, prop);
            }
        }
    }

    export class Q extends Evented {
        options = {};
        lastGameLoopFrame: number;
        components = {};
        gameLoopCallbackWrapper: (now: number) => void;
        loop: number;
        static _normalizeArg(arg) {
            if ($.type(arg) == "string") {
                arg = arg.replace(/\s+/g, '').split(",");
            }
            if (!$.isArray(arg)) {
                arg = [arg];
            }
            return arg;
        }
        gameObject: GameObject;
        constructor(opts) {
            super();
            $.extend(this.options, opts);

        }

        extend(obj) {
            $.extend(this, obj);
            return this;
        }
        include(mod) {
            $.each(Q._normalizeArg(mod), function (m) {
                m = Quintus[m] || m;
                m(this);
            });
            return Quintus;
        }
        gameLoop(callback) {
            var self = this;
            self.lastGameLoopFrame = new Date().getTime();

            this.gameLoopCallbackWrapper = function (now) {
                self.loop = window.requestAnimationFrame(self.gameLoopCallbackWrapper);
                var dt = now - self.lastGameLoopFrame;
                if (dt > 100) { dt = 100; }
                callback.apply(self, [dt / 1000]);
                self.lastGameLoopFrame = now;
            };

            window.requestAnimationFrame(this.gameLoopCallbackWrapper);
        }
        pauseGame() {
            if (this.loop) {
                cancelAnimationFrame(this.loop);
            }
            this.loop = null;
        }
        unpauseGame() {
            if (!this.loop) {
                this.lastGameLoopFrame = new Date().getTime();
                this.loop = requestAnimationFrame(this.gameLoopCallbackWrapper.bind(this));
            }
        }
        register(name, methods) {
            methods.name = name;
            this.components[name] = DynamicClass.extend(Component, methods);
            console.log(this.components[name]);
        }
    }

    export class Component extends Evented {
        activeComponents = [];
        entity: any;
        name: string;
        added: () => any;
        destroyed: () => any;
        init(entity) {
            this.entity = entity;
            entity[this.name] = this;
            entity.activeComponents.push(this.name);
            if (this.added) this.added();
        }
        destroy() {
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
            if (this.destroyed) this.destroyed();
        }
    }

    export class GameObject extends Q {
        activeComponents: any;
        destroyed: boolean;
        parent: any;
        constructor(obj) {
            super(obj);
        }
        has(component) {
            return this[component] ? true : false;
        }
        add(components) {
            components = Q._normalizeArg(components);
            if (!this.activeComponents) { this.activeComponents = []; }

            for (var i = 0, len = components.length; i < len; i++) {
                var name = components[i],
                    comp = this.components[name];
                if (!this.has(name) && comp) {
                    var c = new comp(this);
                    this.trigger('addComponent', comp);
                }
            }
            return this;
        }
        del(components) {
            components = Q._normalizeArg(components);

            for (var i = 0, len = components.length; i < len; i++) {
                var name = components[i];
                if (name && this.has(name)) {
                    this.trigger('delComponent', this[name]);
                    this[name].destroy();
                }
            }
            return this;
        }
        destroy() {
            if (this.destroyed) { return; }
            this.debind();
            if (this.parent && this.parent.remove) {
                this.parent.remove(this);
            }
            this.trigger('removed');
            this.destroyed = true;
        }
    }
}