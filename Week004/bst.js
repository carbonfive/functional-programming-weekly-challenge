var bst = {};

bst.insert = function(key, value, tree) {
  if (!tree) return [null, key, value, null];

  var l = tree[0], tk = tree[1], tv = tree[2], r = tree[3];

  if (key < tk) return [bst.insert(key, value, l), tk, tv, r];
  if (key > tk) return [l, tk, tv, bst.insert(key, value, r)];

  throw new Error("keys must be unique")
};

bst.create = function(pairs) {
  return pairs.reduce(function(acc, pair) {
    return bst.insert(pair[0], pair[1], acc);
  }, null);
};

bst.get = function(key, tree) {
  if (!tree) return undefined;

  var l = tree[0], tk = tree[1], tv = tree[2], r = tree[3];

  if (key < tk) return bst.get(key, l);
  if (key > tk) return bst.get(key, r);

  return tv;
};

bst.includes = function(key, tree) {
  return !!bst.get(key, tree);
};

bst.delete = function(key, tree) {
  if (!tree) return null;

  var l = tree[0], tk = tree[1], tv = tree[2], r = tree[3];

  if (key < tk) return [bst.delete(key, l), tk, tv, r];
  if (key > tk) return [l, tk, tv, bst.delete(key, r)];

  if (l === null && r === null) return null;
  if (l === null) return r;
  if (r === null) return l;

  var maxL = bst.largest(l);
  return [maxL[0], maxL[1], maxL[2], r];
};

bst.largest = function(tree) {
  if (!tree)            return undefined;
  if (tree[3] === null) return tree;

  return bst.largest(tree[3]);
};

bst.update = function(fx, key, tree) {
  if (!tree) return null;

  var l = tree[0], tk = tree[1], tv = tree[2], r = tree[3];

  if (key < tk) return [bst.update(fx, key, l), tk, tv, r];
  if (key > tk) return [l, tk, tv, bst.update(fx, key, r)];

  var result = fx(tv);

  if (result === undefined) return bst.delete(key, tree);

  return [l, tk, result, r];
};

module.exports = bst;
