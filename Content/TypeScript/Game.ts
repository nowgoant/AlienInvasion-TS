/// <reference path="base/requestanimationframe.ts" />
/// <reference path="gameboard.ts" />
/// <reference path="spritesheet.ts" />
/// <reference path="starfield.ts" />
/// <reference path="config.ts" />


interface IGameOptions {
    canvasId: string;
}


class Game {
    canvas: HTMLCanvasElement;
    keys = {};
    boards = [];
    width: number;
    height: number;
    spriteMap: ISpriteSheetMapOptions;
    spriteSheet: SpriteSheet;
    requestA: number;
    mobile: boolean;
    canvasMultiplier = 1;
    playerOffset = 10;
    points = 0;
    constructor(options: IGameOptions, spriteMap: ISpriteSheetMapOptions) {
        var ctx = null;
        this.canvas = <HTMLCanvasElement>document.getElementById(options.canvasId);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.spriteMap = spriteMap;

        if (!this.get2dContext()) {
            alert('Please upgrade your browser');
        }

        this.init();
    }

    get2dContext(): CanvasRenderingContext2D {
        return this.canvas.getContext && this.canvas.getContext('2d');
    }
    init() {
        var self = this, ctx = ctx || this.get2dContext();
        if (ctx) {
            // set up moblie
            this.setupMobile();

            //set up input
            this.setupInput();
            // start the game loop
            this.loop();
            //add touch controls
            if (this.mobile) {
                this.setBoard(4, new TouchControls(this));
            }
            //load the sprite sheet and pass forward the callback
            this.spriteSheet = new SpriteSheet(this.spriteMap, function () {
                self.startGame();
            });
        }
    }
    startGame(): void {
        this.setBoard(0, new Starfield(this, 20, 0.4, 100, true));
        this.setBoard(1, new Starfield(this, 50, 0.6, 100));
        this.setBoard(2, new Starfield(this, 100, 1.0, 50));
        this.setBoard(3, new TitleScreen(this, "Alien Invasion", "Press fire to start playing", this.playGame.bind(this)));

    }
    playGame() {
        // this.setBoard(3, new PlayerShip(this, this.spriteSheet));
        var board = new GameBoard();
        //board.add(new Enemy(this.spriteSheet, this, enemies.basic));
        //board.add(new Enemy(this.spriteSheet, this, enemies.basic, { canvasOffsetX: 150 }));
        board.add(new PlayerShip(this, this.spriteSheet));
        board.add(new Level(this, level1, this.winGame.bind(this)));
        this.setBoard(3, board);
        this.setBoard(5, new GamePoints(this));
    }
    setupInput() {
        var self = this;
        window.addEventListener("keydown", function (e) {
            if (KEY_CODES[event.keyCode]) {
                self.keys[KEY_CODES[event.keyCode]] = true;
                e.preventDefault();
            }
        }, false);

        window.addEventListener('keyup', function (e) {
            if (KEY_CODES[event.keyCode]) {
                self.keys[KEY_CODES[event.keyCode]] = false;
                e.preventDefault();
            }
        }, false);
    }
    loop() {
        var self = this, dt = 30 / 1000, ctx = self.get2dContext();
        for (var i = 0, len = this.boards.length; i < len; i++) {
            if (this.boards[i]) {
                this.boards[i].step(dt);
                this.boards[i].draw(ctx);
            }
        }

        self.requestA = window.requestAnimationFrame(function () { self.loop(); });
    }

    setBoard(num: number, board) {
        this.boards[num] = board;
    }

    stop() {

    }

    loadImg(imgUrl: string, callback: (img: HTMLImageElement) => void) {
        var img = new Image();
        img.onload = function () {
            callback(img);
        }
        img.src = imgUrl;
    }

    winGame() {
        this.setBoard(3, new TitleScreen(this, "You win!", "Press fire to play again", this.playGame.bind(this)));
    }

    loseGame() {
        this.setBoard(3, new TitleScreen(this, "You lose!", "Press fire to play again", this.playGame.bind(this)));
    }

    setupMobile() {
        //check if browser has support for touch events
        var container = document.getElementById("container"),
            hasTouch = !!('ontouchstart' in window),
            w = window.innerWidth, h = window.innerHeight;

        if (hasTouch) { this.mobile = true; }

        //exit early if screen is larger than a max size or no touch support
        if (screen.width >= 1280 || !hasTouch) { return false; }

        //check if the user is in landscape mode
        if (w > h) {
            //if so,ask them to rotate the browser
            alert("Please rotate the device and then click OK");
            w = window.innerWidth; h = window.innerHeight;
        }

        //resize container to be larger than the page
        //to allow removal of address bar
        container.style.height = h * 2 + "px";
        //scroll window slightly to force removel of address bar
        window.scrollTo(0, 1);

        //set the container size to match the window size
        h = window.innerHeight + 2;
        container.style.height = h + "px";
        container.style.width = w + "px";
        container.style.padding = "0";

        //check if you're on a larger device (like a tablet)
        if (h >= this.canvas.height * 1.75 || w >= this.canvas.height * 1.75) {
            //if so,set the view size to be twice
            //the pixel size for performance
            this.canvasMultiplier = 2;
            this.canvas.width = w / 2;
            this.canvas.height = h / 2;
            this.canvas.style.width = w + "px";
            this.canvas.style.height = h + "px";
        } else {
            //if not,set canvas to match the size of the window
            this.canvas.width = w;
            this.canvas.height = h;
        }

        //finally,set the cnavas to absolute position
        //in the top left of the window
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = "0px";
        this.canvas.style.top = "0px";
    }
}


var gameInstance: Game;

window.onload = () => {
    gameInstance = new Game({
        canvasId: "game"
    }, spriteMap);
}