# CHALLENGE #4: BINARY TREES

1. Implement a function `makeBBST` that, given a list of integers, uses reduce or fold to build a binary search tree. You may choose to represent the binary search tree however you like (create your own class, use JSON... whatever) --- but be sure not to CHANGE a tree after you have created one. Insertion should be modeled as creating a new tree (with a node added) from the old tree.

  ```javascript
  makeBBST([1,2,3,5,4,6]) // something like: ((null, 1, null) 2 null) 3 ((null, 4, null) 5 (null 6 null))
  ```

  ```javascript
  makeBBST([1,2,3,4,5,6,7]) // something like: (((null, 1, null) 2 (null, 3, null)) 4 ((null, 5, null) 6 (null, 7, null)))
  ```

2.  Implement a function "existsInBBST" that, given a predicate and a balanced binary search tree, returns true if there is a value in the tree that satisfies the predicate. If no value that fulfills the predicate is found, false should be returned.


  ```haskell
  someTree = (((null, 1, null) 2 (null, 3, null)) 4 ((null, 5, null) 6 (null, 7, null)))
  ```

  ```javascript
  existsInBBST(function(value) {
    return value == 7;
  }, someTree); // true
  ```

3. When searching for an element, how many elements do you have to check on average? Can you come up with a pathological input that leads to an inefficient binary search tree?


## BONUS: MAP OVER BINARY TREES

1.  Can you implement a function "mapBBST" that, given a unary function and a balanced binary search tree produces a new balanced binary search tree from applying your unary function to each node in the original tree?
2.  Modify your `makeBBST` to ensure that the tree you build is balanced.


### GLOSSARY, BY EXAMPLE

#### Unary Function (one parameter)

```javascript
function addOne(x) {
  return x + 1;
}
```

#### Binary Function (two parameters)

```javascript
function add(x, y) {
  return x + y;
}
```

#### Predicate

```javascript
pred = function(n) { return n > 3; }
[1,2,3,4,5].filter(pred); // [4, 5]
```
