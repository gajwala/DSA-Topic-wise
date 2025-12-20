# Kruskal's & Prim's Algorithms (Minimum Spanning Tree)

## 📚 Theory

**Minimum Spanning Tree (MST)** is a subset of edges that connects all vertices in a weighted, undirected graph with the minimum total edge weight, without any cycles.

- **Kruskal's Algorithm**: Edge-based greedy approach
- **Prim's Algorithm**: Vertex-based greedy approach

Both guarantee finding the MST with the same total weight, but use different strategies.

## 🎯 Intuition

Think of connecting cities with roads on a budget:
- You have N cities (vertices) that need to be connected
- You have potential roads (edges) with construction costs (weights)
- You want to connect all cities using the cheapest roads
- No loops needed (that would waste money)

**Kruskal's**: "Pick the cheapest road that connects two unconnected groups"
**Prim's**: "Start from one city, always add the cheapest road to a new city"

## 📝 Algorithm Steps

### Kruskal's Algorithm:
1. Sort all edges by weight (ascending)
2. Initialize Union-Find for all vertices
3. For each edge in sorted order:
   - If endpoints are in different sets (no cycle):
     - Add edge to MST
     - Union the sets
4. Stop when MST has V-1 edges

### Prim's Algorithm:
1. Start from any vertex
2. Mark it as visited
3. While there are unvisited vertices:
   - Pick minimum weight edge connecting visited to unvisited vertex
   - Add edge to MST
   - Mark new vertex as visited

## 💻 Implementation

### JavaScript Implementation

```javascript
/**
 * ============================================
 * KRUSKAL'S ALGORITHM
 * ============================================
 */

/**
 * Kruskal's algorithm for MST
 * @param {number} n - Number of vertices
 * @param {Array} edges - Array of [u, v, weight]
 * @returns {Object} - {mst, totalWeight}
 */
function kruskalMST(n, edges) {
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);

  const uf = new UnionFind(n);
  const mst = [];
  let totalWeight = 0;

  for (const [u, v, weight] of edges) {
    // If u and v are in different components (no cycle)
    if (uf.union(u, v)) {
      mst.push([u, v, weight]);
      totalWeight += weight;

      // MST complete when we have n-1 edges
      if (mst.length === n - 1) break;
    }
  }

  return { mst, totalWeight };
}


/**
 * Min Cost to Connect All Points (Kruskal's approach)
 * LeetCode 1584
 */
function minCostConnectPoints(points) {
  const n = points.length;
  const edges = [];

  // Generate all edges with Manhattan distance
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dist = Math.abs(points[i][0] - points[j][0]) +
                   Math.abs(points[i][1] - points[j][1]);
      edges.push([i, j, dist]);
    }
  }

  const { totalWeight } = kruskalMST(n, edges);
  return totalWeight;
}


/**
 * ============================================
 * PRIM'S ALGORITHM
 * ============================================
 */

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];

      if (element.priority >= parent.priority) break;

      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();

    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }

    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;

      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }

  isEmpty() {
    return this.values.length === 0;
  }
}


/**
 * Prim's algorithm for MST
 * @param {Object} graph - Adjacency list {vertex: {neighbor: weight}}
 * @param {number} start - Starting vertex
 * @returns {Object} - {mst, totalWeight}
 */
function primMST(graph, start = 0) {
  const visited = new Set([start]);
  const mst = [];
  let totalWeight = 0;

  const pq = new PriorityQueue();

  // Add all edges from start vertex
  for (const neighbor in graph[start]) {
    const weight = graph[start][neighbor];
    pq.enqueue([start, neighbor, weight], weight);
  }

  while (!pq.isEmpty() && visited.size < Object.keys(graph).length) {
    const { val: [from, to, weight] } = pq.dequeue();

    if (visited.has(to)) continue;

    // Add edge to MST
    visited.add(to);
    mst.push([from, to, weight]);
    totalWeight += weight;

    // Add all edges from newly added vertex
    for (const neighbor in graph[to]) {
      if (!visited.has(neighbor)) {
        const edgeWeight = graph[to][neighbor];
        pq.enqueue([to, neighbor, edgeWeight], edgeWeight);
      }
    }
  }

  return { mst, totalWeight };
}


/**
 * Min Cost to Connect All Points (Prim's approach)
 * LeetCode 1584
 */
function minCostConnectPointsPrim(points) {
  const n = points.length;
  const visited = new Set([0]);
  let totalCost = 0;

  // Calculate distance between two points
  const dist = (i, j) => {
    return Math.abs(points[i][0] - points[j][0]) +
           Math.abs(points[i][1] - points[j][1]);
  };

  const pq = new PriorityQueue();

  // Add all edges from point 0
  for (let i = 1; i < n; i++) {
    pq.enqueue([0, i], dist(0, i));
  }

  while (!pq.isEmpty() && visited.size < n) {
    const { val: [from, to], priority: cost } = pq.dequeue();

    if (visited.has(to)) continue;

    visited.add(to);
    totalCost += cost;

    // Add all edges from newly added point
    for (let i = 0; i < n; i++) {
      if (!visited.has(i)) {
        pq.enqueue([to, i], dist(to, i));
      }
    }
  }

  return totalCost;
}


/**
 * Find Critical and Pseudo-Critical Edges in MST
 * LeetCode 1489
 */
function findCriticalAndPseudoCriticalEdges(n, edges) {
  // Add index to each edge
  const indexedEdges = edges.map((edge, i) => [...edge, i]);

  // Find MST weight
  const { totalWeight: mstWeight } = kruskalMST(
    n,
    indexedEdges.map(e => [e[0], e[1], e[2]])
  );

  const critical = [];
  const pseudoCritical = [];

  for (let i = 0; i < edges.length; i++) {
    // Check if edge is critical (removing it increases MST weight)
    const edgesWithout = indexedEdges
      .filter((_, idx) => idx !== i)
      .map(e => [e[0], e[1], e[2]]);

    const { mst, totalWeight } = kruskalMST(n, edgesWithout);

    if (mst.length !== n - 1 || totalWeight > mstWeight) {
      critical.push(i);
    } else {
      // Check if edge is pseudo-critical (can be in some MST)
      // Force include this edge
      const [u, v, w] = edges[i];
      const uf = new UnionFind(n);
      uf.union(u, v);

      let forcedWeight = w;
      const remainingEdges = indexedEdges
        .filter((_, idx) => idx !== i)
        .map(e => [e[0], e[1], e[2]])
        .sort((a, b) => a[2] - b[2]);

      for (const [a, b, weight] of remainingEdges) {
        if (uf.union(a, b)) {
          forcedWeight += weight;
        }
      }

      if (forcedWeight === mstWeight) {
        pseudoCritical.push(i);
      }
    }
  }

  return [critical, pseudoCritical];
}
```

