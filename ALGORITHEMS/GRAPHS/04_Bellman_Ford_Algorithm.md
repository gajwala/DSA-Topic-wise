# Bellman-Ford Algorithm

## 📚 Theory

The Bellman-Ford Algorithm finds the shortest path from a single source vertex to all other vertices in a weighted graph. Unlike Dijkstra's algorithm, Bellman-Ford **can handle negative edge weights** and can **detect negative cycles**.

**The Bellman-Ford Algorithm only works for Directed graph and if un directed graphs is there then Bellman-Ford Algorithm first will convert to directed like u to v and  v to u**

Named after Richard Bellman and Lester Ford Jr., who published it independently in the 1950s.

## 🎯 Intuition

Think of Bellman-Ford as being more cautious than Dijkstra's:
- Instead of greedily picking the best path, it considers ALL edges repeatedly
- It says: "Let me try to improve every single path, multiple times"
- After V-1 iterations, if there's a valid shortest path, we'll find it
- If we can still improve after V-1 iterations, there must be a negative cycle

It's like checking every possible route multiple times to ensure you haven't missed a shortcut (or found a magic teleporter that makes distances negative).

## 📝 Algorithm Steps

1. **Initialize**:
   - Set distance to source as 0
   - Set distance to all other vertices as infinity

2. **Relax All Edges V-1 Times**:
   - For i = 1 to V-1:
     - For each edge (u, v) with weight w:
       - If distance[u] + w < distance[v]:
         - Update distance[v] = distance[u] + w

3. **Check for Negative Cycles**:
   - For each edge (u, v) with weight w:
     - If distance[u] + w < distance[v]:
       - Negative cycle exists!

## 💻 Implementation

### JavaScript Implementation
```javascript
/**
 * Bellman-Ford algorithm
 * @param {Array} edges - Array of [from, to, weight]
 * @param {number} numVertices - Number of vertices
 * @param {number} source - Starting vertex
 * @returns {Object} - {distances, hasNegativeCycle}
 */
function bellmanFord(edges, numVertices, source) {
  // Initialize distances
  const distances = Array(numVertices).fill(Infinity);
  distances[source] = 0;

  // Relax all edges V-1 times
  for (let i = 0; i < numVertices - 1; i++) {
    for (const [u, v, weight] of edges) {
      if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
        distances[v] = distances[u] + weight;
      }
    }
  }

  // Check for negative cycles
  let hasNegativeCycle = false;
  for (const [u, v, weight] of edges) {
    if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
      hasNegativeCycle = true;
      break;
    }
  }

  return { distances, hasNegativeCycle };
}


/**
 * Bellman-Ford with path reconstruction
 */
function bellmanFordWithPath(edges, numVertices, source) {
  const distances = Array(numVertices).fill(Infinity);
  distances[source] = 0;
  const predecessor = Array(numVertices).fill(-1);

  // Relax edges V-1 times
  for (let i = 0; i < numVertices - 1; i++) {
    for (const [u, v, weight] of edges) {
      if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
        distances[v] = distances[u] + weight;
        predecessor[v] = u;
      }
    }
  }

  // Check for negative cycles
  const negativeCycleVertices = new Set();
  for (const [u, v, weight] of edges) {
    if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
      negativeCycleVertices.add(v);
    }
  }

  /**
   * Reconstruct path from source to destination
   */
  function getPath(destination) {
    if (negativeCycleVertices.has(destination)) {
      return null; // Path affected by negative cycle
    }

    const path = [];
    let current = destination;

    while (current !== -1) {
      path.unshift(current);
      current = predecessor[current];
    }

    return path[0] === source ? path : null;
  }

  return {
    distances,
    predecessor,
    negativeCycleVertices,
    getPath
  };
}


/**
 * Detect negative cycle and return the cycle
 */
function detectNegativeCycle(edges, numVertices) {
  const distances = Array(numVertices).fill(0); // Start all at 0
  const predecessor = Array(numVertices).fill(-1);

  // Relax edges V-1 times
  for (let i = 0; i < numVertices - 1; i++) {
    for (const [u, v, weight] of edges) {
      if (distances[u] + weight < distances[v]) {
        distances[v] = distances[u] + weight;
        predecessor[v] = u;
      }
    }
  }

  // Find vertex affected by negative cycle
  let cycleVertex = -1;
  for (const [u, v, weight] of edges) {
    if (distances[u] + weight < distances[v]) {
      cycleVertex = v;
      predecessor[v] = u;
      break;
    }
  }

  if (cycleVertex === -1) {
    return null; // No negative cycle
  }

  // Go back V steps to ensure we're in the cycle
  for (let i = 0; i < numVertices; i++) {
    cycleVertex = predecessor[cycleVertex];
  }

  // Extract the cycle
  const cycle = [];
  let current = cycleVertex;
  do {
    cycle.push(current);
    current = predecessor[current];
  } while (current !== cycleVertex);
  
  cycle.push(cycleVertex);
  cycle.reverse();

  return cycle;
}


/**
 * Currency arbitrage detection using Bellman-Ford
 */
function findArbitrage(rates) {
  const n = rates.length;
  const edges = [];

  // Convert to negative log for Bellman-Ford
  // -log(rate) converts multiplication to addition
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j && rates[i][j] > 0) {
        const weight = -Math.log(rates[i][j]);
        edges.push([i, j, weight]);
      }
    }
  }

  const distances = Array(n).fill(0);

  // Relax edges n-1 times
  for (let i = 0; i < n - 1; i++) {
    for (const [u, v, w] of edges) {
      if (distances[u] + w < distances[v]) {
        distances[v] = distances[u] + w;
      }
    }
  }

  // Check for negative cycle (arbitrage opportunity)
  for (const [u, v, w] of edges) {
    if (distances[u] + w < distances[v]) {
      return true; // Arbitrage exists!
    }
  }

  return false;
}
```

