//添加滚动背景
//加载和绘制精灵
var SpriteSheet = (function () {
    function SpriteSheet(mapOptons, callback) {
        this.map = mapOptons;
        this.load(callback);
    }
    SpriteSheet.prototype.load = function (callback) {
        var self = this;
        this.loadImg("Content/Images/sprites.png", function (img) {
            self.image = img;
            callback(img);
        });
    };
    SpriteSheet.prototype.loadImg = function (imgUrl, callback) {
        var img = new Image();
        img.onload = function () {
            callback(img);
        };
        img.src = imgUrl;
    };
    SpriteSheet.prototype.draw = function (ctx, sprite, canvasOffsetX, canvasOffsetY, frame) {
        var s = this.map[sprite];
        frame = frame || 0;
        s.canvasOffsetY = canvasOffsetY || 0;
        s.canvasOffsetX = canvasOffsetX || 0;
        s.offsetX = s.offsetX + frame * s.width;
        s.canvasImageWidth = s.canvasImageWidth || s.width;
        s.canvasImageHeight = s.canvasImageHeight || s.height;
        ctx.drawImage(this.image, s.offsetX, s.offsetY, s.width, s.height, Math.floor(s.canvasOffsetX), Math.floor(s.canvasOffsetY), s.canvasImageWidth, s.canvasImageHeight);
    };
    return SpriteSheet;
})();
//# sourceMappingURL=SpriteSheet.js.map
