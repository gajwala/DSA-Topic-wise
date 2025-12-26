# 🔗 Connecting the Graph (Number of Operations)

**GeeksforGeeks** | **Medium** | **Union-Find - Count Components & Extra Edges**

---

## 📝 Problem Description

You are given a graph with `n` vertices (0 to n-1) and `m` edges. You can **remove one edge** from anywhere and **add that edge** between any two vertices in one operation. Find the **minimum number of operations** that will be required to connect the graph.

If it is not possible to connect the graph, return `-1`.

### Example 1:

**Input:**

```
n = 4
m = 3
Edges = [[0, 1], [0, 2], [1, 2]]
```

**Output:**

```
1
```

**Explanation:**

```
Graph structure:
  0 --- 1
  |   /
  | /
  2       3 (isolated)

Component 1: {0, 1, 2}
Component 2: {3}

Extra edges: 1 (edge 1-2 creates cycle)
Components: 2
Operations needed: 2 - 1 = 1

Remove edge between vertices 1 and 2, add between 1 and 3.
```

### Example 2:

**Input:**

```
n = 6
m = 5
Edges = [[0,1], [0,2], [0,3], [1,2], [1,3]]
```

**Output:**

```
2
```

**Explanation:**

```
Graph structure:
  0 --- 1
  |\   /|
  | \ / |
  |  X  |
  | / \ |
  |/   \|
  2     3     4 (isolated)     5 (isolated)

Component 1: {0, 1, 2, 3}
Component 2: {4}
Component 3: {5}

Extra edges: 2 (edges creating cycles)
Components: 3
Operations needed: 3 - 1 = 2

Remove edges (1,2) and (0,3), add edges (1,4) and (3,5).
```

### Constraints:

- `1 <= n <= 10^5`
- `0 <= m <= 10^2`
- `0 <= edge[i][0], edge[i][1] <= n-1`

---

## 💡 Intuition

This is a **Union-Find problem** with two key insights:

### Key Insight 1: Minimum Edges to Connect n Nodes

```
To connect n nodes into a single tree:
Need exactly (n - 1) edges

Currently have: k components
Need to connect: k components
Edges required: (k - 1) edges
```

### Key Insight 2: Extra Edges

```
Extra edges = Edges that create cycles
            = Edges connecting nodes already in same component

These extra edges can be "moved" to connect different components!
```

### Algorithm Strategy:

```
1. Use Union-Find to:
   - Count connected components
   - Count extra edges (cycles)

2. Check if possible:
   - Need (components - 1) edges to connect
   - Have (extra edges) available
   - If extra >= needed → possible
   - Else → impossible (-1)

3. Return: components - 1
```

### Why Union-Find?

- ✅ Efficiently track connected components
- ✅ Detect cycles (extra edges)
- ✅ Nearly O(1) operations with path compression
- ✅ Perfect for dynamic connectivity

---

## 🔍 Algorithm

### Union-Find with Path Compression & Union by Rank:

1. **Initialize**:
   - `parent[i] = i` for all nodes
   - `rank[i] = 0` for all nodes
   - `extraEdges = 0`

2. **Process Each Edge**:
   - Find roots of both nodes
   - If same root → extra edge (cycle)
   - Else → union the components

3. **Count Components**:
   - Count nodes where `find(i) == i`
   - These are root nodes

4. **Calculate Result**:
   - `needed = components - 1`
   - `return extraEdges >= needed ? needed : -1`

---

## 💻 Code

### Solution: Union-Find with Optimization

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @returns {number}
 */
