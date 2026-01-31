# Polyfills Implementation

## Table of Contents
1. [Array Methods](#array-methods)
2. [Object Methods](#object-methods)
3. [Function Methods](#function-methods)
4. [Promise Implementation](#promise-implementation)
5. [String Methods](#string-methods)
6. [Additional Polyfills](#additional-polyfills)

---

## Array Methods

### 1. Array.prototype.map()

```javascript
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError('Array.prototype.map called on null or undefined');
    }
    
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const result = [];
    const O = Object(this);
    const len = O.length >>> 0; // Convert to unsigned 32-bit integer
    
    for (let i = 0; i < len; i++) {
      if (i in O) { // Check if property exists
        const value = O[i];
        const mappedValue = callback.call(thisArg, value, i, O);
        result[i] = mappedValue;
      }
    }
    
    return result;
  };
}

// Test
const nums = [1, 2, 3, 4, 5];
console.log(nums.myMap(x => x * 2)); // [2, 4, 6, 8, 10]
```

### 2. Array.prototype.filter()

```javascript
if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError('Array.prototype.filter called on null or undefined');
    }
    
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const result = [];
    const O = Object(this);
    const len = O.length >>> 0;
    
    for (let i = 0; i < len; i++) {
      if (i in O) {
        const value = O[i];
        if (callback.call(thisArg, value, i, O)) {
          result.push(value);
        }
      }
    }
    
    return result;
  };
}

// Test
const nums = [1, 2, 3, 4, 5, 6];
console.log(nums.myFilter(x => x % 2 === 0)); // [2, 4, 6]
```

### 3. Array.prototype.reduce()

```javascript
if (!Array.prototype.myReduce) {
  Array.prototype.myReduce = function(callback, initialValue) {
    if (this == null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }
    
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const O = Object(this);
    const len = O.length >>> 0;
    
    let accumulator;
    let k = 0;
    
    if (arguments.length >= 2) {
      accumulator = initialValue;
    } else {
      // Find first existing element
      while (k < len && !(k in O)) {
        k++;
      }
      
      if (k >= len) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      
      accumulator = O[k++];
    }
    
    while (k < len) {
      if (k in O) {
        accumulator = callback(accumulator, O[k], k, O);
      }
      k++;
    }
    
    return accumulator;
  };
}

// Test
const nums = [1, 2, 3, 4, 5];
console.log(nums.myReduce((sum, n) => sum + n, 0)); // 15
```

### 4. Array.prototype.forEach()

```javascript
if (!Array.prototype.myForEach) {
  Array.prototype.myForEach = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError('Array.prototype.forEach called on null or undefined');
    }
    
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const O = Object(this);
    const len = O.length >>> 0;
    
    for (let i = 0; i < len; i++) {
      if (i in O) {
        callback.call(thisArg, O[i], i, O);
      }
    }
  };
}

// Test
[1, 2, 3].myForEach(x => console.log(x * 2)); // 2, 4, 6
```

### 5. Array.prototype.find()

```javascript
if (!Array.prototype.myFind) {
  Array.prototype.myFind = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const O = Object(this);
    const len = O.length >>> 0;
    
    for (let i = 0; i < len; i++) {
      if (i in O) {
        const value = O[i];
        if (callback.call(thisArg, value, i, O)) {
          return value;
        }
      }
    }
    
    return undefined;
  };
}

// Test
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
console.log(users.myFind(u => u.id === 2)); // { id: 2 }
```

### 6. Array.prototype.findIndex()

```javascript
if (!Array.prototype.myFindIndex) {
  Array.prototype.myFindIndex = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const O = Object(this);
    const len = O.length >>> 0;
    
    for (let i = 0; i < len; i++) {
      if (i in O) {
        if (callback.call(thisArg, O[i], i, O)) {
          return i;
        }
      }
    }
    
    return -1;
  };
}
```

### 7. Array.prototype.some()

```javascript
if (!Array.prototype.mySome) {
  Array.prototype.mySome = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError('Array.prototype.some called on null or undefined');
    }
    
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const O = Object(this);
    const len = O.length >>> 0;
    
    for (let i = 0; i < len; i++) {
      if (i in O && callback.call(thisArg, O[i], i, O)) {
        return true;
      }
    }
    
    return false;
  };
}

// Test
console.log([1, 2, 3, 4].mySome(x => x > 3)); // true
```

### 8. Array.prototype.every()

```javascript
if (!Array.prototype.myEvery) {
  Array.prototype.myEvery = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError('Array.prototype.every called on null or undefined');
    }
    
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    const O = Object(this);
    const len = O.length >>> 0;
    
    for (let i = 0; i < len; i++) {
      if (i in O && !callback.call(thisArg, O[i], i, O)) {
        return false;
      }
    }
    
    return true;
  };
}

// Test
console.log([1, 2, 3, 4].myEvery(x => x > 0)); // true
```

### 9. Array.prototype.flat()

```javascript
if (!Array.prototype.myFlat) {
  Array.prototype.myFlat = function(depth = 1) {
    if (this == null) {
      throw new TypeError('Array.prototype.flat called on null or undefined');
    }
    
    const O = Object(this);
    const result = [];
    
    function flatten(arr, currentDepth) {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        
        if (Array.isArray(item) && currentDepth < depth) {
          flatten(item, currentDepth + 1);
        } else {
          result.push(item);
        }
      }
    }
    
    flatten(O, 0);
    return result;
  };
}

// Test
const nested = [1, [2, [3, [4, 5]]]];
console.log(nested.myFlat(1));      // [1, 2, [3, [4, 5]]]
console.log(nested.myFlat(2));      // [1, 2, 3, [4, 5]]
console.log(nested.myFlat(Infinity)); // [1, 2, 3, 4, 5]
```

### 10. Array.prototype.includes()

```javascript
if (!Array.prototype.myIncludes) {
  Array.prototype.myIncludes = function(searchElement, fromIndex = 0) {
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }
    
    const O = Object(this);
    const len = O.length >>> 0;
    
    if (len === 0) return false;
    
    let k = Math.max(fromIndex >= 0 ? fromIndex : len + fromIndex, 0);
    
    while (k < len) {
      const element = O[k];
      
      // Special handling for NaN
      if (element === searchElement || (Number.isNaN(element) && Number.isNaN(searchElement))) {
        return true;
      }
      
      k++;
    }
    
    return false;
  };
}

// Test
console.log([1, 2, 3, NaN].myIncludes(NaN)); // true
console.log([1, 2, 3].myIncludes(4)); // false
```

---

## Object Methods

### 1. Object.create()

```javascript
if (typeof Object.myCreate !== 'function') {
  Object.myCreate = function(proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object or null');
    }
    
    if (proto === null) {
      throw new Error('null prototype not supported in this polyfill');
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
const parent = { greet() { return 'Hello'; } };
const child = Object.myCreate(parent);
console.log(child.greet()); // 'Hello'
```

### 2. Object.assign()

```javascript
if (typeof Object.myAssign !== 'function') {
  Object.myAssign = function(target, ...sources) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    
    const to = Object(target);
    
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];
      
      if (source != null) {
        for (let key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            to[key] = source[key];
          }
        }
      }
    }
    
    return to;
  };
}

// Test
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = { c: 3 };
console.log(Object.myAssign(obj1, obj2, obj3)); // { a: 1, b: 2, c: 3 }
```

### 3. Object.keys()

```javascript
if (!Object.myKeys) {
  Object.myKeys = function(obj) {
    if (obj !== Object(obj)) {
      throw new TypeError('Object.keys called on non-object');
    }
    
    const keys = [];
    
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        keys.push(key);
      }
    }
    
    return keys;
  };
}

// Test
console.log(Object.myKeys({ a: 1, b: 2, c: 3 })); // ['a', 'b', 'c']
```

### 4. Object.values()

```javascript
if (!Object.myValues) {
  Object.myValues = function(obj) {
    if (obj !== Object(obj)) {
      throw new TypeError('Object.values called on non-object');
    }
    
    const values = [];
    
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        values.push(obj[key]);
      }
    }
    
    return values;
  };
}

// Test
console.log(Object.myValues({ a: 1, b: 2, c: 3 })); // [1, 2, 3]
```

### 5. Object.entries()

```javascript
if (!Object.myEntries) {
  Object.myEntries = function(obj) {
    if (obj !== Object(obj)) {
      throw new TypeError('Object.entries called on non-object');
    }
    
    const entries = [];
    
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        entries.push([key, obj[key]]);
      }
    }
    
    return entries;
  };
}

// Test
console.log(Object.myEntries({ a: 1, b: 2 })); // [['a', 1], ['b', 2]]
```

---

## Function Methods

### 1. Function.prototype.bind()

```javascript
if (!Function.prototype.myBind) {
  Function.prototype.myBind = function(context, ...args) {
    if (typeof this !== 'function') {
      throw new TypeError('Bind must be called on a function');
    }
    
    const fn = this;
    
    const boundFunction = function(...newArgs) {
      // If called with 'new', use new instance as context
      return fn.apply(
        this instanceof boundFunction ? this : context,
        [...args, ...newArgs]
      );
    };
    
    // Maintain prototype chain
    if (fn.prototype) {
      boundFunction.prototype = Object.create(fn.prototype);
    }
    
    return boundFunction;
  };
}

// Test
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'John' };
const boundGreet = greet.myBind(person, 'Hello');
console.log(boundGreet('!')); // "Hello, John!"
```

### 2. Function.prototype.call()

```javascript
if (!Function.prototype.myCall) {
  Function.prototype.myCall = function(context, ...args) {
    if (typeof this !== 'function') {
      throw new TypeError('Call must be called on a function');
    }
    
    context = context || globalThis;
    
    const uniqueKey = Symbol('fn');
    context[uniqueKey] = this;
    
    const result = context[uniqueKey](...args);
    
    delete context[uniqueKey];
    
    return result;
  };
}

// Test
function introduce(greeting) {
  return `${greeting}, I'm ${this.name}`;
}

const user = { name: 'Alice' };
console.log(introduce.myCall(user, 'Hi')); // "Hi, I'm Alice"
```

### 3. Function.prototype.apply()

```javascript
if (!Function.prototype.myApply) {
  Function.prototype.myApply = function(context, args = []) {
    if (typeof this !== 'function') {
      throw new TypeError('Apply must be called on a function');
    }
    
    if (!Array.isArray(args)) {
      throw new TypeError('CreateListFromArrayLike called on non-object');
    }
    
    context = context || globalThis;
    
    const uniqueKey = Symbol('fn');
    context[uniqueKey] = this;
    
    const result = context[uniqueKey](...args);
    
    delete context[uniqueKey];
    
    return result;
  };
}

// Test
function sum(a, b, c) {
  return a + b + c + this.value;
}

const obj = { value: 10 };
console.log(sum.myApply(obj, [1, 2, 3])); // 16
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
        }, 0);
      }
      
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        }, 0);
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
          }, 0);
        });
        
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          }, 0);
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
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Argument must be an array'));
      }
      
      const results = [];
      let completed = 0;
      
      if (promises.length === 0) {
        return resolve(results);
      }
      
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
      if (!Array.isArray(promises)) {
        return resolve([]);
      }
      
      const results = [];
      let completed = 0;
      
      if (promises.length === 0) {
        return resolve(results);
      }
      
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

