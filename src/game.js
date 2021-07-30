// Holds collections of the asteroids, bullets, and your ship.
// Game.prototype.step method calls Game.prototype.move on all the objects, and Game.prototype.checkCollisions checks for colliding objects.
// Game.prototype.draw(ctx) draws the game.
// Keeps track of dimensions of the space; wraps objects around when they drift off the screen.

const Asteroid = require("./asteroid");
const Ship = require("./ship");

function Game (objectArray) {
    Game.DIM_X = 800;
    Game.DIM_Y = 600;
    Game.NUM_ASTEROIDS = objectArray.num_asteroids;
    this.asteroids = [];
    this.ship = new Ship({
        game: this,
        pos: this.randomPosition()
    })
}

Game.prototype.addAsteroids = function() {
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
        this.asteroids.push(new Asteroid({
            pos: this.randomPosition(),
            game: this
        }));
    }
}

Game.prototype.randomPosition = function() {
    let y = Math.floor(Math.random() * Game.DIM_Y);
    let x = Math.floor(Math.random() * Game.DIM_X);
    return [x, y];
}

Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, 800, 600);
    this.asteroids.forEach((asteroid) => {
        asteroid.draw(ctx);
    })
}

Game.prototype.moveObjects = function() {
    this.asteroids.forEach((asteroid) => {
        asteroid.move();
    })
}

Game.prototype.wrap = function(pos) {
    if (pos[0] < 0) {
        pos[0] = 800;
    }
    else if (pos[0] > 800) {
        pos[0] = 0;
    }
    if (pos[1] < 0) {
        pos[1] = 600;
    }
    else if (pos[1] > 600) {
        pos[1] = 0;
    }
    return pos;
}

Game.prototype.checkCollisions = function() {
    for (i = 0; i < this.asteroids.length; i++) {
        for (j = i + 1; j < this.asteroids.length; j++) {
            if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
                this.asteroids[i].collideWith(this.asteroids[j]);
            }
        }
    }
}

Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
}

Game.prototype.remove = function(asteroid) {
    let index = this.asteroids.indexOf(asteroid);
    if (index > -1) {
        this.asteroids.splice(index, 1);
    }
}

module.exports = Game
