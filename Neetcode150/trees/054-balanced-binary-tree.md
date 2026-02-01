# 54. Balanced Binary Tree

**LeetCode Link**: [110. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)

**Difficulty**: Easy

**Topics**: Tree, Depth-First Search, Binary Tree

---

## Problem Statement

Given a binary tree, determine if it is **height-balanced**.

A **height-balanced** binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

### Examples

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: true

    3
   / \
  9  20
    /  \
   15   7
```

**Example 2:**
```
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false

       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
```

**Example 3:**
```
Input: root = []
Output: true
```

### Constraints
- The number of nodes in the tree is in the range `[0, 5000]`
- `-10^4 <= Node.val <= 10^4`

---

## Approach: Bottom-Up DFS (Optimal!) ✅

### Intuition
Calculate height while checking balance. Return -1 if unbalanced to propagate failure.

### Implementation

```javascript
/**
 * Bottom-Up DFS - O(n) time, O(h) space
 * @param {TreeNode} root
 * @return {boolean}
 */
function isBalanced(root) {
    function checkHeight(node) {
        // Base case: empty tree is balanced with height 0
        if (node === null) {
            return 0;
        }
        
        // Check left subtree
        const leftHeight = checkHeight(node.left);
        if (leftHeight === -1) {
            return -1; // Left subtree unbalanced
        }
        
        // Check right subtree
        const rightHeight = checkHeight(node.right);
        if (rightHeight === -1) {
            return -1; // Right subtree unbalanced
        }
        
        // Check if current node is balanced
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1; // Current node unbalanced
        }
        
        // Return height
        return Math.max(leftHeight, rightHeight) + 1;
    }
    
    return checkHeight(root) !== -1;
}

// Test
const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);

console.log(isBalanced(root1)); // true
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(h)` - Recursion stack

---

## Approach 2: Top-Down (Less Efficient)

```javascript
/**
 * Top-Down - O(n²) worst case
 * @param {TreeNode} root
 * @return {boolean}
 */
function isBalancedTopDown(root) {
    if (root === null) {
        return true;
    }
    
    // Get heights
    const leftHeight = height(root.left);
    const rightHeight = height(root.right);
    
    // Check current node and recursively check subtrees
    return Math.abs(leftHeight - rightHeight) <= 1 &&
           isBalanced(root.left) &&
           isBalanced(root.right);
}

function height(node) {
    if (node === null) return 0;
    return Math.max(height(node.left), height(node.right)) + 1;
}
```

**Complexity**: O(n²) - Recomputes heights multiple times

---

## Visual Example

```
Balanced Tree:
    3
   / \
  9  20
    /  \
   15   7

Check from bottom-up:
─────────────────────

checkHeight(9):
  left = 0, right = 0
  diff = |0 - 0| = 0 ≤ 1 ✓
  return 1

checkHeight(15):
  left = 0, right = 0
  diff = 0 ≤ 1 ✓
  return 1

checkHeight(7):
  left = 0, right = 0
  diff = 0 ≤ 1 ✓
  return 1

checkHeight(20):
  left = 1, right = 1
  diff = |1 - 1| = 0 ≤ 1 ✓
  return 2

checkHeight(3):
  left = 1, right = 2
  diff = |1 - 2| = 1 ≤ 1 ✓
  return 3

Result: Balanced ✓
```

---

## Unbalanced Example

```
Unbalanced Tree:
       1
      / \
     2   2
    / \
   3   3
  / \
 4   4

Check from bottom-up:
─────────────────────

checkHeight(4): return 1
checkHeight(4): return 1

checkHeight(3) [left]:
  left = 1, right = 1
  diff = 0 ≤ 1 ✓
  return 2

checkHeight(3) [right]:
  left = 1, right = 1
  diff = 0 ≤ 1 ✓
  return 2

checkHeight(2) [left]:
  left = 2, right = 2
  diff = 0 ≤ 1 ✓
  return 3

checkHeight(2) [right]:
  left = 0, right = 0
  return 1

checkHeight(1):
  left = 3, right = 1
  diff = |3 - 1| = 2 > 1 ✗
  return -1

Result: Not Balanced ✗
```

---

## Key Insight

```
Why bottom-up is better:

Top-Down (O(n²)):
- At each node, calculate height of subtrees
- Recomputes same heights multiple times
- height() called O(n) times, each takes O(n)

