# Core Web Vitals

> LCP, INP, CLS – what they are, good thresholds, and how they affect UX and SEO.

---

## 1. Overview

| Metric | Full name | Measures | Good | Needs improvement | Poor |
|--------|-----------|----------|------|-------------------|------|
| **LCP** | Largest Contentful Paint | When main content is visible | ≤ 2.5s | 2.5s – 4s | > 4s |
| **INP** | Interaction to Next Paint | Input responsiveness | ≤ 200ms | 200ms – 500ms | > 500ms |
| **CLS** | Cumulative Layout Shift | Visual stability (no unexpected movement) | ≤ 0.1 | 0.1 – 0.25 | > 0.25 |

- **LCP:** Loading / perceived speed.
- **INP:** Responsiveness (replaces FID; reflects real interactions).
- **CLS:** Layout stability; low CLS = no jarring shifts.

---

## 2. LCP (Largest Contentful Paint)

### Definition

- When the **largest** image or text block visible in the viewport is painted. Typically hero image, heading, or large block of text.

### What counts as LCP element

- `<img>`, `<svg>` inside `<img>`, `<image>` inside `<svg>`.
- `<video>` poster image.
- Element with background image (via `url()`).
- Block-level text nodes (e.g. `<p>`, `<h1>`).

### How to improve

- Optimize server and CDN (reduce TTFB).
- Preload LCP image: `<link rel="preload" as="image" href="hero.jpg" />`.
- Use appropriate size/format; avoid loading huge images.
- Reduce render-blocking CSS/JS; inline critical CSS.
- Use SSR or static HTML for above-the-fold content so LCP isn’t delayed by JS.

---

## 3. INP (Interaction to Next Paint)

### Definition

- Latency from **user input** (click, tap, key) to **next paint** that reflects the result. Replaces FID (First Input Delay); based on real interactions.

### What it captures

- Input delay (main thread busy when user interacted).
- Processing time (handlers, React updates).
- Presentation delay (until next frame is drawn).

### How to improve

- Reduce main-thread work: code split, defer non-critical JS, optimize long tasks.
- Use Web Workers for heavy computation.
- Debounce/throttle where appropriate; avoid layout thrashing.
- Use `useTransition` / `useDeferredValue` in React for non-urgent updates.

---

## 4. CLS (Cumulative Layout Shift)

### Definition

- Sum of **layout shift scores** for unexpected shifts. Each shift score = `impact fraction × distance fraction`.

- **Impact fraction:** Share of viewport affected by the shift.
- **Distance fraction:** How far moved (as fraction of viewport).

### Common causes

- Images without `width`/`height` (or aspect-ratio).
- Ads, embeds, or iframes injected above content.
- Web fonts causing FOUT (text size change).
- Dynamically injected content above existing content (e.g. banner).

### How to improve

- Set **dimensions** (or `aspect-ratio`) on images and video.
- Reserve space for ads/embeds (e.g. min-height container).
- Use `font-display: optional` or `swap` and similar fallback font metrics.
- Avoid inserting content above existing content without reserving space; use skeleton or min-height.

---

## 5. Other useful metrics

| Metric | Meaning |
|--------|--------|
| **FCP** | First Contentful Paint – first text/image painted. |
| **TTFB** | Time to First Byte – server/network delay. |
| **FID** | First Input Delay – deprecated in favor of INP. |
| **TBT** | Total Blocking Time – main thread blocked (affects INP). |
| **Speed Index** | How quickly content is visually displayed. |

---

## 6. Measuring in code

See **[PerformanceAPI.md](PerformanceAPI.md)** for:

- **LCP:** `PerformanceObserver` with `entryType: 'largest-contentful-paint'`.
- **CLS:** `PerformanceObserver` with `entryType: 'layout-shift'`.
- **FCP:** `PerformanceObserver` with `entryType: 'paint'` (name `'first-contentful-paint'`).
- **TTFB:** `PerformanceTiming` / `PerformanceEntry` (navigation).

Quick reference:

```javascript
// LCP
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const last = entries[entries.length - 1];
  console.log('LCP', last.startTime, last);
}).observe({ type: 'largest-contentful-paint', buffered: true });

// CLS
let clsScore = 0;
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) clsScore += entry.value;
  }
  console.log('CLS', clsScore);
}).observe({ type: 'layout-shift', buffered: true });
```

---

## 7. Field vs lab

- **Lab:** Lighthouse, DevTools (controlled environment). Good for regression and debugging.
- **Field:** Real users (RUM, CrUX). Reflects real devices and networks. Use both: lab to fix, field to validate.
