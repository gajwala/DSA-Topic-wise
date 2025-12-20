# Graph Algorithms - Complete Comparison & Cheat Sheet

## 📊 All Algorithms Overview

This document provides a comprehensive comparison of all major graph algorithms, their time/space complexities, and when to use each one.

## 🎯 Algorithm Categories

### 1. **Graph Traversal**
- Breadth-First Search (BFS)
- Depth-First Search (DFS)

### 2. **Shortest Path**
- Dijkstra's Algorithm
- Bellman-Ford Algorithm
- Floyd-Warshall Algorithm
- A* Algorithm

### 3. **Minimum Spanning Tree**
- Kruskal's Algorithm
- Prim's Algorithm

### 4. **Topological Sort**
- DFS-based Topological Sort
- Kahn's Algorithm (BFS-based)

### 5. **Connectivity & Components**
- Union-Find (Disjoint Set)
- Tarjan's Algorithm (Strongly Connected Components)
- Kosaraju's Algorithm (SCC)

## 📈 Complete Time & Space Complexity Comparison

| Algorithm | Time Complexity | Space Complexity | Graph Type | Use Case |
|-----------|----------------|------------------|------------|----------|
| **BFS** | O(V + E) | O(V) | Unweighted | Shortest path, level-order |
| **DFS** | O(V + E) | O(h) recursive, O(V) iterative | Any | All paths, cycles, topology |
| **Dijkstra's** | O((V + E) log V) | O(V) | Weighted (non-negative) | Single-source shortest path |
| **Bellman-Ford** | O(V × E) | O(V) | Weighted (any) | Negative edges, cycle detection |
| **Floyd-Warshall** | O(V³) | O(V²) | Weighted (any) | All-pairs shortest path |
| **Kruskal's** | O(E log E) | O(V) | Weighted undirected | MST (sparse graphs) |
| **Prim's** | O((V + E) log V) | O(V) | Weighted undirected | MST (dense graphs) |
| **Topological Sort** | O(V + E) | O(V) | DAG | Task scheduling, dependencies |
| **Union-Find** | O(α(n)) per op | O(n) | Any | Connectivity, cycle detection |
| **Tarjan's SCC** | O(V + E) | O(V) | Directed | Find strongly connected components |

*Note: α(n) is the inverse Ackermann function, effectively constant*

## 🔍 Detailed Algorithm Comparisons

### Shortest Path Algorithms

| Feature | BFS | Dijkstra's | Bellman-Ford | Floyd-Warshall |
|---------|-----|------------|--------------|----------------|
| **Edge Weights** | None (or equal) | Non-negative | Any | Any |
| **Negative Cycles** | N/A | ❌ No | ✅ Detects | ✅ Detects |
| **Type** | Single-source | Single-source | Single-source | All-pairs |
| **Best For** | Unweighted graphs | Weighted graphs | Negative edges | Small/dense graphs |
| **Time** | O(V + E) | O((V+E) log V) | O(V × E) | O(V³) |
| **When to Use** | Equal weights | GPS, routing | Currency arbitrage | Distance matrices |

### MST Algorithms

| Feature | Kruskal's | Prim's |
|---------|-----------|--------|
| **Approach** | Edge-based | Vertex-based |
| **Data Structure** | Union-Find | Priority Queue |
| **Best For** | Sparse graphs | Dense graphs |
| **Time (Binary Heap)** | O(E log E) | O((V+E) log V) |
| **Time (Fibonacci Heap)** | O(E log V) | O(E + V log V) |
| **Edge List** | ✅ Preferred | ❌ Less efficient |
| **Adjacency List** | ⚠️ Works | ✅ Preferred |
| **Partial MST** | ❌ Harder | ✅ Easy |
| **Parallelization** | ✅ Easier | ❌ Harder |

### Traversal Algorithms

| Feature | BFS | DFS |
|---------|-----|-----|
| **Data Structure** | Queue | Stack/Recursion |
| **Memory Usage** | O(V) - wide graphs worse | O(h) - deep graphs worse |
| **Path Type** | Shortest (unweighted) | Any path |
| **Implementation** | Iterative | Recursive or iterative |
| **Use Cases** | Shortest path, levels | All paths, cycles, topology |
| **Cycle Detection** | ✅ Yes | ✅ Yes (easier) |
| **Topological Sort** | ✅ Kahn's | ✅ DFS-based |
| **Tree Levels** | ✅ Natural | ❌ Need tracking |

