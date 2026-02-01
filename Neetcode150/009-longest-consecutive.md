# 9. Longest Consecutive Sequence

**LeetCode Link**: [128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)

**Difficulty**: Hard

**Topics**: Array, Hash Table, Union Find

---

## Problem Statement

Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in **O(n)** time.

### Examples

**Example 1:**
```
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive sequence is [1, 2, 3, 4]. Length is 4.
```

**Example 2:**
```
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
Explanation: Sequence [0,1,2,3,4,5,6,7,8]
```

### Constraints
- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## Approach 1: Brute Force (Sorting)

### Intuition
Sort the array, then count consecutive numbers.

### Algorithm
1. Sort array
2. Iterate through sorted array
3. Count consecutive sequences
4. Track maximum length

### Implementation

```javascript
/**
 * Sorting Approach - O(n log n)
 * @param {number[]} nums
 * @return {number}
 */
function longestConsecutive(nums) {
    if (nums.length === 0) return 0;
    
    // Sort array
    nums.sort((a, b) => a - b);
    
    let maxLength = 1;
    let currentLength = 1;
    
    for (let i = 1; i < nums.length; i++) {
        // Skip duplicates
        if (nums[i] === nums[i - 1]) {
            continue;
        }
        
        // Check if consecutive
        if (nums[i] === nums[i - 1] + 1) {
            currentLength++;
            maxLength = Math.max(maxLength, currentLength);
        } else {
            currentLength = 1; // Reset
        }
    }
    
    return maxLength;
}

// Test
console.log(longestConsecutive([100,4,200,1,3,2])); // 4
console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1])); // 9
```

### Complexity Analysis
- **Time Complexity**: `O(n log n)` - Sorting dominates
- **Space Complexity**: `O(1)` or `O(n)` depending on sorting algorithm

### Not optimal! Problem requires O(n).

---

## Approach 2: Hash Set (Optimal!) ✅

### Intuition
Use hash set for O(1) lookups. For each number, check if it's the start of a sequence (no `num-1` exists). If yes, count how long the sequence is.

### Key Insight
Only start counting from the **beginning** of a sequence to avoid redundant work.

### Algorithm
1. Put all numbers in a hash set
2. For each number:
   - Check if it's the start of a sequence (`num-1` not in set)
   - If yes, count consecutive numbers (`num+1`, `num+2`, ...)
3. Track maximum length

### Implementation

```javascript
/**
 * Hash Set Approach - O(n) Optimal!
 * @param {number[]} nums
 * @return {number}
 */
function longestConsecutive(nums) {
    if (nums.length === 0) return 0;
    
    // Create hash set for O(1) lookups
    const numSet = new Set(nums);
    let maxLength = 0;
    
    for (const num of numSet) {
        // Only start counting if this is the beginning of a sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentLength = 1;
            
            // Count consecutive numbers
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }
            
            maxLength = Math.max(maxLength, currentLength);
        }
    }
    
    return maxLength;
}

// Test
console.log(longestConsecutive([100,4,200,1,3,2])); // 4
console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1])); // 9
console.log(longestConsecutive([9,1,4,7,3,-1,0,5,8,-2,6,2])); // 7
```

### Complexity Analysis
- **Time Complexity**: `O(n)` 
  - Creating set: O(n)
  - Each number visited at most twice (once as start, once in while loop)
  - Total: O(n)
- **Space Complexity**: `O(n)` - Hash set

### Why is this O(n)?
Each number is processed at most twice:
1. Once when checking if it's a sequence start
2. Once when counting as part of a sequence

Even though there's a nested while loop, the inner loop only runs when `num-1` doesn't exist, ensuring each number is counted only once.

---

## Visual Example

```
Input: nums = [100, 4, 200, 1, 3, 2]

Step 1: Create Set
numSet = {100, 4, 200, 1, 3, 2}

Step 2: Process each number
────────────────────────────────

Check 100:
  Is 99 in set? NO → This is a sequence start!
  Count: 100 → 101? NO
  Length = 1

Check 4:
  Is 3 in set? YES → Skip (not a sequence start)

Check 200:
  Is 199 in set? NO → This is a sequence start!
  Count: 200 → 201? NO
  Length = 1

Check 1:
  Is 0 in set? NO → This is a sequence start!
  Count: 1 → 2? YES → 3? YES → 4? YES → 5? NO
  Length = 4 ✓ (sequence: 1, 2, 3, 4)

Check 3:
  Is 2 in set? YES → Skip

Check 2:
  Is 1 in set? YES → Skip

Max Length = 4
```

---

## Detailed Walkthrough

