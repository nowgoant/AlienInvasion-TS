/// <reference path="gameboard.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Explosion = (function (_super) {
    __extends(Explosion, _super);
    function Explosion(spriteSheet, centerX, centerY) {
        _super.call(this, spriteSheet);
        this.setup('explosion', { frame: 0 });
        this.canvasOffsetX = centerX - this.w / 2;
        this.canvasOffsetY = centerY - this.h / 2;
    }
    Explosion.prototype.step = function (dt) {
        this.frame++;
        if (this.frame >= 12) {
            this.board.remove(this);
        }
    };
    return Explosion;
})(Sprite);
//# sourceMappingURL=Explosion.js.map
