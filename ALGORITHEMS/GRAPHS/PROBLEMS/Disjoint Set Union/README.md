# 🔗 Union-Find (Disjoint Set) Problems Collection

A comprehensive collection of **10 Union-Find problems** demonstrating various applications of the Disjoint Set data structure with **path compression** and **union by rank/size** optimizations.

---

## 📚 Problems Overview

### ✅ **All 10 Problems Complete!**

### 1️⃣ **Connecting the Graph** ⭐ Your Problem!

- **File**: `01_Connecting_the_Graph.md`
- **Difficulty**: Medium
- **Source**: GeeksforGeeks
- **Key Concepts**: Count Components, Extra Edges, Graph Repair
- **Your Solution**: ✅ Provided!
- **Time**: O(M+N) | **Space**: O(N)

### 2️⃣ **Redundant Connection**

- **File**: `02_Redundant_Connection.md`
- **Difficulty**: Medium
- **Source**: LeetCode 684
- **Key Concepts**: Cycle Detection, Find Extra Edge
- **Time**: O(N×α(N)) | **Space**: O(N)

### 3️⃣ **Number of Islands II** ⭐ Hard

- **File**: `03_Number_of_Islands_II.md`
- **Difficulty**: Hard
- **Source**: LeetCode 305
- **Key Concepts**: Dynamic Connectivity, Island Merging
- **Time**: O(K×α(M×N)) | **Space**: O(M×N)

### 4️⃣ **Accounts Merge**

- **File**: `04_Accounts_Merge.md`
- **Difficulty**: Medium
- **Source**: LeetCode 721
- **Key Concepts**: Component Merging, Email Grouping
- **Time**: O(N×K×log K) | **Space**: O(N×K)

### 5️⃣ **Number of Good Components** ⭐ Your Problem!

- **File**: `05_Number_of_Good_Components.md`
- **Difficulty**: Medium
- **Source**: GeeksforGeeks
- **Key Concepts**: Fully Connected Components, Complete Graph
- **Your Solution**: ✅ Provided!
- **Time**: O(E+V) | **Space**: O(V)

### 6️⃣ **Most Stones Removed with Same Row or Column**

- **File**: `06_Most_Stones_Removed.md`
- **Difficulty**: Medium
- **Source**: LeetCode 947
- **Key Concepts**: Component Size, Maximum Removal
- **Time**: O(N×α(N)) | **Space**: O(N)

### 7️⃣ **Smallest String With Swaps**

- **File**: `07_Smallest_String_With_Swaps.md`
- **Difficulty**: Medium
- **Source**: LeetCode 1202
- **Key Concepts**: Character Grouping, Lexicographic Sorting
- **Time**: O(N log N) | **Space**: O(N)

### 8️⃣ **Satisfiability of Equality Equations**

- **File**: `08_Satisfiability_of_Equality_Equations.md`
- **Difficulty**: Medium
- **Source**: LeetCode 990
- **Key Concepts**: Constraint Satisfaction, Two-Pass Validation
- **Time**: O(N×α(26)) ≈ O(N) | **Space**: O(1)

### 9️⃣ **Couples Holding Hands** ⭐ Hard

- **File**: `09_Couples_Holding_Hands.md`
- **Difficulty**: Hard
- **Source**: LeetCode 765
- **Key Concepts**: Cycle Counting, Minimum Swaps Formula
- **Time**: O(N×α(N)) | **Space**: O(N)

### 🔟 **Evaluate Division**

- **File**: `10_Evaluate_Division.md`
- **Difficulty**: Medium
- **Source**: LeetCode 399
- **Key Concepts**: Weighted Union-Find / Graph DFS, Division Queries
- **Time**: O((E+Q)×(V+E)) | **Space**: O(V+E)

---

## 🎯 Learning Path

### **Beginner Path** (Start Here):

**Week 1: Foundations**

1. **Problem 1** - Connecting the Graph (Your solution - master the basics!)
2. **Problem 2** - Redundant Connection (Cycle detection)

### **Intermediate Path**:

**Week 2: Applications**

3. **Problem 3** - Number of Islands II (Dynamic connectivity)
4. **Problem 4** - Accounts Merge (Component merging)
5. **Problem 5** - Number of Good Components (Your problem - Fully connected!)
6. **Problem 6** - Most Stones Removed (Count removable elements)

### **Advanced Path**:

**Week 3: Complex Scenarios**

7. **Problem 7** - Smallest String With Swaps (Sorting within components)
8. **Problem 8** - Satisfiability (Constraint validation)

### **Expert Path**:

**Week 4: Very Hard**

