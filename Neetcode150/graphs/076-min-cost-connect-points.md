# 76. Min Cost to Connect All Points

**LeetCode Link**: [1584. Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/)

**Difficulty**: Medium

**Topics**: Array, Union Find, Graph, Minimum Spanning Tree

---

## Problem Statement

You are given an array `points` representing integer coordinates of some points on a 2D-plane, where `points[i] = [xi, yi]`.

The cost of connecting two points `[xi, yi]` and `[xj, yj]` is the **Manhattan distance**: `|xi - xj| + |yi - yj|`.

Return the minimum cost to make all points connected. All points can be connected in any order.

### Examples

**Example 1:**
```
Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20
```

**Example 2:**
```
Input: points = [[3,12],[-2,5],[-4,1]]
Output: 18
```

### Constraints
- `1 <= points.length <= 1000`
- `-10^6 <= xi, yi <= 10^6`

---

## Approach: Kruskal's (Union Find + Sort Edges) ✅

### Implementation

```javascript
/**
 * Kruskal's MST - O(n² log n) time, O(n²) space
 * @param {number[][]} points
 * @return {number}
 */
function minCostConnectPoints(points) {
    const n = points.length;
    const edges = [];
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const cost = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
            edges.push([cost, i, j]);
        }
    }
    
    edges.sort((a, b) => a[0] - b[0]);
    
    const parent = Array.from({ length: n }, (_, i) => i);
    
    function find(x) {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    }
    
    function union(x, y) {
        const px = find(x), py = find(y);
        if (px === py) return false;
        parent[px] = py;
        return true;
    }
    
    let totalCost = 0;
    let edgesUsed = 0;
    
    for (const [cost, u, v] of edges) {
        if (union(u, v)) {
            totalCost += cost;
            edgesUsed++;
            if (edgesUsed === n - 1) break;
        }
    }
    
    return totalCost;
}
```

### Complexity Analysis
- **Time**: `O(n² log n)` - n² edges, sort, union find
- **Space**: `O(n²)` for edges

---

## Key Takeaways

✅ Minimum cost to connect all = Minimum Spanning Tree  
✅ Kruskal: sort edges by cost, add if doesn't form cycle  
✅ Manhattan distance: |x1-x2| + |y1-y2|  
✅ Need n-1 edges for n nodes  
✅ O(n² log n) with Kruskal  

**Pattern**: Connect all points min cost → MST (Kruskal/Prim)!
