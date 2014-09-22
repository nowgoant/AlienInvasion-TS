var Level = (function () {
    function Level(game, levelData, callback) {
        this.levelData = [];
        this.levelData = [];
        this.game = game;
        for (var i = 0; i < levelData.length; i++) {
            this.levelData.push(Object.create(levelData[i]));
        }
        this.t = 0;
        this.callback = callback;
    }
    Level.prototype.step = function (dt) {
        var idx = 0, remove = [], curShip = null;

        // Update the current time offset
        this.t += dt * 1000;

        while ((curShip = this.levelData[idx]) && (curShip[0] < this.t + 2000)) {
            // Check if we've passed the end time
            if (this.t > curShip[1]) {
                remove.push(curShip);
            } else if (curShip[0] < this.t) {
                // Get the enemy definition blueprint
                var enemy = enemies[curShip[3]], override = curShip[4];

                // Add a new enemy with the blueprint and override
                this.board.add(new Enemy(this.game, enemy, override));

                // Increment the start time by the gap
                curShip[0] += curShip[2];
            }
            idx++;
        }

        for (var i = 0, len = remove.length; i < len; i++) {
            var remIdx = this.levelData.indexOf(remove[i]);
            if (remIdx != -1)
                this.levelData.splice(remIdx, 1);
        }

        // If there are no more enemies on the board or in
        // levelData, this level is done
        if (this.levelData.length === 0 && this.board.cnt[OBJECT_ENEMY] === 0) {
            if (this.callback)
                this.callback();
        }
    };

    Level.prototype.draw = function (ctx) {
        //todo
    };
    return Level;
})();
//# sourceMappingURL=Level.js.map
