# useDebugValue Hook

## Theory

- **Purpose:** Display a **custom label** for a custom hook in React DevTools. Does not change behavior; debugging only.
- **Signature:** `useDebugValue(value);` or `useDebugValue(value, formatFn);`
  - **value:** what to show in DevTools (can be expensive to compute).
  - **formatFn:** optional `(value) => string`; only called when DevTools opens the hook, so you can defer expensive formatting.

---

## Examples

### Simple label

```javascript
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useDebugValue(width);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
}
// In DevTools: useWindowWidth: 1024
```

### Deferred formatting (expensive)

```javascript
function useComplexState(data) {
  const [state, setState] = useState(data);
  useDebugValue(state, (s) => `items: ${s.items?.length ?? 0}, selected: ${s.selectedId}`);
  return [state, setState];
}
// formatFn runs only when DevTools inspects this hook
```

---

## Differences

| vs | Difference |
|----|------------|
| **console.log** | useDebugValue is visible in the Components tree for that hook; no console noise. |
| **No useDebugValue** | Hook still works; you just don’t get a custom label in DevTools. |

---

## When to use

- Custom hooks that you want to inspect in DevTools (e.g. “current user”, “connection status”).
- Prefer **formatFn** when the label is expensive to compute.

---

## React 19

- No change.
