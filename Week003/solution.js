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
          return accumulator.apply(null, [fx].concat(args1).concat(args2));
        }
      }
    }
    else {
      return fx.apply(null, args1);
    }
  };
}

function arginator(offset) {
  return function() {
    return λ.id.apply(null, Array.prototype.slice.call(arguments, offset, offset+1));
  }
}

λ.arg0 = arginator(0);
λ.arg1 = arginator(1);
λ.arg2 = arginator(2);

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

// TODO: make this function variadic
λ.concat = curry(function(arr, value) {
  return arr.concat(value);
});

λ.comp = curry(function(f, g) {
  return function() {
    return f.call(null, g.apply(null, Array.prototype.slice.call(arguments, 0)));
  };
});

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

// TODO: can we do this w/out indexing into the last item in the array?
// TODO: can we use iif for this?
λ.foldFromRight = curry(function(f, acc, arr) {
  var lastIdx = arr.length - 1;

  if (lastIdx === -1) {
    return acc;
  }
  else {
    return λ.foldFromRight(f, f(arr[lastIdx], acc), arr.slice(0, lastIdx));
  }
});

// TODO: can we use iif for this?
λ.foldFromLeft = curry(function(f, acc, arr) {
  if (arr[0] == undefined) {
    return acc;
  }
  else {
    return λ.foldFromLeft(f, f(acc, arr[0]), arr.slice(1, arr.length));
  }
});

// TODO: can we eliminate the inner return?
λ.mapFromLeft = curry(function(f, arr) {
  return λ.foldFromLeft(function(acc, item) {
    return λ.comp(λ.concat(acc), f)(item);
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

λ.uniq = function(arr) {
  return λ.foldFromLeft(λ.iif(λ.comp(λ.eq(-1), λ.idx), λ.concat, λ.id), [], arr);
};

λ.idx = curry(function(arr, val) {
  return arr.indexOf(val);
});

// TODO: can we use iif for this?
λ.partition = curry(function(p, arr) {
  return λ.foldFromLeft(function(acc, item) {
    if (p(item)) {
      return [λ.concat(acc[0], item), acc[1]]
    }
    else {
      return [acc[0], λ.concat(acc[1], item)]
    }
  }, [[], []], arr);
});

λ.sort = function(arr) {
  if (arr.length < 2) {
    return arr;
  }
  else {
    var head  = arr[0],
        parts = λ.partition(λ.flip(λ.lt)(head), Array.prototype.slice.call(arr, 1)),
        left  = parts[0],
        right = parts[1];

    return λ.sort(left).concat(head).concat(λ.sort(right));
  }
};

module.exports = λ
