# 06 – Autocomplete with Debounce

## Problem

Build an **autocomplete** input: as the user types, show a dropdown of suggestions (e.g. from a mock API). Use **debounce** so the API is not called on every keystroke.

## Requirements

- **Input:** Controlled input; user types query.
- **Suggestions:** Dropdown below input showing matching options (mock: filter a list or “API” with delay). Show loading state while “fetching”.
- **Debounce:** Wait e.g. 300ms after user stops typing before triggering search.
- **Selection:** Click a suggestion to set input value and close dropdown; optional: keyboard (Arrow Down/Up, Enter).
- **Outside click:** Click outside to close dropdown.

## Approach / Hints

- **State:** `query`, `suggestions` (array), `loading`, `open` (dropdown visible).
- **Debounce:** `useMemo` to create debounced function: `const debouncedSearch = useMemo(() => debounce((q) => { setLoading(true); fetchSuggestions(q).then(setSuggestions); setLoading(false); }, 300), []);`. In input onChange: setQuery; call debouncedSearch(query). Or use a ref to store timeout and clear in cleanup.
- **Mock API:** `const fetchSuggestions = (q) => new Promise(r => setTimeout(() => r(options.filter(o => o.label.toLowerCase().includes(q.toLowerCase()))), 200));`
- **Outside click:** useRef on wrapper; useEffect with document click listener; if click target not inside ref.current, setOpen(false). Cleanup listener.
- **Keys:** Arrow down/up: selectedIndex state; Enter to select suggestions[selectedIndex].

## Component structure (suggestion)

- `Autocomplete` – state, debounced search, input, dropdown, outside click.
- Reusable `useDebounce` or inline debounce.

## Solution

```jsx
import { useState, useEffect, useRef, useCallback } from 'react';

function debounce(fn, delay) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}

const MOCK_OPTIONS = ['Apple', 'Banana', 'Apricot', 'Blueberry', 'Cherry', 'Coconut'].map((label) => ({ id: label, label }));

function fetchSuggestions(q) {
  return new Promise((r) =>
    setTimeout(() => r(MOCK_OPTIONS.filter((o) => o.label.toLowerCase().includes((q || '').toLowerCase()))), 200)
  );
}

function Autocomplete() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);

  const doSearch = useCallback(
    debounce(async (q) => {
      setLoading(true);
      const list = await fetchSuggestions(q);
      setSuggestions(list);
      setLoading(false);
      setHighlightedIndex(list.length ? 0 : -1);
    }, 300),
    []
  );

  useEffect(() => {
    setOpen(!!query);
    doSearch(query);
  }, [query, doSearch]);

  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const select = (item) => {
    setQuery(item.label);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => (i < suggestions.length - 1 ? i + 1 : i));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => (i > 0 ? i - 1 : -1));
    } else if (e.key === 'Enter' && suggestions[highlightedIndex]) {
      e.preventDefault();
      select(suggestions[highlightedIndex]);
    } else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => suggestions.length && setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Type to search..."
      />
      {open && (
        <ul style={{ listStyle: 'none', margin: 0, padding: 4, border: '1px solid #ccc', maxHeight: 200, overflow: 'auto' }}>
          {loading ? (
            <li>Loading...</li>
          ) : (
            suggestions.map((item, i) => (
              <li
                key={item.id}
                onClick={() => select(item)}
                onMouseEnter={() => setHighlightedIndex(i)}
                style={{ background: i === highlightedIndex ? '#eee' : 'transparent', cursor: 'pointer' }}
              >
                {item.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
```

## React concepts tested

- useState, useEffect, useRef.
- Debounce (custom or useMemo/useCallback + timeout).
- Controlled input, conditional dropdown, list keyboard nav (if implemented).
