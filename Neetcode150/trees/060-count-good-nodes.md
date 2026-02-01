# 60. Count Good Nodes in Binary Tree

**LeetCode Link**: [1448. Count Good Nodes in Binary Tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree/)

**Difficulty**: Medium

**Topics**: Tree, Depth-First Search, Breadth-First Search, Binary Tree

---

## Problem Statement

Given a binary tree `root`, a node X in the tree is named **good** if in the path from root to X there are no nodes with a value greater than X.

Return the number of **good** nodes in the binary tree.

### Examples

**Example 1:**
```
Input: root = [3,1,4,3,null,1,5]
Output: 4

      3
     / \
    1   4
   /   / \
  3   1   5

Good nodes: 3, 4, 3, 5
```

**Example 2:**
```
Input: root = [3,3,null,4,2]
Output: 3
```

### Constraints
- The number of nodes in the binary tree is in the range `[1, 10^5]`
- Each node's value is between `[-10^4, 10^4]`

---

## Approach: DFS with Max Tracking (Optimal!) ✅

### Implementation

```javascript
/**
 * DFS - O(n) time, O(h) space
 * @param {TreeNode} root
 * @return {number}
 */
function goodNodes(root) {
    function dfs(node, maxSoFar) {
        if (node === null) {
            return 0;
        }
        
        let count = 0;
        
        // Current node is good if >= all ancestors
        if (node.val >= maxSoFar) {
            count = 1;
        }
        
        // Update max for children
        const newMax = Math.max(maxSoFar, node.val);
        
        // Count good nodes in subtrees
        count += dfs(node.left, newMax);
        count += dfs(node.right, newMax);
        
        return count;
    }
    
    return dfs(root, root.val);
}

// Test
const root = new TreeNode(3);
root.left = new TreeNode(1);
root.right = new TreeNode(4);
root.left.left = new TreeNode(3);
root.right.left = new TreeNode(1);
root.right.right = new TreeNode(5);

console.log(goodNodes(root)); // 4
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(h)` - Recursion stack

---

## Key Takeaways

✅ Track maximum value on path from root  
✅ Node is good if >= all ancestors  
✅ Pass max down to children  
✅ O(n) time, O(h) space DFS  

**Pattern**: Path tracking → DFS with max parameter!
