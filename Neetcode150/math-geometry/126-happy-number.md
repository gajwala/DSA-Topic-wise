# 126. Happy Number

**LeetCode**: [202. Happy Number](https://leetcode.com/problems/happy-number/)

**Difficulty**: Easy | **Topics**: Hash Table, Math, Two Pointers

---

## Problem

Replace a number by the sum of squares of its digits; repeat. Return `true` if the process reaches 1; else it cycles. Return whether n is a happy number.

---

## Solution: Floyd cycle detection or Set

```javascript
function isHappy(n) {
    function next(num) {
        let sum = 0;
        while (num > 0) {
            const d = num % 10;
            sum += d * d;
            num = Math.floor(num / 10);
        }
        return sum;
    }
    let slow = n, fast = n;
    do {
        slow = next(slow);
        fast = next(next(fast));
    } while (slow !== fast);
    return slow === 1;
}
```

**Time:** O(log n) per step | **Space:** O(1). **Pattern:** Cycle detection; if cycle contains 1, happy.
