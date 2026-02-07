# useImperativeHandle Hook

## Theory

- **Purpose:** Customize what a **ref** exposes to the parent when using `forwardRef`. By default, ref points at the DOM node (or nothing); with `useImperativeHandle` you expose a custom object (e.g. methods) instead of or in addition to the DOM node.
- **Signature:** `useImperativeHandle(ref, createHandle, dependencies?);`
  - **ref:** the ref passed from parent via forwardRef.
  - **createHandle:** function that returns the object to assign to `ref.current`.
  - **dependencies:** optional; when they change, the handle is recreated.

---

## Examples

### Expose focus + scroll methods

```javascript
const FancyInput = forwardRef(function FancyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
    scrollIntoView() {
      inputRef.current?.scrollIntoView();
    },
  }), []);

  return <input ref={inputRef} {...props} />;
});

// Parent
function Parent() {
  const inputRef = useRef(null);
  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus input</button>
    </>
  );
}
```

### Expose DOM and custom API

```javascript
useImperativeHandle(ref, () => ({
  domNode: inputRef.current,
  focus: () => inputRef.current?.focus(),
}), []);
```

---

## Differences

| vs | Difference |
|----|------------|
| **forwardRef only** | forwardRef forwards the underlying DOM (or component ref); useImperativeHandle **replaces** what the parent sees with a custom handle. |
| **Ref as callback** | Same idea: parent gets a ref; useImperativeHandle controls what `ref.current` is (methods, not necessarily the DOM). |

---

## When to use

- Wrap a native element but expose a limited API (e.g. `focus`, `blur`, `scroll`) instead of raw DOM.
- Expose imperative methods on a custom component (video player: `play()`, `pause()`).

---

## React 19

- No API change. ref can still be a prop (e.g. `ref` as a regular prop in React 19), but useImperativeHandle behavior is unchanged.
