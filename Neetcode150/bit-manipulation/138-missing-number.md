# 138. Missing Number

**LeetCode**: [268. Missing Number](https://leetcode.com/problems/missing-number/)

**Difficulty**: Easy | **Topics**: Array, Hash Table, Math, Bit Manipulation, Sorting

---

## Problem

Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.

---

## Solution: XOR (xor all indices 0..n and all nums; result = missing)

```javascript
function missingNumber(nums) {
    let xor = 0;
    for (let i = 0; i < nums.length; i++) {
        xor ^= i ^ nums[i];
    }
    xor ^= nums.length;
    return xor;
}
```

**Time:** O(n) | **Space:** O(1). **Pattern:** XOR of [0..n] and nums cancels all present; only missing remains. Alternative: sum 0+1+...+n - sum(nums).
