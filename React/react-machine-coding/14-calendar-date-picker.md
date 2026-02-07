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

## React concepts tested

- useState (view date, selected).
- Date API (getDay, getDate, days in month).
- Conditional popover, outside click.
