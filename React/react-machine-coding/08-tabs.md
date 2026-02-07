# 08 – Tabs

## Problem

Build a **Tabs** component: tab headers and one panel of content. Clicking a tab switches the visible panel.

## Requirements

- **Headers:** Row of tab buttons (or links); one tab is “active”.
- **Panel:** Show content for the active tab only (or keep mounted and hide others with CSS).
- **Controlled or Uncontrolled:** Either receive `activeTab` + `onChange` from parent (controlled) or manage active tab internally (uncontrolled).
- **Optional:** Default tab (e.g. first); keyboard (Arrow Left/Right); URL hash sync.

## Approach / Hints

- **State:** `activeIndex` (number) or `activeId` (string). Click tab i → setActiveIndex(i).
- **Content:** `items[activeIndex].content` or `items.find(i => i.id === activeId).content`.
- **Controlled:** If `activeTab` prop provided, use it and call `onChange` on click; else use internal state.
- **Styling:** Active tab gets different class (e.g. border-bottom, background). Use index or id to match.

## Component structure (suggestion)

- `Tabs` – state or props for active; render tab list (buttons) and one panel.
- Data: array of `{ id, label, content }` or children with TabPanel components (compound components).

## Solution

```jsx
import { useState } from 'react';

const tabs = [
  { id: 'a', label: 'Tab A', content: 'Content for tab A.' },
  { id: 'b', label: 'Tab B', content: 'Content for tab B.' },
  { id: 'c', label: 'Tab C', content: 'Content for tab C.' },
];

function Tabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = tabs[activeIndex];

  return (
    <div>
      <div role="tablist" style={{ display: 'flex', gap: 4 }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={i === activeIndex}
            onClick={() => setActiveIndex(i)}
            style={{
              padding: '8px 16px',
              borderBottom: i === activeIndex ? '2px solid blue' : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" style={{ padding: 16 }}>
        {active.content}
      </div>
    </div>
  );
}

export default Tabs;
```

## React concepts tested

- useState or controlled component pattern.
- Conditional rendering by index/id.
- Mapping over config or rendering children.
