# Complete Stack Pattern Guide

## Table of Contents
1. [What is Stack?](#what-is-stack)
2. [When to Use Stack](#when-to-use-stack)
3. [Stack Patterns](#stack-patterns)
4. [Basic Stack Problems](#basic-stack-problems)
5. [Monotonic Stack](#monotonic-stack)
6. [Expression & Parentheses](#expression--parentheses)
7. [String & Character Stack](#string--character-stack)
8. [Advanced Stack Problems](#advanced-stack-problems)
9. [Complete Problem Set (40+ Problems)](#complete-problem-set)

---

## What is Stack?

**Stack** is a linear data structure that follows **LIFO** (Last In First Out) principle.

### Key Operations:
- **push(x)**: Add element to top - O(1)
- **pop()**: Remove top element - O(1)
- **peek()/top()**: Get top element without removing - O(1)
- **isEmpty()**: Check if stack is empty - O(1)
- **size()**: Get number of elements - O(1)

### JavaScript Implementation:

```javascript
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
    }
    
    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }
    
    peek() {
        if (this.isEmpty()) return null;
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
    
    clear() {
        this.items = [];
    }
}

// Using Array as Stack (simpler)
const stack = [];
stack.push(1);      // [1]
stack.push(2);      // [1, 2]
const top = stack[stack.length - 1]; // 2
stack.pop();        // [1]
```

---

## When to Use Stack

### Problem Characteristics:
1. ✅ **LIFO behavior** needed
2. ✅ Need to **track most recent** element
3. ✅ **Backtracking** required
4. ✅ **Nested structures** (parentheses, tags)
5. ✅ Need to **undo/reverse** operations

### Common Keywords:
- "valid parentheses"
- "nearest greater/smaller"
- "next greater/smaller element"
- "histogram/buildings"
- "evaluate expression"
- "decode string"
- "backspace"

### NOT Stack:
- ❌ Need random access to elements
- ❌ FIFO behavior (use Queue)
- ❌ Need to maintain sorted order
- ❌ Need to access middle elements frequently

---

## Stack Patterns

### Pattern 1: Basic Stack Operations
- Push, Pop, Peek
- Examples: Valid Parentheses, Min Stack

### Pattern 2: Monotonic Stack
- Maintain increasing/decreasing order
- Examples: Next Greater Element, Daily Temperatures

### Pattern 3: Expression Evaluation
- Infix, Postfix, Prefix
- Examples: Basic Calculator, Reverse Polish Notation

### Pattern 4: String Processing
- Character manipulation
- Examples: Remove Adjacent Duplicates, Decode String

### Pattern 5: Histogram/Building
- Area/volume calculations
- Examples: Largest Rectangle, Trapping Rain Water

---

## Basic Stack Problems

---

### EASY PROBLEMS

---

### Problem 1: Valid Parentheses (Easy)

**Problem**: Check if string with '(', ')', '{', '}', '[', ']' is valid.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function isValid(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}

// Example
console.log(isValid("()"));        // true
console.log(isValid("()[]{}"));    // true
console.log(isValid("(]"));        // false
console.log(isValid("([)]"));      // false
console.log(isValid("{[]}"));      // true
```

---

### Problem 2: Implement Stack Using Queues (Easy)

**Problem**: Implement stack using only queue operations.

**Time Complexity**: push O(n), pop O(1)  
**Space Complexity**: O(n)

```javascript
class MyStack {
    constructor() {
        this.queue = [];
    }
    
    push(x) {
        this.queue.push(x);
        
        // Rotate queue to make last element first
        for (let i = 0; i < this.queue.length - 1; i++) {
            this.queue.push(this.queue.shift());
        }
    }
    
    pop() {
        return this.queue.shift();
    }
    
    top() {
        return this.queue[0];
    }
    
    empty() {
        return this.queue.length === 0;
    }
}

// Example
const stack = new MyStack();
stack.push(1);
stack.push(2);
console.log(stack.top());   // 2
console.log(stack.pop());   // 2
console.log(stack.empty()); // false
```

---

### Problem 3: Min Stack (Easy)

**Problem**: Design stack with push, pop, top, and getMin in O(1).

**Time Complexity**: O(1) all operations  
**Space Complexity**: O(n)

```javascript
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        
        if (this.minStack.length === 0 || 
            val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }
    
    pop() {
        const val = this.stack.pop();
        
        if (val === this.minStack[this.minStack.length - 1]) {
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

// Example
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // -3
minStack.pop();
console.log(minStack.top());    // 0
console.log(minStack.getMin()); // -2
```

---

### Problem 4: Backspace String Compare (Easy)

**Problem**: Compare two strings with '#' as backspace.

**Time Complexity**: O(m + n)  
**Space Complexity**: O(m + n)

```javascript
function backspaceCompare(s, t) {
    function build(str) {
        const stack = [];
        
        for (let char of str) {
            if (char !== '#') {
                stack.push(char);
            } else if (stack.length > 0) {
                stack.pop();
            }
        }
        
        return stack.join('');
    }
    
    return build(s) === build(t);
}

// Space optimized O(1)
function backspaceCompareOptimized(s, t) {
    let i = s.length - 1;
    let j = t.length - 1;
    
    while (i >= 0 || j >= 0) {
        i = getNextValidChar(s, i);
        j = getNextValidChar(t, j);
        
        if (i >= 0 && j >= 0 && s[i] !== t[j]) return false;
        if ((i >= 0) !== (j >= 0)) return false;
        
        i--;
        j--;
    }
    
    return true;
}

function getNextValidChar(str, index) {
    let backspace = 0;
    
    while (index >= 0) {
        if (str[index] === '#') {
            backspace++;
        } else if (backspace > 0) {
            backspace--;
        } else {
            break;
        }
        index--;
    }
    
    return index;
}

// Example
console.log(backspaceCompare("ab#c", "ad#c"));  // true
console.log(backspaceCompare("ab##", "c#d#"));  // true
console.log(backspaceCompare("a#c", "b"));      // false
```

---

### Problem 5: Remove All Adjacent Duplicates (Easy)

**Problem**: Remove adjacent duplicate characters.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function removeDuplicates(s) {
    const stack = [];
    
    for (let char of s) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
            stack.pop();
        } else {
            stack.push(char);
        }
    }
    
    return stack.join('');
}

// Example
console.log(removeDuplicates("abbaca"));  // "ca"
console.log(removeDuplicates("azxxzy"));  // "ay"
```

---

### Problem 6: Remove Outermost Parentheses (Easy)

**Problem**: Remove outermost parentheses from every primitive string.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function removeOuterParentheses(s) {
    const result = [];
    let depth = 0;
    
    for (let char of s) {
        if (char === '(') {
            if (depth > 0) {
                result.push(char);
            }
            depth++;
        } else {
            depth--;
            if (depth > 0) {
                result.push(char);
            }
        }
    }
    
    return result.join('');
}

// Example
console.log(removeOuterParentheses("(()())(())")); // "()()()"
console.log(removeOuterParentheses("(()())(())(()(()))")); // "()()()()(())"
```

---

## Monotonic Stack

---

### MEDIUM PROBLEMS

---

### Problem 7: Daily Temperatures (Medium)

**Problem**: For each day, find how many days until warmer temperature.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const result = Array(n).fill(0);
    const stack = []; // Store indices
    
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && 
               temperatures[stack[stack.length - 1]] < temperatures[i]) {
            const idx = stack.pop();
            result[idx] = i - idx;
        }
        
        stack.push(i);
    }
    
    return result;
}

// Example
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// Output: [1, 1, 4, 2, 1, 1, 0, 0]
```

---

### Problem 8: Next Greater Element I (Easy/Medium)

**Problem**: For each element in nums1, find next greater element in nums2.

**Time Complexity**: O(m + n)  
**Space Complexity**: O(n)

```javascript
function nextGreaterElement(nums1, nums2) {
    const map = new Map();
    const stack = [];
    
    // Build next greater map for nums2
    for (let num of nums2) {
        while (stack.length > 0 && stack[stack.length - 1] < num) {
            map.set(stack.pop(), num);
        }
        stack.push(num);
    }
    
    // Build result for nums1
    return nums1.map(num => map.get(num) ?? -1);
}

// Example
console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])); // [-1, 3, 3]
console.log(nextGreaterElement([2, 4], [1, 2, 3, 4]));    // [3, -1]
```

---

### Problem 9: Next Greater Element II (Medium)

**Problem**: Array is circular. Find next greater element.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function nextGreaterElements(nums) {
    const n = nums.length;
    const result = Array(n).fill(-1);
    const stack = [];
    
    // Process array twice for circular behavior
    for (let i = 0; i < 2 * n; i++) {
        const num = nums[i % n];
        
        while (stack.length > 0 && nums[stack[stack.length - 1]] < num) {
            result[stack.pop()] = num;
        }
        
        if (i < n) {
            stack.push(i);
        }
    }
    
    return result;
}

// Example
console.log(nextGreaterElements([1, 2, 1])); // [2, -1, 2]
console.log(nextGreaterElements([1, 2, 3, 4, 3])); // [2, 3, 4, -1, 4]
```

---

### Problem 10: Largest Rectangle in Histogram (Hard)

**Problem**: Find largest rectangle area in histogram.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];
        
        while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}

// Example
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
console.log(largestRectangleArea([2, 4]));             // 4
```

---

### Problem 11: Maximal Rectangle (Hard)

**Problem**: Find largest rectangle containing only 1's in binary matrix.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(n)

```javascript
function maximalRectangle(matrix) {
    if (matrix.length === 0) return 0;
    
    const n = matrix[0].length;
    const heights = Array(n).fill(0);
    let maxArea = 0;
    
    for (let i = 0; i < matrix.length; i++) {
        // Update heights
        for (let j = 0; j < n; j++) {
            heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
        }
        
        // Find max rectangle in histogram
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }
    
    return maxArea;
}

// Example
console.log(maximalRectangle([
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","0","1","0"]
])); // Output: 6
```

---

### Problem 12: Trapping Rain Water (Hard)

**Problem**: Calculate trapped rainwater between bars.

**Time Complexity**: O(n)  
**Space Complexity**: O(n) with stack, O(1) with two pointers

```javascript
// Stack approach
function trapStack(height) {
    const stack = [];
    let water = 0;
    
    for (let i = 0; i < height.length; i++) {
        while (stack.length > 0 && height[stack[stack.length - 1]] < height[i]) {
            const top = stack.pop();
            
            if (stack.length === 0) break;
            
            const distance = i - stack[stack.length - 1] - 1;
            const bounded_height = Math.min(
                height[i],
                height[stack[stack.length - 1]]
            ) - height[top];
            
            water += distance * bounded_height;
        }
        
        stack.push(i);
    }
    
    return water;
}

// Two pointers approach (more elegant)
function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}

// Example
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log(trap([4,2,0,3,2,5]));             // 9
```

---

### Problem 13: Online Stock Span (Medium)

**Problem**: Calculate stock price span for each day.

**Time Complexity**: O(n) amortized  
**Space Complexity**: O(n)

```javascript
class StockSpanner {
    constructor() {
        this.stack = []; // [price, span]
    }
    
    next(price) {
        let span = 1;
        
        while (this.stack.length > 0 && 
               this.stack[this.stack.length - 1][0] <= price) {
            span += this.stack.pop()[1];
        }
        
        this.stack.push([price, span]);
        return span;
    }
}

// Example
const spanner = new StockSpanner();
console.log(spanner.next(100)); // 1
console.log(spanner.next(80));  // 1
console.log(spanner.next(60));  // 1
console.log(spanner.next(70));  // 2
console.log(spanner.next(60));  // 1
console.log(spanner.next(75));  // 4
console.log(spanner.next(85));  // 6
```

---

### Problem 14: Sum of Subarray Minimums (Medium)

**Problem**: Sum of minimum elements of all subarrays.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function sumSubarrayMins(arr) {
    const MOD = 1e9 + 7;
    const n = arr.length;
    const stack = [];
    let result = 0;
    
    for (let i = 0; i <= n; i++) {
        while (stack.length > 0 && 
               (i === n || arr[stack[stack.length - 1]] > arr[i])) {
            const mid = stack.pop();
            const left = stack.length === 0 ? -1 : stack[stack.length - 1];
            const right = i;
            
            const count = (mid - left) * (right - mid);
            result = (result + arr[mid] * count) % MOD;
        }
        
        stack.push(i);
    }
    
    return result;
}

// Example
console.log(sumSubarrayMins([3, 1, 2, 4])); // 17
console.log(sumSubarrayMins([11, 81, 94, 43, 3])); // 444
```

---

## Expression & Parentheses

---

### Problem 15: Evaluate Reverse Polish Notation (Medium)

**Problem**: Evaluate postfix expression.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function evalRPN(tokens) {
    const stack = [];
    const operators = new Set(['+', '-', '*', '/']);
    
    for (let token of tokens) {
        if (operators.has(token)) {
            const b = stack.pop();
            const a = stack.pop();
            
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(Math.trunc(a / b)); break;
            }
        } else {
            stack.push(parseInt(token));
        }
    }
    
    return stack[0];
}

// Example
console.log(evalRPN(["2", "1", "+", "3", "*"])); // 9
console.log(evalRPN(["4", "13", "5", "/", "+"])); // 6
console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])); // 22
```

---

### Problem 16: Basic Calculator (Hard)

**Problem**: Evaluate expression with +, -, (, ).

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function calculate(s) {
    const stack = [];
    let result = 0;
    let sign = 1;
    let num = 0;
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char >= '0' && char <= '9') {
            num = num * 10 + (char - '0');
        } else if (char === '+') {
            result += sign * num;
            num = 0;
            sign = 1;
        } else if (char === '-') {
            result += sign * num;
            num = 0;
            sign = -1;
        } else if (char === '(') {
            stack.push(result);
            stack.push(sign);
            result = 0;
            sign = 1;
        } else if (char === ')') {
            result += sign * num;
            num = 0;
            result *= stack.pop(); // sign
            result += stack.pop(); // previous result
        }
    }
    
    return result + sign * num;
}

// Example
console.log(calculate("1 + 1"));        // 2
console.log(calculate(" 2-1 + 2 "));    // 3
console.log(calculate("(1+(4+5+2)-3)+(6+8)")); // 23
```

---

### Problem 17: Basic Calculator II (Medium)

**Problem**: Evaluate expression with +, -, *, /.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function calculateII(s) {
    const stack = [];
    let num = 0;
    let operator = '+';
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char >= '0' && char <= '9') {
            num = num * 10 + (char - '0');
        }
        
        if ((char !== ' ' && isNaN(char)) || i === s.length - 1) {
            if (operator === '+') {
                stack.push(num);
            } else if (operator === '-') {
                stack.push(-num);
            } else if (operator === '*') {
                stack.push(stack.pop() * num);
            } else if (operator === '/') {
                stack.push(Math.trunc(stack.pop() / num));
            }
            
            operator = char;
            num = 0;
        }
    }
    
    return stack.reduce((a, b) => a + b, 0);
}

// Example
console.log(calculateII("3+2*2"));     // 7
console.log(calculateII(" 3/2 "));     // 1
console.log(calculateII(" 3+5 / 2 ")); // 5
```

---

### Problem 18: Decode String (Medium)

**Problem**: Decode encoded string: k[string] means repeat string k times.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function decodeString(s) {
    const stack = [];
    let currentNum = 0;
    let currentStr = '';
    
    for (let char of s) {
        if (char >= '0' && char <= '9') {
            currentNum = currentNum * 10 + (char - '0');
        } else if (char === '[') {
            stack.push(currentStr);
            stack.push(currentNum);
            currentStr = '';
            currentNum = 0;
        } else if (char === ']') {
            const num = stack.pop();
            const prevStr = stack.pop();
            currentStr = prevStr + currentStr.repeat(num);
        } else {
            currentStr += char;
        }
    }
    
    return currentStr;
}

// Example
console.log(decodeString("3[a]2[bc]"));     // "aaabcbc"
console.log(decodeString("3[a2[c]]"));      // "accaccacc"
console.log(decodeString("2[abc]3[cd]ef")); // "abcabccdcdcdef"
```

---

### Problem 19: Remove K Digits (Medium)

**Problem**: Remove k digits to get smallest number.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function removeKdigits(num, k) {
    const stack = [];
    
    for (let digit of num) {
        while (stack.length > 0 && k > 0 && stack[stack.length - 1] > digit) {
            stack.pop();
            k--;
        }
        stack.push(digit);
    }
    
    // Remove remaining k digits
    while (k > 0) {
        stack.pop();
        k--;
    }
    
    // Remove leading zeros
    while (stack.length > 0 && stack[0] === '0') {
        stack.shift();
    }
    
    return stack.length === 0 ? '0' : stack.join('');
}

// Example
console.log(removeKdigits("1432219", 3)); // "1219"
console.log(removeKdigits("10200", 1));   // "200"
console.log(removeKdigits("10", 2));      // "0"
```

---

### Problem 20: Remove Duplicate Letters (Medium)

**Problem**: Remove duplicate letters so result is smallest in lexicographical order.

**Time Complexity**: O(n)  
**Space Complexity**: O(1) - fixed alphabet

```javascript
function removeDuplicateLetters(s) {
    const lastOccur = new Map();
    const inStack = new Set();
    const stack = [];
    
    // Record last occurrence of each character
    for (let i = 0; i < s.length; i++) {
        lastOccur.set(s[i], i);
    }
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (inStack.has(char)) continue;
        
        // Remove larger characters that appear later
        while (stack.length > 0 && 
               stack[stack.length - 1] > char && 
               lastOccur.get(stack[stack.length - 1]) > i) {
            inStack.delete(stack.pop());
        }
        
        stack.push(char);
        inStack.add(char);
    }
    
    return stack.join('');
}

// Example
console.log(removeDuplicateLetters("bcabc"));   // "abc"
console.log(removeDuplicateLetters("cbacdcbc")); // "acdb"
```

---

### Problem 21: Simplify Path (Medium)

**Problem**: Simplify Unix file path.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function simplifyPath(path) {
    const stack = [];
    const parts = path.split('/');
    
    for (let part of parts) {
        if (part === '' || part === '.') {
            continue;
        } else if (part === '..') {
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            stack.push(part);
        }
    }
    
    return '/' + stack.join('/');
}

// Example
console.log(simplifyPath("/home/"));              // "/home"
console.log(simplifyPath("/../"));                // "/"
console.log(simplifyPath("/home//foo/"));         // "/home/foo"
console.log(simplifyPath("/a/./b/../../c/"));     // "/c"
```

---

## Advanced Stack Problems

---

### Problem 22: Asteroid Collision (Medium)

**Problem**: Asteroids moving. Positive = right, negative = left. Find state after collisions.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function asteroidCollision(asteroids) {
    const stack = [];
    
    for (let asteroid of asteroids) {
        let alive = true;
        
        while (alive && asteroid < 0 && 
               stack.length > 0 && stack[stack.length - 1] > 0) {
            if (stack[stack.length - 1] < -asteroid) {
                stack.pop();
            } else if (stack[stack.length - 1] === -asteroid) {
                stack.pop();
                alive = false;
            } else {
                alive = false;
            }
        }
        
        if (alive) {
            stack.push(asteroid);
        }
    }
    
    return stack;
}

// Example
console.log(asteroidCollision([5, 10, -5]));     // [5, 10]
console.log(asteroidCollision([8, -8]));         // []
console.log(asteroidCollision([10, 2, -5]));     // [10]
console.log(asteroidCollision([-2, -1, 1, 2])); // [-2, -1, 1, 2]
```

---

### Problem 23: Score of Parentheses (Medium)

**Problem**: Calculate score of balanced parentheses. () = 1, (A) = 2*A, AB = A+B.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function scoreOfParentheses(s) {
    const stack = [0];
    
    for (let char of s) {
        if (char === '(') {
            stack.push(0);
        } else {
            const val = stack.pop();
            const top = stack.pop();
            stack.push(top + Math.max(2 * val, 1));
        }
    }
    
    return stack[0];
}

// Example
console.log(scoreOfParentheses("()"));       // 1
console.log(scoreOfParentheses("(())"));     // 2
console.log(scoreOfParentheses("()()"));     // 2
console.log(scoreOfParentheses("(()(()))")); // 6
```

---

### Problem 24: Validate Stack Sequences (Medium)

**Problem**: Check if popped sequence can be obtained from pushed sequence.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function validateStackSequences(pushed, popped) {
    const stack = [];
    let j = 0;
    
    for (let val of pushed) {
        stack.push(val);
        
        while (stack.length > 0 && stack[stack.length - 1] === popped[j]) {
            stack.pop();
            j++;
        }
    }
    
    return stack.length === 0;
}

// Example
console.log(validateStackSequences([1,2,3,4,5], [4,5,3,2,1])); // true
console.log(validateStackSequences([1,2,3,4,5], [4,3,5,1,2])); // false
```

---

### Problem 25: Longest Valid Parentheses (Hard)

**Problem**: Find length of longest valid parentheses substring.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function longestValidParentheses(s) {
    const stack = [-1];
    let maxLen = 0;
    
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else {
            stack.pop();
            
            if (stack.length === 0) {
                stack.push(i);
            } else {
                maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
            }
        }
    }
    
    return maxLen;
}

// Example
console.log(longestValidParentheses("(()"));    // 2
console.log(longestValidParentheses(")()())"));  // 4
console.log(longestValidParentheses(""));        // 0
```

---

### Problem 26: Maximum Frequency Stack (Hard)

**Problem**: Implement FreqStack with push and pop (pop most frequent).

**Time Complexity**: O(1) for both operations  
**Space Complexity**: O(n)

```javascript
class FreqStack {
    constructor() {
        this.freq = new Map();
        this.group = new Map();
        this.maxFreq = 0;
    }
    
    push(val) {
        const f = (this.freq.get(val) || 0) + 1;
        this.freq.set(val, f);
        
        if (f > this.maxFreq) {
            this.maxFreq = f;
        }
        
        if (!this.group.has(f)) {
            this.group.set(f, []);
        }
        this.group.get(f).push(val);
    }
    
    pop() {
        const val = this.group.get(this.maxFreq).pop();
        this.freq.set(val, this.freq.get(val) - 1);
        
        if (this.group.get(this.maxFreq).length === 0) {
            this.maxFreq--;
        }
        
        return val;
    }
}

// Example
const freqStack = new FreqStack();
freqStack.push(5);
freqStack.push(7);
freqStack.push(5);
freqStack.push(7);
freqStack.push(4);
freqStack.push(5);
console.log(freqStack.pop()); // 5
console.log(freqStack.pop()); // 7
console.log(freqStack.pop()); // 5
console.log(freqStack.pop()); // 4
```

---

### Problem 27: Car Fleet (Medium)

**Problem**: Cars on road. Slower cars ahead cause fleets. Count fleets.

**Time Complexity**: O(n log n)  
**Space Complexity**: O(n)

```javascript
function carFleet(target, position, speed) {
    const cars = position.map((pos, i) => ({
        pos: pos,
        time: (target - pos) / speed[i]
    }));
    
    // Sort by position (descending)
    cars.sort((a, b) => b.pos - a.pos);
    
    const stack = [];
    
    for (let car of cars) {
        if (stack.length === 0 || car.time > stack[stack.length - 1]) {
            stack.push(car.time);
        }
    }
    
    return stack.length;
}

// Example
console.log(carFleet(12, [10,8,0,5,3], [2,4,1,1,3])); // 3
console.log(carFleet(10, [3], [3]));                   // 1
```

---

## Problem Summary

### Easy (6 Problems)
1. Valid Parentheses - O(n)/O(n)
2. Implement Stack Using Queues - O(n)/O(n)
3. Min Stack - O(1)/O(n)
4. Backspace String Compare - O(m+n)/O(m+n)
5. Remove Adjacent Duplicates - O(n)/O(n)
6. Remove Outermost Parentheses - O(n)/O(n)

### Medium (17 Problems)
7. Daily Temperatures - O(n)/O(n)
8. Next Greater Element I - O(m+n)/O(n)
9. Next Greater Element II - O(n)/O(n)
10. Largest Rectangle - O(n)/O(n)
11. Maximal Rectangle - O(m×n)/O(n)
12. Trapping Rain Water - O(n)/O(1)
13. Online Stock Span - O(n)/O(n)
14. Sum of Subarray Minimums - O(n)/O(n)
15. Evaluate RPN - O(n)/O(n)
16. Basic Calculator II - O(n)/O(n)
17. Decode String - O(n)/O(n)
18. Remove K Digits - O(n)/O(n)
19. Remove Duplicate Letters - O(n)/O(1)
20. Simplify Path - O(n)/O(n)
21. Asteroid Collision - O(n)/O(n)
22. Score of Parentheses - O(n)/O(n)
23. Validate Stack Sequences - O(n)/O(n)

### Hard (4 Problems)
24. Basic Calculator - O(n)/O(n)
25. Longest Valid Parentheses - O(n)/O(n)
26. Maximum Frequency Stack - O(1)/O(n)
27. Car Fleet - O(n log n)/O(n)

---

## Pattern Recognition Guide

### When to Use Stack:

| Pattern | Use When | Example |
|---------|----------|---------|
| Monotonic Stack | Next greater/smaller | Daily Temperatures |
| Expression | Calculator/Evaluate | Basic Calculator |
| Parentheses | Matching brackets | Valid Parentheses |
| String Process | Remove/Decode | Decode String |
| Histogram | Area/Rectangle | Largest Rectangle |

---

**Master Stack patterns to solve 90% of stack problems! 🚀**


