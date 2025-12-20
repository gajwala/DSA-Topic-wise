# Binary Tree Traversals (DFS & BFS)

## 📚 Theory

Tree traversal is the process of visiting each node in a tree data structure exactly once. For binary trees, there are four main traversal methods:

**DFS (Depth-First Search):**

- **Inorder**: Left → Root → Right
- **Preorder**: Root → Left → Right
- **Postorder**: Left → Right → Root

**BFS (Breadth-First Search):**

- **Level Order**: Level by level, left to right

## 🎯 Intuition

Think of tree traversals like reading a book:

- **Preorder**: Read chapter title first, then content (Root first)
- **Inorder**: Read in reading order for BST (gives sorted order)
- **Postorder**: Read footnotes after content (Root last)
- **Level Order**: Read page by page, line by line (BFS)

## 📝 Algorithm Steps

### Inorder (Left → Root → Right):

1. Traverse left subtree
2. Visit root
3. Traverse right subtree

### Preorder (Root → Left → Right):

1. Visit root
2. Traverse left subtree
3. Traverse right subtree

### Postorder (Left → Right → Root):

1. Traverse left subtree
2. Traverse right subtree
3. Visit root

### Level Order (BFS):

1. Use a queue, start with root
2. Process each level completely before moving to next

## 💻 Implementation

### JavaScript Implementation

```javascript
/**
 * Binary Tree Node structure
 */
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * ============================================
 * INORDER TRAVERSAL (Left → Root → Right)
 * ============================================
 */

/**
 * Inorder traversal - Recursive
 */
function inorderRecursive(root) {
  const result = [];

  function traverse(node) {
    if (!node) return;

    traverse(node.left); // Left
    result.push(node.val); // Root
    traverse(node.right); // Right
  }

  traverse(root);
  return result;
}

/**
 * Inorder traversal - Iterative using stack
 */
function inorderIterative(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length > 0) {
    // Go to leftmost node
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // Current is null, pop from stack
    current = stack.pop();
    result.push(current.val);

    // Visit right subtree
    current = current.right;
  }

  return result;
}

/**
 * ============================================
 * PREORDER TRAVERSAL (Root → Left → Right)
 * ============================================
 */

/**
 * Preorder traversal - Recursive
 */
function preorderRecursive(root) {
  const result = [];

  function traverse(node) {
    if (!node) return;

    result.push(node.val); // Root
    traverse(node.left); // Left
    traverse(node.right); // Right
  }

  traverse(root);
  return result;
}

/**
 * Preorder traversal - Iterative
 */
function preorderIterative(root) {
  if (!root) return [];

  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);

    // Push right first so left is processed first
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}

/**
 * ============================================
 * POSTORDER TRAVERSAL (Left → Right → Root)
 * ============================================
 */

/**
 * Postorder traversal - Recursive
 */
function postorderRecursive(root) {
  const result = [];

  function traverse(node) {
    if (!node) return;

    traverse(node.left); // Left
    traverse(node.right); // Right
    result.push(node.val); // Root
  }

  traverse(root);
  return result;
}

/**
 * Postorder traversal - Iterative (Two stacks)
 */
function postorderIterative(root) {
  if (!root) return [];

  const result = [];
  const stack1 = [root];
  const stack2 = [];

  while (stack1.length > 0) {
    const node = stack1.pop();
    stack2.push(node);

    if (node.left) stack1.push(node.left);
    if (node.right) stack1.push(node.right);
  }

  while (stack2.length > 0) {
    result.push(stack2.pop().val);
  }

  return result;
}

/**
 * Postorder traversal - Iterative (One stack)
 */
function postorderIterativeOneStack(root) {
  if (!root) return [];

  const result = [];
  const stack = [];
  let current = root;
  let lastVisited = null;

  while (current || stack.length > 0) {
    // Go to leftmost node
    while (current) {
      stack.push(current);
      current = current.left;
    }

    const peekNode = stack[stack.length - 1];

    // If right child exists and not visited, go right
    if (peekNode.right && lastVisited !== peekNode.right) {
      current = peekNode.right;
    } else {
      result.push(peekNode.val);
      lastVisited = stack.pop();
    }
  }

  return result;
}

/**
 * ============================================
 * LEVEL ORDER TRAVERSAL (BFS)
 * ============================================
 */

/**
 * Level order traversal - Returns array of arrays (by level)
 * LeetCode 102
 */
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}

/**
 * Level order traversal - Returns flat array
 */
function levelOrderFlat(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.val);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}

/**
 * Zigzag level order traversal
 * LeetCode 103
 */
function zigzagLevelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (leftToRight) {
        currentLevel.push(node.val);
      } else {
        currentLevel.unshift(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
    leftToRight = !leftToRight;
  }

  return result;
}

/**
 * Right side view of binary tree
 * LeetCode 199
 */
function rightSideView(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // Add the rightmost node of each level
      if (i === levelSize - 1) {
        result.push(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}

/**
 * Vertical order traversal
 * LeetCode 314
 */
function verticalOrder(root) {
  if (!root) return [];

  const columnTable = {};
  const queue = [[root, 0]]; // [node, column]
  let minColumn = 0;
  let maxColumn = 0;

  while (queue.length > 0) {
    const [node, column] = queue.shift();

    if (!columnTable[column]) {
      columnTable[column] = [];
    }
    columnTable[column].push(node.val);

    minColumn = Math.min(minColumn, column);
    maxColumn = Math.max(maxColumn, column);

    if (node.left) queue.push([node.left, column - 1]);
    if (node.right) queue.push([node.right, column + 1]);
  }

  const result = [];
  for (let i = minColumn; i <= maxColumn; i++) {
    result.push(columnTable[i]);
  }

  return result;
}
```

