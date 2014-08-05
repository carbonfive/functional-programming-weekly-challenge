# CHALLENGE #3: HIGHER-ORDER FUNCTIONS

1. Implement a function "foldFromLeft" which takes:
  - a function with two parameters (a "binary function")
  - a starting value (the accumulator)
  - a list of values to reduce into a single value

  The behavior of your foldFromLeft function will be identical to "reduce" in JavaScript and Ruby.

  ```javascript
  foldFromLeft(function(memo, item) {
    return memo.concat([item]);
  }, [], [5, 4, 25]); // [5, 4, 25]
  ```
  
2.  Implement a function "foldFromRight" It should behave like foldFromLeft - except it will start at the end of the list and move towards the beginning (instead of from the beginning to the end). Can you implement it using foldFromLeft? If not, that's fine - implement it from scratch.

  ```javascript
  foldFromRight(function(item, memo) {
    return memo.concat([item]);
  }, [], [5, 4, 25]); // [25, 4, 5]
  ```

3.  Implement a function "mapListFromLeft" using your "foldFromLeft" function.

  ```javascript
  mapListFromLeft(function(item) {
    return item * 2;
  }, [10, 20, 30]); // [20, 40, 60]
  ```

4.  Implement a function "filterListFromLeft" using your "foldFromLeft" function.

  ```javascript
  filterListFromLeft(function(item) {
    return item == 2;
  }, [1, 2, 3, 2]); // [2, 2]
  ```

5.  Implement a function "findInList" that, given a list and a (unary function) predicate returns the first item in the list that satisfies the predicate. The function should return your language's void value (e.g. undefined, nil, Nothing) if no item in the list satisfies the predicate.

  ```javascript
  findInList(function(item) {
    return item == 2;
  }, [1, 2, 3, 2]); // 2
  ```

## BONUS
Given the attached file (some huge text file, say, [the text from Moby Dick](http://www.gutenberg.org/files/2701/old/moby10b.txt), write a program that returns the top three pairings (in terms of frequency) of words that appear in a sentence together. In the event that pairs are tied in their rank, pick a tiebreaker of your choosing and explain its implementation. Ignore capitalization. A function that returns the "pairs" of words in a sentence might behave like this:

```javascript
pairs("Hello, my friends!"); // hello+my hello+friends my+friends
```

## TERMS

- Unary Function (one parameter): `function addOne(x) { return x + 1;}`
- Binary Function (two parameters): `function add(x, y) { return x + y; }`
- Predicate (returns a boolean): `function(n) { return n > 3; }`
