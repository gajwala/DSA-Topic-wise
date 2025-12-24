# 💧 Optimize Water Distribution in a Village

**LeetCode 1168** | **Hard** | **MST - Prim's & Kruskal's**

---

## 📝 Problem Description

There are `n` houses in a village. We want to supply water for all the houses by building wells and laying pipes.

For each house `i`, we can either:
- Build a well inside it directly with cost `wells[i - 1]` (note the `-1` due to 0-indexing of wells)
- OR pipe water from another well to it

The costs of laying pipes between houses are given in the array `pipes` where each `pipes[j] = [house1j, house2j, costj]` represents the cost to connect `house1j` and `house2j` together using a pipe. Connections are bidirectional, and there could be multiple valid connections between the same two houses with different costs.

Return the **minimum total cost** to supply water to all houses.

### Example 1:

**Input:**

```
n = 3
wells = [1,2,2]
pipes = [[1,2,1],[2,3,1]]
```

**Output:**

```
3
```

**Explanation:**

```
Best strategy:
- Build a well in house 1 with cost 1
- Pipe water from house 1 to house 2 with cost 1
- Pipe water from house 2 to house 3 with cost 1
Total cost = 1 + 1 + 1 = 3

Alternative (more expensive):
- Build wells in all houses: 1 + 2 + 2 = 5
```

### Example 2:

**Input:**

```
n = 2
wells = [1,1]
pipes = [[1,2,1]]
```

**Output:**

```
2
```

**Explanation:**

```
Build wells in both houses: 1 + 1 = 2
(Cheaper than building one well and piping: 1 + 1 = 2, same cost)
```

### Constraints:

- `2 <= n <= 10^4`
- `wells.length == n`
- `0 <= wells[i] <= 10^5`
- `1 <= pipes.length <= 10^4`
- `pipes[j].length == 3`
- `1 <= house1j, house2j <= n`
- `0 <= costj <= 10^5`
- `house1j != house2j`

---

## 💡 Intuition

This is a **modified MST problem** with a clever trick:

### The Key Insight: Virtual Node!

- Each house can either:
  1. Build its own well (independent source)
  2. Get water from another house via pipe (connection)

- **Convert to standard MST**: Add a **virtual node 0** (water source)
- Connect virtual node to each house `i` with cost = `wells[i-1]`
- Now it's a standard MST problem!

### Transformation:

```
Original Problem:
- n houses
- Each can build a well (cost wells[i])
- Or connect via pipes

↓ Transform ↓

MST Problem:
- n+1 nodes (n houses + 1 virtual source)
- Virtual node 0 → house i: cost = wells[i-1]
- House to house: given pipe costs
- Find MST of this graph!
```

### Example Transformation:

**Original:**
```
n = 3
wells = [1,2,2]
pipes = [[1,2,1],[2,3,1]]
```

**After Adding Virtual Node:**
```
Nodes: 0 (virtual), 1, 2, 3
Edges:
  0 → 1: cost 1 (build well in house 1)
  0 → 2: cost 2 (build well in house 2)
  0 → 3: cost 2 (build well in house 3)
  1 ↔ 2: cost 1 (pipe between houses)
  2 ↔ 3: cost 1 (pipe between houses)
```

---

## 🔍 Algorithm

### Approach 1: Prim's Algorithm

1. **Create Virtual Node 0**
2. **Build Adjacency List**:
   - Add edges from node 0 to each house (well costs)
   - Add pipe connections between houses
3. **Run Prim's** starting from node 0
4. **Return total cost**

### Approach 2: Kruskal's Algorithm

1. **Create Edge List**:
   - Add edges from virtual node 0 to each house
   - Add all pipe connections
2. **Sort edges by cost**
3. **Run Kruskal's with Union-Find**
4. **Return total cost**

---

## 💻 Code

### Solution 1: Prim's Algorithm

```javascript
class MinHeap {
  constructor(compareFn = (a, b) => a - b) {
    this.heap = [];
    this.compare = compareFn;
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeftIndex(i) {
    return i * 2 + 1;
  }

  getRightIndex(i) {
    return i * 2 + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parent = this.getParentIndex(index);
      if (this.compare(this.heap[parent], this.heap[index]) <= 0) break;
      this.swap(parent, index);
      index = parent;
    }
  }

  removeMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      const left = this.getLeftIndex(index);
      const right = this.getRightIndex(index);
      let smallest = index;

      if (
        left < length &&
        this.compare(this.heap[left], this.heap[smallest]) < 0
      ) {
        smallest = left;
      }
      if (
        right < length &&
        this.compare(this.heap[right], this.heap[smallest]) < 0
      ) {
        smallest = right;
      }
      if (smallest === index) break;

      this.swap(index, smallest);
      index = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

/**
 * @param {number} n
 * @param {number[]} wells
 * @param {number[][]} pipes
 * @return {number}
 */
var minCostToSupplyWater = function (n, wells, pipes) {
  // Build adjacency list with virtual node 0
  const graph = new Map();

  // Initialize all nodes (0 to n)
  for (let i = 0; i <= n; i++) {
    graph.set(i, []);
  }

  // Add edges from virtual node 0 to each house (well costs)
  for (let i = 0; i < n; i++) {
    graph.get(0).push({ node: i + 1, cost: wells[i] });
    graph.get(i + 1).push({ node: 0, cost: wells[i] });
  }

  // Add pipe connections
  for (const [house1, house2, cost] of pipes) {
    graph.get(house1).push({ node: house2, cost });
    graph.get(house2).push({ node: house1, cost });
  }

  // Prim's Algorithm
  const pq = new MinHeap((a, b) => a.cost - b.cost);
  const visited = new Set();
  let totalCost = 0;

  // Start from virtual node 0
  pq.insert({ cost: 0, node: 0 });

  while (!pq.isEmpty()) {
    const { cost, node } = pq.removeMin();

    if (visited.has(node)) continue;

    visited.add(node);
    totalCost += cost;

    // Add all neighbors to heap
    for (const { node: neighbor, cost: edgeCost } of graph.get(node)) {
      if (!visited.has(neighbor)) {
        pq.insert({ cost: edgeCost, node: neighbor });
      }
    }
  }

  return totalCost;
};
```

