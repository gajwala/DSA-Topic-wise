# 30. Koko Eating Bananas

**LeetCode Link**: [875. Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)

**Difficulty**: Medium

**Topics**: Array, Binary Search

---

## Problem Statement

Koko loves to eat bananas. There are `n` piles of bananas, the `ith` pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer `k` such that she can eat all the bananas within `h` hours.

### Examples

**Example 1:**
```
Input: piles = [3,6,7,11], h = 8
Output: 4
Explanation: Koko can eat at 4 bananas/hour:
- Hour 1: eat 3 from pile 0
- Hour 2: eat 4 from pile 1 (2 remaining)
- Hour 3: eat 2 from pile 1
- Hour 4: eat 4 from pile 2 (3 remaining)
- Hour 5: eat 3 from pile 2
- Hour 6: eat 4 from pile 3 (7 remaining)
- Hour 7: eat 4 from pile 3 (3 remaining)
- Hour 8: eat 3 from pile 3
Total: 8 hours
```

**Example 2:**
```
Input: piles = [30,11,23,4,20], h = 5
Output: 30
```

**Example 3:**
```
Input: piles = [30,11,23,4,20], h = 6
Output: 23
```

### Constraints
- `1 <= piles.length <= 10^4`
- `piles.length <= h <= 10^9`
- `1 <= piles[i] <= 10^9`

---

## Approach 1: Brute Force

```javascript
function minEatingSpeed(piles, h) {
    const maxPile = Math.max(...piles);
    
    // Try every speed from 1 to max
    for (let k = 1; k <= maxPile; k++) {
        if (canFinish(piles, k, h)) {
            return k;
        }
    }
    
    return maxPile;
}

function canFinish(piles, k, h) {
    let hours = 0;
    for (const pile of piles) {
        hours += Math.ceil(pile / k);
    }
    return hours <= h;
}
```

**Complexity**: O(n * max(piles)) - Too slow!

---

## Approach 2: Binary Search on Answer (Optimal!) ✅

### Intuition
Search space is [1, max(piles)]. Use binary search to find minimum k where Koko can finish in h hours.

### Implementation

```javascript
/**
 * Binary Search on Answer - O(n log m)
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
function minEatingSpeed(piles, h) {
    // Binary search range: [1, max pile size]
    let left = 1;
    let right = Math.max(...piles);
    let result = right;
    
    while (left <= right) {
        const k = Math.floor((left + right) / 2);
        
        // Check if Koko can finish with speed k
        if (canFinish(piles, k, h)) {
            result = k; // Valid speed, try smaller
            right = k - 1;
        } else {
            left = k + 1; // Too slow, need faster
        }
    }
    
    return result;
}

/**
 * Check if Koko can finish all piles with speed k in h hours
 */
function canFinish(piles, k, h) {
    let hoursNeeded = 0;
    
    for (const pile of piles) {
        // Hours to finish this pile: ceil(pile / k)
        hoursNeeded += Math.ceil(pile / k);
        
        // Early exit if already exceeds h
        if (hoursNeeded > h) {
            return false;
        }
    }
    
    return hoursNeeded <= h;
}

// Test
console.log(minEatingSpeed([3,6,7,11], 8)); // 4
console.log(minEatingSpeed([30,11,23,4,20], 5)); // 30
console.log(minEatingSpeed([30,11,23,4,20], 6)); // 23
```

### Complexity Analysis
- **Time Complexity**: `O(n * log m)` where n = piles.length, m = max(piles)
  - Binary search: O(log m) iterations
  - Each check: O(n) to sum hours
- **Space Complexity**: `O(1)` - Only variables

---

## Visual Example

