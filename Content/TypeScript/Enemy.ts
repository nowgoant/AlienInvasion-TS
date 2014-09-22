/// <reference path="config.ts" />
/// <reference path="gameboard.ts" />
/// <reference path="sprite.ts" />
/// <reference path="explosion.ts" />

class Enemy extends Sprite {
    type = OBJECT_ENEMY;
    baseParameters = {
        A: 0, B: 0, C: 0, D: 0,
        E: 0, F: 0, G: 0, H: 0,
        t: 0, reloadTime: 0.75,
        reload: 0
    };
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
    F: number;
    G: number;
    H: number;
    t: number;
    vx: number;
    vy: number;
    points: number;
    damage: number;
    health: number;
    firePercentage: number;
    reload: number;
    reloadTime: number;
    missiles: number;
    board: GameBoard;
    game: Game;
    constructor(game: Game, blueprint, override?) {
        super(game.spriteSheet);
        this.game = game;
        this.merge(this.baseParameters);
        this.setup(blueprint.sprite, blueprint);
        this.merge(override);
    }
    hit(damage: number) {
        this.health -= damage;
        if (this.health <= 0 && this.board.remove(this)) {
            this.game.points += this.points || 100;
            this.board.add(new Explosion(this.spriteSheet, this.canvasOffsetX + this.w / 2,
                this.canvasOffsetY + this.h / 2));

        }
    }
    step(dt: number) {
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

        if (this.canvasOffsetY > this.game.height ||
            this.canvasOffsetX < -this.w ||
            this.canvasOffsetX > this.game.width) {
            this.board.remove(this);
        }
    }
}