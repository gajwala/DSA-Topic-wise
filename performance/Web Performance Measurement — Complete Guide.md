# 📊 Web Performance Measurement — Complete Guide

> How to measure every performance metric of a web page using the Performance API,
> Core Web Vitals, and real-world monitoring. Interview-ready, FAANG-level depth.

---

## 📖 Table of Contents

1. [How to Answer This Interview Question](#1-how-to-answer-this-interview-question)
2. [The 4 Layers of Performance Measurement](#2-the-4-layers-of-performance-measurement)
3. [performance.getEntriesByType — All 5 Types](#3-performancegetentriesbytype--all-5-types)
   - [navigation](#-type-navigation)
   - [resource](#-type-resource)
   - [paint](#-type-paint)
   - [longtask](#-type-longtask)
   - [event](#-type-event)
4. [PerformanceObserver — Real-Time Monitoring](#4-performanceobserver--real-time-monitoring)
5. [Core Web Vitals in Code](#5-core-web-vitals-in-code)
6. [Custom Marks & Measures](#6-custom-marks--measures)
7. [Navigation Timing — Every Metric Explained](#7-navigation-timing--every-metric-explained)
8. [Resource Timing — Deep Dive](#8-resource-timing--deep-dive)
9. [Sending Metrics to Your Backend](#9-sending-metrics-to-your-backend)
10. [Complete Production-Ready Setup](#10-complete-production-ready-setup)
11. [Interview Answer Framework](#11-interview-answer-framework)

---

## 1. How to Answer This Interview Question

When asked *"How would you measure your web page performance?"*, give a **layered answer**:

```
Layer 1 — Lab tools      → Lighthouse, WebPageTest, DevTools (you control the test)
Layer 2 — Field data     → CrUX, PageSpeed Insights (real user data from Google)
Layer 3 — RUM            → Performance API in your JS code (real users, your data)
Layer 4 — Custom metrics → performance.mark() for business-specific timings
```

> ✅ Complete answer: "I'd use Lighthouse in CI to catch regressions, instrument
> the Performance API for Real User Monitoring, track Core Web Vitals with the
> web-vitals library, and send all metrics to an analytics backend via
> sendBeacon so I have real-world data — not just lab numbers."

---

## 2. The 4 Layers of Performance Measurement

### Layer 1 — Lab Tools (Synthetic)

| Tool | Use for |
|------|---------|
| Chrome DevTools | Deep dive — waterfall, flame chart, paint layers |
| Lighthouse | Audit score, CWV, opportunities, CI integration |
| WebPageTest | Multi-location, real browser, filmstrip, HAR |
| `web-vitals` library | CWV in your own code |

```bash
# Run Lighthouse from CLI
npx lighthouse https://example.com --output=html --view

# Lighthouse CI — fail the build if thresholds missed
npm install -g @lhci/cli
lhci autorun
```

### Layer 2 — Field Data (Real Users via Google)

```
PageSpeed Insights  → https://pagespeed.web.dev
CrUX Dashboard      → https://g.co/chromeuxreport
Search Console      → Core Web Vitals report
```

### Layer 3 — RUM with Performance API (Your Real Users)

This is what you instrument yourself — the focus of this guide.

### Layer 4 — Custom Business Metrics

```js
// Time to first meaningful product interaction
performance.mark('product-list-visible');
performance.mark('add-to-cart-clicked');
performance.measure('time-to-first-add', 'product-list-visible', 'add-to-cart-clicked');
```

---

## 3. performance.getEntriesByType — All 5 Types

```
Entry types available:
┌─────────────────┬──────────────────────────────────────────────────┐
│ "navigation"    │ Full page load timeline (TTFB, DOM, load)        │
│ "resource"      │ Every sub-resource (JS, CSS, images, fonts, API) │
│ "paint"         │ FP and FCP timestamps                            │
│ "longtask"      │ Tasks > 50ms that block the main thread          │
│ "event"         │ User interaction latency (INP measurement)       │
└─────────────────┴──────────────────────────────────────────────────┘
```

---

### 🔵 Type: `navigation`

The complete timeline of your page load — from the moment the user navigated
to when the page fully loaded.

```js
const [nav] = performance.getEntriesByType('navigation');

// Every timing property and what it means:
console.table({
  // ─── DNS ───────────────────────────────────────────────
  'DNS lookup time':
    nav.domainLookupEnd - nav.domainLookupStart,
  // How long DNS resolution took. Target: < 20ms (should be cached)

  // ─── TCP + TLS ─────────────────────────────────────────
  'TCP connect time':
    nav.connectEnd - nav.connectStart,
  // Time for TCP 3-way handshake. Target: < 20ms (reused connection = 0)

  'TLS handshake time':
    nav.secureConnectionStart > 0
      ? nav.connectEnd - nav.secureConnectionStart
      : 0,
  // HTTPS only. TLS 1.3 target: < 50ms

  // ─── REQUEST / RESPONSE ────────────────────────────────
  'Time to First Byte (TTFB)':
    nav.responseStart - nav.requestStart,
  // Server processing + network time. Target: < 800ms
  // High TTFB → slow server, no CDN, slow DB queries

  'Response download time':
    nav.responseEnd - nav.responseStart,
  // Time to download the HTML body. High = large HTML or slow network

  // ─── DOM PROCESSING ────────────────────────────────────
  'DOM processing time':
    nav.domComplete - nav.responseEnd,
  // Time for browser to parse HTML, load sub-resources, execute JS
  // High → render-blocking resources, large JS bundles

  'DOM Interactive':
    nav.domInteractive - nav.startTime,
  // DOM parsed, deferred scripts not yet run
  // User can start interacting with DOM at this point

  'DOM Content Loaded (DCL)':
    nav.domContentLoadedEventEnd - nav.startTime,
  // HTML parsed + deferred scripts executed
  // jQuery's $(document).ready() fires here

  // ─── FULL LOAD ─────────────────────────────────────────
  'Full page load time':
    nav.loadEventEnd - nav.startTime,
  // Everything loaded: HTML, CSS, JS, images, fonts
  // window.onload fires here. Target: < 3s

  'Load event handler duration':
    nav.loadEventEnd - nav.loadEventStart,
  // Time spent in your window.onload handlers
  // High → move heavy work out of load handler

  // ─── REDIRECT ──────────────────────────────────────────
  'Redirect time':
    nav.redirectEnd - nav.redirectStart,
  // Time spent on HTTP redirects. Target: 0 (eliminate redirects)
  // Redirect chains (http → https → www) add 100–300ms each

  // ─── EXTRAS ────────────────────────────────────────────
  'Transfer size (bytes)': nav.transferSize,
  // Total bytes transferred including headers. 0 = served from cache

  'Encoded body size':     nav.encodedBodySize,
  // Compressed HTML size

  'Decoded body size':     nav.decodedBodySize,
  // Uncompressed HTML size
  // Ratio decoded/encoded = compression ratio (should be 3–10x)
});

// Page load breakdown as a single object to send to analytics
function getNavigationMetrics() {
  const [nav] = performance.getEntriesByType('navigation');
  if (!nav) return null;

  return {
    dns:          Math.round(nav.domainLookupEnd  - nav.domainLookupStart),
    tcp:          Math.round(nav.connectEnd        - nav.connectStart),
    tls:          nav.secureConnectionStart > 0
                    ? Math.round(nav.connectEnd - nav.secureConnectionStart)
                    : 0,
    ttfb:         Math.round(nav.responseStart     - nav.requestStart),
    download:     Math.round(nav.responseEnd       - nav.responseStart),
    domParsing:   Math.round(nav.domInteractive    - nav.responseEnd),
    dcl:          Math.round(nav.domContentLoadedEventEnd - nav.startTime),
    load:         Math.round(nav.loadEventEnd      - nav.startTime),
    redirects:    Math.round(nav.redirectEnd       - nav.redirectStart),
    transferSize: nav.transferSize,
    type:         nav.type, // "navigate" | "reload" | "back_forward" | "prerender"
  };
}
```

#### Navigation timing diagram
```
startTime
    │
    ├──[redirect]──────────────────────┐
    │                          redirectEnd
    │
    ├──[DNS]───────────────────────────┐
    │  domainLookupStart    domainLookupEnd
    │
    ├──[TCP + TLS]─────────────────────┐
    │  connectStart  secureConnectionStart  connectEnd
    │
    ├──[Request]───────────────────────┐
    │  requestStart             responseStart  ← TTFB
    │
    ├──[Response]──────────────────────┐
    │                          responseEnd
    │
    ├──[DOM processing]────────────────┐
    │  domInteractive    domContentLoadedEventEnd
    │
    └──[Load]──────────────────────────┐
                          loadEventEnd  ← Full page load
```

---

### 🟢 Type: `resource`

Every single sub-resource the browser loaded: JS, CSS, fonts, images, API calls.

```js
const resources = performance.getEntriesByType('resource');

// ─── Basic: log all resources with duration ───────────────────────
resources.forEach(r => {
  console.log(`${r.initiatorType.padEnd(8)} | ${r.duration.toFixed(0)}ms | ${r.name}`);
});
// Output:
// script   | 243ms | https://example.com/app.js
// css      | 89ms  | https://example.com/styles.css
// img      | 156ms | https://example.com/hero.webp
// fetch    | 312ms | https://api.example.com/users

// ─── Group by type ────────────────────────────────────────────────
function groupResourcesByType() {
  const resources = performance.getEntriesByType('resource');
  return resources.reduce((acc, r) => {
    const type = r.initiatorType; // script|css|img|fetch|xmlhttprequest|font|other
    if (!acc[type]) acc[type] = [];
    acc[type].push({
      url:          r.name,
      duration:     Math.round(r.duration),
      size:         r.transferSize,         // bytes (0 = cached)
      cached:       r.transferSize === 0,
      fromCache:    r.transferSize === 0 && r.decodedBodySize > 0,
    });
    return acc;
  }, {});
}

// ─── Find slow resources (> 500ms) ────────────────────────────────
function findSlowResources(threshold = 500) {
  return performance
    .getEntriesByType('resource')
    .filter(r => r.duration > threshold)
    .sort((a, b) => b.duration - a.duration)
    .map(r => ({
      url:      r.name,
      duration: Math.round(r.duration),
      type:     r.initiatorType,
      size:     r.transferSize,
    }));
}

// ─── Find large resources ─────────────────────────────────────────
function findLargeResources(thresholdKB = 100) {
  const threshold = thresholdKB * 1024;
  return performance
    .getEntriesByType('resource')
    .filter(r => r.decodedBodySize > threshold)
    .sort((a, b) => b.decodedBodySize - a.decodedBodySize)
    .map(r => ({
      url:             r.name,
      compressedKB:    (r.encodedBodySize  / 1024).toFixed(1),
      uncompressedKB:  (r.decodedBodySize  / 1024).toFixed(1),
      compressionRatio:(r.decodedBodySize  / r.encodedBodySize).toFixed(1) + 'x',
      cached:          r.transferSize === 0,
    }));
}

// ─── Check which resources are NOT cached (on repeat visit) ───────
function getUncachedResources() {
  return performance
    .getEntriesByType('resource')
    .filter(r => r.transferSize > 0) // transferSize > 0 = not from cache
    .map(r => ({ url: r.name, type: r.initiatorType }));
}

// ─── Detect render-blocking resources ─────────────────────────────
function getRenderBlockingResources() {
  const [nav] = performance.getEntriesByType('navigation');
  const renderStart = nav.domInteractive;

  // Resources that finished loading AFTER domInteractive are suspicious
  return performance
    .getEntriesByType('resource')
    .filter(r =>
      (r.initiatorType === 'script' || r.initiatorType === 'css') &&
      r.responseEnd > renderStart
    )
    .map(r => ({
      url:      r.name,
      type:     r.initiatorType,
      end:      Math.round(r.responseEnd),
      blocking: Math.round(r.responseEnd - renderStart) + 'ms late',
    }));
}

// ─── Resource timing per entry — full breakdown ───────────────────
function getResourceTimingBreakdown(url) {
  const r = performance.getEntriesByName(url)[0];
  if (!r) return null;

  return {
    redirect:   Math.round(r.redirectEnd         - r.redirectStart),
    dns:        Math.round(r.domainLookupEnd      - r.domainLookupStart),
    tcp:        Math.round(r.connectEnd           - r.connectStart),
    tls:        r.secureConnectionStart > 0
                  ? Math.round(r.connectEnd - r.secureConnectionStart) : 0,
    request:    Math.round(r.responseStart        - r.requestStart),
    response:   Math.round(r.responseEnd          - r.responseStart),
    total:      Math.round(r.duration),
    // Stalled time (waiting in queue, not downloading)
    stalled:    Math.round(r.requestStart         - r.fetchStart),
  };
}

// ─── Full resource summary ────────────────────────────────────────
function getResourceSummary() {
  const resources = performance.getEntriesByType('resource');
  return {
    totalCount:     resources.length,
    totalSizeKB:    (resources.reduce((s, r) => s + r.transferSize, 0) / 1024).toFixed(1),
    totalDuration:  Math.round(Math.max(...resources.map(r => r.responseEnd))),
    cachedCount:    resources.filter(r => r.transferSize === 0).length,
    byType: ['script','css','img','fetch','font','xmlhttprequest'].map(type => ({
      type,
      count:   resources.filter(r => r.initiatorType === type).length,
      totalKB: (resources
                  .filter(r => r.initiatorType === type)
                  .reduce((s, r) => s + r.transferSize, 0) / 1024).toFixed(1),
    })),
  };
}
```

---

### 🟡 Type: `paint`

First Paint (FP) and First Contentful Paint (FCP) timestamps.

```js
const paints = performance.getEntriesByType('paint');

// Returns two entries:
// { name: "first-paint",            startTime: 245.3 }
// { name: "first-contentful-paint", startTime: 312.7 }

function getPaintMetrics() {
  const entries = performance.getEntriesByType('paint');
  const fp  = entries.find(e => e.name === 'first-paint');
  const fcp = entries.find(e => e.name === 'first-contentful-paint');

  return {
    fp:  fp  ? Math.round(fp.startTime)  : null,  // Target: < 1000ms
    fcp: fcp ? Math.round(fcp.startTime) : null,  // Target: < 1800ms
  };
}

// FP vs FCP:
// FP  = first ANYTHING painted (even a background color)
// FCP = first content painted (text, image, SVG, canvas)
// Big gap between FP and FCP = blank screen with background then content appears
// → fix: inline critical CSS, reduce render-blocking resources

// Observe FCP in real-time (fires as soon as it happens)
const observer = new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    if (entry.name === 'first-contentful-paint') {
      console.log('FCP:', Math.round(entry.startTime), 'ms');
      observer.disconnect();
    }
  });
});
observer.observe({ type: 'paint', buffered: true });
```

---

### 🔴 Type: `longtask`

Tasks that take **more than 50ms** on the main thread. These are the direct cause
of janky UI and high INP scores.

```js
// ⚠️ longtask is NOT available via getEntriesByType at load time
// Must use PerformanceObserver (fires as tasks happen)

const longTasks = [];

const observer = new PerformanceObserver(list => {
  list.getEntries().forEach(task => {
    const entry = {
      duration:       Math.round(task.duration),     // how long it ran (ms)
      startTime:      Math.round(task.startTime),    // when it started
      culprit:        task.attribution?.[0]?.name ?? 'unknown',
      // attribution tells you WHERE the long task came from:
      // "self"             → your own code
      // "same-origin-descendant" → iframe from same origin
      // "cross-origin-ancestor"  → third-party script
    };

    longTasks.push(entry);
    console.warn('Long task detected:', entry);
  });
});

observer.observe({ type: 'longtask', buffered: true });

// ─── Summarize long tasks ─────────────────────────────────────────
function getLongTaskSummary() {
  return {
    count:       longTasks.length,
    totalTime:   longTasks.reduce((s, t) => s + t.duration, 0),
    worst:       Math.max(...longTasks.map(t => t.duration)),
    // Blocking time = sum of (duration - 50) for each long task
    // This directly maps to Total Blocking Time (TBT) in Lighthouse
    blockingTime: longTasks.reduce((s, t) => s + (t.duration - 50), 0),
    tasks:        longTasks.sort((a, b) => b.duration - a.duration),
  };
}

// Targets:
// Long task count:  0 (ideally, especially during load)
// Total Blocking Time (TBT): < 300ms (good), < 600ms (needs improvement)
```

---

### 🟠 Type: `event`

Measures the latency of user interactions (click, keydown, pointerdown).
This is what drives the **INP (Interaction to Next Paint)** metric.

```js
// Observe all user interaction events
const interactions = [];

const observer = new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    // entry.duration = time from interaction to next paint
    const interaction = {
      type:          entry.name,           // "click" | "keydown" | "pointerdown"
      duration:      Math.round(entry.duration),   // Target: < 200ms
      processingStart: Math.round(entry.processingStart - entry.startTime),
      // processingStart - startTime = INPUT DELAY
      // Time from user action to when JS handler starts running
      // Caused by: long tasks blocking the main thread

      processingTime:  Math.round(entry.processingDuration),
      // Time JS handler itself took to run
      // Caused by: heavy computation in event handler

      presentationDelay: Math.round(
        entry.duration - entry.processingDuration -
        (entry.processingStart - entry.startTime)
      ),
      // Time after handler runs to next paint
      // Caused by: heavy rendering work, layout thrashing

      startTime:     Math.round(entry.startTime),
    };

    interactions.push(interaction);

    if (interaction.duration > 200) {
      console.warn('Slow interaction (INP candidate):', interaction);
    }
  });
});

observer.observe({
  type: 'event',
  buffered: true,
  durationThreshold: 16 // capture all interactions ≥ 16ms
});

// ─── Calculate INP (worst interaction) ───────────────────────────
function getINP() {
  if (!interactions.length) return null;
  // INP = 98th percentile of all interaction durations
  const sorted = [...interactions].sort((a, b) => b.duration - a.duration);
  const p98Index = Math.floor(sorted.length * 0.02);
  return {
    inp:          sorted[p98Index]?.duration ?? sorted[0].duration,
    worst:        sorted[0].duration,
    count:        interactions.length,
    slowCount:    interactions.filter(i => i.duration > 200).length,
    allInteractions: sorted,
  };
}
```

---

## 4. PerformanceObserver — Real-Time Monitoring

`getEntriesByType` only works for entries already buffered. Use `PerformanceObserver`
to capture metrics AS they happen (especially important for LCP, CLS, INP).

```js
// ─── Observe multiple entry types at once ─────────────────────────
function setupPerformanceObserver(onMetric) {
  // 1. Paint (FP, FCP)
  new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      onMetric({ name: entry.name, value: Math.round(entry.startTime) });
    });
  }).observe({ type: 'paint', buffered: true });

  // 2. LCP — updates as larger elements appear, final value is the real LCP
  let lcpEntry;
  new PerformanceObserver(list => {
    // Last entry is always the most accurate LCP
    lcpEntry = list.getEntries().at(-1);
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  // Report LCP when page is hidden (user navigated away / switched tab)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && lcpEntry) {
      onMetric({
        name:    'LCP',
        value:   Math.round(lcpEntry.startTime),
        element: lcpEntry.element?.tagName,
        url:     lcpEntry.url,
      });
    }
  }, { once: true });

  // 3. CLS — accumulates over page lifetime, report on hide
  let clsValue = 0;
  let clsEntries = [];
  new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      // Only count unexpected shifts (not shifts after user input)
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        clsEntries.push({ value: entry.value, sources: entry.sources });
      }
    });
  }).observe({ type: 'layout-shift', buffered: true });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      onMetric({
        name:    'CLS',
        value:   Math.round(clsValue * 1000) / 1000, // 3 decimal places
        entries: clsEntries,
      });
    }
  }, { once: true });

  // 4. Long tasks
  new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      onMetric({
        name:     'long-task',
        duration: Math.round(entry.duration),
        culprit:  entry.attribution?.[0]?.name,
      });
    });
  }).observe({ type: 'longtask', buffered: true });

  // 5. INP interactions
  new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      if (entry.duration > 200) {
        onMetric({
          name:     'slow-interaction',
          type:     entry.name,
          duration: Math.round(entry.duration),
        });
      }
    });
  }).observe({ type: 'event', buffered: true, durationThreshold: 200 });
}

// Usage
setupPerformanceObserver(metric => {
  console.log('[perf]', metric);
  sendToAnalytics(metric);
});
```

---

## 5. Core Web Vitals in Code

Use Google's official `web-vitals` library for accurate CWV measurement
(handles edge cases like BFCache, prerender, visibility changes):

```bash
npm install web-vitals
```

```js
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

// Each callback fires once with the final, most accurate value
onLCP(metric => {
  // metric.value  = LCP in ms. Good: < 2500
  // metric.rating = "good" | "needs-improvement" | "poor"
  // metric.entries = the LCP element entries
  // metric.navigationType = "navigate" | "reload" | "back-forward"
  sendToAnalytics({
    name:   metric.name,   // "LCP"
    value:  metric.value,
    rating: metric.rating,
  });
});

onINP(metric => {
  // Good: < 200ms, Needs improvement: 200–500ms, Poor: > 500ms
  sendToAnalytics({ name: metric.name, value: metric.value, rating: metric.rating });
});

onCLS(metric => {
  // Good: < 0.1, Needs improvement: 0.1–0.25, Poor: > 0.25
  sendToAnalytics({ name: metric.name, value: metric.value, rating: metric.rating });
});

onFCP(metric => {
  // Good: < 1800ms
  sendToAnalytics({ name: metric.name, value: metric.value, rating: metric.rating });
});

onTTFB(metric => {
  // Good: < 800ms
  // metric.value includes redirect time + DNS + TCP + TLS + server processing
  sendToAnalytics({ name: metric.name, value: metric.value, rating: metric.rating });
});
```

---

## 6. Custom Marks & Measures

Use `performance.mark()` and `performance.measure()` to time specific user flows
in your application — things the built-in API doesn't know about.

```js
// ─── Basic mark + measure ─────────────────────────────────────────
performance.mark('app-init-start');
// ... initialize app
performance.mark('app-init-end');

performance.measure('app-init', 'app-init-start', 'app-init-end');

const [measure] = performance.getEntriesByName('app-init');
console.log('App init time:', Math.round(measure.duration), 'ms');

// ─── Real-world examples ──────────────────────────────────────────

// 1. Time to interactive product list
performance.mark('products-fetch-start');
const products = await fetchProducts();
performance.mark('products-fetch-end');
performance.mark('products-render-start');
renderProducts(products);
performance.mark('products-render-end');

performance.measure('products-fetch',  'products-fetch-start',  'products-fetch-end');
performance.measure('products-render', 'products-render-start', 'products-render-end');
performance.measure('products-total',  'products-fetch-start',  'products-render-end');

// 2. Route change timing (SPA navigation)
router.on('navigate', (to) => {
  performance.mark(`route-${to}-start`);
});
router.on('ready', (to) => {
  performance.mark(`route-${to}-end`);
  performance.measure(`route-${to}`, `route-${to}-start`, `route-${to}-end`);
  const [entry] = performance.getEntriesByName(`route-${to}`);
  sendToAnalytics({ name: 'route-change', route: to, duration: entry.duration });
});

// 3. API call timing
async function timedFetch(url, options) {
  const id = Math.random().toString(36).slice(2);
  performance.mark(`api-${id}-start`);
  try {
    const res = await fetch(url, options);
    performance.mark(`api-${id}-end`);
    performance.measure(`api-${url}`, `api-${id}-start`, `api-${id}-end`);
    return res;
  } catch(err) {
    performance.mark(`api-${id}-error`);
    throw err;
  }
}

// ─── Get all custom measures ──────────────────────────────────────
function getAllCustomMeasures() {
  return performance.getEntriesByType('measure').map(m => ({
    name:      m.name,
    duration:  Math.round(m.duration),
    startTime: Math.round(m.startTime),
  }));
}

// ─── Clean up marks (avoid memory buildup) ───────────────────────
performance.clearMarks();     // clear all marks
performance.clearMeasures();  // clear all measures
performance.clearMarks('app-init-start'); // clear specific mark
```

---

## 7. Navigation Timing — Every Metric Explained

```js
function getFullNavigationReport() {
  const [nav] = performance.getEntriesByType('navigation');

  return {
    // ── What type of navigation was this? ──────────────────────────
    type: nav.type,
    // "navigate"     → normal URL navigation
    // "reload"       → user pressed refresh
    // "back_forward" → browser back/forward button
    // "prerender"    → prerendered page became active

    // ── Network phase ─────────────────────────────────────────────
    redirectCount: nav.redirectCount,      // number of redirects followed
    redirectTime:  nav.redirectEnd - nav.redirectStart,
    // High redirect time: eliminate redirect chains (http→https, no-www→www)

    dnsTime: nav.domainLookupEnd - nav.domainLookupStart,
    // 0 = DNS was cached. If > 0 on repeat visits → fix DNS TTL

    tcpTime: nav.connectEnd - nav.connectStart,
    // 0 = connection was reused (HTTP/2 keepalive). If always > 0 → check HTTP/2

    tlsTime: nav.secureConnectionStart > 0
      ? nav.connectEnd - nav.secureConnectionStart : 0,
    // 0 = connection was reused. High = TLS 1.2 (upgrade to 1.3)

    // ── Server phase ───────────────────────────────────────────────
    ttfb: nav.responseStart - nav.requestStart,
    // THE most important server metric
    // High TTFB causes: no CDN, slow DB, no server caching, cold serverless fn

    // ── Download phase ─────────────────────────────────────────────
    htmlDownloadTime: nav.responseEnd - nav.responseStart,
    // High = large HTML, slow network, no compression

    // ── Parse + render phase ───────────────────────────────────────
    domInteractiveTime: nav.domInteractive - nav.startTime,
    // When HTML is fully parsed. High = render-blocking resources

    dclTime: nav.domContentLoadedEventEnd - nav.startTime,
    // When deferred JS has run. High = large deferred JS

    loadTime: nav.loadEventEnd - nav.startTime,
    // Full page load. High = large images, fonts, JS

    // ── Cache check ────────────────────────────────────────────────
    servedFromCache: nav.transferSize === 0,
    // true = full page from service worker or disk cache

    // ── Size ───────────────────────────────────────────────────────
    htmlSizeKB:          (nav.decodedBodySize  / 1024).toFixed(1),
    htmlCompressedKB:    (nav.encodedBodySize  / 1024).toFixed(1),
    compressionEnabled:  nav.encodedBodySize < nav.decodedBodySize,
  };
}
```

---

## 8. Resource Timing — Deep Dive

```js
// ─── Complete resource analysis ───────────────────────────────────
function analyzeResources() {
  const resources = performance.getEntriesByType('resource');

  // initiatorType values:
  // "script"           → <script src="">
  // "css"              → <link rel="stylesheet">
  // "img"              → <img src="">
  // "fetch"            → fetch() API
  // "xmlhttprequest"   → XMLHttpRequest
  // "font"             → @font-face
  // "iframe"           → <iframe src="">
  // "link"             → <link rel="preload"> etc.
  // "other"            → anything else

  const analysis = {

    // Slowest resources
    slowest: resources
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 10)
      .map(r => ({
        url:      r.name.split('/').pop(), // filename only
        type:     r.initiatorType,
        ms:       Math.round(r.duration),
        kb:       (r.transferSize / 1024).toFixed(1),
      })),

    // Resources NOT served over HTTP/2
    // HTTP/2 resources have nextHopProtocol = "h2"
    notHTTP2: resources
      .filter(r => r.nextHopProtocol && r.nextHopProtocol !== 'h2'
                                     && r.nextHopProtocol !== 'h3')
      .map(r => ({ url: r.name, protocol: r.nextHopProtocol })),

    // Resources with no compression (text resources that should be compressed)
    uncompressed: resources
      .filter(r =>
        r.decodedBodySize > 1024 && // > 1KB
        r.decodedBodySize === r.encodedBodySize && // no compression
        ['script','css'].includes(r.initiatorType)
      )
      .map(r => ({
        url:  r.name,
        type: r.initiatorType,
        kb:   (r.decodedBodySize / 1024).toFixed(1),
      })),

    // Third-party resources (different origin)
    thirdParty: resources
      .filter(r => {
        try {
          return new URL(r.name).origin !== window.location.origin;
        } catch { return false; }
      })
      .map(r => ({
        origin:   new URL(r.name).origin,
        type:     r.initiatorType,
        duration: Math.round(r.duration),
        kb:       (r.transferSize / 1024).toFixed(1),
      })),

    // All API calls (fetch / XHR)
    apiCalls: resources
      .filter(r => ['fetch', 'xmlhttprequest'].includes(r.initiatorType))
      .map(r => ({
        url:            r.name,
        duration:       Math.round(r.duration),
        ttfb:           Math.round(r.responseStart - r.requestStart),
        downloadTime:   Math.round(r.responseEnd   - r.responseStart),
        kb:             (r.transferSize / 1024).toFixed(1),
      })),
  };

  return analysis;
}
```

---

## 9. Sending Metrics to Your Backend

Never `console.log` in production — send metrics to an analytics endpoint.

```js
// ─── sendBeacon — fire and forget, works on page unload ──────────
// sendBeacon guarantees delivery even when the page is closing
function sendToAnalytics(metrics) {
  const payload = JSON.stringify({
    ...metrics,
    // Always include context
    url:       window.location.href,
    timestamp: Date.now(),
    sessionId: getSessionId(),
    userId:    getUserId(),        // if available
    deviceType: getDeviceType(),   // "mobile" | "tablet" | "desktop"
    connection: getConnectionInfo(),
  });

  // sendBeacon — best for page-unload metrics (LCP, CLS, INP)
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/metrics', payload);
  } else {
    // Fallback for older browsers
    fetch('/api/metrics', {
      method:    'POST',
      body:      payload,
      headers:   { 'Content-Type': 'application/json' },
      keepalive: true, // survives page navigation (like sendBeacon)
    });
  }
}

// ─── Get device and connection context ───────────────────────────
function getConnectionInfo() {
  const conn = navigator.connection;
  if (!conn) return null;
  return {
    effectiveType: conn.effectiveType, // "4g" | "3g" | "2g" | "slow-2g"
    rtt:           conn.rtt,           // round-trip time in ms
    downlink:      conn.downlink,      // Mbps
    saveData:      conn.saveData,      // user has data saver on
  };
}

function getDeviceType() {
  if (navigator.maxTouchPoints > 0 && window.innerWidth < 768) return 'mobile';
  if (navigator.maxTouchPoints > 0) return 'tablet';
  return 'desktop';
}

// ─── Batch metrics — send once, not one request per metric ────────
class MetricsBatcher {
  constructor(endpoint, flushInterval = 5000) {
    this.endpoint = endpoint;
    this.queue    = [];
    this.timer    = setInterval(() => this.flush(), flushInterval);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') this.flush();
    });
  }

  add(metric) {
    this.queue.push({ ...metric, ts: Date.now() });
    if (this.queue.length >= 20) this.flush(); // flush if queue too big
  }

  flush() {
    if (!this.queue.length) return;
    const payload = JSON.stringify(this.queue.splice(0));
    navigator.sendBeacon(this.endpoint, payload);
  }
}

const batcher = new MetricsBatcher('/api/metrics');
```

---

## 10. Complete Production-Ready Setup

Drop this into your app's entry point — measures everything automatically:

```js
// perf-monitor.js — complete production monitoring setup

import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

class PerformanceMonitor {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.metrics  = {};
    this.init();
  }

  init() {
    this.measureNavigation();
    this.measurePaint();
    this.measureCoreWebVitals();
    this.measureLongTasks();
    this.measureInteractions();
    this.flushOnHide();
  }

  // 1. Navigation metrics (run after load)
  measureNavigation() {
    window.addEventListener('load', () => {
      const [nav] = performance.getEntriesByType('navigation');
      if (!nav) return;
      this.collect('navigation', {
        dns:      Math.round(nav.domainLookupEnd  - nav.domainLookupStart),
        tcp:      Math.round(nav.connectEnd        - nav.connectStart),
        ttfb:     Math.round(nav.responseStart     - nav.requestStart),
        dcl:      Math.round(nav.domContentLoadedEventEnd - nav.startTime),
        load:     Math.round(nav.loadEventEnd      - nav.startTime),
        redirects:Math.round(nav.redirectEnd       - nav.redirectStart),
        htmlKB:   (nav.decodedBodySize / 1024).toFixed(1),
        cached:   nav.transferSize === 0,
        type:     nav.type,
      });
      this.collect('resources', this.summarizeResources());
    });
  }

  // 2. FP + FCP
  measurePaint() {
    new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        this.collect(entry.name.replace('first-', 'f').replace('-paint','p')
          .replace('-contentful','c'), Math.round(entry.startTime));
      });
    }).observe({ type: 'paint', buffered: true });
  }

  // 3. Core Web Vitals
  measureCoreWebVitals() {
    const report = m => this.collect(m.name, {
      value:  Math.round(m.value),
      rating: m.rating,
    });
    onLCP(report);
    onINP(report);
    onCLS(report);
    onFCP(report);
    onTTFB(report);
  }

  // 4. Long tasks
  measureLongTasks() {
    const tasks = [];
    new PerformanceObserver(list => {
      list.getEntries().forEach(e => tasks.push(Math.round(e.duration)));
    }).observe({ type: 'longtask', buffered: true });

    window.addEventListener('load', () => {
      this.collect('longTasks', {
        count:        tasks.length,
        totalMs:      tasks.reduce((s, t) => s + t, 0),
        blockingTime: tasks.reduce((s, t) => s + Math.max(0, t - 50), 0),
        worst:        Math.max(0, ...tasks),
      });
    });
  }

  // 5. Slow interactions
  measureInteractions() {
    new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        if (entry.duration > 200) {
          this.collect('slowInteraction', {
            type:     entry.name,
            duration: Math.round(entry.duration),
            time:     Math.round(entry.startTime),
          });
        }
      });
    }).observe({ type: 'event', buffered: true, durationThreshold: 200 });
  }

  // 6. Resource summary
  summarizeResources() {
    const res = performance.getEntriesByType('resource');
    return {
      total:     res.length,
      totalKB:  (res.reduce((s,r) => s + r.transferSize, 0) / 1024).toFixed(1),
      cached:    res.filter(r => r.transferSize === 0).length,
      slowest:   res.sort((a,b) => b.duration-a.duration)[0]?.name.split('/').pop(),
    };
  }

  collect(name, value) {
    this.metrics[name] = value;
  }

  // Send all metrics when page is hidden
  flushOnHide() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        navigator.sendBeacon(this.endpoint, JSON.stringify({
          metrics:    this.metrics,
          url:        location.href,
          timestamp:  Date.now(),
          device:     navigator.maxTouchPoints > 0 ? 'mobile' : 'desktop',
          connection: navigator.connection?.effectiveType ?? 'unknown',
        }));
      }
    }, { once: true });
  }
}

// Initialize once in your app entry point
export const perfMonitor = new PerformanceMonitor('/api/metrics');
```

---

## 11. Interview Answer Framework

### ✅ Complete answer to "How would you measure your page performance?"

```
"I'd approach it in 4 layers:

1. Lab tooling — I'd run Lighthouse in CI/CD so every PR fails if it
   drops below our performance budget. This catches regressions before prod.

2. Field data — I'd check PageSpeed Insights and CrUX for real-world
   Core Web Vitals from actual Chrome users — lab scores don't always
   match real user experience.

3. Real User Monitoring with the Performance API — I'd instrument my
   JS to collect:
   - Navigation timing (DNS, TCP, TTFB, DOM, full load)
     via performance.getEntriesByType('navigation')
   - Sub-resource analysis (slow scripts, uncached assets, third-party cost)
     via getEntriesByType('resource')
   - Paint metrics (FP, FCP)
     via getEntriesByType('paint')
   - Long tasks that block the main thread
     via PerformanceObserver with type 'longtask'
   - Interaction latency for INP
     via PerformanceObserver with type 'event'

4. Core Web Vitals — I'd use the web-vitals library for accurate LCP,
   INP, and CLS values since it handles edge cases like BFCache and
   page visibility correctly.

All metrics get batched and sent via navigator.sendBeacon to an
analytics endpoint on page hide, so I have real user data to act on —
not just console logs."
```

### Key numbers to memorize

| Metric | Good | Needs work | Poor |
|--------|------|-----------|------|
| **TTFB** | < 800ms | 800ms–1.8s | > 1.8s |
| **FCP** | < 1.8s | 1.8s–3s | > 3s |
| **LCP** | < 2.5s | 2.5s–4s | > 4s |
| **INP** | < 200ms | 200–500ms | > 500ms |
| **CLS** | < 0.1 | 0.1–0.25 | > 0.25 |
| **TBT** | < 200ms | 200–600ms | > 600ms |
| **Long task** | 0 | any > 50ms | many > 100ms |

---

*Covers RUM, Performance API, Core Web Vitals · FAANG interviews · Last updated 2025*
