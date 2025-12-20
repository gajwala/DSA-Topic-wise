# Topological Sort

## 📚 Theory

Topological Sort is a linear ordering of vertices in a **Directed Acyclic Graph (DAG)** such that for every directed edge (u, v), vertex u comes before v in the ordering. It's only possible for DAGs (graphs with no cycles).

Topological sorting has applications in scheduling tasks, resolving symbol dependencies, and determining compilation order.

## 🎯 Intuition

Think of topological sort like getting dressed in the morning:
- You must put on underwear before pants
- You must put on socks before shoes
- But underwear and socks can be put on in any order
- The topological sort gives you a valid order to get dressed

Or consider course prerequisites:
- You must take "Intro to Programming" before "Data Structures"
- You must take "Data Structures" before "Algorithms"
- A topological sort tells you a valid order to take all courses

## 📝 Algorithm Steps

### Approach 1: DFS-based (Post-order)

1. **Perform DFS** on the graph
2. **After exploring** all descendants of a vertex, add it to a stack
3. **Reverse the stack** to get topological order

### Approach 2: Kahn's Algorithm (BFS-based)

1. **Calculate in-degree** for all vertices
2. **Add all vertices** with in-degree 0 to queue
3. **Process queue**:
   - Remove vertex from queue
   - Add to result
   - Decrease in-degree of all neighbors
   - Add neighbors with in-degree 0 to queue
4. **Check for cycle**: If result has fewer vertices than graph, cycle exists

## 💻 Implementation

### JavaScript Implementation (DFS-based)
```javascript
/**
 * Topological sort using DFS
 * @param {Object} graph - Adjacency list representation
 * @returns {Array|null} - Topological order or null if cycle exists
 */
function topologicalSortDFS(graph) {
  const visited = new Set();
  const recStack = new Set(); // For cycle detection
  const result = [];

  function dfs(vertex) {
    visited.add(vertex);
    recStack.add(vertex);

    for (const neighbor of (graph[vertex] || [])) {
      if (!visited.has(neighbor)) {
        if (!dfs(neighbor)) return false;
      } else if (recStack.has(neighbor)) {
        return false; // Cycle detected
      }
    }

    recStack.delete(vertex);
    result.push(vertex); // Add after exploring all descendants
    return true;
  }

  // Visit all vertices
  for (const vertex in graph) {
    if (!visited.has(vertex)) {
      if (!dfs(vertex)) {
        return null; // Cycle exists
      }
    }
  }

  return result.reverse(); // Reverse to get topological order
}


/**
 * Topological sort using Kahn's algorithm (BFS-based)
 */
function topologicalSortKahn(graph) {
  const inDegree = {};
  const result = [];

  // Initialize in-degree for all vertices
  for (const vertex in graph) {
    if (!inDegree.hasOwnProperty(vertex)) {
      inDegree[vertex] = 0;
    }
    for (const neighbor of graph[vertex]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }

  // Queue of vertices with in-degree 0
  const queue = [];
  for (const vertex in inDegree) {
    if (inDegree[vertex] === 0) {
      queue.push(vertex);
    }
  }

  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);

    // Decrease in-degree of neighbors
    for (const neighbor of (graph[vertex] || [])) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // Check if all vertices were processed
  const totalVertices = Object.keys(inDegree).length;
  return result.length === totalVertices ? result : null;
}


/**
 * Course Schedule - Can finish all courses?
 * LeetCode 207
 */
function canFinish(numCourses, prerequisites) {
  const graph = Array(numCourses).fill(null).map(() => []);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }

  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = Array(numCourses).fill(WHITE);

  function hasCycle(course) {
    if (color[course] === GRAY) return true; // Back edge - cycle found
    if (color[course] === BLACK) return false; // Already processed

    color[course] = GRAY;

    for (const nextCourse of graph[course]) {
      if (hasCycle(nextCourse)) return true;
    }

    color[course] = BLACK;
    return false;
  }

  for (let course = 0; course < numCourses; course++) {
    if (color[course] === WHITE) {
      if (hasCycle(course)) return false;
    }
  }

  return true;
}


/**
 * Course Schedule II - Return valid order
 * LeetCode 210
 */
function findOrder(numCourses, prerequisites) {
  const graph = Array(numCourses).fill(null).map(() => []);
  const inDegree = Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  const order = [];

  while (queue.length > 0) {
    const course = queue.shift();
    order.push(course);

    for (const nextCourse of graph[course]) {
      inDegree[nextCourse]--;
      if (inDegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  return order.length === numCourses ? order : [];
}


/**
 * Find all possible topological orderings
 */
function allTopologicalSorts(graph) {
  const inDegree = {};
  const allSorts = [];

  // Calculate in-degrees
  for (const vertex in graph) {
    if (!inDegree.hasOwnProperty(vertex)) {
      inDegree[vertex] = 0;
    }
    for (const neighbor of graph[vertex]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }

  function backtrack(result, visited) {
    const vertices = Object.keys(inDegree);

    // Base case: all vertices visited
    if (result.length === vertices.length) {
      allSorts.push([...result]);
      return;
    }

    // Try all vertices with in-degree 0
    for (const vertex of vertices) {
      if (!visited.has(vertex) && inDegree[vertex] === 0) {
        // Choose vertex
        result.push(vertex);
        visited.add(vertex);

        // Decrease in-degree of neighbors
        for (const neighbor of (graph[vertex] || [])) {
          inDegree[neighbor]--;
        }

        // Recurse
        backtrack(result, visited);

        // Backtrack
        result.pop();
        visited.delete(vertex);
        for (const neighbor of (graph[vertex] || [])) {
          inDegree[neighbor]++;
        }
      }
    }
  }

  backtrack([], new Set());
  return allSorts;
}
```

