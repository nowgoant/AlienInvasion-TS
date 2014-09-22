
class TouchControls {
    gutterWidth = 10;
    unitWidth: number;
    blockWidth: number;
    game: Game;
    constructor(game: Game) {
        this.game = game;
        this.unitWidth = game.width / 5;
        this.blockWidth = this.unitWidth - this.gutterWidth;


        game.canvas.addEventListener('touchstart', this.trackTouch, true);
        game.canvas.addEventListener('touchmove', this.trackTouch, true);
        game.canvas.addEventListener('touchend', this.trackTouch, true);
        game.playerOffset = this.unitWidth + 20;
    }

    drawSquare(ctx: CanvasRenderingContext2D, x: number, y: number, txt: string, on: number) {
        ctx.globalAlpha = on ? 0.9 : 0.6;
        ctx.fillStyle = "#CCC";
        ctx.fillRect(x, y, this.blockWidth, this.blockWidth);

        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.globalAlpha = 1.0;
        ctx.font = "bold " + (3 * this.unitWidth / 4) + "px arial";

        ctx.fillText(txt,
            x + this.blockWidth / 2,
            y + 3 * this.blockWidth / 4 + 5);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        var yLoc = this.game.height - this.unitWidth;
        this.drawSquare(ctx, this.gutterWidth, yLoc, "\u25C0", this.game.keys['left']);
        this.drawSquare(ctx, this.unitWidth + this.gutterWidth, yLoc, "\u25B6", this.game.keys['right']);
        this.drawSquare(ctx, 4 * this.unitWidth, yLoc, "A", this.game.keys['fire']);

        ctx.restore();
    }

    step(dt: number) { }

    trackTouch(e) {
        var touch, x;

        e.preventDefault();
        this.game.keys['left'] = false;
        this.game.keys['right'] = false;
        for (var i = 0; i < e.targetTouches.length; i++) {
            touch = e.targetTouches[i];
            x = touch.pageX / this.game.canvasMultiplier - this.game.canvas.offsetLeft;
            if (x < this.unitWidth) {
                this.game.keys['left'] = true;
            }
            if (x > this.unitWidth && x < 2 * this.unitWidth) {
                this.game.keys['right'] = true;
            }
        }

        if (e.type == 'touchstart' || e.type == 'touchend') {
            for (i = 0; i < e.changedTouches.length; i++) {
                touch = e.changedTouches[i];
                x = touch.pageX / this.game.canvasMultiplier - this.game.canvas.offsetLeft;
                if (x > 4 * this.unitWidth) {
                    this.game.keys['fire'] = (e.type == 'touchstart');
                }
            }
        }
    }
}