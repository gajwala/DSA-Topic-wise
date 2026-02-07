# 07 – Accordion

## Problem

Build an **Accordion**: a list of sections; each has a header and collapsible content. Clicking the header toggles that section. Support “single expand” (only one open at a time) or “multiple” (many open).

## Requirements

- **Sections:** Each item has title (header) and content. Content is shown when section is expanded, hidden when collapsed.
- **Toggle:** Click header to expand/collapse that section.
- **Mode:** Single – opening one closes others; Multiple – each toggles independently.
- **Optional:** Animated height (CSS transition or library); default open section(s).

## Approach / Hints

- **State (single):** `openIndex: number | null` – which section is open. Click header i → setOpenIndex(openIndex === i ? null : i).
- **State (multiple):** `openSet: Set<number>` or `openIndices: boolean[]`. Toggle: add/remove index.
- **Content:** Render content only when expanded, or always render and hide with CSS (height 0 / overflow hidden) for animation.
- **Accessibility:** aria-expanded, aria-controls, id on panel; optionally keyboard (Enter/Space on header).

## Component structure (suggestion)

- `Accordion` – state (open index/set), map over items, render `AccordionItem` per item.
- `AccordionItem` – header (button), content (div); receives isOpen, onToggle, title, children/content.

## Solution

```jsx
import { useState } from 'react';

const items = [
  { id: 1, title: 'Section 1', content: 'Content for section 1.' },
  { id: 2, title: 'Section 2', content: 'Content for section 2.' },
  { id: 3, title: 'Section 3', content: 'Content for section 3.' },
];

function Accordion({ multiple = false }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [openSet, setOpenSet] = useState(() => new Set());

  const isOpen = (i) => (multiple ? openSet.has(i) : openIndex === i);
  const toggle = (i) => {
    if (multiple) {
      setOpenSet((prev) => {
        const next = new Set(prev);
        if (next.has(i)) next.delete(i);
        else next.add(i);
        return next;
      });
    } else {
      setOpenIndex((prev) => (prev === i ? null : i));
    }
  };

  return (
    <div>
      {items.map((item, i) => (
        <div key={item.id}>
          <button
            onClick={() => toggle(i)}
            aria-expanded={isOpen(i)}
            style={{ width: '100%', textAlign: 'left', padding: 8 }}
          >
            {item.title} {isOpen(i) ? '▼' : '▶'}
          </button>
          {isOpen(i) && <div style={{ padding: 8, border: '1px solid #eee' }}>{item.content}</div>}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
```

## React concepts tested

- useState (single value or Set/array for multiple).
- Conditional render or CSS visibility.
- Compound component or config-driven (items array).
