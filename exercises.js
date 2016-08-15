function sum() {
  let argumentArray = Array.prototype.slice.call(arguments);
  let result = 0;
  argumentArray.forEach(el => {
    result += el;
  });
  return result;
}


Function.prototype.myBind = function(obj, ...args) {
  let thisFunc = this;
  let result = function (...moreArgs) {
    return thisFunc.apply(obj, args.concat(moreArgs));
  };
  return result;
};


class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");
const notMarkovSays = markov.says.myBind(breakfast);
// console.log(notMarkovSays("meow", "me"));


function curriedSum(numArgs) {
  let numbers = [];

  let _curriedSum = function(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return sum(...numbers);
    }
    else {
      return _curriedSum;
    }
  };
  return _curriedSum;
}

// const thing = curriedSum(4);
// console.log(thing(5)(30)(20)(1));


Function.prototype.curry = function(numArgs) {
  let args = [];
  let func = this;
  function _curry(argument) {
    args.push(argument);
    if (args.length === numArgs) {
      return func(...args);
    }
    else {
      return _curry;
    }
  }
  return _curry;
};


function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30
console.log(f1);
// or more briefly:

console.log(sumThree.curry(3)(4)(20)(6)); // == 30
// console.log();





//
