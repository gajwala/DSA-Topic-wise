# 67. Clone Graph

**LeetCode Link**: [133. Clone Graph](https://leetcode.com/problems/clone-graph/)

**Difficulty**: Medium

**Topics**: Hash Table, Depth-First Search, Breadth-First Search, Graph

---

## Problem Statement

Given a reference of a node in a connected undirected graph, return a **deep copy** (clone) of the graph.

Each node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.

### Examples

**Example 1:**
```
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
```

### Constraints
- Number of nodes in the graph is in the range `[0, 100]`
- `1 <= Node.val <= 100`
- No repeated edges and no self-loops

---

## Approach: DFS with HashMap ✅

### Implementation

```javascript
/**
 * DFS + HashMap - O(V+E) time, O(V) space
 * @param {Node} node
 * @return {Node}
 */
function cloneGraph(node) {
    if (node === null) return null;
    
    const map = new Map(); // old node -> new node
    
    function dfs(original) {
        if (map.has(original)) {
            return map.get(original);
        }
        
        const copy = new Node(original.val);
        map.set(original, copy);
        
        for (const neighbor of original.neighbors) {
            copy.neighbors.push(dfs(neighbor));
        }
        
        return copy;
    }
    
    return dfs(node);
}

// Node definition
function Node(val, neighbors) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
}
```

### Complexity Analysis
- **Time**: `O(V + E)` - Visit each node and edge once
- **Space**: `O(V)` - HashMap + recursion

---

## BFS Version

```javascript
function cloneGraphBFS(node) {
    if (node === null) return null;
    
    const map = new Map();
    const queue = [node];
    map.set(node, new Node(node.val));
    
    while (queue.length > 0) {
        const curr = queue.shift();
        for (const neighbor of curr.neighbors) {
            if (!map.has(neighbor)) {
                map.set(neighbor, new Node(neighbor.val));
                queue.push(neighbor);
            }
            map.get(curr).neighbors.push(map.get(neighbor));
        }
    }
    
    return map.get(node);
}
```

---

## Key Takeaways

✅ HashMap: old node → new node  
✅ DFS/BFS: create copy and link neighbors  
✅ Handle null and cycles via map  
✅ O(V+E) time, O(V) space  

**Pattern**: Clone graph → HashMap + DFS/BFS!
