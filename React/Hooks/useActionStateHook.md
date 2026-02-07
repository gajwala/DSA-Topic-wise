# useActionState Hook (React 19)

## Theory

- **Purpose:** Run an **action** (e.g. form submit or async mutation) and hold its **pending** and **state** (e.g. success/error message). This is the **React 19 replacement for useFormState**; the name reflects that it’s not limited to forms and works well with async actions.
- **Signature:** `const [state, formAction, isPending] = useActionState(action, initialState);`
  - **action:** A function `(prevState, formData) => newState` or async `(prevState, formData) => Promise<newState>`.
  - **initialState:** Initial value for state.
- **Returns:** `[state, formAction, isPending]` – current state, action to pass to `<form action={formAction}>` or call programmatically, and whether the action is in progress.

### useFormState (deprecated in React 19)

- **useFormState** is deprecated; **useActionState** is the new name and supports the same pattern plus async actions and isPending.

---

## Examples

### Form with message state

```javascript
async function submitName(prevState, formData) {
  const name = formData.get('name');
  if (!name) return { message: 'Name required' };
  await api.saveName(name);
  return { message: 'Saved!' };
}

function NameForm() {
  const [state, formAction, isPending] = useActionState(submitName, { message: null });

  return (
    <form action={formAction}>
      <input name="name" />
      <button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save'}</button>
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
```

### Sync action

```javascript
function reducer(prev, formData) {
  const name = formData.get('name');
  return name ? { name, error: null } : { ...prev, error: 'Required' };
}

const [state, formAction, isPending] = useActionState(reducer, { name: '', error: null });
```

---

## Differences

| vs | Difference |
|----|------------|
| **useFormState** | useActionState is the React 19 rename/replacement; same idea, better name, plus isPending and async support. |
| **useState + submit handler** | useActionState ties state to the **action** and works with native form `action` (progressive enhancement, no JS required for submit). |
| **useFormStatus** | useFormStatus gives **pending** from inside a **child** of the form; useActionState gives state + action + isPending at the form level. |

---

## React 19

- **useFormState** → **useActionState**; prefer useActionState in new code.
- Actions can be **async**; isPending is true while the promise is pending.
