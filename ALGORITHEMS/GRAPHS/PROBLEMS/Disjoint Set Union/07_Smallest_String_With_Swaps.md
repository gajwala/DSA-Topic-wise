# 🔄 Smallest String With Swaps

**LeetCode 1202** | **Medium** | **Union-Find - Sort Within Components**

---

## 📝 Problem Description

You are given a string `s`, and an array of pairs of indices in the string `pairs` where `pairs[i] = [a, b]` indicates 2 indices (0-indexed) of the string.

You can swap the characters at any pair of indices in the given `pairs` **any number of times**.

Return the *lexicographically smallest string* that `s` can be changed to after using the swaps.

### Example 1:

**Input:**

```
s = "dcab"
pairs = [[0,3],[1,2]]
```

**Output:**

```
"bacd"
```

**Explanation:**

```
Original: d c a b
Indices:  0 1 2 3

Components:
- {0, 3}: can swap 'd' and 'b'
- {1, 2}: can swap 'c' and 'a'

Optimal swaps:
- Swap 0↔3: "dcab" → "bcad"
- Swap 1↔2: "bcad" → "bacd"

Result: "bacd"
```

### Example 2:

**Input:**

```
s = "dcab"
pairs = [[0,3],[1,2],[0,2]]
```

**Output:**

```
"abcd"
```

**Explanation:**

```
With [0,2], all indices connected: {0,1,2,3}
Can rearrange all characters!

Sort "dcab" → "abcd"
```

---

## 💡 Intuition

**Union-Find + Sorting within components**:

### Key Insight:

```
If indices can be swapped (directly or transitively):
→ They're in same component
→ Can arrange characters optimally within component
→ Sort characters for lexicographically smallest
```

### Algorithm:

```
1. Union indices that can swap
2. Group indices by component
3. For each component:
   - Get all characters
   - Sort them
   - Assign back in sorted order
```

---

## 💻 Code

```javascript
/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
var smallestStringWithSwaps = function (s, pairs) {
  const n = s.length;
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

  // Union all swappable pairs
  for (const [a, b] of pairs) {
    union(a, b);
  }

  // Group indices by component
  const groups = new Map();

  for (let i = 0; i < n; i++) {
    const root = find(i);
    if (!groups.has(root)) {
      groups.set(root, []);
    }
    groups.get(root).push(i);
  }

  // Sort characters within each component
  const result = s.split("");

  for (const indices of groups.values()) {
    // Get characters at these indices
    const chars = indices.map((i) => s[i]).sort();

    // Sort indices
    indices.sort((a, b) => a - b);

    // Assign sorted characters to sorted indices
    for (let i = 0; i < indices.length; i++) {
      result[indices[i]] = chars[i];
    }
  }

  return result.join("");
};
```

---

## ⏱️ Time and Space Complexity

**Time: O(N log N + E×α(N))**
**Space: O(N)**

---

## 🎯 Key Takeaways

1. **Transitive Swaps**: Union-Find handles chains
2. **Sort Within Component**: Optimal arrangement
3. **Preserve Other Indices**: Only sort within groups

---

