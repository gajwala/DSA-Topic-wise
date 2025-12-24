# 🔗 Min Cost to Connect All Points

**LeetCode 1584** | **Medium** | **MST - Prim's & Kruskal's**

---

## 📝 Problem Description

You are given an array `points` representing integer coordinates of some points on a 2D-plane, where `points[i] = [xi, yi]`.

The cost of connecting two points `[xi, yi]` and `[xj, yj]` is the **Manhattan distance** between them: `|xi - xj| + |yi - yj|`.

Return the **minimum cost** to make all points connected. All points are connected if there is exactly one simple path between any two points.

### Example 1:

**Input:**

```
points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
```

**Output:**

```
20
```

**Explanation:**

```
We connect the points as follows:
- Connect point 0 with point 1: cost = 4
- Connect point 1 with point 2: cost = 11
- Connect point 1 with point 3: cost = 4
- Connect point 3 with point 4: cost = 3
Total cost = 20
```

### Example 2:

**Input:**

```
points = [[3,12],[-2,5],[-4,1]]
```

**Output:**

```
18
```

### Constraints:

- `1 <= points.length <= 1000`
- `-10^6 <= xi, yi <= 10^6`
- All pairs `(xi, yi)` are distinct

---

## 💡 Intuition

This is a **complete graph problem** where we need to find the MST:

- **Every point is connected to every other point** (complete graph)
- Edge weight = Manhattan distance between two points
- We need to connect ALL points with minimum total cost
- This is a classic MST problem!

### Key Observations:

1. **Complete Graph**: With `n` points, we have `n(n-1)/2` possible edges
2. **No explicit edges given**: We need to calculate distances on-the-fly
3. **Both Prim's and Kruskal's work**: But Prim's is more efficient here
4. **Why Prim's is better?**: We don't need to generate all edges upfront

### Approach Comparison:

| Algorithm | Pros | Cons |
| --------- | ---- | ---- |
| **Prim's** | Don't need to store all edges | Slightly more complex implementation |
| **Kruskal's** | Simple logic | Need to generate and sort all O(n²) edges |

---

## 🔍 Algorithm

### Approach 1: Prim's Algorithm

1. **Initialize**:
   - Start from any point (index 0)
   - Use min-heap to store (distance, point)
   - Track visited points

2. **Main Loop**:
   - Extract minimum distance point
   - If already visited, skip
   - Mark as visited, add distance to total cost
   - Calculate distances to all unvisited neighbors
   - Add to min-heap

3. **Calculate Manhattan Distance**:
   ```
   distance = |x1 - x2| + |y1 - y2|
   ```

### Approach 2: Kruskal's Algorithm

1. **Generate All Edges**:
   - For every pair of points, calculate distance
   - Store as [point1, point2, distance]

2. **Sort Edges** by distance

3. **Union-Find**:
   - Process edges from smallest distance
   - Add edge if it connects different components

---

## 💻 Code

