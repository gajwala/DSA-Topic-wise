# 3. Two Sum

**LeetCode Link**: [1. Two Sum](https://leetcode.com/problems/two-sum/)

**Difficulty**: Easy

**Topics**: Array, Hash Table

---

## Problem Statement

Given an array of integers `nums` and an integer `target`, return **indices** of the two numbers such that they add up to `target`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

### Examples

**Example 1:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9
```

**Example 2:**
```
Input: nums = [3,2,4], target = 6
Output: [1,2]
Explanation: nums[1] + nums[2] = 2 + 4 = 6
```

**Example 3:**
```
Input: nums = [3,3], target = 6
Output: [0,1]
```

### Constraints
- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- **Only one valid answer exists**

---

## Approach 1: Brute Force (Nested Loops)

### Intuition
Check every possible pair to see if they sum to target.

### Algorithm
1. For each element at index `i`
2. Check all elements after it (index `j = i + 1` to `n`)
3. If `nums[i] + nums[j] == target`, return `[i, j]`

### Implementation

```javascript
/**
 * Brute Force Approach
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const n = nums.length;
    
    // Check every pair
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    
    return []; // Should never reach here per constraints
}

// Test
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]
console.log(twoSum([3, 3], 6)); // [0, 1]
```

### Complexity Analysis
- **Time Complexity**: `O(n²)` - Nested loops
- **Space Complexity**: `O(1)` - No extra space

### Why is this bad?
For `n = 10,000`:
- Need to check `10,000 × 9,999 / 2 ≈ 50 million` pairs
- Very slow for large inputs
- **Will get TLE on LeetCode**

---

## Approach 2: Two-Pass Hash Map

### Intuition
Store all numbers with their indices in a hash map, then check if complement exists.

### Algorithm
1. **Pass 1**: Build hash map of `{value → index}`
2. **Pass 2**: For each number, check if `target - number` exists in map
3. Make sure we don't use the same index twice

### Implementation

```javascript
/**
 * Two-Pass Hash Map
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const map = new Map();
    
    // Pass 1: Store all numbers with indices
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }
    
    // Pass 2: Check for complement
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        // Check if complement exists AND is not the same index
        if (map.has(complement) && map.get(complement) !== i) {
            return [i, map.get(complement)];
        }
    }
    
    return [];
}

// Test
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]
console.log(twoSum([3, 3], 6)); // [0, 1]
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Two separate passes
- **Space Complexity**: `O(n)` - Hash map storage

### Better, but can we do it in one pass?

---

## Approach 3: One-Pass Hash Map (Optimal) ✅

### Intuition
While iterating, check if we've seen the complement. If not, store current number for future checks.

### Algorithm
1. Create empty hash map
2. For each number at index `i`:
   - Calculate `complement = target - nums[i]`
   - If complement is in map, return `[map.get(complement), i]`
   - Otherwise, store `nums[i]` → `i` in map
3. Continue until pair found

### Implementation

```javascript
/**
 * One-Pass Hash Map (Optimal)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const map = new Map(); // {value → index}
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        // Check if we've seen the complement before
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        // Store current number for future checks
        map.set(nums[i], i);
    }
    
    return []; // Should never reach per constraints
}

// Test
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]
console.log(twoSum([3, 3], 6)); // [0, 1]
console.log(twoSum([-1, -2, -3, -4, -5], -8)); // [2, 4]
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Single pass
- **Space Complexity**: `O(n)` - Hash map storage

### Why is this optimal?
- **Single pass**: Most efficient possible
- **Fast lookup**: Hash map provides `O(1)` average lookup
- **Early exit**: Returns immediately when pair found
- **Simple**: Clean and easy to understand

---

## Visual Example

```
Input: nums = [2, 7, 11, 15], target = 9

Step 1: i = 0, nums[0] = 2
        complement = 9 - 2 = 7
        map = {}
        7 not in map → Add 2
        map = {2: 0}

Step 2: i = 1, nums[1] = 7
        complement = 9 - 7 = 2
        map = {2: 0}
        2 IS in map! → Return [0, 1] ✓
        
Answer: [0, 1]
```

### Another Example with Duplicates

```
Input: nums = [3, 3], target = 6

Step 1: i = 0, nums[0] = 3
        complement = 6 - 3 = 3
        map = {}
        3 not in map → Add 3
        map = {3: 0}

Step 2: i = 1, nums[1] = 3
        complement = 6 - 3 = 3
        map = {3: 0}
        3 IS in map! → Return [0, 1] ✓
        
Answer: [0, 1]
```

---

## Edge Cases

```javascript
// Negative numbers
console.log(twoSum([-1, -2, -3, -4, -5], -8)); // [2, 4] → -3 + (-5) = -8

// Zero in array
console.log(twoSum([0, 4, 3, 0], 0)); // [0, 3] → 0 + 0 = 0

// Large numbers
console.log(twoSum([1000000000, -1000000000, 500000000], 500000000));
// [1, 2] → -1000000000 + 1500000000 = 500000000

// Two elements only
console.log(twoSum([1, 2], 3)); // [0, 1]

// Duplicate values
console.log(twoSum([3, 2, 3], 6)); // [0, 2]
```

---

## Common Mistakes

### ❌ Mistake 1: Using same index twice
```javascript
// WRONG!
function twoSumWrong(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [i, map.get(complement)]; // Might return [i, i]!
        }
    }
}

// Test case that breaks it:
// nums = [3, 2, 4], target = 6
// When i = 1, nums[1] = 2, but might find complement = 4 at wrong time
```

### ✅ Correct: Check index difference
```javascript
if (map.has(complement) && map.get(complement) !== i) {
    return [i, map.get(complement)];
}
```

### ❌ Mistake 2: Returning values instead of indices
```javascript
// WRONG! Return indices, not values
return [nums[i], nums[j]]; // ❌

// CORRECT!
return [i, j]; // ✅
```

---

## Follow-Up Questions

### Q1: What if there are multiple solutions?

```javascript
/**
 * Return all pairs that sum to target
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
function twoSumAllPairs(nums, target) {
    const map = new Map();
    const result = [];
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            // Add all indices where complement was found
            for (const idx of map.get(complement)) {
                result.push([idx, i]);
            }
        }
        
        // Store this index
        if (!map.has(nums[i])) {
            map.set(nums[i], []);
        }
        map.get(nums[i]).push(i);
    }
    
    return result;
}

console.log(twoSumAllPairs([1, 1, 1, 1], 2));
// [[0,1], [0,2], [0,3], [1,2], [1,3], [2,3]]
```

### Q2: What if array is sorted?

Use two pointers instead:

```javascript
/**
 * Two Sum on sorted array (O(1) space)
 * @param {number[]} nums - sorted array
 * @param {number} target
 * @return {number[]}
 */
function twoSumSorted(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const sum = nums[left] + nums[right];
        
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++; // Need larger sum
        } else {
            right--; // Need smaller sum
        }
    }
    
    return [];
}

