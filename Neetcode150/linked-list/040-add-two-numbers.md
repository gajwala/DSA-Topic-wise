# 40. Add Two Numbers

**LeetCode Link**: [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)

**Difficulty**: Medium

**Topics**: Linked List, Math, Recursion

---

## Problem Statement

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

### Examples

**Example 1:**
```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807
```

**Example 2:**
```
Input: l1 = [0], l2 = [0]
Output: [0]
```

**Example 3:**
```
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
Explanation: 9999999 + 9999 = 10009998
```

### Constraints
- The number of nodes in each linked list is in the range `[1, 100]`
- `0 <= Node.val <= 9`
- It is guaranteed that the list represents a number that does not have leading zeros

---

## Approach: Simulation (Optimal!) ✅

### Intuition
Add digits one by one with carry, just like manual addition. Create new nodes for result.

### Implementation

```javascript
/**
 * Addition with Carry - O(max(m,n)) time, O(max(m,n)) space
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 !== null || l2 !== null || carry > 0) {
        // Get values (0 if node is null)
        const val1 = l1 !== null ? l1.val : 0;
        const val2 = l2 !== null ? l2.val : 0;
        
        // Calculate sum and carry
        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        const digit = sum % 10;
        
        // Create new node
        current.next = new ListNode(digit);
        current = current.next;
        
        // Move pointers
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }
    
    return dummy.next;
}

// Test
const l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
const l2 = new ListNode(5, new ListNode(6, new ListNode(4)));
const result = addTwoNumbers(l1, l2);
// Result: 7 -> 0 -> 8 (342 + 465 = 807)
```

### Complexity Analysis
- **Time Complexity**: `O(max(m, n))` - Process all digits
- **Space Complexity**: `O(max(m, n))` - Result list

---

## Visual Example

```
l1: 2 -> 4 -> 3 (represents 342)
l2: 5 -> 6 -> 4 (represents 465)

Addition Process:
─────────────────

Step 1: 2 + 5 + 0(carry) = 7, carry = 0
Result: 7
carry = 0

Step 2: 4 + 6 + 0(carry) = 10, carry = 1
Result: 7 -> 0
carry = 1

Step 3: 3 + 4 + 1(carry) = 8, carry = 0
Result: 7 -> 0 -> 8
carry = 0

No more digits and carry = 0
Final: 7 -> 0 -> 8 (represents 807) ✓
```

---

## Example with Different Lengths

```
l1: 9 -> 9 -> 9 -> 9 -> 9 -> 9 -> 9 (9999999)
l2: 9 -> 9 -> 9 -> 9                (9999)

Process:
────────
9 + 9 + 0 = 18 → digit=8, carry=1
9 + 9 + 1 = 19 → digit=9, carry=1
9 + 9 + 1 = 19 → digit=9, carry=1
9 + 9 + 1 = 19 → digit=9, carry=1
9 + 0 + 1 = 10 → digit=0, carry=1
9 + 0 + 1 = 10 → digit=0, carry=1
9 + 0 + 1 = 10 → digit=0, carry=1
0 + 0 + 1 =  1 → digit=1, carry=0

Result: 8 -> 9 -> 9 -> 9 -> 0 -> 0 -> 0 -> 1
(represents 10009998) ✓
```

---

## Recursive Solution

```javascript
/**
 * Recursive approach
 */
function addTwoNumbersRecursive(l1, l2, carry = 0) {
    // Base case
    if (l1 === null && l2 === null && carry === 0) {
        return null;
    }
    
    // Get values
    const val1 = l1 !== null ? l1.val : 0;
    const val2 = l2 !== null ? l2.val : 0;
    
    // Calculate sum
    const sum = val1 + val2 + carry;
    const digit = sum % 10;
    const newCarry = Math.floor(sum / 10);
    
    // Create node
    const node = new ListNode(digit);
    
    // Recursive call
    const next1 = l1 !== null ? l1.next : null;
    const next2 = l2 !== null ? l2.next : null;
    node.next = addTwoNumbersRecursive(next1, next2, newCarry);
    
    return node;
}
```

---

## Edge Cases

