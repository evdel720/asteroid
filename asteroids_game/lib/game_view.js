const Game = require("./game.js");

function GameView() {
  this.game = new Game();
  this.canvas = document.getElementById('game-canvas');
  this.ctx = this.canvas.getContext("2d");
}

GameView.prototype.start = function(){
  let currView = this;
  window.setInterval(function () {
    currView.game.step();
    currView.game.draw(currView.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function() {
  // key('a', function(){ this.game.ship.power() });
};

module.exports = GameView;
