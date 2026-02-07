# useCallback Hook

## Theory

- **Purpose:** Return a **memoized function** so the function reference stays stable across renders when dependencies don’t change. Used to avoid unnecessary re-renders of children that depend on the callback (e.g. `React.memo`) or to satisfy dependency arrays (e.g. `useEffect`).
- **Signature:** `const fn = useCallback(callback, dependencies);`
- **Returns:** The same function reference until a dependency changes; then a new function is returned.

### Equivalent to

```javascript
useCallback(fn, deps) === useMemo(() => fn, deps)
```

---

## Examples

### Stable callback for memoized child

```javascript
const Child = React.memo(({ onSave }) => {
  return <button onClick={onSave}>Save</button>;
});

function Parent() {
  const [name, setName] = useState('');
  const onSave = useCallback(() => {
    api.save(name);
  }, [name]);
  return <Child onSave={onSave} />;
}
```

### Callback in useEffect deps

```javascript
const fetchData = useCallback(async () => {
  const res = await fetch(url);
  setData(await res.json());
}, [url]);

useEffect(() => {
  fetchData();
}, [fetchData]);
```

### When not to use

```javascript
// Unnecessary if Child is not memoized or doesn't need stable ref
const handleClick = useCallback(() => setCount((c) => c + 1), []);
```

---

## Differences

| vs | Difference |
|----|------------|
| **useMemo** | useMemo memoizes a **value**; useCallback memoizes a **function** (useCallback(fn, deps) === useMemo(() => fn, deps)). |
| **Inline function** | `onClick={() => doSomething()}` creates a new function every render; useCallback returns the same function when deps are equal. |
| **React 19** | Compiler can auto-stabilize many callbacks; useCallback still useful when passing to non-compiled code, refs, or when you need explicit stability. |

---

## React 19

- No API change.
- With **React Compiler**, many `useCallback` usages can be removed; the compiler can memoize. Keep `useCallback` where you need a stable function identity for refs, external libs, or effect deps and the compiler isn’t applied.
