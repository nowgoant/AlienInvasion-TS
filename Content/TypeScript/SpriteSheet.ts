

interface IDrawImageArg {
    offsetX: number;
    offsetY: number;
    width?: number;
    height?: number;
    canvasOffsetX?: number;
    canvasOffsetY?: number;
    canvasImageWidth?: number;
    canvasImageHeight?: number
}

interface ISpriteSheetMapOptions {
    ship: IDrawImageArg
}

//添加滚动背景
//加载和绘制精灵
class SpriteSheet {
    map: ISpriteSheetMapOptions;
    image: HTMLImageElement;
    constructor(mapOptons: ISpriteSheetMapOptions, callback: (img: HTMLImageElement) => void) {
        this.map = mapOptons;
        this.load(callback);
    }
    public load(callback: (img: HTMLImageElement) => void) {
        var self = this;
        this.loadImg("Content/Images/sprites.png", function (img) {
            self.image = img;
            callback(img);
        });
    }
    loadImg(imgUrl: string, callback: (img: HTMLImageElement) => void) {
        var img = new Image();
        img.onload = function () {
            callback(img);
        }
        img.src = imgUrl;
    }
    draw(ctx: CanvasRenderingContext2D, sprite, canvasOffsetX: number, canvasOffsetY: number, frame?: number) {
        var s = <IDrawImageArg> this.map[sprite];
        frame = frame || 0;
        s.canvasOffsetY = canvasOffsetY || 0;
        s.canvasOffsetX = canvasOffsetX || 0;
        s.offsetX = s.offsetX + frame * s.width;
        s.canvasImageWidth = s.canvasImageWidth || s.width;
        s.canvasImageHeight = s.canvasImageHeight || s.height;
        ctx.drawImage(this.image, s.offsetX, s.offsetY, s.width, s.height, Math.floor(s.canvasOffsetX), Math.floor(s.canvasOffsetY), s.canvasImageWidth, s.canvasImageHeight);
    }
}