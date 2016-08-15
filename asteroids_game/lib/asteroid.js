const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");

function Asteroid(options) {
  let defaultOptions = {color: "#808080", radius: 15, vel: Util.randomVec()};
  Object.assign(defaultOptions, options);
  MovingObject.call(this, defaultOptions);
}

Util.inherits(Asteroid,MovingObject);

module.exports = Asteroid;
