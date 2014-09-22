/// <reference path="game.ts" />
/// <reference path="gameboard.ts" />
/// <reference path="playermissile.ts" />
/// <reference path="config.ts" />
/// <reference path="spritesheet.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//添加主角
var PlayerShip = (function (_super) {
    __extends(PlayerShip, _super);
    function PlayerShip(game, spriteSheet) {
        _super.call(this, spriteSheet);
        this.type = OBJECT_PLAYER;
        this.game = game;
        this.init();
    }
    PlayerShip.prototype.init = function () {
        this.setup('ship', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });

        this.reload = this.reloadTime;
        this.canvasOffsetX = this.game.width / 2 - this.w / 2;
        this.canvasOffsetY = this.game.height - this.game.playerOffset - this.h;
    };
    PlayerShip.prototype.step = function (dt) {
        if (this.game.keys['left']) {
            this.vx = -this.maxVel;
        } else if (this.game.keys['right']) {
            this.vx = this.maxVel;
        } else {
            this.vx = 0;
        }

        this.canvasOffsetX += this.vx * dt;

        if (this.canvasOffsetX < 0) {
            this.canvasOffsetX = 0;
        } else if (this.canvasOffsetX > this.game.width - this.w) {
            this.canvasOffsetX = this.game.width - this.w;
        }

        this.reload -= dt;
        if (this.game.keys['fire'] && this.reload < 0) {
            this.game.keys['fire'] = false;
            this.reload = this.reloadTime;

            this.board.add(new PlayerMissile(this.spriteSheet, this.canvasOffsetX, this.canvasOffsetY + this.h / 2));
            this.board.add(new PlayerMissile(this.spriteSheet, this.canvasOffsetX + this.w, this.canvasOffsetY + this.h / 2));
        }
    };

    PlayerShip.prototype.hit = function (damage) {
        if (this.board.remove(this)) {
            this.game.loseGame();
        }
    };
    return PlayerShip;
})(Sprite);
//# sourceMappingURL=PlayerShip.js.map
