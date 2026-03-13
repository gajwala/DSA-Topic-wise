# 🚀 Top 50 JavaScript Interview Questions — FAANG Edition

> Covers every core JavaScript topic asked at Google, Meta, Amazon, Apple, Netflix, and Microsoft. Each question includes a concise answer, deep explanation, and real code examples.

---

## 📖 Table of Contents

| # | Topic Area |
|---|-----------|
| **Core Fundamentals** | Q1 – Q8 |
| **Functions & Scope** | Q9 – Q16 |
| **Async JavaScript** | Q17 – Q23 |
| **Objects & Prototypes** | Q24 – Q30 |
| **ES6+ Features** | Q31 – Q37 |
| **Arrays & Iteration** | Q38 – Q42 |
| **DOM & Browser APIs** | Q43 – Q46 |
| **Performance & Patterns** | Q47 – Q50 |

---

## 🔵 Core Fundamentals

---

### Q1. What are the data types in JavaScript?

**Short answer:** JavaScript has 8 data types — 7 primitives and 1 non-primitive.

**Primitives (stored by value):**
```
String · Number · BigInt · Boolean · undefined · null · Symbol
```

**Non-primitive (stored by reference):**
```
Object (includes Array, Function, Date, Map, Set, etc.)
```

```js
typeof "hello"        // "string"
typeof 42             // "number"
typeof 42n            // "bigint"
typeof true           // "boolean"
typeof undefined      // "undefined"
typeof null           // "object"  ← famous JS bug
typeof Symbol()       // "symbol"
typeof {}             // "object"
typeof function(){}   // "function"
```

> 💡 **FAANG tip:** Always mention that `typeof null === "object"` is a historical bug in JS, not intentional behavior. Use `value === null` to check for null.

---

### Q2. What is the difference between `==` and `===`?

**Short answer:** `==` compares with type coercion. `===` compares without type coercion (strict equality).

```js
0 == false      // true  (false coerces to 0)
0 === false     // false (different types)

null == undefined   // true
null === undefined  // false

"5" == 5        // true  (string coerces to number)
"5" === 5       // false

NaN == NaN      // false (NaN is never equal to itself)
NaN === NaN     // false → use Number.isNaN(NaN) instead
```

**Coercion rules for `==`:**
1. If same type → compare directly
2. `null == undefined` → always true
3. Number vs String → coerce string to number
4. Boolean vs anything → coerce boolean to number first

> 💡 **Best practice:** Always use `===`. Only use `==` for `null/undefined` check shorthand: `if (val == null)`.

---

### Q3. What is `NaN` and how do you check for it?

**Short answer:** `NaN` (Not a Number) is returned when a math operation fails. It is the only value in JS that is not equal to itself.

```js
typeof NaN          // "number" ← another JS quirk
NaN === NaN         // false

// ❌ Wrong way
isNaN("hello")      // true — coerces string first, unreliable

// ✅ Right way
Number.isNaN("hello")   // false — no coercion
Number.isNaN(NaN)       // true
Number.isNaN(42)        // false
```

---

### Q4. What is type coercion? Give examples.

**Short answer:** JavaScript automatically converts values from one type to another in certain operations.

```js
// Implicit coercion
"5" + 3         // "53"  (number coerced to string, + is concat)
"5" - 3         // 2     (string coerced to number, - is always math)
true + 1        // 2     (true → 1)
false + 1       // 1     (false → 0)
null + 1        // 1     (null → 0)
undefined + 1   // NaN   (undefined → NaN)

// Falsy values (coerce to false)
Boolean(0)          // false
Boolean("")         // false
Boolean(null)       // false
Boolean(undefined)  // false
Boolean(NaN)        // false
Boolean(false)      // false

// Everything else is truthy
Boolean([])         // true  ← gotcha!
Boolean({})         // true  ← gotcha!
Boolean("0")        // true  ← gotcha!
```

---

### Q5. What is the difference between `null` and `undefined`?

```js
// undefined — declared but not assigned
let x;
console.log(x);         // undefined

// undefined — missing function argument
function greet(name) { console.log(name); }
greet();                // undefined

// undefined — missing object property
const obj = {};
console.log(obj.name);  // undefined

// null — intentional absence of value (explicitly set)
let user = null;        // "no user yet"
```

| | `null` | `undefined` |
|---|--------|-------------|
| Type | `object` (bug) | `undefined` |
| Set by | Developer intentionally | JS engine automatically |
| Meaning | "empty value" | "not yet assigned" |

---

### Q6. What is variable hoisting?

**Short answer:** JavaScript moves variable and function **declarations** to the top of their scope before execution. Only declarations are hoisted, not initializations.

