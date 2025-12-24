# 📖 Course Schedule (Cycle Detection)

**LeetCode 207** | **Medium** | **Topological Sort - Cycle Detection**

---

## 📝 Problem Description

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` before course `ai`.

- For example, the pair `[0, 1]` indicates that to take course `0` you have to first take course `1`.

Return `true` if you can finish all courses. Otherwise, return `false`.

### Example 1:

**Input:**

```
numCourses = 2
prerequisites = [[1,0]]
```

**Output:**

```
true
```

**Explanation:**

```
There are 2 courses.
To take course 1, finish course 0 first.
No cycle exists → possible to finish.
```

### Example 2:

**Input:**

```
numCourses = 2
prerequisites = [[1,0],[0,1]]
```

**Output:**

```
false
```

**Explanation:**

```
To take course 1, need course 0.
To take course 0, need course 1.
Circular dependency (cycle) → impossible!
```

### Example 3:

**Input:**

```
numCourses = 5
prerequisites = [[1,4],[2,4],[3,1],[3,2]]
```

**Output:**

```
true
```

### Constraints:

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- All the pairs `[ai, bi]` are unique

---

## 💡 Intuition

This problem is about **cycle detection** in a directed graph:

### Key Insight:

```
Can finish all courses ↔ No cycle in prerequisite graph
```

### Why Cycles Make It Impossible:

```
Example: [[1,0],[0,1]]

0 → 1 → 0 (cycle!)

