# 38. Remove Nth Node From End of List

**LeetCode Link**: [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

**Difficulty**: Medium

**Topics**: Linked List, Two Pointers

---

## Problem Statement

Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.

### Examples

**Example 1:**
```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
Explanation: Remove 4 (2nd from end)
```

**Example 2:**
```
Input: head = [1], n = 1
Output: []
```

**Example 3:**
```
Input: head = [1,2], n = 1
Output: [1]
```

### Constraints
- The number of nodes in the list is `sz`
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

---

## Approach 1: Two Pass

```javascript
function removeNthFromEnd(head, n) {
    // First pass: count length
    let length = 0;
    let current = head;
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    // Calculate position from start
    const posFromStart = length - n;
    
    // Handle removing head
    if (posFromStart === 0) {
        return head.next;
    }
    
    // Second pass: find node before target
    current = head;
    for (let i = 0; i < posFromStart - 1; i++) {
        current = current.next;
    }
    
    // Remove target node
    current.next = current.next.next;
    
    return head;
}
```

**Complexity**: O(n) time but two passes

---

## Approach 2: One Pass with Two Pointers (Optimal!) ✅

### Intuition
Use two pointers with n gap between them. When fast reaches end, slow is at node before target.

### Implementation

```javascript
/**
 * One Pass Two Pointers - O(n) time, O(1) space
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
    // Dummy node to handle removing head
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let fast = dummy;
    let slow = dummy;
    
    // Move fast n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    // Move both until fast reaches end
    while (fast !== null) {
        slow = slow.next;
        fast = fast.next;
    }
    
    // Remove nth node from end
    slow.next = slow.next.next;
    
    return dummy.next;
}

// Test
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

const result = removeNthFromEnd(head, 2);
// Result: 1 -> 2 -> 3 -> 5
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Single pass
- **Space Complexity**: `O(1)` - Only two pointers

---

## Visual Example

```
Remove 2nd from end: [1, 2, 3, 4, 5], n = 2

Step 1: Create dummy, move fast n+1 steps
────────────────────────────────────────
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
^                   ^
slow                fast (after 3 moves)

Step 2: Move both until fast is null
─────────────────────────────────────
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
                  ^              ^
                slow            fast

Continue...

dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
                       ^         ^
                     slow       fast

dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
                            ^         
                          slow    fast=null

Step 3: Remove slow.next (which is 4)
──────────────────────────────────────
dummy -> 1 -> 2 -> 3 -> 5 -> null
                       
Result: [1, 2, 3, 5] ✓
```

---

## Why n+1 Steps?

```
List: 1 -> 2 -> 3 -> 4 -> 5
Remove 2nd from end (n=2)

Need slow at node BEFORE target (at 3, not 4)

Gap calculation:
- Total length: 5
- 2nd from end is at position 4 (0-indexed)
- Node before is at position 3
- Need gap of n+1 between dummy and fast

dummy -> 1 -> 2 -> 3 -> 4 -> 5
^                        ^
slow                    fast (n+1=3 gaps)

When fast reaches null, slow is at 3 ✓
```

---

## Edge Cases

```javascript
// Remove head (only node)
const single = new ListNode(1);
console.log(removeNthFromEnd(single, 1)); // null

// Remove head (multiple nodes)
const head1 = new ListNode(1, new ListNode(2));
console.log(removeNthFromEnd(head1, 2)); // 2

// Remove last node
const head2 = new ListNode(1, new ListNode(2));
console.log(removeNthFromEnd(head2, 1)); // 1

// Two nodes, remove either
const two = new ListNode(1, new ListNode(2));
console.log(removeNthFromEnd(two, 1)); // 1
console.log(removeNthFromEnd(two, 2)); // 2

// Remove from middle
const mid = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.log(removeNthFromEnd(mid, 3)); // 1 -> 2 -> 4 -> 5
```

---

## Common Mistakes

### ❌ Mistake 1: Moving fast n steps instead of n+1
```javascript
// Wrong - slow will be at target, not before it
for (let i = 0; i < n; i++) {
    fast = fast.next;
}
// slow ends at target, can't remove it!

// Correct - slow at node before target
for (let i = 0; i <= n; i++) { // n+1 steps
    fast = fast.next;
}
```

### ❌ Mistake 2: Not using dummy node
```javascript
// Wrong - complex handling when removing head
if (/* removing head */) {
    return head.next;
}
// ... different logic

// Correct - dummy handles all cases uniformly
const dummy = new ListNode(0);
dummy.next = head;
```

### ❌ Mistake 3: Not checking for null
```javascript
// Wrong - crashes if fast becomes null during setup
for (let i = 0; i <= n; i++) {
    fast = fast.next; // Could be null!
}

// Correct - problem guarantees valid n, so safe
// But in practice, add check:
if (fast === null) return head; // Invalid n
```

---

## Interview Tips

### What to say:

1. **Clarify**: "n is always valid (1 <= n <= list length)? Yes."

2. **Approach**: "Use two pointers with n+1 gap. When fast reaches end, slow is at node before target."

3. **Key insight**: "Dummy node simplifies removing head case."

4. **Steps**:
   - Create dummy pointing to head
   - Move fast n+1 steps ahead
   - Move both until fast is null
   - Remove slow.next

5. **Complexity**: "O(n) time single pass, O(1) space"

### Follow-up Questions:

**Q: What if n could be invalid (larger than list length)?**
```javascript
function removeNthFromEndSafe(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let fast = dummy;
    let slow = dummy;
    
    // Move fast n+1 steps, check for null
    for (let i = 0; i <= n; i++) {
        if (fast === null) {
            return head; // Invalid n
        }
        fast = fast.next;
    }
    
    while (fast !== null) {
        slow = slow.next;
        fast = fast.next;
    }
    
    slow.next = slow.next.next;
    return dummy.next;
}
```

**Q: Remove kth node from beginning instead?**
```javascript
function removeKthFromStart(head, k) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let current = dummy;
    
    // Move k-1 steps
    for (let i = 0; i < k - 1; i++) {
        if (current.next === null) return head;
        current = current.next;
    }
    
    if (current.next !== null) {
        current.next = current.next.next;
    }
    
    return dummy.next;
}
```

---

## Related Problems

- [876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)
- [203. Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/)
- [237. Delete Node in a Linked List](https://leetcode.com/problems/delete-node-in-a-linked-list/)

---

## Key Takeaways

✅ Two pointers with n+1 gap for one-pass solution  
✅ Dummy node simplifies removing head  
✅ Fast pointer reaches end → slow at node before target  
✅ O(n) time single pass, O(1) space  
✅ Gap of n+1, not n!  

**Pattern**: Remove kth from end → Two pointers with gap!
