# 19 – Expense Tracker

## Problem

Build an **expense tracker**: add income/expense with amount and description (and optional category/date); list transactions; show balance and optional breakdown (income vs expense); persist in localStorage.

## Requirements

- **Add:** Form with amount (number), description (text), type (income/expense). Submit adds to list.
- **List:** Show transactions (description, amount with + or -); optional date/category. Delete transaction.
- **Balance:** Total = sum(income) - sum(expense). Display prominently.
- **Optional:** Filter by type or date; chart or summary (total income, total expense).
- **Persistence:** Load/save to localStorage.

## Approach / Hints

- **State:** `transactions: Array<{ id, amount, description, type: 'income'|'expense', date? }>`. Balance = transactions.filter(t => t.type==='income').reduce(sum) - transactions.filter(t => t.type==='expense').reduce(sum).
- **Add:** Validate amount > 0; push new transaction with id; clear form.
- **Delete:** Filter out by id.
- **localStorage:** Key 'expenses' or 'transactions'; JSON.parse on mount; JSON.stringify on change.

## Component structure (suggestion)

- `ExpenseTracker` – state transactions; form; balance; list of TransactionRow with delete.
- Optional Summary component (income total, expense total).

## Solution

```jsx
import { useState, useEffect } from 'react';

const KEY = 'expense-transactions';

function ExpenseTracker() {
  const [transactions, setTransactions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
      return [];
    }
  });
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(transactions));
  }, [transactions]);

  const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  const add = (e) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || amt <= 0) return;
    setTransactions((prev) => [
      ...prev,
      { id: Date.now(), amount: amt, description: description.trim() || '—', type },
    ]);
    setAmount('');
    setDescription('');
  };

  const remove = (id) => setTransactions((prev) => prev.filter((t) => t.id !== id));

  return (
    <div>
      <h3>Balance: ${balance.toFixed(2)}</h3>
      <form onSubmit={add}>
        <input type="number" step="0.01" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {transactions.map((t) => (
          <li key={t.id} style={{ color: t.type === 'income' ? 'green' : 'red', marginTop: 4 }}>
            {t.description} — ${t.amount.toFixed(2)}
            <button onClick={() => remove(t.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseTracker;
```

## React concepts tested

- useState, derived state (balance).
- Form submit, validation.
- localStorage, list with delete.
