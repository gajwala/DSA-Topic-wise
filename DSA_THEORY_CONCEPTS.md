
# 📚 Complete DSA Theory & Concepts Guide

## Table of Contents
1. [Graphs Theory](#1-graphs-theory)
2. [Trees Theory](#2-trees-theory)
3. [Linked Lists Theory](#3-linked-lists-theory)
4. [Sliding Window Pattern](#4-sliding-window-pattern)
5. [Two Pointers Pattern](#5-two-pointers-pattern)

---

# 1. Graphs Theory

## 1.1 What is a Graph?

A **graph** is a non-linear data structure consisting of:
- **Vertices (Nodes)**: The fundamental units
- **Edges**: Connections between vertices

### Visual Representation
```
    A ---- B
    |      |
    |      |
    C ---- D
```

## 1.2 Types of Graphs

### 1.2.1 Based on Direction

#### **Undirected Graph**
Edges have no direction (bidirectional).
```
A --- B    (A can go to B, B can go to A)
```

#### **Directed Graph (Digraph)**
Edges have direction (one-way).
```
A ---> B   (A can go to B, but B cannot go to A)
```

### 1.2.2 Based on Weight

#### **Weighted Graph**
Edges have weights/costs.
```
    5
A ----- B
 \     /
8 \   / 3
   \ /
    C
```

#### **Unweighted Graph**
All edges have same weight (usually 1).
```
A --- B --- C
```

### 1.2.3 Special Types

#### **Cyclic Graph**
Contains at least one cycle (path that starts and ends at same vertex).
```
A ---> B
^      |
|      v
D <--- C
```

#### **Acyclic Graph**
No cycles exist.
```
A ---> B ---> C
       |
       v
       D
```

#### **Connected Graph**
Path exists between every pair of vertices.

#### **Disconnected Graph**
Some vertices are not reachable from others.

#### **Complete Graph**
Every vertex is connected to every other vertex.
```
    A
   /|\
  / | \
 B--+--C
  \ | /
   \|/
    D
```

## 1.3 Graph Representation

### 1.3.1 Adjacency Matrix
2D array where matrix[i][j] = 1 if edge exists from i to j.

**Pros**: O(1) edge lookup, simple implementation  
**Cons**: O(V²) space, even for sparse graphs

```javascript
// For graph: A-B, A-C, B-C
const matrix = [
  //A  B  C
  [ 0, 1, 1 ],  // A
  [ 1, 0, 1 ],  // B
  [ 1, 1, 0 ]   // C
];

// Weighted graph
const weightedMatrix = [
  //A  B   C
  [ 0, 5,  3 ],  // A
  [ 5, 0,  2 ],  // B
  [ 3, 2,  0 ]   // C
];
```

### 1.3.2 Adjacency List
Array/Map of lists, where each vertex stores list of adjacent vertices.

**Pros**: O(V+E) space, efficient for sparse graphs  
**Cons**: O(V) to check if edge exists

```javascript
// Using Map
const graph = new Map();
graph.set('A', ['B', 'C']);
graph.set('B', ['A', 'C']);
graph.set('C', ['A', 'B']);

// Using Object
const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'C'],
  'C': ['A', 'B']
};

// Weighted graph with [neighbor, weight]
const weightedGraph = {
  'A': [['B', 5], ['C', 3]],
  'B': [['A', 5], ['C', 2]],
  'C': [['A', 3], ['B', 2]]
};
```

### 1.3.3 Edge List
Array of all edges.

```javascript
const edges = [
  ['A', 'B'],
  ['A', 'C'],
  ['B', 'C']
];

// Weighted
const weightedEdges = [
  ['A', 'B', 5],
  ['A', 'C', 3],
  ['B', 'C', 2]
];
```

## 1.4 Graph Traversal Algorithms

### 1.4.1 Depth-First Search (DFS)

**Concept**: Explore as far as possible along each branch before backtracking.

**Traversal Order**: Deep first, then wide
```
      1
     / \
    2   5
   / \
  3   4
DFS: 1 → 2 → 3 → 4 → 5
```

**Implementation Techniques**:
1. Recursive (uses call stack)
2. Iterative (uses explicit stack)

**Time**: O(V + E) | **Space**: O(V)

```javascript
// Recursive DFS
function dfsRecursive(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  
  for (let neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited);
    }
  }
}

// Iterative DFS
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  
  while (stack.length > 0) {
    const node = stack.pop();
    
    if (!visited.has(node)) {
      visited.add(node);
      console.log(node);
      
      // Add neighbors in reverse order for correct traversal
      for (let i = graph[node].length - 1; i >= 0; i--) {
        if (!visited.has(graph[node][i])) {
          stack.push(graph[node][i]);
        }
      }
    }
  }
}
```

**When to Use DFS**:
- ✅ Finding path between two nodes
- ✅ Detecting cycles
- ✅ Topological sorting
- ✅ Finding connected components
- ✅ Solving maze problems
- ✅ Backtracking problems

### 1.4.2 Breadth-First Search (BFS)

**Concept**: Explore all neighbors at current depth before moving to next depth.

**Traversal Order**: Level by level
```
      1
     / \
    2   3
   / \
  4   5
BFS: 1 → 2 → 3 → 4 → 5
```

**Implementation**: Always uses Queue

**Time**: O(V + E) | **Space**: O(V)

```javascript
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);
    
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

// BFS for shortest path
function bfsShortestPath(graph, start, end) {
  const visited = new Set();
  const queue = [[start, [start]]]; // [node, path]
  visited.add(start);
  
  while (queue.length > 0) {
    const [node, path] = queue.shift();
    
    if (node === end) return path;
    
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  
  return null; // No path found
}
```

**When to Use BFS**:
- ✅ Finding shortest path (unweighted graph)
- ✅ Level-order traversal
- ✅ Finding all nodes at distance k
- ✅ Testing if graph is bipartite
- ✅ Finding minimum spanning tree (for unweighted graphs)

### 1.4.3 DFS vs BFS Comparison

| Aspect | DFS | BFS |
|--------|-----|-----|
| Data Structure | Stack (or recursion) | Queue |
| Memory | Less (O(h) for height) | More (O(w) for width) |
| Shortest Path | ❌ No | ✅ Yes (unweighted) |
| Implementation | Simpler (recursive) | Needs queue |
| Use Case | Explore all paths | Level-by-level |

## 1.5 Advanced Graph Algorithms

### 1.5.1 Dijkstra's Algorithm (Shortest Path)

**Purpose**: Find shortest path from source to all vertices (weighted graph, non-negative weights).

**Time**: O((V + E) log V) with min-heap | **Space**: O(V)

```javascript
function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const pq = new MinPriorityQueue();
  
  // Initialize distances
  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  pq.enqueue(start, 0);
  
  while (!pq.isEmpty()) {
    const { element: node } = pq.dequeue();
    
    if (visited.has(node)) continue;
    visited.add(node);
    
    for (let [neighbor, weight] of graph[node]) {
      const newDist = distances[node] + weight;
      
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.enqueue(neighbor, newDist);
      }
    }
  }
  
  return distances;
}
```

### 1.5.2 Bellman-Ford Algorithm

**Purpose**: Find shortest path with negative weights, detect negative cycles.

**Time**: O(V × E) | **Space**: O(V)

```javascript
function bellmanFord(graph, start, V) {
  const distances = Array(V).fill(Infinity);
  distances[start] = 0;
  
  // Relax edges V-1 times
  for (let i = 0; i < V - 1; i++) {
    for (let [u, v, weight] of graph) {
      if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
        distances[v] = distances[u] + weight;
      }
    }
  }
  
  // Check for negative cycles
  for (let [u, v, weight] of graph) {
    if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
      return "Negative cycle detected";
    }
  }
  
  return distances;
}
```

### 1.5.3 Floyd-Warshall Algorithm

**Purpose**: Find shortest paths between all pairs of vertices.

**Time**: O(V³) | **Space**: O(V²)

```javascript
function floydWarshall(graph, V) {
  const dist = Array(V).fill(null).map(() => Array(V).fill(Infinity));
  
  // Initialize with direct edges
  for (let i = 0; i < V; i++) {
    dist[i][i] = 0;
  }
  
  for (let [u, v, weight] of graph) {
    dist[u][v] = weight;
  }
  
  // Try all intermediate vertices
  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  
  return dist;
}
```

### 1.5.4 Topological Sort

**Purpose**: Linear ordering of vertices in DAG (Directed Acyclic Graph).

**Time**: O(V + E) | **Space**: O(V)

```javascript
// Using DFS
function topologicalSort(graph, V) {
  const visited = new Set();
  const stack = [];
  
  function dfs(node) {
    visited.add(node);
    
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
    
    stack.push(node);
  }
  
  for (let node in graph) {
    if (!visited.has(node)) {
      dfs(node);
    }
  }
  
  return stack.reverse();
}

// Using Kahn's Algorithm (BFS)
function topologicalSortKahn(graph, V) {
  const inDegree = Array(V).fill(0);
  const queue = [];
  const result = [];
  
  // Calculate in-degrees
  for (let node in graph) {
    for (let neighbor of graph[node]) {
      inDegree[neighbor]++;
    }
  }
  
  // Add nodes with in-degree 0
  for (let i = 0; i < V; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    
    for (let neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  return result.length === V ? result : []; // Empty if cycle exists
}
```

### 1.5.5 Union Find (Disjoint Set)

**Purpose**: Track set of elements partitioned into disjoint subsets.

**Time**: O(α(n)) ≈ O(1) amortized | **Space**: O(V)

```javascript
class UnionFind {
  constructor(size) {
    this.parent = Array(size).fill(0).map((_, i) => i);
    this.rank = Array(size).fill(0);
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
  
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}
```

**Applications**:
- Detecting cycles in undirected graphs
- Kruskal's MST algorithm
- Finding connected components
- Network connectivity

### 1.5.6 Minimum Spanning Tree (MST)

#### Kruskal's Algorithm

**Concept**: Add edges in increasing weight order, skip if creates cycle.

**Time**: O(E log E) | **Space**: O(V)

```javascript
function kruskal(edges, V) {
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);
  
  const uf = new UnionFind(V);
  const mst = [];
  let totalWeight = 0;
  
  for (let [u, v, weight] of edges) {
    if (uf.union(u, v)) {
      mst.push([u, v, weight]);
      totalWeight += weight;
    }
  }
  
  return { mst, totalWeight };
}
```

#### Prim's Algorithm

**Concept**: Start from a vertex, always add minimum weight edge connecting to tree.

**Time**: O(E log V) | **Space**: O(V)

```javascript
function prim(graph, start) {
  const visited = new Set();
  const pq = new MinPriorityQueue();
  const mst = [];
  let totalWeight = 0;
  
  pq.enqueue([start, null, 0], 0); // [node, parent, weight]
  
  while (!pq.isEmpty()) {
    const { element: [node, parent, weight] } = pq.dequeue();
    
    if (visited.has(node)) continue;
    visited.add(node);
    
    if (parent !== null) {
      mst.push([parent, node, weight]);
      totalWeight += weight;
    }
    
    for (let [neighbor, edgeWeight] of graph[node]) {
      if (!visited.has(neighbor)) {
        pq.enqueue([neighbor, node, edgeWeight], edgeWeight);
      }
    }
  }
  
  return { mst, totalWeight };
}
```

## 1.6 Graph Problem Patterns

### Pattern 1: Island Problems (Connected Components)
```javascript
function numIslands(grid) {
  let count = 0;
  
  function dfs(i, j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || 
        grid[i][j] === '0') return;
    
    grid[i][j] = '0'; // Mark as visited
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  
  return count;
}
```

### Pattern 2: Cycle Detection

```javascript
// Undirected Graph
function hasCycleUndirected(graph, V) {
  const visited = new Set();
  
  function dfs(node, parent) {
    visited.add(node);
    
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true; // Cycle found
      }
    }
    
    return false;
  }
  
  for (let node in graph) {
    if (!visited.has(node)) {
      if (dfs(node, -1)) return true;
    }
  }
  
  return false;
}

// Directed Graph
function hasCycleDirected(graph) {
  const visited = new Set();
  const recStack = new Set();
  
  function dfs(node) {
    visited.add(node);
    recStack.add(node);
    
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true; // Back edge found
      }
    }
    
    recStack.delete(node);
    return false;
  }
  
  for (let node in graph) {
    if (!visited.has(node)) {
      if (dfs(node)) return true;
    }
  }
  
  return false;
}
```

### Pattern 3: Bipartite Graph Check

```javascript
function isBipartite(graph) {
  const colors = new Map();
  
  function bfs(start) {
    const queue = [start];
    colors.set(start, 0);
    
    while (queue.length > 0) {
      const node = queue.shift();
      
      for (let neighbor of graph[node]) {
        if (!colors.has(neighbor)) {
          colors.set(neighbor, 1 - colors.get(node));
          queue.push(neighbor);
        } else if (colors.get(neighbor) === colors.get(node)) {
          return false;
        }
      }
    }
    
    return true;
  }
  
  for (let node in graph) {
    if (!colors.has(node)) {
      if (!bfs(node)) return false;
    }
  }
  
  return true;
}
```

## 1.7 Graph Algorithm Selection Guide

| Problem Type | Algorithm | Time Complexity |
|-------------|-----------|-----------------|
| Shortest path (unweighted) | BFS | O(V + E) |
| Shortest path (weighted, non-negative) | Dijkstra | O((V+E) log V) |
| Shortest path (with negative weights) | Bellman-Ford | O(VE) |
| All pairs shortest path | Floyd-Warshall | O(V³) |
| Minimum spanning tree | Kruskal/Prim | O(E log E) / O(E log V) |
| Topological sort | DFS / Kahn's | O(V + E) |
| Cycle detection | DFS | O(V + E) |
| Connected components | DFS / Union Find | O(V + E) |
| Bipartite check | BFS with coloring | O(V + E) |

---

# 2. Trees Theory

## 2.1 What is a Tree?

A **tree** is a hierarchical data structure consisting of nodes connected by edges, with:
- One **root** node (top)
- **Parent-child** relationships
- No cycles

### Visual Representation
```
        10        ← Root
       /  \
      5    15     ← Internal nodes
     / \   / \
    3   7 12 20   ← Leaf nodes
```

## 2.2 Tree Terminology

- **Root**: Topmost node
- **Parent**: Node with children
- **Child**: Node connected below parent
- **Leaf/External Node**: Node with no children
- **Internal Node**: Node with at least one child
- **Edge**: Connection between two nodes
- **Path**: Sequence of nodes and edges
- **Height**: Longest path from node to leaf
- **Depth**: Path length from root to node
- **Level**: Depth + 1
- **Subtree**: Tree formed by node and its descendants
- **Degree**: Number of children of a node

```
        1          Level 0 (Height = 2)
       / \
      2   3        Level 1 (Height = 1)
     / \
    4   5          Level 2 (Height = 0, Leaves)
```

## 2.3 Types of Trees

### 2.3.1 Binary Tree

Each node has **at most 2 children** (left and right).

```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
```

**Types**:

#### Full Binary Tree
Every node has 0 or 2 children.
```
        1
       / \
      2   3
     / \
    4   5
```

#### Complete Binary Tree
All levels filled except possibly last, filled left to right.
```
        1
       / \
      2   3
     / \  /
    4  5 6
```

#### Perfect Binary Tree
All internal nodes have 2 children, all leaves at same level.
```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

#### Balanced Binary Tree
Height difference between left and right subtrees ≤ 1 for all nodes.
```
        1
       / \
      2   3
     /
    4
Height difference: |1-0| = 1 ✓
```

#### Degenerate/Skewed Tree
Each parent has only one child (like linked list).
```
    1
     \
      2
       \
        3
         \
          4
```

### 2.3.2 Binary Search Tree (BST)

Binary tree with ordering property:
- **Left subtree** < Node < **Right subtree**

```
        10
       /  \
      5    15
     / \   / \
    3   7 12 20
```

**Operations**:

```javascript
class BST {
  constructor() {
    this.root = null;
  }
  
  // Insert: O(log n) average, O(n) worst
  insert(val) {
    const newNode = new TreeNode(val);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) {
          curr.left = newNode;
          return;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = newNode;
          return;
        }
        curr = curr.right;
      }
    }
  }
  
  // Search: O(log n) average, O(n) worst
  search(val) {
    let curr = this.root;
    
    while (curr) {
      if (val === curr.val) return true;
      curr = val < curr.val ? curr.left : curr.right;
    }
    
    return false;
  }
  
  // Delete: O(log n) average, O(n) worst
  delete(val) {
    this.root = this.deleteNode(this.root, val);
  }
  
  deleteNode(node, val) {
    if (!node) return null;
    
    if (val < node.val) {
      node.left = this.deleteNode(node.left, val);
    } else if (val > node.val) {
      node.right = this.deleteNode(node.right, val);
    } else {
      // Node found
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      
      // Node has two children
      let minRight = this.findMin(node.right);
      node.val = minRight.val;
      node.right = this.deleteNode(node.right, minRight.val);
    }
    
    return node;
  }
  
  findMin(node) {
    while (node.left) node = node.left;
    return node;
  }
}
```

### 2.3.3 AVL Tree (Self-Balancing BST)

BST where height difference between left and right subtrees ≤ 1.

**Balance Factor**: height(left) - height(right)
- Must be -1, 0, or 1

**Rotations**:

```javascript
// Left Rotation
function leftRotate(x) {
  const y = x.right;
  x.right = y.left;
  y.left = x;
  
  updateHeight(x);
  updateHeight(y);
  
  return y;
}

// Right Rotation
function rightRotate(y) {
  const x = y.left;
  y.left = x.right;
  x.right = y;
  
  updateHeight(y);
  updateHeight(x);
  
  return x;
}

// Get balance factor
function getBalance(node) {
  if (!node) return 0;
  return height(node.left) - height(node.right);
}

// AVL Insert
function insertAVL(node, val) {
  // Standard BST insert
  if (!node) return new TreeNode(val);
  
  if (val < node.val) {
    node.left = insertAVL(node.left, val);
  } else if (val > node.val) {
    node.right = insertAVL(node.right, val);
  } else {
    return node; // Duplicate
  }
  
  updateHeight(node);
  
  const balance = getBalance(node);
  
  // Left-Left case
  if (balance > 1 && val < node.left.val) {
    return rightRotate(node);
  }
  
  // Right-Right case
  if (balance < -1 && val > node.right.val) {
    return leftRotate(node);
  }
  
  // Left-Right case
  if (balance > 1 && val > node.left.val) {
    node.left = leftRotate(node.left);
    return rightRotate(node);
  }
  
  // Right-Left case
  if (balance < -1 && val < node.right.val) {
    node.right = rightRotate(node.right);
    return leftRotate(node);
  }
  
  return node;
}
```

### 2.3.4 Heap (Binary Heap)

Complete binary tree with heap property:
- **Max Heap**: Parent ≥ Children
- **Min Heap**: Parent ≤ Children

```
Max Heap:          Min Heap:
    100               1
   /   \            /   \
  50   70          3     2
 / \   /          / \   /
20 30 60         7  5  4
```

**Array Representation**:
- Parent at index `i`
- Left child at `2i + 1`
- Right child at `2i + 2`
- Parent of child at `i` is `⌊(i-1)/2⌋`

```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  parent(i) { return Math.floor((i - 1) / 2); }
  leftChild(i) { return 2 * i + 1; }
  rightChild(i) { return 2 * i + 2; }
  
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  
  // Insert: O(log n)
  insert(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }
  
  bubbleUp(index) {
    while (index > 0) {
      const parentIdx = this.parent(index);
      if (this.heap[parentIdx] <= this.heap[index]) break;
      
      this.swap(parentIdx, index);
      index = parentIdx;
    }
  }
  
  // Extract Min: O(log n)
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    
    return min;
  }
  
  bubbleDown(index) {
    while (true) {
      let minIdx = index;
      const left = this.leftChild(index);
      const right = this.rightChild(index);
      
      if (left < this.heap.length && this.heap[left] < this.heap[minIdx]) {
        minIdx = left;
      }
      
      if (right < this.heap.length && this.heap[right] < this.heap[minIdx]) {
        minIdx = right;
      }
      
      if (minIdx === index) break;
      
      this.swap(index, minIdx);
      index = minIdx;
    }
  }
  
  // Peek: O(1)
  peek() {
    return this.heap[0];
  }
  
  size() {
    return this.heap.length;
  }
}
```

### 2.3.5 Trie (Prefix Tree)

Tree for storing strings, each node represents a character.

```
     root
    /  |  \
   c   d   t
  /    |    \
 a     o     o
 |     |
 t     g

