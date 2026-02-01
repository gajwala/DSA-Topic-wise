# 31. Find Minimum in Rotated Sorted Array

**LeetCode Link**: [153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

**Difficulty**: Medium

**Topics**: Array, Binary Search

---

## Problem Statement

Suppose an array of length `n` sorted in ascending order is **rotated** between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become:

- `[4,5,6,7,0,1,2]` if it was rotated 4 times.
- `[0,1,2,4,5,6,7]` if it was rotated 7 times.

Notice that rotating an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` of **unique** elements, return the minimum element of this array.

You must write an algorithm that runs in **O(log n)** time.

### Examples

**Example 1:**
```
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
```

**Example 2:**
```
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] rotated 4 times.
```

**Example 3:**
```
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] rotated 4 times (no rotation).
```

### Constraints
- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- All integers in `nums` are **unique**
- `nums` is sorted and rotated between `1` and `n` times

---

## Approach 1: Linear Scan

```javascript
function findMin(nums) {
    let min = nums[0];
    for (const num of nums) {
        min = Math.min(min, num);
    }
    return min;
}
```

**Complexity**: O(n) - Doesn't meet requirement!

---

## Approach 2: Binary Search (Optimal!) ✅

### Intuition
Array has two sorted portions. Minimum is at the pivot point. Use binary search comparing mid with right to determine which half to search.

### Implementation

```javascript
/**
 * Binary Search - O(log n)
 * @param {number[]} nums
 * @return {number}
 */
function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] > nums[right]) {
            // Minimum is in right half
            // [3,4,5,1,2] mid=5 > right=2
            left = mid + 1;
        } else {
            // Minimum is in left half (including mid)
            // [5,1,2,3,4] mid=2 < right=4
            right = mid;
        }
    }
    
    return nums[left];
}

// Alternative: Compare with left
function findMinAlt(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    // If array not rotated or single element
    if (nums[left] <= nums[right]) {
        return nums[left];
    }
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        // Check if mid is the minimum
        if (mid > 0 && nums[mid] < nums[mid - 1]) {
            return nums[mid];
        }
        
        // Decide which half has the minimum
        if (nums[mid] >= nums[left]) {
            // Left half is sorted, minimum in right
            left = mid + 1;
        } else {
            // Right half is sorted, minimum in left
            right = mid;
        }
    }
    
    return nums[left];
}

// Test
console.log(findMin([3,4,5,1,2])); // 1
console.log(findMin([4,5,6,7,0,1,2])); // 0
console.log(findMin([11,13,15,17])); // 11
```

### Complexity Analysis
- **Time Complexity**: `O(log n)` - Binary search
- **Space Complexity**: `O(1)` - Only pointers

---

## Visual Example

```
nums = [4, 5, 6, 7, 0, 1, 2]
        │           │      │
      left         mid   right

Step 1: left=0, right=6, mid=3
nums[mid]=7 > nums[right]=2
Minimum in right half
left = mid + 1 = 4

       [4, 5, 6, 7, 0, 1, 2]
                    │  │  │
                  left mid right

Step 2: left=4, right=6, mid=5
nums[mid]=1 < nums[right]=2
Minimum in left half (including mid)
right = mid = 5

       [4, 5, 6, 7, 0, 1, 2]
                    │  │
                  left,mid
                  right

Step 3: left=4, right=5, mid=4
nums[mid]=0 < nums[right]=1
right = mid = 4

       [4, 5, 6, 7, 0, 1, 2]
                    │
                left,right

left == right → Stop
Return nums[4] = 0 ✓
```

---

## Key Decision Logic

```javascript
// Why compare mid with right (not left)?
// 
// Case 1: nums[mid] > nums[right]
// [4, 5, 6, 7, 0, 1, 2]
//           ^        ^
//          mid     right
// Mid is in left sorted portion → minimum in right half

// Case 2: nums[mid] < nums[right]
// [6, 7, 0, 1, 2, 4, 5]
//        ^           ^
//       mid        right
// Mid is in right sorted portion → minimum in left half (including mid)

// Case 3: No rotation (nums[mid] < nums[right])
// [1, 2, 3, 4, 5]
//        ^     ^
//       mid  right
// Array is sorted → minimum is at left
```

---

## Edge Cases

```javascript
// Single element
console.log(findMin([1])); // 1

// Two elements - rotated
console.log(findMin([2, 1])); // 1

// Two elements - not rotated
console.log(findMin([1, 2])); // 1

// No rotation (already sorted)
console.log(findMin([1, 2, 3, 4, 5])); // 1

// Rotated by 1
console.log(findMin([5, 1, 2, 3, 4])); // 1

// Rotated by n-1
console.log(findMin([2, 3, 4, 5, 1])); // 1

// All same except one (edge case for duplicates variant)
console.log(findMin([3, 3, 1, 3])); // 1
```

---

## Common Mistakes

### ❌ Mistake 1: Using left < right with wrong pointer updates
```javascript
// Wrong - can miss minimum
while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
        left = mid; // Should be mid + 1!
    }
}
```

### ❌ Mistake 2: Comparing with left instead of right
```javascript
// Can be tricky - comparing with right is cleaner
if (nums[mid] > nums[left]) {
    // Ambiguous - both halves could contain minimum
}

// Better - comparing with right
if (nums[mid] > nums[right]) {
    // Clear - minimum must be in right half
}
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Array has unique elements? Originally sorted then rotated? Need O(log n)? Yes to all."

2. **Key observation**: "Rotated sorted array has two sorted portions. Minimum is at pivot."

3. **Strategy**: "Compare mid with right. If mid > right, minimum is in right half. Otherwise, it's in left half including mid."

4. **Termination**: "Use left < right, return nums[left] when left == right"

### Follow-up Questions:

**Q: What if array has duplicates?**
A: Different problem (LeetCode 154) - need to handle nums[mid] == nums[right] case by decrementing right

```javascript
function findMinWithDuplicates(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else if (nums[mid] < nums[right]) {
            right = mid;
        } else {
            // nums[mid] == nums[right]
            // Can't determine which half, reduce right
            right--;
        }
    }
    
    return nums[left];
}
```

**Q: Can you find the rotation count?**
```javascript
function findRotationCount(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left; // Index of minimum is rotation count
}
```

---

## Related Problems

- [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- [154. Find Minimum in Rotated Sorted Array II](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/)
- [81. Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/)

---

## Key Takeaways

✅ Binary search on rotated sorted array - O(log n)  
✅ Compare mid with right to determine search direction  
✅ Use left < right (not <=) and return nums[left]  
✅ If nums[mid] > nums[right], minimum in right half  
✅ Otherwise, minimum in left half including mid  

**Pattern**: Rotated sorted array → Modified binary search!
