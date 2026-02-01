# 42. Find Duplicate Number

**LeetCode Link**: [287. Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)

**Difficulty**: Medium

**Topics**: Array, Two Pointers, Binary Search, Bit Manipulation

---

## Problem Statement

Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.

There is only **one repeated number** in `nums`, return this repeated number.

You must solve the problem **without** modifying the array `nums` and uses only constant extra space.

### Examples

**Example 1:**
```
Input: nums = [1,3,4,2,2]
Output: 2
```

**Example 2:**
```
Input: nums = [3,1,3,4,2]
Output: 3
```

**Example 3:**
```
Input: nums = [3,3,3,3,3]
Output: 3
```

### Constraints
- `1 <= n <= 10^5`
- `nums.length == n + 1`
- `1 <= nums[i] <= n`
- All the integers in `nums` appear only **once** except for **precisely one integer** which appears **two or more** times

---

## Approach 1: Sorting (Modifies Array)

```javascript
function findDuplicate(nums) {
    nums.sort((a, b) => a - b);
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            return nums[i];
        }
    }
}
```

**Complexity**: O(n log n) - Violates "don't modify array" constraint

---

## Approach 2: Hash Set (Extra Space)

```javascript
function findDuplicate(nums) {
    const seen = new Set();
    
    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }
}
```

**Complexity**: O(n) time, O(n) space - Violates "constant space" constraint

---

## Approach 3: Floyd's Cycle Detection (Optimal!) ✅

### Intuition
Treat array as linked list where nums[i] points to index nums[i]. Since there's a duplicate, there's a cycle. Use Floyd's algorithm.

### Implementation

```javascript
/**
 * Floyd's Cycle Detection - O(n) time, O(1) space
 * @param {number[]} nums
 * @return {number}
 */
function findDuplicate(nums) {
    // Phase 1: Find intersection point in cycle
    let slow = nums[0];
    let fast = nums[0];
    
    do {
        slow = nums[slow];       // Move 1 step
        fast = nums[nums[fast]]; // Move 2 steps
    } while (slow !== fast);
    
    // Phase 2: Find entrance to cycle (duplicate)
    slow = nums[0];
    
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
}

// Test
console.log(findDuplicate([1,3,4,2,2])); // 2
console.log(findDuplicate([3,1,3,4,2])); // 3
console.log(findDuplicate([3,3,3,3,3])); // 3
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Two phases, each O(n)
- **Space Complexity**: `O(1)` - Only two pointers

---

## Why It Works

```
nums = [1, 3, 4, 2, 2]
Index:  0  1  2  3  4

Treat as linked list:
Index 0 points to index 1 (nums[0] = 1)
Index 1 points to index 3 (nums[1] = 3)
Index 3 points to index 2 (nums[3] = 2)
Index 2 points to index 4 (nums[2] = 4)
Index 4 points to index 2 (nums[4] = 2)

Graph:
0 -> 1 -> 3 -> 2 -> 4
              ^    |
              |____|

Cycle exists! Entrance = 2 (duplicate) ✓
```

---

## Visual Example

```
nums = [1, 3, 4, 2, 2]

Phase 1: Detect cycle
─────────────────────
slow = nums[0] = 1
fast = nums[0] = 1

Step 1:
slow = nums[1] = 3
fast = nums[nums[1]] = nums[3] = 2

Step 2:
slow = nums[3] = 2
fast = nums[nums[2]] = nums[4] = 2

slow == fast → Intersection found!

Phase 2: Find entrance
──────────────────────
slow = nums[0] = 1
fast = 2 (stays at intersection)

Step 1:
slow = nums[1] = 3
fast = nums[2] = 4

Step 2:
slow = nums[3] = 2
fast = nums[4] = 2

slow == fast → Entrance found!
Return 2 ✓
```

---

## Approach 4: Binary Search (Alternative)

```javascript
/**
 * Binary Search on Count - O(n log n) time, O(1) space
 */
function findDuplicateBinarySearch(nums) {
    let left = 1;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        // Count numbers <= mid
        let count = 0;
        for (const num of nums) {
            if (num <= mid) {
                count++;
            }
        }
        
        // If count > mid, duplicate is in [left, mid]
        if (count > mid) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}
```

**Complexity**: O(n log n) time, O(1) space

---

## Edge Cases

```javascript
// Minimum input
console.log(findDuplicate([1, 1])); // 1

// Duplicate is 1
console.log(findDuplicate([2, 1, 1])); // 1

// Duplicate is n
console.log(findDuplicate([1, 2, 3, 4, 5, 5])); // 5

// All same number
console.log(findDuplicate([3, 3, 3, 3])); // 3

// Duplicate appears more than twice
console.log(findDuplicate([1, 2, 2, 2, 3])); // 2

// Large array
const large = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 5];
console.log(findDuplicate(large)); // 5
```

---

## Common Mistakes

### ❌ Mistake 1: Treating as normal linked list
```javascript
// Wrong - trying to access node.next
let slow = nums[0];
let fast = nums[0].next; // nums[0] is a number, not a node!

// Correct - treat value as index
let slow = nums[0];
let fast = nums[nums[0]];
```

### ❌ Mistake 2: Not resetting pointer in phase 2
```javascript
// Wrong - doesn't reset slow
while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
}
// slow is still at intersection point!

// Correct - reset slow to start
slow = nums[0];
while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
}
```

### ❌ Mistake 3: Moving fast incorrectly
```javascript
// Wrong - fast not moving 2 steps
fast = nums[fast];
fast = nums[fast];
// Two separate operations!

// Correct - move 2 steps atomically
fast = nums[nums[fast]];
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Can't modify array? Need O(1) space? Yes to both."

2. **Key insight**: "Numbers in range [1, n] → can treat array as linked list graph where nums[i] points to index nums[i]"

3. **Why cycle exists**: "n+1 numbers in range [1, n] → pigeonhole principle → duplicate → cycle in graph"

4. **Algorithm**: "Two phases:
   - Phase 1: Detect cycle intersection (Floyd's)
   - Phase 2: Find cycle entrance (duplicate)"

5. **Complexity**: "O(n) time, O(1) space - meets all constraints!"

### Follow-up Questions:

**Q: Why does phase 2 find the duplicate?**
A: Mathematical proof:
- Let F = distance from start to cycle entrance
- Let C = cycle length
- At intersection: slow traveled F + a, fast traveled F + nC + a
- Since fast is 2x speed: 2(F + a) = F + nC + a
- Simplifies to: F = nC - a
- Moving both pointers F steps from start and intersection meets at entrance!

**Q: What if multiple duplicates?**
A: Problem states exactly one duplicate. If multiple, this method finds one of them.

**Q: Can you find all duplicates?**
```javascript
function findAllDuplicates(nums) {
    const result = [];
    
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1;
        
        if (nums[index] < 0) {
            result.push(index + 1);
        } else {
            nums[index] = -nums[index];
        }
    }
    
    return result;
}
// But this modifies the array
```

---

## Related Problems

- [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
- [142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
- [442. Find All Duplicates in an Array](https://leetcode.com/problems/find-all-duplicates-in-an-array/)
- [645. Set Mismatch](https://leetcode.com/problems/set-mismatch/)

---

## Key Takeaways

✅ Treat array as implicit linked list graph  
✅ Values in [1, n] → use as indices  
✅ Duplicate creates cycle in graph  
✅ Floyd's algorithm finds cycle entrance = duplicate  
✅ O(n) time, O(1) space without modifying array  

**Pattern**: Find duplicate with constraints → Floyd's on implicit graph!
