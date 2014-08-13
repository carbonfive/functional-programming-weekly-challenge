var x = require('./bst.js');

function assertEq(provided, expr2, msg) {
  if (JSON.stringify(provided) !== JSON.stringify(expr2)) {
    throw new Error("*** was not equal: " + msg + "\n" + "provided: " + JSON.stringify(provided) + " and expr2: " + JSON.stringify(expr2) + "\n\n");
  }
  else {
    console.log(">>> pass! " + msg + "\n\n");
  }
}

(function one() {
  var treeA = null,
      treeB = x.insert("alpha", 5, treeA),
      treeC = x.insert("zeta", 5, treeB),
      treeD = x.insert("beta", 5, treeC);

  assertEq(treeB, [null, "alpha", 5, null], "insert into an empty tree");
  assertEq(treeC, [null, "alpha", 5, [null, "zeta", 5, null]], "insert into a single node tree");
  assertEq(treeD, [null, "alpha", 5, [[null, "beta", 5, null], "zeta", 5, null]], "insert into a single node tree");
}());

(function two() {
  var pairs = [["alpha", 5], ["zeta", 5], ["beta", 5]],
      treeA = x.create(pairs);

  assertEq(treeA, [null, "alpha", 5, [[null, "beta", 5, null], "zeta", 5, null]], "create a tree from an array of pairs");
}());

(function three() {
  var treeA = [null, "alpha", 5, [[null, "beta", 5, null], "zeta", 5, null]];

  assertEq(x.includes("alpha", treeA), true, "tree does contain key");
  assertEq(x.includes("beta", treeA), true, "tree does contain key");
  assertEq(x.includes("smurf", treeA), false, "tree does not contain key");
}());

(function four_delete() {
  var treeA = [null, "alpha", 5, [[null, "beta", 5, null], "kappa", 5, [null, "zeta", 5, null]]],
      treeB = [null, "alpha", 5, [null, "kappa", 5, [null, "zeta", 5, null]]],
      treeC = [null, "alpha", 5, [null, "beta", 5, [null, "zeta", 5, null]]],
      treeD = [null, "alpha", 5, [null, "zeta", 5, null]],
      treeE = [[null, "alpha", 5, null], "beta", 5, null];

  assertEq(x.delete("flarp", null), null, "delete from an empty tree returns an empty tree");
  assertEq(x.delete("beta", treeA), treeB, "remove a node with no children");
  assertEq(x.delete("alpha", treeD), [null, "zeta", 5, null], "remove a node with only a right childj");
  assertEq(x.delete("beta", treeE), [null, "alpha", 5, null], "remove a node with only a left childj");
  assertEq(x.delete("kappa", treeA), treeC, "remove a node with two children");
}());

(function four_update() {
  var treeA = [null, "alpha", 5, [null, "zeta", 5, null]];

  function dubble(x) {
    return x * 2;
  }

  function nuke(x) {
    return undefined;
  }

  assertEq(x.update(dubble, "zeta", treeA), [null, "alpha", 5, [null, "zeta", 10, null]], "apply fx to value at key");
  assertEq(x.update(dubble, "derp", treeA), treeA, "no-op on missing key");
  assertEq(x.update(nuke, "zeta", treeA), [null, "alpha", 5, null], "if fx returns undefined, delete key");
}());
