# Complete Graph Data Structures & Algorithms Guide

## Table of Contents
1. [Graph Fundamentals](#graph-fundamentals)
2. [Graph Representations](#graph-representations)
3. [Graph Traversal Algorithms](#graph-traversal-algorithms)
4. [Shortest Path Algorithms](#shortest-path-algorithms)
5. [Minimum Spanning Tree](#minimum-spanning-tree)
6. [Advanced Graph Algorithms](#advanced-graph-algorithms)
7. [50 Graph Problems with Solutions](#50-graph-problems-with-solutions)

---

## Graph Fundamentals

### What is a Graph?
A graph is a non-linear data structure consisting of vertices (nodes) and edges that connect these vertices.

**Graph G = (V, E)**
- V = Set of vertices
- E = Set of edges

### Types of Graphs

1. **Undirected Graph**: Edges have no direction
2. **Directed Graph (Digraph)**: Edges have direction
3. **Weighted Graph**: Edges have weights/costs
4. **Unweighted Graph**: All edges have equal weight
5. **Cyclic Graph**: Contains at least one cycle
6. **Acyclic Graph**: No cycles (DAG - Directed Acyclic Graph)
7. **Connected Graph**: Path exists between every pair of vertices
8. **Disconnected Graph**: Some vertices are not reachable from others

### Graph Terminology

- **Degree**: Number of edges connected to a vertex
  - In-degree: Number of incoming edges (directed graph)
  - Out-degree: Number of outgoing edges (directed graph)
- **Path**: Sequence of vertices where each adjacent pair is connected by an edge
- **Cycle**: Path that starts and ends at the same vertex
- **Connected Component**: Maximal set of vertices where path exists between any two
- **Strongly Connected Component**: In directed graphs, maximal set where path exists in both directions

---

## Graph Representations

### 1. Adjacency Matrix
2D array where `matrix[i][j]` represents edge from vertex i to vertex j.

```javascript
class GraphMatrix {
    constructor(vertices) {
        this.V = vertices;
        this.matrix = Array(vertices).fill(null)
            .map(() => Array(vertices).fill(0));
    }
    
    addEdge(u, v, weight = 1) {
        this.matrix[u][v] = weight;
        // For undirected graph: this.matrix[v][u] = weight;
    }
    
    display() {
        console.log(this.matrix);
    }
}
```

**Time Complexity:**
- Add Edge: O(1)
- Remove Edge: O(1)
- Check Edge: O(1)
- Space: O(V²)

### 2. Adjacency List
Array of lists where each index represents a vertex and stores its neighbors.

```javascript
class GraphList {
    constructor(vertices) {
        this.V = vertices;
        this.adjList = new Map();
        for (let i = 0; i < vertices; i++) {
            this.adjList.set(i, []);
        }
    }
    
    addEdge(u, v, weight = 1) {
        this.adjList.get(u).push({ node: v, weight });
        // For undirected: this.adjList.get(v).push({ node: u, weight });
    }
    
    display() {
        for (let [vertex, edges] of this.adjList) {
            console.log(vertex + " -> " + edges.map(e => e.node).join(", "));
        }
    }
}
```

**Time Complexity:**
- Add Edge: O(1)
- Remove Edge: O(V)
- Check Edge: O(V)
- Space: O(V + E)

### 3. Edge List
Array of edges where each edge is represented as (u, v, weight).

```javascript
class GraphEdgeList {
    constructor(vertices) {
        this.V = vertices;
        this.edges = [];
    }
    
    addEdge(u, v, weight = 1) {
        this.edges.push({ src: u, dest: v, weight });
    }
}
```

---

## Graph Traversal Algorithms

### 1. Breadth-First Search (BFS)
Explores graph level by level using a queue.

```javascript
function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    const result = [];
    
    visited.add(start);
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);
        
        for (let neighbor of graph.adjList.get(vertex)) {
            if (!visited.has(neighbor.node)) {
                visited.add(neighbor.node);
                queue.push(neighbor.node);
            }
        }
    }
    
    return result;
}
```

**Time Complexity:** O(V + E)  
**Space Complexity:** O(V)

**Use Cases:**
- Shortest path in unweighted graphs
- Level order traversal
- Finding connected components

### 2. Depth-First Search (DFS)
Explores as far as possible along each branch using recursion or stack.

```javascript
// Recursive DFS
function dfsRecursive(graph, vertex, visited = new Set(), result = []) {
    visited.add(vertex);
    result.push(vertex);
    
    for (let neighbor of graph.adjList.get(vertex)) {
        if (!visited.has(neighbor.node)) {
            dfsRecursive(graph, neighbor.node, visited, result);
        }
    }
    
    return result;
}

// Iterative DFS
function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    const result = [];
    
    while (stack.length > 0) {
        const vertex = stack.pop();
        
        if (!visited.has(vertex)) {
            visited.add(vertex);
            result.push(vertex);
            
            for (let neighbor of graph.adjList.get(vertex)) {
                if (!visited.has(neighbor.node)) {
                    stack.push(neighbor.node);
                }
            }
        }
    }
    
    return result;
}
```

**Time Complexity:** O(V + E)  
**Space Complexity:** O(V)

**Use Cases:**
- Detecting cycles
- Topological sorting
- Finding strongly connected components
- Maze solving

---

## Shortest Path Algorithms

### 1. Dijkstra's Algorithm
Finds shortest path from source to all vertices in weighted graph with non-negative weights.

```javascript
function dijkstra(graph, start) {
    const distances = new Map();
    const visited = new Set();
    const pq = new MinPriorityQueue();
    
    // Initialize distances
    for (let i = 0; i < graph.V; i++) {
        distances.set(i, Infinity);
    }
    distances.set(start, 0);
    pq.enqueue(start, 0);
    
    while (!pq.isEmpty()) {
        const { element: u } = pq.dequeue();
        
        if (visited.has(u)) continue;
        visited.add(u);
        
        for (let { node: v, weight } of graph.adjList.get(u)) {
            const newDist = distances.get(u) + weight;
            if (newDist < distances.get(v)) {
                distances.set(v, newDist);
                pq.enqueue(v, newDist);
            }
        }
    }
    
    return distances;
}

// Simple Priority Queue implementation
class MinPriorityQueue {
    constructor() {
        this.heap = [];
    }
    
    enqueue(element, priority) {
        this.heap.push({ element, priority });
        this.heap.sort((a, b) => a.priority - b.priority);
    }
    
    dequeue() {
        return this.heap.shift();
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
}
```

**Time Complexity:** O((V + E) log V) with min-heap  
**Space Complexity:** O(V)

### 2. Bellman-Ford Algorithm
Finds shortest path with negative weights, detects negative cycles.

```javascript
function bellmanFord(graph, start) {
    const distances = Array(graph.V).fill(Infinity);
    distances[start] = 0;
    
    // Relax all edges V-1 times
    for (let i = 0; i < graph.V - 1; i++) {
        for (let u = 0; u < graph.V; u++) {
            for (let { node: v, weight } of graph.adjList.get(u)) {
                if (distances[u] !== Infinity && 
                    distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                }
            }
        }
    }
    
    // Check for negative cycles
    for (let u = 0; u < graph.V; u++) {
        for (let { node: v, weight } of graph.adjList.get(u)) {
            if (distances[u] !== Infinity && 
                distances[u] + weight < distances[v]) {
                return { hasNegativeCycle: true };
            }
        }
    }
    
    return { hasNegativeCycle: false, distances };
}
```

**Time Complexity:** O(V × E)  
**Space Complexity:** O(V)

### 3. Floyd-Warshall Algorithm
Finds shortest paths between all pairs of vertices.

```javascript
function floydWarshall(graph) {
    const dist = Array(graph.V).fill(null)
        .map(() => Array(graph.V).fill(Infinity));
    
    // Initialize with direct edges
    for (let i = 0; i < graph.V; i++) {
        dist[i][i] = 0;
        for (let { node: j, weight } of graph.adjList.get(i)) {
            dist[i][j] = weight;
        }
    }
    
    // Try all intermediate vertices
    for (let k = 0; k < graph.V; k++) {
        for (let i = 0; i < graph.V; i++) {
            for (let j = 0; j < graph.V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    return dist;
}
```

**Time Complexity:** O(V³)  
**Space Complexity:** O(V²)

---

## Minimum Spanning Tree

### 1. Kruskal's Algorithm
Uses Union-Find to build MST by selecting minimum weight edges.

```javascript
class UnionFind {
    constructor(n) {
        this.parent = Array(n).fill(0).map((_, i) => i);
        this.rank = Array(n).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) return false;
        
        // Union by rank
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
}

function kruskal(graph) {
    const edges = [];
    for (let u = 0; u < graph.V; u++) {
        for (let { node: v, weight } of graph.adjList.get(u)) {
            edges.push({ u, v, weight });
        }
    }
    
    edges.sort((a, b) => a.weight - b.weight);
    
    const uf = new UnionFind(graph.V);
    const mst = [];
    let totalWeight = 0;
    
    for (let { u, v, weight } of edges) {
        if (uf.union(u, v)) {
            mst.push({ u, v, weight });
            totalWeight += weight;
        }
    }
    
    return { mst, totalWeight };
}
```

**Time Complexity:** O(E log E)  
**Space Complexity:** O(V)

### 2. Prim's Algorithm
Grows MST from a starting vertex using priority queue.

```javascript
function prim(graph, start = 0) {
    const visited = new Set();
    const pq = new MinPriorityQueue();
    const mst = [];
    let totalWeight = 0;
    
    pq.enqueue({ from: -1, to: start, weight: 0 }, 0);
    
    while (!pq.isEmpty() && visited.size < graph.V) {
        const { element: { from, to, weight } } = pq.dequeue();
        
        if (visited.has(to)) continue;
        
        visited.add(to);
        if (from !== -1) {
            mst.push({ from, to, weight });
            totalWeight += weight;
        }
        
        for (let { node: neighbor, weight: w } of graph.adjList.get(to)) {
            if (!visited.has(neighbor)) {
                pq.enqueue({ from: to, to: neighbor, weight: w }, w);
            }
        }
    }
    
    return { mst, totalWeight };
}
```

**Time Complexity:** O(E log V)  
**Space Complexity:** O(V)

---

## Advanced Graph Algorithms

### 1. Topological Sort (DFS-based)
Linear ordering of vertices in DAG.

```javascript
function topologicalSort(graph) {
    const visited = new Set();
    const stack = [];
    
    function dfs(v) {
        visited.add(v);
        
        for (let { node: neighbor } of graph.adjList.get(v)) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
        
        stack.push(v);
    }
    
    for (let i = 0; i < graph.V; i++) {
        if (!visited.has(i)) {
            dfs(i);
        }
    }
    
    return stack.reverse();
}
```

### 2. Kahn's Algorithm (Topological Sort using BFS)

```javascript
function kahnsAlgorithm(graph) {
    const inDegree = Array(graph.V).fill(0);
    
    // Calculate in-degrees
    for (let u = 0; u < graph.V; u++) {
        for (let { node: v } of graph.adjList.get(u)) {
            inDegree[v]++;
        }
    }
    
    const queue = [];
    for (let i = 0; i < graph.V; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    const result = [];
    while (queue.length > 0) {
        const u = queue.shift();
        result.push(u);
        
        for (let { node: v } of graph.adjList.get(u)) {
            inDegree[v]--;
            if (inDegree[v] === 0) queue.push(v);
        }
    }
    
    // If result doesn't contain all vertices, graph has cycle
    return result.length === graph.V ? result : null;
}
```

### 3. Strongly Connected Components (Kosaraju's Algorithm)

```javascript
function kosarajuSCC(graph) {
    const visited = new Set();
    const stack = [];
    
    // First DFS to fill stack
    function dfs1(v) {
        visited.add(v);
        for (let { node: neighbor } of graph.adjList.get(v)) {
            if (!visited.has(neighbor)) {
                dfs1(neighbor);
            }
        }
        stack.push(v);
    }
    
    for (let i = 0; i < graph.V; i++) {
        if (!visited.has(i)) dfs1(i);
    }
    
    // Transpose graph
    const transposed = new GraphList(graph.V);
    for (let u = 0; u < graph.V; u++) {
        for (let { node: v, weight } of graph.adjList.get(u)) {
            transposed.addEdge(v, u, weight);
        }
    }
    
    // Second DFS on transposed graph
    visited.clear();
    const sccs = [];
    
    function dfs2(v, component) {
        visited.add(v);
        component.push(v);
        for (let { node: neighbor } of transposed.adjList.get(v)) {
            if (!visited.has(neighbor)) {
                dfs2(neighbor, component);
            }
        }
    }
    
    while (stack.length > 0) {
        const v = stack.pop();
        if (!visited.has(v)) {
            const component = [];
            dfs2(v, component);
            sccs.push(component);
        }
    }
    
    return sccs;
}
```

### 4. Tarjan's Algorithm (Finding Bridges)

```javascript
function findBridges(graph) {
    const visited = new Set();
    const disc = Array(graph.V).fill(-1);
    const low = Array(graph.V).fill(-1);
    const parent = Array(graph.V).fill(-1);
    const bridges = [];
    let time = 0;
    
    function dfs(u) {
        visited.add(u);
        disc[u] = low[u] = time++;
        
        for (let { node: v } of graph.adjList.get(u)) {
            if (!visited.has(v)) {
                parent[v] = u;
                dfs(v);
                
                low[u] = Math.min(low[u], low[v]);
                
                if (low[v] > disc[u]) {
                    bridges.push([u, v]);
                }
            } else if (v !== parent[u]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }
    
    for (let i = 0; i < graph.V; i++) {
        if (!visited.has(i)) dfs(i);
    }
    
    return bridges;
}
```

---

## 50 Graph Problems with Solutions

### Easy Problems (1-15)

#### Problem 1: Number of Provinces (Connected Components)

```javascript
/**
 * Given n cities and connections, find number of provinces
 * @param {number[][]} isConnected - adjacency matrix
 * @return {number}
 */
function findCircleNum(isConnected) {
    const n = isConnected.length;
    const visited = new Set();
    let provinces = 0;
    
    function dfs(city) {
        visited.add(city);
        for (let neighbor = 0; neighbor < n; neighbor++) {
            if (isConnected[city][neighbor] === 1 && !visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    }
    
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            dfs(i);
            provinces++;
        }
    }
    
    return provinces;
}

// Example
console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]])); // Output: 2
```

#### Problem 2: Find if Path Exists in Graph

```javascript
/**
 * @param {number} n - number of vertices
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
function validPath(n, edges, source, destination) {
    const graph = new Map();
    
    // Build adjacency list
    for (let i = 0; i < n; i++) {
        graph.set(i, []);
    }
    for (let [u, v] of edges) {
        graph.get(u).push(v);
        graph.get(v).push(u);
    }
    
    const visited = new Set();
    const queue = [source];
    visited.add(source);
    
    while (queue.length > 0) {
        const node = queue.shift();
        if (node === destination) return true;
        
        for (let neighbor of graph.get(node)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return false;
}
```

#### Problem 3: Find Center of Star Graph

```javascript
/**
 * @param {number[][]} edges
 * @return {number}
 */
function findCenter(edges) {
    // Center node appears in all edges
    // Check first two edges
    const [a, b] = edges[0];
    const [c, d] = edges[1];
    
    return a === c || a === d ? a : b;
}

// Example
console.log(findCenter([[1,2],[2,3],[4,2]])); // Output: 2
```

#### Problem 4: All Paths From Source to Target

```javascript
/**
 * @param {number[][]} graph - adjacency list
 * @return {number[][]}
 */
function allPathsSourceTarget(graph) {
    const result = [];
    const target = graph.length - 1;
    
    function dfs(node, path) {
        path.push(node);
        
        if (node === target) {
            result.push([...path]);
        } else {
            for (let neighbor of graph[node]) {
                dfs(neighbor, path);
            }
        }
        
        path.pop();
    }
    
    dfs(0, []);
    return result;
}

// Example
console.log(allPathsSourceTarget([[1,2],[3],[3],[]])); 
// Output: [[0,1,3],[0,2,3]]
```

#### Problem 5: Clone Graph

```javascript
class Node {
    constructor(val, neighbors = []) {
        this.val = val;
        this.neighbors = neighbors;
    }
}

/**
 * @param {Node} node
 * @return {Node}
 */
function cloneGraph(node) {
    if (!node) return null;
    
    const map = new Map();
    
    function dfs(node) {
        if (map.has(node.val)) {
            return map.get(node.val);
        }
        
        const clone = new Node(node.val);
        map.set(node.val, clone);
        
        for (let neighbor of node.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }
        
        return clone;
    }
    
    return dfs(node);
}
```

#### Problem 6: Flood Fill

```javascript
/**
 * @param {number[][]} image
 * @param {number} sr - starting row
 * @param {number} sc - starting column
 * @param {number} color
 * @return {number[][]}
 */
function floodFill(image, sr, sc, color) {
    const originalColor = image[sr][sc];
    if (originalColor === color) return image;
    
    const rows = image.length;
    const cols = image[0].length;
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || 
            image[r][c] !== originalColor) {
            return;
        }
        
        image[r][c] = color;
        
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    
    dfs(sr, sc);
    return image;
}
```

#### Problem 7: Number of Islands

```javascript
/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islands = 0;
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            return;
        }
        
        grid[r][c] = '0'; // Mark as visited
        
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                islands++;
                dfs(r, c);
            }
        }
    }
    
    return islands;
}
```

#### Problem 8: Max Area of Island

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
function maxAreaOfIsland(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let maxArea = 0;
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) {
            return 0;
        }
        
        grid[r][c] = 0;
        
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + 
               dfs(r, c + 1) + dfs(r, c - 1);
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                maxArea = Math.max(maxArea, dfs(r, c));
            }
        }
    }
    
    return maxArea;
}
```

#### Problem 9: Island Perimeter

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
function islandPerimeter(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let perimeter = 0;
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                perimeter += 4;
                
                // Check top
                if (r > 0 && grid[r - 1][c] === 1) perimeter--;
                // Check bottom
                if (r < rows - 1 && grid[r + 1][c] === 1) perimeter--;
                // Check left
                if (c > 0 && grid[r][c - 1] === 1) perimeter--;
                // Check right
                if (c < cols - 1 && grid[r][c + 1] === 1) perimeter--;
            }
        }
    }
    
    return perimeter;
}
```

#### Problem 10: Number of Closed Islands

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
function closedIsland(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols) {
            return false;
        }
        if (grid[r][c] === 1) return true;
        
        grid[r][c] = 1;
        
        const top = dfs(r - 1, c);
        const bottom = dfs(r + 1, c);
        const left = dfs(r, c - 1);
        const right = dfs(r, c + 1);
        
        return top && bottom && left && right;
    }
    
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 0 && dfs(r, c)) {
                count++;
            }
        }
    }
    
    return count;
}
```

#### Problem 11: Keys and Rooms

```javascript
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
function canVisitAllRooms(rooms) {
    const visited = new Set([0]);
    const stack = [0];
    
    while (stack.length > 0) {
        const room = stack.pop();
        
        for (let key of rooms[room]) {
            if (!visited.has(key)) {
                visited.add(key);
                stack.push(key);
            }
        }
    }
    
    return visited.size === rooms.length;
}
```

#### Problem 12: Find Town Judge

```javascript
/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
function findJudge(n, trust) {
    const trustCount = Array(n + 1).fill(0);
    
    for (let [a, b] of trust) {
        trustCount[a]--; // a trusts someone
        trustCount[b]++; // b is trusted
    }
    
    for (let i = 1; i <= n; i++) {
        if (trustCount[i] === n - 1) return i;
    }
    
    return -1;
}
```

#### Problem 13: Minimum Number of Vertices to Reach All Nodes

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
function findSmallestSetOfVertices(n, edges) {
    const hasIncoming = new Set();
    
    for (let [from, to] of edges) {
        hasIncoming.add(to);
    }
    
    const result = [];
    for (let i = 0; i < n; i++) {
        if (!hasIncoming.has(i)) {
            result.push(i);
        }
    }
    
    return result;
}
```

