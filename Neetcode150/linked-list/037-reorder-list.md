# 37. Reorder List

**LeetCode Link**: [143. Reorder List](https://leetcode.com/problems/reorder-list/)

**Difficulty**: Medium

**Topics**: Linked List, Two Pointers, Stack, Recursion

---

## Problem Statement

You are given the head of a singly linked-list. The list can be represented as:

```
L0 → L1 → … → Ln - 1 → Ln
```

Reorder the list to be on the following form:

```
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
```

You may not modify the values in the list's nodes. Only nodes themselves may be changed.

### Examples

**Example 1:**
```
Input: head = [1,2,3,4]
Output: [1,4,2,3]
```

**Example 2:**
```
Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]
```

### Constraints
- The number of nodes in the list is in the range `[1, 5 * 10^4]`
- `1 <= Node.val <= 1000`

---

## Approach: Three Steps (Optimal!) ✅

### Intuition
1. Find middle of list (slow/fast pointers)
2. Reverse second half
3. Merge two halves alternately

### Implementation

```javascript
/**
 * Three Steps - O(n) time, O(1) space
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
function reorderList(head) {
    if (head === null || head.next === null) {
        return;
    }
    
    // Step 1: Find middle using slow/fast pointers
    let slow = head;
    let fast = head;
    
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Step 2: Reverse second half
    let second = reverseList(slow.next);
    slow.next = null; // Cut the list in half
    
    // Step 3: Merge two halves alternately
    let first = head;
    
    while (second !== null) {
        const temp1 = first.next;
        const temp2 = second.next;
        
        first.next = second;
        second.next = temp1;
        
        first = temp1;
        second = temp2;
    }
}

/**
 * Helper: Reverse linked list
 */
function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        const nextNode = current.next;
        current.next = prev;
        prev = current;
        current = nextNode;
    }
    
    return prev;
}

// Test
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

reorderList(head);
// Result: 1 -> 5 -> 2 -> 4 -> 3
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Three passes (find middle, reverse, merge)
- **Space Complexity**: `O(1)` - Only pointers

---

## Visual Example

```
Original: 1 -> 2 -> 3 -> 4 -> 5

Step 1: Find Middle
────────────────────
slow/fast pointers
slow moves 1 step, fast moves 2 steps

slow at 3 when fast reaches end
1 -> 2 -> 3 -> 4 -> 5
          ^
        slow

Step 2: Reverse Second Half
────────────────────────────
First half:  1 -> 2 -> 3 -> null
Second half: 4 -> 5 -> null

Reverse second:
Second half: 5 -> 4 -> null

Step 3: Merge Alternately
──────────────────────────
First:  1 -> 2 -> 3 -> null
Second: 5 -> 4 -> null

Merge:
1 -> 5 -> 2 -> 4 -> 3 -> null

Result: [1, 5, 2, 4, 3] ✓
```

---

## Step-by-Step Merge

```
Before merge:
first:  1 -> 2 -> 3 -> null
second: 5 -> 4 -> null

Iteration 1:
temp1 = 2, temp2 = 4
1 -> 5
     -> 2 -> 3 -> null
first = 2, second = 4

Iteration 2:
temp1 = 3, temp2 = null
1 -> 5 -> 2 -> 4
               -> 3 -> null
first = 3, second = null

second is null → Done!

Final: 1 -> 5 -> 2 -> 4 -> 3 -> null
```

---

## Alternative: Using Stack

```javascript
/**
 * Using Stack - O(n) time, O(n) space
 */
function reorderListStack(head) {
    if (head === null || head.next === null) {
        return;
    }
    
    // Push all nodes to stack
    const stack = [];
    let current = head;
    while (current !== null) {
        stack.push(current);
        current = current.next;
    }
    
    // Reorder by alternating from start and end
    current = head;
    let count = Math.floor(stack.length / 2);
    
    while (count > 0) {
        const last = stack.pop();
        const temp = current.next;
        
        current.next = last;
        last.next = temp;
        
        current = temp;
        count--;
    }
    
    current.next = null; // Important: cut off remaining
}
```

---

## Edge Cases

```javascript
// Single node
const single = new ListNode(1);
reorderList(single);
// Result: 1

// Two nodes
const two = new ListNode(1, new ListNode(2));
reorderList(two);
// Result: 1 -> 2

// Three nodes
const three = new ListNode(1, new ListNode(2, new ListNode(3)));
reorderList(three);
// Result: 1 -> 3 -> 2

// Even length
const even = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
reorderList(even);
// Result: 1 -> 4 -> 2 -> 3

// Odd length
const odd = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
reorderList(odd);
// Result: 1 -> 5 -> 2 -> 4 -> 3
```

---

## Common Mistakes

### ❌ Mistake 1: Not cutting list in half
```javascript
// Wrong - creates cycle
let second = reverseList(slow.next);
// Didn't set slow.next = null!

// Correct
let second = reverseList(slow.next);
slow.next = null; // Cut the list
```

### ❌ Mistake 2: Wrong middle finding for even length
```javascript
// For even length [1,2,3,4]
// Want: [1,2] and [3,4]
// After finding middle at 2, second half starts at 3 ✓

while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
}
// slow at 2, correct ✓
```

### ❌ Mistake 3: Not handling remaining nodes
```javascript
// Wrong - loses last node in odd length
while (second !== null && first !== null) {
    // ... merge
}

// Correct - first will handle remaining (middle node in odd case)
while (second !== null) {
    // ... merge
}
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Modify in-place? Can't change values, only links? Yes."

2. **Approach**: "Three steps:
   - Find middle with slow/fast pointers
   - Reverse second half
   - Merge alternately"

3. **Key insight**: "After finding middle, we have two lists. Reverse second, then interleave."

4. **Complexity**: "O(n) time with three passes, O(1) space"

### Follow-up Questions:

**Q: Can you do it with O(n) space?**
A: Yes, use stack (see alternative), but O(1) space is better

**Q: What if you want to preserve original list?**
```javascript
function reorderListCopy(head) {
    // Create deep copy first
    const newHead = copyList(head);
    reorderList(newHead);
    return newHead;
}

function copyList(head) {
    if (head === null) return null;
    const newHead = new ListNode(head.val);
    newHead.next = copyList(head.next);
    return newHead;
}
```

**Q: Can you return a new list instead of modifying?**
A: Yes, during merge step create new nodes instead of relinking

---

## Related Problems

- [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
- [876. Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)
- [234. Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)

---

## Key Takeaways

✅ Three-step approach: find middle, reverse, merge  
✅ Slow/fast pointers to find middle  
✅ Cut list in half before reversing  
✅ Merge alternately from both halves  
✅ O(n) time, O(1) space optimal  

**Pattern**: Reorder list → Find middle + Reverse + Merge!
