# 34. Median of Two Sorted Arrays

**LeetCode Link**: [4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)

**Difficulty**: Hard

**Topics**: Array, Binary Search, Divide and Conquer

---

## Problem Statement

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be **O(log (m+n))**.

### Examples

**Example 1:**
```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```

**Example 2:**
```
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
```

### Constraints
- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-10^6 <= nums1[i], nums2[i] <= 10^6`

---

## Approach 1: Merge and Find Median

```javascript
function findMedianSortedArrays(nums1, nums2) {
    const merged = [];
    let i = 0, j = 0;
    
    // Merge two sorted arrays
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] < nums2[j]) {
            merged.push(nums1[i++]);
        } else {
            merged.push(nums2[j++]);
        }
    }
    
    while (i < nums1.length) merged.push(nums1[i++]);
    while (j < nums2.length) merged.push(nums2[j++]);
    
    const n = merged.length;
    if (n % 2 === 0) {
        return (merged[n/2 - 1] + merged[n/2]) / 2;
    } else {
        return merged[Math.floor(n/2)];
    }
}
```

**Complexity**: O(m + n) - Doesn't meet requirement!

---

## Approach 2: Binary Search (Optimal!) ✅

### Intuition
Binary search on smaller array to partition both arrays such that left half contains smaller elements. Median is calculated from boundary elements.

### Implementation

```javascript
/**
 * Binary Search - O(log(min(m,n)))
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
    // Ensure nums1 is smaller for efficiency
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let left = 0;
    let right = m;
    
    while (left <= right) {
        // Partition indices
        const partition1 = Math.floor((left + right) / 2);
        const partition2 = Math.floor((m + n + 1) / 2) - partition1;
        
        // Handle edge cases for partitions
        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        const minRight1 = partition1 === m ? Infinity : nums1[partition1];
        
        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        const minRight2 = partition2 === n ? Infinity : nums2[partition2];
        
        // Check if we found the correct partition
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // Found correct partition
            if ((m + n) % 2 === 0) {
                // Even length: average of two middle elements
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            } else {
                // Odd length: max of left halves
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            // nums1 partition too far right, move left
            right = partition1 - 1;
        } else {
            // nums1 partition too far left, move right
            left = partition1 + 1;
        }
    }
    
    throw new Error("Input arrays are not sorted");
}

// Test
console.log(findMedianSortedArrays([1,3], [2])); // 2
console.log(findMedianSortedArrays([1,2], [3,4])); // 2.5
console.log(findMedianSortedArrays([0,0], [0,0])); // 0
console.log(findMedianSortedArrays([], [1])); // 1
console.log(findMedianSortedArrays([2], [])); // 2
```

### Complexity Analysis
- **Time Complexity**: `O(log(min(m, n)))` - Binary search on smaller array
- **Space Complexity**: `O(1)` - Only variables

---

## Visual Example

```
nums1 = [1, 3, 8, 9, 15]  (m = 5)
nums2 = [7, 11, 18, 19, 21, 25]  (n = 6)

Total = 11 elements → Median at position 6 (odd)
Need left half with 6 elements

Binary search on nums1:
─────────────────────

partition1 = 2, partition2 = 4

nums1: [1, 3 | 8, 9, 15]
nums2: [7, 11, 18, 19 | 21, 25]

Left:  [1, 3, 7, 11, 18, 19]  (6 elements)
Right: [8, 9, 15, 21, 25]     (5 elements)

maxLeft1 = 3, minRight1 = 8
maxLeft2 = 19, minRight2 = 21

Check: maxLeft1 <= minRight2? 3 <= 21 ✓
       maxLeft2 <= minRight1? 19 <= 8 ✗

19 > 8 → nums2 partition too far right
        → nums1 partition too far left
        → Increase partition1

partition1 = 3, partition2 = 3

nums1: [1, 3, 8 | 9, 15]
nums2: [7, 11, 18 | 19, 21, 25]

maxLeft1 = 8, minRight1 = 9
maxLeft2 = 18, minRight2 = 19

Check: 8 <= 19 ✓, 18 <= 9 ✗

Continue binary search...

Final partition:
nums1: [1, 3, 8, 9 | 15]
nums2: [7, 11 | 18, 19, 21, 25]

maxLeft1 = 9, maxLeft2 = 11
Median = max(9, 11) = 11 ✓
```

---

## Key Concepts

### Partition Formula
```javascript
// Total elements to the left of median
const halfLen = Math.floor((m + n + 1) / 2);

// If partition1 is at index i in nums1
// Then partition2 must be at:
const partition2 = halfLen - partition1;

// This ensures: left half has correct number of elements
```

### Partition Validity
```javascript
// Valid partition when:
// 1. All left elements <= all right elements
// 2. Specifically:
//    maxLeft1 <= minRight2  (nums1 left <= nums2 right)
//    maxLeft2 <= minRight1  (nums2 left <= nums1 right)
```

### Edge Cases Handling
```javascript
// When partition at boundary:
const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
const minRight1 = partition1 === m ? Infinity : nums1[partition1];
```

---

## Edge Cases

```javascript
// One array empty
console.log(findMedianSortedArrays([], [1])); // 1
console.log(findMedianSortedArrays([2], [])); // 2

// Different lengths
console.log(findMedianSortedArrays([1], [2,3,4,5,6])); // 3.5

// All elements in nums1 < all in nums2
console.log(findMedianSortedArrays([1,2], [3,4])); // 2.5

// All elements in nums1 > all in nums2
console.log(findMedianSortedArrays([3,4], [1,2])); // 2.5

// Single element arrays
console.log(findMedianSortedArrays([1], [2])); // 1.5

// Duplicate elements
console.log(findMedianSortedArrays([1,1,1], [1,1,1])); // 1
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Both arrays sorted? Can have different lengths? Need O(log(m+n))? Yes."

2. **Key insight**: "Binary search on smaller array to find partition where all left elements <= all right elements."

3. **Partition goal**: "Split combined arrays so left half has (m+n+1)/2 elements."

4. **Median calculation**:
   - Odd total: max of left halves
   - Even total: average of (max of left halves, min of right halves)

5. **Complexity**: "O(log(min(m,n))) - binary search on smaller array"

### Follow-up Questions:

**Q: What if arrays not sorted?**
A: Would need to sort first (O(n log n)) or use different approach

**Q: What if we need kth smallest instead of median?**
```javascript
function findKthElement(nums1, nums2, k) {
    // Similar binary search, but partition at k instead of median
    // ... implementation
}
```

**Q: Can you do it with O(m+n) space?**
A: Yes, merge arrays (Approach 1), but doesn't meet time requirement

---

## Common Mistakes

### ❌ Mistake 1: Not handling edge cases
```javascript
// Wrong - crashes when partition at boundary
const maxLeft1 = nums1[partition1 - 1]; // partition1 could be 0!

// Correct
const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
```

### ❌ Mistake 2: Wrong partition formula
```javascript
// Wrong - doesn't handle odd/even correctly
const partition2 = (m + n) / 2 - partition1;

// Correct - +1 ensures left half has more element when odd
const partition2 = Math.floor((m + n + 1) / 2) - partition1;
```

---

## Related Problems

- [295. Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)
- [719. Find K-th Smallest Pair Distance](https://leetcode.com/problems/find-k-th-smallest-pair-distance/)

---

## Key Takeaways

✅ Binary search on smaller array for efficiency  
✅ Partition both arrays to split into left/right halves  
✅ Valid when all left elements <= all right elements  
✅ Handle edge cases with Infinity/-Infinity  
✅ O(log(min(m,n))) optimal solution  

**Pattern**: Median of two sorted arrays → Binary search on partitions!

**Binary Search Complete! (7/7) ✅**
