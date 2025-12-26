# Complete Tree Data Structures & Algorithms Guide

## Table of Contents
1. [Tree Fundamentals](#tree-fundamentals)
2. [Types of Trees](#types-of-trees)
3. [Binary Tree Implementation](#binary-tree-implementation)
4. [Tree Traversal Methods](#tree-traversal-methods)
5. [Binary Search Tree (BST)](#binary-search-tree-bst)
6. [Balanced Trees](#balanced-trees)
7. [Heap Data Structure](#heap-data-structure)
8. [Trie (Prefix Tree)](#trie-prefix-tree)
9. [Segment Tree](#segment-tree)
10. [50 Tree Problems with Solutions](#50-tree-problems-with-solutions)

---

## Tree Fundamentals

### What is a Tree?
A tree is a hierarchical data structure consisting of nodes connected by edges, with one node designated as the root.

**Key Properties:**
- One root node (no parent)
- Every other node has exactly one parent
- No cycles
- N nodes have N-1 edges
- There's exactly one path between any two nodes

### Tree Terminology

- **Root**: Topmost node
- **Parent**: Node with children
- **Child**: Node connected below another node
- **Leaf**: Node with no children
- **Internal Node**: Node with at least one child
- **Siblings**: Nodes with same parent
- **Ancestor**: Node on path from root to given node
- **Descendant**: Node on path from given node to leaf
- **Subtree**: Tree formed by a node and its descendants
- **Depth**: Number of edges from root to node
- **Height**: Number of edges from node to deepest leaf
- **Level**: Depth + 1

```javascript
// Basic Tree Node
class TreeNode {
    constructor(val) {
        this.val = val;
        this.children = [];
    }
}

// Binary Tree Node
class BinaryTreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
```

---

## Types of Trees

### 1. Binary Tree
Each node has at most 2 children (left and right).

```javascript
class BinaryTree {
    constructor() {
        this.root = null;
    }
    
    insert(val) {
        const newNode = new BinaryTreeNode(val);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        
        const queue = [this.root];
        while (queue.length > 0) {
            const node = queue.shift();
            
            if (!node.left) {
                node.left = newNode;
                return;
            } else {
                queue.push(node.left);
            }
            
            if (!node.right) {
                node.right = newNode;
                return;
            } else {
                queue.push(node.right);
            }
        }
    }
}
```

### 2. Full Binary Tree
Every node has 0 or 2 children.

### 3. Complete Binary Tree
All levels filled except possibly last, which is filled left to right.

### 4. Perfect Binary Tree
All internal nodes have 2 children, all leaves at same level.

### 5. Balanced Binary Tree
Height difference between left and right subtrees ≤ 1 for every node.

### 6. Degenerate/Skewed Tree
Each parent has only one child (essentially a linked list).

---

## Binary Tree Implementation

```javascript
class BinaryTreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }
    
    // Get height of tree
    height(node = this.root) {
        if (!node) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
    
    // Count nodes
    countNodes(node = this.root) {
        if (!node) return 0;
        return 1 + this.countNodes(node.left) + this.countNodes(node.right);
    }
    
    // Count leaves
    countLeaves(node = this.root) {
        if (!node) return 0;
        if (!node.left && !node.right) return 1;
        return this.countLeaves(node.left) + this.countLeaves(node.right);
    }
    
    // Check if balanced
    isBalanced(node = this.root) {
        if (!node) return true;
        
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        
        return Math.abs(leftHeight - rightHeight) <= 1 &&
               this.isBalanced(node.left) &&
               this.isBalanced(node.right);
    }
    
    // Mirror tree
    mirror(node = this.root) {
        if (!node) return null;
        
        const temp = node.left;
        node.left = node.right;
        node.right = temp;
        
        this.mirror(node.left);
        this.mirror(node.right);
        
        return node;
    }
}
```

---

## Tree Traversal Methods

### 1. Depth-First Search (DFS)

#### Inorder Traversal (Left → Root → Right)
```javascript
// Recursive
function inorderRecursive(root, result = []) {
    if (!root) return result;
    
    inorderRecursive(root.left, result);
    result.push(root.val);
    inorderRecursive(root.right, result);
    
    return result;
}

// Iterative
function inorderIterative(root) {
    const result = [];
    const stack = [];
    let current = root;
    
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        result.push(current.val);
        current = current.right;
    }
    
    return result;
}

// Morris Traversal (O(1) space)
function inorderMorris(root) {
    const result = [];
    let current = root;
    
    while (current) {
        if (!current.left) {
            result.push(current.val);
            current = current.right;
        } else {
            let predecessor = current.left;
            while (predecessor.right && predecessor.right !== current) {
                predecessor = predecessor.right;
            }
            
            if (!predecessor.right) {
                predecessor.right = current;
                current = current.left;
            } else {
                predecessor.right = null;
                result.push(current.val);
                current = current.right;
            }
        }
    }
    
    return result;
}
```

#### Preorder Traversal (Root → Left → Right)
```javascript
// Recursive
function preorderRecursive(root, result = []) {
    if (!root) return result;
    
    result.push(root.val);
    preorderRecursive(root.left, result);
    preorderRecursive(root.right, result);
    
    return result;
}

// Iterative
function preorderIterative(root) {
    if (!root) return [];
    
    const result = [];
    const stack = [root];
    
    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node.val);
        
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    
    return result;
}
```

#### Postorder Traversal (Left → Right → Root)
```javascript
// Recursive
function postorderRecursive(root, result = []) {
    if (!root) return result;
    
    postorderRecursive(root.left, result);
    postorderRecursive(root.right, result);
    result.push(root.val);
    
    return result;
}

// Iterative (Two Stacks)
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
```

### 2. Breadth-First Search (BFS)

#### Level Order Traversal
```javascript
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const level = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
    }
    
    return result;
}
```

#### Zigzag Level Order
```javascript
function zigzagLevelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    let leftToRight = true;
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const level = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            if (leftToRight) {
                level.push(node.val);
            } else {
                level.unshift(node.val);
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
        leftToRight = !leftToRight;
    }
    
    return result;
}
```

---

## Binary Search Tree (BST)

A binary tree where:
- Left subtree values < root value
- Right subtree values > root value
- Both subtrees are also BSTs

```javascript
class BST {
    constructor() {
        this.root = null;
    }
    
    // Insert
    insert(val) {
        const newNode = new BinaryTreeNode(val);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }
        
        let current = this.root;
        while (true) {
            if (val < current.val) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }
    
    // Search
    search(val, node = this.root) {
        if (!node) return false;
        
        if (val === node.val) return true;
        if (val < node.val) return this.search(val, node.left);
        return this.search(val, node.right);
    }
    
    // Find minimum
    findMin(node = this.root) {
        if (!node) return null;
        while (node.left) {
            node = node.left;
        }
        return node.val;
    }
    
    // Find maximum
    findMax(node = this.root) {
        if (!node) return null;
        while (node.right) {
            node = node.right;
        }
        return node.val;
    }
    
    // Delete node
    delete(val, node = this.root) {
        if (!node) return null;
        
        if (val < node.val) {
            node.left = this.delete(val, node.left);
        } else if (val > node.val) {
            node.right = this.delete(val, node.right);
        } else {
            // Node to delete found
            
            // Case 1: No children
            if (!node.left && !node.right) {
                return null;
            }
            
            // Case 2: One child
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            
            // Case 3: Two children
            // Find inorder successor (min in right subtree)
            const minRight = this.findMin(node.right);
            node.val = minRight;
            node.right = this.delete(minRight, node.right);
        }
        
        return node;
    }
    
    // Validate BST
    isValidBST(node = this.root, min = -Infinity, max = Infinity) {
        if (!node) return true;
        
        if (node.val <= min || node.val >= max) return false;
        
        return this.isValidBST(node.left, min, node.val) &&
               this.isValidBST(node.right, node.val, max);
    }
    
    // Find kth smallest
    kthSmallest(k, node = this.root) {
        const stack = [];
        let current = node;
        let count = 0;
        
        while (current || stack.length > 0) {
            while (current) {
                stack.push(current);
                current = current.left;
            }
            
            current = stack.pop();
            count++;
            
            if (count === k) return current.val;
            
            current = current.right;
        }
        
        return null;
    }
}
```

**Time Complexity:**
- Search: O(h) where h is height
- Insert: O(h)
- Delete: O(h)
- Best case (balanced): O(log n)
- Worst case (skewed): O(n)

---

## Balanced Trees

### AVL Tree
Self-balancing BST where height difference between left and right subtrees ≤ 1.

```javascript
class AVLNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }
    
    getHeight(node) {
        return node ? node.height : 0;
    }
    
    getBalance(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }
    
    updateHeight(node) {
        if (node) {
            node.height = 1 + Math.max(
                this.getHeight(node.left),
                this.getHeight(node.right)
            );
        }
    }
    
    // Right rotation
    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;
        
        x.right = y;
        y.left = T2;
        
        this.updateHeight(y);
        this.updateHeight(x);
        
        return x;
    }
    
    // Left rotation
    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;
        
        y.left = x;
        x.right = T2;
        
        this.updateHeight(x);
        this.updateHeight(y);
        
        return y;
    }
    
    // Insert
    insert(val, node = this.root) {
        if (!node) return new AVLNode(val);
        
        if (val < node.val) {
            node.left = this.insert(val, node.left);
        } else if (val > node.val) {
            node.right = this.insert(val, node.right);
        } else {
            return node; // Duplicate
        }
        
        this.updateHeight(node);
        const balance = this.getBalance(node);
        
        // Left Left Case
        if (balance > 1 && val < node.left.val) {
            return this.rotateRight(node);
        }
        
        // Right Right Case
        if (balance < -1 && val > node.right.val) {
            return this.rotateLeft(node);
        }
        
        // Left Right Case
        if (balance > 1 && val > node.left.val) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        
        // Right Left Case
        if (balance < -1 && val < node.right.val) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }
        
        return node;
    }
}
```

---

## Heap Data Structure

Binary heap is a complete binary tree that satisfies heap property.

### Min Heap
Parent ≤ children

### Max Heap
Parent ≥ children

```javascript
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }
    
    getLeftChildIndex(i) {
        return 2 * i + 1;
    }
    
    getRightChildIndex(i) {
        return 2 * i + 2;
    }
    
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    
    // Insert
    insert(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }
    
    heapifyUp(index) {
        let current = index;
        
        while (current > 0) {
            const parent = this.getParentIndex(current);
            
            if (this.heap[current] < this.heap[parent]) {
                this.swap(current, parent);
                current = parent;
            } else {
                break;
            }
        }
    }
    
    // Extract min
    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        
        return min;
    }
    
    heapifyDown(index) {
        let current = index;
        
        while (true) {
            const left = this.getLeftChildIndex(current);
            const right = this.getRightChildIndex(current);
            let smallest = current;
            
            if (left < this.heap.length && 
                this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            
            if (right < this.heap.length && 
                this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            
            if (smallest !== current) {
                this.swap(current, smallest);
                current = smallest;
            } else {
                break;
            }
        }
    }
    
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
    
    size() {
        return this.heap.length;
    }
}

class MaxHeap extends MinHeap {
    heapifyUp(index) {
        let current = index;
        
        while (current > 0) {
            const parent = this.getParentIndex(current);
            
            if (this.heap[current] > this.heap[parent]) {
                this.swap(current, parent);
                current = parent;
            } else {
                break;
            }
        }
    }
    
    heapifyDown(index) {
        let current = index;
        
        while (true) {
            const left = this.getLeftChildIndex(current);
            const right = this.getRightChildIndex(current);
            let largest = current;
            
            if (left < this.heap.length && 
                this.heap[left] > this.heap[largest]) {
                largest = left;
            }
            
            if (right < this.heap.length && 
                this.heap[right] > this.heap[largest]) {
                largest = right;
            }
            
            if (largest !== current) {
                this.swap(current, largest);
                current = largest;
            } else {
                break;
            }
        }
    }
}
```

**Time Complexity:**
- Insert: O(log n)
- Extract Min/Max: O(log n)
- Peek: O(1)
- Build Heap: O(n)

---

## Trie (Prefix Tree)

Tree for storing strings, useful for prefix matching.

```javascript
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    // Insert word
    insert(word) {
        let node = this.root;
        
        for (let char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        
        node.isEndOfWord = true;
    }
    
    // Search exact word
    search(word) {
        let node = this.root;
        
        for (let char of word) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char);
        }
        
        return node.isEndOfWord;
    }
    
    // Check if prefix exists
    startsWith(prefix) {
        let node = this.root;
        
        for (let char of prefix) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char);
        }
        
        return true;
    }
    
    // Delete word
    delete(word) {
        const deleteHelper = (node, word, index) => {
            if (index === word.length) {
                if (!node.isEndOfWord) return false;
                node.isEndOfWord = false;
                return node.children.size === 0;
            }
            
            const char = word[index];
            const childNode = node.children.get(char);
            
            if (!childNode) return false;
            
            const shouldDeleteChild = deleteHelper(childNode, word, index + 1);
            
            if (shouldDeleteChild) {
                node.children.delete(char);
                return node.children.size === 0 && !node.isEndOfWord;
            }
            
            return false;
        };
        
        deleteHelper(this.root, word, 0);
    }
    
    // Get all words with prefix
    getWordsWithPrefix(prefix) {
        let node = this.root;
        
        for (let char of prefix) {
            if (!node.children.has(char)) {
                return [];
            }
            node = node.children.get(char);
        }
        
        const words = [];
        
        const dfs = (node, currentWord) => {
            if (node.isEndOfWord) {
                words.push(currentWord);
            }
            
            for (let [char, childNode] of node.children) {
                dfs(childNode, currentWord + char);
            }
        };
        
        dfs(node, prefix);
        return words;
    }
}
```

**Time Complexity:**
- Insert: O(m) where m is word length
- Search: O(m)
- StartsWith: O(m)
- Space: O(ALPHABET_SIZE × m × n) where n is number of words

---

## Segment Tree

Tree for range queries and updates.

```javascript
class SegmentTree {
    constructor(arr) {
        this.n = arr.length;
        this.tree = Array(4 * this.n).fill(0);
        this.build(arr, 0, 0, this.n - 1);
    }
    
    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = arr[start];
            return;
        }
        
        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;
        
        this.build(arr, leftChild, start, mid);
        this.build(arr, rightChild, mid + 1, end);
        
        this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
    }
    
    // Range sum query
    query(left, right, node = 0, start = 0, end = this.n - 1) {
        if (left > end || right < start) {
            return 0;
        }
        
        if (left <= start && right >= end) {
            return this.tree[node];
        }
        
        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;
        
        const leftSum = this.query(left, right, leftChild, start, mid);
        const rightSum = this.query(left, right, rightChild, mid + 1, end);
        
        return leftSum + rightSum;
    }
    
    // Point update
    update(index, value, node = 0, start = 0, end = this.n - 1) {
        if (start === end) {
            this.tree[node] = value;
            return;
        }
        
        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;
        
        if (index <= mid) {
            this.update(index, value, leftChild, start, mid);
        } else {
            this.update(index, value, rightChild, mid + 1, end);
        }
        
        this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
    }
}
```

**Time Complexity:**
- Build: O(n)
- Query: O(log n)
- Update: O(log n)
- Space: O(4n)

---

## 50 Tree Problems with Solutions

### Easy Problems (1-15)

#### Problem 1: Maximum Depth of Binary Tree

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// Iterative BFS
function maxDepthBFS(root) {
    if (!root) return 0;
    
    const queue = [root];
    let depth = 0;
    
    while (queue.length > 0) {
        const size = queue.length;
        depth++;
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return depth;
}
```

#### Problem 2: Minimum Depth of Binary Tree

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function minDepth(root) {
    if (!root) return 0;
    
    // If one subtree is empty, return depth of other
    if (!root.left) return 1 + minDepth(root.right);
    if (!root.right) return 1 + minDepth(root.left);
    
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}

// BFS approach (better for finding minimum)
function minDepthBFS(root) {
    if (!root) return 0;
    
    const queue = [[root, 1]];
    
    while (queue.length > 0) {
        const [node, depth] = queue.shift();
        
        if (!node.left && !node.right) return depth;
        
        if (node.left) queue.push([node.left, depth + 1]);
        if (node.right) queue.push([node.right, depth + 1]);
    }
    
    return 0;
}
```

#### Problem 3: Same Tree

```javascript
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    
    return p.val === q.val &&
           isSameTree(p.left, q.left) &&
           isSameTree(p.right, q.right);
}
```

#### Problem 4: Symmetric Tree

```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isSymmetric(root) {
    if (!root) return true;
    
    function isMirror(left, right) {
        if (!left && !right) return true;
        if (!left || !right) return false;
        
        return left.val === right.val &&
               isMirror(left.left, right.right) &&
               isMirror(left.right, right.left);
    }
    
    return isMirror(root.left, root.right);
}

// Iterative
function isSymmetricIterative(root) {
    if (!root) return true;
    
    const queue = [root.left, root.right];
    
    while (queue.length > 0) {
        const left = queue.shift();
        const right = queue.shift();
        
        if (!left && !right) continue;
        if (!left || !right) return false;
        if (left.val !== right.val) return false;
        
        queue.push(left.left, right.right);
        queue.push(left.right, right.left);
    }
    
    return true;
}
```

#### Problem 5: Invert Binary Tree

```javascript
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTree(root) {
    if (!root) return null;
    
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
    
    invertTree(root.left);
    invertTree(root.right);
    
    return root;
}

// Iterative
function invertTreeIterative(root) {
    if (!root) return null;
    
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        
        const temp = node.left;
        node.left = node.right;
        node.right = temp;
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    
    return root;
}
```

#### Problem 6: Path Sum

```javascript
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
function hasPathSum(root, targetSum) {
    if (!root) return false;
    
    if (!root.left && !root.right) {
        return root.val === targetSum;
    }
    
    return hasPathSum(root.left, targetSum - root.val) ||
           hasPathSum(root.right, targetSum - root.val);
}
```

#### Problem 7: Sum of Left Leaves

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function sumOfLeftLeaves(root) {
    if (!root) return 0;
    
    let sum = 0;
    
    if (root.left && !root.left.left && !root.left.right) {
        sum += root.left.val;
    }
    
    return sum + sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right);
}
```

#### Problem 8: Diameter of Binary Tree

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function diameterOfBinaryTree(root) {
    let diameter = 0;
    
    function height(node) {
        if (!node) return 0;
        
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);
        
        diameter = Math.max(diameter, leftHeight + rightHeight);
        
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    height(root);
    return diameter;
}
```

#### Problem 9: Balanced Binary Tree

```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isBalanced(root) {
    function height(node) {
        if (!node) return 0;
        
        const leftHeight = height(node.left);
        if (leftHeight === -1) return -1;
        
        const rightHeight = height(node.right);
        if (rightHeight === -1) return -1;
        
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
        
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    return height(root) !== -1;
}
```

#### Problem 10: Merge Two Binary Trees

```javascript
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
function mergeTrees(root1, root2) {
    if (!root1) return root2;
    if (!root2) return root1;
    
    root1.val += root2.val;
    root1.left = mergeTrees(root1.left, root2.left);
    root1.right = mergeTrees(root1.right, root2.right);
    
    return root1;
}
```

#### Problem 11: Subtree of Another Tree

```javascript
/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
function isSubtree(root, subRoot) {
    if (!root) return false;
    
    if (isSameTree(root, subRoot)) return true;
    
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p.val === q.val &&
           isSameTree(p.left, q.left) &&
           isSameTree(p.right, q.right);
}
```

#### Problem 12: Binary Tree Paths

```javascript
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
function binaryTreePaths(root) {
    const paths = [];
    
    function dfs(node, path) {
        if (!node) return;
        
        path.push(node.val);
        
        if (!node.left && !node.right) {
            paths.push(path.join('->'));
        } else {
            dfs(node.left, [...path]);
            dfs(node.right, [...path]);
        }
    }
    
    dfs(root, []);
    return paths;
}
```

#### Problem 13: Count Complete Tree Nodes

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function countNodes(root) {
    if (!root) return 0;
    
    const leftHeight = getHeight(root.left);
    const rightHeight = getHeight(root.right);
    
    if (leftHeight === rightHeight) {
        // Left subtree is perfect
        return (1 << leftHeight) + countNodes(root.right);
    } else {
        // Right subtree is perfect
        return (1 << rightHeight) + countNodes(root.left);
    }
}

function getHeight(node) {
    let height = 0;
    while (node) {
        height++;
        node = node.left;
    }
    return height;
}
```

#### Problem 14: Lowest Common Ancestor of BST

```javascript
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestorBST(root, p, q) {
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestorBST(root.left, p, q);
    }
    
    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestorBST(root.right, p, q);
    }
    
    return root;
}

// Iterative
function lowestCommonAncestorBSTIterative(root, p, q) {
    while (root) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left;
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right;
        } else {
            return root;
        }
    }
    return null;
}
```

#### Problem 15: Convert Sorted Array to BST

```javascript
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
function sortedArrayToBST(nums) {
    if (nums.length === 0) return null;
    
    function build(left, right) {
        if (left > right) return null;
        
        const mid = Math.floor((left + right) / 2);
        const node = new TreeNode(nums[mid]);
        
        node.left = build(left, mid - 1);
        node.right = build(mid + 1, right);
        
        return node;
    }
    
    return build(0, nums.length - 1);
}
```

### Medium Problems (16-35)

#### Problem 16: Binary Tree Level Order Traversal

```javascript
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const size = queue.length;
        const level = [];
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
    }
    
    return result;
}
```

#### Problem 17: Binary Tree Zigzag Level Order Traversal

```javascript
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function zigzagLevelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    let leftToRight = true;
    
    while (queue.length > 0) {
        const size = queue.length;
        const level = [];
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            
            if (leftToRight) {
                level.push(node.val);
            } else {
                level.unshift(node.val);
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
        leftToRight = !leftToRight;
    }
    
    return result;
}
```

#### Problem 18: Binary Tree Right Side View

```javascript
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function rightSideView(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            
            if (i === size - 1) {
                result.push(node.val);
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
}
```

#### Problem 19: Kth Smallest Element in BST

```javascript
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
function kthSmallest(root, k) {
    const stack = [];
    let current = root;
    let count = 0;
    
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        count++;
        
        if (count === k) return current.val;
        
        current = current.right;
    }
    
    return -1;
}
```

#### Problem 20: Validate Binary Search Tree

```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBST(root) {
    function validate(node, min, max) {
        if (!node) return true;
        
        if (node.val <= min || node.val >= max) return false;
        
        return validate(node.left, min, node.val) &&
               validate(node.right, node.val, max);
    }
    
    return validate(root, -Infinity, Infinity);
}

// Inorder traversal approach
function isValidBSTInorder(root) {
    let prev = -Infinity;
    const stack = [];
    let current = root;
    
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        
        if (current.val <= prev) return false;
        prev = current.val;
        
        current = current.right;
    }
    
    return true;
}
```

#### Problem 21: Construct Binary Tree from Preorder and Inorder

```javascript
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTree(preorder, inorder) {
    const inorderMap = new Map();
    inorder.forEach((val, i) => inorderMap.set(val, i));
    
    let preIndex = 0;
    
    function build(left, right) {
        if (left > right) return null;
        
        const rootVal = preorder[preIndex++];
        const root = new TreeNode(rootVal);
        
        const inIndex = inorderMap.get(rootVal);
        
        root.left = build(left, inIndex - 1);
        root.right = build(inIndex + 1, right);
        
        return root;
    }
    
    return build(0, inorder.length - 1);
}
```

#### Problem 22: Construct Binary Tree from Inorder and Postorder

```javascript
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
function buildTreeFromInPost(inorder, postorder) {
    const inorderMap = new Map();
    inorder.forEach((val, i) => inorderMap.set(val, i));
    
    let postIndex = postorder.length - 1;
    
    function build(left, right) {
        if (left > right) return null;
        
        const rootVal = postorder[postIndex--];
        const root = new TreeNode(rootVal);
        
        const inIndex = inorderMap.get(rootVal);
        
        root.right = build(inIndex + 1, right);
        root.left = build(left, inIndex - 1);
        
        return root;
    }
    
    return build(0, inorder.length - 1);
}
```

#### Problem 23: Flatten Binary Tree to Linked List

```javascript
/**
 * @param {TreeNode} root
 * @return {void}
 */
function flatten(root) {
    if (!root) return;
    
    flatten(root.left);
    flatten(root.right);
    
    const rightSubtree = root.right;
    
    root.right = root.left;
    root.left = null;
    
    let current = root;
    while (current.right) {
        current = current.right;
    }
    
    current.right = rightSubtree;
}

// Morris-like approach
function flattenIterative(root) {
    let current = root;
    
    while (current) {
        if (current.left) {
            let predecessor = current.left;
            while (predecessor.right) {
                predecessor = predecessor.right;
            }
            
            predecessor.right = current.right;
            current.right = current.left;
            current.left = null;
        }
        
        current = current.right;
    }
}
```

#### Problem 24: Populating Next Right Pointers

```javascript
/**
 * @param {Node} root
 * @return {Node}
 */
function connect(root) {
    if (!root) return null;
    
    const queue = [root];
    
    while (queue.length > 0) {
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            
            if (i < size - 1) {
                node.next = queue[0];
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return root;
}

// O(1) space solution
function connectConstantSpace(root) {
    if (!root) return null;
    
    let leftmost = root;
    
    while (leftmost.left) {
        let head = leftmost;
        
        while (head) {
            head.left.next = head.right;
            
            if (head.next) {
                head.right.next = head.next.left;
            }
            
            head = head.next;
        }
        
        leftmost = leftmost.left;
    }
    
    return root;
}
```

#### Problem 25: Binary Tree Maximum Path Sum

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSum(root) {
    let maxSum = -Infinity;
    
    function maxGain(node) {
        if (!node) return 0;
        
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);
        
        const pathSum = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, pathSum);
        
        return node.val + Math.max(leftGain, rightGain);
    }
    
    maxGain(root);
    return maxSum;
}
```

#### Problem 26: Sum Root to Leaf Numbers

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function sumNumbers(root) {
    function dfs(node, current) {
        if (!node) return 0;
        
        current = current * 10 + node.val;
        
        if (!node.left && !node.right) {
            return current;
        }
        
        return dfs(node.left, current) + dfs(node.right, current);
    }
    
    return dfs(root, 0);
}
```

#### Problem 27: Path Sum II

```javascript
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
function pathSum(root, targetSum) {
    const result = [];
    
    function dfs(node, remaining, path) {
        if (!node) return;
        
        path.push(node.val);
        
        if (!node.left && !node.right && remaining === node.val) {
            result.push([...path]);
        }
        
        dfs(node.left, remaining - node.val, path);
        dfs(node.right, remaining - node.val, path);
        
        path.pop();
    }
    
    dfs(root, targetSum, []);
    return result;
}
```

#### Problem 28: Lowest Common Ancestor of Binary Tree

```javascript
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;
    
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    if (left && right) return root;
    
    return left || right;
}
```

#### Problem 29: Binary Tree Vertical Order Traversal

```javascript
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function verticalOrder(root) {
    if (!root) return [];
    
    const columnTable = new Map();
    const queue = [[root, 0]]; // [node, column]
    let minCol = 0;
    let maxCol = 0;
    
    while (queue.length > 0) {
        const [node, col] = queue.shift();
        
        if (!columnTable.has(col)) {
            columnTable.set(col, []);
        }
        columnTable.get(col).push(node.val);
        
        minCol = Math.min(minCol, col);
        maxCol = Math.max(maxCol, col);
        
        if (node.left) queue.push([node.left, col - 1]);
        if (node.right) queue.push([node.right, col + 1]);
    }
    
    const result = [];
    for (let i = minCol; i <= maxCol; i++) {
        result.push(columnTable.get(i));
    }
    
    return result;
}
```

#### Problem 30: All Nodes Distance K in Binary Tree

```javascript
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
function distanceK(root, target, k) {
    const parentMap = new Map();
    
    // Build parent pointers
    function buildParentMap(node, parent) {
        if (!node) return;
        parentMap.set(node, parent);
        buildParentMap(node.left, node);
        buildParentMap(node.right, node);
    }
    
    buildParentMap(root, null);
    
    // BFS from target
    const result = [];
    const visited = new Set([target]);
    const queue = [[target, 0]];
    
    while (queue.length > 0) {
        const [node, dist] = queue.shift();
        
        if (dist === k) {
            result.push(node.val);
            continue;
        }
        
        const neighbors = [node.left, node.right, parentMap.get(node)];
        
        for (let neighbor of neighbors) {
            if (neighbor && !visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, dist + 1]);
            }
        }
    }
    
    return result;
}
```

#### Problem 31: Delete Node in a BST

```javascript
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
function deleteNode(root, key) {
    if (!root) return null;
    
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        // Node to delete found
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        
        // Two children: find inorder successor
        let successor = root.right;
        while (successor.left) {
            successor = successor.left;
        }
        
        root.val = successor.val;
        root.right = deleteNode(root.right, successor.val);
    }
    
    return root;
}
```

#### Problem 32: Find Duplicate Subtrees

```javascript
/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
function findDuplicateSubtrees(root) {
    const subtrees = new Map();
    const duplicates = [];
    
    function serialize(node) {
        if (!node) return '#';
        
        const serial = `${node.val},${serialize(node.left)},${serialize(node.right)}`;
        
        subtrees.set(serial, (subtrees.get(serial) || 0) + 1);
        
        if (subtrees.get(serial) === 2) {
            duplicates.push(node);
        }
        
        return serial;
    }
    
    serialize(root);
    return duplicates;
}
```

#### Problem 33: Serialize and Deserialize Binary Tree

```javascript
/**
 * Encodes a tree to a single string.
 * @param {TreeNode} root
 * @return {string}
 */
function serialize(root) {
    if (!root) return 'null';
    
    const left = serialize(root.left);
    const right = serialize(root.right);
    
    return `${root.val},${left},${right}`;
}

/**
 * Decodes your encoded data to tree.
 * @param {string} data
 * @return {TreeNode}
 */
function deserialize(data) {
    const values = data.split(',');
    let index = 0;
    
    function build() {
        if (values[index] === 'null') {
            index++;
            return null;
        }
        
        const node = new TreeNode(parseInt(values[index++]));
        node.left = build();
        node.right = build();
        
        return node;
    }
    
    return build();
}

// Level-order approach
function serializeBFS(root) {
    if (!root) return '';
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const node = queue.shift();
        
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push('null');
        }
    }
    
    return result.join(',');
}