## 🔍 Example Walkthrough

Consider this DAG representing course prerequisites:
```
  0 → 1 → 3
  ↓       ↑
  2 ------┘
```

**Graph (JavaScript)**:
```javascript
const graph = {
  0: [1, 2],
  1: [3],
  2: [3],
  3: []
};
```

### Kahn's Algorithm:

| Step | In-degrees | Queue | Result |
|------|------------|-------|--------|
| Init | [0:0, 1:1, 2:1, 3:2] | [0] | [] |
| 1 | Process 0 | [1,2] | [0] |
| 2 | [1:0, 2:0, 3:2] | [1,2] | [0] |
| 3 | Process 1 | [2] | [0,1] |
| 4 | [2:0, 3:1] | [2] | [0,1] |
| 5 | Process 2 | [3] | [0,1,2] |
| 6 | [3:0] | [3] | [0,1,2] |
| 7 | Process 3 | [] | [0,1,2,3] |

**Valid Topological Orders**: `[0,2,1,3]` or `[0,1,2,3]`

## ⏱️ Time Complexity

### DFS-based:
- **Time Complexity**: **O(V + E)**
  - Visit each vertex once: O(V)
  - Explore each edge once: O(E)

- **Space Complexity**: **O(V)**
  - Recursion stack: O(V)
  - Result list: O(V)

### Kahn's Algorithm:
- **Time Complexity**: **O(V + E)**
  - Calculate in-degrees: O(E)
  - Process each vertex: O(V)
  - Process each edge: O(E)

- **Space Complexity**: **O(V)**
  - In-degree array: O(V)
  - Queue: O(V)

## 🎯 When to Use Topological Sort

### ✅ Best Use Cases:

1. **Task Scheduling**
   - Tasks with dependencies
   - Example: Build systems (Makefile), project management

2. **Course Prerequisites**
   - Determining course order
   - Example: University course planning

3. **Compilation Order**
   - Resolving dependencies in code
   - Example: C++ header files, package managers

4. **Symbol Dependencies**
   - Resolving symbol references
   - Example: Linker symbol resolution

5. **Deadlock Detection**
   - Finding circular dependencies
   - Example: Database transaction management

### ❌ When NOT to Use:

1. **Undirected Graphs** - Not applicable
2. **Cyclic Graphs** - No valid topological order
3. **Need Specific Order** - May not give desired order among independent vertices

