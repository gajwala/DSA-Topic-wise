# 🌳 Minimum Cost to Reach City With Discounts

**LeetCode 2093** | **Medium** | **Modified MST/Shortest Path**

---

## 📝 Problem Description

A series of highways connect `n` cities numbered from `0` to `n - 1`. You are given a 2D integer array `highways` where `highways[i] = [city1i, city2i, tolli]` indicates that there is a highway that connects `city1i` and `city2i`, allowing a car to go from `city1i` to `city2i` **and vice versa** for a cost of `tolli`.

You are also given an integer `discounts` which represents the number of discounts you have. You can use a discount to travel across the `ith` highway for a cost of `tolli / 2` (integer division). Each discount may only be used **once**, and you can only use at most **one discount per highway**.

Return the **minimum total cost** to go from city `0` to city `n - 1`, or `-1` if it is not possible to go from city `0` to city `n - 1`.

### Example 1:

**Input:**

```
n = 5
highways = [[0,1,4],[2,1,3],[1,4,11],[3,2,3],[3,4,2]]
discounts = 1
```

**Output:**

```
9
```

**Explanation:**

```
Path: 0 → 1 → 2 → 3 → 4
Costs without discount: 4 + 3 + 3 + 2 = 12
Use discount on highway [1,4,11]: cost becomes 11/2 = 5
Total: 4 + 5 = 9
```

### Example 2:

**Input:**

```
n = 4
highways = [[1,3,17],[1,2,7],[3,2,5],[0,1,6],[3,0,20]]
discounts = 20
```

**Output:**

```
8
```

**Explanation:**

```
Path: 0 → 1 → 3
Without discounts: 6 + 17 = 23
With discounts: 6/2 + 17/2 = 3 + 8 = 11
Alternate path: 0 → 1 → 2 → 3
Without: 6 + 7 + 5 = 18
With: 6/2 + 7/2 + 5/2 = 3 + 3 + 2 = 8
```

### Example 3:

**Input:**

```
n = 4
highways = [[0,1,3],[2,3,2]]
discounts = 0
```

**Output:**

```
-1
```

**Explanation:**

```
No path exists from 0 to 3
```

### Constraints:

- `2 <= n <= 1000`
- `1 <= highways.length <= 1000`
- `highways[i].length == 3`
- `0 <= city1i, city2i <= n - 1`
- `city1i != city2i`
- `0 <= tolli <= 10^5`
- `0 <= discounts <= 500`
- No duplicate highways

---

## 💡 Intuition

This is a **modified shortest path problem** with state tracking:

### Key Observations:

1. **Not a Pure MST**: We need shortest path from 0 to n-1, not spanning tree
2. **State Space**: `(city, discounts_used)` → different states for same city
3. **Dijkstra's with State**: Track both position and discounts used
4. **Choice at Each Edge**: Use discount OR don't use discount

### Why Not Pure MST?

- **MST**: Connects ALL nodes with minimum total weight
- **This Problem**: Find ONE path from source to destination
- **Solution**: Use Dijkstra's algorithm with modified state

### State Representation:

```
State = (city, discountsUsed)
Cost[city][k] = minimum cost to reach city using k discounts
```

---

## 🔍 Algorithm

### Modified Dijkstra's Approach:

1. **State**: `(cost, city, discountsUsed)`
2. **Priority Queue**: Min-heap based on cost
3. **Visited**: Track `visited[city][discountsUsed]`
4. **For Each Edge**:
   - Option 1: Don't use discount → `cost + toll`
   - Option 2: Use discount (if available) → `cost + toll/2`

### Steps:

1. Build adjacency list
2. Initialize heap with `(0, 0, 0)` → cost=0, city=0, discounts=0
3. While heap not empty:
   - Extract minimum cost state
   - If reached city n-1, return cost
   - Try all neighbors with/without discount
4. Return -1 if no path found

---

## 💻 Code

### Solution: Dijkstra's with State Tracking

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
 * @param {number[][]} highways
 * @param {number} discounts
 * @return {number}
 */
