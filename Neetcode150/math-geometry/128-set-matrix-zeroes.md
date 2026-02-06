# 128. Set Matrix Zeroes

**LeetCode**: [73. Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)

**Difficulty**: Medium | **Topics**: Array, Hash Table, Matrix

---

## Problem

Given an `m x n` matrix, if an element is 0, set its entire row and column to 0. Do it in-place.

---

## Solution: Use first row and first column as markers (O(1) space)

```javascript
function setZeroes(matrix) {
    const rows = matrix.length, cols = matrix[0].length;
    let col0 = false;
    for (let r = 0; r < rows; r++) {
        if (matrix[r][0] === 0) col0 = true;
        for (let c = 1; c < cols; c++) {
            if (matrix[r][c] === 0) matrix[r][0] = matrix[0][c] = 0;
        }
    }
    for (let r = rows - 1; r >= 0; r--) {
        for (let c = cols - 1; c >= 1; c--) {
            if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;
        }
        if (col0) matrix[r][0] = 0;
    }
}
```

**Time:** O(m*n) | **Space:** O(1). **Pattern:** Mark zero rows/cols in first row and first column; then fill from bottom-right to avoid overwriting markers.
