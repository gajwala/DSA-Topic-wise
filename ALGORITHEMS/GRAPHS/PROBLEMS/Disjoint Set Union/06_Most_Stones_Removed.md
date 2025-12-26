# 🪨 Most Stones Removed with Same Row or Column

**LeetCode 947** | **Medium** | **Union-Find - Component Size**

---

## 📝 Problem Description

On a 2D plane, we place `n` stones at some integer coordinate points. Each coordinate point may have **at most one** stone.

A stone can be **removed** if it shares either **the same row or the same column** as another stone that has not been removed.

Given an array `stones` of length `n` where `stones[i] = [xi, yi]` represents the location of the `ith` stone, return *the largest possible number of stones that can be removed*.

### Example 1:

**Input:**

```
stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
```

**Output:**

```
5
```

**Explanation:**

```
Grid visualization:
  0 1 2
0 • •
1 •   • •
2     • •

One possible removal sequence:
1. Remove (0,1) - shares col 1 with (2,1)
2. Remove (1,0) - shares row 1 with (1,2)
3. Remove (1,2) - shares row 1 with remaining, col 2 with (2,2)
4. Remove (2,1) - shares row 2 with (2,2)
5. Remove (2,2) - shares row 2 with remaining stone
6. Stone (0,0) remains

Max removals: 5
```

### Example 2:

**Input:**

```
stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
```

**Output:**

```
3
```

**Explanation:**

```
Grid:
  0 1 2
0 •   •
1   •
2 •   •

Connected component 1: {(0,0), (2,0), (2,2), (0,2), (1,1)}
All share rows/cols → can remove 4, keep 1

Max removals: 4

Wait, let me recalculate...
Actually: (0,0)-(2,0) share col 0
         (2,0)-(2,2) share row 2
         (2,2)-(0,2) share col 2
         (0,2)-(0,0) share row 0
         (1,1) connects via row/col

Result: 5 stones - 1 = 4 removals
```

### Constraints:

- `1 <= stones.length <= 1000`
- `0 <= xi, yi <= 10^4`
- No two stones are at the same coordinate point

---

## 💡 Intuition

This is a **Union-Find component problem**:

### Key Insight:

```
Stones sharing row/column → same component

For each component with n stones:
- Can remove (n - 1) stones
- Must keep 1 stone per component

Total removals = Total stones - Number of components
```

### Why This Works:

```
Example: Component with 4 stones
  • • • •

Can remove in sequence:
  • • • • → • • • → • • → •

Remove 3, keep 1
```

### Algorithm:

```
1. Union stones that share row or column
2. Count connected components
3. Return: n - components
```

---

## 🔍 Algorithm

### Union-Find on Rows and Columns:

1. **Treat rows and columns as nodes**:
   - Row i → node i
   - Col j → node 10000 + j (offset to avoid collision)

2. **For each stone at (x, y)**:
   - Union(row x, col y)
   - Connects row and column

3. **Count components**:
   - Components = unique roots

4. **Calculate**:
   - Removals = stones - components

---

## 💻 Code

### Solution: Union-Find on Rows/Columns

```javascript
/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
  const parent = new Map();

  function find(x) {
    if (!parent.has(x)) {
      parent.set(x, x);
    }

    if (parent.get(x) !== x) {
      parent.set(x, find(parent.get(x)));
    }

    return parent.get(x);
  }

  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX !== rootY) {
      parent.set(rootX, rootY);
    }
  }

  // Union stones sharing row or column
  for (const [x, y] of stones) {
    // Use negative for rows, positive for cols (avoid collision)
    union(x, ~y); // ~y = -(y+1) for column offset
  }

  // Count unique components
  const components = new Set();

  for (const [x, y] of stones) {
    components.add(find(x));
  }

  return stones.length - components.size;
};
```

### Alternative: Offset Columns by 10001

```javascript
var removeStones = function (stones) {
  const parent = new Map();

  function find(x) {
    if (!parent.has(x)) {
      parent.set(x, x);
    }

    if (parent.get(x) !== x) {
      parent.set(x, find(parent.get(x)));
    }

    return parent.get(x);
  }

  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX !== rootY) {
      parent.set(rootX, rootY);
    }
  }

  // Union row and column for each stone
  for (const [row, col] of stones) {
    union(row, col + 10001); // Offset columns
  }

  // Count components
  const components = new Set();

  for (const [row, col] of stones) {
    components.add(find(row));
  }

  return stones.length - components.size;
};
```

---

## ⏱️ Time and Space Complexity

**Time Complexity: O(N × α(N))**

- Union N stones: O(N × α(N))
- Count components: O(N)
- **Total: O(N)**

**Space Complexity: O(N)**

- Parent map: O(N)
- Components set: O(N)

---

## 🎯 Dry Run

### Input:

```
stones = [[0,0],[0,1],[1,0],[1,1]]
```

### Visualization:

```
  0 1
0 • •
1 • •
```

### Union Operations:

```
Stone (0,0): union(row 0, col 0+offset)
Stone (0,1): union(row 0, col 1+offset) → connects to row 0
Stone (1,0): union(row 1, col 0+offset) → connects to col 0
Stone (1,1): union(row 1, col 1+offset) → connects to both

All stones connected!
```

### Count Components:

```
find((0,0)) = same root
find((0,1)) = same root
find((1,0)) = same root
find((1,1)) = same root

Components: 1
```

### Result:

```
Removals = 4 stones - 1 component = 3 ✅
```

---

## 🎓 Key Takeaways

1. **Row/Column as Nodes**: Clever abstraction
2. **Union Connects**: Stones sharing row/col → same component
3. **Formula**: Removals = Stones - Components
4. **Offset Trick**: Avoid row/col ID collision
5. **Component Size**: Each component can remove (size - 1)
6. **Efficient**: O(N) with Union-Find

---

## 📚 Related Problems

1. **Number of Islands** (LeetCode 200)
2. **Number of Provinces** (LeetCode 547)
3. **Accounts Merge** (LeetCode 721)
4. **Connecting the Graph** (Previous problem)

---

