# CHALLENGE #4: PERSISTENT DATA STRUCTURES

## Persistent Data Structures

Some languages provide limited (or no) support for non-mutative manipulation of the built-in key/value data structures (Object in JavaScript, Hash in Ruby - to name a few). For example:

```javascript
var o = {};
var key = "name";
var value = "erin";
 
o[key] = value; // mutating the value o
```
  
As functional programmers, we want to avoid state-mutation whenever possible... but we also need keyed data structures (like a hashmap or lookup table) for everyday programming. So what are we to do?

In this assignment we'll be building a _persistent data structure_ - a binary search tree - to use as a replacement for our language's built-in keyed data structure. Ultimately, we'd like something that allows us to do something like:

```javascript

var m1 = bst.create([["name", "erin"]]);
var m2 = bst.insert("age", 32, m1);
var m3 = bst.update("age", 33, m2);

console.log(mylib.values(m1)); // "name"
console.log(mylib.values(m2)); // "erin" 32
console.log(mylib.values(m3)); // "erin" 33

```
  
### What is a persistent data structure?

From Wikipedia:

> [A] persistent data structure is a data structure that always preserves the previous version of itself when it is modified. Such data structures are effectively immutable, as their operations do not (visibly) update the structure in-place, but instead always yield a new updated structure.

### What is a binary search tree?

A binary search tree is a node-based binary tree data structure where each node has a comparable key (and associated value) and satisfies the following restrictions:

1. The left subtree of a node contains only nodes with keys less than the node's key.

1. The right subtree of a node contains only nodes with keys greater than the node's key.

1. The left and right subtree each must also be a binary search tree.

1. Each node can have up to two successor nodes.

1. There must be no duplicate nodes.

1. A unique path exists from the root to every other node.

Some examples:

```javascript

// not a BST (B > A)
//
//     A
//    / \
//   B   C
		 
// a BST!
//
//      10
//     /
//    5
//   /
// -3

// not a BST (all nodes in left subtree must be less than all nodes in right subtree
//
//          15
//        /    \
//       5      22
//        \    /
//        20  15

```

## Homework

1. Implement a function `insert` that, given a binary search tree and a new value, returns a new binary search tree containing the values of the original binary search tree plus the new value. You may choose to represent the binary search tree however you like (create your own class, use JSON... whatever); I've chosen to represent a node in the tree as a four-key object (`{ l: leftTree, k: key, v: value, r: rightTree }`) and leaves as `null`.

  ```javascript
  var origTree = { l: { l: null, k: "a", v: 1, r: null}, k: "b", v: 2, r: { l: null, k: "q", v: 17, r: null } }
  
  var newTree = bst.insert(origTree, "c"); 
   
  // newTree:
  //
  //     b,2
  //    /   \
  //  a,1  q,17
  //       /   
  //     c,3  
  ```

2. Implement a function `create` that reduces an array (or list or whatever) of key/value pairs to a binary search tree using your `insert` function.

  ```javascript
  var t1 = bst.create([["f", 6], ["e", 5], ["a", 1]])           
  // t1:
  //
  //            f,6
  //           / 
  //          e,5
  //         /
  //        a,1
  
  var t2 = bst.create([["f", 6], ["e", 5], ["t", 20], ["z", 26], ["s", 19]]) 
  // t2:
  //
  //            f,6
  //           /   \
  //          e,5  t,20
  //              /   \
  //            s,19  z,26
  ```

3.  Implement a function `get` that, given a key and a binary search tree, returns the node's value if there exists a node in the tree whose value matches that number.

  ```javascript
  // someTree:
  //
  //            f,6
  //           /   \
  //          e,5  t,20
  //              /   \
  //            s,19  z,26  
  
  bst.get("s", someTree); // 19
  bst.get("y", someTree); // null
  bst.get("e", null);     // null
  ```
  
4.  Implement a function `delete` that, given a key and a binary search tree, returns a new binary search tree with that key removed. Make sure the rules of a binary search tree hold for your new tree. There are a few ways to handle deletion (max of left subtree or min of right-subtree) - be sure to note whichever you pick.

  ```javascript
  // someTree:
  //
  //            f,6
  //           /   \
  //          e,5  t,20
  //              /   \
  //            s,19  z,26  
  
  var t1 = bst.delete("t", someTree);
  
  // t1:
  //
  //            f,6
  //           /   \
  //          e,5  s,19
  //                 \
  //                 z,26  
  
  // t1 (also valid):
  //
  //            f,6
  //           /   \
  //          e,5  z,26
  //              /  
  //             s,19   
  
  var t2 = bst.delete("flarp", someTree);
  
  // t2 (someTree, unchanged):
  //
  //            f,6
  //           /   \
  //          e,5  t,20
  //              /   \
  //            s,19  z,26
  ```

4. When searching for an element, how many elements do you have to check on average? Can you come up with a pathological input that leads to an inefficient binary search tree?

## BONUS 1: BALANCED BINARY SEARCH TREES

If keys are inserted in a sorted order, your tree can become unbalanced. Imagine a tree in the shape of:

```javascript

// tree resulting from inserting key/values 1, 2, 3, 4
//
//   1
//    \
//     2
//      \
//       3
//        \
//         4

```

Searching for a node with key 4 requires traversing all nodes of the tree. That's a bummer. To speed up reads, inserts, deletions and the like, our tree should stay balanced:

```javascript

// balanced tree resulting from inserting key/values 1, 2, 3, 4
//
//      3
//    /   \
//   2     4
//  /
// 1

```

A definition of a balanced binary search tree can be found at Wikipedia:

> [a balanced binary search tree] is any node-based binary search tree that automatically keeps its height (maximal number of levels below the root) small in the face of arbitrary item insertions and deletions.

Can you modify your solutions to return balanced binary search trees?

## BONUS 2: MAPPING OVER BINARY SEARCH TREE

Implement a function "mapBST" that, given a unary function and a binary search tree produces a new binary search tree from applying your unary function to each node in the original tree. The exact ordering nodes in the new tree do not matter - just make sure that the binary search tree rules still hold true in your new tree.

   ```javascript
  var someTree = [[[null, 2, null], 5, null], 15, null];
  
  var newTree = mapBST(function(value) {
    if (value % 2 === 0) return value * 100
    else return value;
  }, someTree);
  
  // [[null, 5, null], 15, [null, 200, null]] <-- valid
  // [[[null, 5, null], 15, null], 200, null] <-- valid
  ```

## USEFUL LINKS

1. An overview of binary search trees (and their balanced variant): http://java.dzone.com/articles/algorithm-week-balancing

1. Visualizing insert into a binary search tree: https://www.cs.usfca.edu/~galles/visualization/BST.html

1. A more extensive overview of the binary search tree: http://pages.cs.wisc.edu/~vernon/cs367/notes/9.BST.html#intro
