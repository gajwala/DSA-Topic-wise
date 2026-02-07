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

## React concepts tested

- useState, useEffect (listeners, cleanup).
- createPortal.
- useRef (focus management).
