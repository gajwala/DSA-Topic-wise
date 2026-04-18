# Connect 4 — React

A fully playable Connect 4 game built with React using hooks. Same game logic as the vanilla JS version — only the UI layer changes.

---

## Features

- 2 Player local gameplay (RED vs Yellow)
- 7 column buttons — piece drops with gravity
- Win detection with winning cells highlighted
- Draw detection
- Full accessibility — ARIA roles, live regions, focus management
- Reset to start a new game

---

## How to Run

```bash
npm install
npm run dev
```

Or paste directly into a React sandbox (CodeSandbox, StackBlitz).

---

## Full Code

```jsx
import { useState, useRef, useEffect } from "react";

const ROWS = 6;
const COLS = 7;

const newBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(null));

function getDropRow(board, col) {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === null) return r;
  }
  return -1;
}

function checkWinner(board, lrow, lcol, player) {
  const directions = [[0,1],[1,0],[1,1],[1,-1]];
  for (const [dr, dc] of directions) {
    let count = 1;
    const cells = [[lrow, lcol]];
    for (const sign of [1, -1]) {
      for (let i = 1; i < 4; i++) {
        const nrow = lrow + dr * i * sign;
        const ncol = lcol + dc * i * sign;
        if (nrow < 0 || nrow >= ROWS || ncol < 0 || ncol >= COLS) break;
        if (board[nrow][ncol] !== player) break;
        cells.push([nrow, ncol]);
        count++;
      }
    }
    if (count >= 4) return cells;
  }
  return null;
}

function checkDraw(board) {
  return board[0].every(c => c !== null);
}

export default function Connect4() {
  const [board, setBoard]                 = useState(newBoard());
  const [currentPlayer, setCurrentPlayer] = useState("RED");
  const [gameOver, setGameOver]           = useState(false);
  const [winCells, setWinCells]           = useState([]);
  const [status, setStatus]               = useState("RED's turn");

  const announceRef = useRef(null);
  const resetBtnRef = useRef(null);

  useEffect(() => {
    if (announceRef.current) announceRef.current.textContent = status;
  }, [status]);

  const isWinCell = (r, c) => winCells.some(([wr, wc]) => wr === r && wc === c);

  function handleColClick(col) {
    if (gameOver) return;
    const r = getDropRow(board, col);
    if (r === -1) return;

    const newB = board.map(row => [...row]);
    newB[r][col] = currentPlayer;
    setBoard(newB);

    const winner = checkWinner(newB, r, col, currentPlayer);
    if (winner) {
      setWinCells(winner);
      setStatus(`${currentPlayer} wins!`);
      setGameOver(true);
      setTimeout(() => resetBtnRef.current?.focus(), 100);
      return;
    }

    if (checkDraw(newB)) {
      setStatus("It's a Draw!");
      setGameOver(true);
      setTimeout(() => resetBtnRef.current?.focus(), 100);
      return;
    }

    const next = currentPlayer === "RED" ? "Yellow" : "RED";
    setCurrentPlayer(next);
    setStatus(`${next}'s turn`);
  }

  function resetGame() {
    setBoard(newBoard());
    setCurrentPlayer("RED");
    setGameOver(false);
    setWinCells([]);
    setStatus("RED's turn");
  }

  function cellLabel(r, c) {
    const val = board[r][c];
    const win = isWinCell(r, c);
    if (!val) return `Row ${r + 1} Column ${c + 1} empty`;
    return `Row ${r + 1} Column ${c + 1} ${val}${win ? " winning piece" : ""}`;
  }

  return (
    <div style={styles.page}>
      <div
        ref={announceRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={styles.srOnly}
      />

      <h1 style={styles.title} aria-label="Connect Four game">
        Connect <span style={{ color: "#ef4444" }}>4</span>
      </h1>

      <div
        style={{
          ...styles.status,
          color: gameOver
            ? winCells.length
              ? currentPlayer === "RED" ? "#ef4444" : "#f59e0b"
              : "#94a3b8"
            : currentPlayer === "RED" ? "#ef4444" : "#f59e0b",
        }}
        aria-hidden="true"
      >
        {currentPlayer === "RED" ? "🔴" : "🟡"} {status}
      </div>

      <div style={styles.colBtns} role="group" aria-label="Drop piece — choose a column">
        {Array.from({ length: COLS }, (_, c) => {
          const full = getDropRow(board, c) === -1;
          return (
            <button
              key={c}
              onClick={() => handleColClick(c)}
              disabled={gameOver || full}
              aria-label={`Drop in column ${c + 1}${full ? " (full)" : ""}`}
              style={{
                ...styles.colBtn,
                color: currentPlayer === "RED" ? "#ef4444" : "#f59e0b",
              }}
            >▼</button>
          );
        })}
      </div>

      <div role="grid" aria-label="Connect Four board" aria-readonly="true" style={styles.board}>
        {board.map((row, r) => (
          <div key={r} role="row" style={styles.row}>
            {row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                role="gridcell"
                aria-label={cellLabel(r, c)}
                style={styles.cell}
              >
                <div
                  aria-hidden="true"
                  style={{
                    ...styles.disc,
                    background: cell === "RED"    ? "#ef4444"
                              : cell === "Yellow" ? "#f59e0b"
                              : "#1e293b",
                    boxShadow: isWinCell(r, c)
                      ? `0 0 0 4px #fff, 0 0 14px 4px ${cell === "RED" ? "#ef4444" : "#f59e0b"}`
                      : cell
                      ? "inset 0 -3px 6px rgba(0,0,0,0.3)"
                      : "inset 0 3px 8px rgba(0,0,0,0.5)",
                    transform: isWinCell(r, c) ? "scale(1.1)" : "scale(1)",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        ref={resetBtnRef}
        onClick={resetGame}
        aria-label="Start a new game"
        style={styles.resetBtn}
      >
        New Game
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
  },
  srOnly: {
    position: "absolute",
    width: 1, height: 1,
    padding: 0, margin: -1,
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    border: 0,
  },
  title: { color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 12 },
  status: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  colBtns: {
    display: "grid",
    gridTemplateColumns: `repeat(${COLS}, 70px)`,
    gap: 10, marginBottom: 6,
  },
  colBtn: {
    width: 70, height: 36,
    border: "none", borderRadius: 8,
    background: "#334155", fontSize: 18, cursor: "pointer",
  },
  board: {
    display: "flex", flexDirection: "column",
    gap: 10, background: "#1d4ed8",
    padding: 10, borderRadius: 10,
  },
  row: { display: "flex", gap: 10 },
  cell: {
    width: 70, height: 70, borderRadius: "50%",
    background: "#1e293b", display: "flex",
    alignItems: "center", justifyContent: "center",
    boxShadow: "inset 0 3px 8px rgba(0,0,0,0.5)",
  },
  disc: { width: 70, height: 70, borderRadius: "50%", transition: "transform 0.15s" },
  resetBtn: {
    marginTop: 16, padding: "8px 24px",
    fontSize: 15, cursor: "pointer",
    borderRadius: 8, border: "none",
    background: "#6366f1", color: "#fff", fontWeight: 600,
  },
};
```

---

## Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x"
}
```

No other dependencies.

---

## Project Structure

```
src/
  App.jsx       ← entire game in one component
```

---

## React Concepts Used

### State
```js
const [board, setBoard]                 = useState(newBoard());
const [currentPlayer, setCurrentPlayer] = useState("RED");
const [gameOver, setGameOver]           = useState(false);
const [winCells, setWinCells]           = useState([]);
const [status, setStatus]               = useState("RED's turn");
```

Every state change triggers a re-render — no manual DOM updates needed.

### Immutable Board Update
```js
// never mutate state directly in React
const newB = board.map(row => [...row]); // copy
newB[r][col] = currentPlayer;            // update copy
setBoard(newB);                          // set new state
```

### useRef — for DOM access without re-render
```js
const announceRef = useRef(null); // screen reader live region
const resetBtnRef = useRef(null); // focus management
```

### useEffect — sync status to screen reader
```js
useEffect(() => {
  if (announceRef.current) announceRef.current.textContent = status;
}, [status]);
```

---

## Core Logic

Same as vanilla JS — pure functions, no React dependency:

### `getDropRow(board, col)`
Scans column bottom-up, returns lowest empty row.

### `checkWinner(board, lrow, lcol, player)`
O(1) last-move-only check — 4 directions × 2 signs × 3 steps.

### `checkDraw(board)`
Checks if top row is full — O(COLS).

---

## Complexity Analysis

### `getDropRow(board, col)`
| | Complexity |
|---|---|
| Time | O(ROWS) — scans one column |
| Space | O(1) |

---

### `checkWinner(board, lrow, lcol, player)`
| | Complexity |
|---|---|
| Time | **O(1)** — max 24 neighbor checks, independent of board size |
| Space | O(1) — cells array holds at most 4 entries |

> The critical insight: a winner can only occur through the last placed piece. No need to scan the whole board.

```
Full board scan  →  O(ROWS × COLS) = O(42) per move
Last move only   →  O(4 × 2 × 3)  = O(24) per move → O(1) constant
```

---

### `checkDraw(board)`
| | Complexity |
|---|---|
| Time | O(COLS) — checks top row only |
| Space | O(1) |

---

### Board immutable copy in `handleColClick`
| | Complexity |
|---|---|
| Time | O(ROWS × COLS) — `board.map(row => [...row])` copies all rows |
| Space | O(ROWS × COLS) — new board array allocated each move |

> This is the **React tax** compared to vanilla JS. In vanilla JS, you mutate the board directly (O(1)). In React, you must copy it to trigger a re-render (O(ROWS × COLS)). For a 6×7 board this is 42 operations — negligible in practice.

---

### Overall per move
| Operation | Time | Space |
|---|---|---|
| Board copy | O(ROWS × COLS) | O(ROWS × COLS) |
| `getDropRow` | O(ROWS) | O(1) |
| `checkWinner` | O(1) | O(1) |
| `checkDraw` | O(COLS) | O(1) |
| React re-render | O(ROWS × COLS) | O(1) |
| **Total** | **O(ROWS × COLS)** | **O(ROWS × COLS)** |

---

### Board storage
| | Complexity |
|---|---|
| Space | O(ROWS × COLS) = O(42) → effectively O(1) for fixed board |

---

## Vanilla JS vs React — Complexity Comparison

| Operation | Vanilla JS | React |
|---|---|---|
| Board update | O(1) — mutate directly | O(ROWS × COLS) — immutable copy |
| DOM update | O(1) — direct children access | O(ROWS × COLS) — virtual DOM diff |
| Winner check | O(1) | O(1) |
| Per move total | **O(ROWS)** | **O(ROWS × COLS)** |

> React is slightly less efficient per move due to immutability and virtual DOM. But for a 6×7 board, the difference is **42 operations vs 6** — completely negligible. React's tradeoff is developer experience and maintainability over raw performance.

---

## Is This the Best Solution?

### Winner Check — Yes ✅
O(1) last-move-only is optimal. Can't do better.

### Immutable Update — Yes ✅ (for React)
`board.map(row => [...row])` is the idiomatic React approach. Using `useImmer` could simplify syntax but doesn't change complexity.

### State structure — Yes ✅
All state is flat and minimal. No derived state stored unnecessarily.

### Possible Further Optimizations
- **`useMemo`** — memoize `isWinCell` lookup if board gets large.
- **`useCallback`** — memoize `handleColClick` to avoid re-creating on every render.
- **Bitboard** — encode board as integers for O(1) bitwise winner check. Overkill for this scale.
- **Track top row per column** — make `getDropRow` O(1) by storing current top index per column.

---

## Accessibility

| Feature | Implementation |
|---|---|
| Screen reader announcements | `role="status"` + `aria-live="polite"` live region via `useEffect` |
| Board structure | `role="grid"` → `role="row"` → `role="gridcell"` |
| Cell descriptions | `aria-label="Row 2 Column 3 RED winning piece"` |
| Column buttons | `aria-label="Drop in column 3 (full)"` |
| Button grouping | `role="group"` with `aria-label` |
| Focus management | `useRef` + `resetBtnRef.current.focus()` on game end |
| Emoji status hidden | `aria-hidden="true"` on visual status — live region handles announcements |
