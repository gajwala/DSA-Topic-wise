# 🎯 Path With Maximum Minimum Value

**LeetCode 1102** | **Medium** | **Modified Dijkstra's (Maximize Minimum)**

---

## 📝 Problem Description

Given an `m x n` integer matrix `grid`, return the **maximum** **score** of a path starting at `(0, 0)` and ending at `(m - 1, n - 1)` moving in the 4 cardinal directions.

The **score** of a path is the **minimum** value in that path.

- For example, the score of the path `8 → 4 → 5 → 9` is `4`.

### Example 1:

**Input:**

```
grid = [[5,4,5],[1,2,6],[7,4,6]]
```

**Output:**

```
4
```

**Explanation:**

```
Grid:
5 4 5
1 2 6
7 4 6

Path with maximum minimum value:
5 → 4 → 5 → 6 → 6
Minimum value = 4 ✅

Other paths:
5 → 4 → 2 → 6 → 6: min = 2 (worse)
5 → 1 → 7 → 4 → 6: min = 1 (worse)
```

### Example 2:

**Input:**

```
grid = [[2,2,1,2,2,2],[1,2,2,2,1,2]]
```

**Output:**

```
2
```

**Explanation:**

```
Path: 2 → 2 → 2 → 2 → 2 → 2
Minimum value = 2 ✅
```

### Example 3:

**Input:**

```
grid = [[3,4,6,3,4],[0,2,1,1,7],[8,8,3,2,7],[3,2,4,9,8],[4,1,2,0,0],[4,6,5,4,3]]
```

**Output:**

```
3
```

### Constraints:

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 100`
- `0 <= grid[i][j] <= 10^9`

---

## 💡 Intuition

This is the **opposite** of "Path with Minimum Effort" - we want to **maximize the minimum** value along the path:

### Key Insights:

1. **Score = Minimum Value**: The weakest link determines the path strength
2. **Maximize Minimum**: Find path where the minimum value is as large as possible
3. **Use Max-Heap**: Always explore path with highest minimum value first

### Comparison Table:

| Problem | Goal | Heap Type | Update Rule |
| ------- | ---- | --------- | ----------- |
| **Min Effort** | Minimize maximum | Min-heap | `max(current, neighbor)` |
| **This Problem** | Maximize minimum | Max-heap | `min(current, neighbor)` |
| **Swim in Water** | Minimize maximum | Min-heap | `max(current, neighbor)` |

### Algorithm Strategy:

```
Use MAX-heap (not min-heap!)
Update: newScore = min(currentScore, grid[newCell])
Condition: if newScore > oldScore
```

---

## 🔍 Algorithm

### Modified Dijkstra's Steps:

1. **Initialize**:
   - `score[0][0] = grid[0][0]`
   - All other cells = -Infinity (or 0)
   - **Max-heap** with `(score, row, col)`

2. **Main Loop**:
   - Extract cell with **maximum** score
   - If reached destination, return score
   - For each of 4 neighbors:
     - Calculate: `newScore = min(currentScore, grid[neighbor])`
     - If `newScore > score[neighbor]`:
       - Update and add to max-heap

3. **Return** maximum minimum value to reach destination

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
 * @param {number[][]} grid
 * @return {number}
 */
var maximumMinimumPath = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  // Score matrix: maximum minimum value to reach each cell
  const score = Array.from({ length: m }, () => Array(n).fill(-Infinity));
  score[0][0] = grid[0][0];

  // Max-heap: compare by DESCENDING score (negate for min-heap)
  const pq = new MinHeap((a, b) => b.score - a.score);
  pq.insert({ score: grid[0][0], row: 0, col: 0 });

  // 4 directions: up, down, left, right
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (!pq.isEmpty()) {
    const { score: currScore, row, col } = pq.removeMin();

    // Early exit: reached destination
    if (row === m - 1 && col === n - 1) {
      return currScore;
    }

    // Skip if we've found a better path
    if (currScore < score[row][col]) continue;

    // Explore all 4 neighbors
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // Check bounds
      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) {
        continue;
      }

      // Calculate new score: minimum of current score and neighbor value
      const newScore = Math.min(currScore, grid[newRow][newCol]);

      // If found better (higher minimum) score
      if (newScore > score[newRow][newCol]) {
        score[newRow][newCol] = newScore;
        pq.insert({ score: newScore, row: newRow, col: newCol });
      }
    }
  }

  return score[m - 1][n - 1];
};
```

---

## ⏱️ Time and Space Complexity

