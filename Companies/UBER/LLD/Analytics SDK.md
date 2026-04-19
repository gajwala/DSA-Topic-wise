# Analytics SDK (JavaScript)

A client-side analytics module that collects JSON events, buffers them in memory, persists unsent events in browser storage, and sends them to an API in batches.

This design is intended to be interview-friendly and production-aware.

---

## Problem Statement

Build an analytics module that:

- accepts analytics JSON blobs through a `track()` API
- batches events to reduce network overhead
- flushes events either:
  - when the batch reaches a configured size, or
  - when a configured time interval elapses
- persists unsent events so data is not lost on refresh, crash, or temporary API failure
- retries failed requests
- attempts a best-effort flush when the page is hidden or closed

---

## Final Requirements

### Functional Requirements

1. Accept events through a `track()` method.
2. Enrich each event with metadata such as:
   - unique event ID
   - timestamp
3. Buffer events in memory.
4. Persist events immediately to browser storage.
5. Flush events when:
   - `batchSize` is reached, or
   - `flushInterval` expires.
6. Send events to a backend API in batched requests.
7. Remove events from storage only after successful delivery.
8. Retry failed requests with backoff.
9. Rehydrate unsent events from storage during initialization.
10. Attempt best-effort delivery on lifecycle events such as:
    - `visibilitychange`
    - `pagehide`
    - optionally `beforeunload`

### Non-Functional Requirements

- **Reliability:** avoid data loss; support at-least-once delivery
- **Performance:** reduce network overhead through batching
- **Persistence:** survive page refresh and temporary failures
- **Scalability:** support larger queues with IndexedDB
- **Non-blocking:** keep `track()` lightweight and avoid blocking the main thread
- **Extensibility:** support pluggable storage backends
- **Ordering:** preserve FIFO ordering when flushing

---

## High-Level Design

The SDK can be modeled as a **durable event queue**.

### Core Components

#### 1. In-memory queue
A fast queue that temporarily holds new events.

#### 2. Persistent storage adapter
A pluggable abstraction for storing unsent events.

Implementations:
- `LocalStorageQueueStore`
- `IndexedDBQueueStore`

#### 3. Flush manager
Responsible for deciding when to send:
- by batch size
- by timer
- by page lifecycle event

#### 4. Transport layer
Sends batches to the analytics API using:
- `fetch`
- `navigator.sendBeacon` for best-effort unload delivery

---

## Data Flow

```text
track(event)
  -> enrich event with id + timestamp
  -> push to in-memory queue
  -> persist to storage
  -> if queue length >= batchSize: flush
  -> else: start or keep flush timer

flush()
  -> take oldest N events
  -> send to API
  -> if success: delete from queue + storage
  -> if failure: keep data and retry later
```

---

## Public API

### `init()`
Loads any previously unsent events from storage and prepares lifecycle handlers.

### `track(blob)`
Accepts a JSON analytics event.

Example:

```js
await analytics.track({
  type: "button_click",
  buttonId: "signup"
});
```

### `flush()`
Immediately attempts to send queued events.

---

## Example Event Shape

```json
{
  "id": "1713520000000-ab12cd",
  "timestamp": "2026-04-19T10:00:00.000Z",
  "payload": {
    "type": "page_view",
    "page": "/pricing"
  }
}
```

---

## Storage Options

### Option 1: localStorage

**Pros**
- simple
- easy to implement
- good for small interview demos

**Cons**
- synchronous
- blocks the main thread
- limited storage size
- less suitable for high-volume analytics

### Option 2: IndexedDB

**Pros**
- asynchronous
- larger capacity
- better for production
- avoids blocking the main thread during storage operations

**Cons**
- more implementation complexity

### Recommendation

Use a storage interface so the SDK remains storage-agnostic. Use IndexedDB by default for production workloads and localStorage only for simpler cases.

---

## Batching Strategy

The SDK should flush when either condition is met:

1. **Size-based flush**
   - Example: send when queue length reaches `batchSize = 10`

2. **Time-based flush**
   - Example: send every `flushInterval = 5000 ms`

This handles both:
- high activity users, where batches fill quickly
- low activity users, where events still need to be sent eventually

---

## Reliability Model

This design provides **at-least-once delivery**.

That means:
- events should not be lost
- duplicate delivery may occasionally happen

To handle duplicates safely:
- assign a unique ID to every event
- let the backend deduplicate by event ID

Events must be removed from storage **only after the API confirms success**.

---

## Retry Strategy

When an API request fails:

- keep the events in memory and storage
- retry with exponential backoff
- resume sending later