```javascript
// Both single digit
const l1 = new ListNode(2);
const l2 = new ListNode(5);
console.log(addTwoNumbers(l1, l2)); // 7

// Different lengths
const short = new ListNode(9);
const long = new ListNode(1, new ListNode(9, new ListNode(9)));
console.log(addTwoNumbers(short, long)); // 0 -> 0 -> 0 -> 1

// Both zero
const zero1 = new ListNode(0);
const zero2 = new ListNode(0);
console.log(addTwoNumbers(zero1, zero2)); // 0

// Carry at end
const l1Carry = new ListNode(9, new ListNode(9));
const l2Carry = new ListNode(1);
console.log(addTwoNumbers(l1Carry, l2Carry)); // 0 -> 0 -> 1

// All nines
const nines1 = new ListNode(9, new ListNode(9, new ListNode(9)));
const nines2 = new ListNode(9, new ListNode(9, new ListNode(9)));
console.log(addTwoNumbers(nines1, nines2)); // 8 -> 9 -> 9 -> 1
```

---

## Common Mistakes

### ❌ Mistake 1: Not handling different lengths
```javascript
// Wrong - crashes when one list ends
while (l1 !== null && l2 !== null) {
    const sum = l1.val + l2.val + carry;
    // What about remaining digits?
}

// Correct - use OR condition
while (l1 !== null || l2 !== null || carry > 0) {
    const val1 = l1 !== null ? l1.val : 0;
    const val2 = l2 !== null ? l2.val : 0;
}
```

### ❌ Mistake 2: Forgetting final carry
```javascript
// Wrong - loses final carry
while (l1 !== null || l2 !== null) {
    // ... process
}
return dummy.next; // What if carry = 1?

// Correct - include carry in loop condition
while (l1 !== null || l2 !== null || carry > 0) {
    // Will create node for final carry
}
```

### ❌ Mistake 3: Wrong carry calculation
```javascript
// Wrong - doesn't handle sum >= 20
const carry = sum >= 10 ? 1 : 0; // What if sum = 18?

// Correct - use division
const carry = Math.floor(sum / 10);
const digit = sum % 10;
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Digits in reverse order? Create new list or modify existing? Create new."

2. **Approach**: "Simulate addition with carry. Add digits from both lists plus carry."

3. **Key points**:
   - Handle different lengths (use 0 for missing digits)
   - Track carry between additions
   - Don't forget final carry

4. **Complexity**: "O(max(m,n)) time and space"

### Follow-up Questions:

**Q: What if digits are in forward order?**
```javascript
function addTwoNumbersForward(l1, l2) {
    // Reverse both lists
    l1 = reverseList(l1);
    l2 = reverseList(l2);
    
    // Add as normal
    const result = addTwoNumbers(l1, l2);
    
    // Reverse result
    return reverseList(result);
}
```

**Q: What if numbers are very large (beyond JavaScript number limits)?**
A: Current solution already handles it! We're not converting to numbers.

**Q: Can you do it without creating new list?**
```javascript
function addTwoNumbersInPlace(l1, l2) {
    // Modify l1 to be the result
    let current = l1;
    let prev = null;
    let carry = 0;
    
    while (current !== null || l2 !== null || carry > 0) {
        const val1 = current !== null ? current.val : 0;
        const val2 = l2 !== null ? l2.val : 0;
        
        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        
        if (current !== null) {
            current.val = sum % 10;
            prev = current;
            current = current.next;
        } else {
            // Need new node
            prev.next = new ListNode(sum % 10);
            prev = prev.next;
        }
        
        if (l2 !== null) l2 = l2.next;
    }
    
    return l1;
}
```

---

## Related Problems

- [445. Add Two Numbers II](https://leetcode.com/problems/add-two-numbers-ii/)
- [43. Multiply Strings](https://leetcode.com/problems/multiply-strings/)
- [415. Add Strings](https://leetcode.com/problems/add-strings/)

---

## Key Takeaways

✅ Simulate digit-by-digit addition with carry  
✅ Handle different list lengths with 0 for missing digits  
✅ Don't forget final carry in loop condition  
✅ Use dummy node for clean code  
✅ O(max(m,n)) time and space  

**Pattern**: Add numbers in lists → Digit-by-digit with carry!
