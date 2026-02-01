# 62. Kth Smallest Element in a BST

**LeetCode Link**: [230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

**Difficulty**: Medium

**Topics**: Tree, Depth-First Search, Binary Search Tree, Binary Tree

---

## Problem Statement

Given the `root` of a binary search tree, and an integer `k`, return the `kth` smallest value (1-indexed) of all the values of the nodes in the tree.

### Examples

**Example 1:**
```
Input: root = [3,1,4,null,2], k = 1
Output: 1

  3
 / \
1   4
 \
  2
```

**Example 2:**
```
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3

      5
     / \
    3   6
   / \
  2   4
 /
1
```

### Constraints
- The number of nodes in the tree is `n`
- `1 <= k <= n <= 10^4`
- `0 <= Node.val <= 10^4`

---

## Approach: Inorder Traversal (Optimal!) ✅

### Implementation

```javascript
/**
 * Inorder DFS - O(h + k) time, O(h) space
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
function kthSmallest(root, k) {
    let count = 0;
    let result = null;
    
    function inorder(node) {
        if (node === null || result !== null) {
            return;
        }
        
        // Left
        inorder(node.left);
        
        // Process current
        count++;
        if (count === k) {
            result = node.val;
            return;
        }
        
        // Right
        inorder(node.right);
    }
    
    inorder(root);
    return result;
}

// Iterative version
function kthSmallestIterative(root, k) {
    const stack = [];
    let current = root;
    let count = 0;
    
    while (current !== null || stack.length > 0) {
        // Go to leftmost node
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        count++;
        
        if (count === k) {
            return current.val;
        }
        
        current = current.right;
    }
    
    return -1;
}

// Test
const root = new TreeNode(3);
root.left = new TreeNode(1);
root.right = new TreeNode(4);
root.left.right = new TreeNode(2);

console.log(kthSmallest(root, 1)); // 1
```

### Complexity Analysis
- **Time Complexity**: `O(h + k)` - Go to leftmost then k nodes
- **Space Complexity**: `O(h)` - Stack/recursion

---

## Key Takeaways

✅ Inorder traversal of BST gives sorted order  
✅ Stop at kth element for efficiency  
✅ O(h + k) time, O(h) space  
✅ Can use recursive or iterative  

**Pattern**: Kth element in BST → Inorder traversal!
