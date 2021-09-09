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

// MovingObject.prototype.move = function () {
//     this.pos[0] += this.vel[0];
//     this.pos[1] += this.vel[1];
//     if (this.game.isOutOfBounds(this.pos)) {    
//         if (this.isWrappable) {
//             this.pos = this.game.wrap(this.pos);
//         } else {
//             this.game.remove(this);
//         }        
//     }
// }

MovingObject.prototype.move = function (timeDelta) {
    this.delta = this.delta || 1;
    this.pos[0] += this.vel[0] * this.delta;
    this.pos[1] += this.vel[1] * this.delta;

    if (this.game.isOutOfBounds(this.pos)) {    
        if (this.isWrappable) {
            this.pos = this.game.wrap(this.pos);
        } else {
            this.game.remove(this);
        }        
    }
}

MovingObject.prototype.isCollidedWith = function (otherObject) {
    if (Util.dist(this.pos, otherObject.pos) <= (this.radius + otherObject.radius)) {
        return true;
    } else {
        return false;
    }
}

MovingObject.prototype.collideWith = function (otherObject) {

}

MovingObject.prototype.isWrappable = true;



module.exports = MovingObject;