#### Problem 14: Find the Celebrity

```javascript
/**
 * @param {function} knows - knows(a, b) returns if a knows b
 * @param {number} n
 * @return {number}
 */
function findCelebrity(n, knows) {
    let candidate = 0;
    
    // Find potential celebrity
    for (let i = 1; i < n; i++) {
        if (knows(candidate, i)) {
            candidate = i;
        }
    }
    
    // Verify candidate
    for (let i = 0; i < n; i++) {
        if (i !== candidate) {
            if (knows(candidate, i) || !knows(i, candidate)) {
                return -1;
            }
        }
    }
    
    return candidate;
}
```

#### Problem 15: Shortest Path in Binary Matrix

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
function shortestPathBinaryMatrix(grid) {
    const n = grid.length;
    if (grid[0][0] === 1 || grid[n-1][n-1] === 1) return -1;
    
    const directions = [
        [-1,-1], [-1,0], [-1,1],
        [0,-1],          [0,1],
        [1,-1],  [1,0],  [1,1]
    ];
    
    const queue = [[0, 0, 1]]; // [row, col, distance]
    grid[0][0] = 1; // Mark as visited
    
    while (queue.length > 0) {
        const [r, c, dist] = queue.shift();
        
        if (r === n - 1 && c === n - 1) return dist;
        
        for (let [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
                grid[nr][nc] = 1;
                queue.push([nr, nc, dist + 1]);
            }
        }
    }
    
    return -1;
}
```

### Medium Problems (16-35)

#### Problem 16: Course Schedule (Detect Cycle in Directed Graph)

```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(null).map(() => []);
    
    for (let [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }
    
    const visited = new Set();
    const recStack = new Set();
    
    function hasCycle(course) {
        visited.add(course);
        recStack.add(course);
        
        for (let neighbor of graph[course]) {
            if (!visited.has(neighbor)) {
                if (hasCycle(neighbor)) return true;
            } else if (recStack.has(neighbor)) {
                return true;
            }
        }
        
        recStack.delete(course);
        return false;
    }
    
    for (let i = 0; i < numCourses; i++) {
        if (!visited.has(i)) {
            if (hasCycle(i)) return false;
        }
    }
    
    return true;
}
```

#### Problem 17: Course Schedule II (Topological Sort)

```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
function findOrder(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(null).map(() => []);
    const inDegree = Array(numCourses).fill(0);
    
    for (let [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }
    
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    const result = [];
    while (queue.length > 0) {
        const course = queue.shift();
        result.push(course);
        
        for (let neighbor of graph[course]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return result.length === numCourses ? result : [];
}
```

#### Problem 18: Pacific Atlantic Water Flow

```javascript
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
function pacificAtlantic(heights) {
    if (!heights || heights.length === 0) return [];
    
    const rows = heights.length;
    const cols = heights[0].length;
    const pacific = Array(rows).fill(null).map(() => Array(cols).fill(false));
    const atlantic = Array(rows).fill(null).map(() => Array(cols).fill(false));
    
    function dfs(r, c, visited) {
        visited[r][c] = true;
        const directions = [[0,1], [1,0], [0,-1], [-1,0]];
        
        for (let [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                !visited[nr][nc] && heights[nr][nc] >= heights[r][c]) {
                dfs(nr, nc, visited);
            }
        }
    }
    
    // Start from Pacific borders
    for (let c = 0; c < cols; c++) {
        dfs(0, c, pacific);
        dfs(rows - 1, c, atlantic);
    }
    
    for (let r = 0; r < rows; r++) {
        dfs(r, 0, pacific);
        dfs(r, cols - 1, atlantic);
    }
    
    const result = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (pacific[r][c] && atlantic[r][c]) {
                result.push([r, c]);
            }
        }
    }
    
    return result;
}
```

#### Problem 19: Surrounded Regions

```javascript
/**
 * @param {character[][]} board
 * @return {void}
 */
function solve(board) {
    if (!board || board.length === 0) return;
    
    const rows = board.length;
    const cols = board[0].length;
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== 'O') {
            return;
        }
        
        board[r][c] = 'T'; // Temporary mark
        
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    
    // Mark border-connected 'O's as 'T'
    for (let r = 0; r < rows; r++) {
        dfs(r, 0);
        dfs(r, cols - 1);
    }
    
    for (let c = 0; c < cols; c++) {
        dfs(0, c);
        dfs(rows - 1, c);
    }
    
    // Convert remaining 'O's to 'X' and 'T's back to 'O'
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] === 'O') {
                board[r][c] = 'X';
            } else if (board[r][c] === 'T') {
                board[r][c] = 'O';
            }
        }
    }
}
```

#### Problem 20: Number of Enclaves

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
function numEnclaves(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) {
            return;
        }
        
        grid[r][c] = 0;
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    
    // Remove border-connected land
    for (let r = 0; r < rows; r++) {
        dfs(r, 0);
        dfs(r, cols - 1);
    }
    
    for (let c = 0; c < cols; c++) {
        dfs(0, c);
        dfs(rows - 1, c);
    }
    
    // Count remaining land
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) count++;
        }
    }
    
    return count;
}
```