console.log(twoSumSorted([2, 7, 11, 15], 9)); // [0, 1]
```

**Complexity**: O(n) time, O(1) space

### Q3: Return values instead of indices?

```javascript
function twoSumValues(nums, target) {
    const map = new Map();
    
    for (const num of nums) {
        const complement = target - num;
        
        if (map.has(complement)) {
            return [complement, num];
        }
        
        map.set(num, true);
    }
    
    return [];
}

console.log(twoSumValues([2, 7, 11, 15], 9)); // [2, 7]
```

---

## Comparison of Approaches

| Approach | Time | Space | When to Use |
|----------|------|-------|-------------|
| Brute Force | O(n²) | O(1) | ❌ Never (too slow) |
| Two-Pass Hash | O(n) | O(n) | ✅ If needed clarity |
| One-Pass Hash | O(n) | O(n) | ✅ **Optimal (use this)** |
| Two Pointers | O(n) | O(1) | ✅ If array is sorted |

---

## Interview Tips

### Perfect Answer Flow:

1. **Clarify**: "Should I return indices or values? Are there duplicates?"

2. **Brute Force**: "The naive approach is O(n²) checking all pairs"

3. **Optimize**: "I can use a hash map to achieve O(n) time"

4. **Code**: Write the one-pass hash map solution

5. **Test**: Walk through an example

6. **Edge Cases**: "What if there are negative numbers? Duplicates?"

7. **Follow-ups**: "If the array is sorted, I could use two pointers for O(1) space"

### What interviewers love to hear:

- "I'll use a hash map for O(1) lookup"
- "I'm trading space for time"
- "I'll check if complement exists before adding to map"
- "This prevents using the same element twice"

---

## Related Problems

- [15. 3Sum](https://leetcode.com/problems/3sum/)
- [167. Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
- [170. Two Sum III - Data Structure Design](https://leetcode.com/problems/two-sum-iii-data-structure-design/)
- [653. Two Sum IV - BST](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/)
- [1679. Max Number of K-Sum Pairs](https://leetcode.com/problems/max-number-of-k-sum-pairs/)

---

## Key Takeaways

✅ Hash map enables O(n) solution  
✅ One-pass is better than two-pass  
✅ Check for complement before adding to map  
✅ Return indices, not values (unless specified)  
✅ Two pointers work for sorted arrays with O(1) space  

**Pattern**: When you need to find pairs/complements → Think Hash Map!

This is one of the most fundamental patterns in coding interviews. Master it!
