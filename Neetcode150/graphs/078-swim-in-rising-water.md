# 78. Swim in Rising Water

**LeetCode Link**: [778. Swim in Rising Water](https://leetcode.com/problems/swim-in-rising-water/)

**Difficulty**: Hard

**Topics**: Array, Binary Search, Depth-First Search, Breadth-First Search, Union Find, Heap, Matrix

---

## Problem Statement

You are given an `n x n` integer matrix `grid` where each value `grid[i][j]` represents the elevation at that point `(i, j)`.

The rain starts to fall. At time `t`, the depth of the water everywhere is `t`. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most `t`.

Return the least time until you can reach the bottom right square `(n - 1, n - 1)` from the top left square `(0, 0)`.

### Examples

**Example 1:**
```
Input: grid = [[0,2],[1,3]]
Output: 3
Explanation: At t=3, can swim from (0,0) to (1,1).
```

**Example 2:**
```
Input: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
Output: 16
```

### Constraints
- `n == grid.length == grid[i].length`
- `1 <= n <= 50`
- `0 <= grid[i][j] < n²`

---

## Approach 1: Binary Search + DFS ✅

### Implementation

```javascript
/**
 * Binary Search on answer + DFS - O(n² log(max)) time
 * @param {number[][]} grid
 * @return {number}
 */
function swimInWater(grid) {
    const n = grid.length;
    
    function canReach(t) {
        const visited = Array.from({ length: n }, () => new Array(n).fill(false));
        
        function dfs(r, c) {
            if (r < 0 || r >= n || c < 0 || c >= n || visited[r][c] || grid[r][c] > t) return false;
            if (r === n - 1 && c === n - 1) return true;
            visited[r][c] = true;
            return dfs(r+1,c) || dfs(r-1,c) || dfs(r,c+1) || dfs(r,c-1);
        }
        
        return dfs(0, 0);
    }
    
    let left = grid[0][0], right = n * n - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canReach(mid)) right = mid;
        else left = mid + 1;
    }
    
    return left;
}
```

### Complexity Analysis
- **Time**: `O(n² log(max_val))`
- **Space**: `O(n²)`

---

## Approach 2: Min-Heap (Dijkstra-like)

```javascript
function swimInWaterHeap(grid) {
    const n = grid.length;
    const minHeap = [[grid[0][0], 0, 0]]; // [maxElevation, r, c]
    const visited = Array.from({ length: n }, () => new Array(n).fill(false));
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    
    while (minHeap.length > 0) {
        minHeap.sort((a, b) => a[0] - b[0]);
        const [t, r, c] = minHeap.shift();
        if (r === n - 1 && c === n - 1) return t;
        if (visited[r][c]) continue;
        visited[r][c] = true;
        
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
                minHeap.push([Math.max(t, grid[nr][nc]), nr, nc]);
            }
        }
    }
    
    return -1;
}
```

---

## Key Takeaways

✅ Minimum t such that path exists with all cells ≤ t  
✅ Binary search on t + DFS/BFS to check  
✅ Or: Dijkstra-like with "cost" = max elevation on path  
✅ O(n² log max) or O(n² log n²) with heap  

**Pattern**: Minimize max value on path → Binary search + reachability or Dijkstra variant!

**Graphs Complete! (13/13) ✅**