9. **Problem 9** - Couples Holding Hands (Cycle analysis - Hard!)
10. **Problem 10** - Evaluate Division (Weighted Union-Find / DFS)

---

## 🔑 Union-Find Template

### Basic Implementation:

```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array(n)
      .fill(0)
      .map((_, i) => i);
    this.rank = Array(n).fill(0);
    this.count = n; // Number of components
  }

  // Find with path compression
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  // Union by rank
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false; // Already connected

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.count--; // Merged two components
    return true;
  }

  // Check if connected
  connected(x, y) {
    return this.find(x) === this.find(y);
  }

  // Get number of components
  getCount() {
    return this.count;
  }
}
```

### Alternative: Union by Size

```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array(n)
      .fill(0)
      .map((_, i) => i);
    this.size = Array(n).fill(1); // Track component sizes
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

    // Attach smaller to larger
    if (this.size[rootX] < this.size[rootY]) {
      this.parent[rootX] = rootY;
      this.size[rootY] += this.size[rootX];
    } else {
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
    }

    return true;
  }

  // Get size of component containing x
  getSize(x) {
    return this.size[this.find(x)];
  }
}
```

---

## 📊 When to Use Union-Find?

### ✅ Perfect For:

1. **Connected Components**: Count or track groups
2. **Cycle Detection**: In undirected graphs
3. **Dynamic Connectivity**: Add edges, check connectivity
4. **Merging Groups**: Combine sets efficiently
5. **Network Connectivity**: Check if path exists

### ❌ Not Suitable For:

1. **Directed Graphs**: Use DFS/BFS instead
2. **Disconnecting**: Union-Find can't split components
3. **Path Finding**: Use Dijkstra's or BFS
4. **Negative Cycles**: Use Bellman-Ford

---

## 🛠️ Common Patterns

### Pattern 1: Count Components

```javascript
function countComponents(n, edges) {
  const uf = new UnionFind(n);

  for (const [u, v] of edges) {
    uf.union(u, v);
  }

  return uf.getCount();
}
```

### Pattern 2: Detect Cycle

```javascript
function hasCycle(n, edges) {
  const uf = new UnionFind(n);

  for (const [u, v] of edges) {
    if (uf.connected(u, v)) {
      return true; // Cycle detected!
    }
    uf.union(u, v);
  }

  return false;
}
```

### Pattern 3: Dynamic Islands

```javascript
function addIslands(m, n, positions) {
  const uf = new UnionFind(m * n);
  const result = [];
  let count = 0;

  for (const [r, c] of positions) {
    // Add land, check 4 neighbors, union if land
    // Track count dynamically
  }

  return result;
}
```

### Pattern 4: Group and Process

```javascript
function groupAndProcess(items) {
  const uf = new UnionFind(items.length);

  // Union related items
  for (...) {
    uf.union(i, j);
  }

  // Group by root
  const groups = new Map();
  for (let i = 0; i < items.length; i++) {
    const root = uf.find(i);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(items[i]);
  }

  // Process each group
  return processGroups(groups);
}
```

---

## ⚡ Optimization Techniques

### 1. **Path Compression**:

```javascript
find(x) {
  if (this.parent[x] !== x) {
    this.parent[x] = this.find(this.parent[x]); // Flatten tree
  }
  return this.parent[x];
}
```

**Effect**: Makes future operations nearly O(1)

### 2. **Union by Rank**:

```javascript
if (this.rank[rootX] < this.rank[rootY]) {
  this.parent[rootX] = rootY; // Attach shorter to taller
}
```

**Effect**: Keeps trees balanced

### 3. **Union by Size**:

```javascript
if (this.size[rootX] < this.size[rootY]) {
  this.parent[rootX] = rootY;
  this.size[rootY] += this.size[rootX];
}
```

**Effect**: Alternative to rank, tracks component sizes

---

## 💡 Time Complexity Analysis

### Without Optimizations:

| Operation | Time |
| --------- | ---- |
| Find | O(N) |
| Union | O(N) |

### With Path Compression Only:

| Operation | Time |
| --------- | ---- |
| Find | O(log N) |
| Union | O(log N) |

### With Both Optimizations:

| Operation | Time |
| --------- | ---- |
| Find | O(α(N)) ≈ O(1) |
| Union | O(α(N)) ≈ O(1) |

where α(N) is the inverse Ackermann function (grows **extremely** slowly)

**For all practical purposes: O(1) per operation!**

---

## 📈 Complexity Summary

### All Problems:

