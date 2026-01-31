# Closures in JavaScript

## Table of Contents
1. [Theory](#theory)
2. [How Closures Work](#how-closures-work)
3. [Practical Examples](#practical-examples)
4. [Common Use Cases](#common-use-cases)
5. [Interview Questions](#interview-questions)
6. [Problems & Solutions](#problems--solutions)
7. [Common Mistakes](#common-mistakes)

---

## Theory

### What is a Closure?

A **closure** is a function that has access to variables in its outer (enclosing) function's scope, even after the outer function has returned.

**Simple Definition**: A closure is created when a function "remembers" its lexical scope.

### Key Concepts:

1. **Lexical Scoping**: Inner functions have access to outer function variables
2. **Function Bundling**: Function + its lexical environment = Closure
3. **Memory Persistence**: Variables are kept alive as long as closure exists

---

## How Closures Work

### Basic Closure

```javascript
function outer() {
  const message = "Hello from outer!";
  
  function inner() {
    console.log(message); // Can access outer's variable
  }
  
  return inner;
}

const myClosure = outer();
myClosure(); // "Hello from outer!"

// Even though outer() has finished executing,
// inner() still has access to 'message'
```

### Execution Context Explained

```javascript
function makeCounter() {
  let count = 0; // Private variable
  
  return function() {
    count++;
    return count;
  };
}

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

console.log(counter2()); // 1 (separate closure!)
console.log(counter2()); // 2

// Each call to makeCounter() creates a new closure
// with its own 'count' variable
```

### Multiple Closures

```javascript
function createFunctions() {
  const name = "JavaScript";
  
  function greet() {
    console.log(`Hello, ${name}!`);
  }
  
  function bye() {
    console.log(`Goodbye, ${name}!`);
  }
  
  return { greet, bye };
}

const funcs = createFunctions();
funcs.greet(); // "Hello, JavaScript!"
funcs.bye();   // "Goodbye, JavaScript!"

// Both functions share the same closure
```

---

## Practical Examples

### Example 1: Private Variables

```javascript
function createPerson(name) {
  let age = 0; // Private
  
  return {
    getName: function() {
      return name;
    },
    
    getAge: function() {
      return age;
    },
    
    setAge: function(newAge) {
      if (newAge > 0 && newAge < 150) {
        age = newAge;
      }
    },
    
    celebrateBirthday: function() {
      age++;
      console.log(`Happy ${age}th birthday, ${name}!`);
    }
  };
}

const person = createPerson("John");
console.log(person.getName()); // "John"
person.setAge(25);
console.log(person.getAge()); // 25
person.celebrateBirthday(); // "Happy 26th birthday, John!"
console.log(person.age); // undefined (private!)
```

### Example 2: Function Factory

```javascript
function multiplyBy(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);
const quadruple = multiplyBy(4);

console.log(double(5));     // 10
console.log(triple(5));     // 15
console.log(quadruple(5));  // 20

// Each function "remembers" its multiplier
```

### Example 3: Event Handlers

```javascript
function attachEventHandlers() {
  const buttons = document.querySelectorAll('.btn');
  
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      console.log(`Button ${i} clicked`); // Closure over 'i'
    });
  }
}

// With var (common mistake):
function attachEventHandlersBad() {
  const buttons = document.querySelectorAll('.btn');
  
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      console.log(`Button ${i} clicked`); // Always prints last value!
    });
  }
}

// Fix with IIFE:
function attachEventHandlersFix() {
  const buttons = document.querySelectorAll('.btn');
  
  for (var i = 0; i < buttons.length; i++) {
    (function(index) {
      buttons[index].addEventListener('click', function() {
        console.log(`Button ${index} clicked`); // Correct!
      });
    })(i);
  }
}
```

### Example 4: Memoization

```javascript
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache[key]) {
      console.log('Returning cached result');
      return cache[key];
    }
    
    console.log('Computing result');
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function expensiveOperation(n) {
  // Simulate expensive computation
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
}

const memoizedOp = memoize(expensiveOperation);

console.log(memoizedOp(1000000)); // Computing result
console.log(memoizedOp(1000000)); // Returning cached result
```

---

## Common Use Cases

### 1. Module Pattern

```javascript
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
      return this;
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
    
    divide: function(x) {
      if (x === 0) {
        log('Cannot divide by zero');
        return this;
      }
      result /= x;
      log(`Divided by ${x}, result: ${result}`);
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
```

### 2. Data Privacy

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  const transactions = [];
  
  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
        transactions.push({ type: 'deposit', amount, date: new Date() });
        return balance;
      }
      throw new Error('Invalid deposit amount');
    },
    
    withdraw: function(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        transactions.push({ type: 'withdraw', amount, date: new Date() });
        return balance;
      }
      throw new Error('Invalid withdrawal amount');
    },
    
    getBalance: function() {
      return balance;
    },
    
    getTransactionHistory: function() {
      return [...transactions]; // Return copy, not reference
    }
  };
}

const account = createBankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance()); // 1300
console.log(account.balance); // undefined (private!)
```

### 3. Partial Application

```javascript
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, 'Hello');
const sayHi = partial(greet, 'Hi');