Example:
- 1st retry: 1 second
- 2nd retry: 2 seconds
- 3rd retry: 4 seconds

Optional improvement:
- add **jitter** to avoid synchronized retries from many clients

---

## Lifecycle / Exit Handling

For best-effort delivery before the page goes away, use:

- `visibilitychange`
- `pagehide`
- optionally `beforeunload`

### Recommended behavior

- if page becomes hidden, try to send a small final batch
- use `navigator.sendBeacon()` when available
- fallback to `fetch(..., { keepalive: true })`

### Important note

These lifecycle-triggered sends are **best effort only**.
True reliability still comes from:
- persistent storage
- rehydrating unsent events on the next page load
- retrying failed batches later

---

## Non-Blocking Behavior

A key design goal is that `track()` should be lightweight.

### `track()` should do only minimal work

- create a small event object
- append to memory queue
- schedule persistence / flushing asynchronously

### Avoid in `track()`

- heavy `JSON.stringify()` on large payloads
- large array copies
- frequent synchronous localStorage writes
- inline flush/network operations

### Better approach

- treat `track()` as an enqueue operation
- defer expensive work to async tasks
- prefer IndexedDB because it is asynchronous
- serialize and send during flush, not during `track()`

### Interview-ready phrasing

> `track()` should only enqueue events. Persistence, serialization, and network transmission should happen asynchronously so the UI thread is not blocked.

---

## Edge Cases

### 1. Duplicate delivery
Lifecycle events or retries may send the same event more than once.

**Mitigation:** use event IDs and server-side deduplication.

### 2. Multi-tab duplication
Multiple tabs could read the same persistent queue and flush simultaneously.

**Mitigation ideas:**
- `BroadcastChannel`
- simple locking
- leader election

### 3. Queue growth when API is down
If the server stays unavailable for a long time, the queue can grow indefinitely.

**Mitigation ideas:**
- maximum queue size
- dropping policy
- compression
- telemetry / alerts

### 4. Partial success from backend
A backend might accept only some events in a batch.

**Mitigation:** backend returns accepted and rejected IDs; client only keeps rejected ones.

### 5. Ordering
Events should usually be sent in FIFO order.

### 6. Tab close / mobile backgrounding
Lifecycle signals may vary across browsers and platforms, especially on mobile.

**Mitigation:** rely on persistence and retry as the real source of correctness.

---

## Suggested Class Responsibilities

### `AnalyticsClient`
Responsible for:
- initializing from storage
- accepting tracked events
- scheduling flushes
- sending batches
- retrying on failure
- wiring lifecycle handlers

### `LocalStorageQueueStore`
Responsible for:
- loading persisted events
- appending events
- removing sent events

### `IndexedDBQueueStore`
Responsible for:
- scalable async event persistence
- loading events during startup
- deleting successful events

---

## Example Usage

### Using localStorage

```js
const analytics = new AnalyticsClient({
  endpoint: "/api/analytics",
  batchSize: 5,
  flushInterval: 3000,
  store: new LocalStorageQueueStore()
});

await analytics.init();

await analytics.track({ type: "button_click", buttonId: "signup" });
await analytics.track({ type: "page_view", page: "/pricing" });
```

### Using IndexedDB

```js
const analytics = new AnalyticsClient({
  endpoint: "/api/analytics",
  batchSize: 20,
  flushInterval: 5000,
  store: new IndexedDBQueueStore()
});

await analytics.init();
```

---

## Pseudocode Summary