Words: "cat", "dog", "to"
```

```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  // Insert: O(m) where m = word length
  insert(word) {
    let node = this.root;
    
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    
    node.isEndOfWord = true;
  }
  
  // Search: O(m)
  search(word) {
    let node = this.root;
    
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    
    return node.isEndOfWord;
  }
  
  // Starts With: O(m)
  startsWith(prefix) {
    let node = this.root;
    
    for (let char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    
    return true;
  }
}
```

## 2.4 Tree Traversals

### 2.4.1 Depth-First Traversals

#### **Inorder (Left → Root → Right)**
For BST: Gives sorted order

```javascript
function inorder(root, result = []) {
  if (!root) return result;
  
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  
  return result;
}

// Iterative
function inorderIterative(root) {
  const result = [];
  const stack = [];
  let curr = root;
  
  while (curr || stack.length > 0) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    
    curr = stack.pop();
    result.push(curr.val);
    curr = curr.right;
  }
  
  return result;
}
```

#### **Preorder (Root → Left → Right)**
Used for: Tree copying, expression tree

```javascript
function preorder(root, result = []) {
  if (!root) return result;
  
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  
  return result;
}

// Iterative
function preorderIterative(root) {
  if (!root) return [];
  
  const result = [];
  const stack = [root];
  
  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);
    
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  
  return result;
}
```

#### **Postorder (Left → Right → Root)**
Used for: Tree deletion, expression evaluation

```javascript
function postorder(root, result = []) {
  if (!root) return result;
  
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);
  
  return result;
}

