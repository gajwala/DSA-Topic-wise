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

## Solution

```jsx
import { useState } from 'react';

function getWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = getWinner(squares);
  const draw = squares.every(Boolean) && !winner;
  const status = winner ? `${winner} wins!` : draw ? 'Draw' : `Next: ${xIsNext ? 'X' : 'O'}`;

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const next = [...squares];
    next[i] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  const reset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div>
      <p>{status}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', width: '150px' }}>
        {squares.map((val, i) => (
          <button key={i} onClick={() => handleClick(i)} disabled={!!winner || !!val}>
            {val || '\u00A0'}
          </button>
        ))}
      </div>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Game;
```

## React concepts tested

- useState, immutable update (copy array, then set new state).
- Derived state (winner, draw).
- Lifting state (cell click → parent updates state).
