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

## Solution

```jsx
import { useState, useMemo, useEffect } from 'react';

const STORAGE_KEY = 'todos';

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [inputText, setInputText] = useState('');

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'completed') return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const text = inputText.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text, done: false }]);
    setInputText('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const updateTodo = (id, text) => {
    if (!text.trim()) return;
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: text.trim() } : t)));
    setEditingId(null);
  };

  const deleteTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

  const clearCompleted = () => setTodos((prev) => prev.filter((t) => !t.done));

  return (
    <div>
      <div>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div>
        {['all', 'active', 'completed'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{ fontWeight: filter === f ? 'bold' : 'normal' }}>
            {f}
          </button>
        ))}
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
            onToggle={() => toggleTodo(todo.id)}
            onEdit={() => setEditingId(todo.id)}
            onSave={(text) => updateTodo(todo.id, text)}
            onCancel={() => setEditingId(null)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
      <button onClick={clearCompleted}>Clear completed</button>
    </div>
  );
}

function TodoItem({ todo, isEditing, onToggle, onEdit, onSave, onCancel, onDelete }) {
  const [editText, setEditText] = useState(todo.text);
  useEffect(() => {
    if (isEditing) setEditText(todo.text);
  }, [isEditing, todo.text]);

  const handleSave = () => {
    onSave(editText);
  };

  return (
    <li>
      <input type="checkbox" checked={todo.done} onChange={onToggle} />
      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') onCancel();
            }}
            autoFocus
          />
        </>
      ) : (
        <>
          <span onDoubleClick={onEdit} style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={onDelete}>×</button>
        </>
      )}
    </li>
  );
}

export default TodoApp;
```

## React concepts tested

- useState, useMemo, useEffect.
- Controlled inputs, form submit.
- List rendering with stable keys.
- localStorage persistence.
