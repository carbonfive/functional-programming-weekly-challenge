var λ = {};

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
          return fx.apply(null, λ.concat(args1, args2));
        }
        else {
          return accumulator.apply(null, λ.concat(λ.concat(λ.concat([], fx), args1), args2))
        }
      }
    }
    else {
      return fx.apply(null, args1);
    }
  };
}

λ.gt = curry(function(x, y) {
  return x > y;
});

λ.lt = curry(function(x, y) {
  return x < y;
});

λ.div = curry(function(n, d) {
  return (n / d);
});

λ.sum = curry(function(x, y) {
  return (x + y);
});

λ.mul = curry(function(x, y) {
  return (x * y);
});

λ.mod = curry(function(x, y) {
  return x % y;
});

λ.id = function(x) {
  return x;
};

λ.eq = curry(function(x, y) {
  return x === y;
});

λ.concat = curry(function(arr, value) {
  return arr.concat(value);
});

λ.comp = curry(function(f, g) {
  return function() {
    return f.call(null, g.apply(null, Array.prototype.slice.call(arguments, 0)));
  };
});

λ.arg0 = function() {
  return λ.id.apply(null, Array.prototype.slice.call(arguments, 0, 1));
};

λ.arg1 = function() {
  return λ.id.apply(null, Array.prototype.slice.call(arguments, 1, 2));
};

λ.flip = function(f) {
  return curry(function(x, y) {
    return f.apply(null, [y, x]);
  });
};

λ.iif = curry(function(expr, f1, f2) {
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
λ.foldFromRight = curry(function(f, acc, arr) {
  var lastIdx = arr.length - 1;

  if (lastIdx === -1) {
    return acc;
  }
  else {
    return λ.foldFromRight(f, f(arr[lastIdx], acc), arr.slice(0, lastIdx));
  }
});

λ.foldFromLeft = curry(function(f, acc, arr) {
  if (arr[0] == undefined) {
    return acc;
  }
  else {
    return λ.foldFromLeft(f, f(acc, arr[0]), arr.slice(1, arr.length));
  }
});

λ.mapFromLeft = curry(function(f, arr) {
  return λ.foldFromLeft(function(acc, item) {
    return λ.concat(acc, f(item));
  }, [], arr);
});

λ.filterFromLeft = curry(function(p, arr) {
  return λ.foldFromLeft(λ.iif(λ.comp(p, λ.arg1), λ.concat, λ.id), [], arr);
});

λ.findFromLeft = curry(function(p, arr) {
  var len = arr.length;

  if (len == 0) {
    return undefined;
  }
  else if (p(arr[0])) {
    return arr[0];
  }
  else {
    return λ.findFromLeft(p, arr.slice(1, len));
  }
});
