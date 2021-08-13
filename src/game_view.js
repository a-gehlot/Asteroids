// Stores a Game instance.
// Stores a canvas context to draw the game into.
// Installs key listeners to move the ship and fire bullets.
// Installs a timer to call Game.prototype.step.

const Game = require("./game");

function GameView (ctx, optionsObject) {
    this.ctx = ctx;
    this.game = new Game(optionsObject);
}

GameView.prototype.start = function (ctx) {
    this.game.addAsteroids();
    this.bindKeyHandlers();
    setInterval(() => {
        this.game.step();
        this.game.draw(ctx);
    }, 20)
}

GameView.prototype.bindKeyHandlers = function() {
    key('w', () => {
        this.game.ship.power([0, -1])
    })
    key('a', () => {
        this.game.ship.power([-1, 0])
    })
    key('s', () => {
        this.game.ship.power([0, 1])
    })
    key('d', () => {
        this.game.ship.power([1, 0])
    })
}

module.exports = GameView;