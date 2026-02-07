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

## React concepts tested

- Props (value, currentStep).
- Conditional class/style (completed, active).
- Simple presentational components.