```js
class LocalStorageQueueStore {
  constructor(key = "analytics_queue") {
    this.key = key;
  }

  async load() {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  async save(events) {
    localStorage.setItem(this.key, JSON.stringify(events));
  }

  async append(event) {
    const events = await this.load();
    events.push(event);
    await this.save(events);
  }

  async removeByIds(ids) {
    const idSet = new Set(ids);
    const events = await this.load();
    const filtered = events.filter(event => !idSet.has(event.id));
    await this.save(filtered);
  }

  async replaceAll(events) {
    await this.save(events);
  }
}

class IndexedDBQueueStore {
  constructor(dbName = "AnalyticsDB", storeName = "queue") {
    this.dbName = dbName;
    this.storeName = storeName;
    this.dbPromise = this.open();
  }

  open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "id" });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async withStore(mode, callback) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, mode);
      const store = tx.objectStore(this.storeName);
      const result = callback(store);

      tx.oncomplete = () => resolve(result);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }

  async load() {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readonly");
      const store = tx.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async append(event) {
    await this.withStore("readwrite", store => {
      store.put(event);
    });
  }

  async removeByIds(ids) {
    await this.withStore("readwrite", store => {
      ids.forEach(id => store.delete(id));
    });
  }

  async replaceAll(events) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      store.clear();

      events.forEach(event => store.put(event));

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }
}

class AnalyticsClient {
  constructor({
    endpoint,
    batchSize = 10,
    flushInterval = 5000,
    store,
    fetchImpl = fetch,
    maxRetries = 3,
    retryBaseDelay = 1000
  }) {
    if (!endpoint) throw new Error("endpoint is required");
    if (!store) throw new Error("store is required");

    this.endpoint = endpoint;
    this.batchSize = batchSize;
    this.flushInterval = flushInterval;
    this.store = store;
    this.fetchImpl = fetchImpl;
    this.maxRetries = maxRetries;
    this.retryBaseDelay = retryBaseDelay;

    this.queue = [];
    this.timer = null;
    this.flushing = false;
    this.started = false;
  }

  async init() {
    this.queue = await this.store.load();
    this.started = true;

    if (this.queue.length > 0) {
      this.scheduleFlush();
    }

    this.attachUnloadHandler();
  }

  createEvent(payload) {
    return {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      timestamp: new Date().toISOString(),
      payload
    };
  }

  async track(blob) {
    if (!this.started) {
      throw new Error("Call init() before track()");
    }

    const event = this.createEvent(blob);

    this.queue.push(event);
    await this.store.append(event);

    if (this.queue.length >= this.batchSize) {
      await this.flush();
    } else {
      this.scheduleFlush();
    }
  }

  scheduleFlush() {
    if (this.timer) return;

    this.timer = setTimeout(async () => {
      this.timer = null;
      await this.flush();
    }, this.flushInterval);
  }

  cancelFlushTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  async flush() {
    if (this.flushing) return;
    if (this.queue.length === 0) return;

    this.flushing = true;
    this.cancelFlushTimer();

    try {
      while (this.queue.length > 0) {
        const batch = this.queue.slice(0, this.batchSize);
        await this.sendWithRetry(batch);

        const ids = batch.map(event => event.id);
        this.queue = this.queue.slice(batch.length);
        await this.store.removeByIds(ids);
      }
    } catch (error) {
      console.error("Flush failed:", error);
      if (this.queue.length > 0) {
        this.scheduleFlush();
      }
    } finally {
      this.flushing = false;
    }
  }

  async sendWithRetry(batch) {
    let attempt = 0;

    while (attempt <= this.maxRetries) {
      try {
        const response = await this.fetchImpl(this.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ events: batch })
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return;
      } catch (error) {
        attempt += 1;

        if (attempt > this.maxRetries) {
          throw error;
        }

        const delay = this.retryBaseDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  attachUnloadHandler() {
    window.addEventListener("beforeunload", () => {
      if (this.queue.length === 0) return;
      if (!navigator.sendBeacon) return;

      const batch = this.queue.slice(0, this.batchSize);
      const payload = JSON.stringify({ events: batch });
      navigator.sendBeacon(this.endpoint, payload);
    });
  }
}

(async ()=>{
const analytics = new AnalyticsClient({
  endpoint: "/api/analytics",
  batchSize: 20,
  flushInterval: 5000,
  store: new IndexedDBQueueStore()
});

await analytics.init();

await analytics.track({
  type: "button_click",
  buttonId: "signup"
});

await analytics.track({
  type: "page_view",
  page: "/pricing"
});
})()


```

---

## What I Would Say in an Interview

> I’d implement the analytics module as an append-only durable queue. Every event is enriched with an ID and timestamp, added to an in-memory buffer, and persisted immediately so it survives refreshes and failures. The SDK flushes either when enough events accumulate or when a timer expires. On success, sent events are removed from storage; on failure, they remain for retry. For page exit, I’d use visibilitychange and pagehide with sendBeacon for best-effort delivery, while relying on storage plus retry for true reliability.

---

## Improvements I Would Add Next

1. TypeScript types for event schemas
2. payload byte-size batching, not just event count
3. retry backoff with jitter
4. better IndexedDB indexing and pagination
5. multi-tab coordination
6. metrics hooks such as:
   - `onFlushSuccess`
   - `onFlushError`
   - `onQueueSizeChange`
7. compression for large payloads
8. schema validation / event filtering
9. consent management and privacy controls
10. support for partial success responses from backend

---

## Short Conclusion

This SDK design balances:
- efficiency through batching
- reliability through persistent storage and retry
- responsiveness through lightweight `track()` behavior
- resilience through lifecycle-aware best-effort delivery

For interview purposes, it demonstrates both implementation thinking and system design tradeoff awareness.
