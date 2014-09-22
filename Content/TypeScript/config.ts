var spriteMap: ISpriteSheetMapOptions = {
    ship: {
        offsetX: 0,
        offsetY: 0,
        width: 37,
        height: 42,
        frames: 1
    },
    missile: { offsetX: 0, offsetY: 30, width: 2, height: 10, frames: 1 },
    enemy_purple: { offsetX: 37, offsetY: 0, width: 42, height: 43, frames: 1 },
    enemy_bee: { offsetX: 79, offsetY: 0, width: 37, height: 43, frames: 1 },
    enemy_ship: { offsetX: 116, offsetY: 0, width: 42, height: 43, frames: 1 },
    enemy_circle: { offsetX: 158, offsetY: 0, width: 32, height: 33, frames: 1 },
    explosion: { offsetX: 0, offsetY: 64, width: 64, height: 64, frames: 12 },
    enemy_missile: { offsetX: 9, offsetY: 42, width: 3, height: 20, frame: 1 }
};

enum KEY_CODES {
    left= 37,
    right= 39,
    fire= 32
}

var OBJECT_PLAYER = 1, OBJECT_PLAYER_PROJECTILE = 2,
    OBJECT_ENEMY = 4,
    OBJECT_ENEMY_PROJECTILE = 8,
    OBJECT_POWERUP = 16,
    enemies = {
        basic: { canvasOffsetX: 100, canvasOffsetY: -50, sprite: 'enemy_purple', B: 100, C: 4, E: 100, health: 20 },
        straight: {
            canvasOffsetX: 0, canvasOffsetY: -50, sprite: 'enemy_ship', health: 10, E: 100
        },
        ltr: {
            canvasOffsetX: 0, canvasOffsetY: -100, sprite: 'enemy_purple', health: 10,
            B: 75, C: 1, E: 100, missiles: 2 
        },
        circle: {
            canvasOffsetX: 250, canvasOffsetY: -50, sprite: 'enemy_circle', health: 10,
            A: 0, B: -100, C: 1, E: 20, F: 100, G: 1, H: Math.PI / 2
        },
        wiggle: {
            canvasOffsetX: 100, canvasOffsetY: -50, sprite: 'enemy_bee', health: 20,
            B: 50, C: 4, E: 100, firePercentage: 0.001, missiles: 2 
        },
        step: {
            canvasOffsetX: 0, canvasOffsetY: -50, sprite: 'enemy_circle', health: 10,
            B: 150, C: 1.2, E: 75
        }
    },
    level1 = [
        // Start,   End, Gap,  Type,   Override
        [0, 4000, 500, 'step'],
        [6000, 13000, 800, 'ltr'],
        [10000, 16000, 400, 'circle'],
        [17800, 20000, 500, 'straight', { canvasOffsetX: 50 }],
        [18200, 20000, 500, 'straight', { canvasOffsetX: 90 }],
        [18200, 20000, 500, 'straight', { canvasOffsetX: 10 }],
        [22000, 25000, 400, 'wiggle', { canvasOffsetX: 150 }],
        [22000, 25000, 400, 'wiggle', { canvasOffsetX: 100 }]
    ];