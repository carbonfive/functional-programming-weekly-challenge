var $ = {};

function compose(f, g) {
  return function() {
    return f.call(null, g.apply(null, arguments));
  };
};

function concat(arr, value) {
  return arr.concat(value);
}

// foldr :: (a -> b -> b) -> b -> [a] -> b
$.foldFromRight = function(f, acc, arr) {
  if (arr.length == 0) {
    return acc;
  }
  else {
    var lastIdx = arr.length - 1;
    return $.foldFromRight(f, f(arr[lastIdx], acc), arr.slice(0, lastIdx));
  }
};

$.foldFromLeft = function(f, acc, arr) {
  if (arr.length == 0) {
    return acc;
  }
  else {
    return $.foldFromLeft(f, f(acc, arr[0]), arr.slice(1, arr.length));
  }
};

$.mapFromLeft = function(f, arr) {
  return $.foldFromLeft(function(acc, item) {
    return acc.concat(f(item));
  }, [], arr);
};

$.filterFromLeft = function(p, arr) {
  return $.foldFromLeft(function(acc, item) {
    if (p(item)) {
      return acc.concat(item);
    }
    else {
      return acc;
    }
  }, [], arr);
};

$.findFromLeft = function(p, arr) {
  var len = arr.length;

  if (len == 0) {
    return undefined;
  }
  else {
  }
  if (p(arr[0])) {
    return arr[0];
  }
  else {
    return $.findFromLeft(p, arr.slice(1, len));
  }
};

module.exports = $
