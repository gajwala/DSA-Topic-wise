# Complete JavaScript Interview Questions & Solutions

> A comprehensive guide covering all JavaScript concepts, theory, polyfills, problems, and solutions for interview preparation.

## Table of Contents

1. [Core JavaScript Concepts](#1-core-javascript-concepts)
2. [Closures & Scope](#2-closures--scope)
3. [Promises & Async Programming](#3-promises--async-programming)
4. [Prototypes & Inheritance](#4-prototypes--inheritance)
5. [Event Loop & Concurrency](#5-event-loop--concurrency)
6. [Array Methods & Iteration](#6-array-methods--iteration)
7. [Object-Oriented Programming](#7-object-oriented-programming)
8. [Polyfills Implementation](#8-polyfills-implementation)
9. [Common Coding Problems](#9-common-coding-problems)
10. [Design Patterns](#10-design-patterns)
11. [Performance & Optimization](#11-performance--optimization)
12. [ES6+ Features](#12-es6-features)
13. [DOM & Browser APIs](#13-dom--browser-apis)
14. [Tricky Questions](#14-tricky-questions)

---

## 1. Core JavaScript Concepts

### Q1.1: What is the difference between `var`, `let`, and `const`?

**Answer:**

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function-scoped | Block-scoped | Block-scoped |
| Hoisting | Yes (initialized as undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-declaration | Yes | No | No |
| Re-assignment | Yes | Yes | No |
| Temporal Dead Zone | No | Yes | Yes |

```javascript
// var - function scoped
function varExample() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 - accessible outside block
}

// let - block scoped
function letExample() {
  if (true) {
    let y = 10;
  }
  console.log(y); // ReferenceError: y is not defined
}

// const - block scoped, cannot reassign
function constExample() {
  const z = 10;
  z = 20; // TypeError: Assignment to constant variable
  
  // But objects can be mutated
  const obj = { a: 1 };
  obj.a = 2; // Valid
  obj.b = 3; // Valid
}

// Temporal Dead Zone
console.log(a); // undefined (hoisted)
var a = 1;

console.log(b); // ReferenceError (TDZ)
let b = 2;
```

---

### Q1.2: Explain `this` keyword in JavaScript

**Answer:**

The value of `this` depends on how a function is called:

```javascript
// 1. Global context
console.log(this); // window (browser) or global (Node.js)

// 2. Object method
const obj = {
  name: 'John',
  greet: function() {
    console.log(this.name); // 'John'
  }
};
obj.greet();

// 3. Regular function
function regularFunc() {
  console.log(this); // window (non-strict) or undefined (strict)
}
regularFunc();

// 4. Arrow function (lexical this)
const obj2 = {
  name: 'Jane',
  greet: function() {
    const arrow = () => {
      console.log(this.name); // 'Jane' - inherits from outer scope
    };
    arrow();
  }
};
obj2.greet();

// 5. Constructor function
function Person(name) {
  this.name = name; // 'this' refers to new instance
}
const person = new Person('Alice');

// 6. call, apply, bind
function sayHi() {
  console.log(this.name);
}
const context = { name: 'Bob' };
sayHi.call(context); // 'Bob'
sayHi.apply(context); // 'Bob'
const boundFunc = sayHi.bind(context);
boundFunc(); // 'Bob'

// 7. Event handler
button.addEventListener('click', function() {
  console.log(this); // button element
});

// 8. Arrow function in event handler
button.addEventListener('click', () => {
  console.log(this); // outer context (not button)
});
```

---

### Q1.3: What is hoisting?

**Answer:**

Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation.

```javascript
// Variable hoisting
console.log(x); // undefined (not ReferenceError)
var x = 5;

// Equivalent to:
var x;
console.log(x);
x = 5;

// Function hoisting
sayHello(); // "Hello!" - works before declaration
function sayHello() {
  console.log("Hello!");
}

// Function expressions are NOT hoisted
sayHi(); // TypeError: sayHi is not a function
var sayHi = function() {
  console.log("Hi!");
};

// let/const hoisting (TDZ)
console.log(y); // ReferenceError
let y = 10;

// Class hoisting (also TDZ)
const instance = new MyClass(); // ReferenceError
class MyClass {}
```

---

### Q1.4: Explain `==` vs `===`

**Answer:**

```javascript
// == (loose equality) - performs type coercion
console.log(5 == "5");        // true
console.log(null == undefined); // true
console.log(0 == false);       // true
console.log("" == false);      // true
console.log([1] == 1);         // true

// === (strict equality) - no type coercion
console.log(5 === "5");        // false
console.log(null === undefined); // false
console.log(0 === false);       // false
console.log("" === false);      // false

// Complex examples
console.log([] == ![]);  // true (confusing!)
// Explanation:
// ![] -> false
// [] == false
// [] -> "" (ToPrimitive)
// "" == false
// 0 == 0
// true

// Best practice: Always use ===
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0)); // false
console.log(+0 === -0); // true
```

---

### Q1.5: What are primitive vs reference types?

**Answer:**

```javascript
// Primitive types (immutable, stored in stack)
// String, Number, Boolean, Undefined, Null, Symbol, BigInt

let a = 10;
let b = a; // copy by value
b = 20;
console.log(a); // 10 (unchanged)

// Reference types (mutable, stored in heap)
// Object, Array, Function

let obj1 = { name: 'John' };
let obj2 = obj1; // copy by reference
obj2.name = 'Jane';
console.log(obj1.name); // 'Jane' (changed!)

// Array example
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4]

// Comparison
let obj3 = { a: 1 };
let obj4 = { a: 1 };
console.log(obj3 === obj4); // false (different references)

let obj5 = obj3;
console.log(obj3 === obj5); // true (same reference)

// Deep clone to avoid reference issues
let original = { a: 1, b: { c: 2 } };

// Shallow clone
let shallow = { ...original };
shallow.b.c = 3;
console.log(original.b.c); // 3 (still connected!)

// Deep clone
let deep = JSON.parse(JSON.stringify(original));
deep.b.c = 4;
console.log(original.b.c); // 3 (independent)

// Better deep clone (handles functions, dates, etc.)
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}
```

---

## 2. Closures & Scope

### Q2.1: What is a closure?

**Answer:**

A closure is a function that has access to variables in its outer (enclosing) function's scope, even after the outer function has returned.

```javascript
// Basic closure
function outer() {
  const outerVar = 'I am from outer';
  
  function inner() {
    console.log(outerVar); // Can access outerVar
  }
  
  return inner;
}

const innerFunc = outer();
innerFunc(); // "I am from outer"

// Practical example: Counter
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1
console.log(counter.count); // undefined (private)

// Common closure mistake
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // Prints 5, 5, 5, 5, 5
  }, 1000);
}

// Solution 1: Use let
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // Prints 0, 1, 2, 3, 4
  }, 1000);
}

// Solution 2: IIFE
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // Prints 0, 1, 2, 3, 4
    }, 1000);
  })(i);
}
```

---

### Q2.2: Explain lexical scoping

**Answer:**

```javascript
// Lexical scoping: Inner functions have access to outer functions' variables

const globalVar = 'global';

function outer() {
  const outerVar = 'outer';
  
  function middle() {
    const middleVar = 'middle';
    
    function inner() {
      const innerVar = 'inner';
      
      // Can access all outer scopes
      console.log(globalVar);  // 'global'
      console.log(outerVar);   // 'outer'
      console.log(middleVar);  // 'middle'
      console.log(innerVar);   // 'inner'
    }
    
    inner();
    // console.log(innerVar); // ReferenceError
  }
  
  middle();
}

outer();

// Scope chain
function a() {
  const x = 1;
  
  function b() {
    const y = 2;
    
    function c() {
      const z = 3;
      console.log(x + y + z); // 6
    }
    
    c();
  }
  
  b();
}

a();
```

---

### Q2.3: What is the Module Pattern?

**Answer:**

```javascript
// Module Pattern using IIFE and closure
const Calculator = (function() {
  // Private variables
  let result = 0;
  
  // Private function
  function log(message) {
    console.log(`[Calculator] ${message}`);
  }
  
  // Public API
  return {
    add: function(x) {
      result += x;
      log(`Added ${x}, result: ${result}`);
      return this; // for chaining
    },
    
    subtract: function(x) {
      result -= x;
      log(`Subtracted ${x}, result: ${result}`);
      return this;
    },
    
    multiply: function(x) {
      result *= x;
      log(`Multiplied by ${x}, result: ${result}`);
      return this;
    },
    
    getResult: function() {
      return result;
    },
    
    reset: function() {
      result = 0;
      log('Reset');
      return this;
    }
  };
})();

// Usage
Calculator.add(10).multiply(2).subtract(5);
console.log(Calculator.getResult()); // 15
Calculator.reset();

// Modern Module Pattern with ES6
class CalculatorES6 {
  #result = 0; // Private field
  
  add(x) {
    this.#result += x;
    return this;
  }
  
  getResult() {
    return this.#result;
  }
}

const calc = new CalculatorES6();
calc.add(5).add(10);
console.log(calc.getResult()); // 15
```

---

## 3. Promises & Async Programming

### Q3.1: Explain Promises and their states

**Answer:**

```javascript
// Promise has 3 states: pending, fulfilled, rejected

// Creating a promise
const promise = new Promise((resolve, reject) => {
  const success = true;
  
  setTimeout(() => {
    if (success) {
      resolve('Operation successful!');
    } else {
      reject('Operation failed!');
    }
  }, 1000);
});

// Consuming a promise
promise
  .then(result => {
    console.log(result); // 'Operation successful!'
    return 'Chained value';
  })
  .then(value => {
    console.log(value); // 'Chained value'
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Cleanup');
  });

// Promise chaining
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'John' });
    }, 1000);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' }
      ]);
    }, 1000);
  });
}

fetchUser(1)
  .then(user => {
    console.log('User:', user);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('Posts:', posts);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Promise.all - wait for all promises
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = new Promise(resolve => setTimeout(() => resolve(3), 1000));

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log(results); // [1, 2, 3]
  });

// Promise.race - first to complete
Promise.race([promise1, promise2, promise3])
  .then(result => {
    console.log(result); // 1 (first to resolve)
  });

// Promise.allSettled - all results (success or failure)
const promises = [
  Promise.resolve(1),
  Promise.reject('Error'),
  Promise.resolve(3)
];

Promise.allSettled(promises)
  .then(results => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 1 },
    //   { status: 'rejected', reason: 'Error' },
    //   { status: 'fulfilled', value: 3 }
    // ]
  });

// Promise.any - first successful promise
Promise.any(promises)
  .then(result => {
    console.log(result); // 1
  });
```

---

### Q3.2: What is async/await?

**Answer:**

```javascript
// async/await - syntactic sugar over promises

// Basic async function
async function fetchData() {
  return 'Data'; // Automatically wrapped in Promise
}

fetchData().then(data => console.log(data)); // 'Data'

// Using await
async function getUserData() {
  try {
    const user = await fetchUser(1);
    console.log('User:', user);
    
    const posts = await fetchPosts(user.id);
    console.log('Posts:', posts);
    
    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

getUserData();

// Parallel execution with Promise.all
async function fetchAllData() {
  try {
    // These run in parallel
    const [users, posts, comments] = await Promise.all([
      fetchUsers(),
      fetchPosts(),
      fetchComments()
    ]);
    
    return { users, posts, comments };
  } catch (error) {
    console.error('Error:', error);
  }
}

// Sequential vs Parallel
async function sequential() {
  const start = Date.now();
  
  const result1 = await delay(1000); // Wait 1s
  const result2 = await delay(1000); // Wait 1s
  const result3 = await delay(1000); // Wait 1s
  
  console.log(`Sequential: ${Date.now() - start}ms`); // ~3000ms
}

async function parallel() {
  const start = Date.now();
  
  // Start all promises immediately
  const promise1 = delay(1000);
  const promise2 = delay(1000);
  const promise3 = delay(1000);
  
  // Wait for all to complete
  await Promise.all([promise1, promise2, promise3]);
  
  console.log(`Parallel: ${Date.now() - start}ms`); // ~1000ms
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Error handling patterns
async function errorHandling() {
  // Pattern 1: try/catch
  try {
    const data = await fetchData();
  } catch (error) {
    console.error(error);
  }
  
  // Pattern 2: .catch()
  const data = await fetchData().catch(error => {
    console.error(error);
    return null; // fallback value
  });
  
  // Pattern 3: Wrapper function
  async function wrapper(promise) {
    try {
      const data = await promise;
      return [null, data];
    } catch (error) {
      return [error, null];
    }
  }
  
  const [error, result] = await wrapper(fetchData());
  if (error) {
    console.error(error);
  }
}

// Async iterators
async function* generateSequence() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

(async () => {
  for await (const value of generateSequence()) {
    console.log(value); // 1, 2, 3
  }
})();
```

---

### Q3.3: Implement Promise.all() from scratch

**Answer:**

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }
    
    const results = [];
    let completedCount = 0;
    
    if (promises.length === 0) {
      return resolve(results);
    }
    
    promises.forEach((promise, index) => {
      // Ensure it's a promise
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completedCount++;
          
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

// Test
const p1 = Promise.resolve(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
const p3 = Promise.resolve(3);

promiseAll([p1, p2, p3])
  .then(results => console.log(results)) // [1, 2, 3]
  .catch(error => console.error(error));

// Implement Promise.race()
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }
    
    if (promises.length === 0) {
      return; // Never resolves
    }
    
    promises.forEach(promise => {
      Promise.resolve(promise)
        .then(resolve)
        .catch(reject);
    });
  });
}

// Implement Promise.allSettled()
function promiseAllSettled(promises) {
  return new Promise((resolve) => {
    if (!Array.isArray(promises)) {
      return resolve([]);
    }
    
    const results = [];
    let completedCount = 0;
    
    if (promises.length === 0) {
      return resolve(results);
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = { status: 'fulfilled', value };
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
}
```

---

## 4. Prototypes & Inheritance

### Q4.1: Explain prototypal inheritance

**Answer:**

```javascript
// Every object has a prototype
const obj = {};
console.log(obj.__proto__ === Object.prototype); // true

// Prototype chain
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const john = new Person('John');
john.sayHello(); // "Hello, I'm John"

console.log(john.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null

// Inheritance
function Employee(name, title) {
  Person.call(this, name); // Call parent constructor
  this.title = title;
}

// Set up prototype chain
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.work = function() {
  console.log(`${this.name} is working as ${this.title}`);
};

const jane = new Employee('Jane', 'Developer');
jane.sayHello(); // "Hello, I'm Jane"
jane.work(); // "Jane is working as Developer"

console.log(jane instanceof Employee); // true
console.log(jane instanceof Person); // true

// ES6 Classes (syntactic sugar)
class PersonES6 {
  constructor(name) {
    this.name = name;
  }
  
  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

class EmployeeES6 extends PersonES6 {
  constructor(name, title) {
    super(name);
    this.title = title;
  }
  
  work() {
    console.log(`${this.name} is working as ${this.title}`);
  }
}

const bob = new EmployeeES6('Bob', 'Manager');
bob.sayHello();
bob.work();

// Prototype methods
const animal = {
  speak() {
    console.log('Animal sound');
  }
};

const dog = Object.create(animal);
dog.bark = function() {
  console.log('Woof!');
};

dog.speak(); // 'Animal sound' (inherited)
dog.bark();  // 'Woof!'

console.log(dog.hasOwnProperty('bark')); // true
console.log(dog.hasOwnProperty('speak')); // false
console.log('speak' in dog); // true (checks prototype chain)
```

---

### Q4.2: What is the difference between `__proto__` and `prototype`?

**Answer:**

```javascript
// prototype: Property of constructor functions
// __proto__: Internal property of objects (points to prototype)

function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return `Hello, ${this.name}`;
};

const john = new Person('John');

// Person.prototype: The prototype object for all Person instances
console.log(Person.prototype); // { greet: [Function] }

// john.__proto__: Points to Person.prototype
console.log(john.__proto__ === Person.prototype); // true

// Function's prototype
console.log(Person.__proto__ === Function.prototype); // true

// Visualization:
// john (object instance)
//   ↓ (__proto__)
// Person.prototype (object)
//   ↓ (__proto__)
// Object.prototype (object)
//   ↓ (__proto__)
// null

// Adding to prototype affects all instances
Person.prototype.age = 30;
console.log(john.age); // 30

const jane = new Person('Jane');
console.log(jane.age); // 30

// Instance property shadows prototype property
john.age = 25;
console.log(john.age); // 25 (own property)
console.log(jane.age); // 30 (from prototype)

// Object.getPrototypeOf() (recommended over __proto__)
console.log(Object.getPrototypeOf(john) === Person.prototype); // true

// Object.setPrototypeOf() (not recommended for performance)
const newProto = { customMethod() { return 'custom'; } };
Object.setPrototypeOf(john, newProto);
console.log(john.customMethod()); // 'custom'
```

---

## 5. Event Loop & Concurrency

### Q5.1: Explain the Event Loop

**Answer:**

```javascript
// JavaScript is single-threaded with an event loop

// Call Stack: Executes functions (LIFO)
// Task Queue (Macrotasks): setTimeout, setInterval, I/O
// Microtask Queue: Promises, queueMicrotask
// Execution order: Call Stack → Microtasks → Macrotasks

console.log('1'); // Synchronous

setTimeout(() => {
  console.log('2'); // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // Microtask
});

console.log('4'); // Synchronous

// Output: 1, 4, 3, 2

// Complex example
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
  Promise.resolve().then(() => console.log('Promise in Timeout 1'));
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    setTimeout(() => console.log('Timeout in Promise 1'), 0);
  })
  .then(() => console.log('Promise 2'));

setTimeout(() => {
  console.log('Timeout 2');
}, 0);

console.log('End');

/* Output:
Start
End
Promise 1
Promise 2
Timeout 1
Promise in Timeout 1
Timeout 2
Timeout in Promise 1
*/

// Microtasks vs Macrotasks
setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate')); // Node.js only
process.nextTick(() => console.log('nextTick')); // Node.js only
Promise.resolve().then(() => console.log('promise'));
queueMicrotask(() => console.log('queueMicrotask'));

/* Node.js Output:
nextTick
promise
queueMicrotask
setTimeout
setImmediate
*/

// Async iteration blocks the event loop
function blockingOperation() {
  const start = Date.now();
  while (Date.now() - start < 3000) {
    // Blocks for 3 seconds
  }
  console.log('Blocking done');
}

console.log('Before blocking');
blockingOperation();
console.log('After blocking');

// Non-blocking alternative
async function nonBlockingOperation() {
  console.log('Starting...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log('Done after 3 seconds');
}

nonBlockingOperation();
console.log('This runs immediately');
```

---

### Q5.2: What is debouncing and throttling?

**Answer:**

```javascript
// DEBOUNCING: Execute after delay, reset on new call
// Use case: Search input, window resize

function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    const context = this;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// Usage
const searchInput = document.querySelector('#search');

const expensiveSearch = (query) => {
  console.log('Searching for:', query);
  // API call here
};

const debouncedSearch = debounce(expensiveSearch, 500);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// THROTTLING: Execute at most once per interval
// Use case: Scroll events, button clicks

function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Usage
const handleScroll = () => {
  console.log('Scroll position:', window.scrollY);
};

const throttledScroll = throttle(handleScroll, 1000);

window.addEventListener('scroll', throttledScroll);

// Advanced throttle with leading and trailing options
function throttleAdvanced(func, limit, options = {}) {
  let timeout;
  let previous = 0;
  const { leading = true, trailing = true } = options;
  
  return function(...args) {
    const context = this;
    const now = Date.now();
    
    if (!previous && !leading) previous = now;
    
    const remaining = limit - (now - previous);
    
    if (remaining <= 0 || remaining > limit) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      
      previous = now;
      func.apply(context, args);
    } else if (!timeout && trailing) {
      timeout = setTimeout(() => {
        previous = leading ? Date.now() : 0;
        timeout = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}

// Debounce with immediate option
function debounceImmediate(func, delay, immediate = false) {
  let timeoutId;
  
  return function(...args) {
    const context = this;
    const callNow = immediate && !timeoutId;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, delay);
    
    if (callNow) {
      func.apply(context, args);
    }
  };
}
```

---

## 6. Array Methods & Iteration

### Q6.1: Explain map, filter, reduce

**Answer:**

```javascript
const numbers = [1, 2, 3, 4, 5];

// MAP: Transform each element
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const users = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 35 }
];

const names = users.map(user => user.name);
console.log(names); // ['John', 'Jane', 'Bob']

// FILTER: Select elements that match condition
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

const adults = users.filter(user => user.age >= 30);
console.log(adults); // [{ id: 2, name: 'Jane', age: 30 }, ...]

// REDUCE: Reduce array to single value
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

const product = numbers.reduce((acc, num) => acc * num, 1);
console.log(product); // 120

// Complex reduce examples
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
console.log(totalAge); // 90

// Group by property
const groupByAge = users.reduce((acc, user) => {
  const age = user.age;
  if (!acc[age]) {
    acc[age] = [];
  }
  acc[age].push(user);
  return acc;
}, {});

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }

// Flatten array
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log(flat); // [1, 2, 3, 4, 5, 6]

// Pipe functions
const pipe = (...fns) => (value) => 
  fns.reduce((acc, fn) => fn(acc), value);

const add5 = x => x + 5;
const multiply2 = x => x * 2;
const subtract3 = x => x - 3;

const compute = pipe(add5, multiply2, subtract3);
console.log(compute(10)); // (10 + 5) * 2 - 3 = 27

// CHAINING
const result = numbers
  .filter(num => num % 2 === 0)
  .map(num => num * 2)
  .reduce((sum, num) => sum + num, 0);

console.log(result); // 12 (2*2 + 4*2)
```

---

### Q6.2: Implement array methods from scratch

**Answer:**

```javascript
// IMPLEMENT MAP
Array.prototype.myMap = function(callback) {
  const result = [];
  
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      result.push(callback(this[i], i, this));
    }
  }
  
  return result;
};

// IMPLEMENT FILTER
Array.prototype.myFilter = function(callback) {
  const result = [];
  
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      if (callback(this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }
  
  return result;
};

// IMPLEMENT REDUCE
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;
  
  if (initialValue === undefined) {
    accumulator = this[0];
    startIndex = 1;
  }
  
  for (let i = startIndex; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  
  return accumulator;
};

// IMPLEMENT FOREACH
Array.prototype.myForEach = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      callback(this[i], i, this);
    }
  }
};

// IMPLEMENT FIND
Array.prototype.myFind = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      if (callback(this[i], i, this)) {
        return this[i];
      }
    }
  }
  return undefined;
};

// IMPLEMENT SOME
Array.prototype.mySome = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      if (callback(this[i], i, this)) {
        return true;
      }
    }
  }
  return false;
};

// IMPLEMENT EVERY
Array.prototype.myEvery = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      if (!callback(this[i], i, this)) {
        return false;
      }
    }
  }
  return true;
};

// IMPLEMENT FLAT
Array.prototype.myFlat = function(depth = 1) {
  const result = [];
  
  function flatten(arr, currentDepth) {
    for (const item of arr) {
      if (Array.isArray(item) && currentDepth < depth) {
        flatten(item, currentDepth + 1);
      } else {
        result.push(item);
      }
    }
  }
  
  flatten(this, 0);
  return result;
};

// IMPLEMENT FLATMAP
Array.prototype.myFlatMap = function(callback) {
  return this.myMap(callback).myFlat(1);
};

// Test
const arr = [1, 2, 3, 4, 5];
console.log(arr.myMap(x => x * 2)); // [2, 4, 6, 8, 10]
console.log(arr.myFilter(x => x % 2 === 0)); // [2, 4]
console.log(arr.myReduce((sum, x) => sum + x, 0)); // 15
```

---

## 7. Object-Oriented Programming

### Q7.1: Explain the 4 pillars of OOP

**Answer:**

```javascript
// 1. ENCAPSULATION: Bundle data and methods, hide internal state

class BankAccount {
  #balance = 0; // Private field (ES2022)
  
  constructor(initialBalance) {
    this.#balance = initialBalance;
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return true;
    }
    return false;
  }
  
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }
  
  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.#balance); // SyntaxError: Private field

// 2. ABSTRACTION: Hide complex implementation details

class Coffee {
  prepare() {
    this.boilWater();
    this.brewCoffee();
    this.pourInCup();
    this.addCondiments();
  }
  
  // Abstract methods (must be implemented by subclasses)
  brewCoffee() {
    throw new Error('brewCoffee() must be implemented');
  }
  
  addCondiments() {
    throw new Error('addCondiments() must be implemented');
  }
  
  // Concrete methods
  boilWater() {
    console.log('Boiling water');
  }
  
  pourInCup() {
    console.log('Pouring into cup');
  }
}

class Espresso extends Coffee {
  brewCoffee() {
    console.log('Brewing espresso');
  }
  
  addCondiments() {
    console.log('Adding sugar');
  }
}

const espresso = new Espresso();
espresso.prepare();

// 3. INHERITANCE: Reuse code from parent class

class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
  
  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    console.log(`${this.name} barks`);
  }
  
  fetch() {
    console.log(`${this.name} is fetching`);
  }
}

