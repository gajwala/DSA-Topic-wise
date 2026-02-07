# 28 – Like Button with Animation

## Problem

Build a **like** (or heart) button: click toggles liked state; show count; **animate** on click (e.g. scale bounce, heart fill, or burst effect).

## Requirements

- **Toggle:** Click toggles liked (true/false). Display heart icon (filled when liked, outline when not) and optional count.
- **Count:** Show number; when liked, count increases by 1; when unliked, decreases by 1. (Or keep count independent and just reflect “you liked” with icon.)
- **Animation:** On click, play a short animation: e.g. scale(1.2) then back to 1; or heart “fills” with transition; or small particles burst. Use CSS transition/animation or optional library (e.g. framer-motion).
- **Optional:** Double-click to like (like Instagram); prevent accidental double-tap.

## Approach / Hints

- **State:** `liked: boolean`, `count: number`. Toggle: setLiked(l => !l); setCount(c => liked ? c - 1 : c + 1). Or count from server and liked is “user has liked” (optimistic update).
- **Icon:** Conditional render: filled heart (❤️ or SVG) when liked, outline when not. Or single SVG with path that changes and CSS transition.
- **CSS:** .like-btn:active { transform: scale(0.95); } .like-btn.liked { animation: bounce 0.3s; } @keyframes bounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.2); } }
- **Burst:** On click, render 3–5 small divs with random direction and opacity 0; animate with keyframes or framer-motion; remove after animation.

## Component structure (suggestion)

- `LikeButton` – state liked, count; icon; optional animation wrapper or particles; onClick toggle.

## Solution

```jsx
import { useState } from 'react';

function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const toggle = () => {
    setLiked((l) => !l);
    setCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <button
      onClick={toggle}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: 24,
        transition: 'transform 0.2s',
      }}
      className={liked ? 'liked' : ''}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {liked ? '❤️' : '🤍'} <span>{count}</span>
    </button>
  );
}

// Optional CSS for bounce: .liked { animation: bounce 0.3s; } @keyframes bounce { 50% { transform: scale(1.2); } }
export default LikeButton;
```

## React concepts tested

- useState, toggle and count update.
- CSS animation or class toggling.
- Optional: keyframe or transition.
