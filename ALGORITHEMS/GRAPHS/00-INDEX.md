# 📚 Graph Algorithms - Complete Collection (JavaScript)

## ✅ All Algorithms Completed!

This repository contains **over 4,000 lines** of comprehensive documentation covering all major graph algorithms from **basic to advanced** level, implemented entirely in **JavaScript**.

---

## 🎯 Complete Algorithm List

### **Basic Level** (Start Here!)

#### 1. [BFS - Breadth-First Search](./01_BFS_Breadth_First_Search.md) ⭐
- **What**: Explore graph level by level using a queue
- **When**: Shortest path in unweighted graphs, level-order traversal
- **Complexity**: Time O(V+E), Space O(V)
- **Key Problems**: Number of Islands, Rotting Oranges, Word Ladder

#### 2. [DFS - Depth-First Search](./02_DFS_Depth_First_Search.md) ⭐
- **What**: Explore graph deeply using recursion/stack
- **When**: Find all paths, cycle detection, graph traversal
- **Complexity**: Time O(V+E), Space O(V)
- **Key Problems**: Clone Graph, Course Schedule, Number of Provinces

---

### **Intermediate Level**

#### 3. [Dijkstra's Algorithm](./03_Dijkstras_Algorithm.md) ⭐⭐
- **What**: Shortest path with non-negative edge weights
- **When**: GPS navigation, network routing, weighted shortest path
- **Complexity**: Time O((V+E) log V), Space O(V)
- **Key Problems**: Network Delay Time, Path With Minimum Effort

#### 4. [Topological Sort](./06_Topological_Sort.md) ⭐⭐
- **What**: Linear ordering of vertices in DAG
- **When**: Task scheduling, course prerequisites, build systems
- **Complexity**: Time O(V+E), Space O(V)
- **Key Problems**: Course Schedule I/II, Alien Dictionary

#### 5. [Union-Find (Disjoint Set)](./07_Union_Find.md) ⭐⭐
- **What**: Track and merge disjoint sets efficiently
- **When**: Dynamic connectivity, cycle detection, MST
- **Complexity**: Time O(α(n)) per operation, Space O(n)
- **Key Problems**: Number of Provinces, Redundant Connection

#### 6. [Kruskal's & Prim's MST](./08_Kruskals_and_Prims_MST.md) ⭐⭐
- **What**: Find minimum spanning tree
- **When**: Connect all vertices with minimum cost
- **Complexity**: Time O(E log E) / O(E log V), Space O(V)
- **Key Problems**: Min Cost to Connect All Points

---

### **Advanced Level**

#### 7. [Bellman-Ford Algorithm](./04_Bellman_Ford_Algorithm.md) ⭐⭐⭐
- **What**: Shortest path with negative edge weights
- **When**: Graphs with negative edges, negative cycle detection
- **Complexity**: Time O(V×E), Space O(V)
- **Key Problems**: Cheapest Flights Within K Stops, Currency Arbitrage

#### 8. [Floyd-Warshall Algorithm](./05_Floyd_Warshall_Algorithm.md) ⭐⭐⭐
- **What**: All-pairs shortest path
- **When**: Need distances between all vertex pairs
- **Complexity**: Time O(V³), Space O(V²)
- **Key Problems**: Find the City With Smallest Number of Neighbors

---

## 📊 [Complete Comparison & Summary](./00_Complete_Comparison_and_Summary.md)

### This essential file contains:
- ✅ **Side-by-side comparison table** of all algorithms
- ✅ **Decision tree** to help you choose the right algorithm
- ✅ **Time & space complexity** summary for all algorithms
- ✅ **Quick reference templates** for each algorithm
- ✅ **LeetCode problem mapping** by pattern
- ✅ **Common pitfalls** and solutions
- ✅ **Pro tips** for interviews and problem solving

---

## 🚀 Quick Start Guide

### For Complete Beginners:
1. Read [README.md](./README.md) first
2. Start with [BFS](./01_BFS_Breadth_First_Search.md) - easiest to understand
3. Move to [DFS](./02_DFS_Depth_First_Search.md) - master recursion
4. Practice 10-15 easy problems before moving forward

### For Interview Prep:
1. Master: **BFS, DFS, Dijkstra's, Topological Sort, Union-Find**
2. These 5 algorithms cover 90% of interview questions
3. Use the [Comparison Summary](./00_Complete_Comparison_and_Summary.md) as a cheat sheet
4. Practice problem patterns in each file

### For Problem Solving:
1. Check the **"When to Use"** section in each algorithm file
2. Use the [decision tree](./00_Complete_Comparison_and_Summary.md) to choose algorithm
3. Copy the **Quick Reference** template from comparison file
4. Study the **Common Problem Patterns** section

---

## 📈 Complexity Quick Reference

| Algorithm | Time | Space | Use When |
|-----------|------|-------|----------|
| **BFS** | O(V+E) | O(V) | Unweighted shortest path |
| **DFS** | O(V+E) | O(V) | Explore all paths, cycles |
| **Dijkstra** | O((V+E)log V) | O(V) | Weighted shortest path (non-negative) |
| **Bellman-Ford** | O(V×E) | O(V) | Negative edges, cycle detection |
| **Floyd-Warshall** | O(V³) | O(V²) | All-pairs shortest path |
| **Topological Sort** | O(V+E) | O(V) | DAG ordering, dependencies |
| **Union-Find** | O(α(n)) | O(n) | Dynamic connectivity |
| **Kruskal/Prim** | O(E log E/V) | O(V) | Minimum spanning tree |