## 🎯 Decision Tree: Which Algorithm to Use?

```
Need shortest path?
├─ Unweighted graph? → BFS
├─ Weighted graph?
│  ├─ Non-negative weights?
│  │  ├─ Single source? → Dijkstra's
│  │  └─ All pairs?
│  │     ├─ Dense graph? → Floyd-Warshall
│  │     └─ Sparse graph? → Dijkstra's (V times)
│  └─ Has negative weights?
│     ├─ Single source? → Bellman-Ford
│     └─ All pairs? → Floyd-Warshall

Need to connect all vertices with minimum cost?
├─ Sparse graph? → Kruskal's
└─ Dense graph? → Prim's

Need to order tasks with dependencies?
├─ Want level-wise info? → Kahn's Algorithm (BFS)
└─ Simple implementation? → DFS-based Topological Sort

Need to detect cycles?
├─ Undirected graph? → DFS or Union-Find
└─ Directed graph? → DFS (color-based)

Need to find connected components?
├─ Undirected? → DFS or BFS or Union-Find
└─ Directed (strongly connected)? → Tarjan's or Kosaraju's

Need to check connectivity dynamically?
└─ Union-Find with path compression
```

## 🚀 Quick Reference: Problem → Algorithm Mapping

### Common LeetCode Patterns

| Problem Type | Algorithm | Example Problems |
|--------------|-----------|------------------|
| **Shortest path in maze** | BFS | Shortest Path in Binary Matrix (1091) |
| **All paths source to target** | DFS | All Paths From Source to Target (797) |
| **Course scheduling** | Topological Sort | Course Schedule I & II (207, 210) |
| **Network delay** | Dijkstra's | Network Delay Time (743) |
| **Currency arbitrage** | Bellman-Ford | (detect negative cycles) |
| **Number of islands** | DFS or BFS | Number of Islands (200) |
| **Minimum spanning tree** | Kruskal's/Prim's | Min Cost to Connect All Points (1584) |
| **Cycle detection** | DFS or Union-Find | Course Schedule (207) |
| **Connected components** | Union-Find | Number of Connected Components (323) |
| **Critical connections** | Tarjan's | Critical Connections in Network (1192) |
| **Word ladder** | BFS | Word Ladder (127) |
| **Shortest distance to all cities** | Floyd-Warshall | Find the City (1334) |

## 💾 Data Structure Requirements

| Algorithm | Graph Representation | Additional Structures |
|-----------|---------------------|----------------------|
| **BFS** | Adjacency List | Queue, Visited Set |
| **DFS** | Adjacency List | Stack (or recursion), Visited Set |
| **Dijkstra's** | Adjacency List with weights | Priority Queue, Distance Map |
| **Bellman-Ford** | Edge List | Distance Array |
| **Floyd-Warshall** | Adjacency Matrix | 2D Distance Array |
| **Kruskal's** | Edge List | Union-Find, Sorted Edges |
| **Prim's** | Adjacency List with weights | Priority Queue, Visited Set |
| **Topological Sort** | Adjacency List | Stack or Queue, In-degree Array |
| **Union-Find** | Parent Array | Rank/Size Array |
| **Tarjan's** | Adjacency List | Stack, Discovery/Low Time Arrays |

## 🎓 Complexity Analysis Summary

### Best Case Scenarios

| Graph Density | Shortest Path | MST | Traversal |
|---------------|---------------|-----|-----------|
| **Sparse (E ≈ V)** | Dijkstra's O(V log V) | Kruskal's O(E log E) | DFS/BFS O(V) |
| **Dense (E ≈ V²)** | Dijkstra's O(V² log V) | Prim's O(V²) | DFS/BFS O(V²) |
| **Complete (E = V²)** | Floyd-Warshall O(V³) | Prim's O(V²) | DFS/BFS O(V²) |

### Worst Case Scenarios

