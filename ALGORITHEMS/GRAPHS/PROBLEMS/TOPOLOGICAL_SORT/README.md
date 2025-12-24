
# 🎓 Topological Sort Problems Collection

A comprehensive collection of **10 Topological Sort problems** using both **DFS-based** and **Kahn's Algorithm (BFS-based)** approaches.

---

## 📚 Problems Overview

### ✅ **All 10 Problems Created!**

### 1️⃣ **Course Schedule II** ⭐ Classic

- **File**: `01_Course_Schedule_II.md`
- **Difficulty**: Medium
- **Source**: LeetCode 210
- **Key Concepts**: Classic Topological Sort, Return Ordering
- **Approaches**: ✅ DFS (Post-order) | ✅ Kahn's (BFS)
- **Time**: O(V+E) | **Space**: O(V+E)

### 2️⃣ **Course Schedule** (Cycle Detection)

- **File**: `02_Course_Schedule.md`
- **Difficulty**: Medium
- **Source**: LeetCode 207
- **Key Concepts**: Cycle Detection, 3-State DFS
- **Approaches**: ✅ DFS (3 states) | ✅ Kahn's (count check)
- **Time**: O(V+E) | **Space**: O(V+E)

### 3️⃣ **Alien Dictionary** ⭐ Hard

- **File**: `03_Alien_Dictionary.md`
- **Difficulty**: Hard
- **Source**: LeetCode 269
- **Key Concepts**: Graph Construction, Character Ordering, Prefix Handling
- **Approaches**: ✅ DFS | ✅ Kahn's
- **Time**: O(C) where C = total chars | **Space**: O(1) for fixed alphabet

### 4️⃣ **Parallel Courses** (Minimum Semesters)

- **File**: `04_Parallel_Courses.md`
- **Difficulty**: Medium
- **Source**: LeetCode 1136
- **Key Concepts**: Level Tracking, Longest Path in DAG, Parallel Processing
- **Approaches**: ✅ DFS with Memoization | ✅ Kahn's with Levels
- **Time**: O(V+E) | **Space**: O(V+E)

### 5️⃣ **Sequence Reconstruction**

- **File**: `05_Sequence_Reconstruction.md`
- **Difficulty**: Medium
- **Source**: LeetCode 444
- **Key Concepts**: Unique Ordering, Queue Size = 1, Order Verification
- **Approaches**: ✅ Kahn's with Uniqueness Check | ✅ DFS Validation
- **Time**: O(V+E) | **Space**: O(V+E)

### 6️⃣ **All Ancestors of a Node**

- **File**: `06_All_Ancestors_of_Node.md`
- **Difficulty**: Medium
- **Source**: LeetCode 2192
- **Key Concepts**: Reverse Graph, Ancestor Propagation
- **Approaches**: ✅ Reverse DFS | ✅ Kahn's with Propagation
- **Time**: O(N²+N×E) or O(N×E) | **Space**: O(N²)

### 7️⃣ **Find All Possible Recipes**

- **File**: `07_Find_All_Possible_Recipes.md`
- **Difficulty**: Medium
- **Source**: LeetCode 2115
- **Key Concepts**: Dependency Resolution, Recipe Creation
- **Approaches**: ✅ Kahn's (Optimal) | ✅ DFS with Memoization
- **Time**: O(R+I) | **Space**: O(R+I)

### 8️⃣ **Sort Items by Groups Respecting Dependencies** ⭐ Hard

- **File**: `08_Sort_Items_by_Groups_Respecting_Dependencies.md`
- **Difficulty**: Hard
- **Source**: LeetCode 1203
- **Key Concepts**: Two-Level Sorting, Group + Item Ordering
- **Approaches**: ✅ Double Kahn's Algorithm
- **Time**: O(N+M+E) | **Space**: O(N+M+E)

### 9️⃣ **Minimum Height Trees**

- **File**: `09_Minimum_Height_Trees.md`
- **Difficulty**: Medium
- **Source**: LeetCode 310
- **Key Concepts**: Trim Leaves, Center Finding, Modified Topological Sort
- **Approaches**: ✅ Layer-by-Layer Leaf Removal | ✅ DFS Diameter
- **Time**: O(N) | **Space**: O(N)

### 🔟 **Build a Matrix With Conditions** ⭐ Hard

- **File**: `10_Build_Matrix_With_Conditions.md`
- **Difficulty**: Hard
- **Source**: LeetCode 2392
- **Key Concepts**: 2D Topological Sort, Independent Row/Column Ordering
- **Approaches**: ✅ Double Kahn's | ✅ Double DFS
- **Time**: O(K²+R+C) | **Space**: O(K²+R+C)

---

## 🎯 Learning Path

### **Beginner Path** (Start Here):

**Week 1: Fundamentals**

