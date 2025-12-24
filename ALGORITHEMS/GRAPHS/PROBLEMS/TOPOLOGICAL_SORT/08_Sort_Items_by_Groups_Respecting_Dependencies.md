# 📦 Sort Items by Groups Respecting Dependencies

**LeetCode 1203** | **Hard** | **Two-Level Topological Sort**

---

## 📝 Problem Description

There are `n` items each belonging to zero or one of `m` groups where `group[i]` is the group that the `i-th` item belongs to and it's equal to `-1` if the `i-th` item belongs to no group. The items and the groups are zero indexed. A group can have no item belonging to it.

Return a sorted list of the items such that:

- The items that belong to the same group are next to each other in the sorted list.
- There are some relations between these items where `beforeItems[i]` is a list containing all the items that should come before the `i-th` item in the sorted array (to the left of the `i-th` item).

Return any solution if there is more than one solution and return an **empty array** if there is no solution.

### Example 1:

**Input:**

```
n = 8
m = 2
group = [-1,-1,1,0,0,1,0,-1]
beforeItems = [[],[6],[5],[6],[3,6],[],[],[]]
```

**Output:**

```
[6,3,4,1,5,2,0,7]
```

**Explanation:**

```
Group structure:
Group -1: items {0, 1, 7} (no group)
Group 0: items {3, 4, 6}
Group 1: items {2, 5}

Dependencies:
Item 2 needs: [5]
Item 3 needs: [6]
Item 4 needs: [3, 6]
```

### Example 2:

**Input:**

```
n = 8
m = 2
group = [-1,-1,1,0,0,1,0,-1]
beforeItems = [[],[6],[5],[6],[3],[],[4],[]]
```

**Output:**

```
[]
```

**Explanation:**

```
Cycle exists in dependencies → impossible
```

### Constraints:

- `1 <= m <= n <= 3 * 10^4`
- `group.length == beforeItems.length == n`
- `-1 <= group[i] <= m - 1`
- `0 <= beforeItems[i].length <= n - 1`
- `0 <= beforeItems[i][j] <= n - 1`
- `i != beforeItems[i][j]`
- `beforeItems[i]` does not contain duplicates elements

---

## 💡 Intuition

This is a **two-level topological sort problem**:

### Key Challenge:

```
Must satisfy TWO constraints:
1. Items in same group stay together (group ordering)
2. Item dependencies respected (item ordering)

Solution: Two separate topological sorts!
- Level 1: Sort groups
- Level 2: Sort items within each group
```

### Algorithm Strategy:

```
Step 1: Assign unique group IDs to ungrouped items (-1)
Step 2: Build group-level dependency graph
Step 3: Build item-level dependency graph (within groups)
Step 4: Topological sort on groups
Step 5: For each group (in order), topological sort on items
Step 6: Concatenate results
```

### Why Two Levels?

```
Example:
Group A: [1, 2] where 1 → 2
Group B: [3, 4] where 3 → 4
Group dependency: A → B

Must output: [1, 2, 3, 4] or [2, 1, 3, 4]
             (A's items first, then B's items)
```

---

## 🔍 Algorithm

### Two-Level Topological Sort:

1. **Preprocessing**:
   - Assign unique group IDs to items with group = -1
   - Build item → group mapping

2. **Build Group Graph**:
   - For each dependency u → v:
     - If group[u] ≠ group[v]:
       - Add edge: group[u] → group[v]

3. **Build Item Graph** (per group):
   - For each dependency u → v:
     - If group[u] = group[v]:
       - Add edge: u → v

4. **Sort Groups**: Topological sort on group graph

5. **Sort Items**: For each group (in order), topological sort items

6. **Concatenate**: Combine all sorted item lists

---

## 💻 Code

### Solution: Two-Level Kahn's Algorithm

