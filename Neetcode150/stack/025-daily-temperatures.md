# 25. Daily Temperatures

**LeetCode Link**: [739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

**Difficulty**: Medium

**Topics**: Array, Stack, Monotonic Stack

---

## Problem Statement

Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `ith` day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.

### Examples

**Example 1:**
```
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
```

**Example 2:**
```
Input: temperatures = [30,40,50,60,70]
Output: [1,1,1,1,0]
```

**Example 3:**
```
Input: temperatures = [30,60,90]
Output: [1,1,0]
```

### Constraints
- `1 <= temperatures.length <= 10^5`
- `30 <= temperatures[i] <= 100`

---

## Approach 1: Brute Force

```javascript
function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const answer = new Array(n).fill(0);
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (temperatures[j] > temperatures[i]) {
                answer[i] = j - i;
                break;
            }
        }
    }
    
    return answer;
}
```

**Complexity**: O(n²) - Too slow!

---

## Approach 2: Monotonic Stack (Optimal!) ✅

### Intuition
Use monotonic decreasing stack. Store indices. When warmer day found, pop and calculate days.

### Implementation

```javascript
/**
 * Monotonic Stack - O(n)
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const answer = new Array(n).fill(0);
    const stack = []; // Store indices
    
    for (let i = 0; i < n; i++) {
        // While current temp is warmer than stack top
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            answer[prevIndex] = i - prevIndex;
        }
        
        stack.push(i);
    }
    
    return answer;
}

// Test
console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));
// [1,1,4,2,1,1,0,0]

console.log(dailyTemperatures([30,40,50,60,70]));
// [1,1,1,1,0]
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Each element pushed/popped once
- **Space Complexity**: `O(n)` - Stack

---

## Visual Example

```
temperatures = [73, 74, 75, 71, 69, 72, 76, 73]

i=0: temp=73
Stack: [0]
answer: [0,0,0,0,0,0,0,0]

i=1: temp=74 > 73
Pop 0: answer[0] = 1 - 0 = 1
Stack: [1]
answer: [1,0,0,0,0,0,0,0]

i=2: temp=75 > 74
Pop 1: answer[1] = 2 - 1 = 1
Stack: [2]
answer: [1,1,0,0,0,0,0,0]

i=3: temp=71 < 75
Stack: [2, 3]
answer: [1,1,0,0,0,0,0,0]

... Continue ...

Final: [1,1,4,2,1,1,0,0]
```

---

## Key Takeaways

✅ Monotonic stack for "next greater" problems  
✅ Store indices, not values  
✅ Pop when condition met  
✅ O(n) time - each element processed once  

**Pattern**: Next greater element → Monotonic stack!