```js
// What you write:
console.log(x); // undefined (not ReferenceError!)
var x = 5;

// What JS sees (after hoisting):
var x;          // declaration hoisted
console.log(x); // undefined
x = 5;          // initialization stays

// let and const are hoisted but NOT initialized (Temporal Dead Zone)
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 5;

// Function declarations are fully hoisted (body included)
sayHi(); // "Hi!" — works!
function sayHi() { console.log("Hi!"); }

// Function expressions are NOT fully hoisted
sayBye(); // TypeError: sayBye is not a function
var sayBye = function() { console.log("Bye!"); };
```

---

### Q7. What is the Temporal Dead Zone (TDZ)?

**Short answer:** The TDZ is the period between when a `let`/`const` variable is hoisted and when it is initialized. Accessing it in this window throws a `ReferenceError`.

```js
{
  // TDZ starts here for 'name'
  console.log(name); // ReferenceError: Cannot access 'name' before initialization
  let name = "Alice"; // TDZ ends here
  console.log(name); // "Alice"
}
```

> 💡 TDZ exists for `let`, `const`, and `class` — not `var`.

---

### Q8. What is the difference between `var`, `let`, and `const`?

```js
// --- SCOPE ---
// var → function-scoped
function example() {
  if (true) {
    var x = 1;   // accessible outside the if block
  }
  console.log(x); // 1
}

// let/const → block-scoped
function example2() {
  if (true) {
    let y = 2;
    const z = 3;
  }
  console.log(y); // ReferenceError
}

// --- HOISTING ---
console.log(a); // undefined (hoisted, initialized to undefined)
var a = 1;

console.log(b); // ReferenceError (TDZ)
let b = 1;

// --- RE-DECLARATION ---
var a = 1; var a = 2;   // ✅ allowed
let b = 1; let b = 2;   // ❌ SyntaxError

// --- RE-ASSIGNMENT ---
let c = 1; c = 2;       // ✅ allowed
const d = 1; d = 2;     // ❌ TypeError

// const with objects — reference is const, contents are mutable
const obj = { name: "Alice" };
obj.name = "Bob";   // ✅ works
obj = {};           // ❌ TypeError
```

| | `var` | `let` | `const` |
|---|-------|-------|---------|
| Scope | Function | Block | Block |
| Hoisted | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-declare | ✅ | ❌ | ❌ |
| Re-assign | ✅ | ✅ | ❌ |

---

## 🟢 Functions & Scope

---

### Q9. What is a closure?

**Short answer:** A closure is a function that remembers and accesses variables from its outer (enclosing) scope even after that outer function has returned.

```js
function makeCounter() {
  let count = 0; // this variable is "closed over"
  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
// count is preserved across calls, but private to makeCounter
```

**Classic interview problem — closures in loops:**
```js
// ❌ Bug: all log '3' because var is function-scoped
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3

// ✅ Fix 1: use let (block-scoped, new binding per iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2

// ✅ Fix 2: use IIFE to capture i
for (var i = 0; i < 3; i++) {
  ((j) => setTimeout(() => console.log(j), 100))(i);
}
```

**Real-world uses:** data privacy, memoization, event handlers, module pattern.

---

### Q10. What is scope and scope chain?

**Short answer:** Scope determines where variables are accessible. The scope chain is how JS looks up variables — from inner scope outward to global.

```js
const global = "global";

function outer() {
  const outerVar = "outer";

  function inner() {
    const innerVar = "inner";
    // inner can access all: innerVar, outerVar, global
    console.log(innerVar, outerVar, global);
  }

  inner();
  // outer cannot access innerVar
}

// Scope chain lookup: inner → outer → global → ReferenceError
```

**Scope types:**
- **Global scope** — accessible everywhere
- **Function scope** — `var` inside a function
- **Block scope** — `let`/`const` inside `{}`
- **Module scope** — variables in ES modules (not on `window`)

---

### Q11. What is the difference between `call`, `apply`, and `bind`?

**Short answer:** All three set the value of `this`. `call` and `apply` invoke immediately. `bind` returns a new function.

```js
const user = { name: "Alice" };

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

// call — args passed individually
greet.call(user, "Hello", "!");       // "Hello, Alice!"

// apply — args passed as array
greet.apply(user, ["Hi", "?"]);       // "Hi, Alice?"

// bind — returns new function, does not call immediately
const boundGreet = greet.bind(user, "Hey");
boundGreet(".");                      // "Hey, Alice."

// Real-world use: borrowing array methods
const arrayLike = { 0: "a", 1: "b", length: 2 };
Array.prototype.slice.call(arrayLike); // ["a", "b"]
```

---

### Q12. What is `this` in JavaScript?

**Short answer:** `this` refers to the object that is executing the current function. Its value depends on **how** the function is called, not where it's defined.

```js
// 1. Global context
console.log(this); // window (browser) or {} (Node.js strict mode)

// 2. Object method
const obj = {
  name: "Alice",
  greet() { console.log(this.name); } // "Alice"
};
obj.greet();

// 3. Regular function (loses this)
const greet = obj.greet;
greet(); // undefined (strict) or window.name (non-strict)

// 4. Arrow function — inherits this from surrounding scope
const obj2 = {
  name: "Bob",
  greet: () => console.log(this.name) // undefined — no own 'this'
};

// 5. Constructor
function Person(name) {
  this.name = name;
}
const p = new Person("Carol");
p.name; // "Carol"

// 6. Explicit binding
function sayName() { console.log(this.name); }
sayName.call({ name: "Dave" }); // "Dave"
```

