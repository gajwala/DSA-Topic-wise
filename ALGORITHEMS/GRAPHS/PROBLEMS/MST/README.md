# 🌲 Minimum Spanning Tree (MST) Problems

A comprehensive collection of **10 MST problems** with solutions using both **Prim's and Kruskal's algorithms**.

---

## 📚 Problems List

### 1️⃣ **Minimum Spanning Tree - Prim's Algorithm**
- **File**: `01_Minimum_Spanning_Tree_Prims.md`
- **Difficulty**: Medium
- **Source**: Standard MST Problem
- **Key Concepts**: Prim's Algorithm, Min-Heap, Greedy Approach
- **Use Case**: Learn the fundamentals of Prim's algorithm

### 2️⃣ **Minimum Spanning Tree - Kruskal's Algorithm**
- **File**: `02_Minimum_Spanning_Tree_Kruskals.md`
- **Difficulty**: Medium
- **Source**: Standard MST Problem
- **Key Concepts**: Kruskal's Algorithm, Union-Find, Sorting
- **Use Case**: Learn the fundamentals of Kruskal's algorithm

### 3️⃣ **Min Cost to Connect All Points**
- **File**: `03_Min_Cost_to_Connect_All_Points.md`
- **Difficulty**: Medium
- **Source**: LeetCode 1584
- **Key Concepts**: Complete Graph, Manhattan Distance, Both Algorithms
- **Use Case**: Calculate distances between all pairs, MST on complete graph

### 4️⃣ **Connecting Cities With Minimum Cost**
- **File**: `04_Connecting_Cities_With_Minimum_Cost.md`
- **Difficulty**: Medium
- **Source**: LeetCode 1135
- **Key Concepts**: Connectivity Check, Return -1 if Impossible
- **Use Case**: Handle disconnected graphs, validation

### 5️⃣ **Optimize Water Distribution in a Village**
- **File**: `05_Optimize_Water_Distribution.md`
- **Difficulty**: Hard
- **Source**: LeetCode 1168
- **Key Concepts**: Virtual Node, Independent Source, Graph Transformation
- **Use Case**: Advanced MST with source selection

### 6️⃣ **Find Critical and Pseudo-Critical Edges**
- **File**: `06_Find_Critical_and_Pseudo_Critical_Edges.md`
- **Difficulty**: Hard
- **Source**: LeetCode 1489
- **Key Concepts**: Edge Classification, MST Analysis, Multiple MSTs
- **Use Case**: Identify essential edges vs optional edges

### 7️⃣ **Number of Operations to Make Network Connected**
- **File**: `07_Number_of_Operations_to_Make_Network_Connected.md`
- **Difficulty**: Medium
- **Source**: LeetCode 1319
- **Key Concepts**: Component Counting, Redundant Edges, Connectivity
- **Use Case**: Network connectivity and cable reallocation

### 8️⃣ **Minimum Cost to Reach City With Discounts**
- **File**: `08_Minimum_Cost_to_Reach_City_With_Discounts.md`
- **Difficulty**: Medium
- **Source**: LeetCode 2093
- **Key Concepts**: Dijkstra's with State, Shortest Path (not pure MST)
- **Use Case**: State-based shortest path problems

### 9️⃣ **Min Cost to Connect All Nodes (GFG)**
- **File**: `09_Min_Cost_to_Connect_All_Nodes_GFG.md`
- **Difficulty**: Medium
- **Source**: GeeksforGeeks
- **Key Concepts**: Classic MST, Both Algorithms Comparison
- **Use Case**: Standard practice problem with detailed comparison

### 🔟 **Minimum Cost to Build Network**
- **File**: `10_Minimum_Cost_to_Build_Network.md`
- **Difficulty**: Medium
- **Source**: Custom Problem
- **Key Concepts**: MST + Additional Cost, Combined Optimization
- **Use Case**: Real-world network design with server costs

---

## 🎯 Learning Path

### **Beginner Path** (Start Here):

1. **Problem 1** - Learn Prim's Algorithm basics
2. **Problem 2** - Learn Kruskal's Algorithm basics
3. **Problem 9** - Classic MST with both algorithms
4. **Problem 4** - Handle disconnected graphs

### **Intermediate Path**:

5. **Problem 3** - Complete graphs and distance calculation
6. **Problem 7** - Component counting and connectivity
7. **Problem 10** - Combined optimization problems

### **Advanced Path**:

8. **Problem 5** - Virtual node technique
9. **Problem 6** - Edge classification and analysis
10. **Problem 8** - State-based shortest path (bonus)

---

## 🔑 Key Concepts by Problem

### **Union-Find Focused**:
- Problem 2: Kruskal's Algorithm
- Problem 6: Critical Edges
- Problem 7: Network Connected

### **Heap/Priority Queue Focused**:
- Problem 1: Prim's Algorithm
- Problem 3: Manhattan Distance MST
- Problem 8: Dijkstra's with State

### **Graph Transformation**:
- Problem 5: Virtual Node
- Problem 10: Additional Costs

### **Connectivity & Components**:
- Problem 4: Disconnected Graph Check
- Problem 7: Component Counting

---

## 📊 Complexity Comparison

