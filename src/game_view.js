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
    setInterval(() => {
        this.game.moveObjects();
        this.game.draw(ctx);
    }, 20)
}

module.exports = GameView;