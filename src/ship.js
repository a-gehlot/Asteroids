// This is you! Another MovingObject subclass.

const MovingObject = require("./moving_object");

function Ship (optionsObject) {
    Ship.RADIUS = 4;
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

module.exports = Ship;