const dog = new Dog('Max', 'Golden Retriever');
dog.speak(); // 'Max barks'
dog.eat();   // 'Max is eating' (inherited)
dog.fetch(); // 'Max is fetching'

// 4. POLYMORPHISM: Different forms of same method

class Shape {
  area() {
    throw new Error('area() must be implemented');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
}

class Triangle extends Shape {
  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }
  
  area() {
    return (this.base * this.height) / 2;
  }
}

// Polymorphic usage
const shapes = [
  new Circle(5),
  new Rectangle(4, 6),
  new Triangle(3, 4)
];

shapes.forEach(shape => {
  console.log(`Area: ${shape.area()}`);
});
```

---

### Q7.2: What are getters and setters?

**Answer:**

```javascript
// Getters and Setters: Control property access

class User {
  constructor(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;
  }
  
  // Getter: Access like a property
  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }
  
  // Setter: Set like a property
  set fullName(name) {
    const parts = name.split(' ');
    this._firstName = parts[0];
    this._lastName = parts[1];
  }
  
  // Getter for computed property
  get initials() {
    return `${this._firstName[0]}${this._lastName[0]}`;
  }
}

const user = new User('John', 'Doe');
console.log(user.fullName); // 'John Doe' (getter)
user.fullName = 'Jane Smith'; // (setter)
console.log(user.fullName); // 'Jane Smith'
console.log(user.initials); // 'JS'