---

### Q13. What is an IIFE?

**Short answer:** An Immediately Invoked Function Expression — a function that is defined and called at the same time. Used to create a private scope.

```js
// Classic IIFE
(function() {
  const private = "I'm private";
  console.log(private);
})();

// Arrow IIFE
(() => {
  console.log("Arrow IIFE");
})();

// With return value
const result = (function() {
  return 42;
})();
console.log(result); // 42
```

**Why use it?**
- Avoid polluting global scope
- Create private variables (pre-modules era)
- Execute async code at top-level (`async IIFE`)

```js
// Async IIFE pattern
(async () => {
  const data = await fetch('/api/data');
  console.log(data);
})();
```

---

### Q14. What is currying?

**Short answer:** Currying transforms a function with multiple arguments into a sequence of functions each taking one argument.

```js
// Normal function
const add = (a, b) => a + b;
add(2, 3); // 5

// Curried function
const curriedAdd = a => b => a + b;
curriedAdd(2)(3); // 5

// Practical use — reusable specialized functions
const multiply = a => b => a * b;
const double = multiply(2);
const triple = multiply(3);

double(5); // 10
triple(5); // 15

// Generic curry utility
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...more) => curried(...args, ...more);
  };
}

const sum = curry((a, b, c) => a + b + c);
sum(1)(2)(3); // 6
sum(1, 2)(3); // 6
sum(1)(2, 3); // 6
```

---

### Q15. What is function composition?

**Short answer:** Combining two or more functions where the output of one becomes the input of the next.

```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const pipe    = (...fns) => x => fns.reduce((v, f) => f(v), x);

const add1    = x => x + 1;
const double  = x => x * 2;
const square  = x => x * x;

// compose: right to left
compose(square, double, add1)(3);  // square(double(add1(3))) = square(8) = 64

// pipe: left to right (more readable)
pipe(add1, double, square)(3);     // square(double(add1(3))) = 64
```

---

### Q16. What is memoization?

**Short answer:** Caching the result of a function call so repeated calls with the same arguments return the cached result instead of recomputing.

```js
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("from cache");
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const factorial = memoize(function(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
});

factorial(5); // computed: 120
factorial(5); // from cache: 120
factorial(6); // computed: 720 (uses cached factorial(5))
```

---

## 🟡 Async JavaScript

---

### Q17. What is the Event Loop?

**Short answer:** The event loop is what allows JavaScript (single-threaded) to perform non-blocking operations. It checks the call stack and, when empty, pushes tasks from the task queue.

```
Call Stack    → executes synchronous code
Web APIs      → handles setTimeout, fetch, DOM events
Task Queue    → macrotasks: setTimeout, setInterval, I/O
Microtask Queue → Promises (.then), queueMicrotask, MutationObserver
```

**Execution order: synchronous → microtasks → macrotasks**

```js
console.log("1");                      // sync

setTimeout(() => console.log("2"), 0); // macrotask

Promise.resolve()
  .then(() => console.log("3"));       // microtask

console.log("4");                      // sync

// Output: 1, 4, 3, 2
```

> 💡 Microtasks always run before the next macrotask, even if both have 0ms delay.

---

### Q18. What are Promises?

**Short answer:** A Promise represents an eventual completion or failure of an async operation. It has three states: `pending`, `fulfilled`, `rejected`.

```js
// Creating a Promise
const fetchUser = (id) => new Promise((resolve, reject) => {
  if (id > 0) {
    resolve({ id, name: "Alice" }); // success
  } else {
    reject(new Error("Invalid ID")); // failure
  }
});

// Consuming
fetchUser(1)
  .then(user => console.log(user))    // { id: 1, name: "Alice" }
  .catch(err => console.error(err))
  .finally(() => console.log("done"));

// Promise combinators
Promise.all([p1, p2, p3])        // waits for ALL — rejects if any fails
Promise.allSettled([p1, p2, p3]) // waits for ALL — never rejects, gives results
Promise.race([p1, p2, p3])       // resolves/rejects with FIRST to settle
Promise.any([p1, p2, p3])        // resolves with FIRST to succeed
```

---

### Q19. What is async/await?

**Short answer:** Syntactic sugar over Promises. Makes async code look and behave like synchronous code.

