# Performance Interview Q&A

> Questions and answers covering React, JavaScript, web performance, Core Web Vitals, Performance API, and measurement. Use this to prepare for any performance-related interview.

---

## Core Web Vitals & metrics

### What are Core Web Vitals? What do they measure?

**Core Web Vitals** are three user-centric metrics Google uses for UX and SEO:

1. **LCP (Largest Contentful Paint)** – When the largest visible content (image or text block) is painted. Measures **loading** / perceived speed. Good: ≤ 2.5s.
2. **INP (Interaction to Next Paint)** – Latency from user input (click, tap, key) to the next paint. Measures **responsiveness**. Good: ≤ 200ms. (Replaces FID.)
3. **CLS (Cumulative Layout Shift)** – Sum of unexpected layout shift scores. Measures **visual stability**. Good: ≤ 0.1.

---

### What is LCP? How do you improve it?

**LCP** = when the largest image or text block in the viewport is painted (e.g. hero image, main heading).

**Improve:** Reduce TTFB (fast server/CDN), preload LCP image, optimize image size/format, reduce render-blocking CSS/JS, inline critical CSS, use SSR or static HTML for above-the-fold content, code-split and defer non-critical JS.

---

### What is CLS? What causes it and how do you fix it?

**CLS** = cumulative score of **unexpected** layout shifts (content moving after load). Each shift contributes `impact fraction × distance fraction`.

**Causes:** Images without dimensions, ads/embeds without reserved space, web fonts causing FOUT, content injected above existing content.

**Fixes:** Set width/height or aspect-ratio on images and video; reserve space for ads/embeds; use font-display and similar fallback metrics; avoid inserting content above the fold without reserved space (skeleton or min-height).

---

### What is INP? How does it differ from FID?

**INP (Interaction to Next Paint)** = latency from a user interaction (click, tap, key) to the next paint. It reflects **all** interactions, not just the first. **FID (First Input Delay)** measured only the first input; INP is the recommended metric for responsiveness.

**Improve INP:** Reduce main-thread work (code split, defer JS, optimize long tasks), use Web Workers for heavy work, debounce/throttle where appropriate, use React’s useTransition/useDeferredValue for non-urgent updates.

---

### What is TTFB? How do you improve it?

**TTFB (Time to First Byte)** = time from the start of the request to the first byte of the response. It limits how soon the browser can start parsing and rendering.

**Improve:** Faster server/edge, CDN for static assets, optimize DB/cache for API, reduce server work for the critical path, use HTTP/2 and keep connections warm.

---

### What is FCP?

**FCP (First Contentful Paint)** = when the first text or image is painted. It’s the first moment the user sees *something*. Improve with fast TTFB, minimal render-blocking resources, and critical path optimization.

---

## Performance API & measuring in code

### How do you measure LCP in JavaScript?

Use **PerformanceObserver** with `type: 'largest-contentful-paint'`. LCP can update as larger content appears; use the last entry (or the one with the largest size) as the LCP value.

```javascript
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const last = entries[entries.length - 1];
  console.log('LCP (ms):', last.startTime);
}).observe({ type: 'largest-contentful-paint', buffered: true });
```

---

### How do you measure CLS in JavaScript?

Use **PerformanceObserver** with `type: 'layout-shift'`. Sum `entry.value` for all entries where `!entry.hadRecentInput` (ignore shifts right after user input).

```javascript
let cls = 0;
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) cls += entry.value;
  }
}).observe({ type: 'layout-shift', buffered: true });
// Report cls on pagehide or after a timeout
```

---

### How do you measure TTFB in JavaScript?

Use **Navigation Timing**: get the navigation entry and compute `responseStart - requestStart`.

```javascript
const nav = performance.getEntriesByType('navigation')[0];
const ttfb = nav ? nav.responseStart - nav.requestStart : 0;
```

---

### What is the Performance API? Name some parts.

The **Performance API** lets you measure and observe performance in the browser:

- **Navigation timing** – load, DCL, TTFB (e.g. `performance.getEntriesByType('navigation')`).
- **Resource timing** – when each resource loaded (`getEntriesByType('resource')`).
- **User timing** – custom `performance.mark()` and `performance.measure()`.
- **PerformanceObserver** – observe LCP, CLS, FCP, layout-shift, long-task, etc., including events that already happened with `buffered: true`.

---

### What is PerformanceObserver? Why use it instead of reading getEntriesByType once?

**PerformanceObserver** lets you subscribe to performance entries as they happen (and with `buffered: true`, also get entries that fired before the observer was created). For LCP and CLS, the browser emits entries over time; Observer gives you the full picture. A one-off `getEntriesByType` might run before the final LCP or some layout shifts.

---

## React performance

### How do you avoid unnecessary re-renders in React?