// Validation in setter
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }
  
  get celsius() {
    return this._celsius;
  }
  
  set celsius(value) {
    if (value < -273.15) {
      throw new Error('Temperature cannot be below absolute zero');
    }
    this._celsius = value;
  }
  
  get fahrenheit() {
    return this._celsius * 9/5 + 32;
  }
  
  set fahrenheit(value) {
    this.celsius = (value - 32) * 5/9;
  }
}

const temp = new Temperature(25);
console.log(temp.fahrenheit); // 77
temp.fahrenheit = 100;
console.log(temp.celsius); // 37.78

// Object.defineProperty for getters/setters
const person = {
  _age: 0
};

Object.defineProperty(person, 'age', {
  get() {
    return this._age;
  },
  set(value) {
    if (value < 0 || value > 150) {
      throw new Error('Invalid age');
    }
    this._age = value;
  },
  enumerable: true,
  configurable: true
});

person.age = 25;
console.log(person.age); // 25
// person.age = -1; // Error

// Lazy loading with getter
class DataLoader {
  get data() {
    if (!this._data) {
      console.log('Loading data...');
      this._data = this.loadData();
    }
    return this._data;
  }
  
  loadData() {
    // Expensive operation
    return [1, 2, 3, 4, 5];
  }
}

const loader = new DataLoader();
console.log(loader.data); // 'Loading data...' [1, 2, 3, 4, 5]
console.log(loader.data); // [1, 2, 3, 4, 5] (cached)
```

---

## 8. Polyfills Implementation

### Q8.1: Implement bind() polyfill

**Answer:**

```javascript
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  
  return function(...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

// Test
function greet(greeting, punctuation) {
  return `${greeting} ${this.name}${punctuation}`;
}

const person = { name: 'John' };
const boundGreet = greet.myBind(person, 'Hello');
console.log(boundGreet('!')); // 'Hello John!'

// More complete implementation
Function.prototype.myBindAdvanced = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }
  
  const fn = this;
  const boundFunction = function(...newArgs) {
    // If called with 'new', use the new instance as context
    return fn.apply(
      this instanceof boundFunction ? this : context,
      [...args, ...newArgs]
    );
  };
  
  // Maintain prototype chain for constructor functions
  if (fn.prototype) {
    boundFunction.prototype = Object.create(fn.prototype);
  }
  
  return boundFunction;
};
```

---

### Q8.2: Implement call() and apply() polyfills

**Answer:**

```javascript
// CALL POLYFILL
Function.prototype.myCall = function(context, ...args) {
  context = context || globalThis;
  
  // Create unique property to avoid conflicts
  const uniqueKey = Symbol();
  context[uniqueKey] = this;
  
  // Call function with context
  const result = context[uniqueKey](...args);
  
  // Clean up
  delete context[uniqueKey];
  
  return result;
};

