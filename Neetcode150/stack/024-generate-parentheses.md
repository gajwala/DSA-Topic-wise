# 24. Generate Parentheses

**LeetCode Link**: [22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)

**Difficulty**: Medium

**Topics**: String, Dynamic Programming, Backtracking

---

## Problem Statement

Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

### Examples

**Example 1:**
```
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

**Example 2:**
```
Input: n = 1
Output: ["()"]
```

### Constraints
- `1 <= n <= 8`

---

## Approach: Backtracking (Optimal!) ✅

### Intuition
Use backtracking. Add '(' if open < n. Add ')' if close < open. Valid when both equal n.

### Implementation

```javascript
/**
 * Backtracking - O(4^n / sqrt(n)) Catalan number
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
    const result = [];
    
    function backtrack(current, open, close) {
        // Base case: valid combination
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        // Add opening bracket if we can
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        
        // Add closing bracket if valid
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
}

// Test
console.log(generateParenthesis(3));
// ["((()))","(()())","(())()","()(())","()()()"]

console.log(generateParenthesis(1));
// ["()"]
```

### Complexity Analysis
- **Time Complexity**: `O(4^n / √n)` - Catalan number
- **Space Complexity**: `O(n)` - Recursion depth

---

## Visual Example

```
n = 2

Decision tree:
                    ""
            /                \
          "("                 X (can't start with ')')
        /     \
      "(("    "()"
       |      /  \
     "(()"  "()()"  "()("
       |            |
    "(())"        "()()"

Valid: ["(())", "()()"]
```

---

## Key Takeaways

✅ Backtracking generates all valid combinations  
✅ Add '(' when open < n  
✅ Add ')' when close < open  
✅ Catalan number of valid combinations  

**Pattern**: Generate valid combinations → Backtracking!
