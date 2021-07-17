// Base class for anything that moves.
// Most important methods are 
// MovingObject.prototype.move, 
// MovingObject.prototype.draw(ctx), 
// MovingObject.prototype.isCollidedWith(otherMovingObject)

function MovingObject (optionsObject) {
    this.pos = optionsObject.pos;
    this.vel = optionsObject.vel;
    this.radius = optionsObject.radius;
    this.color = optionsObject.color;
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
}



module.exports = MovingObject;