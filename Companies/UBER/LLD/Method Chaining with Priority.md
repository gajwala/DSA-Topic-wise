# Method Chaining with Priority — UberDriver (SDE-2, Uber)

> **Interview Context:** SDE-2 harder variant — tests **fluent API design**, **async control flow**, **JS event loop & microtask queue**, **task prioritization via splice**, and **promise chaining**.

---

## Problem Statement

Implement a `UberDriver` class that supports method chaining where tasks execute **sequentially** (not concurrently), with:

- Some methods introducing **async delays**
- `coffeeBreak()` always executing **before** regular tasks regardless of its position in the chain (priority behavior)

```javascript
new UberDriver()
  .pick('TestUser')
  .pick('Rahul')
  .coffeeBreak(3)      // ← called 3rd, but executes FIRST
  .drive(2)
  .drop('Rahul')
  .drive(4)
  .drop('TestUser')
  .rest(10)
```

### Expected Output

```
Hello uber driver is online       ← constructor, t=0s
User is on coffee break           ← priority task runs first, t=0s
  ... wait 3s ...
User TestUser is picked           ← t=3s
User Rahul is picked              ← t=3s
Driver is driving                 ← t=3s
  ... wait 2s ...
Drop Rahul                        ← t=5s
Driver is driving                 ← t=5s
  ... wait 4s ...
Drop TestUser                     ← t=9s
Driver is in offline mode         ← t=9s
  ... wait 10s ...
                                  ← chain complete t=19s
```

---

## Implementation

```javascript
class UberDriver {
  constructor() {
    this.queue = [];
    console.log('Hello uber driver is online');
    queueMicrotask(() => this._execute());
  }

  _execute() {
    let chain = Promise.resolve();
    for (const task of this.queue) {
      chain = chain.then(() => task());
    }
  }

  _sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  _enqueue(task, priority = false) {
    if (priority) {
      // Insert after the last priority task already in the queue
      const idx = this.queue.findLastIndex(t => t._priority) + 1;
      this.queue.splice(idx, 0, task);
    } else {
      this.queue.push(task);
    }
    return this;
  }

  pick(user) {
    return this._enqueue(async () => {
      console.log(`User ${user} is picked`);
    });
  }

  coffeeBreak(seconds) {
    const task = async () => {
      console.log('User is on coffee break');
      await this._sleep(seconds);
    };
    task._priority = true;              // mark as priority
    return this._enqueue(task, true);   // splice to front of queue
  }

  drive(seconds) {
    return this._enqueue(async () => {
      console.log('Driver is driving');
      await this._sleep(seconds);
    });
  }

  drop(user) {
    return this._enqueue(async () => {
      console.log(`Drop ${user}`);
    });
  }

  rest(seconds) {
    return this._enqueue(async () => {
      console.log('Driver is in offline mode');
      await this._sleep(seconds);
    });
  }
}
```

---

## How It Works — 3 Key Mechanisms

### 1. `queueMicrotask` — deferred execution

```javascript
// Constructor
queueMicrotask(() => this._execute());
```

All `.pick()`, `.coffeeBreak()`, `.drive()` etc. are called **synchronously** during chain construction. `queueMicrotask` ensures `_execute()` only fires **after the entire chain is built** — after the current synchronous block completes, but before any `setTimeout` (macro-task).

```
Sync block:                         Microtask queue fires:
─────────────────────────────       ──────────────────────
new UberDriver()  → schedules _execute()
.pick()           → push to queue
.coffeeBreak()    → splice to queue
.drive()          → push to queue
...all sync done...             →   _execute() runs now
```

If you used `setTimeout(fn, 0)` instead, it would still work but fires later in the event loop (macro-task). `queueMicrotask` is the precise and correct choice.

### 2. Priority via `splice` — single queue, not two arrays

```javascript
_enqueue(task, priority = false) {
  if (priority) {
    const idx = this.queue.findLastIndex(t => t._priority) + 1;
    this.queue.splice(idx, 0, task);
  } else {
    this.queue.push(task);
  }
  return this;
}
```

Instead of maintaining a separate `coffeeBreaks[]` array (which loses positional ordering between priority tasks), this uses **one queue** with a splice strategy:

- Find the last priority task already inserted
- Insert the new priority task immediately after it
- Normal tasks always go to the end with `push`

**Multiple coffee breaks stack correctly:**

