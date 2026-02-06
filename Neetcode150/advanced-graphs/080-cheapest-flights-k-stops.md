# 80. Cheapest Flights Within K Stops

**LeetCode Link**: [787. Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

**Difficulty**: Medium

**Topics**: Dynamic Programming, Depth-First Search, Breadth-First Search, Graph, Heap, Shortest Path

---

## Problem Statement

There are `n` cities connected by some number of flights. You are given an array `flights` where `flights[i] = [fromi, toi, pricei]` indicates that there is a flight from city `fromi` to city `toi` with cost `pricei`.

You are also given three integers `src`, `dst`, and `k`, return the **cheapest price** from `src` to `dst` with at most `k` stops. If no such route exists, return `-1`.

### Examples

**Example 1:**
```
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation: 0 -> 1 -> 3 (1 stop, cost 100+600=700)
```

**Example 2:**
```
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
Explanation: 0 -> 1 -> 2 (1 stop)
```

### Constraints
- `1 <= n <= 100`
- `0 <= flights.length <= (n * (n - 1) / 2)`
- `0 <= k < n`

---

## Approach: Bellman-Ford / BFS with Cost ✅

### Implementation

```javascript
/**
 * BFS with cost (relax up to k+1 steps) - O(E * K) time
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
function findCheapestPrice(n, flights, src, dst, k) {
    let prices = new Array(n).fill(Infinity);
    prices[src] = 0;
    
    for (let i = 0; i <= k; i++) {
        const nextPrices = [...prices];
        for (const [from, to, price] of flights) {
            if (prices[from] !== Infinity) {
                nextPrices[to] = Math.min(nextPrices[to], prices[from] + price);
            }
        }
        prices = nextPrices;
    }
    
    return prices[dst] === Infinity ? -1 : prices[dst];
}
```

### Complexity Analysis
- **Time**: `O((k+1) * E)` = O(E * K)
- **Space**: `O(n)`

---

## Alternative: Dijkstra with Stop Count

```javascript
function findCheapestPriceDijkstra(n, flights, src, dst, k) {
    const graph = Array.from({ length: n }, () => []);
    for (const [from, to, price] of flights) {
        graph[from].push([to, price]);
    }
    
    const minHeap = [[0, src, 0]]; // [cost, city, stops]
    
    while (minHeap.length > 0) {
        minHeap.sort((a, b) => a[0] - b[0]);
        const [cost, city, stops] = minHeap.shift();
        
        if (city === dst) return cost;
        if (stops > k) continue;
        
        for (const [to, price] of graph[city]) {
            minHeap.push([cost + price, to, stops + 1]);
        }
    }
    
    return -1;
}
```

---

## Key Takeaways

✅ At most K stops ⇒ at most K+1 edges  
✅ Bellman-Ford style: relax edges (k+1) times  
✅ Or Dijkstra with (city, stops) state; skip if stops > k  
✅ O(E*K) or O(E log V) with heap  
✅ Return -1 if unreachable  

**Pattern**: Shortest path with constraint (stops) → Bellman-Ford or modified Dijkstra!
