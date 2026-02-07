# useState Hook

## Theory

- **Purpose:** Add local state to function components. Re-renders when the state value changes.
- **Signature:** `const [state, setState] = useState(initialState);`
- **Returns:** A tuple `[currentValue, setter]`. The setter can accept a new value or a function `(prev) => next`.

### Lazy initial state

If the initial state is expensive to compute, pass a **function** so it runs only on first render:

```javascript
const [state, setState] = useState(() => computeExpensiveInitialState());
```

### Functional updates

When the next state depends on the previous, use the **functional form** to avoid stale closures:

```javascript
setCount((prev) => prev + 1);
setItems((prev) => [...prev, newItem]);
```

### Batching (React 18+)

In React 18+, all updates inside event handlers, `setTimeout`, `fetch` callbacks, etc. are **automatically batched**. Multiple `setState` calls in the same “tick” result in one re-render.

---

## Examples

### Basic counter

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

### Object state

```javascript
function Form() {
  const [form, setForm] = useState({ name: '', age: 0 });

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <input value={form.name} onChange={(e) => update('name', e.target.value)} />
      <input type="number" value={form.age} onChange={(e) => update('age', +e.target.value)} />
    </>
  );
}
```

### Lazy initial state

```javascript
function Heavy() {
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem('key') ?? 'null');
  });
  // ...
}
```

---

## Differences from similar patterns

| vs | Difference |
|----|------------|
| **useReducer** | `useState` is for a single value or simple object; `useReducer` for complex state and many actions. |
| **useRef** | `useRef` does not trigger re-render when `.current` changes; `useState` does. |
| **Class setState** | In functions there is no `this.setState`; one state slice per `useState` (or one reducer). |

---

## React 19

- No change to `useState` API.
- Batching behavior remains (including in async handlers).
- For async/Server Components, **use()** is used to read promises; **useState** stays for client component state.

---

## Interview / recap

- Use **functional updates** when new state depends on previous.
- Use **lazy initial state** when initial value is expensive.
- Prefer **multiple `useState`** or **one object** by clarity and update frequency; avoid one giant state object if only one field changes often.
