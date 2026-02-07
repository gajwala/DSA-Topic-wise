# 20 – Timer / Stopwatch

## Problem

Build a **timer** (countdown from N minutes) or **stopwatch** (count up from 0). Start, Pause, Reset. Display time in MM:SS or HH:MM:SS.

## Requirements

- **Stopwatch:** Time starts at 0; Start begins counting (e.g. every 1s or 10ms for accuracy); Pause stops; Reset sets to 0 and stops.
- **Timer (countdown):** User sets minutes (and optional seconds); Start counts down to 0; Pause/Resume; at 0 show alert or message and stop. Reset restores initial value.
- **Display:** Format as MM:SS or HH:MM:SS. Update every second (or 100ms for smoother display).
- **Accuracy:** Use setInterval(1000) for seconds; or requestAnimationFrame / setInterval(10) and derive display from elapsed ms to avoid drift.

## Approach / Hints

- **State:** `elapsedMs` (stopwatch) or `remainingMs` (timer), `isRunning: boolean`. Initial time for timer: e.g. 5 * 60 * 1000 ms.
- **Effect:** useEffect with dependency [isRunning]. If isRunning, start interval: for stopwatch elapsedMs += 1000 (or 10); for timer remainingMs -= 1000; if remainingMs <= 0 clear and set isRunning false. Cleanup: clearInterval.
- **Format:** `const m = Math.floor(ms/60000); const s = Math.floor((ms%60000)/1000); return `${m}:${s.padStart(2,'0')}`;`
- **Reset:** set elapsedMs = 0 or remainingMs = initialMs; set isRunning false.

## Component structure (suggestion)

- `Stopwatch` or `Timer` – state (time, isRunning); display; Start/Pause/Reset buttons; useEffect for interval.

## React concepts tested

- useState, useEffect (setInterval, cleanup).
- Derived display from numeric state.
- Conditional start/stop of interval.