// Iterative (using two stacks)
function postorderIterative(root) {
  if (!root) return [];
  
  const result = [];
  const stack1 = [root];
  const stack2 = [];
  
  while (stack1.length > 0) {
    const node = stack1.pop();
    stack2.push(node);
    
    if (node.left) stack1.push(node.left);
    if (node.right) stack1.push(node.right);
  }
  
  while (stack2.length > 0) {
    result.push(stack2.pop().val);
  }
  
  return result;
}
```

### 2.4.2 Breadth-First Traversal (Level Order)

```javascript
function levelOrder(root) {
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

### Traversal Comparison

```
Tree:
      1
     / \
    2   3
   / \
  4   5

Inorder:    4 2 5 1 3
Preorder:   1 2 4 5 3
Postorder:  4 5 2 3 1
Level Order: 1 2 3 4 5
```

## 2.5 Common Tree Patterns

### Pattern 1: Tree Height/Depth

```javascript
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

function minDepth(root) {
  if (!root) return 0;
  if (!root.left) return 1 + minDepth(root.right);
  if (!root.right) return 1 + minDepth(root.left);
  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}
```

### Pattern 2: Path Sum

```javascript
function hasPathSum(root, targetSum) {
  if (!root) return false;
  
  if (!root.left && !root.right) {
    return targetSum === root.val;
  }
  
  return hasPathSum(root.left, targetSum - root.val) ||
         hasPathSum(root.right, targetSum - root.val);
}

function pathSum(root, targetSum) {
  const paths = [];
  
  function dfs(node, sum, path) {
    if (!node) return;
    
    path.push(node.val);
    
    if (!node.left && !node.right && sum === node.val) {
      paths.push([...path]);
    }
    
    dfs(node.left, sum - node.val, path);
    dfs(node.right, sum - node.val, path);
    
    path.pop();
  }
  
  dfs(root, targetSum, []);
  return paths;
}
```

### Pattern 3: Lowest Common Ancestor

```javascript
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  
  if (left && right) return root;
  return left || right;
}
```

### Pattern 4: Tree Diameter

```javascript
function diameterOfBinaryTree(root) {
  let diameter = 0;
  
  function height(node) {
    if (!node) return 0;
    
    const left = height(node.left);
    const right = height(node.right);
    
    diameter = Math.max(diameter, left + right);
    
    return 1 + Math.max(left, right);
  }
  
  height(root);
  return diameter;
}
```

### Pattern 5: Validate BST

```javascript
function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    
    if (node.val <= min || node.val >= max) return false;
    
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  }
  
  return validate(root, -Infinity, Infinity);
}
```

### Pattern 6: Serialize & Deserialize

```javascript
function serialize(root) {
  if (!root) return 'null';
  return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);
}

function deserialize(data) {
  const values = data.split(',');
  let i = 0;
  
  function build() {
    if (values[i] === 'null') {
      i++;
      return null;
    }
    
    const node = new TreeNode(parseInt(values[i++]));
    node.left = build();
    node.right = build();
    return node;
  }
  
  return build();
}
```

## 2.6 Tree Time Complexities

| Operation | BST (Avg) | BST (Worst) | AVL | Heap |
|-----------|-----------|-------------|-----|------|
| Search    | O(log n)  | O(n)        | O(log n) | - |
| Insert    | O(log n)  | O(n)        | O(log n) | O(log n) |
| Delete    | O(log n)  | O(n)        | O(log n) | O(log n) |
| Find Min  | O(log n)  | O(n)        | O(log n) | O(1) |
| Find Max  | O(log n)  | O(n)        | O(log n) | O(n) |

---

# 3. Linked Lists Theory

## 3.1 What is a Linked List?

A **linked list** is a linear data structure where elements (nodes) are not stored contiguously but connected via pointers.

### Node Structure
```javascript
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
```

### Visual Representation
```
HEAD → [1|•] → [2|•] → [3|•] → null
        val next
```

## 3.2 Types of Linked Lists

### 3.2.1 Singly Linked List

Each node points to next node only.

```
1 → 2 → 3 → 4 → null
```

```javascript
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // Add at beginning: O(1)
  addFirst(val) {
    const newNode = new ListNode(val);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  
  // Add at end: O(n)
  addLast(val) {
    const newNode = new ListNode(val);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = newNode;
    }
    
    this.size++;
  }
  
  // Delete first: O(1)
  removeFirst() {
    if (!this.head) return null;
    
    const val = this.head.val;
    this.head = this.head.next;
    this.size--;
    
    return val;
  }
  
  // Search: O(n)
  search(val) {
    let curr = this.head;
    
    while (curr) {
      if (curr.val === val) return true;
      curr = curr.next;
    }
    
    return false;
  }
}
```

### 3.2.2 Doubly Linked List

Each node points to both next and previous nodes.

```
null ← [1] ⇄ [2] ⇄ [3] ⇄ [4] → null
      prev val next
```

```javascript
class DoublyListNode {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  
  // Add at beginning: O(1)
  addFirst(val) {
    const newNode = new DoublyListNode(val);
    
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    
    this.size++;
  }
  
  // Add at end: O(1)
  addLast(val) {
    const newNode = new DoublyListNode(val);
    
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
  }
  
  // Remove node: O(1) if node reference given
  removeNode(node) {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    
    this.size--;
  }
}
```

### 3.2.3 Circular Linked List

Last node points back to first node.

```
HEAD → 1 → 2 → 3 → 4 ⟲
       ↑_____________↓
```

```javascript
class CircularLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  addLast(val) {
    const newNode = new ListNode(val);
    
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
    } else {
      let curr = this.head;
      while (curr.next !== this.head) {
        curr = curr.next;
      }
      curr.next = newNode;
      newNode.next = this.head;
    }
    
    this.size++;
  }
}
```

## 3.3 Common Linked List Patterns

### Pattern 1: Two Pointers (Fast & Slow)

#### Find Middle Node
```javascript
function findMiddle(head) {
  let slow = head, fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return slow;
}
```

#### Detect Cycle (Floyd's Algorithm)
```javascript
function hasCycle(head) {
  let slow = head, fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) return true;
  }
  
  return false;
}

function detectCycle(head) {
  let slow = head, fast = head;
  
  // Find meeting point
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) {
      // Find cycle start
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  
  return null;
}
```

### Pattern 2: Reverse Linked List

```javascript
// Iterative: O(n) time, O(1) space
function reverseList(head) {
  let prev = null;
  let curr = head;
  
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  
  return prev;
}

// Recursive: O(n) time, O(n) space
function reverseListRecursive(head) {
  if (!head || !head.next) return head;
  
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  
  return newHead;
}

// Reverse first N nodes
function reverseN(head, n) {
  let prev = null;
  let curr = head;
  let count = 0;
  
  while (curr && count < n) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
    count++;
  }
  
  if (head) head.next = curr;
  
  return prev;
}

// Reverse between positions [left, right]
function reverseBetween(head, left, right) {
  if (!head || left === right) return head;
  
  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;
  
  // Move to position before left
  for (let i = 1; i < left; i++) {
    prev = prev.next;
  }
  
  // Reverse from left to right
  let curr = prev.next;
  for (let i = 0; i < right - left; i++) {
    const next = curr.next;
    curr.next = next.next;
    next.next = prev.next;
    prev.next = next;
  }
  
  return dummy.next;
}
```

### Pattern 3: Merge Lists

```javascript
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy;
  
  while (l1 && l2) {
    if (l1.val < l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }
  
  curr.next = l1 || l2;
  
  return dummy.next;
}

function mergeKLists(lists) {
  if (lists.length === 0) return null;
  
  while (lists.length > 1) {
    const mergedLists = [];
    
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      mergedLists.push(mergeTwoLists(l1, l2));
    }
    
    lists = mergedLists;
  }
  
  return lists[0];
}
```

### Pattern 4: Remove Nodes

```javascript
// Remove nth node from end
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  
  let slow = dummy, fast = dummy;
  
  // Move fast n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }
  
  // Move both until fast reaches end
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }
  
  slow.next = slow.next.next;
  
  return dummy.next;
}

// Remove duplicates from sorted list
function deleteDuplicates(head) {
  let curr = head;
  
  while (curr && curr.next) {
    if (curr.val === curr.next.val) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }
  
  return head;
}

// Remove all duplicates (keep none)
function deleteDuplicatesII(head) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;
  
  while (head) {
    if (head.next && head.val === head.next.val) {
      while (head.next && head.val === head.next.val) {
        head = head.next;
      }
      prev.next = head.next;
    } else {
      prev = prev.next;
    }
    head = head.next;
  }
  
  return dummy.next;
}
```

### Pattern 5: Reorder List

```javascript
function reorderList(head) {
  if (!head || !head.next) return;
  
  // Find middle
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Reverse second half
  let second = slow.next;
  slow.next = null;
  second = reverseList(second);
  
  // Merge two halves
  let first = head;
  while (second) {
    const tmp1 = first.next;
    const tmp2 = second.next;
    
    first.next = second;
    second.next = tmp1;
    
    first = tmp1;
    second = tmp2;
  }
}
```

### Pattern 6: Palindrome Check

```javascript
function isPalindrome(head) {
  if (!head || !head.next) return true;
  
  // Find middle
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Reverse second half
  let second = reverseList(slow);
  let first = head;
  
  // Compare
  while (second) {
    if (first.val !== second.val) return false;
    first = first.next;
    second = second.next;
  }
  
  return true;
}
```

### Pattern 7: Intersection of Lists

```javascript
function getIntersectionNode(headA, headB) {
  let a = headA, b = headB;
  
  while (a !== b) {
    a = a ? a.next : headB;
    b = b ? b.next : headA;
  }
  
  return a;
}
```

### Pattern 8: Copy List with Random Pointer

```javascript
function copyRandomList(head) {
  if (!head) return null;
  
  const map = new Map();
  let curr = head;
  
  // First pass: create all nodes
  while (curr) {
    map.set(curr, new Node(curr.val));
    curr = curr.next;
  }
  
  // Second pass: set next and random pointers
  curr = head;
  while (curr) {
    map.get(curr).next = map.get(curr.next) || null;
    map.get(curr).random = map.get(curr.random) || null;
    curr = curr.next;
  }
  
  return map.get(head);
}
```

## 3.4 Dummy Node Technique

Use dummy node to simplify edge cases (empty list, head changes).

```javascript
function removeElements(head, val) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let curr = dummy;
  
  while (curr.next) {
    if (curr.next.val === val) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }
  
  return dummy.next;
}
```

## 3.5 Linked List vs Array

| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access by index | O(1) | O(n) |
| Search | O(n) | O(n) |
| Insert at beginning | O(n) | O(1) |
| Insert at end | O(1) amortized | O(n) or O(1)* |
| Delete at beginning | O(n) | O(1) |
| Delete at end | O(1) | O(n) or O(1)* |
| Memory | Contiguous | Scattered |
| Cache locality | Good | Poor |

\* O(1) if tail pointer maintained

---

# 4. Sliding Window Pattern

## 4.1 What is Sliding Window?

A technique to efficiently solve problems involving **contiguous subarrays/substrings**.

### Concept
Instead of recalculating for every window from scratch, **slide** the window by:
- Removing element going out
- Adding element coming in

```
Array: [1, 2, 3, 4, 5]
Window size = 3

Window 1: [1, 2, 3] → sum = 6
Window 2: [2, 3, 4] → sum = 6 - 1 + 4 = 9
Window 3: [3, 4, 5] → sum = 9 - 2 + 5 = 12
```

## 4.2 Types of Sliding Window

### 4.2.1 Fixed Size Window

Window size is **constant**.

**Template**:
```javascript
function fixedWindowTemplate(arr, k) {
  let windowSum = 0;
  let maxSum = 0;
  
  // Calculate sum of first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  
  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}
```

**Example: Maximum Sum of Subarray of Size K**
```javascript
function maxSumSubarray(arr, k) {
  let windowSum = 0;
  let maxSum = -Infinity;
  
  for (let i = 0; i < arr.length; i++) {
    windowSum += arr[i];
    
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[i - k + 1];
    }
  }
  
  return maxSum;
}

// Example
maxSumSubarray([2, 1, 5, 1, 3, 2], 3); // 9 (5+1+3)
```

### 4.2.2 Variable Size Window

Window size **changes** based on condition.

**Template**:
```javascript
function variableWindowTemplate(arr) {
  let left = 0;
  let result = 0;
  
  for (let right = 0; right < arr.length; right++) {
    // Add arr[right] to window
    
    while (/* window violates condition */) {
      // Remove arr[left] from window
      left++;
    }
    
    // Update result
    result = Math.max(result, right - left + 1);
  }
  
  return result;
}
```

**Example: Longest Substring with K Distinct Characters**
```javascript
function lengthOfLongestSubstringKDistinct(s, k) {
  const map = new Map();
  let left = 0;
  let maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    // Expand window
    map.set(s[right], (map.get(s[right]) || 0) + 1);
    
    // Shrink window if needed
    while (map.size > k) {
      map.set(s[left], map.get(s[left]) - 1);
      if (map.get(s[left]) === 0) {
        map.delete(s[left]);
      }
      left++;
    }
    
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
}

// Example
lengthOfLongestSubstringKDistinct("eceba", 2); // 3 ("ece")
```

## 4.3 Common Sliding Window Problems

### 4.3.1 Longest Substring Without Repeating Characters

**Time**: O(n) | **Space**: O(min(n, m))

```javascript
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0;
  let maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    if (seen.has(s[right])) {
      left = Math.max(left, seen.get(s[right]) + 1);
    }
    
    seen.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
}
```

### 4.3.2 Minimum Window Substring

**Time**: O(m + n) | **Space**: O(m)

```javascript
function minWindow(s, t) {
  const need = new Map();
  const window = new Map();
  
  for (let c of t) need.set(c, (need.get(c) || 0) + 1);
  
  let left = 0, right = 0;
  let valid = 0;
  let start = 0, minLen = Infinity;
  
  while (right < s.length) {
    const c = s[right++];
    
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) valid++;
    }
    
    while (valid === need.size) {
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }
      
      const d = s[left++];
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) valid--;
        window.set(d, window.get(d) - 1);
      }
    }
  }
  
  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}
```

### 4.3.3 Permutation in String

**Time**: O(n) | **Space**: O(1)

```javascript
function checkInclusion(s1, s2) {
  const need = Array(26).fill(0);
  const window = Array(26).fill(0);
  
  for (let c of s1) need[c.charCodeAt(0) - 97]++;
  
  let left = 0, right = 0;
  let valid = 0;
  
  while (right < s2.length) {
    const c = s2[right++].charCodeAt(0) - 97;
    window[c]++;
    if (window[c] === need[c]) valid++;
    
    while (right - left >= s1.length) {
      if (valid === 26) return true;
      
      const d = s2[left++].charCodeAt(0) - 97;
      if (window[d] === need[d]) valid--;
      window[d]--;
    }
  }
  
  return false;
}
```

### 4.3.4 Maximum Average Subarray

**Time**: O(n) | **Space**: O(1)

```javascript
function findMaxAverage(nums, k) {
  let sum = 0;
  
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }
  
  let maxSum = sum;
  
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, sum);
  }
  
  return maxSum / k;
}
```

### 4.3.5 Longest Repeating Character Replacement

**Time**: O(n) | **Space**: O(1)

```javascript
function characterReplacement(s, k) {
  const count = Array(26).fill(0);
  let left = 0;
  let maxCount = 0;
  let maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    const idx = s[right].charCodeAt(0) - 65;
    count[idx]++;
    maxCount = Math.max(maxCount, count[idx]);
    
    // If window size - max frequency > k, shrink
    while (right - left + 1 - maxCount > k) {
      count[s[left].charCodeAt(0) - 65]--;
      left++;
    }
    
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
}
```

## 4.4 When to Use Sliding Window?

✅ **Use When**:
- Problem involves **contiguous** subarray/substring
- Asked to find **longest/shortest/optimal** subarray
- Problem mentions **window** or **range**

✅ **Keywords**:
- "contiguous subarray"
- "substring"
- "window of size k"
- "longest/shortest substring with..."
- "maximum/minimum sum of subarray"

❌ **Don't Use When**:
- Need non-contiguous elements
- Need to find subsequence (not subarray)
- Problem requires backtracking

## 4.5 Sliding Window Checklist

1. **Identify** if it's fixed or variable size
2. **Initialize** left=0, right=0
3. **Expand** window by moving right
4. **Process** element at right
5. **Shrink** window if condition violated (variable size)
6. **Update** result
7. **Repeat** until right reaches end

---

# 5. Two Pointers Pattern

## 5.1 What is Two Pointers?

A technique using **two pointers** to iterate through data structure, often to reduce time complexity from O(n²) to O(n).

## 5.2 Types of Two Pointers

### 5.2.1 Opposite Direction (Converging)

Pointers start at **both ends** and move towards each other.

```
left →              ← right
[1, 2, 3, 4, 5, 6, 7, 8]
```

**Template**:
```javascript
function oppositeDirection(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    // Process arr[left] and arr[right]
    
    if (/* condition */) {
      left++;
    } else {
      right--;
    }
  }
}
```

**Example: Two Sum II (Sorted Array)**
```javascript
function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  
  return [];
}
```

### 5.2.2 Same Direction (Fast & Slow)

Both pointers move in **same direction** at different speeds.

```
slow →    fast →
[1, 2, 3, 4, 5, 6, 7, 8]
```

**Template**:
```javascript
function sameDirection(arr) {
  let slow = 0;
  let fast = 0;
  
  while (fast < arr.length) {
    // Process arr[fast]
    
    if (/* condition */) {
      arr[slow] = arr[fast];
      slow++;
    }
    
    fast++;
  }
  
  return slow;
}
```

**Example: Remove Duplicates from Sorted Array**
```javascript
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  
  let slow = 0;
  
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  
  return slow + 1;
}
```

### 5.2.3 Fixed Distance

Pointers maintain a **fixed distance** apart.

```
p1 →      p2 →
[1, 2, 3, 4, 5, 6, 7, 8]
   k distance
```

**Example: Remove Nth Node from End**
```javascript
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  
  let first = dummy;
  let second = dummy;
  
  // Move first n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    first = first.next;
  }
  
  // Move both until first reaches end
  while (first) {
    first = first.next;
    second = second.next;
  }
  
  second.next = second.next.next;
  return dummy.next;
}
```

## 5.3 Common Two Pointer Problems

### 5.3.1 Container With Most Water

**Time**: O(n) | **Space**: O(1)

```javascript
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;
  
  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, width * minHeight);
    
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxWater;
}
```

### 5.3.2 Trapping Rain Water

**Time**: O(n) | **Space**: O(1)

```javascript
function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }
  
  return water;
}
```

### 5.3.3 Valid Palindrome

**Time**: O(n) | **Space**: O(1)

```javascript
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    while (left < right && !isAlphanumeric(s[left])) left++;
    while (left < right && !isAlphanumeric(s[right])) right--;
    
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    
    left++;
    right--;
  }
  
  return true;
}

function isAlphanumeric(c) {
  return /[a-zA-Z0-9]/.test(c);
}
```

### 5.3.4 Three Sum

**Time**: O(n²) | **Space**: O(1)

```javascript
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    
    let left = i + 1;
    let right = nums.length - 1;
    
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  
  return result;
}
```

### 5.3.5 Move Zeroes

**Time**: O(n) | **Space**: O(1)

```javascript
function moveZeroes(nums) {
  let slow = 0;
  
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow++;
    }
  }
}
```

### 5.3.6 Sort Colors (Dutch National Flag)

**Time**: O(n) | **Space**: O(1)

```javascript
function sortColors(nums) {
  let left = 0;           // Boundary for 0s
  let right = nums.length - 1;  // Boundary for 2s
  let curr = 0;
  
  while (curr <= right) {
    if (nums[curr] === 0) {
      [nums[left], nums[curr]] = [nums[curr], nums[left]];
      left++;
      curr++;
    } else if (nums[curr] === 2) {
      [nums[curr], nums[right]] = [nums[right], nums[curr]];
      right--;
    } else {
      curr++;
    }
  }
}
```

### 5.3.7 Squares of Sorted Array

**Time**: O(n) | **Space**: O(n)

```javascript
function sortedSquares(nums) {
  const result = Array(nums.length);
  let left = 0;
  let right = nums.length - 1;
  let pos = nums.length - 1;
  
  while (left <= right) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];
    
    if (leftSquare > rightSquare) {
      result[pos] = leftSquare;
      left++;
    } else {
      result[pos] = rightSquare;
      right--;
    }
    pos--;
  }
  
  return result;
}
```

### 5.3.8 Partition Labels

**Time**: O(n) | **Space**: O(1)

```javascript
function partitionLabels(s) {
  const lastIdx = {};
  
  for (let i = 0; i < s.length; i++) {
    lastIdx[s[i]] = i;
  }
  
  const result = [];
  let start = 0;
  let end = 0;
  
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, lastIdx[s[i]]);
    
    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }
  
  return result;
}
```

## 5.4 When to Use Two Pointers?

✅ **Use When**:
- Array/string is **sorted** (or can be sorted)
- Need to find **pairs/triplets** with specific sum
- Need to **partition** array
- Need to **remove** elements in-place
- Need to find elements with **specific distance**

✅ **Keywords**:
- "sorted array"
- "find pair/triplet"
- "remove duplicates"
- "move elements"
- "partition"
- "palindrome"

❌ **Don't Use When**:
- Need to maintain original order (and can't sort)
- Need to access random indices
- Problem requires complex state tracking

## 5.5 Two Pointers Decision Tree

```
Is array sorted?
├─ Yes → Use opposite direction for sum problems
└─ No
   ├─ Can sort? → Sort then use opposite direction
   └─ Can't sort → Use fast & slow for partitioning
```

---

## 🎯 Summary & Best Practices

### Pattern Recognition

| Pattern | When to Use | Time | Space |
|---------|-------------|------|-------|
| **Graph DFS** | Explore all paths, detect cycles | O(V+E) | O(V) |
| **Graph BFS** | Shortest path, level order | O(V+E) | O(V) |
| **Tree DFS** | Process nodes depth-first | O(n) | O(h) |
| **Tree BFS** | Level-by-level processing | O(n) | O(w) |
| **Sliding Window** | Contiguous subarray/substring | O(n) | O(1) or O(k) |
| **Two Pointers** | Sorted array, pairs, partitioning | O(n) | O(1) |

### Key Takeaways

1. **Graphs**: Choose DFS for paths/cycles, BFS for shortest paths
2. **Trees**: Master recursion, understand traversals
3. **Linked Lists**: Practice pointer manipulation, use dummy nodes
4. **Sliding Window**: Identify fixed vs variable size windows
5. **Two Pointers**: Recognize opposite vs same direction patterns

### Practice Strategy

1. **Understand theory** before solving problems
2. **Master patterns** through repetition
3. **Draw diagrams** for visualization
4. **Test edge cases** thoroughly
5. **Analyze complexity** for every solution

---

**🚀 Master these concepts and patterns to ace any DSA interview!**