#### Problem 21: Rotting Oranges

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
function orangesRotting(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let fresh = 0;
    
    // Find all rotten oranges and count fresh ones
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c, 0]);
            } else if (grid[r][c] === 1) {
                fresh++;
            }
        }
    }
    
    if (fresh === 0) return 0;
    
    const directions = [[0,1], [1,0], [0,-1], [-1,0]];
    let minutes = 0;
    
    while (queue.length > 0) {
        const [r, c, min] = queue.shift();
        minutes = Math.max(minutes, min);
        
        for (let [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && 
                grid[nr][nc] === 1) {
                grid[nr][nc] = 2;
                fresh--;
                queue.push([nr, nc, min + 1]);
            }
        }
    }
    
    return fresh === 0 ? minutes : -1;
}
```

#### Problem 22: Shortest Bridge

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
function shortestBridge(grid) {
    const n = grid.length;
    const queue = [];
    let found = false;
    
    // DFS to find first island and add to queue
    function dfs(r, c) {
        if (r < 0 || r >= n || c < 0 || c >= n || grid[r][c] !== 1) {
            return;
        }
        
        grid[r][c] = 2;
        queue.push([r, c, 0]);
        
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    
    // Find first island
    outer: for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 1) {
                dfs(r, c);
                break outer;
            }
        }
    }
    
    // BFS to find shortest path to second island
    const directions = [[0,1], [1,0], [0,-1], [-1,0]];
    
    while (queue.length > 0) {
        const [r, c, dist] = queue.shift();
        
        for (let [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            
            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                if (grid[nr][nc] === 1) {
                    return dist;
                }
                if (grid[nr][nc] === 0) {
                    grid[nr][nc] = 2;
                    queue.push([nr, nc, dist + 1]);
                }
            }
        }
    }
    
    return -1;
}
```

