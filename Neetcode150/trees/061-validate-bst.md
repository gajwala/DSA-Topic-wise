# 61. Validate Binary Search Tree

**LeetCode Link**: [98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)

**Difficulty**: Medium

**Topics**: Tree, Depth-First Search, Binary Search Tree, Binary Tree

---

## Problem Statement

Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).

A **valid BST** is defined as follows:
- The left subtree of a node contains only nodes with keys **less than** the node's key
- The right subtree of a node contains only nodes with keys **greater than** the node's key
- Both the left and right subtrees must also be binary search trees

### Examples

**Example 1:**
```
Input: root = [2,1,3]
Output: true

  2
 / \
1   3
```

**Example 2:**
```
Input: root = [5,1,4,null,null,3,6]
Output: false

    5
   / \
  1   4
     / \
    3   6

Explanation: Right child 4 < root 5, but has left child 3 < 5
```

### Constraints
- The number of nodes in the tree is in the range `[1, 10^4]`
- `-2^31 <= Node.val <= 2^31 - 1`

---

## Approach: DFS with Range (Optimal!) ✅

### Implementation

```javascript
/**
 * DFS with Range - O(n) time, O(h) space
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBST(root) {
    function validate(node, min, max) {
        if (node === null) {
            return true;
        }
        
        // Check current node's value is in valid range
        if (node.val <= min || node.val >= max) {
            return false;
        }
        
        // Check left: all values must be < node.val
        // Check right: all values must be > node.val
        return validate(node.left, min, node.val) &&
               validate(node.right, node.val, max);
    }
    
    return validate(root, -Infinity, Infinity);
}

// Test
const root1 = new TreeNode(2);
root1.left = new TreeNode(1);
root1.right = new TreeNode(3);
console.log(isValidBST(root1)); // true

const root2 = new TreeNode(5);
root2.left = new TreeNode(1);
root2.right = new TreeNode(4);
root2.right.left = new TreeNode(3);
root2.right.right = new TreeNode(6);
console.log(isValidBST(root2)); // false
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(h)` - Recursion stack

---

## Approach 2: Inorder Traversal

### Implementation

```javascript
/**
 * Inorder Traversal - O(n) time, O(n) space
 */
function isValidBSTInorder(root) {
    const values = [];
    
    function inorder(node) {
        if (node === null) return;
        inorder(node.left);
        values.push(node.val);
        inorder(node.right);
    }
    
    inorder(root);
    
    // Check if sorted and no duplicates
    for (let i = 1; i < values.length; i++) {
        if (values[i] <= values[i - 1]) {
            return false;
        }
    }
    
    return true;
}

// Optimized: Track previous value
function isValidBSTInorderOptimized(root) {
    let prev = -Infinity;
    
    function inorder(node) {
        if (node === null) return true;
        
        if (!inorder(node.left)) return false;
        
        if (node.val <= prev) return false;
        prev = node.val;
        
        return inorder(node.right);
    }
    
    return inorder(root);
}
```

---

## Key Takeaways

✅ Pass valid range down the tree  
✅ Left child: (min, node.val)  
✅ Right child: (node.val, max)  
✅ Inorder traversal should be strictly increasing  
✅ O(n) time, O(h) space optimal  

**Pattern**: Validate BST → DFS with range constraints!
