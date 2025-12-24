# 🔢 Build a Matrix With Conditions

**LeetCode 2392** | **Hard** | **2D Topological Sort**

---

## 📝 Problem Description

You are given a **positive** integer `k`. You are also given:

- a 2D integer array `rowConditions` of size `n` where `rowConditions[i] = [abovei, belowi]`, and
- a 2D integer array `colConditions` of size `m` where `colConditions[i] = [lefti, righti]`.

The two arrays contain integers from `1` to `k`.

You have to build a `k x k` matrix that contains each of the numbers from `1` to `k` **exactly once**. The remaining cells should have the value `0`.

The matrix should also satisfy the following conditions:

- The number `abovei` should appear in a **row** that is strictly **above** the row at which the number `belowi` appears for all `i` from `0` to `n - 1`.
- The number `lefti` should appear in a **column** that is strictly **left** of the column at which the number `righti` appears for all `i` from `0` to `m - 1`.

Return ***any** matrix that satisfies the conditions*. If no answer exists, return an empty array.

### Example 1:

**Input:**

```
k = 3
rowConditions = [[1,2],[3,2]]
colConditions = [[2,1],[3,2]]
```

**Output:**

```
[[3,0,0],[0,0,1],[0,2,0]]
```

**Explanation:**

```
Matrix:
3 0 0
0 0 1
0 2 0

Row constraints:
- 1 above 2: 1 is in row 1, 2 is in row 2 ✅
- 3 above 2: 3 is in row 0, 2 is in row 2 ✅

Column constraints:
- 2 left of 1: 2 is in col 1, 1 is in col 2 ✅
- 3 left of 2: 3 is in col 0, 2 is in col 1 ✅
```

### Example 2:

**Input:**

```
k = 3
rowConditions = [[1,2],[2,3],[3,1],[2,3]]
colConditions = [[2,1]]
```

**Output:**

```
[]
```

**Explanation:**

```
Row constraints have a cycle: 1→2→3→1
Impossible to satisfy!
```

### Constraints:

- `2 <= k <= 400`
- `1 <= rowConditions.length, colConditions.length <= 10^4`
- `rowConditions[i].length == colConditions[i].length == 2`
- `1 <= abovei, belowi, lefti, righti <= k`
- `abovei != belowi`
- `lefti != righti`

---

## 💡 Intuition

This is **two independent topological sorts**:

### Key Insight:

```
Row ordering and column ordering are INDEPENDENT!

1. Topological sort for rows (using rowConditions)
2. Topological sort for columns (using colConditions)
3. Place numbers according to both orderings
```

### Algorithm:

```
Step 1: Topological sort on rows
       - Get row position for each number

Step 2: Topological sort on columns
       - Get column position for each number

Step 3: Build matrix
       - Place number i at (row[i], col[i])

If either sort has a cycle → return []
```

### Why This Works:

```
Row constraints only affect row positions
Column constraints only affect column positions
They don't interfere with each other!

Example:
rowOrder = [3, 1, 2]  (3 in row 0, 1 in row 1, 2 in row 2)
colOrder = [3, 2, 1]  (3 in col 0, 2 in col 1, 1 in col 2)

Result:
  col0 col1 col2
row0  3    0    0
row1  0    0    1
row2  0    2    0
```

---

## 🔍 Algorithm

### Two-Level Topological Sort:

