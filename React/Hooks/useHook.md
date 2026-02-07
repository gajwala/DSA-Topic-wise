# use Hook (React 19)

## Theory

- **Purpose:** **Read a resource** during render: a **Promise** or **React Context**. Unblocks rendering when the promise resolves (with Suspense), or returns the context value. Unlike other hooks, **use can be called conditionally** (e.g. inside `if` or loops) because it’s part of the render contract.
- **Signature:** `const value = use(resource);`
  - **resource:** A **Promise** or **Context** (from createContext).
- **Returns:** For Context: the context value. For Promise: the fulfilled value (suspends until resolved; throws to nearest Suspense/error boundary if rejected).

### Why it’s different

- **Rules of Hooks:** Normally hooks can’t be called conditionally. `use()` is an exception: you can call `use(promise)` inside `if (promise)`, because React uses it to suspend or read context.
- **Data fetching:** In React 19, the recommended pattern for “load data and show it” in components is often: pass a promise down (or from a framework), and `use(promise)` in the component. Suspense shows fallback until the promise resolves.

---

## Examples

### use(Promise) with Suspense

```javascript
function Profile({ userId }) {
  const data = use(fetchProfile(userId)); // fetchProfile returns a Promise
  return <div>{data.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Profile userId={1} />
    </Suspense>
  );
}
```

### use(Context) – can be conditional

```javascript
const ThemeContext = createContext('light');

function ThemedButton() {
  if (themeSource === 'parent') {
    return <button>Use parent theme</button>;
  }
  const theme = use(ThemeContext); // OK: conditional use()
  return <button className={theme}>Click</button>;
}
```

### Conditional use(promise)

```javascript
function Content({ promise }) {
  if (!promise) return <p>No data</p>;
  const data = use(promise);
  return <div>{data.title}</div>;
}
```

---

## Differences

| vs | Difference |
|----|------------|
| **useContext** | use(Context) is equivalent to useContext(Context) but **can be called conditionally**. Prefer use(Context) when you need conditional context read. |
| **useEffect + fetch** | use(promise) + Suspense moves “loading” to the boundary and keeps components declarative; no manual loading state in the component. |
| **use(Something else)** | use() only accepts a **Promise** or a **Context**; not for arbitrary values. |

---

## Promise behavior

- **Pending:** Component **suspends**; React shows the nearest `<Suspense>` fallback.
- **Fulfilled:** use() returns the value and the component renders.
- **Rejected:** React throws to the nearest error boundary (or propagates).

---

## React 19 only

- `use()` is **new in React 19**. In React 18 you’d use useContext for context and useEffect + loading state (or a data-fetching library) for async data.
