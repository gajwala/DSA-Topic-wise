# 🎲 Path with Maximum Probability

**LeetCode 1514** | **Medium** | **Modified Dijkstra's (Maximize)**

---

## 📝 Problem Description

You are given an undirected weighted graph of `n` nodes (0-indexed), represented by an edge list where `edges[i] = [a, b]` is an undirected edge connecting the nodes `a` and `b` with a probability of success of traversing that edge `succProb[i]`.

Given two nodes `start` and `end`, find the path with the **maximum probability** of success to go from `start` to `end` and return its success probability.

If there is no path from `start` to `end`, return `0`. Your answer will be accepted if it differs from the correct answer by at most `1e-5`.

### Example 1:

**Input:**

```
n = 3
edges = [[0,1],[1,2],[0,2]]
succProb = [0.5,0.5,0.2]
start = 0
end = 2
```

**Output:**

```
0.25000
```

**Explanation:**

```
Graph:
    0.5
0 -------- 1
 \         /
  \0.2  0.5
   \     /
      2

Path 1: 0 → 2 directly
Probability: 0.2

Path 2: 0 → 1 → 2
Probability: 0.5 × 0.5 = 0.25 ✅ (better)
```

### Example 2:

**Input:**

```
n = 3
edges = [[0,1],[1,2],[0,2]]
succProb = [0.5,0.5,0.3]
start = 0
end = 2
```

**Output:**

```
0.30000
```

**Explanation:**

```
Path 1: 0 → 2 directly
Probability: 0.3 ✅ (best)

Path 2: 0 → 1 → 2
Probability: 0.5 × 0.5 = 0.25 (worse)
```

### Example 3:

**Input:**

```
n = 3
edges = [[0,1]]
succProb = [0.5]
start = 0
end = 2
```

**Output:**

```
0.00000
```

**Explanation:**

```
No path from 0 to 2
```

### Constraints:

- `2 <= n <= 10^4`
- `0 <= start, end < n`
- `start != end`
- `0 <= a, b < n`
- `a != b`
- `0 <= succProb.length == edges.length <= 2*10^4`
- `0 <= succProb[i] <= 1`
- There is at most one edge between every two nodes

---

## 💡 Intuition

This is **Dijkstra's algorithm inverted** - we want to **maximize** instead of minimize:

### Key Modifications:

| Standard Dijkstra's | This Problem |
| ------------------- | ------------ |
| Minimize sum of weights | Maximize product of probabilities |
| Add: `dist + weight` | Multiply: `prob × edgeProb` |
| **Min-heap** | **Max-heap** |
| Initialize to Infinity | Initialize to 0 |
| Update if smaller | Update if larger |

### Why Multiplication?

**Probability of independent events:**
```
P(A and B) = P(A) × P(B)

Path probability = product of all edge probabilities
Example: 0.5 × 0.5 × 0.8 = 0.2
```

### Algorithm Strategy:

```
Use MAX-heap instead of min-heap
Update: newProb = currentProb × edgeProb
Condition: if newProb > oldProb
```

---

## 🔍 Algorithm

### Modified Dijkstra's Steps:

1. **Initialize**:
   - Build adjacency list with probabilities
   - `prob[start] = 1.0`, all others = `0.0`
   - **Max-heap** with `(probability, node)` - sort by DESCENDING probability

2. **Main Loop**:
   - Extract node with **maximum** probability
   - If reached `end`, return probability
   - For each neighbor:
     - Calculate: `newProb = currentProb × edgeProb`
     - If `newProb > prob[neighbor]`:
       - Update `prob[neighbor]`
       - Add to max-heap

3. **Return** `prob[end]` or `0.0` if unreachable

---

## 💻 Code

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

  size() {
    return this.heap.length;
  }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
