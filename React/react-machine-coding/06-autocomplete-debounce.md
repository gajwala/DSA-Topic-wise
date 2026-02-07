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

## React concepts tested

- useState, useEffect, useRef.
- Debounce (custom or useMemo/useCallback + timeout).
- Controlled input, conditional dropdown, list keyboard nav (if implemented).
