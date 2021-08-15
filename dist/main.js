/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// Spacerock. It inherits from MovingObject.\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\"); \nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\")\n\nfunction Asteroid(objectArray) {\n    Asteroid.COLOR = '#32a852';\n    Asteroid.RADIUS = 10;\n    MovingObject.call(this, {\n        pos: objectArray.pos,\n        radius: Asteroid.RADIUS,\n        color: Asteroid.COLOR,\n        vel: Util.randomVec(4),\n        game: objectArray.game\n    });\n}\n\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.constructor = Asteroid;\n\nAsteroid.prototype.collideWith = function (otherObject) {\n    if (otherObject instanceof Ship) {\n        otherObject.relocate();\n    }\n}\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// Holds collections of the asteroids, bullets, and your ship.\n// Game.prototype.step method calls Game.prototype.move on all the objects, and Game.prototype.checkCollisions checks for colliding objects.\n// Game.prototype.draw(ctx) draws the game.\n// Keeps track of dimensions of the space; wraps objects around when they drift off the screen.\n\nconst Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nfunction Game (objectArray) {\n    Game.DIM_X = 800;\n    Game.DIM_Y = 600;\n    Game.NUM_ASTEROIDS = objectArray.num_asteroids;\n    this.asteroids = [];\n    this.bullets = [];\n    this.ship = new Ship({\n        game: this,\n        pos: this.randomPosition()\n    })\n}\n\nGame.prototype.addAsteroids = function() {\n    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n        this.addObject(new Asteroid({\n            pos: this.randomPosition(),\n            game: this\n        }));\n    }\n}\n\nGame.prototype.addObject = function (obj) {\n    if (obj instanceof Asteroid) {\n        this.asteroids.push(obj)\n    } else if (obj instanceof Bullet) {\n        this.bullets.push(obj);\n    }\n}\n\nGame.prototype.randomPosition = function() {\n    let y = Math.floor(Math.random() * Game.DIM_Y);\n    let x = Math.floor(Math.random() * Game.DIM_X);\n    return [x, y];\n}\n\nGame.prototype.draw = function(ctx) {\n    ctx.clearRect(0, 0, 800, 600);\n    ctx.fillStyle = 'green';\n    this.allObjects().forEach((piece) => {\n        piece.draw(ctx);\n        ctx.fill();\n    })\n}\n\nGame.prototype.moveObjects = function() {\n    this.allObjects().forEach((piece) => {\n        piece.move();\n    })\n}\n\nGame.prototype.wrap = function(pos) {\n    if (pos[0] < 0) {\n        pos[0] = 800;\n    }\n    else if (pos[0] > 800) {\n        pos[0] = 0;\n    }\n    if (pos[1] < 0) {\n        pos[1] = 600;\n    }\n    else if (pos[1] > 600) {\n        pos[1] = 0;\n    }\n    return pos;\n}\n\nGame.prototype.checkCollisions = function() {\n    for (i = 0; i < this.allObjects().length; i++) {\n        for (j = i + 1; j < this.allObjects().length; j++) {\n            if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {\n                this.allObjects()[i].collideWith(this.allObjects()[j]);\n            }\n        }\n    }\n}\n\nGame.prototype.step = function () {\n    this.moveObjects();\n    this.checkCollisions();\n}\n\nGame.prototype.remove = function(obj) {\n    if (obj instanceof Asteroid) {\n        let index = this.asteroids.indexOf(obj);\n        if (index > -1) {\n            this.asteroids.splice(index, 1)\n        }\n    } else if (obj instanceof Bullet) {\n        let index = this.bullets.indexOf(obj);\n        if (index > -1) {\n            this.bullets.splice(index, 1);\n        }\n    }\n}\n\nGame.prototype.allObjects = function() {\n    return this.asteroids.concat(this.ship, this.bullets);\n}\n\nmodule.exports = Game\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// Stores a Game instance.\n// Stores a canvas context to draw the game into.\n// Installs key listeners to move the ship and fire bullets.\n// Installs a timer to call Game.prototype.step.\n\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nfunction GameView (ctx, optionsObject) {\n    this.ctx = ctx;\n    this.game = new Game(optionsObject);\n}\n\nGameView.prototype.start = function (ctx) {\n    this.game.addAsteroids();\n    this.bindKeyHandlers();\n    setInterval(() => {\n        this.game.step();\n        this.game.draw(ctx);\n    }, 20)\n}\n\nGameView.prototype.bindKeyHandlers = function() {\n    key('w', () => {\n        this.game.ship.power([0, -1])\n    })\n    key('a', () => {\n        this.game.ship.power([-1, 0])\n    })\n    key('s', () => {\n        this.game.ship.power([0, 1])\n    })\n    key('d', () => {\n        this.game.ship.power([1, 0])\n    })\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("console.log('Webpack is working!');\n\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\")\nconst Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\")\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\")\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\")\n\n\nwindow.MovingObject = MovingObject;\nwindow.Asteroid = Asteroid;\nwindow.Game = Game;\n\nwindow.addEventListener('DOMContentLoaded', (event) => {\n    const canvas = document.getElementById('game-canvas');\n    const ctx = canvas.getContext('2d');\n    const optionsObject = {\n        pos: [0,0],\n        vel: 10,\n        radius: 5,\n        color: '#eb3434',\n        num_asteroids: 5\n    }\n    const gameView = new GameView(ctx, optionsObject);\n    gameView.start(ctx);\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// Base class for anything that moves.\n// Most important methods are \n// MovingObject.prototype.move, \n// MovingObject.prototype.draw(ctx), \n// MovingObject.prototype.isCollidedWith(otherMovingObject)\n\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\nfunction MovingObject (optionsObject) {\n    this.pos = optionsObject.pos;\n    this.vel = optionsObject.vel;\n    this.radius = optionsObject.radius;\n    this.color = optionsObject.color;\n    this.game = optionsObject.game;\n}\n\nMovingObject.prototype.draw = function (ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n    ctx.stroke();\n}\n\nMovingObject.prototype.move = function () {\n    this.pos[0] += this.vel[0];\n    this.pos[1] += this.vel[1];\n    this.pos = this.game.wrap(this.pos);\n}\n\nMovingObject.prototype.isCollidedWith = function (otherObject) {\n    if (Util.dist(this.pos, otherObject.pos) <= (this.radius + otherObject.radius)) {\n        return true;\n    } else {\n        return false;\n    }\n}\n\nMovingObject.prototype.collideWith = function (otherObject) {\n\n}\n\n\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// This is you! Another MovingObject subclass.\n\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction Ship (optionsObject) {\n    optionsObject.vel = optionsObject.vel || [0,0] \n    optionsObject.radius = Ship.RADIUS\n    optionsObject.color = Ship.COLOR\n    MovingObject.call(this, optionsObject)\n}\n\nShip.RADIUS = 15;\n\nShip.COLOR = '32a852'\n\nUtil.inherits(Ship, MovingObject)\n\nShip.prototype.constructor = Ship;\n\nShip.prototype.relocate = function() {\n    this.pos = this.game.randomPosition();\n    this.vel = [0,0];\n}\n\nShip.prototype.power = function (impulse) {\n    this.vel = this.vel.map(function(val, idx) {\n        return val + impulse[idx];\n    })\n}\n\nmodule.exports = Ship;\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("// Utility code, especially vector math stuff.\n\nconst Util = {\n    inherits: function inherits(childClass, parentClass)  {\n        childClass.prototype = Object.create(parentClass.prototype);\n        childClass.prototype.constructor = childClass;\n    },\n    randomVec: function randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n\n    scale: function scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    },\n\n    dist: function dist(pos1, pos2) {\n        return Math.sqrt((pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2)\n    }\n\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;