function deserializeBFS(data) {
    if (!data) return null;
    
    const values = data.split(',');
    const root = new TreeNode(parseInt(values[0]));
    const queue = [root];
    let i = 1;
    
    while (queue.length > 0 && i < values.length) {
        const node = queue.shift();
        
        if (values[i] !== 'null') {
            node.left = new TreeNode(parseInt(values[i]));
            queue.push(node.left);
        }
        i++;
        
        if (i < values.length && values[i] !== 'null') {
            node.right = new TreeNode(parseInt(values[i]));
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}
```

#### Problem 34: Recover Binary Search Tree

```javascript
/**
 * @param {TreeNode} root
 * @return {void}
 */
function recoverTree(root) {
    let first = null;
    let second = null;
    let prev = new TreeNode(-Infinity);
    
    function inorder(node) {
        if (!node) return;
        
        inorder(node.left);
        
        if (prev.val > node.val) {
            if (!first) {
                first = prev;
            }
            second = node;
        }
        
        prev = node;
        inorder(node.right);
    }
    
    inorder(root);
    
    // Swap values
    const temp = first.val;
    first.val = second.val;
    second.val = temp;
}
```

#### Problem 35: House Robber III

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function rob(root) {
    function robHelper(node) {
        if (!node) return [0, 0];
        
        const [leftRob, leftNotRob] = robHelper(node.left);
        const [rightRob, rightNotRob] = robHelper(node.right);
        
        const robCurrent = node.val + leftNotRob + rightNotRob;
        const notRobCurrent = Math.max(leftRob, leftNotRob) + 
                             Math.max(rightRob, rightNotRob);
        
        return [robCurrent, notRobCurrent];
    }
    
    const [robRoot, notRobRoot] = robHelper(root);
    return Math.max(robRoot, notRobRoot);
}
```

### Hard Problems (36-50)

#### Problem 36: Binary Tree Cameras

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function minCameraCover(root) {
    let cameras = 0;
    
    // 0: not covered, 1: covered, 2: has camera
    function dfs(node) {
        if (!node) return 1;
        
        const left = dfs(node.left);
        const right = dfs(node.right);
        
        if (left === 0 || right === 0) {
            cameras++;
            return 2;
        }
        
        if (left === 2 || right === 2) {
            return 1;
        }
        
        return 0;
    }
    
    return dfs(root) === 0 ? cameras + 1 : cameras;
}
```

#### Problem 37: Count Complete Tree Nodes

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function countCompleteNodes(root) {
    if (!root) return 0;
    
    const leftHeight = getHeight(root.left);
    const rightHeight = getHeight(root.right);
    
    if (leftHeight === rightHeight) {
        return (1 << leftHeight) + countCompleteNodes(root.right);
    } else {
        return (1 << rightHeight) + countCompleteNodes(root.left);
    }
}

function getHeight(node) {
    let height = 0;
    while (node) {
        height++;
        node = node.left;
    }
    return height;
}
```

#### Problem 38: Maximum Sum BST in Binary Tree

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxSumBST(root) {
    let maxSum = 0;
    
    // Returns [isBST, sum, min, max]
    function dfs(node) {
        if (!node) return [true, 0, Infinity, -Infinity];
        
        const [leftBST, leftSum, leftMin, leftMax] = dfs(node.left);
        const [rightBST, rightSum, rightMin, rightMax] = dfs(node.right);
        
        if (leftBST && rightBST && node.val > leftMax && node.val < rightMin) {
            const sum = node.val + leftSum + rightSum;
            maxSum = Math.max(maxSum, sum);
            
            return [
                true,
                sum,
                Math.min(node.val, leftMin),
                Math.max(node.val, rightMax)
            ];
        }
        
        return [false, 0, 0, 0];
    }
    
    dfs(root);
    return maxSum;
}
```

#### Problem 39: Vertical Order Traversal with Sorting

```javascript
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function verticalTraversal(root) {
    const nodes = [];
    
    function dfs(node, row, col) {
        if (!node) return;
        
        nodes.push([col, row, node.val]);
        
        dfs(node.left, row + 1, col - 1);
        dfs(node.right, row + 1, col + 1);
    }
    
    dfs(root, 0, 0);
    
    // Sort by column, then row, then value
    nodes.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        if (a[1] !== b[1]) return a[1] - b[1];
        return a[2] - b[2];
    });
    
    const result = [];
    let prevCol = -Infinity;
    
    for (let [col, row, val] of nodes) {
        if (col !== prevCol) {
            result.push([]);
            prevCol = col;
        }
        result[result.length - 1].push(val);
    }
    
    return result;
}
```

#### Problem 40: Binary Tree Maximum Width

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function widthOfBinaryTree(root) {
    if (!root) return 0;
    
    let maxWidth = 0;
    const queue = [[root, 0]]; // [node, index]
    
    while (queue.length > 0) {
        const size = queue.length;
        const firstIndex = queue[0][1];
        let lastIndex = firstIndex;
        
        for (let i = 0; i < size; i++) {
            const [node, index] = queue.shift();
            lastIndex = index;
            
            if (node.left) {
                queue.push([node.left, 2 * index]);
            }
            if (node.right) {
                queue.push([node.right, 2 * index + 1]);
            }
        }
        
        maxWidth = Math.max(maxWidth, lastIndex - firstIndex + 1);
    }
    
    return maxWidth;
}
```

