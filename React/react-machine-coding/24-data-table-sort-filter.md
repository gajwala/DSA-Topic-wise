# 24 – Data Table (Sort, Filter, Paginate)

## Problem

Build a **data table**: display rows from an array of objects; **sort** by column (click header); **filter** by search (one input for all columns or per column); **pagination** (page size, next/prev or page numbers).

## Requirements

- **Table:** Columns from data keys (e.g. name, email, role); one row per item.
- **Sort:** Click column header to sort by that column (asc/desc); toggle on second click. Show sort indicator (↑↓).
- **Filter:** Search input; filter rows where any column value includes search string (case-insensitive). Apply filter before sort and pagination.
- **Pagination:** Page size (e.g. 10); show rows for current page only; Next/Prev; optional page numbers (1, 2, 3 …). Show “Showing X–Y of Z”.
- **Optional:** Per-column filter; export.

## Approach / Hints

- **State:** `data` (full list), `sortKey`, `sortOrder: 'asc'|'desc'`, `search`, `page`, `pageSize`.
- **Derived:** filtered = data.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes(search.toLowerCase())).
- **Sorted:** [...filtered].sort((a,b) => compare a[sortKey] and b[sortKey] with sortOrder).
- **Paginated:** sorted.slice((page-1)*pageSize, page*pageSize). totalPages = Math.ceil(filtered.length / pageSize).
- **Sort click:** If header === sortKey, flip sortOrder; else setSortKey(header), sortOrder 'asc'.

## Component structure (suggestion)

- `DataTable` – state; search input; table (header cells clickable for sort); body from paginated data; pagination controls.
- Optional: generic useSort, useFilter hooks.

## React concepts tested

- useMemo for derived data (filter → sort → slice).
- useState (sort, search, page).
- List rendering, keys.
