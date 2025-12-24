# 🌉 Find Critical and Pseudo-Critical Edges in MST

**LeetCode 1489** | **Hard** | **MST - Kruskal's Algorithm**

---

## 📝 Problem Description

Given a weighted undirected connected graph with `n` vertices numbered from `0` to `n - 1`, and an array `edges` where `edges[i] = [ai, bi, weighti]` represents a bidirectional and weighted edge between nodes `ai` and `bi`. A minimum spanning tree (MST) is a subset of the graph's edges that connects all vertices without cycles and with the minimum possible total edge weight.

Find all the **critical** and **pseudo-critical** edges in the given graph's minimum spanning tree (MST).

- An MST edge whose deletion from the graph would cause the MST weight to increase is called a **critical edge**.
- A **pseudo-critical edge**, on the other hand, is that which can appear in some MSTs but not all.

Return a list of lists: the first list contains all critical edges, and the second list contains all pseudo-critical edges. You may return the edges in any order.

### Example 1:

**Input:**

```
n = 5
edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]
```

**Output:**

```
[[0,1],[2,3,4,5]]
```

**Explanation:**

```
Critical edges: [0, 1] (indices)
- Edge 0: [0,1,1]
- Edge 1: [1,2,1]

Pseudo-critical edges: [2, 3, 4, 5]
- Can appear in some MSTs but not all
```

### Example 2:

**Input:**

```
n = 4
edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]
```

**Output:**

```
[[],[0,1,2,3]]
```

**Explanation:**

```
No critical edges (can form MST without any specific edge)
All edges are pseudo-critical (can appear in some MST)
```

### Constraints:

- `2 <= n <= 100`
- `1 <= edges.length <= min(200, n * (n - 1) / 2)`
- `edges[i].length == 3`
- `0 <= ai < bi < n`
- `1 <= weighti <= 1000`
- All pairs `(ai, bi)` are distinct

---

## 💡 Intuition

This problem requires understanding three key concepts:

### 1. **Critical Edge**:
- If removed, MST weight **increases** OR graph becomes disconnected
- Essential for maintaining minimum weight
- Only ONE MST possible through this edge

### 2. **Pseudo-Critical Edge**:
- Can appear in SOME MSTs but not ALL
- Removing it doesn't increase MST weight (alternative paths exist)
- When forced to include it, MST weight remains the same

### 3. **Non-Critical Edge**:
- Never appears in any MST
- Including it would increase MST weight

### Detection Strategy:

```
For each edge:
  1. Calculate original MST weight
  
  2. Test if CRITICAL:
     - Build MST WITHOUT this edge
     - If weight increases OR graph disconnected → CRITICAL
  
  3. Test if PSEUDO-CRITICAL:
     - Build MST WITH this edge FORCED
     - If weight = original → PSEUDO-CRITICAL
```

---

## 🔍 Algorithm

### Main Steps:

1. **Calculate Original MST Weight**:
   - Run Kruskal's algorithm normally
   - Store the minimum weight

2. **For Each Edge**:
   
   **Test Critical:**
   - Skip this edge
   - Calculate MST weight
   - If weight > original OR not all nodes connected → Critical
   
   **Test Pseudo-Critical:**
   - Force include this edge first
   - Calculate remaining MST
   - If total weight = original → Pseudo-Critical

3. **Return Results**: [criticalEdges, pseudoCriticalEdges]

---

## 💻 Code

### Solution: Kruskal's with Edge Testing

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

  isConnected() {
    const root = this.find(0);
    for (let i = 1; i < this.parent.length; i++) {
      if (this.find(i) !== root) return false;
    }
    return true;
  }
}

/**
 * Helper function to build MST using Kruskal's
 * @param {number} n - number of nodes
 * @param {number[][]} edges - edges with [u, v, weight, index]
 * @param {number} skipIndex - edge index to skip (-1 for none)
 * @param {number} forceIndex - edge index to force include (-1 for none)
 * @return {number} - MST weight (-1 if impossible)
 */
