# Rate Limiter & Concurrency Throttle

> A deep-dive into two essential async JavaScript patterns — with full explanations of call stacks, microtask queues, and the event loop.

---

## Table of Contents

1. [Overview](#overview)
2. [Rolling Window Rate Limiter](#1-rolling-window-rate-limiter)
   - [How It Works](#how-it-works)
   - [Call Stack Walkthrough](#call-stack-walkthrough)
   - [Edge Cases](#edge-cases)
3. [Concurrent Progress Bar Throttle](#2-concurrent-progress-bar-throttle)
   - [How It Works](#how-it-works-1)
   - [Call Stack & Microtask Walkthrough](#call-stack--microtask-walkthrough)
   - [Promise Queue Mechanics](#promise-queue-mechanics)
4. [JavaScript Event Loop Primer](#javascript-event-loop-primer)
5. [Side-by-Side Comparison](#side-by-side-comparison)
6. [When to Use Which](#when-to-use-which)

---

## Overview

These two patterns solve different flavors of the same problem: **controlling how many operations execute in a given context.**

| Pattern | Question it answers | Response to overflow |
|---|---|---|
| **Rate Limiter** | "Has this client sent too many requests in the last 60 seconds?" | Reject immediately (HTTP 429) |
| **Concurrency Throttle** | "Are too many tasks running right now?" | Queue and wait for a slot |

---

## 1. Rolling Window Rate Limiter

```js
class RateLimiter {
  constructor(limit, windowMs = 60000) {
    this.limit = limit;       // Max requests allowed
    this.windowMs = windowMs; // Rolling window size (default: 60s)
    this.requests = [];       // Timestamp log
  }

  tryAccess() {
    const now = Date.now();
    this.requests = this.requests.filter(ts => now - ts < this.windowMs);

    if (this.requests.length < this.limit) {
      this.requests.push(now);
      return true;
    }
    return false;
  }
}
```

### How It Works

`tryAccess()` runs synchronously in three steps every time a request arrives:

**Step 1 — Snapshot time**
```
now = Date.now()  →  e.g. 1_700_000_060_000 ms
```

**Step 2 — Evict stale timestamps**
```
this.requests.filter(ts => now - ts < this.windowMs)
```
Any timestamp older than `windowMs` (60 000 ms) is dropped. This is what makes it a *rolling* window — the window always ends at "right now" and reaches back exactly 60 seconds, not at a fixed clock boundary.

**Fixed window vs. rolling window:**
```
Fixed:  |--60s--|--60s--|--60s--|
         reset   reset   reset

Rolling: always [ now-60s ────── now ]
          slides forward with every request
```

**Step 3 — Accept or reject**
```
if (remaining slots > 0)  →  push timestamp, return true
else                       →  return false (429)
```

### Call Stack Walkthrough

`tryAccess()` is entirely synchronous. Here is the exact call stack sequence for a request that is **allowed**:

```
[Call Stack]
┌────────────────────────────────┐
│ tryAccess()                    │  ← pushed when limiter.tryAccess() is called
│   Date.now()                   │  ← pushed, returns timestamp, popped
│   Array.filter(callback)       │  ← pushed
│     callback(ts[0])            │  ← pushed per element, popped
│     callback(ts[1])            │
│   Array.push(now)              │  ← pushed, popped
│   return true                  │
└────────────────────────────────┘
```

No microtasks. No Promises. No async/await. The entire operation completes before any other JS code can run (single-threaded guarantee).

**Memory over time (5-request limit):**
```
t=0s:  requests = [0]
t=10s: requests = [0, 10000]
t=30s: requests = [0, 10000, 30000]
t=50s: requests = [0, 10000, 30000, 50000]
t=59s: requests = [0, 10000, 30000, 50000, 59000]  ← FULL, next is rejected
t=61s: requests = [10000, 30000, 50000, 59000]      ← t=0 evicted, slot opens
```

### Edge Cases

| Scenario | Behavior |
|---|---|
| Burst at window edge | Correctly handled — rolling window prevents the "double burst" bug of fixed windows |
| High traffic | `this.requests` array can grow large; consider a circular buffer for production |
| Multiple processes | This implementation is **not** distributed-safe; use Redis with `ZADD`/`ZREMRANGEBYSCORE` for multi-instance deployments |

---

## 2. Concurrent Progress Bar Throttle

```js
class ConcurrencyThrottle {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent; // Slots available
    this.running = 0;                   // Currently active tasks
    this.queue = [];                    // Waiting resolve functions
  }

  async run(task) {
    if (this.running >= this.maxConcurrent) {
      await new Promise(resolve => this.queue.push(resolve));
    }

    this.running++;
    try {
      await task();
    } finally {
      this.running--;
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        next(); // Resolves the waiting Promise → unblocks next task
      }
    }
  }
}
```

### How It Works

The throttle manages a pool of N concurrent "slots." Tasks that arrive when all slots are taken are suspended (not rejected) using a **Promise queue**.

**Slots available (running < maxConcurrent):**
```
run(task) called
  └─ running++ (e.g. 1 of 3)
  └─ await task()   ← task executes immediately
  └─ (task completes)
  └─ running--
  └─ wake up next queued task if any
```

**All slots full (running === maxConcurrent):**
```
run(task) called
  └─ await new Promise(resolve => queue.push(resolve))
       ↑ THIS SUSPENDS the async function here.
       ↑ The resolve function is stored in queue[].
       ↑ Execution returns to the event loop.

(Later, when a slot frees up...)
  └─ next = queue.shift()
  └─ next()   ← calls resolve(), which schedules the microtask
  └─ microtask runs: resumes the suspended run() past the await
  └─ running++
  └─ await task()
```

### Call Stack & Microtask Walkthrough

Using `throttle = new ConcurrencyThrottle(3)` and 5 tasks (i=1..5):

**Phase 1 — Tasks 1, 2, 3 start immediately (slots fill up)**

```
[Call Stack]                      [Microtask Queue]   [running]
────────────────────────────────────────────────────────────────
throttle.run(task1) pushed
  running < 3 → skip queue
  running++ → running=1
  await task1()  ← suspends run()
    simulateProgressBar(1) starts
    setTimeout(2000ms) registered → moves to Web APIs
  run(task1) frame suspended, popped

throttle.run(task2) pushed        [empty]             running=2
  ... same as task1 ...
  setTimeout(2000ms) registered

throttle.run(task3) pushed        [empty]             running=3
  ... same as task1 ...
  setTimeout(2000ms) registered
```

**Phase 2 — Tasks 4 and 5 arrive, all slots full**

```
throttle.run(task4) pushed
  running (3) >= maxConcurrent (3) → enters queue branch
  new Promise(resolve => queue.push(resolve))
    queue = [resolve4]
  await <pending Promise>  ← run(task4) SUSPENDS HERE
  run(task4) frame parked, popped from stack

throttle.run(task5) pushed
  same → queue = [resolve4, resolve5]
  run(task5) SUSPENDS
```

**Phase 3 — Task 1 finishes after 2000ms**

```
[Web APIs timer fires] → pushes callback to Macrotask Queue

[Event Loop picks up macrotask]
[Call Stack]
  setTimeout callback for task1 runs:
    console.log("[Finish] Progress Bar 1")
    resolve()   ← resolves task1's Promise

[Microtask Queue]:  continuation of `await task1()` in run(task1)
  run(task1) resumes in finally block:
    running-- → running=2
    queue.length > 0 → true
    next = queue.shift()   → resolve4
    next()   ← calls resolve4()

[Microtask Queue]:  resolve4 resolved → continuation of run(task4)'s await
  run(task4) resumes past `await new Promise(...)`
    running++ → running=3
    await task4()  ← task4 starts executing
    setTimeout(2000ms) registered for task4
    run(task4) suspends again at await task4()
```

**Key insight:** `next()` is called synchronously inside the `finally` block. This means `resolve4()` is triggered before the call stack empties. The microtask that resumes `run(task4)` is enqueued and runs *before* any new macrotask (like the next timer or I/O event) can fire.

### Promise Queue Mechanics

The queue stores **resolve functions**, not tasks. This is the critical design choice:

```
queue = [ resolve4, resolve5 ]
           ↑
           This is literally the internal resolve() of a Promise.
           Calling it transitions that Promise from pending → fulfilled.
           That transition schedules a microtask to resume the awaiting code.
```

**Visual timeline for 5 tasks, maxConcurrent=3, each takes 2s:**

```
Time:  0s          2s          4s
       ├───────────┤───────────┤
Task1: [===running===]
Task2: [===running===]
Task3: [===running===]
Task4:             [===running===]  ← woke up at 2s when task1 finished
Task5:             [===running===]  ← woke up at 2s when task2 finished
```

---

## JavaScript Event Loop Primer

Understanding these patterns requires understanding the JavaScript runtime's scheduling model:

```
┌──────────────────────────────────────────────────────────────┐
│                        JS Runtime                             │
│                                                              │
│  ┌──────────────┐    ┌──────────────────┐                   │
│  │  Call Stack  │    │    Web APIs       │                   │
│  │              │    │  setTimeout()     │                   │
│  │  (LIFO)      │    │  fetch()          │                   │
│  │  Synchronous │    │  DOM events       │                   │
│  │  execution   │    └────────┬─────────┘                   │
│  └──────┬───────┘             │ callbacks                    │
│         │                     ↓                              │
│         │            ┌────────────────────┐                  │
│         │            │  Macrotask Queue   │                  │
│         │            │  (setTimeout cb)   │                  │
│         │            │  (setInterval cb)  │                  │
│         │            └────────┬───────────┘                  │
│         │                     │                              │
│         │    ┌────────────────────────────┐                  │
│         │    │     Microtask Queue        │                  │
│         │    │  Promise .then() callbacks │                  │
│         │    │  async/await continuations │                  │
│         │    │  queueMicrotask()          │                  │
│         │    └──────────────┬─────────────┘                  │
│         │                   │ ALL microtasks drain           │
│         │                   │ before next macrotask          │
│         └───────────────────┘                               │
└──────────────────────────────────────────────────────────────┘
```

**Order of execution:**
1. Run all synchronous code on the call stack to completion
2. Drain the entire microtask queue (including microtasks added by microtasks)
3. Pick ONE macrotask (e.g., a fired setTimeout callback)
4. Go to step 2

**Why this matters for `ConcurrencyThrottle`:**

When `next()` (i.e., `resolve4()`) is called inside `finally`, it schedules a microtask. That microtask (resuming `run(task4)`) runs *before* the next setTimeout fires. This means task scheduling is tightly coupled and no clock cycle is wasted between a slot freeing and the next task claiming it.

---

## Side-by-Side Comparison

```
                   RateLimiter              ConcurrencyThrottle
                   ───────────              ───────────────────
Async?             No (sync)                Yes (async/await + Promises)
Overflow action    Reject (false)           Queue (wait)
State stored       Timestamp array          running counter + resolve[] queue
Memory growth      O(N) per window          O(queued tasks)
Clock-dependent?   Yes (Date.now)           No
Microtasks used?   None                     Yes (Promise resolution)
Macrotasks used?   None                     Only inside user tasks (setTimeout)
Thread-safe?       No (single-threaded JS)  No (single-threaded JS)
```

---

## When to Use Which

**Use `RateLimiter` when:**
- You want to enforce an API rate limit (e.g., 100 req/min per user)
- Excess requests should fail fast with a clear error
- You need time-based policy enforcement

**Use `ConcurrencyThrottle` when:**
- You have expensive parallel operations (file I/O, API calls, renders)
- You want to prevent resource exhaustion, not time-based abuse
- Callers should wait, not fail (e.g., upload queues, progress bars)

**Use both together when:**
- You have an API client that must respect rate limits AND limit parallel in-flight requests

```js
const rateLimiter = new RateLimiter(100);       // 100 requests per minute
const throttle    = new ConcurrencyThrottle(5); // max 5 in-flight at once

async function fetchData(url) {
  if (!rateLimiter.tryAccess()) throw new Error("429 Too Many Requests");
  return throttle.run(() => fetch(url));
}
```

---

*Last updated: April 2026*
