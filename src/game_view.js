// Stores a Game instance.
// Stores a canvas context to draw the game into.
// Installs key listeners to move the ship and fire bullets.
// Installs a timer to call Game.prototype.step.

const Game = require("./game");

function GameView (ctx, optionsObject) {
    this.ctx = ctx;
    this.game = new Game(optionsObject);
}

// GameView.prototype.start = function (ctx) {
//     this.game.addAsteroids();
//     this.bindKeyHandlers();
//     setInterval(() => {
//         this.game.step();
//         this.game.draw(ctx);
//     }, 20)
// }

GameView.prototype.start = function (ctx) {
    this.game.addAsteroids();
    this.bindKeyHandlers();
    requestAnimationFrame(this.animate.bind(this));
}

GameView.prototype.bindKeyHandlers = function() {
    key('w', () => {
        this.game.ship.power([0, -1]);
    })
    key('a', () => {
        this.game.ship.power([-1, 0]);
    })
    key('s', () => {
        this.game.ship.power([0, 1]);
    })
    key('d', () => {
        this.game.ship.power([1, 0]);
    })
    key('space', () => {
        this.game.ship.fireBullet();
    })
}

GameView.prototype.animate = function (currentTime) {
    this.lastTime = this.lastTime || 0;
    let delta = (currentTime - this.lastTime);
    this.game.moveObjects(delta);
    this.game.draw(this.ctx);
    this.lastTime = currentTime;
    requestAnimationFrame(this.animate.bind(this));
}

module.exports = GameView;