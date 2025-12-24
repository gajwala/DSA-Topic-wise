# ⏱️ Parallel Courses (Minimum Semesters)

**LeetCode 1136** | **Medium** | **Topological Sort - Longest Path**

---

## 📝 Problem Description

You are given an integer `n`, which indicates there are `n` courses labeled from `1` to `n`. You are also given an array `relations` where `relations[i] = [prevCoursei, nextCoursei]`, representing a prerequisite relationship between course `prevCoursei` and course `nextCoursei`: course `prevCoursei` has to be taken before course `nextCoursei`.

In one semester, you can take **any number of courses** as long as you have taken all the prerequisites in the previous semesters for the courses you are taking.

Return *the **minimum number of semesters** needed to take all courses*. If there is no way to take all the courses, return `-1`.

### Example 1:

**Input:**

```
n = 3
relations = [[1,3],[2,3]]
```

**Output:**

```
2
```

**Explanation:**

```
Semester 1: Take courses 1 and 2
Semester 2: Take course 3

Graph:
1 \
    → 3
2 /

Minimum semesters: 2
```

### Example 2:

**Input:**

```
n = 3
relations = [[1,2],[2,3],[3,1]]
```

**Output:**

```
-1
```

**Explanation:**

```
Cycle: 1 → 2 → 3 → 1
Impossible to take all courses
```

### Constraints:

- `1 <= n <= 5000`
- `1 <= relations.length <= 5000`
- `relations[i].length == 2`
- `1 <= prevCoursei, nextCoursei <= n`
- `prevCoursei != nextCoursei`
- All the pairs `[prevCoursei, nextCoursei]` are **unique**

---

## 💡 Intuition

This is **topological sort with level tracking** (longest path in DAG):

### Key Insight:

```
Minimum semesters = Maximum depth in topological ordering
                  = Longest path from any source to any sink
```

### Why Level Tracking?

```
Example:
1 → 2 → 3 → 4

Can't do all in parallel!
Semester 1: [1]
Semester 2: [2]
Semester 3: [3]
Semester 4: [4]

Answer: 4 semesters
```

### Parallel Processing:

```
Example:
    1
   / \
  2   3
   \ /
    4

Semester 1: [1]        (no prerequisites)
Semester 2: [2, 3]     (both only need 1, can do parallel)
Semester 3: [4]        (needs both 2 and 3)

Answer: 3 semesters
```

### Approaches:

| Aspect | DFS | Kahn's with Levels |
| ------ | --- | ------------------ |
| **Tracks** | Depth per node | Level per semester |
| **Result** | Max depth | Level count |
| **Intuition** | Recursive depth | BFS layers |
| **Implementation** | Slightly complex | Natural fit |

---

## 🔍 Algorithm

### Approach 1: DFS with Depth Tracking

1. **Build graph** from relations
2. **DFS** from each node:
   - Track depth (longest path from this node)
   - Memoize results
3. **Handle cycles**: Use 3-state detection
4. **Return** max depth across all nodes

### Approach 2: Kahn's with Level Tracking (Recommended)

1. **Build graph** and calculate in-degrees
2. **Queue** all courses with in-degree 0 (no prerequisites)
3. **BFS by level**:
   - Process all courses at current level
   - Track semester count
   - Add courses that become available
4. **Check** if all courses taken

---

## 💻 Code

### Solution 1: DFS with Memoization

```javascript
/**
 * @param {number} n
 * @param {number[][]} relations
 * @return {number}
 */
var minimumSemesters = function (n, relations) {
  // Build adjacency list (1-indexed)
  const graph = new Map();
  for (let i = 1; i <= n; i++) {
    graph.set(i, []);
  }

  for (const [prev, next] of relations) {
    graph.get(prev).push(next);
  }

  // States: 0=unvisited, 1=visiting, 2=visited
  const state = Array(n + 1).fill(0);
  // Memoization: depth[i] = longest path from node i
  const depth = Array(n + 1).fill(0);

  function dfs(course) {
    // Cycle detected
    if (state[course] === 1) return -1;

    // Already calculated
    if (state[course] === 2) return depth[course];

    state[course] = 1; // Mark visiting

    let maxDepth = 0;

    for (const neighbor of graph.get(course)) {
      const neighborDepth = dfs(neighbor);

      // Cycle in neighbor path
      if (neighborDepth === -1) return -1;

      maxDepth = Math.max(maxDepth, neighborDepth);
    }

    state[course] = 2; // Mark visited
    depth[course] = maxDepth + 1; // Current node adds 1

    return depth[course];
  }

  let result = 0;

  // Calculate depth for all nodes
  for (let i = 1; i <= n; i++) {
    const d = dfs(i);

    if (d === -1) return -1; // Cycle detected

    result = Math.max(result, d);
  }

  return result;
};
```

