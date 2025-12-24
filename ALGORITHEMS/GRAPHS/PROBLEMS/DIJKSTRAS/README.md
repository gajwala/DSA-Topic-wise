# 🚀 Dijkstra's Algorithm Problems

A comprehensive collection of **10 Dijkstra's Algorithm problems** covering all major variations and use cases, from basic shortest path to advanced modifications.

---

## 📚 Problems List

### 1️⃣ **Network Delay Time** ⭐ Classic

- **File**: `01_Network_Delay_Time.md`
- **Difficulty**: Medium
- **Source**: LeetCode 743
- **Key Concepts**: Standard Dijkstra, Single Source Shortest Path, Min-Heap
- **Use Case**: Learn the fundamentals of Dijkstra's algorithm
- **Time**: O((V+E) log V) | **Space**: O(V+E)

### 2️⃣ **Path with Minimum Effort**

- **File**: `02_Path_with_Minimum_Effort.md`
- **Difficulty**: Medium
- **Source**: LeetCode 1631
- **Key Concepts**: Modified Dijkstra (Minimize Maximum), Grid Graph
- **Update Rule**: `newEffort = max(current, edgeWeight)`
- **Time**: O(M×N log(M×N)) | **Space**: O(M×N)

### 3️⃣ **Cheapest Flights Within K Stops**

- **File**: `03_Cheapest_Flights_Within_K_Stops.md`
- **Difficulty**: Medium
- **Source**: LeetCode 787
- **Key Concepts**: Dijkstra with Constraints, State = (city, stops)
- **Special**: Track both position and stops used
- **Time**: O(E×K log(V×K)) | **Space**: O(V×K)

### 4️⃣ **Path with Maximum Probability**

- **File**: `04_Path_with_Maximum_Probability.md`
- **Difficulty**: Medium
- **Source**: LeetCode 1514
- **Key Concepts**: Modified Dijkstra (Maximize), Max-Heap, Multiplication
- **Update Rule**: `newProb = current × edgeProb`
- **Time**: O((V+E) log V) | **Space**: O(V+E)

### 5️⃣ **Shortest Path in Binary Matrix**

- **File**: `05_Shortest_Path_in_Binary_Matrix.md`
- **Difficulty**: Medium
- **Source**: LeetCode 1091
- **Key Concepts**: BFS vs Dijkstra, 8-Directional Movement, Unit Weights
- **Note**: BFS is simpler for uniform weights
- **Time**: O(n²) BFS, O(n² log n) Dijkstra | **Space**: O(n²)

### 6️⃣ **Swim in Rising Water** ⭐ Hard

- **File**: `06_Swim_in_Rising_Water.md`
- **Difficulty**: Hard
- **Source**: LeetCode 778
- **Key Concepts**: Minimize Maximum, Grid Dijkstra
- **Update Rule**: `newTime = max(current, elevation)`
- **Time**: O(n² log n) | **Space**: O(n²)

### 7️⃣ **Path With Maximum Minimum Value**

- **File**: `07_Path_With_Maximum_Minimum_Value.md`
- **Difficulty**: Medium
- **Source**: LeetCode 1102
- **Key Concepts**: Maximize Minimum, Max-Heap, Inverse Problem
- **Update Rule**: `newScore = min(current, value)`
- **Time**: O(M×N log(M×N)) | **Space**: O(M×N)

### 8️⃣ **Find the City With Smallest Number of Neighbors**

- **File**: `08_Find_City_With_Smallest_Number_of_Neighbors.md`
- **Difficulty**: Medium
- **Source**: LeetCode 1334
- **Key Concepts**: Multiple Dijkstra's, All-Pairs Shortest Path, Floyd-Warshall Alternative
- **Special**: Run Dijkstra from each city
- **Time**: O(n×E log n) | **Space**: O(V+E)

### 9️⃣ **Minimum Cost to Make at Least One Valid Path** ⭐ Advanced

