# 135. Number of 1 Bits (Hamming Weight)

**LeetCode**: [191. Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)

**Difficulty**: Easy | **Topics**: Bit Manipulation, Divide and Conquer

---

## Problem

Write a function that takes an unsigned integer and returns the number of '1' bits it has (Hamming weight).

---

## Solution: n & (n-1) drops lowest set bit

```javascript
function hammingWeight(n) {
    let count = 0;
    while (n !== 0) {
        n &= n - 1;
        count++;
    }
    return count;
}
```

**Time:** O(k) where k = number of 1 bits | **Space:** O(1). **Pattern:** `n & (n-1)` removes the rightmost 1; repeat until 0.
