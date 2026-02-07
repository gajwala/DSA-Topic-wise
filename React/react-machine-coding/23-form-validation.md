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

## React concepts tested

- Controlled inputs, form state.
- Validation logic, error state.
- Conditional error display.
