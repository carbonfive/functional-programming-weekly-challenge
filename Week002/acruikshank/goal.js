// Syntactic sugar for strings starting with 'Go*'
function G(s) {
  return (function o(p) {   // inner function curries prefix
    return function(s) {    // external function taking optional arg
      return s===undefined  // test arg
        ? o(p + 'o')        // generate function with longer prefix
        : p + s;            // return prefix plus string
  }})('G')( s )             // gen inner funct with 'G' prefix, call it with 1st arg
}

expect( G('') ).to.be( 'G' );
expect( G('al') ).to.be( 'Gal' );
expect( G()('al') ).to.be( 'Goal' );
expect( G()()()()()('al') ).to.be( 'Goooooal' );
expect( G()()('') ).to.be( 'Goo' );
expect( G()()('nies') ).to.be( 'Goonies' );

function expect(act) {
  return {to:{be:function(exp) {
    if (exp === act) console.log("PASS")
    else console.log("FAIL: Expected '"+act+"' to be '"+exp+"'");
  }}}
}