### Time Complexity: O(M × N × log(M × N))

**Breakdown:**

- Total cells: M × N
- Each cell processed once: O(M × N)
- Each cell has 4 neighbors: O(4 × M × N) = O(M × N)
- Heap operations: O(log(M × N))
- **Total: O(M × N × log(M × N))**

### Space Complexity: O(M × N)

- Score matrix: O(M × N)
- Max-heap: O(M × N) in worst case
- **Total: O(M × N)**

---

## 🎯 Dry Run

### Input:

```
grid = [[5,4,5],[1,2,6],[7,4,6]]
```

### Grid Visualization:

```
  0 1 2
0 5 4 5
1 1 2 6
2 7 4 6
```

### Dijkstra's Execution:

| Step | Heap (score, r, c) | Extract   | Cell  | Neighbors Relaxed             | Score Matrix                                  | Action              |
| ---- | ------------------ | --------- | ----- | ----------------------------- | --------------------------------------------- | ------------------- |
| Init | [(5,0,0)]          | -         | -     | -                             | [[5,-∞,-∞],[-∞,-∞,-∞],[-∞,-∞,-∞]]             | Start               |
| 1    | [(4,0,1),(1,1,0)]  | (5,0,0)   | (0,0) | Right:min(5,4)=4, Down:1      | [[5,4,-∞],[1,-∞,-∞],[-∞,-∞,-∞]]               | Add neighbors       |
| 2    | [(4,0,2),(1,1,0)]  | (4,0,1)   | (0,1) | Right:4, Down:2               | [[5,4,4],[1,2,-∞],[-∞,-∞,-∞]]                 | Right & down        |
| 3    | [(4,0,2),(4,1,2)]  | (4,0,2)   | (0,2) | Down:min(4,6)=4               | [[5,4,4],[1,2,4],[-∞,-∞,-∞]]                  | Down to (1,2)       |
| 4    | [(4,1,2),(2,1,1)]  | (4,1,2)   | (1,2) | Down:min(4,6)=4               | [[5,4,4],[1,2,4],[-∞,-∞,4]]                   | Down to (2,2)       |
| 5    | [(4,2,2),(2,1,1)]  | (4,2,2) | (2,2) DEST!                   | [[5,4,4],[1,2,4],[-∞,-∞,4]]                   | **Return 4** ✅     |

### Path Analysis:

```
Optimal path: (0,0) → (0,1) → (0,2) → (1,2) → (2,2)
Values: 5 → 4 → 5 → 6 → 6
Minimum = 4 ✅
```

---

## 🎓 Key Takeaways

1. **Maximize Minimum**: Find path where weakest link is strongest
2. **Max-Heap Essential**: Always explore best (highest minimum) path first
3. **Update Rule**: `newScore = min(current, neighbor)`
4. **Initialize to -Infinity**: Want to maximize, so start low
5. **Greedy Works**: Max-heap ensures we find optimal solution
6. **Opposite of Min Effort**: Inverse problem, inverse solution

---

## 🔄 Dijkstra's Variations Summary

| Problem | Objective | Heap | Update Rule | Initialize |
| ------- | --------- | ---- | ----------- | ---------- |
| **Standard** | Min sum | Min | `current + weight` | dist[start]=0 |
| **Max Probability** | Max product | Max | `current × prob` | prob[start]=1.0 |
| **Min Effort** | Min max | Min | `max(current, weight)` | effort[start]=0 |
| **This Problem** | Max min | Max | `min(current, value)` | score[start]=grid[0][0] |

---

## 🔄 Alternative Approaches

### 1. **Binary Search + BFS**:

```javascript
// Binary search on minimum value
// For each mid, check if path exists with all values ≥ mid
// Time: O(M × N × log(max_value))
```

### 2. **Union-Find**:

```javascript
// Sort all cells by value (descending)
// Add cells incrementally
// Check when start and end are connected
// Time: O(M × N × log(M × N))
```

### 3. **Modified Dijkstra (This Solution)**:

```javascript
// Most intuitive
// Time: O(M × N × log(M × N))
```

---

## 📚 Related Problems

1. **Path with Minimum Effort** (LeetCode 1631) - Minimize maximum
2. **Swim in Rising Water** (LeetCode 778) - Minimize maximum
3. **Path with Maximum Probability** (LeetCode 1514) - Maximize product
4. **Network Delay Time** (LeetCode 743) - Standard Dijkstra
5. **Cheapest Flights Within K Stops** (LeetCode 787) - With constraints

---