## 🔍 Example Walkthrough

Consider this graph:
```
    2        3
A ----  B ----- C
|       |       |
|6      |8      |5
|       |       |
D ----- E ----- F
    1       4
```

**Edges**: `[[A,B,2], [B,C,3], [C,F,5], [A,D,6], [B,E,8], [D,E,1], [E,F,4]]`

### Kruskal's Algorithm:

| Step | Edge | Weight | Action | Reason | MST Edges |
|------|------|--------|--------|--------|-----------|
| 1 | (D,E) | 1 | ✅ Add | Different components | [(D,E,1)] |
| 2 | (A,B) | 2 | ✅ Add | Different components | [...(A,B,2)] |
| 3 | (B,C) | 3 | ✅ Add | Different components | [...(B,C,3)] |
| 4 | (E,F) | 4 | ✅ Add | Different components | [...(E,F,4)] |
| 5 | (C,F) | 5 | ✅ Add | Different components | [...(C,F,5)] |
| Done | - | - | Stop | 5 edges (6-1) | Total: 15 |

**MST Weight**: 1 + 2 + 3 + 4 + 5 = **15**

## ⏱️ Time Complexity

### Kruskal's Algorithm:
- **Time Complexity**: **O(E log E)**
  - Sorting edges: O(E log E)
  - Union-Find operations: O(E × α(V)) ≈ O(E)
  - Total: O(E log E)

- **Space Complexity**: **O(V + E)**
  - Union-Find: O(V)
  - Storing edges: O(E)

### Prim's Algorithm:
- **Time Complexity**: **O(E log V)** with binary heap
  - Each edge added to PQ: O(E log V)
  - Each vertex extracted: O(V log V)
  - Total: O(E log V)

- **Space Complexity**: **O(V + E)**
  - Priority queue: O(E)
  - Visited set: O(V)

## 🎯 When to Use Kruskal's vs Prim's

| Feature | Kruskal's | Prim's |
|---------|-----------|--------|
| **Best for** | Sparse graphs | Dense graphs |
| **Approach** | Edge-based | Vertex-based |
| **Data Structure** | Union-Find | Priority Queue |
| **Time (Binary Heap)** | O(E log E) | O(E log V) |
| **Edge Representation** | ✅ Edge list preferred | ⚠️ Adjacency list preferred |
| **Partial MST** | ❌ Harder | ✅ Easy (stop early) |
| **Parallelization** | ✅ Easier | ❌ Harder |

## 🔑 Key Properties

1. **Greedy Algorithms**: Both make locally optimal choices
2. **Optimal Solution**: Both guarantee minimum total weight
3. **Unique MST Weight**: Weight is always same, edges may differ
4. **Cut Property**: Minimum edge crossing any cut is in MST
5. **Works on Undirected Graphs**: Designed for undirected graphs

## 💡 Common Problem Patterns

### Pattern 1: Connecting Cities with Minimum Cost
```javascript
/**
 * LeetCode 1135: Connecting Cities With Minimum Cost
 */
function minimumCost(n, connections) {
  const { mst, totalWeight } = kruskalMST(n, connections);

  // Check if all cities are connected
  return mst.length === n - 1 ? totalWeight : -1;
}
```

### Pattern 2: Optimize Water Distribution
```javascript
/**
 * LeetCode 1168: Optimize Water Distribution in a Village
 */
function minCostToSupplyWater(n, wells, pipes) {
  // Create virtual node 0 representing water source
  // Edges from node 0 to each house with cost = well cost
  const edges = [];

  // Wells as edges from virtual node
  for (let i = 0; i < n; i++) {
    edges.push([0, i + 1, wells[i]]);
  }

  // Pipes as edges
  for (const [house1, house2, cost] of pipes) {
    edges.push([house1, house2, cost]);
  }

  const { totalWeight } = kruskalMST(n + 1, edges);
  return totalWeight;
}
```

## 🎓 Practice Problems

1. **Medium**:
   - Min Cost to Connect All Points (LeetCode 1584)
   - Connecting Cities With Minimum Cost (LeetCode 1135)
   - Optimize Water Distribution in a Village (LeetCode 1168)

2. **Hard**:
   - Find Critical and Pseudo-Critical Edges (LeetCode 1489)
   - Min Cost to Connect All Points (LeetCode 1584)

## ⚠️ Common Mistakes

1. **Forgetting to Sort** (Kruskal's): Edges must be sorted by weight
2. **Using on Directed Graphs**: MST is for undirected graphs
3. **Not Checking Connectivity**: May create forest instead of tree
4. **Wrong Union-Find**: Must use path compression/union by rank

---

**Remember**: Kruskal's for sparse graphs, Prim's for dense graphs! 🚀