### Solution 2: Kahn's Algorithm with Levels (Clearer!)

```javascript
/**
 * @param {number} n
 * @param {number[][]} relations
 * @return {number}
 */
var minimumSemesters = function (n, relations) {
  // Build graph and calculate in-degrees
  const graph = new Map();
  const inDegree = Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    graph.set(i, []);
  }

  for (const [prev, next] of relations) {
    graph.get(prev).push(next);
    inDegree[next]++;
  }

  // Queue all courses with no prerequisites
  const queue = [];
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let semesters = 0;
  let coursesTaken = 0;

  // BFS level by level
  while (queue.length > 0) {
    semesters++; // Start new semester

    const levelSize = queue.length;

    // Process all courses in this semester (level)
    for (let i = 0; i < levelSize; i++) {
      const course = queue.shift();
      coursesTaken++;

      // Reduce in-degree for neighbors
      for (const neighbor of graph.get(course)) {
        inDegree[neighbor]--;

        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      }
    }
  }

  // Check if all courses were taken (no cycle)
  return coursesTaken === n ? semesters : -1;
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
- State/InDegree: O(V)
- Queue/Stack: O(V)

---

## 🎯 Dry Run

### Input:

```
n = 5
relations = [[1,3],[1,4],[2,4],[3,5],[4,5]]
```

### Graph:

```
1 → 3 → 5
↓       ↑
4 ──────┘
↑
2
```

### Kahn's Algorithm with Levels:

**In-Degrees:**

```
[_, 0, 0, 1, 2, 2]  (1-indexed)
Courses 1 and 2 have no prerequisites
```

| Semester | Queue Start | Process | InDegree After | Next Queue | Courses Taken |
| -------- | ----------- | ------- | -------------- | ---------- | ------------- |
| 1 | [1,2] | 1,2 | [_,0,0,0,0,2] | [3,4] | 2 |
| 2 | [3,4] | 3,4 | [_,0,0,0,0,0] | [5] | 4 |
| 3 | [5] | 5 | [_,0,0,0,0,0] | [] | 5 |

**Result: 3 semesters** ✅

### DFS with Depth:

| Course | DFS Call | Neighbors | Max Depth of Neighbors | This Depth |
| ------ | -------- | --------- | ---------------------- | ---------- |
| 5 | dfs(5) | [] | 0 | 1 |
| 3 | dfs(3) | [5] | 1 | 2 |
| 4 | dfs(4) | [5] | 1 | 2 |
| 1 | dfs(1) | [3,4] | max(2,2)=2 | 3 |
| 2 | dfs(2) | [4] | 2 | 3 |

**Max depth: 3 semesters** ✅

---

## 🎓 Key Takeaways

1. **Level Tracking**: Count layers in topological ordering
2. **Longest Path**: Same as finding longest path in DAG
3. **Parallel Courses**: Process level by level
4. **Kahn's is Clearer**: Level-by-level BFS more intuitive
5. **DFS with Memo**: More complex but also works
6. **Cycle Check**: Essential for validity

---

## 🔄 Why Kahn's is Better Here:

✅ **Natural level tracking**: BFS processes by layers
✅ **Clearer code**: Explicit semester counter
✅ **Easier to understand**: Matches problem intuition
✅ **No memoization needed**: Direct calculation

DFS requires memoization and is less intuitive for this specific problem.

---

## 📚 Related Problems

1. **Course Schedule II** (LeetCode 210) - Basic topological sort
2. **Parallel Courses II** (LeetCode 1494) - With max courses per semester
3. **Parallel Courses III** (LeetCode 2050) - With course durations
4. **Critical Connections** (LeetCode 1192) - Find bridges
5. **Network Delay Time** (LeetCode 743) - Shortest path variant

---