// Test
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('Success!'), 1000);
});

promise
  .then(result => {
    console.log(result); // 'Success!'
    return 'Chained';
  })
  .then(result => console.log(result)); // 'Chained'
```

---

## String Methods

### 1. String.prototype.trim()

```javascript
if (!String.prototype.myTrim) {
  String.prototype.myTrim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

// Test
console.log('  hello  '.myTrim()); // 'hello'
```

### 2. String.prototype.repeat()

```javascript
if (!String.prototype.myRepeat) {
  String.prototype.myRepeat = function(count) {
    if (this == null) {
      throw new TypeError('String.prototype.repeat called on null or undefined');
    }
    
    count = Math.floor(count);
    
    if (count < 0 || count === Infinity) {
      throw new RangeError('Invalid count value');
    }
    
    let result = '';
    for (let i = 0; i < count; i++) {
      result += this;
    }
    
    return result;
  };
}

// Test
console.log('abc'.myRepeat(3)); // 'abcabcabc'
```

### 3. String.prototype.startsWith()

```javascript
if (!String.prototype.myStartsWith) {
  String.prototype.myStartsWith = function(searchString, position = 0) {
    return this.substring(position, position + searchString.length) === searchString;
  };
}

// Test
console.log('hello world'.myStartsWith('hello')); // true
console.log('hello world'.myStartsWith('world', 6)); // true
```

### 4. String.prototype.endsWith()

```javascript
if (!String.prototype.myEndsWith) {
  String.prototype.myEndsWith = function(searchString, length) {
    if (length === undefined || length > this.length) {
      length = this.length;
    }
    
    return this.substring(length - searchString.length, length) === searchString;
  };
}

// Test
console.log('hello world'.myEndsWith('world')); // true
```

---

## Additional Polyfills

### 1. Array.isArray()

```javascript
if (!Array.myIsArray) {
  Array.myIsArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

// Test
console.log(Array.myIsArray([])); // true
console.log(Array.myIsArray({})); // false
```

### 2. Array.from()

```javascript
if (!Array.myFrom) {
  Array.myFrom = function(arrayLike, mapFn, thisArg) {
    const result = [];
    const len = arrayLike.length;
    
    for (let i = 0; i < len; i++) {
      if (mapFn) {
        result.push(mapFn.call(thisArg, arrayLike[i], i));
      } else {
        result.push(arrayLike[i]);
      }
    }
    
    return result;
  };
}

// Test
console.log(Array.myFrom('hello')); // ['h', 'e', 'l', 'l', 'o']
console.log(Array.myFrom([1, 2, 3], x => x * 2)); // [2, 4, 6]
```

### 3. String.prototype.padStart()

```javascript
if (!String.prototype.myPadStart) {
  String.prototype.myPadStart = function(targetLength, padString = ' ') {
    if (this.length >= targetLength) {
      return String(this);
    }
    
    const padLength = targetLength - this.length;
    let padding = '';
    
    while (padding.length < padLength) {
      padding += padString;
    }
    
    return padding.slice(0, padLength) + this;
  };
}

// Test
console.log('5'.myPadStart(3, '0')); // '005'
```

### 4. String.prototype.padEnd()

```javascript
if (!String.prototype.myPadEnd) {
  String.prototype.myPadEnd = function(targetLength, padString = ' ') {
    if (this.length >= targetLength) {
      return String(this);
    }
    
    const padLength = targetLength - this.length;
    let padding = '';
    
    while (padding.length < padLength) {
      padding += padString;
    }
    
    return this + padding.slice(0, padLength);
  };
}

// Test
console.log('5'.myPadEnd(3, '0')); // '500'
```

---

## Summary

### Key Implementation Points:

1. **Check for null/undefined** before operating
2. **Type check callbacks** to ensure they're functions
3. **Handle edge cases** (empty arrays, undefined initial values)
4. **Use `>>>0`** to convert length to unsigned 32-bit integer
5. **Check property existence** with `in` operator
6. **Use `Object(this)`** to convert to object
7. **Maintain prototype chains** in bind()
8. **Use Symbol** for unique keys in call/apply

### Testing Your Polyfills:

Always test with:
- Empty arrays/strings
- Null/undefined values
- Edge cases (NaN, Infinity, negative numbers)
- Sparse arrays
- Different data types
- `this` context

---

**Practice:** Implement these polyfills yourself to understand how native methods work!
