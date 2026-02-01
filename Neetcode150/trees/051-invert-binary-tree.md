# 51. Invert Binary Tree

**LeetCode Link**: [226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)

**Difficulty**: Easy

**Topics**: Tree, Depth-First Search, Breadth-First Search, Binary Tree

---

## Problem Statement

Given the `root` of a binary tree, invert the tree, and return its root.

### Examples

**Example 1:**
```
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]

     4                4
   /   \            /   \
  2     7    =>    7     2
 / \   / \        / \   / \
1   3 6   9      9   6 3   1
```

**Example 2:**
```
Input: root = [2,1,3]
Output: [2,3,1]

  2        2
 / \  =>  / \
1   3    3   1
```

**Example 3:**
```
Input: root = []
Output: []
```

### Constraints
- The number of nodes in the tree is in the range `[0, 100]`
- `-100 <= Node.val <= 100`

---

## Tree Node Definition

```javascript
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}
```

---

## Approach 1: Recursive DFS (Optimal!) ✅

### Intuition
Recursively swap left and right subtrees for each node. Simple and elegant.

### Implementation

```javascript
/**
 * Recursive DFS - O(n) time, O(h) space
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTree(root) {
    // Base case: empty tree
    if (root === null) {
        return null;
    }
    
    // Swap left and right children
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
    
    // Recursively invert subtrees
    invertTree(root.left);
    invertTree(root.right);
    
    return root;
}

// Alternative: Swap after recursion
function invertTreeAlt(root) {
    if (root === null) return null;
    
    // Recursively invert subtrees first
    const left = invertTree(root.left);
    const right = invertTree(root.right);
    
    // Then swap
    root.left = right;
    root.right = left;
    
    return root;
}

// Test
const root = new TreeNode(4);
root.left = new TreeNode(2);
root.right = new TreeNode(7);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(3);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(9);

const inverted = invertTree(root);
// Result: tree inverted
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(h)` - Recursion stack, h = height (O(log n) balanced, O(n) worst)

---

## Approach 2: Iterative BFS (Level Order)

```javascript
/**
 * Iterative BFS - O(n) time, O(w) space
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTreeBFS(root) {
    if (root === null) return null;
    
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        
        // Swap children
        const temp = node.left;
        node.left = node.right;
        node.right = temp;
        
        // Add children to queue
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
    }
    
    return root;
}
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(w)` - Queue, w = max width (O(n/2) for complete tree)

---

## Approach 3: Iterative DFS (Stack)

```javascript
/**
 * Iterative DFS - O(n) time, O(h) space
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTreeDFS(root) {
    if (root === null) return null;
    
    const stack = [root];
    
    while (stack.length > 0) {
        const node = stack.pop();
        
        // Swap children
        const temp = node.left;
        node.left = node.right;
        node.right = temp;
        
        // Add children to stack
        if (node.left !== null) stack.push(node.left);
        if (node.right !== null) stack.push(node.right);
    }
    
    return root;
}
```

---

## Visual Example

```
Original Tree:
     4
   /   \
  2     7
 / \   / \
1   3 6   9

Step-by-step Inversion (Recursive):
────────────────────────────────────

Step 1: At root (4)
  Swap: left(2) <-> right(7)
     4
   /   \
  7     2
 / \   / \
6   9 1   3

Step 2: Recurse left (7)
  Swap: left(6) <-> right(9)
     4
   /   \
  7     2
 / \   / \
9   6 1   3

Step 3: Recurse right (2)
  Swap: left(1) <-> right(3)
     4
   /   \
  7     2
 / \   / \
9   6 3   1

Result: Inverted! ✓
```

---

## Edge Cases

