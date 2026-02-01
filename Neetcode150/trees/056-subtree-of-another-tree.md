# 56. Subtree of Another Tree

**LeetCode Link**: [572. Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)

**Difficulty**: Easy

**Topics**: Tree, Depth-First Search, Binary Tree, String Matching, Hash Function

---

## Problem Statement

Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.

A subtree of a binary tree `tree` is a tree that consists of a node in `tree` and all of this node's descendants. The tree `tree` could also be considered as a subtree of itself.

### Examples

**Example 1:**
```
Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true

    3           4
   / \         / \
  4   5       1   2
 / \
1   2
```

**Example 2:**
```
Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false

      3           4
     / \         / \
    4   5       1   2
   / \
  1   2
 /
0
```

### Constraints
- The number of nodes in the `root` tree is in the range `[1, 2000]`
- The number of nodes in the `subRoot` tree is in the range `[1, 1000]`
- `-10^4 <= root.val <= 10^4`
- `-10^4 <= subRoot.val <= 10^4`

---

## Approach: DFS with Tree Comparison (Optimal!) ✅

### Implementation

```javascript
/**
 * DFS - O(m * n) time, O(h) space
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
function isSubtree(root, subRoot) {
    if (root === null) {
        return false;
    }
    
    // Check if trees are same from this node
    if (isSameTree(root, subRoot)) {
        return true;
    }
    
    // Check left and right subtrees
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(p, q) {
    if (p === null && q === null) return true;
    if (p === null || q === null) return false;
    if (p.val !== q.val) return false;
    
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// Test
const root = new TreeNode(3);
root.left = new TreeNode(4);
root.right = new TreeNode(5);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(2);

const subRoot = new TreeNode(4);
subRoot.left = new TreeNode(1);
subRoot.right = new TreeNode(2);

console.log(isSubtree(root, subRoot)); // true
```

### Complexity Analysis
- **Time Complexity**: `O(m * n)` where m = nodes in root, n = nodes in subRoot
- **Space Complexity**: `O(h)` - Recursion stack

---

## Key Takeaways

✅ Check if trees match at each node  
✅ Use isSameTree helper function  
✅ O(m * n) time complexity  
✅ Recursively check all nodes  

**Pattern**: Subtree matching → DFS + tree comparison!
