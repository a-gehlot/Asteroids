// Kill spacerocks with this. Also a MovingObject subclass.

const MovingObject = require("./moving_object");
const Util = require("./utils");

function Bullet (optionsObject) {
    optionsObject.RADIUS = Bullet.RADIUS;
    MovingObject.call(this, optionsObject)
}

Bullet.RADIUS = 4;

Util.inherits(Bullet, MovingObject);

module.exports = Bullet;
