# 🧭 Minimum Cost to Make at Least One Valid Path in a Grid

**LeetCode 1368** | **Hard** | **0-1 BFS / Modified Dijkstra's**

---

## 📝 Problem Description

Given an `m x n` grid. Each cell of the grid has a sign pointing to the next cell you should visit if you are currently in this cell. The sign of `grid[i][j]` can be:

- `1` which means go to the cell to the right (i.e., go from `grid[i][j]` to `grid[i][j + 1]`)
- `2` which means go to the cell to the left (i.e., go from `grid[i][j]` to `grid[i][j - 1]`)
- `3` which means go to the lower cell (i.e., go from `grid[i][j]` to `grid[i + 1][j]`)
- `4` which means go to the upper cell (i.e., go from `grid[i][j]` to `grid[i - 1][j]`)

Notice that there could be some signs on the cells of the grid that point outside the grid.

You will initially start at the upper left cell `(0, 0)`. A valid path in the grid is a path that starts from the upper left cell `(0, 0)` and ends at the bottom-right cell `(m - 1, n - 1)` following the signs on the grid. The valid path does not have to be the shortest.

You can modify the sign on a cell with `cost = 1`. You can modify the sign on a cell **one time only**.

Return the **minimum cost** to make the grid have at least one valid path.

### Example 1:

**Input:**

```
grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]
```

**Output:**

```
3
```

**Explanation:**

```
Grid (arrows show directions):
→ → → →
← ← ← ←
→ → → →
← ← ← ←

Need to modify 3 cells to create a valid path
Example: Change (0,0)→down, (1,0)→down, (2,0)→down
Cost = 3
```

### Example 2:

**Input:**

```
grid = [[1,1,3],[3,2,2],[1,1,4]]
```

**Output:**

```
0
```

**Explanation:**

```
Grid:
1 1 3
3 2 2  
1 1 4

Can follow: (0,0)→right→(0,1)→right→(0,2)→down→(1,2)→left→(1,1)→down→(2,1)→wait...

Actually: (0,0)[1]→(0,1)[1]→(0,2)[3]→(1,2)[2]→(1,1)[2]→(1,0)[3]→(2,0)[1]→(2,1)[1]→(2,2) ✅
Cost = 0 (following existing arrows)
```

### Example 3:

**Input:**

```
grid = [[1,2],[4,3]]
```

**Output:**

```
1
```

### Constraints:

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 100`

---

## 💡 Intuition

This is a **special shortest path problem** where edges have weight 0 or 1:

### Key Observations:

1. **Following arrow = cost 0**: If we follow the existing arrow direction
2. **Changing direction = cost 1**: If we go in a different direction
3. **0-1 edge weights**: Perfect for **0-1 BFS** or Dijkstra
4. **Goal**: Find minimum cost path from `(0,0)` to `(m-1, n-1)`

### Approach Comparison:

| Algorithm | Best For | Time Complexity |
| --------- | -------- | --------------- |
| **0-1 BFS** | 0-1 edge weights | O(V + E) |
| **Dijkstra's** | Any non-negative weights | O((V + E) log V) |
| **Regular BFS** | Unweighted only | O(V + E) |

**0-1 BFS is optimal for this problem!**

### 0-1 BFS Strategy:

```
Use deque (double-ended queue):
- Cost 0 edges → add to FRONT (process first)
- Cost 1 edges → add to BACK (process later)

