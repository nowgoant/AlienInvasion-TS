/// <reference path="gameboard.ts" />

class Explosion extends Sprite {
    constructor(spriteSheet: SpriteSheet, centerX, centerY) {
        super(spriteSheet);
        this.setup('explosion', { frame: 0 });
        this.canvasOffsetX = centerX - this.w / 2;
        this.canvasOffsetY = centerY - this.h / 2;
    }

    step(dt) {
        this.frame++;
        if (this.frame >= 12) {
            this.board.remove(this);
        }
    }
}