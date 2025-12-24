# 📡 Network Delay Time

**LeetCode 743** | **Medium** | **Dijkstra's Algorithm - Classic**

---

## 📝 Problem Description

You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = [ui, vi, wi]`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node `k`. Return the **minimum time** it takes for all the `n` nodes to receive the signal. If it is impossible for all the `n` nodes to receive the signal, return `-1`.

### Example 1:

**Input:**

```
times = [[2,1,1],[2,3,1],[3,4,1]]
n = 4
k = 2
```

**Output:**

```
2
```

**Explanation:**

```
Start signal from node 2:
- Node 2 receives at time 0
- Nodes 1 and 3 receive at time 1
- Node 4 receives at time 2

Maximum time = 2
```

### Example 2:

**Input:**

```
times = [[1,2,1]]
n = 2
k = 1
```

**Output:**

```
1
```

**Explanation:**

```
Start from node 1:
- Node 1 at time 0
- Node 2 at time 1

Maximum time = 1
```

### Example 3:

**Input:**

```
times = [[1,2,1]]
n = 2
k = 2
```

**Output:**

```
-1
```

**Explanation:**

```
No path from node 2 to node 1
Cannot reach all nodes
```

### Constraints:

- `1 <= k <= n <= 100`
- `1 <= times.length <= 6000`
- `times[i].length == 3`
- `1 <= ui, vi <= n`
- `ui != vi`
- `0 <= wi <= 100`
- All the pairs `(ui, vi)` are **unique** (no duplicate edges)

---

## 💡 Intuition

This is a **classic Dijkstra's shortest path problem**:

### Key Observations:

1. **Signal spreads simultaneously**: All paths from source are explored in parallel
2. **Find shortest path to ALL nodes**: Need distance from `k` to every other node
3. **Return maximum distance**: The time when the last node receives the signal
4. **Directed graph**: Edges only go in one direction

### Why Dijkstra's?

- **Single source shortest path**: Perfect for Dijkstra's
- **Non-negative weights**: All times >= 0
- **Need all distances**: Dijkstra finds shortest paths to all nodes
- **Result = max(distances)**: Last node to receive signal determines total time

### Algorithm Flow:

```
1. Build adjacency list
2. Initialize distances to infinity
3. Start Dijkstra from node k with distance 0
4. Use min-heap to always process closest node
5. Update distances to neighbors
6. Return max distance (or -1 if any node unreachable)
```

---

## 🔍 Algorithm

### Dijkstra's Algorithm Steps:

1. **Initialize**:
   - Build adjacency list from `times`
   - Create `dist` array, all Infinity except `dist[k] = 0`
   - Create min-heap with `(distance, node)`

2. **Main Loop** (while heap not empty):
   - Extract node with minimum distance
   - If already processed, skip
   - For each neighbor:
     - Calculate new distance = current distance + edge weight
     - If new distance < old distance:
       - Update distance
       - Add to heap

3. **Result**:
   - Find maximum distance in `dist` array
   - If any distance is Infinity → return `-1`
   - Else → return maximum distance

---

## 💻 Code

```javascript
class MinHeap {
  constructor(compareFn = (a, b) => a - b) {
    this.heap = [];
    this.compare = compareFn; // Custom comparison function
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
      // Use custom compare function
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

      // Use custom compare function
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

  size() {
    return this.heap.length;
  }
}

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
  // Step 1: Build adjacency list
  const graph = new Map();
  for (let i = 1; i <= n; i++) {
    graph.set(i, []);
  }

  for (const [u, v, w] of times) {
    graph.get(u).push({ node: v, time: w });
  }

  // Step 2: Initialize distances
  const dist = Array(n + 1).fill(Infinity);
  dist[k] = 0;

  // Step 3: Min-heap with custom comparator (compare by time)
  const pq = new MinHeap((a, b) => a.time - b.time);
  pq.insert({ node: k, time: 0 });

  // Step 4: Dijkstra's algorithm
  while (!pq.isEmpty()) {
    const { node, time } = pq.removeMin();

    // Skip if we've already found a better path
    if (time > dist[node]) continue;

    // Process all neighbors
    for (const { node: neighbor, time: edgeTime } of graph.get(node)) {
      const newTime = time + edgeTime;

      // If found shorter path
      if (newTime < dist[neighbor]) {
        dist[neighbor] = newTime;
        pq.insert({ node: neighbor, time: newTime });
      }
    }
  }

