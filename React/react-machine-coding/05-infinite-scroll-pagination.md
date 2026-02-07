# 05 – Infinite Scroll / Pagination

## Problem

Build a **list** that either loads more on scroll (infinite scroll) or shows pages with Next/Prev (pagination). Data can be from a mock API (e.g. array chunked by page or fake fetch).

## Requirements

- **Infinite scroll:** Show a list of items; when user scrolls near bottom, fetch/load next page and append. Show loading indicator while loading.
- **OR Pagination:** Show page size (e.g. 10); Next/Prev (and optionally page numbers); display current page items only.
- **Data:** Mock: array of items (e.g. 100); “fetch” = slice by page and simulate delay with setTimeout.
- **URL (optional):** Sync page to query (e.g. ?page=2) so refresh keeps page.

## Approach / Hints

- **State:** `items` or `list`, `page`, `loading`, `hasMore` (infinite) or total count.
- **Infinite:** `useEffect` that runs when page changes; fetch next page, append to list. Scroll listener (or IntersectionObserver) on sentinel at bottom: when visible and !loading && hasMore, setPage(p => p + 1).
- **Pagination:** Current items = `items.slice((page-1)*pageSize, page*pageSize)`. Next: page < totalPages → setPage(p => p + 1). Prev: page > 1 → setPage(p => p - 1).
- **IntersectionObserver:** One ref on “load more” div; when it enters viewport, trigger load. Prefer over scroll listener for performance.
- **Cleanup:** AbortController for fetch; ignore stale responses (e.g. compare current page in closure).

## Component structure (suggestion)

- `List` or `InfiniteList` – state, fetch effect, scroll/sentinel, render items + loading.
- `ListItem` – single row/card.
- Pagination variant: `Pagination` component with prev/next and optional page numbers.

## Solution (Infinite Scroll + Pagination variants)

```jsx
import { useState, useEffect, useRef } from 'react';

// Mock: 100 items, fetch by page
const PAGE_SIZE = 10;
const fetchPage = (page) =>
  new Promise((r) =>
    setTimeout(() => r(Array.from({ length: PAGE_SIZE }, (_, i) => ({ id: (page - 1) * PAGE_SIZE + i, name: `Item ${(page - 1) * PAGE_SIZE + i + 1}` }))), 300)
  );

// --- Infinite Scroll ---
function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (page > 5) return; // mock has 5 pages
    setLoading(true);
    fetchPage(page).then((data) => {
      setItems((prev) => (page === 1 ? data : [...prev, ...data]));
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && page <= 5) setPage((p) => p + 1);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loading, page]);

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div ref={sentinelRef} style={{ height: 20 }} />
      {loading && <p>Loading...</p>}
    </div>
  );
}

// --- Pagination ---
const ALL_ITEMS = Array.from({ length: 100 }, (_, i) => ({ id: i, name: `Item ${i + 1}` }));

function PaginatedList() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(ALL_ITEMS.length / pageSize);
  const start = (page - 1) * pageSize;
  const pageItems = ALL_ITEMS.slice(start, start + pageSize);

  return (
    <div>
      <ul>
        {pageItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <p>Page {page} of {totalPages}</p>
      <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Prev</button>
      <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next</button>
    </div>
  );
}

export { InfiniteList, PaginatedList };
```

## React concepts tested

- useState, useEffect, useRef (sentinel, AbortController).
- Conditional fetch (loading, hasMore).
- List rendering, keys.
