# Depth-First Search (DFS)

## 📚 Theory

Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a **stack** data structure (or recursion, which implicitly uses the call stack) to keep track of vertices to visit.

DFS starts at a source vertex and explores each branch completely before moving to another branch. It dives deep into the graph before coming back up.

## 🎯 Intuition

Think of DFS like exploring a maze:
- You pick a path and follow it as far as you can go
- When you hit a dead end, you backtrack to the last intersection
- You then try a different unexplored path
- Continue until you've explored everything

It's like reading a book by following every footnote to its conclusion before continuing with the main text.

## 📝 Algorithm Steps

1. **Initialize**:
   - Create a stack (or use recursion)
   - Mark the starting vertex as visited
   - Create a visited set to track visited vertices

2. **Process (Recursive)**:
   - Mark current vertex as visited
   - Process/visit this vertex
   - For each unvisited neighbor:
     - Recursively call DFS on that neighbor

3. **Process (Iterative)**:
   - Push starting vertex onto stack
   - While stack is not empty:
     - Pop a vertex
     - If not visited, mark as visited
     - Push all unvisited neighbors onto stack

## 💻 Implementation

### JavaScript Implementation (Recursive)
```javascript
/**
 * Recursive DFS traversal
 * @param {Object} graph - Adjacency list representation
 * @param {string|number} vertex - Current vertex
 * @param {Set} visited - Set of visited vertices
 * @returns {Array} - Array of vertices in DFS order
 */
function dfsRecursive(graph, vertex, visited = new Set()) {
  visited.add(vertex);
  const result = [vertex];

  for (const neighbor of graph[vertex]) {
    if (!visited.has(neighbor)) {
      result.push(...dfsRecursive(graph, neighbor, visited));
    }
  }

  return result;
}


/**
 * Iterative DFS traversal using stack
 */
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];

  while (stack.length > 0) {
    const vertex = stack.pop();

    if (!visited.has(vertex)) {
      visited.add(vertex);
      result.push(vertex);

      // Add neighbors in reverse order to match recursive DFS
      const neighbors = [...graph[vertex]].reverse();
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }

  return result;
}


/**
 * Find all paths from start to end using DFS
 */
function findAllPaths(graph, start, end, path = [], visited = new Set()) {
  path = [...path, start];
  visited.add(start);

  if (start === end) {
    return [path];
  }

  const paths = [];
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      const newVisited = new Set(visited);
      const newPaths = findAllPaths(graph, neighbor, end, path, newVisited);
      paths.push(...newPaths);
    }
  }

  return paths;
}


/**
 * DFS with timestamps for topological sorting
 */
function dfsWithTimestamps(graph, vertex, visited, discoveryTime, finishTime, time) {
  visited.add(vertex);
  time.value++;
  discoveryTime[vertex] = time.value;

  for (const neighbor of graph[vertex]) {
    if (!visited.has(neighbor)) {
      dfsWithTimestamps(graph, neighbor, visited, discoveryTime, finishTime, time);
    }
  }

  time.value++;
  finishTime[vertex] = time.value;
}
```

## 🔍 Example Walkthrough

Consider this graph:
```
    A --- B --- C
    |     |     |
    D --- E --- F
```

**Adjacency List (JavaScript)**:
```javascript
const graph = {
  'A': ['B', 'D'],
  'B': ['A', 'C', 'E'],
  'C': ['B', 'F'],
  'D': ['A', 'E'],
  'E': ['B', 'D', 'F'],
  'F': ['C', 'E']
};
```

**DFS Traversal from 'A' (Recursive)**:

