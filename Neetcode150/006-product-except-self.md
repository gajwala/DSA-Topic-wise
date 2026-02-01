# 6. Product of Array Except Self

**LeetCode Link**: [238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

**Difficulty**: Medium

**Topics**: Array, Prefix Sum

---

## Problem Statement

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in **O(n)** time and **without using the division operation**.

### Examples

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Explanation:
- answer[0] = 2*3*4 = 24
- answer[1] = 1*3*4 = 12
- answer[2] = 1*2*4 = 8
- answer[3] = 1*2*3 = 6
```

**Example 2:**
```
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

### Constraints
- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- The product of any prefix or suffix is guaranteed to fit in a 32-bit integer

**Follow-up**: Can you solve it in `O(1)` extra space complexity? (Output array doesn't count)

---

## Approach 1: Brute Force (Nested Loop)

### Intuition
For each position, calculate product of all other elements by iterating through array.

### Algorithm
1. For each index i
2. Multiply all elements except nums[i]
3. Store result in answer[i]

### Implementation

```javascript
/**
 * Brute Force - O(n²)
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
    const n = nums.length;
    const answer = new Array(n);
    
    for (let i = 0; i < n; i++) {
        let product = 1;
        
        // Multiply all elements except nums[i]
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                product *= nums[j];
            }
        }
        
        answer[i] = product;
    }
    
    return answer;
}

// Test
console.log(productExceptSelf([1,2,3,4])); // [24,12,8,6]
console.log(productExceptSelf([-1,1,0,-3,3])); // [0,0,9,0,0]
```

### Complexity Analysis
- **Time Complexity**: `O(n²)` - Nested loops
- **Space Complexity**: `O(1)` - Excluding output array

### Why is this bad?
- Quadratic time - too slow for large arrays
- Redundant calculations

---

## Approach 2: Using Division (Not Allowed!)

### Intuition
Calculate total product, then divide by each element. **But division is NOT allowed!**

### Implementation

```javascript
/**
 * Division Approach (NOT ALLOWED by constraints!)
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelfDivision(nums) {
    const n = nums.length;
    const answer = new Array(n);
    
    // Calculate total product
    let totalProduct = 1;
    let zeroCount = 0;
    
    for (const num of nums) {
        if (num === 0) {
            zeroCount++;
        } else {
            totalProduct *= num;
        }
    }
    
    // Handle zeros
    if (zeroCount > 1) {
        // Multiple zeros -> all products are 0
        return new Array(n).fill(0);
    } else if (zeroCount === 1) {
        // One zero -> only that position has non-zero product
        for (let i = 0; i < n; i++) {
            answer[i] = nums[i] === 0 ? totalProduct : 0;
        }
    } else {
        // No zeros -> divide total by each element
        for (let i = 0; i < n; i++) {
            answer[i] = totalProduct / nums[i];
        }
    }
    
    return answer;
}

// Test
console.log(productExceptSelfDivision([1,2,3,4])); // [24,12,8,6]
```

### Why we can't use this?
- ❌ Division operation is forbidden by problem constraints
- ❌ Fails when zeros are present
- Good to mention in interview, but implement the proper solution

---

## Approach 3: Prefix and Suffix Products (Good) ✅

### Intuition
For each position i:
- `answer[i]` = (product of all elements before i) × (product of all elements after i)
- Use two arrays: `prefix` and `suffix`

### Algorithm
1. Create prefix array: `prefix[i]` = product of nums[0...i-1]
2. Create suffix array: `suffix[i]` = product of nums[i+1...n-1]
3. `answer[i] = prefix[i] × suffix[i]`

### Implementation

```javascript
/**
 * Prefix and Suffix Arrays
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
    const n = nums.length;
    
    // Prefix products
    const prefix = new Array(n);
    prefix[0] = 1; // No elements before index 0
    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] * nums[i - 1];
    }
    
    // Suffix products
    const suffix = new Array(n);
    suffix[n - 1] = 1; // No elements after last index
    for (let i = n - 2; i >= 0; i--) {
        suffix[i] = suffix[i + 1] * nums[i + 1];
    }
    
    // Combine
    const answer = new Array(n);
    for (let i = 0; i < n; i++) {
        answer[i] = prefix[i] * suffix[i];
    }
    
    return answer;
}

// Test
console.log(productExceptSelf([1,2,3,4])); // [24,12,8,6]
console.log(productExceptSelf([-1,1,0,-3,3])); // [0,0,9,0,0]
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Three passes
- **Space Complexity**: `O(n)` - Two extra arrays

### Can we optimize space to O(1)?

---

## Approach 4: Single Array with Two Passes (Optimal) ✅

### Intuition
Instead of storing prefix and suffix separately, build the answer array in two passes:
1. First pass: Build prefix products in answer array
2. Second pass: Multiply by suffix products (using a variable)

### Algorithm
1. **Left pass**: Store prefix products in answer array
2. **Right pass**: Multiply answer by suffix products

### Implementation

```javascript
/**
 * Optimal - O(n) time, O(1) space
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
    const n = nums.length;
    const answer = new Array(n);
    
    // Left pass: Fill answer with prefix products
    answer[0] = 1; // No elements to the left of index 0
    for (let i = 1; i < n; i++) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }
    
    // Right pass: Multiply by suffix products
    let rightProduct = 1; // No elements to the right of last index
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return answer;
}

// Test
console.log(productExceptSelf([1,2,3,4])); // [24,12,8,6]
console.log(productExceptSelf([-1,1,0,-3,3])); // [0,0,9,0,0]
console.log(productExceptSelf([2,3,4,5])); // [60,40,30,24]
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Two passes
- **Space Complexity**: `O(1)` - Only output array (doesn't count per problem)

### Why is this optimal?
- ✅ Linear time
- ✅ Constant space (excluding output)
- ✅ No division operation
- ✅ Two simple passes

---

## Visual Example

```
Input: nums = [1, 2, 3, 4]

Step 1: Left Pass (Prefix Products)
────────────────────────────────────
i=0: answer[0] = 1               (no elements to left)
i=1: answer[1] = 1 * nums[0] = 1 * 1 = 1
i=2: answer[2] = 1 * nums[1] = 1 * 2 = 2
i=3: answer[3] = 2 * nums[2] = 2 * 3 = 6

After left pass: answer = [1, 1, 2, 6]

Step 2: Right Pass (Multiply by Suffix)
────────────────────────────────────
rightProduct = 1 (start)

i=3: answer[3] = 6 * 1 = 6
     rightProduct = 1 * nums[3] = 1 * 4 = 4

i=2: answer[2] = 2 * 4 = 8
     rightProduct = 4 * nums[2] = 4 * 3 = 12

i=1: answer[1] = 1 * 12 = 12
     rightProduct = 12 * nums[1] = 12 * 2 = 24

i=0: answer[0] = 1 * 24 = 24
     rightProduct = 24 * nums[0] = 24 * 1 = 24

Final answer = [24, 12, 8, 6] ✓
```

### Another Way to Visualize

```
nums = [1, 2, 3, 4]

For each position, product = left product × right product

Position 0: left = 1,     right = 2*3*4 = 24  → 1 * 24 = 24
Position 1: left = 1,     right = 3*4 = 12    → 1 * 12 = 12
Position 2: left = 1*2,   right = 4 = 4       → 2 * 4 = 8
Position 3: left = 1*2*3, right = 1           → 6 * 1 = 6

Result: [24, 12, 8, 6]
```

---

## Edge Cases

```javascript
// Minimum size (2 elements)
console.log(productExceptSelf([1, 2])); // [2, 1]

// Contains zeros
console.log(productExceptSelf([0, 1, 2])); // [2, 0, 0]
console.log(productExceptSelf([0, 0])); // [0, 0]
console.log(productExceptSelf([1, 0, 3])); // [0, 3, 0]

// Negative numbers
console.log(productExceptSelf([-1, -2, -3])); // [-6, -3, -2]

// Mix of positive, negative, and zero
console.log(productExceptSelf([-1, 1, 0, -3, 3])); // [0, 0, 9, 0, 0]

// All ones
console.log(productExceptSelf([1, 1, 1, 1])); // [1, 1, 1, 1]
```

---

## Common Mistakes

### ❌ Mistake 1: Using division
```javascript
// Problem says "without division"!
answer[i] = totalProduct / nums[i]; // NOT ALLOWED
```

### ❌ Mistake 2: Not handling zeros correctly
```javascript
// This will give wrong results with zeros
let product = 1;
for (let i = 0; i < n; i++) product *= nums[i];
// If any num is 0, product becomes 0!
```

### ❌ Mistake 3: Wrong initialization
```javascript
// Wrong: prefix[0] = nums[0]
prefix[0] = 1; // Correct: no elements before index 0
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Can I use division? No? Okay, I'll use prefix/suffix products"

2. **Brute Force**: "Naive approach would be O(n²) - calculate product for each position"

3. **Division mention**: "With division, we could do totalProduct / nums[i], but that's not allowed"

4. **Optimization**: "I can use prefix and suffix products - O(n) time, O(n) space"

5. **Further optimization**: "For O(1) space, I'll build answer array with two passes"

### Follow-up Questions:

**Q: What if division was allowed?**
A: Calculate total product once, then divide by each element. But need to handle zeros specially.

**Q: Can you do it in one pass?**
A: No, we need at least two passes - one for left products, one for right products.

**Q: What if array is very large and doesn't fit in memory?**
A: Could use streaming approach with external storage, but still need two passes.

---

## Related Problems

- [152. Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)
- [628. Maximum Product of Three Numbers](https://leetcode.com/problems/maximum-product-of-three-numbers/)
- [1352. Product of the Last K Numbers](https://leetcode.com/problems/product-of-the-last-k-numbers/)

---

## Key Takeaways

✅ Prefix and suffix products solve "all except self" problems  
✅ Use two passes to achieve O(1) space  
✅ First pass: accumulate left products  
✅ Second pass: multiply by right products  
✅ No division needed!  

**Pattern**: Product of all except current → Prefix × Suffix technique!