## 🔍 Example Walkthrough

Consider this graph with negative edge:
```
       -1        3
  A -------> B -----> C
  |          ^        |
  |4         |-2      |2
  |          |        |
  v          |        v
  D ----------        E
```

**Edges**: `[[0,1,-1], [0,3,4], [3,1,-2], [1,2,3], [2,4,2]]`

**Bellman-Ford from A (vertex 0)**:

| Iteration | Edge | Check | Update | Distances |
|-----------|------|-------|--------|-----------|
| Init | - | - | - | [0, ∞, ∞, ∞, ∞] |
| 1 | [0,1,-1] | 0+(-1)<∞ | distances[1]=-1 | [0, -1, ∞, ∞, ∞] |
| 1 | [0,3,4] | 0+4<∞ | distances[3]=4 | [0, -1, ∞, 4, ∞] |
| 1 | [3,1,-2] | 4+(-2)<-1 | distances[1]=2 | [0, 2, ∞, 4, ∞] |
| 1 | [1,2,3] | 2+3<∞ | distances[2]=5 | [0, 2, 5, 4, ∞] |
| 1 | [2,4,2] | 5+2<∞ | distances[4]=7 | [0, 2, 5, 4, 7] |
| 2+ | ... | No more updates | - | [0, 2, 5, 4, 7] |

**Final Shortest Distances from A**: `[0, 2, 5, 4, 7]`

## ⏱️ Time Complexity

- **Time Complexity**: **O(V × E)**
  - V-1 iterations: O(V)
  - Each iteration checks all E edges: O(E)
  - Total: O(V × E)

- **Space Complexity**: **O(V)**
  - Distance array: O(V)
  - Predecessor array: O(V)

## 🎯 When to Use Bellman-Ford

### ✅ Best Use Cases:

1. **Graphs with Negative Edges**
   - When edge weights can be negative
   - Example: Currency exchange with fees

2. **Detecting Negative Cycles**
   - Arbitrage opportunities in currency trading
   - Example: Finding profitable exchange sequences

3. **Distributed Systems**
   - Distance vector routing protocols
   - Example: RIP (Routing Information Protocol)

4. **Small Graphs**
   - When graph is small and simplicity matters
   - Example: Network routing in small networks

### ❌ When NOT to Use Bellman-Ford:

1. **Large Graphs** - Too slow, use Dijkstra's if no negative edges
2. **All Pairs Shortest Path** - Use Floyd-Warshall
3. **Non-negative Weights** - Dijkstra's is faster
4. **Real-time Systems** - Too slow for time-critical applications

## 🔑 Key Properties

1. **Handles Negative Weights**: Works with negative edge weights
2. **Detects Negative Cycles**: Can identify negative cycles
3. **Single Source**: Finds paths from one source
4. **Simple**: Easier to implement than Dijkstra's
5. **Slower**: O(VE) vs Dijkstra's O((V+E)log V)

## 💡 Common Problem Patterns

### Pattern 1: Cheapest Flights Within K Stops
```javascript
/**
 * LeetCode 787: Cheapest Flights Within K Stops
 * Modified Bellman-Ford with stop limit
 */
function findCheapestPrice(n, flights, src, dst, k) {
  let distances = Array(n).fill(Infinity);
  distances[src] = 0;

  // Relax edges k+1 times (k stops = k+1 edges)
  for (let i = 0; i <= k; i++) {
    const temp = [...distances];

    for (const [from, to, price] of flights) {
      if (distances[from] !== Infinity && distances[from] + price < temp[to]) {
        temp[to] = distances[from] + price;
      }
    }

    distances = temp;
  }

  return distances[dst] === Infinity ? -1 : distances[dst];
}
```

### Pattern 2: Network Delay with Negative Edges
```javascript
/**
 * Network delay with some negative edge weights
 */
function networkDelayWithNegative(times, n, k) {
  const { distances, hasNegativeCycle } = bellmanFord(times, n, k - 1);

  if (hasNegativeCycle) {
    return -1; // Invalid network
  }

  const maxDelay = Math.max(...distances);
  return maxDelay === Infinity ? -1 : maxDelay;
}
```

## 🎓 Practice Problems

1. **Medium**:
   - Cheapest Flights Within K Stops (LeetCode 787)
   - Network Delay Time (LeetCode 743)
   - Path with Maximum Probability (LeetCode 1514)

2. **Hard**:
   - Checking Existence of Edge Length Limited Paths (LeetCode 1724)
   - Find Shortest Path with K Hops

## 📊 Comparison with Other Algorithms

| Aspect | Bellman-Ford | Dijkstra's | Floyd-Warshall |
|--------|--------------|------------|----------------|
| Negative Weights | ✅ Yes | ❌ No | ✅ Yes |
| Negative Cycles | ✅ Detects | ❌ No | ✅ Detects |
| Time | O(VE) | O((V+E)log V) | O(V³) |
| Space | O(V) | O(V) | O(V²) |
| Type | Single Source | Single Source | All Pairs |

## ⚠️ Common Mistakes

1. **Not Checking for Negative Cycles**: Always check after V-1 iterations
2. **Infinite Loop**: Negative cycles can cause infinite relaxation
3. **Wrong Initialization**: Source must be 0, others infinity
4. **Undirected Graphs**: Negative edges in undirected graphs create negative cycles

---

**Remember**: Use Bellman-Ford when you need to handle negative weights or detect negative cycles! 🚀

