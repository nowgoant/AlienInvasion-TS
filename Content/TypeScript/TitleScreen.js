/// <reference path="game.ts" />
//插入标题画面
var TitleScreen = (function () {
    function TitleScreen(game, title, subtitle, callback) {
        this.up = false;
        this.game = game;
        this.title = title;
        this.subTitle = subtitle;
        this.callback = callback;
    }
    TitleScreen.prototype.step = function (dt) {
        if (!this.game.keys['fire'])
            this.up = true;

        if (this.up && this.game.keys['fire'] && this.callback)
            this.callback();
    };

    TitleScreen.prototype.draw = function (ctx) {
        ctx.fillStyle = '#ffffff';

        //ctx.textAlign = "center";
        ctx.font = 'blod 40px bangers';
        var measure = ctx.measureText(this.title);
        ctx.fillText(this.title, this.game.width / 2 - measure.width / 2, this.game.height / 2);

        ctx.font = "bold 20px bangers";
        var measure2 = ctx.measureText(this.subTitle);
        ctx.fillText(this.subTitle, this.game.width / 2 - measure2.width / 2, this.game.height / 2 + 40);
    };
    return TitleScreen;
})();
//# sourceMappingURL=TitleScreen.js.map
