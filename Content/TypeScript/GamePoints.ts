
// 得分类
class GamePoints {
    pointsLength = 8;
    game: Game;
    constructor(game: Game) {
        this.game = game;
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.font = "bold 18px arial";
        ctx.fillStyle = "#FFFFFF";

        var txt = "" + this.game.points;
        var i = this.pointsLength - txt.length, zeros = "";
        while (i-- > 0) { zeros += "0"; }

        ctx.fillText(zeros + txt, 10, 20);
        ctx.restore();
    }

    step(dt: number) { }
}