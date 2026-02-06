# 136. Counting Bits

**LeetCode**: [338. Counting Bits](https://leetcode.com/problems/counting-bits/)

**Difficulty**: Easy | **Topics**: DP, Bit Manipulation

---

## Problem

Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of 1's in the binary representation of `i`.

---

## Solution: DP (ans[i] = ans[i >> 1] + (i & 1))

```javascript
function countBits(n) {
    const ans = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return ans;
}
```

**Time:** O(n) | **Space:** O(1) output. **Pattern:** Number of 1s in i = number in i/2 + (1 if i odd else 0).
