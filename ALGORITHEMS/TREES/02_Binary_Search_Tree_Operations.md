# Binary Search Tree (BST) Operations

## 📚 Theory

A **Binary Search Tree (BST)** is a binary tree where:

- All nodes in the **left subtree** < root
- All nodes in the **right subtree** > root
- Both left and right subtrees are also BSTs

This property enables **O(log n)** search, insert, and delete operations in balanced trees.

## 🎯 Intuition

Think of a BST like a phone book:

- Start in the middle
- If name is smaller, go left (earlier in alphabet)
- If name is larger, go right (later in alphabet)
- Repeat until found or reach end

Or like the game "20 Questions":

- Each question eliminates half the possibilities
- Binary decisions lead you to the answer quickly

## 📝 Core Operations

### Search:

1. Compare target with current node
2. If equal → found!
3. If smaller → go left
4. If larger → go right

### Insert:

1. Search for position (like search)
2. When you reach null, insert there

### Delete (3 cases):

1. **Leaf node**: Simply remove
2. **One child**: Replace node with child
3. **Two children**: Replace with inorder successor/predecessor

## 💻 Implementation

### JavaScript Implementation

```javascript
/**
 * BST Node structure
 */
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

/**
 * ============================================
 * SEARCH IN BST
 * ============================================
 */

/**
 * Search for a value in BST - Recursive
 * LeetCode 700
 */
function searchBST(root, val) {
  if (!root) return null;

  if (root.val === val) return root;

  if (val < root.val) {
    return searchBST(root.left, val);
  } else {
    return searchBST(root.right, val);
  }
}

/**
 * Search for a value in BST - Iterative
 */
function searchBSTIterative(root, val) {
  while (root) {
    if (root.val === val) return root;

    if (val < root.val) {
      root = root.left;
    } else {
      root = root.right;
    }
  }

  return null;
}

/**
 * ============================================
 * INSERT INTO BST
 * ============================================
 */

/**
 * Insert a value into BST - Recursive
 * LeetCode 701
 */
function insertIntoBST(root, val) {
  if (!root) return new TreeNode(val);

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
}

/**
 * Insert a value into BST - Iterative
 */
function insertIntoBSTIterative(root, val) {
  const newNode = new TreeNode(val);

  if (!root) return newNode;

  let current = root;
  while (true) {
    if (val < current.val) {
      if (!current.left) {
        current.left = newNode;
        break;
      }
      current = current.left;
    } else {
      if (!current.right) {
        current.right = newNode;
        break;
      }
      current = current.right;
    }
  }

  return root;
}

/**
 * ============================================
 * DELETE FROM BST
 * ============================================
 */

/**
 * Delete a node from BST
 * LeetCode 450
 */
function deleteNode(root, key) {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Node to delete found

    // Case 1: Leaf node or one child
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Case 2: Two children
    // Find inorder successor (smallest in right subtree)
    let successor = root.right;
    while (successor.left) {
      successor = successor.left;
    }

    // Replace root value with successor value
    root.val = successor.val;

    // Delete the successor
    root.right = deleteNode(root.right, successor.val);
  }

  return root;
}

/**
 * Find minimum value in BST
 */
function findMin(root) {
  if (!root) return null;

  while (root.left) {
    root = root.left;
  }

  return root.val;
}

/**
 * Find maximum value in BST
 */
function findMax(root) {
  if (!root) return null;

  while (root.right) {
    root = root.right;
  }

  return root.val;
}

/**
 * ============================================
 * VALIDATE BST
 * ============================================
 */

/**
 * Validate Binary Search Tree
 * LeetCode 98
 */
function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;

    // Current node must be within range
    if (node.val <= min || node.val >= max) {
      return false;
    }

    // Check left subtree: all values must be < node.val
    // Check right subtree: all values must be > node.val
    return (
      validate(node.left, min, node.val) && validate(node.right, node.val, max)
    );
  }

  return validate(root, -Infinity, Infinity);
}

/**
 * Validate BST using inorder traversal
 */
function isValidBSTInorder(root) {
  let prev = -Infinity;

  function inorder(node) {
    if (!node) return true;

    // Check left subtree
    if (!inorder(node.left)) return false;

    // Check current node
    if (node.val <= prev) return false;
    prev = node.val;

    // Check right subtree
    return inorder(node.right);
  }

  return inorder(root);
}

/**
 * ============================================
 * CONVERT BST
 * ============================================
 */

/**
 * Convert Sorted Array to BST
 * LeetCode 108
 */
function sortedArrayToBST(nums) {
  if (!nums || nums.length === 0) return null;

  function buildTree(left, right) {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const node = new TreeNode(nums[mid]);

    node.left = buildTree(left, mid - 1);
    node.right = buildTree(mid + 1, right);

    return node;
  }

  return buildTree(0, nums.length - 1);
}

/**
 * Convert BST to Greater Tree
 * LeetCode 538
 */
function convertBST(root) {
  let sum = 0;

  function traverse(node) {
    if (!node) return;

    // Reverse inorder: Right → Root → Left
    traverse(node.right);

    sum += node.val;
    node.val = sum;

    traverse(node.left);
  }

  traverse(root);
  return root;
}

/**
 * ============================================
 * BST PROPERTIES
 * ============================================
 */

/**
 * Kth Smallest Element in BST
 * LeetCode 230
 */
function kthSmallest(root, k) {
  let count = 0;
  let result = null;

  function inorder(node) {
    if (!node || result !== null) return;

    inorder(node.left);

    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    inorder(node.right);
  }

  inorder(root);
  return result;
}

/**
 * Lowest Common Ancestor of BST
 * LeetCode 235
 */
function lowestCommonAncestor(root, p, q) {
  // If both nodes are smaller, LCA is in left subtree
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }

  // If both nodes are larger, LCA is in right subtree
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }

  // If nodes are on different sides, root is LCA
  return root;
}

/**
 * Inorder Successor in BST
 * LeetCode 285
 */
function inorderSuccessor(root, p) {
  let successor = null;

  while (root) {
    if (p.val < root.val) {
      successor = root;
      root = root.left;
    } else {
      root = root.right;
    }
  }

  return successor;
}

/**
 * Range Sum of BST
 * LeetCode 938
 */
function rangeSumBST(root, low, high) {
  if (!root) return 0;

  let sum = 0;

  // If current node is in range, add it
  if (root.val >= low && root.val <= high) {
    sum += root.val;
  }

  // If current node > low, check left subtree
  if (root.val > low) {
    sum += rangeSumBST(root.left, low, high);
  }

  // If current node < high, check right subtree
  if (root.val < high) {
    sum += rangeSumBST(root.right, low, high);
  }

  return sum;
}

/**
 * ============================================
 * BUILD BST
 * ============================================
 */

/**
 * Build BST from array
 */
function buildBSTFromArray(arr) {
  let root = null;

  for (const val of arr) {
    root = insertIntoBST(root, val);
  }

  return root;
}

/**
 * BST to sorted array (inorder traversal)
 */
function bstToArray(root) {
  const result = [];

  function inorder(node) {
    if (!node) return;

    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  }

  inorder(root);
  return result;
}
```

