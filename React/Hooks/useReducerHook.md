# useReducer Hook

## Theory

- **Purpose:** Manage **complex state** with a reducer function (like Redux). Good when you have multiple sub-values, or when the next state depends on the previous in a structured way.
- **Signature:** `const [state, dispatch] = useReducer(reducer, initialArg, init?);`
  - **reducer:** `(state, action) => newState` – pure function.
  - **initialArg:** initial state (or argument for `init` if used).
  - **init:** optional `(initialArg) => state` for lazy init.
- **Returns:** `[currentState, dispatch]`. Dispatching an action runs the reducer and triggers a re-render.

### Lazy initialization

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, (arg) => ({ ...expensiveInit(arg) }));
```

---

## Examples

### Counter reducer

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'set': return { count: action.payload };
    default: return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

### Form with multiple fields

```javascript
function formReducer(state, action) {
  switch (action.type) {
    case 'field':
      return { ...state, [action.field]: action.value };
    case 'reset':
      return action.initial;
    default:
      return state;
  }
}

function Form() {
  const initial = { name: '', email: '' };
  const [form, dispatch] = useReducer(formReducer, initial);
  return (
    <>
      <input value={form.name} onChange={(e) => dispatch({ type: 'field', field: 'name', value: e.target.value })} />
      <input value={form.email} onChange={(e) => dispatch({ type: 'field', field: 'email', value: e.target.value })} />
      <button onClick={() => dispatch({ type: 'reset', initial })}>Reset</button>
    </>
  );
}
```

---

## Differences

| vs | Difference |
|----|------------|
| **useState** | useState is one value + setter; useReducer is one state object + dispatch. Prefer reducer when logic is complex or you want predictable actions. |
| **Redux** | useReducer is local to the component tree; Redux is global. Same reducer pattern, different scope. |

---

## When to use

- Multiple related state values updated together.
- Next state depends on previous in a structured way.
- You want to test or reuse reducer logic outside the component.
- You need to pass **dispatch** down (stable reference) without passing many setters.

---

## React 19

- No change to useReducer API or behavior.
