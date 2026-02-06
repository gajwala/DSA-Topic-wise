# 69. Course Schedule

**LeetCode Link**: [207. Course Schedule](https://leetcode.com/problems/course-schedule/)

**Difficulty**: Medium

**Topics**: Depth-First Search, Breadth-First Search, Graph, Topological Sort

---

## Problem Statement

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.

Return `true` if you can finish all courses. Otherwise, return `false`.

### Examples

**Example 1:**
```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: 0 then 1
```

**Example 2:**
```
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: Cycle: 0→1→0
```

### Constraints
- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`

---

## Approach 1: DFS Cycle Detection (Topological Sort) ✅

### Implementation

```javascript
/**
 * DFS - Detect cycle - O(V+E) time, O(V) space
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }
    
    const state = new Array(numCourses).fill(0); // 0=unvisited, 1=visiting, 2=done
    
    function hasCycle(course) {
        if (state[course] === 1) return true;  // Cycle
        if (state[course] === 2) return false; // Done
        
        state[course] = 1; // Visiting
        
        for (const next of graph[course]) {
            if (hasCycle(next)) return true;
        }
        
        state[course] = 2; // Done
        return false;
    }
    
    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i)) return false;
    }
    
    return true;
}
```

### Complexity Analysis
- **Time**: `O(V + E)`
- **Space**: `O(V)`

---

## Approach 2: Kahn's Algorithm (BFS)

```javascript
function canFinishBFS(numCourses, prerequisites) {
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
    
    let count = 0;
    while (queue.length > 0) {
        const node = queue.shift();
        count++;
        for (const next of graph[node]) {
            indegree[next]--;
            if (indegree[next] === 0) queue.push(next);
        }
    }
    
    return count === numCourses;
}
```

---

## Key Takeaways

✅ Problem = detect cycle in directed graph  
✅ DFS: 3-state (unvisited, visiting, done)  
✅ BFS: Kahn's with indegree  
✅ O(V+E) for both  

**Pattern**: Course/prerequisite → Topological sort / cycle detection!
