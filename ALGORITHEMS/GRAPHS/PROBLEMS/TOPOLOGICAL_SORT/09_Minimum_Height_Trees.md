# 🌳 Minimum Height Trees

**LeetCode 310** | **Medium** | **Modified Topological Sort (Trim Leaves)**

---

## 📝 Problem Description

A tree is an undirected graph in which any two vertices are connected by *exactly* one path. In other words, any connected graph without simple cycles is a tree.

Given a tree of `n` nodes labelled from `0` to `n - 1`, and an array of `n - 1` `edges` where `edges[i] = [ai, bi]` indicates that there is an undirected edge between the two nodes `ai` and `bi` in the tree, you can choose any node of the tree as the root. When you select a node `x` as the root, the result tree has height `h`. Among all possible rooted trees, those with minimum height (i.e. `min(h)`) are called **minimum height trees** (MHTs).

Return *a list of all **MHTs' root labels***. You can return the answer in **any order**.

The **height** of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

### Example 1:

**Input:**

```
n = 4
edges = [[1,0],[1,2],[1,3]]
```

**Output:**

```
[1]
```

**Explanation:**

```
Tree structure:
    0
    |
    1
   / \
  2   3

If root = 1: height = 1 (minimum) ✅
If root = 0,2,3: height = 2
```

### Example 2:

**Input:**

```
n = 6
edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
```

**Output:**

```
[3,4]
```

**Explanation:**

```
Tree structure:
  0   1   2
   \ | /
     3---4---5

If root = 3 or 4: height = 2 (minimum) ✅
If root = others: height = 3
```

### Example 3:

**Input:**

```
n = 1
edges = []
```

**Output:**

```
[0]
```

### Constraints:

- `1 <= n <= 2 * 10^4`
- `edges.length == n - 1`
- `0 <= ai, bi < n`
- `ai != bi`
- All the pairs `(ai, bi)` are distinct
- The given input is **guaranteed** to be a tree

---

## 💡 Intuition

This is a **modified topological sort** - find the **center** of the tree:

### Key Insight:

```
MHT roots = Center nodes of the tree
          = Nodes at the "middle" of longest path
          = Last 1-2 nodes after trimming leaves repeatedly
```

### Why Trim Leaves?

```
Example: 0---1---2---3---4

Trim leaves (degree 1):
Round 1: Remove 0, 4 → 1---2---3
Round 2: Remove 1, 3 → [2]

Result: [2] is the center!
```

### MHT Property:

```
At most 2 MHT roots possible:
- If tree has odd diameter: 1 center node
- If tree has even diameter: 2 center nodes
```

### Algorithm:

```
Think of it like peeling an onion:
1. Start from leaves (degree 1)
2. Remove leaves layer by layer
3. Update degrees of neighbors
4. Continue until 1-2 nodes remain
5. Those are the centers (MHT roots)!
```

---

## 🔍 Algorithm

### Modified Kahn's (Trim Leaves):

1. **Build graph** and calculate degrees
2. **Queue all leaves** (degree = 1)
3. **BFS layer-by-layer**:
   - Remove current leaves
   - Update neighbors' degrees
   - Add new leaves to queue
4. **Stop** when ≤ 2 nodes remain
5. **Return** remaining nodes

### Why This Works:

- Leaves can never be MHT roots (too far from one side)
- By removing leaves, we get closer to center
- Last remaining nodes are farthest from all edges

---

## 💻 Code