// APPLY POLYFILL
Function.prototype.myApply = function(context, args = []) {
  context = context || globalThis;
  
  const uniqueKey = Symbol();
  context[uniqueKey] = this;
  
  const result = context[uniqueKey](...args);
  
  delete context[uniqueKey];
  
  return result;
};

// Test
function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const person = { name: 'Alice' };
console.log(introduce.myCall(person, 'Hi', '!')); // "Hi, I'm Alice!"
console.log(introduce.myApply(person, ['Hello', '.'])); // "Hello, I'm Alice."
```

---

### Q8.3: Implement Promise polyfill

**Answer:**

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };
    
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };
    
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      }
      
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      }
      
      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          });
        });
        
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
    
    return promise2;
  }
  
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  
  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason => MyPromise.resolve(callback()).then(() => { throw reason; })
    );
  }
  
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise(resolve => resolve(value));
  }
  
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
  
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let completed = 0;
      
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        }).catch(reject);
      });
    });
  }
  
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        MyPromise.resolve(promise).then(resolve).catch(reject);
      });
    });
  }
}

// Test
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('Success!'), 1000);
});

promise
  .then(result => {
    console.log(result); // 'Success!'
    return 'Chained';
  })
  .then(result => console.log(result)) // 'Chained'
  .catch(error => console.error(error));
```

---

### Q8.4: Implement Array.flat() polyfill

**Answer:**

```javascript
Array.prototype.myFlat = function(depth = 1) {
  const result = [];
  
  const flatten = (arr, currentDepth) => {
    for (const item of arr) {
      if (Array.isArray(item) && currentDepth < depth) {
        flatten(item, currentDepth + 1);
      } else {
        result.push(item);
      }
    }
  };
  
  flatten(this, 0);
  return result;
};

// Test
const nested = [1, [2, [3, [4, 5]]]];
console.log(nested.myFlat(1));      // [1, 2, [3, [4, 5]]]
console.log(nested.myFlat(2));      // [1, 2, 3, [4, 5]]
console.log(nested.myFlat(Infinity)); // [1, 2, 3, 4, 5]

// Alternative implementation using reduce
Array.prototype.myFlatReduce = function(depth = 1) {
  return depth > 0
    ? this.reduce((acc, val) => 
        acc.concat(Array.isArray(val) ? val.myFlatReduce(depth - 1) : val),
      [])
    : this.slice();
};
```

---

### Q8.5: Implement Object.create() polyfill

**Answer:**

```javascript
if (typeof Object.create !== 'function') {
  Object.create = function(proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object or null');
    }
    
    if (propertiesObject !== undefined) {
      throw new Error('Properties parameter is not supported in this polyfill');
    }
    
    function F() {}
    F.prototype = proto;
    return new F();
  };
}

// Test
const parent = {
  greet() {
    console.log('Hello from parent');
  }
};

const child = Object.create(parent);
child.greet(); // 'Hello from parent'
console.log(child.__proto__ === parent); // true
```

---

## 9. Common Coding Problems

### Q9.1: Implement a deep clone function

**Answer:**

```javascript
function deepClone(obj, hash = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle circular references
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  
  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj);
  }
  
  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  // Handle Array
  if (Array.isArray(obj)) {
    const arrCopy = [];
    hash.set(obj, arrCopy);
    obj.forEach((item, index) => {
      arrCopy[index] = deepClone(item, hash);
    });
    return arrCopy;
  }
  
  // Handle Object
  const objCopy = {};
  hash.set(obj, objCopy);
  
  Object.keys(obj).forEach(key => {
    objCopy[key] = deepClone(obj[key], hash);
  });
  
  return objCopy;
}

// Test
const original = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    zip: '10001'
  },
  hobbies: ['reading', 'gaming'],
  birthdate: new Date('1990-01-01'),
  pattern: /test/gi
};

// Circular reference
original.self = original;

const cloned = deepClone(original);
console.log(cloned);
console.log(cloned !== original); // true
console.log(cloned.address !== original.address); // true
console.log(cloned.self === cloned); // true (circular reference maintained)
```

---

### Q9.2: Implement a function to flatten an object

**Answer:**

```javascript
function flattenObject(obj, prefix = '', result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  
  return result;
}

// Test
const nested = {
  user: {
    name: 'John',
    address: {
      city: 'New York',
      zip: '10001'
    },
    hobbies: ['reading', 'gaming']
  },
  age: 30
};

console.log(flattenObject(nested));
/* Output:
{
  'user.name': 'John',
  'user.address.city': 'New York',
  'user.address.zip': '10001',
  'user.hobbies': ['reading', 'gaming'],
  'age': 30
}
*/

// Unflatten function
function unflattenObject(obj) {
  const result = {};
  
  for (const key in obj) {
    const keys = key.split('.');
    let current = result;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = obj[key];
  }
  
  return result;
}

const flattened = flattenObject(nested);
const unflattened = unflattenObject(flattened);
console.log(unflattened); // Original structure restored
```

---

### Q9.3: Implement memoization

**Answer:**

```javascript
// Basic memoization
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log('Returning cached result');
      return cache[key];
    }
    
    console.log('Computing result');
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Test with expensive function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize(fibonacci);

console.log(memoizedFib(40)); // Computing... (slow)
console.log(memoizedFib(40)); // Cached! (instant)

// Advanced memoization with WeakMap
function memoizeAdvanced(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = args.length === 1 ? args[0] : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    
    return result;
  };
}

// Memoization with expiration
function memoizeWithExpiration(fn, ttl = 60000) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }
    
    const result = fn.apply(this, args);
    cache.set(key, {
      value: result,
      timestamp: Date.now()
    });
    
    return result;
  };
}

// Memoization with LRU cache
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  get(key) {
    if (!this.cache.has(key)) return undefined;
    
    const value = this.cache.get(key);
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    
    this.cache.set(key, value);
    
    if (this.cache.size > this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}

function memoizeWithLRU(fn, capacity = 100) {
  const cache = new LRUCache(capacity);
  
  return function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    
    if (cached !== undefined) {
      return cached;
    }
    
    const result = fn.apply(this, args);
    cache.put(key, result);
    return result;
  };
}
```

---

### Q9.4: Implement a function to group array of objects by property

**Answer:**

```javascript
function groupBy(array, key) {
  return array.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    
    result[groupKey].push(item);
    return result;
  }, {});
}

// Test
const users = [
  { name: 'John', age: 25, city: 'NYC' },
  { name: 'Jane', age: 30, city: 'LA' },
  { name: 'Bob', age: 25, city: 'NYC' },
  { name: 'Alice', age: 30, city: 'NYC' }
];

console.log(groupBy(users, 'age'));
/* Output:
{
  25: [{ name: 'John', age: 25, city: 'NYC' }, { name: 'Bob', age: 25, city: 'NYC' }],
  30: [{ name: 'Jane', age: 30, city: 'LA' }, { name: 'Alice', age: 30, city: 'NYC' }]
}
*/

console.log(groupBy(users, 'city'));
/* Output:
{
  'NYC': [...],
  'LA': [...]
}
*/

// With function
console.log(groupBy(users, user => user.age >= 30 ? 'senior' : 'junior'));
/* Output:
{
  'junior': [...],
  'senior': [...]
}
*/

// Multi-level grouping
function groupByMultiple(array, keys) {
  if (keys.length === 0) return array;
  
  const [firstKey, ...restKeys] = keys;
  const grouped = groupBy(array, firstKey);
  
  if (restKeys.length === 0) return grouped;
  
  return Object.keys(grouped).reduce((result, key) => {
    result[key] = groupByMultiple(grouped[key], restKeys);
    return result;
  }, {});
}

console.log(groupByMultiple(users, ['city', 'age']));
/* Output:
{
  'NYC': {
    25: [...],
    30: [...]
  },
  'LA': {
    30: [...]
  }
}
*/
```

---

### Q9.5: Implement curry function

**Answer:**

```javascript
// Basic curry
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

// Test
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3));       // 6
console.log(curriedAdd(1, 2)(3));       // 6
console.log(curriedAdd(1)(2, 3));       // 6
console.log(curriedAdd(1, 2, 3));       // 6

// Practical example
function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply);
const multiplyByTwo = curriedMultiply(2);
const multiplyByTwoAndThree = multiplyByTwo(3);

console.log(multiplyByTwoAndThree(4));  // 24 (2 * 3 * 4)

// Infinite curry (until called without arguments)
function infiniteCurry(fn) {
  return function curried(...args) {
    if (args.length === 0) {
      return fn.call(this);
    }
    
    return function(...moreArgs) {
      if (moreArgs.length === 0) {
        return fn.call(this, ...args);
      }
      return curried(...args, ...moreArgs);
    };
  };
}

// Sum with infinite curry
const sum = infiniteCurry(function(...args) {
  return args.reduce((sum, n) => sum + n, 0);
});

console.log(sum(1)(2)(3)(4)()); // 10
console.log(sum(1, 2)(3)(4, 5)()); // 15

// Partial application (similar to curry)
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

const add10 = partial(add, 10);
console.log(add10(5, 3)); // 18 (10 + 5 + 3)
```

