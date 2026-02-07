# How to Measure Performance

> Tools, lab vs field, and how to use them to find and fix performance issues.

---

## 1. Lab vs field data

| | Lab | Field (RUM) |
|--|-----|-------------|
| **What** | Controlled environment (your machine, throttling) | Real users, real devices, real networks |
| **Tools** | Lighthouse, Chrome DevTools, WebPageTest | Analytics + Performance API, CrUX, RUM providers |
| **Use for** | Debugging, CI, regression, “can we paint fast?” | “Are users actually fast?”; prioritization |
| **Limitation** | May not match real devices/networks | Needs instrumentation and traffic |

- **Use both:** Lab to implement and regression-test; field to validate and prioritize.

---

## 2. Lighthouse (lab)

- Runs in Chrome (DevTools or CLI); simulates mobile/desktop and throttling.
- **Metrics:** FCP, LCP, TBT, CLS, Speed Index, TTI (and more).
- **Opportunities / diagnostics:** Unused JS/CSS, large images, render-blocking, etc.

### How to run

- **Chrome DevTools:** Open DevTools → Lighthouse tab → Analyze page load (or mode of choice).
- **CLI:** `npx lighthouse https://example.com --output html --view` (or json).
- **CI:** Run Lighthouse in headless Chrome; fail or warn on score/thresholds.

### What to look at

- **Performance score** and **Core Web Vitals** (LCP, INP surrogate, CLS).
- **Diagnostics:** Largest elements, long tasks, layout shifts, TTFB.
- **Opportunities:** Reduce unused JS, use modern image formats, preload LCP, etc.

---

## 3. Chrome DevTools

### Performance panel

- Record a load or interaction; see **Main** thread (JS, layout, paint), **Network**, **Frames**.
- **Long tasks** (red blocks) → break up work or move to worker.
- **Layout thrash** → batch reads/writes (see JSPerformance.md).

### Network panel

- Throttling (Fast 3G, etc.), **Disable cache**, see waterfall and resource sizes.
- Check TTFB and which resources block first paint.

### Coverage

- **Coverage tab:** Find unused JS/CSS per load; guides code splitting and critical CSS.

### Core Web Vitals in DevTools

- **Lighthouse** and **Performance** record LCP; **Experience** section can show layout shifts. Use **Performance** recording and look at LCP and layout shift events.

---

## 4. WebPageTest (lab)

- Runs from multiple locations and devices; customizable throttling and number of runs.
- **Metrics:** Start render, LCP, TTFB, video of load, waterfall.
- **Use:** Compare before/after, test from different geos, test on real devices (when available).

---

## 5. Real User Monitoring (RUM) – field

### What to collect

- **LCP, FCP, CLS, TTFB** (and INP when available) via Performance API / PerformanceObserver (see [PerformanceAPI.md](PerformanceAPI.md)).
- **Context:** device type, connection (if available), URL, timestamp.

### How

- Small script on every page that:
  - Observes LCP, CLS, FCP (and optionally INP via web-vitals).
  - Reads navigation timing for TTFB.
  - Sends one beacon (e.g. on `pagehide` or after a timeout) to your analytics.
- **Libraries:** e.g. **web-vitals** (Google) to get CWV and send to your backend or Google Analytics.

### Example: send to analytics

```javascript
import { onCLS, onLCP, onFCP, onINP } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    id: metric.id,
    url: location.href,
  });
  navigator.sendBeacon?.('/api/analytics', body);
}

onCLS(sendToAnalytics);
onLCP(sendToAnalytics);
onFCP(sendToAnalytics);
onINP(sendToAnalytics);
```

---

## 6. Chrome User Experience Report (CrUX) – field

- **What:** Aggregated, real-user CWV data from Chrome (LCP, FID/INP, CLS) per URL and origin.
- **Where:** PageSpeed Insights, Search Console (Core Web Vitals report), BigQuery (CrUX dataset).
- **Use:** See how your URL/origin performs for real users without your own RUM.

---

## 7. Performance API (in-code measurement)

- **Navigation timing:** TTFB, DCL, load (see [PerformanceAPI.md](PerformanceAPI.md)).
- **PerformanceObserver:** LCP, CLS, FCP, long tasks.
- **User timing:** `performance.mark()` / `performance.measure()` for custom spans (e.g. “time to first fetch”, “render list”).

Use these in development (console, debug page) and in RUM (send to backend).

---

## 8. What to measure (checklist)

- [ ] **LCP** – Is the main content visible quickly?
- [ ] **FCP** – When does something first appear?
- [ ] **CLS** – Is the page stable (no big shifts)?
- [ ] **INP (or FID)** – Do clicks/inputs feel responsive?
- [ ] **TTFB** – Is the server/network slow?
- [ ] **Bundle size / parse time** – How much JS and how long to parse? (Lighthouse, Coverage, bundle analyzer)

---

## 9. Process (summary)

1. **Measure** (Lighthouse + DevTools + optional WebPageTest) to get a baseline and find issues.
2. **Fix** using React/JS/Web techniques and Core Web Vitals guidance.
3. **Re-measure** in lab to confirm.
4. **Deploy** and use **RUM / CrUX** to confirm improvement in the field.
