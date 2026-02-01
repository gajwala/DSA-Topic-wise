# 57. Lowest Common Ancestor of a BST

**LeetCode Link**: [235. Lowest Common Ancestor of a Binary Search Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

**Difficulty**: Medium

**Topics**: Tree, Depth-First Search, Binary Search Tree, Binary Tree

---

## Problem Statement

Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

The lowest common ancestor is defined as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).

### Examples

**Example 1:**
```
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6

        6
       / \
      2   8
     / \ / \
    0  4 7  9
      / \
     3   5

LCA(2, 8) = 6
```

**Example 2:**
```
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
```

### Constraints
- The number of nodes in the tree is in the range `[2, 10^5]`
- `-10^9 <= Node.val <= 10^9`
- All `Node.val` are unique
- `p != q`
- `p` and `q` will exist in the BST

---

## Approach: BST Property (Optimal!) ✅

### Implementation

```javascript
/**
 * Iterative - O(h) time, O(1) space
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
    let current = root;
    
    while (current !== null) {
        // Both in left subtree
        if (p.val < current.val && q.val < current.val) {
            current = current.left;
        }
        // Both in right subtree
        else if (p.val > current.val && q.val > current.val) {
            current = current.right;
        }
        // Split point found
        else {
            return current;
        }
    }
    
    return null;
}

// Recursive version
function lowestCommonAncestorRecursive(root, p, q) {
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }
    return root;
}
```

### Complexity Analysis
- **Time Complexity**: `O(h)` where h = height
- **Space Complexity**: `O(1)` iterative, O(h) recursive

---

## Key Takeaways

✅ Use BST property for efficient solution  
✅ LCA is split point where paths diverge  
✅ O(h) time, O(1) space iterative  
✅ Much simpler than general binary tree LCA  

**Pattern**: BST LCA → Follow BST property!
