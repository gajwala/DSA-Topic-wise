# Floyd-Warshall Algorithm

## 📚 Theory

The Floyd-Warshall Algorithm finds the shortest paths between **all pairs** of vertices in a weighted graph. It works with both positive and negative edge weights (but not negative cycles) and uses dynamic programming.

Named after Robert Floyd and Stephen Warshall who refined it in the 1960s (originally by Bernard Roy in 1959).

## 🎯 Intuition

Think of Floyd-Warshall as trying all possible "middlemen":
- Want to go from A to B? Try going through every other vertex
- Maybe A → C → B is shorter than A → B direct
- Maybe A → C → D → B is even shorter
- Try ALL possibilities systematically

The key insight: If the shortest path from i to j goes through vertex k, then it must use the shortest paths from i to k and k to j.

## 📝 Algorithm Steps

1. **Initialize**:
   - Create a distance matrix where dist[i][j] = edge weight if edge exists
   - Set dist[i][i] = 0 for all vertices
   - Set dist[i][j] = ∞ if no direct edge

2. **Dynamic Programming**:
   - For each vertex k (intermediate vertex):
     - For each vertex i (source):
       - For each vertex j (destination):
         - If dist[i][k] + dist[k][j] < dist[i][j]:
           - Update dist[i][j] = dist[i][k] + dist[k][j]

3. **Negative Cycle Detection**:
   - If any dist[i][i] < 0, negative cycle exists

## 💻 Implementation

### JavaScript Implementation
```javascript
/**
 * Floyd-Warshall algorithm
 * @param {number[][]} graph - Adjacency matrix
 * @returns {number[][]} - Distance matrix with shortest paths
 */
function floydWarshall(graph) {
  const n = graph.length;
  
  // Initialize distance matrix (copy input)
  const dist = Array(n).fill(null)
    .map((_, i) => [...graph[i]]);

  // Floyd-Warshall algorithm
  for (let k = 0; k < n; k++) {        // Intermediate vertex
    for (let i = 0; i < n; i++) {      // Source vertex
      for (let j = 0; j < n; j++) {    // Destination vertex
        // If going through k is shorter
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  return dist;
}


/**
 * Floyd-Warshall with path reconstruction
 */
function floydWarshallWithPath(graph) {
  const n = graph.length;
  
  // Initialize distance and next vertex matrices
  const dist = Array(n).fill(null).map((_, i) => [...graph[i]]);
  const next = Array(n).fill(null).map(() => Array(n).fill(null));

  // Initialize next matrix
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[i][j] !== Infinity && i !== j) {
        next[i][j] = j;
      }
    }
  }

  // Floyd-Warshall
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  /**
   * Reconstruct path from i to j
   */
  function getPath(i, j) {
    if (next[i][j] === null) return null;
    
    const path = [i];
    while (i !== j) {
      i = next[i][j];
      path.push(i);
    }
    return path;
  }

  return { dist, getPath };
}


/**
 * Floyd-Warshall with negative cycle detection
 */
function floydWarshallWithCycleDetection(graph) {
  const n = graph.length;
  const dist = Array(n).fill(null).map((_, i) => [...graph[i]]);

  // Run Floyd-Warshall
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  // Check for negative cycles (negative diagonal values)
  for (let i = 0; i < n; i++) {
    if (dist[i][i] < 0) {
      return { dist: null, hasNegativeCycle: true };
    }
  }

  return { dist, hasNegativeCycle: false };
}


/**
 * Find transitive closure (reachability)
 */
function transitiveClosure(graph) {
  const n = graph.length;
  const reach = Array(n).fill(null)
    .map((_, i) => Array(n).fill(false));

  // Initialize: direct edges and self-loops
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      reach[i][j] = (graph[i][j] !== Infinity) || (i === j);
    }
  }

  // Floyd-Warshall for reachability
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        reach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j]);
      }
    }
  }

  return reach;
}
```

## 🔍 Example Walkthrough

Consider this graph:
```
       5
  0 -----> 1
  |        |
  |10      |3
  |        |
  v        v
  3 <----- 2
      1
```

**Initial Distance Matrix**:
```javascript
const graph = [
  [0, 5, Infinity, 10],
  [Infinity, 0, 3, Infinity],
  [Infinity, Infinity, 0, 1],
  [Infinity, Infinity, Infinity, 0]
];
```

**After Floyd-Warshall**:
```javascript
[
  [0, 5, 8, 9],   // 0→1→2 = 8, 0→1→2→3 = 9
  [Infinity, 0, 3, 4],   // 1→2→3 = 4
  [Infinity, Infinity, 0, 1],
  [Infinity, Infinity, Infinity, 0]
]
```

