function g(s) {

  function _g(acc) {
    return function(s) {
      if (s) {
        return 'g' + acc + s;
      }
      else {
        return _g(acc + 'o');
      }
    };
  }

  if (s) {
    return 'g' + s; // probably not what you meant to do
  }
  else {
    return _g('o'); // dig a little deeper, Watson
  }
}

console.log(g()('al'));
console.log(g()()()()('al'));

// g()()()()()()('al') == 'gooooooal'
// g()('al') = "goal"
