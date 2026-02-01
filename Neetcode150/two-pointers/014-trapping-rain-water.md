# 14. Trapping Rain Water

**LeetCode Link**: [42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

**Difficulty**: Hard

**Topics**: Array, Two Pointers, Dynamic Programming, Stack

---

## Problem Statement

Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

### Examples

**Example 1:**
```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: 6 units of water (blue section) are trapped.
```

**Example 2:**
```
Input: height = [4,2,0,3,2,5]
Output: 9
```

### Constraints
- `n == height.length`
- `1 <= n <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

---

## Visual Understanding

```
height = [0,1,0,2,1,0,1,3,2,1,2,1]

Elevation:
        █
  █ ~ ~ █ █ ~ ~ █
█ █ ~ █ █ █ ~ █ █ ~ █ █ ~ █
0 1 0 2 1 0 1 3 2 1 2 1

Water trapped (~ marks):
Index 2: 1 unit (bounded by 1 and 2)
Index 4: 1 unit (bounded by 2 and 3)
Index 5: 2 units (bounded by 2 and 3)
Index 6: 1 unit (bounded by 2 and 3)
Index 9: 1 unit (bounded by 3 and 2)

Total: 6 units
```

---

## Approach 1: Brute Force

### Intuition
For each position, find max height on left and right. Water level = min(leftMax, rightMax) - height[i].

```javascript
function trap(height) {
    let total = 0;
    
    for (let i = 0; i < height.length; i++) {
        // Find max height on left
        let leftMax = 0;
        for (let j = 0; j <= i; j++) {
            leftMax = Math.max(leftMax, height[j]);
        }
        
        // Find max height on right
        let rightMax = 0;
        for (let j = i; j < height.length; j++) {
            rightMax = Math.max(rightMax, height[j]);
        }
        
        // Water at this position
        total += Math.min(leftMax, rightMax) - height[i];
    }
    
    return total;
}
```

**Complexity**: O(n²) - Too slow!

---

## Approach 2: Precompute Max Heights

```javascript
function trap(height) {
    const n = height.length;
    if (n === 0) return 0;
    
    // Precompute left max
    const leftMax = new Array(n);
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }
    
    // Precompute right max
    const rightMax = new Array(n);
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }
    
    // Calculate water
    let total = 0;
    for (let i = 0; i < n; i++) {
        total += Math.min(leftMax[i], rightMax[i]) - height[i];
    }
    
    return total;
}
```

**Complexity**: O(n) time, O(n) space - Better but uses extra space!

---

## Approach 3: Two Pointers (Optimal!) ✅

### Intuition
Use two pointers. Water level at position determined by the SMALLER of the two max heights. Track leftMax and rightMax as we go.

**Key Insight**: If leftMax < rightMax, water at left position is determined by leftMax (regardless of what's on the right).

### Algorithm
1. Left and right pointers at ends
2. Track leftMax and rightMax
3. Move pointer with smaller max height
4. Calculate water at that position

### Implementation

```javascript
/**
 * Two Pointers - O(n) time, O(1) space
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
    if (height.length === 0) return 0;
    
    let left = 0;
    let right = height.length - 1;
    let leftMax = height[left];
    let rightMax = height[right];
    let water = 0;
    
    while (left < right) {
        if (leftMax < rightMax) {
            // Water at left determined by leftMax
            left++;
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
        } else {
            // Water at right determined by rightMax
            right--;
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
        }
    }
    
    return water;
}

// Test
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log(trap([4,2,0,3,2,5])); // 9
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Single pass
- **Space Complexity**: `O(1)` - Only a few variables

---

## Why Two Pointers Works

```
Key Idea: Water level determined by MINIMUM of left/right max heights

If leftMax < rightMax:
  Water at left position = leftMax - height[left]
  Why? Because we KNOW there's a taller wall on the right (rightMax)
  Even if there's something taller further right, doesn't matter!
  leftMax is the limiting factor.

Similarly, if rightMax < leftMax:
  Water at right position = rightMax - height[right]
  rightMax is the limiting factor.
```

---

## Step-by-Step Example

```
height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

Initial:
L                                           R
0  1  0  2  1  0  1  3  2  1  2  1
leftMax = 0, rightMax = 1

Step 1: leftMax(0) < rightMax(1)
Move left: L=1
leftMax = max(0, 1) = 1
water += 1 - 1 = 0

Step 2: leftMax(1) = rightMax(1)
Move right: R=10
rightMax = max(1, 2) = 2
water += 2 - 2 = 0

Step 3: leftMax(1) < rightMax(2)
Move left: L=2
leftMax = max(1, 0) = 1
water += 1 - 0 = 1 ✓

... Continue until left meets right

Total water = 6
```

---

## Approach 4: Stack (Alternative)

```javascript
function trapStack(height) {
    const stack = [];
    let water = 0;
    
    for (let i = 0; i < height.length; i++) {
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const top = stack.pop();
            
            if (stack.length === 0) break;
            
            const distance = i - stack[stack.length - 1] - 1;
            const boundedHeight = Math.min(
                height[i],
                height[stack[stack.length - 1]]
            ) - height[top];
            
            water += distance * boundedHeight;
        }
        
        stack.push(i);
    }
    
    return water;
}
```

**Complexity**: O(n) time, O(n) space

---

## Edge Cases

```javascript
// No water trapped
console.log(trap([3, 2, 1])); // 0 (decreasing)
console.log(trap([1, 2, 3])); // 0 (increasing)

// Single valley
console.log(trap([3, 0, 3])); // 3

// Multiple valleys
console.log(trap([3, 0, 2, 0, 4])); // 7

// All zeros
console.log(trap([0, 0, 0])); // 0

// Flat middle
console.log(trap([3, 1, 1, 1, 3])); // 8
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Water trapped between elevation bars. Width of each bar is 1."

2. **Brute Force**: "For each position, find leftMax and rightMax - O(n²)"

3. **Optimize**: "Precompute max arrays - O(n) time, O(n) space"

4. **Best**: "Two pointers - O(n) time, O(1) space"

5. **Key insight**: "Water at position determined by min(leftMax, rightMax)"

### Follow-up Questions:

**Q: What if we want to show which positions trap water?**
```javascript
function trapWithPositions(height) {
    const positions = [];
    // ... same two pointer logic
    // When adding water, push index to positions
    return { total: water, positions };
}
```

**Q: What if bars have different widths?**
A: Problem becomes more complex - need to consider widths in calculation.

---

## Related Problems

- [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
- [407. Trapping Rain Water II](https://leetcode.com/problems/trapping-rain-water-ii/)
- [84. Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

---

## Key Takeaways

✅ Two pointers achieve O(1) space  
✅ Water level = min(leftMax, rightMax) - height  
✅ Move pointer with smaller max height  
✅ Stack approach also works but uses O(n) space  
✅ Key insight: smaller max determines water level  

**Pattern**: Trapping problems → Two pointers tracking max values!

**Two Pointers Complete! (5/5) ✅**
