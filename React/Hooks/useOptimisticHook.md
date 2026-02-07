# useOptimistic Hook (React 19)

## Theory

- **Purpose:** Implement **optimistic UI** easily: show the “success” state immediately in the UI while the async action runs in the background; if the action fails, revert to the previous state. Reduces the need to manually toggle between “submitting” and “success” state.
- **Signature:** `const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);`
  - **state:** The “real” state (e.g. list of items).
  - **updateFn:** `(currentState, optimisticValue) => newState` – how to apply an optimistic update.
- **Returns:** `[optimisticState, addOptimistic]`. You **render** from `optimisticState`. You call **addOptimistic(optimisticValue)** when the user does something (e.g. like, add to cart); then run the real action and clear/revert on failure.

### Flow

1. User clicks “Add” → you call `addOptimistic(newItem)` → UI shows newItem immediately.
2. You run the real mutation (e.g. POST).
3. On success: sync real state (e.g. refetch or update state); optimistic state will match.
4. On failure: revert (e.g. setState back or throw); useOptimistic will reflect the reverted state when state prop updates.

---

## Examples

### Optimistic like

```javascript
function LikeButton({ postId, likes, onLike }) {
  const [optimisticLikes, addOptimistic] = useOptimistic(
    likes,
    (current, newLike) => current + 1
  );

  const handleClick = async () => {
    addOptimistic(1);
    try {
      await onLike(postId);
    } catch {
      // Parent can revert state; optimistic value will roll back when state updates
    }
  };

  return <button onClick={handleClick}>Likes: {optimisticLikes}</button>;
}
```

### Optimistic list (add item)

```javascript
function TodoList({ items, addItem }) {
  const [optimisticItems, addOptimistic] = useOptimistic(
    items,
    (current, newItem) => [...current, newItem]
  );

  const handleAdd = async (text) => {
    const temp = { id: 'temp', text };
    addOptimistic(temp);
    try {
      await addItem(text);
    } catch (e) {
      // Revert: parent sets items back; optimisticItems will update
    }
  };

  return (
    <>
      {optimisticItems.map((i) => <li key={i.id}>{i.text}</li>)}
      <AddForm onSubmit={handleAdd} />
    </>
  );
}
```

---

## Differences

| vs | Difference |
|----|------------|
| **Manual useState** | You’d keep “display list” and “real list” and sync on success/failure; useOptimistic encapsulates “optimistic overlay” over real state. |
| **useTransition** | useTransition keeps UI responsive; useOptimistic shows a specific “optimistic” value that may be reverted. You can combine both. |
| **React 19** | useOptimistic is new in React 19. |

---

## React 19 only

- **useOptimistic** is a **React 19** hook. For React 18, implement optimistic UI with useState (optimistic value + real value and revert on error).