```js
// Promise chain version
function getUser() {
  return fetch('/api/user')
    .then(res => res.json())
    .then(user => user.name)
    .catch(err => console.error(err));
}

// async/await version (same behavior, more readable)
async function getUser() {
  try {
    const res  = await fetch('/api/user');
    const user = await res.json();
    return user.name;
  } catch (err) {
    console.error(err);
  }
}

// Parallel execution (don't await sequentially if independent)
// ❌ Sequential — slower (waits for each)
const a = await fetchA();
const b = await fetchB();

// ✅ Parallel — faster
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

---

### Q20. What is a callback and what is callback hell?

```js
// Callback — function passed as argument, called after async op
function fetchData(callback) {
  setTimeout(() => callback(null, "data"), 1000);
}

fetchData((err, data) => {
  if (err) return console.error(err);
  console.log(data);
});

// Callback hell — deeply nested callbacks (pyramid of doom)
getUser(id, (err, user) => {
  getPosts(user.id, (err, posts) => {
    getComments(posts[0].id, (err, comments) => {
      getLikes(comments[0].id, (err, likes) => {
        // ... unreadable, hard to maintain
      });
    });
  });
});

// Solution: Promises or async/await (flat, readable)
const user     = await getUser(id);
const posts    = await getPosts(user.id);
const comments = await getComments(posts[0].id);
const likes    = await getLikes(comments[0].id);
```

---

### Q21. What is the difference between `Promise.all` and `Promise.allSettled`?

```js
const p1 = Promise.resolve("success");
const p2 = Promise.reject("error");
const p3 = Promise.resolve("another success");

// Promise.all — fails fast on first rejection
Promise.all([p1, p2, p3])
  .then(console.log)
  .catch(console.error); // "error" — p2 failed, p1 and p3 ignored

// Promise.allSettled — waits for all, never rejects
Promise.allSettled([p1, p2, p3])
  .then(results => results.forEach(r => console.log(r)));
// { status: "fulfilled", value: "success" }
// { status: "rejected",  reason: "error" }
// { status: "fulfilled", value: "another success" }
```

> 💡 Use `Promise.all` when you need all to succeed. Use `Promise.allSettled` when you want results regardless of failure (e.g., batch operations).

---

### Q22. What is debouncing and throttling?

**Short answer:**
- **Debouncing** — delays execution until after a pause in calls. Good for search inputs.
- **Throttling** — limits execution to once per time window. Good for scroll/resize events.

```js
// Debounce — fires AFTER user stops typing
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const search = debounce((query) => fetchResults(query), 300);
input.addEventListener("input", e => search(e.target.value));

// Throttle — fires AT MOST once per interval
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

const onScroll = throttle(() => updatePosition(), 100);
window.addEventListener("scroll", onScroll);
```

---

### Q23. What is a generator function?

**Short answer:** A function that can pause and resume execution using `yield`. Returns an iterator.

```js
function* counter() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = counter();
gen.next(); // { value: 0, done: false }
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }

// Practical use: paginated data fetching
function* paginate(data, pageSize) {
  for (let i = 0; i < data.length; i += pageSize) {
    yield data.slice(i, i + pageSize);
  }
}

const pages = paginate([1,2,3,4,5,6,7,8,9,10], 3);
pages.next().value; // [1, 2, 3]
pages.next().value; // [4, 5, 6]
```

---

## 🟠 Objects & Prototypes

---

### Q24. What is prototypal inheritance?

**Short answer:** In JS, objects inherit from other objects via the prototype chain. Every object has a `[[Prototype]]` (accessible via `__proto__` or `Object.getPrototypeOf()`).

```js
const animal = {
  breathe() { console.log("breathing"); }
};

const dog = Object.create(animal); // dog's prototype is animal
dog.bark = function() { console.log("woof!"); };

dog.bark();    // "woof!" — own method
dog.breathe(); // "breathing" — inherited from animal

// Prototype chain: dog → animal → Object.prototype → null
```

---

### Q25. What is the difference between `Object.create`, class, and constructor functions?

```js
// 1. Constructor function
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return `Hi, I'm ${this.name}`;
};
const p1 = new Person("Alice");

// 2. ES6 Class (syntactic sugar over constructor functions)
class PersonClass {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hi, I'm ${this.name}`;
  }
}
const p2 = new PersonClass("Bob");

// 3. Object.create (direct prototype linking)
const personProto = {
  greet() { return `Hi, I'm ${this.name}`; }
};
const p3 = Object.create(personProto);
p3.name = "Carol";

// All three produce equivalent results
p1.greet(); // "Hi, I'm Alice"
p2.greet(); // "Hi, I'm Bob"
p3.greet(); // "Hi, I'm Carol"
```

---

### Q26. What does the `new` keyword do?

**Short answer:** `new` does 4 things:
1. Creates a new empty object
2. Sets its `[[Prototype]]` to the constructor's `prototype`
3. Executes the constructor with `this` = the new object
4. Returns the new object (or the return value if it's an object)

```js
function Person(name) {
  this.name = name;
}

// What new does internally:
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype); // step 1 & 2
  const result = Constructor.apply(obj, args);      // step 3
  return result instanceof Object ? result : obj;   // step 4
}