- **React.memo** – skip re-render when props are unchanged (shallow compare).
- **useMemo** – memoize expensive computed values and stable object/array refs.
- **useCallback** – stable function references for memoized children or effect deps.
- **Keys** – stable, unique keys in lists so reconciliation doesn’t recreate DOM unnecessarily.
- **State colocation** – keep state close to where it’s used so fewer components re-render.
- **Context** – split context or memoize the value so only consumers that need the changed value re-render.

---

### When would you use React.memo? When would you avoid it?

**Use:** When a component’s props are stable across parent re-renders and the component is expensive or deep. **Avoid:** When props change every time (e.g. inline objects/functions) unless you stabilize them with useMemo/useCallback in the parent. Don’t memoize everything; measure first.

---

### What is code splitting? How do you implement it in React?

**Code splitting** = loading only the JS needed for the current view (e.g. route or modal) instead of one big bundle. **Implement:** `React.lazy()` + `Suspense` for components; dynamic `import()` for non-React code. Route-based splitting (lazy per route) is common. Reduces initial bundle size and improves TTI/LCP.

---

### What is virtualization? When do you use it?

**Virtualization** = rendering only a “window” of items (e.g. 20–50) in a long list based on scroll position, instead of thousands of DOM nodes. **Use:** Long lists (100s or 1000s of rows). **Benefits:** Fewer DOM nodes, faster render and scroll, lower memory. Libraries: react-window, react-virtualized, @tanstack/react-virtual.

---

### How does context affect performance?

A context value change re-renders **all** consumers. **Improve:** Split contexts (theme, auth, etc.), memoize the value with useMemo so the reference doesn’t change when data hasn’t, or put frequently changing data in a separate context so only those consumers re-render.

---

## JavaScript performance

### What is the difference between debounce and throttle?

- **Debounce:** Run the function **once** after the user stops doing the action for a delay (e.g. search after user stops typing).
- **Throttle:** Run the function **at most once per time window** (e.g. scroll handler every 100ms). Use debounce for “after they stop”; throttle for “during continuous events.”

---

### Why use requestAnimationFrame instead of setTimeout for animations?

**requestAnimationFrame** runs before the next repaint, syncs with the display refresh rate (e.g. 60fps), and pauses when the tab is hidden. **setTimeout** doesn’t align with frames and can cause jank or unnecessary work when the tab isn’t visible.

---

### What is event delegation? Why is it a performance technique?

**Event delegation** = one listener on a parent, using `event.target` (or `closest`) to handle many children. **Benefits:** Fewer listeners, less memory, works for dynamically added children. Used for lists and large UIs.

---

### What are passive event listeners?

**Passive:** Tells the browser the handler won’t call `preventDefault()`. The browser can scroll immediately without waiting for the handler, improving scroll performance. Use for touch/wheel/scroll when you don’t need to prevent scrolling: `addEventListener('touchmove', fn, { passive: true })`.

---

### What causes layout thrashing? How do you avoid it?

**Layout thrashing** = alternating reads (offsetHeight, getBoundingClientRect) and writes (styles, DOM) that force repeated reflows. **Avoid:** Batch all reads first, then all writes; or use requestAnimationFrame to do reads then writes in one frame.

---

### When would you use a Web Worker?

Use a **Web Worker** for **CPU-heavy** work (parsing, crypto, heavy algorithms) so the main thread stays responsive. Workers can’t touch the DOM; communicate via `postMessage`. Use when you have long-running computation that would block the UI.

---

## Web & network performance

### How do you improve initial load time?

- Reduce **bundle size** (code split, tree shake, smaller libs).
- **Preload** critical resources (LCP image, key font).
- **Reduce TTFB** (CDN, fast server, cache).
- **Compression** (Brotli/gzip).
- **Critical path:** inline critical CSS, defer non-critical JS.
- **Images:** right size, modern format, don’t lazy the LCP image.

---

### What is the critical rendering path? How do you optimize it?

The **critical rendering path** is: HTML → DOM, CSS → CSSOM, JS → execute; DOM + CSSOM → render tree → layout → paint. **Optimize:** Minimize bytes and length of the path (inline critical CSS, defer JS, reduce render-blocking resources) so first paint (FCP/LCP) happens sooner.

---

### What are preload, prefetch, and preconnect?

- **preload:** Fetch this resource now with high priority (e.g. LCP image, critical font/script). `<link rel="preload" as="image" href="hero.jpg" />`
- **prefetch:** Low-priority fetch for likely next navigation. `<link rel="prefetch" href="next-page.html" />`
- **preconnect:** Early connection (DNS, TCP, TLS) to an origin. `<link rel="preconnect" href="https://api.example.com" />`

---

### How do you optimize images for performance?

- **Format:** WebP/AVIF with fallback.
- **Size:** Serve at display size (or 2x for retina); don’t serve 4000px for 400px box.
- **Lazy load:** `loading="lazy"` for below-the-fold; don’t lazy the LCP image.
- **Preload** the LCP image if it’s critical.
- **Compression:** Appropriate quality (e.g. 80–85).