```
nums = [100, 4, 200, 1, 3, 2]
numSet = {1, 2, 3, 4, 100, 200}

Iteration 1: num = 100
  num - 1 = 99 not in set → START
  Count: 100 ✓
  100 + 1 = 101 not in set
  Length = 1

Iteration 2: num = 4
  num - 1 = 3 is in set → SKIP (not start)

Iteration 3: num = 200
  num - 1 = 199 not in set → START
  Count: 200 ✓
  200 + 1 = 201 not in set
  Length = 1

Iteration 4: num = 1
  num - 1 = 0 not in set → START
  Count sequence:
    1 ✓
    1 + 1 = 2 in set ✓
    2 + 1 = 3 in set ✓
    3 + 1 = 4 in set ✓
    4 + 1 = 5 not in set
  Length = 4 ← Maximum!

Iteration 5: num = 3
  num - 1 = 2 is in set → SKIP

Iteration 6: num = 2
  num - 1 = 1 is in set → SKIP

Answer: 4
```

---

## Edge Cases

```javascript
// Empty array
console.log(longestConsecutive([])); // 0

// Single element
console.log(longestConsecutive([1])); // 1

// No consecutive
console.log(longestConsecutive([1, 3, 5, 7])); // 1

// All consecutive
console.log(longestConsecutive([1, 2, 3, 4, 5])); // 5

// Duplicates
console.log(longestConsecutive([1, 2, 0, 1])); // 3 (0,1,2)

// Negative numbers
console.log(longestConsecutive([-1, -2, 0, 1])); // 4 (-2,-1,0,1)

// Multiple sequences
console.log(longestConsecutive([1,2,3,10,11,12,13])); // 4 (10,11,12,13)

// Large gaps
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
```

---

## Approach 3: Union Find (Alternative)

```javascript
/**
 * Union Find Approach (More complex, same O(n))
 * @param {number[]} nums
 * @return {number}
 */
class UnionFind {
    constructor() {
        this.parent = new Map();
        this.size = new Map();
    }
    
    add(x) {
        if (!this.parent.has(x)) {
            this.parent.set(x, x);
            this.size.set(x, 1);
        }
    }
    
    find(x) {
        if (this.parent.get(x) !== x) {
            this.parent.set(x, this.find(this.parent.get(x)));
        }
        return this.parent.get(x);
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX !== rootY) {
            if (this.size.get(rootX) < this.size.get(rootY)) {
                this.parent.set(rootX, rootY);
                this.size.set(rootY, this.size.get(rootY) + this.size.get(rootX));
            } else {
                this.parent.set(rootY, rootX);
                this.size.set(rootX, this.size.get(rootX) + this.size.get(rootY));
            }
        }
    }
    
    getMaxSize() {
        return Math.max(...this.size.values());
    }
}

function longestConsecutive(nums) {
    if (nums.length === 0) return 0;
    
    const uf = new UnionFind();
    const numSet = new Set(nums);
    
    // Add all numbers
    for (const num of numSet) {
        uf.add(num);
    }
    
    // Union consecutive numbers
    for (const num of numSet) {
        if (numSet.has(num + 1)) {
            uf.union(num, num + 1);
        }
    }
    
    return uf.getMaxSize();
}

// Test
console.log(longestConsecutive([100,4,200,1,3,2])); // 4
```

**Complexity**: O(n) with path compression, but more complex.

---

## Interview Tips

### What to say:

1. **Clarify**: "Can there be duplicates? Yes. Can be negative? Yes."

2. **Brute Force**: "Could sort and count consecutive - O(n log n)"

3. **Optimization needed**: "Problem requires O(n) time"

4. **Hash Set approach**: "Use set for O(1) lookups. Only count from sequence starts."

5. **Key insight**: "Check if `num-1` exists. If no, it's a sequence start."

6. **Why O(n)**: "Each number visited at most twice - once as start, once in sequence"

### Follow-up Questions:

**Q: Can you do it without extra space?**
A: No, need to track which numbers exist for O(1) lookup. Hash set is optimal.

**Q: What if we need to return the actual sequence?**
```javascript
function longestConsecutiveSequence(nums) {
    if (nums.length === 0) return [];
    
    const numSet = new Set(nums);
    let maxLength = 0;
    let maxStart = 0;
    
    for (const num of numSet) {
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentLength = 1;
            
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }
            
            if (currentLength > maxLength) {
                maxLength = currentLength;
                maxStart = num;
            }
        }
    }
    
    return Array.from({ length: maxLength }, (_, i) => maxStart + i);
}

console.log(longestConsecutiveSequence([100,4,200,1,3,2]));
// [1, 2, 3, 4]
```

**Q: Can there be multiple longest sequences?**
A: Return any one, or modify to return all.

---

## Related Problems

- [298. Binary Tree Longest Consecutive Sequence](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence/)
- [549. Binary Tree Longest Consecutive Sequence II](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii/)
- [2274. Maximum Consecutive Floors Without Special Floors](https://leetcode.com/problems/maximum-consecutive-floors-without-special-floors/)

---

## Key Takeaways

✅ Hash set enables O(1) lookups for O(n) solution  
✅ Only count from sequence starts (`num-1` not present)  
✅ Each number visited at most twice (amortized O(n))  
✅ Sort approach is O(n log n) - not optimal  
✅ Key insight: Avoid redundant counting  

**Pattern**: Consecutive sequence in unsorted array → Hash set + smart iteration!

**Arrays & Hashing Complete! (9/9) ✅**
