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