| Problem | Time | Space | Key Operation |
| ------- | ---- | ----- | ------------- |
| **1** | O(M+N) | O(N) | Count components + extra edges |
| **2** | O(N×α(N)) | O(N) | Detect first cycle edge |
| **3** | O(K×α(M×N)) | O(M×N) | Dynamic island counting |
| **4** | O(N×K×log K) | O(N×K) | Merge and sort components |
| **5** | O(E+V) | O(V) | Validate complete graphs |
| **6** | O(N×α(N)) | O(N) | Component size calculation |
| **7** | O(N×log N) | O(N) | Sort within components |
| **8** | O(N×α(26)) ≈ O(N) | O(1) | Validate constraints |
| **9** | O(N×α(N)) | O(N) | Count cycles, minimum swaps |
| **10** | O((E+Q)×(V+E)) | O(V+E) | Weighted paths / Graph DFS |

---

## 🎓 Core Concepts

### 1. **Disjoint Sets**:

```
Sets with no common elements
{1,2,3} and {4,5} are disjoint
```

### 2. **Representative (Root)**:

```
Each set has a representative element
Used to identify the entire set
```

### 3. **Path Compression**:

```
Flatten tree structure during find()
Makes all nodes point directly to root
```

### 4. **Union by Rank**:

```
Always attach smaller tree to larger
Keeps overall tree height minimal
```

### 5. **Amortized O(α(N))**:

```
Over many operations, average cost is nearly constant
α(N) < 5 for all practical N values
```

---

## 🔄 Union-Find vs Other Data Structures

| Task | Union-Find | Alternative | Winner |
| ---- | ---------- | ----------- | ------ |
| **Check connectivity** | O(α(N)) | DFS: O(V+E) | Union-Find ✅ |
| **Add edge** | O(α(N)) | Update graph: O(1) | Tie |
| **Count components** | O(N) one-time | DFS all: O(V+E) | Union-Find ✅ |
| **Find path** | ❌ Can't | BFS: O(V+E) | BFS ✅ |
| **Remove edge** | ❌ Can't | Update graph: O(1) | Graph ✅ |
| **Dynamic connectivity** | ✅ Perfect | Recompute each time | Union-Find ✅ |

---

## 💪 Practice Strategy

### Phase 1: Master Template (Days 1-3)

- Implement Union-Find from scratch
- Understand path compression
- Understand union by rank/size
- Practice on Problem 1 (your solution!)

### Phase 2: Basic Applications (Days 4-10)

- Solve Problems 2-4
- Practice cycle detection
- Practice component counting
- Practice grouping

### Phase 3: Intermediate (Days 11-17)

- Solve Problems 5-6
- Handle dynamic scenarios
- Sort within components

### Phase 4: Advanced (Days 18-30)

- Solve Problems 7-10
- Weighted Union-Find
- Complex constraint satisfaction

---

## 🏆 Mastery Checklist

- [ ] Implement Union-Find with path compression
- [ ] Implement union by rank
- [ ] Implement union by size
- [ ] Understand α(N) complexity
- [ ] Detect cycles in undirected graph
- [ ] Count connected components
- [ ] Handle dynamic connectivity
- [ ] Merge and group components
- [ ] Solve all 10 problems
- [ ] Optimize for different problem types

---

## 📚 Related Data Structures

### Within Union-Find:
- **Quick-Find**: O(1) find, O(N) union (naive)
- **Quick-Union**: O(N) find, O(N) union (better)
- **Weighted Quick-Union**: O(log N) operations
- **Path Compression + Rank**: O(α(N)) ≈ O(1) ✅

### Related Algorithms:
- **DFS/BFS**: For directed graphs, path finding
- **Kruskal's MST**: Uses Union-Find internally
- **Topological Sort**: For ordered dependencies

---

## 🌟 Real-World Applications

1. **Network Connectivity**: Check if servers connected
2. **Social Networks**: Find friend groups
3. **Image Processing**: Detect connected regions
4. **Kruskal's MST**: Minimum spanning tree algorithm
5. **Percolation Theory**: Physics simulations
6. **Compiler Optimization**: Register allocation
7. **Game Development**: Dynamic terrain connectivity

---

## 📖 Additional Resources

### Visualization Tools:
- **VisuAlgo**: https://visualgo.net/en/ufds
- **Algorithm Visualizer**: Union-Find animations

### Practice Platforms:
- **LeetCode**: Problems 684, 721, 305, 547, 990, etc.
- **GeeksforGeeks**: Union-Find variations
- **HackerRank**: Disjoint set problems

---

**Happy Learning! 🚀**

_Master Union-Find (Disjoint Set) through these 10 comprehensive problems!_