```
piles = [3, 6, 7, 11], h = 8

Search space: k ∈ [1, 11]

Binary Search:
────────────
left=1, right=11, k=6
Hours needed: ceil(3/6) + ceil(6/6) + ceil(7/6) + ceil(11/6)
            = 1 + 1 + 2 + 2 = 6 ≤ 8 ✓
Can finish! Try smaller k
result=6, right=5

left=1, right=5, k=3
Hours: ceil(3/3) + ceil(6/3) + ceil(7/3) + ceil(11/3)
     = 1 + 2 + 3 + 4 = 10 > 8 ✗
Too slow! Need faster
left=4

left=4, right=5, k=4
Hours: ceil(3/4) + ceil(6/4) + ceil(7/4) + ceil(11/4)
     = 1 + 2 + 2 + 3 = 8 ≤ 8 ✓
Can finish! Try smaller k
result=4, right=3

left=4, right=3 → Stop

Answer: 4 ✓
```

---

## Key Insight: Binary Search on Answer

```javascript
// Pattern: "Minimum k such that condition is satisfied"
// Classic "Binary Search on Answer" problem

// Template:
function binarySearchOnAnswer(condition) {
    let left = minPossible;
    let right = maxPossible;
    let result = right;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (condition(mid)) {
            result = mid;
            right = mid - 1; // Try smaller (for minimum)
        } else {
            left = mid + 1; // Need larger
        }
    }
    
    return result;
}
```

---

## Edge Cases

```javascript
// Single pile
console.log(minEatingSpeed([10], 5)); // 2 (can eat 2/hour for 5 hours)

// All piles same size
console.log(minEatingSpeed([5, 5, 5, 5], 4)); // 5

// h equals number of piles (eat entire pile each hour)
console.log(minEatingSpeed([3, 6, 7, 11], 4)); // 11

// h much larger than needed
console.log(minEatingSpeed([3, 6, 7, 11], 100)); // 1

// Large numbers
console.log(minEatingSpeed([1000000000], 2)); // 500000000
```

---

## Common Mistakes

### ❌ Mistake 1: Wrong ceiling calculation
```javascript
// Wrong - integer division loses precision
const hours = pile / k; // 7/4 = 1.75 → loses decimal!

// Correct - use Math.ceil
const hours = Math.ceil(pile / k); // 7/4 → ceil(1.75) = 2 ✓
```

### ❌ Mistake 2: Not considering minimum speed
```javascript
// Wrong - starting from 0
let left = 0; // k=0 doesn't make sense!

// Correct
let left = 1; // Minimum speed is 1 banana/hour
```

### ❌ Mistake 3: Wrong search direction
```javascript
// Wrong - searching for maximum instead of minimum
if (canFinish(piles, k, h)) {
    left = k + 1; // Moving away from answer!
}

// Correct - we want minimum valid k
if (canFinish(piles, k, h)) {
    result = k;
    right = k - 1; // Try smaller k
}
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Koko eats from one pile per hour? Takes entire hour even if pile is small? Yes."

2. **Pattern recognition**: "This is a 'find minimum k that satisfies condition' → Binary search on answer!"

3. **Search space**: "k ranges from 1 to max(piles). Binary search in this range."

4. **Check function**: "For each k, calculate total hours needed. Use Math.ceil(pile/k) per pile."

5. **Complexity**: "O(n log m) where n=piles, m=max(piles)"

### Follow-up Questions:

**Q: What if Koko can eat from multiple piles per hour?**
A: Different problem - becomes knapsack-like scheduling problem

**Q: What if we want maximum speed within budget instead?**
```javascript
function maxEatingSpeed(piles, maxHours) {
    let left = 1;
    let right = Math.max(...piles);
    let result = 1;
    
    while (left <= right) {
        const k = Math.floor((left + right) / 2);
        
        if (canFinish(piles, k, maxHours)) {
            result = k;
            right = k - 1; // Try slower (maximize within limit)
        } else {
            left = k + 1;
        }
    }
    
    return result;
}
```

---

## Related Problems

- [1011. Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)
- [1482. Minimum Number of Days to Make m Bouquets](https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/)
- [2064. Minimized Maximum of Products Distributed to Any Store](https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/)

---

## Key Takeaways

✅ Binary search on answer space, not input array  
✅ Search range: [1, max(piles)]  
✅ Check function: calculate total hours with Math.ceil  
✅ Keep track of minimum valid answer  
✅ O(n log m) optimal solution  

**Pattern**: "Minimum k satisfying condition" → Binary Search on Answer!
