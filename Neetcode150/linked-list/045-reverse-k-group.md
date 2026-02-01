# 45. Reverse Nodes in k-Group

**LeetCode Link**: [25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)

**Difficulty**: Hard

**Topics**: Linked List, Recursion

---

## Problem Statement

Given the `head` of a linked list, reverse the nodes of the list `k` at a time, and return the modified list.

`k` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of `k` then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

### Examples

**Example 1:**
```
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
```

**Example 2:**
```
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
```

### Constraints
- The number of nodes in the list is `n`
- `1 <= k <= n <= 5000`
- `0 <= Node.val <= 1000`

---

## Approach: Iterative (Optimal!) ✅

### Intuition
Reverse k nodes at a time. Check if k nodes available, reverse them, reconnect, move to next group.

### Implementation

```javascript
/**
 * Iterative - O(n) time, O(1) space
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function reverseKGroup(head, k) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prevGroupEnd = dummy;
    
    while (true) {
        // Check if k nodes available
        let kth = getKth(prevGroupEnd, k);
        if (kth === null) {
            break; // Less than k nodes remaining
        }
        
        // Save next group start
        let nextGroupStart = kth.next;
        
        // Reverse k nodes
        let prev = kth.next; // Will be new end's next
        let current = prevGroupEnd.next;
        
        while (current !== nextGroupStart) {
            const temp = current.next;
            current.next = prev;
            prev = current;
            current = temp;
        }
        
        // Reconnect
        const newGroupEnd = prevGroupEnd.next; // Original first node
        prevGroupEnd.next = kth; // Connect to new start
        prevGroupEnd = newGroupEnd; // Move to next group
    }
    
    return dummy.next;
}

/**
 * Get kth node from start
 */
function getKth(start, k) {
    let current = start;
    while (current !== null && k > 0) {
        current = current.next;
        k--;
    }
    return current;
}

// Test
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

const result = reverseKGroup(head, 2);
// Result: 2 -> 1 -> 4 -> 3 -> 5
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(1)` - Only pointers

---

## Approach 2: Recursive

```javascript
/**
 * Recursive - O(n) time, O(n/k) space
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function reverseKGroupRecursive(head, k) {
    // Check if k nodes available
    let current = head;
    let count = 0;
    
    while (current !== null && count < k) {
        current = current.next;
        count++;
    }
    
    if (count < k) {
        return head; // Less than k nodes, return as is
    }
    
    // Reverse k nodes
    let prev = null;
    current = head;
    count = 0;
    
    while (count < k) {
        const temp = current.next;
        current.next = prev;
        prev = current;
        current = temp;
        count++;
    }
    
    // Recursively reverse rest and connect
    head.next = reverseKGroupRecursive(current, k);
    
    return prev; // New head
}
```

---

## Visual Example

```
Input: head = [1,2,3,4,5], k = 3

Step 1: Reverse first 3 nodes
────────────────────────────
Before: 1 -> 2 -> 3 -> 4 -> 5
After:  3 -> 2 -> 1 -> 4 -> 5
                   ^
                 prevGroupEnd

Step 2: Check next group
─────────────────────────
Remaining: 4 -> 5 (only 2 nodes, < k=3)
Don't reverse, keep as is

Final: 3 -> 2 -> 1 -> 4 -> 5 ✓
```

---

## Detailed Step-by-Step

```
k = 2, head = [1,2,3,4,5]

Initial:
dummy -> 1 -> 2 -> 3 -> 4 -> 5
^
prevGroupEnd

Iteration 1:
────────────
Get 2nd node from dummy: node 2 (kth)
Reverse nodes 1-2:
dummy -> 2 -> 1 -> 3 -> 4 -> 5
         ^         ^
       new head   prevGroupEnd

Iteration 2:
────────────
Get 2nd node from node 1: node 4 (kth)
Reverse nodes 3-4:
dummy -> 2 -> 1 -> 4 -> 3 -> 5
                   ^         ^
                 new head   prevGroupEnd

Iteration 3:
────────────
Get 2nd node from node 3: null (only 1 node left)
Break

Final: 2 -> 1 -> 4 -> 3 -> 5 ✓
```

---

## Edge Cases