---

## 🎓 Learning Path

### Week 1-2: Basics
- ✅ BFS (2-3 days)
- ✅ DFS (2-3 days)
- ✅ Practice 15-20 easy problems
- **Goal**: Comfortable with graph traversal

### Week 3-4: Intermediate
- ✅ Dijkstra's (3-4 days)
- ✅ Topological Sort (2-3 days)
- ✅ Union-Find (2-3 days)
- ✅ Practice 20-25 medium problems
- **Goal**: Handle weighted graphs and dependencies

### Week 5-6: Advanced
- ✅ Bellman-Ford (2-3 days)
- ✅ Floyd-Warshall (2-3 days)
- ✅ MST Algorithms (3-4 days)
- ✅ Practice 15-20 hard problems
- **Goal**: Master all graph algorithms

---

## 💡 What Makes This Collection Special?

### ✨ **Student-Friendly**
- Written like a teacher explaining to a student
- Real-world analogies and intuitive explanations
- Step-by-step walkthroughs with visual examples

### ✨ **Complete Coverage**
Every file includes:
- 📚 Theory & Background
- 🎯 Intuition & Mental Models
- 📝 Algorithm Steps
- 💻 Complete JavaScript Implementation
- 🔍 Detailed Example Walkthrough
- ⏱️ Time & Space Complexity Analysis
- 🎯 When to Use (and when NOT to use)
- 🔑 Key Properties
- 💡 Common Problem Patterns (with code)
- 🎓 Practice Problems (LeetCode)
- 📊 Comparison with Other Algorithms
- ⚠️ Common Mistakes & Pitfalls

### ✨ **JavaScript First**
- All implementations in modern JavaScript
- Uses ES6+ features
- Production-ready code
- No dependencies required

### ✨ **Interview Ready**
- LeetCode problem mappings
- Pattern recognition guidance
- Quick reference templates
- Time/space complexity focus

---

## 📖 File Structure

```
GRAPH_ALGORITHMS/
├── 00_Complete_Comparison_and_Summary.md   (12 KB) ⭐ Start here!
├── 01_BFS_Breadth_First_Search.md          (11 KB)
├── 02_DFS_Depth_First_Search.md            (12 KB)
├── 03_Dijkstras_Algorithm.md               (14 KB)
├── 04_Bellman_Ford_Algorithm.md            (10 KB)
├── 05_Floyd_Warshall_Algorithm.md          (9 KB)
├── 06_Topological_Sort.md                  (12 KB)
├── 07_Union_Find.md                        (12 KB)
├── 08_Kruskals_and_Prims_MST.md           (12 KB)
├── README.md                               (8 KB)
└── INDEX.md (this file)                    (Summary)

Total: 4,295+ lines of comprehensive documentation
```

---

## 🎯 Top LeetCode Problems by Algorithm

### BFS Problems:
- 102: Binary Tree Level Order Traversal (Easy)
- 200: Number of Islands (Medium)
- 994: Rotting Oranges (Medium)
- 127: Word Ladder (Hard)

### DFS Problems:
- 200: Number of Islands (Medium)
- 133: Clone Graph (Medium)
- 207: Course Schedule (Medium)
- 332: Reconstruct Itinerary (Hard)

### Dijkstra's Problems:
- 743: Network Delay Time (Medium)
- 1631: Path With Minimum Effort (Medium)
- 787: Cheapest Flights Within K Stops (Medium)

### Topological Sort Problems:
- 207: Course Schedule (Medium)
- 210: Course Schedule II (Medium)
- 269: Alien Dictionary (Hard)

### Union-Find Problems:
- 547: Number of Provinces (Medium)
- 684: Redundant Connection (Medium)
- 721: Accounts Merge (Medium)
- 827: Making A Large Island (Hard)

### MST Problems:
- 1584: Min Cost to Connect All Points (Medium)
- 1135: Connecting Cities With Minimum Cost (Medium)
- 1489: Find Critical and Pseudo-Critical Edges (Hard)

---

## 🔥 Pro Tips

1. **Algorithm Selection** is more important than memorization
2. **Pattern recognition** comes with practice
3. **Draw examples** - visualize before coding
4. **Start simple** - BFS/DFS solve most problems
5. **Time complexity** matters in interviews
6. **Edge cases** - empty graph, single node, disconnected
7. **Test with examples** - walk through your code

---

## 🎉 You're All Set!

You now have access to a complete, professional-grade collection of graph algorithms in JavaScript. Whether you're:
- 🎓 A student learning algorithms
- 💼 Preparing for technical interviews
- 🧑‍💻 Solving LeetCode problems
- 📚 Building algorithmic knowledge

This collection has everything you need!

### Next Steps:
1. ⭐ Bookmark this repository
2. 📖 Start with [README.md](./README.md)
3. 🎯 Use [Comparison Summary](./00_Complete_Comparison_and_Summary.md) as reference
4. 💪 Practice, practice, practice!

---

**Happy Learning! May your graphs always be acyclic and your paths always be short! 🚀**

---

*Created with ❤️ for students who want to truly understand graph algorithms*

