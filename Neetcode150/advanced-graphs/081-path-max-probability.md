# 81. Path with Maximum Probability

**LeetCode Link**: [1514. Path with Maximum Probability](https://leetcode.com/problems/path-with-maximum-probability/)

**Difficulty**: Medium

**Topics**: Array, Graph, Heap, Shortest Path

---

## Problem Statement

You are given an undirected weighted graph of `n` nodes (0-indexed), represented by an edge list where `edges[i] = [a, b, successProb]` denotes an edge between nodes `a` and `b` with success probability `successProb` of traversing that edge.

Given two nodes `start` and `end`, find the path with the maximum probability of success to go from `start` to `end` and return its success probability. If there is no path from `start` to `end`, return `0`.

### Examples

**Example 1:**
```
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25000
Explanation: 0->1->2 has prob 0.5*0.5=0.25; 0->2 has 0.2. Max = 0.25
```

**Example 2:**
```
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
Output: 0.30000
```

### Constraints
- `2 <= n <= 10^4`
- `0 <= start, end < n`
- `start != end`

---

## Approach: Modified Dijkstra (Max-Heap on Probability) ✅

### Implementation

```javascript
/**
 * Dijkstra with max probability - O(E log V)
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
function maxProbability(n, edges, succProb, start, end) {
    const graph = Array.from({ length: n }, () => []);
    for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        const p = succProb[i];
        graph[a].push([b, p]);
        graph[b].push([a, p]);
    }
    
    const maxProb = new Array(n).fill(0);
    maxProb[start] = 1;
    
    const maxHeap = [[1, start]]; // [prob, node]
    
    while (maxHeap.length > 0) {
        maxHeap.sort((a, b) => b[0] - a[0]); // Max first
        const [prob, node] = maxHeap.shift();
        
        if (node === end) return prob;
        if (prob < maxProb[node]) continue;
        
        for (const [neighbor, edgeProb] of graph[node]) {
            const newProb = prob * edgeProb;
            if (newProb > maxProb[neighbor]) {
                maxProb[neighbor] = newProb;
                maxHeap.push([newProb, neighbor]);
            }
        }
    }
    
    return 0;
}
```

### Complexity Analysis
- **Time**: `O(E log V)` with proper max-heap
- **Space**: `O(V)`

---

## Key Takeaways

✅ Maximize product of edge probabilities  
✅ Same as "shortest path" but maximize product: use max-heap, relax when new prob > current  
✅ Initialize start with 1, others 0  
✅ Return 0 if no path  
✅ O(E log V)  

**Pattern**: Max probability path → Dijkstra with max-heap and product!