```javascript
// k = 1 (no reversal needed)
const k1 = new ListNode(1, new ListNode(2, new ListNode(3)));
console.log(reverseKGroup(k1, 1)); // 1 -> 2 -> 3

// k equals list length
const kFull = new ListNode(1, new ListNode(2, new ListNode(3)));
console.log(reverseKGroup(kFull, 3)); // 3 -> 2 -> 1

// k > list length
const kLarge = new ListNode(1, new ListNode(2));
console.log(reverseKGroup(kLarge, 3)); // 1 -> 2 (no change)

// Single node
const single = new ListNode(1);
console.log(reverseKGroup(single, 1)); // 1

// Exact multiple of k
const exact = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
console.log(reverseKGroup(exact, 2)); // 2 -> 1 -> 4 -> 3

// Not multiple of k
const notExact = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.log(reverseKGroup(notExact, 2)); // 2 -> 1 -> 4 -> 3 -> 5
```

---

## Common Mistakes

### ❌ Mistake 1: Not checking if k nodes available
```javascript
// Wrong - reverses even when < k nodes remaining
while (prevGroupEnd !== null) {
    // Reverse k nodes blindly
}

// Correct - check first
let kth = getKth(prevGroupEnd, k);
if (kth === null) break;
```

### ❌ Mistake 2: Losing connection between groups
```javascript
// Wrong - doesn't save references
reverseSection(start, k);
// Lost connection to previous group!

// Correct - save and reconnect
const newGroupEnd = prevGroupEnd.next;
prevGroupEnd.next = kth;
prevGroupEnd = newGroupEnd;
```

### ❌ Mistake 3: Reversing more than k nodes
```javascript
// Wrong - no stop condition
let current = start;
while (current !== null) {
    // Reverses entire rest of list!
}

// Correct - stop after k nodes
let count = 0;
while (count < k && current !== null) {
    // ...
    count++;
}
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Reverse k at a time? If remaining < k, leave as is? Can't modify values? Yes."

2. **Approach**: "Check if k nodes available. If yes, reverse them and reconnect. Repeat."

3. **Key steps**:
   - Find kth node to check availability
   - Reverse k nodes
   - Reconnect to previous and next groups
   - Move to next group

4. **Complexity**: "O(n) time single pass, O(1) space for iterative"

### Follow-up Questions:

**Q: What if we should reverse remaining nodes even if < k?**
```javascript
function reverseKGroupAll(head, k) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prevGroupEnd = dummy;
    
    while (prevGroupEnd.next !== null) {
        // Always try to reverse up to k nodes
        let count = 0;
        let kth = prevGroupEnd;
        
        while (kth.next !== null && count < k) {
            kth = kth.next;
            count++;
        }
        
        // Reverse count nodes (might be < k)
        let nextGroupStart = kth.next;
        let prev = nextGroupStart;
        let current = prevGroupEnd.next;
        
        while (current !== nextGroupStart) {
            const temp = current.next;
            current.next = prev;
            prev = current;
            current = temp;
        }
        
        const newGroupEnd = prevGroupEnd.next;
        prevGroupEnd.next = kth;
        prevGroupEnd = newGroupEnd;
    }
    
    return dummy.next;
}
```

**Q: Can you reverse every alternate k-group?**
```javascript
function reverseAlternateKGroup(head, k) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prevGroupEnd = dummy;
    let shouldReverse = true;
    
    while (true) {
        let kth = getKth(prevGroupEnd, k);
        if (kth === null) break;
        
        if (shouldReverse) {
            // Reverse this group
            // ... (same reversal logic)
        } else {
            // Skip this group
            prevGroupEnd = kth;
        }
        
        shouldReverse = !shouldReverse;
    }
    
    return dummy.next;
}
```

---

## Related Problems

- [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
- [92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/)
- [24. Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/)

---

## Key Takeaways

✅ Check if k nodes available before reversing  
✅ Reverse k nodes at a time  
✅ Carefully reconnect groups  
✅ Use dummy node for clean code  
✅ O(n) time, O(1) space iterative solution  

**Pattern**: Reverse k-group → Check availability + reverse + reconnect!

**Linked List Complete! (11/11) ✅**
