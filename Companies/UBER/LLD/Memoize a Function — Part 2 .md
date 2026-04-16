# Memoize a Function — Part 2 (Trie-Based, Multi-Argument)

> **Interview Context:** Asked at **Uber SDE2** round — tests deep understanding of caching strategies, data structures, and JavaScript internals.

---

## Problem Statement

Implement a `memoize()` utility that wraps any function and caches its results based on the full argument signature. Unlike simple single-argument memoization (using a flat Map), this solution must handle **multiple arguments** efficiently using a **trie-like (prefix tree) data structure**.

---

## Requirements

| Requirement | Description |
|---|---|
| Multiple primitive args | `(1, 2, 3)` and `(1, 2, 4)` must be cached separately |
| Object reference identity | Objects cached by reference (`===`), not deep equality |
| Mixed args | Works with `(obj, 1, "str")` style mixed inputs |
| No args | `fn()` — zero-argument functions must be handled |
| Recursive functions | The memoized wrapper must support self-referential calls |

---

## Core Idea — Why a Trie?

A flat `Map` keyed by `JSON.stringify(args)` fails because:
- It breaks on **object arguments** (all objects serialize to `[object Object]`)
- It's **slow** for large/nested args
- It can't distinguish **object identity**

A **trie** solves this by traversing one argument at a time — each node in the trie represents one positional argument. The cache lookup walks the path `arg[0] → arg[1] → arg[2] → ...` and stores the result at the leaf node.

```
root
 └── [1]
      └── [2]
           ├── [3] → result: 6   ← add(1,2,3)
           └── [4] → result: 7   ← add(1,2,4)
```

For **primitives**, a regular `Map` (keyed by value) is used at each trie node.  
For **objects**, a `WeakMap` (keyed by reference) is used — ensuring identity-based caching and avoiding memory leaks.

---

## Implementation

```javascript
function memoize(fn) {
  // Each trie node holds two maps:
  // - `primitiveMap` (Map)    → for primitive args (string, number, boolean, null, undefined)
  // - `objectMap`   (WeakMap) → for object/function refs (identity-based)
  // Each entry in those maps points to the next trie node (or the final result).

  const root = createTrieNode();

  return function (...args) {
    let node = root;

    for (const arg of args) {
      const isObject = arg !== null && typeof arg === "object" || typeof arg === "function";
      const map = isObject ? node.objectMap : node.primitiveMap;

      if (!map.has(arg)) {
        map.set(arg, createTrieNode());
      }

      node = map.get(arg);
    }

    if (!node.hasResult) {
      node.result = fn.apply(this, args);
      node.hasResult = true;
      console.log("Cache miss");
    } else {
      console.log("Cache hit");
    }

    return node.result;
  };
}

function createTrieNode() {
  return {
    primitiveMap: new Map(),   // primitive args: number, string, boolean, null, undefined
    objectMap: new WeakMap(),  // object/function args: identity-based
    hasResult: false,
    result: undefined,
  };
}
```

---

## Usage Examples

```javascript
// --- Multiple primitive arguments ---
const add = memoize((a, b, c) => a + b + c);

console.log(add(1, 2, 3)); // Cache miss → 6
console.log(add(1, 2, 3)); // Cache hit  → 6
console.log(add(1, 2, 4)); // Cache miss → 7

// --- Object identity caching ---
const getKey = memoize((obj) => obj.id);
const user = { id: 42 };

console.log(getKey(user));  // Cache miss → 42
console.log(getKey(user));  // Cache hit  → 42
console.log(getKey({ id: 42 })); // Cache miss (different reference) → 42

// --- Zero arguments ---
const getRandom = memoize(() => Math.random());

console.log(getRandom()); // Cache miss → e.g. 0.731
console.log(getRandom()); // Cache hit  → 0.731 (same value)

// --- Recursive function (Fibonacci) ---
const fib = memoize(function (n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2); // recursive calls also benefit from cache
});

console.log(fib(10)); // 55
console.log(fib(10)); // Cache hit → 55
```

---

## Complexity Analysis

| | Value |
|---|---|
| Time — Cache Miss | O(A) — where A = number of arguments |
| Time — Cache Hit | O(A) — trie traversal per arg |
| Space | O(N × A) — N unique calls, A args each |

> WeakMap entries for object args are **automatically garbage collected** when the object is no longer referenced elsewhere — no memory leaks.

---

## Edge Cases Handled

```javascript
// null is treated as a primitive (typeof null === "object" is a JS quirk — handled explicitly)
memoize(fn)(null, 1);

// undefined args work fine
memoize(fn)(undefined, undefined);

// Functions as arguments (treated as objects — identity-based)
const cb = () => {};
memoize(fn)(cb, 1);
```

---

## Why Not These Alternatives?

| Approach | Why It Fails |
|---|---|
| `JSON.stringify(args)` | Breaks on objects, circular refs, functions |
| Single flat `Map` | Can't differentiate arg-by-arg; collisions on objects |
| `args.join(',')` | Ambiguous: `(1, '2,3')` vs `(1, 2, 3)` look the same |
| Lodash `_.memoize` | Single-arg by default; custom resolver needed for multi-arg |

---

## Interview Tips

- **Lead with the trie intuition** — explain why flat Map fails for multi-arg before jumping to code.
- **Mention WeakMap** — shows awareness of memory management and GC.
- **Discuss the `null` edge case** — `typeof null === "object"` is a classic JS gotcha; handling it explicitly signals attention to detail.
- **Bring up recursive memoization** — storing the memoized wrapper in a variable that the inner function calls is a subtle but important pattern.

---

## Files

```
memoize-trie/
├── README.md         ← this file
└── memoize.js        ← implementation
```
