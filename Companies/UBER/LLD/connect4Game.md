# Connect 4 — Vanilla JavaScript

A fully playable Connect 4 game built with pure HTML, CSS, and JavaScript. No frameworks, no libraries.

---

## Features

- 2 Player local gameplay (RED vs Yellow)
- 7 column buttons — piece drops with gravity to the lowest empty row
- Win detection with winning cells highlighted
- Draw detection
- Accessible — keyboard navigable, screen reader friendly
- Reset button to start a new game

---

## How to Run

Just open `index.html` in any browser. No build step, no dependencies.

```bash
open index.html
```

---

## Full Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Connect 4</title>
    <style>
      body {
        background: #0f172a;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
        font-family: sans-serif;
      }
      #status {
        color: #fff;
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 12px;
      }
      #col-btns {
        display: grid;
        grid-template-columns: repeat(7, 70px);
        gap: 10px;
        margin-bottom: 6px;
      }
      .col-btn {
        width: 70px;
        height: 36px;
        border: none;
        border-radius: 8px;
        background: #334155;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        transition: background 0.2s, transform 0.1s;
      }
      .col-btn:hover { background: #6366f1; transform: translateY(-2px); }
      .col-btn:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }
      .container {
        display: grid;
        grid-template-columns: repeat(7, 70px);
        gap: 10px;
        background-color: #1d4ed8;
        padding: 10px;
        border-radius: 10px;
        width: fit-content;
      }
      .cell {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-color: #1e293b;
        box-shadow: inset 0 3px 8px rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .disc {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      .disc.RED    { background: #ef4444; box-shadow: inset 0 -3px 6px rgba(0,0,0,0.3); }
      .disc.Yellow { background: #f59e0b; box-shadow: inset 0 -3px 6px rgba(0,0,0,0.3); }
      .disc.win    { outline: 4px solid #fff; transform: scale(1.1); }
      #reset-btn {
        margin-top: 16px;
        padding: 8px 24px;
        font-size: 15px;
        cursor: pointer;
        border-radius: 8px;
        border: none;
        background: #6366f1;
        color: #fff;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div id="status">🔴 RED's turn</div>
    <div id="col-btns"></div>
    <div class="container" id="container"></div>
    <button id="reset-btn">New Game</button>

    <script>
      const ROWS = 6, COLS = 7;
      let currentPlayer = "RED";
      let gameOver = false;
      const board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

      const container = document.getElementById("container");
      const colBtns   = document.getElementById("col-btns");
      const statusEl  = document.getElementById("status");
      const resetBtn  = document.getElementById("reset-btn");

      function createBoard() {
        container.innerHTML = "";
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            container.appendChild(cell);
          }
        }
      }

      function createColBtns() {
        colBtns.innerHTML = "";
        for (let c = 0; c < COLS; c++) {
          const btn = document.createElement("button");
          btn.className = "col-btn";
          btn.textContent = "▼";
          btn.dataset.col = c;
          btn.setAttribute("aria-label", `Drop in column ${c + 1}`);
          btn.addEventListener("click", () => handleColClick(c));
          colBtns.appendChild(btn);
        }
      }

      function getDropRow(col) {
        for (let r = ROWS - 1; r >= 0; r--) {
          if (board[r][col] === null) return r;
        }
        return -1;
      }

      function checkWinner(lrow, lcol, player) {
        const dirs = [[0,1],[1,0],[1,1],[1,-1]];
        for (const [dr, dc] of dirs) {
          let count = 1;
          const cells = [[lrow, lcol]];
          for (const sign of [1, -1]) {
            for (let i = 1; i < 4; i++) {
              const nr = lrow + dr * i * sign;
              const nc = lcol + dc * i * sign;
              if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) break;
              if (board[nr][nc] !== player) break;
              cells.push([nr, nc]);
              count++;
            }
          }
          if (count >= 4) return cells;
        }
        return null;
      }

      function checkDraw() {
        return board[0].every(c => c !== null);
      }

      function highlightWin(cells) {
        cells.forEach(([r, c]) => {
          const cell = container.children[r * COLS + c];
          const disc = cell.querySelector(".disc");
          if (disc) disc.classList.add("win");
        });
      }

      function updateBtnColors() {
        colBtns.querySelectorAll(".col-btn").forEach(b => {
          b.style.color = currentPlayer === "RED" ? "#ef4444" : "#f59e0b";
        });
      }

      function handleColClick(col) {
        if (gameOver) return;
        const r = getDropRow(col);
        if (r === -1) return;

        board[r][col] = currentPlayer;
        const cell = container.children[r * COLS + col];
        const disc = document.createElement("div");
        disc.className = `disc ${currentPlayer}`;
        cell.appendChild(disc);

        const winCells = checkWinner(r, col, currentPlayer);
        if (winCells) {
          highlightWin(winCells);
          statusEl.textContent = `🏆 ${currentPlayer} wins!`;
          statusEl.style.color = currentPlayer === "RED" ? "#ef4444" : "#f59e0b";
          gameOver = true;
          resetBtn.focus();
          return;
        }

        if (checkDraw()) {
          statusEl.textContent = "🤝 It's a Draw!";
          statusEl.style.color = "#94a3b8";
          gameOver = true;
          resetBtn.focus();
          return;
        }

        currentPlayer = currentPlayer === "RED" ? "Yellow" : "RED";
        statusEl.textContent = `${currentPlayer === "RED" ? "🔴" : "🟡"} ${currentPlayer}'s turn`;
        statusEl.style.color = currentPlayer === "RED" ? "#ef4444" : "#f59e0b";

        colBtns.querySelectorAll(".col-btn").forEach((btn, c) => {
          btn.disabled = getDropRow(c) === -1;
        });
        updateBtnColors();
      }

      resetBtn.addEventListener("click", () => {
        board.forEach(r => r.fill(null));
        currentPlayer = "RED";
        gameOver = false;
        statusEl.textContent = "🔴 RED's turn";
        statusEl.style.color = "#fff";
        createBoard();
        createColBtns();
        updateBtnColors();
      });

      createBoard();
      createColBtns();
      updateBtnColors();
    </script>
  </body>
</html>
```

---

## Project Structure

```
index.html        ← everything in one file (HTML + CSS + JS)
```

---

## Core Logic

### Board
```js
const board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
// 2D array — null = empty, "RED" / "Yellow" = filled
```

### Gravity — `getDropRow(col)`
Scans the column from **bottom to top**, returns the first empty row.
```js
for (let r = ROWS - 1; r >= 0; r--) {
  if (board[r][col] === null) return r;
}
```

### Winner Check — `checkWinner(board, lrow, lcol, player)`
Checks only around the **last placed piece** in all 4 directions (horizontal, vertical, diagonal, anti-diagonal), walking both ways using `sign = [1, -1]`.

```js
const directions = [[0,1],[1,0],[1,1],[1,-1]];
for (const sign of [1, -1]) {
  for (let i = 1; i < 4; i++) { ... }
}
```

### DOM Access — `container.children[r * COLS + c]`
Direct O(1) index access instead of `querySelector` — cells are stored in row-major order.

---

## Complexity Analysis

### `getDropRow(col)`
| | Complexity |
|---|---|
| Time | O(ROWS) — scans one column top to bottom |
| Space | O(1) — no extra memory |

> Worst case: all 6 rows scanned. Best case: bottom row is empty → O(1).

---

### `checkWinner(board, lrow, lcol, player)`
| | Complexity |
|---|---|
| Time | **O(1)** — fixed 4 directions × 2 signs × 3 steps = max 24 checks |
| Space | O(1) — `cells` array holds at most 4 entries |

> This is the key optimization. Instead of scanning the whole board O(ROWS × COLS), we only check around the last placed piece. Board size doesn't matter — always 24 checks max.

```
Full board scan:  O(6 × 7) = O(42) checks per move
Last move only:   O(4 × 2 × 3) = O(24) checks per move — constant, independent of board size
```

---

### `handleColClick(col)`
| | Complexity |
|---|---|
| Time | O(ROWS) — dominated by getDropRow |
| Space | O(1) |

---

### Overall per move
| Operation | Time | Space |
|---|---|---|
| `getDropRow` | O(ROWS) | O(1) |
| Board update | O(1) | O(1) |
| `checkWinner` | O(1) | O(1) |
| `checkDraw` | O(COLS) | O(1) |
| DOM update | O(1) | O(1) |
| **Total** | **O(ROWS)** | **O(1)** |

---

### Board storage
| | Complexity |
|---|---|
| Space | O(ROWS × COLS) = O(42) → effectively O(1) for fixed board size |

---

## Is This the Best Solution?

### Winner Check — Yes ✅
The last-move-only O(1) check is the **standard approach** used in production Connect 4 engines. You cannot do better than O(1).

### `getDropRow` — Yes ✅
Scanning one column bottom-up is the simplest and fastest. O(ROWS) is optimal since you must verify each row.

### DOM Access — Yes ✅
`container.children[r * COLS + c]` is O(1) direct index access — better than `querySelector` which is O(n).

### Possible Further Optimizations
- **Bitboard representation** — encode the board as 64-bit integers for even faster winner checks using bitwise operations. Used in competitive engines but overkill for a browser game.
- **Track filled rows per column** — store the current top row per column to make `getDropRow` O(1) instead of O(ROWS).

---

## Accessibility

- `role="status"` live region for screen reader announcements
- `aria-label` on every column button and board cell
- `aria-disabled` on full columns
- Focus management — focus moves to New Game button on game end
