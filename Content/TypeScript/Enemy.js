/// <reference path="config.ts" />
/// <reference path="gameboard.ts" />
/// <reference path="sprite.ts" />
/// <reference path="explosion.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(game, blueprint, override) {
        _super.call(this, game.spriteSheet);
        this.type = OBJECT_ENEMY;
        this.baseParameters = {
            A: 0, B: 0, C: 0, D: 0,
            E: 0, F: 0, G: 0, H: 0,
            t: 0, reloadTime: 0.75,
            reload: 0
        };
        this.game = game;
        this.merge(this.baseParameters);
        this.setup(blueprint.sprite, blueprint);
        this.merge(override);
    }
    Enemy.prototype.hit = function (damage) {
        this.health -= damage;
        if (this.health <= 0 && this.board.remove(this)) {
            this.game.points += this.points || 100;
            this.board.add(new Explosion(this.spriteSheet, this.canvasOffsetX + this.w / 2, this.canvasOffsetY + this.h / 2));
        }
    };
    Enemy.prototype.step = function (dt) {
        this.t += dt;

        this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
        this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

        this.canvasOffsetX += this.vx * dt;
        this.canvasOffsetY += this.vy * dt;

        //让敌方飞船和玩家碰撞
        var collision = this.board.collide(this, OBJECT_PLAYER);
        if (collision) {
            collision.hit(this.damage);
            this.board.remove(this);
        }

        if (this.reload <= 0 && Math.random() < (this.firePercentage || 0.01)) {
            this.reload = this.reloadTime;
            if (this.missiles == 2) {
                this.board.add(new EnemyMissile(this.game, this.canvasOffsetX + this.w - 2, this.canvasOffsetY + this.h / 2));
                this.board.add(new EnemyMissile(this.game, this.canvasOffsetX + 2, this.canvasOffsetY + this.h / 2));
            } else {
                this.board.add(new EnemyMissile(this.game, this.canvasOffsetX + this.w / 2, this.canvasOffsetY + this.h));
            }
        }
        this.reload -= dt;

        if (this.canvasOffsetY > this.game.height || this.canvasOffsetX < -this.w || this.canvasOffsetX > this.game.width) {
            this.board.remove(this);
        }
    };
    return Enemy;
})(Sprite);
//# sourceMappingURL=Enemy.js.map
