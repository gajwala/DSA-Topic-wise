# 123. Merge Triplets to Form Target Triplet

**LeetCode**: [1899. Merge Triplets to Form Target Triplet](https://leetcode.com/problems/merge-triplets-to-form-target-triplet/)

**Difficulty**: Medium | **Topics**: Array, Greedy

---

## Problem

You have triplets; merging two (a,b,c) and (x,y,z) gives (max(a,x), max(b,y), max(c,z)). Given `triplets` and `target`, return `true` if you can obtain `target` by merging triplets (any order, any number of times).

---

## Solution: Greedy (only use triplets ≤ target; check if we hit target in each dimension)

```javascript
function mergeTriplets(triplets, target) {
    let a = 0, b = 0, c = 0;
    for (const [x, y, z] of triplets) {
        if (x <= target[0] && y <= target[1] && z <= target[2]) {
            a = Math.max(a, x);
            b = Math.max(b, y);
            c = Math.max(c, z);
        }
    }
    return a === target[0] && b === target[1] && c === target[2];
}
```

**Time:** O(n) | **Space:** O(1). **Pattern:** Use only triplets that don't exceed target in any dimension; track max in each; must equal target.
