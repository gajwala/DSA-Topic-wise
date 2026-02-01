# 58. Binary Tree Level Order Traversal

**LeetCode Link**: [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

**Difficulty**: Medium

**Topics**: Tree, Breadth-First Search, Binary Tree

---

## Problem Statement

Given the `root` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

### Examples

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]

    3
   / \
  9  20
    /  \
   15   7
```

**Example 2:**
```
Input: root = [1]
Output: [[1]]
```

**Example 3:**
```
Input: root = []
Output: []
```

### Constraints
- The number of nodes in the tree is in the range `[0, 2000]`
- `-1000 <= Node.val <= 1000`

---

## Approach: BFS with Queue (Optimal!) ✅

### Implementation

```javascript
/**
 * BFS - O(n) time, O(w) space
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrder(root) {
    if (root === null) {
        return [];
    }
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        // Process all nodes at current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}

// Test
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log(levelOrder(root)); // [[3],[9,20],[15,7]]
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(w)` - Queue width

---

## Key Takeaways

✅ Classic BFS with level tracking  
✅ Process level by level using queue size  
✅ O(n) time, O(w) space  
✅ Foundation for many tree problems  

**Pattern**: Level order traversal → BFS with queue!
