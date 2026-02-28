# Path Sum & Related Path Problems in Trees (DSA)

**Path Sum:** I (exists?), II (return all paths), III (count paths with any start/end).  
**Related path problems:** Maximum path sum, diameter, all root-to-leaf paths, root-to-node path, sum root-to-leaf numbers. All use a **binary tree** and **DFS**.

---

## Tree node definition (used in all problems)

```javascript
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
```

---

## Problem 1: Path Sum I — Does a path exist?

**Statement:** Given a binary tree and a number `targetSum`, return `true` if there exists any **root-to-leaf** path such that the sum of node values along the path equals `targetSum`.

**Example:**

```
        5
       / \
      4   8
     /   / \
    11  13  4
   / \       \
  7   2       1
```
- `targetSum = 22` → **true** (path 5 → 4 → 11 → 2 = 22)
- `targetSum = 23` → **false**

### Approach

- DFS from root. At each node, subtract `node.val` from the remaining sum.
- If we reach a **leaf** and remaining sum is 0 → path exists.
- If we reach a leaf and sum ≠ 0, or hit null → backtrack.

### Solution

```javascript
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum(root, targetSum) {
  if (!root) return false;

  const remaining = targetSum - root.val;

  if (!root.left && !root.right) {
    return remaining === 0;
  }

  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}
```

**Time:** O(n)  
**Space:** O(h), h = height (recursion stack)

---

## Problem 2: Path Sum II — Return all such paths

**Statement:** Given a binary tree and `targetSum`, return **all root-to-leaf paths** where the sum of values equals `targetSum`. Each path is an array of node values.

**Example:**

```
    5
   / \
  4   8
 /   / \
11  13  4
```
- `targetSum = 22` → `[[5, 4, 11, 2], ...]` (all paths that sum to 22)

### Approach

- DFS and maintain a **path** array (current path from root).
- At each node: push `node.val`, recurse left/right with updated sum, then **pop** (backtrack).
- When we hit a **leaf** and remaining sum is 0, push a **copy** of the current path into the result.

### Solution

```javascript
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
function pathSumII(root, targetSum) {
  const result = [];

  function dfs(node, remaining, path) {
    if (!node) return;

    path.push(node.val);
    const newRemaining = remaining - node.val;

    if (!node.left && !node.right && newRemaining === 0) {
      result.push([...path]);
    } else {
      dfs(node.left, newRemaining, path);
      dfs(node.right, newRemaining, path);
    }

    path.pop(); // backtrack
  }

  dfs(root, targetSum, []);
  return result;
}
```

**Time:** O(n)  
**Space:** O(h) for recursion + O(n) for storing paths in the worst case (many paths)

---

## Problem 3: Path Sum III — Count paths with any start and end

**Statement:** Given a binary tree and `targetSum`, count the number of paths where the sum equals `targetSum`. A path can **start and end at any node** (must go downward: parent → child). No need to start at root or end at leaf.

**Example:**

```
      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1
```
- `targetSum = 8` → **3** paths:  
  - 5 → 3  
  - 5 → 2 → 1  
  - -3 → 11  

### Approach 1: Prefix sum (optimal)

- Do a **DFS** and maintain a **prefix-sum → count** map for the current path from root.
- At node `node`, current path sum = `currSum = prevSum + node.val`.  
  Number of paths ending at this node with sum = `targetSum` = number of times we had prefix sum = `currSum - targetSum` on this path.
- Update map: add `currSum`, recurse left/right, then remove `currSum` (backtrack).

```javascript
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
function pathSumIII(root, targetSum) {
  let count = 0;
  const prefixCount = new Map(); // prefix sum -> count of occurrences on current path
  prefixCount.set(0, 1); // empty path has sum 0

  function dfs(node, currSum) {
    if (!node) return;

    currSum += node.val;

    count += prefixCount.get(currSum - targetSum) || 0;

    prefixCount.set(currSum, (prefixCount.get(currSum) || 0) + 1);

    dfs(node.left, currSum);
    dfs(node.right, currSum);

    prefixCount.set(currSum, prefixCount.get(currSum) - 1);
  }

  dfs(root, 0);
  return count;
}
```

