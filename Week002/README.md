# Week 2: Fútbol announcer goal function:

Write a function that can be called any number of times to
produce an appropriately enthusiastic goal announcement. The
degree of awesomeness will probably vary with the
constraints of the language you choose.

Some examples:

```javascript
console.log(g()()()()()()()('al')); //=> 'goooooooal'
console.log(g()('al'));             //=> 'goal'
console.log(g('al'));               //=> 'gal'
```

```ruby
puts g[][][][]['al'] # Everybody Loves Lambdas
puts g[][]al         # is this possible?
puts g()()()()()al   # or this?
```
