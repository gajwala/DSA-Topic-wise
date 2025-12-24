# Minimum Spanning Tree (MST) - Prim's Algorithm

## 📝 Problem Description

Given a weighted, undirected, and connected graph with **V vertices** and **E edges**, your task is to find the **sum of the weights of the edges** in the Minimum Spanning Tree (MST) of the graph.

The graph is provided as a list of edges, where each edge is represented as `[u, v, w]`, indicating an edge between vertex `u` and vertex `v` with edge weight `w`.

### Example 1:

**Input:**

```
V = 3
E = 3
Edges = [[0, 1, 5], [1, 2, 3], [0, 2, 1]]
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
    |  /
    | 3
    |/
    2

MST includes edges: (0,2) with weight 1 and (1,2) with weight 3
Total weight = 1 + 3 = 4
```

### Example 2:

**Input:**

```
V = 2
E = 1
Edges = [[0, 1, 5]]
```

**Output:**

```
5
```

**Explanation:** Only one spanning tree is possible which has a weight of 5.

### Constraints:

- `2 ≤ V ≤ 1000`
- `V-1 ≤ E ≤ (V*(V-1))/2`
- `1 ≤ w ≤ 10000`

---

## 🎯 Intuition

**Minimum Spanning Tree (MST)** is a subset of edges that:

1. Connects all vertices
2. Has no cycles
3. Has minimum total edge weight

**Prim's Algorithm** grows the MST one vertex at a time:

- Start from any vertex (usually vertex 0)
- Always pick the **minimum weight edge** that connects a visited vertex to an unvisited vertex
- Add that edge to MST and mark the new vertex as visited
- Repeat until all vertices are visited

Think of it like building a road network starting from one city, always choosing the cheapest road that connects to a new city.

**Why use Min-Heap?**

- We need to efficiently find the minimum weight edge to an unvisited vertex
- Min-Heap gives us O(log V) insertion and O(log V) extraction of minimum
- Without heap, we'd need O(V) to find minimum every time

---

## 📋 Algorithm Steps

1. **Initialize**:

   - Build adjacency list from edges
   - Create a min-heap (priority queue) based on edge weight
   - Create visited array to track visited vertices
   - Initialize sum = 0

2. **Start Prim's**:

   - Insert starting vertex (0) with weight 0 into heap
   - Mark it as unvisited initially

3. **Main Loop** (while heap is not empty):

   - Extract vertex with minimum edge weight from heap
   - If vertex already visited, skip it (lazy deletion)
   - Mark vertex as visited
   - Add edge weight to sum
   - For each neighbor of current vertex:
     - If neighbor not visited:
       - Add to heap with edge weight

4. **Return** total sum of MST weights

---

## 💻 Code Implementation

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

  peek() {
    return this.heap[0] ?? null;
  }
}

