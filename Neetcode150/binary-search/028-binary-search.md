# 28. Binary Search

**LeetCode Link**: [704. Binary Search](https://leetcode.com/problems/binary-search/)

**Difficulty**: Easy

**Topics**: Array, Binary Search

---

## Problem Statement

Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with **O(log n)** runtime complexity.

### Examples

**Example 1:**
```
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
```

**Example 2:**
```
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
```

### Constraints
- `1 <= nums.length <= 10^4`
- `-10^4 < nums[i], target < 10^4`
- All integers in `nums` are **unique**
- `nums` is sorted in ascending order

---

## Approach 1: Linear Search (Brute Force)

```javascript
function search(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            return i;
        }
    }
    return -1;
}
```

**Complexity**: O(n) - Doesn't use sorted property!

---

## Approach 2: Binary Search (Optimal!) ✅

### Intuition
Since array is sorted, use binary search. Compare middle element with target. Eliminate half each iteration.

### Implementation

```javascript
/**
 * Binary Search - O(log n)
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
        } else if (nums[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Not found
}

// Alternative: Avoid integer overflow (important in other languages)
function searchSafe(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        // Avoid overflow: mid = left + (right - left) / 2
        const mid = left + Math.floor((right - left) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Recursive version
function searchRecursive(nums, target, left = 0, right = nums.length - 1) {
    if (left > right) {
        return -1;
    }
    
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) {
        return mid;
    } else if (nums[mid] < target) {
        return searchRecursive(nums, target, mid + 1, right);
    } else {
        return searchRecursive(nums, target, left, mid - 1);
    }
}

// Test
console.log(search([-1,0,3,5,9,12], 9)); // 4
console.log(search([-1,0,3,5,9,12], 2)); // -1
```

### Complexity Analysis
- **Time Complexity**: `O(log n)` - Divide search space in half each time
- **Space Complexity**: `O(1)` - Only pointers (O(log n) for recursive)

---

## Visual Example

```
nums = [-1, 0, 3, 5, 9, 12], target = 9

Step 1: left=0, right=5, mid=2
[-1, 0, [3], 5, 9, 12]
nums[2]=3 < 9 → Search right half

Step 2: left=3, right=5, mid=4
[-1, 0, 3, 5, [9], 12]
nums[4]=9 == 9 → Found! ✓

Return: 4
```

---

## Binary Search Template

```javascript
// Standard Binary Search Template
function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (nums[mid] === target) {
            return mid; // Found
        } else if (nums[mid] < target) {
            left = mid + 1; // Search right
        } else {
            right = mid - 1; // Search left
        }
    }
    
    return -1; // Not found
}

// Left-most position (first occurrence)
function binarySearchLeft(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (nums[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching left
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Right-most position (last occurrence)
function binarySearchRight(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (nums[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching right
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}
```

---

## Edge Cases

```javascript
// Single element - found
console.log(search([5], 5)); // 0

// Single element - not found
console.log(search([5], 3)); // -1

// Two elements - first
console.log(search([1, 3], 1)); // 0

// Two elements - second
console.log(search([1, 3], 3)); // 1

// Target smaller than all
console.log(search([1, 2, 3], 0)); // -1

// Target larger than all
console.log(search([1, 2, 3], 5)); // -1

// Large array
console.log(search(Array.from({length: 10000}, (_, i) => i), 9999)); // 9999
```

---

## Common Mistakes

### ❌ Mistake 1: Infinite loop with left < right
```javascript
// Wrong - can cause infinite loop
while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
        left = mid; // Should be mid + 1!
    }
}

// Correct
while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}
```

### ❌ Mistake 2: Wrong mid calculation
```javascript
// Can overflow in languages like Java/C++
const mid = (left + right) / 2; // Overflow if left+right > MAX_INT

// Correct
const mid = left + Math.floor((right - left) / 2);
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Array is sorted? Unique elements? Yes to both."

2. **Approach**: "Use binary search. O(log n) by eliminating half the search space each iteration."

3. **Edge cases**: "Check empty array, single element, target at boundaries."

4. **Key points**: "Use left <= right. Update pointers correctly to avoid infinite loops."

### Follow-up Questions:

**Q: What if array has duplicates? Find first occurrence.**
A: Modify to continue searching left even when found (see binarySearchLeft above)

**Q: What if we want insertion position for target not found?**
```javascript
function searchInsert(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left; // Insertion position
}
```

**Q: What if array is rotated?**
A: See "Search in Rotated Sorted Array" problem

---

## Related Problems

- [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)
- [34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
- [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- [278. First Bad Version](https://leetcode.com/problems/first-bad-version/)

---

## Key Takeaways

✅ Binary search for sorted arrays - O(log n)  
✅ Key condition: `left <= right`  
✅ Avoid overflow: `mid = left + (right - left) / 2`  
✅ Update pointers: `left = mid + 1` or `right = mid - 1`  
✅ Return `left` for insertion position  

**Pattern**: Sorted array search → Binary Search!