This maintains order without needing priority queue!
```

---

## 🔍 Algorithm

### Approach 1: 0-1 BFS (Optimal)

1. **Map directions** to offsets
2. **Initialize**:
   - Distance array: all Infinity except `dist[0][0] = 0`
   - Deque with `(row, col)`

3. **0-1 BFS**:
   - Pop from front of deque
   - For each of 4 neighbors:
     - If following arrow: cost = 0, add to **front**
     - If not following: cost = 1, add to **back**
     - Update if better distance found

4. **Return** `dist[m-1][n-1]`

### Approach 2: Dijkstra's

Same logic but use min-heap instead of deque.

---

## 💻 Code

### Solution 1: 0-1 BFS (Optimal - No Heap Needed!)

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minCost = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  // Direction mappings: 1=right, 2=left, 3=down, 4=up
  const directions = {
    1: [0, 1], // right
    2: [0, -1], // left
    3: [1, 0], // down
    4: [-1, 0], // up
  };

  const allDirections = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  // Distance array
  const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));
  dist[0][0] = 0;

  // Deque for 0-1 BFS (use array with push/unshift/shift/pop)
  const deque = [[0, 0]];

  while (deque.length > 0) {
    const [row, col] = deque.shift(); // Pop from front

    // Try all 4 directions
    for (const [dr, dc] of allDirections) {
      const newRow = row + dr;
      const newCol = col + dc;

      // Check bounds
      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) {
        continue;
      }

      // Check if this direction matches the arrow
      const currentArrow = grid[row][col];
      const arrowDirection = directions[currentArrow];

      // Cost 0 if following arrow, cost 1 otherwise
      const cost = arrowDirection[0] === dr && arrowDirection[1] === dc ? 0 : 1;
      const newDist = dist[row][col] + cost;

      // If found better path
      if (newDist < dist[newRow][newCol]) {
        dist[newRow][newCol] = newDist;

        // 0-1 BFS: add to front if cost 0, back if cost 1
        if (cost === 0) {
          deque.unshift([newRow, newCol]); // Add to front
        } else {
          deque.push([newRow, newCol]); // Add to back
        }
      }
    }
  }

  return dist[m - 1][n - 1];
};
```

### Solution 2: Dijkstra's (Alternative)

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
 * @param {number[][]} grid
 * @return {number}
 */
var minCost = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const directions = {
    1: [0, 1],
    2: [0, -1],
    3: [1, 0],
    4: [-1, 0],
  };

  const allDirections = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));
  dist[0][0] = 0;

  const pq = new MinHeap((a, b) => a.cost - b.cost);
  pq.insert({ cost: 0, row: 0, col: 0 });

  while (!pq.isEmpty()) {
    const { cost, row, col } = pq.removeMin();

    if (row === m - 1 && col === n - 1) {
      return cost;
    }

    if (cost > dist[row][col]) continue;

    for (const [dr, dc] of allDirections) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) {
        continue;
      }

      const arrow = grid[row][col];
      const arrowDir = directions[arrow];
      const edgeCost = arrowDir[0] === dr && arrowDir[1] === dc ? 0 : 1;
      const newCost = cost + edgeCost;

      if (newCost < dist[newRow][newCol]) {
        dist[newRow][newCol] = newCost;
        pq.insert({ cost: newCost, row: newRow, col: newCol });
      }
    }
  }

  return dist[m - 1][n - 1];
};
```

---

## ⏱️ Time and Space Complexity

### 0-1 BFS:

**Time Complexity: O(M × N)**

- Each cell visited at most once: O(M × N)
- Deque operations: O(1)
- **Total: O(M × N)**

**Space Complexity: O(M × N)**

- Distance matrix: O(M × N)
- Deque: O(M × N)

### Dijkstra's:

**Time Complexity: O(M × N × log(M × N))**

- Heap operations add log factor

**Space Complexity: O(M × N)**

**0-1 BFS is more efficient!**

---

## 🎯 Dry Run

### Input:

```
grid = [[1,1,3],[3,2,2],[1,1,4]]
```

### Direction Map:

```
Grid values:     Arrows:
1 1 3           → → ↓
3 2 2           ↓ ← ←
1 1 4           → → ↑
```

### 0-1 BFS Execution:

Following arrows costs 0, changing costs 1. The optimal path follows all arrows with cost 0.

---

## 🎓 Key Takeaways

1. **0-1 BFS for 0-1 Weights**: More efficient than Dijkstra
2. **Deque Strategy**: Cost 0 → front, Cost 1 → back
3. **Arrow Following**: Cost depends on matching direction
4. **Grid to Graph**: Each cell is a node, 4 edges per cell
5. **No Heap Needed**: 0-1 BFS uses simple deque

---

## 📚 Related Problems

1. **Shortest Path in Binary Matrix** (LeetCode 1091) - Grid BFS
2. **Path with Minimum Effort** (LeetCode 1631) - Modified Dijkstra
3. **Swim in Rising Water** (LeetCode 778) - Similar grid problem
4. **01 Matrix** (LeetCode 542) - Multi-source BFS
5. **Walls and Gates** (LeetCode 286) - Grid BFS

---

