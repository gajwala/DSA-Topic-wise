# 55. Same Tree

**LeetCode Link**: [100. Same Tree](https://leetcode.com/problems/same-tree/)

**Difficulty**: Easy

**Topics**: Tree, Depth-First Search, Breadth-First Search, Binary Tree

---

## Problem Statement

Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

### Examples

**Example 1:**
```
Input: p = [1,2,3], q = [1,2,3]
Output: true

  1       1
 / \     / \
2   3   2   3
```

**Example 2:**
```
Input: p = [1,2], q = [1,null,2]
Output: false

  1       1
 /         \
2           2
```

**Example 3:**
```
Input: p = [1,2,1], q = [1,1,2]
Output: false

  1       1
 / \     / \
2   1   1   2
```

### Constraints
- The number of nodes in both trees is in the range `[0, 100]`
- `-10^4 <= Node.val <= 10^4`

---

## Approach 1: Recursive DFS (Optimal!) ✅

### Intuition
Recursively check if current nodes match and subtrees are same.

### Implementation

```javascript
/**
 * Recursive DFS - O(n) time, O(h) space
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function isSameTree(p, q) {
    // Both null - same
    if (p === null && q === null) {
        return true;
    }
    
    // One null, one not - different
    if (p === null || q === null) {
        return false;
    }
    
    // Values different - different
    if (p.val !== q.val) {
        return false;
    }
    
    // Check left and right subtrees
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// One-liner version
function isSameTreeOneLiner(p, q) {
    return (p === null && q === null) ||
           (p !== null && q !== null && p.val === q.val &&
            isSameTree(p.left, q.left) && isSameTree(p.right, q.right));
}

// Test
const p = new TreeNode(1);
p.left = new TreeNode(2);
p.right = new TreeNode(3);

const q = new TreeNode(1);
q.left = new TreeNode(2);
q.right = new TreeNode(3);

console.log(isSameTree(p, q)); // true
```

### Complexity Analysis
- **Time Complexity**: `O(min(n, m))` - Visit nodes until difference found
- **Space Complexity**: `O(min(h₁, h₂))` - Recursion stack

---

## Approach 2: Iterative BFS

```javascript
/**
 * Iterative BFS - O(n) time, O(w) space
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function isSameTreeBFS(p, q) {
    const queue = [[p, q]];
    
    while (queue.length > 0) {
        const [node1, node2] = queue.shift();
        
        // Both null - continue
        if (node1 === null && node2 === null) {
            continue;
        }
        
        // One null or values different - not same
        if (node1 === null || node2 === null || node1.val !== node2.val) {
            return false;
        }
        
        // Add children to queue
        queue.push([node1.left, node2.left]);
        queue.push([node1.right, node2.right]);
    }
    
    return true;
}
```

---

## Approach 3: Iterative DFS (Stack)

```javascript
/**
 * Iterative DFS - O(n) time, O(h) space
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function isSameTreeDFS(p, q) {
    const stack = [[p, q]];
    
    while (stack.length > 0) {
        const [node1, node2] = stack.pop();
        
        if (node1 === null && node2 === null) {
            continue;
        }
        
        if (node1 === null || node2 === null || node1.val !== node2.val) {
            return false;
        }
        
        stack.push([node1.left, node2.left]);
        stack.push([node1.right, node2.right]);
    }
    
    return true;
}
```

---

## Visual Example

```
p:      1           q:      1
       / \                 / \
      2   3               2   3

Recursive Comparison:
─────────────────────

isSameTree(1, 1):
  Values match: 1 == 1 ✓
  
  isSameTree(2, 2):
    Values match: 2 == 2 ✓
    isSameTree(null, null): true ✓
    isSameTree(null, null): true ✓
    return true
  
  isSameTree(3, 3):
    Values match: 3 == 3 ✓
    isSameTree(null, null): true ✓
    isSameTree(null, null): true ✓
    return true
  
  return true && true = true ✓

Result: Same Tree ✓
```

---

## Different Tree Example

```
p:      1           q:      1
       /                     \
      2                       2

Recursive Comparison:
─────────────────────

isSameTree(1, 1):
  Values match: 1 == 1 ✓
  
  isSameTree(2, null):
    node1 != null, node2 == null ✗
    return false
  
  return false ✗

Result: Not Same ✗
```

---

## Edge Cases

```javascript
// Both null
console.log(isSameTree(null, null)); // true

// One null, one not
console.log(isSameTree(new TreeNode(1), null)); // false
console.log(isSameTree(null, new TreeNode(1))); // false

// Single node same
const p1 = new TreeNode(1);
const q1 = new TreeNode(1);
console.log(isSameTree(p1, q1)); // true

// Single node different
const p2 = new TreeNode(1);
const q2 = new TreeNode(2);
console.log(isSameTree(p2, q2)); // false

// Same structure, different values
const p3 = new TreeNode(1);
p3.left = new TreeNode(2);
const q3 = new TreeNode(1);
q3.left = new TreeNode(3);
console.log(isSameTree(p3, q3)); // false

// Different structure, same values
const p4 = new TreeNode(1);
p4.left = new TreeNode(2);
const q4 = new TreeNode(1);
q4.right = new TreeNode(2);
console.log(isSameTree(p4, q4)); // false

// Mirror trees
const p5 = new TreeNode(1);
p5.left = new TreeNode(2);
p5.right = new TreeNode(3);
const q5 = new TreeNode(1);
q5.left = new TreeNode(3);
q5.right = new TreeNode(2);
console.log(isSameTree(p5, q5)); // false
```

---

## Common Mistakes

### ❌ Mistake 1: Not handling both null
```javascript
// Wrong - crashes on both null
function isSameTreeWrong(p, q) {
    if (p.val !== q.val) return false; // Crashes if p or q is null!
}

// Correct - check null first
function isSameTree(p, q) {
    if (p === null && q === null) return true;
    if (p === null || q === null) return false;
    if (p.val !== q.val) return false;
}
```

### ❌ Mistake 2: Only checking structure
```javascript
// Wrong - doesn't check values
function isSameTreeWrong(p, q) {
    if (p === null && q === null) return true;
    if (p === null || q === null) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    // Missing: p.val !== q.val check!
}

// Correct
if (p.val !== q.val) return false;
```

### ❌ Mistake 3: Using == instead of ===
```javascript
// Wrong - loose equality
if (p == null && q == null) return true;

// Correct - strict equality
if (p === null && q === null) return true;
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Same means structure and values? Yes."

2. **Approach**: "Recursively check if:
   - Both null (same)
   - One null (different)
   - Values match
   - Left subtrees same
   - Right subtrees same"

3. **Complexity**: "O(n) time, O(h) space for recursive"

### Follow-up Questions:

**Q: What if we only care about values, not structure?**
```javascript
function sameValues(p, q) {
    const values1 = [];
    const values2 = [];
    
    function inorder(node, arr) {
        if (node === null) return;
        inorder(node.left, arr);
        arr.push(node.val);
        inorder(node.right, arr);
    }
    
    inorder(p, values1);
    inorder(q, values2);
    
    return JSON.stringify(values1) === JSON.stringify(values2);
}
```

**Q: What about symmetric trees (mirror)?**
A: Different problem (LeetCode 101) - check left subtree mirrors right

---

## Related Problems

- [101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)
- [572. Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)
- [951. Flip Equivalent Binary Trees](https://leetcode.com/problems/flip-equivalent-binary-trees/)

---

## Key Takeaways

✅ Check both structure and values  
✅ Handle null cases first  
✅ Recursive solution is most elegant  
✅ O(n) time, O(h) space  
✅ Can use DFS or BFS iteratively  

**Pattern**: Compare trees → Recursive matching!
