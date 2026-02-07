# JavaScript Performance Techniques

> Runtime performance in the browser: events, DOM, animations, and heavy work.

---

## 1. Debounce and throttle

### Debounce

- Run a function **once** after a burst of events has stopped for a delay (e.g. search on typing stop).

```javascript
function debounce(fn, delay) {
  let id;
  return function (...args) {
    clearTimeout(id);
    id = setTimeout(() => fn.apply(this, args), delay);
  };
}

const handleSearch = debounce((q) => fetchResults(q), 300);
input.addEventListener('input', (e) => handleSearch(e.target.value));
```

### Throttle

- Run a function at most once per time window (e.g. scroll/resize handler).

```javascript
function throttle(fn, limit) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= limit) {
      last = now;
      fn.apply(this, args);
    }
  };
}

window.addEventListener('scroll', throttle(() => updateProgress(), 100));
```

### When to use

| Scenario | Prefer |
|----------|--------|
| Search as you type | Debounce |
| Scroll/resize handler | Throttle (or passive listener) |
| Button double-click | Debounce |

---

## 2. requestAnimationFrame (rAF)

- Run logic **once per frame** before the next repaint. Use for smooth animations and visual updates instead of `setInterval`/setTimeout.

```javascript
function animate() {
  updatePosition();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

- **Cancel:** `cancelAnimationFrame(id)`.
- **Benefit:** Pauses when tab is hidden; syncs with refresh rate (e.g. 60fps).

---

## 3. Event delegation

- Attach **one** listener on a parent; use `event.target` to handle many children. Reduces listeners and memory.

```javascript
list.addEventListener('click', (e) => {
  const item = e.target.closest('[data-id]');
  if (item) selectItem(item.dataset.id);
});
```

---

## 4. Passive event listeners

- Mark scroll/touch listeners as **passive** so the browser can scroll without waiting for the handler (improves scroll jank).

```javascript
element.addEventListener('touchmove', onTouch, { passive: true });
```

---

## 5. DOM and reflows

### Batch reads and writes

- **Reflow** (layout) is triggered by reading layout (offsetHeight, getBoundingClientRect, etc.) and by writes (styles, DOM). Interleaving reads and writes forces multiple layouts. **Read all, then write all.**

```javascript
// Bad: read-write-read-write
elements.forEach((el) => {
  el.style.width = el.offsetWidth + 10 + 'px'; // read + write per item
});

// Better: read phase then write phase
const widths = elements.map((el) => el.offsetWidth);
elements.forEach((el, i) => {
  el.style.width = widths[i] + 10 + 'px';
});
```

### Minimize DOM size

- Fewer nodes → faster layout and paint. Prefer virtualization for long lists; avoid deeply nested wrappers.

### DocumentFragment

- Batch DOM inserts: build nodes in a `DocumentFragment`, then append once.

```javascript
const frag = document.createDocumentFragment();
items.forEach((item) => {
  const li = document.createElement('li');
  li.textContent = item.name;
  frag.appendChild(li);
});
list.appendChild(frag);
```

---

## 6. Web Workers

- Offload **CPU-heavy** work to a background thread so the main thread stays responsive (no UI freeze).

```javascript
// main.js
const worker = new Worker('./worker.js');
worker.postMessage({ data: bigArray });
worker.onmessage = (e) => setResult(e.data);

// worker.js
self.onmessage = (e) => {
  const result = heavyComputation(e.data.data);
  self.postMessage(result);
};
```

- **Limitation:** No DOM access; communicate via `postMessage`. Use for parsing, crypto, heavy algorithms.

---

## 7. Microtasks vs macrotasks

- **Microtasks** (Promise, queueMicrotask): run after current script, before next macrotask. Can starve I/O if you queue many.
- **Macrotasks** (setTimeout, setInterval, I/O): run in next event loop tick.
- Break long work with `setTimeout(0)` or `requestAnimationFrame` so the main thread can handle input and paint.

```javascript
function processChunk(items, start, cb) {
  const chunk = 100;
  let i = start;
  (function run() {
    const end = Math.min(i + chunk, items.length);
    for (; i < end; i++) process(items[i]);
    if (i < items.length) setTimeout(run, 0);
    else cb();
  })();
}
```

---

## 8. Memory and leaks

### Common leaks

- **Global or long-lived references** to DOM nodes that are removed from the tree.
- **Closures** holding large objects or DOM.
- **Intervals/listeners** not cleared when component or element is gone.

### Good practices

- Remove event listeners in cleanup (or use AbortController with `{ signal }`).
- Clear intervals/timeouts in cleanup.
- Avoid storing DOM nodes in globals or long-lived closures; null out when done.
- For SPA: unsubscribe from stores/promises in unmount/cleanup.

```javascript
useEffect(() => {
  const c = new AbortController();
  element.addEventListener('click', handler, { signal: c.signal });
  return () => c.abort();
}, []);
```

---

## 9. Async and loading

- **Defer non-critical JS:** `<script defer>` or load after first paint.
- **Async for independent scripts:** `<script async>`.
- Prefer **dynamic import** for code that isn’t needed at startup.

---

## 10. Checklist (quick)

- [ ] Debounce/throttle high-frequency events (input, scroll, resize).
- [ ] Use requestAnimationFrame for animations.
- [ ] Prefer event delegation where it fits.
- [ ] Use passive listeners for scroll/touch when you don’t preventDefault.
- [ ] Batch DOM reads then writes; minimize DOM size.
- [ ] Offload heavy computation to Web Workers.
- [ ] Avoid memory leaks (cleanup listeners, intervals, subscriptions).
