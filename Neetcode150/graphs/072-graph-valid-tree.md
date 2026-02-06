# 72. Graph Valid Tree

**LeetCode Link**: [261. Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/)

**Difficulty**: Medium

**Topics**: Depth-First Search, Breadth-First Search, Union Find, Graph

---

## Problem Statement

You are given an integer `n` and a list of edges. Determine if the graph is a valid tree.

A valid tree has:
1. Exactly `n - 1` edges
2. All nodes connected (one component)
3. No cycles

### Examples

**Example 1:**
```
Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true
```

**Example 2:**
```
Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false (cycle)
```

### Constraints
- `1 <= n <= 2000`
- `0 <= edges.length <= 5000`

---

## Approach: Union Find or DFS ✅

### Implementation (Union Find)

```javascript
/**
 * Union Find - O(V+E) time, O(V) space
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
function validTree(n, edges) {
    if (edges.length !== n - 1) return false; // Must have exactly n-1 edges
    
    const parent = Array.from({ length: n }, (_, i) => i);
    
    function find(x) {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    function union(x, y) {
        const px = find(x), py = find(y);
        if (px === py) return false; // Cycle!
        parent[px] = py;
        return true;
    }
    
    for (const [a, b] of edges) {
        if (!union(a, b)) return false; // Cycle detected
    }
    
    return true;
}
```

### DFS (cycle + single component)

```javascript
function validTreeDFS(n, edges) {
    if (edges.length !== n - 1) return false;
    
    const graph = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        graph[a].push(b);
        graph[b].push(a);
    }
    
    const visited = new Set();
    
    function hasCycle(node, parent) {
        visited.add(node);
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                if (hasCycle(neighbor, node)) return true;
            } else if (neighbor !== parent) {
                return true; // Back edge = cycle
            }
        }
        return false;
    }
    
    if (hasCycle(0, -1)) return false;
    return visited.size === n; // All connected
}
```

### Complexity Analysis
- **Time**: `O(V + E)`
- **Space**: `O(V)`

---

## Key Takeaways

✅ Valid tree ⟺ connected + acyclic + exactly n-1 edges  
✅ Quick check: edges.length === n - 1  
✅ Union Find: cycle if union same component  
✅ DFS: back edge (to non-parent) = cycle  

**Pattern**: Valid tree → edge count + cycle check!