console.log(sayHello('John'));  // "Hello, John!"
console.log(sayHi('Jane'));     // "Hi, Jane!"
```

### 4. Callback Functions

```javascript
function fetchData(url, callback) {
  const data = { id: 1, name: 'John' };
  
  setTimeout(() => {
    callback(data); // Closure over 'url'
    console.log(`Fetched from: ${url}`);
  }, 1000);
}

const apiUrl = 'https://api.example.com/users';

fetchData(apiUrl, function(result) {
  console.log('Data:', result);
  console.log('URL was:', apiUrl); // Closure!
});
```

---

## Interview Questions

### Q1: What will be the output?

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

**Answer:** `5 5 5 5 5`

**Explanation:** `var` is function-scoped. By the time setTimeout callbacks run, loop is finished and `i` is 5.

**Solutions:**

```javascript
// Solution 1: Use let
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // 0 1 2 3 4
  }, 1000);
}

// Solution 2: IIFE
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // 0 1 2 3 4
    }, 1000);
  })(i);
}

// Solution 3: Pass parameter
for (var i = 0; i < 5; i++) {
  setTimeout(function(j) {
    console.log(j); // 0 1 2 3 4
  }, 1000, i);
}
```

---

### Q2: Create a counter using closures

```javascript
function createCounter() {
  let count = 0;
  
  return {
    increment: function() {
      return ++count;
    },
    decrement: function() {
      return --count;
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
console.log(counter.getCount());  // 1
```

---

### Q3: What's wrong with this code?

```javascript
function createFunctions() {
  const funcs = [];
  
  for (var i = 0; i < 3; i++) {
    funcs.push(function() {
      return i;
    });
  }
  
  return funcs;
}

const functions = createFunctions();
console.log(functions[0]()); // ?
console.log(functions[1]()); // ?
console.log(functions[2]()); // ?
```

**Answer:** All print `3`

**Fix:**
```javascript
function createFunctions() {
  const funcs = [];
  
  for (let i = 0; i < 3; i++) {
    funcs.push(function() {
      return i;
    });
  }
  
  return funcs;
}

// Or with IIFE:
function createFunctions() {
  const funcs = [];
  
  for (var i = 0; i < 3; i++) {
    funcs.push((function(index) {
      return function() {
        return index;
      };
    })(i));
  }
  
  return funcs;
}
```

---

### Q4: Implement a function that runs only once

```javascript
function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = fn(...args);
      return result;
    }
    return result;
  };
}

const initialize = once(() => {
  console.log('Initialized!');
  return 'done';
});

console.log(initialize()); // "Initialized!" "done"
console.log(initialize()); // "done" (no log)
console.log(initialize()); // "done" (no log)
```

---

### Q5: Create a private counter

```javascript
function createSecureCounter() {
  let count = 0;
  const secret = 'secret123';
  
  return {
    increment: function(key) {
      if (key === secret) {
        return ++count;
      }
      throw new Error('Invalid key');
    },
    
    getCount: function(key) {
      if (key === secret) {
        return count;
      }
      throw new Error('Invalid key');
    }
  };
}

const counter = createSecureCounter();
console.log(counter.increment('secret123')); // 1
console.log(counter.increment('wrong')); // Error
```

---

## Problems & Solutions

### Problem 1: Rate Limiter

Create a function that limits how many times a function can be called.

```javascript
function rateLimiter(fn, maxCalls, timeWindow) {
  let calls = 0;
  let startTime = Date.now();
  
  return function(...args) {
    const now = Date.now();
    
    // Reset if time window has passed
    if (now - startTime > timeWindow) {
      calls = 0;
      startTime = now;
    }
    
    if (calls < maxCalls) {
      calls++;
      return fn(...args);
    }
    
    throw new Error('Rate limit exceeded');
  };
}

