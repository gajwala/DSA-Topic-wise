# 139. Sum of Two Integers

**LeetCode**: [371. Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/)

**Difficulty**: Medium | **Topics**: Math, Bit Manipulation

---

## Problem

Given two integers `a` and `b`, return the sum of the two integers without using the operators `+` and `-`.

---

## Solution: XOR for sum without carry; AND << 1 for carry; repeat until carry is 0

```javascript
function getSum(a, b) {
    while (b !== 0) {
        const carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}
```

**Time:** O(1) (32 bits max) | **Space:** O(1). **Pattern:** a + b = (a ^ b) + ((a & b) << 1); iterate until no carry.
