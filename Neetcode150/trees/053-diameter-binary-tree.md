# 53. Diameter of Binary Tree

**LeetCode Link**: [543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

**Difficulty**: Easy

**Topics**: Tree, Depth-First Search, Binary Tree

---

## Problem Statement

Given the `root` of a binary tree, return the **length of the diameter** of the tree.

The **diameter** of a binary tree is the **length of the longest path** between any two nodes in a tree. This path may or may not pass through the `root`.

The **length of a path** between two nodes is represented by the number of edges between them.

### Examples

**Example 1:**
```
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3]

      1
     / \
    2   3
   / \
  4   5

Path: 4 -> 2 -> 1 -> 3 (3 edges)
```

**Example 2:**
```
Input: root = [1,2]
Output: 1
```

### Constraints
- The number of nodes in the tree is in the range `[1, 10^4]`
- `-100 <= Node.val <= 100`

---

## Approach: DFS with Global Max (Optimal!) ✅

### Intuition
Diameter at each node = left height + right height. Track maximum while calculating heights.

### Implementation

```javascript
/**
 * DFS - O(n) time, O(h) space
 * @param {TreeNode} root
 * @return {number}
 */
function diameterOfBinaryTree(root) {
    let maxDiameter = 0;
    
    function height(node) {
        if (node === null) {
            return 0;
        }
        
        // Get heights of subtrees
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);
        
        // Update diameter (path through this node)
        const diameter = leftHeight + rightHeight;
        maxDiameter = Math.max(maxDiameter, diameter);
        
        // Return height of this subtree
        return Math.max(leftHeight, rightHeight) + 1;
    }
    
    height(root);
    return maxDiameter;
}

// Test
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log(diameterOfBinaryTree(root)); // 3
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(h)` - Recursion stack

---

## Visual Example

```
Tree:
      1
     / \
    2   3
   / \
  4   5

Calculate diameter at each node:
─────────────────────────────────

At node 4:
  left height = 0, right height = 0
  diameter = 0 + 0 = 0
  height = max(0, 0) + 1 = 1

At node 5:
  left height = 0, right height = 0
  diameter = 0 + 0 = 0
  height = 1

At node 2:
  left height = 1 (from 4)
  right height = 1 (from 5)
  diameter = 1 + 1 = 2 ✓
  height = max(1, 1) + 1 = 2

At node 3:
  left height = 0, right height = 0
  diameter = 0
  height = 1

At node 1 (root):
  left height = 2 (from 2)
  right height = 1 (from 3)
  diameter = 2 + 1 = 3 ✓✓
  height = max(2, 1) + 1 = 3

Maximum diameter = 3 ✓
Path: 4 -> 2 -> 1 -> 3
```

---

## Key Insight

```
Diameter passing through node = left_height + right_height

The longest path might not pass through root!

Example:
      1
     /
    2
   / \
  3   4
 /
5

Diameter at node 2: height(left=2) + height(right=1) = 3
Path: 5 -> 3 -> 2 -> 4

Diameter at root 1: height(left=3) + height(right=0) = 3
Both are same, but path through 2 is the answer!
```

---

## Common Mistakes

### ❌ Mistake 1: Only checking at root
```javascript
// Wrong - misses paths not through root
function diameterWrong(root) {
    if (root === null) return 0;
    const leftHeight = maxDepth(root.left);
    const rightHeight = maxDepth(root.right);
    return leftHeight + rightHeight;
}
// Misses case where longest path is in subtree!

// Correct - check at every node
let maxDiameter = 0;
function height(node) {
    // ... calculate and update maxDiameter at each node
}
```

### ❌ Mistake 2: Counting nodes instead of edges
```javascript
// Wrong - counts nodes (adds 1)
const diameter = leftHeight + rightHeight + 1;

// Correct - counts edges (heights already include nodes)
const diameter = leftHeight + rightHeight;
```

### ❌ Mistake 3: Not using global/external variable
```javascript
// Wrong - can't track max across recursive calls
function diameter(node) {
    if (node === null) return 0;
    const leftH = height(node.left);
    const rightH = height(node.right);
    return Math.max(leftH + rightH, 
                   diameter(node.left), 
                   diameter(node.right));
}
// Recomputes heights multiple times - O(n²)!

// Correct - use global variable, compute once
let maxDiameter = 0;
function height(node) {
    // Calculate height and update maxDiameter
}
```

---

## Edge Cases

```javascript
// Single node
const single = new TreeNode(1);
console.log(diameterOfBinaryTree(single)); // 0

// Two nodes
const two = new TreeNode(1);
two.left = new TreeNode(2);
console.log(diameterOfBinaryTree(two)); // 1

// Skewed tree
const skewed = new TreeNode(1);
skewed.left = new TreeNode(2);
skewed.left.left = new TreeNode(3);
skewed.left.left.left = new TreeNode(4);
console.log(diameterOfBinaryTree(skewed)); // 3

// Balanced tree
const balanced = new TreeNode(1);
balanced.left = new TreeNode(2);
balanced.right = new TreeNode(3);
balanced.left.left = new TreeNode(4);
balanced.left.right = new TreeNode(5);
balanced.right.left = new TreeNode(6);
balanced.right.right = new TreeNode(7);
console.log(diameterOfBinaryTree(balanced)); // 4
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Diameter = longest path? Count edges not nodes? May not pass through root? Yes."

2. **Key insight**: "At each node, diameter = left_height + right_height. Track maximum globally."

3. **Why single pass works**: "Calculate height bottom-up, update diameter at each node."

4. **Complexity**: "O(n) time single pass, O(h) space for recursion"

### Follow-up Questions:

**Q: Can you return the actual path?**
```javascript
function diameterPath(root) {
    let maxDiameter = 0;
    let maxPath = [];
    
    function heightAndPath(node) {
        if (node === null) return [0, []];
        
        const [leftH, leftPath] = heightAndPath(node.left);
        const [rightH, rightPath] = heightAndPath(node.right);
        
        const diameter = leftH + rightH;
        if (diameter > maxDiameter) {
            maxDiameter = diameter;
            maxPath = [...leftPath.reverse(), node.val, ...rightPath];
        }
        
        if (leftH > rightH) {
            return [leftH + 1, [...leftPath, node.val]];
        } else {
            return [rightH + 1, [...rightPath, node.val]];
        }
    }
    
    heightAndPath(root);
    return maxPath;
}
```

**Q: What if edges have weights?**
A: Different problem - would need to track max sum path, not just count

---

## Related Problems

- [124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
- [687. Longest Univalue Path](https://leetcode.com/problems/longest-univalue-path/)
- [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

---

## Key Takeaways

✅ Diameter = left_height + right_height at each node  
✅ Track maximum globally during height calculation  
✅ Longest path may not pass through root  
✅ O(n) time single pass solution  
✅ Count edges, not nodes  

**Pattern**: Tree diameter → DFS with global max tracking!