#### Problem 23: Is Graph Bipartite

```javascript
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
function isBipartite(graph) {
    const n = graph.length;
    const colors = Array(n).fill(-1);
    
    function bfs(start) {
        const queue = [start];
        colors[start] = 0;
        
        while (queue.length > 0) {
            const node = queue.shift();
            
            for (let neighbor of graph[node]) {
                if (colors[neighbor] === -1) {
                    colors[neighbor] = 1 - colors[node];
                    queue.push(neighbor);
                } else if (colors[neighbor] === colors[node]) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    for (let i = 0; i < n; i++) {
        if (colors[i] === -1) {
            if (!bfs(i)) return false;
        }
    }
    
    return true;
}
```

#### Problem 24: Possible Bipartition

```javascript
/**
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
function possibleBipartition(n, dislikes) {
    const graph = Array(n + 1).fill(null).map(() => []);
    
    for (let [a, b] of dislikes) {
        graph[a].push(b);
        graph[b].push(a);
    }
    
    const colors = Array(n + 1).fill(-1);
    
    function dfs(node, color) {
        colors[node] = color;
        
        for (let neighbor of graph[node]) {
            if (colors[neighbor] === -1) {
                if (!dfs(neighbor, 1 - color)) return false;
            } else if (colors[neighbor] === color) {
                return false;
            }
        }
        
        return true;
    }
    
    for (let i = 1; i <= n; i++) {
        if (colors[i] === -1) {
            if (!dfs(i, 0)) return false;
        }
    }
    
    return true;
}
```

