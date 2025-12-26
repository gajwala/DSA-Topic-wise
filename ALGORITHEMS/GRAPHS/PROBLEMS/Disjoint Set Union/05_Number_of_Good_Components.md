# ✅ Number of Good Components

**GeeksforGeeks** | **Medium** | **Union-Find - Fully Connected Components**

---

## 📝 Problem Description

Given an undirected graph with `v` vertices (numbered from 1 to v) and `e` edges. Find the number of **good components** in the graph.

A component of the graph is **good** if and only if the component is **fully connected**.

**Note:** A fully connected component is a subgraph of a given graph such that there's an edge between every pair of vertices in the component. The given graph can be a disconnected graph.

### Example 1:

**Input:**

```
e = 3, v = 3
edges = [[1, 2], [1, 3], [3, 2]]
```

**Output:**

```
1
```

**Explanation:**

```
Graph structure:
  1 --- 2
   \   /
    \ /
     3

Component: {1, 2, 3}
- 3 nodes
- 3 edges
- Required edges for fully connected: 3×(3-1)/2 = 3 ✅
- Has edges: (1,2), (1,3), (2,3) → All pairs connected!

Good components: 1
```

### Example 2:

**Input:**

```
e = 5, v = 7
edges = [[1, 2], [7, 2], [3, 5], [3, 4], [4, 5]]
```

**Output:**

```
2
```

**Explanation:**

```
Graph structure:
Component 1: {1, 2, 7}
  1 --- 2 --- 7
  
  Nodes: 3, Edges: 2
  Required: 3×2/2 = 3
  Has: 2 < 3 ❌ Not fully connected (missing edge 1-7)

Component 2: {3, 4, 5}
  3 --- 4
   \   /
    \ /
     5
  
  Nodes: 3, Edges: 3
  Required: 3×2/2 = 3
  Has: 3 = 3 ✅ Fully connected!

Component 3: {6} (isolated)
  Nodes: 1, Edges: 0
  Required: 1×0/2 = 0
  Has: 0 = 0 ✅ Fully connected (single node)!

Good components: 2 (components 2 and 3)
```

### Constraints:

- `1 <= e <= 50`
- `1 <= v <= 100`
- `edges[i].length == 2`

---

## 💡 Intuition

This problem combines **Union-Find** with **graph theory**:

### Key Insight:

```
Fully connected component (Complete Graph):
- Has ALL possible edges between nodes
- For n nodes: needs n×(n-1)/2 edges

Formula: edges_needed = n × (n-1) / 2

Check: If actual_edges == edges_needed → Good component!
```

### Why This Works:

```
Complete graph with n nodes:
- Every vertex connects to (n-1) other vertices
- Total = n×(n-1) but each edge counted twice
- Unique edges = n×(n-1)/2

Example:
- 3 nodes: 3×2/2 = 3 edges needed
- 4 nodes: 4×3/2 = 6 edges needed
- 5 nodes: 5×4/2 = 10 edges needed
```

### Algorithm Strategy:

```
1. Use Union-Find to identify components
2. Count nodes in each component
3. Count edges in each component
4. For each component:
   - Calculate required edges: n×(n-1)/2
   - If actual == required → good component
5. Return count of good components
```

---

## 🔍 Algorithm

### Union-Find + Component Analysis:

1. **Initialize** Union-Find for v vertices
2. **Union all edges** to group components
3. **Count nodes per component**: Track component sizes
4. **Count edges per component**: Group edges by root
5. **Check each component**:
   - `required = nodes × (nodes - 1) / 2`
   - `if edges == required → good++`
6. **Return** good count

---

## 💻 Code

### Solution: Union-Find with Component Validation

```javascript
/**
 * @param {number} e
 * @param {number} v
 * @param {number[][]} edges
 * @returns {number}
 */
class Solution {
  findNumberOfGoodComponent(e, v, edges) {
    // DSU initialization
    const parent = Array(v + 1);
    const rank = Array(v + 1).fill(0);

    for (let i = 1; i <= v; i++) {
      parent[i] = i;
    }

    const find = (x) => {
      if (parent[x] !== x) {
        parent[x] = find(parent[x]); // Path compression
      }
      return parent[x];
    };

    const union = (a, b) => {
      const ra = find(a);
      const rb = find(b);
      if (ra === rb) return;

      if (rank[ra] < rank[rb]) parent[ra] = rb;
      else if (rank[ra] > rank[rb]) parent[rb] = ra;
      else {
        parent[rb] = ra;
        rank[ra]++;
      }
    };

    // Union all edges
    for (const [u, w] of edges) {
      union(u, w);
    }

    // Count nodes per component
    const nodeCount = {};

    for (let i = 1; i <= v; i++) {
      const root = find(i);
      nodeCount[root] = (nodeCount[root] || 0) + 1;
    }

    // Count edges per component
    const edgeCount = {};

    for (const [u, w] of edges) {
      const root = find(u);
      edgeCount[root] = (edgeCount[root] || 0) + 1;
    }

    // Check good components (fully connected)
    let good = 0;

    for (const root in nodeCount) {
      const nodes = nodeCount[root];
      const edgesInComp = edgeCount[root] || 0;
      const required = (nodes * (nodes - 1)) / 2;

      if (edgesInComp === required) {
        good++;
      }
    }

    return good;
  }
}
```

### Alternative: Track Sizes During Union

