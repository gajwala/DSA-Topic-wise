# 🖥️ Frontend System Design — Complete Reference Guide

> A comprehensive, interview-ready reference for frontend system design. Study this end-to-end and you'll be equipped to answer any frontend system design question at FAANG and top-tier companies.

---

## 📖 Table of Contents

1. [How to Approach Any Question](#1-how-to-approach-any-question)
2. [Requirements Clarification](#2-requirements-clarification)
3. [Component Architecture](#3-component-architecture)
4. [State Management](#4-state-management)
5. [Data Fetching & API Design](#5-data-fetching--api-design)
6. [Real-Time & Live Updates](#6-real-time--live-updates)
7. [Rendering Strategies](#7-rendering-strategies)
8. [Performance Optimization](#8-performance-optimization)
9. [Caching & Storage](#9-caching--storage)
10. [Routing](#10-routing)
11. [Security](#11-security)
12. [Accessibility (a11y)](#12-accessibility-a11y)
13. [Internationalization (i18n)](#13-internationalization-i18n)
14. [Testing Strategy](#14-testing-strategy)
15. [Observability & Monitoring](#15-observability--monitoring)
16. [CI/CD & Deployment](#16-cicd--deployment)
17. [Scalability & Architecture Patterns](#17-scalability--architecture-patterns)
18. [Design System & Component Library](#18-design-system--component-library)
19. [Common Question Playbooks](#19-common-question-playbooks)
20. [Tradeoffs Cheat Sheet](#20-tradeoffs-cheat-sheet)

---

## 1. How to Approach Any Question

Use the **RADIO framework** consistently:

| Step | What to do | Time |
|------|-----------|------|
| **R** — Requirements | Ask clarifying questions | 2–3 min |
| **A** — Architecture | High-level diagram, major components | 5 min |
| **D** — Data model | Entities, relationships, API shapes | 5 min |
| **I** — Interface | Component tree, key UI interactions | 5 min |
| **O** — Optimizations | Performance, a11y, edge cases | 5 min |

### Golden Rules
- **Always start with requirements** — never assume scope.
- **Mention tradeoffs** proactively. Don't wait to be asked.
- **Drive the conversation** — pick the most interesting/complex area and go deep.
- **Say what you'd do differently** at scale (1M users vs 100 users).

---

## 2. Requirements Clarification

Always ask these before designing anything.

### Functional Requirements (what it does)
- What are the core user actions? (read, write, collaborate, search?)
- What content types? (text, images, video, files?)
- Does it need real-time collaboration?
- Is there a notification system?

### Non-Functional Requirements (how well it does it)
- How many concurrent users? Per page? Per feature?
- What is acceptable latency? (sub-100ms for interactions, sub-1s for page load?)
- Offline support required?
- Which browsers and devices? (mobile-first or desktop-first?)
- Accessibility level? (WCAG 2.1 AA is standard)
- Internationalization needed?

### Constraints
- Existing tech stack? (React, Vue, Angular?)
- Any existing APIs or backend systems?
- Timeline / team size?

---

## 3. Component Architecture

### Component Breakdown Process
1. Start from the **full page layout** (header, sidebar, main, footer)
2. Break into **feature areas** (toolbar, document canvas, comments panel)
3. Break each feature into **individual components**
4. Identify **shared/reusable components** (Button, Modal, Avatar, Input)

### Component Types

| Type | Description | Example |
|------|-------------|---------|
| **Page / Route** | Top-level, owns data fetching | `DocumentPage` |
| **Container / Smart** | Connects to store, passes props down | `DocumentContainer` |
| **Presentational / Dumb** | Pure UI, no side effects | `Toolbar`, `Avatar` |
| **Layout** | Structural, no business logic | `SidebarLayout` |
| **Shared / Primitive** | Design system atoms | `Button`, `Dropdown` |

### Design Principles
- **Single Responsibility** — one reason to change
- **Open/Closed** — extend via props/slots, not modification
- **Composition over inheritance** — compose small components into larger ones
- **Props down, events up** — unidirectional data flow

### When to Split a Component
- It renders differently based on a flag → two components
- It has too many props (>6–7) → likely doing too much
- It contains unrelated logic → extract custom hook or sub-component

### Micro-frontends (for large-scale systems)
Use when: multiple teams, independent deploy cycles, different tech stacks per section.

| Approach | Notes |
|----------|-------|
| **iFrame** | Full isolation, poor UX |
| **Module Federation (Webpack 5)** | Share runtime, independently deployed JS bundles |
| **Single-SPA** | Framework-agnostic shell + child apps |

Tradeoffs: added complexity, shared state is harder, performance overhead of multiple bundles.

---

## 4. State Management

### Categorize State First

| Category | Where it lives | Examples |
|----------|---------------|---------|
| **UI state** | Local component | modal open, tab selected |
| **Form state** | Local or form library | input values, validation |
| **Server/remote state** | React Query / SWR cache | fetched user data, doc content |
| **Global app state** | Store (Redux, Zustand) | auth user, theme, feature flags |
| **URL state** | Query params / route | filters, pagination, selected item |
| **Realtime state** | WebSocket + store | cursor positions, live edits |

### Decision Matrix

```
Is it needed by 2+ distant components?
  No  → local useState
  Yes → Is it server data?
          Yes → React Query / SWR
          No  → Is it simple?
                  Yes → Context / Zustand
                  No  → Redux Toolkit
```

### Key Tools

| Tool | Best for | Avoid when |
|------|----------|-----------|
| `useState` | Local, simple UI | Shared across tree |
| `useReducer` | Complex local state transitions | Simple cases |
| `Context` | Low-frequency global (theme, auth) | High-frequency updates |
| `Redux Toolkit` | Complex global state, time-travel debug | Small apps |
| `Zustand` | Simpler global state, less boilerplate | Need deep Redux DevTools |
| `React Query / SWR` | Server state, caching, sync | Non-server state |
| `Jotai / Recoil` | Atomic state, fine-grained subscriptions | Team unfamiliar |

### State Normalization
For relational data (posts + comments + users), normalize like a database:
```json
{
  "users": { "byId": { "u1": {} }, "allIds": ["u1"] },
  "posts": { "byId": { "p1": { "authorId": "u1" } }, "allIds": ["p1"] }
}
```

### Undo / Redo
- Maintain a **past stack** and **future stack** of state snapshots
- For collaborative editors: per-user undo stack (only undo own ops)
- Pattern: Command Pattern — each action is an object with `do()` and `undo()`

---

## 5. Data Fetching & API Design

### REST vs GraphQL

| | REST | GraphQL |
|---|------|---------|
| Over-fetching | Common | Solved (request exact fields) |
| Under-fetching | Multiple calls needed | Single query |
| Caching | Easy (URL-based HTTP cache) | Harder (POST requests) |
| Best for | Simple CRUD, public APIs | Complex nested data, mobile |

### Pagination Strategies

| Strategy | How it works | Best for |
|----------|-------------|---------|
| **Offset** | `?page=2&limit=20` | Simple, sortable lists |
| **Cursor-based** | `?after=cursor_xyz` | Real-time feeds, no gaps |
| **Infinite scroll** | Load next page on scroll | Social feeds |
| **Virtual list** | Render only visible rows | Huge datasets (10k+ rows) |

### Data Fetching Patterns
- **Optimistic updates** — update UI immediately, revert on error
- **Stale-while-revalidate** — show cached data, fetch fresh in background
- **Prefetching** — fetch data before user navigates (hover over link → fetch)
- **Deduplication** — React Query dedupes identical in-flight requests automatically

### Error Handling
Always handle three states: **loading**, **error**, **success**.
- Show skeleton screens (not spinners) for initial loads
- Show inline errors for actions, not full-page errors
- Retry with exponential backoff for transient failures

### API Shape Example
```
GET    /api/documents/:id           → fetch doc
POST   /api/documents               → create doc
PATCH  /api/documents/:id           → partial update
GET    /api/documents/:id/comments  → fetch comments
WS     /ws/documents/:id            → real-time channel
```

---

## 6. Real-Time & Live Updates

### Transport Options

| Method | Protocol | Best for | Limitation |
|--------|---------|---------|-----------|
| **Short polling** | HTTP | Simple status checks | Wasteful, high latency |
| **Long polling** | HTTP | Notification fallback | Server connection held |
| **WebSocket** | WS | Bidirectional, low-latency | Complex to scale |
| **SSE** | HTTP | Server → client only | One direction only |

### WebSocket Architecture at Scale
```
Client  ←→  Load Balancer  →  WS Server Cluster
                                      ↓
                               Pub/Sub (Redis)
                                      ↓
                         All WS servers subscribe → broadcast to clients
```
> Why Pub/Sub? Multiple WS servers need to share messages. Redis Pub/Sub or Kafka solves this.

### Operational Transformation (OT) — for collaborative editing
- Every edit is an **operation** (insert, delete, retain)
- When two ops conflict, the server **transforms** one against the other
- All clients converge to the same state
- Used by: **Google Docs**

### CRDTs — Alternative to OT
- **Conflict-free Replicated Data Types**
- No central server needed for convergence
- Works offline natively
- Used by: **Figma, Notion, Linear**

### Presence & Cursors
- Client sends cursor position on every `selectionchange` event
- Sent as lightweight WebSocket messages (not persisted)
- Server broadcasts to other clients in the same document
- Client renders colored carets/highlights per remote user

### Reconnection Strategy
1. WebSocket disconnects → start exponential backoff reconnect
2. On reconnect, send last known **sequence number**
3. Server replays missed ops since that sequence number
4. Client applies ops → document back in sync

---

## 7. Rendering Strategies

| Strategy | When HTML is generated | Best for | Tradeoff |
|----------|----------------------|---------|---------|
| **CSR** | In browser via JS | SPAs, dashboards, auth'd apps | Slow initial load, bad SEO |
| **SSR** | Per request on server | SEO pages, personalized content | Server cost, TTFB |
| **SSG** | At build time | Blogs, marketing, docs | Stale content risk |
| **ISR** | On-demand + time interval | E-commerce, news | Next.js specific |

### Hydration
- SSR sends HTML → browser paints fast → JS loads and "hydrates" (attaches event listeners)
- **Hydration mismatch** = server and client render different HTML → React error
- **Partial hydration** = only hydrate interactive components (Islands architecture)

### Core Web Vitals Targets

| Metric | What it measures | Good |
|--------|-----------------|------|
| **LCP** — Largest Contentful Paint | Perceived load speed | < 2.5s |
| **INP** — Interaction to Next Paint | Responsiveness | < 200ms |
| **CLS** — Cumulative Layout Shift | Visual stability | < 0.1 |

---

## 8. Performance Optimization

### Bundle Optimization
- **Code splitting** — split by route (`React.lazy` + `Suspense`)
- **Tree shaking** — remove unused exports (requires ES modules)
- **Dynamic imports** — `import('./heavyLib')` on demand
- **Externals** — don't bundle React if it's on a CDN

### React Rendering Optimization

| API | When to use |
|-----|------------|
| `React.memo` | Skip re-render if props unchanged |
| `useMemo` | Memoize expensive computed values |
| `useCallback` | Stable function reference for child components |
| `useTransition` | Defer non-urgent state updates |
| `useDeferredValue` | Low-priority version of a value |

### Image Optimization
- Use **WebP / AVIF** format (smaller than JPEG/PNG)
- **Lazy load** images below the fold (`loading="lazy"`)
- **Responsive images** with `srcset` and `sizes`
- Use a **CDN** with on-the-fly resizing
- Set explicit `width` + `height` to prevent CLS

### List Virtualization
For 1000+ row lists — only render visible rows:
- `react-window` or `react-virtual`
- DOM stays small regardless of list size

### Loading Strategies

| Technique | How |
|-----------|-----|
| Preload | `<link rel="preload">` for LCP images, fonts |
| Prefetch | `<link rel="prefetch">` for likely next pages |
| Preconnect | `<link rel="preconnect">` for third-party origins |

---

## 9. Caching & Storage

### Browser Storage Comparison

| Storage | Capacity | Persists | Best for |
|---------|---------|---------|---------|
| `localStorage` | ~5MB | Until cleared | User prefs, tokens |
| `sessionStorage` | ~5MB | Tab session | Wizard step data |
| `IndexedDB` | Hundreds of MB | Until cleared | Offline docs, large data |
| `Cookies` | ~4KB | Configurable | Auth sessions, A/B flags |
| `Cache API` | Large | Until cleared | Offline assets, API responses |

### HTTP Caching
```
Cache-Control: max-age=31536000, immutable   → static assets (hashed filenames)
Cache-Control: no-cache                      → HTML (always revalidate)
Cache-Control: stale-while-revalidate=60     → API responses
ETag: "abc123"                               → conditional requests
```

### Service Worker Caching Strategies

| Strategy | How | Best for |
|----------|-----|---------|
| **Cache first** | Serve cache, update in background | Static assets |
| **Network first** | Try network, fall back to cache | API data |
| **Stale-while-revalidate** | Serve cache immediately, fetch fresh | Feeds |
| **Cache only** | Never hit network | App shell |

### CDN
- Serve static assets from edge nodes close to users
- Use **cache busting** via content hashing in filenames (`main.a3f9c.js`)
- Purge CDN cache on every deploy

---

## 10. Routing

### Route Types to Design For
- **Public routes** — accessible without auth
- **Protected routes** — redirect to login if no session
- **Role-based routes** — admin-only sections
- **Nested routes** — sidebar stays, main content changes

### Route-Based Code Splitting
```jsx
const DocumentPage = React.lazy(() => import('./DocumentPage'));

<Suspense fallback={<Skeleton />}>
  <Route path="/doc/:id" element={<DocumentPage />} />
</Suspense>
```

### URL State
Store filters, sort, and pagination in query params:
```
/search?q=design&category=frontend&page=2&sort=relevance
```
Benefits: shareable URLs, browser back/forward works, no extra state sync needed.

---

## 11. Security

### XSS (Cross-Site Scripting)
- **Never** set `innerHTML` with user content
- React escapes JSX by default — don't use `dangerouslySetInnerHTML`
- Sanitize rich text with `DOMPurify`
- Set `Content-Security-Policy` header to whitelist sources

### CSRF (Cross-Site Request Forgery)
- Use `SameSite=Strict` or `SameSite=Lax` cookies
- Include CSRF token in state-mutating requests
- Verify `Origin` header on server

### Authentication Patterns

| Pattern | How | Best for |
|---------|-----|---------|
| **Session cookie** | Server sets HttpOnly cookie | Traditional web apps |
| **JWT** | Token in memory (not localStorage!) | SPAs with API backends |
| **OAuth 2.0** | Delegate auth to Google, GitHub, etc. | Social login |
| **PKCE flow** | Auth code + verifier, no client secret | SPAs (most secure) |

> ⚠️ **Never store JWT in `localStorage`** — vulnerable to XSS. Store in memory or `HttpOnly` cookie.

### Other Security Essentials
- **HTTPS everywhere** — no mixed content
- **CORS** — configure server to allow only trusted origins
- **Subresource Integrity (SRI)** — hash check on CDN scripts
- **Input validation** — client AND server side
- **Dependency auditing** — `npm audit` in CI

---

## 12. Accessibility (a11y)

### The Four POUR Principles
- **Perceivable** — content visible to all senses
- **Operable** — usable with keyboard, no seizure triggers
- **Understandable** — clear language, predictable behavior
- **Robust** — works with assistive tech (screen readers)

### Must-Know Topics

| Topic | What to say |
|-------|------------|
| **Semantic HTML** | Use `<button>` not `<div onclick>`, `<nav>`, `<main>`, `<article>` |
| **ARIA** | Only when semantic HTML isn't enough. `role`, `aria-label`, `aria-expanded`, `aria-live` |
| **Keyboard nav** | All interactions reachable via Tab, Enter, Space, arrow keys |
| **Focus management** | On modal open → move focus in. On close → return to trigger. |
| **Color contrast** | 4.5:1 ratio for text (WCAG AA) |
| **Alt text** | Descriptive for meaningful images, `alt=""` for decorative |
| **Skip links** | `<a href="#main">Skip to main content</a>` at top of page |
| **Forms** | Every input has a `<label>`. Errors tied via `aria-describedby`. |

### Live Regions
For dynamic content (notifications, toasts):
```html
<div aria-live="polite" aria-atomic="true">
  <!-- Inserted content is announced by screen readers -->
</div>
```

---

## 13. Internationalization (i18n)

### Core Concepts
- **i18n** — making the app translatable (text extraction, locale support)
- **l10n** — locale-specific formatting (dates, numbers, currencies)
- **RTL support** — Arabic, Hebrew → layout flips, text direction changes

### Implementation Checklist
- [ ] Extract all strings to translation files (`en.json`, `fr.json`)
- [ ] Use `Intl.DateTimeFormat`, `Intl.NumberFormat` for formatting
- [ ] Never hardcode date/number formats
- [ ] Support RTL with `dir="rtl"` and logical CSS properties (`margin-inline-start` not `margin-left`)
- [ ] Store locale in `localStorage` or user profile
- [ ] Load only the current locale's translations (code split by locale)

### Tools
- `react-i18next` / `next-intl` — React i18n
- `FormatJS` — Intl message formatting
- `Crowdin` / `Phrase` — translation management platforms

---

## 14. Testing Strategy

### Testing Pyramid

```
        /\
       /E2E\         ← few, slow, expensive  (Playwright, Cypress)
      /------\
     / Integ. \      ← moderate              (React Testing Library + MSW)
    /----------\
   /    Unit    \    ← many, fast, cheap     (Jest, Vitest)
  /--------------\
```

### What to Test at Each Level

| Level | What | Tools |
|-------|------|-------|
| **Unit** | Pure functions, hooks, utils | Jest, Vitest |
| **Component** | Render output, user interactions | React Testing Library |
| **Integration** | Page flows, API mocking | RTL + MSW |
| **E2E** | Critical user journeys | Playwright, Cypress |
| **Visual regression** | UI doesn't change unexpectedly | Chromatic, Percy |
| **Performance** | Lighthouse CI scores | Lighthouse CI |
| **Accessibility** | Automated a11y checks | axe-core, jest-axe |

### Key Testing Principles
- Test **behavior**, not implementation (`getByRole('button')` not `querySelector('.btn')`)
- Mock at the **network boundary** (MSW), not at the module level
- Write tests from the **user's perspective**
- High coverage ≠ good tests. Meaningful scenarios > coverage %

---

## 15. Observability & Monitoring

### Three Pillars

| Pillar | What | Tools |
|--------|------|-------|
| **Logs** | Events, errors, user actions | Sentry, Datadog |
| **Metrics** | Quantitative measurements | Web Vitals, custom counters |
| **Traces** | Request lifecycle across services | OpenTelemetry |

### Frontend-Specific Metrics to Track
- **Core Web Vitals** (LCP, INP, CLS) — via `web-vitals` library
- **JS error rate** — uncaught exceptions + promise rejections
- **API error rate** — by endpoint and status code
- **Rage clicks** — user frustration signal
- **Session replay** — see exactly what users did (Hotjar, FullStory)
- **Custom events** — feature adoption, funnel conversion

### Error Tracking Best Practices
- Capture unhandled errors: `window.addEventListener('error', ...)`
- Add **source maps** so stack traces show original code
- Tag errors with user ID, app version, route
- Alert on error rate spike, not every individual error

---

## 16. CI/CD & Deployment

### Pipeline Stages
```
Code push → Lint + Type check → Unit tests → Build →
Integration tests → Preview deploy → E2E tests →
Merge → Staging deploy → E2E smoke → Production deploy
```

### Frontend Deployment Strategies

| Strategy | How | Best for |
|----------|-----|---------|
| **Blue/Green** | Two identical envs, switch traffic | Zero-downtime deploys |
| **Canary** | Roll out to % of users gradually | Risk reduction |
| **Feature flags** | Deploy code, enable per user/group | Decouple deploy from release |
| **Preview deploys** | PR → unique URL | Design/QA review |

### Static Asset Deployment
1. Build produces hashed filenames (`main.a3f9c.js`)
2. Upload to CDN / S3
3. Update `index.html` (no-cache) to reference new hashes
4. Old assets stay in CDN until clients have migrated (graceful rollover)

---

## 17. Scalability & Architecture Patterns

### Frontend Scalability Concerns
- **Bundle size** grows with features → aggressive code splitting
- **State complexity** grows → domain-based store slices, normalized data
- **Team size** grows → micro-frontends, monorepo, clear ownership
- **Traffic grows** → CDN, edge rendering, optimistic UI

### Monorepo vs Multi-Repo

| | Monorepo | Multi-repo |
|---|---------|-----------|
| Code sharing | Easy | Requires publishing packages |
| Atomic changes | Yes | Harder |
| CI speed | Can be slow | Faster per repo |
| Tools | Nx, Turborepo | Standard |

### Feature Flags
- Deploy code to production, enable only for specific users/groups
- Enables: A/B testing, gradual rollouts, kill switches
- Tools: LaunchDarkly, Unleash, custom via API
- Fetch on app load, cache in memory, don't gate every render

### A/B Testing Architecture
1. User bucketed into variant on first visit (server-side or SDK)
2. Bucket stored in cookie/localStorage
3. Component renders A or B based on bucket
4. Analytics events tagged with variant name
5. Stats engine determines winner

---

## 18. Design System & Component Library

### Anatomy of a Design System
```
Tokens (colors, spacing, typography)
  ↓
Primitives (Button, Input, Icon, Avatar)
  ↓
Composite components (Modal, Dropdown, DatePicker)
  ↓
Page templates (AuthLayout, DashboardLayout)
  ↓
Product features (DocumentEditor, CommentThread)
```

### Design Tokens
- Centralized values for colors, spacing, radii, shadows, typography
- Single source of truth — change once, update everywhere
- Format: JSON or CSS custom properties
- Tools: Style Dictionary, Theo

### Component API Design Principles
- **Composable** — accept `children` for flexibility
- **Unstyled base + styled layer** — Headless UI / Radix for logic, CSS for style
- **Polymorphic** — `<Button as="a" href="...">` renders as anchor
- **Accessible by default** — ARIA built in, keyboard nav included
- **Well-typed** — strict TypeScript props, clear required vs optional

---

## 19. Common Question Playbooks

### 🐦 News Feed (Twitter / Facebook)
**Key areas:** Infinite scroll + virtualization · SSR for initial load · WebSocket for live updates · Optimistic likes/retweets · Client-side feed cache

### 🔍 Autocomplete / Search
**Key areas:** Debouncing (300ms) · Client-side cache of recent queries · Request cancellation (`AbortController`) · Keyboard navigation (ARIA combobox) · Partial results during typing

### 📝 Google Docs (Collaborative Editor)
**Key areas:** OT or CRDT for conflict resolution · WebSocket + Pub/Sub · Per-user undo stack · Cursor presence · Offline with IndexedDB + op replay

### 🎬 Video Player (YouTube)
**Key areas:** Adaptive bitrate streaming (HLS/DASH) · Buffering strategy · Keyboard controls · Subtitles (WebVTT) · Picture-in-picture · Playback speed

### 🛒 E-Commerce Product Page
**Key areas:** SSR/SSG for SEO · Image optimization · Add-to-cart optimistic update · Variant state in URL · Lazy load reviews · Structured data (JSON-LD)

### 📊 Dashboard / Analytics
**Key areas:** Chart virtualization for large datasets · SSE or polling for live metrics · Date range in URL state · CSV export · Responsive grid layout

### 💬 Chat Application
**Key areas:** WebSocket for messages · Optimistic send · Read receipts · Typing indicators via SSE · Cursor-based pagination · Push notifications (Service Worker)

### 🗂️ Drag and Drop (Kanban / Trello)
**Key areas:** `dnd-kit` or Pointer Events API · Drag ghost element · Drop zone highlighting · Optimistic card move · Undo on failure

### 📁 File Upload
**Key areas:** Chunked upload (resumable) · Progress tracking · Presigned S3 URL · File type/size validation client-side · Retry on failure · Drag and drop zone

### 🗺️ Maps / Location
**Key areas:** Tile-based rendering (canvas/WebGL) · Viewport-based data fetching · Marker clustering · Debounced re-fetch on pan/zoom · Geolocation API

---

## 20. Tradeoffs Cheat Sheet

| Decision | Option A | Option B | Pick A when | Pick B when |
|----------|---------|---------|------------|------------|
| Rendering | CSR | SSR | Auth'd SPA | SEO matters |
| State | Redux | Zustand | Large team, complex | Small app, simple |
| Real-time | WebSocket | SSE | Bidirectional | Server-push only |
| Conflict resolution | OT | CRDT | Centralized server | Distributed / offline |
| Pagination | Offset | Cursor | Stable dataset | Live feed |
| Storage | localStorage | IndexedDB | Small prefs | Large offline data |
| Testing | RTL | Cypress | Component behavior | Full user journey |
| Deployment | Canary | Blue/Green | Gradual risk | Instant rollback |
| Architecture | Monorepo | Multi-repo | Shared code, atomic PRs | Independent teams |
| Images | SSR-optimized | CDN lazy-load | SEO-critical images | Below-the-fold images |

---

## 🤝 Contributing

Feel free to open a PR if you'd like to add a new playbook, fix an error, or expand a section.

---

## ⭐ Star this repo if it helped you!

*Covers FAANG-level frontend system design interviews · Last updated 2025*