#### Problem 25: Minimum Height Trees

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
function findMinHeightTrees(n, edges) {
    if (n === 1) return [0];
    
    const graph = Array(n).fill(null).map(() => []);
    const degree = Array(n).fill(0);
    
    for (let [a, b] of edges) {
        graph[a].push(b);
        graph[b].push(a);
        degree[a]++;
        degree[b]++;
    }
    
    // Start with leaves
    let queue = [];
    for (let i = 0; i < n; i++) {
        if (degree[i] === 1) queue.push(i);
    }
    
    let remaining = n;
    while (remaining > 2) {
        const size = queue.length;
        remaining -= size;
        const newQueue = [];
        
        for (let i = 0; i < size; i++) {
            const leaf = queue[i];
            
            for (let neighbor of graph[leaf]) {
                degree[neighbor]--;
                if (degree[neighbor] === 1) {
                    newQueue.push(neighbor);
                }
            }
        }
        
        queue = newQueue;
    }
    
    return queue;
}
```

#### Problem 26: Reconstruct Itinerary

```javascript
/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
function findItinerary(tickets) {
    const graph = new Map();
    
    // Build graph with sorted destinations
    for (let [from, to] of tickets) {
        if (!graph.has(from)) graph.set(from, []);
        graph.get(from).push(to);
    }
    
    for (let [key, value] of graph) {
        value.sort();
    }
    
    const result = [];
    
    function dfs(airport) {
        const destinations = graph.get(airport) || [];
        
        while (destinations.length > 0) {
            const next = destinations.shift();
            dfs(next);
        }
        
        result.unshift(airport);
    }
    
    dfs("JFK");
    return result;
}
```

#### Problem 27: Evaluate Division

```javascript
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
function calcEquation(equations, values, queries) {
    const graph = new Map();
    
    // Build graph
    for (let i = 0; i < equations.length; i++) {
        const [a, b] = equations[i];
        const value = values[i];
        
        if (!graph.has(a)) graph.set(a, []);
        if (!graph.has(b)) graph.set(b, []);
        
        graph.get(a).push({ node: b, value });
        graph.get(b).push({ node: a, value: 1 / value });
    }
    
    function dfs(start, end, visited) {
        if (!graph.has(start)) return -1;
        if (start === end) return 1;
        
        visited.add(start);
        
        for (let { node, value } of graph.get(start)) {
            if (!visited.has(node)) {
                const result = dfs(node, end, visited);
                if (result !== -1) {
                    return value * result;
                }
            }
        }
        
        return -1;
    }
    
    const results = [];
    for (let [c, d] of queries) {
        results.push(dfs(c, d, new Set()));
    }
    
    return results;
}
```

#### Problem 28: Network Delay Time

```javascript
/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
function networkDelayTime(times, n, k) {
    const graph = new Map();
    
    for (let i = 1; i <= n; i++) {
        graph.set(i, []);
    }
    
    for (let [u, v, w] of times) {
        graph.get(u).push({ node: v, time: w });
    }
    
    const dist = Array(n + 1).fill(Infinity);
    dist[k] = 0;
    
    const pq = [[k, 0]]; // [node, time]
    
    while (pq.length > 0) {
        pq.sort((a, b) => a[1] - b[1]);
        const [node, time] = pq.shift();
        
        if (time > dist[node]) continue;
        
        for (let { node: neighbor, time: t } of graph.get(node)) {
            const newTime = time + t;
            if (newTime < dist[neighbor]) {
                dist[neighbor] = newTime;
                pq.push([neighbor, newTime]);
            }
        }
    }
    
    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1;
        maxTime = Math.max(maxTime, dist[i]);
    }
    
    return maxTime;
}
```

#### Problem 29: Cheapest Flights Within K Stops

```javascript
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
function findCheapestPrice(n, flights, src, dst, k) {
    const graph = new Map();
    
    for (let i = 0; i < n; i++) {
        graph.set(i, []);
    }
    
    for (let [from, to, price] of flights) {
        graph.get(from).push({ node: to, price });
    }
    
    const queue = [[src, 0, 0]]; // [node, cost, stops]
    const costs = Array(n).fill(Infinity);
    costs[src] = 0;
    
    while (queue.length > 0) {
        const [node, cost, stops] = queue.shift();
        
        if (stops > k) continue;
        
        for (let { node: neighbor, price } of graph.get(node)) {
            const newCost = cost + price;
            if (newCost < costs[neighbor]) {
                costs[neighbor] = newCost;
                queue.push([neighbor, newCost, stops + 1]);
            }
        }
    }
    
    return costs[dst] === Infinity ? -1 : costs[dst];
}
```

#### Problem 30: Path with Minimum Effort

```javascript
/**
 * @param {number[][]} heights
 * @return {number}
 */
