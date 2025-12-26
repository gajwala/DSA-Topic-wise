# 🏝️ Number of Islands II

**LeetCode 305** | **Hard** | **Union-Find - Dynamic Components**

---

## 📝 Problem Description

You are given an empty 2D binary grid `grid` of size `m x n`. The grid represents a map where `0`'s represent water and `1`'s represent land. Initially, all the cells of `grid` are water cells (i.e., all the cells are `0`'s).

We may perform an add land operation which turns the water at position into a land. You are given an array `positions` where `positions[i] = [ri, ci]` is the position `(ri, ci)` at which we should operate the `ith` operation.

Return *an array of integers* `answer` *where* `answer[i]` *is the number of islands after turning the cell* `(ri, ci)` *into a land*.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

### Example 1:

**Input:**

```
m = 3, n = 3
positions = [[0,0],[0,1],[1,2],[2,1]]
```

**Output:**

```
[1,2,3,3]
```

**Explanation:**

```
Initially: all water
0 0 0
0 0 0
0 0 0

After op 1: Add land at (0,0)
1 0 0
0 0 0    → 1 island
0 0 0

After op 2: Add land at (0,1)
1 1 0
0 0 0    → 2 islands (connected? No! → still 2)
0 0 0    Wait... they're adjacent! → 1 island

Actually:
1 1 0
0 0 0    → 1 island (merged)
0 0 0

Let me recalculate...
```

**Corrected Explanation:**

```
Op 1: (0,0) → 1 island
  1 0 0
  0 0 0
  0 0 0

Op 2: (0,1) → Connect to (0,0) → 1 island
  1 1 0
  0 0 0
  0 0 0

Op 3: (1,2) → New island → 2 islands
  1 1 0
  0 0 1
  0 0 0

Op 4: (2,1) → New island → 3 islands
  1 1 0
  0 0 1
  0 1 0

Result: [1, 1, 2, 3]
```

### Example 2:

**Input:**

```
m = 1, n = 1
positions = [[0,0]]
```

**Output:**

```
[1]
```

### Constraints:

- `1 <= m, n, positions.length <= 10^4`
- `1 <= m * n <= 10^4`
- `positions[i].length == 2`
- `0 <= ri < m`
- `0 <= ci < n`

---

## 💡 Intuition

This is a **dynamic connectivity** problem - perfect for Union-Find:

### Key Insight:

```
Each land addition can:
1. Create a new island (+1 island)
2. Merge with existing islands (-k islands where k = neighbors merged)

Need to track island count dynamically!
```

### Why Union-Find?

```
When adding land at (r, c):
- Check 4 neighbors (up, down, left, right)
- For each land neighbor:
    - If different component → merge (count--)
- If no merges happened → new island (count++)
```

### Algorithm:

```
count = 0

For each position (r, c):
    If already land → skip
    
    Mark as land
    count++  (assume new island initially)
    
    For each of 4 neighbors:
        If neighbor is land AND different component:
            union(current, neighbor)
            count--  (merged, one less island)
    
    result.push(count)
```

---

## 🔍 Algorithm

### Dynamic Union-Find:

1. **Initialize** Union-Find for m×n grid
2. **For each position**:
   - Check if already land (skip if yes)
   - Mark as land, increment count
   - Check 4 neighbors
   - For each land neighbor in different component:
     - Union them
     - Decrement count
   - Add current count to result
3. **Return** result array

### 2D to 1D Mapping:

```javascript
index = row * n + col
```

---

## 💻 Code

### Solution: Union-Find with Dynamic Count

```javascript
/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} positions
 * @return {number[]}
 */
var numIslands2 = function (m, n, positions) {
  const parent = Array(m * n).fill(-1); // -1 means water
  const rank = Array(m * n).fill(0);

  // Convert 2D to 1D
  const getIndex = (r, c) => r * n + c;

  // Find with path compression
  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  // Union by rank, return true if actually united
  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) return false; // Already same component

    if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }

    return true; // Successfully united
  }

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; // up, down, left, right

  const result = [];
  let count = 0;

  for (const [r, c] of positions) {
    const index = getIndex(r, c);

    // Already land, count unchanged
    if (parent[index] !== -1) {
      result.push(count);
      continue;
    }

    // Add new land
    parent[index] = index; // Make it land
    count++; // Assume new island initially

    // Check 4 neighbors
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      // Check bounds
      if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;

      const neighborIndex = getIndex(nr, nc);

      // Check if neighbor is land
      if (parent[neighborIndex] === -1) continue;

      // Try to union
      if (union(index, neighborIndex)) {
        count--; // Merged two islands into one
      }
    }

    result.push(count);
  }

  return result;
};
```

---

## ⏱️ Time and Space Complexity

**Time Complexity: O(K × α(M×N))**

where K = positions.length

- For each position: O(1) + 4 neighbors × O(α(M×N))
- α(M×N) ≈ O(1) with path compression
- **Total: O(K)**

**Space Complexity: O(M × N)**

- Parent array: O(M × N)
- Rank array: O(M × N)
- Result array: O(K)

---

## 🎯 Dry Run

### Input:

```
m = 3, n = 3
positions = [[0,0],[0,1],[1,2],[2,1]]
```

### Initial State:

```
parent: [-1,-1,-1,-1,-1,-1,-1,-1,-1] (all water)
count: 0
```

### Operations:

**Op 1: Add (0,0) → index 0**

```
Grid:
1 _ _
_ _ _
_ _ _

parent[0] = 0 (land)
count = 1
Check neighbors: all water
Result: [1]
```

**Op 2: Add (0,1) → index 1**

```
Grid:
1 1 _
_ _ _
_ _ _

parent[1] = 1
count = 2 initially

Check left (0,0): land! Union(1,0) → count--
count = 1

Result: [1, 1]
```

**Op 3: Add (1,2) → index 5**

```
Grid:
1 1 _
_ _ 1
_ _ _

parent[5] = 5
count = 2 initially

Check neighbors: all water or out of bounds
count = 2

Result: [1, 1, 2]
```

**Op 4: Add (2,1) → index 7**

```
Grid:
1 1 _
_ _ 1
_ 1 _

parent[7] = 7
count = 3 initially

Check neighbors: all water
count = 3

Result: [1, 1, 2, 3]
```

**Final Result: [1, 1, 2, 3]** ✅

---

## 🎓 Key Takeaways

1. **Dynamic Connectivity**: Island count changes with each operation
2. **Union Reduces Count**: Merging islands decreases total
3. **4-Directional Check**: Only horizontal/vertical neighbors
4. **2D to 1D Mapping**: Easier indexing for Union-Find
5. **Track with -1**: Use -1 for water, index for land
6. **Real-Time Updates**: Return count after each operation

---

## 🔄 Why Union-Find Perfect?

| Alternative | Issue |
| ----------- | ----- |
| **BFS/DFS each time** | O(M×N) per operation → too slow |
| **Union-Find** | O(α(M×N)) ≈ O(1) per operation ✅ |

---

## 💡 Variations

### Count Islands (Static):

```javascript
// Single snapshot
function numIslands(grid) {
  // Use Union-Find or DFS
}
```

### This Problem (Dynamic):

```javascript
// Track after each addition
function numIslands2(m, n, positions) {
  // Union-Find with count tracking
}
```

---

## 📚 Related Problems

1. **Number of Islands** (LeetCode 200) - Static version
2. **Max Area of Island** (LeetCode 695) - Find largest
3. **Number of Distinct Islands** (LeetCode 694) - Unique shapes
4. **Making A Large Island** (LeetCode 827) - Max after one flip
5. **Surrounded Regions** (LeetCode 130) - Capture regions

---

