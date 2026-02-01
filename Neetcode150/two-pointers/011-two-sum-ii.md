# 11. Two Sum II - Input Array Is Sorted

**LeetCode Link**: [167. Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

**Difficulty**: Medium

**Topics**: Array, Two Pointers, Binary Search

---

## Problem Statement

Given a **1-indexed** array of integers `numbers` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific `target` number. Let these two numbers be `numbers[index1]` and `numbers[index2]` where `1 <= index1 < index2 <= numbers.length`.

Return the indices of the two numbers, `index1` and `index2`, **added by one** as an integer array `[index1, index2]` of length 2.

The tests are generated such that there is **exactly one solution**. You **may not** use the same element twice.

Your solution must use only **constant extra space**.

### Examples

**Example 1:**
```
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2 (1-indexed).
```

**Example 2:**
```
Input: numbers = [2,3,4], target = 6
Output: [1,3]
```

**Example 3:**
```
Input: numbers = [-1,0], target = -1
Output: [1,2]
```

### Constraints
- `2 <= numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- `numbers` is sorted in **non-decreasing order**
- `-1000 <= target <= 1000`
- Exactly one valid answer exists

---

## Approach 1: Brute Force

### Implementation

```javascript
function twoSum(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === target) {
                return [i + 1, j + 1]; // 1-indexed
            }
        }
    }
}
```

**Complexity**: O(n²) time, O(1) space - Too slow!

---

## Approach 2: Hash Map (Not Optimal)

```javascript
function twoSum(numbers, target) {
    const map = new Map();
    
    for (let i = 0; i < numbers.length; i++) {
        const complement = target - numbers[i];
        if (map.has(complement)) {
            return [map.get(complement) + 1, i + 1];
        }
        map.set(numbers[i], i);
    }
}
```

**Complexity**: O(n) time, O(n) space
**Issue**: Uses extra space, doesn't utilize sorted property!

---

## Approach 3: Two Pointers (Optimal!) ✅

### Intuition
Since array is sorted, use two pointers:
- If sum < target, move left pointer right (increase sum)
- If sum > target, move right pointer left (decrease sum)
- If sum = target, found answer!

### Algorithm
1. Left pointer at start, right pointer at end
2. Calculate sum = numbers[left] + numbers[right]
3. If sum = target, return indices (1-indexed)
4. If sum < target, left++ (need larger sum)
5. If sum > target, right-- (need smaller sum)

### Implementation

```javascript
/**
 * Two Pointers - Optimal O(1) space
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        
        if (sum === target) {
            return [left + 1, right + 1]; // 1-indexed
        } else if (sum < target) {
            left++; // Need larger sum
        } else {
            right--; // Need smaller sum
        }
    }
    
    return []; // Won't reach per constraints
}

// Test
console.log(twoSum([2,7,11,15], 9)); // [1,2]
console.log(twoSum([2,3,4], 6)); // [1,3]
console.log(twoSum([-1,0], -1)); // [1,2]
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Single pass with two pointers
- **Space Complexity**: `O(1)` - Only two pointers

---

## Visual Example

```
Input: numbers = [2, 7, 11, 15], target = 9

Step 1:
L              R
2  7  11  15
sum = 2 + 15 = 17 > 9 → Move right pointer left

Step 2:
L          R
2  7  11  15
sum = 2 + 11 = 13 > 9 → Move right pointer left

Step 3:
L      R
2  7  11  15
sum = 2 + 7 = 9 = target ✓
Return [1, 2] (1-indexed)
```

---

## Key Takeaways

✅ Two pointers optimal for sorted array  
✅ O(1) space vs O(n) with hash map  
✅ Utilize sorted property!  
✅ Remember 1-indexed return

**Pattern**: Two Sum in sorted array → Two pointers!
