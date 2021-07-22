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

eval("// Spacerock. It inherits from MovingObject.\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\"); \n\nfunction Asteroid(objectArray) {\n    this.COLOR = '#32a852';\n    this.RADIUS = 10;\n    this.pos = objectArray.pos;\n    MovingObject.call(this, {\n        pos: this.pos,\n        radius: this.RADIUS,\n        color: this.COLOR,\n        vel: Util.randomVec(4)\n    });\n}\n\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.constructor = Asteroid;\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// Holds collections of the asteroids, bullets, and your ship.\n// Game.prototype.step method calls Game.prototype.move on all the objects, and Game.prototype.checkCollisions checks for colliding objects.\n// Game.prototype.draw(ctx) draws the game.\n// Keeps track of dimensions of the space; wraps objects around when they drift off the screen.\n\nconst Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\n\nfunction Game (objectArray) {\n    this.DIM_X = 500;\n    this.DIM_Y = 500;\n    this.NUM_ASTEROIDS = objectArray.num_asteroids;\n    this.asteroids = [];\n}\n\nGame.prototype.addAsteroids = function() {\n    for (let i = 0; i < this.NUM_ASTEROIDS; i++) {\n        this.asteroids.push(new Asteroid({pos: this.randomPosition() }));\n    }\n}\n\nGame.prototype.randomPosition = function() {\n    let y = Math.floor(Math.random() * this.DIM_Y);\n    let x = Math.floor(Math.random() * this.DIM_X);\n    return [x, y];\n}\n\nGame.prototype.draw = function(ctx) {\n    ctx.clearRect(0, 0, 500, 500);\n    this.asteroids.forEach((asteroid) => {\n        asteroid.draw(ctx);\n        // ctx.clearRect(0, 0, 500, 500);\n    })\n}\n\nGame.prototype.moveObjects = function() {\n    this.asteroids.forEach((asteroid) => {\n        asteroid.move();\n    })\n}\n\nmodule.exports = Game\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// Stores a Game instance.\n// Stores a canvas context to draw the game into.\n// Installs key listeners to move the ship and fire bullets.\n// Installs a timer to call Game.prototype.step.\n\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nfunction GameView (ctx, optionsObject) {\n    this.ctx = ctx;\n    this.game = new Game(optionsObject);\n}\n\nGameView.prototype.start = function (ctx) {\n    this.game.addAsteroids();\n    setInterval(() => {\n        this.game.moveObjects();\n        this.game.draw(ctx);\n    }, 20)\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("console.log('Webpack is working!');\n\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\")\nconst Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\")\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\")\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\")\n\n\nwindow.MovingObject = MovingObject;\nwindow.Asteroid = Asteroid;\nwindow.Game = Game;\n\nwindow.addEventListener('DOMContentLoaded', (event) => {\n    const canvas = document.getElementById('game-canvas');\n    const ctx = canvas.getContext('2d');\n    const optionsObject = {\n        pos: [0,0],\n        vel: 10,\n        radius: 5,\n        color: '#eb3434',\n        num_asteroids: 20\n    }\n    const gameView = new GameView(ctx, optionsObject);\n    gameView.start(ctx);\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module) => {

eval("// Base class for anything that moves.\n// Most important methods are \n// MovingObject.prototype.move, \n// MovingObject.prototype.draw(ctx), \n// MovingObject.prototype.isCollidedWith(otherMovingObject)\n\nfunction MovingObject (optionsObject) {\n    this.pos = optionsObject.pos;\n    this.vel = optionsObject.vel;\n    this.radius = optionsObject.radius;\n    this.color = optionsObject.color;\n}\n\nMovingObject.prototype.draw = function (ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n    ctx.stroke();\n}\n\nMovingObject.prototype.move = function () {\n    this.pos[0] += this.vel[0];\n    this.pos[1] += this.vel[1];\n}\n\n\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("// Utility code, especially vector math stuff.\n\nconst Util = {\n    inherits: function inherits(childClass, parentClass)  {\n        childClass.prototype = Object.create(parentClass.prototype);\n        childClass.prototype.constructor = childClass;\n    },\n    randomVec: function randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n\n    scale: function scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    }\n    \n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/utils.js?");

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