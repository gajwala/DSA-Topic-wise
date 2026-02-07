# 11 – Multi-step Form / Wizard

## Problem

Build a **multi-step form** (wizard): 2–4 steps with Next/Back; show progress; validate current step before allowing Next; submit on last step.

## Requirements

- **Steps:** E.g. Step 1 (Personal), Step 2 (Address), Step 3 (Review). One step visible at a time.
- **Navigation:** Next (go to step + 1), Back (go to step - 1). Disable Back on first step; on last step show Submit instead of Next.
- **Progress:** Indicator (e.g. 1 – 2 – 3 or progress bar) showing current step.
- **Validation:** Before Next, validate current step (e.g. required fields); show errors and don’t advance if invalid.
- **Submit:** On Submit, collect all step data and log or send (mock); optional success message.

## Approach / Hints

- **State:** `step: number` (1-based), `formData: object` (fields from all steps), `errors: object` (field → message).
- **Step content:** Switch on step: step === 1 → Step1Fields, step === 2 → Step2Fields, etc. Each step reads/updates formData and errors.
- **Next:** Validate current step (set errors); if valid, setErrors({}), setStep(s => s + 1).
- **Back:** setStep(s => s - 1).
- **Controlled inputs:** formData.name, formData.email, etc.; onChange update formData (spread and set field).

## Component structure (suggestion)

- `Wizard` – step, formData, errors; progress UI; step content; Next/Back/Submit.
- Step components or inline fields per step; shared input components that use formData/errors.

## React concepts tested

- useState (step, formData, errors).
- Conditional render by step.
- Form validation, controlled inputs.
