# 25 – Kanban Board

## Problem

Build a **Kanban board**: multiple columns (e.g. To Do, In Progress, Done); each column has **cards**. Drag cards between columns (or within column to reorder). Add card; optional edit/delete card.

## Requirements

- **Columns:** At least 3 columns with titles. Each column has list of cards.
- **Cards:** Title (and optional description). Add card (input + button or “Add card” in column).
- **Drag and drop:** Drag card from one column and drop in another (or same column); update data. Use HTML5 DnD or library (@dnd-kit, react-beautiful-dnd).
- **State:** `columns: Array<{ id, title, cardIds: string[] }>`, `cards: Record<cardId, { id, title, ... }>` or flat list with columnId. On drop: move cardId from source column to target column (and update order).
- **Optional:** Edit/delete card; persist in localStorage.

## Approach / Hints

- **Data structure:** Either columns as array of { id, title, cards: Card[] } and update by replacing column’s cards array when moving; or columns with cardIds and separate cards map.
- **Move logic:** Remove card from source column, add to target column at drop index. Immutable: new columns array with updated card arrays.
- **DnD:** onDragStart store cardId and sourceColumnId (in state or dataTransfer); onDrop get targetColumnId and index; compute new columns state.
- **Add card:** Input in column; on submit push new card to that column’s list with new id.

## Component structure (suggestion)

- `KanbanBoard` – state columns (and cards); render Column for each.
- `Column` – column data; droppable area; map cards to Card; Add card form.
- `Card` – draggable; title; drag handlers.

## Solution

```jsx
import { useState } from 'react';

const INIT_COLUMNS = [
  { id: 'todo', title: 'To Do', cardIds: ['c1', 'c2'] },
  { id: 'progress', title: 'In Progress', cardIds: ['c3'] },
  { id: 'done', title: 'Done', cardIds: [] },
];
const INIT_CARDS = {
  c1: { id: 'c1', title: 'Task 1' },
  c2: { id: 'c2', title: 'Task 2' },
  c3: { id: 'c3', title: 'Task 3' },
};

function KanbanBoard() {
  const [columns, setColumns] = useState(INIT_COLUMNS);
  const [cards, setCards] = useState(INIT_CARDS);
  const [dragged, setDragged] = useState({ cardId: null, fromColId: null });

  const moveCard = (cardId, toColId, toIndex) => {
    const fromCol = columns.find((c) => c.cardIds.includes(cardId));
    if (!fromCol || fromCol.id === toColId && fromCol.cardIds.indexOf(cardId) === toIndex) return;
    setColumns((prev) =>
      prev.map((col) => {
        const ids = col.cardIds.filter((id) => id !== cardId);
        if (col.id === toColId) {
          const insert = ids.slice();
          insert.splice(toIndex, 0, cardId);
          return { ...col, cardIds: insert };
        }
        if (col.id === fromCol.id) return { ...col, cardIds: ids };
        return col;
      })
    );
  };

  const addCard = (colId) => {
    const id = 'c' + Date.now();
    setCards((prev) => ({ ...prev, [id]: { id, title: 'New card' } }));
    setColumns((prev) =>
      prev.map((c) => (c.id === colId ? { ...c, cardIds: [...c.cardIds, id] } : c))
    );
  };

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {columns.map((col) => (
        <div key={col.id} style={{ minWidth: 200, background: '#f0f0f0', padding: 8, borderRadius: 8 }}>
          <h3>{col.title}</h3>
          {col.cardIds.map((cardId) => (
            <div
              key={cardId}
              draggable
              onDragStart={() => setDragged({ cardId, fromColId: col.id })}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragged.cardId) moveCard(dragged.cardId, col.id, col.cardIds.length);
                setDragged({ cardId: null, fromColId: null });
              }}
              style={{ padding: 8, background: 'white', marginTop: 4, cursor: 'grab' }}
            >
              {cards[cardId]?.title}
            </div>
          ))}
          <button onClick={() => addCard(col.id)} style={{ marginTop: 8 }}>+ Add card</button>
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
```

## React concepts tested

- useState (complex nested state), immutable updates.
- Drag and drop (HTML5 or library).
- List and reorder across lists.