const limitedFetch = rateLimiter(
  (url) => console.log(`Fetching ${url}`),
  3,
  10000 // 3 calls per 10 seconds
);

limitedFetch('url1'); // Works
limitedFetch('url2'); // Works
limitedFetch('url3'); // Works
limitedFetch('url4'); // Error
```

### Problem 2: Function Queue

Create a function that queues function calls.

```javascript
function createQueue() {
  const queue = [];
  let processing = false;
  
  async function processQueue() {
    if (processing || queue.length === 0) return;
    
    processing = true;
    const fn = queue.shift();
    
    await fn();
    
    processing = false;
    processQueue(); // Process next
  }
  
  return {
    enqueue: function(fn) {
      queue.push(fn);
      processQueue();
    },
    
    getSize: function() {
      return queue.length;
    }
  };
}

const taskQueue = createQueue();

taskQueue.enqueue(async () => {
  console.log('Task 1');
  await new Promise(resolve => setTimeout(resolve, 1000));
});

taskQueue.enqueue(async () => {
  console.log('Task 2');
});
```

### Problem 3: Debounce with Closure

```javascript
function debounce(fn, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const searchAPI = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 500);

// User types: "hello"
searchAPI('h');
searchAPI('he');
searchAPI('hel');
searchAPI('hell');
searchAPI('hello'); // Only this call executes after 500ms
```

### Problem 4: Create a Cycle Function

```javascript
function cycle(...values) {
  let index = 0;
  
  return function() {
    const value = values[index];
    index = (index + 1) % values.length;
    return value;
  };
}

const getCycle = cycle('red', 'green', 'blue');

console.log(getCycle()); // 'red'
console.log(getCycle()); // 'green'
console.log(getCycle()); // 'blue'
console.log(getCycle()); // 'red'
console.log(getCycle()); // 'green'
```

### Problem 5: Implement `setTimeout` with Closure

```javascript
function mySetTimeout(callback, delay) {
  const start = Date.now();
  
  function check() {
    if (Date.now() - start >= delay) {
      callback();
    } else {
      requestAnimationFrame(check);
    }
  }
  
  requestAnimationFrame(check);
}

mySetTimeout(() => {
  console.log('Executed after 2 seconds');
}, 2000);
```

---

## Common Mistakes

### Mistake 1: Memory Leaks

```javascript
// Bad - creates memory leak
function attachHandler() {
  const largeData = new Array(1000000).fill('data');
  
  document.getElementById('button').addEventListener('click', function() {
    console.log('Clicked');
    // This closure keeps reference to largeData!
  });
}

// Good - only keep what's needed
function attachHandler() {
  const largeData = new Array(1000000).fill('data');
  const needed = largeData[0]; // Extract only what's needed
  
  document.getElementById('button').addEventListener('click', function() {
    console.log('Clicked', needed);
  });
}
```

### Mistake 2: Accidental Globals

```javascript
function createCounter() {
  count = 0; // Missing 'let/const/var' - creates global!
  
  return function() {
    return ++count;
  };
}
```

### Mistake 3: Circular References

```javascript
function createCircular() {
  const obj = {
    data: 'some data'
  };
  
  obj.ref = function() {
    return obj; // Circular reference
  };
  
  return obj;
}

// Modern JS handles this, but be aware
```

---

## Summary

### Key Points:

1. Closures give access to outer function's scope
2. Created when function is defined, not when executed
3. Each closure has its own environment
4. Used for data privacy and encapsulation
5. Enable powerful patterns like modules and factories
6. Can cause memory leaks if not careful

### When to Use Closures:

✅ Data privacy  
✅ Function factories  
✅ Callbacks and event handlers  
✅ Memoization  
✅ Module pattern  
✅ Partial application  

### Best Practices:

✅ Keep closures small and focused  
✅ Avoid capturing large data unnecessarily  
✅ Clean up event listeners  
✅ Use `let`/`const` instead of `var`  
✅ Be mindful of memory usage  

---

**Practice:** Try implementing these patterns yourself to master closures!
