$ = require('./solution.js');

function assertEq(expr1, expr2, msg) {
  if (JSON.stringify(expr1) !== JSON.stringify(expr2)) {
    throw new Error("*** was not equal: " + msg + "\n" + "expr1: " + expr1 + " and expr2: " + expr2 + "\n\n");
  }
  else {
    console.log(">>> pass! " + msg + "\n\n");
  }
}

// foldr
// (a -> b -> b) -> b -> [a] -> b
one = $.foldFromRight(function(item, acc) {
  return acc + item;
}, 0, [1, 2, 3, 4, 5]);

// foldl
// (a -> b -> a) -> a -> [b] -> a
two = $.foldFromLeft(function(acc, item) {
  if (item == item.toUpperCase()) {
    return acc;
  }
  else {
    return acc.concat(item);
  }
}, [], "Hello, Moto".split(""));

// map
// (a -> b) -> [a] -> [b]
three = $.mapFromLeft(function(item) {
  return item * 10;
}, [1, 2, 3, 4]);

fourA = $.filterFromLeft(function(item) {
  return item % 2 == 1;
}, [1, 2, 3, 4]);

fourB = $.filterFromLeft(function(item) {
  return item > 10;
}, [1, 2, 3, 4]);

fiveA = $.findFromLeft(function(item) {
  return item == 2;
}, [1, 2, 3, 4]);

fiveB = $.findFromLeft(function(item) {
  return item == 10;
}, [1, 2, 3, 4]);

assertEq(one, 15, "foldr sum");
assertEq(two, "ellooto".split(""), "foldl only lowercase alpha chars");
assertEq(three, [10, 20, 30, 40], "map from left *10");
assertEq(fourA, [1,3], "filter out even values");
assertEq(fourB, [], "filters everything out");
assertEq(fiveA, 2, "match w/find");
assertEq(fiveB, undefined, "no match w/find");