  // Step 5: Find maximum distance (excluding index 0)
  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) {
      return -1; // Some node is unreachable
    }
    maxTime = Math.max(maxTime, dist[i]);
  }

  return maxTime;
};
```

---

## ⏱️ Time and Space Complexity

### Time Complexity: O((V + E) log V)

**Breakdown:**

- Build adjacency list: O(E)
- Dijkstra's main loop:
  - Each node processed once: O(V)
  - Each edge relaxed once: O(E)
  - Heap operations: O(log V)
  - Total: O((V + E) × log V)
- Find maximum: O(V)
- **Overall: O((V + E) log V)**

### Space Complexity: O(V + E)

- Adjacency list: O(V + E)
- Distance array: O(V)
- Min-heap: O(V) in worst case
- **Total: O(V + E)**

---

## 🎯 Dry Run

### Input:

```
times = [[2,1,1],[2,3,1],[3,4,1]]
n = 4
k = 2
```

### Graph Representation:

```
    1
    ↑
    | 1
    |
    2 → 3 → 4
      1   1
```

### Adjacency List:

```
1: []
2: [{node: 1, time: 1}, {node: 3, time: 1}]
3: [{node: 4, time: 1}]
4: []
```

### Dijkstra's Execution:

| Step | Heap (time, node) | Extract   | dist[1] | dist[2] | dist[3] | dist[4] | Action               |
| ---- | ----------------- | --------- | ------- | ------- | ------- | ------- | -------------------- |
| Init | [(0, 2)]          | -         | ∞       | 0       | ∞       | ∞       | Start from node 2    |
| 1    | [(1,1), (1,3)]    | (0, 2)    | 1       | 0       | 1       | ∞       | Process 2            |
| 2    | [(1,3)]           | (1, 1)    | 1       | 0       | 1       | ∞       | Process 1 (no edges) |
| 3    | [(2,4)]           | (1, 3)    | 1       | 0       | 1       | 2       | Process 3            |
| 4    | []                | (2, 4)    | 1       | 0       | 1       | 2       | Process 4            |
| Done | -                 | -         | 1       | 0       | 1       | 2       | Heap empty           |

### Final Result:

```
dist = [∞, 1, 0, 1, 2]
max(dist[1..4]) = max(1, 0, 1, 2) = 2 ✅
```

### Example 3 (Impossible Case):

**Input:**

```
times = [[1,2,1]]
n = 2
k = 2
```

**Execution:**

```
Start from node 2
No outgoing edges from node 2
Cannot reach node 1
dist = [∞, ∞, 0]
dist[1] = ∞ → return -1 ✅
```

---

## 🎓 Key Takeaways

1. **Classic Dijkstra**: Single-source shortest path to all nodes
2. **Min-Heap is Essential**: Always process closest node first
3. **Result = Maximum Distance**: Last node to receive signal
4. **Check Reachability**: Return -1 if any Infinity distance
5. **Directed Graph**: Only follow edge directions
6. **Non-negative Weights**: Dijkstra works perfectly
7. **Lazy Deletion**: Skip if better path already found

---

## 🔄 Common Mistakes

❌ **Using BFS instead of Dijkstra**: Won't work with weighted edges
❌ **Forgetting to check all nodes**: Must verify all are reachable
❌ **1-indexed nodes**: Remember nodes are 1 to n, not 0 to n-1
❌ **Processing visited nodes**: Add check `if (time > dist[node]) continue`
❌ **Not using min-heap**: Priority queue is crucial for correctness

---

## 📚 Related Problems

1. **Cheapest Flights Within K Stops** (LeetCode 787)
2. **Path with Minimum Effort** (LeetCode 1631)
3. **Path with Maximum Probability** (LeetCode 1514)
4. **Find the City With Smallest Number of Neighbors** (LeetCode 1334)
5. **Minimum Cost to Make at Least One Valid Path** (LeetCode 1368)

---

