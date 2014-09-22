/// <reference path="spritesheet.ts" />

class Sprite implements IBoard {
    sprite: string;
    w: number;
    h: number;
    canvasOffsetX: number;
    canvasOffsetY: number
    frame: number;
    spriteSheet: SpriteSheet;
    board: GameBoard;
    constructor(spriteSheet: SpriteSheet) {
        this.spriteSheet = spriteSheet;
    }
    setup(sprite: string, props) {
        var map: IDrawImageArg;
        this.sprite = sprite;
        this.merge(props);
        this.frame = this.frame || 0;

        if (this.spriteSheet.map[sprite]) {
            map = this.spriteSheet.map[sprite];
            this.w = map.width;
            this.h = map.height;
        } else {
            debugger
            throw 'this.spriteSheet.map[sprite] is undefined';
        }
    }
    merge(props) {
        if (props) {
            for (var prop in props) {
                this[prop] = props[prop];
            }
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        this.spriteSheet.draw(ctx, this.sprite, this.canvasOffsetX, this.canvasOffsetY, this.frame);
    }
    hit(damage) {
        this.board.remove(this);
    }
}