| Problem | Prim's Time | Kruskal's Time | Best Choice |
| ------- | ----------- | -------------- | ----------- |
| 1 & 2 | O(E log V) | O(E log E) | Equal |
| 3 (Complete Graph) | O(V² log V) | O(V² log V) | **Prim's** (no edge generation) |
| 4 (Sparse) | O(E log V) | O(E log E) | **Kruskal's** |
| 5 (With Virtual Node) | O(E log V) | O(E log E) | Equal |
| 6 (Edge Testing) | Hard | O(E² × α(V)) | **Kruskal's** |
| 7 (Components) | O(E log V) | O(E) | **Kruskal's** (Union-Find) |
| 9 (Classic) | O(E log V) | O(E log E) | Depends on density |
| 10 (With Server) | O(E log V) | O(E log E) | Equal |

---

## 🛠️ Implementation Templates

### **Prim's Algorithm Template**:

```javascript
function primsAlgorithm(V, edges) {
  // 1. Build adjacency list
  // 2. Initialize min-heap with (cost=0, startNode)
  // 3. Track visited nodes
  // 4. While heap not empty:
  //    - Extract min cost node
  //    - If visited, skip
  //    - Mark visited, add cost
  //    - Add unvisited neighbors to heap
  // 5. Return total cost
}
```

### **Kruskal's Algorithm Template**:

```javascript
function kruskalsAlgorithm(V, edges) {
  // 1. Sort edges by weight
  // 2. Initialize Union-Find
  // 3. For each edge:
  //    - If different components, union and add cost
  // 4. Return total cost
}
```

---

## 🎓 Common Patterns

### **Pattern 1: Standard MST**
**Problems**: 1, 2, 9
**Approach**: Direct application of Prim's or Kruskal's

### **Pattern 2: MST with Validation**
**Problems**: 4, 7
**Approach**: Check connectivity, return -1 if impossible

### **Pattern 3: MST with Transformation**
**Problems**: 5, 10
**Approach**: Modify graph (add virtual node, additional costs)

### **Pattern 4: MST Analysis**
**Problems**: 6
**Approach**: Test edges individually, classify by importance

### **Pattern 5: Complete Graph MST**
**Problems**: 3
**Approach**: Calculate all pairwise distances, then MST

### **Pattern 6: Not Pure MST**
**Problems**: 8
**Approach**: Use shortest path with state tracking

---

## 🔄 When to Use Which Algorithm?

### **Use Prim's When**:
✅ Dense graphs (E ≈ V²)
✅ Graph in adjacency list/matrix form
✅ Need to start from specific vertex
✅ Want to build MST incrementally

### **Use Kruskal's When**:
✅ Sparse graphs (E ≈ V)
✅ Graph in edge list form
✅ Edges already sorted
✅ Need to classify edges (critical, etc.)
✅ Easy to test edge inclusion/exclusion

---

## 💡 Pro Tips

1. **Union-Find Optimization**: Always use path compression + union by rank
2. **Heap Implementation**: Custom min-heap is more efficient than built-in
3. **Early Termination**: Stop at V-1 edges for MST
4. **Validation**: Check if E < V-1 before starting
5. **State Tracking**: For complex problems, track (node, state) pairs
6. **Virtual Nodes**: Transform complex problems into standard MST

---

## 📈 Difficulty Distribution

```
Easy:        0 problems
Medium:      8 problems (1,2,3,4,7,8,9,10)
Hard:        2 problems (5,6)
```

---

## 🏆 Challenge Yourself

After completing all problems:

1. **Implement both algorithms** for each problem
2. **Compare performance** on different graph types
3. **Modify problems** with additional constraints
4. **Create variants** combining multiple concepts

---

## 📚 Additional Resources

### **Algorithm Documentation**:
- See `../06_Topological_Sort.md` for topological ordering
- See `../07_Union_Find.md` for Union-Find details
- See `../08_Kruskals_and_Prims_MST.md` for algorithm comparison

### **Related Algorithms**:
- Dijkstra's Algorithm (shortest path)
- Bellman-Ford Algorithm (negative weights)
- Floyd-Warshall (all-pairs shortest path)

---

## 🎯 Practice Strategy

### **Week 1**: Fundamentals
- Day 1-2: Problem 1 (Prim's)
- Day 3-4: Problem 2 (Kruskal's)
- Day 5-6: Problem 9 (Classic MST)
- Day 7: Review and compare

### **Week 2**: Applications
- Day 1-2: Problem 3 (Complete Graph)
- Day 3-4: Problem 4 (Validation)
- Day 5-6: Problem 7 (Components)
- Day 7: Problem 10 (Combined)

### **Week 3**: Advanced
- Day 1-3: Problem 5 (Virtual Node)
- Day 4-6: Problem 6 (Edge Classification)
- Day 7: Problem 8 (State-based)

---

## ✅ Completion Checklist

- [ ] Understand both Prim's and Kruskal's algorithms
- [ ] Implement Union-Find with optimizations
- [ ] Build custom Min-Heap
- [ ] Solve all 10 problems
- [ ] Compare algorithms on same problem
- [ ] Handle edge cases (disconnected, negative, etc.)
- [ ] Optimize for different graph densities

---

**Happy Learning! 🚀**

*Master these 10 problems and you'll have complete mastery of Minimum Spanning Trees!*

