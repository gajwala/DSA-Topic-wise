# 🎯 Min Cost to Connect All Nodes (GFG)

**GeeksforGeeks** | **Medium** | **MST - Prim's & Kruskal's**

---

## 📝 Problem Description

Given an undirected graph with `V` vertices and `E` edges, where each edge has a weight associated with it. Your task is to find the **Minimum Spanning Tree (MST)** of the graph and return the **sum of weights** of all edges in the MST.

The graph is represented using an edge list, where each edge is given as `[u, v, weight]`.

### Example 1:

**Input:**

```
V = 5
edges = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 2, 3],
  [1, 3, 8],
  [1, 4, 5],
  [2, 4, 7],
  [3, 4, 9]
]
```

**Output:**

```
16
```

**Explanation:**

```
MST edges:
0 ← 2 → 1
    ↓
    3
    ↓
    5
    ↓
    4 ← 7 → 2
    
Sum: 2 + 3 + 6 + 5 = 16
```

### Example 2:

**Input:**

```
V = 3
edges = [
  [0, 1, 5],
  [1, 2, 3],
  [0, 2, 1]
]
```

**Output:**

```
4
```

**Explanation:**

```
MST edges: [0,2,1] and [1,2,3]
Sum: 1 + 3 = 4
```

### Constraints:

- `2 ≤ V ≤ 1000`
- `V-1 ≤ E ≤ V*(V-1)/2`
- `1 ≤ weight ≤ 1000`
- Graph is connected

---

## 💡 Intuition

This is the **classic MST problem**. We need to:

1. Connect all vertices
2. Use minimum total edge weight
3. No cycles in the result

### Two Approaches:

**Prim's Algorithm** (Vertex-based):
- Start from any vertex
- Grow MST by adding minimum weight edge
- Use priority queue for efficiency

**Kruskal's Algorithm** (Edge-based):
- Sort all edges by weight
- Add edges that don't create cycles
- Use Union-Find for cycle detection

### Which to Choose?

| Graph Type | Best Algorithm | Reason |
| ---------- | -------------- | ------ |
| **Dense** (E ≈ V²) | Prim's | Fewer heap operations |
| **Sparse** (E ≈ V) | Kruskal's | Sorting is faster |
| **Edge List** | Kruskal's | No need to build adjacency list |
| **Adjacency Matrix** | Prim's | Already have structure |

---

## 🔍 Algorithm

### Approach 1: Prim's Algorithm

1. Build adjacency list from edges
2. Start from vertex 0 with cost 0
3. Use min-heap to select minimum weight edge
4. For each vertex:
   - Mark as visited
   - Add edge weight to total
   - Add all unvisited neighbors to heap
5. Return total weight

### Approach 2: Kruskal's Algorithm

1. Sort edges by weight
2. Initialize Union-Find with V vertices
3. For each edge in sorted order:
   - If vertices in different components
   - Union them and add weight
4. Return total weight

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

class Solution {
  /**
   * @param {number} V - number of vertices
   * @param {number[][]} edges - edge list [u, v, weight]
   * @return {number} - sum of MST edge weights
   */
  spanningTree(V, edges) {
    // Build adjacency list
    const graph = new Map();
    for (let i = 0; i < V; i++) {
      graph.set(i, []);
    }

    for (const [u, v, weight] of edges) {
      graph.get(u).push({ node: v, weight });
      graph.get(v).push({ node: u, weight });
    }

    // Prim's Algorithm
    const pq = new MinHeap((a, b) => a.weight - b.weight);
    const visited = Array(V).fill(false);
    let totalCost = 0;

    // Start from vertex 0
    pq.insert({ weight: 0, node: 0 });

    while (!pq.isEmpty()) {
      const { weight, node } = pq.removeMin();

      // Skip if already visited
      if (visited[node]) continue;

      // Add to MST
      visited[node] = true;
      totalCost += weight;

      // Add all unvisited neighbors
      for (const { node: neighbor, weight: edgeWeight } of graph.get(node)) {
        if (!visited[neighbor]) {
          pq.insert({ weight: edgeWeight, node: neighbor });
        }
      }
    }

    return totalCost;
  }
}
```

### Solution 2: Kruskal's Algorithm

```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
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

