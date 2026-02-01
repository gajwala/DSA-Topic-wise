# 59. Binary Tree Right Side View

**LeetCode Link**: [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)

**Difficulty**: Medium

**Topics**: Tree, Depth-First Search, Breadth-First Search, Binary Tree

---

## Problem Statement

Given the `root` of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

### Examples

**Example 1:**
```
Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]

   1         <- 1
  / \
 2   3       <- 3
  \   \
   5   4     <- 4
```

**Example 2:**
```
Input: root = [1,null,3]
Output: [1,3]
```

**Example 3:**
```
Input: root = []
Output: []
```

### Constraints
- The number of nodes in the tree is in the range `[0, 100]`
- `-100 <= Node.val <= 100`

---

## Approach 1: BFS (Level Order)

### Implementation

```javascript
/**
 * BFS - O(n) time, O(w) space
 * @param {TreeNode} root
 * @return {number[]}
 */
function rightSideView(root) {
    if (root === null) {
        return [];
    }
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            // Last node of this level
            if (i === levelSize - 1) {
                result.push(node.val);
            }
            
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
    }
    
    return result;
}
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit all nodes
- **Space Complexity**: `O(w)` - Queue width

---

## Approach 2: DFS (Recursive)

### Implementation

```javascript
/**
 * DFS - O(n) time, O(h) space
 * @param {TreeNode} root
 * @return {number[]}
 */
function rightSideViewDFS(root) {
    const result = [];
    
    function dfs(node, depth) {
        if (node === null) return;
        
        // First node at this depth (rightmost)
        if (depth === result.length) {
            result.push(node.val);
        }
        
        // Visit right first, then left
        dfs(node.right, depth + 1);
        dfs(node.left, depth + 1);
    }
    
    dfs(root, 0);
    return result;
}
```

---

## Key Takeaways

✅ BFS: Take last node of each level  
✅ DFS: Visit right first, track depth  
✅ O(n) time for both approaches  
✅ Right-to-left DFS for right side view  

**Pattern**: Right side view → BFS last node or DFS right-first!
