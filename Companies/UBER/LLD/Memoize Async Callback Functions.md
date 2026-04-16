# Memoize Async Callback Functions — (Callback-based, Deduplication-aware)

> **Interview Context:** Advanced memoization variant — tests understanding of **async patterns**, **in-flight request deduplication**, **stable serialization**, and **callback queue management**.

---

## Problem Statement

Implement `memoizeUserData()` that wraps a **Node.js-style callback function** (`fn(args..., callback)`) and:

1. Caches results after the first successful/failed call
2. **Deduplicates in-flight requests** — if the same call is made while a previous one is still pending, queue the callback instead of firing a duplicate request
3. Uses **stable key serialization** so object arguments with the same shape produce the same cache key regardless of key insertion order

---

## Key Concepts

### 1. Node-style Callback Convention

```javascript
// The LAST argument is always the callback: (err, data) => {}
fn(arg1, arg2, ..., (err, data) => { ... });
```

This is the classic Node.js error-first callback pattern. `memoizeUserData` pops the callback off `args` before computing the cache key.

### 2. Stable Stringify

`JSON.stringify` does NOT guarantee key order:

```javascript
JSON.stringify({ b: 2, a: 1 }) // '{"b":2,"a":1}'
JSON.stringify({ a: 1, b: 2 }) // '{"a":1,"b":2}'
// Same object, different strings → different cache keys ❌
```

`stableStringify` sorts object keys recursively before serializing:

```javascript
stableStringify({ b: 2, a: 1 }) // '{"a":1,"b":2}'
stableStringify({ a: 1, b: 2 }) // '{"a":1,"b":2}'
// Same result regardless of insertion order ✅
```

### 3. In-flight Request Deduplication

```
Call 1 (t=0ms):   cache miss → fires fetch, stores { pending: true, callbacks: [cb1] }
Call 2 (t=5ms):   pending!   → pushes cb2 into queue, NO new fetch fired
Fetch resolves:   both cb1 and cb2 get called with the same result
```

Without this, two rapid identical calls would fire two network requests — wasteful and potentially inconsistent.

---

## Implementation

```javascript
function memoizeUserData(fn) {
  const cache = new Map();

  // Recursively stringifies objects with sorted keys for stable cache keys
  const stableStringify = (obj) => {
    if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
    if (Array.isArray(obj)) return `[${obj.map(stableStringify).join(",")}]`;
    return `{${Object.keys(obj)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${stableStringify(obj[k])}`)
      .join(",")}}`;
  };

  return (...args) => {
    const cb = args.pop();                           // Extract callback (last arg)
    const key = args.map(stableStringify).join("|"); // Build stable cache key

    if (cache.has(key)) {
      const entry = cache.get(key);

      if (entry.pending) {
        entry.callbacks.push(cb); // Queue — request still in flight
      } else {
        cb(entry.err, entry.data); // Already resolved — call immediately
      }
      return;
    }

    // First time — mark pending and fire the real request
    cache.set(key, { pending: true, callbacks: [cb] });

    fn(...args, (err, data) => {
      const entry = cache.get(key);
      cache.set(key, { pending: false, err, data }); // Transition to resolved
      for (const callback of entry.callbacks) {
        callback(err, data); // Flush all queued callbacks
      }
    });
  };
}
```

---

## Cache Entry State Machine

```
                   First call
                       │
                       ▼
             ┌─────────────────────┐
             │      PENDING        │◄── Subsequent calls queue their callbacks here
             │  pending: true      │
             │  callbacks: [cb...] │
             └──────────┬──────────┘
                        │  fetch resolves / rejects
                        ▼
             ┌─────────────────────┐
             │      RESOLVED       │◄── Future calls get cb(err, data) immediately
             │  pending: false     │
             │  err, data          │
             └─────────────────────┘
```

---

## Usage Example

```javascript
async function getUserData(q, key, cb) {
  fetch(`https://dummyjson.com/products?limit=10&skip=20&select=title,price`)
    .then((res) => res.json())
    .then((data) => cb(null, data))
    .catch((err) => cb(err));
}

const memoFun = memoizeUserData(getUserData);

// Both calls fire almost simultaneously
memoFun("test", 100, (err, data) => {
  console.log("first:", err, data);  // fires after fetch resolves
});

memoFun("test", 100, (err, data) => {
  console.log("second:", err, data); // queued, fires at the same time as first
});

// Only ONE network request is made. Both callbacks receive the same data.
```

---

## Cache Key Examples

```javascript
// Primitives
args: ["test", 100]       →  key: '"test"|100'

// Object args (insertion order irrelevant)
args: [{ b: 2, a: 1 }]   →  key: '{"a":1,"b":2}'
args: [{ a: 1, b: 2 }]   →  key: '{"a":1,"b":2}'  // same key ✅

// Mixed
args: ["user", { role: "admin", id: 5 }]
                          →  key: '"user"|{"id":5,"role":"admin"}'

// Nested
args: [{ filters: { z: 3, a: 1 }, page: 2 }]
                          →  key: '{"filters":{"a":1,"z":3},"page":2}'
```

---

## Behavior Summary

| Scenario | Behavior |
|---|---|
| First call with new args | Cache miss → fires `fn`, stores `{ pending: true }` |
| Same call while pending | No new request → callback queued |
| Call after resolution | Immediately calls `cb(err, data)` from cache |
| Error from `fn` | Cached like success — `err` stored, replayed to future callers |
| Objects with same shape, different insertion order | Same cache key (stable stringify) |

---

## Limitations & Production Considerations

### Errors Are Cached
If the first call fails, all future callers get the same error with no retry:
```javascript
fn(...args, (err, data) => {
  if (err) {
    cache.delete(key); // Allow retry on failure
  } else {
    cache.set(key, { pending: false, err, data });
  }
  for (const callback of entry.callbacks) callback(err, data);
});
```

### Objects Are Compared by Shape, Not Reference
Unlike trie-based memoization, this uses string keys — two different object references with the same shape hit the same cache. Usually desirable for API calls (same query = same result).

### No Cache Expiry (TTL)
Results are cached forever. For production, add a `ttl` option:
```javascript
cache.set(key, { pending: false, err, data, cachedAt: Date.now() });
// On lookup: if (Date.now() - entry.cachedAt > ttl) treat as cache miss
```

---

## Comparison: Callback vs Promise Memoization

| | Callback (this impl) | Promise-based |
|---|---|---|
| Deduplication | Manual callback queue | Store the Promise itself — free deduplication |
| Error caching | Explicit control | Cached rejected Promise replays consistently |
| Compatibility | Legacy Node.js APIs | Modern async/await code |
| Implementation complexity | Higher | Lower |

---

## Interview Tips

- **Lead with deduplication** — this is the hardest and most impressive part. Explain the pending state before writing any code.
- **Call out `args.pop()`** — cleanly separates the callback from data args.
- **Explain why stable stringify matters** — the interviewer will probe this.
- **Discuss error caching as a tradeoff** — shows production-level thinking.
- **Compare to Promise memoization** — Promises self-deduplicate once stored; callbacks need an explicit queue.

---

## Files

```
memoize-async/
├── README.md              ← this file
└── memoizeUserData.js     ← implementation
```
