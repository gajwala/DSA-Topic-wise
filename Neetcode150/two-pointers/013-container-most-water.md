# 13. Container With Most Water

**LeetCode Link**: [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

**Difficulty**: Medium

**Topics**: Array, Two Pointers, Greedy

---

## Problem Statement

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

**Note:** You may not slant the container.

### Examples

**Example 1:**
```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: Lines at index 1 and 8 form container with area = min(8,7) * (8-1) = 7 * 7 = 49
```

**Example 2:**
```
Input: height = [1,1]
Output: 1
```

### Constraints
- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`

---

## Approach 1: Brute Force

```javascript
function maxArea(height) {
    let maxWater = 0;
    
    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            const width = j - i;
            const minHeight = Math.min(height[i], height[j]);
            const area = width * minHeight;
            maxWater = Math.max(maxWater, area);
        }
    }
    
    return maxWater;
}
```

**Complexity**: O(n²) - Too slow for large inputs!

---

## Approach 2: Two Pointers (Optimal!) ✅

### Intuition
Start with widest container (pointers at both ends). Move the pointer with smaller height inward, as moving the taller one can't increase area.

**Key Insight**: Area = width × min(height). To maximize:
- Width decreases as we move pointers
- Must increase height to compensate
- Always move the shorter line (only way height can increase)

### Algorithm
1. Left pointer at start, right pointer at end
2. Calculate area with current pointers
3. Move pointer with smaller height
4. Track maximum area

### Implementation

```javascript
/**
 * Two Pointers - O(n) Optimal
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    let maxWater = 0;
    let left = 0;
    let right = height.length - 1;
    
    while (left < right) {
        // Calculate area
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const area = width * minHeight;
        
        maxWater = Math.max(maxWater, area);
        
        // Move pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

// Test
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49
console.log(maxArea([1,1])); // 1
console.log(maxArea([4,3,2,1,4])); // 16
console.log(maxArea([1,2,1])); // 2
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Single pass
- **Space Complexity**: `O(1)` - Only two pointers

### Why this works?
- Start with maximum width
- Moving shorter line is the ONLY way to potentially find taller line
- Moving taller line ALWAYS decreases area (width decreases, height stays same or decreases)

---

## Visual Example

```
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]

Step 1: L=0, R=8
        L                       R
        1  8  6  2  5  4  8  3  7
        |
        └───────────────────────┘
Area = 8 * min(1, 7) = 8 * 1 = 8
Move left (1 < 7)

Step 2: L=1, R=8
           L                    R
        1  8  6  2  5  4  8  3  7
           |                    |
           └────────────────────┘
Area = 7 * min(8, 7) = 7 * 7 = 49 ✓ (Maximum!)
Move right (8 > 7)

Step 3: L=1, R=7
           L                 R
        1  8  6  2  5  4  8  3  7
Area = 6 * min(8, 3) = 6 * 3 = 18
Move right (8 > 3)

... Continue until left meets right

Maximum area = 49
```

---

## Why Move Shorter Line?

```
Current: height[left] = 3, height[right] = 7

If we move right (taller line):
  New height[right] could be:
    - Taller (7+): Still limited by left=3, area DECREASES (width↓)
    - Same (7): Limited by left=3, area DECREASES (width↓)
    - Shorter (<7): Limited by new right, area DECREASES (width↓, height↓)
  ❌ All cases: area decreases or stays same

If we move left (shorter line):
  New height[left] could be:
    - Taller (>3): Might increase area if new height > 3
    - Same or shorter: Area decreases, but this is our best shot
  ✅ Only chance to increase area!
```

---

## Edge Cases

```javascript
// Minimum size
console.log(maxArea([1, 2])); // 1

// All same height
console.log(maxArea([5, 5, 5, 5])); // 15 (width=3, height=5)

// Increasing heights
console.log(maxArea([1, 2, 3, 4, 5])); // 6 (indices 0 and 4)

// Decreasing heights
console.log(maxArea([5, 4, 3, 2, 1])); // 6 (indices 0 and 4)

// Peak in middle
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Height array represents vertical lines. Find max area between any two lines."

2. **Brute Force**: "Check all pairs - O(n²)"

3. **Optimization**: "Two pointers from both ends. Move shorter line inward."

4. **Why it works**: "Moving shorter line is only way to potentially increase area"

5. **Greedy choice**: "Always move the limiting factor (shorter line)"

### Follow-up Questions:

**Q: What if we want to find the actual indices?**
```javascript
function maxAreaWithIndices(height) {
    let maxWater = 0;
    let result = [0, 0];
    let left = 0, right = height.length - 1;
    
    while (left < right) {
        const area = (right - left) * Math.min(height[left], height[right]);
        
        if (area > maxWater) {
            maxWater = area;
            result = [left, right];
        }
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return { maxArea: maxWater, indices: result };
}
```

**Q: What if there are duplicate heights?**
A: Algorithm still works - moves either pointer when equal.

---

## Related Problems

- [42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)
- [84. Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

---

## Key Takeaways

✅ Two pointers optimal for container problems  
✅ Greedy choice: move shorter line  
✅ Area = width × min(height)  
✅ Start with maximum width  
✅ O(n) time, O(1) space  

**Pattern**: Maximize area with constraints → Two pointers + greedy!