Bottom-Up (O(n)):
- Calculate height once per node
- Check balance while calculating height
- Use -1 to signal unbalanced
- Early termination on failure
```

---

## Edge Cases

```javascript
// Empty tree
console.log(isBalanced(null)); // true

// Single node
const single = new TreeNode(1);
console.log(isBalanced(single)); // true

// Two nodes balanced
const twoBalanced = new TreeNode(1);
twoBalanced.left = new TreeNode(2);
console.log(isBalanced(twoBalanced)); // true

// Skewed tree (unbalanced)
const skewed = new TreeNode(1);
skewed.left = new TreeNode(2);
skewed.left.left = new TreeNode(3);
console.log(isBalanced(skewed)); // false

// Perfect binary tree
const perfect = new TreeNode(1);
perfect.left = new TreeNode(2);
perfect.right = new TreeNode(3);
perfect.left.left = new TreeNode(4);
perfect.left.right = new TreeNode(5);
perfect.right.left = new TreeNode(6);
perfect.right.right = new TreeNode(7);
console.log(isBalanced(perfect)); // true

// Balanced but not perfect
const balanced = new TreeNode(1);
balanced.left = new TreeNode(2);
balanced.right = new TreeNode(3);
balanced.left.left = new TreeNode(4);
console.log(isBalanced(balanced)); // true
```

---

## Common Mistakes

### ❌ Mistake 1: Using top-down (inefficient)
```javascript
// Wrong - O(n²)
function isBalanced(root) {
    if (root === null) return true;
    
    // Recalculates heights multiple times
    return Math.abs(height(root.left) - height(root.right)) <= 1 &&
           isBalanced(root.left) &&
           isBalanced(root.right);
}

// Correct - O(n) bottom-up
function checkHeight(node) {
    // Calculate height and check balance in one pass
}
```

### ❌ Mistake 2: Not checking subtrees
```javascript
// Wrong - only checks root
function isBalancedWrong(root) {
    if (root === null) return true;
    return Math.abs(height(root.left) - height(root.right)) <= 1;
    // Missing: check if subtrees are balanced!
}

// Correct - check all nodes
function checkHeight(node) {
    // Check left, check right, check current
}
```

### ❌ Mistake 3: Not propagating failure
```javascript
// Wrong - doesn't stop when unbalanced found
function checkHeight(node) {
    if (node === null) return 0;
    const leftH = checkHeight(node.left);
    const rightH = checkHeight(node.right);
    // No early termination!
    return Math.max(leftH, rightH) + 1;
}

// Correct - use -1 to signal failure
function checkHeight(node) {
    if (node === null) return 0;
    const leftH = checkHeight(node.left);
    if (leftH === -1) return -1; // Propagate failure
    // ... same for right
}
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Height-balanced means difference ≤ 1? Check all nodes? Yes."

2. **Two approaches**:
   - Top-down: Simple but O(n²)
   - Bottom-up: Optimal O(n)

3. **Key insight**: "Calculate height while checking balance. Use -1 to signal unbalanced."

4. **Complexity**: "O(n) time, O(h) space"

### Follow-up Questions:

**Q: What if we need to return the unbalanced node?**
```javascript
function findUnbalancedNode(root) {
    let unbalancedNode = null;
    
    function checkHeight(node) {
        if (node === null) return 0;
        
        const leftH = checkHeight(node.left);
        if (leftH === -1) return -1;
        
        const rightH = checkHeight(node.right);
        if (rightH === -1) return -1;
        
        if (Math.abs(leftH - rightH) > 1) {
            if (unbalancedNode === null) {
                unbalancedNode = node;
            }
            return -1;
        }
        
        return Math.max(leftH, rightH) + 1;
    }
    
    checkHeight(root);
    return unbalancedNode;
}
```

**Q: Can you balance the tree?**
A: Would need to rebuild (convert to sorted array, build balanced BST)

---

## Related Problems

- [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- [543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
- [1448. Count Good Nodes in Binary Tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree/)

---

## Key Takeaways

✅ Bottom-up approach is O(n), top-down is O(n²)  
✅ Use -1 to signal unbalanced subtree  
✅ Check balance while calculating height  
✅ Early termination on first unbalanced node  
✅ Balanced: |left_height - right_height| ≤ 1  

**Pattern**: Check tree property → Bottom-up DFS with early termination!
