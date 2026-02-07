# 03 – Tic Tac Toe

## Problem

Build a **Tic Tac Toe** game (3×3 grid). Two players (X and O) take turns. Detect win or draw and show result. Provide a reset button.

## Requirements

- **Grid:** 3×3 cells; click to place current player’s symbol (X or O). No overwrite of filled cell.
- **Turn:** Alternate X and O; show “Next: X” or “Next: O”.
- **Win:** Detect 3 in a row (rows, columns, diagonals). Show “X wins” / “O wins” and disable further moves.
- **Draw:** When all 9 cells filled with no winner; show “Draw”.
- **Reset:** Button to clear board and start again.

## Approach / Hints

- **State:** `squares: Array<null | 'X' | 'O'>` (length 9), `xIsNext: boolean`. Or derive next from move count.
- **Click:** If `squares[i]` is null and no winner, set `squares[i] = xIsNext ? 'X' : 'O'` and flip `xIsNext`.
- **Winner:** Function `getWinner(squares)` that checks 8 lines (3 rows, 3 cols, 2 diagonals). Return 'X', 'O', or null.
- **Draw:** `squares.every(Boolean) && !getWinner(squares)`.
- **Reset:** `setSquares(Array(9).fill(null)); setXIsNext(true)`.

## Component structure (suggestion)

- `Game` – state (squares, xIsNext), winner/draw logic, reset, render board and status.
- `Board` – receives squares and onClick handler; renders 9 `Cell`s.
- `Cell` – one button; value from squares[i]; onClick calls parent with index.

## React concepts tested

- useState, immutable update (copy array, then set new state).
- Derived state (winner, draw).
- Lifting state (cell click → parent updates state).
