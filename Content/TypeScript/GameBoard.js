//爆炸
var GameBoard = (function () {
    function GameBoard() {
        this.cnt = {};
    }
    // Add a new object to the object list
    GameBoard.prototype.add = function (obj) {
        obj.board = this;
        if (!this.objects) {
            this.objects = [];
        }
        if (!this.removed) {
            this.removed = [];
        }
        this.objects.push(obj);
        this.cnt[obj.type] = (this.cnt[obj.type] || 0) + 1;
        return obj;
    };

    // Mark an object for removal
    GameBoard.prototype.remove = function (obj) {
        if (obj) {
            this.removed.push(obj);
            return true;
        }
        return false;
    };

    // Reset the list of removed objects
    GameBoard.prototype.resetRemoved = function () {
        this.removed = [];
    };

    // Removed an objects marked for removal from the list
    GameBoard.prototype.finalizeRemoved = function () {
        for (var i = 0, len = this.removed.length; i < len; i++) {
            var idx = this.objects.indexOf(this.removed[i]);
            if (idx != -1) {
                this.cnt[this.removed[i].type]--;
                this.objects.splice(idx, 1);
            }
        }
    };

    // Call the same method on all current objects
    GameBoard.prototype.iterate = function (funcName, context) {
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, len = this.objects.length; i < len; i++) {
            var obj = this.objects[i];
            obj[funcName].apply(obj, args);
        }
    };

    // Find the first object for which func is true
    GameBoard.prototype.detect = function (func) {
        for (var i = 0, val = null, len = this.objects.length; i < len; i++) {
            if (func.call(this.objects[i]))
                return this.objects[i];
        }
        return false;
    };

    // Call step on all objects and them delete
    // any object that have been marked for removal
    GameBoard.prototype.step = function (dt) {
        this.resetRemoved();
        this.iterate('step', dt);
        this.finalizeRemoved();
    };

    // Draw all the objects
    GameBoard.prototype.draw = function (ctx) {
        this.iterate('draw', ctx);
    };

    // Check for a collision between the
    // bounding rects of two objects
    GameBoard.prototype.overlap = function (o1, o2) {
        return !((o1.canvasOffsetY + o1.h - 1 < o2.canvasOffsetY) || (o1.canvasOffsetY > o2.canvasOffsetY + o2.h - 1) || (o1.canvasOffsetX + o1.w - 1 < o2.canvasOffsetX) || (o1.canvasOffsetX > o2.canvasOffsetX + o2.w - 1));
    };

    // Find the first object that collides with obj
    // match against an optional type
    GameBoard.prototype.collide = function (obj, type) {
        var self = this;
        return this.detect(function () {
            if (obj != this) {
                var col = (!type || this.type & type) && self.overlap(obj, this);
                return col ? this : false;
            }
        });
    };
    return GameBoard;
})();
//# sourceMappingURL=GameBoard.js.map
