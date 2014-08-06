λ = require('./solution.js');

function pairs(arr) {
  var rest = Array.prototype.slice.call(arr, 1);

  if (arr.length < 2) {
    return [];
  }
  else {
    var orig = λ.concat(λ.foldFromLeft(function(acc, item) {
      var key = λ.sort([arr[0], item]).join('+');
      return λ.concat(acc, key);
    }, [], rest), pairs(rest));

    return λ.comp(λ.sort, λ.uniq)(orig);
  }
}

var freqs = λ.foldFromLeft(function(acc, item) {
  acc[item] = acc[item] ? acc[item] + 1 : 1
  return acc;
}, {});

module.exports = {
  pairs: pairs,
  freqs: freqs
};
