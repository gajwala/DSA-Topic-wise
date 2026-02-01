# 20. Sliding Window Maximum

**LeetCode Link**: [239. Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)

**Difficulty**: Hard

**Topics**: Array, Queue, Sliding Window, Heap, Monotonic Queue

---

## Problem Statement

You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

### Examples

**Example 1:**
```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

### Constraints
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

---

## Approach: Monotonic Deque (Optimal!) ✅

### Intuition
Use deque to maintain indices of potential maximum elements in decreasing order.

### Implementation

```javascript
/**
 * Monotonic Deque - O(n)
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices
    
    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside window
        while (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
        }
        
        // Remove smaller elements (they'll never be max)
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // Add to result when window is full
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
}

// Test
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]
console.log(maxSlidingWindow([1], 1)); // [1]
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Each element added/removed once
- **Space Complexity**: `O(k)` - Deque size at most k

---

## Key Takeaways

✅ Monotonic deque maintains potential maximums  
✅ Remove out-of-window and smaller elements  
✅ Front of deque is always maximum  
✅ O(n) optimal solution  

**Pattern**: Sliding window maximum → Monotonic deque!

**Sliding Window Complete! (6/6) ✅**
