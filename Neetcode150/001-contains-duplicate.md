# 1. Contains Duplicate

**LeetCode Link**: [217. Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

**Difficulty**: Easy

**Topics**: Array, Hash Table, Sorting

---

## Problem Statement

Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

### Examples

**Example 1:**
```
Input: nums = [1,2,3,1]
Output: true
Explanation: 1 appears twice
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: false
Explanation: All elements are distinct
```

**Example 3:**
```
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

### Constraints
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## Approach 1: Brute Force (Nested Loops)

### Intuition
Check every pair of elements to see if any two are equal.

### Algorithm
1. For each element at index `i`
2. Check all elements after it (index `j = i + 1` to `n`)
3. If `nums[i] == nums[j]`, return `true`
4. If no duplicates found, return `false`

### Implementation

```javascript
/**
 * Brute Force Approach
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
    const n = nums.length;
    
    // Check every pair
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] === nums[j]) {
                return true;
            }
        }
    }
    
    return false;
}

// Test
console.log(containsDuplicate([1,2,3,1])); // true
console.log(containsDuplicate([1,2,3,4])); // false
console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2])); // true
```

### Complexity Analysis
- **Time Complexity**: `O(n²)` - Two nested loops
- **Space Complexity**: `O(1)` - No extra space used

### Why is this bad?
For `n = 100,000`:
- Need to check `100,000 × 99,999 / 2 = 5 billion` pairs
- Would take several seconds
- **TLE (Time Limit Exceeded)** on LeetCode

---

## Approach 2: Sorting

### Intuition
If we sort the array, duplicates will be adjacent.

### Algorithm
1. Sort the array
2. Check if any adjacent elements are equal
3. If yes, return `true`
4. Otherwise, return `false`

### Implementation

```javascript
/**
 * Sorting Approach
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
    // Sort the array
    nums.sort((a, b) => a - b);
    
    // Check adjacent elements
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            return true;
        }
    }
    
    return false;
}

// Test
console.log(containsDuplicate([1,2,3,1])); // true
console.log(containsDuplicate([1,2,3,4])); // false
```

### Complexity Analysis
- **Time Complexity**: `O(n log n)` - Sorting dominates
- **Space Complexity**: `O(1)` or `O(n)` - Depends on sorting algorithm

### Better, but still not optimal
- Sorting is expensive
- Modifies the original array
- Can we do better?

---

## Approach 3: Hash Set (Optimal) ✅

### Intuition
Use a hash set to track seen elements. If we see an element again, it's a duplicate.

### Algorithm
1. Create an empty set
2. For each element:
   - If element is in set, return `true` (duplicate found!)
   - Otherwise, add element to set
3. If we finish the loop, return `false` (no duplicates)

### Implementation

```javascript
/**
 * Hash Set Approach (Optimal)
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
    const seen = new Set();
    
    for (const num of nums) {
        if (seen.has(num)) {
            return true; // Duplicate found!
        }
        seen.add(num);
    }
    
    return false; // No duplicates
}

// Alternative: One-liner using Set
function containsDuplicateOneLiner(nums) {
    return new Set(nums).size !== nums.length;
}

// Test
console.log(containsDuplicate([1,2,3,1])); // true
console.log(containsDuplicate([1,2,3,4])); // false
console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2])); // true

console.log(containsDuplicateOneLiner([1,2,3,1])); // true
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Single pass through array
- **Space Complexity**: `O(n)` - Set can store up to n elements

### Why is this optimal?
- **Single pass**: We only look at each element once
- **Fast lookup**: Set has `O(1)` average lookup time
- **Early exit**: Returns immediately when duplicate found

---

## Visual Example

```
Input: nums = [1, 2, 3, 1]

Step 1: seen = {}
        Check 1: Not in set → Add 1
        seen = {1}

Step 2: seen = {1}
        Check 2: Not in set → Add 2
        seen = {1, 2}

Step 3: seen = {1, 2}
        Check 3: Not in set → Add 3
        seen = {1, 2, 3}

Step 4: seen = {1, 2, 3}
        Check 1: IN SET! → Return true ✓
```

---

## Edge Cases

```javascript
// Single element
console.log(containsDuplicate([1])); // false

// Two same elements
console.log(containsDuplicate([1, 1])); // true

// All duplicates
console.log(containsDuplicate([1, 1, 1, 1])); // true

// Large numbers
console.log(containsDuplicate([1000000000, -1000000000, 1000000000])); // true

// Empty array (won't happen per constraints)
console.log(containsDuplicate([])); // false
```

---

## Comparison of Approaches

| Approach | Time Complexity | Space Complexity | LeetCode Result |
|----------|----------------|------------------|-----------------|
| Brute Force | O(n²) | O(1) | ❌ TLE |
| Sorting | O(n log n) | O(1) or O(n) | ✅ Accepted |
| Hash Set | O(n) | O(n) | ✅ Optimal |

---

## Interview Tips

### What interviewer wants to hear:

1. **Brute Force First**: "The naive approach would be checking every pair, but that's O(n²)"

2. **Optimization Thinking**: "We can improve this by using a data structure with fast lookup"

3. **Trade-off Discussion**: "Hash set uses O(n) space, but gives us O(1) lookup time"

4. **Space Alternative**: "If space is constrained, we could sort first at O(n log n) time"

### Follow-up Questions:

**Q: What if we can't use extra space?**
A: Sort the array and check adjacent elements - O(n log n) time, O(1) space

**Q: What if array is already sorted?**
A: Just check adjacent elements - O(n) time

**Q: What if we need to find the duplicate element?**
A: Modify to return the element instead of boolean

---

## Related Problems

- [217. Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/)
- [219. Contains Duplicate III](https://leetcode.com/problems/contains-duplicate-iii/)
- [1. Two Sum](https://leetcode.com/problems/two-sum/)

---

## Key Takeaways

✅ Hash Set is the optimal solution for duplicate detection  
✅ Trade space for time to achieve O(n) complexity  
✅ Consider sorting when space is constrained  
✅ Always discuss trade-offs in interviews  

**Pattern**: Use hash set when you need fast lookup/existence checking!
