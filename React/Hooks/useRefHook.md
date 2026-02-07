# useRef Hook

## Theory

- **Purpose:** Hold a **mutable value** that persists across renders and **does not** cause a re-render when it changes. Also used to store a reference to a **DOM element**.
- **Signature:** `const ref = useRef(initialValue);`
- **Returns:** An object `{ current: initialValue }`. Reading or updating `ref.current` does not trigger a re-render.

### Two main uses

1. **DOM ref:** Pass `ref` to a JSX attribute `ref={ref}` (on built-in elements or forwarded refs) to get the DOM node.
2. **Mutable box:** Keep any value (previous props/state, timer id, subscription) that you don’t want to trigger re-renders.

---

## Examples

### DOM ref (input focus)

```javascript
function SearchInput() {
  const inputRef = useRef(null);
  const focusInput = () => inputRef.current?.focus();
  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
```

### Previous value (pattern)

```javascript
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current; // previous render's value
}
```

### Mutable box (timer / subscription)

```javascript
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => setCount((c) => c + 1), 1000);
  };
  const stop = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);
  return (/* ... */);
}
```

---

## Differences

| vs | Difference |
|----|------------|
| **useState** | Updating state re-renders; updating `ref.current` does not. Use ref for “don’t trigger render” data. |
| **Instance variable (class)** | In classes, `this.x = ...` is like a ref; in functions, `useRef` is the equivalent. |
| **ref={callback}** | You can use `ref={(el) => ...}` (callback ref) instead of `ref={ref}`; useRef is simpler when you only need the node. |

---

## Rules

- **Do not** read or write `ref.current` during render (only in effects, event handlers, or when you intentionally want “previous value” pattern). Otherwise you break assumptions and make behavior harder to reason about.
- For **forwarded refs** (exposing a DOM node or custom API from a component), use `forwardRef` and optionally `useImperativeHandle`.

---

## React 19

- No change to `useRef` behavior.
- ref as **callback** and **ref object** both still supported.