- **File**: `09_Minimum_Cost_to_Make_at_Least_One_Valid_Path.md`
- **Difficulty**: Hard
- **Source**: LeetCode 1368
- **Key Concepts**: 0-1 BFS, Deque, Cost 0/1 Edges
- **Special**: 0-1 BFS is more efficient than Dijkstra!
- **Time**: O(M×N) 0-1 BFS | **Space**: O(M×N)

### 🔟 **Reachable Nodes In Subdivided Graph** ⭐ Very Hard

- **File**: `10_Reachable_Nodes_In_Subdivided_Graph.md`
- **Difficulty**: Hard
- **Source**: LeetCode 882
- **Key Concepts**: Virtual Nodes, Bidirectional Counting, Complex Accounting
- **Special**: Don't create intermediate nodes explicitly
- **Time**: O((V+E) log V) | **Space**: O(V+E)

---

## 🎯 Learning Path

### **Beginner Path** (Start Here):

**Week 1: Fundamentals**

1. **Problem 1** - Network Delay Time (Classic Dijkstra)
2. **Problem 5** - Shortest Path in Binary Matrix (Grid + BFS comparison)

### **Intermediate Path**:

**Week 2: Modifications** 3. **Problem 2** - Minimize Maximum (Path with Minimum Effort) 4. **Problem 4** - Maximize Probability (Max-Heap variation) 5. **Problem 7** - Maximize Minimum (Inverse of #2)

**Week 3: Constraints & Multiple Sources** 6. **Problem 3** - With Constraints (Cheapest Flights K Stops) 7. **Problem 8** - Multiple Sources (Find City with Smallest Neighbors)

### **Advanced Path**:

**Week 4: Advanced Techniques** 8. **Problem 6** - Swim in Rising Water (Hard minimize maximum) 9. **Problem 9** - 0-1 BFS (Minimum Cost Valid Path) 10. **Problem 10** - Complex Accounting (Subdivided Graph)

---

## 🔑 Dijkstra's Variations Summary

### Standard vs Modified Dijkstra's:

| Problem                | Goal                    | Heap Type  | Update Rule               | Initialize              |
| ---------------------- | ----------------------- | ---------- | ------------------------- | ----------------------- |
| **#1 Network Delay**   | Minimize sum            | Min        | `current + weight`        | dist[src]=0, others=∞   |
| **#2 Min Effort**      | Minimize max            | Min        | `max(current, weight)`    | effort[src]=0, others=∞ |
| **#3 K Stops**         | Min sum with constraint | Min        | `current + weight`        | track (city, stops)     |
| **#4 Max Probability** | Maximize product        | Max        | `current × prob`          | prob[src]=1.0, others=0 |
| **#5 Binary Matrix**   | Min sum (unit weights)  | BFS better | `current + 1`             | BFS from (0,0)          |
| **#6 Swim Water**      | Minimize max            | Min        | `max(current, elevation)` | time[src]=grid[0][0]    |
| **#7 Max Min Value**   | Maximize min            | Max        | `min(current, value)`     | score[src]=grid[0][0]   |
| **#8 City Neighbors**  | Multiple sources        | Min        | `current + weight`        | Run n times             |
| **#9 Valid Path**      | 0-1 weights             | 0-1 BFS    | Deque (front/back)        | 0-1 BFS optimal         |
| **#10 Subdivided**     | Virtual nodes           | Min        | Complex accounting        | Standard Dijkstra       |

---

## 📊 Problem Categories

### By Modification Type:

**1. Standard Dijkstra:**

- Problem 1: Network Delay Time
- Problem 8: Find City (multiple times)

**2. Minimize Maximum:**

- Problem 2: Path with Minimum Effort
- Problem 6: Swim in Rising Water

**3. Maximize Minimum:**

- Problem 7: Path With Maximum Minimum Value

**4. Maximize Product:**

- Problem 4: Path with Maximum Probability

**5. With Constraints:**

- Problem 3: Cheapest Flights (k stops)
- Problem 9: Valid Path (0-1 weights)

**6. Grid-Based:**

- Problem 2, 5, 6, 7, 9 (all on grids)

**7. Advanced/Complex:**

- Problem 10: Subdivided Graph (virtual nodes)

---

## 🛠️ Common Patterns & Templates

### Pattern 1: Standard Dijkstra Template

```javascript
function dijkstra(graph, source, n) {
  const dist = Array(n).fill(Infinity);
  dist[source] = 0;

  const pq = new MinHeap((a, b) => a.dist - b.dist);
  pq.insert({ node: source, dist: 0 });

  while (!pq.isEmpty()) {
    const { node, dist: d } = pq.removeMin();

    if (d > dist[node]) continue;

    for (const { neighbor, weight } of graph.get(node)) {
      const newDist = d + weight;

      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        pq.insert({ node: neighbor, dist: newDist });
      }
    }
  }

  return dist;
}
```

### Pattern 2: Modified Update (Min-Max)

```javascript
// For "minimize maximum" problems:
const newDist = Math.max(currentDist, edgeWeight);

// For "maximize minimum" problems:
const newDist = Math.min(currentDist, edgeValue);

// For "maximize product" problems:
const newProb = currentProb * edgeProb;
```

### Pattern 3: 0-1 BFS (Deque)

```javascript
function bfs01(grid) {
  const deque = [[startRow, startCol]];

  while (deque.length > 0) {
    const [row, col] = deque.shift();

    for (const [newRow, newCol] of neighbors) {
      const cost = calculateCost(row, col, newRow, newCol);

      if (cost === 0) {
        deque.unshift([newRow, newCol]); // Front
      } else {
        deque.push([newRow, newCol]); // Back
      }
    }
  }
}
```

### Pattern 4: Grid Dijkstra

```javascript
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1], // 4-directional
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1], // +diagonal for 8-directional
];

// In Dijkstra loop:
for (const [dr, dc] of directions) {
  const newRow = row + dr;
  const newCol = col + dc;

  if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) continue;

  // ... process neighbor
}
```

---

## ⚡ Optimization Techniques

### 1. **Early Termination**

```javascript
// Return immediately when destination reached
if (node === destination) {
  return dist[node];
}
```

### 2. **Lazy Deletion**

```javascript
// Skip if we've found better path
if (currentDist > dist[node]) continue;
```

### 3. **Avoid Re-processing**

```javascript
const visited = new Set();
if (visited.has(node)) continue;
visited.add(node);
```

### 4. **Use 0-1 BFS for 0-1 Weights**

More efficient than Dijkstra: O(V+E) instead of O((V+E) log V)

---

## 🎓 Key Takeaways by Problem

| Problem | Main Lesson                                |
| ------- | ------------------------------------------ |
| **#1**  | Master standard Dijkstra's algorithm       |
| **#2**  | Understand minimize-maximum modification   |
| **#3**  | Handle constraints with state tracking     |
| **#4**  | Use max-heap for maximization problems     |
| **#5**  | Know when BFS is better than Dijkstra      |
| **#6**  | Apply min-max modification on grids        |
| **#7**  | Master maximize-minimum inverse problem    |
| **#8**  | Run Dijkstra multiple times efficiently    |
| **#9**  | Use 0-1 BFS for 0-1 edge weights           |
| **#10** | Handle virtual nodes without creating them |

---

## 🔄 When to Use Each Approach

### Dijkstra's Algorithm:

✅ **Use When:**

- Need shortest path(s)
- All edge weights are **non-negative**
- Single source or multiple sources (run multiple times)
- Can handle various modifications

❌ **Don't Use When:**

- Negative edge weights exist → Use **Bellman-Ford**
- All weights are same (e.g., 1) → Use **BFS**
- Need all-pairs shortest path & dense graph → Use **Floyd-Warshall**
- Only checking connectivity → Use **DFS/BFS/Union-Find**

### 0-1 BFS:

✅ **Use When:**

- Edge weights are only 0 or 1
- More efficient than Dijkstra: O(V+E) vs O((V+E) log V)

### BFS:

✅ **Use When:**

- All edges have weight 1 (uniform/unweighted)
- Simpler and faster than Dijkstra

---

## 💡 Common Mistakes to Avoid

❌ **Using BFS with weighted edges** (except all weights = 1)
❌ **Forgetting to check bounds** in grid problems
❌ **Not using min-heap** for Dijkstra (using regular queue)
❌ **Processing visited nodes** multiple times
❌ **Wrong heap comparison** (min vs max)
❌ **Not handling edge cases** (disconnected graph, unreachable nodes)
❌ **Integer overflow** with large distances (use appropriate types)
❌ **Initializing distances incorrectly** (0 vs Infinity vs -Infinity)

---

## 📈 Complexity Quick Reference

### Time Complexities:

| Implementation      | Time Complexity                 |
| ------------------- | ------------------------------- |
| **Array (no heap)** | O(V²)                           |
| **Binary Heap**     | O((V+E) log V) ✅ Most common   |
| **Fibonacci Heap**  | O(E + V log V) (theoretical)    |
| **0-1 BFS**         | O(V + E) (for 0-1 weights only) |

### Space Complexity:

- Distance array: O(V)
- Heap: O(V) to O(E) depending on implementation
- Adjacency list: O(V + E)
- **Total: O(V + E)** typically

---

## 🎯 Practice Strategy

### **Phase 1: Foundation** (Days 1-7)

- Master Problem 1 (Network Delay Time)
- Understand min-heap implementation
- Implement from scratch 3+ times

### **Phase 2: Variations** (Days 8-14)

- Solve Problems 2, 4, 5, 7
- Understand different update rules
- Practice grid-based Dijkstra

### **Phase 3: Advanced** (Days 15-21)

- Tackle Problems 3, 6, 9
- Master constraint handling
- Learn 0-1 BFS optimization

### **Phase 4: Expert** (Days 22-30)

- Solve Problems 8, 10
- Handle complex scenarios
- Optimize for different graph types

---

## 🏆 Mastery Checklist

- [ ] Implement Dijkstra's from scratch
- [ ] Build min-heap from scratch
- [ ] Solve all 10 problems
- [ ] Understand each variation's update rule
- [ ] Know when to use BFS vs Dijkstra vs 0-1 BFS
- [ ] Handle grid-based graphs
- [ ] Implement max-heap modifications
- [ ] Master state-tracking for constraints
- [ ] Optimize for different graph densities
- [ ] Handle edge cases (disconnected, negative, etc.)

---

## 📚 Additional Resources

### Related Graph Algorithms:

- **Bellman-Ford**: For negative weights (see ../03_Bellman_Ford_Algorithm.md)
- **Floyd-Warshall**: All-pairs shortest path (see ../05_Floyd_Warshall_Algorithm.md)
- **BFS**: Unweighted graphs (see ../01_BFS_Breadth_First_Search.md)
- **DFS**: Graph traversal (see ../02_DFS_Depth_First_Search.md)

### Advanced Topics:

- **A\* Algorithm**: Dijkstra with heuristic
- **Bidirectional Dijkstra**: Search from both ends
- **Dial's Algorithm**: For small integer weights
- **D\* Algorithm**: Dynamic shortest path

---

## 🎮 Interactive Learning

### Visualization Tools:

1. **VisuAlgo**: https://visualgo.net/en/sssp
2. **Algorithm Visualizer**: https://algorithm-visualizer.org/
3. **USF Algorithms**: https://www.cs.usfca.edu/~galles/visualization/

### Online Judges:

1. **LeetCode**: Problems 743, 1631, 787, 1514, etc.
2. **Codeforces**: Graph problems with Dijkstra tag
3. **HackerRank**: Dijkstra's shortest reach

---

## 🌟 Real-World Applications

1. **GPS Navigation**: Shortest route finding
2. **Network Routing**: Internet packet routing (OSPF protocol)
3. **Flight Planning**: Cheapest/shortest flight paths
4. **Game Development**: Pathfinding for NPCs
5. **Supply Chain**: Optimal delivery routes
6. **Social Networks**: Shortest connection path
7. **Robotics**: Path planning with obstacles

---

**Happy Learning! 🚀**

_Master these 10 problems and you'll have complete expertise in Dijkstra's Algorithm and its variations!_

