# 12 – Drag and Drop Reorderable List

## Problem

Build a **list** of items that the user can **reorder by dragging** (drag handle or whole row). Persist order (e.g. state only or localStorage).

## Requirements

- **List:** Render items (e.g. text); each row draggable (or has drag handle).
- **Drag and drop:** User drags item A and drops on position of item B; list reorders so A is at B’s position (or before/after).
- **Visual feedback:** Dragged item has different style; optional drop placeholder (e.g. line or gap).
- **State:** After drop, update array order and re-render. Optional: save to localStorage.

## Approach / Hints

- **HTML5 DnD:** Use draggable="true", onDragStart (store dragged index in dataTransfer or state), onDragOver (preventDefault to allow drop), onDrop (get drop index, reorder array, setState). Or use **@dnd-kit** or **react-beautiful-dnd** if allowed.
- **Reorder logic:** Copy array; remove item at dragIndex; insert at dropIndex. `const newList = [...list]; const [removed] = newList.splice(dragIndex, 1); newList.splice(dropIndex, 0, removed); setList(newList);`
- **State:** `items: Array<{ id, label }>`, `draggedIndex: number | null`. On dragStart set draggedIndex; on drop compute new order and clear draggedIndex.
- **Accessibility:** aria-grabbed, aria-dropeffect; or mention that library handles it.

## Component structure (suggestion)

- `SortableList` – state items; map to `SortableItem` with draggable, drag handlers, and drop target logic.
- `SortableItem` – single row; receives item, index, isDragging; drag events call parent with index.

## Solution

```jsx
import { useState } from 'react';

const initialItems = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'].map((label, i) => ({ id: i + 1, label }));

function SortableList() {
  const [items, setItems] = useState(initialItems);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = Number(e.dataTransfer.getData('text/plain'));
    if (dragIndex === dropIndex || dragIndex === -1) {
      setDraggedIndex(null);
      return;
    }
    setItems((prev) => {
      const next = [...prev];
      const [removed] = next.splice(dragIndex, 1);
      next.splice(dropIndex, 0, removed);
      return next;
    });
    setDraggedIndex(null);
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item, i) => (
        <li
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, i)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, i)}
          style={{
            padding: 8,
            margin: 4,
            background: draggedIndex === i ? '#ddd' : '#f5f5f5',
            cursor: 'grab',
          }}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export default SortableList;
```

## React concepts tested

- useState, immutable array update (reorder).
- HTML5 drag and drop or integration with a library.
- Conditional styling (isDragging).
