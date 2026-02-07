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

## Solution

```jsx
import { useState } from 'react';

const steps = [
  { id: 1, title: 'Personal', fields: ['name', 'email'] },
  { id: 2, title: 'Address', fields: ['city', 'zip'] },
  { id: 3, title: 'Review', fields: [] },
];

function Wizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', city: '', zip: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!formData.name.trim()) e.name = 'Name required';
      if (!formData.email.trim()) e.email = 'Email required';
    }
    if (step === 2) {
      if (!formData.city.trim()) e.city = 'City required';
      if (!formData.zip.trim()) e.zip = 'Zip required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step < 3) setStep((s) => s + 1);
    else alert(JSON.stringify(formData));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        {steps.map((s) => (
          <span key={s.id} style={{ fontWeight: step === s.id ? 'bold' : 'normal', marginRight: 8 }}>{s.title}</span>
        ))}
      </div>
      {step === 1 && (
        <div>
          <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
          <br />
          <input placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
      )}
      {step === 2 && (
        <div>
          <input placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
          {errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
          <br />
          <input placeholder="Zip" value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} />
          {errors.zip && <span style={{ color: 'red' }}>{errors.zip}</span>}
        </div>
      )}
      {step === 3 && <pre>{JSON.stringify(formData, null, 2)}</pre>}
      <div style={{ marginTop: 16 }}>
        {step > 1 && <button onClick={back}>Back</button>}
        <button onClick={next}>{step === 3 ? 'Submit' : 'Next'}</button>
      </div>
    </div>
  );
}

export default Wizard;
```

## React concepts tested

- useState (step, formData, errors).
- Conditional render by step.
- Form validation, controlled inputs.