function minimumEffortPath(heights) {
    const rows = heights.length;
    const cols = heights[0].length;
    const efforts = Array(rows).fill(null)
        .map(() => Array(cols).fill(Infinity));
    
    efforts[0][0] = 0;
    const pq = [[0, 0, 0]]; // [effort, row, col]
    const directions = [[0,1], [1,0], [0,-1], [-1,0]];
    
    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [effort, r, c] = pq.shift();
        
        if (r === rows - 1 && c === cols - 1) return effort;
        
        if (effort > efforts[r][c]) continue;
        
        for (let [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                const newEffort = Math.max(
                    effort,
                    Math.abs(heights[nr][nc] - heights[r][c])
                );
                
                if (newEffort < efforts[nr][nc]) {
                    efforts[nr][nc] = newEffort;
                    pq.push([newEffort, nr, nc]);
                }
            }
        }
    }
    
    return 0;
}
```

#### Problem 31: Critical Connections in a Network (Bridges)

```javascript
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
function criticalConnections(n, connections) {
    const graph = Array(n).fill(null).map(() => []);
    
    for (let [a, b] of connections) {
        graph[a].push(b);
        graph[b].push(a);
    }
    
    const disc = Array(n).fill(-1);
    const low = Array(n).fill(-1);
    const bridges = [];
    let time = 0;
    
    function dfs(u, parent) {
        disc[u] = low[u] = time++;
        
        for (let v of graph[u]) {
            if (v === parent) continue;
            
            if (disc[v] === -1) {
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                
                if (low[v] > disc[u]) {
                    bridges.push([u, v]);
                }
            } else {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }
    
    dfs(0, -1);
    return bridges;
}
```

#### Problem 32: Accounts Merge

```javascript
/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
function accountsMerge(accounts) {
    const emailToName = new Map();
    const graph = new Map();
    
    // Build graph
    for (let account of accounts) {
        const name = account[0];
        const firstEmail = account[1];
        
        for (let i = 1; i < account.length; i++) {
            const email = account[i];
            emailToName.set(email, name);
            
            if (!graph.has(email)) graph.set(email, []);
            if (!graph.has(firstEmail)) graph.set(firstEmail, []);
            
            graph.get(email).push(firstEmail);
            graph.get(firstEmail).push(email);
        }
    }
    
    const visited = new Set();
    const result = [];
    
    function dfs(email, component) {
        visited.add(email);
        component.push(email);
        
        for (let neighbor of graph.get(email) || []) {
            if (!visited.has(neighbor)) {
                dfs(neighbor, component);
            }
        }
    }
    
    for (let email of graph.keys()) {
        if (!visited.has(email)) {
            const component = [];
            dfs(email, component);
            component.sort();
            result.push([emailToName.get(email), ...component]);
        }
    }
    
    return result;
}
```

#### Problem 33: Number of Operations to Make Network Connected

```javascript
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
function makeConnected(n, connections) {
    if (connections.length < n - 1) return -1;
    
    const graph = Array(n).fill(null).map(() => []);
    
    for (let [a, b] of connections) {
        graph[a].push(b);
        graph[b].push(a);
    }
    
    const visited = new Set();
    let components = 0;
    
    function dfs(node) {
        visited.add(node);
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    }
    
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            dfs(i);
            components++;
        }
    }
    
    return components - 1;
}
```

#### Problem 34: Redundant Connection

```javascript
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
function findRedundantConnection(edges) {
    const n = edges.length;
    const parent = Array(n + 1).fill(0).map((_, i) => i);
    
    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    function union(x, y) {
        const rootX = find(x);
        const rootY = find(y);
        
        if (rootX === rootY) return false;
        
        parent[rootX] = rootY;
        return true;
    }
    
    for (let [u, v] of edges) {
        if (!union(u, v)) {
            return [u, v];
        }
    }
    
    return [];
}
```

#### Problem 35: Longest Increasing Path in Matrix

```javascript
/**
 * @param {number[][]} matrix
 * @return {number}
 */
function longestIncreasingPath(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const memo = Array(rows).fill(null).map(() => Array(cols).fill(0));
    const directions = [[0,1], [1,0], [0,-1], [-1,0]];
    
    function dfs(r, c) {
        if (memo[r][c] !== 0) return memo[r][c];
        
        let maxPath = 1;
        
        for (let [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                matrix[nr][nc] > matrix[r][c]) {
                maxPath = Math.max(maxPath, 1 + dfs(nr, nc));
            }
        }
        
        memo[r][c] = maxPath;
        return maxPath;
    }
    
    let result = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            result = Math.max(result, dfs(r, c));
        }
    }
    
    return result;
}
```

### Hard Problems (36-50)

#### Problem 36: Word Ladder

```javascript
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue = [[beginWord, 1]];
    
    while (queue.length > 0) {
        const [word, level] = queue.shift();
        
        if (word === endWord) return level;
        
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) { // a-z
                const newWord = word.slice(0, i) + 
                               String.fromCharCode(c) + 
                               word.slice(i + 1);
                
                if (wordSet.has(newWord)) {
                    queue.push([newWord, level + 1]);
                    wordSet.delete(newWord);
                }
            }
        }
    }
    
    return 0;
}
```

#### Problem 37: Word Ladder II

```javascript
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
function findLadders(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return [];
    
    const graph = new Map();
    const distances = new Map();
    
    // BFS to find shortest paths
    const queue = [beginWord];
    distances.set(beginWord, 0);
    let found = false;
    
    while (queue.length > 0 && !found) {
        const size = queue.length;
        const visited = new Set();
        
        for (let i = 0; i < size; i++) {
            const word = queue.shift();
            const dist = distances.get(word);
            
            for (let j = 0; j < word.length; j++) {
                for (let c = 97; c <= 122; c++) {
                    const newWord = word.slice(0, j) + 
                                   String.fromCharCode(c) + 
                                   word.slice(j + 1);
                    
                    if (newWord === endWord) found = true;
                    
                    if (wordSet.has(newWord)) {
                        if (!distances.has(newWord)) {
                            distances.set(newWord, dist + 1);
                            visited.add(newWord);
                            queue.push(newWord);
                        }
                        
                        if (distances.get(newWord) === dist + 1) {
                            if (!graph.has(word)) graph.set(word, []);
                            graph.get(word).push(newWord);
                        }
                    }
                }
            }
        }
    }
    
    // DFS to find all paths
    const result = [];
    
    function dfs(word, path) {
        if (word === endWord) {
            result.push([...path]);
            return;
        }
        
        if (!graph.has(word)) return;
        
        for (let nextWord of graph.get(word)) {
            path.push(nextWord);
            dfs(nextWord, path);
            path.pop();
        }
    }
    
    dfs(beginWord, [beginWord]);
    return result;
}
```

#### Problem 38: Alien Dictionary

```javascript
/**
 * @param {string[]} words
 * @return {string}
 */