class Solution {
  spanningTree(V, edges) {
    // Build adjacency list
    const adj = new Map();
    for (let i = 0; i < V; i++) {
      adj.set(i, []);
    }

    for (let i = 0; i < edges.length; i++) {
      const [u, v, w] = edges[i];
      adj.get(u).push({ v, w });
      adj.get(v).push({ v: u, w });
    }

    // Min-heap based on dis (edge weight)
    const pq = new MinHeap((a, b) => a.dis - b.dis);

    const visited = Array(V).fill(false);
    let sum = 0;

    // Start from node 0 with edge weight 0 (no edge)
    pq.insert({ dis: 0, node: 0 });

    while (!pq.isEmpty()) {
      const { dis, node } = pq.removeMin();

      if (visited[node]) continue; // Skip if already visited

      visited[node] = true;
      sum += dis; // Add the edge weight bringing this node into MST

      const neighbours = adj.get(node);
      for (let neighbour of neighbours) {
        const { v, w } = neighbour;
        if (!visited[v]) {
          // Push edge to v with weight w
          pq.insert({ dis: w, node: v });
        }
      }
    }

    return sum;
  }
}
```

---

## ⏱️ Time and Space Complexity

### Time Complexity: **O(E log V)**

**Breakdown:**

- Building adjacency list: O(E)
- Each vertex is added to heap at most E times: O(E log V)
- Each vertex is removed from heap once: O(V log V)
- Processing all neighbors: O(E)
- **Total**: O(E log V) dominates

**Why E log V?**

- We process each edge once
- Each heap operation (insert/remove) takes O(log V)
- Total heap operations ≤ 2E (each edge can add 2 entries)

### Space Complexity: **O(V + E)**

**Breakdown:**

- Adjacency list: O(V + E)
- Min-heap: O(E) in worst case (lazy deletion)
- Visited array: O(V)
- **Total**: O(V + E)

---

## 🔍 Dry Run

Let's trace through **Example 1**: `V = 3, E = 3, Edges = [[0, 1, 5], [1, 2, 3], [0, 2, 1]]`

### Adjacency List:

```
0 → [(1, 5), (2, 1)]
1 → [(0, 5), (2, 3)]
2 → [(1, 3), (0, 1)]
```

### Step-by-Step Execution:

| Step | Heap (dis, node)         | Extract | Visited   | Sum   | Action                             |
| ---- | ------------------------ | ------- | --------- | ----- | ---------------------------------- |
| 0    | [(0, 0)]                 | -       | [F, F, F] | 0     | Initialize with node 0             |
| 1    | []                       | (0, 0)  | [T, F, F] | 0     | Visit 0, add neighbors             |
| 1a   | [(5, 1), (1, 2)]         | -       | [T, F, F] | 0     | Add edges 0→1(5) and 0→2(1)        |
| 2    | [(5, 1)]                 | (1, 2)  | [T, F, T] | 1     | Visit 2, sum += 1                  |
| 2a   | [(5, 1), (3, 1)]         | -       | [T, F, T] | 1     | Add edge 2→1(3)                    |
| 3    | [(5, 1)]                 | (3, 1)  | [T, T, T] | 4     | Visit 1, sum += 3                  |
| 3a   | [(5, 1), (5, 0), (3, 2)] | -       | [T, T, T] | 4     | Try to add neighbors (all visited) |
| 4    | [(5, 0), (3, 2)]         | (5, 1)  | [T, T, T] | 4     | Extract (5,1), skip (visited)      |
| 5    | [(5, 0)]                 | (3, 2)  | [T, T, T] | 4     | Extract (3,2), skip (visited)      |
| 6    | []                       | (5, 0)  | [T, T, T] | 4     | Extract (5,0), skip (visited)      |
| 7    | -                        | -       | [T, T, T] | **4** | Heap empty, return sum             |

### Final MST:

```
Edges selected:
1. (0, 2) with weight 1
2. (2, 1) with weight 3

Total weight = 1 + 3 = 4
```

### Visualization of MST:

```
    0
     \
      1 (weight 1)
       \
        2
       /
      3 (weight 3)
     /
    1
```

---

## 🎓 Key Takeaways

1. **Prim's builds MST incrementally** - one vertex at a time
2. **Always chooses minimum weight edge** to unvisited vertex
3. **Greedy approach** - locally optimal choice leads to globally optimal solution
4. **Lazy deletion** in heap - we don't remove outdated entries, just skip when extracted
5. **Works only on connected graphs** - disconnected graphs need modification

---

## 🔗 Related Problems

- **Kruskal's Algorithm** - Alternative MST algorithm (edge-based)
- **Find Critical and Pseudo-Critical Edges** (LeetCode 1489)
- **Min Cost to Connect All Points** (LeetCode 1584)
- **Optimize Water Distribution** (LeetCode 1168)

---

## 📌 Tips & Tricks

1. **Why start with weight 0?** - First vertex has no incoming edge cost
2. **Lazy deletion** - More efficient than updating heap entries
3. **Can start from any vertex** - MST weight will be same
4. **Use visited check** - Prevents duplicate processing
5. **Adjacency list is better** than matrix for sparse graphs

---

**Difficulty:** Medium  
**Algorithm:** Prim's Algorithm (MST)  
**Data Structures:** Min-Heap, Adjacency List, Array  
**Patterns:** Greedy, Graph Traversal, Priority Queue
