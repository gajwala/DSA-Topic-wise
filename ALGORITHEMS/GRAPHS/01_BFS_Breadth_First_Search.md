# Breadth-First Search (BFS)

## 📚 Theory

Breadth-First Search (BFS) is a graph traversal algorithm that explores all vertices at the present depth before moving to vertices at the next depth level. It uses a **queue** data structure to keep track of vertices to visit next.

BFS starts at a source vertex and explores all its neighbors first, then moves to the neighbors of those neighbors, and so on. This creates a "layer-by-layer" exploration pattern.

## 🎯 Intuition

Think of BFS like ripples in water when you drop a stone:
- The stone creates the first ripple (starting vertex)
- Then the second ripple forms around the first (immediate neighbors)
- Then the third ripple around the second (neighbors of neighbors)
- This continues outward in waves

BFS explores the graph in "waves" or "levels" outward from the starting point.

## 📝 Algorithm Steps

1. **Initialize**:
   - Create a queue and add the starting vertex
   - Mark the starting vertex as visited
   - Create a visited set to track visited vertices

2. **Process**:
   - While the queue is not empty:
     - Remove a vertex from the front of queue
     - Process/visit this vertex
     - For each unvisited neighbor of this vertex:
       - Mark it as visited
       - Add it to the queue

3. **Complete**: Continue until queue is empty

## 💻 Implementation

### JavaScript Implementation
```javascript
/**
 * Perform BFS traversal on a graph
 * @param {Object} graph - Adjacency list representation
 * @param {string|number} start - Starting vertex
 * @returns {Array} - Array of vertices in BFS order
 */
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  const result = [];

  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);

    // Visit all unvisited neighbors
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}


/**
 * BFS with level tracking
 * Returns vertices grouped by their distance from start
 */
function bfsWithLevels(graph, start) {
  const visited = new Set([start]);
  const queue = [[start, 0]]; // [vertex, level]
  const levels = {};

  while (queue.length > 0) {
    const [vertex, level] = queue.shift();

    if (!levels[level]) {
      levels[level] = [];
    }
    levels[level].push(vertex);

    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, level + 1]);
      }
    }
  }

  return levels;
}


/**
 * Find shortest path between two vertices using BFS
 */
function shortestPathBFS(graph, start, end) {
  if (start === end) {
    return [start];
  }

  const visited = new Set([start]);
  const queue = [[start, [start]]]; // [vertex, path]

  while (queue.length > 0) {
    const [vertex, path] = queue.shift();

    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        const newPath = [...path, neighbor];

        if (neighbor === end) {
          return newPath;
        }

        visited.add(neighbor);
        queue.push([neighbor, newPath]);
      }
    }
  }

  return null; // No path found
}


/**
 * Find distance from start to all reachable vertices
 */
function bfsDistances(graph, start) {
  const distances = { [start]: 0 };
  const queue = [start];
  const visited = new Set([start]);

  while (queue.length > 0) {
    const vertex = queue.shift();

    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        distances[neighbor] = distances[vertex] + 1;
        queue.push(neighbor);
      }
    }
  }

  return distances;
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

**BFS Traversal from 'A'**:

| Step | Queue     | Visited            | Current | Action                         |
| ---- | --------- | ------------------ | ------- | ------------------------------ |
| 1    | ['A']     | {A}                | -       | Initialize                     |
| 2    | ['B','D'] | {A, B, D}          | A       | Visit A, add neighbors B, D    |
| 3    | ['D','C','E'] | {A, B, D, C, E} | B    | Visit B, add neighbors C, E    |
| 4    | ['C','E'] | {A, B, D, C, E}    | D       | Visit D, E already visited     |
| 5    | ['E','F'] | {A, B, D, C, E, F} | C       | Visit C, add neighbor F        |
| 6    | ['F']     | {A, B, D, C, E, F} | E       | Visit E, all neighbors visited |
| 7    | []        | {A, B, D, C, E, F} | F       | Visit F, all neighbors visited |

**Result**: `['A', 'B', 'D', 'C', 'E', 'F']`

## ⏱️ Time Complexity

- **Time Complexity**: **O(V + E)**
  - V = number of vertices
  - E = number of edges
  - We visit each vertex once: O(V)
  - We explore each edge once: O(E)

- **Space Complexity**: **O(V)**
  - Queue can hold at most V vertices
  - Visited set stores V vertices

## 🎯 When to Use BFS

### ✅ Best Use Cases:

1. **Shortest Path in Unweighted Graphs**
   - BFS guarantees the shortest path in terms of number of edges
   - Example: Finding shortest path in a maze

2. **Level Order Traversal**
   - When you need to process nodes level by level
   - Example: Binary tree level order traversal

3. **Finding Connected Components**
   - Identifying all vertices reachable from a source
   - Example: Finding all connected users in a social network

4. **Testing Bipartiteness**
   - Check if a graph can be colored with two colors
   - Example: Determining if a graph is bipartite

5. **Web Crawling**
   - Exploring web pages starting from a URL
   - Example: Search engine crawlers

6. **GPS Navigation Systems**
   - Finding shortest route with same travel time per edge
   - Example: Finding shortest path with equal segment distances

7. **Peer-to-Peer Networks**
   - Finding nodes within certain distance
   - Example: Finding all computers within N hops

### ❌ When NOT to Use BFS:

1. **Weighted Graphs** - Use Dijkstra's or Bellman-Ford instead
2. **Finding ALL Paths** - DFS is more suitable
3. **Memory Constrained** - DFS uses less memory
4. **Deep Graphs** - DFS is more efficient

## 🔑 Key Properties

1. **Completeness**: BFS will find a solution if one exists
2. **Optimality**: BFS finds the shortest path in unweighted graphs
3. **Level-wise**: Visits nodes in order of their distance from source
4. **Queue-based**: Uses FIFO (First In First Out) principle

## 💡 Common Problem Patterns

### Pattern 1: Level Order Problems
```javascript
/**
 * Binary tree level order traversal
 */
