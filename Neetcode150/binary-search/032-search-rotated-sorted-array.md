# 32. Search in Rotated Sorted Array

**LeetCode Link**: [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

**Difficulty**: Medium

**Topics**: Array, Binary Search

---

## Problem Statement

There is an integer array `nums` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, `nums` is **possibly rotated** at an unknown pivot index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**). For example, `[0,1,2,4,5,6,7]` might be rotated at pivot index `3` and become `[4,5,6,7,0,1,2]`.

Given the array `nums` **after** the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.

You must write an algorithm with **O(log n)** runtime complexity.

### Examples

**Example 1:**
```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

**Example 2:**
```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

**Example 3:**
```
Input: nums = [1], target = 0
Output: -1
```

### Constraints
- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- All values of `nums` are **unique**
- `nums` is an ascending array that is possibly rotated
- `-10^4 <= target <= 10^4`

---

## Approach: Binary Search (Optimal!) ✅

### Intuition
Array has two sorted portions. Determine which half is sorted, then check if target is in that sorted half.

### Implementation

```javascript
/**
 * Binary Search on Rotated Array - O(log n)
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        }
        
        // Determine which half is sorted
        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            if (nums[left] <= target && target < nums[mid]) {
                // Target is in sorted left half
                right = mid - 1;
            } else {
                // Target is in right half
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (nums[mid] < target && target <= nums[right]) {
                // Target is in sorted right half
                left = mid + 1;
            } else {
                // Target is in left half
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

// Test
console.log(search([4,5,6,7,0,1,2], 0)); // 4
console.log(search([4,5,6,7,0,1,2], 3)); // -1
console.log(search([1], 0)); // -1
console.log(search([1, 3], 3)); // 1
```

### Complexity Analysis
- **Time Complexity**: `O(log n)` - Binary search
- **Space Complexity**: `O(1)` - Only pointers

---

## Visual Example

```
nums = [4, 5, 6, 7, 0, 1, 2], target = 0

Step 1: left=0, right=6, mid=3
[4, 5, 6, 7, 0, 1, 2]
 L        M        R

nums[mid]=7, nums[left]=4
nums[left] <= nums[mid] → Left half [4,5,6,7] is sorted
Is target in [4, 7)? 0 not in [4, 7)
Search right half → left = mid + 1 = 4

Step 2: left=4, right=6, mid=5
[4, 5, 6, 7, 0, 1, 2]
             L  M  R

nums[mid]=1, nums[left]=0
nums[left] <= nums[mid] → Left half [0,1] is sorted
Is target in [0, 1)? 0 in [0, 1) ✓
Search left half → right = mid - 1 = 4

Step 3: left=4, right=4, mid=4
[4, 5, 6, 7, 0, 1, 2]
             L
             M
             R

nums[mid]=0 == target ✓
Return 4
```

---

## Decision Tree Logic

```javascript
// At each step, determine:
// 1. Which half is sorted? (compare nums[left] with nums[mid])
// 2. Is target in the sorted half?

// Case 1: Left half is sorted (nums[left] <= nums[mid])
[4, 5, 6, 7, | 0, 1, 2]
 ^        ^    (sorted)
left     mid

if (nums[left] <= target < nums[mid]) {
    // Target in sorted left half
    right = mid - 1;
} else {
    // Target in right half
    left = mid + 1;
}

// Case 2: Right half is sorted (nums[mid] < nums[right])
[6, 7, 0, 1, | 2, 4, 5]
      ^        ^     ^
     mid    (sorted) right

if (nums[mid] < target <= nums[right]) {
    // Target in sorted right half
    left = mid + 1;
} else {
    // Target in left half
    right = mid - 1;
}
```

---

## Edge Cases

```javascript
// Single element - found
console.log(search([1], 1)); // 0

// Single element - not found
console.log(search([1], 0)); // -1

// Two elements - no rotation
console.log(search([1, 3], 3)); // 1

// Two elements - rotated
console.log(search([3, 1], 1)); // 1

// No rotation (sorted array)
console.log(search([1, 2, 3, 4, 5], 3)); // 2

// Target at pivot
console.log(search([4,5,6,7,0,1,2], 4)); // 0
console.log(search([4,5,6,7,0,1,2], 0)); // 4

// Target at boundaries
console.log(search([4,5,6,7,0,1,2], 2)); // 6
```

---

## Common Mistakes

### ❌ Mistake 1: Wrong sorted half check
```javascript
// Wrong - using < instead of <=
if (nums[left] < nums[mid]) {
    // Fails when left == mid (e.g., two elements)
}

// Correct
if (nums[left] <= nums[mid]) {
    // Works for all cases
}
```

### ❌ Mistake 2: Wrong target range check
```javascript
// Wrong - not checking both boundaries
if (target < nums[mid]) {
    right = mid - 1; // Doesn't check if target is in sorted range!
}

// Correct - check if target is in sorted half's range
if (nums[left] <= target && target < nums[mid]) {
    right = mid - 1;
}
```

### ❌ Mistake 3: Using strict inequality for boundaries
```javascript
// Wrong - target could equal boundary
if (nums[left] < target && target < nums[mid]) {
    // Misses if target == nums[left]!
}

// Correct - include boundaries
if (nums[left] <= target && target < nums[mid]) {
    // Includes left boundary
}
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Array has unique elements? Need O(log n)? Yes."

2. **Key insight**: "At least one half is always sorted. Determine which, then check if target is in that half."

3. **Algorithm**: 
   - Compare nums[left] with nums[mid] to find sorted half
   - Check if target is in sorted half's range
   - Search accordingly

4. **Complexity**: "O(log n) time, O(1) space"

### Follow-up Questions:

**Q: What if array has duplicates?**
A: Different problem (LeetCode 81) - worst case O(n) when many duplicates

```javascript
function searchWithDuplicates(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return true;
        }
        
        // Handle duplicates
        if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
            left++;
            right--;
        } else if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return false;
}
```

**Q: Can you find the rotation count/pivot index?**
```javascript
function findPivot(nums) {
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
    
    return left; // Pivot index (minimum element)
}
```

---

## Related Problems

- [81. Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/)
- [153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- [154. Find Minimum in Rotated Sorted Array II](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/)

---

## Key Takeaways

✅ One half is always sorted in rotated array  
✅ Check nums[left] <= nums[mid] to find sorted half  
✅ Verify target is in sorted half's range  
✅ O(log n) with careful boundary handling  
✅ Use <= for comparisons, not just <  

**Pattern**: Search in rotated sorted array → Modified binary search!