## ⏱️ Time Complexity

- **Time Complexity**: **O(V³)**
  - Three nested loops over V vertices
  - Cannot be improved asymptotically
  - Very predictable performance

- **Space Complexity**: **O(V²)**
  - Distance matrix: O(V²)
  - Path reconstruction adds another O(V²)

## 🎯 When to Use Floyd-Warshall

### ✅ Best Use Cases:

1. **All Pairs Shortest Path**
   - Need distances between ALL pairs of vertices
   - Example: Distance matrix for multiple route planning

2. **Dense Graphs**
   - When graph has many edges (E ≈ V²)
   - Example: Complete or nearly complete graphs

3. **Small Graphs**
   - When V is small (typically V < 400)
   - Example: City-to-city distances in a region

4. **Transitive Closure**
   - Finding reachability between all pairs
   - Example: Determining if one person can influence another

### ❌ When NOT to Use Floyd-Warshall:

1. **Large Graphs** - O(V³) is too slow
2. **Sparse Graphs** - Run Dijkstra's V times instead
3. **Single Source** - Overkill, use Dijkstra's or Bellman-Ford
4. **Real-time Systems** - Too computationally expensive

## 🔑 Key Properties

1. **All Pairs**: Computes shortest paths for all vertex pairs
2. **Simple**: Very easy to implement (3 nested loops)
3. **Handles Negative Weights**: Works with negative edges
4. **Detects Negative Cycles**: Can identify negative cycles
5. **Dynamic Programming**: Builds solution incrementally

## 💡 Common Problem Patterns

### Pattern 1: Find City With Smallest Number of Neighbors
```javascript
/**
 * LeetCode 1334: Find the City With the Smallest Number of Neighbors
 */
function findTheCity(n, edges, distanceThreshold) {
  // Initialize distance matrix
  const dist = Array(n).fill(null)
    .map(() => Array(n).fill(Infinity));
  
  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
  }

  for (const [u, v, w] of edges) {
    dist[u][v] = w;
    dist[v][u] = w; // Undirected graph
  }

  // Floyd-Warshall
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }

  // Count reachable cities for each city
  let minCount = n;
  let resultCity = 0;

  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = 0; j < n; j++) {
      if (i !== j && dist[i][j] <= distanceThreshold) {
        count++;
      }
    }

    // Choose city with smallest count (tie: choose larger city number)
    if (count <= minCount) {
      minCount = count;
      resultCity = i;
    }
  }

  return resultCity;
}
```

### Pattern 2: Check if Path Exists
```javascript
/**
 * Check if path exists between all pairs
 */
function canReachAll(n, edges) {
  const graph = Array(n).fill(null)
    .map(() => Array(n).fill(Infinity));
  
  for (let i = 0; i < n; i++) {
    graph[i][i] = 0;
  }

  for (const [u, v] of edges) {
    graph[u][v] = 1;
  }

  const dist = floydWarshall(graph);

  // Check if all pairs are reachable
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (dist[i][j] === Infinity) {
        return false;
      }
    }
  }

  return true;
}
```

## 🎓 Practice Problems

1. **Medium**:
   - Find the City With the Smallest Number of Neighbors (LeetCode 1334)
   - Network Delay Time (LeetCode 743)
   - Evaluate Division (LeetCode 399)

2. **Hard**:
   - Minimum Cost to Reach Destination in Time (LeetCode 1928)
   - Shortest Path Visiting All Nodes (LeetCode 847)

## 📊 Comparison with Other Algorithms

| Aspect | Floyd-Warshall | Dijkstra (×V) | Bellman-Ford (×V) |
|--------|----------------|---------------|-------------------|
| Time | O(V³) | O(V² log V + VE log V) | O(V²E) |
| Space | O(V²) | O(V²) | O(V²) |
| Negative Weights | ✅ Yes | ❌ No | ✅ Yes |
| Use Case | Dense, All pairs | Sparse, All pairs | Small, Negative edges |
| Implementation | Simplest | Medium | Simple |

## ⚠️ Common Mistakes

1. **Loop Order**: k must be outermost loop
2. **Initialization**: Forget to set diagonal to 0
3. **Undirected Graphs**: Forget to add both directions
4. **Negative Cycles**: Don't check diagonal after algorithm
5. **INF Arithmetic**: INF + INF might overflow

---

**Remember**: Floyd-Warshall is your go-to for all-pairs shortest paths on small to medium graphs! 🚀

