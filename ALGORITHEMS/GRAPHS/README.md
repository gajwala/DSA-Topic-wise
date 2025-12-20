# 🚀 Graph Algorithms - Complete Guide (JavaScript)

Welcome to the **complete guide** on Graph Algorithms! This repository contains detailed explanations, implementations, and examples of all major graph algorithms in JavaScript.

## 📚 Table of Contents

### Core Algorithms (Completed ✅)

1. **[BFS - Breadth-First Search](./01_BFS_Breadth_First_Search.md)**
   - Shortest path in unweighted graphs
   - Level-order traversal
   - Time: O(V + E) | Space: O(V)

2. **[DFS - Depth-First Search](./02_DFS_Depth_First_Search.md)**
   - Explore all paths
   - Cycle detection
   - Time: O(V + E) | Space: O(V)

3. **[Dijkstra's Algorithm](./03_Dijkstras_Algorithm.md)**
   - Shortest path with non-negative weights
   - Single-source shortest path
   - Time: O((V+E) log V) | Space: O(V)

4. **[Bellman-Ford Algorithm](./04_Bellman_Ford_Algorithm.md)**
   - Shortest path with negative edges
   - Negative cycle detection
   - Time: O(V × E) | Space: O(V)

5. **[Floyd-Warshall Algorithm](./05_Floyd_Warshall_Algorithm.md)**
   - All-pairs shortest path
   - Works with negative edges
   - Time: O(V³) | Space: O(V²)

6. **[Topological Sort](./06_Topological_Sort.md)**
   - Order vertices in DAG
   - Task scheduling, dependencies
   - Time: O(V + E) | Space: O(V)

7. **[Union-Find (Disjoint Set)](./07_Union_Find.md)**
   - Dynamic connectivity
   - Cycle detection, connected components
   - Time: O(α(n)) per operation | Space: O(n)

8. **[Kruskal's & Prim's MST](./08_Kruskals_and_Prims_MST.md)**
   - Minimum Spanning Tree
   - Connect all vertices minimum cost
   - Time: O(E log E) / O(E log V) | Space: O(V)

### 📊 **[Complete Comparison & Summary](./00_Complete_Comparison_and_Summary.md)**
   - Side-by-side algorithm comparison
   - Decision tree for algorithm selection
   - Quick reference templates
   - Time/space complexity table

## 🎯 How to Use This Guide

### For Students
1. Start with **BFS** and **DFS** - these are foundational
2. Move to **Dijkstra's** for weighted graphs
3. Learn **Topological Sort** for dependency problems
4. Master **MST algorithms** (Kruskal's & Prim's)
5. Study advanced algorithms as needed

### For Interview Prep
- Focus on: **BFS, DFS, Dijkstra's, Union-Find, Topological Sort**
- These cover 90% of interview questions
- Practice the problem patterns in each file

### For Problem Solving
1. Read the **"When to Use"** section in each algorithm
2. Check the **Complete Comparison** file for decision tree
3. Use the **Quick Reference** templates
4. Study the **Common Problem Patterns**

## 🔥 Quick Algorithm Selection Guide

```
Need shortest path?
├─ Unweighted? → BFS
├─ Weighted (non-negative)? → Dijkstra's
├─ Weighted (negative edges)? → Bellman-Ford
└─ All pairs? → Floyd-Warshall

Need to explore graph?
├─ Level by level? → BFS
├─ Deep exploration? → DFS
└─ Find all paths? → DFS

Need to connect vertices?
├─ Minimum cost? → Kruskal's or Prim's
└─ Check connectivity? → Union-Find

Have dependencies/ordering?
└─ Topological Sort (DFS or Kahn's)

Detect cycles?
├─ Undirected? → DFS or Union-Find
└─ Directed? → DFS with colors
```

## 📈 Complexity Cheat Sheet

| Algorithm | Time | Space | Best For |
|-----------|------|-------|----------|
| BFS | O(V+E) | O(V) | Unweighted shortest path |
| DFS | O(V+E) | O(V) | Exploring all paths |
| Dijkstra's | O((V+E)log V) | O(V) | Weighted shortest path |
| Bellman-Ford | O(V×E) | O(V) | Negative edges |
| Floyd-Warshall | O(V³) | O(V²) | All-pairs |
| Kruskal's | O(E log E) | O(V) | MST (sparse) |
| Prim's | O((V+E)log V) | O(V) | MST (dense) |
| Topological Sort | O(V+E) | O(V) | DAG ordering |
| Union-Find | O(α(n)) | O(n) | Dynamic connectivity |

## 💡 Common LeetCode Patterns

### Pattern: Shortest Path
- **Unweighted**: Shortest Path in Binary Matrix → **BFS**
- **Weighted**: Network Delay Time → **Dijkstra's**
- **Negative edges**: Cheapest Flights with K Stops → **Bellman-Ford**

### Pattern: Exploration
- **Islands**: Number of Islands → **DFS** or **BFS**
- **All paths**: All Paths from Source to Target → **DFS**
- **Levels**: Binary Tree Level Order → **BFS**

### Pattern: Dependencies
- **Course scheduling**: Course Schedule I/II → **Topological Sort**
- **Build order**: Task Scheduler → **Topological Sort**

### Pattern: Connectivity
- **Dynamic connectivity**: Number of Connected Components → **Union-Find**
- **MST**: Min Cost to Connect All Points → **Kruskal's/Prim's**

## 🎓 Learning Path

### Beginner (Week 1-2)
- ✅ **BFS**: Master shortest path in unweighted graphs
- ✅ **DFS**: Understand recursive exploration
- ✅ Practice: 10-15 easy problems

### Intermediate (Week 3-4)
- ✅ **Dijkstra's**: Weighted shortest path
- ✅ **Topological Sort**: Dependency resolution
- ✅ **Union-Find**: Dynamic connectivity
- ✅ Practice: 15-20 medium problems

### Advanced (Week 5-6)
- ✅ **Bellman-Ford**: Negative edges
- ✅ **Floyd-Warshall**: All pairs
- ✅ **Kruskal's/Prim's**: MST
- ✅ **Tarjan's**: SCCs
- ✅ Practice: 10-15 hard problems

## 📝 File Structure

```
GRAPH_ALGORITHMS/
├── 00_Complete_Comparison_and_Summary.md   # Start here!
├── 01_BFS_Breadth_First_Search.md
├── 02_DFS_Depth_First_Search.md
├── 03_Dijkstras_Algorithm.md
├── 04_Bellman_Ford_Algorithm.md
├── 05_Floyd_Warshall_Algorithm.md
├── 06_Topological_Sort.md
├── 07_Union_Find.md
├── 08_Kruskals_and_Prims_MST.md
└── README.md (this file)
```

## 🔑 Key Concepts

### Graph Representations
```javascript
// Adjacency List (most common)
const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D'],
  'C': ['A', 'D'],
  'D': ['B', 'C']
};

// Adjacency List with Weights
const weightedGraph = {
  'A': { 'B': 5, 'C': 3 },
  'B': { 'A': 5, 'D': 2 },
  'C': { 'A': 3, 'D': 1 },
  'D': { 'B': 2, 'C': 1 }
};

// Edge List
const edges = [
  ['A', 'B', 5],
  ['B', 'D', 2],
  ['C', 'D', 1]
];

// Adjacency Matrix
const matrix = [
  [0, 5, 3, Infinity],
  [5, 0, Infinity, 2],
  [3, Infinity, 0, 1],
  [Infinity, 2, 1, 0]
];
```

## 🎯 Pro Tips

1. **Master BFS & DFS first** - They solve 80% of problems
2. **Understand graph representations** - Choose the right one
3. **Practice pattern recognition** - Similar problems use similar algorithms
4. **Draw examples** - Visualize the algorithm execution
5. **Implement from scratch** - Don't just read, code!
6. **Time yourself** - Build interview readiness
7. **Review complexity** - Always analyze time and space

## 🚀 Practice Resources

### Recommended LeetCode Problems (by difficulty)

**Easy (Start here)**
- 733: Flood Fill
- 200: Number of Islands
- 997: Find the Town Judge
- 1971: Find if Path Exists in Graph

**Medium (Build skills)**
- 207: Course Schedule
- 210: Course Schedule II
- 743: Network Delay Time
- 1091: Shortest Path in Binary Matrix
- 787: Cheapest Flights Within K Stops
- 1584: Min Cost to Connect All Points

**Hard (Master level)**
- 127: Word Ladder
- 1192: Critical Connections in a Network
- 1334: Find the City With the Smallest Number of Neighbors
- 847: Shortest Path Visiting All Nodes

## 🤝 Contributing

This is a learning resource. If you find errors or want to improve explanations:
1. Each file is self-contained
2. Follow the existing format
3. Include complexity analysis
4. Add practical examples

## 📖 How Each File is Structured

Every algorithm file follows this consistent structure:

1. **📚 Theory** - What is the algorithm?
2. **🎯 Intuition** - How to think about it?
3. **📝 Algorithm Steps** - Step-by-step process
4. **💻 Implementation** - Complete JavaScript code
5. **🔍 Example Walkthrough** - Detailed example
6. **⏱️ Time Complexity** - Big O analysis
7. **🎯 When to Use** - Use cases and anti-patterns
8. **🔑 Key Properties** - Important characteristics
9. **💡 Common Problem Patterns** - Practical examples
10. **🎓 Practice Problems** - LeetCode recommendations

## 🎉 Happy Learning!

Graph algorithms are powerful tools for solving complex problems. Take your time, practice regularly, and soon these algorithms will become second nature.

**Remember**: Understanding > Memorization

Good luck on your journey to mastering graph algorithms! 🚀

---

**Created for students who want to truly understand graph algorithms, not just memorize them.**

