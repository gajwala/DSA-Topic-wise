# 26. Car Fleet

**LeetCode Link**: [853. Car Fleet](https://leetcode.com/problems/car-fleet/)

**Difficulty**: Medium

**Topics**: Array, Stack, Sorting, Monotonic Stack

---

## Problem Statement

There are `n` cars going to the same destination along a one-lane road. The destination is `target` miles away.

You are given two integer arrays `position` and `speed`, both of length `n`, where `position[i]` is the position of the `ith` car and `speed[i]` is the speed of the `ith` car (in miles per hour).

A car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed. The faster car will **slow down** to match the slower car's speed. The distance between these two cars is ignored (i.e., they are assumed to have the same position).

A **car fleet** is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.

If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.

Return the **number of car fleets** that will arrive at the destination.

### Examples

**Example 1:**
```
Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
Explanation:
- Car at position 10 reaches target in (12-10)/2 = 1 hour
- Car at position 8 reaches target in (12-8)/4 = 1 hour
  These form a fleet, arriving at 1 hour
- Car at position 0 reaches target in (12-0)/1 = 12 hours (alone)
- Car at position 5 reaches target in (12-5)/1 = 7 hours
- Car at position 3 reaches target in (12-3)/3 = 3 hours
  These form a fleet, arriving at 7 hours
Total: 3 fleets
```

**Example 2:**
```
Input: target = 10, position = [3], speed = [3]
Output: 1
```

**Example 3:**
```
Input: target = 100, position = [0,2,4], speed = [4,2,1]
Output: 1
```

### Constraints
- `n == position.length == speed.length`
- `1 <= n <= 10^5`
- `0 < target <= 10^6`
- `0 <= position[i] < target`
- All values of `position` are unique
- `0 < speed[i] <= 10^6`

---

## Approach: Sort + Stack (Optimal!) ✅

### Intuition
1. Calculate time to reach target for each car
2. Sort by position (closest to target first)
3. Use stack: if car takes longer than car ahead, it's a new fleet

### Implementation

```javascript
/**
 * Sort + Stack - O(n log n)
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
function carFleet(target, position, speed) {
    const n = position.length;
    
    // Create cars with position and time to reach target
    const cars = position.map((pos, i) => ({
        position: pos,
        time: (target - pos) / speed[i]
    }));
    
    // Sort by position (descending - closest to target first)
    cars.sort((a, b) => b.position - a.position);
    
    // Use stack to count fleets
    const stack = [];
    
    for (const car of cars) {
        // If current car takes longer than car ahead, it's a new fleet
        if (stack.length === 0 || car.time > stack[stack.length - 1]) {
            stack.push(car.time);
        }
        // Otherwise, it catches up to the fleet ahead
    }
    
    return stack.length;
}

// Simpler: without stack (just count)
function carFleetSimple(target, position, speed) {
    const n = position.length;
    const cars = [];
    
    for (let i = 0; i < n; i++) {
        cars.push([position[i], (target - position[i]) / speed[i]]);
    }
    
    cars.sort((a, b) => b[0] - a[0]); // Sort by position desc
    
    let fleets = 0;
    let maxTime = 0;
    
    for (const [pos, time] of cars) {
        if (time > maxTime) {
            fleets++;
            maxTime = time;
        }
    }
    
    return fleets;
}

// Test
console.log(carFleet(12, [10,8,0,5,3], [2,4,1,1,3])); // 3
console.log(carFleet(10, [3], [3])); // 1
console.log(carFleet(100, [0,2,4], [4,2,1])); // 1
```

### Complexity Analysis
- **Time Complexity**: `O(n log n)` - Sorting dominates
- **Space Complexity**: `O(n)` - Array for cars

---

## Visual Example

```
target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]

Calculate times:
pos=10: time = (12-10)/2 = 1
pos=8:  time = (12-8)/4 = 1
pos=0:  time = (12-0)/1 = 12
pos=5:  time = (12-5)/1 = 7
pos=3:  time = (12-3)/3 = 3

Sort by position (descending):
[(10,1), (8,1), (5,7), (3,3), (0,12)]

Process:
pos=10, time=1 → New fleet (stack: [1])
pos=8,  time=1 → Same fleet (1 <= 1)
pos=5,  time=7 → New fleet (7 > 1) (stack: [1, 7])
pos=3,  time=3 → Same fleet (3 <= 7)
pos=0,  time=12 → New fleet (12 > 7) (stack: [1, 7, 12])

Fleets: 3 ✓
```

---

## Key Takeaways

✅ Sort by position (closest to target first)  
✅ Calculate time to reach target  
✅ Stack tracks fleet times  
✅ Car forms new fleet if takes longer than car ahead  

**Pattern**: Fleet problems → Sort + monotonic reasoning!
