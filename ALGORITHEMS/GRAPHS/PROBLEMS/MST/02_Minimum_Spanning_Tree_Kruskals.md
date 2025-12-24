# 🌲 Minimum Spanning Tree (Kruskal's Algorithm)

## 📝 Problem Description

Given a weighted, undirected, and connected graph with **V vertices** and **E edges**, the task is to find the **sum of the weights of the edges** in the Minimum Spanning Tree (MST) of the graph using **Kruskal's Algorithm**.

The graph is represented as an edge list `edges[][]`, where `edges[i] = [u, v, w]` denotes an undirected edge between vertex `u` and vertex `v` with weight `w`.

### Example 1:

**Input:**

```
V = 3
E = 3
edges[][] = [[0, 1, 5], [1, 2, 3], [0, 2, 1]]
```

**Output:**

```
4
```

**Explanation:**

```
    0
   /|\
  5 | 1
 /  |  \
1   3   2
```

The MST includes edges: `0-2 (weight 1)` and `1-2 (weight 3)`, giving a total weight of **4**.

### Example 2:

**Input:**

```
V = 2
E = 1
edges = [[0, 1, 5]]
```

**Output:**

```
5
```

**Explanation:**

Only one Spanning Tree is possible which has a weight of 5.

### Constraints:

- `2 ≤ V ≤ 1000`
- `V-1 ≤ E ≤ (V*(V-1))/2`
- `0 ≤ u, v < V`
- `0 ≤ w ≤ 10^5`

---

## 💡 Intuition

**Minimum Spanning Tree (MST)** is a subset of edges that:

1. Connects all vertices
2. Has no cycles
3. Has minimum total edge weight

**Kruskal's Algorithm** is a **greedy, edge-based** approach:

- **Sort all edges** by weight in ascending order
- **Process edges from smallest to largest**
- **Add edge to MST** only if it doesn't create a cycle
- Use **Union-Find (Disjoint Set Union)** to efficiently detect cycles

### Key Differences from Prim's:

| Aspect             | Prim's Algorithm                     | Kruskal's Algorithm              |
| ------------------ | ------------------------------------ | -------------------------------- |
| **Approach**       | Vertex-based (grows from one vertex) | Edge-based (considers all edges) |
| **Data Structure** | Min-Heap (Priority Queue)            | Sorting + Union-Find             |
| **Best For**       | Dense graphs                         | Sparse graphs                    |
| **Starting Point** | Requires starting vertex             | No starting vertex needed        |

### Why Union-Find?

- **Cycle Detection**: Efficiently checks if two vertices are already connected
- **Union Operation**: Merges two sets (connects components)
- **Path Compression**: Optimizes find operations to nearly O(1)
- **Union by Rank**: Keeps tree flat for efficient operations

---

## 🔍 Algorithm

### Steps:

1. **Sort Edges**:

   - Sort all edges by weight in ascending order
   - Time: O(E log E)

2. **Initialize Union-Find**:

   - Create parent array: each vertex is its own parent initially
   - Create rank array: all ranks start at 0
   - Initialize count of components to V