const p = myNew(Person, "Alice");
p.name; // "Alice"
```

---

### Q27. What is the difference between shallow copy and deep copy?

```js
const original = {
  name: "Alice",
  address: { city: "NYC" }
};

// Shallow copy — nested objects are still shared references
const shallow = { ...original };
// also: Object.assign({}, original)

shallow.name = "Bob";           // ✅ original unchanged
shallow.address.city = "LA";    // ❌ original.address.city also changes!
console.log(original.address.city); // "LA" — mutated!

// Deep copy methods
// 1. JSON (simple, but loses functions, Dates, undefined, circular refs)
const deep1 = JSON.parse(JSON.stringify(original));

// 2. structuredClone (modern, handles most cases)
const deep2 = structuredClone(original);
deep2.address.city = "Chicago";
console.log(original.address.city); // "LA" — unchanged ✅

// 3. Recursive clone (full control, handles edge cases)
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
  );
}
```

---

### Q28. What are getters and setters?

```js
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }

  get fahrenheit() {
    return this._celsius * 9/5 + 32;
  }

  set fahrenheit(value) {
    this._celsius = (value - 32) * 5/9;
  }

  get celsius() { return this._celsius; }
  set celsius(value) {
    if (value < -273.15) throw new Error("Below absolute zero!");
    this._celsius = value;
  }
}

const temp = new Temperature(0);
temp.fahrenheit;        // 32 (getter)
temp.fahrenheit = 212;  // (setter)
temp.celsius;           // 100
```

---

### Q29. What is `Object.freeze` vs `Object.seal`?

```js
// Object.freeze — no add, no delete, no modify
const frozen = Object.freeze({ x: 1, y: 2 });
frozen.x = 99;      // silently fails (or throws in strict mode)
frozen.z = 3;       // silently fails
delete frozen.x;    // silently fails
console.log(frozen); // { x: 1, y: 2 }

// Object.seal — no add, no delete, BUT can modify existing
const sealed = Object.seal({ x: 1, y: 2 });
sealed.x = 99;      // ✅ works
sealed.z = 3;       // ❌ silently fails
delete sealed.x;    // ❌ silently fails
console.log(sealed); // { x: 99, y: 2 }

// Note: both are SHALLOW — nested objects are still mutable
const obj = Object.freeze({ nested: { a: 1 } });
obj.nested.a = 99; // ✅ works — freeze is shallow!
```

---

### Q30. What are WeakMap and WeakSet?

**Short answer:** Like `Map`/`Set` but keys must be objects, and they hold **weak references** — objects can be garbage collected even if they're in a WeakMap/WeakSet.

```js
// WeakMap — private data pattern
const _private = new WeakMap();

class Person {
  constructor(name, age) {
    _private.set(this, { age }); // age is private
    this.name = name;
  }
  getAge() { return _private.get(this).age; }
}

const p = new Person("Alice", 30);
p.name;    // "Alice" (public)
p.getAge(); // 30 (via WeakMap)
// when p is garbage collected, WeakMap entry is automatically removed

// WeakSet — tracking without preventing GC
const visited = new WeakSet();
function process(node) {
  if (visited.has(node)) return;
  visited.add(node);
  // process node...
}
```

---

## 🔴 ES6+ Features

---

### Q31. What is destructuring?

```js
// Array destructuring
const [a, b, ...rest] = [1, 2, 3, 4, 5];
// a=1, b=2, rest=[3,4,5]

// Skip elements
const [,, third] = [1, 2, 3]; // third=3

// Default values
const [x = 10, y = 20] = [5];  // x=5, y=20

// Object destructuring
const { name, age, address: { city } } = {
  name: "Alice",
  age: 30,
  address: { city: "NYC" }
};

// Rename while destructuring
const { name: fullName } = { name: "Bob" };
// fullName = "Bob"

// Function parameters
function greet({ name, age = 0 }) {
  console.log(`${name} is ${age}`);
}
greet({ name: "Alice", age: 30 });
```

---

### Q32. What is the spread and rest operator?

```js
// Spread — expand iterable into individual elements
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

// Copy array (shallow)
const copy = [...arr1];

// Merge objects
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const merged = { ...obj1, ...obj2, c: 3 }; // { a:1, b:2, c:3 }

// Override properties
const updated = { ...obj1, a: 99 }; // { a: 99 }

// Pass array as function args
Math.max(...[1, 5, 3, 2]); // 5

// Rest — collect remaining args into array
function sum(first, ...others) {
  return others.reduce((acc, n) => acc + n, first);
}
sum(1, 2, 3, 4); // 10
```

---

### Q33. What are Symbols?

**Short answer:** Symbols are unique, immutable primitive values. They're often used as unique object property keys to avoid naming collisions.

```js
const id1 = Symbol("id");
const id2 = Symbol("id");
id1 === id2; // false — every Symbol is unique