### Solution 2: Kruskal's Algorithm

```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n + 1 }, (_, i) => i);
    this.rank = Array(n + 1).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    return true;
  }
}

/**
 * @param {number} n
 * @param {number[]} wells
 * @param {number[][]} pipes
 * @return {number}
 */
var minCostToSupplyWater = function (n, wells, pipes) {
  // Build edge list with virtual node 0
  const edges = [];

  // Add edges from virtual node 0 to each house (well costs)
  for (let i = 0; i < n; i++) {
    edges.push([0, i + 1, wells[i]]);
  }

  // Add pipe connections
  for (const [house1, house2, cost] of pipes) {
    edges.push([house1, house2, cost]);
  }

  // Sort edges by cost
  edges.sort((a, b) => a[2] - b[2]);

  // Kruskal's Algorithm
  const uf = new UnionFind(n);
  let totalCost = 0;
  let edgesUsed = 0;

  for (const [u, v, cost] of edges) {
    if (uf.union(u, v)) {
      totalCost += cost;
      edgesUsed++;

      // Need n edges to connect n+1 nodes (including virtual node)
      if (edgesUsed === n) break;
    }
  }

  return totalCost;
};
```

---

## ⏱️ Time and Space Complexity

### Prim's Algorithm:

**Time Complexity: O((V + E) log V)**

- V = n+1 nodes, E = n + |pipes| edges
- Build graph: O(V + E)
- Heap operations: O(E log V)
- Total: O(E log V)

**Space Complexity: O(V + E)**

- Adjacency list: O(V + E)
- Heap: O(V)
- Visited set: O(V)

### Kruskal's Algorithm:

**Time Complexity: O(E log E)**

- Build edge list: O(E)
- Sort edges: O(E log E)
- Union-Find: O(E × α(V)) ≈ O(E)
- Total: O(E log E)

**Space Complexity: O(V + E)**

- Edge list: O(E)
- Union-Find: O(V)

---

## 🎯 Dry Run

### Input:

```
n = 3
wells = [1,2,2]
pipes = [[1,2,1],[2,3,1]]
```

### Step 1: Add Virtual Node

**Edges after transformation:**

```
Virtual Node Edges (wells):
  [0, 1, 1]  // Build well in house 1
  [0, 2, 2]  // Build well in house 2
  [0, 3, 2]  // Build well in house 3

Pipe Edges:
  [1, 2, 1]
  [2, 3, 1]
```

### Step 2: Kruskal's Algorithm

**Sorted Edges:**

```
[
  [0, 1, 1],  // well in house 1
  [1, 2, 1],  // pipe 1-2
  [2, 3, 1],  // pipe 2-3
  [0, 2, 2],  // well in house 2
  [0, 3, 2]   // well in house 3
]
```

**Execution:**

| Step | Edge (u,v,cost) | find(u) | find(v) | Same? | Union | Total Cost | Edges Used |
| ---- | --------------- | ------- | ------- | ----- | ----- | ---------- | ---------- |
| Init | - | - | - | - | - | 0 | 0 |
| 1 | (0,1,1) | 0 | 1 | No | ✅ | 1 | 1 |
| 2 | (1,2,1) | 0 | 2 | No | ✅ | 2 | 2 |
| 3 | (2,3,1) | 0 | 3 | No | ✅ | 3 | 3 |

**Result: 3** ✅

### Visualization:

```
        0 (Virtual Water Source)
        |
        | 1 (build well in house 1)
        |
        1 (House 1)
        |
        | 1 (pipe)
        |
        2 (House 2)
        |
        | 1 (pipe)
        |
        3 (House 3)

Total: 1 + 1 + 1 = 3
```

---

## 🎓 Key Takeaways

1. **Virtual Node Trick**: Add node 0 to represent independent water source
2. **Convert to MST**: Transform into standard MST problem
3. **Well = Edge from Virtual Node**: Building a well = connecting to source
4. **Need n edges**: For n houses + 1 virtual node
5. **Both Algorithms Work**: Same complexity, different implementations

---

## 🔄 Why Virtual Node Works

**Without Virtual Node:**
- Complex decision: Build well OR pipe from another house?
- Not a standard graph problem

**With Virtual Node:**
- Simple decision: Just find MST!
- Building a well = using edge from virtual node
- Piping = using edge between houses
- MST automatically chooses optimal mix!

---

## 📚 Related Problems

1. **Connecting Cities With Minimum Cost** (LeetCode 1135)
2. **Min Cost to Connect All Points** (LeetCode 1584)
3. **Network Delay Time** (LeetCode 743)
4. **Cheapest Flights Within K Stops** (LeetCode 787)

---

