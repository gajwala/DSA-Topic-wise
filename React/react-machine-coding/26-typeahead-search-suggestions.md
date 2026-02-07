# 26 – Typeahead / Search Suggestions

## Problem

Build a **typeahead**: as user types in a search input, show **suggestions** (e.g. from a static list or mock API). Keyboard navigation (Arrow Up/Down, Enter to select); optional debounce. Similar to autocomplete but emphasis on “suggestions” and selection replacing input.

## Requirements

- **Input:** Controlled; value and list of suggestions below (or dropdown).
- **Suggestions:** Filter list by input value (starts with or includes); show top N (e.g. 5). Mock API: setTimeout with filtered list.
- **Selection:** Click suggestion or Enter with highlighted item → set input to selected value and close list. Escape closes without selecting.
- **Keyboard:** Arrow Down/Up to change highlighted index; Enter to select; input stays focused.
- **Debounce (optional):** Delay filtering/API call by 200–300ms after typing stops.

## Approach / Hints

- **State:** `query`, `suggestions` (array), `highlightedIndex` (-1 or 0..length-1), `isOpen` (dropdown visible).
- **Filter:** On query change, set suggestions = options.filter(o => o.label.toLowerCase().includes(query.toLowerCase())).slice(0, 5). Set highlightedIndex to 0 or -1.
- **KeyDown:** ArrowDown → setHighlightedIndex(i => min(i+1, length-1)); ArrowUp → decrement; Enter → select suggestions[highlightedIndex] and close; Escape → close.
- **Click suggestion:** setQuery(suggestion.label), close, optionally call onChange(suggestion).

## Component structure (suggestion)

- `Typeahead` – state (query, suggestions, highlightedIndex, isOpen); input with onKeyDown; dropdown list with mouse enter to set highlightedIndex, click to select.

## Solution

```jsx
import { useState } from 'react';

const OPTIONS = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Coconut', 'Date'].map((label) => ({ id: label, label }));

function Typeahead({ onSelect }) {
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const suggestions = query.trim()
    ? OPTIONS.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];
  const show = open && suggestions.length > 0;

  const select = (item) => {
    setQuery(item.label);
    setOpen(false);
    onSelect?.(item);
  };

  const onKeyDown = (e) => {
    if (!show) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      select(suggestions[highlightedIndex]);
    } else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); setHighlightedIndex(0); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Type to search..."
      />
      {show && (
        <ul style={{ listStyle: 'none', margin: 0, padding: 4, border: '1px solid #ccc', position: 'absolute', top: '100%', left: 0, right: 0, background: 'white' }}>
          {suggestions.map((item, i) => (
            <li
              key={item.id}
              onClick={() => select(item)}
              onMouseEnter={() => setHighlightedIndex(i)}
              style={{ background: i === highlightedIndex ? '#eee' : 'transparent', cursor: 'pointer', padding: 4 }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Typeahead;
```

## React concepts tested

- Controlled input, derived suggestions.
- Keyboard handling (preventDefault for arrows).
- Conditional dropdown, optional debounce.
