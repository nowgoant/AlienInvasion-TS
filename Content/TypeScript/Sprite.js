/// <reference path="spritesheet.ts" />
var Sprite = (function () {
    function Sprite(spriteSheet) {
        this.spriteSheet = spriteSheet;
    }
    Sprite.prototype.setup = function (sprite, props) {
        var map;
        this.sprite = sprite;
        this.merge(props);
        this.frame = this.frame || 0;

        if (this.spriteSheet.map[sprite]) {
            map = this.spriteSheet.map[sprite];
            this.w = map.width;
            this.h = map.height;
        } else {
            debugger;
            throw 'this.spriteSheet.map[sprite] is undefined';
        }
    };
    Sprite.prototype.merge = function (props) {
        if (props) {
            for (var prop in props) {
                this[prop] = props[prop];
            }
        }
    };
    Sprite.prototype.draw = function (ctx) {
        this.spriteSheet.draw(ctx, this.sprite, this.canvasOffsetX, this.canvasOffsetY, this.frame);
    };
    Sprite.prototype.hit = function (damage) {
        this.board.remove(this);
    };
    return Sprite;
})();
//# sourceMappingURL=Sprite.js.map