---

## 10. Design Patterns

### Q10.1: Implement Singleton pattern

**Answer:**

```javascript
// Method 1: Using closures
const Singleton = (function() {
  let instance;
  
  function createInstance() {
    const object = {
      name: 'Singleton',
      someMethod() {
        console.log('Singleton method called');
      }
    };
    return object;
  }
  
  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true

// Method 2: Using ES6 class
class SingletonClass {
  constructor() {
    if (SingletonClass.instance) {
      return SingletonClass.instance;
    }
    
    this.data = [];
    SingletonClass.instance = this;
  }
  
  addData(item) {
    this.data.push(item);
  }
  
  getData() {
    return this.data;
  }
}

const s1 = new SingletonClass();
const s2 = new SingletonClass();

s1.addData('Item 1');
console.log(s2.getData()); // ['Item 1']
console.log(s1 === s2); // true

// Method 3: Using static property
class Database {
  static #instance;
  
  constructor() {
    if (Database.#instance) {
      throw new Error('Use Database.getInstance()');
    }
    this.connections = [];
  }
  
  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }
    return Database.#instance;
  }
  
  connect(conn) {
    this.connections.push(conn);
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true
```

---

### Q10.2: Implement Observer pattern

**Answer:**

```javascript
class Observable {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
    
    // Return unsubscribe function
    return () => {
      this.observers = this.observers.filter(obs => obs !== observer);
    };
  }
  
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

// Usage
const observable = new Observable();

const observer1 = (data) => console.log('Observer 1:', data);
const observer2 = (data) => console.log('Observer 2:', data);

const unsubscribe1 = observable.subscribe(observer1);
observable.subscribe(observer2);

observable.notify('Hello'); // Both observers notified

unsubscribe1(); // Remove observer1

observable.notify('World'); // Only observer2 notified

// More advanced implementation with Event Emitter
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    
    return () => this.off(event, listener);
  }
  
  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    return this.on(event, onceWrapper);
  }
  
  emit(event, ...args) {
    if (!this.events[event]) return;
    
    this.events[event].forEach(listener => {
      listener(...args);
    });
  }
  
  off(event, listenerToRemove) {
    if (!this.events[event]) return;
    
    this.events[event] = this.events[event].filter(
      listener => listener !== listenerToRemove
    );
  }
  
  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }
}

// Usage
const emitter = new EventEmitter();

emitter.on('userLogin', (user) => {
  console.log(`${user.name} logged in`);
});

emitter.on('userLogin', (user) => {
  console.log(`Send welcome email to ${user.email}`);
});

emitter.once('userLogin', (user) => {
  console.log('First time login detected');
});

emitter.emit('userLogin', { name: 'John', email: 'john@example.com' });
```

---

### Q10.3: Implement Factory pattern

**Answer:**

```javascript
// Simple Factory
class Car {
  constructor(type) {
    this.type = type;
  }
  
  drive() {
    console.log(`Driving a ${this.type}`);
  }
}

class CarFactory {
  static createCar(type) {
    switch(type) {
      case 'sedan':
        return new Car('Sedan');
      case 'suv':
        return new Car('SUV');
      case 'truck':
        return new Car('Truck');
      default:
        throw new Error('Unknown car type');
    }
  }
}

const sedan = CarFactory.createCar('sedan');
sedan.drive(); // 'Driving a Sedan'

// Abstract Factory
class Button {
  render() {
    throw new Error('render() must be implemented');
  }
}

class WindowsButton extends Button {
  render() {
    return '<button class="windows">Windows Button</button>';
  }
}

class MacButton extends Button {
  render() {
    return '<button class="mac">Mac Button</button>';
  }
}

class Checkbox {
  render() {
    throw new Error('render() must be implemented');
  }
}

class WindowsCheckbox extends Checkbox {
  render() {
    return '<input type="checkbox" class="windows" />';
  }
}

class MacCheckbox extends Checkbox {
  render() {
    return '<input type="checkbox" class="mac" />';
  }
}

// Abstract Factory
class GUIFactory {
  createButton() {
    throw new Error('createButton() must be implemented');
  }
  
  createCheckbox() {
    throw new Error('createCheckbox() must be implemented');
  }
}

class WindowsFactory extends GUIFactory {
  createButton() {
    return new WindowsButton();
  }
  
  createCheckbox() {
    return new WindowsCheckbox();
  }
}

class MacFactory extends GUIFactory {
  createButton() {
    return new MacButton();
  }
  
  createCheckbox() {
    return new MacCheckbox();
  }
}

// Usage
function createUI(factory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  
  return {
    button: button.render(),
    checkbox: checkbox.render()
  };
}

const os = 'windows'; // or 'mac'
const factory = os === 'windows' ? new WindowsFactory() : new MacFactory();
const ui = createUI(factory);

console.log(ui);
```

---

### Q10.4: Implement Strategy pattern

**Answer:**

```javascript
// Payment strategies
class PaymentStrategy {
  pay(amount) {
    throw new Error('pay() must be implemented');
  }
}

class CreditCardStrategy extends PaymentStrategy {
  constructor(cardNumber) {
    super();
    this.cardNumber = cardNumber;
  }
  
  pay(amount) {
    console.log(`Paid $${amount} using Credit Card ${this.cardNumber}`);
  }
}

class PayPalStrategy extends PaymentStrategy {
  constructor(email) {
    super();
    this.email = email;
  }
  
  pay(amount) {
    console.log(`Paid $${amount} using PayPal ${this.email}`);
  }
}

class CryptoStrategy extends PaymentStrategy {
  constructor(wallet) {
    super();
    this.wallet = wallet;
  }
  
  pay(amount) {
    console.log(`Paid $${amount} using Crypto wallet ${this.wallet}`);
  }
}

// Context
class ShoppingCart {
  constructor() {
    this.items = [];
    this.paymentStrategy = null;
  }
  
  addItem(item) {
    this.items.push(item);
  }
  
  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }
  
  checkout() {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    
    if (!this.paymentStrategy) {
      throw new Error('Payment strategy not set');
    }
    
    this.paymentStrategy.pay(total);
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem({ name: 'Book', price: 10 });
cart.addItem({ name: 'Pen', price: 5 });

cart.setPaymentStrategy(new CreditCardStrategy('1234-5678-9012-3456'));
cart.checkout(); // 'Paid $15 using Credit Card...'

cart.setPaymentStrategy(new PayPalStrategy('user@example.com'));
cart.checkout(); // 'Paid $15 using PayPal...'

// Validation strategies example
class ValidationStrategy {
  validate(value) {
    throw new Error('validate() must be implemented');
  }
}

class EmailValidation extends ValidationStrategy {
  validate(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }
}

class PhoneValidation extends ValidationStrategy {
  validate(value) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value);
  }
}

class Validator {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
  validate(value) {
    return this.strategy.validate(value);
  }
}

const validator = new Validator(new EmailValidation());
console.log(validator.validate('test@example.com')); // true
console.log(validator.validate('invalid')); // false

validator.setStrategy(new PhoneValidation());
console.log(validator.validate('1234567890')); // true
console.log(validator.validate('123')); // false
```

---

## 11. Performance & Optimization

### Q11.1: How to optimize JavaScript performance?

**Answer:**

```javascript
// 1. AVOID GLOBAL VARIABLES
// Bad
var count = 0;
function increment() {
  count++;
}

// Good
(function() {
  let count = 0;
  window.increment = function() {
    count++;
  };
})();

// 2. USE CONST/LET INSTEAD OF VAR
// Bad
var x = 10;

// Good
const x = 10;
let y = 20;

// 3. MINIMIZE DOM ACCESS
// Bad
for (let i = 0; i < 1000; i++) {
  document.getElementById('list').innerHTML += '<li>Item</li>';
}

// Good
let html = '';
for (let i = 0; i < 1000; i++) {
  html += '<li>Item</li>';
}
document.getElementById('list').innerHTML = html;

// Even better - use DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = 'Item';
  fragment.appendChild(li);
}
document.getElementById('list').appendChild(fragment);

// 4. CACHE ARRAY LENGTH
// Bad
for (let i = 0; i < arr.length; i++) {
  // arr.length calculated every iteration
}

// Good
for (let i = 0, len = arr.length; i < len; i++) {
  // Length cached
}

// 5. DEBOUNCE/THROTTLE EXPENSIVE OPERATIONS
function expensiveOperation() {
  // Heavy computation
}

// Debounced version
const debouncedOp = debounce(expensiveOperation, 300);
window.addEventListener('resize', debouncedOp);

// 6. USE EVENT DELEGATION
// Bad - attach listener to each item
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleClick);
});

// Good - single listener on parent
document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    handleClick(e);
  }
});

// 7. LAZY LOADING
class LazyLoader {
  constructor() {
    this.data = null;
  }
  
  getData() {
    if (!this.data) {
      this.data = this.loadExpensiveData();
    }
    return this.data;
  }
  
  loadExpensiveData() {
    // Load only when needed
    return 'expensive data';
  }
}

// 8. WEB WORKERS FOR CPU-INTENSIVE TASKS
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ data: largeArray });

worker.onmessage = function(e) {
  console.log('Result:', e.data);
};

// worker.js
self.onmessage = function(e) {
  const result = e.data.data.map(x => x * 2); // Heavy computation
  self.postMessage(result);
};

// 9. USE REQUEST ANIMATION FRAME FOR ANIMATIONS
// Bad
setInterval(() => {
  element.style.left = position + 'px';
  position++;
}, 16);

// Good
function animate() {
  element.style.left = position + 'px';
  position++;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// 10. OPTIMIZE OBJECT PROPERTY ACCESS
// Bad
for (let i = 0; i < 1000; i++) {
  console.log(obj.prop.nestedProp.deepProp);
}

// Good
const deepProp = obj.prop.nestedProp.deepProp;
for (let i = 0; i < 1000; i++) {
  console.log(deepProp);
}

// 11. USE OBJECT POOL FOR FREQUENT OBJECT CREATION
class ObjectPool {
  constructor(factory, reset) {
    this.factory = factory;
    this.reset = reset;
    this.pool = [];
  }
  
  acquire() {
    if (this.pool.length > 0) {
      return this.pool.pop();
    }
    return this.factory();
  }
  
  release(obj) {
    this.reset(obj);
    this.pool.push(obj);
  }
}

// Usage
const vectorPool = new ObjectPool(
  () => ({ x: 0, y: 0 }),
  (vec) => { vec.x = 0; vec.y = 0; }
);

const vec = vectorPool.acquire();
vec.x = 10;
vec.y = 20;
// ... use vector
vectorPool.release(vec);
```

