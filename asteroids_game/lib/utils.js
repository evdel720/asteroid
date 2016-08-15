const Util = {};

Util.inherits = function(child, parent) {
  let Surrogate = function () {};
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();
  child.prototype.constructor = child;
};

// Util.randomVec(length)

module.exports = Util;
