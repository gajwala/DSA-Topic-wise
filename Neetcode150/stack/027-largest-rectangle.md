# 27. Largest Rectangle in Histogram

**LeetCode Link**: [84. Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

**Difficulty**: Hard

**Topics**: Array, Stack, Monotonic Stack

---

## Problem Statement

Given an array of integers `heights` representing the histogram's bar height where the width of each bar is `1`, return the area of the largest rectangle in the histogram.

### Examples

**Example 1:**
```
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The largest rectangle is formed with bars at indices 2-3, height 5, width 2.
```

**Example 2:**
```
Input: heights = [2,4]
Output: 4
```

### Constraints
- `1 <= heights.length <= 10^5`
- `0 <= heights[i] <= 10^4`

---

## Approach 1: Brute Force

```javascript
function largestRectangleArea(heights) {
    let maxArea = 0;
    
    for (let i = 0; i < heights.length; i++) {
        let minHeight = heights[i];
        for (let j = i; j < heights.length; j++) {
            minHeight = Math.min(minHeight, heights[j]);
            const area = minHeight * (j - i + 1);
            maxArea = Math.max(maxArea, area);
        }
    }
    
    return maxArea;
}
```

**Complexity**: O(n²) - Too slow!

---

## Approach 2: Monotonic Stack (Optimal!) ✅

### Intuition
Use monotonic increasing stack. When smaller height found, calculate area with popped height.

### Implementation

```javascript
/**
 * Monotonic Stack - O(n)
 * @param {number[]} heights
 * @return {number}
 */
function largestRectangleArea(heights) {
    const stack = []; // Store indices
    let maxArea = 0;
    
    for (let i = 0; i < heights.length; i++) {
        // While current height is smaller than stack top
        while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
            const heightIndex = stack.pop();
            const height = heights[heightIndex];
            
            // Width: from next element in stack to current
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            const area = height * width;
            
            maxArea = Math.max(maxArea, area);
        }
        
        stack.push(i);
    }
    
    // Process remaining bars in stack
    while (stack.length > 0) {
        const heightIndex = stack.pop();
        const height = heights[heightIndex];
        const width = stack.length === 0 ? heights.length : heights.length - stack[stack.length - 1] - 1;
        const area = height * width;
        
        maxArea = Math.max(maxArea, area);
    }
    
    return maxArea;
}

// Test
console.log(largestRectangleArea([2,1,5,6,2,3])); // 10
console.log(largestRectangleArea([2,4])); // 4
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Each element pushed/popped once
- **Space Complexity**: `O(n)` - Stack

---

## Visual Example

```
heights = [2, 1, 5, 6, 2, 3]

Visual:
        6
      5 █
      █ █
      █ █   3
  2   █ █ 2 █
  █ 1 █ █ █ █
  
Largest rectangle: height=5, width=2, area=10
(Can extend height 5 for 2 bars)
```

---

## Key Takeaways

✅ Monotonic increasing stack  
✅ Calculate area when smaller height found  
✅ Width = distance between boundaries  
✅ O(n) optimal solution  

**Pattern**: Histogram problems → Monotonic stack!

**Stack Complete! (7/7) ✅**
