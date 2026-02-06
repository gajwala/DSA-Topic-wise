# 91. Kth Largest Element in an Array

**LeetCode Link**: [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

**Difficulty**: Medium

**Topics**: Array, Divide and Conquer, Sorting, Heap, Quickselect

---

## Problem Statement

Given an integer array `nums` and an integer `k`, return the **kth largest element** in the array.

Note that it is the kth largest element in the **sorted order**, not the kth distinct element.

### Examples

**Example 1:**
```
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```

**Example 2:**
```
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

### Constraints
- `1 <= k <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

---

## Approach 1: Min-Heap of Size K ✅

### Implementation

```javascript
/**
 * Min-Heap of size k - O(n log k) time, O(k) space
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
    const heap = [];
    
    for (const num of nums) {
        if (heap.length < k) {
            heap.push(num);
            bubbleUp(heap.length - 1);
        } else if (num > heap[0]) {
            heap[0] = num;
            bubbleDown(0);
        }
    }
    
    return heap[0];
    
    function bubbleUp(i) {
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (heap[i] >= heap[p]) break;
            [heap[i], heap[p]] = [heap[p], heap[i]];
            i = p;
        }
    }
    
    function bubbleDown(i) {
        const n = heap.length;
        while (true) {
            let smallest = i;
            const L = 2*i+1, R = 2*i+2;
            if (L < n && heap[L] < heap[smallest]) smallest = L;
            if (R < n && heap[R] < heap[smallest]) smallest = R;
            if (smallest === i) break;
            [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
            i = smallest;
        }
    }
}
```

### Complexity Analysis
- **Time**: O(n log k)
- **Space**: O(k)

---

## Approach 2: Quickselect (O(n) average)

```javascript
function findKthLargestQuickSelect(nums, k) {
    k = nums.length - k; // kth largest = (n-k)th smallest (0-indexed)
    
    function quickSelect(l, r) {
        const pivot = nums[r];
        let p = l;
        for (let i = l; i < r; i++) {
            if (nums[i] <= pivot) {
                [nums[p], nums[i]] = [nums[i], nums[p]];
                p++;
            }
        }
        [nums[p], nums[r]] = [nums[r], nums[p]];
        if (p === k) return nums[p];
        if (p < k) return quickSelect(p + 1, r);
        return quickSelect(l, p - 1);
    }
    
    return quickSelect(0, nums.length - 1);
}
```

---

## Key Takeaways

✅ Kth largest = min-heap of size k; peek = kth largest  
✅ Or quickselect for (n-k)th smallest  
✅ O(n log k) heap; O(n) average quickselect  
✅ Pattern: Kth largest → Min-heap size K or quickselect  

**Pattern**: Kth largest → Min-heap of size K!