```javascript
.coffeeBreak(2)  → splice at index 0  →  queue: [cb(2)]
.coffeeBreak(5)  → splice at index 1  →  queue: [cb(2), cb(5)]
.pick('X')       → push               →  queue: [cb(2), cb(5), pick(X)]
```

### 3. `_execute` — single promise chain

```javascript
_execute() {
  let chain = Promise.resolve();
  for (const task of this.queue) {
    chain = chain.then(() => task());
  }
}
```

Each task is chained onto the previous one via `.then()`. Because tasks are async functions that `await this._sleep()`, each one resolves only after its delay — so the chain is truly sequential, never concurrent.

---

## Queue State Walkthrough

```javascript
new UberDriver()
  .pick('TestUser')   // push    → [pick(TestUser)]
  .pick('Rahul')      // push    → [pick(TestUser), pick(Rahul)]
  .coffeeBreak(3)     // splice  → [coffeeBreak(3), pick(TestUser), pick(Rahul)]
  .drive(2)           // push    → [coffeeBreak(3), pick(TestUser), pick(Rahul), drive(2)]
  .drop('Rahul')      // push    → [..., drive(2), drop(Rahul)]
  .drive(4)           // push    → [..., drop(Rahul), drive(4)]
  .drop('TestUser')   // push    → [..., drive(4), drop(TestUser)]
  .rest(10)           // push    → [..., drop(TestUser), rest(10)]
```

`_execute()` then chains these in order — coffeeBreak goes first because splice put it there.

---

## Execution Timeline

```
t=0s  →  "Hello uber driver is online"
t=0s  →  "User is on coffee break"
t=3s  →  "User TestUser is picked"
t=3s  →  "User Rahul is picked"
t=3s  →  "Driver is driving"
t=5s  →  "Drop Rahul"
t=5s  →  "Driver is driving"
t=9s  →  "Drop TestUser"
t=9s  →  "Driver is in offline mode"
t=19s →  (chain complete)
```

---

## Why Not Two Separate Arrays?

A common first attempt uses `coffeeBreaks[]` and `tasks[]`:

```javascript
// ❌ Naïve approach
execute() {
  let chain = Promise.resolve();
  for (let cb of this.coffeeBreaks) chain = chain.then(() => cb());
  for (let task of this.tasks)      chain = chain.then(() => task());
}
```

This works for **one** coffee break but breaks the **relative ordering** between multiple priority tasks and loses the ability to interleave priority tasks precisely. The single-queue + splice approach is both simpler and more correct.

---

## Design Patterns Used

| Pattern | Where |
|---|---|
| **Fluent Interface** | Every method returns `this` |
| **Command Pattern** | Each method enqueues a closure |
| **Priority Queue (splice)** | `coffeeBreak` uses `_priority` flag + `findLastIndex` |
| **Promise Chain** | `_execute` chains `.then()` sequentially |
| **Deferred Execution** | `queueMicrotask` delays `_execute` until sync block completes |

---

## Common Interview Follow-ups

**Q: Why `queueMicrotask` and not `setTimeout(fn, 0)`?**
Both work, but `queueMicrotask` fires in the microtask queue — after the current synchronous code but before any macro-tasks (timers, I/O). It's more precise and idiomatic for this use case.

**Q: What if `coffeeBreak` is called twice?**
`findLastIndex` finds the last priority task already in the queue and inserts after it — so both coffee breaks queue in order at the front, ahead of all regular tasks.

**Q: What if a task throws an error?**
The promise chain short-circuits. Wrap each task to handle gracefully:
```javascript
_execute() {
  let chain = Promise.resolve();
  for (const task of this.queue) {
    chain = chain.then(() => task()).catch(err => console.error('Task failed:', err));
  }
}
```

**Q: How would you add a `.cancel()` method?**
Set `this.cancelled = true` and check at the start of each task before executing:
```javascript
const task = async () => {
  if (this.cancelled) return;
  console.log(`User ${user} is picked`);
};
```

**Q: `queueMicrotask` vs `Promise.resolve().then()`?**
Functionally equivalent here — both schedule a microtask. `queueMicrotask` is more explicit and slightly lower overhead since it doesn't create a Promise object.

---

## Complexity

| | Value |
|---|---|
| Time | O(N) — each task executes once |
| Space | O(N) — N closures in the queue |
| Splice cost | O(N) — shifts elements, acceptable for small queues |
| Concurrency | None — strictly sequential |

---

## Files

```
uber-driver/
├── README.md        ← this file
└── uberDriver.js    ← implementation
```
