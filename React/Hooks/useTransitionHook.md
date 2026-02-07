# useTransition Hook (React 18+)

## Theory

- **Purpose:** Mark **state updates as non-urgent (transitions)** so React can keep the current UI responsive and show pending state. Good for heavy UI updates (e.g. switching tabs, filtering) that don’t need to block the screen.
- **Signature:** `const [isPending, startTransition] = useTransition();`
  - **isPending:** true while a transition started by this hook is ongoing.
  - **startTransition(fn):** wrap state updates in `fn`; React treats them as low priority and can show previous UI until they’re ready.

### How it works

- Updates inside `startTransition` are **deferred**: React can interrupt them and keep showing the previous content.
- **isPending** becomes true when you call startTransition and turns false when the transition commit finishes (or when it’s interrupted and discarded).

---

## Examples

### Tab switch without blocking

```javascript
function Tabs() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const selectTab = (next) => {
    startTransition(() => {
      setTab(next);
    });
  };

  return (
    <>
      <button onClick={() => selectTab('home')} disabled={isPending}>Home</button>
      <button onClick={() => selectTab('posts')} disabled={isPending}>Posts</button>
      {isPending && <Spinner />}
      <div>{tab === 'home' ? <Home /> : <Posts />}</div>
    </>
  );
}
```

### Filter list

```javascript
const [query, setQuery] = useState('');
const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  const value = e.target.value;
  setQuery(value); // urgent: input stays responsive
  startTransition(() => {
    setFilter(value); // deferred: filter result can lag
  });
};
```

---

## Differences

| vs | Difference |
|----|------------|
| **useDeferredValue** | useDeferredValue defers a **value** (child receives old value then new); useTransition defers **updates you trigger** and gives you isPending. Often useTransition for explicit “on action”, useDeferredValue for “defer this value”. |
| **setTimeout** | startTransition doesn’t add fixed delay; React schedules work by priority. |
| **React 19** | useTransition works the same in React 19. |

---

## What can go in startTransition?

- **State updates** (useState, useReducer) are the main use. React treats them as transition updates.
- **Don’t** put side effects (fetch, subscriptions) in startTransition; use it only to wrap setState calls.

---

## React 19

- No API change. Still the right tool for marking state updates as non-urgent and showing pending UI.