1. **Row Ordering**:
   - Build graph from rowConditions
   - Topological sort (DFS or Kahn's)
   - Get row position for each number

2. **Column Ordering**:
   - Build graph from colConditions
   - Topological sort
   - Get column position for each number

3. **Build Matrix**:
   - Initialize k×k matrix with zeros
   - For each number i:
     - Place at (rowPos[i], colPos[i])

4. **Validation**:
   - If either sort fails (cycle) → return []

---

## 💻 Code

### Solution: Double Kahn's Algorithm

```javascript
/**
 * @param {number} k
 * @param {number[][]} rowConditions
 * @param {number[][]} colConditions
 * @return {number[][]}
 */
var buildMatrix = function (k, rowConditions, colConditions) {
  // Helper: Topological sort using Kahn's algorithm
  function topologicalSort(k, conditions) {
    // Build graph and calculate in-degrees
    const graph = Array.from({ length: k + 1 }, () => []);
    const inDegree = Array(k + 1).fill(0);

    for (const [from, to] of conditions) {
      graph[from].push(to);
      inDegree[to]++;
    }

    // Queue all nodes with in-degree 0
    const queue = [];
    for (let i = 1; i <= k; i++) {
      if (inDegree[i] === 0) {
        queue.push(i);
      }
    }

    const order = [];

    while (queue.length > 0) {
      const node = queue.shift();
      order.push(node);

      for (const neighbor of graph[node]) {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      }
    }

    // Check if all nodes are included (no cycle)
    return order.length === k ? order : null;
  }

  // Step 1: Get row ordering
  const rowOrder = topologicalSort(k, rowConditions);
  if (!rowOrder) return []; // Cycle in rows

  // Step 2: Get column ordering
  const colOrder = topologicalSort(k, colConditions);
  if (!colOrder) return []; // Cycle in columns

  // Step 3: Create position mappings
  const rowPosition = new Map();
  const colPosition = new Map();

  for (let i = 0; i < k; i++) {
    rowPosition.set(rowOrder[i], i);
    colPosition.set(colOrder[i], i);
  }

  // Step 4: Build the matrix
  const matrix = Array.from({ length: k }, () => Array(k).fill(0));

  for (let num = 1; num <= k; num++) {
    const row = rowPosition.get(num);
    const col = colPosition.get(num);
    matrix[row][col] = num;
  }

  return matrix;
};
```

### Solution 2: DFS-Based Topological Sort

```javascript
/**
 * @param {number} k
 * @param {number[][]} rowConditions
 * @param {number[][]} colConditions
 * @return {number[][]}
 */
var buildMatrix = function (k, rowConditions, colConditions) {
  // DFS-based topological sort
  function topologicalSortDFS(k, conditions) {
    const graph = Array.from({ length: k + 1 }, () => []);

    for (const [from, to] of conditions) {
      graph[from].push(to);
    }

    const state = Array(k + 1).fill(0); // 0=unvisited, 1=visiting, 2=visited
    const result = [];

    function dfs(node) {
      if (state[node] === 1) return false; // Cycle
      if (state[node] === 2) return true; // Already visited

      state[node] = 1; // Mark visiting

      for (const neighbor of graph[node]) {
        if (!dfs(neighbor)) return false;
      }

      state[node] = 2; // Mark visited
      result.push(node);
      return true;
    }

    // DFS from all unvisited nodes
    for (let i = 1; i <= k; i++) {
      if (state[i] === 0) {
        if (!dfs(i)) return null; // Cycle detected
      }
    }

    return result.reverse(); // Reverse for topological order
  }

  // Get orderings
  const rowOrder = topologicalSortDFS(k, rowConditions);
  if (!rowOrder) return [];

  const colOrder = topologicalSortDFS(k, colConditions);
  if (!colOrder) return [];

  // Build matrix (same as above)
  const rowPosition = new Map();
  const colPosition = new Map();

  for (let i = 0; i < k; i++) {
    rowPosition.set(rowOrder[i], i);
    colPosition.set(colOrder[i], i);
  }

  const matrix = Array.from({ length: k }, () => Array(k).fill(0));

  for (let num = 1; num <= k; num++) {
    const row = rowPosition.get(num);
    const col = colPosition.get(num);
    matrix[row][col] = num;
  }

  return matrix;
};
```

---

## ⏱️ Time and Space Complexity

**Time Complexity: O(K² + R + C)**

where K = matrix size, R = row conditions, C = column conditions

- Row topological sort: O(K + R)
- Column topological sort: O(K + C)
- Build matrix: O(K²)
- **Total: O(K² + R + C)**

**Space Complexity: O(K² + R + C)**

- Matrix: O(K²)
- Graphs: O(K + R + C)
- Maps: O(K)

---

## 🎯 Dry Run

### Input:

```
k = 3
rowConditions = [[1,2],[3,2]]
colConditions = [[2,1],[3,2]]
```

### Step 1: Row Topological Sort

**Graph:**

```
1 → 2
3 → 2
```

**Row Order:** `[1, 3, 2]` or `[3, 1, 2]`

Let's say: `[3, 1, 2]`

**Row Positions:**

```
3 → row 0
1 → row 1
2 → row 2
```

### Step 2: Column Topological Sort

**Graph:**

```
2 → 1
3 → 2
```

**Column Order:** `[3, 2, 1]`

**Column Positions:**

```
3 → col 0
2 → col 1
1 → col 2
```

### Step 3: Build Matrix

| Number | Row | Col | Place |
| ------ | --- | --- | ----- |
| 1 | 1 | 2 | (1, 2) |
| 2 | 2 | 1 | (2, 1) |
| 3 | 0 | 0 | (0, 0) |

**Matrix:**

```
3 0 0
0 0 1
0 2 0
```

✅ **Valid!**

---

## 🎓 Key Takeaways

1. **Independent Orderings**: Row and column constraints don't interfere
2. **Two Topological Sorts**: Run separately for rows and columns
3. **Cycle Detection**: Both must succeed
4. **Position Mapping**: Map numbers to (row, col) positions
5. **Sparse Matrix**: Most cells will be 0
6. **Both Algorithms Work**: DFS or Kahn's for each sort

---

## 🔄 Why Two Independent Sorts?

```
Row constraints: Control vertical ordering
Column constraints: Control horizontal ordering

These are orthogonal (perpendicular) constraints!
Can satisfy independently without conflict.

Example:
"1 above 2" only affects rows, not columns
"3 left of 1" only affects columns, not rows
```

---

## 📚 Related Problems

1. **Course Schedule II** (LeetCode 210) - Single topological sort
2. **Sort Items by Groups** (LeetCode 1203) - Two-level sort
3. **Alien Dictionary** (LeetCode 269) - Build ordering
4. **Sequence Reconstruction** (LeetCode 444) - Verify ordering
5. **Parallel Courses** (LeetCode 1136) - Level tracking

---

## 🎉 Congratulations!

This is the **10th and final** problem in the Topological Sort collection! You've now mastered:

✅ Basic topological sort (DFS & Kahn's)
✅ Cycle detection
✅ Graph construction
✅ Level tracking
✅ Unique ordering verification
✅ Ancestor propagation
✅ Dependency resolution
✅ Two-level sorting
✅ Center finding
✅ **2D topological sort**

**You've completed the entire collection! 🚀**

---

