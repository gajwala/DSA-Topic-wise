# 📚 Course Schedule II

**LeetCode 210** | **Medium** | **Topological Sort - DFS & BFS**

---

## 📝 Problem Description

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.

- For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.

Return **the ordering of courses** you should take to finish all courses. If there are many valid answers, return **any** of them. If it is impossible to finish all courses, return **an empty array**.

### Example 1:

**Input:**

```
numCourses = 2
prerequisites = [[1,0]]
```

**Output:**

```
[0,1]
```

**Explanation:**

```
There are 2 courses. To take course 1, you should finish course 0.
So the correct course order is [0,1].
```

### Example 2:

**Input:**

```
numCourses = 4
prerequisites = [[1,0],[2,0],[3,1],[3,2]]
```

**Output:**

```
[0,2,1,3] or [0,1,2,3]
```

**Explanation:**

```
There are 4 courses. You must take course 0 first.
After 0, you can take 1 or 2 (in any order).
After both 1 and 2, you can take 3.

Valid orderings: [0,1,2,3], [0,2,1,3]
```

### Example 3:

**Input:**

```
numCourses = 1
prerequisites = []
```

**Output:**

```
[0]
```

### Constraints:

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= numCourses * (numCourses - 1)`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- `ai != bi`
- All the pairs `[ai, bi]` are **distinct**

---

## 💡 Intuition

This is a **classic topological sort problem**:

### Key Observations:

1. **Prerequisites = Directed Graph**: `[a, b]` means edge from `b → a`
2. **Course Order = Topological Sort**: Linear ordering where prerequisites come first
3. **Cycle Detection**: If cycle exists, impossible to finish all courses
4. **Two Approaches**: DFS-based and BFS-based (Kahn's Algorithm)

### Graph Representation:

```
prerequisites = [[1,0],[2,0],[3,1],[3,2]]

Graph (adjacency list):
0 → [1, 2]
1 → [3]
2 → [3]
3 → []

