// Kill spacerocks with this. Also a MovingObject subclass.

const MovingObject = require("./moving_object");
const Util = require("./utils");

function Bullet (optionsObject) {
    optionsObject.radius = Bullet.RADIUS;
    MovingObject.call(this, optionsObject)
}

Bullet.RADIUS = 4;

Bullet.prototype.constructor = Bullet;

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;


module.exports = Bullet;