- **BFS/DFS**: O(V + E) - always linear
- **Dijkstra's**: O(V²) with array, O((V+E) log V) with heap
- **Bellman-Ford**: O(V × E) - can be slow for dense graphs
- **Floyd-Warshall**: O(V³) - cubic time always
- **Kruskal's**: O(E log E) - dominated by sorting
- **Prim's**: O(E log V) - dominated by priority queue ops

## ⚠️ Common Pitfalls & Solutions

| Pitfall | Algorithms Affected | Solution |
|---------|-------------------|----------|
| **Negative weights** | Dijkstra's | Use Bellman-Ford instead |
| **Negative cycles** | Shortest path algorithms | Use Bellman-Ford to detect |
| **Disconnected graphs** | All traversal algorithms | Loop through all vertices |
| **Undirected edges** | DFS cycle detection | Track parent vertex |
| **Large dense graphs** | Kruskal's | Use Prim's instead |
| **Large sparse graphs** | Prim's, Floyd-Warshall | Use Kruskal's or Dijkstra's |
| **Stack overflow** | Recursive DFS | Use iterative approach |
| **Memory issues** | BFS on wide graphs | Use DFS instead |

## 🔥 Pro Tips

1. **Default to BFS/DFS** for basic traversal - they solve 80% of graph problems
2. **Use Dijkstra's** as your go-to for weighted shortest path (if non-negative)
3. **Union-Find** is perfect for dynamic connectivity problems
4. **Remember edge weights**: 
   - None/Equal → BFS
   - Positive → Dijkstra's
   - Negative → Bellman-Ford
5. **Graph density matters**: 
   - Sparse → Kruskal's, adjacency list
   - Dense → Prim's, adjacency matrix
6. **For interviews**: 
   - Master BFS, DFS, and Dijkstra's first
   - Know when to use topological sort
   - Understand Union-Find

## 📚 Study Order Recommendation

### Beginner (Start Here)
1. ✅ **BFS** - Shortest path in unweighted graphs
2. ✅ **DFS** - Exploring all possibilities
3. ✅ **Topological Sort** - Task scheduling

### Intermediate
4. ✅ **Dijkstra's** - Shortest path with weights
5. ✅ **Union-Find** - Dynamic connectivity
6. ✅ **Kruskal's/Prim's** - Minimum spanning tree

### Advanced
7. ✅ **Bellman-Ford** - Negative edges
8. ✅ **Floyd-Warshall** - All pairs shortest path
9. ✅ **Tarjan's** - Strongly connected components

## 🎯 Final Checklist

Before solving a graph problem, ask yourself:

- [ ] Is the graph weighted or unweighted?
- [ ] Is it directed or undirected?
- [ ] Are there negative weights?
- [ ] Do I need shortest path or any path?
- [ ] Single-source or all-pairs?
- [ ] Is it sparse or dense?
- [ ] Are there cycles I need to detect?
- [ ] Do I need to process by levels?
- [ ] Is there a dependency order?
- [ ] Do I need to connect all vertices?

---

**Remember**: Understanding when to use each algorithm is more important than memorizing implementations! 🚀

---

## 📖 Quick Reference Cards

### BFS Template
```javascript
function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  
  while (queue.length > 0) {
    const node = queue.shift();
    // Process node
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

### DFS Template
```javascript
function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  // Process node
  
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}
```

### Dijkstra's Template
```javascript
function dijkstra(graph, start) {
  const distances = { [start]: 0 };
  const pq = new PriorityQueue();
  pq.enqueue(start, 0);
  const visited = new Set();
  
  while (!pq.isEmpty()) {
    const { val: node, priority: dist } = pq.dequeue();
    if (visited.has(node)) continue;
    visited.add(node);
    
    for (const neighbor in graph[node]) {
      const newDist = dist + graph[node][neighbor];
      if (newDist < (distances[neighbor] || Infinity)) {
        distances[neighbor] = newDist;
        pq.enqueue(neighbor, newDist);
      }
    }
  }
  
  return distances;
}
```

### Union-Find Template
```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
  
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    
    if (rootX === rootY) return false;
    
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
```

---

**Good luck with your graph algorithm journey! Practice makes perfect! 🎯**

