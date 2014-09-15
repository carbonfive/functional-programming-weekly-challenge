
function match(string, pattern, count) {
  return !string.length ? count==0 :
    string.slice(0, pattern.length) === pattern ?
      match( string.slice(pattern.length), pattern, count-1 ) :
      match( string.slice(1), pattern, count )
}

function test(value) { console.log( value ? "PASS" : "FAIL" ); }

test( ! match('abcabc', 'abc', 1) );
test( match('abcabc', 'abc', 2) );
test( match('Hello Jello', 'ello', 2) );
test( ! match('Hello Jello', 'ello', 3) );
test( ! match('Ratatattat', 'at', 3) );
test( match('Ratatattat', 'at', 4) );
test( ! match('oooo', 'ooo', 2) );