// Use as object key (won't collide with string keys)
const user = {
  name: "Alice",
  [id1]: 123 // Symbol key
};
user[id1]; // 123
user["id"]; // undefined — string "id" is different

// Well-known Symbols (customize built-in behavior)
class MyArray {
  [Symbol.iterator]() {
    let i = 0;
    const data = [1, 2, 3];
    return {
      next: () => i < data.length
        ? { value: data[i++], done: false }
        : { done: true }
    };
  }
}
[...new MyArray()]; // [1, 2, 3]
```

---

### Q34. What are `Map` and `Set`?

```js
// Set — collection of unique values
const set = new Set([1, 2, 2, 3, 3, 3]);
set;           // Set {1, 2, 3}
set.add(4);
set.has(2);    // true
set.delete(1);
set.size;      // 3

// Remove duplicates from array
const unique = [...new Set([1,1,2,2,3])]; // [1, 2, 3]

// Map — key-value pairs, any type as key
const map = new Map();
map.set("name", "Alice");
map.set(42, "the answer");
map.set({ obj: true }, "object key");

map.get("name"); // "Alice"
map.has(42);     // true
map.size;        // 3

// vs Object: Map preserves insertion order, allows any key type,
// has built-in size, is iterable
for (const [key, value] of map) {
  console.log(key, value);
}
```

---

### Q35. What are Proxy and Reflect?

```js
// Proxy — intercept and customize object operations
const handler = {
  get(target, key) {
    console.log(`Getting ${key}`);
    return key in target ? target[key] : `Property ${key} not found`;
  },
  set(target, key, value) {
    if (typeof value !== "number") throw new TypeError("Only numbers!");
    target[key] = value;
    return true;
  }
};

const obj = new Proxy({}, handler);
obj.age = 30;       // ✅
obj.age;            // "Getting age" → 30
obj.name = "Alice"; // ❌ TypeError

// Reflect — companion to Proxy, default behaviors
const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log("intercepted");
    return Reflect.get(target, key, receiver); // default behavior
  }
});
```

---

### Q36. What are optional chaining `?.` and nullish coalescing `??`?

```js
// Optional chaining — safe property access
const user = { address: { city: "NYC" } };

user?.address?.city;        // "NYC"
user?.phone?.number;        // undefined (no error)
user?.getAge?.();           // undefined if method doesn't exist

// vs old way
user && user.address && user.address.city; // equivalent but verbose

// Nullish coalescing — default only for null/undefined
const name = null ?? "Anonymous";     // "Anonymous"
const count = 0 ?? 42;               // 0 (0 is not null/undefined)

// vs OR operator (|| uses falsy check)
const count2 = 0 || 42;             // 42 (0 is falsy — often a bug!)

// Combined
const city = user?.address?.city ?? "Unknown";
```

---

### Q37. What are tagged template literals?

```js
// Basic template literal
const name = "Alice";
`Hello, ${name}!`; // "Hello, Alice!"

// Tagged template — function processes the template
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const val = values[i - 1];
    return result + `<mark>${val}</mark>` + str;
  });
}

const price = 42;
const item = "Widget";
highlight`The ${item} costs $${price}`; // 'The <mark>Widget</mark> costs $<mark>42</mark>'

// Real use: styled-components
const Button = styled.button`
  background: ${props => props.primary ? "blue" : "white"};
  color: ${props => props.primary ? "white" : "blue"};
`;
```

---

## 🟣 Arrays & Iteration

---

### Q38. Explain all array methods with examples.

```js
const nums = [1, 2, 3, 4, 5];

// Transformation
nums.map(x => x * 2);            // [2, 4, 6, 8, 10] — new array
nums.filter(x => x % 2 === 0);   // [2, 4] — new array
nums.reduce((acc, x) => acc + x, 0); // 15 — single value
nums.flatMap(x => [x, x * 2]);   // [1,2,2,4,3,6,4,8,5,10]
nums.flat(2);                     // flatten nested arrays (depth 2)

// Search
nums.find(x => x > 3);           // 4 — first match
nums.findIndex(x => x > 3);      // 3 — index of first match
nums.some(x => x > 4);           // true — any match?
nums.every(x => x > 0);          // true — all match?
nums.includes(3);                 // true

// Mutation (change original array)
nums.push(6);       // add to end   → [1,2,3,4,5,6]
nums.pop();         // remove end   → returns 6
nums.unshift(0);    // add to start → [0,1,2,3,4,5]
nums.shift();       // remove start → returns 0
nums.splice(1, 2);  // remove 2 from index 1
nums.reverse();     // reverses in place
nums.sort((a, b) => a - b); // sort numerically ascending

// New array (no mutation)
nums.slice(1, 3);   // [2, 3] — from index 1 up to (not including) 3
[...nums].sort();   // sort on copy
nums.concat([6,7]); // [1,2,3,4,5,6,7]

