# 🔴 Redundant Connection

**LeetCode 684** | **Medium** | **Union-Find - Detect Cycle Edge**

---

## 📝 Problem Description

In this problem, a tree is an **undirected graph** that is connected and has no cycles.

You are given a graph that started as a tree with `n` nodes labeled from `1` to `n`, with one additional edge added. The added edge has two **different** vertices chosen from `1` to `n`, and was not an edge that already existed. The graph is represented as an array `edges` of length `n` where `edges[i] = [ai, bi]` indicates that there is an edge between nodes `ai` and `bi` in the graph.

Return *an edge that can be removed so that the resulting graph is a tree of* `n` *nodes*. If there are multiple answers, return the answer that occurs last in the input.

### Example 1:

**Input:**

```
edges = [[1,2],[1,3],[2,3]]
```

**Output:**

```
[2,3]
```

**Explanation:**

```
Graph:
  1
 / \
2---3

Edges processed in order:
1. [1,2] → OK (connects 1 and 2)
2. [1,3] → OK (connects 1 and 3)
3. [2,3] → CYCLE! (2 and 3 already connected via 1)

Return [2,3] (last edge causing cycle)
```

### Example 2:

**Input:**

```
edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
```

**Output:**

```
[1,4]
```

**Explanation:**

```
Graph structure (after adding edges in order):
    1 --- 2
    |\    |
    | \   |
    5  \  3
        \ |
          4

Edge [1,4] creates cycle: 1→2→3→4→1
```

### Constraints:

- `n == edges.length`
- `3 <= n <= 1000`
- `edges[i].length == 2`
- `1 <= ai < bi <= edges.length`
- `ai != bi`
- There are no repeated edges
- The given graph is connected

---

## 💡 Intuition

This is a **classic Union-Find cycle detection** problem:

### Key Insight:

```
Tree property: n nodes, (n-1) edges, no cycles

Given: n nodes, n edges → exactly 1 extra edge

Goal: Find the LAST edge that creates a cycle
```

### Why Union-Find Perfect?

```
Process edges in order:
- If nodes already in same set → CYCLE!
- This is the redundant edge
- Return immediately (last occurrence)
```

### Algorithm:

```
For each edge [u, v]:
    if find(u) == find(v):
        return [u, v]  // Both already connected → cycle!
    else:
        union(u, v)    // Connect them
```

---

## 🔍 Algorithm

### Union-Find Cycle Detection:

1. **Initialize** Union-Find for n nodes
2. **Process edges in order**:
   - Check if `u` and `v` in same component
   - If yes → this edge creates cycle, return it
   - If no → union them, continue
3. **Return** the cycle-creating edge

---

## 💻 Code

### Solution: Union-Find with Path Compression

```javascript
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
  const n = edges.length;

  // Initialize Union-Find (1-indexed)
  const parent = Array(n + 1)
    .fill(0)
    .map((_, i) => i);
  const rank = Array(n + 1).fill(0);

  // Find with path compression
  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  // Union by rank
  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) {
      return false; // Already connected → cycle!
    }

    // Union by rank
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

  // Process edges in order
  for (const [u, v] of edges) {
    if (!union(u, v)) {
      return [u, v]; // This edge creates a cycle!
    }
  }

  return []; // Should never reach here
};
```

### Alternative: Simple Parent Array (No Rank)

```javascript
var findRedundantConnection = function (edges) {
  const n = edges.length;
  const parent = Array(n + 1)
    .fill(0)
    .map((_, i) => i);

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  for (const [u, v] of edges) {
    const rootU = find(u);
    const rootV = find(v);

    if (rootU === rootV) {
      return [u, v]; // Cycle detected!
    }

    parent[rootU] = rootV; // Union
  }

  return [];
};
```

---

## ⏱️ Time and Space Complexity

**Time Complexity: O(N × α(N))**

- Process N edges: O(N)
- Each find/union: O(α(N)) with path compression
- α(N) ≈ O(1) for practical purposes
- **Effectively: O(N)**

**Space Complexity: O(N)**

- Parent array: O(N)
- Rank array: O(N)

---

## 🎯 Dry Run

### Input:

```
edges = [[1,2],[1,3],[2,3]]
```

### Initial State:

```
parent: [0, 1, 2, 3]  (1-indexed)
rank:   [0, 0, 0, 0]
```

### Processing Edges:

| Step | Edge | find(u) | find(v) | Same? | Action | parent |
| ---- | ---- | ------- | ------- | ----- | ------ | ------ |
| 1 | [1,2] | 1 | 2 | No | Union(1,2) | [0,1,1,3] |
| 2 | [1,3] | 1 | 3 | No | Union(1,3) | [0,1,1,1] |
| 3 | [2,3] | 1 | 1 | **Yes** | **CYCLE!** | - |

**Return: [2,3]** ✅

### Visualization:

```
After edge [1,2]:
  1---2    3

After edge [1,3]:
  1---2
  |
  3

Edge [2,3] attempts:
  1---2
  |\ /|  ← CYCLE!
  | X |
  |/ \|
  3---
  
find(2) = 1, find(3) = 1 → Already connected!
```

---

## 🎓 Key Takeaways

1. **Process in Order**: Return LAST edge causing cycle
2. **Immediate Detection**: Return as soon as cycle found
3. **Union-Find Perfect**: Efficient cycle detection
4. **No Backtracking**: One-pass solution
5. **1-Indexed**: Problem uses 1-based node numbering
6. **Guaranteed Answer**: Problem guarantees exactly one redundant edge

---

## 🔄 Why Return Last Cycle Edge?

```
Problem asks for LAST occurrence:
- Process edges sequentially
- First time find(u) == find(v) → cycle
- This is the last edge added that creates cycle
- Return immediately
```

---

## 💡 Edge Cases

1. **Triangle**: `[[1,2],[2,3],[1,3]]` → return `[1,3]`
2. **Large cycle**: Works same way
3. **Multiple possible answers**: Return last in input order
4. **Self-loop**: Won't occur (ai ≠ bi guaranteed)

---

## 📚 Related Problems

1. **Redundant Connection II** (LeetCode 685) - Directed graph version (harder!)
2. **Number of Operations to Make Network Connected** (LeetCode 1319)
3. **Graph Valid Tree** (LeetCode 261)
4. **Find if Path Exists in Graph** (LeetCode 1971)
5. **Smallest String With Swaps** (LeetCode 1202)

---

## 🌟 Comparison: Tree vs Graph with Extra Edge

| Property | Tree | Graph with Extra Edge |
| -------- | ---- | --------------------- |
| **Nodes** | n | n |
| **Edges** | n - 1 | n |
| **Cycles** | 0 | 1 |
| **Connected** | Yes | Yes |
| **Goal** | - | Remove 1 edge to make tree |

---

