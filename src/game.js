// Holds collections of the asteroids, bullets, and your ship.
// Game.prototype.step method calls Game.prototype.move on all the objects, and Game.prototype.checkCollisions checks for colliding objects.
// Game.prototype.draw(ctx) draws the game.
// Keeps track of dimensions of the space; wraps objects around when they drift off the screen.

const Asteroid = require("./asteroid");
const Ship = require("./ship");
const Bullet = require("./bullet")

function Game (objectArray) {
    Game.DIM_X = 800;
    Game.DIM_Y = 600;
    Game.NUM_ASTEROIDS = objectArray.num_asteroids;
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Ship({
        game: this,
        pos: this.randomPosition()
    })
}

Game.prototype.addAsteroids = function() {
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
        this.addObject(new Asteroid({
            pos: this.randomPosition(),
            game: this
        }));
    }
}

Game.prototype.addObject = function (obj) {
    if (obj instanceof Asteroid) {
        this.asteroids.push(obj)
    } else if (obj instanceof Bullet) {
        this.bullets.push(obj);
    }
}

Game.prototype.randomPosition = function() {
    let y = Math.floor(Math.random() * Game.DIM_Y);
    let x = Math.floor(Math.random() * Game.DIM_X);
    return [x, y];
}

Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, 800, 600);
    ctx.fillStyle = 'green';
    this.allObjects().forEach((piece) => {
        piece.draw(ctx);
        ctx.fill();
    })
}

Game.prototype.moveObjects = function() {
    this.allObjects().forEach((piece) => {
        piece.move();
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
    for (i = 0; i < this.allObjects().length; i++) {
        for (j = i + 1; j < this.allObjects().length; j++) {
            if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
                this.allObjects()[i].collideWith(this.allObjects()[j]);
            }
        }
    }
}

Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
}

Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroid) {
        let index = this.asteroids.indexOf(obj);
        if (index > -1) {
            this.asteroids.splice(index, 1)
        }
    } else if (obj instanceof Bullet) {
        let index = this.bullets.indexOf(obj);
        if (index > -1) {
            this.bullets.splice(index, 1);
        }
    }
}

Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.ship, this.bullets);
}

Game.prototype.isOutOfBounds = function(pos) {
    var canvas = document.getElementById('game-canvas')
    var width = canvas.width;
    var height = canvas.height;
    if (pos[0] < 0 || pos[0] > width || pos[1] < 0 || pos[1] > height) {
        return true;
    } else {
        return false;
    }
}

module.exports = Game
