# 04 – Star Rating

## Problem

Build a **Star Rating** component: display a rating (e.g. 3.5) and/or allow the user to select a rating by clicking (and optionally hovering) on stars.

## Requirements

- **Display mode:** Show rating as filled/empty (and optionally half) stars (e.g. 3.5 → 3 full, 1 half).
- **Interactive mode:** Click on a star to set rating (1–5); optional hover preview (show hover value until click or mouse leave).
- **Props:** `value` (current rating), `onChange` (callback when user selects), `readOnly` (display only), `max` (default 5).
- **Half stars (optional):** Support 0.5 steps (e.g. 3.5) in display and/or selection.

## Approach / Hints

- **Rendering stars:** Loop 1 to max; for each index i, compare with value: full if `value >= i`, half if `value >= i - 0.5`, else empty. Use Unicode/emoji (★/☆) or SVG.
- **Click:** In non-readOnly, onClick on star at index i → `onChange(i)` (or i - 0.5 for half).
- **Hover:** State `hoverValue` (null or number). On mouseEnter star i set hoverValue = i; on mouseLeave set hoverValue = null. Display `hoverValue ?? value` for highlight.
- **Accessibility:** role="radiogroup", aria-label; each star role="radio", aria-checked, keyboard (arrow keys) if time permits.

## Component structure (suggestion)

- `StarRating` – state for hover; map over max stars; render one `Star` per index with filled/half/empty from value and hover.

## React concepts tested

- Controlled component (value + onChange).
- Conditional styling or icon from value.
- Optional local state (hover) that doesn’t override props.