function alienOrder(words) {
    const graph = new Map();
    const inDegree = new Map();
    
    // Initialize graph
    for (let word of words) {
        for (let char of word) {
            graph.set(char, []);
            inDegree.set(char, 0);
        }
    }
    
    // Build graph
    for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];
        const minLen = Math.min(word1.length, word2.length);
        
        // Check invalid case
        if (word1.length > word2.length && 
            word1.startsWith(word2)) {
            return "";
        }
        
        for (let j = 0; j < minLen; j++) {
            if (word1[j] !== word2[j]) {
                graph.get(word1[j]).push(word2[j]);
                inDegree.set(word2[j], inDegree.get(word2[j]) + 1);
                break;
            }
        }
    }
    
    // Topological sort
    const queue = [];
    for (let [char, degree] of inDegree) {
        if (degree === 0) queue.push(char);
    }
    
    let result = "";
    while (queue.length > 0) {
        const char = queue.shift();
        result += char;
        
        for (let neighbor of graph.get(char)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return result.length === inDegree.size ? result : "";
}
```

#### Problem 39: Swim in Rising Water

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
function swimInWater(grid) {
    const n = grid.length;
    const visited = Array(n).fill(null).map(() => Array(n).fill(false));
    const pq = [[grid[0][0], 0, 0]]; // [elevation, row, col]
    visited[0][0] = true;
    
    const directions = [[0,1], [1,0], [0,-1], [-1,0]];
    
    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [time, r, c] = pq.shift();
        
        if (r === n - 1 && c === n - 1) return time;
        
        for (let [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && 
                !visited[nr][nc]) {
                visited[nr][nc] = true;
                pq.push([Math.max(time, grid[nr][nc]), nr, nc]);
            }
        }
    }
    
    return -1;
}
```

#### Problem 40: Bus Routes

```javascript
/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
function numBusesToDestination(routes, source, target) {
    if (source === target) return 0;
    
    const stopToBuses = new Map();
    
    for (let i = 0; i < routes.length; i++) {
        for (let stop of routes[i]) {
            if (!stopToBuses.has(stop)) {
                stopToBuses.set(stop, []);
            }
            stopToBuses.get(stop).push(i);
        }
    }
    
    const visitedBuses = new Set();
    const visitedStops = new Set([source]);
    const queue = [source];
    let buses = 0;
    
    while (queue.length > 0) {
        const size = queue.length;
        buses++;
        
        for (let i = 0; i < size; i++) {
            const stop = queue.shift();
            
            for (let bus of stopToBuses.get(stop) || []) {
                if (visitedBuses.has(bus)) continue;
                visitedBuses.add(bus);
                
                for (let nextStop of routes[bus]) {
                    if (nextStop === target) return buses;
                    
                    if (!visitedStops.has(nextStop)) {
                        visitedStops.add(nextStop);
                        queue.push(nextStop);
                    }
                }
            }
        }
    }
    
    return -1;
}
```

#### Problem 41: Minimum Cost to Connect All Points (MST)

```javascript
/**
 * @param {number[][]} points
 * @return {number}
 */
function minCostConnectPoints(points) {
    const n = points.length;
    const visited = new Set();
    const pq = [[0, 0]]; // [cost, point]
    let totalCost = 0;
    
    while (visited.size < n) {
        pq.sort((a, b) => a[0] - b[0]);
        const [cost, point] = pq.shift();
        
        if (visited.has(point)) continue;
        
        visited.add(point);
        totalCost += cost;
        
        for (let i = 0; i < n; i++) {
            if (!visited.has(i)) {
                const distance = Math.abs(points[point][0] - points[i][0]) +
                               Math.abs(points[point][1] - points[i][1]);
                pq.push([distance, i]);
            }
        }
    }
    
    return totalCost;
}
```

#### Problem 42: Shortest Path Visiting All Nodes

```javascript
/**
 * @param {number[][]} graph
 * @return {number}
 */
function shortestPathLength(graph) {
    const n = graph.length;
    const target = (1 << n) - 1;
    const queue = [];
    const visited = new Set();
    
    // Start from each node
    for (let i = 0; i < n; i++) {
        const state = 1 << i;
        queue.push([i, state, 0]);
        visited.add(`${i},${state}`);
    }
    
    while (queue.length > 0) {
        const [node, state, dist] = queue.shift();
        
        if (state === target) return dist;
        
        for (let neighbor of graph[node]) {
            const newState = state | (1 << neighbor);
            const key = `${neighbor},${newState}`;
            
            if (!visited.has(key)) {
                visited.add(key);
                queue.push([neighbor, newState, dist + 1]);
            }
        }
    }
    
    return -1;
}
```

#### Problem 43: Find All People With Secret

```javascript
/**
 * @param {number} n
 * @param {number[][]} meetings
 * @param {number} firstPerson
 * @return {number[]}
 */
function findAllPeople(n, meetings, firstPerson) {
    const knows = new Set([0, firstPerson]);
    
    // Sort meetings by time
    meetings.sort((a, b) => a[2] - b[2]);
    
    let i = 0;
    while (i < meetings.length) {
        const currentTime = meetings[i][2];
        const graph = new Map();
        const people = new Set();
        
        // Group meetings at same time
        while (i < meetings.length && meetings[i][2] === currentTime) {
            const [x, y] = meetings[i];
            
            if (!graph.has(x)) graph.set(x, []);
            if (!graph.has(y)) graph.set(y, []);
            
            graph.get(x).push(y);
            graph.get(y).push(x);
            
            people.add(x);
            people.add(y);
            i++;
        }
        
        // BFS to spread secret
        const queue = [];
        for (let person of people) {
            if (knows.has(person)) {
                queue.push(person);
            }
        }
        
        while (queue.length > 0) {
            const person = queue.shift();
            
            for (let neighbor of graph.get(person) || []) {
                if (!knows.has(neighbor)) {
                    knows.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    }
    
    return Array.from(knows);
}
```

#### Problem 44: Reorder Routes to Make All Paths Lead to City Zero

```javascript
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
function minReorder(n, connections) {
    const graph = Array(n).fill(null).map(() => []);
    const roads = new Set();
    
    for (let [a, b] of connections) {
        graph[a].push(b);
        graph[b].push(a);
        roads.add(`${a},${b}`);
    }
    
    let changes = 0;
    const visited = new Set([0]);
    const queue = [0];
    
    while (queue.length > 0) {
        const city = queue.shift();
        
        for (let neighbor of graph[city]) {
            if (!visited.has(neighbor)) {
                // If road goes away from 0, we need to reverse it
                if (roads.has(`${city},${neighbor}`)) {
                    changes++;
                }
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return changes;
}
```

#### Problem 45: Maximum Number of K-Divisible Components

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} values
 * @param {number} k
 * @return {number}
 */
function maxKDivisibleComponents(n, edges, values, k) {
    const graph = Array(n).fill(null).map(() => []);
    
    for (let [a, b] of edges) {
        graph[a].push(b);
        graph[b].push(a);
    }
    
    let components = 0;
    
    function dfs(node, parent) {
        let sum = values[node];
        
        for (let neighbor of graph[node]) {
            if (neighbor !== parent) {
                sum += dfs(neighbor, node);
            }
        }
        
        if (sum % k === 0) {
            components++;
            return 0;
        }
        
        return sum;
    }
    
    dfs(0, -1);
    return components;
}
```

#### Problem 46: Minimum Number of Days to Disconnect Island

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
function minDays(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    
    function countIslands() {
        const visited = Array(rows).fill(null)
            .map(() => Array(cols).fill(false));
        let count = 0;
        
        function dfs(r, c) {
            if (r < 0 || r >= rows || c < 0 || c >= cols || 
                visited[r][c] || grid[r][c] === 0) {
                return;
            }
            
            visited[r][c] = true;
            dfs(r + 1, c);
            dfs(r - 1, c);
            dfs(r, c + 1);
            dfs(r, c - 1);
        }
        
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === 1 && !visited[r][c]) {
                    count++;
                    dfs(r, c);
                }
            }
        }
        
        return count;
    }
    
    // Already disconnected
    if (countIslands() !== 1) return 0;
    
    // Try removing each cell
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                grid[r][c] = 0;
                if (countIslands() !== 1) return 1;
                grid[r][c] = 1;
            }
        }
    }
    
    return 2;
}
```

