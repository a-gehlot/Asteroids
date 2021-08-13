// This is you! Another MovingObject subclass.

const MovingObject = require("./moving_object");
const Util = require("./utils");

function Ship (optionsObject) {
    Ship.RADIUS = 15;
    Ship.COLOR = '32a852'
    this.vel = [0,0];
    MovingObject.call(this, {
        pos: optionsObject.pos,
        vel: this.vel,
        radius: Ship.RADIUS,
        color: Ship.COLOR,
        game: optionsObject.game
    })
}

Util.inherits(Ship, MovingObject)

Ship.prototype.constructor = Ship;

Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
}

module.exports = Ship;
