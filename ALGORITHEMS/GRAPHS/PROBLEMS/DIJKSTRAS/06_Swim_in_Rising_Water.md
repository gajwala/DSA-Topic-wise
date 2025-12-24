# 🏊 Swim in Rising Water

**LeetCode 778** | **Hard** | **Modified Dijkstra's (Minimize Maximum)**

---

## 📝 Problem Description

You are given an `n x n` integer matrix `grid` where each value `grid[i][j]` represents the elevation at that point `(i, j)`.

The rain starts to fall. At time `t`, the depth of the water everywhere is `t`. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most `t`. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.

Return the **least time** until you can reach the bottom right square `(n - 1, n - 1)` if you start at the top left square `(0, 0)`.

### Example 1:

**Input:**

```
grid = [[0,2],[1,3]]
```

**Output:**

```
3
```

**Explanation:**

```
Grid elevations:
0 2
1 3

Time 0: Can visit (0,0) elevation 0
Time 1: Can visit (0,0) and (1,0) (elevations ≤ 1)
Time 2: Can visit (0,0), (1,0), (0,1) (elevations ≤ 2)
Time 3: Can visit all squares → reach (1,1) ✅

Minimum time = 3
```

### Example 2:

**Input:**

```
grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
```

**Output:**

```
16
```

**Explanation:**

```
  0  1  2  3  4
 24 23 22 21  5
 12 13 14 15 16
 11 17 18 19 20
 10  9  8  7  6

Optimal path: 0→1→2→3→4→5→16 (going around the edge)
Maximum elevation on this path = 16
```

### Constraints:

- `n == grid.length`
- `n == grid[i].length`
- `1 <= n <= 50`
- `0 <= grid[i][j] < n²`
- Each value `grid[i][j]` is **unique**

---

## 💡 Intuition

This is similar to **"Path with Minimum Effort"** - we want to **minimize the maximum** elevation on our path:

### Key Insights:

1. **Time = Maximum Elevation**: The time needed is the highest elevation on the path
2. **Minimize Maximum**: Among all paths, find one with smallest maximum elevation
3. **Not sum of elevations**: Only the maximum matters
4. **Dijkstra's Modification**: Track maximum elevation instead of sum

### Comparison:

| Standard Dijkstra's | This Problem |
| ------------------- | ------------ |
| Minimize sum | Minimize maximum |
| `dist = sum of weights` | `time = max of elevations` |
| `newDist = dist + weight` | `newTime = max(time, elevation)` |

### Why This Works:

- At time `t`, we can visit all squares with elevation ≤ `t`
- To reach destination, we need time ≥ max elevation on any path
- Dijkstra's finds path with minimum such maximum

---

## 🔍 Algorithm

### Modified Dijkstra's Steps:

1. **Initialize**:
   - `time[0][0] = grid[0][0]` (start elevation)
   - All other cells = Infinity
   - Min-heap with `(time, row, col)`

2. **Main Loop**:
   - Extract cell with minimum time
   - If reached destination, return time
   - For each of 4 neighbors:
     - Calculate: `newTime = max(currentTime, grid[newRow][newCol])`
     - If `newTime < time[newRow][newCol]`:
       - Update and add to heap