```javascript
// Empty tree
console.log(invertTree(null)); // null

// Single node
const single = new TreeNode(1);
console.log(invertTree(single)); // 1

// Only left child
const leftOnly = new TreeNode(2);
leftOnly.left = new TreeNode(1);
console.log(invertTree(leftOnly)); 
// 2 with right child 1

// Only right child
const rightOnly = new TreeNode(2);
rightOnly.right = new TreeNode(3);
console.log(invertTree(rightOnly)); 
// 2 with left child 3

// Complete binary tree
const complete = new TreeNode(1);
complete.left = new TreeNode(2);
complete.right = new TreeNode(3);
complete.left.left = new TreeNode(4);
complete.left.right = new TreeNode(5);
complete.right.left = new TreeNode(6);
complete.right.right = new TreeNode(7);
console.log(invertTree(complete));
// Fully inverted

// Skewed tree
const skewed = new TreeNode(1);
skewed.left = new TreeNode(2);
skewed.left.left = new TreeNode(3);
console.log(invertTree(skewed));
// Becomes right-skewed
```

---

## Common Mistakes

### ❌ Mistake 1: Not using temp variable
```javascript
// Wrong - loses reference
root.left = root.right;
root.right = root.left; // Now both point to original right!

// Correct - use temp
const temp = root.left;
root.left = root.right;
root.right = temp;
```

### ❌ Mistake 2: Modifying during recursion incorrectly
```javascript
// Wrong - swaps twice
root.left = invertTree(root.right);
root.right = invertTree(root.left); // root.left already changed!

// Correct - save references first
const left = invertTree(root.left);
const right = invertTree(root.right);
root.left = right;
root.right = left;
```

### ❌ Mistake 3: Not returning root
```javascript
// Wrong - returns undefined
function invertTree(root) {
    if (root === null) return null;
    // ... swap logic
    invertTree(root.left);
    invertTree(root.right);
    // Missing return!
}

// Correct
function invertTree(root) {
    if (root === null) return null;
    // ... swap logic
    invertTree(root.left);
    invertTree(root.right);
    return root; // Return the root!
}
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Invert means swap all left and right children? Modify in-place? Yes."

2. **Approach**: "Three options:
   - Recursive: Simple, clean
   - BFS: Level-by-level
   - DFS with stack: Iterative"

3. **Key insight**: "For each node, just swap its children. Recursion handles the rest."

4. **Complexity**: "All O(n) time. Recursive O(h) space, BFS O(w) space where w is max width"

### Follow-up Questions:

**Q: Can you do it without modifying the original tree?**
```javascript
function invertTreeCopy(root) {
    if (root === null) return null;
    
    // Create new node with swapped children
    const newRoot = new TreeNode(root.val);
    newRoot.left = invertTreeCopy(root.right);
    newRoot.right = invertTreeCopy(root.left);
    
    return newRoot;
}
```

**Q: What if we only want to invert up to depth k?**
```javascript
function invertTreeUpToDepth(root, k, depth = 0) {
    if (root === null || depth >= k) {
        return root;
    }
    
    // Swap
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
    
    // Recurse with depth tracking
    invertTreeUpToDepth(root.left, k, depth + 1);
    invertTreeUpToDepth(root.right, k, depth + 1);
    
    return root;
}
```

**Q: How would you verify the tree is correctly inverted?**
```javascript
function areInverted(original, inverted) {
    if (original === null && inverted === null) return true;
    if (original === null || inverted === null) return false;
    
    return original.val === inverted.val &&
           areInverted(original.left, inverted.right) &&
           areInverted(original.right, inverted.left);
}
```

---

## Related Problems

- [101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)
- [100. Same Tree](https://leetcode.com/problems/same-tree/)
- [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

---

## Interesting Fact

This problem became famous when Max Howell (creator of Homebrew) tweeted:
> "Google: 90% of our engineers use the software you wrote (Homebrew), but you can't invert a binary tree on a whiteboard so f*** off."

---

## Key Takeaways

✅ Simple recursive solution most elegant  
✅ Swap children at each node  
✅ Can use DFS or BFS  
✅ O(n) time, O(h) space for recursion  
✅ Use temp variable when swapping  

**Pattern**: Tree inversion → Swap children recursively!