Topological order: 0 → 1/2 → 2/1 → 3
Result: [0,1,2,3] or [0,2,1,3]
```

### Why Two Algorithms?

| Aspect | DFS-Based | Kahn's (BFS) |
| ------ | --------- | ------------ |
| **Approach** | Post-order traversal | Remove nodes with 0 in-degree |
| **Data Structure** | Stack (recursion) | Queue |
| **Cycle Detection** | Detect during DFS | Check if all nodes processed |
| **Intuition** | Finish dependencies first | Start with nodes having no dependencies |
| **Time** | O(V + E) | O(V + E) |
| **Space** | O(V) | O(V) |

---

## 🔍 Algorithm

### Approach 1: DFS-Based Topological Sort

1. **Build adjacency list** from prerequisites
2. **Use 3 states** for each node:
   - UNVISITED (0)
   - VISITING (1) - currently in DFS path
   - VISITED (2) - finished processing
3. **DFS traversal**:
   - If node is VISITING → cycle detected
   - Mark as VISITING
   - Recursively visit all neighbors
   - Mark as VISITED
   - Add to stack (post-order)
4. **Reverse stack** for topological order

### Approach 2: Kahn's Algorithm (BFS)

1. **Calculate in-degrees** for all nodes
2. **Queue all nodes with in-degree = 0** (no prerequisites)
3. **BFS**:
   - Dequeue node, add to result
   - For each neighbor, decrease in-degree
   - If in-degree becomes 0, enqueue
4. **Check result length**:
   - If length = numCourses → valid
   - Else → cycle exists

---

## 💻 Code

### Solution 1: DFS-Based Topological Sort

```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  // Build adjacency list
  const graph = new Map();
  for (let i = 0; i < numCourses; i++) {
    graph.set(i, []);
  }

  for (const [course, prereq] of prerequisites) {
    graph.get(prereq).push(course); // prereq → course
  }

  // States: 0 = unvisited, 1 = visiting, 2 = visited
  const state = Array(numCourses).fill(0);
  const result = [];

  function dfs(course) {
    // Cycle detected
    if (state[course] === 1) return false;

    // Already visited
    if (state[course] === 2) return true;

    // Mark as visiting
    state[course] = 1;

    // Visit all neighbors
    for (const neighbor of graph.get(course)) {
      if (!dfs(neighbor)) {
        return false; // Cycle detected in neighbor
      }
    }

    // Mark as visited (finished processing)
    state[course] = 2;

    // Add to result (post-order)
    result.push(course);

    return true;
  }

  // Try DFS from each unvisited node
  for (let i = 0; i < numCourses; i++) {
    if (state[i] === 0) {
      if (!dfs(i)) {
        return []; // Cycle detected
      }
    }
  }

  // Reverse to get correct topological order
  return result.reverse();
};
```

### Solution 2: Kahn's Algorithm (BFS-based)

```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  // Build adjacency list
  const graph = new Map();
  for (let i = 0; i < numCourses; i++) {
    graph.set(i, []);
  }

  // Calculate in-degrees
  const inDegree = Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    graph.get(prereq).push(course); // prereq → course
    inDegree[course]++;
  }

  // Queue all nodes with in-degree 0
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  const result = [];

  // BFS
  while (queue.length > 0) {
    const course = queue.shift();
    result.push(course);

    // Reduce in-degree for neighbors
    for (const neighbor of graph.get(course)) {
      inDegree[neighbor]--;

      // If in-degree becomes 0, add to queue
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // Check if all courses are included (no cycle)
  return result.length === numCourses ? result : [];
};
```

---

## ⏱️ Time and Space Complexity

### Both Approaches:

**Time Complexity: O(V + E)**

- Build graph: O(E)
- DFS/BFS traversal: O(V + E)
- Total: O(V + E)

where V = numCourses, E = prerequisites.length

**Space Complexity: O(V + E)**

- Adjacency list: O(V + E)
- State/InDegree array: O(V)
- Recursion stack (DFS) or Queue (BFS): O(V)
- Total: O(V + E)

---

## 🎯 Dry Run

### Input:

```
numCourses = 4
prerequisites = [[1,0],[2,0],[3,1],[3,2]]
```

### Graph:

```
0 → [1, 2]
1 → [3]
2 → [3]
3 → []
```

### DFS-Based Execution:

| Step | DFS Call | State Array | Result Stack | Action |
| ---- | -------- | ----------- | ------------ | ------ |
| 1 | dfs(0) | [1,0,0,0] | [] | Start from 0, mark VISITING |
| 2 | dfs(1) | [1,1,0,0] | [] | Visit neighbor 1 |
| 3 | dfs(3) | [1,1,0,1] | [] | Visit neighbor 3 |
| 4 | backtrack | [1,1,0,2] | [3] | 3 has no neighbors, mark VISITED |
| 5 | backtrack | [1,2,0,2] | [3,1] | 1 finished, mark VISITED |
| 6 | dfs(2) | [1,2,1,2] | [3,1] | Visit neighbor 2 |
| 7 | dfs(3) skip | [1,2,1,2] | [3,1] | 3 already VISITED |
| 8 | backtrack | [1,2,2,2] | [3,1,2] | 2 finished |
| 9 | backtrack | [2,2,2,2] | [3,1,2,0] | 0 finished |
| 10 | reverse | - | [0,2,1,3] | Reverse stack |

**Result: [0,2,1,3]** ✅

### Kahn's Algorithm Execution:

**In-Degrees:**

```
Course: [0, 1, 2, 3]
InDeg:  [0, 1, 1, 2]
```

| Step | Queue | Process | InDegree Update | Result | Action |
| ---- | ----- | ------- | --------------- | ------ | ------ |
| Init | [0] | - | [0,1,1,2] | [] | Start with 0 (in-degree 0) |
| 1 | [1,2] | 0 | [0,0,0,2] | [0] | Process 0, reduce neighbors |
| 2 | [2] | 1 | [0,0,0,1] | [0,1] | Process 1, reduce 3 |
| 3 | [3] | 2 | [0,0,0,0] | [0,1,2] | Process 2, reduce 3 |
| 4 | [] | 3 | [0,0,0,0] | [0,1,2,3] | Process 3 |

**Result: [0,1,2,3]** ✅

---

## 🎓 Key Takeaways

1. **Classic Topological Sort**: Fundamental graph algorithm
2. **Two Approaches Work**: DFS (intuitive) vs BFS (Kahn's)
3. **Cycle Detection**: Essential for determining if solution exists
4. **Post-Order in DFS**: Add to result after processing all dependencies
5. **In-Degree in BFS**: Start with nodes having no dependencies
6. **Both are O(V+E)**: Same time complexity

---

## 🔄 When to Use Which?

### Use DFS-Based When:

✅ Already familiar with DFS
✅ Want recursive solution
✅ Need to detect cycle during traversal
✅ Space-efficient (no queue needed)

### Use Kahn's (BFS) When:

✅ Want iterative solution
✅ Need level-by-level processing
✅ Prefer explicit queue over recursion stack
✅ Want clearer cycle detection (check result length)

---

## 📚 Related Problems

1. **Course Schedule** (LeetCode 207) - Just cycle detection
2. **Alien Dictionary** (LeetCode 269) - Build graph from order
3. **Minimum Height Trees** (LeetCode 310) - Modified topological sort
4. **Parallel Courses** (LeetCode 1136) - Find longest path
5. **Sequence Reconstruction** (LeetCode 444) - Verify unique ordering

---

