# 127. Plus One

**LeetCode**: [66. Plus One](https://leetcode.com/problems/plus-one/)

**Difficulty**: Easy | **Topics**: Array, Math

---

## Problem

Given a non-empty array of digits representing a non-negative integer (most significant first), return the array representing the integer plus one.

---

## Solution: Simulate carry

```javascript
function plusOne(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    return [1, ...digits];
}
```

**Time:** O(n) | **Space:** O(1) in-place; O(n) if all 9s. **Pattern:** Add from right; carry; if all 9s, prepend 1.
