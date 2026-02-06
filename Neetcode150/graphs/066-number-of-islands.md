# 66. Number of Islands

**LeetCode Link**: [200. Number of Islands](https://leetcode.com/problems/number-of-islands/)

**Difficulty**: Medium

**Topics**: Array, Depth-First Search, Breadth-First Search, Union Find, Matrix

---

## Problem Statement

Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

### Examples

**Example 1:**
```
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

**Example 2:**
```
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

### Constraints
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j]` is `'0'` or `'1'`

---

## Approach 1: DFS (Optimal!) ✅

### Implementation

```javascript
/**
 * DFS - O(m*n) time, O(m*n) space
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            return;
        }
        
        grid[r][c] = '0'; // Mark as visited
        
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    
    return count;
}
```

### Complexity Analysis
- **Time**: `O(m * n)` - Each cell visited at most once
- **Space**: `O(m * n)` - Recursion stack in worst case

---

## Approach 2: BFS

```javascript
function numIslandsBFS(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    let count = 0;
    
    function bfs(r, c) {
        const queue = [[r, c]];
        grid[r][c] = '0';
        
        while (queue.length > 0) {
            const [row, col] = queue.shift();
            for (const [dr, dc] of dirs) {
                const nr = row + dr, nc = col + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
                    grid[nr][nc] = '0';
                    queue.push([nr, nc]);
                }
            }
        }
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                bfs(r, c);
            }
        }
    }
    
    return count;
}
```

---

## Key Takeaways

✅ DFS or BFS from each unvisited '1'  
✅ Mark visited by flipping to '0' (or use visited set)  
✅ Count number of times we start a new DFS/BFS  
✅ O(m*n) time and space  

**Pattern**: Connected components in grid → DFS/BFS!
