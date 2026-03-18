# Website Performance Optimization

> A comprehensive guide based on [DebugBear's detailed article](https://www.debugbear.com/blog/improve-website-performance) and its linked deep-dive resources.

---

## Table of Contents

1. [What is Website Performance?](#1-what-is-website-performance)
2. [Why It Matters](#2-why-it-matters)
3. [How to Measure Website Speed](#3-how-to-measure-website-speed)
4. [Core Metrics](#4-core-metrics)
5. [Optimization Strategy](#5-optimization-strategy)
6. [13 Best Practices](#6-13-best-practices)
   - [1. Optimize Server Response Time](#61-optimize-server-response-time)
   - [2. Reduce Render-Blocking Resources](#62-reduce-render-blocking-resources)
   - [3. Optimize Image Files](#63-optimize-image-files)
   - [4. Prioritize Important Content](#64-prioritize-important-content)
   - [5. Delay Loading Unimportant Resources](#65-delay-loading-unimportant-resources)
   - [6. Ensure Key Files Are Discovered Early](#66-ensure-key-files-are-discovered-early)
   - [7. Optimize Font Loading](#67-optimize-font-loading)
   - [8. Ensure Visitors See Content After Key Resources Load](#68-ensure-visitors-see-content-after-key-resources-load)
   - [9. Speed Up JavaScript & CPU Processing](#69-speed-up-javascript--cpu-processing)
   - [10. Optimize HTML, CSS, and JS File Size](#610-optimize-html-css-and-js-file-size)
   - [11. Cache Static Content in the Browser](#611-cache-static-content-in-the-browser)
   - [12. Cache Back/Forward Navigations](#612-cache-backforward-navigations)
   - [13. Speed Up Later Navigations with Speculation Rules](#613-speed-up-later-navigations-with-speculation-rules)
7. [Core Web Vitals](#7-core-web-vitals)
8. [Maintaining Improvements Over Time](#8-maintaining-improvements-over-time)
9. [Deep Dive: Render-Blocking Resources](#9-deep-dive-render-blocking-resources)
10. [Deep Dive: Image Formats](#10-deep-dive-image-formats)
11. [Deep Dive: Speculation Rules](#11-deep-dive-speculation-rules)
12. [Tools & References](#12-tools--references)

---

## 1. What is Website Performance?

Website performance measures how fast your website is — specifically, how long it takes to load after a user navigates to it. The page load process often consists of multiple stages where content gradually appears.

Google's benchmark for a good loading time is **below 2.5 seconds**. Up to 4 seconds is acceptable; anything above is considered poor.

---

## 2. Why It Matters

- **Better user experience** — Visitors spend less time waiting, engage more, and are more likely to convert.
- **SEO ranking** — Google uses page speed as a ranking signal. Improving performance can increase organic search traffic.
- **Business impact** — Faster sites have higher conversion rates and lower bounce rates.

---

## 3. How to Measure Website Speed

Use automated tools to get a performance score, identify failing metrics, and get debug data:

| Tool | URL |
|---|---|
| DebugBear Page Speed Test | https://www.debugbear.com/test/website-speed |
| Google PageSpeed Insights | https://pagespeed.web.dev/ |
| Catchpoint WebPageTest | https://www.webpagetest.org/ |
| Chrome DevTools (built-in) | DevTools → Performance tab |
| Lighthouse | Built into Chrome DevTools |

> **Tip:** Run a [global TTFB test](https://www.debugbear.com/test/ttfb) to see how your server speed varies across different geographic regions.

---

## 4. Core Metrics

| Metric | What it Measures | Good Threshold |
|---|---|---|
| **LCP** (Largest Contentful Paint) | When the main content element appears | < 2.5s |
| **FCP** (First Contentful Paint) | When any content first appears | < 1.8s |
| **INP** (Interaction to Next Paint) | How quickly the page responds to user input | < 200ms |
| **CLS** (Cumulative Layout Shift) | Visual stability — does content jump around? | < 0.1 |
| **TTFB** (Time to First Byte) | Server response time | < 800ms |

**LCP** is the most important metric for load speed and is one of Google's three Core Web Vitals.

---

## 5. Optimization Strategy

Effective optimization consists of two key approaches:

1. **Use automated tools** to identify and test high-impact optimizations quickly.
2. **Analyze request waterfall data** to understand exactly why content loads when it does — and uncover sequential request chains, bandwidth competition, and priority issues.

Fast websites share three traits:
- They avoid loading unnecessary resources.
- They ensure resources can be loaded quickly (compression, CDN, caching).
- They are structured so only the most critical resources block rendering.

---

## 6. 13 Best Practices

### 6.1 Optimize Server Response Time

The HTML document must be downloaded before anything else can start. A slow server directly delays every subsequent resource.

**What to check:**
- Is the hosting environment underpowered?
- Are database queries slow?
- Is there latency from third-party API calls?
- Is HTML rendering time excessive?

**Solutions:**
- Profile your backend to find bottlenecks.
- Use a **Content Delivery Network (CDN)** — it places servers closer to users and enables edge caching, reducing both connection time and server load.
- Use [**103 Early Hints**](https://www.debugbear.com/blog/103-early-hints) to start loading critical resources before the HTML response is fully ready.

---

### 6.2 Reduce Render-Blocking Resources

Browsers will not display any page content until all render-blocking resources (CSS and synchronous JS in `<head>`) have fully loaded. This directly delays FCP and LCP.

**What blocks rendering:**
- CSS stylesheets in `<head>`
- `<script>` tags in `<head>` without `async` or `defer`

**What does NOT block rendering:**
- Images and videos
- Font files (WOFF, WOFF2, etc.)
- Scripts with `async` or `defer`
- CSS or JS appearing late in `<body>`

**Solutions:**

#### Defer JavaScript
```html
<!-- Before: render-blocking -->
<script src="analytics.js"></script>

<!-- After: non-blocking -->
<script src="analytics.js" defer></script>
```

- `defer` — runs after HTML is parsed, preserves execution order.
- `async` — runs as soon as downloaded, does not preserve order.

#### Load CSS Asynchronously (for non-critical styles)
```html
<link
  rel="stylesheet"
  href="widget.css"
  media="print"
  onload="this.media='all'"
/>
```

#### Inline Critical CSS
For small stylesheets (under ~10KB), embed them directly in the HTML `<style>` tag. This removes the network round-trip entirely but means the CSS cannot be cached separately.

#### Inline Google Fonts CSS
Instead of loading the render-blocking Google Fonts CSS file, copy its contents (specifically the `latin` unicode range) and inline it directly:
```html
<style>
  @font-face {
    font-family: "Google Sans";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/...) format("woff2");
    unicode-range: U+0000-00FF, ...;
  }
</style>
```

**How to identify render-blocking resources:**
- **DebugBear** — marks resources with a "Blocking" badge in the waterfall.
- **WebPageTest** — marks them with an orange "x" badge.
- **Chrome DevTools** — marks them with a red rectangle in the Performance tab.
- **Lighthouse** — "Eliminate render-blocking resources" audit lists them.

**Render-Blocking Request Chains**

A chain occurs when one render-blocking resource triggers another. Common causes:

- CSS `@import` — the browser must load the first stylesheet to discover the second.
- `document.write` — synchronously adds another blocking script.

**Fix:** Use `<link rel="preload">` in the HTML to let the browser discover downstream resources sooner:
```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Roboto" />
```

---

### 6.3 Optimize Image Files

Images are the most common cause of poor LCP. High-resolution images can easily be 1–2 MB, taking several seconds to download.

**Steps to reduce image size:**

1. **Use modern formats** — WebP or AVIF instead of JPEG/PNG (details in [Section 10](#10-deep-dive-image-formats)).
2. **Serve appropriately sized images** — don't serve a 2000px image in a 400px container.
3. **Set quality level** — balance visual quality vs file size (JPEG quality ~75–85% is usually a good range).
4. **Use image optimization tools** — [Squoosh](https://squoosh.app/), Optimizilla, ImageOptim.

**LCP image breakdown components** (from CrUX data):
- Time to first byte
- Resource load delay
- Resource load duration ← usually the biggest opportunity
- Render delay

---

### 6.4 Prioritize Important Content

Every browser request has a priority (Lowest → Highest). Chrome auto-assigns priorities but can get it wrong, especially for LCP images that start loading before the browser has rendered the layout.

**Problem:** Chrome initially assigns images a Medium or Low priority. It only upgrades to High once it renders the page and confirms the image is in the viewport — by then it may have already wasted bandwidth on lower-priority resources.

**Solution:** Use the `fetchpriority` attribute on your LCP image:
```html
<img
  src="hero-image.jpg"
  fetchpriority="high"
  alt="Hero"
/>
```

This tells the browser to fetch it immediately at high priority, often saving hundreds of milliseconds on LCP.

> **Note:** Also ensure your server correctly supports HTTP prioritization — otherwise it may deliver low-priority resources at the same speed as critical ones.

---

### 6.5 Delay Loading Unimportant Resources

Fewer concurrent requests = faster downloads for the resources you actually need.

**Techniques:**
- Add `defer` or `async` to non-critical scripts (reduces priority automatically).
- Add `fetchpriority="low"` to non-essential resources.
- Lazy-load below-the-fold images:
```html
<img src="image.jpg" loading="lazy" alt="..." />
```

> ⚠️ **Warning:** Never apply `loading="lazy"` to your LCP image — this will delay it and hurt your score.

---

### 6.6 Ensure Key Files Are Discovered Early

Sequential request chains happen when the HTML loads a CSS file, which loads a font, which loads an image. Each link in the chain adds a full network round-trip of delay before the next resource can start.

**Example chain:**
```
HTML → CSS stylesheet → @import fonts CSS → LCP background image
```

**Fix with `<link rel="preload">`:**

Tell the browser about downstream resources directly from the HTML so they can start loading in parallel:

```html
<!-- Preload LCP background image -->
<link
  rel="preload"
  href="/images/hero-bg.jpg"
  as="image"
  fetchpriority="high"
/>

<!-- Preload a font CSS file referenced via @import -->
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css?family=Roboto:400,700"
/>
```

> **Rule:** All critical resources should ideally be triggered directly by the HTML document, not by other resources.

---

### 6.7 Optimize Font Loading

Web fonts need to download before text can render in that font. Without optimization, this causes a flash of invisible text (FOIT) or delayed LCP if text is the LCP element.

**Key techniques:**

1. **Use `font-display: swap`** — shows fallback font immediately, swaps to the web font once loaded:
```css
@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2');
  font-display: swap;
}
```

2. **Preload critical fonts** — ensures the font is discovered from the HTML, not after the CSS loads:
```html
<link rel="preload" as="font" href="/fonts/myfont.woff2" type="font/woff2" crossorigin />
```

> ⚠️ **Avoid excessive preloading** — preloading too many fonts (or large font files) can compete with render-blocking resources and slow down overall rendering. Limit to 2–3 most important fonts, each under ~100KB.

---

### 6.8 Ensure Visitors See Content After Key Resources Load

Sometimes all render-blocking resources have loaded but the page is still blank. Common causes:

**A/B testing anti-flicker snippets**
These hide the entire page body until A/B test variants load:
```html
<style id="ims-body-style">
  body:first-of-type { opacity: 0.01 !important; }
</style>
```
**Fix:** Be selective — only hide specific elements that are directly affected by the test, not the whole page.

**Single Page Applications (SPAs)**
Client-side rendered apps require JavaScript to run before any content appears.
**Fix:** Enable **Server-Side Rendering (SSR)** so meaningful HTML is returned with the initial response.

**CSS opacity animations**
Animations that start at `opacity: 0` delay when the LCP element becomes visible.
**Fix:** Review CSS transitions/animations on above-the-fold content.

---

### 6.9 Speed Up JavaScript & CPU Processing

JavaScript blocks the main thread. Even deferred scripts can delay interactivity and re-renders after initial load.

**Common culprits:**
- JavaScript hydration in SSR frameworks
- Excessive DOM size (slows layout and style calculations)
- Heavy third-party scripts (analytics, chat widgets, A/B testing)
- Unused JavaScript being parsed and compiled

**How to diagnose:**
- Use the **Chrome DevTools Performance tab** — look for Long Tasks (>50ms) blocking the main thread.
- Use the **Coverage tab** to find unused JS and CSS.

**Solutions:**
- Remove or defer non-critical third-party scripts.
- [Reduce DOM size](https://www.debugbear.com/blog/excessive-dom-size) — aim for under 1,500 nodes.
- Tree-shake and code-split your JavaScript bundles.
- For React/Next.js/Nuxt apps, review hydration performance specifically.

---

### 6.10 Optimize HTML, CSS, and JS File Size

Larger files take longer to download. A 354KB CSS file blocking rendering for 2.8 seconds is a real scenario.

**Techniques:**

| Technique | Saving |
|---|---|
| **Brotli compression** | 15–25% better than Gzip on text files |
| **Gzip compression** | Widely supported; significant size reduction |
| **Minify CSS/JS** | Removes whitespace, comments, and renames variables |
| **Remove unused CSS** | Use DevTools Coverage tab to identify |
| **Remove unused JS** | Tree-shake; avoid large library imports |

**Watch out for Base64-embedded assets** — images or fonts embedded as data URLs inside CSS inflate file size and cannot be cached independently. Use DebugBear's Size Analysis feature to detect them.

---

### 6.11 Cache Static Content in the Browser

On first visit, all resources must be downloaded. On subsequent visits, a browser cache means no network requests are needed for unchanged files.

**How to enable browser caching:**

Set a `Cache-Control` header on your server for static assets:
```
Cache-Control: public, max-age=31536000, immutable
```
This caches the file for up to 1 year. Use content-hash filenames (e.g. `main.a3f2b1.js`) so that when the file changes, the URL changes and the cache is automatically busted.

**Cache validation:**
- Use `ETag` headers to validate whether a cached file is still current without re-downloading.
- A `304 Not Modified` response confirms the cached version is still valid.

---

### 6.12 Cache Back/Forward Navigations

When users press the browser's back/forward button, the page should restore instantly using the **Back/Forward Cache (bfcache)**. However, certain configurations prevent bfcache restoration:

**Common bfcache blockers:**
- `Cache-Control: no-store` header
- Certain `unload` event listeners
- Some browser extensions

**How to check:** Run a Lighthouse audit — the "Back/forward cache" section lists specific reasons a page is ineligible.

**Fix:** Remove `no-store` where not strictly required, and avoid `unload` event listeners in favor of `pagehide`.

---

### 6.13 Speed Up Later Navigations with Speculation Rules

After landing on your site, users navigate further. You can pre-download pages they are likely to visit next, making those navigations feel instant.

**Speculation Rules API** (Chrome and Edge, modern browsers):

```html
<script type="speculationrules">
  {
    "prerender": [
      {
        "where": { "href_matches": "/*" },
        "eagerness": "moderate"
      }
    ]
  }
</script>
```

**Two types of speculation:**
- **Prerender** — downloads AND renders the page in the background. Navigation is instant.
- **Prefetch** — downloads only the HTML document. Lighter, still significantly faster.

**Eagerness settings:**

| Setting | Trigger |
|---|---|
| `immediate` | As soon as page loads |
| `moderate` | After hovering over a link for 200ms |
| `conservative` | When user starts to click |
| `eager` | Same as `immediate` |

**Document Rules (conditional prerendering):**
```html
<script type="speculationrules">
  {
    "prerender": [
      {
        "where": {
          "and": [
            { "href_matches": "/*" },
            { "not": { "href_matches": "/logout" } }
          ]
        }
      }
    ]
  }
</script>
```

> ⚠️ **Important:** Never prerender pages with side effects (logout, checkout completion, etc.).

**Detecting prerender in JS:**
```js
const isPrerendered =
  document.prerendering ||
  performance.getEntriesByType("navigation").at(0)?.activationStart > 0;
```

**Debug in Chrome DevTools:** Application → Background Services → Speculative Loads → Speculations

---

## 7. Core Web Vitals

Google measures three Core Web Vitals that directly affect search rankings:

| Metric | Measures | Good | Needs Improvement | Poor |
|---|---|---|---|---|
| **LCP** | Load speed (main content) | < 2.5s | 2.5–4s | > 4s |
| **INP** | Interactivity responsiveness | < 200ms | 200–500ms | > 500ms |
| **CLS** | Visual stability (layout shift) | < 0.1 | 0.1–0.25 | > 0.25 |

> At least **75% of page visits** must meet the "Good" threshold for Google to consider a site as passing Core Web Vitals.

**CLS (Cumulative Layout Shift)** — content should not move after it first renders. Common causes: images without dimensions, late-loading ads, web fonts swapping in.

**INP (Interaction to Next Paint)** — the page must provide fast visual feedback to any user interaction (click, tap, keyboard input).

---

## 8. Maintaining Improvements Over Time

Deploying optimizations is only half the work. Performance degrades over time as new features ship.

**Two ongoing needs:**
1. **Confirm** that each optimization actually improved real-world metrics.
2. **Monitor** for regressions before users report them.

**Recommended approach:**
- Set up a **Website Performance Monitoring** tool (e.g. DebugBear) to track metrics daily.
- Use **Real User Monitoring (RUM)** to capture what actual visitors experience.
- Use **CrUX (Chrome User Experience Report)** data to see long-term trends.
- Configure **regression alerts** so you're notified immediately if LCP or CLS degrades after a deploy.

---

## 9. Deep Dive: Render-Blocking Resources

> Source: https://www.debugbear.com/blog/render-blocking-resources

### What Makes a Resource Render-Blocking?

A resource is render-blocking when the browser cannot display any page content until it has fully downloaded and processed that resource.

**Render-blocking:** CSS in `<head>`, synchronous `<script>` in `<head>`  
**Not render-blocking:** Images, fonts (delay text only), `async`/`defer` scripts, late-body CSS/JS

### Parser-Blocking vs Render-Blocking

- **Render-blocking** = resources in `<head>` that block all rendering.
- **Parser-blocking** = synchronous scripts in `<body>` that block HTML parsing from that point downward.
  - If placed before `<h1>`, they can block important content.
  - If placed at the end of `<body>`, they generally don't matter.

### Fixing Render-Blocking CSS

Option 1 — **Inline it** (good for < 10KB):
```html
<style>
  /* critical CSS here */
</style>
```

Option 2 — **Load asynchronously** (for non-critical styles):
```html
<link rel="stylesheet" href="widget.css" media="print" onload="this.media='all'" />
```

Option 3 — **Inline Google Fonts** — copy the `@font-face` rules from Google's CSS file into your own HTML or stylesheet, serving only the unicode ranges you need.

### Fixing Request Chains

Use `<link rel="preload">` to short-circuit chains and start loading deep resources directly from HTML.

### Reducing Impact Without Eliminating

- **Compress files** (Brotli > Gzip) to reduce download time.
- **Reduce resource competition** — avoid loading large non-blocking files at the same time as render-blocking ones.
- **Reuse server connections** — hosting all resources on the same domain avoids DNS lookup + TCP + TLS overhead for every new domain.

### Why Isn't My Page Rendering Even After All Blocking Resources Load?

- A/B testing anti-flicker snippet hiding `body` with `opacity: 0`
- SPA with client-side rendering (no server-rendered HTML)
- Parser-blocking script placed before important `<body>` content

---

## 10. Deep Dive: Image Formats

> Source: https://www.debugbear.com/blog/image-formats

### Format Comparison

| Format | Type | Compression | Transparency | Animation | Best For |
|---|---|---|---|---|---|
| **GIF** | Raster | Lossless (LZW) | 1-bit | Yes | Simple logos, old animations |
| **PNG** | Raster | Lossless (DEFLATE) | Alpha channel | No | Screenshots, logos, graphics with text |
| **JPEG** | Raster | Lossy (DCT) | No | No | Photos, photo-realistic graphics |
| **WebP** | Raster | Both | Alpha channel | Yes | Replacement for JPEG & PNG |
| **AVIF** | Raster | Both | Alpha channel | Yes | Highest compression, HDR support |
| **SVG** | Vector | N/A (lossless) | Yes | Yes | Icons, logos, illustrations |

### Lossy vs Lossless Compression

**Lossless** — removes only metadata. No quality loss, but typically larger files. Used by: PNG, GIF, lossless WebP/AVIF.

**Lossy** — removes both metadata and less critical visual data. Smaller files with some quality degradation. Used by: JPEG, lossy WebP/AVIF.

> For JPEG, a quality setting of **75–85%** typically achieves the best balance between file size and visual quality. At 95%+ quality, lossy compression can produce files *larger* than the original.

### WebP

- Created by Google to replace GIF, PNG, and JPEG.
- Widely supported by all modern browsers.
- Lossy WebP: ~25–34% smaller than equivalent JPEG.
- Lossless WebP: ~23–42% smaller than equivalent PNG (results vary).

```html
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="..." width="1280" height="960" />
</picture>
```

### AVIF

- Released in 2019 by Alliance for Open Media.
- Uses the AV1 video codec for compression.
- Supports 24-bit, 30-bit (deep color), and 36-bit color depths.
- Supports HDR and Wide Color Gamut (WCG).
- **Lossy AVIF** consistently outperforms JPEG and WebP.
- **Lossless AVIF** has inconsistent results — often worse than PNG.

### Recommendations by Use Case

| Need | Recommended Format |
|---|---|
| Photos | Lossy AVIF > Lossy WebP > JPEG |
| Logos / icons with transparency | SVG > PNG > Lossless WebP |
| Screenshots / graphics with text | PNG > Lossless WebP |
| Simple line art / background patterns | SVG |
| Animations | SVG or short MP4 (avoid animated GIF) |
| Legacy browser fallback | JPEG or PNG |

### Conversion Tools

- [Squoosh](https://squoosh.app/) — browser-based, supports WebP and AVIF
- `cwebp` — CLI tool for WebP conversion
- `avif-cli` — CLI tool for AVIF conversion
- WordPress plugins: Imagify, ShortPixel, EWWW Image Optimizer
- Image CDNs (Cloudinary, etc.) — auto-serve best format per browser

---

## 11. Deep Dive: Speculation Rules

> Source: https://www.debugbear.com/blog/speculation-rules

### What Are Speculation Rules?

A browser API (Chrome and Edge) that lets developers hint which pages to proactively download in the background. When the user navigates to a prerendered page, it appears instantly.

### Prerendering vs Prefetching

| Feature | Prerender | Prefetch |
|---|---|---|
| Downloads HTML | Yes | Yes |
| Downloads subresources | Yes | No |
| Renders page in background | Yes | No |
| Resource cost | High | Low |
| Navigation experience | Instant | Faster than normal |

### Code Examples

**Prerender specific URLs:**
```html
<script type="speculationrules">
  {
    "prerender": [
      { "urls": ["/shop", "/about"] }
    ]
  }
</script>
```

**Prerender all pages except logout (with hover trigger):**
```html
<script type="speculationrules">
  {
    "prerender": [
      {
        "where": {
          "and": [
            { "href_matches": "/*" },
            { "not": { "href_matches": "/logout" } }
          ]
        },
        "eagerness": "moderate"
      }
    ]
  }
</script>
```

**Prefetch instead of prerender (lighter):**
```html
<script type="speculationrules">
  {
    "prefetch": [
      { "urls": ["/shop", "/about"] }
    ]
  }
</script>
```

**Add dynamically via JavaScript:**
```js
const scriptEl = document.createElement("script");
scriptEl.type = "speculationrules";
scriptEl.textContent = JSON.stringify({
  prerender: [{ urls: ["/shop", "/about"] }]
});
document.body.append(scriptEl);
```

### Limits (Chrome defaults)

| Eagerness | Max Prefetch | Max Prerender |
|---|---|---|
| `immediate` / `eager` | 50 | 10 |
| `moderate` / `conservative` | 2 | 2 |

### When Prerendering Won't Happen

The browser may skip prerendering when:
- Device is low on memory
- Battery saver mode is active
- A browser extension (e.g. uBlock Origin) disables prefetching

### Pages That Should Never Be Prerendered

- Logout pages
- Checkout completion pages
- Any page with irreversible side effects triggered on page load

### Browser Support Detection

```js
if (HTMLScriptElement.supports?.("speculationrules")) {
  // safe to use
}
```

### Detect If Current Page Was Prerendered

```js
const wasPrerendered =
  document.prerendering ||
  performance.getEntriesByType("navigation").at(0)?.activationStart > 0;

document.addEventListener("prerenderingchange", () => {
  // page has been activated from prerender
});
```

### Debugging in Chrome DevTools

1. Open DevTools **before** loading the page.
2. Go to: **Application → Background Services → Speculative Loads → Speculations**
3. View which URLs are being prerendered or prefetched and their status.

---

## 12. Tools & References

### Free Testing Tools

| Tool | Purpose |
|---|---|
| [DebugBear Speed Test](https://www.debugbear.com/test/website-speed) | Full page speed audit with waterfall |
| [PageSpeed Insights](https://pagespeed.web.dev/) | Lighthouse + CrUX data |
| [WebPageTest](https://www.webpagetest.org/) | Advanced waterfall and filmstrip |
| [TTFB Test](https://www.debugbear.com/test/ttfb) | Global server response time test |
| [Squoosh](https://squoosh.app/) | Browser-based image compression |
| [Chrome DevTools Coverage Tab](https://developer.chrome.com/docs/devtools/coverage/) | Find unused CSS and JS |

### Key HTML Attributes for Performance

| Attribute | Use Case |
|---|---|
| `defer` | Non-critical scripts — preserves order |
| `async` | Non-critical scripts — no order guarantee |
| `fetchpriority="high"` | LCP images, critical resources |
| `fetchpriority="low"` | Non-essential early resources |
| `loading="lazy"` | Below-fold images |
| `rel="preload"` | Critical resources in a request chain |
| `rel="preconnect"` | Establish early connections to third-party domains |
| `font-display: swap` | Show fallback font while web font loads |

### Key HTTP Headers for Performance

| Header | Purpose |
|---|---|
| `Cache-Control: max-age=31536000, immutable` | Long-term caching for hashed static assets |
| `Cache-Control: no-store` | Prevents caching (also blocks bfcache) |
| `ETag` | Cache validation |
| `Content-Encoding: br` | Brotli compression |
| `Content-Encoding: gzip` | Gzip compression |

---

*Sources: [DebugBear — How To Improve Website Performance](https://www.debugbear.com/blog/improve-website-performance), [Render-Blocking Resources](https://www.debugbear.com/blog/render-blocking-resources), [Image Formats](https://www.debugbear.com/blog/image-formats), [Speculation Rules](https://www.debugbear.com/blog/speculation-rules)*
