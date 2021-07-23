// Utility code, especially vector math stuff.

const Util = {
    inherits: function inherits(childClass, parentClass)  {
        childClass.prototype = Object.create(parentClass.prototype);
        childClass.prototype.constructor = childClass;
    },
    randomVec: function randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },

    scale: function scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    },

    dist: function dist(pos1, pos2) {
        return Math.sqrt((pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2)
    }

};

module.exports = Util;