function buildMST(n, edges, skipIndex = -1, forceIndex = -1) {
  const uf = new UnionFind(n);
  let weight = 0;
  let edgesUsed = 0;

  // Force include edge if specified
  if (forceIndex !== -1) {
    const [u, v, w] = edges[forceIndex];
    uf.union(u, v);
    weight += w;
    edgesUsed++;
  }

  // Process all edges
  for (let i = 0; i < edges.length; i++) {
    if (i === skipIndex || i === forceIndex) continue;

    const [u, v, w] = edges[i];

    if (uf.union(u, v)) {
      weight += w;
      edgesUsed++;

      if (edgesUsed === n - 1) break;
    }
  }

  // Check if MST is complete
  return edgesUsed === n - 1 && uf.isConnected() ? weight : -1;
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var findCriticalAndPseudoCriticalEdges = function (n, edges) {
  // Add original index to each edge
  const indexedEdges = edges.map((edge, idx) => [...edge, idx]);

  // Sort edges by weight
  indexedEdges.sort((a, b) => a[2] - b[2]);

  // Calculate original MST weight
  const originalWeight = buildMST(n, indexedEdges);

  const critical = [];
  const pseudoCritical = [];

  // Test each edge
  for (let i = 0; i < indexedEdges.length; i++) {
    const originalIndex = indexedEdges[i][3];

    // Test if CRITICAL: build MST without this edge
    const weightWithoutEdge = buildMST(n, indexedEdges, i);

    if (weightWithoutEdge > originalWeight || weightWithoutEdge === -1) {
      // Edge is critical (removing increases weight or breaks connectivity)
      critical.push(originalIndex);
    } else {
      // Test if PSEUDO-CRITICAL: build MST with this edge forced
      const weightWithEdge = buildMST(n, indexedEdges, -1, i);

      if (weightWithEdge === originalWeight) {
        // Edge can be part of an MST without increasing weight
        pseudoCritical.push(originalIndex);
      }
    }
  }

  return [critical, pseudoCritical];
};
```

---

## ⏱️ Time and Space Complexity

### Time Complexity: O(E² × α(V))

**Breakdown:**

- Build original MST: O(E log E + E × α(V))
- For each edge E:
  - Test critical: O(E × α(V))
  - Test pseudo-critical: O(E × α(V))
- Total: O(E × E × α(V)) = **O(E² × α(V))**

where α(V) is the inverse Ackermann function (nearly constant).

### Space Complexity: O(V + E)

- Union-Find: O(V)
- Indexed edges: O(E)
- Result arrays: O(E)

---

## 🎯 Dry Run

### Input:

```
n = 5
edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]
```

### Step 1: Add Indices and Sort

**Indexed Edges:**

```
[u, v, weight, originalIndex]
[[0,1,1,0], [1,2,1,1], [2,3,2,2], [0,3,2,3], [0,4,3,4], [3,4,3,5], [1,4,6,6]]
```

**After Sorting by Weight:**

```
[[0,1,1,0], [1,2,1,1], [2,3,2,2], [0,3,2,3], [0,4,3,4], [3,4,3,5], [1,4,6,6]]
```

### Step 2: Build Original MST

| Step | Edge (u,v,w,idx) | Union? | Weight | Edges Used |
| ---- | ---------------- | ------ | ------ | ---------- |
| 1 | (0,1,1,0) | ✅ | 1 | 1 |
| 2 | (1,2,1,1) | ✅ | 2 | 2 |
| 3 | (2,3,2,2) | ✅ | 4 | 3 |
| 4 | (0,3,2,3) | ❌ (cycle) | 4 | 3 |
| 5 | (0,4,3,4) | ✅ | 7 | 4 |

**Original MST Weight: 7**

### Step 3: Test Each Edge

**Edge 0 [0,1,1]:**
- Skip edge 0, build MST: Weight = 8 (use edge 3 instead)
- 8 > 7 → **CRITICAL** ✅

**Edge 1 [1,2,1]:**
- Skip edge 1, build MST: Weight = 8
- 8 > 7 → **CRITICAL** ✅

**Edge 2 [2,3,2]:**
- Skip edge 2, build MST: Weight = 7 (use edge 3 instead)
- Force edge 2, build MST: Weight = 7
- Same weight → **PSEUDO-CRITICAL** ✅

**Edge 3 [0,3,2]:**
- Skip edge 3, build MST: Weight = 7
- Force edge 3, build MST: Weight = 7
- Same weight → **PSEUDO-CRITICAL** ✅

**Edge 4 [0,4,3]:**
- Skip edge 4, build MST: Weight = 8
- Force edge 4, build MST: Weight = 7
- Same weight → **PSEUDO-CRITICAL** ✅

**Edge 5 [3,4,3]:**
- Skip edge 5, build MST: Weight = 7
- Force edge 5, build MST: Weight = 7
- Same weight → **PSEUDO-CRITICAL** ✅

**Edge 6 [1,4,6]:**
- Skip edge 6, build MST: Weight = 7
- Force edge 6, build MST: Weight = 10
- 10 > 7 → **NOT in any MST** ❌

### Result:

```
Critical: [0, 1]
Pseudo-Critical: [2, 3, 4, 5]
```

---

## 🎓 Key Takeaways

1. **Critical Edge**: MST weight increases if removed
2. **Pseudo-Critical**: Can be in some MSTs, not all
3. **Testing Method**:
   - Skip edge → test critical
   - Force edge → test pseudo-critical
4. **Multiple MSTs**: When multiple edges have same weight
5. **Kruskal's is Ideal**: Easier to skip/force edges
6. **Time Intensive**: O(E²) due to testing each edge

---

## 🔄 Why Kruskal's Over Prim's?

| Aspect | Kruskal's | Prim's |
| ------ | --------- | ------ |
| **Skip Edge** | Easy: just don't process it | Hard: need to rebuild adjacency |
| **Force Edge** | Easy: add first, then process rest | Hard: ensure it's selected |
| **Implementation** | Clean and straightforward | Complex modifications needed |
| **Preferred** | ✅ YES | ❌ Not ideal |

---

## 📚 Related Problems

1. **Min Cost to Connect All Points** (LeetCode 1584)
2. **Connecting Cities With Minimum Cost** (LeetCode 1135)
3. **Number of Ways to Arrive at Destination** (LeetCode 1976)
4. **Network Delay Time** (LeetCode 743)

---