---

### Q11.2: What is memory leak and how to prevent it?

**Answer:**

```javascript
// COMMON MEMORY LEAKS

// 1. FORGOTTEN TIMERS
// Bad - timer never cleared
const data = fetchData();
setInterval(() => {
  console.log(data); // Keeps reference to data
}, 1000);

// Good
const intervalId = setInterval(() => {
  console.log(data);
}, 1000);

// Clear when done
clearInterval(intervalId);

// 2. EVENT LISTENERS NOT REMOVED
// Bad
function attachListener() {
  const element = document.getElementById('button');
  element.addEventListener('click', handleClick);
}

// Good
function attachListener() {
  const element = document.getElementById('button');
  const handler = handleClick.bind(this);
  element.addEventListener('click', handler);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('click', handler);
  };
}

const cleanup = attachListener();
// Later...
cleanup();

// 3. CLOSURES HOLDING REFERENCES
// Bad
function outer() {
  const largeData = new Array(1000000).fill('data');
  
  return function inner() {
    console.log('Hello');
    // inner() keeps reference to largeData even though not used
  };
}

// Good
function outer() {
  const largeData = new Array(1000000).fill('data');
  const needed = largeData[0]; // Extract only what's needed
  
  return function inner() {
    console.log(needed);
    // Only 'needed' is retained, not entire largeData
  };
}

// 4. DETACHED DOM NODES
// Bad
let detachedNodes = [];

function createNodes() {
  for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    detachedNodes.push(div); // Keeps reference
  }
  
  // Remove from DOM but still in array
  document.body.innerHTML = '';
  // Nodes still in memory via detachedNodes!
}

// Good
function createNodes() {
  for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    document.body.appendChild(div);
  }
  
  // When removing, don't keep references
  document.body.innerHTML = '';
}

// 5. CIRCULAR REFERENCES (less of an issue in modern JS)
// Bad
function createCircular() {
  const obj1 = {};
  const obj2 = {};
  
  obj1.ref = obj2;
  obj2.ref = obj1; // Circular reference
  
  return obj1;
}

// Good - use WeakMap for circular references
const weakMap = new WeakMap();

function createNonCircular(obj1, obj2) {
  weakMap.set(obj1, obj2);
  weakMap.set(obj2, obj1);
}

// 6. FORGOTTEN GLOBAL VARIABLES
// Bad
function createData() {
  data = new Array(1000000); // Forgot 'var/let/const'
  // Now a global variable!
}

// Good
function createData() {
  const data = new Array(1000000);
}

// 7. CACHE WITHOUT LIMITS
// Bad
const cache = {};

function getData(key) {
  if (cache[key]) {
    return cache[key];
  }
  
  const data = fetchData(key);
  cache[key] = data; // Cache grows infinitely!
  return data;
}

// Good - use LRU cache
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  get(key) {
    if (!this.cache.has(key)) return undefined;
    
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // Move to end
    return value;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    
    this.cache.set(key, value);
    
    if (this.cache.size > this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}

// DETECTING MEMORY LEAKS

// Using Chrome DevTools
// 1. Take heap snapshot
// 2. Perform action that might leak
// 3. Take another heap snapshot
// 4. Compare snapshots

// Using Performance API
if (performance.memory) {
  console.log('Used JS Heap:', performance.memory.usedJSHeapSize);
  console.log('Total JS Heap:', performance.memory.totalJSHeapSize);
  console.log('Heap Limit:', performance.memory.jsHeapSizeLimit);
}

// Monitor memory usage
function monitorMemory() {
  setInterval(() => {
    if (performance.memory) {
      const used = performance.memory.usedJSHeapSize / 1048576;
      console.log(`Memory used: ${used.toFixed(2)} MB`);
    }
  }, 5000);
}
```

---

## 12. ES6+ Features

### Q12.1: Explain destructuring

**Answer:**

```javascript
// ARRAY DESTRUCTURING
const arr = [1, 2, 3, 4, 5];

// Basic
const [first, second] = arr;
console.log(first, second); // 1, 2

// Skip elements
const [, , third] = arr;
console.log(third); // 3

// Rest operator
const [head, ...tail] = arr;
console.log(head, tail); // 1, [2, 3, 4, 5]

// Default values
const [a, b, c = 10] = [1, 2];
console.log(a, b, c); // 1, 2, 10

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2, 1

// OBJECT DESTRUCTURING
const user = {
  name: 'John',
  age: 30,
  address: {
    city: 'NYC',
    zip: '10001'
  }
};

// Basic
const { name, age } = user;
console.log(name, age); // 'John', 30

// Rename variables
const { name: userName, age: userAge } = user;
console.log(userName, userAge); // 'John', 30

// Default values
const { name: n, email = 'no-email' } = user;
console.log(n, email); // 'John', 'no-email'

// Nested destructuring
const { address: { city, zip } } = user;
console.log(city, zip); // 'NYC', '10001'

// Rest in objects
const { name: nm, ...rest } = user;
console.log(nm, rest); // 'John', { age: 30, address: {...} }

// FUNCTION PARAMETERS
function greet({ name, age = 25 }) {
  console.log(`Hello ${name}, you are ${age}`);
}

greet({ name: 'Alice' }); // 'Hello Alice, you are 25'
greet({ name: 'Bob', age: 30 }); // 'Hello Bob, you are 30'

// Array parameters
function sum([a, b]) {
  return a + b;
}

console.log(sum([5, 10])); // 15

// COMPLEX EXAMPLES
const data = {
  id: 1,
  user: {
    name: 'John',
    details: {
      email: 'john@example.com',
      address: {
        city: 'NYC'
      }
    }
  }
};

const {
  user: {
    name: userName2,
    details: {
      email,
      address: { city: userCity }
    }
  }
} = data;

console.log(userName2, email, userCity); // 'John', 'john@example.com', 'NYC'

// Dynamic property names
const key = 'name';
const { [key]: value } = user;
console.log(value); // 'John'

// Combining array and object destructuring
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];

const [{ name: firstName }, { name: secondName }] = users;
console.log(firstName, secondName); // 'John', 'Jane'
```

---

### Q12.2: Explain spread and rest operators

**Answer:**

```javascript
// SPREAD OPERATOR (...)

// 1. ARRAYS
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combine arrays
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Copy array
const copy = [...arr1];
console.log(copy); // [1, 2, 3]
console.log(copy === arr1); // false (different reference)

// Add elements
const extended = [0, ...arr1, 4];
console.log(extended); // [0, 1, 2, 3, 4]

// Spread in function calls
const numbers = [1, 2, 3];
console.log(Math.max(...numbers)); // 3

// 2. OBJECTS
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// Combine objects
const combinedObj = { ...obj1, ...obj2 };
console.log(combinedObj); // { a: 1, b: 2, c: 3, d: 4 }

// Copy object
const objCopy = { ...obj1 };
console.log(objCopy); // { a: 1, b: 2 }

// Override properties
const updated = { ...obj1, b: 20, e: 5 };
console.log(updated); // { a: 1, b: 20, e: 5 }

// Shallow copy warning
const original = { a: 1, nested: { b: 2 } };
const shallowCopy = { ...original };
shallowCopy.nested.b = 3;
console.log(original.nested.b); // 3 (still connected!)

// 3. STRINGS
const str = 'hello';
const chars = [...str];
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

// 4. SETS AND MAPS
const set = new Set([1, 2, 3]);
const setArray = [...set];
console.log(setArray); // [1, 2, 3]

const map = new Map([['a', 1], ['b', 2]]);
const mapArray = [...map];
console.log(mapArray); // [['a', 1], ['b', 2]]

// REST OPERATOR (...)

// 1. FUNCTION PARAMETERS
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

function multiply(multiplier, ...numbers) {
  return numbers.map(n => n * multiplier);
}

console.log(multiply(2, 1, 2, 3)); // [2, 4, 6]

// 2. ARRAY DESTRUCTURING
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest);  // [2, 3, 4, 5]

// 3. OBJECT DESTRUCTURING
const person = { name: 'John', age: 30, city: 'NYC', country: 'USA' };
const { name, ...otherDetails } = person;
console.log(name);         // 'John'
console.log(otherDetails); // { age: 30, city: 'NYC', country: 'USA' }

// PRACTICAL EXAMPLES

// Remove property from object
function removeProperty(obj, key) {
  const { [key]: removed, ...rest } = obj;
  return rest;
}

const user = { id: 1, name: 'John', email: 'john@example.com' };
const withoutEmail = removeProperty(user, 'email');
console.log(withoutEmail); // { id: 1, name: 'John' }

// Merge arrays with unique values
function mergeUnique(...arrays) {
  return [...new Set([].concat(...arrays))];
}

console.log(mergeUnique([1, 2], [2, 3], [3, 4])); // [1, 2, 3, 4]

// Partial application
function createGreeting(greeting, ...names) {
  return names.map(name => `${greeting}, ${name}!`);
}

console.log(createGreeting('Hello', 'John', 'Jane', 'Bob'));
// ['Hello, John!', 'Hello, Jane!', 'Hello, Bob!']

// Flatten array one level
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = [].concat(...nested);
console.log(flat); // [1, 2, 3, 4, 5, 6]

// Clone with modifications
const updateUser = (user, updates) => ({
  ...user,
  ...updates,
  updatedAt: Date.now()
});

const john = { id: 1, name: 'John', age: 30 };
const updated2 = updateUser(john, { age: 31 });
console.log(updated2); // { id: 1, name: 'John', age: 31, updatedAt: ... }
```

