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

## React concepts tested

- useState (single value or Set/array for multiple).
- Conditional render or CSS visibility.
- Compound component or config-driven (items array).
