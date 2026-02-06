# 134. Single Number

**LeetCode**: [136. Single Number](https://leetcode.com/problems/single-number/)

**Difficulty**: Easy | **Topics**: Array, Bit Manipulation

---

## Problem

Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. You must implement a solution with O(n) time and O(1) space.

---

## Solution: XOR (a ^ a = 0, a ^ 0 = a)

```javascript
function singleNumber(nums) {
    let result = 0;
    for (const num of nums) result ^= num;
    return result;
}
```

**Time:** O(n) | **Space:** O(1). **Pattern:** XOR all numbers; pairs cancel, single remains.
