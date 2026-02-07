# OS Interview Q&A

> Common OS and concurrency questions in software engineer interviews, with short answers. Use with [OSConcepts.md](OSConcepts.md) for detail.

---

## Process and thread

### What is the difference between a process and a thread?

A **process** is an instance of a program with its own **memory space**, resources, and PID; processes are isolated. A **thread** is a unit of execution **inside** a process; threads in the same process **share** memory and resources but have their own stack and execution state. Threads are lighter; creating and switching threads is cheaper than processes. Multiple threads need synchronization (e.g. locks) when sharing data.

### Is JavaScript single-threaded or multi-threaded?

**JavaScript execution** in a given environment (browser main thread, Node main thread) is **single-threaded**: one thread runs the JS code and the event loop. **Web Workers** (and Node worker threads) run JS in **separate threads**, so you can have multiple threads, but each runs its own event loop and doesn’t share memory with the main thread (communication is via `postMessage`).

### What are Web Workers? When would you use them?

**Web Workers** run script in a **background thread** separate from the main thread. They can’t access the DOM or most global objects; they communicate with the main thread via **postMessage**. Use them for **CPU-heavy work** (parsing, crypto, heavy algorithms) so the main thread stays responsive and the UI doesn’t freeze. They provide **parallelism** (multiple cores), not just concurrency.

---

## Memory

### What is the difference between stack and heap?

The **stack** is used for **local variables** and **call frames** (return addresses, etc.). It’s LIFO, fixed size, and automatic (push on call, pop on return). The **heap** is for **dynamic allocation** (objects, large data); it’s shared, size is larger, and in JS it’s managed by the garbage collector. In JavaScript, primitives and references can live on the stack (or in registers); **objects, arrays, and closures** live on the **heap**.

### What is a stack overflow?

**Stack overflow** happens when the **stack** runs out of space. Common cause: unbounded or very deep **recursion** (each call adds a frame). Fix: reduce recursion depth, use iteration instead, or increase stack size (if the environment allows).

### What is garbage collection? How does it relate to JavaScript?

**Garbage collection (GC)** automatically reclaims **heap** memory that is no longer reachable. In JavaScript, you don’t free memory manually; the engine’s GC finds objects that nothing references and frees them. **Memory leaks** in JS usually mean you keep references (e.g. global variables, closures, detached DOM) so the GC can’t reclaim them.

---

## Concurrency and parallelism

### What is the difference between concurrency and parallelism?

**Concurrency** means multiple tasks **overlap in time** (you can start one, switch to another before the first finishes). This can happen on **one CPU** (e.g. time-slicing). **Parallelism** means multiple tasks **run at the same time** on **multiple cores/CPUs**. Single-threaded JS is **concurrent** (event loop, async) but not parallel on that thread; **Web Workers** give **parallelism**.

### Explain the event loop in JavaScript.

The **event loop** runs in a **single thread**. It takes **tasks** from queues and runs them one after another. **Macrotasks** (setTimeout, setInterval, I/O callbacks, UI events) run one at a time. After each macrotask, the engine runs **all pending microtasks** (Promises, queueMicrotask, MutationObserver) before the next macrotask. So: run one macrotask → run all microtasks → repeat. This is why `Promise.then` runs before the next `setTimeout` even if both were scheduled “after” the current code.

### What are microtasks vs macrotasks?

**Macrotasks:** setTimeout, setInterval, I/O (e.g. fetch callback), UI events. **Microtasks:** Promise then/catch/finally, queueMicrotask, MutationObserver. Rule: after **each** macrotask, the engine runs **all** microtasks before the next macrotask. So microtasks run “first” within the same logical turn and can starve the next macrotask if you queue many microtasks.

### Why might a page become unresponsive even with “async” code?

“Async” only means **I/O** doesn’t block (the OS or other threads do the wait). **CPU-bound work** (big loops, heavy computation) still runs on the **main thread** and blocks rendering and event handling. Solution: move CPU-heavy work to a **Web Worker** so the main thread stays free, or break the work into chunks (e.g. setTimeout or requestAnimationFrame) so the browser can paint and handle input between chunks.

---

## Deadlock and synchronization

### What is deadlock? How can you avoid it?

**Deadlock** is when two or more tasks each hold a resource and wait for a resource held by another (e.g. Thread 1 has A, wants B; Thread 2 has B, wants A). **Ways to avoid:** (1) **Lock ordering** — always acquire locks in the same order (e.g. always A then B). (2) **Timeout** — don’t wait forever; release and retry. (3) Design to avoid circular wait (fewer locks, or lock-free patterns where possible). In single-threaded JS, deadlock in the classic sense is rare because there’s no preemptive switching; it can still happen with Workers and shared synchronization primitives if you’re not careful.

### What is a race condition?

A **race condition** is when the result or behavior depends on the **order or timing** of concurrent operations (e.g. two threads read-then-write a variable; the final value depends on who ran first). Fix with **synchronization** (locks, atomic operations) or by designing so shared state is accessed in a safe, ordered way.

---

## Scheduling and system behavior

### What is context switching?

**Context switching** is when the OS (or runtime) **stops** one task (process/thread), **saves** its state (registers, stack pointer, etc.), and **loads** the state of another task so it can run. It has a cost (time, cache effects). Too many context switches can hurt performance.

### How does the browser’s main thread relate to the OS?

The browser’s **main thread** is one **OS thread**. It runs JS, layout, and paint. The OS **schedules** this thread like any other; if the thread is busy (long JS, layout), it can’t do something else at that moment. So “don’t block the main thread” means: avoid long synchronous work so the OS can schedule this thread to handle input and paint promptly.

---

## One-liners (quick recall)

- **Process vs thread:** Process = own memory, isolated; thread = inside process, shared memory, lighter.
- **JS single-threaded:** One thread runs JS and event loop; Workers = other threads, no shared memory.
- **Stack vs heap:** Stack = locals, call frames, automatic; heap = objects, dynamic, GC in JS.
- **Concurrency vs parallelism:** Concurrency = overlap in time; parallelism = same time on multiple cores.
- **Event loop:** Run one macrotask → run all microtasks → repeat; single thread.
- **Microtasks vs macrotasks:** Microtasks (Promise, queueMicrotask) run after current code and before next macrotask (setTimeout, I/O).
- **Deadlock:** Circular wait on resources; avoid with lock ordering, timeouts, or fewer locks.
- **Web Workers:** Background thread for CPU work; no DOM; postMessage to communicate; gives parallelism.
