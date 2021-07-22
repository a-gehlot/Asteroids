// Holds collections of the asteroids, bullets, and your ship.
// Game.prototype.step method calls Game.prototype.move on all the objects, and Game.prototype.checkCollisions checks for colliding objects.
// Game.prototype.draw(ctx) draws the game.
// Keeps track of dimensions of the space; wraps objects around when they drift off the screen.

const Asteroid = require("./asteroid");

function Game (objectArray) {
    this.DIM_X = 500;
    this.DIM_Y = 500;
    this.NUM_ASTEROIDS = objectArray.num_asteroids;
    this.asteroids = [];
}

Game.prototype.addAsteroids = function() {
    for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
        this.asteroids.push(new Asteroid({pos: this.randomPosition() }));
    }
}

Game.prototype.randomPosition = function() {
    let y = Math.floor(Math.random() * this.DIM_Y);
    let x = Math.floor(Math.random() * this.DIM_X);
    return [x, y];
}

Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, 500, 500);
    this.asteroids.forEach((asteroid) => {
        asteroid.draw(ctx);
        // ctx.clearRect(0, 0, 500, 500);
    })
}

Game.prototype.moveObjects = function() {
    this.asteroids.forEach((asteroid) => {
        asteroid.move();
    })
}

module.exports = Game