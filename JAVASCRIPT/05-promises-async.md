# Promises & Async Programming

## Table of Contents
1. [Promise Theory](#promise-theory)
2. [Promise States](#promise-states)
3. [Promise Methods](#promise-methods)
4. [Async/Await](#asyncawait)
5. [Promise Implementation](#promise-implementation)
6. [Interview Problems](#interview-problems)
7. [Error Handling](#error-handling)
8. [Advanced Patterns](#advanced-patterns)

---

## Promise Theory

### What is a Promise?

A **Promise** is an object representing the eventual completion or failure of an asynchronous operation.

**Three States:**
1. **Pending**: Initial state, neither fulfilled nor rejected
2. **Fulfilled**: Operation completed successfully
3. **Rejected**: Operation failed

```javascript
// Creating a Promise
const promise = new Promise((resolve, reject) => {
  // Asynchronous operation
  setTimeout(() => {
    const success = true;
    
    if (success) {
      resolve('Operation successful!'); // Fulfilled
    } else {
      reject('Operation failed!'); // Rejected
    }
  }, 1000);
});

// Consuming a Promise
promise
  .then(result => console.log(result)) // Fulfilled handler
  .catch(error => console.error(error)) // Rejected handler
  .finally(() => console.log('Cleanup')); // Always runs
```

### Why Promises?

**Before Promises (Callback Hell):**
```javascript
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        getMoreData(d, function(e) {
          // ... callback hell
        });
      });
    });
  });
});
```

**With Promises:**
```javascript
getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .then(c => getMoreData(c))
  .then(d => getMoreData(d))
  .then(e => console.log(e))
  .catch(error => console.error(error));
```

---

## Promise States

### State Transitions

```javascript
// Pending → Fulfilled
const fulfilled = new Promise((resolve) => {
  resolve('Success!');
});

// Pending → Rejected
const rejected = new Promise((resolve, reject) => {
  reject('Error!');
});

// Once settled (fulfilled/rejected), state cannot change
const promise = new Promise((resolve, reject) => {
  resolve('First');
  resolve('Second'); // Ignored
  reject('Error');   // Ignored
});

promise.then(console.log); // "First"
```

### Checking Promise State

```javascript
// Promises don't have a built-in way to check state
// But we can create a wrapper:

function getPromiseState(promise) {
  const pending = { state: 'pending' };
  
  return Promise.race([promise, pending])
    .then(
      value => (value === pending ? pending : { state: 'fulfilled', value }),
      reason => ({ state: 'rejected', reason })
    );
}

// Usage
const promise = new Promise(resolve => setTimeout(() => resolve('done'), 1000));

getPromiseState(promise).then(console.log); // { state: 'pending' }

setTimeout(() => {
  getPromiseState(promise).then(console.log); // { state: 'fulfilled', value: 'done' }
}, 2000);
```

---

## Promise Methods

### 1. Promise.resolve()

```javascript
// Create immediately fulfilled promise
const promise1 = Promise.resolve('Immediate value');
promise1.then(console.log); // 'Immediate value'

// If value is a promise, returns it
const promise2 = Promise.resolve(promise1);
console.log(promise1 === promise2); // true

// If value is a thenable, converts it
const thenable = {
  then: function(resolve) {
    resolve('thenable value');
  }
};

Promise.resolve(thenable).then(console.log); // 'thenable value'
```

### 2. Promise.reject()

```javascript
// Create immediately rejected promise
const promise = Promise.reject('Error occurred');

promise.catch(error => console.error(error)); // 'Error occurred'

// Common use: Input validation
function validateUser(user) {
  if (!user.name) {
    return Promise.reject('Name is required');
  }
  return Promise.resolve(user);
}
```

### 3. Promise.all()

**Waits for all promises to fulfill (or first to reject)**

```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = new Promise(resolve => 
  setTimeout(() => resolve(3), 1000)
);

Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results)) // [1, 2, 3]
  .catch(error => console.error(error));

// If any promise rejects:
const promises = [
  Promise.resolve(1),
  Promise.reject('Error!'),
  Promise.resolve(3)
];

Promise.all(promises)
  .then(results => console.log(results))
  .catch(error => console.error(error)); // 'Error!'

// Practical Example: Multiple API calls
async function loadUserData(userId) {
  const [user, posts, comments] = await Promise.all([
    fetch(`/api/users/${userId}`),
    fetch(`/api/posts?userId=${userId}`),
    fetch(`/api/comments?userId=${userId}`)
  ]);
  
  return { user, posts, comments };
}
```

### 4. Promise.race()

**Returns first promise to settle (fulfill or reject)**

```javascript
const slow = new Promise(resolve => 
  setTimeout(() => resolve('slow'), 3000)
);

const fast = new Promise(resolve => 
  setTimeout(() => resolve('fast'), 1000)
);

Promise.race([slow, fast])
  .then(result => console.log(result)); // 'fast'

// Practical Example: Timeout
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout!')), ms)
  );
  
  return Promise.race([promise, timeout]);
}

// Usage
const apiCall = fetch('/api/data');
withTimeout(apiCall, 5000)
  .then(data => console.log(data))
  .catch(error => console.error(error)); // 'Timeout!' if > 5s
```

### 5. Promise.allSettled()

**Waits for all promises to settle (doesn't reject early)**

```javascript
const promises = [
  Promise.resolve(1),
  Promise.reject('Error!'),
  Promise.resolve(3)
];

Promise.allSettled(promises)
  .then(results => console.log(results));

/* Output:
[
  { status: 'fulfilled', value: 1 },
  { status: 'rejected', reason: 'Error!' },
  { status: 'fulfilled', value: 3 }
]
*/

// Practical Example: Multiple independent operations
async function saveAllData(dataArray) {
  const results = await Promise.allSettled(
    dataArray.map(data => saveToDatabase(data))
  );
  
  const successful = results.filter(r => r.status === 'fulfilled');
  const failed = results.filter(r => r.status === 'rejected');
  
  console.log(`Saved: ${successful.length}, Failed: ${failed.length}`);
  return { successful, failed };
}
```

### 6. Promise.any()

**Returns first fulfilled promise (ignores rejections)**

```javascript
const promises = [
  Promise.reject('Error 1'),
  Promise.reject('Error 2'),
  Promise.resolve('Success!'),
  Promise.resolve('Another success')
];

Promise.any(promises)
  .then(result => console.log(result)) // 'Success!'
  .catch(error => console.error(error));

// If all reject:
const allRejected = [
  Promise.reject('Error 1'),
  Promise.reject('Error 2'),
  Promise.reject('Error 3')
];

Promise.any(allRejected)
  .catch(error => {
    console.log(error.errors); // ['Error 1', 'Error 2', 'Error 3']
  });

// Practical Example: Fastest server
async function getFastestResponse(urls) {
  const requests = urls.map(url => fetch(url));
  return Promise.any(requests);
}

const servers = [
  'https://api1.example.com/data',
  'https://api2.example.com/data',
  'https://api3.example.com/data'
];

getFastestResponse(servers)
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## Async/Await

### Basic Usage

```javascript
// Promise version
function fetchUserData() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(user => {
      console.log('User:', user);
      return fetch(`/api/posts?userId=${user.id}`);
    })
    .then(response => response.json())
    .then(posts => console.log('Posts:', posts))
    .catch(error => console.error(error));
}

// Async/Await version (much cleaner!)
async function fetchUserData() {
  try {
    const userResponse = await fetch('/api/user');
    const user = await userResponse.json();
    console.log('User:', user);
    
    const postsResponse = await fetch(`/api/posts?userId=${user.id}`);
    const posts = await postsResponse.json();
    console.log('Posts:', posts);
  } catch (error) {
    console.error(error);
  }
}
```

### Sequential vs Parallel

```javascript
// SEQUENTIAL (slow - waits for each)
async function sequential() {
  const user = await fetchUser();      // Wait 1s
  const posts = await fetchPosts();    // Wait 1s
  const comments = await fetchComments(); // Wait 1s
  // Total: ~3s
  return { user, posts, comments };
}

// PARALLEL (fast - all at once)
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);
  // Total: ~1s
  return { user, posts, comments };
}

// HYBRID (dependent operations)
async function hybrid() {
  const user = await fetchUser(); // Must wait
  
  // These can run in parallel
  const [posts, comments] = await Promise.all([
    fetchPosts(user.id),
    fetchComments(user.id)
  ]);
  
  return { user, posts, comments };
}
```

### Error Handling

```javascript
// Try-Catch
async function withTryCatch() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null; // fallback
  }
}

// .catch() method
async function withCatch() {
  const data = await fetchData().catch(error => {
    console.error('Error:', error);
    return null; // fallback
  });
  return data;
}

// Wrapper function
async function to(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

// Usage
async function example() {
  const [error, data] = await to(fetchData());
  
  if (error) {
    console.error(error);
    return;
  }
  
  console.log(data);
}
```

---

## Promise Implementation

### Complete Promise Polyfill

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
    onFulfilled = typeof onFulfilled === 'function' 
      ? onFulfilled 
      : value => value;
    onRejected = typeof onRejected === 'function' 
      ? onRejected 
      : reason => { throw reason; };
    
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      
      if (this.state === 'fulfilled') {
        fulfilledMicrotask();
      } else if (this.state === 'rejected') {
        rejectedMicrotask();
      } else {
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
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
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }
  
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
  
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument must be an array'));
      }
      
      const results = [];
      let completed = 0;
      
      if (promises.length === 0) return resolve(results);
      
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
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument must be an array'));
      }
      
      promises.forEach(promise => {
        MyPromise.resolve(promise).then(resolve).catch(reject);
      });
    });
  }
  
  static allSettled(promises) {
    return new MyPromise((resolve) => {
      if (!Array.isArray(promises)) return resolve([]);
      
      const results = [];
      let completed = 0;
      
      if (promises.length === 0) return resolve(results);
      
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise)
          .then(value => {
            results[index] = { status: 'fulfilled', value };
          })
          .catch(reason => {
            results[index] = { status: 'rejected', reason };
          })
          .finally(() => {
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          });
      });
    });
  }
  
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument must be an array'));
      }
      
      const errors = [];
      let rejected = 0;
      
      if (promises.length === 0) {
        return reject(new AggregateError([], 'All promises were rejected'));
      }
      
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise)
          .then(resolve)
          .catch(error => {
            errors[index] = error;
            rejected++;
            if (rejected === promises.length) {
              reject(new AggregateError(errors, 'All promises were rejected'));
            }
          });
      });
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected'));
  }
  
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let called = false;
    
    try {
      const then = x.then;
      
      if (typeof then === 'function') {
        then.call(
          x,
          value => {
            if (called) return;
            called = true;
            resolvePromise(promise2, value, resolve, reject);
          },
          reason => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}
```

---

## Interview Problems

### Problem 1: Implement Promise.all()

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }
    
    const results = [];
    let completed = 0;
    
    if (promises.length === 0) {
      return resolve(results);
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;
          
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

// Test
const p1 = Promise.resolve(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
const p3 = Promise.resolve(3);

promiseAll([p1, p2, p3]).then(console.log); // [1, 2, 3]
```

### Problem 2: Retry Failed Promise

```javascript
function retryPromise(promiseFn, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    function attempt(retriesLeft) {
      promiseFn()
        .then(resolve)
        .catch(error => {
          if (retriesLeft === 0) {
            reject(error);
          } else {
            console.log(`Retrying... (${retriesLeft} attempts left)`);
            setTimeout(() => {
              attempt(retriesLeft - 1);
            }, delay);
          }
        });
    }
    
    attempt(retries);
  });
}

// Test
let attempts = 0;
function flakyAPI() {
  return new Promise((resolve, reject) => {
    attempts++;
    if (attempts < 3) {
      reject(`Failed attempt ${attempts}`);
    } else {
      resolve('Success!');
    }
  });
}

retryPromise(flakyAPI, 5, 500)
  .then(console.log)
  .catch(console.error);
```

### Problem 3: Promise Queue

```javascript
class PromiseQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }
  
  enqueue(promiseFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ promiseFn, resolve, reject });
      this.dequeue();
    });
  }
  
  dequeue() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }
    
    const { promiseFn, resolve, reject } = this.queue.shift();
    this.running++;
    
    promiseFn()
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.running--;
        this.dequeue();
      });
  }
}

