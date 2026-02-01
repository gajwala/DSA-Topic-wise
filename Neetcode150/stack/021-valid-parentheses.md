# 21. Valid Parentheses

**LeetCode Link**: [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

**Difficulty**: Easy

**Topics**: String, Stack

---

## Problem Statement

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Examples

**Example 1:**
```
Input: s = "()"
Output: true
```

**Example 2:**
```
Input: s = "()[]{}"
Output: true
```

**Example 3:**
```
Input: s = "(]"
Output: false
```

### Constraints
- `1 <= s.length <= 10^4`
- `s` consists of parentheses only `'()[]{}'`

---

## Approach 1: Brute Force (Continuously Remove Pairs)

```javascript
function isValid(s) {
    while (s.includes('()') || s.includes('[]') || s.includes('{}')) {
        s = s.replace('()', '').replace('[]', '').replace('{}', '');
    }
    return s.length === 0;
}
```

**Complexity**: O(n²) - Multiple passes removing pairs

---

## Approach 2: Stack (Optimal!) ✅

### Intuition
Use stack to match opening and closing brackets. Push opening brackets, pop when closing bracket matches.

### Algorithm
1. For each character:
   - If opening bracket: push to stack
   - If closing bracket: check if matches top of stack
2. Stack should be empty at end

### Implementation

```javascript
/**
 * Stack Approach - O(n) Optimal
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (const char of s) {
        if (char === '(' || char === '{' || char === '[') {
            // Opening bracket - push to stack
            stack.push(char);
        } else {
            // Closing bracket - check match
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    // Stack should be empty (all matched)
    return stack.length === 0;
}

// Alternative: Cleaner version
function isValidClean(s) {
    const stack = [];
    const map = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    
    for (const char of s) {
        if (map[char]) {
            // Opening bracket
            stack.push(char);
        } else {
            // Closing bracket
            const top = stack.pop();
            if (map[top] !== char) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}

// Test
console.log(isValid("()")); // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false
console.log(isValid("([)]")); // false
console.log(isValid("{[]}")); // true
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Single pass through string
- **Space Complexity**: `O(n)` - Stack can hold all opening brackets

---

## Visual Example

```
Input: s = "({[]})"

Step 1: char='(' → Opening, push
Stack: ['(']

Step 2: char='{' → Opening, push
Stack: ['(', '{']

Step 3: char='[' → Opening, push
Stack: ['(', '{', '[']

Step 4: char=']' → Closing, matches '[' ✓
Stack: ['(', '{']

Step 5: char='}' → Closing, matches '{' ✓
Stack: ['(']

Step 6: char=')' → Closing, matches '(' ✓
Stack: []

Stack is empty → Valid! ✓
```

---

## Edge Cases

```javascript
// Empty string (if allowed)
console.log(isValid("")); // true (empty is valid)

// Only opening brackets
console.log(isValid("(((")); // false

// Only closing brackets
console.log(isValid(")))")); // false

// Wrong order
console.log(isValid("([)]")); // false (brackets interleaved)

// Single pair
console.log(isValid("()")); // true

// Multiple types nested
console.log(isValid("{[()]}")); // true

// Unmatched type
console.log(isValid("(]")); // false
```

---

## Common Mistakes

### ❌ Mistake 1: Not checking empty stack
```javascript
// Wrong - will crash
if (stack.pop() !== pairs[char]) return false;

// Correct - check first
if (stack.length === 0 || stack.pop() !== pairs[char]) return false;
```

### ❌ Mistake 2: Forgetting final check
```javascript
// Wrong - doesn't check for unmatched opening brackets
for (const char of s) {
    // ... process
}
return true; // Missing stack.length check!

// Correct
return stack.length === 0;
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Only these 6 characters? No other characters or spaces? Yes."

2. **Approach**: "Use stack to match brackets. Push opening, pop and verify on closing."

3. **Edge cases**: "Check empty stack before popping. Verify stack empty at end."

4. **Complexity**: "O(n) time, O(n) space for stack"

### Follow-up Questions:

**Q: What if there are other characters like letters?**
```javascript
function isValidWithLetters(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    
    for (const char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else if (pairs[char]) { // Only process brackets
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
        // Ignore non-bracket characters
    }
    
    return stack.length === 0;
}
```

**Q: What if we want to return the position of first invalid bracket?**
```javascript
function findInvalidPosition(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char === '(' || char === '{' || char === '[') {
            stack.push({ char, index: i });
        } else {
            if (stack.length === 0 || stack.pop().char !== pairs[char]) {
                return i; // Position of invalid bracket
            }
        }
    }
    
    return stack.length > 0 ? stack[0].index : -1; // Unmatched opening
}
```

**Q: What if we need to handle nested function calls like "func(func(x))"?**
A: Same concept - treat function names as opening brackets, closing parens must match.

---

## Related Problems

- [22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)
- [32. Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/)
- [301. Remove Invalid Parentheses](https://leetcode.com/problems/remove-invalid-parentheses/)
- [678. Valid Parenthesis String](https://leetcode.com/problems/valid-parenthesis-string/)
- [921. Minimum Add to Make Parentheses Valid](https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/)

---

## Key Takeaways

✅ Stack perfect for matching pairs  
✅ Push opening brackets, pop and verify on closing  
✅ Check stack empty before popping  
✅ Verify stack empty at end  
✅ O(n) time, O(n) space  

**Pattern**: Matching brackets/parentheses → Stack!
