# Hoisting in JavaScript

## Table of Contents
1. [Theory](#theory)
2. [Deep Dive](#deep-dive)
3. [Variable Hoisting](#variable-hoisting)
4. [Function Hoisting](#function-hoisting)
5. [Conflicts & Priority](#conflicts--priority)
6. [Temporal Dead Zone](#temporal-dead-zone)
7. [Interview Questions](#interview-questions)
8. [Common Mistakes](#common-mistakes)

---

## Theory

### What is Hoisting?

Hoisting is JavaScript's default behavior of moving declarations to the top of their scope during the **compilation phase**, before code execution.

**Important**: Only declarations are hoisted, NOT initializations.

### Execution Context

JavaScript code execution happens in two phases:
1. **Memory Creation Phase (Compilation)**: Variables and functions are stored in memory
2. **Code Execution Phase**: Code runs line by line

---

## Deep Dive

### What Gets Hoisted?

| Type | Hoisted? | Initial Value | Accessible Before Declaration? |
|------|----------|---------------|-------------------------------|
| `var` | ✅ Yes | `undefined` | Yes |
| `let` | ✅ Yes | Uninitialized (TDZ) | No (ReferenceError) |
| `const` | ✅ Yes | Uninitialized (TDZ) | No (ReferenceError) |
| Function Declaration | ✅ Yes | Function itself | Yes |
| Function Expression | ⚠️ Variable hoisted | `undefined` | No (TypeError) |
| Arrow Function | ⚠️ Variable hoisted | `undefined` | No (TypeError) |
| Class Declaration | ✅ Yes | Uninitialized (TDZ) | No (ReferenceError) |

---

## Variable Hoisting

### `var` Hoisting

```javascript
console.log(x); // undefined (not ReferenceError!)
var x = 5;
console.log(x); // 5

// Behind the scenes, this is what happens:
var x;           // Declaration hoisted
console.log(x); // undefined
x = 5;          // Assignment stays in place
console.log(x); // 5
```

### `let` Hoisting

```javascript
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// Behind the scenes:
// let y; (hoisted but in Temporal Dead Zone)
// console.log(y); // TDZ - ReferenceError
// y = 10;
```

### `const` Hoisting

```javascript
console.log(z); // ReferenceError: Cannot access 'z' before initialization
const z = 15;

// const must be initialized at declaration
const a; // SyntaxError: Missing initializer
```

### Multiple Declarations

```javascript
// var - allows re-declaration
var num = 1;
var num = 2; // No error
console.log(num); // 2

// let/const - no re-declaration
let count = 1;
let count = 2; // SyntaxError: Identifier 'count' has already been declared

const max = 100;
const max = 200; // SyntaxError
```

---

## Function Hoisting

### Function Declaration

```javascript
// Can call before declaration
greet(); // "Hello!"

function greet() {
  console.log("Hello!");
}

// Behind the scenes - entire function is hoisted:
function greet() {
  console.log("Hello!");
}
greet(); // "Hello!"
```

### Function Expression

```javascript
sayHi(); // TypeError: sayHi is not a function

var sayHi = function() {
  console.log("Hi!");
};

// Behind the scenes:
var sayHi;          // Declaration hoisted, initialized as undefined
sayHi();           // TypeError (trying to call undefined)
sayHi = function() {
  console.log("Hi!");
};
```

### Arrow Function

```javascript
hello(); // TypeError: hello is not a function

const hello = () => {
  console.log("Hello!");
};

// Behind the scenes:
const hello;       // Hoisted but in TDZ
hello();          // ReferenceError (accessing before initialization)
hello = () => {
  console.log("Hello!");
};
```

---

## Conflicts & Priority

### ⭐ IMPORTANT: When Function and Variable Have Same Name

**Rule**: Function declarations take priority over variable declarations during hoisting!

```javascript
console.log(foo); // [Function: foo]

var foo = "I'm a variable";

function foo() {
  return "I'm a function";
}

console.log(foo); // "I'm a variable"

// Behind the scenes:
function foo() {    // Function declaration hoisted FIRST
  return "I'm a function";
}
var foo;           // Variable declaration hoisted, but ignored (function already exists)
console.log(foo);  // [Function: foo]
foo = "I'm a variable"; // Assignment happens
console.log(foo);  // "I'm a variable"
```

### Multiple Function Declarations

```javascript
foo(); // "Third"

function foo() {
  console.log("First");
}

function foo() {
  console.log("Second");
}

function foo() {
  console.log("Third");
}

// Last declaration wins!
```

### Function vs Variable - Different Scenarios

**Scenario 1: Variable initialized before function**
```javascript
var x = 10;

function x() {
  return 20;
}

console.log(x); // 10 (variable assignment overwrites)
console.log(typeof x); // "number"
```

**Scenario 2: Variable initialized after function**
```javascript
console.log(typeof y); // "function"

var y = 10;

function y() {
  return 20;
}

console.log(typeof y); // "number"
console.log(y); // 10
```

**Scenario 3: Function expression vs declaration**
```javascript
console.log(typeof a); // "undefined"

var a = function() {
  return "expression";
};

function a() {
  return "declaration";
}

console.log(typeof a); // "function"
console.log(a()); // "expression"

// Behind the scenes:
function a() {           // Function declaration hoisted
  return "declaration";
}
var a;                   // Variable declaration ignored
console.log(typeof a);   // "function"
a = function() {         // Assignment overwrites
  return "expression";
};
console.log(a());        // "expression"
```

---

## Temporal Dead Zone

### What is TDZ?

The **Temporal Dead Zone** is the time between entering scope and variable initialization where the variable cannot be accessed.

```javascript
console.log(typeof x); // undefined (x doesn't exist)

{
  // TDZ starts
  console.log(typeof y); // ReferenceError (y exists but in TDZ)
  
  let y = 10; // TDZ ends
  console.log(y); // 10
}
```

### TDZ Duration

```javascript
{
  // TDZ for 'a' starts
  const func = () => console.log(a); // Defined but not executed
  
  // Still in TDZ
  // let a = 10;
  
  func(); // ReferenceError if called here
  
  let a = 10; // TDZ ends
  func(); // 10 - now works
}
```

### TDZ with Function Parameters

```javascript
function example(a = b, b = 2) {
  return [a, b];
}

example(); // ReferenceError: Cannot access 'b' before initialization

// But this works:
function example2(a = 2, b = a) {
  return [a, b];
}

example2(); // [2, 2]
```

---

## Interview Questions

### Q1: Predict the Output

```javascript
var x = 1;

function test() {
  console.log(x);
  var x = 2;
  console.log(x);
}

test();
```

**Answer:**
```
undefined
2
```

**Explanation:**
```javascript
function test() {
  var x;           // Hoisted
  console.log(x);  // undefined
  x = 2;
  console.log(x);  // 2
}
```

---

### Q2: Predict the Output

```javascript
console.log(foo());
console.log(bar());

var foo = function() {
  return "foo";
};

function bar() {
  return "bar";
}
```

**Answer:**
```
TypeError: foo is not a function
"bar"
```

---

### Q3: What happens here?

```javascript
var a = 1;

function a() {
  return 2;
}

console.log(a);
console.log(typeof a);
```

**Answer:**
```
1
"number"
```

**Explanation:**
```javascript
function a() {      // Function hoisted first
  return 2;
}
var a;             // Variable declaration ignored
a = 1;            // Assignment happens
console.log(a);   // 1
```

---

### Q4: TDZ Question

```javascript
let x = 10;

function test() {
  console.log(x);
  let x = 20;
}

test();
```

**Answer:**
```
ReferenceError: Cannot access 'x' before initialization
```

**Explanation:** `let x` is hoisted in function scope but in TDZ.

---

### Q5: Complex Scenario

```javascript
console.log(foo);

var foo = "variable";

function foo() {
  return "function";
}

var foo = "another variable";

console.log(foo);
```

**Answer:**
```
[Function: foo]
"another variable"
```

---

### Q6: Class Hoisting

```javascript
const instance = new MyClass(); // ?

class MyClass {
  constructor() {
    this.name = "Class";
  }
}
```

**Answer:**
```
ReferenceError: Cannot access 'MyClass' before initialization
```

---

### Q7: Nested Scope

```javascript
var x = "global";

function outer() {
  console.log(x);
  var x = "local";
  
  function inner() {
    console.log(x);
  }
  
  inner();
}

outer();
```

**Answer:**
```
undefined
"local"
```

---

### Q8: Loop Hoisting

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

**Answer:**
```
3
3
3
```

**Explanation:** `var` is function-scoped, not block-scoped.

---

### Q9: Multiple Functions

```javascript
foo();

function foo() {
  console.log(1);
}

var foo = function() {
  console.log(2);
};

function foo() {
  console.log(3);
}

foo();
```

**Answer:**
```
3
2
```

---

### Q10: Conditional Function Declaration

```javascript
console.log(typeof foo);

if (true) {
  function foo() {
    return "inside if";
  }
}

console.log(typeof foo);
```

**Answer (varies by environment):**
```
undefined (or "function" in some browsers)
"function"
```

**Note:** Avoid conditional function declarations!

---

## Common Mistakes

### Mistake 1: Assuming `let` is not hoisted

```javascript
// Wrong assumption: let is not hoisted
// Correct: let IS hoisted but in TDZ

{
  console.log(x); // ReferenceError (not "undefined")
  let x = 10;
}
```

### Mistake 2: Forgetting function expression hoisting

```javascript
// This works
foo();
function foo() {}

// This doesn't
bar();
var bar = function() {};
```

### Mistake 3: Re-declaring with `let`/`const`

```javascript
let x = 1;
let x = 2; // SyntaxError

// Use different variable names or block scope
{
  let x = 2; // Works - different scope
}
```

### Mistake 4: Accessing before initialization

```javascript
class Dog {
  constructor() {
    this.name = "Buddy";
  }
}

const myDog = new Dog(); // ✅ Correct

// vs

const myDog2 = new Dog2(); // ❌ ReferenceError
class Dog2 {
  constructor() {
    this.name = "Max";
  }
}
```

---

## Summary

### Key Points:

1. **`var`**: Hoisted with `undefined` value
2. **`let`/`const`**: Hoisted but in TDZ (uninitialized)
3. **Function declarations**: Fully hoisted (including body)
4. **Function expressions**: Variable hoisted, not function body
5. **Priority**: Function declarations > Variable declarations
6. **Same name**: Last function declaration wins
7. **TDZ**: Time between entering scope and initialization
8. **Classes**: Hoisted but in TDZ

### Best Practices:

✅ Declare variables at the top of scope  
✅ Use `const` by default, `let` when needed  
✅ Avoid `var`  
✅ Use function declarations for hoisting benefits  
✅ Don't rely on hoisting - write clear code  
✅ Avoid conditional function declarations  

---

## Additional Examples

### Example 1: Hoisting in Strict Mode

```javascript
"use strict";

x = 10; // ReferenceError: x is not defined
console.log(x);
```

### Example 2: Nested Functions

```javascript
function outer() {
  inner(); // Works
  
  function inner() {
    console.log("Inner function");
  }
}

outer();
```

### Example 3: Block Scope

```javascript
{
  var x = 1; // Function-scoped
  let y = 2; // Block-scoped
}

console.log(x); // 1
console.log(y); // ReferenceError
```

### Example 4: Window Object

```javascript
var globalVar = "global";
let blockVar = "block";

console.log(window.globalVar); // "global"
console.log(window.blockVar);  // undefined
```

---

**Practice Questions:**

1. What will `console.log(a)` print if `var a = 10` comes after it?
2. Can you call a function expression before its declaration?
3. What happens when a function and variable have the same name?
4. Explain TDZ with an example
5. Why does `let` in a loop work differently than `var`?
6. What's the difference between hoisting a function declaration vs expression?
7. Can you access a class before its declaration?
8. What happens in strict mode when using undeclared variables?
9. How does hoisting work in nested functions?
10. What's the output of hoisting same-named function declarations?

---

**Remember:** Understanding hoisting is crucial for debugging and writing predictable JavaScript code!
