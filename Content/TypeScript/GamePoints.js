// 得分类
var GamePoints = (function () {
    function GamePoints(game) {
        this.pointsLength = 8;
        this.game = game;
    }
    GamePoints.prototype.draw = function (ctx) {
        ctx.save();
        ctx.font = "bold 18px arial";
        ctx.fillStyle = "#FFFFFF";

        var txt = "" + this.game.points;
        var i = this.pointsLength - txt.length, zeros = "";
        while (i-- > 0) {
            zeros += "0";
        }

        ctx.fillText(zeros + txt, 10, 20);
        ctx.restore();
    };

    GamePoints.prototype.step = function (dt) {
    };
    return GamePoints;
})();
//# sourceMappingURL=GamePoints.js.map