1. **Problem 1** - Course Schedule II (Learn basic topological sort)
2. **Problem 2** - Course Schedule (Master cycle detection)

### **Intermediate Path**:

**Week 2: Applications**

3. **Problem 4** - Parallel Courses (Level tracking)
4. **Problem 5** - Sequence Reconstruction (Uniqueness)
5. **Problem 6** - All Ancestors (Propagation)

### **Advanced Path**:

**Week 3: Complex Problems**

6. **Problem 3** - Alien Dictionary (Graph construction)
7. **Problem 7** - Find All Recipes (Dependency resolution)
8. **Problem 9** - Minimum Height Trees (Center finding)

### **Expert Path**:

**Week 4: Very Hard**

9. **Problem 8** - Sort Items by Groups (Two-level sorting)
10. **Problem 10** - Build Matrix (2D topological sort)

---

## 🔑 Algorithm Comparison

### DFS-Based Topological Sort:

```javascript
function topologicalSortDFS(graph, V) {
  const visited = new Set();
  const result = [];

  function dfs(node) {
    visited.add(node);

    for (let neighbor of graph.get(node)) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }

    result.push(node); // Post-order
  }

  for (let i = 0; i < V; i++) {
    if (!visited.has(i)) {
      dfs(i);
    }
  }

  return result.reverse(); // Reverse for topological order
}
```

### Kahn's Algorithm (BFS):

```javascript
function kahnsAlgorithm(graph, V) {
  const inDegree = Array(V).fill(0);

  // Calculate in-degrees
  for (let u = 0; u < V; u++) {
    for (let v of graph.get(u)) {
      inDegree[v]++;
    }
  }

  // Queue nodes with in-degree 0
  const queue = [];
  for (let i = 0; i < V; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const result = [];

  while (queue.length > 0) {
    const u = queue.shift();
    result.push(u);

    for (let v of graph.get(u)) {
      inDegree[v]--;
      if (inDegree[v] === 0) queue.push(v);
    }
  }

  // Check for cycle
  return result.length === V ? result : null;
}
```

---

## 📊 When to Use Which Algorithm?

### Use DFS-Based When:

✅ Comfortable with recursion
✅ Need post-order traversal
✅ Want to detect cycles during traversal
✅ Memory-efficient (no queue)
✅ Natural for tree-like structures

### Use Kahn's (BFS) When:

✅ Prefer iterative solutions
✅ Need level-by-level processing
✅ Want explicit cycle detection (check result length)
✅ Need to track "levels" or "layers"
✅ Building result incrementally

### Comparison Table:

| Aspect              | DFS-Based                 | Kahn's (BFS)               |
| ------------------- | ------------------------- | -------------------------- |
| **Approach**        | Recursive post-order      | Iterative level-order      |
| **Data Structure**  | Stack (implicit)          | Queue (explicit)           |
| **Cycle Detection** | 3-state method            | Result length check        |
| **Intuition**       | Finish dependencies first | Start with no dependencies |
| **Code Complexity** | Shorter, recursive        | Longer, iterative          |
| **Stack Overflow**  | Possible for deep graphs  | No risk                    |
| **Level Tracking**  | Need extra work           | Natural                    |
| **Time**            | O(V + E)                  | O(V + E)                   |
| **Space**           | O(V) recursion            | O(V) queue                 |

---

## 🎓 Core Concepts

### 1. **Cycle Detection**:

**DFS (3 States):**

```
0 = UNVISITED
1 = VISITING (in current DFS path)
2 = VISITED (fully processed)

If reach node with state=1 → Cycle!
```

**Kahn's:**

```
If result.length < V → Cycle exists
```

### 2. **Longest Path in DAG**:

```
= Maximum depth in topological ordering
= Minimum time units needed (like semesters)

Use Kahn's with level tracking!
```

### 3. **Unique Topological Ordering**:

```
Exists ↔ At each step, exactly ONE node has in-degree 0

Check: queue.length === 1 throughout Kahn's
```

### 4. **Graph Construction**:

```
From prerequisites: [a, b] → edge from b to a
From sequences: consecutive elements → directed edges
From comparisons: first difference → ordering edge
```

---

## 🛠️ Common Patterns

### Pattern 1: Basic Topological Sort

```javascript
// Return ordering if possible, [] if cycle
function topSort(numNodes, edges) {
  // Build graph + in-degrees
  // Kahn's algorithm
  // Return result if valid
}

// Problems: 1, 2
```

### Pattern 2: Cycle Detection Only

```javascript
// Return true if can complete, false if cycle
function canFinish(numNodes, edges) {
  // Build graph
  // DFS with 3 states OR Kahn's
  // Return !hasCycle
}

// Problem: 2
```

### Pattern 3: Level/Depth Tracking

```javascript
// Return minimum levels/semesters needed
function minLevels(numNodes, edges) {
  // Kahn's with level counter
  // Process each level completely
  // Return level count
}

// Problem: 4
```

