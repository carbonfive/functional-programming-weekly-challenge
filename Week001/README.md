# Week 1: Simple Regular Expression Parser:

Write a 'match' function that takes an input string, a match string, and an integer count. The function
must return true only if the input string contains the match string exactly count times, but NOT counting overlapping matches. For example,
if implemented in JavaScript, the function would behave such that:

```javascript
match('abcabc', 'abc', 1) == false
match('abcabc', 'abc', 2) == true
match('Hello Jello', 'ello', 2) == true
match('Hello Jello', 'ello', 3) == false
match('Ratatattat', 'at', 3) == false
match('Ratatattat', 'at', 4) == true
match('oooo', 'ooo', 2) == false // overlapping example
```

## Special Rules

1. No regex. No match, split, contains, etc. that use regex. You may
   use a native function that performs an exact prefix search.
