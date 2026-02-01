# 39. Copy List with Random Pointer

**LeetCode Link**: [138. Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)

**Difficulty**: Medium

**Topics**: Hash Table, Linked List

---

## Problem Statement

A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`.

Construct a **deep copy** of the list. The deep copy should consist of exactly `n` brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the `next` and `random` pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. **None of the pointers in the new list should point to nodes in the original list**.

Return the head of the copied linked list.

### Examples

**Example 1:**
```
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
```

**Example 2:**
```
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]
```

**Example 3:**
```
Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]
```

### Constraints
- `0 <= n <= 1000`
- `-10^4 <= Node.val <= 10^4`
- `Node.random` is `null` or is pointing to some node in the linked list

---

## Node Definition

```javascript
function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
}
```

---

## Approach 1: Hash Map (Two Pass) ✅

### Intuition
First pass: create all nodes and store old→new mapping. Second pass: set next and random pointers using map.

### Implementation

```javascript
/**
 * Hash Map - O(n) time, O(n) space
 * @param {Node} head
 * @return {Node}
 */
function copyRandomList(head) {
    if (head === null) return null;
    
    const map = new Map(); // old node -> new node
    
    // First pass: create all nodes
    let current = head;
    while (current !== null) {
        map.set(current, new Node(current.val));
        current = current.next;
    }
    
    // Second pass: set next and random pointers
    current = head;
    while (current !== null) {
        const newNode = map.get(current);
        newNode.next = map.get(current.next) || null;
        newNode.random = map.get(current.random) || null;
        current = current.next;
    }
    
    return map.get(head);
}

// Test
const node1 = new Node(7);
const node2 = new Node(13);
const node3 = new Node(11);
const node4 = new Node(10);
const node5 = new Node(1);

node1.next = node2;
node2.next = node3; node2.random = node1;
node3.next = node4; node3.random = node5;
node4.next = node5; node4.random = node3;
node5.random = node1;

const copied = copyRandomList(node1);
// Deep copy with all pointers correctly set
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Two passes
- **Space Complexity**: `O(n)` - Hash map

---

## Approach 2: Interweaving (O(1) Space!) ✅

### Intuition
Create new nodes and interweave with original. Set random pointers. Separate lists.

### Implementation

```javascript
/**
 * Interweaving - O(n) time, O(1) space
 * @param {Node} head
 * @return {Node}
 */
function copyRandomListOptimal(head) {
    if (head === null) return null;
    
    // Step 1: Create new nodes interweaved with original
    // Original: 1 -> 2 -> 3
    // After: 1 -> 1' -> 2 -> 2' -> 3 -> 3'
    let current = head;
    while (current !== null) {
        const newNode = new Node(current.val);
        newNode.next = current.next;
        current.next = newNode;
        current = newNode.next;
    }
    
    // Step 2: Set random pointers for new nodes
    current = head;
    while (current !== null) {
        if (current.random !== null) {
            current.next.random = current.random.next;
        }
        current = current.next.next;
    }
    
    // Step 3: Separate the two lists
    const newHead = head.next;
    current = head;
    while (current !== null) {
        const newNode = current.next;
        current.next = newNode.next;
        if (newNode.next !== null) {
            newNode.next = newNode.next.next;
        }
        current = current.next;
    }
    
    return newHead;
}
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Three passes
- **Space Complexity**: `O(1)` - No extra data structure

---

## Visual Example

```
Original List:
7 -> 13 -> 11 -> 10 -> 1
     ↓      ↓     ↓    ↓
     7      1     13   7

Hash Map Approach:
──────────────────

Pass 1: Create nodes
map = {
  7  -> 7',
  13 -> 13',
  11 -> 11',
  10 -> 10',
  1  -> 1'
}

Pass 2: Set pointers
7'.next = map[13] = 13'
7'.random = map[null] = null
13'.next = map[11] = 11'
13'.random = map[7] = 7'
... and so on

