# 65. Serialize and Deserialize Binary Tree

**LeetCode Link**: [297. Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

**Difficulty**: Hard

**Topics**: String, Tree, Depth-First Search, Breadth-First Search, Design, Binary Tree

---

## Problem Statement

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree.

### Examples

**Example 1:**
```
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]

    1
   / \
  2   3
     / \
    4   5
```

**Example 2:**
```
Input: root = []
Output: []
```

### Constraints
- The number of nodes in the tree is in the range `[0, 10^4]`
- `-1000 <= Node.val <= 1000`

---

## Approach: Preorder DFS (Optimal!) ✅

### Implementation

```javascript
/**
 * Serialize - O(n) time, O(n) space
 * @param {TreeNode} root
 * @return {string}
 */
function serialize(root) {
    const result = [];
    
    function dfs(node) {
        if (node === null) {
            result.push('null');
            return;
        }
        
        result.push(node.val.toString());
        dfs(node.left);
        dfs(node.right);
    }
    
    dfs(root);
    return result.join(',');
}

/**
 * Deserialize - O(n) time, O(n) space
 * @param {string} data
 * @return {TreeNode}
 */
function deserialize(data) {
    const values = data.split(',');
    let index = 0;
    
    function dfs() {
        if (values[index] === 'null') {
            index++;
            return null;
        }
        
        const node = new TreeNode(parseInt(values[index++]));
        node.left = dfs();
        node.right = dfs();
        
        return node;
    }
    
    return dfs();
}

// Test
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.right.left = new TreeNode(4);
root.right.right = new TreeNode(5);

const serialized = serialize(root);
console.log(serialized); // "1,2,null,null,3,4,null,null,5,null,null"

const deserialized = deserialize(serialized);
console.log(serialize(deserialized) === serialized); // true
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Process each node once
- **Space Complexity**: `O(n)` - Store all nodes

---

## Key Takeaways

✅ Use preorder traversal for serialization  
✅ Include null markers for structure  
✅ Deserialize recursively following same order  
✅ O(n) time and space for both operations  
✅ Can also use BFS level-order approach  

**Pattern**: Serialize tree → DFS with null markers!

**Trees Complete! (15/15) ✅**
