# 131. Pow(x, n)

**LeetCode**: [50. Pow(x, n)](https://leetcode.com/problems/powx-n/)

**Difficulty**: Medium | **Topics**: Math, Recursion

---

## Problem

Implement `pow(x, n)`, which calculates x raised to the power n (x^n). Handle negative n (x^(-n) = 1/x^n).

---

## Solution: Binary exponentiation (divide and conquer)

```javascript
function myPow(x, n) {
    if (n === 0) return 1;
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    let result = 1;
    while (n > 0) {
        if (n % 2 === 1) result *= x;
        x *= x;
        n = Math.floor(n / 2);
    }
    return result;
}
```

**Time:** O(log n) | **Space:** O(1). **Pattern:** x^n = (x^(n/2))^2 if n even; x * x^(n-1) if n odd; iterative with bit check.
