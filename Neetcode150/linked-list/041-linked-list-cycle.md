# 41. Linked List Cycle

**LeetCode Link**: [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)

**Difficulty**: Easy

**Topics**: Hash Table, Linked List, Two Pointers

---

## Problem Statement

Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. **Note that `pos` is not passed as a parameter**.

Return `true` if there is a cycle in the linked list. Otherwise, return `false`.

### Examples

**Example 1:**
```
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle, where tail connects to the 1st node (index 1).
```

**Example 2:**
```
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle, where tail connects to the 0th node.
```

**Example 3:**
```
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

### Constraints
- The number of nodes in the list is in the range `[0, 10^4]`
- `-10^5 <= Node.val <= 10^5`
- `pos` is `-1` or a valid index in the linked-list

---

## Approach 1: Hash Set

```javascript
function hasCycle(head) {
    const seen = new Set();
    let current = head;
    
    while (current !== null) {
        if (seen.has(current)) {
            return true; // Found cycle
        }
        seen.add(current);
        current = current.next;
    }
    
    return false; // No cycle
}
```

**Complexity**: O(n) time, O(n) space

---

## Approach 2: Floyd's Cycle Detection (Slow/Fast Pointers) ✅

### Intuition
Use two pointers: slow (1 step) and fast (2 steps). If cycle exists, they'll meet. If fast reaches null, no cycle.

### Implementation

```javascript
/**
 * Floyd's Cycle Detection - O(n) time, O(1) space
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle(head) {
    if (head === null || head.next === null) {
        return false;
    }
    
    let slow = head;
    let fast = head;
    
    while (fast !== null && fast.next !== null) {
        slow = slow.next;        // Move 1 step
        fast = fast.next.next;   // Move 2 steps
        
        if (slow === fast) {
            return true; // Cycle detected
        }
    }
    
    return false; // No cycle
}

// Test
const node1 = new ListNode(3);
const node2 = new ListNode(2);
const node3 = new ListNode(0);
const node4 = new ListNode(-4);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // Cycle

console.log(hasCycle(node1)); // true
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Visit each node at most once (slow) or twice (fast)
- **Space Complexity**: `O(1)` - Only two pointers

---

## Visual Example

```
List with cycle:
3 -> 2 -> 0 -> -4
     ^         |
     |_________|

Slow/Fast Movement:
───────────────────

Start: both at 3
slow: 3, fast: 3

Step 1:
slow: 2 (1 step)
fast: 0 (2 steps)

Step 2:
slow: 0 (1 step)
fast: 2 (2 steps)

Step 3:
slow: -4 (1 step)
fast: -4 (2 steps)

slow == fast → Cycle detected! ✓
```

---

## Why It Works

```
Without cycle: Fast reaches null
1 -> 2 -> 3 -> 4 -> null
Fast will reach null before slow

With cycle: Fast catches slow
Think of it as a circular track
Fast runner eventually laps slow runner

Mathematical proof:
- Let distance to cycle = F
- Let cycle length = C
- When slow enters cycle, fast is already inside
- Distance between them = k (where k < C)
- Each step, gap closes by 1
- They meet in at most C steps
```

---

## Edge Cases

```javascript
// Empty list
console.log(hasCycle(null)); // false

// Single node, no cycle
const single = new ListNode(1);
console.log(hasCycle(single)); // false

// Single node with self-cycle
const selfCycle = new ListNode(1);
selfCycle.next = selfCycle;
console.log(hasCycle(selfCycle)); // true

// Two nodes, no cycle
const two = new ListNode(1, new ListNode(2));
console.log(hasCycle(two)); // false

// Two nodes with cycle
const twoWithCycle = new ListNode(1);
const node = new ListNode(2);
twoWithCycle.next = node;
node.next = twoWithCycle;
console.log(hasCycle(twoWithCycle)); // true

// Long list with cycle at end
const longList = new ListNode(1);
let current = longList;
for (let i = 2; i <= 1000; i++) {
    current.next = new ListNode(i);
    current = current.next;
}
current.next = longList.next.next; // Cycle to node 3
console.log(hasCycle(longList)); // true
```

---

## Common Mistakes

### ❌ Mistake 1: Not checking fast.next
```javascript
// Wrong - crashes when fast.next is null
while (fast !== null) {
    fast = fast.next.next; // Crashes if fast.next is null!
}

// Correct - check both
while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
}
```

### ❌ Mistake 2: Starting pointers at different positions
```javascript
// Wrong - might miss cycle on first iteration
let slow = head;
let fast = head.next;

// Correct - start at same position
let slow = head;
let fast = head;
```

### ❌ Mistake 3: Comparing values instead of references
```javascript
// Wrong - compares values
if (slow.val === fast.val) {
    return true; // Two different nodes might have same value!
}

// Correct - compare references
if (slow === fast) {
    return true;
}
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Need to detect cycle? Can't modify nodes? Return boolean? Yes."

2. **Two approaches**:
   - Hash set: Store visited nodes, O(n) space
   - Floyd's algorithm: Slow/fast pointers, O(1) space

3. **Why Floyd's works**: "If cycle exists, fast pointer eventually catches slow (like runners on track)."

4. **Key insight**: "Check both fast and fast.next to avoid null pointer errors."

5. **Complexity**: "O(n) time, O(1) space - optimal!"

### Follow-up Questions:

**Q: Can you find where the cycle starts?**
A: Yes! See problem #42 (Linked List Cycle II)

**Q: Can you find the length of the cycle?**
```javascript
function cycleLength(head) {
    let slow = head;
    let fast = head;
    
    // Detect cycle
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            // Found cycle, now measure length
            let length = 1;
            slow = slow.next;
            
            while (slow !== fast) {
                slow = slow.next;
                length++;
            }
            
            return length;
        }
    }
    
    return 0; // No cycle
}
```

**Q: What if we can modify nodes?**
```javascript
function hasCycleModify(head) {
    let current = head;
    
    while (current !== null) {
        if (current.visited) {
            return true;
        }
        current.visited = true;
        current = current.next;
    }
    
    return false;
}
```

---

## Related Problems

- [142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
- [202. Happy Number](https://leetcode.com/problems/happy-number/)
- [287. Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)

---

## Key Takeaways

✅ Floyd's algorithm: slow (1 step) + fast (2 steps)  
✅ If cycle exists, pointers meet  
✅ Check both fast and fast.next for null  
✅ O(n) time, O(1) space optimal  
✅ Compare references, not values  

**Pattern**: Detect cycle in linked list → Floyd's slow/fast pointers!
