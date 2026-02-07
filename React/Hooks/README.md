# React Hooks – Theory, Examples & Differences

> Covers core hooks, React 18, and **React 19** updates. Each hook has its own `.md` file with theory, examples, and when to use it.

## Quick reference

| Hook | Purpose | When to use |
|------|--------|-------------|
| [useState](useStateHook.md) | Local component state | Values that change and trigger re-render |
| [useEffect](useEffectHook.md) | Side effects after render | Fetch, subscriptions, DOM, sync with external systems |
| [useContext](useContextHook.md) | Read a React context | Avoid prop drilling, theme, auth, locale |
| [useRef](useRefHook.md) | Mutable ref / DOM handle | DOM nodes, previous value, stable identity |
| [useMemo](useMemoHook.md) | Memoize computed value | Expensive calculations, stable object/array refs |
| [useCallback](useCallbackHook.md) | Memoize function | Stable callbacks for children / deps |
| [useReducer](useReducerHook.md) | State + reducer | Complex state, multiple sub-values, predictable updates |
| [useImperativeHandle](useImperativeHandleHook.md) | Customize ref API | Expose imperative methods to parent |
| [useLayoutEffect](useLayoutEffectHook.md) | Effect before paint | DOM measurements / mutations before browser paint |
| [useDebugValue](useDebugValueHook.md) | Custom hook label in DevTools | Debugging custom hooks |
| [useId](useIdHook.md) | Stable unique ID (React 18+) | Accessibility, SSR-safe IDs |
| [useTransition](useTransitionHook.md) | Non-urgent updates (React 18+) | Mark updates as transitions, show pending UI |
| [useDeferredValue](useDeferredValueHook.md) | Defer heavy UI (React 18+) | Keep UI responsive with deferred value |
| [use](useHook.md) | Read resource (React 19) | Promises, context inside render (including conditionally) |
| [useActionState](useActionStateHook.md) | Form action + state (React 19) | Replace useFormState, async actions |
| [useFormStatus](useFormStatusHook.md) | Pending state of parent form | Loading/disabled UI in form children |
| [useOptimistic](useOptimisticHook.md) | Optimistic UI (React 19) | Show success state before server confirms |

## React 19 hook changes (summary)

- **use** – New. Read promises and context during render (no conditional rule).
- **useActionState** – Replaces **useFormState**; same idea, better name; works with async actions.
- **useFormStatus** – Unchanged; still for pending state of parent form.
- **useOptimistic** – New. Built-in pattern for optimistic updates.
- **useCallback** – In React 19, can be removed more often; compiler can stabilize props.
- **useMemo** / **useCallback** – Still useful for ref equality, external APIs, or when not using the compiler.

## File list

1. [useStateHook.md](useStateHook.md)
2. [useEffectHook.md](useEffectHook.md)
3. [useContextHook.md](useContextHook.md)
4. [useRefHook.md](useRefHook.md)
5. [useMemoHook.md](useMemoHook.md)
6. [useCallbackHook.md](useCallbackHook.md)
7. [useReducerHook.md](useReducerHook.md)
8. [useImperativeHandleHook.md](useImperativeHandleHook.md)
9. [useLayoutEffectHook.md](useLayoutEffectHook.md)
10. [useDebugValueHook.md](useDebugValueHook.md)
11. [useIdHook.md](useIdHook.md)
12. [useTransitionHook.md](useTransitionHook.md)
13. [useDeferredValueHook.md](useDeferredValueHook.md)
14. [useHook.md](useHook.md) (React 19)
15. [useActionStateHook.md](useActionStateHook.md) (React 19)
16. [useFormStatusHook.md](useFormStatusHook.md)
17. [useOptimisticHook.md](useOptimisticHook.md) (React 19)

## Rules of Hooks (all versions)

- Call hooks only at the **top level** (no loops, conditions, or nested functions).
- Call hooks only from **React function components** or **custom hooks** (not from class components or plain JS functions).
- **React 19:** `use()` can be called conditionally (e.g. inside `if`) because it reads a resource during render; other hooks still follow the rules above.
