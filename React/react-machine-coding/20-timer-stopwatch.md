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

## Solution

```jsx
import { useState, useEffect } from 'react';

function format(ms) {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed((e) => e + 1000), 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div>
      <p style={{ fontSize: 32 }}>{format(elapsed)}</p>
      <button onClick={() => setRunning(true)}>Start</button>
      <button onClick={() => setRunning(false)}>Pause</button>
      <button onClick={() => { setElapsed(0); setRunning(false); }}>Reset</button>
    </div>
  );
}

function Timer() {
  const [remaining, setRemaining] = useState(5 * 60 * 1000); // 5 min
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1000) {
          setRunning(false);
          alert('Time up!');
          return 0;
        }
        return r - 1000;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div>
      <p>{format(remaining)}</p>
      <button onClick={() => setRunning(true)} disabled={remaining === 0}>Start</button>
      <button onClick={() => setRunning(false)}>Pause</button>
      <button onClick={() => setRemaining(5 * 60 * 1000)}>Reset (5 min)</button>
    </div>
  );
}

export { Stopwatch, Timer };
```

## React concepts tested

- useState, useEffect (setInterval, cleanup).
- Derived display from numeric state.
- Conditional start/stop of interval.
