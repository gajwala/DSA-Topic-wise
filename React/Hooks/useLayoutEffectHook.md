# useLayoutEffect Hook

## Theory

- **Purpose:** Run an effect **synchronously** after DOM updates but **before** the browser paints. Use when you need to read layout (e.g. measurements) or mutate the DOM and don’t want a visible flicker.
- **Signature:** Same as useEffect: `useLayoutEffect(setup, dependencies?);`
- **Execution:** After React updates the DOM, React runs useLayoutEffect **synchronously**, then the browser paints. So the user doesn’t see the screen until your layout effect has run.

### When to use

- Measure DOM nodes (e.g. scroll height, position).
- Mutate DOM (e.g. focus, scroll) that must be applied before paint to avoid flash.
- Sync with non-React code that depends on DOM layout in the same frame.

---

## Examples

### Measure and use height before paint

```javascript
function Tooltip({ children, targetRef }) {
  const [height, setHeight] = useState(0);
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    if (!targetRef.current || !tooltipRef.current) return;
    const rect = targetRef.current.getBoundingClientRect();
    setHeight(rect.height);
    tooltipRef.current.style.top = `${rect.bottom}px`;
  }, [targetRef]);

  return <div ref={tooltipRef}>Tooltip: {height}px</div>;
}
```

### Focus on mount (no flash)

```javascript
useLayoutEffect(() => {
  inputRef.current?.focus();
}, []);
```

---

## Differences

| vs | Difference |
|----|------------|
| **useEffect** | useEffect runs **after paint** (async); useLayoutEffect runs **before paint** (sync). Prefer useEffect by default; use useLayoutEffect only when you need to read/mutate DOM before the user sees the screen. |
| **SSR** | useLayoutEffect does not run on the server. You’ll get a warning if you use it in SSR; use useEffect for SSR-safe logic or guard with `typeof window !== 'undefined'`. |

---

## Caveats

- **Blocking:** useLayoutEffect blocks paint. Keep it fast; heavy work can cause jank.
- **SSR:** In server rendering, useLayoutEffect is not run. Prefer useEffect when the effect doesn’t need to run before paint.

---

## React 19

- No change to useLayoutEffect.
