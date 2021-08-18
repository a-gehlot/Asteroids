// This is you! Another MovingObject subclass.

const Bullet = require("./bullet");
const MovingObject = require("./moving_object");
const Util = require("./utils");

function Ship (optionsObject) {
    optionsObject.vel = optionsObject.vel || [0,0] 
    optionsObject.radius = Ship.RADIUS
    optionsObject.color = Ship.COLOR
    MovingObject.call(this, optionsObject)
}

Ship.RADIUS = 15;

Ship.COLOR = '32a852'

Util.inherits(Ship, MovingObject)

Ship.prototype.constructor = Ship;

Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
}

Ship.prototype.power = function (impulse) {
    this.vel = this.vel.map(function(val, idx) {
        return val + impulse[idx];
    })
}

Ship.prototype.fireBullet = function() {
    let posCopy = JSON.parse(JSON.stringify(this.pos))
    optionsObject = {
        pos: posCopy,
        game: this.game,
        vel: this.vel.map(function(val) {return val * 4 + 1})
    }
    this.game.addObject(new Bullet(optionsObject))
}

module.exports = Ship;
