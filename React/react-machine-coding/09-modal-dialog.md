# 09 – Modal / Dialog

## Problem

Build a **Modal** (dialog): overlay + content box. Open via button; close via close button, overlay click, or Escape key. Trap focus inside when open.

## Requirements

- **Trigger:** Button (or prop) opens modal.
- **Overlay:** Semi-transparent backdrop; click outside content closes modal (optional: configurable).
- **Content:** Centered box (title, body, optional footer with actions). Close (X) button.
- **Close:** X button, click overlay, Escape key all close and call optional onClose.
- **Focus trap (optional):** When open, focus stays inside modal; Tab cycles through focusable elements. Restore focus to trigger on close.
- **Body scroll lock (optional):** Prevent scrolling page when modal is open (e.g. body overflow hidden).

## Approach / Hints

- **State:** `open: boolean`. Trigger sets true; close handler sets false and calls onClose.
- **Portal:** `ReactDOM.createPortal(modalMarkup, document.body)` so modal renders outside parent DOM (above overlay). Ensures correct z-index and focus behavior.
- **Escape:** useEffect: if open, add keydown listener for 'Escape' → close; cleanup on unmount or when open changes.
- **Overlay click:** onClick on backdrop div; use event.target === event.currentTarget so clicks on content don’t close.
- **Focus trap:** On open, focus first focusable (e.g. ref); on key Tab, if leaving last element wrap to first (or use a small library). On close, ref to trigger and trigger.focus().

## Component structure (suggestion)

- `Modal` – open state or controlled (isOpen, onClose); portal; overlay + content box; close handlers.
- `ModalHeader`, `ModalBody`, `ModalFooter` – optional subcomponents for layout.

## Solution

```jsx
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ title, children, onClose }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    contentRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        ref={contentRef}
        tabIndex={-1}
        style={{ background: 'white', padding: 24, borderRadius: 8, minWidth: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 id="modal-title">{title}</h2>
          <button onClick={onClose} aria-label="Close">×</button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      {open && (
        <Modal title="Example" onClose={() => setOpen(false)}>
          <p>Modal body. Click outside or press Escape to close.</p>
        </Modal>
      )}
    </>
  );
}

export { Modal, ModalDemo };
```

## React concepts tested

- useState, useEffect (listeners, cleanup).
- createPortal.
- useRef (focus management).
