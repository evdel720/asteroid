const Asteroid = require("./asteroid.js");

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
