# 💑 Couples Holding Hands

**LeetCode 765** | **Hard** | **Union-Find - Minimum Swaps**

---

## 📝 Problem Description

There are `n` couples sitting in `2n` seats arranged in a row and want to hold hands.

The people and seats are represented by an integer array `row` where `row[i]` is the ID of the person sitting in the `ith` seat. The couples are numbered in order, the first couple being `(0, 1)`, the second couple being `(2, 3)`, and so on with the last couple being `(2n - 2, 2n - 1)`.

Return *the minimum number of swaps* so that every couple is sitting side by side. A swap consists of choosing any two people, then they stand up and switch seats.

### Example 1:

**Input:**

```
row = [0,2,1,3]
```

**Output:**

```
1
```

**Explanation:**

```
Initial: [0, 2] [1, 3]
Swap 1↔2: [0, 1] [2, 3]
Result: 1 swap
```

### Example 2:

**Input:**

```
row = [3,2,0,1]
```

**Output:**

```
0
```

**Explanation:**

```
Already paired: [3, 2] and [0, 1]
(couples are (0,1), (2,3))
Already correct!
```

---

## 💡 Intuition

**Union-Find on couples**:

Formula: `swaps = n - components`

---

## 💻 Code

```javascript
/**
 * @param {number[]} row
 * @return {number}
 */
var minSwapsCouples = function (row) {
  const n = row.length / 2;
  const parent = Array(n)
    .fill(0)
    .map((_, i) => i);

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(x, y) {
    parent[find(x)] = find(y);
  }

  // Union couples sitting together
  for (let i = 0; i < row.length; i += 2) {
    const couple1 = Math.floor(row[i] / 2);
    const couple2 = Math.floor(row[i + 1] / 2);
    union(couple1, couple2);
  }

  // Count components
  const components = new Set();
  for (let i = 0; i < n; i++) {
    components.add(find(i));
  }

  return n - components.size;
};
```

---

## ⏱️ Complexity

**Time: O(N×α(N)) ≈ O(N)**
**Space: O(N)**

---

