var DynamicClass = (function () {
    function DynamicClass() {
    }
    DynamicClass.extend = function (supser, prop) {
        var _super = supser.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        DynamicClass.initializing = true;
        var prototype = new supser();
        DynamicClass.initializing = false;

        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && this.fnTest.test(prop[name]) ? (function (name, fn) {
                return function () {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }
    };
    DynamicClass.initializing = false;
    DynamicClass.fnTest = /xyz/.test(function () {
        xyz;
    }) ? /\b_super\b/ : /.*/;
    return DynamicClass;
})();
//# sourceMappingURL=DynamicClass.js.map
