# Functional Programming Weekly Challenge

## What is Functional Programming?

From [Wikipedia][wikipedia-functional-programming]:

> In computer science, functional programming is a programming paradigm, a style of building the structure and elements of computer programs, that treats computation as the evaluation of mathematical functions and avoids state and mutable data.

Hrm, that probably doesn't help much. Check out some of these additional lectures / videos / stuff that helps to disambiguate the term:

1. [Pete Kocks, "What is functional programming?"][what-is-functional] - 3 minutes long, basic overview
1. [Martin Odersky, "Programming Paradigms"][paradigms]

## Why Functional Programming?

Now that you have some vague idea as to what functional programming is - you want to know what it's good for... right?

1. [Rich Hickey, "Simple Made Easy"][simple-made-easy] - thesis: imperative programs are too complex
1. [Martin Odersky, "Working Hard to Keep It Simple"][working-hard] - thesis: functional programs are better-adapted for modern hardware
1. [Erik Meijer, "Fundamentalist Functional Programming"][fundamentalists] - thesis: tie-dyed shirts are where it's at

## General Rules

1. Use whatever language you like
2. Once you've set the value of a variable, don't change it (even if your language allows you to)

### Tip: Avoid The Noid (and State-Mutation)

```ruby

# bad
x = [1,2,3]
x << 

# good
x = [1,2,3]
y = x + 4

# bad
x = 10
x += 1

# good
x = 10
y = x + 1

# bad
x = [1,2,3]
ys = []
append_num_plus_one = lambda { |n| ys << (n + 1) } # mutates ys (accessible via closure) as a 'side-effect'
x.each(&append_num_plus_one)

# good
x = [1,2,3]
add_one = lambda { |n| n + 1 } # a 'pure' function; accepts a value, returns a value
y = x.map(&add_one)
```

## Topics You Might Care About

### First-class Functions

Functions as values that can be passed around like integers / strings / whatever:

```ruby

add_one = lambda { |n| n + 1 }
[1,2,3].map(&add_one)

```

### Higher-order Functions

Functions that do one or more of the following:

1. Accept functions as arguments
2. Return functions

```javascript

// ex 1: accepts addOne function as argument

var x = [1,2,3]
x.map(function addOne(n) {
  return n + 1;
}); // [2,3,4]

// ex2: returns a function, then passed to map

var addN = function(n) {
  return function(m) {
    return m + n;
  };
};

var x = [1,2,3];
x.map(addN(5)); // [6,7,8]

```

## How to Join the Fun

1. [Fork][fork] this repo!
1. Clone your fork:
  ```sh
  % git clone git@github.com:username/functional-programming-weekly-challenge.git
  % cd functional-programming-weekly-challenge
  ```

1. Set this repo as the upstream:
  ```sh
  % git remote add upstream git@github.com:carbonfive/functional-programming-weekly-challenge.git
  ```

1. Under the folder for a given week, create a folder for your solution files. Name it after your Github username.
1. Commit and push the changes to your fork.
1. [Create a pull request][pr] back to this repo to show off your
   answers!
1. Pull in future challenges:

  ```sh
  % git fetch upstream
  % git merge upstream/master
  ```


Each week we will add a new folder containing a README.md presenting a challenge. For example, [here][week-001] is the first week's challenge!

  [fork]: https://github.com/carbonfive/functional-programming-weekly-challenge/fork
  [pr]: https://help.github.com/articles/using-pull-requests
  [week-001]: https://github.com/carbonfive/functional-programming-weekly-challenge/tree/master/Week001
  [paradigms]: https://www.youtube.com/watch?v=DN6YqrI8aLk&list=PLO9y7hOkmmSEAtkvo_lQdIK8SfhO6x78Q#t=491
  [fundamentalists]: https://www.youtube.com/watch?v=UuamC0T3hv8
  [wikipedia-functional-programming]: http://en.wikipedia.org/wiki/Functional_programming
  [what-is-functional]: https://www.youtube.com/watch?v=TNYKNJlKY-c
  [working-hard]: https://www.youtube.com/watch?v=3jg1AheF4n0
  [simple-made-easy]: http://www.infoq.com/presentations/Simple-Made-Easy
