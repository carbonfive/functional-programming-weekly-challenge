λ = require('./solution.js');
b = require('./bonus.js');

function assertEq(provided, expr2, msg) {
  if (JSON.stringify(provided) !== JSON.stringify(expr2)) {
    throw new Error("*** was not equal: " + msg + "\n" + "provided: " + JSON.stringify(provided) + " and expr2: " + JSON.stringify(expr2) + "\n\n");
  }
  else {
    console.log(">>> pass! " + msg + "\n\n");
  }
}

function isUpperCase(s) {
  return s.toUpperCase() == s;
};

var one = λ.foldFromRight(λ.flip(λ.concat), [], [1, 2, 3, 4, 5])
assertEq(one, [5, 4, 3, 2, 1], "foldr concat");

var two = λ.foldFromLeft(λ.iif(λ.comp(isUpperCase, λ.arg(1)), λ.id, λ.concat), [], "Hello, Moto".split(""));
assertEq(two, "ellooto".split(""), "foldl only lowercase alpha chars");

var three = λ.mapFromLeft(λ.mul(10), [1, 2, 3, 4])
assertEq(three, [10, 20, 30, 40], "map from left *10");

var fourA = λ.filterFromLeft(λ.comp(λ.eq(1), λ.flip(λ.mod)(2)), [1, 2, 3, 4])
assertEq(fourA, [1,3], "filter out even values");

var fourB = λ.filterFromLeft(λ.lt(10), [1, 2, 3, 4]);
assertEq(fourB, [], "filters everything out");

var fiveA = λ.findFromLeft(λ.eq(2), [1, 2, 3, 4]);
assertEq(fiveA, 2, "match w/find");

var fiveB = λ.findFromLeft(λ.eq(10), [1, 2, 3, 4]);
assertEq(fiveB, undefined, "no match w/find");

// BONUS STUFF
//
assertEq(b.pairs([]), [], "empty list to pairs returns empty list");
assertEq(b.pairs(["hello"]), [], "need at least two things to form a pair");
assertEq(b.pairs(["friends", "hello"]), ["friends+hello"], "two items form a pair");
assertEq(b.pairs(["hello", "friends"]), ["friends+hello"], "two items form a pair - always alphabetized");
assertEq(b.pairs(["friends", "friends", "hello", "friends"]), ["friends+friends", "friends+hello"], "only counting unique pairs");
