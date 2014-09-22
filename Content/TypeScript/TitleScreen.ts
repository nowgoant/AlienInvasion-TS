/// <reference path="game.ts" />

//插入标题画面
class TitleScreen {
    game: Game;
    title: string;
    subTitle: string;
    up = false;
    callback: () => void;
    constructor(game: Game, title, subtitle, callback) {
        this.game = game;
        this.title = title;
        this.subTitle = subtitle;
        this.callback = callback;
    }
    step(dt) {
        if (!this.game.keys['fire']) this.up = true;

        if (this.up && this.game.keys['fire'] && this.callback) this.callback();
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#ffffff';
        //ctx.textAlign = "center";
        ctx.font = 'blod 40px bangers';
        var measure = ctx.measureText(this.title);
        ctx.fillText(this.title, this.game.width / 2 - measure.width / 2, this.game.height / 2);

        ctx.font = "bold 20px bangers";
        var measure2 = ctx.measureText(this.subTitle);
        ctx.fillText(this.subTitle, this.game.width / 2 - measure2.width / 2, this.game.height / 2 + 40);
    }
}