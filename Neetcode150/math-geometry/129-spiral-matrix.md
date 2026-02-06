# 129. Spiral Matrix

**LeetCode**: [54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)

**Difficulty**: Medium | **Topics**: Array, Matrix, Simulation

---

## Problem

Given an `m x n` matrix, return all elements in spiral order (right, down, left, up, repeat).

---

## Solution: Layer-by-layer (top, right, bottom, left)

```javascript
function spiralOrder(matrix) {
    const result = [];
    let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
    while (top <= bottom && left <= right) {
        for (let c = left; c <= right; c++) result.push(matrix[top][c]);
        top++;
        for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
        right--;
        if (top <= bottom) for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
        bottom--;
        if (left <= right) for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
        left++;
    }
    return result;
}
```

**Time:** O(m*n) | **Space:** O(1) output. **Pattern:** Four loops per layer; shrink boundaries; handle single row/column.