#### Problem 47: Count Sub Islands

```javascript
/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
function countSubIslands(grid1, grid2) {
    const rows = grid1.length;
    const cols = grid1[0].length;
    let count = 0;
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid2[r][c] === 0) {
            return true;
        }
        
        grid2[r][c] = 0;
        
        let isSub = grid1[r][c] === 1;
        
        isSub = dfs(r + 1, c) && isSub;
        isSub = dfs(r - 1, c) && isSub;
        isSub = dfs(r, c + 1) && isSub;
        isSub = dfs(r, c - 1) && isSub;
        
        return isSub;
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid2[r][c] === 1) {
                if (dfs(r, c)) {
                    count++;
                }
            }
        }
    }
    
    return count;
}
```

#### Problem 48: Largest Color Value in a Directed Graph

```javascript
/**
 * @param {string} colors
 * @param {number[][]} edges
 * @return {number}
 */
function largestPathValue(colors, edges) {
    const n = colors.length;
    const graph = Array(n).fill(null).map(() => []);
    const inDegree = Array(n).fill(0);
    
    for (let [u, v] of edges) {
        graph[u].push(v);
        inDegree[v]++;
    }
    
    // Topological sort with DP
    const queue = [];
    const count = Array(n).fill(null)
        .map(() => Array(26).fill(0));
    
    for (let i = 0; i < n; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
            count[i][colors.charCodeAt(i) - 97] = 1;
        }
    }
    
    let processed = 0;
    let maxValue = 0;
    
    while (queue.length > 0) {
        const u = queue.shift();
        processed++;
        maxValue = Math.max(maxValue, ...count[u]);
        
        for (let v of graph[u]) {
            // Update color counts
            for (let c = 0; c < 26; c++) {
                count[v][c] = Math.max(
                    count[v][c],
                    count[u][c] + (colors.charCodeAt(v) - 97 === c ? 1 : 0)
                );
            }
            
            inDegree[v]--;
            if (inDegree[v] === 0) {
                queue.push(v);
            }
        }
    }
    
    // Check for cycle
    return processed === n ? maxValue : -1;
}
```

#### Problem 49: Second Minimum Time to Reach Destination

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} time
 * @param {number} change
 * @return {number}
 */
function secondMinimum(n, edges, time, change) {
    const graph = Array(n + 1).fill(null).map(() => []);
    
    for (let [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }
    
    const dist = Array(n + 1).fill(null).map(() => []);
    const queue = [[1, 0]]; // [node, time]
    
    while (queue.length > 0) {
        const [node, currTime] = queue.shift();
        
        // Calculate next time considering traffic lights
        let nextTime = currTime + time;
        const cycle = Math.floor(currTime / change);
        if (cycle % 2 === 1) {
            nextTime = (cycle + 1) * change + time;
        }
        
        for (let neighbor of graph[node]) {
            if (dist[neighbor].length === 0 || 
                (dist[neighbor].length === 1 && 
                 dist[neighbor][0] !== nextTime)) {
                
                dist[neighbor].push(nextTime);
                queue.push([neighbor, nextTime]);
                
                if (neighbor === n && dist[neighbor].length === 2) {
                    return Math.max(...dist[neighbor]);
                }
            }
        }
    }
    
    return -1;
}
```

#### Problem 50: Minimum Obstacle Removal to Reach Corner

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
function minimumObstacles(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const distances = Array(rows).fill(null)
        .map(() => Array(cols).fill(Infinity));
    
    const deque = [[0, 0, 0]]; // [obstacles, row, col]
    distances[0][0] = 0;
    const directions = [[0,1], [1,0], [0,-1], [-1,0]];
    
    while (deque.length > 0) {
        const [obstacles, r, c] = deque.shift();
        
        if (r === rows - 1 && c === cols - 1) return obstacles;
        
        for (let [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                const newObstacles = obstacles + grid[nr][nc];
                
                if (newObstacles < distances[nr][nc]) {
                    distances[nr][nc] = newObstacles;
                    
                    if (grid[nr][nc] === 0) {
                        deque.unshift([newObstacles, nr, nc]);
                    } else {
                        deque.push([newObstacles, nr, nc]);
                    }
                }
            }
        }
    }
    
    return distances[rows - 1][cols - 1];
}
```

---

## Problem-Solving Patterns

### Pattern 1: When to Use BFS vs DFS

**Use BFS when:**
- Finding shortest path in unweighted graph
- Level-order traversal
- Finding nearest/closest node
- Multiple sources spreading simultaneously

**Use DFS when:**
- Detecting cycles
- Topological sort
- Path existence checks
- Exploring all possible paths
- Backtracking problems

### Pattern 2: Graph Coloring (Bipartite Check)
- Use 2 colors
- BFS/DFS to color neighbors with opposite color
- If conflict found, not bipartite

### Pattern 3: Union-Find for:
- Detecting cycles in undirected graphs
- Finding connected components
- Minimum spanning tree (Kruskal's)
- Dynamic connectivity

### Pattern 4: Topological Sort for:
- Task scheduling with dependencies
- Course prerequisites
- Build systems
- Detecting cycles in DAG

### Pattern 5: Dijkstra for:
- Shortest path with non-negative weights
- Network routing
- Minimum cost problems

### Pattern 6: Matrix as Graph
- Treat cells as vertices
- Adjacency = 4 or 8 directions
- Use BFS/DFS with boundary checks

---

## Time Complexity Cheat Sheet

| Algorithm | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| BFS | O(V + E) | O(V) |
| DFS | O(V + E) | O(V) |
| Dijkstra | O((V + E) log V) | O(V) |
| Bellman-Ford | O(V × E) | O(V) |
| Floyd-Warshall | O(V³) | O(V²) |
| Kruskal's MST | O(E log E) | O(V) |
| Prim's MST | O(E log V) | O(V) |
| Topological Sort | O(V + E) | O(V) |
| Union-Find | O(α(n)) ≈ O(1) | O(n) |

---

## Tips for Solving Graph Problems

1. **Identify the Graph**: Is it directed/undirected? Weighted/unweighted?

2. **Choose Representation**: 
   - Dense graph → Matrix
   - Sparse graph → List

3. **Edge Cases**:
   - Empty graph
   - Disconnected components
   - Self-loops
   - Negative cycles

4. **Optimization Techniques**:
   - Memoization for repeated subproblems
   - Pruning for early termination
   - Bidirectional search for shortest paths

5. **Common Mistakes**:
   - Forgetting to mark nodes as visited
   - Not handling disconnected graphs
   - Incorrect cycle detection
   - Missing edge case checks

---

## Practice Resources

- **LeetCode**: Graph tag problems
- **HackerRank**: Graph Theory section
- **Codeforces**: Graph problems by difficulty
- **GeeksforGeeks**: Graph data structure tutorials

## Conclusion

Master these concepts and problems, and you'll be able to solve any graph-related challenge. Practice regularly, understand the patterns, and always visualize the graph before coding!

---

**Happy Coding! 🚀**


