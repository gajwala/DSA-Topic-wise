# useDeferredValue Hook (React 18+)

## Theory

- **Purpose:** **Defer** updating a value so the UI can stay responsive. The component receives the “previous” value first, then React updates it to the new value in the background. Good for expensive children that depend on a value (e.g. search query, filter).
- **Signature:** `const deferredValue = useDeferredValue(value);`
- **Returns:** The value that’s “current” for this render. On first render it’s the same as `value`; when `value` changes, React may re-render first with the **old** value (deferredValue lags), then with the new one. So the tree can show stale content briefly while keeping input responsive.

### When to use

- A **child** does heavy work based on a value (e.g. large list filtered by query).
- You want the **parent** (e.g. input) to update immediately and the heavy child to accept a deferred value so typing stays smooth.

---

## Examples

### Deferred search query

```javascript
function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SlowList query={deferredQuery} />
    </>
  );
}
// query updates immediately (input); SlowList re-renders with deferredQuery (may lag)
```

### With isPending (React 18)

You can derive “pending” by comparing value and deferredValue:

```javascript
const deferredQuery = useDeferredValue(query);
const isStale = query !== deferredQuery;
```

---

## Differences

| vs | Difference |
|----|------------|
| **useTransition** | useTransition wraps **updates you perform** and gives isPending; useDeferredValue defers a **value** you pass down. Use useDeferredValue when the “slow” part is a child that receives the value; use useTransition when you’re doing the state update and want to show pending. |
| **Debouncing** | useDeferredValue doesn’t add a fixed delay; React may update deferred value soon or later. For fixed delay, use debounce. |
| **React 19** | Same behavior in React 19. |

---

## React 19

- No API or behavior change.
