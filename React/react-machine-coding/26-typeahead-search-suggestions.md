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

## React concepts tested

- Controlled input, derived suggestions.
- Keyboard handling (preventDefault for arrows).
- Conditional dropdown, optional debounce.