#### Problem 41: Morris Inorder Traversal

```javascript
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function morrisInorder(root) {
    const result = [];
    let current = root;
    
    while (current) {
        if (!current.left) {
            result.push(current.val);
            current = current.right;
        } else {
            let predecessor = current.left;
            
            while (predecessor.right && predecessor.right !== current) {
                predecessor = predecessor.right;
            }
            
            if (!predecessor.right) {
                predecessor.right = current;
                current = current.left;
            } else {
                predecessor.right = null;
                result.push(current.val);
                current = current.right;
            }
        }
    }
    
    return result;
}
```

#### Problem 42: Longest Univalue Path

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function longestUnivaluePath(root) {
    let longest = 0;
    
    function dfs(node) {
        if (!node) return 0;
        
        let left = dfs(node.left);
        let right = dfs(node.right);
        
        left = node.left && node.left.val === node.val ? left + 1 : 0;
        right = node.right && node.right.val === node.val ? right + 1 : 0;
        
        longest = Math.max(longest, left + right);
        
        return Math.max(left, right);
    }
    
    dfs(root);
    return longest;
}
```

#### Problem 43: Binary Tree Coloring Game

```javascript
/**
 * @param {TreeNode} root
 * @param {number} n
 * @param {number} x
 * @return {boolean}
 */
