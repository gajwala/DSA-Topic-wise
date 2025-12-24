# 🏙️ Connecting Cities With Minimum Cost

**LeetCode 1135** | **Medium** | **MST - Prim's & Kruskal's**

---

## 📝 Problem Description

There are `n` cities labeled from `1` to `n`. You are given the integer `n` and an array `connections` where `connections[i] = [xi, yi, costi]` indicates that the cost of connecting city `xi` and city `yi` (bidirectional connection) is `costi`.

Return the **minimum cost** to connect all the `n` cities such that there is at least one path between each pair of cities. If it is impossible to connect all the `n` cities, return `-1`.

The **cost** is the sum of the connections' costs used.

### Example 1:

**Input:**

```
n = 3
connections = [[1,2,5],[1,3,6],[2,3,1]]
```

**Output:**

```
6
```

**Explanation:**

```
Choosing any 2 edges will connect all cities so we choose the minimum 2.
Edges: [2,3,1] and [1,2,5]
Total cost = 1 + 5 = 6
```

### Example 2:

**Input:**

```
n = 4
connections = [[1,2,3],[3,4,4]]
```

**Output:**

```
-1
```

**Explanation:**

```
There is no way to connect all cities even if all edges are used.
City 2 is isolated from cities 3 and 4.
```

### Constraints:

- `1 <= n <= 10^4`
- `1 <= connections.length <= 10^4`
- `connections[i].length == 3`
- `1 <= xi, yi <= n`
- `xi != yi`
- `0 <= costi <= 10^5`

---

## 💡 Intuition

This is a **classic MST problem** with a twist:

- We need to check if it's **possible to connect all cities** (graph might be disconnected)
- If possible, find the **minimum cost to connect all cities**
- The answer is the MST cost, or `-1` if impossible

### Key Observations:

1. **MST requires exactly n-1 edges** for n nodes
2. **Graph might be disconnected**: Not all cities are reachable
3. **Return -1** if we can't form a connected graph
4. **Both Prim's and Kruskal's work**: Need to check connectivity

### Detection of Impossibility:

| Algorithm | Detection Method |
| --------- | ---------------- |
| **Prim's** | Count visited nodes ≠ n |
| **Kruskal's** | Final component count ≠ 1 OR edges used ≠ n-1 |

---

## 🔍 Algorithm

### Approach 1: Prim's Algorithm

1. **Build Adjacency List** from connections
2. **Run Prim's**:
   - Start from city 1
   - Use min-heap to select minimum cost edge
   - Track visited cities and total cost
3. **Check Connectivity**:
   - If visited cities < n → return -1
   - Else → return total cost

### Approach 2: Kruskal's Algorithm

1. **Sort Connections** by cost
2. **Initialize Union-Find** for n cities
3. **Process Edges**:
   - Union if different components
   - Add cost to total
4. **Check Connectivity**:
   - If edges used < n-1 → return -1
   - If components > 1 → return -1
   - Else → return total cost

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
 * @param {number[][]} connections
 * @return {number}
 */
