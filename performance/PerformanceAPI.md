# Performance API – Measuring CLS, LCP, FCP, TTFB

> Using the browser Performance API and PerformanceObserver to measure Core Web Vitals and other metrics in code.

---

## 1. Navigation timing (TTFB, load, DCL)

### Getting navigation timing

```javascript
const nav = performance.getEntriesByType('navigation')[0];
if (nav) {
  const ttfb = nav.responseStart - nav.requestStart;        // Time to First Byte
  const domContentLoaded = nav.domContentLoadedEventEnd - nav.startTime;
  const loadComplete = nav.loadEventEnd - nav.startTime;

  console.log('TTFB (ms):', ttfb);
  console.log('DOM Content Loaded (ms):', domContentLoaded);
  console.log('Load (ms):', loadComplete);
}
```

### Key timestamps (simplified)

| Property | Meaning |
|----------|---------|
| `startTime` | Start of navigation |
| `requestStart` | When request was sent |
| `responseStart` | First byte received (TTFB = responseStart - requestStart) |
| `domContentLoadedEventEnd` | DCL done |
| `loadEventEnd` | Load event done |

---

## 2. Resource timing

- See when each resource (script, style, image) started and finished.

```javascript
performance.getEntriesByType('resource').forEach((r) => {
  console.log(r.name, r.duration, r.startTime);
});
```

---

## 3. User timing (custom marks and measures)

- Mark points in time and measure between them.

```javascript
performance.mark('fetch-start');
await fetch('/api/data');
performance.mark('fetch-end');
performance.measure('fetch-duration', 'fetch-start', 'fetch-end');

const measure = performance.getEntriesByName('fetch-duration')[0];
console.log('Fetch took (ms):', measure.duration);

performance.clearMarks('fetch-start');
performance.clearMarks('fetch-end');
performance.clearMeasures('fetch-duration');
```

---

## 4. LCP – Largest Contentful Paint (PerformanceObserver)

- LCP can update as larger content is painted (e.g. image loads). Use the **last** entry (or the one with largest size) as the LCP value.

```javascript
function getLCP() {
  return new Promise((resolve) => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      resolve({ value: last.startTime, entry: last });
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });

    // Optional: resolve after first LCP and disconnect
    const check = () => {
      const entries = performance.getEntriesByType('largest-contentful-paint');
      if (entries.length > 0) {
        const last = entries[entries.length - 1];
        observer.disconnect();
        resolve({ value: last.startTime, entry: last });
      } else {
        requestAnimationFrame(check);
      }
    };
    if (document.readyState === 'complete') {
      setTimeout(check, 0);
    } else {
      window.addEventListener('load', () => setTimeout(check, 0));
    }
  });
}

getLCP().then(({ value }) => console.log('LCP (ms):', value));
```

### Simpler: just observe and log last LCP

```javascript
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const last = entries[entries.length - 1];
  console.log('LCP', last.startTime, last.element?.tagName, last.url);
}).observe({ type: 'largest-contentful-paint', buffered: true });
```

---

## 5. CLS – Cumulative Layout Shift (PerformanceObserver)

- Sum `entry.value` for entries where `!entry.hadRecentInput` (ignore shifts right after user input).

```javascript
function getCLS() {
  let clsScore = 0;
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsScore += entry.value;
      }
    }
  });
  observer.observe({ type: 'layout-shift', buffered: true });

  return {
    getScore: () => clsScore,
    disconnect: () => observer.disconnect(),
  };
}

const cls = getCLS();
// Later (e.g. on page hide or after 5s):
window.addEventListener('pagehide', () => {
  console.log('CLS', cls.getScore());
  cls.disconnect();
});
```

### One-off CLS (report when user leaves or after delay)

```javascript
let clsScore = 0;
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) clsScore += entry.value;
  }
});
observer.observe({ type: 'layout-shift', buffered: true });

function reportCLS() {
  observer.disconnect();
  console.log('CLS', clsScore);
}
window.addEventListener('pagehide', reportCLS);
setTimeout(reportCLS, 5000); // or report after 5s
```

---

## 6. FCP – First Contentful Paint (PerformanceObserver)

```javascript
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name === 'first-contentful-paint') {
      console.log('FCP (ms):', entry.startTime);
      break;
    }
  }
}).observe({ type: 'paint', buffered: true });
```

### Fallback (if paint entries exist)

```javascript
const paintEntries = performance.getEntriesByType('paint');
const fcp = paintEntries.find((e) => e.name === 'first-contentful-paint');
if (fcp) console.log('FCP (ms):', fcp.startTime);
```

---

## 7. TTFB from Performance API

```javascript
const nav = performance.getEntriesByType('navigation')[0];
const ttfb = nav ? nav.responseStart - nav.requestStart : 0;
console.log('TTFB (ms):', ttfb);
```

---

## 8. INP (Interaction to Next Paint)

- INP is computed by the browser from **event timing** (input delay + processing + presentation). You can use the **Event Timing API** to approximate or debug, but the official **INP** is exposed in Chrome via `PerformanceObserver` with `entryType: 'event'` for `first-input` or via the **web-vitals** library which uses the proper API.

### Using web-vitals (recommended for INP)

```javascript
import { onINP } from 'web-vitals';

onINP(console.log);
```

### Event timing (input delay idea)

- Long tasks and input delay: use **PerformanceObserver** for `long-task` and correlate with event timestamps. Full INP calculation is complex; prefer **web-vitals** or Chrome’s built-in reporting.

---

## 9. All-in-one: report Core Web Vitals (LCP, CLS, FCP, TTFB)

```javascript
function reportWebVitals() {
  const nav = performance.getEntriesByType('navigation')[0];
  const ttfb = nav ? nav.responseStart - nav.requestStart : 0;

  const paintEntries = performance.getEntriesByType('paint');
  const fcpEntry = paintEntries.find((e) => e.name === 'first-contentful-paint');
  const fcp = fcpEntry ? fcpEntry.startTime : 0;

  let lcpValue = 0;
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const last = entries[entries.length - 1];
    lcpValue = last.startTime;
  });
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) clsValue += entry.value;
    }
  });
  clsObserver.observe({ type: 'layout-shift', buffered: true });

  function send() {
    lcpObserver.disconnect();
    clsObserver.disconnect();
    console.log({ TTFB: ttfb, FCP: fcp, LCP: lcpValue, CLS: clsValue });
    // Send to analytics: sendToAnalytics({ TTFB, FCP, LCP, CLS });
  }

  window.addEventListener('pagehide', send);
  setTimeout(send, 10000); // or when SPA considers "done"
}
reportWebVitals();
```

---

## 10. Long tasks (main thread blocking)

- Observe long tasks (e.g. > 50ms) that can hurt INP.

```javascript
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Long task (ms):', entry.duration);
  }
}).observe({ type: 'long-task', buffered: true });
```

- **Note:** `long-task` is not in all browsers; check support.

---

## 11. Browser support

| Feature | Support |
|--------|---------|
| Navigation/Resource timing | Broad |
| PerformanceObserver | Broad |
| largest-contentful-paint | Chrome, Edge, Safari (recent), Firefox (recent) |
| layout-shift | Chrome, Edge, Safari (recent), Firefox (recent) |
| paint | Broad |

- Use `buffered: true` to get entries that happened before the observer was created.
- For production RUM, consider **web-vitals** library and send metrics to your analytics.
