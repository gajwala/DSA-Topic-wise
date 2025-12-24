# 🔌 Number of Operations to Make Network Connected

**LeetCode 1319** | **Medium** | **MST + Union-Find**

---

## 📝 Problem Description

There are `n` computers numbered from `0` to `n - 1` connected by ethernet cables `connections` forming a network where `connections[i] = [ai, bi]` represents a connection between computers `ai` and `bi`. Any computer can reach any other computer directly or indirectly through the network.

You are given an initial computer network `connections`. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.

Return the **minimum number of times** you need to do this in order to make all the computers connected. If it is not possible, return `-1`.

### Example 1:

**Input:**

```
n = 4
connections = [[0,1],[0,2],[1,2]]
```

**Output:**

```
1
```

**Explanation:**

```
Remove cable between 0 and 2
Use it to connect component {0,1,2} with {3}
```

### Example 2:

**Input:**

```
n = 6
connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
```

**Output:**

```
2
```

**Explanation:**

```
We have 3 components: {0,1,2,3}, {4}, {5}
Need 2 operations to connect all
```

### Example 3:

**Input:**

```
n = 6
connections = [[0,1],[0,2],[0,3],[1,2]]
```

**Output:**

```
-1
```

**Explanation:**

```
Only 4 cables, need at least 5 to connect 6 computers
```

### Constraints:

- `1 <= n <= 10^5`
- `1 <= connections.length <= min(n * (n - 1) / 2, 10^5)`
- `connections[i].length == 2`
- `0 <= ai, bi < n`
- `ai != bi`
- No repeated connections

---

## 💡 Intuition

This problem combines MST concepts with graph connectivity:

### Key Insights:

1. **Minimum Edges Needed**: To connect `n` nodes, we need at least `n - 1` edges
   - If `connections.length < n - 1` → **Impossible** → return `-1`

2. **Connected Components**: Count how many separate groups exist
   - Use Union-Find to identify components
   - Each component is internally connected

3. **Operations Needed**: To connect `k` components, we need `k - 1` edges
   - If we have 3 components, need 2 bridges
   - If we have 1 component, already connected (0 operations)

4. **Redundant Edges**: Extra cables in one component can be reused
   - Within a component, MST needs `nodes - 1` edges
   - Any extra edges are "spare cables"

### Formula:

```
components = count of separate groups
operations_needed = components - 1

If total_edges >= n - 1:
    return operations_needed
Else:
    return -1
```

---

## 🔍 Algorithm

### Approach: Union-Find to Count Components

1. **Check Minimum Requirement**:
   - If `connections.length < n - 1` → return `-1`

2. **Union-Find**:
   - Initialize each computer as separate component
   - For each connection, union the two computers

3. **Count Components**:
   - After all unions, count distinct roots
   - Each unique root = one component

4. **Return Result**:
   - `components - 1`

---

## 💻 Code

### Solution 1: Union-Find with Component Counting

```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
    this.components = n; // Initially n separate components
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false; // Already connected

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.components--; // Merged two components into one
    return true;
  }

  getComponents() {
    return this.components;
  }
}

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (n, connections) {
  // Minimum edges required to connect n nodes is n-1
  if (connections.length < n - 1) {
    return -1;
  }

  // Use Union-Find to count components
  const uf = new UnionFind(n);

  // Process all connections
  for (const [a, b] of connections) {
    uf.union(a, b);
  }

  // Number of operations = number of components - 1
  return uf.getComponents() - 1;
};
```

### Solution 2: Alternative - Tracking Redundant Edges

```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    return true;
  }

  countComponents() {
    const roots = new Set();
    for (let i = 0; i < this.parent.length; i++) {
      roots.add(this.find(i));
    }
    return roots.size;
  }
}

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (n, connections) {
  // Check if we have enough cables
  if (connections.length < n - 1) {
    return -1;
  }

  const uf = new UnionFind(n);
  let redundant = 0;

  // Process connections and count redundant edges
  for (const [a, b] of connections) {
    if (!uf.union(a, b)) {
      redundant++; // This edge creates a cycle
    }
  }

  // Count components
  const components = uf.countComponents();

  // Need (components - 1) edges to connect all
  return components - 1;
};
```

---

## ⏱️ Time and Space Complexity

### Time Complexity: O(E × α(V)) ≈ O(E)

- Process each edge: O(E)
- Each union/find operation: O(α(V)) ≈ O(1)
- Count components: O(V) or O(1) if tracking
- Total: O(E + V)

where α(V) is the inverse Ackermann function (nearly constant).

### Space Complexity: O(V)

- Union-Find parent array: O(V)
- Union-Find rank array: O(V)
- Total: O(V)

---

## 🎯 Dry Run

### Example 1:

**Input:**

```
n = 4
connections = [[0,1],[0,2],[1,2]]
```

**Union-Find Process:**

| Step | Connection | find(a) | find(b) | Union? | Components | Redundant |
| ---- | ---------- | ------- | ------- | ------ | ---------- | --------- |
| Init | - | - | - | - | 4 | 0 |
| 1 | [0,1] | 0 | 1 | ✅ | 3 | 0 |
| 2 | [0,2] | 0 | 2 | ✅ | 2 | 0 |
| 3 | [1,2] | 0 | 0 | ❌ Cycle | 2 | 1 |

**Result:**
- Components: 2 ({0,1,2} and {3})
- Operations needed: 2 - 1 = **1** ✅
- Redundant cable [1,2] can be reused

### Example 2:

**Input:**

```
n = 6
connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
```

**Union-Find Process:**

| Step | Connection | Union? | Components |
| ---- | ---------- | ------ | ---------- |
| Init | - | - | 6 |
| 1 | [0,1] | ✅ | 5 |
| 2 | [0,2] | ✅ | 4 |
| 3 | [0,3] | ✅ | 3 |
| 4 | [1,2] | ❌ | 3 |
| 5 | [1,3] | ❌ | 3 |

**Result:**
- Components: 3 ({0,1,2,3}, {4}, {5})
- Operations needed: 3 - 1 = **2** ✅

### Example 3 (Impossible):

**Input:**

```
n = 6
connections = [[0,1],[0,2],[0,3],[1,2]]
```

**Check:**
- Total edges: 4
- Minimum needed: n - 1 = 5
- 4 < 5 → **Impossible** → return **-1** ✅

---

## 🎓 Key Takeaways

1. **Minimum Edges**: Need at least `n - 1` edges for n nodes
2. **Component Counting**: Union-Find efficiently tracks components
3. **Redundant Edges**: Cycles provide spare cables to reuse
4. **Formula**: operations = components - 1
5. **Early Exit**: Check `edges < n - 1` immediately
6. **MST Connection**: Similar to MST but focused on connectivity

---

## 🔄 MST Connection

This problem relates to MST concepts:

| Aspect | MST | This Problem |
| ------ | --- | ------------ |
| **Goal** | Minimum weight | Just connectivity |
| **Edges Needed** | Exactly n-1 | At least n-1 |
| **Edge Weights** | Important | Not relevant |
| **Redundant Edges** | Removed | Can be reused |
| **Key Insight** | Minimize cost | Count components |

**Both use Union-Find for efficiency!**

---

## 📚 Related Problems

1. **Number of Provinces** (LeetCode 547)
2. **Redundant Connection** (LeetCode 684)
3. **Accounts Merge** (LeetCode 721)
4. **Connecting Cities With Minimum Cost** (LeetCode 1135)
5. **Evaluate Division** (LeetCode 399)

---

