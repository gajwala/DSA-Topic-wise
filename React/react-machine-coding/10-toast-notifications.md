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

## Solution

```jsx
import { useState, useEffect, createContext, useContext } from 'react';

const ToastContext = createContext(null);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    return id;
  };

  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 9999 }}>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }) {
  useEffect(() => {
    const id = setTimeout(onClose, 3000);
    return () => clearTimeout(id);
  }, [onClose]);

  const colors = { success: '#0a0', error: '#c00', info: '#06c' };
  return (
    <div
      style={{
        padding: '12px 16px',
        background: colors[toast.type] || colors.info,
        color: 'white',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span>{toast.message}</span>
      <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>×</button>
    </div>
  );
}

function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return {
    success: (msg) => ctx.addToast(msg, 'success'),
    error: (msg) => ctx.addToast(msg, 'error'),
    info: (msg) => ctx.addToast(msg, 'info'),
  };
}

// Usage: wrap app with <ToastProvider>, then in any child:
// const toast = useToast();
// toast.success('Saved!');
export { ToastProvider, useToast };
```

## React concepts tested

- useState, useEffect (setTimeout, cleanup).
- Context API (provide + consume).
- Imperative API from React (addToast called from event handlers).
