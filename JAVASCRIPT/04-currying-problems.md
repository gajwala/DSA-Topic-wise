# Currying Problems & Solutions

## Table of Contents
1. [Theory](#theory)
2. [Basic Currying](#basic-currying)
3. [Advanced Currying](#advanced-currying)
4. [Interview Problems](#interview-problems)
5. [Real-World Applications](#real-world-applications)

---

## Theory

### What is Currying?

Currying is the technique of transforming a function that takes multiple arguments into a sequence of functions that each take a single argument.

```javascript
// Normal function
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3); // 6

// Curried function
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
curriedAdd(1)(2)(3); // 6
```

### Why Curry?

1. **Reusability**: Create specialized functions from general ones
2. **Composition**: Easier function composition
3. **Partial Application**: Apply arguments one at a time
4. **Flexibility**: More flexible API design

---

## Basic Currying

### Problem 1: Simple Curry Implementation

**Question:** Implement a curry function that works for any number of arguments.

```javascript
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
```

---

### Problem 2: Curry with Fixed Arguments

**Question:** Create a curry function that only accepts one argument at a time.

```javascript
function strictCurry(fn) {
  return function curried(arg) {
    if (curried.length === 0) {
      return fn();
    }
    
    const args = [arg];
    
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    
    return function(nextArg) {
      return curry(fn).apply(this, args.concat(nextArg));
    };
  };
}

// Test
function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = strictCurry(multiply);
console.log(curriedMultiply(2)(3)(4)); // 24
```

---

### Problem 3: Infinite Curry

**Question:** Implement curry that continues until called without arguments.

```javascript
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

// Test - Sum all numbers
const sum = infiniteCurry(function(...nums) {
  return nums.reduce((sum, n) => sum + n, 0);
});

console.log(sum(1)(2)(3)(4)()); // 10
console.log(sum(1, 2)(3)(4, 5)()); // 15
console.log(sum(1)(2, 3, 4)(5)()); // 15
```

---

### Problem 4: sum(1)(2)(3)...(n)

**Question:** Implement sum function that works like: `sum(1)(2)(3)()`

```javascript
function sum(a) {
  return function(b) {
    if (b !== undefined) {
      return sum(a + b);
    }
    return a;
  };
}

console.log(sum(1)(2)(3)(4)()); // 10
console.log(sum(5)(10)(15)()); // 30

// Alternative with toString
function sum2(a) {
  let currentSum = a;
  
  function add(b) {
    currentSum += b;
    return add;
  }
  
  add.toString = function() {
    return currentSum;
  };
  
  add.valueOf = function() {
    return currentSum;
  };
  
  return add;
}

console.log(sum2(1)(2)(3).valueOf()); // 6
console.log(+sum2(1)(2)(3)(4)); // 10 (unary + calls valueOf)
```

---

### Problem 5: evaluate("sum")(4)(2)

**Question:** Create a curry function that accepts an operation as first argument.

```javascript
function evaluate(operation) {
  return function(a) {
    return function(b) {
      switch(operation) {
        case 'sum':
          return a + b;
        case 'multiply':
          return a * b;
        case 'divide':
          return a / b;
        case 'subtract':
          return a - b;
        default:
          return 'Invalid operation';
      }
    };
  };
}

// Test
console.log(evaluate('sum')(4)(2));      // 6
console.log(evaluate('multiply')(4)(2)); // 8
console.log(evaluate('divide')(4)(2));   // 2
console.log(evaluate('subtract')(4)(2)); // 2

// More flexible version
function evaluateAdvanced(operation) {
  const operations = {
    sum: (a, b) => a + b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    subtract: (a, b) => a - b,
    power: (a, b) => Math.pow(a, b),
    modulo: (a, b) => a % b
  };
  
  return function(a) {
    return function(b) {
      return operations[operation]?.(a, b) ?? 'Invalid operation';
    };
  };
}

console.log(evaluateAdvanced('power')(2)(3)); // 8
console.log(evaluateAdvanced('modulo')(10)(3)); // 1
```

---

## Advanced Currying

### Problem 6: Curry with Placeholder

**Question:** Implement curry that supports placeholders.

```javascript
function curry(fn) {
  const _ = curry.placeholder;
  
  return function curried(...args) {
    // Check if we have placeholders
    const hasPlaceholder = args.some(arg => arg === _);
    
    if (!hasPlaceholder && args.length >= fn.length) {
      return fn.apply(this, args);
    }
    
    return function(...moreArgs) {
      // Replace placeholders with new arguments
      const newArgs = args.map(arg => arg === _ && moreArgs.length ? moreArgs.shift() : arg);
      
      return curried(...newArgs, ...moreArgs);
    };
  };
}

curry.placeholder = Symbol('placeholder');
const _ = curry.placeholder;

// Test
function volume(l, w, h) {
  return l * w * h;
}

const curriedVolume = curry(volume);

console.log(curriedVolume(2)(3)(4));        // 24
console.log(curriedVolume(_, 3, 4)(2));     // 24
console.log(curriedVolume(2, _, 4)(3));     // 24
console.log(curriedVolume(_, _, 4)(2, 3));  // 24
```

---

### Problem 7: Pipe with Currying

**Question:** Create a pipe function using currying.

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

function pipe(...fns) {
  return function(value) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}

// Curried helper functions
const add = curry((a, b) => a + b);
const multiply = curry((a, b) => a * b);
const subtract = curry((a, b) => a - b);

// Create pipeline
const compute = pipe(
  add(10),
  multiply(2),
  subtract(5)
);

console.log(compute(5)); // (5 + 10) * 2 - 5 = 25

// More complex example
const processData = pipe(
  add(5),
  multiply(2),
  x => x - 10,
  x => x / 2
);

console.log(processData(10)); // ((10 + 5) * 2 - 10) / 2 = 10
```

---

### Problem 8: Compose with Currying

**Question:** Implement compose (right-to-left) with currying.

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

function compose(...fns) {
  return function(value) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
}

// Curried functions
const add = curry((a, b) => a + b);
const multiply = curry((a, b) => a * b);
const divide = curry((a, b) => a / b);

// Compose (right to left)
const calculate = compose(
  add(5),        // Last: add 5
  multiply(2),   // Second: multiply by 2
  divide(10)     // First: divide by 10
);

console.log(calculate(100)); // (100 / 10) * 2 + 5 = 25
```

---

### Problem 9: Memoized Curry

**Question:** Implement curry with memoization.

```javascript
function memoizedCurry(fn) {
  const cache = new Map();
  
  return function curried(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('Cached result');
      return cache.get(key);
    }
    
    if (args.length >= fn.length) {
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    }
    
    return function(...moreArgs) {
      return curried(...args, ...moreArgs);
    };
  };
}

// Expensive computation
function expensiveComputation(a, b, c) {
  console.log('Computing...');
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += a + b + c;
  }
  return result;
}

const memoized = memoizedCurry(expensiveComputation);

console.log(memoized(1)(2)(3)); // Computing... [result]
console.log(memoized(1)(2)(3)); // Cached result [result]
console.log(memoized(1, 2)(3)); // Cached result [result]
```

---

### Problem 10: Async Curry

**Question:** Implement curry that works with async functions.

```javascript
function asyncCurry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    
    return function(...moreArgs) {
      return curried(...args, ...moreArgs);
    };
  };
}

// Async function
async function fetchUserData(userId, endpoint, options) {
  console.log(`Fetching ${endpoint} for user ${userId}`);
  
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        userId,
        endpoint,
        options,
        data: `Data for ${userId}`
      });
    }, 1000);
  });
}

const curriedFetch = asyncCurry(fetchUserData);

// Usage
(async () => {
  const fetchUser = curriedFetch(123);
  const fetchProfile = fetchUser('profile');
  
  const result = await fetchProfile({ cache: true });
  console.log(result);
})();

// Or
(async () => {
  const result = await curriedFetch(123)('settings')({ verbose: true });
  console.log(result);
})();
```

---

## Interview Problems

### Problem 11: Curry with Logging

**Question:** Add logging to track curry function calls.

```javascript
function curryWithLogging(fn, fnName = fn.name) {
  let callCount = 0;
  const argsList = [];
  
  return function curried(...args) {
    callCount++;
    argsList.push(args);
    
    console.log(`[${fnName}] Call #${callCount} with args:`, args);
    
    if (args.length >= fn.length) {
      console.log(`[${fnName}] Executing with all args:`, argsList.flat());
      const result = fn.apply(this, args);
      console.log(`[${fnName}] Result:`, result);
      return result;
    }
    
    return function(...moreArgs) {
      return curried(...args, ...moreArgs);
    };
  };
}

// Test
function sum(a, b, c) {
  return a + b + c;
}

const loggedSum = curryWithLogging(sum, 'SUM');
loggedSum(1)(2)(3);
```

---

### Problem 12: Partial Application vs Currying

**Question:** Explain and implement both.

```javascript
// CURRYING: Transform multi-arg function to nested single-arg functions
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

// PARTIAL APPLICATION: Fix some arguments, return function with remaining
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function greet(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
}

// Currying
const curriedGreet = curry(greet);
console.log(curriedGreet('Hello')('John')('!')); // "Hello, John!"

// Partial Application
const sayHello = partial(greet, 'Hello');
console.log(sayHello('John', '!')); // "Hello, John!"

const sayHelloJohn = partial(greet, 'Hello', 'John');
console.log(sayHelloJohn('!')); // "Hello, John!"
```

---

### Problem 13: Curry Array Methods

**Question:** Create curried versions of array methods.

```javascript
const curry = fn => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
};

// Curried map
const map = curry((fn, arr) => arr.map(fn));

// Curried filter
const filter = curry((fn, arr) => arr.filter(fn));

// Curried reduce
const reduce = curry((fn, initial, arr) => arr.reduce(fn, initial));

// Usage
const double = x => x * 2;
const isEven = x => x % 2 === 0;
const sum = (acc, x) => acc + x;

const numbers = [1, 2, 3, 4, 5];

console.log(map(double)(numbers));           // [2, 4, 6, 8, 10]
console.log(filter(isEven)(numbers));        // [2, 4]
console.log(reduce(sum, 0)(numbers));        // 15

// Compose operations
const pipe = (...fns) => val => fns.reduce((acc, fn) => fn(acc), val);

const process = pipe(
  map(double),
  filter(isEven),
  reduce(sum, 0)
);

console.log(process(numbers)); // 30
```

---

### Problem 14: Curry with Default Arguments

**Question:** Handle default arguments in curry.

```javascript
function curryWithDefaults(fn, defaults = {}) {
  return function curried(...args) {
    // Fill in defaults for missing arguments
    const filledArgs = args.map((arg, index) => 
      arg === undefined && defaults[index] !== undefined ? defaults[index] : arg
    );
    
    if (filledArgs.length >= fn.length) {
      return fn.apply(this, filledArgs);
    }
    
    return function(...moreArgs) {
      return curried(...filledArgs, ...moreArgs);
    };
  };
}

function createUser(name, age, city) {
  return { name, age, city };
}

const curriedUser = curryWithDefaults(createUser, {
  1: 25,        // default age
  2: 'Unknown'  // default city
});

console.log(curriedUser('John')()()); 
// { name: 'John', age: 25, city: 'Unknown' }

console.log(curriedUser('Jane')(30)('NYC')); 
// { name: 'Jane', age: 30, city: 'NYC' }
```

---

### Problem 15: Uncurry Function

**Question:** Convert curried function back to normal.

```javascript
function uncurry(fn, arity) {
  return function(...args) {
    let result = fn;
    
    for (let i = 0; i < args.length && typeof result === 'function'; i++) {
      result = result(args[i]);
    }
    
    return result;
  };
}

// Curried function
const curriedAdd = a => b => c => a + b + c;

// Uncurry
const add = uncurry(curriedAdd, 3);

console.log(add(1, 2, 3));    // 6
console.log(curriedAdd(1)(2)(3)); // 6
```

---

## Real-World Applications

### Application 1: API Request Builder

```javascript
const curry = fn => function curried(...args) {
  if (args.length >= fn.length) return fn.apply(this, args);
  return (...moreArgs) => curried(...args, ...moreArgs);
};

const apiRequest = curry((method, endpoint, headers, body) => {
  return {
    method,
    url: `https://api.example.com${endpoint}`,
    headers,
    body
  };
});

// Create specialized functions
const get = apiRequest('GET');
const post = apiRequest('POST');
const put = apiRequest('PUT');
const del = apiRequest('DELETE');

const withAuth = endpoint => headers => body => {
  return post(endpoint)({
    ...headers,
    'Authorization': 'Bearer token123'
  })(body);
};

// Usage
const createUser = withAuth('/users');
console.log(createUser({ 'Content-Type': 'application/json' })({ name: 'John' }));
```

---

### Application 2: Form Validator

```javascript
const curry = fn => function curried(...args) {
  if (args.length >= fn.length) return fn.apply(this, args);
  return (...moreArgs) => curried(...args, ...moreArgs);
};

const validate = curry((rules, field, value) => {
  return rules.every(rule => rule(value));
});

// Validation rules
const required = value => value !== '' && value != null;
const minLength = min => value => value.length >= min;
const maxLength = max => value => value.length <= max;
const pattern = regex => value => regex.test(value);

// Create validators
const validateEmail = validate([
  required,
  pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
]);

const validatePassword = validate([
  required,
  minLength(8),
  maxLength(20),
  pattern(/[A-Z]/), // uppercase
  pattern(/[0-9]/)  // number
]);

// Usage
console.log(validateEmail('email')('test@example.com')); // true
console.log(validatePassword('password')('Secure123')); // true
```

---

### Application 3: Event Handler Builder

```javascript
const curry = fn => function curried(...args) {
  if (args.length >= fn.length) return fn.apply(this, args);
  return (...moreArgs) => curried(...args, ...moreArgs);
};

const createHandler = curry((eventType, selector, handler) => {
  document.addEventListener(eventType, e => {
    if (e.target.matches(selector)) {
      handler(e);
    }
  });
});

// Create specialized handlers
const onClick = createHandler('click');
const onSubmit = createHandler('submit');
const onHover = createHandler('mouseenter');

// Usage
onClick('.button')(e => console.log('Button clicked'));
onClick('.link')(e => {
  e.preventDefault();
  console.log('Link clicked');
});

onSubmit('form')(e => {
  e.preventDefault();
  console.log('Form submitted');
});
```

---

## Summary

### Key Concepts:

1. **Currying** transforms multi-arg functions to nested single-arg functions
2. **Partial Application** fixes some arguments upfront
3. **Composition** becomes easier with curried functions
4. **Reusability** through specialized function creation
5. **Flexibility** in function application

### Common Patterns:

✅ Basic curry with `fn.length` check  
✅ Infinite curry until empty call  
✅ Placeholder support  
✅ Memoization for performance  
✅ Async curry for promises  
✅ Logging for debugging  

### When to Use:

- **Functional programming** patterns
- **Function composition** pipelines
- **Reusable utilities** creation
- **API builders** and DSLs
- **Configuration** functions

---

**Practice these problems to master currying!**