var minimumCost = function (n, connections) {
  // Build adjacency list
  const graph = new Map();

  for (let i = 1; i <= n; i++) {
    graph.set(i, []);
  }

  for (const [u, v, cost] of connections) {
    graph.get(u).push({ node: v, cost });
    graph.get(v).push({ node: u, cost });
  }

  // Prim's Algorithm
  const pq = new MinHeap((a, b) => a.cost - b.cost);
  const visited = new Set();
  let totalCost = 0;

  // Start from city 1
  pq.insert({ cost: 0, node: 1 });

  while (!pq.isEmpty()) {
    const { cost, node } = pq.removeMin();

    // Skip if already visited
    if (visited.has(node)) continue;

    // Add to MST
    visited.add(node);
    totalCost += cost;

    // Add all edges from current node
    for (const { node: neighbor, cost: edgeCost } of graph.get(node)) {
      if (!visited.has(neighbor)) {
        pq.insert({ cost: edgeCost, node: neighbor });
      }
    }
  }

  // Check if all cities are connected
  return visited.size === n ? totalCost : -1;
};
```

### Solution 2: Kruskal's Algorithm

```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n + 1 }, (_, i) => i);
    this.rank = Array(n + 1).fill(0);
    this.components = n; // Initially n separate components
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

    this.components--;
    return true;
  }

  isConnected() {
    return this.components === 1;
  }
}

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minimumCost = function (n, connections) {
  // Sort connections by cost
  connections.sort((a, b) => a[2] - b[2]);

  // Initialize Union-Find
  const uf = new UnionFind(n);
  let totalCost = 0;
  let edgesUsed = 0;

  // Process edges in sorted order
  for (const [u, v, cost] of connections) {
    // If u and v are in different components
    if (uf.union(u, v)) {
      totalCost += cost;
      edgesUsed++;

      // Early termination: MST complete
      if (edgesUsed === n - 1) {
        return totalCost;
      }
    }
  }

  // Check if we used exactly n-1 edges (all cities connected)
  return edgesUsed === n - 1 ? totalCost : -1;
};
```

---

## ⏱️ Time and Space Complexity

### Prim's Algorithm:

**Time Complexity: O(E log E)**

- Build adjacency list: O(E)
- Process all edges with heap operations: O(E log E)
- Total: O(E log E)

**Space Complexity: O(V + E)**

- Adjacency list: O(V + E)
- Heap: O(E)
- Visited set: O(V)

### Kruskal's Algorithm:

**Time Complexity: O(E log E)**

- Sort edges: O(E log E)
- Union-Find operations: O(E × α(V)) ≈ O(E)
- Total: O(E log E)

**Space Complexity: O(V)**

- Union-Find: O(V)
- Sorting: O(log E)

---

## 🎯 Dry Run

### Input:

```
n = 3
connections = [[1,2,5],[1,3,6],[2,3,1]]
```

### Prim's Algorithm:

**Adjacency List:**

```
1 → [(2,5), (3,6)]
2 → [(1,5), (3,1)]
3 → [(1,6), (2,1)]
```

| Step | Heap (cost, node) | Extract | Visited | Total Cost | Action |
| ---- | ----------------- | ------- | ------- | ---------- | ------ |
| 0 | [(0, 1)] | - | {} | 0 | Start from 1 |
| 1 | [(5,2), (6,3)] | (0,1) | {1} | 0 | Visit 1 |
| 2 | [(6,3), (1,3)] | (5,2) | {1,2} | 5 | Visit 2, add edge 1→2 |
| 3 | [(6,3)] | (1,3) | {1,2,3} | 6 | Visit 3, add edge 2→3 |

**Result: 6** (all 3 cities visited) ✅

### Kruskal's Algorithm:

**Sorted Edges:**

```
[[2,3,1], [1,2,5], [1,3,6]]
```

| Step | Edge (u,v,cost) | find(u) | find(v) | Same? | Union | Total Cost | Edges Used |
| ---- | --------------- | ------- | ------- | ----- | ----- | ---------- | ---------- |
| Init | - | - | - | - | - | 0 | 0 |
| 1 | (2,3,1) | 2 | 3 | No | ✅ | 1 | 1 |
| 2 | (1,2,5) | 1 | 2 | No | ✅ | 6 | 2 |

**Result: 6** (2 edges = n-1, all connected) ✅

### Example 2 (Impossible Case):

**Input:**

```
n = 4
connections = [[1,2,3],[3,4,4]]
```

**Kruskal's Execution:**

| Step | Edge (u,v,cost) | Union | Edges Used | Components |
| ---- | --------------- | ----- | ---------- | ---------- |
| Init | - | - | 0 | 4 |
| 1 | (1,2,3) | ✅ | 1 | 3 |
| 2 | (3,4,4) | ✅ | 2 | 2 |

**Result: -1** (only 2 edges, need 3 for n=4) ❌

---

## 🎓 Key Takeaways

1. **Check Connectivity**: Always verify if all nodes are reachable
2. **MST Property**: Need exactly `n-1` edges for n nodes
3. **Return -1**: When graph is disconnected
4. **Both Algorithms Work**: Same time complexity
5. **Edge Cases**:
   - Not enough edges to connect all cities
   - Isolated components
   - Self-loops (shouldn't exist per constraints)

---

## 📚 Related Problems

1. **Min Cost to Connect All Points** (LeetCode 1584)
2. **Number of Operations to Make Network Connected** (LeetCode 1319)
3. **Find Critical and Pseudo-Critical Edges** (LeetCode 1489)
4. **Optimize Water Distribution in a Village** (LeetCode 1168)

---

