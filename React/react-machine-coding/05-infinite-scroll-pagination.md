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

## React concepts tested

- useState, useEffect, useRef (sentinel, AbortController).
- Conditional fetch (loading, hasMore).
- List rendering, keys.
