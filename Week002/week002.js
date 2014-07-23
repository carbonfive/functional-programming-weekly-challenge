window.g = function(sentinel) {
  function evaluate(accumulator) {
    return function(sentinel){
      if (sentinel) {
        return finish(accumulator, sentinel);
      } else {
        return keepOing(accumulator);
      }
    };
  }

  function keepOing(accumulator){
    return evaluate(accumulator + 'o');
  }

  function finish(accumulator, suffix){
    return 'g' + accumulator + suffix;
  }

  if(sentinel){
    return finish('', sentinel);
  } else {
    return evaluate('o');
  }
};
