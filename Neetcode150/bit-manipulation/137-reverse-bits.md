# 137. Reverse Bits

**LeetCode**: [190. Reverse Bits](https://leetcode.com/problems/reverse-bits/)

**Difficulty**: Easy | **Topics**: Bit Manipulation, Divide and Conquer

---

## Problem

Reverse bits of a given 32 bits unsigned integer. Return the integer with bits reversed.

---

## Solution: Extract bit by bit and build result

```javascript
function reverseBits(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>>= 1;
    }
    return result >>> 0; // unsigned
}
```

**Time:** O(32) | **Space:** O(1). **Pattern:** Shift result left, OR with lowest bit of n; shift n right; repeat 32 times.
