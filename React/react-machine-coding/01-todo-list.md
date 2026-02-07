# 01 – Todo List

## Problem

Build a **Todo List** where users can add, toggle complete, edit, and delete tasks. Support filtering (All / Active / Completed) and persist data in `localStorage`.

## Requirements

- **Add todo:** Input + button or Enter key; trim empty and prevent duplicate text if needed.
- **List:** Show title; checkbox for done; edit inline (double-click or edit button) and save on blur/Enter.
- **Delete:** Remove single todo (e.g. cross icon).
- **Filters:** Tabs or buttons – All | Active | Completed; only show todos that match.
- **Persistence:** Load from `localStorage` on mount; save on every change (add, toggle, edit, delete).
- **Clear completed:** Optional: button to remove all completed todos.

## Approach / Hints

- **State:** `todos: Array<{ id: string, text: string, done: boolean }>`, `filter: 'all' | 'active' | 'completed'`.
- **IDs:** Use `crypto.randomUUID()` or `Date.now()` + index for unique id.
- **Derived list:** `useMemo` or compute: `todos.filter(t => filter === 'all' || (filter === 'active' && !t.done) || (filter === 'completed' && t.done))`.
- **localStorage:** `useEffect` to read on mount; `useEffect` that runs when `todos` change to write. Key e.g. `'todos'`.
- **Edit mode:** One todo at a time: `editingId` in state; show input when `todo.id === editingId`, else show text.

## Component structure (suggestion)

- `TodoApp` – state, filters, localStorage sync, render list.
- `TodoItem` – checkbox, text/edit input, delete button; callback props for toggle, edit, delete.
- Optional: `TodoInput` for the add form.

## React concepts tested

- useState, useMemo, useEffect.
- Controlled inputs, form submit.
- List rendering with stable keys.
- localStorage persistence.