// Test
const queue = new PromiseQueue(2); // Max 2 concurrent

for (let i = 1; i <= 5; i++) {
  queue.enqueue(() => {
    console.log(`Task ${i} started`);
    return new Promise(resolve => 
      setTimeout(() => {
        console.log(`Task ${i} completed`);
        resolve(i);
      }, 1000)
    );
  });
}
```

### Problem 4: Promisify Callback Function

```javascript
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}

// Test - Node.js style callback
function readFile(path, callback) {
  setTimeout(() => {
    if (path) {
      callback(null, `Content of ${path}`);
    } else {
      callback(new Error('Path required'));
    }
  }, 100);
}

const readFilePromise = promisify(readFile);

readFilePromise('file.txt')
  .then(console.log)
  .catch(console.error);
```

### Problem 5: Promise.map with Concurrency

```javascript
async function promiseMap(items, mapper, concurrency = Infinity) {
  const results = [];
  const executing = [];
  
  for (const [index, item] of items.entries()) {
    const promise = Promise.resolve().then(() => mapper(item, index));
    results.push(promise);
    
    if (concurrency !== Infinity) {
      const execute = promise.then(() => {
        executing.splice(executing.indexOf(execute), 1);
      });
      
      executing.push(execute);
      
      if (executing.length >= concurrency) {
        await Promise.race(executing);
      }
    }
  }
  
  return Promise.all(results);
}

// Test
const urls = Array.from({ length: 10 }, (_, i) => `url-${i}`);

promiseMap(
  urls,
  async url => {
    console.log(`Fetching ${url}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Data from ${url}`;
  },
  3 // Max 3 concurrent requests
).then(console.log);
```

---

## Summary

### Key Concepts:

1. **Promises** represent async operations
2. **Three states**: pending, fulfilled, rejected
3. **Immutable**: Once settled, cannot change
4. **Chaining**: `.then()` returns new promise
5. **Error propagation**: Errors bubble up
6. **async/await**: Syntactic sugar over promises

### Promise Methods:

| Method | Behavior |
|--------|----------|
| `Promise.all()` | Reject on first rejection |
| `Promise.race()` | First to settle wins |
| `Promise.allSettled()` | Wait for all, never rejects |
| `Promise.any()` | First fulfilled wins |

### Best Practices:

✅ Always handle errors (`.catch()` or `try/catch`)  
✅ Use `Promise.all()` for parallel operations  
✅ Prefer `async/await` for readability  
✅ Don't forget `await` keyword  
✅ Return promises from `.then()` for chaining  
✅ Use `Promise.allSettled()` for independent operations  

---

**Master these concepts to handle async JavaScript like a pro!**
