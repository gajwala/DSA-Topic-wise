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

## React concepts tested

- useState, useEffect (interval, cleanup).
- Conditional class for active dot.
- Event handlers, optional keyboard.
