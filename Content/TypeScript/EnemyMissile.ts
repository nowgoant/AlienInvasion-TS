
class EnemyMissile extends Sprite {
    type = OBJECT_ENEMY_PROJECTILE;
    damage: number;
    vy: number;
    game: Game;
    constructor(game: Game, x: number, y: number) {
        super(game.spriteSheet);
        this.game = game;
        this.setup('enemy_missile', { vy: 200, damage: 10 });
        this.canvasOffsetX = x - this.w / 2;
        this.canvasOffsetY = y;
    }

    step(dt: number) {
        this.canvasOffsetY += this.vy * dt;
        var collision = this.board.collide(this, OBJECT_PLAYER);

        if (collision) {
            collision.hit(this.damage);
            this.board.remove(this);
        } else if (this.canvasOffsetY > this.game.height) {
            this.board.remove(this);
        }
    }
}