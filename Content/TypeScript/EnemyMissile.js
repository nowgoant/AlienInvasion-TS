var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EnemyMissile = (function (_super) {
    __extends(EnemyMissile, _super);
    function EnemyMissile(game, x, y) {
        _super.call(this, game.spriteSheet);
        this.type = OBJECT_ENEMY_PROJECTILE;
        this.game = game;
        this.setup('enemy_missile', { vy: 200, damage: 10 });
        this.canvasOffsetX = x - this.w / 2;
        this.canvasOffsetY = y;
    }
    EnemyMissile.prototype.step = function (dt) {
        this.canvasOffsetY += this.vy * dt;
        var collision = this.board.collide(this, OBJECT_PLAYER);

        if (collision) {
            collision.hit(this.damage);
            this.board.remove(this);
        } else if (this.canvasOffsetY > this.game.height) {
            this.board.remove(this);
        }
    };
    return EnemyMissile;
})(Sprite);
//# sourceMappingURL=EnemyMissile.js.map
