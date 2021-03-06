const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");

function Game() {
  this.DIM_X = 1000;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 5;
  this.asteroids = [];
  for (let idx = 0; idx < this.NUM_ASTEROIDS; idx++){
    this.addAsteroids();
  }
  this.ship = new Ship({pos: this.randomPosition(), game: this});
}

Game.prototype.allObjects = function() {
  let allObs = this.asteroids.concat(this.ship);
  return allObs;
};

Game.prototype.addAsteroids = function() {
  this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));
};

Game.prototype.randomPosition = function() {
  return [this.DIM_X * Math.random(), this.DIM_Y * Math.random()];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);

  this.allObjects().forEach( function (asteroid) {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach( function(asteroid) {
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

Game.prototype.checkCollisions = function() {
  let currGame = this;
  this.allObjects().forEach(function(ob1) {
    currGame.allObjects().forEach(function(ob2) {
      if (ob1 !== ob2) {
        ob1.collideWith(ob2);
      }
    });
  });
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(asteroid){
  let astrPos = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(astrPos, 1);
};

module.exports = Game;