// Iteration
nums.forEach(x => console.log(x)); // no return value
Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]
```

---

### Q39. What is the difference between `for...of` and `for...in`?

```js
const arr = ["a", "b", "c"];
const obj = { x: 1, y: 2, z: 3 };

// for...of — iterates VALUES, works with any iterable
for (const val of arr) {
  console.log(val); // "a", "b", "c"
}
// Also works on: String, Map, Set, NodeList, arguments

// for...in — iterates KEYS (enumerable properties)
for (const key in obj) {
  console.log(key); // "x", "y", "z"
}
// ⚠️ Avoid for...in on arrays — iterates indices as strings
// and may include prototype properties
for (const key in arr) {
  console.log(key); // "0", "1", "2" (string indices)
}
```

---

### Q40. What is the difference between `Array.from` and the spread operator?

```js
// Both convert iterables to arrays
const set = new Set([1, 2, 3]);
Array.from(set);  // [1, 2, 3]
[...set];         // [1, 2, 3]

// Array.from advantage: takes a mapping function
Array.from({ length: 5 }, (_, i) => i * 2);
// [0, 2, 4, 6, 8]

Array.from("hello"); // ["h","e","l","l","o"]

// Spread advantage: simpler syntax, works in array literals
const combined = [...arr1, ...arr2];

// Array-like objects (have length but no iterator)
const arrayLike = { 0: "a", 1: "b", length: 2 };
Array.from(arrayLike); // ["a", "b"] ✅
[...arrayLike];        // TypeError ❌ — not iterable
```

---

### Q41. Implement `map`, `filter`, `reduce` from scratch.

```js
// Custom map
Array.prototype.myMap = function(cb) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(cb(this[i], i, this));
  }
  return result;
};

// Custom filter
Array.prototype.myFilter = function(cb) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) result.push(this[i]);
  }
  return result;
};

// Custom reduce
Array.prototype.myReduce = function(cb, initialValue) {
  let acc = initialValue !== undefined ? initialValue : this[0];
  const start = initialValue !== undefined ? 0 : 1;
  for (let i = start; i < this.length; i++) {
    acc = cb(acc, this[i], i, this);
  }
  return acc;
};

[1,2,3].myMap(x => x * 2);              // [2, 4, 6]
[1,2,3,4].myFilter(x => x % 2 === 0);  // [2, 4]
[1,2,3,4].myReduce((acc, x) => acc + x, 0); // 10
```

---

### Q42. What is the difference between `Array.isArray` and `instanceof Array`?

```js
const arr = [1, 2, 3];

Array.isArray(arr);       // true
arr instanceof Array;     // true

// The difference appears across iframes/realms
// Each iframe has its own Array constructor
// instanceof checks the prototype chain against THAT frame's Array
// Array.isArray works across all realms

// In Node.js module contexts:
// Array.isArray is always reliable ✅
// instanceof can fail with different contexts ❌
```

---

## 🔵 DOM & Browser APIs

---

### Q43. What is event delegation?

**Short answer:** Attaching a single event listener to a parent instead of multiple listeners on children. Uses event bubbling.

```js
// ❌ Bad — listener on every item (memory-heavy, breaks on dynamic items)
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleClick);
});

// ✅ Good — single listener on parent (event delegation)
document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    handleClick(e.target);
  }
  // Works for dynamically added items too!
});
```

---

### Q44. What is event bubbling and capturing?

```js
// Bubbling: event fires on target, then bubbles UP to ancestors (default)
// Capturing: event fires at root, travels DOWN to target (useCapture: true)

document.querySelector('#parent').addEventListener('click', () => {
  console.log('parent');
}, false); // false = bubbling (default)

document.querySelector('#child').addEventListener('click', () => {
  console.log('child');
}, false);

// Click on child: "child" → "parent" (bubbles up)

// stopPropagation — stop event from bubbling further
child.addEventListener('click', (e) => {
  e.stopPropagation(); // parent handler won't fire
});

// preventDefault — stop browser's default action
link.addEventListener('click', (e) => {
  e.preventDefault(); // won't navigate
});
```

---

### Q45. What is the Virtual DOM?

**Short answer:** A JavaScript representation of the real DOM kept in memory. React compares old vs new Virtual DOM (diffing), then applies only the minimal real DOM changes (reconciliation).

```
1. State changes → New Virtual DOM tree created
2. Diff (reconciliation) → Find differences between old and new tree
3. Commit → Apply only changed nodes to real DOM
```

**Why?** Real DOM manipulation is slow. Batch + minimize DOM operations = better performance.

**React Fiber** — the reconciler that makes diffing interruptible (React 16+). Allows prioritizing urgent updates (user input) over less urgent ones (data fetching results).

---

### Q46. What is `localStorage` vs `sessionStorage` vs cookies?

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|---------------|---------|
| Capacity | ~5MB | ~5MB | ~4KB |
| Expiry | Never (manual clear) | Tab close | Configurable |
| Sent to server | ❌ | ❌ | ✅ (every request) |
| Accessible via JS | ✅ | ✅ | ✅ (unless HttpOnly) |
| Cross-tab | ✅ | ❌ | ✅ |
| Best for | User prefs, theme | Temp form data | Auth sessions |

```js
// localStorage
localStorage.setItem("theme", "dark");
localStorage.getItem("theme"); // "dark"
localStorage.removeItem("theme");

