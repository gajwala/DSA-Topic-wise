# 29 – Emoji Picker / Reaction Picker

## Problem

Build an **emoji picker** or **reaction picker**: click a trigger (e.g. smiley icon) to open a popover with a grid of emojis (or a small set of reactions); click an emoji to select it and close; optional search/filter.

## Requirements

- **Trigger:** Button or icon; click opens popover (positioned below or near trigger).
- **Grid:** Display emojis in a grid (e.g. 5–8 per row). Data: array of emoji chars or { id, char, name }.
- **Selection:** Click emoji → call onChange(emoji) or set selected; close popover. Optional: show selected in trigger (e.g. “😀”).
- **Close:** Click outside or Escape to close without selecting.
- **Optional:** Search/filter emojis by name; categories (smileys, animals, etc.); recent/recently used.

## Approach / Hints

- **State:** `open: boolean`. Trigger click toggles open. Popover: position fixed or absolute relative to trigger (useRef for trigger, getBoundingClientRect or position relative to ref).
- **Emoji list:** Const array of emojis (e.g. ['😀','😃', ...] or from a small JSON). Map to buttons; onClick(emoji) → onSelect(emoji), setOpen(false).
- **Outside click:** useRef on popover container; useEffect add document click listener; if click outside ref and trigger, setOpen(false). Cleanup.
- **Escape:** useEffect: if open, add keydown for Escape → setOpen(false).

## Component structure (suggestion)

- `EmojiPicker` – state open; trigger button; popover (portal or positioned div) with grid of emoji buttons; onSelect callback.
- Optional: `useClickOutside` hook for close.

## React concepts tested

- useState (open), useRef (trigger/popover).
- Conditional popover, positioning.
- Event listeners (outside click, Escape).