```javascript
class Solution {
  findNumberOfGoodComponent(e, v, edges) {
    const parent = Array(v + 1)
      .fill(0)
      .map((_, i) => i);
    const size = Array(v + 1).fill(1);

    const find = (x) => {
      if (parent[x] !== x) {
        parent[x] = find(parent[x]);
      }
      return parent[x];
    };

    const union = (a, b) => {
      const ra = find(a);
      const rb = find(b);
      if (ra === rb) return;

      if (size[ra] < size[rb]) {
        parent[ra] = rb;
        size[rb] += size[ra];
      } else {
        parent[rb] = ra;
        size[ra] += size[rb];
      }
    };

    // Union all edges
    for (const [u, w] of edges) {
      union(u, w);
    }

    // Count edges per component
    const edgeCount = {};

    for (const [u, w] of edges) {
      const root = find(u);
      edgeCount[root] = (edgeCount[root] || 0) + 1;
    }

    // Check good components
    const checked = new Set();
    let good = 0;

    for (let i = 1; i <= v; i++) {
      const root = find(i);

      if (checked.has(root)) continue;
      checked.add(root);

      const nodes = size[root];
      const edges = edgeCount[root] || 0;
      const required = (nodes * (nodes - 1)) / 2;

      if (edges === required) {
        good++;
      }
    }

    return good;
  }
}
```

---

## ⏱️ Time and Space Complexity

**Time Complexity: O(E×α(V) + V)**

- Union all edges: O(E×α(V))
- Count nodes: O(V)
- Count edges: O(E)
- Check components: O(V)
- **Total: O(E×α(V) + V) ≈ O(E + V)**

**Space Complexity: O(V)**

- Parent array: O(V)
- Rank array: O(V)
- Node/Edge count maps: O(V)

---

## 🎯 Dry Run

### Example 1:

**Input:**

```
v = 3, e = 3
edges = [[1,2],[1,3],[3,2]]
```

### Step 1: Union Edges

| Edge | Union | parent |
| ---- | ----- | ------ |
| [1,2] | union(1,2) | [0,1,1,3] |
| [1,3] | union(1,3) | [0,1,1,1] |
| [3,2] | union(3,2) | [0,1,1,1] (already same) |

### Step 2: Count Nodes

```
find(1) = 1 → nodeCount[1] = 1
find(2) = 1 → nodeCount[1] = 2
find(3) = 1 → nodeCount[1] = 3

nodeCount = {1: 3}
```

### Step 3: Count Edges

```
All edges have root 1:
edgeCount = {1: 3}
```

### Step 4: Check Good Components

```
Component root=1:
  nodes = 3
  edges = 3
  required = 3×2/2 = 3
  3 == 3 ✅ Good!

good = 1
```

**Result: 1** ✅

### Example 2:

**Input:**

```
v = 7, e = 5
edges = [[1,2],[7,2],[3,5],[3,4],[4,5]]
```

### After Union:

```
Components:
- {1, 2, 7} with root 1
- {3, 4, 5} with root 3
- {6} with root 6
```

### Node Counts:

```
nodeCount = {
  1: 3,  // 1,2,7
  3: 3,  // 3,4,5
  6: 1   // 6
}
```

### Edge Counts:

```
edgeCount = {
  1: 2,  // edges (1,2) and (7,2)
  3: 3   // edges (3,5), (3,4), (4,5)
}
```

### Check Good Components:

```
Component 1: nodes=3, edges=2, required=3
  2 ≠ 3 ❌ Not good

Component 3: nodes=3, edges=3, required=3
  3 == 3 ✅ Good!

Component 6: nodes=1, edges=0, required=0
  0 == 0 ✅ Good!

good = 2
```

**Result: 2** ✅

---

## 🎓 Key Takeaways

1. **Fully Connected = Complete Graph**: All possible edges exist
2. **Formula**: For n nodes, need n×(n-1)/2 edges
3. **Union-Find Identifies**: Components (connected groups)
4. **Count and Validate**: Check if actual edges match required
5. **Isolated Nodes**: Single nodes are "good" (0 edges needed)
6. **Your Solution**: Clean and efficient! ✅

---

## 🔄 Complete Graph Properties

| Nodes | Required Edges | Example |
| ----- | -------------- | ------- |
| 1 | 0 | • |
| 2 | 1 | •—• |
| 3 | 3 | △ (triangle) |
| 4 | 6 | ◇ (all connected) |
| 5 | 10 | Pentagon + diagonals |
| n | n×(n-1)/2 | Kn notation |

---

## 💡 Edge Cases

1. **All isolated nodes**: All are good (v good components)
2. **One big component**: Check if complete graph
3. **No edges**: All nodes are good (each is complete)
4. **Chain graph**: 1—2—3—4 → Not complete unless n≤2

---

## 📚 Related Problems

1. **Connecting the Graph** (Previous problem) - Count operations
2. **Friend Circles** (LeetCode 547) - Count components
3. **Number of Provinces** (LeetCode 547) - Same as friend circles
4. **Graph Valid Tree** (LeetCode 261) - Check tree property
5. **Count Complete Components** (LeetCode 2685) - Similar concept

---

## 🌟 Why Your Solution is Excellent

Your code demonstrates:
- ✅ **Correct Union-Find**: Path compression + union by rank
- ✅ **Proper Component Tracking**: Separate node and edge counts
- ✅ **Clean Logic**: Clear validation using formula
- ✅ **Efficient**: O(E+V) time complexity
- ✅ **Edge Case Handling**: Works for isolated nodes

**Perfect implementation! 🎯**

---

