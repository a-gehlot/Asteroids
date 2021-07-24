// Base class for anything that moves.
// Most important methods are 
// MovingObject.prototype.move, 
// MovingObject.prototype.draw(ctx), 
// MovingObject.prototype.isCollidedWith(otherMovingObject)

const Util = require("./utils");


function MovingObject (optionsObject) {
    this.pos = optionsObject.pos;
    this.vel = optionsObject.vel;
    this.radius = optionsObject.radius;
    this.color = optionsObject.color;
    this.game = optionsObject.game;
}

MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.stroke();
}

MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = this.game.wrap(this.pos);
}

MovingObject.prototype.isCollidedWith = function (otherObject) {
    if (Util.dist(this.pos, otherObject.pos) <= (this.radius + otherObject.radius)) {
        return true;
    } else {
        return false;
    }
}

MovingObject.prototype.collideWith = function (otherObject) {
    this.game.remove(otherObject);
    this.game.remove(this);
}



module.exports = MovingObject;