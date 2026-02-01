# 52. Maximum Depth of Binary Tree

**LeetCode Link**: [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

**Difficulty**: Easy

**Topics**: Tree, Depth-First Search, Breadth-First Search, Binary Tree

---

## Problem Statement

Given the `root` of a binary tree, return its maximum depth.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

### Examples

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: 3

    3
   / \
  9  20
    /  \
   15   7

Longest path: 3 -> 20 -> 15 (or 7)
Depth: 3
```

**Example 2:**
```
Input: root = [1,null,2]
Output: 2

  1
   \
    2

Depth: 2
```

### Constraints
- The number of nodes in the tree is in the range `[0, 10^4]`
- `-100 <= Node.val <= 100`

---

## Approach 1: Recursive DFS (Optimal!) ✅

### Intuition
Depth = 1 + max(depth of left subtree, depth of right subtree). Base case: null node has depth 0.

### Implementation

```javascript
/**
 * Recursive DFS - O(n) time, O(h) space
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
    // Base case: empty tree has depth 0
    if (root === null) {
        return 0;
    }
    
    // Recursively find depth of left and right subtrees
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    // Return max depth + 1 for current node
    return Math.max(leftDepth, rightDepth) + 1;
}

// One-liner version
function maxDepthOneLiner(root) {
    return root === null ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

// Test
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log(maxDepth(root)); // 3
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(h)` - Recursion stack, h = height

---

## Approach 2: Iterative BFS (Level Order)

```javascript
/**
 * Iterative BFS - O(n) time, O(w) space
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepthBFS(root) {
    if (root === null) {
        return 0;
    }
    
    let depth = 0;
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        depth++; // Increment for this level
        
        // Process all nodes at current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
    }
    
    return depth;
}
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(w)` - Queue, w = max width

---

## Approach 3: Iterative DFS (Stack with Depth)

```javascript
/**
 * Iterative DFS - O(n) time, O(h) space
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepthDFS(root) {
    if (root === null) {
        return 0;
    }
    
    const stack = [[root, 1]]; // [node, depth]
    let maxDepth = 0;
    
    while (stack.length > 0) {
        const [node, depth] = stack.pop();
        maxDepth = Math.max(maxDepth, depth);
        
        if (node.left !== null) {
            stack.push([node.left, depth + 1]);
        }
        if (node.right !== null) {
            stack.push([node.right, depth + 1]);
        }
    }
    
    return maxDepth;
}
```

---

## Visual Example

```
Tree:
    3
   / \
  9  20
    /  \
   15   7

Recursive Calls:
────────────────

maxDepth(3)
  maxDepth(9)
    maxDepth(null) = 0
    maxDepth(null) = 0
    return max(0, 0) + 1 = 1
  
  maxDepth(20)
    maxDepth(15)
      maxDepth(null) = 0
      maxDepth(null) = 0
      return max(0, 0) + 1 = 1
    
    maxDepth(7)
      maxDepth(null) = 0
      maxDepth(null) = 0
      return max(0, 0) + 1 = 1
    
    return max(1, 1) + 1 = 2
  
  return max(1, 2) + 1 = 3 ✓
```

---

## BFS Visualization

```
Tree:
    3
   / \
  9  20
    /  \
   15   7

Level-by-Level:
───────────────

Level 1: [3]
  depth = 1
  Add children: [9, 20]

Level 2: [9, 20]
  depth = 2
  Add children: [15, 7]

Level 3: [15, 7]
  depth = 3
  No children

Result: depth = 3 ✓
```

---

## Edge Cases

```javascript
// Empty tree
console.log(maxDepth(null)); // 0

// Single node
const single = new TreeNode(1);
console.log(maxDepth(single)); // 1

// Only left children (skewed)
const leftSkewed = new TreeNode(1);
leftSkewed.left = new TreeNode(2);
leftSkewed.left.left = new TreeNode(3);
console.log(maxDepth(leftSkewed)); // 3

// Only right children (skewed)
const rightSkewed = new TreeNode(1);
rightSkewed.right = new TreeNode(2);
rightSkewed.right.right = new TreeNode(3);
console.log(maxDepth(rightSkewed)); // 3

// Balanced tree
const balanced = new TreeNode(1);
balanced.left = new TreeNode(2);
balanced.right = new TreeNode(3);
balanced.left.left = new TreeNode(4);
balanced.left.right = new TreeNode(5);
console.log(maxDepth(balanced)); // 3

// Complete binary tree
const complete = new TreeNode(1);
complete.left = new TreeNode(2);
complete.right = new TreeNode(3);
complete.left.left = new TreeNode(4);
complete.left.right = new TreeNode(5);
complete.right.left = new TreeNode(6);
complete.right.right = new TreeNode(7);
console.log(maxDepth(complete)); // 3
```

---

## Common Mistakes

### ❌ Mistake 1: Off-by-one error
```javascript
// Wrong - doesn't count root
function maxDepthWrong(root) {
    if (root === null) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right));
    // Missing + 1!
}

// Correct
function maxDepth(root) {
    if (root === null) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
```

### ❌ Mistake 2: Not handling null children
```javascript
// Wrong - crashes on null
function maxDepthWrong(root) {
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    // Crashes if root is null!
}

// Correct - check for null first
function maxDepth(root) {
    if (root === null) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
```

### ❌ Mistake 3: Counting nodes instead of edges
```javascript
// Note: Some define depth as number of edges
// This returns number of nodes (edges + 1)
// Problem asks for nodes on path

// If problem wants edges:
function maxDepthEdges(root) {
    if (root === null) return -1; // -1 for edges
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Depth = number of nodes or edges? Nodes on longest path."

2. **Approach**: "Three options:
   - Recursive DFS: Most elegant
   - BFS: Level-by-level counting
   - Iterative DFS: Stack with depth tracking"

3. **Key insight**: "Depth = 1 + max of children's depths"

4. **Complexity**: "All O(n) time. Recursive O(h) space, BFS O(w) space"

### Follow-up Questions:

**Q: What's the minimum depth?**
```javascript
function minDepth(root) {
    if (root === null) return 0;
    
    // If one child is null, return depth of other child
    if (root.left === null) return minDepth(root.right) + 1;
    if (root.right === null) return minDepth(root.left) + 1;
    
    // Both children exist
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
}
```

**Q: Can you find the path with maximum depth?**
```javascript
function maxDepthPath(root) {
    if (root === null) return [];
    
    const leftPath = maxDepthPath(root.left);
    const rightPath = maxDepthPath(root.right);
    
    if (leftPath.length > rightPath.length) {
        return [root.val, ...leftPath];
    } else {
        return [root.val, ...rightPath];
    }
}
```

**Q: What if nodes have weights and we want max sum path?**
A: Different problem - need to track sum, not just depth

---

## Related Problems

- [111. Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/)
- [110. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)
- [543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

---

## Key Takeaways

✅ Recursive solution most elegant  
✅ Depth = 1 + max(left depth, right depth)  
✅ Base case: null node has depth 0  
✅ O(n) time for all approaches  
✅ Can use DFS or BFS  

**Pattern**: Tree depth → Recursive max of children + 1!