---

### Q12.3: Explain template literals

**Answer:**

```javascript
// BASIC USAGE
const name = 'John';
const age = 30;

// Old way
const greeting1 = 'Hello, ' + name + '. You are ' + age + ' years old.';

// Template literal
const greeting2 = `Hello, ${name}. You are ${age} years old.`;
console.log(greeting2);

// MULTI-LINE STRINGS
const multiline = `
  This is a
  multi-line
  string
`;

// EXPRESSIONS
const a = 5;
const b = 10;
console.log(`Sum: ${a + b}`); // 'Sum: 15'
console.log(`Is a > b? ${a > b}`); // 'Is a > b? false'

// Function calls
function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

console.log(`Name: ${getFullName('John', 'Doe')}`); // 'Name: John Doe'

// NESTED TEMPLATES
const isActive = true;
const status = `User is ${isActive ? `active` : `inactive`}`;
console.log(status); // 'User is active'

// TAGGED TEMPLATES
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}${values[i] ? `<strong>${values[i]}</strong>` : ''}`;
  }, '');
}

const name2 = 'Alice';
const score = 95;
const message = highlight`${name2} scored ${score} points!`;
console.log(message); // '<strong>Alice</strong> scored <strong>95</strong> points!'

// SQL query builder
function sql(strings, ...values) {
  return {
    query: strings.reduce((result, str, i) => {
      return result + str + (values[i] !== undefined ? '?' : '');
    }, ''),
    values: values
  };
}

const userId = 123;
const userName = 'John';
const query = sql`SELECT * FROM users WHERE id = ${userId} AND name = ${userName}`;
console.log(query);
// { query: 'SELECT * FROM users WHERE id = ? AND name = ?', values: [123, 'John'] }

// HTML template
function html(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i];
    // Escape HTML to prevent XSS
    const escaped = value !== undefined 
      ? String(value).replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
      : '';
    return result + str + escaped;
  }, '');
}

const userInput = '<script>alert("XSS")</script>';
const safe = html`<div>${userInput}</div>`;
console.log(safe); // '<div>&lt;script&gt;alert("XSS")&lt;/script&gt;</div>'

// STYLED COMPONENTS (React)
function css(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] || '');
  }, '');
}

const primaryColor = '#007bff';
const padding = '10px';

const buttonStyle = css`
  background-color: ${primaryColor};
  padding: ${padding};
  border-radius: 5px;
`;

// RAW STRINGS
function raw(strings, ...values) {
  console.log(strings.raw); // Raw strings (escape sequences not processed)
  return String.raw(strings, ...values);
}

const path = raw`C:\Users\John\Documents`;
console.log(path); // 'C:\Users\John\Documents' (backslashes preserved)

// PRACTICAL EXAMPLES

// URL builder
function buildUrl(baseUrl, params) {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  
  return `${baseUrl}?${queryString}`;
}

const url = buildUrl('https://api.example.com/search', {
  query: 'javascript',
  page: 1,
  limit: 10
});
console.log(url);

// JSON formatter
function formatJSON(obj) {
  return `
<pre>
${JSON.stringify(obj, null, 2)}
</pre>
  `.trim();
}

const data = { name: 'John', age: 30 };
console.log(formatJSON(data));

// Conditional includes
const features = {
  premium: true,
  admin: false
};

const description = `
  User has access to:
  - Basic features
  ${features.premium ? '- Premium features' : ''}
  ${features.admin ? '- Admin panel' : ''}
`.trim();

console.log(description);
```

---

## 13. DOM & Browser APIs

### Q13.1: Explain event delegation

**Answer:**

```javascript
// EVENT DELEGATION: Attach listener to parent instead of each child

// Bad approach - many listeners
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', function() {
    console.log('Item clicked:', this.textContent);
  });
});

// Good approach - single listener
document.querySelector('.list').addEventListener('click', function(e) {
  if (e.target.classList.contains('item')) {
    console.log('Item clicked:', e.target.textContent);
  }
});

// Benefits:
// 1. Better performance (fewer event listeners)
// 2. Works for dynamically added elements
// 3. Less memory usage

// Practical example: Todo list
class TodoList {
  constructor(listElement) {
    this.listElement = listElement;
    this.attachEventListeners();
  }
  
  attachEventListeners() {
    // Single listener for all actions
    this.listElement.addEventListener('click', (e) => {
      const target = e.target;
      
      // Delete button
      if (target.classList.contains('delete-btn')) {
        this.deleteTodo(target.closest('.todo-item'));
      }
      
      // Complete checkbox
      if (target.classList.contains('complete-checkbox')) {
        this.toggleComplete(target.closest('.todo-item'));
      }
      
      // Edit button
      if (target.classList.contains('edit-btn')) {
        this.editTodo(target.closest('.todo-item'));
      }
    });
  }
  
  addTodo(text) {
    const html = `
      <li class="todo-item">
        <input type="checkbox" class="complete-checkbox">
        <span class="todo-text">${text}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </li>
    `;
    this.listElement.insertAdjacentHTML('beforeend', html);
  }
  
  deleteTodo(item) {
    item.remove();
  }
  
  toggleComplete(item) {
    item.classList.toggle('completed');
  }
  
  editTodo(item) {
    const textElement = item.querySelector('.todo-text');
    const currentText = textElement.textContent;
    const newText = prompt('Edit todo:', currentText);
    if (newText) {
      textElement.textContent = newText;
    }
  }
}

// Usage
const todoList = new TodoList(document.querySelector('#todo-list'));

// Dynamically added items automatically work!
document.querySelector('#add-btn').addEventListener('click', () => {
  const input = document.querySelector('#todo-input');
  todoList.addTodo(input.value);
  input.value = '';
});

// Event delegation with data attributes
document.querySelector('#menu').addEventListener('click', (e) => {
  const action = e.target.dataset.action;
  
  switch(action) {
    case 'save':
      console.log('Saving...');
      break;
    case 'delete':
      console.log('Deleting...');
      break;
    case 'edit':
      console.log('Editing...');
      break;
  }
});

// HTML:
// <div id="menu">
//   <button data-action="save">Save</button>
//   <button data-action="delete">Delete</button>
//   <button data-action="edit">Edit</button>
// </div>

// Closest() for nested elements
document.querySelector('.container').addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  
  if (card) {
    console.log('Card clicked:', card.dataset.id);
  }
});

// Preventing delegation when needed
document.querySelector('.parent').addEventListener('click', (e) => {
  if (e.target.classList.contains('no-delegate')) {
    e.stopPropagation(); // Stop event from bubbling
    return;
  }
  
  console.log('Parent handler');
});
```

---

### Q13.2: Explain event bubbling and capturing

**Answer:**

```javascript
// EVENT FLOW: Capturing → Target → Bubbling

/*
HTML structure:
<div id="outer">
  <div id="middle">
    <div id="inner">
      Click me!
    </div>
  </div>
</div>
*/

const outer = document.querySelector('#outer');
const middle = document.querySelector('#middle');
const inner = document.querySelector('#inner');

// BUBBLING (default) - from target to root
outer.addEventListener('click', () => console.log('Outer bubbling'));
middle.addEventListener('click', () => console.log('Middle bubbling'));
inner.addEventListener('click', () => console.log('Inner bubbling'));

// Click on inner:
// Output: Inner bubbling → Middle bubbling → Outer bubbling

// CAPTURING - from root to target
outer.addEventListener('click', () => console.log('Outer capturing'), true);
middle.addEventListener('click', () => console.log('Middle capturing'), true);
inner.addEventListener('click', () => console.log('Inner capturing'), true);

// Click on inner:
// Output: Outer capturing → Middle capturing → Inner capturing

// COMBINED (capturing + bubbling)
outer.addEventListener('click', () => console.log('Outer capturing'), true);
middle.addEventListener('click', () => console.log('Middle capturing'), true);
inner.addEventListener('click', () => console.log('Inner capturing'), true);

outer.addEventListener('click', () => console.log('Outer bubbling'));
middle.addEventListener('click', () => console.log('Middle bubbling'));
inner.addEventListener('click', () => console.log('Inner bubbling'));

