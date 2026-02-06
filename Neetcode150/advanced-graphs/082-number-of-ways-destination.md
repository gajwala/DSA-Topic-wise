# 82. Number of Ways to Arrive at Destination

**LeetCode Link**: [1976. Number of Ways to Arrive at Destination](https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/)

**Difficulty**: Medium

**Topics**: Dynamic Programming, Graph, Topological Sort, Shortest Path

---

## Problem Statement

You are in a city that consists of `n` intersections numbered from `0` to `n - 1` with **bi-directional** roads between some intersections. You are given an integer `n` and a 2D array `roads` where `roads[i] = [ui, vi, timei]` means there is a road between `ui` and `vi` that takes `timei` minutes to travel.

You want to know in how many ways you can travel from intersection `0` to intersection `n - 1` in the **shortest amount of time**. Return the number of ways modulo `10^9 + 7`.

### Examples

**Example 1:**
```
Input: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
Output: 4
```

**Example 2:**
```
Input: n = 2, roads = [[1,0,10]]
Output: 1
```

### Constraints
- `1 <= n <= 200`
- `n - 1 <= roads.length <= n*(n-1)/2`

---

## Approach: Dijkstra + Count Paths ✅

### Implementation

```javascript
/**
 * Dijkstra + count ways - O(E log V)
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
function countPaths(n, roads) {
    const MOD = 1e9 + 7;
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v, time] of roads) {
        graph[u].push([v, time]);
        graph[v].push([u, time]);
    }
    
    const dist = new Array(n).fill(Infinity);
    const ways = new Array(n).fill(0);
    dist[0] = 0;
    ways[0] = 1;
    
    const minHeap = [[0, 0]]; // [time, node]
    
    while (minHeap.length > 0) {
        minHeap.sort((a, b) => a[0] - b[0]);
        const [d, node] = minHeap.shift();
        
        if (d > dist[node]) continue;
        
        for (const [neighbor, time] of graph[node]) {
            const newDist = d + time;
            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                ways[neighbor] = ways[node];
                minHeap.push([newDist, neighbor]);
            } else if (newDist === dist[neighbor]) {
                ways[neighbor] = (ways[neighbor] + ways[node]) % MOD;
            }
        }
    }
    
    return ways[n - 1];
}
```

### Complexity Analysis
- **Time**: `O(E log V)`
- **Space**: `O(V)`

---

## Key Takeaways

✅ Shortest path + count number of shortest paths  
✅ Dijkstra: when relaxing, if newDist < dist → ways[neighbor] = ways[node]; if newDist === dist → ways[neighbor] += ways[node]  
✅ Mod 10^9+7  
✅ O(E log V)  

**Pattern**: Count shortest paths → Dijkstra + ways array!
