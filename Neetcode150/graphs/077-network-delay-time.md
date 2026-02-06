# 77. Network Delay Time

**LeetCode Link**: [743. Network Delay Time](https://leetcode.com/problems/network-delay-time/)

**Difficulty**: Medium

**Topics**: Depth-First Search, Breadth-First Search, Graph, Heap, Shortest Path

---

## Problem Statement

You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (ui, vi, wi)`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node `k`. Return the **minimum time** it takes for all the `n` nodes to receive the signal. If it is impossible for all nodes to receive the signal, return `-1`.

### Examples

**Example 1:**
```
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
Explanation: From 2, signal reaches 1 and 3 at time 1; 4 at time 2.
```

**Example 2:**
```
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1
```

### Constraints
- `1 <= k <= n <= 100`
- `1 <= times.length <= 6000`

---

## Approach: Dijkstra's Algorithm ✅

### Implementation

```javascript
/**
 * Dijkstra - O(E log V) with min-heap
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
function networkDelayTime(times, n, k) {
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [u, v, w] of times) {
        graph[u].push([v, w]);
    }
    
    const dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;
    
    const minHeap = [[0, k]]; // [time, node]
    
    while (minHeap.length > 0) {
        minHeap.sort((a, b) => a[0] - b[0]); // Simple sort (use proper heap for O(log n))
        const [d, node] = minHeap.shift();
        
        if (d > dist[node]) continue;
        
        for (const [neighbor, w] of graph[node]) {
            const newDist = d + w;
            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                minHeap.push([newDist, neighbor]);
            }
        }
    }
    
    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1;
        maxTime = Math.max(maxTime, dist[i]);
    }
    
    return maxTime;
}
```

### Complexity Analysis
- **Time**: `O(E log V)` with proper min-heap; O(E log E) with sort each time
- **Space**: `O(V)`

---

## Key Takeaways

✅ Single-source shortest path ⇒ Dijkstra  
✅ Return max of all shortest distances (time for last node)  
✅ If any node unreachable (Infinity) return -1  
✅ Min-heap for efficient extract-min  
✅ O(E log V) with heap  

**Pattern**: Shortest path → Dijkstra!