// Click on inner:
// Output:
// Outer capturing
// Middle capturing
// Inner capturing
// Inner bubbling
// Middle bubbling
// Outer bubbling

// STOP PROPAGATION
middle.addEventListener('click', (e) => {
  console.log('Middle - stopping propagation');
  e.stopPropagation(); // Stops bubbling
});

inner.addEventListener('click', () => console.log('Inner'));

// Click on inner:
// Output: Inner → Middle - stopping propagation
// (Outer handler not called)

// STOP IMMEDIATE PROPAGATION
middle.addEventListener('click', (e) => {
  console.log('Middle handler 1');
  e.stopImmediatePropagation(); // Stops all handlers
});

middle.addEventListener('click', () => {
  console.log('Middle handler 2'); // Never called
});

// PREVENT DEFAULT
document.querySelector('a').addEventListener('click', (e) => {
  e.preventDefault(); // Prevents link navigation
  console.log('Link clicked but not navigated');
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevents form submission
  console.log('Form submit prevented');
  
  // Custom submission logic
  const formData = new FormData(e.target);
  console.log(Object.fromEntries(formData));
});

// EVENT DELEGATION WITH BUBBLING
document.querySelector('.list').addEventListener('click', (e) => {
  // Event bubbles up from child to parent
  if (e.target.classList.contains('item')) {
    console.log('Item clicked');
  }
});

// CAPTURING USE CASE: Global handler before specific ones
document.addEventListener('click', (e) => {
  console.log('Document clicked (capturing) - runs first');
  
  // Can inspect or modify event before it reaches target
  if (e.target.disabled) {
    e.stopPropagation();
    e.preventDefault();
    console.log('Disabled element clicked');
  }
}, true); // Capturing phase

// PRACTICAL EXAMPLE: Modal
class Modal {
  constructor(modalElement) {
    this.modal = modalElement;
    this.setupListeners();
  }
  
  setupListeners() {
    // Close on outside click (bubbling)
    document.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    // Prevent clicks inside modal from closing it
    this.modal.querySelector('.modal-content').addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    // Close button
    this.modal.querySelector('.close-btn').addEventListener('click', () => {
      this.close();
    });
  }
  
  open() {
    this.modal.style.display = 'block';
  }
  
  close() {
    this.modal.style.display = 'none';
  }
}

// EVENT PHASES
document.addEventListener('click', (e) => {
  console.log('Event phase:', e.eventPhase);
  // 1 = CAPTURING_PHASE
  // 2 = AT_TARGET
  // 3 = BUBBLING_PHASE
  
  console.log('Current target:', e.currentTarget); // Element with listener
  console.log('Target:', e.target); // Element that triggered event
});
```

---

## 14. Tricky Questions

### Q14.1: What will be the output?

```javascript
// QUESTION 1
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}

// Output: 3, 3, 3
// Reason: var is function-scoped, by the time setTimeout runs, loop is done, i = 3

// Fix 1: Use let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 0, 1, 2

// Fix 2: IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 1000);
  })(i);
}
// Output: 0, 1, 2

// QUESTION 2
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);

// Output: 1, 4, 3, 2
// Reason: Microtasks (Promises) run before Macrotasks (setTimeout)

// QUESTION 3
const obj = {
  a: 1,
  b: function() {
    console.log(this.a);
  },
  c: () => {
    console.log(this.a);
  }
};

obj.b(); // 1 (this = obj)
obj.c(); // undefined (arrow function, this = outer scope)

const b = obj.b;
const c = obj.c;
b(); // undefined (this = window/global)
c(); // undefined (arrow function)

// QUESTION 4
console.log(typeof null);          // 'object' (bug in JS)
console.log(typeof undefined);     // 'undefined'
console.log(typeof NaN);          // 'number'
console.log(NaN === NaN);         // false
console.log(typeof []);           // 'object'
console.log(Array.isArray([]));   // true

// QUESTION 5
console.log(0.1 + 0.2 === 0.3);   // false
console.log(0.1 + 0.2);           // 0.30000000000000004
// Reason: Floating point precision

// Fix:
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true

// QUESTION 6
const a = [1, 2, 3];
const b = [1, 2, 3];
const c = a;

console.log(a == b);  // false (different references)
console.log(a === b); // false
console.log(a == c);  // true (same reference)
console.log(a === c); // true

// QUESTION 7
console.log([] + []);       // '' (empty string)
console.log([] + {});       // '[object Object]'
console.log({} + []);       // '[object Object]'
console.log({} + {});       // '[object Object][object Object]'
console.log(true + false);  // 1
console.log(true + true);   // 2
console.log('5' + 3);       // '53'
console.log('5' - 3);       // 2

// QUESTION 8
console.log(typeof typeof 1); // 'string'
// typeof 1 = 'number', typeof 'number' = 'string'

// QUESTION 9
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers.length);        // 11
console.log(numbers[5]);            // undefined
console.log(numbers);               // [1, 2, 3, empty × 7, 11]

// QUESTION 10
const person = { name: 'John' };
Object.freeze(person);
person.name = 'Jane';  // Silently fails (strict mode throws error)
console.log(person.name); // 'John'

person.age = 30;       // Silently fails
console.log(person.age); // undefined

// But nested objects are not frozen
const user = { 
  name: 'John',
  address: { city: 'NYC' }
};
Object.freeze(user);
user.address.city = 'LA'; // Works!
console.log(user.address.city); // 'LA'
```

---

### Q14.2: Implement JavaScript quirks

**Answer:**

```javascript
// QUIRK 1: Function hoisting vs variable hoisting
console.log(foo);     // [Function: foo]
console.log(bar);     // undefined

function foo() {
  return 'foo';
}

var bar = function() {
  return 'bar';
};

// QUIRK 2: Variable shadowing
let x = 10;

function test() {
  console.log(x); // undefined (not 10!)
  let x = 20;
  console.log(x); // 20
}

// QUIRK 3: Automatic Semicolon Insertion
function example() {
  return
  {
    name: 'John'
  }
}

console.log(example()); // undefined (semicolon inserted after return)

// Correct:
function example2() {
  return {
    name: 'John'
  };
}

// QUIRK 4: Type coercion with ==
console.log('' == '0');          // false
console.log(0 == '');            // true
console.log(0 == '0');           // true
console.log(false == 'false');   // false
console.log(false == '0');       // true
console.log(false == undefined); // false
console.log(false == null);      // false
console.log(null == undefined);  // true

// QUIRK 5: Math.max() vs Math.min()
console.log(Math.max());         // -Infinity
console.log(Math.min());         // Infinity
// Reason: Math.max() returns smallest possible value if no args

// QUIRK 6: Array comparisons
console.log([1] == 1);           // true
console.log([1, 2] == '1,2');    // true
console.log([] == false);        // true
console.log(!![]);               // true (but [] == false!)

// QUIRK 7: This in nested functions
const obj = {
  name: 'Object',
  method: function() {
    console.log(this.name); // 'Object'
    
    function inner() {
      console.log(this.name); // undefined (this = global)
    }
    inner();
    
    const arrowInner = () => {
      console.log(this.name); // 'Object' (lexical this)
    };
    arrowInner();
  }
};

obj.method();

// QUIRK 8: parseInt with array.map
console.log(['1', '2', '3'].map(parseInt));
// Expected: [1, 2, 3]
// Actual: [1, NaN, NaN]
// Reason: parseInt(string, radix), map passes (element, index, array)

// Fix:
console.log(['1', '2', '3'].map(num => parseInt(num, 10))); // [1, 2, 3]

// QUIRK 9: Void operator
function foo() {
  return 123;
}

console.log(foo());      // 123
console.log(void foo()); // undefined

// QUIRK 10: Constructor without new
function Person(name) {
  this.name = name;
}

const person1 = new Person('John');
console.log(person1.name); // 'John'

const person2 = Person('Jane');
console.log(person2);      // undefined
console.log(window.name);  // 'Jane' (accidentally global!)

// Fix:
function SafePerson(name) {
  if (!(this instanceof SafePerson)) {
    return new SafePerson(name);
  }
  this.name = name;
}

const person3 = SafePerson('Bob');
console.log(person3.name); // 'Bob'
```

---

## Summary & Best Practices

### Key Takeaways:

1. **Always use `const` by default, `let` when needed, avoid `var`**
2. **Use strict equality (`===`) instead of loose equality (`==`)**
3. **Understand `this` context and use arrow functions appropriately**
4. **Master async/await and Promises for async operations**
5. **Implement polyfills to understand how built-in methods work**
6. **Use closures wisely to create private variables**
7. **Understand prototypal inheritance and use ES6 classes**
8. **Optimize performance: debounce/throttle, event delegation, lazy loading**
9. **Prevent memory leaks: clean up listeners, timers, references**
10. **Use modern ES6+ features: destructuring, spread/rest, template literals**

### Study Strategy:

1. **Read each section thoroughly**
2. **Type out all code examples (don't copy-paste)**
3. **Explain concepts out loud**
4. **Solve coding problems daily**
5. **Build projects using these concepts**
6. **Review tricky questions regularly**

### Interview Preparation Checklist:

- [ ] Core JavaScript concepts
- [ ] Closures and scope
- [ ] Promises and async/await
- [ ] Prototypes and inheritance
- [ ] Event loop
- [ ] Array methods
- [ ] OOP principles
- [ ] Polyfills implementation
- [ ] Common coding problems
- [ ] Design patterns
- [ ] Performance optimization
- [ ] ES6+ features
- [ ] DOM manipulation
- [ ] Tricky questions

---

**Good luck with your interviews! 🚀**
