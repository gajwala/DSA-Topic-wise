# 64. Binary Tree Maximum Path Sum

**LeetCode Link**: [124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

**Difficulty**: Hard

**Topics**: Dynamic Programming, Tree, Depth-First Search, Binary Tree

---

## Problem Statement

A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the `root` of a binary tree, return the maximum **path sum** of any non-empty path.

### Examples

**Example 1:**
```
Input: root = [1,2,3]
Output: 6
Explanation: Path 2 -> 1 -> 3

  1
 / \
2   3
```

**Example 2:**
```
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: Path 15 -> 20 -> 7

   -10
   /  \
  9   20
     /  \
    15   7
```

### Constraints
- The number of nodes in the tree is in the range `[1, 3 * 10^4]`
- `-1000 <= Node.val <= 1000`

---

## Approach: DFS with Global Max (Optimal!) ✅

### Implementation

```javascript
/**
 * DFS - O(n) time, O(h) space
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSum(root) {
    let maxSum = -Infinity;
    
    function maxGain(node) {
        if (node === null) {
            return 0;
        }
        
        // Max sum on left and right (ignore negative)
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);
        
        // Path through current node
        const pathSum = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, pathSum);
        
        // Return max gain if continuing path
        return node.val + Math.max(leftGain, rightGain);
    }
    
    maxGain(root);
    return maxSum;
}

// Test
const root = new TreeNode(-10);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log(maxPathSum(root)); // 42
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(h)` - Recursion stack

---

## Key Takeaways

✅ Track max path sum globally  
✅ At each node: check path through node  
✅ Return single-path max for parent  
✅ Ignore negative contributions  
✅ O(n) time, O(h) space  

**Pattern**: Tree path sum → DFS with global max!
