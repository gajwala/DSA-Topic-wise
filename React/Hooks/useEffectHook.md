# useEffect Hook

## Theory

- **Purpose:** Run **side effects** after render (and optionally after every re-render or when deps change).
- **Signature:** `useEffect(setup, dependencies?)`
  - **setup:** function that runs after commit; can return a **cleanup** function.
  - **dependencies:** optional array. If omitted, effect runs after every render. If `[]`, runs once after mount. If `[a, b]`, runs when `a` or `b` change.

### Execution order

1. Render (and commit to DOM).
2. Browser paint (if applicable).
3. Run effect **setup**.
4. On next effect run or unmount: run previous effect’s **cleanup**, then new **setup**.

### Cleanup

- Return a function from the effect to clean up (subscriptions, timers, listeners).
- Cleanup runs before the next effect run and on unmount.

```javascript
useEffect(() => {
  const id = setInterval(() => {}, 1000);
  return () => clearInterval(id); // cleanup
}, []);
```

---

## Examples

### Run once on mount (e.g. fetch)

```javascript
useEffect(() => {
  let cancelled = false;
  fetch('/api/data')
    .then((res) => res.json())
    .then((data) => {
      if (!cancelled) setData(data);
    });
  return () => { cancelled = true; };
}, []);
```

### Sync with external store / subscription

```javascript
useEffect(() => {
  const unsub = store.subscribe(() => setState(store.getState()));
  return () => unsub();
}, []);
```

### When deps change

```javascript
useEffect(() => {
  if (!id) return;
  const c = new AbortController();
  fetch(`/api/item/${id}`, { signal: c.signal })
    .then((r) => r.json())
    .then(setItem)
    .catch(ignoreAbort);
  return () => c.abort();
}, [id]);
```

---

## Differences

| vs | Difference |
|----|------------|
| **useLayoutEffect** | `useLayoutEffect` runs **synchronously** after DOM updates, before paint; use for DOM measurements or mutations that must run before paint. |
| **Event handler** | Use effect for “after render” or “when X changes”; use event handlers for “on user action”. |
| **React 19 use()** | For **data loading**, React 19 prefers **use(promise)** in components (or Server Components); use **useEffect** for imperative subscriptions, focus, timers, etc. |

---

## Common pitfalls

1. **Missing deps** – Lint rule `exhaustive-deps`; add all values from the effect that come from props/state, or acknowledge why you omit them.
2. **Stale closure** – Effect captures props/state at run time; if you need “latest”, use a ref or ensure deps are correct.
3. **Infinite loop** – Object/array in deps recreated every render; use stable ref or primitive deps.

---

## React 19

- `useEffect` is unchanged.
- For **data fetching**, React 19 encourages **use(promise)** + Suspense instead of `useEffect` + loading state where it fits.
