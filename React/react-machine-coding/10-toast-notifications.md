# 10 – Toast Notification System

## Problem

Build a **toast notification** system: show small messages that auto-dismiss after a delay (e.g. 3s) or on close click. Support multiple toasts stacking (e.g. bottom-right).

## Requirements

- **Add toast:** Function or context method to add a toast (e.g. `toast.success('Saved')`, `toast.error('Failed')`). Each toast has message, type (success/error/info), optional id.
- **Display:** List of toasts in a fixed container (e.g. bottom-right); newest on top or bottom.
- **Auto dismiss:** Remove toast after N seconds (e.g. 3); optional progress bar.
- **Manual close:** Close (X) on each toast removes it.
- **Multiple:** Several toasts can be visible; each independently timed and closeable.

## Approach / Hints

- **State:** `toasts: Array<{ id, message, type, createdAt }>`. Add: push new toast with unique id (Date.now() or uuid). Remove: filter out by id.
- **API:** Either React context (ToastProvider + useToast that returns { addToast }) or a module with a setState setter injected (e.g. ref to root’s setToasts). addToast(msg, type) → setToasts(t => [...t, { id, message, type, createdAt: Date.now() }]).
- **Auto dismiss:** useEffect per toast (or one effect that runs interval): setTimeout 3000ms, then remove this toast id. Cleanup timeout on unmount. Use toast id in dependency or ref to avoid stale closure.
- **Position:** Fixed div; map toasts to ToastItem components; CSS for stack (flex column-reverse or similar).

## Component structure (suggestion)

- `ToastProvider` – state toasts; context value { addToast }; render children + fixed div with toast list.
- `ToastItem` – one toast; timer to remove self or receives onClose; progress bar optional.
- `useToast()` – useContext(ToastContext); return { success, error, info } that call addToast.

## React concepts tested

- useState, useEffect (setTimeout, cleanup).
- Context API (provide + consume).
- Imperative API from React (addToast called from event handlers).
