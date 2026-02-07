# useId Hook (React 18+)

## Theory

- **Purpose:** Generate a **stable unique ID** that is consistent between server and client (SSR-safe) and unique across the component tree. Used for accessibility (e.g. `id` / `htmlFor`) and other DOM IDs.
- **Signature:** `const id = useId();`
- **Returns:** A string like `:r1:` (opaque; don’t assume format). Same component instance gets the same id on server and client.

### Why not Math.random() or counter?

- **SSR:** Random or incrementing counters can differ between server HTML and client hydrate, causing mismatch and hydration errors.
- **useId** is designed to be deterministic per component instance in the tree, so server and client agree.

---

## Examples

### Accessibility: label + input

```javascript
function Field({ label }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </>
  );
}
```

### Multiple IDs in one component

```javascript
function Form() {
  const id = useId();
  return (
    <>
      <label htmlFor={id + '-name'}>Name</label>
      <input id={id + '-name'} />
      <label htmlFor={id + '-email'}>Email</label>
      <input id={id + '-email'} />
    </>
  );
}
```

### With React 18 useId (no suffix needed for single id)

```javascript
const id = useId();
// Use id for one pair, or id + '-suffix' for multiple
```

---

## Differences

| vs | Difference |
|----|------------|
| **key** | key is for list identity and reconciliation; it’s not for DOM id. Don’t use key as id. |
| **Math.random()** | Not SSR-safe; useId is. |
| **useId in React 19** | Same API and behavior in React 19. |

---

## Rules

- **Don’t** use useId to generate keys in lists; keys should come from your data.
- **Do** use for a11y (id/htmlFor), aria-describedby, or any DOM id that must be stable and SSR-safe.

---

## React 19

- useId unchanged; still the recommended way to generate SSR-safe unique IDs.
