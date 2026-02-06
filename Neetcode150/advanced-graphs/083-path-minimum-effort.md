# 83. Path With Minimum Effort

**LeetCode Link**: [1631. Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/)

**Difficulty**: Medium

**Topics**: Array, Binary Search, Depth-First Search, Breadth-First Search, Union Find, Heap, Matrix

---

## Problem Statement

You are a hiker preparing for an upcoming hike. You are given `heights`, a 2D array of size `rows x columns`, where `heights[row][col]` represents the height of cell `(row, col)`.

You are situated in the top-left cell `(0, 0)`, and you hope to travel to the bottom-right cell `(rows-1, columns-1)`.

The **effort** of a path is the **maximum absolute difference** in heights between two consecutive cells of the path. Return the **minimum effort** required.

### Examples

**Example 1:**
```
Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
Explanation: Path 1->3->5->3->5 has max diff 2.
```

**Example 2:**
```
Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
Output: 1
```

### Constraints
- `rows == heights.length`
- `columns == heights[i].length`
- `1 <= rows, columns <= 100`
- `1 <= heights[i][j] <= 10^6`

---

## Approach: Binary Search + BFS/DFS ✅

### Implementation

```javascript
/**
 * Binary Search on effort + BFS - O(m*n*log(max))
 * @param {number[][]} heights
 * @return {number}
 */
function minimumEffortPath(heights) {
    const rows = heights.length;
    const cols = heights[0].length;
    
    function canReach(maxEffort) {
        const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
        const queue = [[0, 0]];
        visited[0][0] = true;
        const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
        
        while (queue.length > 0) {
            const [r, c] = queue.shift();
            if (r === rows - 1 && c === cols - 1) return true;
            
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
                    const effort = Math.abs(heights[nr][nc] - heights[r][c]);
                    if (effort <= maxEffort) {
                        visited[nr][nc] = true;
                        queue.push([nr, nc]);
                    }
                }
            }
        }
        return false;
    }
    
    let left = 0, right = 1e6;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canReach(mid)) right = mid;
        else left = mid + 1;
    }
    
    return left;
}
```

### Complexity Analysis
- **Time**: `O(m * n * log(max_height))`
- **Space**: `O(m * n)`

---

## Key Takeaways

✅ Minimize maximum absolute difference on path  
✅ Binary search on effort; check reachability with BFS/DFS (only traverse edges with diff ≤ mid)  
✅ O(m*n*log(max))  
✅ Alternative: Dijkstra with "cost" = max effort so far  
✅ Return left after binary search  

**Pattern**: Minimize max edge cost on path → Binary search + BFS or Dijkstra!
