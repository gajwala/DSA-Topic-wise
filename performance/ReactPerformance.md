# React Performance Techniques

> How to make React apps faster: rendering, bundle size, and runtime patterns.

---

## 1. Avoid unnecessary re-renders

### React.memo (component memoization)

- Wraps a component so it only re-renders when **props** change (shallow compare).
- Use when parent re-renders often but props to this child are stable.

```jsx
const ExpensiveChild = React.memo(function ExpensiveChild({ name, onClick }) {
  return <div onClick={onClick}>{name}</div>;
});
```

- **When not to use:** When props change every time (e.g. inline objects/functions from parent). Then stabilize with `useMemo`/`useCallback` in parent, or accept re-renders if cheap.

### useMemo (expensive computations)

- Cache a **value** so it’s only recomputed when dependencies change.

```jsx
const filteredList = useMemo(
  () => items.filter((i) => i.name.includes(query)),
  [items, query]
);
```

- Use for: heavy derivations, or when you need a **stable reference** (e.g. object/array in dependency arrays or passed to memoized children).

### useCallback (stable function reference)

- Cache a **function** so the reference is stable across renders when deps don’t change.

```jsx
const handleSubmit = useCallback(() => {
  submit(name);
}, [name]);
```

- Use when passing callbacks to `React.memo` children or in effect dependency arrays. Don’t overuse; measure first.

### Keys (list reconciliation)

- Use **stable, unique keys** (e.g. `id` from data). Avoid index as key when list can reorder/filter; avoid random keys.
- Wrong keys cause unnecessary DOM updates and can break component state.

```jsx
{items.map((item) => <Item key={item.id} data={item} />)}
```

---

## 2. Code splitting and lazy loading

- Split the bundle so initial load only fetches what’s needed; load routes or heavy components on demand.

### React.lazy + Suspense

```jsx
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Dashboard />
    </Suspense>
  );
}
```

- Use for: route-level or heavy above-the-fold components. Keep fallback small so LCP isn’t hurt.

### Dynamic import (non-React)

```javascript
button.addEventListener('click', async () => {
  const { Chart } = await import('./chart');
  renderChart(Chart);
});
```

---

## 3. Virtualization (long lists)

- Render only visible items (plus a small buffer) instead of thousands of DOM nodes. Improves render time, scroll performance, and memory.

### Concept

- Use a “window” of items (e.g. 20–50) based on scroll position; recycle DOM or mount/unmount as user scrolls.

### Libraries

- **react-window** / **react-virtualized**: list and grid virtualization.
- **@tanstack/react-virtual**: headless, flexible.

```jsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });
  return (
    <div ref={parentRef} style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(({ index, start }) => (
          <div key={items[index].id} style={{ position: 'absolute', top: start }}>
            {items[index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 4. Bundle size

- Smaller JS → faster parse/compile and download → better TTI and LCP.

### Techniques

- **Tree shaking:** Use ES modules; avoid importing whole libraries (`lodash` → `lodash-es` or per-method imports).
- **Analyze:** `webpack-bundle-analyzer`, `source-map-explorer`, or Vite’s rollup visualizer.
- **Replace heavy libs:** Prefer smaller alternatives (e.g. day.js vs moment).
- **Duplicate dependencies:** Dedupe (e.g. single version of React via resolutions/overrides).

---

## 5. Rendering patterns

### Avoid inline objects/functions when child is memoized

```jsx
// Bad: new object every render → memo useless
<Child style={{ margin: 10 }} onClick={() => doSomething()} />

// Better: stable refs
const style = useMemo(() => ({ margin: 10 }), []);
const onClick = useCallback(() => doSomething(), []);
<Child style={style} onClick={onClick} />
```

### State colocation

- Keep state as close as possible to where it’s used so only that subtree re-renders.

### Lifting state only when needed

- Lifting state up causes more parents to re-render; use when you need to share state or pass it down.

---

## 6. Context and performance

- A context value change re-renders **all** consumers. Avoid one giant context.

### Splitting context

- Separate contexts (e.g. Theme, Auth, API client) so only consumers of the changed context re-render.

### Memoize context value

```jsx
const value = useMemo(() => ({ user, login, logout }), [user]);
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
```

---

## 7. Concurrency (React 18+)

- **useTransition:** Mark non-urgent updates so the UI stays responsive; show pending state.
- **useDeferredValue:** Defer a value to a heavy child so the rest of the UI (e.g. input) stays responsive.

---

## 8. Server and hydration

- **SSR/SSG:** First paint can show HTML without waiting for full JS; then hydrate.
- **Streaming + Suspense:** Send shell first, then stream components; improves LCP/TTI.
- **Selective hydration:** Prioritize above-the-fold or interactive parts.

---

## 9. Checklist (quick)

- [ ] Memoize only where profiling shows benefit (memo / useMemo / useCallback).
- [ ] Stable list keys; no inline object/function props for memoized children.
- [ ] Code-split routes and heavy components (lazy + Suspense).
- [ ] Virtualize long lists.
- [ ] Analyze and reduce bundle (tree shaking, smaller libs, dedupe).
- [ ] Split and memoize context; avoid one huge context.
- [ ] Use transitions/deferred value for heavy UI updates (React 18+).
