# ➗ Evaluate Division

**LeetCode 399** | **Medium** | **Weighted Union-Find**

---

## 📝 Problem Description

You are given an array of variable pairs `equations` and an array of real numbers `values`, where `equations[i] = [Ai, Bi]` and `values[i]` represent the equation `Ai / Bi = values[i]`. Each `Ai` or `Bi` is a string that represents a single variable.

You are also given some `queries`, where `queries[j] = [Cj, Dj]` represents the `jth` query where you must find the answer for `Cj / Dj = ?`.

Return *the answers to all queries*. If a single answer cannot be determined, return `-1.0`.

### Example 1:

**Input:**

```
equations = [["a","b"],["b","c"]]
values = [2.0,3.0]
queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
```

**Output:**

```
[6.00000,0.50000,-1.00000,1.00000,-1.00000]
```

**Explanation:**

```
a/b = 2.0 → a = 2b
b/c = 3.0 → b = 3c

a/c = a/b × b/c = 2.0 × 3.0 = 6.0
b/a = 1/(a/b) = 1/2.0 = 0.5
a/e = ? (e not in graph) = -1.0
a/a = 1.0
x/x = ? (x not in graph) = -1.0
```

---

## 💡 Intuition

**Weighted Union-Find** or **Graph DFS**:

---

## 💻 Code

### Graph DFS Approach:

```javascript
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  const graph = new Map();

  // Build graph
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    const val = values[i];

    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);

    graph.get(a).push([b, val]);
    graph.get(b).push([a, 1 / val]);
  }

  // DFS to find path
  function dfs(start, end, visited) {
    if (!graph.has(start) || !graph.has(end)) return -1;
    if (start === end) return 1.0;

    visited.add(start);

    for (const [neighbor, value] of graph.get(start)) {
      if (visited.has(neighbor)) continue;

      const result = dfs(neighbor, end, visited);
      if (result !== -1) {
        return value * result;
      }
    }

    return -1;
  }

  // Answer queries
  const results = [];

  for (const [c, d] of queries) {
    results.push(dfs(c, d, new Set()));
  }

  return results;
};
```

---

## ⏱️ Complexity

**Time: O((E+Q) × (V+E))**
**Space: O(V+E)**

---