function levelOrderTraversal(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}
```

### Pattern 2: Shortest Path in Grid
```javascript
/**
 * Find shortest distance in a grid
 */
function shortestDistance(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [[start[0], start[1], 0]]; // [row, col, distance]
  const visited = new Set([`${start[0]},${start[1]}`]);
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  while (queue.length > 0) {
    const [row, col, dist] = queue.shift();

    if (row === end[0] && col === end[1]) {
      return dist;
    }

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      const key = `${newRow},${newCol}`;

      if (
        newRow >= 0 && newRow < rows &&
        newCol >= 0 && newCol < cols &&
        !visited.has(key) &&
        grid[newRow][newCol] === 1
      ) {
        visited.add(key);
        queue.push([newRow, newCol, dist + 1]);
      }
    }
  }

  return -1; // No path found
}
```

### Pattern 3: Rotting Oranges
```javascript
/**
 * Time for all oranges to rot (multi-source BFS)
 */
function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  let freshCount = 0;

  // Find all rotten oranges and count fresh ones
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) {
        queue.push([r, c, 0]); // [row, col, time]
      } else if (grid[r][c] === 1) {
        freshCount++;
      }
    }
  }

  if (freshCount === 0) return 0;

  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let maxTime = 0;

  while (queue.length > 0) {
    const [row, col, time] = queue.shift();
    maxTime = Math.max(maxTime, time);

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow >= 0 && newRow < rows &&
        newCol >= 0 && newCol < cols &&
        grid[newRow][newCol] === 1
      ) {
        grid[newRow][newCol] = 2; // Make it rotten
        freshCount--;
        queue.push([newRow, newCol, time + 1]);
      }
    }
  }

  return freshCount === 0 ? maxTime : -1;
}
```

## 🎓 Practice Problems

1. **Easy**:
   - Binary Tree Level Order Traversal (LeetCode 102)
   - Number of Islands (LeetCode 200)
   - Rotting Oranges (LeetCode 994)
   - Flood Fill (LeetCode 733)

2. **Medium**:
   - Word Ladder (LeetCode 127)
   - Shortest Path in Binary Matrix (LeetCode 1091)
   - All Nodes Distance K in Binary Tree (LeetCode 863)
   - 01 Matrix (LeetCode 542)

3. **Hard**:
   - Shortest Path Visiting All Nodes (LeetCode 847)
   - Cut Off Trees for Golf Event (LeetCode 675)
   - Minimum Cost to Make at Least One Valid Path (LeetCode 1368)

## 📊 Comparison with DFS

| Aspect         | BFS                   | DFS                       |
| -------------- | --------------------- | ------------------------- |
| Data Structure | Queue                 | Stack/Recursion           |
| Memory         | O(V) - stores level   | O(h) - stores path height |
| Path Found     | Shortest              | Not necessarily shortest  |
| When to Use    | Shortest path, levels | All paths, topology       |
| Implementation | Iterative with queue  | Recursive or stack        |

## 🔧 Variations

1. **Bidirectional BFS**: Start from both source and destination
2. **Multi-source BFS**: Start from multiple sources simultaneously
3. **0-1 BFS**: For graphs with edge weights 0 or 1
4. **BFS on Implicit Graphs**: Where graph is not explicitly given

---

**Remember**: BFS is your go-to algorithm for finding the shortest path in unweighted graphs and exploring graphs level by level! 🚀

