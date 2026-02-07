# 23 – Form with Validation

## Problem

Build a **form** (e.g. signup: name, email, password, confirm password) with **validation**: required, format (email), min length, match (password === confirm). Show errors per field; optional submit only when valid.

## Requirements

- **Fields:** Name (required), Email (required, valid email), Password (required, min 8), Confirm password (must match password).
- **Validation:** On blur and/or on submit: show error message below each invalid field. Common rules: non-empty, email regex, length, match.
- **Submit:** Disable submit until valid, or allow click and show all errors. On submit (when valid): log data or call API mock.
- **Optional:** Real-time validation (on change) after first blur or after first submit attempt.

## Approach / Hints

- **State:** `formData: { name, email, password, confirm }`, `errors: { name?, email?, password?, confirm? }`, `touched: { name?, ... }` (optional).
- **Validate function:** For each field, run rules; return object of field → message. E.g. if !email return { email: 'Required' }; else if !/\S+@\S+/.test(email) return { email: 'Invalid email' }; etc.
- **onBlur:** Set touched; setErrors(validate(formData)). **onSubmit:** setErrors(validate(formData)); if no errors, submit.
- **Controlled:** value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}.

## Component structure (suggestion)

- `Form` – formData, errors, touched; validate function; render inputs with error messages; submit button.
- Optional reusable `Input` that receives error, touched, and shows message.

## Solution

```jsx
import { useState } from 'react';

function validate(formData) {
  const errors = {};
  if (!formData.name?.trim()) errors.name = 'Name is required';
  if (!formData.email?.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email';
  if (!formData.password?.trim()) errors.password = 'Password is required';
  else if (formData.password.length < 8) errors.password = 'Min 8 characters';
  if (formData.password !== formData.confirm) errors.confirm = 'Passwords must match';
  return errors;
}

function SignupForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate(formData);
    setErrors(e2);
    if (Object.keys(e2).length === 0) {
      console.log('Submitted', formData);
    }
  };

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input placeholder="Name" value={formData.name} onChange={(e) => update('name', e.target.value)} />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      </div>
      <div>
        <input placeholder="Email" type="email" value={formData.email} onChange={(e) => update('email', e.target.value)} />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      <div>
        <input placeholder="Password" type="password" value={formData.password} onChange={(e) => update('password', e.target.value)} />
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      </div>
      <div>
        <input placeholder="Confirm password" type="password" value={formData.confirm} onChange={(e) => update('confirm', e.target.value)} />
        {errors.confirm && <span style={{ color: 'red' }}>{errors.confirm}</span>}
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
}

export default SignupForm;
```

## React concepts tested

- Controlled inputs, form state.
- Validation logic, error state.
- Conditional error display.
