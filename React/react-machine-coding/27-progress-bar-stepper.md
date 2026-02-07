# 27 – Progress Bar / Stepper

## Problem

Build a **progress bar** (percentage 0–100) and/or a **stepper** (horizontal steps: Step 1 → Step 2 → Step 3 with current step highlighted and optional “completed” state).

## Requirements

- **Progress bar:** Value 0–100; display as bar (div with width % or transform). Optional: animated transition; label showing “X%”. Optional: indeterminate (animated) state.
- **Stepper:** 3–5 steps with labels; current step highlighted; completed steps have check or different style; optional connector line between steps. Click step (optional) to jump if allowed.
- **Controlled:** Both receive value/currentStep from parent and optional onChange (for stepper click).
- **Optional:** Progress bar with buffer (e.g. secondary bar for “loaded” vs “played”); vertical stepper.

## Approach / Hints

- **Progress bar:** div wrapper; inner div style={{ width: `${value}%` }} or transform scaleX(value/100). CSS transition for smooth change.
- **Stepper:** Map steps array; for each step index: if index < current → completed; if index === current → active; else pending. Render circle/number + label; connector line between (optional).
- **State:** Parent holds currentStep (0-based); Progress bar value = (currentStep / (steps.length - 1)) * 100 if linear.

## Component structure (suggestion)

- `ProgressBar` – value prop; render bar with width or transform; optional label.
- `Stepper` – steps: string[], currentStep: number; map to step indicators and optional connector.

## Solution

```jsx
function ProgressBar({ value = 0, max = 100 }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{ width: '100%', height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
      <div style={{ width: pct + '%', height: '100%', background: 'blue', borderRadius: 4, transition: 'width 0.3s' }} />
    </div>
  );
}

function Stepper({ steps, currentStep }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {steps.map((label, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: i < currentStep ? 'green' : i === currentStep ? 'blue' : '#eee',
              color: i <= currentStep ? 'white' : '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {i < currentStep ? '✓' : i + 1}
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: 40, height: 2, background: i < currentStep ? 'green' : '#eee' }} />
          )}
          <span style={{ marginLeft: 4 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// Usage: <ProgressBar value={60} />  <Stepper steps={['One', 'Two', 'Three']} currentStep={1} />
export { ProgressBar, Stepper };
```

## React concepts tested

- Props (value, currentStep).
- Conditional class/style (completed, active).
- Simple presentational components.
