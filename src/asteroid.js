// Spacerock. It inherits from MovingObject.
const MovingObject = require('./moving_object');
const Util = require('./utils'); 

function Asteroid(objectArray) {
    this.COLOR = '#32a852';
    this.RADIUS = 10;
    MovingObject.call(this, {
        pos: objectArray.pos,
        radius: this.RADIUS,
        color: this.COLOR,
        vel: Util.randomVec(4),
        game: objectArray.game
    });
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.constructor = Asteroid;

module.exports = Asteroid;