# 73. Redundant Connection

**LeetCode Link**: [684. Redundant Connection](https://leetcode.com/problems/redundant-connection/)

**Difficulty**: Medium

**Topics**: Depth-First Search, Breadth-First Search, Union Find, Graph

---

## Problem Statement

In this problem, a tree is an **undirected graph** that is connected and has no cycles. You are given a graph that started as a tree with `n` nodes labeled from `1` to `n`, with one additional edge added. The added edge has two different vertices chosen from `1` to `n`, and was not an edge that already existed.

Return an edge that can be removed so that the resulting graph is a tree of `n` nodes. If there are multiple answers, return the answer that occurs last in the input.

### Examples

**Example 1:**
```
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
```

**Example 2:**
```
Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
```

### Constraints
- `n == edges.length`
- `3 <= n <= 1000`
- `edges[i].length == 2`

---

## Approach: Union Find ✅

### Implementation

```javascript
/**
 * Union Find - O(n) time, O(n) space
 * @param {number[][]} edges
 * @return {number[]}
 */
function findRedundantConnection(edges) {
    const n = edges.length;
    const parent = Array.from({ length: n + 1 }, (_, i) => i);
    
    function find(x) {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    function union(x, y) {
        const px = find(x), py = find(y);
        if (px === py) return false; // Cycle - this edge is redundant
        parent[px] = py;
        return true;
    }
    
    for (const [a, b] of edges) {
        if (!union(a, b)) return [a, b]; // Last redundant edge
    }
    
    return [];
}
```

### Complexity Analysis
- **Time**: `O(n * α(n))` ≈ O(n)
- **Space**: `O(n)`

---

## Key Takeaways

✅ Tree + one extra edge ⇒ exactly one cycle  
✅ Process edges in order; first edge that connects already-connected nodes is redundant  
✅ Return last such edge per problem  
✅ Union Find: union returns false when cycle detected  

**Pattern**: Find edge that creates cycle → Union Find!