**Time:** O(n)  
**Space:** O(n) for the map in the worst case (skewed tree)

### Approach 2: Double DFS (easier to remember, slower)

- For each node, count how many paths **starting at that node** have sum = `targetSum` (by DFS downward).
- Then recurse: total count = count from current node + count from left subtree + count from right subtree.

```javascript
function pathSumIIIAlternate(root, targetSum) {
  function countPathsFrom(node, remaining) {
    if (!node) return 0;
    const here = remaining === node.val ? 1 : 0;
    const newRemaining = remaining - node.val;
    return (
      here +
      countPathsFrom(node.left, newRemaining) +
      countPathsFrom(node.right, newRemaining)
    );
  }

  function dfs(node) {
    if (!node) return 0;
    return (
      countPathsFrom(node, targetSum) +
      dfs(node.left) +
      dfs(node.right)
    );
  }

  return dfs(root);
}
```

**Time:** O(n²) in worst case (e.g. single chain)  
**Space:** O(h)

---

## Related path questions

### Problem 4: Maximum Path Sum (any node to any node)

**Statement:** Given a binary tree, find the **maximum path sum**. A path is a sequence of connected nodes (each node at most once). The path can start and end at any node (not necessarily root or leaf). Path cannot branch: it goes in one direction (e.g. left-up-right is allowed as a “bent” path through a node).

**Example:**

```
     -10
     /  \
    9   20
       /  \
      15   7
```
- Best path: 15 → 20 → 7 → sum = **42**. (Root -10 can be skipped.)

**Approach:** At each node, compute:
- **Path through this node (can’t extend up):** `node.val + max(0, leftGain) + max(0, rightGain)`. Use this to update the global max.
- **Single branch gain (can extend to parent):** `node.val + max(0, leftGain, rightGain)` — return this so the parent can use it.

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSum(root) {
  let maxSum = -Infinity;

  function gain(node) {
    if (!node) return 0;
    const leftGain = Math.max(0, gain(node.left));
    const rightGain = Math.max(0, gain(node.right));
    const pathThroughHere = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, pathThroughHere);
    return node.val + Math.max(leftGain, rightGain);
  }

  gain(root);
  return maxSum;
}
```

**Time:** O(n)  
**Space:** O(h)

---

### Problem 5: Diameter of Binary Tree (longest path by edges)

**Statement:** Given a binary tree, find the **diameter**: the length (number of **edges**) of the longest path between any two nodes. The path may or may not pass through the root.

**Example:**

```
      1
     / \
    2   3
   / \
  4   5
```
- Diameter = **3** (path 4 → 2 → 1 → 3, or 5 → 2 → 1 → 3; 3 edges).

**Approach:** For each node, the longest path **through** that node = 1 + (max depth of left subtree) + (max depth of right subtree) in terms of **edges** (so depth = 0 at leaf). Compute depth recursively; at each node update a global “best diameter” and return depth (1 + max(leftDepth, rightDepth)).

```javascript
/**
 * @param {TreeNode} root
 * @return {number} diameter = number of edges
 */
