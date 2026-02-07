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

## React concepts tested

- useState (complex nested state), immutable updates.
- Drag and drop (HTML5 or library).
- List and reorder across lists.