| Step | Call Stack    | Visited            | Current | Action                         |
| ---- | ------------- | ------------------ | ------- | ------------------------------ |
| 1    | [A]           | {A}                | A       | Visit A, explore first neighbor B |
| 2    | [A, B]        | {A, B}             | B       | Visit B, explore first neighbor C |
| 3    | [A, B, C]     | {A, B, C}          | C       | Visit C, explore first neighbor F |
| 4    | [A, B, C, F]  | {A, B, C, F}       | F       | Visit F, explore first neighbor E |
| 5    | [A, B, C, F, E] | {A, B, C, F, E}  | E       | Visit E, explore first neighbor D |
| 6    | [A, B, C, F, E, D] | {A, B, C, F, E, D} | D | Visit D, all neighbors visited |
| 7    | [A, B, C, F, E] | {A, B, C, F, E, D} | E   | Backtrack, all neighbors visited |
| 8    | ...           | ...                | ...     | Continue backtracking          |

**Result**: `['A', 'B', 'C', 'F', 'E', 'D']`

## ⏱️ Time Complexity

- **Time Complexity**: **O(V + E)**
  - V = number of vertices
  - E = number of edges
  - We visit each vertex once: O(V)
  - We explore each edge once: O(E)

- **Space Complexity**:
  - **Recursive**: **O(h)** where h is height/depth of graph
    - Call stack can go as deep as the longest path
  - **Iterative**: **O(V)**
    - Stack can potentially hold all vertices
  - **Visited Set**: O(V)

## 🎯 When to Use DFS

### ✅ Best Use Cases:

1. **Finding ALL Paths**
   - When you need to explore all possible paths
   - Example: Finding all solutions to a puzzle

2. **Detecting Cycles**
   - Using back edges in DFS
   - Example: Detecting circular dependencies

3. **Topological Sorting**
   - Ordering tasks with dependencies
   - Example: Course scheduling, build systems

4. **Finding Connected Components**
   - Identifying separate subgraphs
   - Example: Finding isolated communities in social networks

5. **Solving Puzzles and Games**
   - Exploring game trees
   - Example: Sudoku solver, Chess engine

6. **Path Finding**
   - When any path is acceptable (not necessarily shortest)
   - Example: Maze solving

7. **Tree Traversals**
   - Preorder, Inorder, Postorder
   - Example: Expression tree evaluation

8. **Strongly Connected Components**
   - Finding SCCs using Tarjan's algorithm
   - Example: Analyzing web page connectivity

### ❌ When NOT to Use DFS:

1. **Shortest Path** - Use BFS instead for unweighted graphs
2. **Level-wise Processing** - BFS is more suitable
3. **Very Deep Graphs** - Risk of stack overflow with recursion
4. **Finding Closest Node** - BFS finds it faster

## 🔑 Key Properties

1. **Completeness**: DFS will visit all reachable vertices
2. **Not Optimal**: Doesn't guarantee shortest path
3. **Memory Efficient**: Uses less memory than BFS for wide graphs
4. **Stack-based**: Uses LIFO (Last In First Out) principle

## 💡 Common Problem Patterns

### Pattern 1: Cycle Detection
```javascript
/**
 * Detect cycle in directed graph using DFS
 * Uses three colors: white (unvisited), gray (processing), black (done)
 */
function hasCycleDirected(graph) {
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = {};
  
  for (const vertex in graph) {
    color[vertex] = WHITE;
  }

  function dfs(vertex) {
    if (color[vertex] === GRAY) return true;  // Back edge found
    if (color[vertex] === BLACK) return false; // Already processed

    color[vertex] = GRAY; // Mark as processing

    for (const neighbor of graph[vertex]) {
      if (dfs(neighbor)) return true;
    }

    color[vertex] = BLACK; // Mark as done
    return false;
  }

  for (const vertex in graph) {
    if (color[vertex] === WHITE) {
      if (dfs(vertex)) return true;
    }
  }

  return false;
}


/**
 * Detect cycle in undirected graph
 */
function hasCycleUndirected(graph) {
  const visited = new Set();

  function dfs(vertex, parent) {
    visited.add(vertex);

    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, vertex)) return true;
      } else if (neighbor !== parent) { // Back edge to non-parent
        return true;
      }
    }

    return false;
  }

  for (const vertex in graph) {
    if (!visited.has(vertex)) {
      if (dfs(vertex, null)) return true;
    }
  }

  return false;
}
```