### Solution 1: Layer-by-Layer Leaf Removal (Kahn's Style)

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (n, edges) {
  // Edge case: single node
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  // Build adjacency list and calculate degrees
  const graph = new Map();
  const degree = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (const [u, v] of edges) {
    graph.get(u).push(v);
    graph.get(v).push(u);
    degree[u]++;
    degree[v]++;
  }

  // Initialize queue with all leaves (degree 1)
  let queue = [];
  for (let i = 0; i < n; i++) {
    if (degree[i] === 1) {
      queue.push(i);
    }
  }

  let remaining = n;

  // Remove leaves layer by layer
  while (remaining > 2) {
    const leavesCount = queue.length;
    remaining -= leavesCount;

    const nextQueue = [];

    for (let i = 0; i < leavesCount; i++) {
      const leaf = queue[i];

      // Remove this leaf, update neighbors
      for (const neighbor of graph.get(leaf)) {
        degree[neighbor]--;

        // If neighbor becomes a leaf, add to next layer
        if (degree[neighbor] === 1) {
          nextQueue.push(neighbor);
        }
      }
    }

    queue = nextQueue;
  }

  // Remaining nodes are MHT roots
  return queue;
};
```

### Solution 2: DFS-Based (Alternative - Find Diameter)

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function (n, edges) {
  if (n === 1) return [0];

  // Build graph
  const graph = new Map();
  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (const [u, v] of edges) {
    graph.get(u).push(v);
    graph.get(v).push(u);
  }

  // Find one end of diameter
  function bfs(start) {
    const visited = new Set([start]);
    const queue = [[start, null]]; // [node, parent]
    let farthest = start;

    while (queue.length > 0) {
      const [node, parent] = queue.shift();
      farthest = node;

      for (const neighbor of graph.get(node)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, node]);
        }
      }
    }

    return farthest;
  }

  // Find path between diameter ends
  function findPath(start, end) {
    const parent = new Map();
    parent.set(start, null);

    const queue = [start];

    while (queue.length > 0) {
      const node = queue.shift();

      if (node === end) break;

      for (const neighbor of graph.get(node)) {
        if (!parent.has(neighbor)) {
          parent.set(neighbor, node);
          queue.push(neighbor);
        }
      }
    }

    // Reconstruct path
    const path = [];
    let curr = end;
    while (curr !== null) {
      path.push(curr);
      curr = parent.get(curr);
    }

    return path;
  }

  // Find diameter
  const end1 = bfs(0);
  const end2 = bfs(end1);

  // Get center of diameter
  const path = findPath(end1, end2);
  const mid = Math.floor(path.length / 2);

  if (path.length % 2 === 1) {
    return [path[mid]];
  } else {
    return [path[mid - 1], path[mid]];
  }
};
```

---

## ⏱️ Time and Space Complexity

### Leaf Removal (Optimal):

**Time Complexity: O(N)**

- Build graph: O(N)
- Process each node once: O(N)
- Total: O(N)

**Space Complexity: O(N)**

- Graph: O(N)
- Degree array: O(N)
- Queue: O(N)

### DFS Diameter (Alternative):

**Time Complexity: O(N)**

- Two BFS: 2 × O(N)
- Path reconstruction: O(N)

**Space Complexity: O(N)**

---

## 🎯 Dry Run

### Input:

```
n = 6
edges = [[0,3],[1,3],[2,3],[4,3],[4,5]]
```

### Graph:

```
0   1   2
 \ | /
   3---4---5
```

### Degrees:

```
{0:1, 1:1, 2:1, 3:4, 4:2, 5:1}
Leaves: [0, 1, 2, 5]
```

### Trimming Process:

| Round | Queue | Remove | Update Degrees | New Leaves | Remaining |
| ----- | ----- | ------ | -------------- | ---------- | --------- |
| Init | [0,1,2,5] | - | {0:1,1:1,2:1,3:4,4:2,5:1} | - | 6 |
| 1 | [3,4] | 0,1,2,5 | {3:1,4:1} | [3,4] | 2 |
| Done | [3,4] | - | - | - | 2 ≤ 2 |

**Result: [3, 4]** ✅

---

## 🎓 Key Takeaways

1. **Find Center**: MHT roots are tree centers
2. **Trim Leaves**: Layer-by-layer removal
3. **At Most 2 Roots**: Tree property
4. **Modified Topological**: Similar to Kahn's but different goal
5. **O(N) Solution**: Very efficient
6. **Alternative**: Find diameter then take middle

---

## 🔄 Why "Topological Sort"?

This is related to topological sort because:
- ✅ Process nodes level by level
- ✅ Use degree tracking
- ✅ Remove nodes with degree 1
- ❌ But NOT producing linear ordering
- ✅ Finding "center" instead

---

## 📚 Related Problems

1. **Tree Diameter** (LeetCode 543) - Longest path
2. **Closest Leaf in Binary Tree** (LeetCode 742)
3. **All Nodes Distance K** (LeetCode 863)
4. **Course Schedule** (LeetCode 207) - True topological sort
5. **Graph Valid Tree** (LeetCode 261)

---