function btreeGameWinningMove(root, n, x) {
    let leftCount = 0;
    let rightCount = 0;
    
    function countNodes(node) {
        if (!node) return 0;
        
        const left = countNodes(node.left);
        const right = countNodes(node.right);
        
        if (node.val === x) {
            leftCount = left;
            rightCount = right;
        }
        
        return 1 + left + right;
    }
    
    countNodes(root);
    
    const parentCount = n - leftCount - rightCount - 1;
    const maxOpponent = Math.max(leftCount, rightCount, parentCount);
    
    return maxOpponent > n / 2;
}
```

#### Problem 44: Distribute Coins in Binary Tree

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function distributeCoins(root) {
    let moves = 0;
    
    function dfs(node) {
        if (!node) return 0;
        
        const left = dfs(node.left);
        const right = dfs(node.right);
        
        moves += Math.abs(left) + Math.abs(right);
        
        return node.val + left + right - 1;
    }
    
    dfs(root);
    return moves;
}
```

#### Problem 45: Sum of Distances in Tree

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
function sumOfDistancesInTree(n, edges) {
    const graph = Array(n).fill(null).map(() => []);
    
    for (let [a, b] of edges) {
        graph[a].push(b);
        graph[b].push(a);
    }
    
    const count = Array(n).fill(1);
    const result = Array(n).fill(0);
    
    // Post-order: calculate subtree sizes and distances
    function postOrder(node, parent) {
        for (let child of graph[node]) {
            if (child !== parent) {
                postOrder(child, node);
                count[node] += count[child];
                result[node] += result[child] + count[child];
            }
        }
    }
    
    // Pre-order: calculate result for all nodes
    function preOrder(node, parent) {
        for (let child of graph[node]) {
            if (child !== parent) {
                result[child] = result[node] - count[child] + (n - count[child]);
                preOrder(child, node);
            }
        }
    }
    
    postOrder(0, -1);
    preOrder(0, -1);
    
    return result;
}
```

#### Problem 46: Maximum Average Subtree

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function maximumAverageSubtree(root) {
    let maxAvg = 0;
    
    // Returns [sum, count]
    function dfs(node) {
        if (!node) return [0, 0];
        
        const [leftSum, leftCount] = dfs(node.left);
        const [rightSum, rightCount] = dfs(node.right);
        
        const sum = node.val + leftSum + rightSum;
        const count = 1 + leftCount + rightCount;
        
        maxAvg = Math.max(maxAvg, sum / count);
        
        return [sum, count];
    }
    
    dfs(root);
    return maxAvg;
}
```

