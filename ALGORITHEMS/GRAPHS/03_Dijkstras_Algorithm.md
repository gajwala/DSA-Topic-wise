# Dijkstra's Algorithm

## 📚 Theory

Dijkstra's Algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with **non-negative edge weights**. It uses a greedy approach, always selecting the vertex with the minimum distance from the source that hasn't been processed yet.

Named after Dutch computer scientist Edsger W. Dijkstra, who conceived it in 1956.

## 🎯 Intuition

Think of Dijkstra's algorithm like exploring a city with different travel times:
- You start at your home (source vertex)
- You always choose the quickest unvisited location you can reach
- Once you know the shortest way to a location, you mark it as "done"
- You use these "done" locations to find shortest paths to other locations
- Eventually, you know the shortest time to reach everywhere in the city

It's like water flowing downhill - it always finds the path of least resistance.

## 📝 Algorithm Steps

1. **Initialize**:
   - Set distance to source as 0
   - Set distance to all other vertices as infinity
   - Create a priority queue (min-heap) with source vertex
   - Mark all vertices as unvisited

2. **Process**:
   - While priority queue is not empty:
     - Extract vertex with minimum distance
     - If this vertex is already visited, skip it
     - Mark it as visited
     - For each neighbor of this vertex:
       - Calculate new distance = current distance + edge weight
       - If new distance < stored distance:
         - Update distance
         - Add neighbor to priority queue with new distance

3. **Result**: Distance object contains shortest distances from source to all vertices

## 💻 Implementation

### JavaScript Implementation (Priority Queue)
```javascript
/**
 * Priority Queue implementation using binary heap
 */
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];

      if (element.priority >= parent.priority) break;

      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();

    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }

    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;

      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }

  isEmpty() {
    return this.values.length === 0;
  }
}


/**
 * Dijkstra's algorithm
 * @param {Object} graph - Adjacency list with weights {vertex: {neighbor: weight}}
 * @param {string|number} start - Starting vertex
 * @returns {Object} - Shortest distances from start to all vertices
 */
function dijkstra(graph, start) {
  // Initialize distances
  const distances = {};
  const pq = new PriorityQueue();
  const visited = new Set();

  // Set all distances to infinity except start
  for (const vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;

  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const { val: currentVertex, priority: currentDist } = pq.dequeue();

    // Skip if already visited
    if (visited.has(currentVertex)) continue;

    visited.add(currentVertex);

    // If we found a longer path, skip
    if (currentDist > distances[currentVertex]) continue;

    // Check all neighbors
    for (const neighbor in graph[currentVertex]) {
      const weight = graph[currentVertex][neighbor];
      const distance = currentDist + weight;

      // If found shorter path
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        pq.enqueue(neighbor, distance);
      }
    }
  }

  return distances;
}


/**
 * Dijkstra's algorithm with path reconstruction
 */
function dijkstraWithPath(graph, start, end) {
  const distances = {};
  const previous = {};
  const pq = new PriorityQueue();
  const visited = new Set();

  // Initialize
  for (const vertex in graph) {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  }
  distances[start] = 0;

  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const { val: currentVertex, priority: currentDist } = pq.dequeue();

    if (visited.has(currentVertex)) continue;
    visited.add(currentVertex);

    // Early termination if we reached the end
    if (currentVertex === end) break;

    if (currentDist > distances[currentVertex]) continue;

    for (const neighbor in graph[currentVertex]) {
      const weight = graph[currentVertex][neighbor];
      const distance = currentDist + weight;

      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = currentVertex;
        pq.enqueue(neighbor, distance);
      }
    }
  }

  // Reconstruct path
  const path = [];
  let current = end;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return {
    distance: distances[end],
    path: path
  };
}


/**
 * Simplified Dijkstra using JavaScript array sort (less efficient but simpler)
 */
function dijkstraSimple(graph, start) {
  const distances = {};
  const visited = new Set();
  const nodes = [];

  // Initialize
  for (const vertex in graph) {
    distances[vertex] = vertex === start ? 0 : Infinity;
    nodes.push({ vertex, distance: distances[vertex] });
  }

  while (nodes.length > 0) {
    // Sort by distance and get minimum
    nodes.sort((a, b) => a.distance - b.distance);
    const { vertex: current, distance: currentDist } = nodes.shift();

    if (visited.has(current)) continue;
    visited.add(current);

    for (const neighbor in graph[current]) {
      if (!visited.has(neighbor)) {
        const newDist = currentDist + graph[current][neighbor];
        
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          // Update distance in nodes array
          const nodeIndex = nodes.findIndex(n => n.vertex === neighbor);
          if (nodeIndex !== -1) {
            nodes[nodeIndex].distance = newDist;
          }
        }
      }
    }
  }

  return distances;
}
```

