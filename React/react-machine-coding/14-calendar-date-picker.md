# 14 – Calendar / Date Picker

## Problem

Build a **calendar** view and/or **date picker**: show a month grid; click a date to select it; optional: switch month, highlight today and selected, min/max dates.

## Requirements

- **Month grid:** 7 columns (Sun–Sat); cells are days of the month. Proper offset for first day of month.
- **Selection:** Click a day to set selected date; show selected (e.g. background). Optional: call onChange(date) for parent.
- **Navigation:** Prev/Next month (and optional year); display month/year label.
- **Today:** Highlight current date. **Min/Max (optional):** Disable or gray out dates outside range.
- **Picker mode:** Input that opens calendar popover; selected date shown in input; close on select or outside click.

## Approach / Hints

- **First day offset:** `new Date(year, month, 1).getDay()`; render empty cells for 0..offset-1, then days 1..daysInMonth. `new Date(year, month + 1, 0).getDate()` gives days in month.
- **State:** `viewDate: Date` (current month shown), `selected: Date | null`. Month navigation: setViewDate(new Date(y, m ± 1)).
- **Selection:** Click day → setSelected(new Date(year, month, day)); optional close popover and set input value.
- **Input + popover:** State `open`; input shows selected?.toLocaleDateString(); click input or button toggles open; calendar in portal or positioned div; outside click closes.

## Component structure (suggestion)

- `Calendar` – viewDate, selected; month nav; grid of day cells; onClick day updates selected.
- `DatePicker` – input, open state; Calendar in popover; selected → input value and onSelect callback.

## Solution

```jsx
import { useState, useRef, useEffect } from 'react';

function Calendar({ value, onChange }) {
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
  const selected = value ? new Date(value) : null;

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isSelected = (d) => selected && selected.getFullYear() === year && selected.getMonth() === month && selected.getDate() === d;
  const isToday = (d) => {
    const t = new Date();
    return t.getFullYear() === year && t.getMonth() === month && t.getDate() === d;
  };

  const select = (d) => onChange?.(new Date(year, month, d));

  return (
    <div style={{ width: 280 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <button onClick={() => setViewDate(new Date(year, month - 1))}>←</button>
        <span>{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={() => setViewDate(new Date(year, month + 1))}>→</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} style={{ textAlign: 'center', fontWeight: 'bold' }}>{d}</div>
        ))}
        {cells.map((d, i) => (
          <div key={i}>
            {d ? (
              <button
                onClick={() => select(d)}
                style={{
                  width: '100%',
                  background: isSelected(d) ? 'blue' : isToday(d) ? '#eee' : 'transparent',
                  color: isSelected(d) ? 'white' : 'black',
                }}
              >
                {d}
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function DatePicker() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', fn);
    return () => document.removeEventListener('click', fn);
  }, []);
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <input readOnly value={value ? value.toLocaleDateString() : ''} onClick={() => setOpen((o) => !o)} placeholder="Pick date" />
      {open && <Calendar value={value} onChange={(d) => { setValue(d); setOpen(false); }} />}
    </div>
  );
}

export { Calendar, DatePicker };
```

## React concepts tested

- useState (view date, selected).
- Date API (getDay, getDate, days in month).
- Conditional popover, outside click.
