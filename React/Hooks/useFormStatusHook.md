# useFormStatus Hook (React 19)

## Theory

- **Purpose:** From **inside a child** of a `<form>`, get the **pending** state of the form’s submission. Used to show loading or disable buttons inside the form while the form action is in progress. Must be used in a component that is a **descendant** of a form (or of a component that forwards the form via context).
- **Signature:** `const { pending, data, method, action } = useFormStatus();`
  - **pending:** true while the form’s action is running.
  - **data:** FormData submitted (when available).
  - **method:** 'get' | 'post'.
  - **action:** The action URL or function.

---

## Examples

### Submit button with loading state

```javascript
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

function Form() {
  return (
    <form action={submitAction}>
      <input name="email" />
      <SubmitButton />
    </form>
  );
}
```

### Disable all inputs while submitting

```javascript
function FormFields() {
  const { pending } = useFormStatus();
  return (
    <>
      <input name="name" disabled={pending} />
      <input name="email" disabled={pending} />
      <button type="submit" disabled={pending}>Save</button>
    </>
  );
}
```

---

## Differences

| vs | Difference |
|----|------------|
| **useActionState isPending** | useActionState gives isPending **where you call it** (e.g. form wrapper); useFormStatus gives pending **inside a child** that’s rendered inside the form. Use useFormStatus when the submit/loading UI is in a child component. |
| **Manual loading state** | useFormStatus reads the built-in form submission state; no need to pass a boolean prop down. |

---

## Rule

- **useFormStatus** must be used in a component that is a **descendant** of a `<form>` (or of a component that provides form context). Otherwise behavior is undefined.

---

## React 19

- useFormStatus works with the **action** prop and **useActionState**; when the form uses an action, pending reflects that action’s in-flight state.
