# 132. Multiply Strings

**LeetCode**: [43. Multiply Strings](https://leetcode.com/problems/multiply-strings/)

**Difficulty**: Medium | **Topics**: Math, String, Simulation

---

## Problem

Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also as a string. Do not use built-in BigInteger or convert to integer.

---

## Solution: Digit-by-digit multiplication (array of digits)

```javascript
function multiply(num1, num2) {
    if (num1 === '0' || num2 === '0') return '0';
    const m = num1.length, n = num2.length;
    const arr = new Array(m + n).fill(0);
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const mul = (num1[i] - '0') * (num2[j] - '0');
            const p1 = i + j, p2 = i + j + 1;
            const sum = mul + arr[p2];
            arr[p2] = sum % 10;
            arr[p1] += Math.floor(sum / 10);
        }
    }
    let i = 0;
    while (arr[i] === 0) i++;
    return arr.slice(i).join('');
}
```

**Time:** O(m*n) | **Space:** O(m+n). **Pattern:** result[i+j] and result[i+j+1] get contribution from num1[i]*num2[j]; then trim leading zeros.
