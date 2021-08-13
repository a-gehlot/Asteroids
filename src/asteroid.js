// Spacerock. It inherits from MovingObject.
const MovingObject = require('./moving_object');
const Util = require('./utils'); 
const Ship = require('./ship')

function Asteroid(objectArray) {
    Asteroid.COLOR = '#32a852';
    Asteroid.RADIUS = 10;
    MovingObject.call(this, {
        pos: objectArray.pos,
        radius: Asteroid.RADIUS,
        color: Asteroid.COLOR,
        vel: Util.randomVec(4),
        game: objectArray.game
    });
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Ship) {
        otherObject.relocate();
    }
}

module.exports = Asteroid;