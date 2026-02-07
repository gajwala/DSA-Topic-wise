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

## Solution

```jsx
import { useState, useMemo } from 'react';

const DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'User', 'Guest'][i % 3],
}));

function DataTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return DATA.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortOrder]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const pageData = useMemo(
    () => sorted.slice((page - 1) * pageSize, page * pageSize),
    [sorted, page, pageSize]
  );

  const toggleSort = (key) => {
    setSortKey(key);
    setSortOrder((o) => (sortKey === key && o === 'asc' ? 'desc' : 'asc'));
  };

  const keys = ['id', 'name', 'email', 'role'];

  return (
    <div>
      <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ marginBottom: 8 }} />
      <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {keys.map((k) => (
              <th key={k} onClick={() => toggleSort(k)} style={{ cursor: 'pointer' }}>
                {k} {sortKey === k ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageData.map((row) => (
            <tr key={row.id}>
              {keys.map((k) => (
                <td key={k}>{row[k]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, sorted.length)} of {sorted.length}</p>
      <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Prev</button>
      <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next</button>
    </div>
  );
}

export default DataTable;
```

## React concepts tested

- useMemo for derived data (filter → sort → slice).
- useState (sort, search, page).
- List rendering, keys.
