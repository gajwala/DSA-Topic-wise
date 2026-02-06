# 84. Shortest Path in Binary Matrix

**LeetCode Link**: [1091. Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

**Difficulty**: Medium

**Topics**: Array, Breadth-First Search, Matrix

---

## Problem Statement

Given an `n x n` binary matrix `grid`, return the **length of the shortest clear path** in the matrix. If there is no clear path, return `-1`.

A **clear path** in a binary matrix is a path from the top-left cell `(0, 0)` to the bottom-right cell `(n - 1, n - 1)` such that:
- All the visited cells of the path are `0`
- All the adjacent cells of the path are 8-directionally connected

The length of a clear path is the number of visited cells of this path.

### Examples

**Example 1:**
```
Input: grid = [[0,1],[1,0]]
Output: 2
```

**Example 2:**
```
Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
```

**Example 3:**
```
Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1
```

### Constraints
- `n == grid.length == grid[i].length`
- `1 <= n <= 100`
- `grid[i][j]` is 0 or 1

---

## Approach: BFS (8 directions) ✅

### Implementation

```javascript
/**
 * BFS - O(n²) time, O(n²) space
 * @param {number[][]} grid
 * @return {number}
 */
function shortestPathBinaryMatrix(grid) {
    const n = grid.length;
    if (grid[0][0] === 1 || grid[n-1][n-1] === 1) return -1;
    
    const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const queue = [[0, 0, 1]]; // [r, c, length]
    grid[0][0] = 1; // Mark visited
    
    while (queue.length > 0) {
        const [r, c, len] = queue.shift();
        if (r === n - 1 && c === n - 1) return len;
        
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
                grid[nr][nc] = 1;
                queue.push([nr, nc, len + 1]);
            }
        }
    }
    
    return -1;
}
```

### Complexity Analysis
- **Time**: `O(n²)` - Each cell visited at most once
- **Space**: `O(n²)` - Queue

---

## Key Takeaways

✅ Shortest path in unweighted grid ⇒ BFS  
✅ 8 directions: all combinations of [-1,0,1]  
✅ Length = number of cells (including start and end)  
✅ Blocked (1) or out of bounds ⇒ skip  
✅ Return -1 if no path  
✅ O(n²)  

**Pattern**: Shortest path in grid → BFS!

**Advanced Graphs Complete! (6/6) ✅**