### Pattern 4: Uniqueness Check

```javascript
// Verify unique topological ordering
function isUnique(target, sequences) {
  // Kahn's with queue.length === 1 check
  // Match with target at each step
}

// Problem: 5
```

### Pattern 5: Graph Construction from Comparisons

```javascript
// Build graph from word/character comparisons
function buildGraph(words) {
  // Compare adjacent items
  // Find first difference
  // Add directed edge
}

// Problem: 3
```

---

## ⚡ Optimization Techniques

### 1. **Use Set for Neighbors**:

```javascript
// Avoid duplicate edges
const graph = new Map();
graph.set(node, new Set()); // Use Set, not Array
```

### 2. **Memoization in DFS**:

```javascript
// Cache depth/distance results
const memo = new Map();
if (memo.has(node)) return memo.get(node);
// ... compute ...
memo.set(node, result);
```

### 3. **Early Cycle Detection**:

```javascript
// DFS: return immediately on cycle
if (state[node] === VISITING) return false;
```

### 4. **Level-by-Level Processing**:

```javascript
// Process entire level at once
const levelSize = queue.length;
for (let i = 0; i < levelSize; i++) {
  // process node
}
level++;
```

---

## 💡 Common Pitfalls

❌ **Forgetting to reverse** DFS result (post-order needs reversal)
❌ **Not checking cycle** in Kahn's (compare result.length with V)
❌ **Wrong edge direction** (prerequisites: [a,b] means b→a)
❌ **Duplicate edges** (use Set or check before adding)
❌ **Missing nodes** (initialize all nodes in graph)
❌ **Off-by-one** in 1-indexed problems
❌ **Not handling disconnected** components
❌ **Stack overflow** in deep DFS (prefer Kahn's for large graphs)

---

## 📈 Complexity Summary

### All Problems:

| Problem  | Time   | Space  | Notes                   |
| -------- | ------ | ------ | ----------------------- |
| **1-2**  | O(V+E) | O(V+E) | Standard                |
| **3**    | O(C)   | O(1)   | C=chars, fixed alphabet |
| **4**    | O(V+E) | O(V+E) | With memoization        |
| **5**    | O(V+E) | O(V+E) | Standard                |
| **6-10** | O(V+E) | O(V+E) | Various                 |

---

## 🎮 Practice Strategy

### Phase 1: Master Basics (Days 1-7)

- Implement both DFS and Kahn's from scratch
- Solve Problems 1-2 multiple times
- Understand cycle detection thoroughly

### Phase 2: Applications (Days 8-14)

- Solve Problems 3-5
- Practice graph construction
- Master level tracking

### Phase 3: Advanced (Days 15-21)

- Tackle Problems 6-8
- Handle multiple targets
- Two-level sorting

### Phase 4: Expert (Days 22-30)

- Solve Problems 9-10
- Optimize solutions
- Handle special cases

---

## 🏆 Mastery Checklist

- [ ] Implement DFS topological sort from scratch
- [ ] Implement Kahn's algorithm from scratch
- [ ] Understand 3-state cycle detection
- [ ] Master level/depth tracking
- [ ] Handle graph construction from various inputs
- [ ] Detect unique orderings
- [ ] Solve all 10 problems
- [ ] Optimize for different graph types
- [ ] Handle edge cases (cycles, disconnected, duplicates)
- [ ] Know when to use DFS vs Kahn's

---

## 📚 Related Algorithms

### Within Topological Sort:

- **Critical Path Method**: Longest path in project scheduling
- **Precedence Graphs**: Task ordering with dependencies
- **DAG Shortest/Longest Path**: Using topological order

### Related Graph Algorithms:

- **DFS**: Foundation for topological sort
- **BFS**: Foundation for Kahn's algorithm
- **Cycle Detection**: Essential component
- **Strongly Connected Components**: For directed graphs

---

## 🌟 Real-World Applications

1. **Build Systems**: Compile dependencies (Make, Maven, Gradle)
2. **Package Managers**: Install order (npm, pip, apt)
3. **Task Scheduling**: Project management, workflow systems
4. **Course Planning**: University prerequisite chains
5. **Job Scheduling**: Operating systems, distributed systems
6. **Data Pipelines**: ETL process ordering
7. **Circuit Design**: Logic gate evaluation order

---

## 📖 Additional Resources

### Visualization Tools:

- **VisuAlgo**: https://visualgo.net/en/dfsbfs
- **Algorithm Visualizer**: Topological sort animations

### Practice Platforms:

- **LeetCode**: Problems 207, 210, 269, 444, 1136, etc.
- **GeeksforGeeks**: Topological sort variations
- **HackerRank**: Graph theory problems

---

**Happy Learning! 🚀**

_Master topological sort with both DFS and Kahn's algorithms through these 10 comprehensive problems!_
