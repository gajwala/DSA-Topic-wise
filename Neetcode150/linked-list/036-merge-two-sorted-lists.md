# 36. Merge Two Sorted Lists

**LeetCode Link**: [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

**Difficulty**: Easy

**Topics**: Linked List, Recursion

---

## Problem Statement

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists in a one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

### Examples

**Example 1:**
```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

**Example 2:**
```
Input: list1 = [], list2 = []
Output: []
```

**Example 3:**
```
Input: list1 = [], list2 = [0]
Output: [0]
```

### Constraints
- The number of nodes in both lists is in the range `[0, 50]`
- `-100 <= Node.val <= 100`
- Both `list1` and `list2` are sorted in **non-decreasing** order

---

## Approach 1: Iterative with Dummy Node (Optimal!) ✅

### Intuition
Use dummy node to simplify edge cases. Compare values and attach smaller node. Move pointers forward.

### Implementation

```javascript
/**
 * Iterative - O(m + n) time, O(1) space
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
    // Create dummy node to simplify edge cases
    const dummy = new ListNode(0);
    let current = dummy;
    
    // Merge while both lists have nodes
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    // Attach remaining nodes (at most one list is non-empty)
    current.next = list1 !== null ? list1 : list2;
    
    return dummy.next;
}

// Test
const list1 = new ListNode(1, new ListNode(2, new ListNode(4)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const merged = mergeTwoLists(list1, list2);
// Result: 1 -> 1 -> 2 -> 3 -> 4 -> 4
```

### Complexity Analysis
- **Time Complexity**: `O(m + n)` - Visit each node once
- **Space Complexity**: `O(1)` - Only pointers

---

## Approach 2: Recursive

```javascript
/**
 * Recursive - O(m + n) time, O(m + n) space
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoListsRecursive(list1, list2) {
    // Base cases
    if (list1 === null) return list2;
    if (list2 === null) return list1;
    
    // Recursive merge
    if (list1.val <= list2.val) {
        list1.next = mergeTwoListsRecursive(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoListsRecursive(list1, list2.next);
        return list2;
    }
}
```

### Complexity Analysis
- **Time Complexity**: `O(m + n)` - Visit each node once
- **Space Complexity**: `O(m + n)` - Recursion call stack

---

## Visual Example

```
list1: 1 -> 2 -> 4 -> null
list2: 1 -> 3 -> 4 -> null

Iterative Process:
──────────────────

dummy -> null
current = dummy

Step 1: Compare 1 and 1
dummy -> 1(list1) -> ...
         ^
       current

Step 2: Compare 2 and 1
dummy -> 1(list1) -> 1(list2) -> ...
                     ^
                   current

Step 3: Compare 2 and 3
dummy -> 1 -> 1 -> 2(list1) -> ...
                   ^
                 current

Step 4: Compare 4 and 3
dummy -> 1 -> 1 -> 2 -> 3(list2) -> ...
                        ^
                      current

Step 5: Compare 4 and 4
dummy -> 1 -> 1 -> 2 -> 3 -> 4(list1) -> ...
                             ^
                           current

Step 6: list1 is null
Attach rest of list2
dummy -> 1 -> 1 -> 2 -> 3 -> 4 -> 4(list2) -> null

Return dummy.next
```

---

## Edge Cases

```javascript
// Both empty
console.log(mergeTwoLists(null, null)); // null

// One empty
const list1 = new ListNode(1);
console.log(mergeTwoLists(list1, null)); // 1
console.log(mergeTwoLists(null, list1)); // 1

// Different lengths
const short = new ListNode(1);
const long = new ListNode(2, new ListNode(3, new ListNode(4)));
console.log(mergeTwoLists(short, long)); // 1 -> 2 -> 3 -> 4

// All elements from list1 < all from list2
const l1 = new ListNode(1, new ListNode(2));
const l2 = new ListNode(3, new ListNode(4));
console.log(mergeTwoLists(l1, l2)); // 1 -> 2 -> 3 -> 4

// Duplicate values
const dup1 = new ListNode(1, new ListNode(1));
const dup2 = new ListNode(1, new ListNode(1));
console.log(mergeTwoLists(dup1, dup2)); // 1 -> 1 -> 1 -> 1
```

---

## Common Mistakes

### ❌ Mistake 1: Not using dummy node
```javascript
// Wrong - complex edge case handling
let head = null;
let current = null;

if (list1.val <= list2.val) { // What if list1 is null?
    head = list1;
    current = list1;
    list1 = list1.next;
}
// ... lots of edge case handling

// Correct - dummy simplifies
const dummy = new ListNode(0);
let current = dummy;
// No edge cases!
```

### ❌ Mistake 2: Forgetting remaining nodes
```javascript
// Wrong - loses remaining nodes
while (list1 !== null && list2 !== null) {
    // ... merge
}
return dummy.next; // Missing nodes!

// Correct - attach remaining
current.next = list1 !== null ? list1 : list2;
return dummy.next;
```

### ❌ Mistake 3: Creating new nodes
```javascript
// Wrong - creating new nodes (inefficient)
current.next = new ListNode(list1.val);

// Correct - reuse existing nodes
current.next = list1;
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Both lists sorted? Can I modify in-place? Yes to both."

2. **Approach**: "Use dummy node to simplify. Compare values, attach smaller, move forward."

3. **Key insight**: "Dummy node eliminates edge case handling for empty lists."

4. **Remaining nodes**: "After loop, at most one list has remaining nodes. Attach directly."

5. **Complexity**: "O(m+n) time, O(1) space for iterative"

### Follow-up Questions:

**Q: What if you can't modify the input lists?**
```javascript
function mergeTwoListsNoModify(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = new ListNode(list1.val);
            list1 = list1.next;
        } else {
            current.next = new ListNode(list2.val);
            list2 = list2.next;
        }
        current = current.next;
    }
    
    // Copy remaining nodes
    while (list1 !== null) {
        current.next = new ListNode(list1.val);
        current = current.next;
        list1 = list1.next;
    }
    
    while (list2 !== null) {
        current.next = new ListNode(list2.val);
        current = current.next;
        list2 = list2.next;
    }
    
    return dummy.next;
}
```

**Q: Merge K sorted lists?**
A: See problem #44 (Merge k Sorted Lists) - use divide & conquer or heap

---

## Related Problems

- [23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- [88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
- [148. Sort List](https://leetcode.com/problems/sort-list/)

---

## Key Takeaways

✅ Dummy node simplifies edge cases  
✅ Compare values, attach smaller node  
✅ Don't forget remaining nodes after loop  
✅ O(m+n) time, O(1) space for iterative  
✅ Reuse existing nodes, don't create new  

**Pattern**: Merge sorted lists → Dummy node + two pointers!