// sessionStorage (same API, tab-scoped)
sessionStorage.setItem("step", "2");

// Cookies
document.cookie = "token=abc123; expires=Fri, 31 Dec 2025 23:59:59 GMT; Secure; HttpOnly";
```

---

## ⚫ Performance & Patterns

---

### Q47. What is the Module pattern and ES Modules?

```js
// ES Modules (modern, preferred)
// math.js
export const add = (a, b) => a + b;
export const PI = 3.14159;
export default function multiply(a, b) { return a * b; }

// main.js
import multiply, { add, PI } from './math.js';
import * as math from './math.js';

// Dynamic import (lazy load)
const { add } = await import('./math.js');

// CommonJS (Node.js)
// math.js
module.exports = { add: (a, b) => a + b };
// main.js
const { add } = require('./math');
```

---

### Q48. What is the Observer Pattern?

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
    return this; // for chaining
  }

  off(event, listener) {
    this.events[event] = (this.events[event] || [])
      .filter(fn => fn !== listener);
    return this;
  }

  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn(...args));
    return this;
  }
}

const emitter = new EventEmitter();
emitter.on("login", user => console.log(`${user} logged in`));
emitter.emit("login", "Alice"); // "Alice logged in"
```

---

### Q49. What is tree shaking and how does it work?

**Short answer:** Elimination of dead (unused) code from the final bundle. Enabled by static ES module `import`/`export` syntax, which allows bundlers (Webpack, Rollup) to statically analyze what is and isn't used.

```js
// utils.js
export const used = () => "I'm used";
export const unused = () => "I'm never imported";

// main.js
import { used } from './utils'; // only 'used' is imported

// After tree shaking, 'unused' is excluded from the bundle
// ✅ Works with: ES modules (import/export)
// ❌ Doesn't work with: CommonJS (require) — dynamic, can't statically analyze

// Tips to maximize tree shaking:
// - Use named exports over default exports
// - Mark packages as side-effect free: "sideEffects": false in package.json
// - Avoid importing entire libraries: import _ from 'lodash' ❌
//                                     import debounce from 'lodash/debounce' ✅
```

---

### Q50. What are some common JavaScript design patterns?

```js
// 1. Singleton — only one instance
class Config {
  static instance = null;
  constructor() {
    if (Config.instance) return Config.instance;
    this.settings = {};
    Config.instance = this;
  }
}
new Config() === new Config(); // true — same instance

// 2. Factory — create objects without specifying class
function createUser(role) {
  const base = { role, createdAt: Date.now() };
  if (role === "admin") return { ...base, permissions: ["read","write","delete"] };
  if (role === "guest") return { ...base, permissions: ["read"] };
}

// 3. Strategy — swap algorithms at runtime
const sorters = {
  bubble: arr => { /* bubble sort */ },
  quick:  arr => { /* quick sort */ },
  merge:  arr => { /* merge sort */ },
};
function sort(arr, strategy = "quick") {
  return sorters[strategy](arr);
}

// 4. Pub/Sub — decoupled communication
const pubsub = {
  events: {},
  subscribe(event, fn) { (this.events[event] ??= []).push(fn); },
  publish(event, data) { (this.events[event] ?? []).forEach(fn => fn(data)); }
};

// 5. Decorator — extend behavior without changing source
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
```

---

## 🔖 Quick Revision Cheat Sheet

```
Primitives         → String, Number, BigInt, Boolean, undefined, null, Symbol
== vs ===          → coercion vs strict
var/let/const      → function/block/block scoped · hoisting behavior
Closure            → function remembers outer scope after outer fn returns
this               → depends on HOW function is called (not where defined)
call/apply/bind    → set this · call(args) · apply([args]) · bind returns fn
Promise states     → pending → fulfilled / rejected
Event loop order   → sync → microtasks (Promises) → macrotasks (setTimeout)
Prototype chain    → object → Object.prototype → null
Shallow copy       → spread, Object.assign (nested refs shared)
Deep copy          → structuredClone, JSON.parse(JSON.stringify())
Debounce           → fires AFTER pause in calls (search input)
Throttle           → fires AT MOST once per interval (scroll)
Tree shaking       → remove unused exports (requires ES modules)
Optional chaining  → obj?.prop (no error if undefined)
Nullish coalescing → val ?? default (only for null/undefined)
```

---

## 🤝 Contributing

PRs welcome! If you'd like to add more questions, fix an explanation, or add a new topic, please open an issue first.

---

## ⭐ Star this repo if it helped your interview prep!

*Covers FAANG-level JavaScript interviews · All levels · Last updated 2025*
