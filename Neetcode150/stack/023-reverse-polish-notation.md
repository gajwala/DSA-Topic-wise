# 23. Evaluate Reverse Polish Notation

**LeetCode Link**: [150. Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)

**Difficulty**: Medium

**Topics**: Array, Math, Stack

---

## Problem Statement

Evaluate the value of an arithmetic expression in **Reverse Polish Notation**.

Valid operators are `+`, `-`, `*`, and `/`. Each operand may be an integer or another expression.

**Note** that division between two integers should truncate toward zero.

### Examples

**Example 1:**
```
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
```

**Example 2:**
```
Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
```

**Example 3:**
```
Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
```

### Constraints
- `1 <= tokens.length <= 10^4`
- `tokens[i]` is either an operator: `"+"`, `"-"`, `"*"`, or `"/"`, or an integer in the range `[-200, 200]`

---

## Approach: Stack (Optimal!) ✅

### Intuition
RPN: operands first, then operator. Use stack: push numbers, pop two operands when operator found, push result back.

### Implementation

```javascript
/**
 * Stack Approach - O(n)
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPN(tokens) {
    const stack = [];
    
    for (const token of tokens) {
        if (token === '+' || token === '-' || token === '*' || token === '/') {
            // Pop two operands
            const b = stack.pop();
            const a = stack.pop();
            
            // Perform operation
            let result;
            if (token === '+') result = a + b;
            else if (token === '-') result = a - b;
            else if (token === '*') result = a * b;
            else result = Math.trunc(a / b); // Truncate toward zero
            
            // Push result
            stack.push(result);
        } else {
            // Push number
            stack.push(parseInt(token));
        }
    }
    
    return stack[0];
}

// Cleaner version with operators map
function evalRPNClean(tokens) {
    const stack = [];
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };
    
    for (const token of tokens) {
        if (operators[token]) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(operators[token](a, b));
        } else {
            stack.push(parseInt(token));
        }
    }
    
    return stack[0];
}

// Test
console.log(evalRPN(["2","1","+","3","*"])); // 9
console.log(evalRPN(["4","13","5","/","+"])); // 6
console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])); // 22
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Single pass through tokens
- **Space Complexity**: `O(n)` - Stack for operands

---

## Visual Example

```
tokens = ["2", "1", "+", "3", "*"]

Step 1: "2" → Number, push
Stack: [2]

Step 2: "1" → Number, push
Stack: [2, 1]

Step 3: "+" → Operator
Pop: 1, 2
Calculate: 2 + 1 = 3
Push: 3
Stack: [3]

Step 4: "3" → Number, push
Stack: [3, 3]

Step 5: "*" → Operator
Pop: 3, 3
Calculate: 3 * 3 = 9
Push: 9
Stack: [9]

Result: 9 ✓
```

---

## Key Takeaways

✅ Stack perfect for RPN evaluation  
✅ Push numbers, pop two for operators  
✅ Math.trunc() for division toward zero  
✅ O(n) time, O(n) space  

**Pattern**: RPN evaluation → Stack!