#### Problem 47: Largest BST Subtree

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function largestBSTSubtree(root) {
    let maxSize = 0;
    
    // Returns [isBST, size, min, max]
    function dfs(node) {
        if (!node) return [true, 0, Infinity, -Infinity];
        
        const [leftBST, leftSize, leftMin, leftMax] = dfs(node.left);
        const [rightBST, rightSize, rightMin, rightMax] = dfs(node.right);
        
        if (leftBST && rightBST && node.val > leftMax && node.val < rightMin) {
            const size = 1 + leftSize + rightSize;
            maxSize = Math.max(maxSize, size);
            
            return [
                true,
                size,
                Math.min(node.val, leftMin),
                Math.max(node.val, rightMax)
            ];
        }
        
        return [false, 0, 0, 0];
    }
    
    dfs(root);
    return maxSize;
}
```

#### Problem 48: Binary Tree Upside Down

```javascript
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function upsideDownBinaryTree(root) {
    if (!root || !root.left) return root;
    
    const newRoot = upsideDownBinaryTree(root.left);
    
    root.left.left = root.right;
    root.left.right = root;
    root.left = null;
    root.right = null;
    
    return newRoot;
}

// Iterative
function upsideDownBinaryTreeIterative(root) {
    let current = root;
    let next = null;
    let temp = null;
    let prev = null;
    
    while (current) {
        next = current.left;
        
        current.left = temp;
        temp = current.right;
        current.right = prev;
        
        prev = current;
        current = next;
    }
    
    return prev;
}
```

#### Problem 49: Count Good Nodes in Binary Tree

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function goodNodes(root) {
    function dfs(node, maxSoFar) {
        if (!node) return 0;
        
        let count = node.val >= maxSoFar ? 1 : 0;
        const newMax = Math.max(maxSoFar, node.val);
        
        count += dfs(node.left, newMax);
        count += dfs(node.right, newMax);
        
        return count;
    }
    
    return dfs(root, -Infinity);
}
```

