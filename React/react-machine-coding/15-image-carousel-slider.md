# 15 – Image Carousel / Slider

## Problem

Build an **image carousel**: show one image at a time; Prev/Next buttons; optional auto-play, dots for current slide, and swipe (or keyboard arrows).

## Requirements

- **Slides:** Array of image URLs (or content); display one at a time (or slide transition).
- **Prev/Next:** Buttons to go to previous/next slide; wrap (last → first, first → last) or stop at ends.
- **Dots:** Indicators below; current slide highlighted; click dot to go to that slide.
- **Auto-play (optional):** Advance every N seconds; pause on hover or when user clicks Prev/Next.
- **Transition (optional):** CSS transition for slide left/right or fade.

## Approach / Hints

- **State:** `currentIndex: number`. Next: setCurrentIndex((i + 1) % length). Prev: setCurrentIndex((i - 1 + length) % length).
- **Auto-play:** useEffect with setInterval: increment index; cleanup on unmount. Optional: clear interval when user interacts, restart after delay.
- **Render:** Show slides[currentIndex]; or render all with transform translateX(-currentIndex * 100%) for slide effect.
- **Dots:** Map 0..length-1; button per index; active if index === currentIndex; onClick setCurrentIndex(index).

## Component structure (suggestion)

- `Carousel` – state currentIndex; prev/next handlers; dots; one container for slide (or track with transform).
- Optional `Slide` component for each image.

## Solution

```jsx
import { useState, useEffect } from 'react';

const slides = [
  'https://picsum.photos/400/200?1',
  'https://picsum.photos/400/200?2',
  'https://picsum.photos/400/200?3',
];

function Carousel() {
  const [index, setIndex] = useState(0);
  const n = slides.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % n), 3000);
    return () => clearInterval(id);
  }, [n]);

  return (
    <div style={{ maxWidth: 400 }}>
      <div style={{ position: 'relative' }}>
        <img src={slides[index]} alt="" style={{ width: '100%', display: 'block' }} />
        <button
          onClick={() => setIndex((i) => (i - 1 + n) % n)}
          style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}
        >
          ←
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % n)}
          style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
        >
          →
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 8 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{ width: 10, height: 10, borderRadius: '50%', background: i === index ? 'blue' : '#ccc' }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
```

## React concepts tested

- useState, useEffect (interval, cleanup).
- Conditional class for active dot.
- Event handlers, optional keyboard.
