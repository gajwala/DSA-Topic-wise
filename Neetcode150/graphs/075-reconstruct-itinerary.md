# 75. Reconstruct Itinerary

**LeetCode Link**: [332. Reconstruct Itinerary](https://leetcode.com/problems/reconstruct-itinerary/)

**Difficulty**: Hard

**Topics**: Depth-First Search, Graph, Eulerian Circuit

---

## Problem Statement

You are given a list of airline `tickets` where `tickets[i] = [fromi, toi]` represents the departure and arrival airports of one flight. Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from `"JFK"`, thus the itinerary must begin with `"JFK"`. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.

### Examples

**Example 1:**
```
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]
```

**Example 2:**
```
Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
```

### Constraints
- `1 <= tickets.length <= 300`
- `tickets[i].length == 2`
- `fromi.length == 3` (airport code)

---

## Approach: DFS + Greedy (Eulerian Path) ✅

### Implementation

```javascript
/**
 * DFS - Eulerian path - O(E log E) time, O(E) space
 * @param {string[][]} tickets
 * @return {string[]}
 */
function findItinerary(tickets) {
    const graph = new Map();
    
    for (const [from, to] of tickets) {
        if (!graph.has(from)) graph.set(from, []);
        graph.get(from).push(to);
    }
    
    // Sort so we pick lexicographically smallest first
    for (const [from, list] of graph) {
        list.sort();
    }
    
    const result = [];
    
    function dfs(airport) {
        const list = graph.get(airport);
        while (list && list.length > 0) {
            const next = list.shift(); // Use smallest (already sorted)
            dfs(next);
        }
        result.push(airport); // Post-order: add when leaving
    }
    
    dfs('JFK');
    return result.reverse();
}
```

### Complexity Analysis
- **Time**: `O(E log E)` for sorting, then O(E) DFS
- **Space**: `O(E)`

---

## Key Takeaways

✅ Use all edges exactly once ⇒ Eulerian path  
✅ Build graph, sort adjacency lists for lexical order  
✅ DFS: process smallest neighbor first; add node in post-order  
✅ Reverse result at end  
✅ Greedy: always pick lexicographically smallest next  

**Pattern**: Eulerian path → DFS with sorted neighbors!
