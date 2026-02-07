# Web Performance (General)

> Network, assets, caching, and server-side levers for faster load and responsiveness.

---

## 1. Critical rendering path

- **Goal:** Show something useful (FCP/LCP) as fast as possible.
- **Blocking:** HTML → parse → DOM; CSS (render-blocking) → CSSOM; JS (parser-blocking by default) → execute. DOM + CSSOM → Render tree → Layout → Paint.

### Optimizations

- **Above-the-fold first:** Inline critical CSS; defer non-critical CSS.
- **Defer or async JS:** So parsing and first paint aren’t blocked.
- **Minimize critical path length** and **bytes** (small HTML/CSS/JS for first paint).

---

## 2. Caching

### HTTP cache headers

- **Cache-Control:** `max-age=31536000` (1 year) for versioned/hashed assets; `no-cache` or short max-age for HTML/API when you need revalidation.
- **ETag / Last-Modified:** Conditional requests (304) to avoid re-downloading unchanged content.

### Strategies

- **Cache-first:** For immutable assets (e.g. `main.[hash].js`).
- **Network-first / stale-while-revalidate:** For API or HTML; use Service Worker or CDN for SWR.

### Service Worker

- Cache static assets and optionally API responses; serve from cache when offline or for instant repeat loads.

---

## 3. CDN and hosting

- **CDN:** Serve static assets from edge locations (lower latency, offload origin).
- **Origin:** Keep HTML and API on a fast origin; use CDN for JS/CSS/images/fonts.

---

## 4. Compression

- **Brotli or gzip** for text (HTML, CSS, JS, JSON). Server compresses; browser decompresses. Big size savings.
- **Enable on server:** e.g. nginx `gzip on; brotli on;` for supported types.

---

## 5. Images

### Formats and size

- **Modern formats:** WebP, AVIF for smaller size at same quality. Provide fallbacks (e.g. `<picture>`, or serve by Accept).
- **Dimensions:** Serve at display size (or 2x for retina); avoid 4000px image for 400px box.
- **Compression:** Use appropriate quality (e.g. 80–85); tooling (ImageOptim, squoosh).

### Lazy loading

- Native: `<img loading="lazy" />` (good for below-the-fold).
- Don’t lazy the LCP image; preload if it’s critical.

### LCP image

- Preload if LCP element is an image: `<link rel="preload" as="image" href="hero.jpg" />`.
- Prefer one large, optimized image over many small ones for LCP.

---

## 6. Fonts

- **Avoid invisible text (FOIT/FOUT):** Use `font-display: optional` or `swap`; keep fallback similar.
- **Preload** key fonts: `<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin />`.
- **Subset** fonts when possible to reduce size.

---

## 7. Resource hints

- **preconnect:** Early connection to another origin (`<link rel="preconnect" href="https://api.example.com" />`).
- **dns-prefetch:** Resolve DNS early (lighter than preconnect).
- **preload:** Fetch critical resource now (`<link rel="preload" as="script" href="critical.js" />`). Use for LCP image or critical font/JS.
- **prefetch:** Low priority fetch for next navigation (`<link rel="prefetch" href="next-page.html" />`).

---

## 8. HTTP/2 and HTTP/3

- **HTTP/2:** Multiplexing, header compression; fewer round trips. One connection for many resources.
- **HTTP/3 (QUIC):** Over UDP; better on lossy/mobile networks. Use when available.

---

## 9. TTFB (Time to First Byte)

- **What:** Time from request to first byte of response. Affects when parsing and rendering can start.
- **Improve:** Fast server/edge, CDN for static, DB/cache for API, reduce server work for the critical path.

---

## 10. Metrics that matter

- **LCP:** Largest contentful paint (main content visible).
- **FCP:** First contentful paint (first pixel).
- **TTI:** Time to interactive (JS loaded and main thread idle).
- **CLS:** Cumulative layout shift (stability).
- **INP:** Interaction to next paint (responsiveness).

---

## 11. Checklist (quick)

- [ ] Critical CSS inlined or loaded first; non-critical deferred.
- [ ] JS deferred/async; code-split and lazy load.
- [ ] Strong caching for hashed assets; revalidation for HTML/API.
- [ ] Brotli/gzip for text.
- [ ] Images: modern format, right size, lazy below fold; preload LCP image if needed.
- [ ] Fonts: preload key fonts; font-display; subset.
- [ ] preconnect/preload for critical third-party and LCP resources.
- [ ] Reduce TTFB (server, CDN, DB/cache).