3. **Process Each Edge** (in sorted order):

   - Extract edge `(u, v, w)`
   - Find root of `u` → `delx`
   - Find root of `v` → `dely`
   - If `delx ≠ dely` (they're in different components):
     - Add weight `w` to MST sum
     - Union the two components
   - If `delx = dely` (same component):
     - Skip this edge (would create cycle)

4. **Return Total Weight**:

   - After processing all edges, return accumulated weight

### Union-Find Operations:

**Find with Path Compression:**

```
find(x):
    if parent[x] ≠ x:
        parent[x] = find(parent[x])  // Path compression
    return parent[x]
```

**Union by Rank:**

```
union(x, y):
    rootX = find(x)
    rootY = find(y)

    if rootX = rootY: return  // Already in same set

    if rank[rootX] < rank[rootY]:
        parent[rootX] = rootY
    else if rank[rootX] > rank[rootY]:
        parent[rootY] = rootX
    else:
        parent[rootY] = rootX
        rank[rootX]++
```

---

## 💻 Code

```javascript
// User function Template for javascript

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
    this.count = n;
  }

  find(x) {
    // Path compression: make every node point directly to root
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  unionByRank(x, y) {
    const delx = this.find(x);
    const dely = this.find(y);

    // Already in same component
    if (delx === dely) return;

    // Union by rank: attach smaller rank tree under root of higher rank tree
    if (this.rank[delx] < this.rank[dely]) {
      this.parent[delx] = dely;
    } else if (this.rank[delx] > this.rank[dely]) {
      this.parent[dely] = delx;
    } else {
      this.parent[dely] = delx;
      this.rank[delx]++;
    }
    this.count--;
  }
}

class Solution {
  kruskalsMST(V, edges) {
    // Step 1: Sort edges by weight (ascending)
    edges.sort((a, b) => a[2] - b[2]);

    // Step 2: Initialize Union-Find
    const DSU = new UnionFind(V);
    let wt = 0;

    // Step 3: Process each edge in sorted order
    for (let [u, v, w] of edges) {
      // If u and v are in different components
      if (DSU.find(u) !== DSU.find(v)) {
        wt += w; // Add edge weight to MST
        DSU.unionByRank(u, v); // Merge components
      }
      // If same component, skip (would create cycle)
    }

    // Step 4: Return total MST weight
    return wt;
  }
}
```

---

## ⏱️ Time and Space Complexity

### Time Complexity: **O(E log E)** or **O(E log V)**

**Breakdown:**

- Sorting edges: **O(E log E)**
- Union-Find operations:
  - Each find: **O(α(V))** with path compression (nearly O(1))
  - Each union: **O(α(V))** with union by rank (nearly O(1))
  - Total for E edges: **O(E · α(V))** ≈ **O(E)**
- **Overall: O(E log E)** (dominated by sorting)

**Note:** Since E ≤ V², we have log E ≤ 2 log V, so O(E log E) = O(E log V)

### Space Complexity: **O(V)**

**Breakdown:**

- Parent array: **O(V)**
- Rank array: **O(V)**
- Sorting (in-place or additional space): **O(E)** or **O(log E)** depending on implementation
- **Overall: O(V)** for Union-Find + O(E) for sorting = **O(V + E)**

---

## 🎯 Dry Run

### Input:

```
V = 3
E = 3
edges = [[0, 1, 5], [1, 2, 3], [0, 2, 1]]
```

### Step 1: Sort Edges by Weight

```
Before: [[0, 1, 5], [1, 2, 3], [0, 2, 1]]
After:  [[0, 2, 1], [1, 2, 3], [0, 1, 5]]
```

### Step 2: Initialize Union-Find

```
parent = [0, 1, 2]  // Each node is its own parent
rank   = [0, 0, 0]  // All ranks are 0
count  = 3          // 3 components initially
wt     = 0          // Total weight starts at 0
```

### Step-by-Step Processing:

| Step | Edge (u, v, w) | find(u) | find(v) | Same Component? | Action                 | wt    | parent    | rank          |
| ---- | -------------- | ------- | ------- | --------------- | ---------------------- | ----- | --------- | ------------- |
| Init | -              | -       | -       | -               | Initialize DSU         | 0     | [0, 1, 2] | [0, 0, 0]     |
| 1    | (0, 2, 1)      | 0       | 2       | ❌ No           | Union 0 and 2, wt += 1 | **1** | [0, 1, 0] | [**1**, 0, 0] |
| 2    | (1, 2, 3)      | 1       | 0       | ❌ No           | Union 1 and 0, wt += 3 | **4** | [0, 0, 0] | [**2**, 0, 0] |
| 3    | (0, 1, 5)      | 0       | 0       | ✅ Yes          | Skip (cycle)           | **4** | [0, 0, 0] | [2, 0, 0]     |

### Detailed Union Operations:

**Step 1: Edge (0, 2, 1)**

```
find(0) = 0, find(2) = 2
Different components → Union
rank[0] = 0, rank[2] = 0 (equal)
Make 2's parent = 0, increase rank[0]
parent = [0, 1, 0]
rank   = [1, 0, 0]
wt = 1
```

**Step 2: Edge (1, 2, 3)**

```
find(1) = 1
find(2) = find(parent[2]) = find(0) = 0
Different components → Union
rank[1] = 0, rank[0] = 1
rank[1] < rank[0], so parent[1] = 0
parent = [0, 0, 0]
rank   = [2, 0, 0]
wt = 4
```

**Step 3: Edge (0, 1, 5)**

```
find(0) = 0
find(1) = 0 (after path compression)
Same component → Skip (would create cycle)
wt remains 4
```

### Final MST:

```
Edges selected:
1. (0, 2) with weight 1
2. (1, 2) with weight 3

Total Weight: 4
```

### Visualization of MST:

```
    0
     \
      1 (weight 1)
     /
    2
     \
      3 (weight 3)
     /
    1
```

Or simplified:

```
0 --- 2 --- 1
  (1)   (3)
```

---

## 🎓 Key Takeaways

1. **Kruskal's is greedy**: Always picks smallest edge that doesn't create cycle
2. **Union-Find is essential**: Provides efficient cycle detection
3. **Sorting is crucial**: Process edges in order of increasing weight
4. **Path Compression**: Optimizes find operations to nearly O(1)
5. **Union by Rank**: Keeps trees flat for efficient operations
6. **Works for disconnected graphs**: Can find MST for each component

---

## 🔄 Comparison: Kruskal's vs Prim's

| Feature                 | Kruskal's               | Prim's                |
| ----------------------- | ----------------------- | --------------------- |
| **Data Structure**      | Sorting + Union-Find    | Min-Heap              |
| **Approach**            | Edge-based              | Vertex-based          |
| **Time Complexity**     | O(E log E)              | O(E log V)            |
| **Best For**            | Sparse graphs (E ≈ V)   | Dense graphs (E ≈ V²) |
| **Implementation**      | Simpler with Union-Find | Needs priority queue  |
| **Disconnected Graphs** | Works naturally         | Needs modification    |

**When to use Kruskal's:**

- Sparse graphs with few edges
- When edges are already sorted
- When working with edge list representation
- When you need to process edges in specific order

**When to use Prim's:**

- Dense graphs with many edges
- When graph is in adjacency list/matrix form
- When you need MST from specific starting vertex
- When you want to build MST incrementally

---

## 📚 Related Problems

1. **Min Cost to Connect All Points** (LeetCode 1584)
2. **Find Critical and Pseudo-Critical Edges in MST** (LeetCode 1489)
3. **Connecting Cities With Minimum Cost** (LeetCode 1135)
4. **Optimize Water Distribution in a Village** (LeetCode 1168)

---