class Solution {
  /**
   * @param {number} V - number of vertices
   * @param {number[][]} edges - edge list [u, v, weight]
   * @return {number} - sum of MST edge weights
   */
  spanningTree(V, edges) {
    // Sort edges by weight
    edges.sort((a, b) => a[2] - b[2]);

    // Kruskal's Algorithm
    const uf = new UnionFind(V);
    let totalCost = 0;
    let edgesUsed = 0;

    for (const [u, v, weight] of edges) {
      // If u and v in different components
      if (uf.union(u, v)) {
        totalCost += weight;
        edgesUsed++;

        // MST complete when we have V-1 edges
        if (edgesUsed === V - 1) break;
      }
    }

    return totalCost;
  }
}
```

---

## ⏱️ Time and Space Complexity

### Prim's Algorithm:

**Time Complexity: O(E log V)**

- Build adjacency list: O(E)
- Process each vertex: O(V)
- Each edge added to heap: O(E)
- Heap operations: O(log V)
- Total: O(E log V)

**Space Complexity: O(V + E)**

- Adjacency list: O(V + E)
- Min-heap: O(E)
- Visited array: O(V)

### Kruskal's Algorithm:

**Time Complexity: O(E log E)**

- Sort edges: O(E log E)
- Union-Find operations: O(E × α(V)) ≈ O(E)
- Total: O(E log E)

**Space Complexity: O(V)**

- Union-Find: O(V)
- Sorting space: O(log E)

---

## 🎯 Dry Run

### Input:

```
V = 5
edges = [[0,1,2],[0,3,6],[1,2,3],[1,3,8],[1,4,5],[2,4,7],[3,4,9]]
```

### Prim's Algorithm:

**Adjacency List:**

```
0: [(1,2), (3,6)]
1: [(0,2), (2,3), (3,8), (4,5)]
2: [(1,3), (4,7)]
3: [(0,6), (1,8), (4,9)]
4: [(1,5), (2,7), (3,9)]
```

**Execution:**

| Step | Heap (weight, node) | Extract | Visited | Total | Edges |
| ---- | ------------------- | ------- | ------- | ----- | ----- |
| 1 | [(0,0)] | (0,0) | [T,F,F,F,F] | 0 | Start |
| 2 | [(2,1),(6,3)] | (2,1) | [T,T,F,F,F] | 2 | 0→1 |
| 3 | [(3,2),(5,4),(6,3),(8,3)] | (3,2) | [T,T,T,F,F] | 5 | 1→2 |
| 4 | [(5,4),(6,3),(7,4),(8,3)] | (5,4) | [T,T,T,F,T] | 10 | 1→4 |
| 5 | [(6,3),(7,4),(8,3),(9,3)] | (6,3) | [T,T,T,T,T] | 16 | 0→3 |

**Result: 16** ✅

### Kruskal's Algorithm:

**Sorted Edges:**

```
[[0,1,2], [1,2,3], [1,4,5], [0,3,6], [2,4,7], [1,3,8], [3,4,9]]
```

**Execution:**

| Step | Edge [u,v,w] | find(u) | find(v) | Union? | Total | Edges Used |
| ---- | ------------ | ------- | ------- | ------ | ----- | ---------- |
| 1 | [0,1,2] | 0 | 1 | ✅ | 2 | 1 |
| 2 | [1,2,3] | 0 | 2 | ✅ | 5 | 2 |
| 3 | [1,4,5] | 0 | 4 | ✅ | 10 | 3 |
| 4 | [0,3,6] | 0 | 3 | ✅ | 16 | 4 |
| 5 | Done | - | - | - | 16 | 4 = V-1 |

**Result: 16** ✅

---

## 🎓 Key Takeaways

1. **Classic MST**: Standard problem for learning MST algorithms
2. **Both Work**: Prim's and Kruskal's give same result
3. **V-1 Edges**: MST always has exactly V-1 edges
4. **Connected Graph**: Assumption guarantees solution exists
5. **No Cycles**: MST is a tree (acyclic)
6. **Greedy Works**: Both algorithms use greedy approach

---

## 🔄 Algorithm Comparison

### Prim's vs Kruskal's:

**Prim's Advantages:**
- Better for dense graphs
- Don't need to sort all edges
- Can start from any vertex

**Kruskal's Advantages:**
- Simpler to understand
- Better for sparse graphs
- Works naturally with edge list
- Easier to parallelize

**When Equal:**
- Both O(E log E) or O(E log V)
- Both give optimal solution
- Both use greedy approach

---

## 📚 Related Problems

1. **Minimum Spanning Tree - Prim's** (GFG)
2. **Minimum Spanning Tree - Kruskal's** (GFG)
3. **Min Cost to Connect All Points** (LeetCode 1584)
4. **Connecting Cities** (LeetCode 1135)
5. **Critical Connections** (LeetCode 1192)

---