var maxProbability = function (n, edges, succProb, start, end) {
  // Build adjacency list
  const graph = new Map();
  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    const prob = succProb[i];

    graph.get(u).push({ node: v, prob });
    graph.get(v).push({ node: u, prob }); // undirected
  }

  // Initialize probabilities
  const maxProb = Array(n).fill(0.0);
  maxProb[start] = 1.0;

  // Max-heap: compare by DESCENDING probability (negate for min-heap)
  const pq = new MinHeap((a, b) => b.prob - a.prob);
  pq.insert({ prob: 1.0, node: start });

  while (!pq.isEmpty()) {
    const { prob, node } = pq.removeMin();

    // Early exit: reached destination
    if (node === end) {
      return prob;
    }

    // Skip if we've found a better path
    if (prob < maxProb[node]) continue;

    // Explore neighbors
    for (const { node: neighbor, prob: edgeProb } of graph.get(node)) {
      const newProb = prob * edgeProb;

      // If found better (higher) probability
      if (newProb > maxProb[neighbor]) {
        maxProb[neighbor] = newProb;
        pq.insert({ prob: newProb, node: neighbor });
      }
    }
  }

  return maxProb[end];
};
```

---

## ⏱️ Time and Space Complexity

### Time Complexity: O((V + E) log V)

**Breakdown:**

- Build adjacency list: O(E)
- Each vertex processed once: O(V)
- Each edge relaxed once: O(E)
- Heap operations: O(log V)
- **Total: O((V + E) log V)**

### Space Complexity: O(V + E)

- Adjacency list: O(V + E)
- Probability array: O(V)
- Max-heap: O(V)
- **Total: O(V + E)**

---

## 🎯 Dry Run

### Input:

```
n = 3
edges = [[0,1],[1,2],[0,2]]
succProb = [0.5,0.5,0.2]
start = 0
end = 2
```

### Graph:

```
    0.5
0 -------- 1
 \         /
  \0.2  0.5
   \     /
      2
```

### Adjacency List:

```
0: [{node: 1, prob: 0.5}, {node: 2, prob: 0.2}]
1: [{node: 0, prob: 0.5}, {node: 2, prob: 0.5}]
2: [{node: 0, prob: 0.2}, {node: 1, prob: 0.5}]
```

### Dijkstra's Execution:

| Step | Heap (prob, node)      | Extract   | Node | maxProb[0] | maxProb[1] | maxProb[2] | Action                    |
| ---- | ---------------------- | --------- | ---- | ---------- | ---------- | ---------- | ------------------------- |
| Init | [(1.0, 0)]             | -         | -    | 1.0        | 0.0        | 0.0        | Start                     |
| 1    | [(0.5,1), (0.2,2)]     | (1.0, 0)  | 0    | 1.0        | 0.5        | 0.2        | Update neighbors          |
| 2    | [(0.25,2), (0.2,2)]    | (0.5, 1)  | 1    | 1.0        | 0.5        | 0.25       | 0.5×0.5=0.25 > 0.2        |
| 3    | [(0.2,2)]              | (0.25, 2) | 2    | 1.0        | 0.5        | 0.25       | Reached end! **Return 0.25** ✅ |

### Path Reconstruction:

```
Optimal path: 0 → 1 → 2
Probability: 0.5 × 0.5 = 0.25
```

---

## 🎓 Key Takeaways

1. **Maximize, Not Minimize**: Use max-heap (or negate for min-heap)
2. **Multiply Probabilities**: `newProb = currentProb × edgeProb`
3. **Initialize to 0**: Start is 1.0, others are 0.0
4. **Update if Greater**: `newProb > maxProb[neighbor]`
5. **Undirected Graph**: Add edges in both directions
6. **Early Termination**: Return when destination reached
7. **Floating Point**: Use appropriate comparison (or epsilon)

---

## 🔄 Comparison with Standard Dijkstra's

```javascript
// Standard Dijkstra (Minimize)
dist[start] = 0; // others = Infinity
newDist = currentDist + edgeWeight;
if (newDist < dist[neighbor]) { ... }
MinHeap by distance

// Maximum Probability (Maximize)
prob[start] = 1.0; // others = 0.0
newProb = currentProb * edgeProb;
if (newProb > prob[neighbor]) { ... }
MaxHeap by probability
```

---

## 🔢 Why Use Logarithms (Alternative)?

To avoid floating point underflow with very small probabilities:

```javascript
// Convert to log space
// max(P1 × P2) = max(log(P1) + log(P2))
// Now it's addition, can use standard min-heap

const logProb = Array(n).fill(-Infinity);
logProb[start] = 0;

// In loop:
const newLogProb = logProb + Math.log(edgeProb);
```

---

## 📚 Related Problems

1. **Network Delay Time** (LeetCode 743) - Standard Dijkstra
2. **Path With Maximum Minimum Value** (LeetCode 1102) - Maximize minimum
3. **Path with Minimum Effort** (LeetCode 1631) - Minimize maximum
4. **Swim in Rising Water** (LeetCode 778) - Similar modification
5. **Cheapest Flights Within K Stops** (LeetCode 787) - With constraints

---