#### Problem 50: Binary Tree Longest Consecutive Sequence

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function longestConsecutive(root) {
    let maxLength = 0;
    
    function dfs(node, parent, length) {
        if (!node) return;
        
        length = parent && node.val === parent.val + 1 ? length + 1 : 1;
        maxLength = Math.max(maxLength, length);
        
        dfs(node.left, node, length);
        dfs(node.right, node, length);
    }
    
    dfs(root, null, 0);
    return maxLength;
}

// Version II: Path can be parent-child-parent
function longestConsecutiveII(root) {
    let maxLength = 0;
    
    // Returns [increasing length, decreasing length]
    function dfs(node) {
        if (!node) return [0, 0];
        
        let inc = 1, dec = 1;
        
        if (node.left) {
            const [leftInc, leftDec] = dfs(node.left);
            
            if (node.val === node.left.val + 1) {
                dec = leftDec + 1;
            } else if (node.val === node.left.val - 1) {
                inc = leftInc + 1;
            }
        }
        
        if (node.right) {
            const [rightInc, rightDec] = dfs(node.right);
            
            if (node.val === node.right.val + 1) {
                dec = Math.max(dec, rightDec + 1);
            } else if (node.val === node.right.val - 1) {
                inc = Math.max(inc, rightInc + 1);
            }
        }
        
        maxLength = Math.max(maxLength, inc + dec - 1);
        
        return [inc, dec];
    }
    
    dfs(root);
    return maxLength;
}
```

---

## Problem-Solving Patterns

### Pattern 1: When to Use DFS vs BFS

**Use DFS when:**
- Need to explore all paths
- Tree depth/height problems
- Path sum problems
- Serialization/deserialization
- Checking tree properties

**Use BFS when:**
- Level-order traversal
- Finding shortest path
- Right side view
- Minimum depth
- Level-wise operations

### Pattern 2: Recursion with Return Values

Many tree problems can be solved by having recursion return multiple values:
- `[isBST, size, min, max]` for BST validation
- `[robbing, not robbing]` for House Robber
- `[sum, count]` for average calculations

### Pattern 3: Global Variables

Use class/function scope variables for:
- Maximum/minimum tracking
- Counting occurrences
- Building result arrays

### Pattern 4: Post-order for Bottom-Up

Use post-order when you need information from children before processing current node:
- Height calculation
- Subtree properties
- Path sums

### Pattern 5: Pre-order for Top-Down

Use pre-order when passing information from parent to children:
- Path tracking
- Accumulating values
- Bound checking

---

## Time Complexity Cheat Sheet

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Traversal (any) | O(n) | O(h) |
| Search in BST | O(h) | O(h) |
| Insert in BST | O(h) | O(h) |
| Delete in BST | O(h) | O(h) |
| Heap Insert | O(log n) | O(1) |
| Heap Extract | O(log n) | O(1) |
| Trie Insert | O(m) | O(m) |
| Trie Search | O(m) | O(1) |
| Morris Traversal | O(n) | O(1) |

*h = height, n = nodes, m = word length*

---

## Tips for Solving Tree Problems

1. **Draw It Out**: Visualize small examples

2. **Identify Pattern**:
   - Single node vs subtree
   - Top-down vs bottom-up
   - Left-right symmetry

3. **Base Cases**:
   - null node
   - Single node
   - Leaf node

4. **Choose Traversal**:
   - Inorder: BST sorted order
   - Preorder: Root first, good for copying
   - Postorder: Children first, good for deletion
   - Level-order: BFS, level-wise processing

5. **Common Mistakes**:
   - Not handling null nodes
   - Forgetting to return values
   - Modifying tree during traversal
   - Not considering single node edge case

6. **Optimization Techniques**:
   - Morris traversal for O(1) space
   - Memoization for repeated subproblems
   - Early termination when possible

---

## Additional Data Structures

### Fenwick Tree (Binary Indexed Tree)

```javascript
class FenwickTree {
    constructor(n) {
        this.size = n;
        this.tree = Array(n + 1).fill(0);
    }
    
