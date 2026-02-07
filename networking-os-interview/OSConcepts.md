# OS Concepts for SWE Interviews

> Operating system topics that come up in software engineer interviews: processes, threads, memory, concurrency, scheduling, deadlock. Tied to how this affects front-end (event loop, single thread, Web Workers) and backend (Node, multi-threaded servers).

---

## 1. Process vs thread

### Process

- **Process** = an instance of a running program. It has its own **address space** (memory), **file descriptors**, and **PID**. Processes are isolated from each other; one crash doesn’t kill others (unless the OS or parent does).
- **Creation:** Fork (copy of parent) or exec (load new program). Heavy: own memory, PCB (Process Control Block).

### Thread

- **Thread** = unit of execution **inside** a process. Threads in the same process **share** address space, code, and data but have their own **stack** and **register state**. Lighter than a process; switching threads is cheaper than switching processes.
- **Multi-threading:** One process, multiple threads; shared memory → need synchronization (locks, etc.) to avoid races.

### Process vs thread (summary)

| | Process | Thread |
|---|---------|--------|
| Memory | Own address space | Shared with process |
| Creation/cost | Heavier | Lighter |
| Isolation | High | Low (shared memory) |
| Communication | IPC (pipes, sockets, etc.) | Shared memory (with care) |

### Why front-end / Node cares

- **Browser:** One **main thread** runs JS, layout, paint. **Web Workers** run in separate threads (no DOM, communicate via `postMessage`). So “single-threaded JS” = one thread per JS context; workers give multi-threading.
- **Node.js:** Single-threaded event loop for JS; I/O and heavy work can be offloaded (worker threads, child processes, native addons).

---

## 2. Memory: stack vs heap

### Stack

- **Stack:** Stores **local variables** and **call frames** (return address, saved registers). LIFO; each function call pushes a frame; return pops it. **Fixed size** (e.g. 1–8 MB); overflow = stack overflow.
- **Allocation:** Automatic (compiler/VM). Fast; scope is function lifetime.

### Heap

- **Heap:** Dynamic allocation (e.g. `new Object()`, `malloc`). Objects, closures, and large data live here. **Shared** across threads in the same process (with synchronization). Size limited by OS/virtual memory.
- **Allocation:** Manual (C/C++) or managed (JS: GC). Slower than stack; lifetime is until no longer referenced (or GC’d).

### In JavaScript

- **Primitives** (numbers, booleans, etc.) and **references** (to objects) can live on the stack (or in registers). **Objects, arrays, functions** (and their closures) live on the **heap**; variables hold references. GC reclaims heap when unreachable.

---

## 3. Concurrency vs parallelism

### Concurrency

- **Concurrency** = multiple tasks can **overlap in time** (start one, switch to another before the first finishes). Can be on **one core** (e.g. time-slicing: run A a bit, then B, then A again).
- **Example:** Single-threaded JS with async I/O: while waiting for a fetch, the engine can run other code. That’s **concurrent** (overlapping in time), not necessarily parallel.

### Parallelism

- **Parallelism** = multiple tasks **execute at the same time** on **multiple cores/CPUs**. Requires multiple threads or processes.
- **Example:** Web Workers run on different threads; true parallelism. Single main thread is concurrent but not parallel (one core for that thread).

### Summary

- **Concurrent:** Overlapping in time (can be one CPU).
- **Parallel:** Actually at the same time (needs more than one CPU/core for those tasks).

---

## 4. Event loop (browser / Node)

- **Single thread:** One thread runs JS. Long-running synchronous code **blocks** that thread (no click handlers, no paint until it finishes).
- **Event loop:** Pulls **tasks** from queues: run one task to completion, then the next. **Macrotasks:** setTimeout, setInterval, I/O callbacks, UI events. **Microtasks:** Promises (then/catch/finally), queueMicrotask, MutationObserver. After each **macrotask**, the engine runs **all** microtasks before the next macrotask.
- **Async:** I/O (network, file) is done by the OS or by other threads; when done, a callback is queued. So “non-blocking” = don’t hold the JS thread while waiting; the thread runs other code until the callback runs.
- **Why it matters:** Avoid long loops or heavy sync work on the main thread; use Workers for CPU-heavy work; understand “when” a promise callback runs (after current code and any other microtasks).

---

## 5. Scheduling (high level)

- **Scheduler:** OS decides which **process/thread** runs on which **CPU** and for how long. Goals: fairness, responsiveness, throughput.
- **Concepts:** **Preemption** = OS can interrupt a running task and switch to another. **Context switch** = save state of current task, load state of next; cost in time and cache. **Priority** = some tasks get more CPU or run first.
- **Front-end analogy:** Browser schedules tasks (JS, layout, paint, rAF); long JS blocks layout/paint and hurts responsiveness. Similar idea: “don’t block the main thread.”

---

## 6. Deadlock

- **Deadlock** = two or more tasks each hold a resource and wait for a resource held by another; **circular wait** → nobody can proceed.
- **Example:** Thread 1 holds lock A, waits for lock B; Thread 2 holds B, waits for A → deadlock.
- **Conditions (all needed):** Mutual exclusion, hold-and-wait, no preemption, circular wait.
- **Avoidance:** (1) **Ordering:** Always take locks in the same order (e.g. always A then B). (2) **Timeout:** Don’t wait forever; back off and retry. (3) **Avoid multiple locks** where possible; design so circular wait can’t happen.

---

## 7. IPC (Inter-Process Communication)

- **IPC** = how **processes** exchange data (they don’t share memory). Examples: **pipes**, **sockets**, **shared memory** (with OS support), **message queues**, **signals**.
- **When it matters:** Microservices (processes on same or different machines talk via network/sockets); parent–child processes (pipes); browser (tabs are separate processes; no direct shared memory).

---

## 8. Virtual memory (brief)

- **Virtual memory:** Each process has a **virtual address space**; the OS maps virtual addresses to **physical RAM** (or disk when swapped). Processes don’t see each other’s memory; OS manages pages and page tables.
- **Benefit:** Isolation, and more “address space” than physical RAM (paging/swapping). **Page fault** = reference to a page not in RAM; OS loads it (and may evict another page).

---

## 9. How this ties to front-end and backend

| Topic | Front-end | Backend |
|-------|-----------|---------|
| **Single thread** | Main thread runs JS; block = frozen UI | Node: one thread for JS; I/O is async |
| **Workers** | Web Workers for heavy work; no DOM | Worker threads, child processes, cluster |
| **Concurrency** | Event loop, async/await, microtasks | Event loop (Node), or multi-thread (Java/Go) |
| **Memory** | Heap (objects); stack (calls); GC | Same ideas; plus server memory limits |
| **Deadlock** | Rare in single-threaded JS; possible with Workers + shared primitives | Locks in multi-threaded code; DB transactions |

---

For **interview Q&A** on these topics, see [OSInterviewQA.md](OSInterviewQA.md).