---

### What is tree shaking? How does it help performance?

**Tree shaking** = removing unused exports from the final bundle (based on static import/export). **Requires:** ES modules. **Helps:** Smaller JS bundle → faster download and parse. Use named imports from libraries that support it (e.g. `import { map } from 'lodash-es'`) and build with a bundler that tree-shakes (Webpack, Rollup, Vite).

---

## Measurement & tools

### What is the difference between lab and field performance data?

- **Lab:** Controlled (your device, throttling). Tools: Lighthouse, DevTools, WebPageTest. Good for debugging and CI. May not match real users.
- **Field (RUM):** Real users, real devices/networks. Good for “are users actually fast?” and prioritization. Needs instrumentation (Performance API, web-vitals) and analytics.

Use **both:** lab to fix and regress; field to validate.

---

### How would you measure performance in production?

- **RUM:** Script that uses Performance API and PerformanceObserver to collect LCP, CLS, FCP, TTFB (and INP via web-vitals or similar), then send one beacon (e.g. on pagehide or timeout) to analytics.
- **CrUX:** Use PageSpeed Insights or Search Console for real-user CWV without building RUM.
- **Custom:** User timing marks/measures for key flows; send to backend.

---

### What is Lighthouse? What does it give you?

**Lighthouse** runs in Chrome (DevTools or CLI) and simulates load with throttling. It gives **scores** and **metrics** (FCP, LCP, TBT, CLS, etc.), plus **opportunities** and **diagnostics** (unused JS, large images, render-blocking, TTFB). Use for regression and finding improvement areas.

---

### How do you find what is blocking the main thread?

- **Chrome DevTools → Performance:** Record load or interaction; look at the **Main** thread. Long tasks (red blocks) show where time is spent (JS, layout, paint).
- **Long task observer:** PerformanceObserver with `type: 'long-task'` (where supported) to log long tasks in production.

---

## General & strategy

### How do you approach improving a slow page?

1. **Measure:** Lighthouse + DevTools (and RUM if available) to get baseline and identify bottlenecks (TTFB, LCP, CLS, INP, bundle size, long tasks).
2. **Prioritize:** Focus on Core Web Vitals and the biggest wins (often TTFB, LCP image, main-thread work).
3. **Fix:** Apply techniques (see ReactPerformance, JSPerformance, WebPerformance, CoreWebVitals).
4. **Re-measure** in lab, then validate in field.

---

### What is Time to Interactive (TTI)?

**TTI** = when the page is fully interactive (JS loaded, main thread idle enough to respond to input). Affected by bundle size, parse/compile time, and long tasks. Improve with code splitting, deferring non-critical JS, and breaking up long tasks.

---

### How do you reduce JavaScript bundle size?

- **Code splitting** and lazy loading (routes, heavy components).
- **Tree shaking** (ES modules, named imports).
- **Analyze** with webpack-bundle-analyzer or similar; replace or trim heavy libs.
- **Dedupe** dependencies (single React version, etc.).
- **Smaller alternatives** (e.g. day.js instead of moment).

---

### Explain memory leaks in the browser. How do you prevent them?

**Leaks:** Memory that’s no longer needed but still referenced (e.g. global refs to removed DOM, closures holding large data, uncleared intervals/listeners). **Prevent:** Remove event listeners and subscriptions in cleanup (e.g. useEffect return, AbortController); clear intervals/timeouts; avoid storing DOM or big objects in long-lived closures or globals.

---

## Quick one-liners (for rapid recall)

- **LCP** – When largest content is painted; improve with TTFB, preload, image optimization, critical path.
- **CLS** – Unexpected layout shift; fix with dimensions on media, reserved space, font-display.
- **INP** – Input-to-paint latency; improve by reducing main-thread work and long tasks.
- **TTFB** – First byte from server; improve with server, CDN, cache.
- **Measure LCP/CLS** – PerformanceObserver with `largest-contentful-paint` and `layout-shift`.
- **React** – memo, useMemo, useCallback, code split, virtualize lists, stable keys, context split.
- **JS** – Debounce/throttle, rAF, event delegation, passive listeners, batch reads/writes, Web Workers.
- **Web** – Cache, compress, preload LCP, lazy images, critical CSS, defer JS.
- **Lab vs field** – Lab = controlled (Lighthouse); field = real users (RUM/CrUX). Use both.

---

For deeper detail and code, see: [ReactPerformance.md](ReactPerformance.md), [JSPerformance.md](JSPerformance.md), [WebPerformance.md](WebPerformance.md), [CoreWebVitals.md](CoreWebVitals.md), [PerformanceAPI.md](PerformanceAPI.md), [MeasuringPerformance.md](MeasuringPerformance.md).
