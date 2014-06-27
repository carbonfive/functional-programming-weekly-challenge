# Week 1: Simple Regular Expression Parser:

Write a 'match' function that takes an input string, a match string, and an integer count. The function
must return true only if the input string contains the match string exactly count times. For example,
if implemented in JavaScript, the function would behave such that:

```javascript
match('abcabc', 'abc', 1) == false
match('abcabc', 'abc', 2) == true
match('Hello Jello', 'ello', 2) == true
match('Hello Jello', 'ello', 3) == false
match('Ratatattat', 'at', 3) == false
match('Ratatattat', 'at', 4) == true
match('oooo', 'ooo', 2) == false
```