Result: Deep copy!
```

---

## Interweaving Visual

```
Step 1: Interweave
──────────────────
Original: 7 -> 13 -> 11
After:    7 -> 7' -> 13 -> 13' -> 11 -> 11'

Step 2: Set random pointers
────────────────────────────
For each original node:
  new_node.random = original.random.next

13 random points to 7
13' random should point to 7'
13'.random = 13.random.next = 7.next = 7' ✓

Step 3: Separate
────────────────
Original: 7 -> 13 -> 11
Copy:     7' -> 13' -> 11'
```

---

## Edge Cases

```javascript
// Empty list
console.log(copyRandomList(null)); // null

// Single node, no random
const single = new Node(1);
console.log(copyRandomList(single)); // 1'

// Single node, random to itself
const selfRandom = new Node(1);
selfRandom.random = selfRandom;
const copied = copyRandomList(selfRandom);
// copied.random should point to copied itself

// All nodes have null random
const noRandom = new Node(1, new Node(2, new Node(3)));
console.log(copyRandomList(noRandom)); // Deep copy

// Circular random pointers
const circular1 = new Node(1);
const circular2 = new Node(2);
circular1.next = circular2;
circular1.random = circular2;
circular2.random = circular1;
console.log(copyRandomList(circular1)); // Deep copy with circular randoms
```

---

## Common Mistakes

### ❌ Mistake 1: Shallow copy instead of deep copy
```javascript
// Wrong - returns reference to original
function copyWrong(head) {
    return head; // Not a copy!
}

// Correct - create new nodes
const newNode = new Node(current.val);
```

### ❌ Mistake 2: Not handling null random pointers
```javascript
// Wrong - crashes on null
newNode.random = map.get(current.random); // undefined if null!

// Correct - handle null
newNode.random = map.get(current.random) || null;
```

### ❌ Mistake 3: In interweaving, not restoring original list
```javascript
// Wrong - original list is modified permanently
// ... interweave and copy ...
return newHead; // Original list still interweaved!

// Correct - separate lists in step 3
current.next = newNode.next; // Restore original
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Need deep copy with new nodes? Both next and random pointers? Yes."

2. **Two approaches**:
   - Hash map: Easier to understand, O(n) space
   - Interweaving: Clever, O(1) space

3. **Hash map approach**: "Two passes - create nodes with map, then set pointers"

4. **Interweaving approach**: "Three steps - interweave, set random, separate"

5. **Trade-off**: "Hash map simpler, interweaving saves space"

### Follow-up Questions:

**Q: Which approach is better in practice?**
A: Hash map is cleaner and easier to maintain. O(n) space is acceptable for most cases.

**Q: What if nodes have additional fields?**
```javascript
function Node(val, next, random, data) {
    this.val = val;
    this.next = next;
    this.random = random;
    this.data = data; // Additional field
}

function copyWithData(head) {
    const map = new Map();
    
    let current = head;
    while (current !== null) {
        const newNode = new Node(current.val);
        newNode.data = current.data; // Copy additional field
        map.set(current, newNode);
        current = current.next;
    }
    
    current = head;
    while (current !== null) {
        const newNode = map.get(current);
        newNode.next = map.get(current.next) || null;
        newNode.random = map.get(current.random) || null;
        current = current.next;
    }
    
    return map.get(head);
}
```

**Q: What if list has cycles?**
A: Approaches handle cycles naturally through mapping

---

## Related Problems

- [133. Clone Graph](https://leetcode.com/problems/clone-graph/)
- [1485. Clone Binary Tree With Random Pointer](https://leetcode.com/problems/clone-binary-tree-with-random-pointer/)

---

## Key Takeaways

✅ Hash map approach: Two passes, O(n) space  
✅ Map old nodes to new nodes  
✅ Use map to set next and random pointers  
✅ Interweaving: O(1) space but more complex  
✅ Handle null random pointers carefully  

**Pattern**: Deep copy with extra pointers → Hash map or interweaving!