### Pattern 2: Number of Islands
```javascript
/**
 * Count number of islands in a 2D grid
 */
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();
  let count = 0;

  function dfs(r, c) {
    const key = `${r},${c}`;
    
    if (
      r < 0 || r >= rows ||
      c < 0 || c >= cols ||
      visited.has(key) ||
      grid[r][c] === '0'
    ) {
      return;
    }

    visited.add(key);
    
    // Explore all 4 directions
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${r},${c}`;
      if (grid[r][c] === '1' && !visited.has(key)) {
        dfs(r, c);
        count++;
      }
    }
  }

  return count;
}
```

### Pattern 3: Find All Paths
```javascript
/**
 * Find all paths between two vertices
 */
function allPathsSourceTarget(graph, start, target) {
  const result = [];

  function dfs(node, path) {
    path.push(node);

    if (node === target) {
      result.push([...path]); // Add copy of path
    } else {
      for (const neighbor of graph[node]) {
        dfs(neighbor, path);
      }
    }

    path.pop(); // Backtrack
  }

  dfs(start, []);
  return result;
}
```

### Pattern 4: Clone Graph
```javascript
/**
 * Clone a graph using DFS
 */
function cloneGraph(node) {
  if (!node) return null;

  const visited = new Map();

  function dfs(node) {
    if (visited.has(node)) {
      return visited.get(node);
    }

    const clone = { val: node.val, neighbors: [] };
    visited.set(node, clone);

    for (const neighbor of node.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  }

  return dfs(node);
}
```

## 🎓 Practice Problems

1. **Easy**:
   - Number of Islands (LeetCode 200)
   - Clone Graph (LeetCode 133)
   - Path Sum in Binary Tree (LeetCode 112)
   - Flood Fill (LeetCode 733)

2. **Medium**:
   - Course Schedule (Cycle Detection) (LeetCode 207)
   - Course Schedule II (Topological Sort) (LeetCode 210)
   - Number of Provinces (LeetCode 547)
   - All Paths From Source to Target (LeetCode 797)
   - Surrounded Regions (LeetCode 130)

3. **Hard**:
   - Word Ladder II (LeetCode 126)
   - Critical Connections in a Network (LeetCode 1192)
   - Reconstruct Itinerary (LeetCode 332)

## 📊 DFS Types

### 1. Preorder DFS
- Visit node before its children
- Root → Left → Right

### 2. Inorder DFS
- Visit node between children (for binary trees)
- Left → Root → Right

### 3. Postorder DFS
- Visit node after its children
- Left → Right → Root

## 🔧 Variations

1. **Iterative DFS with Stack**: Explicit stack instead of recursion
2. **Limited Depth DFS**: Stop at certain depth (used in game trees)
3. **Bidirectional DFS**: Search from both ends
4. **DFS on Implicit Graphs**: Generate graph on-the-fly

## 🆚 Comparison with BFS

| Aspect         | DFS              | BFS                |
| -------------- | ---------------- | ------------------ |
| Data Structure | Stack/Recursion  | Queue              |
| Memory         | O(h) - height    | O(w) - width       |
| Path Found     | Any path         | Shortest path      |
| When to Use    | All paths, cycles, topology | Shortest path, levels |
| Implementation | Simpler (recursive) | Needs explicit queue |

## ⚠️ Common Pitfalls

1. **Stack Overflow**: Deep recursion in large graphs
   - Solution: Use iterative approach

2. **Forgetting to Mark Visited**: Infinite loops
   - Solution: Always mark vertex as visited

3. **Not Handling Disconnected Graphs**: Missing components
   - Solution: Loop through all vertices as starting points

4. **Back Edge Confusion**: In undirected graphs
   - Solution: Track parent to avoid false cycle detection

---

**Remember**: DFS is your go-to algorithm for exploring all possibilities, detecting cycles, and topological sorting! 🚀

