window.g = function(sentinel) {
  value = 'g';

  function evaluate(sentinel) {
    if (sentinel) {
      return finish(sentinel);
    } else {
      return keepOing();
    }
  }

  function keepOing(){
    value += 'o';
    return evaluate;
  }

  function finish(suffix){
    return value + suffix;
  }

  return evaluate(sentinel);
};
