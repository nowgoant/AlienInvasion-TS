/// <reference path="game.ts" />
/// <reference path="config.ts" />

class PlayerMissile extends Sprite {
    vy: number;
    damage: number;
    type = OBJECT_PLAYER_PROJECTILE;
    constructor(spriteSheet: SpriteSheet, x: number, y: number) {
        super(spriteSheet);
        this.setup('missile', { vy: -700, damage: 10 });
        this.canvasOffsetX = x - this.w / 2;
        this.canvasOffsetY = y - this.h;
    }

    step(dt: number) {
        this.canvasOffsetY += this.vy * dt;
        var collision = this.board.collide(this, OBJECT_ENEMY);
        if (collision) {
            collision.hit(this.damage);
            this.board.remove(this);
        } else if (this.canvasOffsetY < -this.h) {
            this.board.remove(this);
        }
    }
}