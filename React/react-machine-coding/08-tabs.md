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

## React concepts tested

- useState or controlled component pattern.
- Conditional rendering by index/id.
- Mapping over config or rendering children.
