# 👨‍👩‍👧‍👦 All Ancestors of a Node in a Directed Acyclic Graph

**LeetCode 2192** | **Medium** | **Topological Sort - Reverse Graph**

---

## 📝 Problem Description

You are given a positive integer `n` representing the number of nodes of a **Directed Acyclic Graph (DAG)**. The nodes are numbered from `0` to `n - 1` (inclusive).

You are also given a 2D integer array `edges`, where `edges[i] = [fromi, toi]` denotes that there is a **unidirectional** edge from `fromi` to `toi` in the graph.

Return *a list* `answer`, *where* `answer[i]` *is the list of ancestors of the* `ith` *node, sorted in **ascending order***.

A node `u` is an **ancestor** of another node `v` if `u` can reach `v` via a set of edges.

### Example 1:

**Input:**

```
n = 8
edges = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]
```

**Output:**

```
[[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]
```

**Explanation:**

```
Graph:
0 → 3 → 5
↓   ↓   
4 → 6
↓   ↑
2 → 7 ← 3

Ancestors:
Node 0: [] (no ancestors)
Node 1: [] (no ancestors)
Node 2: [] (no ancestors)
Node 3: [0, 1] (0→3, 1→3)
Node 4: [0, 2] (0→4, 2→4)
Node 5: [0, 1, 3] (paths through 3)
Node 6: [0, 1, 2, 3, 4] (multiple paths)
Node 7: [0, 1, 2, 3] (multiple paths)
```

### Example 2:

**Input:**

```
n = 5
edges = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
```

**Output:**

```
[[],[0],[0,1],[0,1,2],[0,1,2,3]]
```

### Constraints:

- `1 <= n <= 1000`
- `0 <= edges.length <= min(2000, n * (n - 1) / 2)`
- `edges[i].length == 2`
- `0 <= fromi, toi <= n - 1`
- `fromi != toi`
- There are no duplicate edges
- The graph is **directed** and **acyclic**

---

## 💡 Intuition

This problem requires finding **all reachable ancestors** for each node:

### Key Insight:

```
Ancestors of node v = All nodes that can reach v
                    = Run BFS/DFS from v in REVERSE graph
                    OR
                    = Propagate ancestors using topological order
```

### Two Approaches:

**Approach 1: Reverse Graph + DFS/BFS**
- Build reverse graph (edges go backward)
- For each node, DFS/BFS to find all reachable nodes
- Those are the ancestors!

**Approach 2: Topological Sort + Propagation**
- Process nodes in topological order
- For each node, collect ancestors from all parents
- More efficient!

### Why Topological Order?

```
If we process in topological order:
- Parents processed before children
- Can collect ancestors from parents
- Each node visited once!
```

---

## 🔍 Algorithm

### Approach 1: DFS on Reverse Graph

1. **Build reverse graph**: For edge u→v, add v→u
2. **For each node i**:
   - DFS/BFS from i in reverse graph
   - Collect all reachable nodes
   - Those are ancestors of i
3. **Sort** each ancestor list

### Approach 2: Kahn's with Ancestor Propagation (Optimal!)

1. **Build graph** and calculate in-degrees
2. **Kahn's algorithm**:
   - Process nodes in topological order
   - For each node, collect ancestors from parents
   - Merge parent ancestors + parent itself
3. **Result** naturally sorted if using TreeSet

---

## 💻 Code

### Solution 1: DFS on Reverse Graph

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var getAncestors = function (n, edges) {
  // Build reverse graph
  const reverseGraph = new Map();
  for (let i = 0; i < n; i++) {
    reverseGraph.set(i, []);
  }

  for (const [from, to] of edges) {
    reverseGraph.get(to).push(from); // Reverse edge
  }

  const result = [];

  // For each node, find all ancestors using DFS
  for (let i = 0; i < n; i++) {
    const ancestors = new Set();

    function dfs(node) {
      for (const parent of reverseGraph.get(node)) {
        if (!ancestors.has(parent)) {
          ancestors.add(parent);
          dfs(parent); // Recurse to find ancestors of parent
        }
      }
    }

    dfs(i);

    // Convert to sorted array
    result.push(Array.from(ancestors).sort((a, b) => a - b));
  }

  return result;
};
```

### Solution 2: Kahn's with Ancestor Propagation (Optimal!)

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var getAncestors = function (n, edges) {
  // Build graph and calculate in-degrees
  const graph = new Map();
  const inDegree = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (const [from, to] of edges) {
    graph.get(from).push(to);
    inDegree[to]++;
  }

  // Initialize ancestors sets for each node
  const ancestors = Array.from({ length: n }, () => new Set());

  // Kahn's algorithm
  const queue = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length > 0) {
    const node = queue.shift();

    // For each child
    for (const child of graph.get(node)) {
      // Add current node as ancestor
      ancestors[child].add(node);

      // Add all ancestors of current node to child
      for (const ancestor of ancestors[node]) {
        ancestors[child].add(ancestor);
      }

      // Reduce in-degree
      inDegree[child]--;
      if (inDegree[child] === 0) {
        queue.push(child);
      }
    }
  }

  // Convert sets to sorted arrays
  return ancestors.map((set) => Array.from(set).sort((a, b) => a - b));
};
```

