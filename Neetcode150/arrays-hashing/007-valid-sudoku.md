# 7. Valid Sudoku

**LeetCode Link**: [36. Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)

**Difficulty**: Medium

**Topics**: Array, Hash Table, Matrix

---

## Problem Statement

Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

1. Each row must contain the digits `1-9` without repetition.
2. Each column must contain the digits `1-9` without repetition.
3. Each of the nine `3 x 3` sub-boxes must contain the digits `1-9` without repetition.

**Note:**
- A Sudoku board (partially filled) could be valid but is not necessarily solvable.
- Only the filled cells need to be validated according to the rules.

### Examples

**Example 1:**
```
Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]

Output: true
```

**Example 2:**
```
Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]  ← Two 8's in column 0
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]

Output: false
```

### Constraints
- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` is a digit `1-9` or `'.'`

---

## Approach 1: Brute Force (Check Each Rule Separately)

### Intuition
Check each row, each column, and each 3×3 box separately for duplicates.

### Implementation

```javascript
/**
 * Brute Force - Multiple passes
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
    // Check all rows
    for (let row = 0; row < 9; row++) {
        const seen = new Set();
        for (let col = 0; col < 9; col++) {
            const cell = board[row][col];
            if (cell !== '.') {
                if (seen.has(cell)) return false;
                seen.add(cell);
            }
        }
    }
    
    // Check all columns
    for (let col = 0; col < 9; col++) {
        const seen = new Set();
        for (let row = 0; row < 9; row++) {
            const cell = board[row][col];
            if (cell !== '.') {
                if (seen.has(cell)) return false;
                seen.add(cell);
            }
        }
    }
    
    // Check all 3×3 boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            const seen = new Set();
            
            // Check 3×3 box
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const row = boxRow * 3 + i;
                    const col = boxCol * 3 + j;
                    const cell = board[row][col];
                    
                    if (cell !== '.') {
                        if (seen.has(cell)) return false;
                        seen.add(cell);
                    }
                }
            }
        }
    }
    
    return true;
}
```

### Complexity Analysis
- **Time Complexity**: `O(1)` - Fixed 9×9 board, but inefficient (3 complete passes)
- **Space Complexity**: `O(1)` - Fixed size sets

### Can we do it in one pass?

---

## Approach 2: Single Pass with Hash Sets (Optimal) ✅

### Intuition
Use hash sets to track seen numbers in rows, columns, and boxes. Check all three rules simultaneously in one pass.

### Algorithm
1. Create sets for each row, column, and 3×3 box
2. Iterate through entire board once
3. For each non-empty cell, check if number exists in:
   - Its row's set
   - Its column's set
   - Its box's set
4. If found in any, return false; otherwise add to all three sets

### Implementation

```javascript
/**
 * Optimal - Single Pass
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
    // Create sets for rows, columns, and boxes
    const rows = Array.from({ length: 9 }, () => new Set());
    const cols = Array.from({ length: 9 }, () => new Set());
    const boxes = Array.from({ length: 9 }, () => new Set());
    
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = board[row][col];
            
            if (cell === '.') continue;
            
            // Calculate box index
            const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
            
            // Check if number already exists
            if (rows[row].has(cell) || 
                cols[col].has(cell) || 
                boxes[boxIndex].has(cell)) {
                return false;
            }
            
            // Add to sets
            rows[row].add(cell);
            cols[col].add(cell);
            boxes[boxIndex].add(cell);
        }
    }
    
    return true;
}

// Test
const board1 = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
];

console.log(isValidSudoku(board1)); // true
```

### Complexity Analysis
- **Time Complexity**: `O(1)` - Fixed 9×9 = 81 cells
- **Space Complexity**: `O(1)` - 9 sets × 3 types = 27 sets (constant)

---

## Approach 3: String Keys (Alternative) ✅

### Intuition
Instead of multiple sets, use a single set with encoded keys like `"4 in row 0"`, `"4 in col 2"`, `"4 in box 1"`.

### Implementation

```javascript
/**
 * String Keys Approach
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
    const seen = new Set();
    
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = board[row][col];
            
            if (cell === '.') continue;
            
            // Create unique keys
            const rowKey = `${cell} in row ${row}`;
            const colKey = `${cell} in col ${col}`;
            const boxKey = `${cell} in box ${Math.floor(row/3)}-${Math.floor(col/3)}`;
            
            // Check if any key exists
            if (seen.has(rowKey) || seen.has(colKey) || seen.has(boxKey)) {
                return false;
            }
            
            // Add all keys
            seen.add(rowKey);
            seen.add(colKey);
            seen.add(boxKey);
        }
    }
    
    return true;
}
```

### Complexity Analysis
- **Time Complexity**: `O(1)` - Fixed board size
- **Space Complexity**: `O(1)` - At most 81 × 3 = 243 keys (constant)

---

## Box Index Calculation

Understanding how to map (row, col) to box index:

```
Box Layout:
┌───┬───┬───┐
│ 0 │ 1 │ 2 │
├───┼───┼───┤
│ 3 │ 4 │ 5 │
├───┼───┼───┤
│ 6 │ 7 │ 8 │
└───┴───┴───┘

Formula: boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3)

Examples:
(0, 0) → floor(0/3)*3 + floor(0/3) = 0*3 + 0 = 0 ✓
(0, 4) → floor(0/3)*3 + floor(4/3) = 0*3 + 1 = 1 ✓
(2, 8) → floor(2/3)*3 + floor(8/3) = 0*3 + 2 = 2 ✓
(4, 4) → floor(4/3)*3 + floor(4/3) = 1*3 + 1 = 4 ✓
(8, 8) → floor(8/3)*3 + floor(8/3) = 2*3 + 2 = 8 ✓
```

---

## Visual Example

```
Board (partial):
┌─────┬─────┬─────┐
│ 5 3 . │ . 7 . │ . . . │
│ 6 . . │ 1 9 5 │ . . . │
│ . 9 8 │ . . . │ . 6 . │
├─────┼─────┼─────┤
│ 8 . . │ . 6 . │ . . 3 │
│ 4 . . │ 8 . 3 │ . . 1 │
│ 7 . . │ . 2 . │ . . 6 │
├─────┼─────┼─────┤
│ . 6 . │ . . . │ 2 8 . │
│ . . . │ 4 1 9 │ . . 5 │
│ . . . │ . 8 . │ . 7 9 │
└─────┴─────┴─────┘

Checking cell (0, 0) = '5':
- Row 0: {5} ✓
- Col 0: {5} ✓
- Box 0: {5} ✓

Checking cell (0, 1) = '3':
- Row 0: {5, 3} ✓
- Col 1: {3} ✓
- Box 0: {5, 3} ✓

... continue for all cells
```

---

## Edge Cases

```javascript
// All empty
const allEmpty = Array(9).fill(null).map(() => Array(9).fill('.'));
console.log(isValidSudoku(allEmpty)); // true

// Single number repeated in row
const invalidRow = [
    ["5","5",".",".",".",".",".",".","9"],
    // ... rest empty
];
console.log(isValidSudoku(invalidRow)); // false

// Single number repeated in column
const board = Array(9).fill(null).map(() => Array(9).fill('.'));
board[0][0] = '5';
board[1][0] = '5';
console.log(isValidSudoku(board)); // false

// Single number repeated in box
const board2 = Array(9).fill(null).map(() => Array(9).fill('.'));
board2[0][0] = '5';
board2[1][1] = '5';
console.log(isValidSudoku(board2)); // false (same box)
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Should I validate the entire board or just check for conflicts? Just conflicts. Okay."

2. **Constraints**: "Board is always 9×9, cells are 1-9 or '.'"

3. **Three rules**: "Need to check rows, columns, and 3×3 boxes"

4. **Approach**: "I'll use hash sets to track seen numbers in one pass - O(1) time and space"

5. **Box calculation**: "Box index is calculated as floor(row/3)*3 + floor(col/3)"

### Follow-up Questions:

**Q: What if board size is variable (n×n)?**
```javascript
function isValidSudokuGeneral(board, n) {
    const boxSize = Math.sqrt(n);
    const rows = Array.from({ length: n }, () => new Set());
    const cols = Array.from({ length: n }, () => new Set());
    const boxes = Array.from({ length: n }, () => new Set());
    
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            const cell = board[row][col];
            if (cell === '.') continue;
            
            const boxIndex = Math.floor(row/boxSize) * boxSize + 
                            Math.floor(col/boxSize);
            
            if (rows[row].has(cell) || 
                cols[col].has(cell) || 
                boxes[boxIndex].has(cell)) {
                return false;
            }
            
            rows[row].add(cell);
            cols[col].add(cell);
            boxes[boxIndex].add(cell);
        }
    }
    
    return true;
}
```

**Q: Can you solve the Sudoku (not just validate)?**
A: Yes, using backtracking - place numbers 1-9, validate, recurse. Backtrack on invalid.

---

## Related Problems

- [37. Sudoku Solver](https://leetcode.com/problems/sudoku-solver/)
- [73. Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)
- [48. Rotate Image](https://leetcode.com/problems/rotate-image/)

---

## Key Takeaways

✅ Use hash sets for duplicate detection  
✅ Single pass is more efficient than three passes  
✅ Box index formula: `floor(row/3)*3 + floor(col/3)`  
✅ String keys can simplify code (trade-off)  
✅ O(1) time and space for fixed-size board  

**Pattern**: Matrix validation with multiple constraints → Hash sets per dimension!
