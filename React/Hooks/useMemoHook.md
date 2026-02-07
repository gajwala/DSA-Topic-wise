# useMemo Hook

## Theory

- **Purpose:** **Memoize** a computed value so it’s only recalculated when its dependencies change. Avoids recalculating on every render when deps are unchanged.
- **Signature:** `const value = useMemo(compute, dependencies);`
- **Returns:** The result of `compute()`. React reuses the previous result when `dependencies` are referentially equal; otherwise runs `compute()` again.

### When it helps

- **Expensive computation** – e.g. filtering/sorting a large list, heavy math.
- **Stable reference** – when you pass an object/array to a child that’s memoized with `React.memo`, or as a dependency (e.g. `useEffect`), a new `{}` or `[]` every render would break memoization; `useMemo` keeps the same reference when deps don’t change.

---

## Examples

### Expensive computation

```javascript
function ProductList({ items, filter }) {
  const filtered = useMemo(
    () => items.filter((i) => i.name.includes(filter)),
    [items, filter]
  );
  return <List items={filtered} />;
}
```

### Stable object for dependency / child

```javascript
const options = useMemo(
  () => ({ threshold: 0.5, rootMargin: '0px' }),
  []
);

useEffect(() => {
  const observer = new IntersectionObserver(cb, options);
  // ...
}, [options]);
```

### Don’t overuse

```javascript
// Unnecessary: cheap computation
const doubled = useMemo(() => count * 2, [count]);

// Prefer: just compute
const doubled = count * 2;
```

---

## Differences

| vs | Difference |
|----|------------|
| **useCallback** | `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`; useMemo returns a **value**, useCallback returns a **function**. |
| **React.memo** | `React.memo` memoizes the **component**; `useMemo` memoizes a **value** (often used to keep props stable for memoized children). |
| **React 19 / Compiler** | With React Compiler, many useMemo/useCallback can be omitted; compiler can stabilize. Still useful for ref equality, external APIs, or when not using the compiler. |

---

## When to skip

- For **cheap** calculations, the cost of `useMemo` (deps comparison + closure) can be worse than recalculating.
- Prefer **deriving state** during render when possible; add `useMemo` only when you measure a real performance problem or need a stable reference.

---

## React 19

- API unchanged.
- React Compiler may make some `useMemo` unnecessary; keep it where you need **stable reference** or **expensive work** you’ve profiled.
