var $ = {};

function curry(fx) {
  var arity = fx.length;

  return function() {
    var args1 = Array.prototype.slice.call(arguments, 0),
        len1  = args1.length;

    if (len1 < arity) {
      return function accumulator() {
        var args2 = Array.prototype.slice.call(arguments, 0),
            len2  = args2.length;

        if (len1 + len2 == arity) {
          return fx.apply(null, $.concat(args1, args2));
        }
        else {
          return accumulator.apply(null, $.concat($.concat($.concat([], fx), args1), args2))
        }
      }
    }
    else {
      return fx.apply(null, args1);
    }
  };
}

$.gt = curry(function(x, y) {
  return x > y;
});

$.lt = curry(function(x, y) {
  return x < y;
});

$.div = curry(function(n, d) {
  return (n / d);
});

$.sum = curry(function(x, y) {
  return (x + y);
});

$.mul = curry(function(x, y) {
  return (x * y);
});

$.mod = curry(function(x, y) {
  return x % y;
});

$.id = function(x) {
  return x;
};

$.eq = curry(function(x, y) {
  return x === y;
});

$.concat = curry(function(arr, value) {
  return arr.concat(value);
});

$.comp = curry(function(f, g) {
  return function() {
    return f.call(null, g.apply(null, Array.prototype.slice.call(arguments, 0)));
  };
});

$.arg0 = function() {
  return $.id.apply(null, Array.prototype.slice.call(arguments, 0, 1));
};

$.arg1 = function() {
  return $.id.apply(null, Array.prototype.slice.call(arguments, 1, 2));
};

$.flip = function(f) {
  return curry(function(x, y) {
    return f.apply(null, [y, x]);
  });
};

$.iif = curry(function(expr, f1, f2) {
  return function() {
    var expr2 = (typeof expr == 'function') ? expr : function() { return expr; }

    if (expr2.apply(null, arguments)) {
      return f1.apply(null, arguments);
    }
    else {
      return f2.apply(null, arguments);
    }
  };
});

// TODO: fix O(n^2)
$.foldFromRight = curry(function(f, acc, arr) {
  var lastIdx = arr.length - 1;

  if (lastIdx === -1) {
    return acc;
  }
  else {
    return $.foldFromRight(f, f(arr[lastIdx], acc), arr.slice(0, lastIdx));
  }
});

$.foldFromLeft = curry(function(f, acc, arr) {
  if (arr[0] == undefined) {
    return acc;
  }
  else {
    return $.foldFromLeft(f, f(acc, arr[0]), arr.slice(1, arr.length));
  }
});

$.mapFromLeft = curry(function(f, arr) {
  return $.foldFromLeft(function(acc, item) {
    return $.concat(acc, f(item));
  }, [], arr);
});

$.filterFromLeft = curry(function(p, arr) {
  return $.foldFromLeft($.iif($.comp(p, $.arg1), $.concat, $.id), [], arr);
});

$.findFromLeft = curry(function(p, arr) {
  var len = arr.length;

  if (len == 0) {
    return undefined;
  }
  else if (p(arr[0])) {
    return arr[0];
  }
  else {
    return $.findFromLeft(p, arr.slice(1, len));
  }
});