## 🔍 Example Walkthrough

Consider this BST:

```
      8
     / \
    3   10
   / \    \
  1   6   14
     / \  /
    4  7 13
```

**Search for 6**:

- Start at 8: 6 < 8, go left
- At 3: 6 > 3, go right
- At 6: Found! ✅

**Insert 5**:

- Start at 8: 5 < 8, go left
- At 3: 5 > 3, go right
- At 6: 5 < 6, go left
- At 4: 5 > 4, go right
- Right is null → insert 5 here!

**Delete 3** (has two children):

- Find inorder successor: 4
- Replace 3 with 4
- Delete original 4

## ⏱️ Time Complexity

| Operation        | Average  | Worst Case | Best Case |
| ---------------- | -------- | ---------- | --------- |
| **Search**       | O(log n) | O(n)       | O(1)      |
| **Insert**       | O(log n) | O(n)       | O(1)      |
| **Delete**       | O(log n) | O(n)       | O(1)      |
| **Find Min/Max** | O(log n) | O(n)       | O(1)      |

**Space Complexity**: O(h) for recursion, where h = height

**Note**: Worst case O(n) occurs when tree is skewed (like a linked list)

## 🎯 When to Use BST

### ✅ Best Use Cases:

1. **Dynamic Sorted Data**

   - Need to maintain sorted order with frequent insertions/deletions
   - Example: Priority queues, sorted sets

2. **Range Queries**

   - Find all elements in a range
   - Example: Database indexing

3. **Ordered Statistics**

   - Kth smallest/largest element
   - Example: Finding median

4. **Fast Lookup**
   - O(log n) average search time
   - Example: Symbol tables, dictionaries

### ❌ When NOT to Use BST:

1. **Frequent Insertions in Order** - Tree becomes skewed
2. **Need Guaranteed O(log n)** - Use self-balancing trees (AVL, Red-Black)
3. **Small Dataset** - Array/HashMap might be faster
4. **No Order Required** - Use HashMap

## 🔑 Key Properties

1. **Inorder traversal gives sorted sequence**
2. **All left descendants < node < all right descendants**
3. **No duplicate values** (typically)
4. **Height determines performance**
5. **Can become unbalanced**

## 💡 Common Problem Patterns

### Pattern 1: Two Sum in BST

```javascript
/**
 * LeetCode 653: Two Sum IV
 */
function findTarget(root, k) {
  const set = new Set();

  function search(node) {
    if (!node) return false;

    if (set.has(k - node.val)) return true;

    set.add(node.val);

    return search(node.left) || search(node.right);
  }

  return search(root);
}
```

### Pattern 2: Mode in BST

```javascript
/**
 * LeetCode 501: Find Mode in BST
 */
function findMode(root) {
  let maxCount = 0;
  let currentCount = 0;
  let prevVal = null;
  const modes = [];

  function inorder(node) {
    if (!node) return;

    inorder(node.left);

    if (prevVal === node.val) {
      currentCount++;
    } else {
      currentCount = 1;
      prevVal = node.val;
    }

    if (currentCount > maxCount) {
      maxCount = currentCount;
      modes.length = 0;
      modes.push(node.val);
    } else if (currentCount === maxCount) {
      modes.push(node.val);
    }

    inorder(node.right);
  }

  inorder(root);
  return modes;
}
```

## 🎓 Practice Problems

1. **Easy**:

   - Search in BST (LeetCode 700)
   - Minimum Distance Between BST Nodes (LeetCode 783)
   - Range Sum of BST (LeetCode 938)
   - Convert Sorted Array to BST (LeetCode 108)

2. **Medium**:

   - Validate Binary Search Tree (LeetCode 98)
   - Kth Smallest Element in BST (LeetCode 230)
   - Delete Node in BST (LeetCode 450)
   - Insert into BST (LeetCode 701)
   - Lowest Common Ancestor of BST (LeetCode 235)

3. **Hard**:
   - Serialize and Deserialize BST (LeetCode 449)
   - Count of Smaller Numbers After Self (LeetCode 315)
   - Contains Duplicate III (LeetCode 220)

---

**Remember**: BST operations are O(height) - keep your tree balanced! 🌲