var minimumCost = function (n, highways, discounts) {
  // Build adjacency list
  const graph = new Map();
  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (const [u, v, toll] of highways) {
    graph.get(u).push([v, toll]);
    graph.get(v).push([u, toll]);
  }

  // Min-heap: [cost, city, discountsUsed]
  const pq = new MinHeap((a, b) => a[0] - b[0]);
  pq.insert([0, 0, 0]); // Start at city 0 with 0 cost and 0 discounts used

  // visited[city][discountsUsed] = minimum cost to reach this state
  const visited = Array.from({ length: n }, () =>
    Array(discounts + 1).fill(Infinity)
  );
  visited[0][0] = 0;

  while (!pq.isEmpty()) {
    const [cost, city, used] = pq.removeMin();

    // If we reached destination
    if (city === n - 1) {
      return cost;
    }

    // Skip if we've found better path to this state
    if (cost > visited[city][used]) continue;

    // Try all neighbors
    for (const [nextCity, toll] of graph.get(city)) {
      // Option 1: Don't use discount
      const newCost1 = cost + toll;
      if (newCost1 < visited[nextCity][used]) {
        visited[nextCity][used] = newCost1;
        pq.insert([newCost1, nextCity, used]);
      }

      // Option 2: Use discount (if available)
      if (used < discounts) {
        const newCost2 = cost + Math.floor(toll / 2);
        if (newCost2 < visited[nextCity][used + 1]) {
          visited[nextCity][used + 1] = newCost2;
          pq.insert([newCost2, nextCity, used + 1]);
        }
      }
    }
  }

  return -1; // No path found
};
```

---

## ⏱️ Time and Space Complexity

### Time Complexity: O((E × D) × log(V × D))

**Breakdown:**

- States: V cities × D discount levels = V × D states
- Each edge processed at most D times
- Heap operations: O(log(V × D))
- Total: O(E × D × log(V × D))

### Space Complexity: O(V × D)

- Adjacency list: O(V + E)
- Visited array: O(V × D)
- Priority queue: O(V × D)
- Total: O(V × D + E)

---

## 🎯 Dry Run

### Input:

```
n = 5
highways = [[0,1,4],[2,1,3],[1,4,11],[3,2,3],[3,4,2]]
discounts = 1
```

**Graph:**

```
0 ← 4 → 1 ← 3 → 2
        ↓       ↓
       11       3
        ↓       ↓
        4 ← 2 → 3
```

**Dijkstra's Execution:**

| Step | Heap (cost, city, used) | Extract | City | Action | New States Added |
| ---- | ----------------------- | ------- | ---- | ------ | ---------------- |
| 1 | [(0,0,0)] | (0,0,0) | 0 | Start | (4,1,0), (2,1,1) |
| 2 | [(2,1,1),(4,1,0)] | (2,1,1) | 1 | Use discount | (5,2,1), (7,4,1) |
| 3 | [(4,1,0),(5,2,1),(7,4,1)] | (4,1,0) | 1 | No discount | - |
| 4 | [(5,2,1),(7,4,1),(7,2,0)] | (5,2,1) | 2 | - | (8,3,1) |
| 5 | [(7,4,1),(7,2,0),(8,3,1)] | (7,4,1) | 4 | Reached! | **Return 7** |

**Wait, let me recalculate:**

Actually, the optimal path is:
- 0 → 1 (use discount): 4/2 = 2
- 1 → 4 (no discount): 11
- Total: 13

OR:
- 0 → 1 (no discount): 4
- 1 → 4 (use discount): 11/2 = 5
- Total: **9** ✅

---

## 🎓 Key Takeaways

1. **Not Pure MST**: This is shortest path, not spanning tree
2. **State Space**: Track (city, discounts_used)
3. **Dijkstra's Modification**: Multiple states per city
4. **Choice**: Use discount or save it for later
5. **2D Visited Array**: `visited[city][discountsUsed]`
6. **Early Termination**: Return when destination reached

---

## 🔄 MST vs Shortest Path

| Aspect | MST | This Problem |
| ------ | --- | ------------ |
| **Goal** | Connect all nodes | Reach specific destination |
| **Edges Used** | n-1 edges | Variable path length |
| **Algorithm** | Kruskal's/Prim's | Dijkstra's |
| **Result** | Tree structure | Single path |
| **Optimization** | Total weight | Path cost |

---

## 📚 Related Problems

1. **Network Delay Time** (LeetCode 743)
2. **Cheapest Flights Within K Stops** (LeetCode 787)
3. **Path with Maximum Minimum Value** (LeetCode 1102)
4. **Minimum Cost to Make at Least One Valid Path** (LeetCode 1368)

---