## 🔍 Example Walkthrough

Consider this weighted graph:
```
      7        9
  A -----> B -----> C
  |        |        |
  |14      |10      |2
  |        |        |
  v        v        v
  D -----> E -----> F
      9        11
```

**Graph Representation (JavaScript)**:
```javascript
const graph = {
  'A': { 'B': 7, 'D': 14 },
  'B': { 'A': 7, 'C': 9, 'E': 10 },
  'C': { 'B': 9, 'F': 2 },
  'D': { 'A': 14, 'E': 9 },
  'E': { 'B': 10, 'D': 9, 'F': 11 },
  'F': { 'C': 2, 'E': 11 }
};
```

**Dijkstra's from 'A'**:

| Step | PQ (dist, vertex) | Visited | Current | Distances |
|------|-------------------|---------|---------|-----------|
| 1 | [(0, A)] | {} | - | A:0, others:∞ |
| 2 | [(7, B), (14, D)] | {A} | A | A:0, B:7, D:14 |
| 3 | [(14, D), (16, C), (17, E)] | {A, B} | B | A:0, B:7, C:16, D:14, E:17 |
| 4 | [(16, C), (17, E), (23, E)] | {A, B, D} | D | A:0, B:7, C:16, D:14, E:17 |
| 5 | [(17, E), (18, F)] | {A, B, D, C} | C | A:0, B:7, C:16, D:14, E:17, F:18 |
| 6 | [(18, F)] | {A, B, D, C, E} | E | All same |
| 7 | [] | All | F | All same |

**Final Shortest Distances from A**:
```javascript
{
  A: 0,
  B: 7,   // A → B
  C: 16,  // A → B → C
  D: 14,  // A → D
  E: 17,  // A → B → E
  F: 18   // A → B → C → F
}
```

## ⏱️ Time Complexity

- **Using Min-Heap (Priority Queue)**:
  - Time Complexity: **O((V + E) log V)**
    - Each vertex is added to PQ once: O(V log V)
    - Each edge is processed once: O(E log V)
    - Total: O((V + E) log V)
  
  - Space Complexity: **O(V)**
    - Distance object: O(V)
    - Priority queue: O(V)
    - Visited set: O(V)

- **Using Array (Linear Search)**:
  - Time Complexity: **O(V²)**
  - Better for dense graphs where E ≈ V²

## 🎯 When to Use Dijkstra's

### ✅ Best Use Cases:

1. **GPS Navigation / Maps**
   - Finding shortest route between locations
   - Example: Google Maps, Waze

2. **Network Routing**
   - Finding shortest path in computer networks
   - Example: OSPF (Open Shortest Path First) protocol

3. **Social Networks**
   - Finding degrees of separation
   - Example: LinkedIn connections

4. **Flight Routes**
   - Finding cheapest flights with layovers
   - Example: Flight booking systems

5. **Game Development**
   - AI pathfinding (when all costs are positive)
   - Example: RTS games unit movement

6. **Robotics**
   - Path planning for robots
   - Example: Autonomous vehicles

### ❌ When NOT to Use Dijkstra's:

1. **Negative Edge Weights** - Use Bellman-Ford instead
2. **Negative Cycles** - Use Bellman-Ford to detect
3. **All Pairs Shortest Path** - Use Floyd-Warshall
4. **Unweighted Graphs** - Use BFS (simpler and faster)

## 🔑 Key Properties

