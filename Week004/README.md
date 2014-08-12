# CHALLENGE #4: PERSISTENT DATA STRUCTURES

## Relevant Links

1. An overview of binary search trees (and their balanced variant): http://java.dzone.com/articles/algorithm-week-balancing

1. Visualizing insert into a binary search tree: https://www.cs.usfca.edu/~galles/visualization/BST.html

1. A more extensive overview of the binary search tree: http://pages.cs.wisc.edu/~vernon/cs367/notes/9.BST.html#intro

## Homework

1. Implement a function `insertBST` that, given a binary search tree and a new value, returns a new binary search tree containing the values of the original binary search tree plus the new value. You may choose to represent the binary search tree however you like (create your own class, use JSON... whatever); I've chosen to represent a node in the tree as a three-item array (`[leftTree, key, rightTree]`) and leaves as `null`.

   ```javascript
   var origTree = [[null, "a", null], "b", [null, "q", null]];
   var newTree = insertBST(origTree, "c"); // [[null, "a", null], "b", [[null, "c", null], "q", null]]
   ```

2. Implement a function `createBST` that reduces a list of strings to a binary search tree using your `insertBST` function.

  ```javascript
  createBST(["f", "e", "a"])           // [[[null, "a", null], "e", null], "f", null]
  createBST(["f", "e", "t", "z", "s"]) // [[null, "e", null], "f", [[null, "s", null], "t", [null, "z", null]]]
  ```

3.  Implement a function `inBST` that, given a number and a binary search tree, returns true if there exists a node in the tree whose value matches that number.

  ```javascript
  var someTree = [[[null, "a", null], "e", null], "s", null];
  inBST("s", someTree); // true
  ```

4. Some languages provide limited (or no) support for non-mutative manipulation of key/value data structures (Object in JavaScript, Hash in Ruby - to name a few). For example, insertion of a key/value pair into a JavaScript object is a destructive operation:

  ```javascript
  var o = {};
  var key = "name";
  var value = "erin";
  
  o[key] = value; // mutating the value o
  ```
  
  Fortunately for us functional programmers, a binary search tree can be used as a near drop-in replacement for object.
  
  Modify your binary search tree such that each node contains a key AND a value. Can you implement get/insert/update/delete functions that work with this new binary search tree?
  
  ```javascript
    var kvTree = [
      [
        null, 
        { key: "beta", value: 75 }, 
        null
      ], 
      { key: "kappa", value: 150 }, 
      null
    ];
    
    getBST("alpha", someTree); // undefined
    getBST("beta", someTree);  // 75
    
    var newKvTree = insertBST("alpha", 150, someTree);
    
    /*
    
    newKvTree: 
    
    [
      [
        [
          null, 
          { key: "alpha", value: 150 }, 
          null
        ], 
        { key: "beta", value: 75 }, 
        null
      ], 
      { key: "kappa", value: 150 }, 
      null
    ];
    */
    
  ```

5. When searching for an element, how many elements do you have to check on average? Can you come up with a pathological input that leads to an inefficient binary search tree?

## BONUS 1: MAPPING OVER BINARY SEARCH TREE

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

## BONUS 2: BALANCED BINARY SEARCH TREES

1.  Can you modify your solutions to return balanced binary search trees?