3. **Return** time when destination reached

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
var swimInWater = function (grid) {
  const n = grid.length;

  // Time matrix: minimum time to reach each cell
  const time = Array.from({ length: n }, () => Array(n).fill(Infinity));
  time[0][0] = grid[0][0];

  // Min-heap: prioritize by time
  const pq = new MinHeap((a, b) => a.time - b.time);
  pq.insert({ time: grid[0][0], row: 0, col: 0 });

  // 4 directions: up, down, left, right
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (!pq.isEmpty()) {
    const { time: t, row, col } = pq.removeMin();

    // Early exit: reached destination
    if (row === n - 1 && col === n - 1) {
      return t;
    }

    // Skip if we've found a better path
    if (t > time[row][col]) continue;

    // Explore all 4 neighbors
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // Check bounds
      if (newRow < 0 || newRow >= n || newCol < 0 || newCol >= n) {
        continue;
      }

      // Calculate new time: max of current time and neighbor's elevation
      const newTime = Math.max(t, grid[newRow][newCol]);

      // If found better (lower) time
      if (newTime < time[newRow][newCol]) {
        time[newRow][newCol] = newTime;
        pq.insert({ time: newTime, row: newRow, col: newCol });
      }
    }
  }

  return time[n - 1][n - 1];
};
```

---

## ⏱️ Time and Space Complexity

### Time Complexity: O(n² log n²) = O(n² log n)

**Breakdown:**

- Total cells: n²
- Each cell processed once: O(n²)
- Each cell has 4 neighbors: O(4n²) = O(n²)
- Heap operations: O(log n²) = O(2 log n) = O(log n)
- **Total: O(n² log n)**

### Space Complexity: O(n²)

- Time matrix: O(n²)
- Min-heap: O(n²) in worst case
- **Total: O(n²)**

---

## 🎯 Dry Run

### Input:

```
grid = [[0,2],[1,3]]
```

### Grid:

```
0 2
1 3
```

### Dijkstra's Execution:

| Step | Heap (time, r, c) | Extract   | Cell  | Neighbors Checked | time Matrix     | Action                     |
| ---- | ----------------- | --------- | ----- | ----------------- | --------------- | -------------------------- |
| Init | [(0,0,0)]         | -         | -     | -                 | [[0,∞],[∞,∞]]   | Start                      |
| 1    | [(2,0,1),(1,1,0)] | (0,0,0)   | (0,0) | Right:2, Down:1   | [[0,2],[1,∞]]   | Add neighbors              |
| 2    | [(2,0,1),(3,1,1)] | (1,1,0)   | (1,0) | Up:skip, Right:3  | [[0,2],[1,3]]   | Add (1,1)                  |
| 3    | [(3,1,1)]         | (2,0,1)   | (0,1) | Down:3            | [[0,2],[1,3]]   | (1,1) already has time 3   |
| 4    | []                | (3,1,1) | (1,1) DEST!                 | [[0,2],[1,3]]   | **Return 3** ✅            |

### Path Analysis:

```
Path: (0,0) → (1,0) → (1,1)
Elevations: 0 → 1 → 3
Max elevation = 3
Time needed = 3 ✅
```

---

## 🎓 Key Takeaways

1. **Minimize Maximum**: Find path with smallest maximum elevation
2. **Modified Update**: `newTime = max(currentTime, elevation)`
3. **Greedy Still Works**: Process cells with smallest time first
4. **Similar to Path with Minimum Effort**: Same algorithmic pattern
5. **Early Termination**: Return when destination reached
6. **Unique Values**: Each elevation appears only once (given in constraints)

---

## 🔄 Alternative Approaches

### 1. **Binary Search + BFS/DFS**:

```javascript
// Binary search on time value
// For each mid, check if path exists with all elevations ≤ mid
// Time: O(n² log(max_elevation))
```

### 2. **Union-Find**:

```javascript
// Sort all cells by elevation
// Add cells incrementally
// Check when start and end are connected
// Time: O(n² log n)
```

### 3. **Modified Dijkstra (This Solution)**:

```javascript
// Most intuitive and direct
// Time: O(n² log n)
```

---

## 📚 Related Problems

1. **Path with Minimum Effort** (LeetCode 1631) - Almost identical
2. **Path With Maximum Minimum Value** (LeetCode 1102) - Maximize minimum
3. **Minimum Cost to Make at Least One Valid Path** (LeetCode 1368)
4. **Trapping Rain Water II** (LeetCode 407) - Similar concept
5. **Cheapest Flights Within K Stops** (LeetCode 787) - Constrained shortest path

---

