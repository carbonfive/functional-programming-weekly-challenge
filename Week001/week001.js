function match(s1, p, occ) {

  // internal accumulator
  function _match(s2, acc) {
    if (s2.length < p.length) return acc
    else return _match.apply(null, s2.indexOf(p) == 0
                                   ? [s2.slice(p.length), acc + 1]
                                   : [s2.slice(1), acc])
  }

  // kick off recursion
  return _match(s1, 0) == occ
}

console.log('running tests...')
console.log(match('abcabc', 'abc', 1) == false)
console.log(match('abcabc', 'abc', 2) == true)
console.log(match('Hello Jello', 'ello', 2) == true)
console.log(match('Hello Jello', 'ello', 3) == false)
console.log(match('Ratatattat', 'at', 3) == false)
console.log(match('Ratatattat', 'at', 4) == true)
console.log(match('oooo', 'ooo', 2) == false) // overlapping example
