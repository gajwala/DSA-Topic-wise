# 35. Reverse Linked List

**LeetCode Link**: [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

**Difficulty**: Easy

**Topics**: Linked List, Recursion

---

## Problem Statement

Given the `head` of a singly linked list, reverse the list, and return the reversed list.

### Examples

**Example 1:**
```
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

**Example 2:**
```
Input: head = [1,2]
Output: [2,1]
```

**Example 3:**
```
Input: head = []
Output: []
```

### Constraints
- The number of nodes in the list is the range `[0, 5000]`
- `-5000 <= Node.val <= 5000`

---

## Linked List Node Definition

```javascript
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
```

---

## Approach 1: Iterative (3 Pointers) ✅

### Intuition
Use three pointers: prev, current, next. Reverse links one by one while traversing.

### Implementation

```javascript
/**
 * Iterative - O(n) time, O(1) space
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        // Save next node
        const nextNode = current.next;
        
        // Reverse the link
        current.next = prev;
        
        // Move pointers forward
        prev = current;
        current = nextNode;
    }
    
    return prev; // New head
}

// Test
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

const reversed = reverseList(head);
// Result: 5 -> 4 -> 3 -> 2 -> 1
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(1)` - Only three pointers

---

## Approach 2: Recursive

```javascript
/**
 * Recursive - O(n) time, O(n) space (call stack)
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseListRecursive(head) {
    // Base case: empty list or single node
    if (head === null || head.next === null) {
        return head;
    }
    
    // Recursively reverse rest of the list
    const newHead = reverseListRecursive(head.next);
    
    // Reverse the link
    head.next.next = head;
    head.next = null;
    
    return newHead;
}

// Alternative recursive with helper
function reverseListRecursiveHelper(head) {
    function reverse(current, prev) {
        if (current === null) {
            return prev;
        }
        
        const next = current.next;
        current.next = prev;
        return reverse(next, current);
    }
    
    return reverse(head, null);
}
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node once
- **Space Complexity**: `O(n)` - Recursion call stack

---

## Visual Example

```
Original: 1 -> 2 -> 3 -> 4 -> 5 -> null

Iterative Process:
──────────────────

Step 1: prev=null, current=1
null <- 1    2 -> 3 -> 4 -> 5 -> null
        ^
      prev  current

Step 2: prev=1, current=2
null <- 1 <- 2    3 -> 4 -> 5 -> null
             ^
           prev  current

Step 3: prev=2, current=3
null <- 1 <- 2 <- 3    4 -> 5 -> null
                  ^
                prev  current

Step 4: prev=3, current=4
null <- 1 <- 2 <- 3 <- 4    5 -> null
                       ^
                     prev  current

Step 5: prev=4, current=5
null <- 1 <- 2 <- 3 <- 4 <- 5    null
                            ^
                          prev  current

Step 6: current=null
Return prev (5)

Result: 5 -> 4 -> 3 -> 2 -> 1 -> null
```

---

## Recursive Visualization

```
reverseList(1 -> 2 -> 3 -> 4 -> 5)
    |
    reverseList(2 -> 3 -> 4 -> 5)
        |
        reverseList(3 -> 4 -> 5)
            |
            reverseList(4 -> 5)
                |
                reverseList(5)
                    |
                    return 5 (base case)
                |
                4.next.next = 4 (5 -> 4)
                4.next = null
                return 5
            |
            3.next.next = 3 (4 -> 3)
            3.next = null
            return 5
        |
        2.next.next = 2 (3 -> 2)
        2.next = null
        return 5
    |
    1.next.next = 1 (2 -> 1)
    1.next = null
    return 5

Result: 5 -> 4 -> 3 -> 2 -> 1 -> null
```

---

## Edge Cases

```javascript
// Empty list
console.log(reverseList(null)); // null

// Single node
const single = new ListNode(1);
console.log(reverseList(single)); // 1

// Two nodes
const two = new ListNode(1, new ListNode(2));
console.log(reverseList(two)); // 2 -> 1

// Large list
const large = buildList(5000);
console.log(reverseList(large)); // Reversed 5000 nodes
```

---

## Common Mistakes

### ❌ Mistake 1: Losing reference to next node
```javascript
// Wrong - loses rest of list
current.next = prev; // Lost reference to next node!
current = current.next; // Now current is prev!

// Correct - save next first
const nextNode = current.next;
current.next = prev;
current = nextNode;
```

### ❌ Mistake 2: Wrong return value
```javascript
// Wrong - returns last node before null
while (current !== null) {
    // ...
    current = nextNode;
}
return current; // Returns null!

// Correct - return prev
return prev; // Points to new head
```

### ❌ Mistake 3: Not handling empty list
```javascript
// Wrong - crashes on null
const nextNode = current.next; // current could be null!

// Correct - check first
if (head === null) return null;
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Singly linked list? Should I modify in-place or create new list? In-place."

2. **Approach**: "Use three pointers: prev, current, next. Reverse links one by one."

3. **Key steps**:
   - Save next node
   - Reverse current link
   - Move pointers forward

4. **Complexity**: "O(n) time, O(1) space for iterative. O(n) space for recursive due to call stack."

### Follow-up Questions:

**Q: Can you do it recursively?**
A: Yes (Approach 2), but uses O(n) space for call stack

**Q: What if it's a doubly linked list?**
```javascript
function reverseDoublyLinkedList(head) {
    let current = head;
    let temp = null;
    
    while (current !== null) {
        // Swap next and prev
        temp = current.prev;
        current.prev = current.next;
        current.next = temp;
        
        current = current.prev; // Move to next (which is now prev)
    }
    
    // temp.prev is the new head
    return temp !== null ? temp.prev : head;
}
```

**Q: Reverse only part of the list (positions m to n)?**
```javascript
function reverseBetween(head, m, n) {
    if (m === n) return head;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    // Move to position before m
    for (let i = 0; i < m - 1; i++) {
        prev = prev.next;
    }
    
    // Reverse from m to n
    let current = prev.next;
    for (let i = 0; i < n - m; i++) {
        const temp = current.next;
        current.next = temp.next;
        temp.next = prev.next;
        prev.next = temp;
    }
    
    return dummy.next;
}
```

---

## Related Problems

- [92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/)
- [25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)
- [234. Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)

---

## Key Takeaways

✅ Three pointers: prev, current, next  
✅ Save next before reversing link  
✅ Iterative is O(1) space, recursive is O(n)  
✅ Return prev as new head  
✅ Handle empty list edge case  

**Pattern**: Reverse linked list → Three pointers iteration!