    update(index, delta) {
        index++; // 1-indexed
        while (index <= this.size) {
            this.tree[index] += delta;
            index += index & -index;
        }
    }
    
    query(index) {
        index++; // 1-indexed
        let sum = 0;
        while (index > 0) {
            sum += this.tree[index];
            index -= index & -index;
        }
        return sum;
    }
    
    rangeQuery(left, right) {
        return this.query(right) - (left > 0 ? this.query(left - 1) : 0);
    }
}
```

### N-ary Tree

```javascript
class NaryNode {
    constructor(val, children = []) {
        this.val = val;
        this.children = children;
    }
}

// Preorder traversal
function preorderNary(root) {
    if (!root) return [];
    
    const result = [root.val];
    
    for (let child of root.children) {
        result.push(...preorderNary(child));
    }
    
    return result;
}

// Level order traversal
function levelOrderNary(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const size = queue.length;
        const level = [];
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            queue.push(...node.children);
        }
        
        result.push(level);
    }
    
    return result;
}

// Maximum depth
function maxDepthNary(root) {
    if (!root) return 0;
    
    let maxChildDepth = 0;
    for (let child of root.children) {
        maxChildDepth = Math.max(maxChildDepth, maxDepthNary(child));
    }
    
    return 1 + maxChildDepth;
}
```

---

## Practice Resources

- **LeetCode**: Tree tag (Easy → Medium → Hard)
- **HackerRank**: Tree section
- **Codeforces**: Tree problems
- **GeeksforGeeks**: Tree data structure tutorials
- **InterviewBit**: Tree problems

## Conclusion

Trees are fundamental data structures that appear in countless real-world applications. Master these concepts, understand the traversal methods, and practice the problems regularly. The key to tree problems is:

1. Understanding recursion deeply
2. Identifying the right traversal method
3. Handling base cases properly
4. Thinking in terms of subproblems

Keep practicing and you'll be able to solve any tree problem that comes your way!

---

**Happy Coding! 🌲**