To take 0, need 1.
To take 1, need 0.
Deadlock! Impossible to start.
```

### Topological Sort Connection:

- **Topological sort exists** ↔ **No cycle** ↔ **Can finish**
- If we can produce a valid ordering → no cycle
- If cycle exists → topological sort fails

### Two Detection Approaches:

| Approach | Detection Method | Return Value |
| -------- | ---------------- | ------------ |
| **DFS** | VISITING state revisited | false immediately |
| **Kahn's** | Result length < numCourses | false at end |

---

## 🔍 Algorithm

### Approach 1: DFS with 3 States

1. **Build adjacency list**
2. **Use 3 states**:
   - 0 = UNVISITED
   - 1 = VISITING (in current DFS path)
   - 2 = VISITED (fully processed)
3. **DFS**: If reach VISITING node → cycle!
4. **Return** true if no cycle found

### Approach 2: Kahn's Algorithm

1. **Calculate in-degrees**
2. **Queue nodes** with in-degree 0
3. **BFS**: Process nodes, decrease neighbors' in-degrees
4. **Check**: processed count = numCourses?

---

## 💻 Code

### Solution 1: DFS-Based Cycle Detection

```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  // Build adjacency list
  const graph = new Map();
  for (let i = 0; i < numCourses; i++) {
    graph.set(i, []);
  }

  for (const [course, prereq] of prerequisites) {
    graph.get(prereq).push(course);
  }

  // States: 0 = unvisited, 1 = visiting, 2 = visited
  const state = Array(numCourses).fill(0);

  function hasCycle(course) {
    // Cycle detected!
    if (state[course] === 1) return true;

    // Already fully processed
    if (state[course] === 2) return false;

    // Mark as visiting
    state[course] = 1;

    // Check all neighbors
    for (const neighbor of graph.get(course)) {
      if (hasCycle(neighbor)) {
        return true;
      }
    }

    // Mark as visited
    state[course] = 2;

    return false;
  }

  // Check for cycle starting from each unvisited node
  for (let i = 0; i < numCourses; i++) {
    if (state[i] === 0) {
      if (hasCycle(i)) {
        return false; // Cycle found
      }
    }
  }

  return true; // No cycle
};
```

### Solution 2: Kahn's Algorithm (BFS)

```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  // Build adjacency list and calculate in-degrees
  const graph = new Map();
  const inDegree = Array(numCourses).fill(0);

  for (let i = 0; i < numCourses; i++) {
    graph.set(i, []);
  }

  for (const [course, prereq] of prerequisites) {
    graph.get(prereq).push(course);
    inDegree[course]++;
  }

  // Queue all courses with no prerequisites
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let processedCount = 0;

  // BFS
  while (queue.length > 0) {
    const course = queue.shift();
    processedCount++;

    // Reduce in-degree for all neighbors
    for (const neighbor of graph.get(course)) {
      inDegree[neighbor]--;

      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // If all courses processed → no cycle
  return processedCount === numCourses;
};
```

---

## ⏱️ Time and Space Complexity

### Both Approaches:

**Time Complexity: O(V + E)**

- Build graph: O(E)
- Traversal: O(V + E)
- Total: O(V + E)

**Space Complexity: O(V + E)**

- Graph: O(V + E)
- State/InDegree array: O(V)
- Recursion/Queue: O(V)

---

## 🎯 Dry Run

### Example with Cycle:

**Input:**

```
numCourses = 3
prerequisites = [[0,1],[1,2],[2,0]]
```

**Graph:**

```
0 → 1 → 2 → 0 (cycle!)
```

### DFS Execution:

| Step | DFS Call | State | Action |
| ---- | -------- | ----- | ------ |
| 1 | dfs(0) | [1,0,0] | Mark 0 as VISITING |
| 2 | dfs(1) | [1,1,0] | Mark 1 as VISITING |
| 3 | dfs(2) | [1,1,1] | Mark 2 as VISITING |
| 4 | dfs(0) | [1,1,1] | 0 is VISITING → **Cycle!** |

**Return: false** ❌

### Kahn's Algorithm:

**In-Degrees:**

```
[1, 1, 1] ← All have in-degree 1
```

**Execution:**

- Initial queue: [] (no node with in-degree 0!)
- No nodes processed
- processedCount = 0 ≠ 3
- **Return: false** ❌

### Example Without Cycle:

**Input:**

```
numCourses = 3
prerequisites = [[0,1],[0,2],[1,2]]
```

**Graph:**

```
2 → [0]
1 → [0]
0 → []
```

Wait, I think I have the direction backwards. Let me reconsider:

`[0,1]` means: to take 0, must take 1 first.
So edge is: `1 → 0`

**Corrected Graph:**

```
0 → []
1 → [0]
2 → [0]
```

**In-Degrees:**

```
[2, 0, 0]
```

**Kahn's Execution:**

| Step | Queue | Process | InDegree | Processed Count |
| ---- | ----- | ------- | -------- | --------------- |
| Init | [1,2] | - | [2,0,0] | 0 |
| 1 | [2] | 1 | [1,0,0] | 1 |
| 2 | [0] | 2 | [0,0,0] | 2 |
| 3 | [] | 0 | [0,0,0] | 3 |

**Result: 3 = numCourses → true** ✅

---

## 🎓 Key Takeaways

1. **Cycle Detection**: Core problem is detecting cycles
2. **3-State DFS**: VISITING state catches cycles
3. **Kahn's Check**: If processed < total → cycle exists
4. **Early Detection**: DFS can return immediately on cycle
5. **Simple vs Complex**: Kahn's clearer but DFS more elegant
6. **Same Complexity**: Both O(V+E)

---

## 🔄 DFS vs Kahn's for Cycle Detection

### DFS Advantages:

✅ Detects cycle **immediately** during traversal
✅ Recursive, more intuitive
✅ Slightly less code

### Kahn's Advantages:

✅ **Iterative** (no stack overflow risk)
✅ Clearer logic (explicit queue)
✅ Can also produce topological order if needed

---

## 📚 Related Problems

1. **Course Schedule II** (LeetCode 210) - Return the ordering
2. **Course Schedule III** (LeetCode 630) - With time constraints
3. **Course Schedule IV** (LeetCode 1462) - Query reachability
4. **Graph Valid Tree** (LeetCode 261) - Cycle detection variant
5. **Redundant Connection** (LeetCode 684) - Find cycle edge

---