```javascript
/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */
var sortItems = function (n, m, group, beforeItems) {
  // Step 1: Assign unique group IDs to ungrouped items
  let groupId = m;
  for (let i = 0; i < n; i++) {
    if (group[i] === -1) {
      group[i] = groupId++;
    }
  }

  const totalGroups = groupId;

  // Step 2: Build graphs and in-degrees
  const groupGraph = Array.from({ length: totalGroups }, () => []);
  const groupInDegree = Array(totalGroups).fill(0);

  const itemGraph = Array.from({ length: n }, () => []);
  const itemInDegree = Array(n).fill(0);

  // Step 3: Build group and item dependencies
  for (let i = 0; i < n; i++) {
    for (const beforeItem of beforeItems[i]) {
      const beforeGroup = group[beforeItem];
      const currentGroup = group[i];

      if (beforeGroup !== currentGroup) {
        // Different groups: add group dependency
        groupGraph[beforeGroup].push(currentGroup);
        groupInDegree[currentGroup]++;
      } else {
        // Same group: add item dependency
        itemGraph[beforeItem].push(i);
        itemInDegree[i]++;
      }
    }
  }

  // Step 4: Topological sort helper using Kahn's
  function topologicalSort(graph, inDegree, nodes) {
    const queue = [];
    for (const node of nodes) {
      if (inDegree[node] === 0) {
        queue.push(node);
      }
    }

    const result = [];

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node);

      for (const neighbor of graph[node]) {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      }
    }

    return result.length === nodes.length ? result : null;
  }

  // Step 5: Sort groups
  const sortedGroups = topologicalSort(
    groupGraph,
    groupInDegree,
    Array.from({ length: totalGroups }, (_, i) => i)
  );

  if (!sortedGroups) return []; // Cycle in groups

  // Step 6: Sort items within each group
  const result = [];

  for (const groupNum of sortedGroups) {
    // Get all items in this group
    const itemsInGroup = [];
    for (let i = 0; i < n; i++) {
      if (group[i] === groupNum) {
        itemsInGroup.push(i);
      }
    }

    // Sort items in this group
    const sortedItems = topologicalSort(itemGraph, itemInDegree, itemsInGroup);

    if (!sortedItems) return []; // Cycle in items

    result.push(...sortedItems);
  }

  return result;
};
```

---

## ⏱️ Time and Space Complexity

**Time Complexity: O(N + M + E)**

where N = items, M = groups, E = dependencies

- Assign groups: O(N)
- Build graphs: O(E)
- Sort groups: O(M + group edges)
- Sort items: O(N + E)
- **Total: O(N + M + E)**

**Space Complexity: O(N + M + E)**

- Group graph: O(M + E)
- Item graph: O(N + E)
- In-degrees: O(N + M)

---

## 🎯 Dry Run

### Input:

```
n = 5
m = 2
group = [0, 0, 1, -1, -1]
beforeItems = [[],[0],[],[],[3]]
```

### Step 1: Assign Groups

```
Item 3: group -1 → group 2
Item 4: group -1 → group 3

Updated groups: [0, 0, 1, 2, 3]
Total groups: 4
```

### Step 2: Build Graphs

**Item Dependencies:**

```
Item 1 needs: [0]  (same group 0)
Item 2 needs: []   
Item 4 needs: [3]  (different groups: 2 → 3)
```

**Group Graph:**

```
Group 2 → Group 3
```

**Item Graph:**

```
0 → 1 (within group 0)
3 has no dependencies
4 has no item dependencies (group dependency handled separately)
```

### Step 3: Sort Groups

```
Groups by in-degree:
0: 0
1: 0
2: 0
3: 1

Sorted groups: [0, 1, 2, 3]
```

### Step 4: Sort Items in Each Group

**Group 0: [0, 1]**

```
In-degrees: {0:0, 1:1}
Sorted: [0, 1]
```

**Group 1: [2]**

```
Sorted: [2]
```

**Group 2: [3]**

```
Sorted: [3]
```

**Group 3: [4]**

```
Sorted: [4]
```

### Result:

```
[0, 1, 2, 3, 4]
```

---

## 🎓 Key Takeaways

1. **Two-Level Sort**: Groups first, then items within groups
2. **Unique Group IDs**: Assign to ungrouped items
3. **Two Separate Graphs**: Group dependencies + item dependencies
4. **Two Cycle Checks**: Must be valid at both levels
5. **Kahn's Twice**: Same algorithm, different graphs
6. **Hard Problem**: Requires careful graph construction

---

## 🔄 Why This is Hard

- **Two levels** of topological sort
- **Graph construction** is complex
- **Must handle ungrouped** items specially
- **Two cycle checks** required
- **Concatenation** order matters

---

## 📚 Related Problems

1. **Course Schedule II** (LeetCode 210) - Single-level topological sort
2. **Alien Dictionary** (LeetCode 269) - Graph construction
3. **Parallel Courses** (LeetCode 1136) - Level tracking
4. **Sequence Reconstruction** (LeetCode 444) - Unique ordering

---

