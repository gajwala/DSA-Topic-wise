# 70. Course Schedule II

**LeetCode Link**: [210. Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)

**Difficulty**: Medium

**Topics**: Depth-First Search, Breadth-First Search, Graph, Topological Sort

---

## Problem Statement

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.

Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

### Examples

**Example 1:**
```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
```

**Example 2:**
```
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3] or [0,1,2,3]
```

### Constraints
- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`

---

## Approach: DFS Topological Sort ✅

### Implementation

```javascript
/**
 * DFS Topological Sort - O(V+E) time, O(V) space
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
function findOrder(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }
    
    const state = new Array(numCourses).fill(0);
    const order = [];
    
    function dfs(course) {
        if (state[course] === 1) return false; // Cycle
        if (state[course] === 2) return true;
        
        state[course] = 1;
        for (const next of graph[course]) {
            if (!dfs(next)) return false;
        }
        state[course] = 2;
        order.push(course);
        return true;
    }
    
    for (let i = 0; i < numCourses; i++) {
        if (!dfs(i)) return [];
    }
    
    return order.reverse();
}
```

### Complexity Analysis
- **Time**: `O(V + E)`
- **Space**: `O(V)`

---

## Kahn's Algorithm (BFS)

```javascript
function findOrderBFS(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    const indegree = new Array(numCourses).fill(0);
    
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        indegree[course]++;
    }
    
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) queue.push(i);
    }
    
    const order = [];
    while (queue.length > 0) {
        const node = queue.shift();
        order.push(node);
        for (const next of graph[node]) {
            indegree[next]--;
            if (indegree[next] === 0) queue.push(next);
        }
    }
    
    return order.length === numCourses ? order : [];
}
```

---

## Key Takeaways

✅ Return topological order, not just true/false  
✅ DFS: push to list when done, then reverse  
✅ BFS: Kahn's gives order directly  
✅ Cycle → return []  

**Pattern**: Topological sort → return order!
