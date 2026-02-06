# 140. Reverse Integer

**LeetCode**: [7. Reverse Integer](https://leetcode.com/problems/reverse-integer/)

**Difficulty**: Medium | **Topics**: Math

---

## Problem

Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

---

## Solution: Pop digits and build result; check overflow

```javascript
function reverse(x) {
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    let result = 0;
    const MAX = Math.pow(2, 31) - 1;
    while (x > 0) {
        const digit = x % 10;
        if (result > (MAX - digit) / 10) return 0;
        result = result * 10 + digit;
        x = Math.floor(x / 10);
    }
    return sign * result;
}
```

**Time:** O(log x) | **Space:** O(1). **Pattern:** Extract digits from right; build result; check before result*10+digit to avoid overflow.

**Bit Manipulation Complete! (7/7) ✅**
