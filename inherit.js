Function.prototype.inherits = function(parent) {
  let Surrogate = function () {};
  Surrogate.prototype = parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};


function MovingObject (color, skill) {
  this.color = color;
  this.skill = skill;
}

function Ship (size, name, color, skill) {
  this.size = size;
  this.name = name;
  MovingObject.call(this, color, skill);
}

Ship.inherits(MovingObject);