### Solution 1: Prim's Algorithm (Optimized)

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
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
  const n = points.length;

  // Helper function to calculate Manhattan distance
  const manhattanDistance = (i, j) => {
    return Math.abs(points[i][0] - points[j][0]) + 
           Math.abs(points[i][1] - points[j][1]);
  };

  // Min-heap based on distance
  const pq = new MinHeap((a, b) => a.cost - b.cost);

  const visited = Array(n).fill(false);
  let totalCost = 0;
  let edgesUsed = 0;

  // Start from point 0 with cost 0
  pq.insert({ cost: 0, point: 0 });

  while (!pq.isEmpty() && edgesUsed < n) {
    const { cost, point } = pq.removeMin();

    // Skip if already visited
    if (visited[point]) continue;

    // Mark as visited and add to MST
    visited[point] = true;
    totalCost += cost;
    edgesUsed++;

    // Add all edges from current point to unvisited points
    for (let nextPoint = 0; nextPoint < n; nextPoint++) {
      if (!visited[nextPoint]) {
        const distance = manhattanDistance(point, nextPoint);
        pq.insert({ cost: distance, point: nextPoint });
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
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
    this.components = n;
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
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
  const n = points.length;

  // Step 1: Generate all edges with Manhattan distances
  const edges = [];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const distance =
        Math.abs(points[i][0] - points[j][0]) +
        Math.abs(points[i][1] - points[j][1]);

      edges.push([i, j, distance]);
    }
  }

  // Step 2: Sort edges by distance
  edges.sort((a, b) => a[2] - b[2]);

  // Step 3: Use Kruskal's algorithm with Union-Find
  const uf = new UnionFind(n);
  let totalCost = 0;
  let edgesUsed = 0;

  for (const [u, v, cost] of edges) {
    // If u and v are not connected, add this edge
    if (uf.union(u, v)) {
      totalCost += cost;
      edgesUsed++;

      // Early termination: MST complete when we have n-1 edges
      if (edgesUsed === n - 1) break;
    }
  }

  return totalCost;
};
```

---

## ⏱️ Time and Space Complexity

### Prim's Algorithm:

**Time Complexity: O(n² log n)**

- For each of n points:
  - Extract from heap: O(log n)
  - Check all other points: O(n)
  - Insert into heap: O(log n)
- Total: O(n × n × log n) = O(n² log n)

**Space Complexity: O(n)**

- Heap can have at most O(n²) entries: O(n²)
- Visited array: O(n)
- Total: O(n²)

### Kruskal's Algorithm:

**Time Complexity: O(n² log n)**

- Generate all edges: O(n²)
- Sort edges: O(n² log n²) = O(n² log n)
- Union-Find operations: O(n² × α(n)) ≈ O(n²)
- Total: O(n² log n)

**Space Complexity: O(n²)**

- Storing all edges: O(n²)
- Union-Find: O(n)
- Total: O(n²)

### Comparison:

| Aspect | Prim's | Kruskal's |
| ------ | ------ | --------- |
| **Time** | O(n² log n) | O(n² log n) |
| **Space** | O(n²) | O(n²) |
| **Practical Performance** | ✅ Better | Slower due to edge generation |
| **Memory** | More efficient | Stores all edges |

---

## 🎯 Dry Run

### Input:

```
points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
```

### Calculate Some Distances:

```
Point 0 to Point 1: |0-2| + |0-2| = 4
Point 0 to Point 2: |0-3| + |0-10| = 13
Point 0 to Point 3: |0-5| + |0-2| = 7
Point 0 to Point 4: |0-7| + |0-0| = 7
Point 1 to Point 2: |2-3| + |2-10| = 9
Point 1 to Point 3: |2-5| + |2-2| = 3
Point 1 to Point 4: |2-7| + |2-0| = 7
Point 2 to Point 3: |3-5| + |10-2| = 10
Point 2 to Point 4: |3-7| + |10-0| = 14
Point 3 to Point 4: |5-7| + |2-0| = 4
```

### Prim's Algorithm Execution:

| Step | Heap (cost, point) | Extract | Visited | Total Cost | Edges Added |
| ---- | ------------------ | ------- | ------- | ---------- | ----------- |
| 0 | [(0, 0)] | - | [F,F,F,F,F] | 0 | - |
| 1 | [(4,1),(13,2),(7,3),(7,4)] | (0,0) | [T,F,F,F,F] | 0 | Start |
| 2 | [(7,3),(7,4),(9,2),(13,2)] | (4,1) | [T,T,F,F,F] | 4 | 0→1 |
| 3 | [(7,4),(9,2),(10,2),(13,2)] | (7,3) | [T,T,F,T,F] | 11 | 1→3 |
| 4 | [(9,2),(10,2),(13,2),(14,2)] | (7,4) | [T,T,F,T,T] | 15 | 3→4 |
| 5 | [(10,2),(13,2),(14,2)] | (9,2) | [T,T,T,T,T] | 20 | 1→2 |

**Final MST Cost: 20**

### Kruskal's Algorithm Execution:

**Sorted Edges:**

```
[(1,3,3), (0,1,4), (3,4,4), (0,3,7), (0,4,7), (1,4,7), 
 (1,2,9), (2,3,10), (0,2,13), (2,4,14)]
```

| Step | Edge (u,v,cost) | find(u) | find(v) | Same? | Action | Total Cost |
| ---- | --------------- | ------- | ------- | ----- | ------ | ---------- |
| 1 | (1,3,3) | 1 | 3 | No | Union | 3 |
| 2 | (0,1,4) | 0 | 1 | No | Union | 7 |
| 3 | (3,4,4) | 3 | 4 | No | Union | 11 |
| 4 | (0,3,7) | 0 | 0 | Yes | Skip | 11 |
| 5 | (0,4,7) | 0 | 0 | Yes | Skip | 11 |
| 6 | (1,4,7) | 0 | 0 | Yes | Skip | 11 |
| 7 | (1,2,9) | 0 | 2 | No | Union | 20 |

**Final MST Cost: 20** ✅

---

## 🎓 Key Takeaways

1. **Complete Graph**: Every point connects to every other point
2. **Manhattan Distance**: `|x1-x2| + |y1-y2|` for 2D points
3. **Prim's is preferred**: No need to generate all edges upfront
4. **Both algorithms work**: Same time complexity, but different space usage
5. **MST Properties**: Exactly `n-1` edges for `n` points
6. **Early Termination**: Stop when `n-1` edges are added

---

## 📚 Related Problems

1. **Connecting Cities With Minimum Cost** (LeetCode 1135)
2. **Find Critical and Pseudo-Critical Edges** (LeetCode 1489)
3. **Optimize Water Distribution in a Village** (LeetCode 1168)
4. **Network Delay Time** (LeetCode 743)

---

