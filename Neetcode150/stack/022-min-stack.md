# 22. Min Stack

**LeetCode Link**: [155. Min Stack](https://leetcode.com/problems/min-stack/)

**Difficulty**: Medium

**Topics**: Stack, Design

---

## Problem Statement

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the `MinStack` class:
- `MinStack()` initializes the stack object.
- `void push(int val)` pushes the element val onto the stack.
- `void pop()` removes the element on the top of the stack.
- `int top()` gets the top element of the stack.
- `int getMin()` retrieves the minimum element in the stack.

You must implement a solution with **O(1)** time complexity for each function.

### Examples

**Example 1:**
```
Input:
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output:
[null,null,null,null,-3,null,0,-2]

Explanation:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

### Constraints
- `-2^31 <= val <= 2^31 - 1`
- Methods `pop`, `top` and `getMin` operations will always be called on **non-empty** stacks
- At most `3 * 10^4` calls will be made to `push`, `pop`, `top`, and `getMin`

---

## Approach 1: Two Stacks (Optimal!) ✅

### Intuition
Maintain two stacks: one for values, one for minimums. MinStack tracks minimum at each level.

### Implementation

```javascript
/**
 * Two Stacks Approach
 */
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = []; // Tracks minimums
    }
    
    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        this.stack.push(val);
        
        // Push current minimum
        if (this.minStack.length === 0) {
            this.minStack.push(val);
        } else {
            const currentMin = this.minStack[this.minStack.length - 1];
            this.minStack.push(Math.min(val, currentMin));
        }
    }
    
    /**
     * @return {void}
     */
    pop() {
        this.stack.pop();
        this.minStack.pop();
    }
    
    /**
     * @return {number}
     */
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    /**
     * @return {number}
     */
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

// Test
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // -3
minStack.pop();
console.log(minStack.top());    // 0
console.log(minStack.getMin()); // -2
```

### Complexity Analysis
- **Time Complexity**: `O(1)` for all operations
- **Space Complexity**: `O(n)` for two stacks

---

## Approach 2: Single Stack with Pairs

```javascript
/**
 * Single Stack with [value, min] pairs
 */
class MinStack {
    constructor() {
        this.stack = []; // Stores [value, currentMin]
    }
    
    push(val) {
        if (this.stack.length === 0) {
            this.stack.push([val, val]);
        } else {
            const currentMin = this.stack[this.stack.length - 1][1];
            this.stack.push([val, Math.min(val, currentMin)]);
        }
    }
    
    pop() {
        this.stack.pop();
    }
    
    top() {
        return this.stack[this.stack.length - 1][0];
    }
    
    getMin() {
        return this.stack[this.stack.length - 1][1];
    }
}
```

---

## Approach 3: Space Optimized (Only Store Min When Changed)

```javascript
/**
 * Optimized - Only store min when it changes
 */
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = []; // Only store when min changes
    }
    
    push(val) {
        this.stack.push(val);
        
        // Only push if it's a new minimum
        if (this.minStack.length === 0 || val <= this.getMin()) {
            this.minStack.push(val);
        }
    }
    
    pop() {
        const popped = this.stack.pop();
        
        // If we're removing current minimum, pop from minStack
        if (popped === this.getMin()) {
            this.minStack.pop();
        }
    }
    
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}
```

---

## Visual Example

```
Operation: push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()

Two Stack Approach:
────────────────────

After push(-2):
stack:    [-2]
minStack: [-2]

After push(0):
stack:    [-2, 0]
minStack: [-2, -2]  (min is still -2)

After push(-3):
stack:    [-2, 0, -3]
minStack: [-2, -2, -3]  (new min is -3)

getMin(): -3 ✓

After pop():
stack:    [-2, 0]
minStack: [-2, -2]  (min is now -2)

top(): 0 ✓

getMin(): -2 ✓
```

---

## Comparison of Approaches

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Two Stacks | O(1) all ops | O(2n) | Simple, reliable |
| Stack with Pairs | O(1) all ops | O(2n) | Same space, cleaner |
| Optimized | O(1) all ops | O(n) to O(2n) | Best average case |

---

## Edge Cases

```javascript
const minStack = new MinStack();

// Single element
minStack.push(5);
console.log(minStack.getMin()); // 5

// Duplicate minimums
minStack.push(3);
minStack.push(3);
minStack.pop();
console.log(minStack.getMin()); // 3 (still 3!)

// Negative numbers
minStack.push(-1);
console.log(minStack.getMin()); // -1

// Pop all elements
minStack.pop();
minStack.pop();
minStack.pop();
console.log(minStack.top()); // Should be empty (per constraints won't happen)
```

---

## Interview Tips

### What to say:

1. **Clarify**: "All operations need O(1) time. Can I use extra space? Yes."

2. **Approach**: "Use two stacks - one for values, one tracking minimum at each level"

3. **Key insight**: "MinStack stores minimum up to that point"

4. **Trade-off**: "O(n) extra space for O(1) getMin()"

### Follow-up Questions:

**Q: Can you optimize space?**
A: Yes, only push to minStack when new minimum found (Approach 3)

**Q: What if we need getMax() too?**
```javascript
class MinMaxStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
        this.maxStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        
        const currentMin = this.minStack.length === 0 ? val : 
            Math.min(val, this.getMin());
        this.minStack.push(currentMin);
        
        const currentMax = this.maxStack.length === 0 ? val : 
            Math.max(val, this.getMax());
        this.maxStack.push(currentMax);
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
    
    getMax() {
        return this.maxStack[this.maxStack.length - 1];
    }
}
```

---

## Related Problems

- [239. Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)
- [716. Max Stack](https://leetcode.com/problems/max-stack/)

---

## Key Takeaways

✅ Two stacks solution is simple and reliable  
✅ Track minimum at each level of stack  
✅ All operations O(1) with O(n) space  
✅ Can optimize to only store when min changes  

**Pattern**: Track min/max in data structure → Auxiliary stack!
