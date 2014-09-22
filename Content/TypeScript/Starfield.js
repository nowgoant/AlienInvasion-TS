/// <reference path="game.ts" />
//创建离屏画布
//
var Starfield = (function () {
    function Starfield(game, speed, opacity, numStars, clear) {
        this.speed = 100;
        this.game = game;
        this.speed = speed;
        this.opacity = opacity;
        this.numStars = numStars;
        this.clear = clear;
        this.init();
    }
    Starfield.prototype.init = function () {
        // Set up the offscreen canvas
        var stars = document.createElement("canvas");
        stars.width = this.game.width;
        stars.height = this.game.height;
        var starCtx = stars.getContext("2d");

        this.offset = 0;

        // If the clear option is set,
        // make the background black instead of transparent
        if (this.clear) {
            starCtx.fillStyle = "#000";
            starCtx.fillRect(0, 0, stars.width, stars.height);
        }

        // Now draw a bunch of random 2 pixel
        // rectangles onto the offscreen canvas
        starCtx.fillStyle = "#FFF";
        starCtx.globalAlpha = this.opacity;
        for (var i = 0; i < this.numStars; i++) {
            starCtx.fillRect(Math.floor(Math.random() * stars.width), Math.floor(Math.random() * stars.height), 2, 2);
        }

        this.stars = stars;
    };
    Starfield.prototype.draw = function (ctx) {
        var intOffset = Math.floor(this.offset);
        var remaining = this.stars.height - intOffset;

        // Draw the top half of the starfield
        if (intOffset > 0) {
            ctx.drawImage(this.stars, 0, remaining, this.stars.width, intOffset, 0, 0, this.stars.width, intOffset);
        }

        // Draw the bottom half of the starfield
        if (remaining > 0) {
            ctx.drawImage(this.stars, 0, 0, this.stars.width, remaining, 0, intOffset, this.stars.width, remaining);
        }
    };

    Starfield.prototype.step = function (dt) {
        this.offset += dt * this.speed;
        this.offset = this.offset % this.stars.height;
    };
    return Starfield;
})();
//# sourceMappingURL=Starfield.js.map
