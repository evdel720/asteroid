function sum() {
  let argumentArray = Array.prototype.slice.call(arguments);
  let result = 0;
  argumentArray.forEach(el => {
    result += el;
  });
  return result;
}


Function.prototype.myBind = function(obj) {
  let args = Array.from(arguments);
  args.shift();
  let thisFunc = this;
  let result = function () {
    let moreArgs = Array.from(arguments);
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
console.log(notMarkovSays("meow", "me"));
