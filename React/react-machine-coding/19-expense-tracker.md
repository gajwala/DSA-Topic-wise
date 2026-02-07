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

## React concepts tested

- useState, derived state (balance).
- Form submit, validation.
- localStorage, list with delete.