function diameterOfBinaryTree(root) {
  let diameter = 0;

  function depth(node) {
    if (!node) return 0;
    const left = depth(node.left);
    const right = depth(node.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
  }

  depth(root);
  return diameter;
}
```

**Time:** O(n)  
**Space:** O(h)

---

### Problem 6: All root-to-leaf paths (no sum)

**Statement:** Return **all** root-to-leaf paths as strings (e.g. `"1->2->5"`).

**Approach:** Same as Path Sum II but without a sum check; at every leaf, push a copy of the current path (formatted as string or array).

```javascript
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
function binaryTreePaths(root) {
  const result = [];

  function dfs(node, path) {
    if (!node) return;
    path.push(node.val);
    if (!node.left && !node.right) {
      result.push(path.join('->'));
    } else {
      dfs(node.left, path);
      dfs(node.right, path);
    }
    path.pop();
  }

  dfs(root, []);
  return result;
}
```

**Time:** O(n)  
**Space:** O(h) + output

---

### Problem 7: Path from root to a given node

**Statement:** Given root and a **target node**, return the **path from root to that node** (array of values), or `null` if target is not in the tree.

**Approach:** DFS; push current node, recurse left/right; if we find the target, return the path (and propagate it up by returning non-null). If neither subtree has the target, pop and return null.

```javascript
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @return {number[] | null}
 */
function pathToNode(root, target) {
  const path = [];

  function dfs(node) {
    if (!node) return false;
    path.push(node.val);
    if (node === target) return true;
    if (dfs(node.left) || dfs(node.right)) return true;
    path.pop();
    return false;
  }

  return dfs(root) ? [...path] : null;
}
```

**Time:** O(n)  
**Space:** O(h)

---

### Problem 8: Sum root to leaf numbers

**Statement:** Each root-to-leaf path represents a number (e.g. 1 → 2 → 3 = 123). Return the **sum** of all such numbers.

**Example:** Tree with paths 1→2 and 1→3 → sum = 12 + 13 = **25**.

**Approach:** DFS; pass current number (e.g. `prev * 10 + node.val`). At a leaf, add that number to the total.

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function sumNumbers(root) {
  let total = 0;

  function dfs(node, num) {
    if (!node) return;
    const curr = num * 10 + node.val;
    if (!node.left && !node.right) {
      total += curr;
    } else {
      dfs(node.left, curr);
      dfs(node.right, curr);
    }
  }

  dfs(root, 0);
  return total;
}
```

**Time:** O(n)  
**Space:** O(h)

---

## Summary

| Problem        | Path type        | Return              | Main idea                    |
|----------------|------------------|---------------------|------------------------------|
| **Path Sum I** | Root → leaf      | boolean             | DFS, subtract at each node   |
| **Path Sum II**| Root → leaf      | all paths (arrays)  | DFS + path array + backtrack |
| **Path Sum III**| Any start → end (down) | count        | Prefix-sum map or double DFS |
| **Max Path Sum** | Any → any (no branch) | max sum      | Gain per node; path through vs branch up |
| **Diameter**  | Any → any (edges) | number of edges   | Depth; path through node = left + right depth |
| **All paths**  | Root → leaf      | list of strings     | Same as Path Sum II, no sum  |
| **Root to node** | Root → target  | path array or null  | DFS, backtrack, return when found |
| **Sum numbers** | Root → leaf (as digits) | sum of numbers | DFS with num = num*10 + val; at leaf add to total |

---

## Quick test (Path Sum I)

```javascript
// Build: 5 -> 4 -> 11 -> 2 (path sum 22)
const root = new TreeNode(5,
  new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2)), null),
  new TreeNode(8, new TreeNode(13), new TreeNode(4, null, new TreeNode(1)))
);
console.log(hasPathSum(root, 22)); // true
console.log(hasPathSum(root, 23)); // false
```

Use the same tree for Path Sum II; for Path Sum III use the example tree from the problem statement.

**Quick tests (related):**

```javascript
// Max path sum: -10, 9, 20, 15, 7 → best path 15+20+7 = 42
const root2 = new TreeNode(-10, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.log(maxPathSum(root2)); // 42

// Diameter: 1,2,3,4,5 → edges 4-2-1-3 or 5-2-1-3 = 3
const root3 = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3));
console.log(diameterOfBinaryTree(root3)); // 3

// Sum numbers: 1->2 and 1->3 → 12+13=25
const root4 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log(sumNumbers(root4)); // 25
```
