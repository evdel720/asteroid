/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);

	document.addEventListener('DOMContentLoaded', function(){
	  let g = new GameView();
	  g.start();
	}, false);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

	function GameView() {
	  this.game = new Game();
	  this.canvas = document.getElementById('game-canvas');
	  this.ctx = this.canvas.getContext("2d");
	}

	GameView.prototype.start = function(){
	  let currView = this;
	  window.setInterval(function () {
	    currView.game.moveObjects();
	    currView.game.draw(currView.ctx);
	  }, 20);
	};

	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);

	function Game() {
	  this.DIM_X = 1000;
	  this.DIM_Y = 800;
	  this.NUM_ASTEROIDS = 20;
	  this.asteroids = [];
	  for (let idx = 0; idx < this.NUM_ASTEROIDS; idx++){
	    this.addAsteroids();
	  }
	}

	Game.prototype.addAsteroids = function() {
	  this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));
	};

	Game.prototype.randomPosition = function() {
	  return [this.DIM_X * Math.random(), this.DIM_Y * Math.random()];
	};

	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);

	  this.asteroids.forEach( function (asteroid) {
	    asteroid.draw(ctx);
	  });
	};

	Game.prototype.moveObjects = function() {
	  this.asteroids.forEach( function(asteroid) {
	    asteroid.move();
	  });
	};

	Game.prototype.wrap = function(pos) {
	  let x = pos[0];
	  x = (x > this.DIM_X) ? 0 : x;
	  x = (x < 0) ? this.DIM_X : x;
	  let y = pos[1];
	  y = (y > this.DIM_Y) ? 0 : y;
	  y = (y < 0) ? this.DIM_Y : y;
	  return [x, y];
	};

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);

	function Asteroid(options) {
	  let defaultOptions = {color: "#808080", radius: 15, vel: Util.randomVec()};
	  Object.assign(defaultOptions, options);
	  MovingObject.call(this, defaultOptions);
	}

	Util.inherits(Asteroid,MovingObject);

	module.exports = Asteroid;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {};

	Util.inherits = function(child, parent) {
	  let Surrogate = function () {};
	  Surrogate.prototype = parent.prototype;
	  child.prototype = new Surrogate();
	  child.prototype.constructor = child;
	};

	Util.randomVec = function() {
	  let a = Math.random();
	  let b = Math.random();
	  a = (a > 0.5) ? 1 : -1;
	  b = (b > 0.5) ? 1 : -1;
	  return [5 * Math.random() * a, 5 * Math.random() * b];
	};

	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function MovingObject(options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
	}

	MovingObject.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();

	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );

	  ctx.fill();
	};

	MovingObject.prototype.move = function() {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  this.pos = this.game.wrap(this.pos);
	};


	module.exports = MovingObject;


/***/ }
/******/ ]);