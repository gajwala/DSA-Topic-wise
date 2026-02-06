# 71. Number of Connected Components in an Undirected Graph

**LeetCode Link**: [323. Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

**Difficulty**: Medium

**Topics**: Depth-First Search, Breadth-First Search, Union Find, Graph

---

## Problem Statement

You have a graph of `n` nodes. You are given an integer `n` and an array `edges` where `edges[i] = [ai, bi]` indicates that there is an edge between `ai` and `bi`.

Return the number of connected components in the graph.

### Examples

**Example 1:**
```
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2

0-1-2   and  3-4
```

**Example 2:**
```
Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
Output: 1
```

### Constraints
- `1 <= n <= 2000`
- `0 <= edges.length <= 5000`

---

## Approach 1: DFS ✅

### Implementation

```javascript
/**
 * DFS - O(V+E) time, O(V) space
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
function countComponents(n, edges) {
    const graph = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        graph[a].push(b);
        graph[b].push(a);
    }
    
    const visited = new Set();
    let count = 0;
    
    function dfs(node) {
        visited.add(node);
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) dfs(neighbor);
        }
    }
    
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            count++;
            dfs(i);
        }
    }
    
    return count;
}
```

### Complexity Analysis
- **Time**: `O(V + E)`
- **Space**: `O(V)`

---

## Approach 2: Union Find

```javascript
function countComponentsUF(n, edges) {
    const parent = Array.from({ length: n }, (_, i) => i);
    
    function find(x) {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    function union(x, y) {
        const px = find(x), py = find(y);
        if (px !== py) parent[px] = py;
    }
    
    for (const [a, b] of edges) {
        union(a, b);
    }
    
    const roots = new Set();
    for (let i = 0; i < n; i++) roots.add(find(i));
    return roots.size;
}
```

---

## Key Takeaways

✅ Count DFS/BFS starts = number of components  
✅ Build undirected graph (both directions)  
✅ Union Find alternative: count distinct roots  
✅ O(V+E) time  

**Pattern**: Connected components → DFS or Union Find!