## 🔍 Example Walkthrough

Consider this binary tree:

```
      1
     / \
    2   3
   / \   \
  4   5   6
```

### Traversal Results:

| Traversal       | Result                   | Order               |
| --------------- | ------------------------ | ------------------- |
| **Inorder**     | [4, 2, 5, 1, 3, 6]       | Left → Root → Right |
| **Preorder**    | [1, 2, 4, 5, 3, 6]       | Root → Left → Right |
| **Postorder**   | [4, 5, 2, 6, 3, 1]       | Left → Right → Root |
| **Level Order** | [[1], [2, 3], [4, 5, 6]] | Level by level      |

## ⏱️ Time Complexity

All traversals:

- **Time Complexity**: **O(n)** where n = number of nodes

  - Visit each node exactly once

- **Space Complexity**:
  - **Recursive**: **O(h)** where h = height of tree
    - Call stack depth
  - **Iterative**: **O(h)** for stack/queue
    - Worst case: O(n) for skewed tree

## 🎯 When to Use Each Traversal

### Inorder (Left → Root → Right):

✅ **Use when:**

- Binary Search Tree → gives **sorted order**
- Need to process nodes in ascending order
- Example: Validate BST, Kth Smallest Element

### Preorder (Root → Left → Right):

✅ **Use when:**

- Creating a **copy** of the tree
- **Prefix expression** evaluation
- **Serialization** of tree
- Example: Clone tree, Serialize/Deserialize

### Postorder (Left → Right → Root):

✅ **Use when:**

- **Deleting** the tree
- **Postfix expression** evaluation
- Need to process children before parent
- Example: Delete tree, Calculate directory size

### Level Order (BFS):

✅ **Use when:**

- Need **level-by-level** processing
- Finding **shortest path** in tree
- **Width** or **level** information needed
- Example: Level order traversal, Right side view

## 🔑 Key Properties

| Traversal       | First Node    | Last Node      | BST Property    |
| --------------- | ------------- | -------------- | --------------- |
| **Inorder**     | Leftmost      | Rightmost      | ✅ Sorted order |
| **Preorder**    | Root          | Rightmost leaf | ❌ No           |
| **Postorder**   | Leftmost leaf | Root           | ❌ No           |
| **Level Order** | Root          | Last leaf      | ❌ No           |

## 💡 Common Problem Patterns

### Pattern 1: Binary Tree Maximum Depth

```javascript
/**
 * LeetCode 104: Maximum Depth of Binary Tree
 */
function maxDepth(root) {
  if (!root) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}
```

### Pattern 2: Same Tree

```javascript
/**
 * LeetCode 100: Same Tree
 */
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

### Pattern 3: Invert Binary Tree

```javascript
/**
 * LeetCode 226: Invert Binary Tree
 */
function invertTree(root) {
  if (!root) return null;

  // Swap left and right
  [root.left, root.right] = [root.right, root.left];

  invertTree(root.left);
  invertTree(root.right);

  return root;
}
```

### Pattern 4: Path Sum

```javascript
/**
 * LeetCode 112: Path Sum
 */
function hasPathSum(root, targetSum) {
  if (!root) return false;

  // Leaf node
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }

  const remainingSum = targetSum - root.val;
  return (
    hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum)
  );
}
```

## 🎓 Practice Problems

1. **Easy**:

   - Binary Tree Inorder Traversal (LeetCode 94)
   - Binary Tree Preorder Traversal (LeetCode 144)
   - Binary Tree Postorder Traversal (LeetCode 145)
   - Binary Tree Level Order Traversal (LeetCode 102)
   - Maximum Depth of Binary Tree (LeetCode 104)
   - Invert Binary Tree (LeetCode 226)

2. **Medium**:

   - Binary Tree Zigzag Level Order (LeetCode 103)
   - Binary Tree Right Side View (LeetCode 199)
   - Binary Tree Level Order Traversal II (LeetCode 107)
   - Vertical Order Traversal (LeetCode 314)
   - All Nodes Distance K (LeetCode 863)

3. **Hard**:
   - Binary Tree Maximum Path Sum (LeetCode 124)
   - Serialize and Deserialize Binary Tree (LeetCode 297)
   - Vertical Order Traversal of Binary Tree (LeetCode 987)

## 📊 Traversal Comparison

| Aspect             | Recursive               | Iterative                |
| ------------------ | ----------------------- | ------------------------ |
| **Implementation** | Simpler                 | More complex             |
| **Space**          | O(h) call stack         | O(h) explicit stack      |
| **Readability**    | Better                  | Less readable            |
| **Stack Overflow** | Possible for deep trees | No risk                  |
| **When to use**    | Default choice          | Deep trees, no recursion |

---

**Remember**: Master these traversals - they're the foundation of all tree algorithms! 🌲