### Solution 3: DFS with Memoization

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var getAncestors = function (n, edges) {
  // Build forward graph
  const graph = new Map();
  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (const [from, to] of edges) {
    graph.get(from).push(to);
  }

  const ancestors = Array.from({ length: n }, () => new Set());

  function dfs(node, visited, currentAncestors) {
    visited.add(node);

    for (const child of graph.get(node)) {
      // Add current node as ancestor of child
      ancestors[child].add(node);

      // Add all current ancestors to child
      for (const ancestor of currentAncestors) {
        ancestors[child].add(ancestor);
      }

      // Recurse if not visited
      if (!visited.has(child)) {
        const newAncestors = new Set(currentAncestors);
        newAncestors.add(node);
        dfs(child, visited, newAncestors);
      }
    }
  }

  // DFS from each node with no parents
  for (let i = 0; i < n; i++) {
    const visited = new Set();
    dfs(i, visited, new Set());
  }

  return ancestors.map((set) => Array.from(set).sort((a, b) => a - b));
};
```

---

## ⏱️ Time and Space Complexity

### Reverse Graph DFS:

**Time Complexity: O(N² × (N + E))**

- For each of N nodes: O(N)
- DFS traversal: O(N + E)
- Sort ancestors: O(N log N)
- **Total: O(N² + N×E)** in worst case

**Space Complexity: O(N + E)**

- Graph: O(N + E)
- Recursion: O(N)
- Result: O(N²) for dense graph

### Kahn's with Propagation (Optimal):

**Time Complexity: O(N×E + N² log N)**

- Build graph: O(E)
- Kahn's: O(N + E)
- For each edge, may copy ancestors: O(N) per edge → O(N×E)
- Sorting: O(N² log N) for all lists
- **Total: O(N×E)**

**Space Complexity: O(N²)**

- Ancestors sets: O(N²) in worst case
- Graph: O(N + E)

---

## 🎯 Dry Run

### Input:

```
n = 6
edges = [[0,1],[0,2],[1,3],[2,3],[3,4],[4,5]]
```

### Graph:

```
0 → 1 → 3 → 4 → 5
↓       ↑
2 ------┘
```

### Kahn's with Propagation:

**Initial State:**

```
inDegree: [0, 1, 1, 2, 1, 1]
ancestors: [[], [], [], [], [], []]
queue: [0]
```

| Step | Process | Children | Update Ancestors | Queue After |
| ---- | ------- | -------- | ---------------- | ----------- |
| 1 | 0 | [1,2] | anc[1]={0}, anc[2]={0} | [1,2] |
| 2 | 1 | [3] | anc[3]={1,0} | [2] |
| 3 | 2 | [3] | anc[3]={1,0,2} | [3] |
| 4 | 3 | [4] | anc[4]={3,1,0,2} | [4] |
| 5 | 4 | [5] | anc[5]={4,3,1,0,2} | [5] |
| 6 | 5 | [] | - | [] |

**Result:**

```javascript
[
  [],           // Node 0: no ancestors
  [0],          // Node 1: [0]
  [0],          // Node 2: [0]
  [0,1,2],      // Node 3: [0,1,2]
  [0,1,2,3],    // Node 4: [0,1,2,3]
  [0,1,2,3,4]   // Node 5: [0,1,2,3,4]
]
```

---

## 🎓 Key Takeaways

1. **Two Valid Approaches**: Reverse graph DFS vs Forward propagation
2. **Kahn's is Optimal**: Process in topological order, propagate once
3. **Set for Deduplication**: Avoid duplicate ancestors
4. **Sort at End**: Convert Set to sorted array
5. **Memoization Possible**: Cache ancestors to avoid recomputation
6. **DAG Guarantee**: Problem states graph is acyclic

---

## 🔄 Approach Comparison

| Aspect | Reverse DFS | Kahn's Propagation |
| ------ | ----------- | ------------------ |
| **Intuition** | Find who can reach me | Inherit from parents |
| **Efficiency** | O(N² + N×E) | O(N×E) ✅ Better |
| **Implementation** | Simpler | Slightly complex |
| **Memory** | O(N²) | O(N²) |
| **Natural Fit** | Ancestry finding | Dependency propagation |

---

## 📚 Related Problems

1. **All Paths From Source to Target** (LeetCode 797)
2. **Clone Graph** (LeetCode 133)
3. **Number of Restricted Paths** (LeetCode 1786)
4. **Reachable Nodes** (Various problems)
5. **Transitive Closure** (Classic graph problem)

---