class Solution {
  // Function to solve the given problem.
  Solve(n, edges) {
    // Initialize Union-Find
    const parent = Array(n)
      .fill(0)
      .map((_, i) => i);
    const rank = Array(n).fill(0);

    // Find with path compression
    const find = (x) => {
      if (parent[x] !== x) {
        parent[x] = find(parent[x]); // Path compression
      }
      return parent[x];
    };

    // Union by rank
    const union = (a, b) => {
      const rootA = find(a);
      const rootB = find(b);

      if (rootA === rootB) {
        return false; // Already connected → extra edge
      }

      // Union by rank
      if (rank[rootA] < rank[rootB]) {
        parent[rootA] = rootB;
      } else if (rank[rootA] > rank[rootB]) {
        parent[rootB] = rootA;
      } else {
        parent[rootB] = rootA;
        rank[rootA]++;
      }

      return true; // Successfully united
    };

    let extraEdges = 0;

    // Process all edges
    for (const [u, v] of edges) {
      if (!union(u, v)) {
        extraEdges++; // This edge creates a cycle
      }
    }

    // Count connected components
    let components = 0;
    for (let i = 0; i < n; i++) {
      if (find(i) === i) {
        components++; // This is a root node
      }
    }

    // Calculate minimum operations needed
    const operationsNeeded = components - 1;

    // Check if we have enough extra edges
    return extraEdges >= operationsNeeded ? operationsNeeded : -1;
  }
}
```

### Alternative: Union by Size

```javascript
class Solution {
  Solve(n, edges) {
    const parent = Array(n)
      .fill(0)
      .map((_, i) => i);
    const size = Array(n).fill(1); // Track component sizes

    const find = (x) => {
      if (parent[x] !== x) {
        parent[x] = find(parent[x]);
      }
      return parent[x];
    };

    const union = (a, b) => {
      const rootA = find(a);
      const rootB = find(b);

      if (rootA === rootB) return false;

      // Union by size (attach smaller to larger)
      if (size[rootA] < size[rootB]) {
        parent[rootA] = rootB;
        size[rootB] += size[rootA];
      } else {
        parent[rootB] = rootA;
        size[rootA] += size[rootB];
      }

      return true;
    };

    let extraEdges = 0;

    for (const [u, v] of edges) {
      if (!union(u, v)) {
        extraEdges++;
      }
    }

    let components = 0;
    for (let i = 0; i < n; i++) {
      if (find(i) === i) components++;
    }

    const needed = components - 1;
    return extraEdges >= needed ? needed : -1;
  }
}
```

---

## ⏱️ Time and Space Complexity

**Time Complexity: O(m × α(n) + n)**

- Process m edges: O(m × α(n)) where α is inverse Ackermann function
- Count components: O(n)
- With path compression: α(n) ≈ O(1) practically
- **Effective: O(m + n)**

**Space Complexity: O(n)**

- Parent array: O(n)
- Rank/Size array: O(n)
- Total: O(n)

---

## 🎯 Dry Run

### Example 1:

**Input:**

```
n = 4, edges = [[0,1], [0,2], [1,2]]
```

### Initial State:

```
parent: [0, 1, 2, 3]
rank: [0, 0, 0, 0]
extraEdges: 0
```

### Processing Edges:

| Edge | find(u) | find(v) | Same? | Action | parent | extraEdges |
| ---- | ------- | ------- | ----- | ------ | ------ | ---------- |
| [0,1] | 0 | 1 | No | Union(0,1) | [0,0,2,3] | 0 |
| [0,2] | 0 | 2 | No | Union(0,2) | [0,0,0,3] | 0 |
| [1,2] | 0 | 0 | Yes | Extra! | [0,0,0,3] | 1 |

### Count Components:

```
find(0) = 0 → root ✅
find(1) = 0 → not root
find(2) = 0 → not root
find(3) = 3 → root ✅

Components: 2
```

### Calculate Result:

```
operationsNeeded = 2 - 1 = 1
extraEdges = 1
extraEdges >= operationsNeeded → true

Result: 1 ✅
```

### Example 2:

**Input:**

```
n = 6, edges = [[0,1], [0,2], [0,3], [1,2], [1,3]]
```

### Processing:

| Edge | Action | Extra? |
| ---- | ------ | ------ |
| [0,1] | Union | No |
| [0,2] | Union | No |
| [0,3] | Union | No |
| [1,2] | Same component | Yes (extra++) |
| [1,3] | Same component | Yes (extra++) |

**Result:**

```
Components: 3 (nodes {0,1,2,3}, {4}, {5})
Extra edges: 2
Operations needed: 3 - 1 = 2
Result: 2 ✅
```

---

## 🎓 Key Takeaways

1. **Two Metrics**: Track both extra edges and components
2. **Extra Edges = Reusable**: Edges creating cycles can be moved
3. **Minimum Operations**: Always equals (components - 1)
4. **Check Feasibility**: Need enough extra edges
5. **Union-Find Perfect**: Efficient component tracking
6. **Path Compression**: Makes operations nearly O(1)

---

## 🔄 Why This Works

### Mathematical Proof:

```
Tree with n nodes has (n - 1) edges
k components → need (k - 1) edges to connect

If we have e extra edges:
- Remove e edges (they're redundant)
- Add e edges to connect components
- Can connect min(e, k-1) components

Result: if e >= k-1 → k-1 operations
        else → impossible (-1)
```

---

## 💡 Common Edge Cases

1. **Already connected**: components = 1, return 0
2. **No extra edges**: Check if components = 1
3. **Isolated nodes**: Each counts as a component
4. **Self-loops**: Should be ignored (check u ≠ v)
5. **Duplicate edges**: Count as extra edges

---

## 📚 Related Problems

1. **Number of Operations to Make Network Connected** (LeetCode 1319) - Same problem!
2. **Redundant Connection** (LeetCode 684) - Find extra edge
3. **Most Stones Removed** (LeetCode 947) - Union-Find application
4. **Accounts Merge** (LeetCode 721) - Merge components
5. **Number of Islands** (LeetCode 200) - Count components

---

## 🌟 Real-World Applications

- **Network Design**: Reconnecting network with failed links
- **Graph Repair**: Fixing disconnected graphs
- **Resource Allocation**: Redistributing connections
- **Circuit Design**: Rewiring electrical circuits

---

