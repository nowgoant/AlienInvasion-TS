/// <reference path="game.ts" />
/// <reference path="config.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PlayerMissile = (function (_super) {
    __extends(PlayerMissile, _super);
    function PlayerMissile(spriteSheet, x, y) {
        _super.call(this, spriteSheet);
        this.type = OBJECT_PLAYER_PROJECTILE;
        this.setup('missile', { vy: -700, damage: 10 });
        this.canvasOffsetX = x - this.w / 2;
        this.canvasOffsetY = y - this.h;
    }
    PlayerMissile.prototype.step = function (dt) {
        this.canvasOffsetY += this.vy * dt;
        var collision = this.board.collide(this, OBJECT_ENEMY);
        if (collision) {
            collision.hit(this.damage);
            this.board.remove(this);
        } else if (this.canvasOffsetY < -this.h) {
            this.board.remove(this);
        }
    };
    return PlayerMissile;
})(Sprite);
//# sourceMappingURL=PlayerMissile.js.map