## 🔑 Key Properties

1. **DAG Required**: Only works on Directed Acyclic Graphs
2. **Multiple Solutions**: Many valid topological orders may exist
3. **Cycle Detection**: Can detect cycles (no valid ordering if cycle exists)
4. **Linear Time**: O(V + E) complexity
5. **Dependency Resolution**: Natural for dependency problems

## 💡 Common Problem Patterns

### Pattern 1: Alien Dictionary
```javascript
/**
 * LeetCode 269: Alien Dictionary
 * Determine order of characters in alien language
 */
function alienOrder(words) {
  const graph = {};
  const inDegree = {};

  // Initialize graph
  for (const word of words) {
    for (const char of word) {
      graph[char] = graph[char] || [];
      inDegree[char] = inDegree[char] || 0;
    }
  }

  // Build graph from word comparisons
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];
    const minLen = Math.min(word1.length, word2.length);

    // Check if word1 is prefix but longer (invalid)
    if (word1.length > word2.length && word1.startsWith(word2)) {
      return "";
    }

    // Find first different character
    for (let j = 0; j < minLen; j++) {
      if (word1[j] !== word2[j]) {
        if (!graph[word1[j]].includes(word2[j])) {
          graph[word1[j]].push(word2[j]);
          inDegree[word2[j]]++;
        }
        break;
      }
    }
  }

  // Topological sort
  const queue = [];
  for (const char in inDegree) {
    if (inDegree[char] === 0) {
      queue.push(char);
    }
  }

  const result = [];
  while (queue.length > 0) {
    const char = queue.shift();
    result.push(char);

    for (const neighbor of graph[char]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result.length === Object.keys(inDegree).length ? result.join('') : "";
}
```

### Pattern 2: Parallel Courses
```javascript
/**
 * LeetCode 1136: Parallel Courses
 * Minimum semesters to complete all courses
 */
function minimumSemesters(n, relations) {
  const graph = Array(n + 1).fill(null).map(() => []);
  const inDegree = Array(n + 1).fill(0);

  for (const [prev, next] of relations) {
    graph[prev].push(next);
    inDegree[next]++;
  }

  const queue = [];
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let semesters = 0;
  let coursesTaken = 0;

  while (queue.length > 0) {
    const size = queue.length;
    semesters++;

    for (let i = 0; i < size; i++) {
      const course = queue.shift();
      coursesTaken++;

      for (const nextCourse of graph[course]) {
        inDegree[nextCourse]--;
        if (inDegree[nextCourse] === 0) {
          queue.push(nextCourse);
        }
      }
    }
  }

  return coursesTaken === n ? semesters : -1;
}
```

## 🎓 Practice Problems

1. **Medium**:
   - Course Schedule (LeetCode 207)
   - Course Schedule II (LeetCode 210)
   - Minimum Height Trees (LeetCode 310)
   - Parallel Courses (LeetCode 1136)

2. **Hard**:
   - Alien Dictionary (LeetCode 269)
   - Sequence Reconstruction (LeetCode 444)
   - Sort Items by Groups Respecting Dependencies (LeetCode 1203)

## 🔧 DFS vs Kahn's Algorithm

| Aspect | DFS-based | Kahn's (BFS-based) |
|--------|-----------|-------------------|
| Implementation | Recursive | Iterative |
| Intuition | Post-order traversal | Remove nodes with no dependencies |
| Cycle Detection | Using recursion stack | Count processed vertices |
| Space | O(V) call stack | O(V) queue |
| Order | Reverse of finish times | Process by in-degree |
| Preference | Simple to code | Better for level-wise processing |

## ⚠️ Common Mistakes

1. **Forgetting Cycle Check**: Always check if all vertices processed
2. **Wrong Reversal**: DFS result needs reversal, Kahn's doesn't
3. **Missing Vertices**: Include vertices with no outgoing edges
4. **Undirected Edges**: Algorithm only works on directed graphs
5. **In-degree Calculation**: Must count all incoming edges

---

**Remember**: Topological sort is essential for solving dependency and scheduling problems! 🚀

