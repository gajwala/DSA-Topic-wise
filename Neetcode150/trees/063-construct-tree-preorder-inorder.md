# 63. Construct Binary Tree from Preorder and Inorder

**LeetCode Link**: [105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

**Difficulty**: Medium

**Topics**: Array, Hash Table, Divide and Conquer, Tree, Binary Tree

---

## Problem Statement

Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.

### Examples

**Example 1:**
```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]

    3
   / \
  9  20
    /  \
   15   7
```

**Example 2:**
```
Input: preorder = [-1], inorder = [-1]
Output: [-1]
```

### Constraints
- `1 <= preorder.length <= 3000`
- `inorder.length == preorder.length`
- `-3000 <= preorder[i], inorder[i] <= 3000`
- All values are **unique**

---

## Approach: Recursive with HashMap (Optimal!) ✅

### Implementation

```javascript
/**
 * Divide and Conquer - O(n) time, O(n) space
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTree(preorder, inorder) {
    // Build hashmap for quick inorder index lookup
    const inorderMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inorderMap.set(inorder[i], i);
    }
    
    let preorderIndex = 0;
    
    function build(left, right) {
        if (left > right) {
            return null;
        }
        
        // Root is next element in preorder
        const rootVal = preorder[preorderIndex++];
        const root = new TreeNode(rootVal);
        
        // Find root position in inorder
        const inorderIndex = inorderMap.get(rootVal);
        
        // Build left and right subtrees
        root.left = build(left, inorderIndex - 1);
        root.right = build(inorderIndex + 1, right);
        
        return root;
    }
    
    return build(0, inorder.length - 1);
}
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(n)` - HashMap + recursion

---

## Key Takeaways

✅ Preorder gives root, inorder gives left/right split  
✅ Use HashMap for O(1) index lookup  
✅ Recursively build left and right subtrees  
✅ O(n) time with hashmap optimization  

**Pattern**: Construct tree from traversals → Divide and conquer!