1. **Greedy Algorithm**: Makes locally optimal choice
2. **Non-negative Weights Only**: Fails with negative weights
3. **Single Source**: Finds shortest paths from one source
4. **Optimal**: Guarantees shortest path if no negative weights
5. **Complete**: Will find paths to all reachable vertices

## 💡 Common Problem Patterns

### Pattern 1: Network Delay Time
```javascript
/**
 * LeetCode 743: Network Delay Time
 */
function networkDelayTime(times, n, k) {
  // Build graph
  const graph = {};
  for (let i = 1; i <= n; i++) {
    graph[i] = {};
  }
  
  for (const [u, v, w] of times) {
    graph[u][v] = w;
  }

  // Run Dijkstra's
  const distances = dijkstra(graph, k);

  // Find maximum distance
  let maxDist = 0;
  for (let i = 1; i <= n; i++) {
    if (distances[i] === Infinity) return -1;
    maxDist = Math.max(maxDist, distances[i]);
  }

  return maxDist;
}
```

### Pattern 2: Shortest Path in Grid
```javascript
/**
 * Find shortest path in grid where cells have weights
 */
function dijkstraGrid(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const distances = Array(rows).fill(null)
    .map(() => Array(cols).fill(Infinity));
  
  distances[0][0] = grid[0][0];

  const pq = new PriorityQueue();
  pq.enqueue([0, 0], grid[0][0]);

  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  while (!pq.isEmpty()) {
    const { val: [row, col], priority: dist } = pq.dequeue();

    if (row === rows - 1 && col === cols - 1) {
      return dist;
    }

    if (dist > distances[row][col]) continue;

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        const newDist = dist + grid[newRow][newCol];

        if (newDist < distances[newRow][newCol]) {
          distances[newRow][newCol] = newDist;
          pq.enqueue([newRow, newCol], newDist);
        }
      }
    }
  }

  return distances[rows - 1][cols - 1];
}
```

### Pattern 3: Path with Minimum Effort
```javascript
/**
 * LeetCode 1631: Path With Minimum Effort
 */
function minimumEffortPath(heights) {
  const rows = heights.length;
  const cols = heights[0].length;
  const efforts = Array(rows).fill(null)
    .map(() => Array(cols).fill(Infinity));
  
  efforts[0][0] = 0;
  const pq = new PriorityQueue();
  pq.enqueue([0, 0], 0);

  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  while (!pq.isEmpty()) {
    const { val: [row, col], priority: effort } = pq.dequeue();

    if (row === rows - 1 && col === cols - 1) {
      return effort;
    }

    if (effort > efforts[row][col]) continue;

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        const newEffort = Math.max(
          effort,
          Math.abs(heights[newRow][newCol] - heights[row][col])
        );

        if (newEffort < efforts[newRow][newCol]) {
          efforts[newRow][newCol] = newEffort;
          pq.enqueue([newRow, newCol], newEffort);
        }
      }
    }
  }

  return 0;
}
```

## 🎓 Practice Problems

1. **Easy**:
   - Network Delay Time (LeetCode 743)
   - Path with Maximum Minimum Value (LeetCode 1102)

2. **Medium**:
   - Path With Minimum Effort (LeetCode 1631)
   - Cheapest Flights Within K Stops (LeetCode 787)
   - Swim in Rising Water (LeetCode 778)
   - The Maze II (LeetCode 505)

3. **Hard**:
   - Minimum Cost to Make at Least One Valid Path (LeetCode 1368)
   - Shortest Path to Get All Keys (LeetCode 864)

## 🔧 Optimizations

1. **Early Termination**: Stop when destination is reached
2. **Bidirectional Search**: Search from both source and destination
3. **A* Algorithm**: Add heuristic to prioritize promising paths
4. **Lazy Deletion**: Don't remove from PQ, check on pop

## ⚠️ Common Mistakes

1. **Negative Weights**: Algorithm fails silently
2. **Not Checking Visited**: Results in inefficiency
3. **Wrong PQ Priority**: Using visited count instead of distance
4. **Forgetting to Update**: Not updating distance when shorter path found

---

**Remember**: Dijkstra's is perfect for finding shortest paths in weighted graphs with non-negative weights! 🚀

