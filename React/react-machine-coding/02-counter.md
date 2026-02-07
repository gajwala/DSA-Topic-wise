# 02 – Counter

## Problem

Build a **Counter** with increment, decrement, reset, and an optional step input. Show the current count and optionally support min/max bounds.

## Requirements

- **Display:** Current count (number).
- **Increment:** Button to add 1 (or step).
- **Decrement:** Button to subtract 1 (or step).
- **Reset:** Button to set count back to initial (e.g. 0).
- **Step (optional):** Input to set step size (e.g. 1, 5, 10); buttons use this step.
- **Min/Max (optional):** Disable decrement at min and increment at max; or clamp value.

## Approach / Hints

- **State:** `count` (number), optionally `step` (number). Initial count from props or constant.
- **Handlers:** `setCount(c => c + step)`, `setCount(c => c - step)`, `setCount(initial)`. With bounds: `Math.min(max, c + step)` / `Math.max(min, c - step)`.
- **Step input:** Controlled input; parse as number and validate (e.g. default 1, ignore NaN).
- Keep logic in one component for a short round; extract buttons if time allows.

## Component structure (suggestion)

- Single `Counter` component with state and buttons; or `Counter` + `CounterDisplay` / `CounterControls` for clarity.

## Solution

```jsx
import { useState } from 'react';

const INITIAL = 0;
const MIN = -100;
const MAX = 100;

function Counter() {
  const [count, setCount] = useState(INITIAL);
  const [step, setStep] = useState(1);

  const stepNum = Number(step) || 1;
  const inc = () => setCount((c) => Math.min(MAX, c + stepNum));
  const dec = () => setCount((c) => Math.max(MIN, c - stepNum));
  const reset = () => setCount(INITIAL);

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={dec} disabled={count <= MIN}>
          −
        </button>
        <button onClick={inc} disabled={count >= MAX}>
          +
        </button>
      </div>
      <label>
        Step:{' '}
        <input
          type="number"
          min="1"
          value={step}
          onChange={(e) => setStep(e.target.value)}
        />
      </label>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
```

## React concepts tested

- useState, functional updates (`setCount(c => c + 1)`).
- Controlled input for step.
- Conditional disable (min/max).
