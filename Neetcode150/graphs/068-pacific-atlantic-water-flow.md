# 68. Pacific Atlantic Water Flow

**LeetCode Link**: [417. Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)

**Difficulty**: Medium

**Topics**: Array, Depth-First Search, Breadth-First Search, Matrix

---

## Problem Statement

There is an `m x n` rectangular island that borders both the **Pacific Ocean** and **Atlantic Ocean**. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

Water can only flow in four directions: up, down, left, and right. Water flows from a cell to an adjacent cell with an equal or lower height.

Return a 2D list of grid coordinates `result` where `result[i] = [ri, ci]` denotes that rain can flow from cell `(ri, ci)` to **both** the Pacific and Atlantic oceans.

### Examples

**Example 1:**
```
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
```

### Constraints
- `m == heights.length`, `n == heights[i].length`
- `1 <= m, n <= 200`
- `0 <= heights[i][j] <= 10^5`

---

## Approach: DFS from Both Oceans ✅

### Implementation

```javascript
/**
 * DFS from both oceans - O(m*n) time, O(m*n) space
 * @param {number[][]} heights
 * @return {number[][]}
 */
function pacificAtlantic(heights) {
    if (!heights || heights.length === 0) return [];
    
    const rows = heights.length;
    const cols = heights[0].length;
    const pacific = Array.from({ length: rows }, () => new Array(cols).fill(false));
    const atlantic = Array.from({ length: rows }, () => new Array(cols).fill(false));
    
    function dfs(r, c, visited, prevHeight) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r][c] || heights[r][c] < prevHeight) {
            return;
        }
        visited[r][c] = true;
        dfs(r + 1, c, visited, heights[r][c]);
        dfs(r - 1, c, visited, heights[r][c]);
        dfs(r, c + 1, visited, heights[r][c]);
        dfs(r, c - 1, visited, heights[r][c]);
    }
    
    // From Pacific (left and top edges)
    for (let c = 0; c < cols; c++) dfs(0, c, pacific, -1);
    for (let r = 0; r < rows; r++) dfs(r, 0, pacific, -1);
    
    // From Atlantic (right and bottom edges)
    for (let c = 0; c < cols; c++) dfs(rows - 1, c, atlantic, -1);
    for (let r = 0; r < rows; r++) dfs(r, cols - 1, atlantic, -1);
    
    const result = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (pacific[r][c] && atlantic[r][c]) {
                result.push([r, c]);
            }
        }
    }
    
    return result;
}
```

### Complexity Analysis
- **Time**: `O(m * n)` - Each cell visited at most twice
- **Space**: `O(m * n)` - Two visited matrices

---

## Key Takeaways

✅ Reverse thinking: where can water reach the ocean?  
✅ DFS from Pacific edges and Atlantic edges  
✅ Cell reaches both → add to result  
✅ Flow: can go to equal or lower height  

**Pattern**: Multi-source DFS on grid!
