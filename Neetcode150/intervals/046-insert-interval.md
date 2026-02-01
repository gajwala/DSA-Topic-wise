# 46. Insert Interval

**LeetCode Link**: [57. Insert Interval](https://leetcode.com/problems/insert-interval/)

**Difficulty**: Medium

**Topics**: Array, Intervals

---

## Problem Statement

You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [starti, endi]` represent the start and the end of the `ith` interval and `intervals` is sorted in ascending order by `starti`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.

Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `starti` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return `intervals` after the insertion.

### Examples

**Example 1:**
```
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

**Example 2:**
```
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
```

### Constraints
- `0 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 10^5`
- `intervals` is sorted by `starti` in **ascending** order
- `newInterval.length == 2`
- `0 <= start <= end <= 10^5`

---

## Approach: One Pass (Optimal!) ✅

### Intuition
Three phases: add intervals before newInterval, merge overlapping intervals with newInterval, add intervals after newInterval.

### Implementation

```javascript
/**
 * One Pass - O(n) time, O(n) space
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insert(intervals, newInterval) {
    const result = [];
    let i = 0;
    const n = intervals.length;
    
    // Phase 1: Add all intervals that come before newInterval (no overlap)
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }
    
    // Phase 2: Merge all overlapping intervals with newInterval
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);
    
    // Phase 3: Add all intervals that come after newInterval (no overlap)
    while (i < n) {
        result.push(intervals[i]);
        i++;
    }
    
    return result;
}

// Test
console.log(insert([[1,3],[6,9]], [2,5])); 
// [[1,5],[6,9]]

console.log(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8])); 
// [[1,2],[3,10],[12,16]]
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Single pass through intervals
- **Space Complexity**: `O(n)` - Result array

---

## Visual Example

```
intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]]
newInterval = [4,8]

Phase 1: Add intervals before newInterval
─────────────────────────────────────────
[1,2].end=2 < [4,8].start=4 ✓
Add [1,2]
result = [[1,2]]

[3,5].end=5 >= [4,8].start=4 ✗
Stop Phase 1

Phase 2: Merge overlapping intervals
─────────────────────────────────────
[3,5]: overlaps with [4,8]
  newInterval = [min(4,3), max(8,5)] = [3,8]

[6,7]: overlaps with [3,8]
  newInterval = [min(3,6), max(8,7)] = [3,8]

[8,10]: overlaps with [3,8]
  newInterval = [min(3,8), max(8,10)] = [3,10]

[12,16].start=12 > [3,10].end=10 ✗
Stop Phase 2
Add [3,10]
result = [[1,2],[3,10]]

Phase 3: Add intervals after newInterval
─────────────────────────────────────────
Add [12,16]
result = [[1,2],[3,10],[12,16]] ✓
```

---

## Overlap Condition

```javascript
// Two intervals overlap if:
// interval1.start <= interval2.end AND interval2.start <= interval1.end

// For this problem:
// intervals[i] overlaps with newInterval if:
intervals[i][0] <= newInterval[1] && intervals[i][1] >= newInterval[0]

// Since intervals are sorted, we can simplify:
// - Already passed intervals where intervals[i][1] < newInterval[0]
// - Check: intervals[i][0] <= newInterval[1]
```

---

## Edge Cases

```javascript
// Empty intervals
console.log(insert([], [5,7])); // [[5,7]]

// Insert at beginning
console.log(insert([[3,5],[8,10]], [1,2])); // [[1,2],[3,5],[8,10]]

// Insert at end
console.log(insert([[1,2],[3,5]], [8,10])); // [[1,2],[3,5],[8,10]]

// Insert in middle, no overlap
console.log(insert([[1,2],[6,9]], [3,5])); // [[1,2],[3,5],[6,9]]

// Merge all intervals
console.log(insert([[1,2],[3,5],[6,7]], [0,10])); // [[0,10]]

// Single existing interval, merge
console.log(insert([[1,5]], [2,3])); // [[1,5]]

// Single existing interval, no overlap before
console.log(insert([[3,5]], [1,2])); // [[1,2],[3,5]]

// Single existing interval, no overlap after
console.log(insert([[1,2]], [3,5])); // [[1,2],[3,5]]

// Adjacent intervals (touching but not overlapping)
console.log(insert([[1,3],[6,9]], [4,5])); // [[1,3],[4,5],[6,9]]
```

---

## Common Mistakes

### ❌ Mistake 1: Wrong overlap condition
```javascript
// Wrong - misses edge cases
if (intervals[i][0] < newInterval[1] && intervals[i][1] > newInterval[0]) {
    // Misses cases where intervals touch
}

// Correct - includes touching intervals
if (intervals[i][0] <= newInterval[1] && intervals[i][1] >= newInterval[0]) {
    // Merges overlapping intervals
}
```

### ❌ Mistake 2: Not updating both start and end
```javascript
// Wrong - only updates end
while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    // Missing: newInterval[0] update!
    i++;
}

// Correct - updates both
while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
}
```

### ❌ Mistake 3: Forgetting to add merged interval
```javascript
// Wrong - merges but doesn't add
while (i < n && intervals[i][0] <= newInterval[1]) {
    // ... merge logic
    i++;
}
// Missing: result.push(newInterval)!

// Correct
while (i < n && intervals[i][0] <= newInterval[1]) {
    // ... merge logic
    i++;
}
result.push(newInterval); // Add merged interval
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Intervals sorted by start? Non-overlapping? Need to merge if overlap? Yes."

2. **Approach**: "Three phases:
   - Add intervals before newInterval
   - Merge overlapping intervals
   - Add intervals after newInterval"

3. **Key insight**: "Use two pointers to check overlap: intervals[i][0] <= newInterval[1]"

4. **Complexity**: "O(n) time single pass, O(n) space for result"

### Follow-up Questions:

**Q: What if intervals are not sorted?**
```javascript
function insertUnsorted(intervals, newInterval) {
    // Sort first
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Then use same logic
    return insert(intervals, newInterval);
}
```

**Q: What if we need to insert multiple intervals?**
```javascript
function insertMultiple(intervals, newIntervals) {
    for (const newInterval of newIntervals) {
        intervals = insert(intervals, newInterval);
    }
    return intervals;
}

// Better approach: merge all new intervals first, then insert
function insertMultipleBetter(intervals, newIntervals) {
    // Merge all new intervals
    newIntervals.sort((a, b) => a[0] - b[0]);
    const merged = mergeIntervals(newIntervals);
    
    // Insert each merged interval
    for (const interval of merged) {
        intervals = insert(intervals, interval);
    }
    
    return intervals;
}
```

**Q: Can you do it in-place?**
```javascript
function insertInPlace(intervals, newInterval) {
    let i = 0;
    
    // Find insertion point
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        i++;
    }
    
    // Merge overlapping
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        intervals.splice(i, 1); // Remove merged interval
    }
    
    // Insert merged interval
    intervals.splice(i, 0, newInterval);
    
    return intervals;
}
// Note: splice is O(n), so overall still O(n)
```

---

## Related Problems

- [56. Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- [435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- [252. Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)
- [253. Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)

---

## Key Takeaways

✅ Three phases: before, merge, after  
✅ Overlap condition: intervals[i][0] <= newInterval[1]  
✅ Update both start and end during merge  
✅ O(n) time single pass solution  
✅ Use <= for overlap, not just <  

**Pattern**: Insert interval → Three-phase processing!
