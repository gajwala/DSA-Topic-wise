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

## Solution

```jsx
import { useState, useRef, useEffect } from 'react';

const EMOJIS = ['😀', '😃', '😄', '😁', '😂', '🤣', '😊', '😇', '🙂', '😉', '😍', '🥰', '👍', '👎', '❤️', '🔥'];

function EmojiPicker({ onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', fn);
    return () => document.removeEventListener('click', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen((o) => !o)}>😀 Pick emoji</button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 4,
            padding: 8,
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: 8,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 4,
            zIndex: 1000,
          }}
        >
          {EMOJIS.map((emoji, i) => (
            <button
              key={i}
              onClick={() => { onSelect?.(emoji); setOpen(false); }}
              style={{ fontSize: 24, padding: 4, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmojiPicker;
```

## React concepts tested

- useState (open), useRef (trigger/popover).
- Conditional popover, positioning.
- Event listeners (outside click, Escape).
