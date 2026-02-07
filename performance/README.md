# Performance – Techniques, Measurement & Interview Prep

> React, JavaScript, and web performance improvement techniques; how to measure (Core Web Vitals, Performance API); and interview Q&A so you can answer any performance-related question.

---

## Folder structure

| File | Contents |
|------|----------|
| [ReactPerformance.md](ReactPerformance.md) | React-specific: memo, virtualization, code splitting, reconciliation, keys, bundle |
| [JSPerformance.md](JSPerformance.md) | JavaScript: debounce, throttle, rAF, Web Workers, event delegation, memory |
| [WebPerformance.md](WebPerformance.md) | Web: caching, CDN, compression, images, HTTP, critical path, resource hints |
| [CoreWebVitals.md](CoreWebVitals.md) | LCP, INP/FID, CLS – definitions, targets, and measurement with code |
| [PerformanceAPI.md](PerformanceAPI.md) | Performance API: Navigation/Resource/User timing, PerformanceObserver, measuring CLS/LCP/FCP/TTFB |
| [MeasuringPerformance.md](MeasuringPerformance.md) | How to measure: Lighthouse, DevTools, RUM, field vs lab, tools |
| [InterviewQA.md](InterviewQA.md) | Interview Q&A covering all of the above |

---

## Quick reference

### Core Web Vitals (Google)

| Metric | Full name | What it measures | Good threshold |
|--------|-----------|------------------|----------------|
| **LCP** | Largest Contentful Paint | When main content is visible | ≤ 2.5s |
| **INP** | Interaction to Next Paint | Responsiveness (replaces FID) | ≤ 200ms |
| **CLS** | Cumulative Layout Shift | Visual stability | ≤ 0.1 |

### Performance API (browser)

- **Navigation Timing:** load, domContentLoaded, TTFB.
- **Resource Timing:** when each resource finished.
- **PerformanceObserver:** observe LCP, FCP, CLS, layout shifts, long tasks.
- **User Timing:** `performance.mark()` / `performance.measure()`.

### React performance levers

- `React.memo`, `useMemo`, `useCallback` (use with measure).
- Code splitting + `React.lazy` + Suspense.
- Virtualization for long lists.
- Stable keys; avoid inline objects/functions as props when children are memoized.

### JS performance levers

- Debounce / throttle for resize, scroll, input.
- `requestAnimationFrame` for animations.
- Web Workers for heavy CPU work.
- Event delegation; avoid excessive DOM nodes and reflows.

---

## Where to start

1. **Interview prep:** [InterviewQA.md](InterviewQA.md)
2. **Measure your page:** [PerformanceAPI.md](PerformanceAPI.md) + [CoreWebVitals.md](CoreWebVitals.md)
3. **Improve React:** [ReactPerformance.md](ReactPerformance.md)
4. **Improve JS/Web:** [JSPerformance.md](JSPerformance.md) + [WebPerformance.md](WebPerformance.md)
