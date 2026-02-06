# 130. Rotate Image

**LeetCode**: [48. Rotate Image](https://leetcode.com/problems/rotate-image/)

**Difficulty**: Medium | **Topics**: Array, Math, Matrix

---

## Problem

You are given an `n x n` 2D matrix representing an image. Rotate the image by 90 degrees clockwise in-place.

---

## Solution: Transpose + reverse each row (or rotate 4 cells per group)

```javascript
function rotate(matrix) {
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    for (let i = 0; i < n; i++) matrix[i].reverse();
}
```

**Time:** O(n²) | **Space:** O(1). **Pattern:** 90° clockwise = transpose + reverse each row.
