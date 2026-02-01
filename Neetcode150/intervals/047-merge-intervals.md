# 47. Merge Intervals

**LeetCode Link**: [56. Merge Intervals](https://leetcode.com/problems/merge-intervals/)

**Difficulty**: Medium

**Topics**: Array, Sorting, Intervals

---

## Problem Statement

Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

### Examples

**Example 1:**
```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
```

**Example 2:**
```
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

### Constraints
- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 10^4`

---

## Approach: Sort and Merge (Optimal!) ✅

### Intuition
Sort intervals by start time. Then merge consecutive overlapping intervals by comparing current end with next start.

### Implementation

```javascript
/**
 * Sort and Merge - O(n log n) time, O(n) space
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
    if (intervals.length <= 1) {
        return intervals;
    }
    
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    const result = [];
    let current = intervals[0];
    
    for (let i = 1; i < intervals.length; i++) {
        // Check if current overlaps with intervals[i]
        if (current[1] >= intervals[i][0]) {
            // Merge: extend current interval
            current[1] = Math.max(current[1], intervals[i][1]);
        } else {
            // No overlap: add current to result, move to next
            result.push(current);
            current = intervals[i];
        }
    }
    
    // Don't forget to add the last interval
    result.push(current);
    
    return result;
}

// Alternative: Using result array directly
function mergeAlt(intervals) {
    if (intervals.length <= 1) return intervals;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    const result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const lastMerged = result[result.length - 1];
        const current = intervals[i];
        
        if (lastMerged[1] >= current[0]) {
            // Merge
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            // No overlap
            result.push(current);
        }
    }
    
    return result;
}

// Test
console.log(merge([[1,3],[2,6],[8,10],[15,18]])); 
// [[1,6],[8,10],[15,18]]

console.log(merge([[1,4],[4,5]])); 
// [[1,5]]
```

### Complexity Analysis
- **Time Complexity**: `O(n log n)` - Sorting dominates
- **Space Complexity**: `O(n)` - Result array (or O(log n) for sort if in-place)

---

## Visual Example

```
intervals = [[1,3],[2,6],[8,10],[15,18]]

Step 1: Sort by start time (already sorted)
[1,3], [2,6], [8,10], [15,18]

Step 2: Merge overlapping
──────────────────────────

current = [1,3]

i=1: [2,6]
  current[1]=3 >= [2,6][0]=2 → Overlap!
  Merge: current = [1, max(3,6)] = [1,6]

i=2: [8,10]
  current[1]=6 < [8,10][0]=8 → No overlap
  Add [1,6] to result
  current = [8,10]

i=3: [15,18]
  current[1]=10 < [15,18][0]=15 → No overlap
  Add [8,10] to result
  current = [15,18]

Add final interval [15,18]

Result: [[1,6],[8,10],[15,18]] ✓
```

---

## Why Sorting Works

```
Before sort: [[8,10],[1,3],[15,18],[2,6]]

After sort:  [[1,3],[2,6],[8,10],[15,18]]

Key insight: After sorting by start time,
we only need to check if current.end >= next.start

If sorted, overlapping intervals are consecutive!

Example:
[1,3] and [2,6] are consecutive after sort
[1,3] and [8,10] would also be consecutive
No need to check [1,3] with [15,18] separately
```

---

## Edge Cases

```javascript
// Single interval
console.log(merge([[1,4]])); // [[1,4]]

// No overlap
console.log(merge([[1,2],[3,4],[5,6]])); // [[1,2],[3,4],[5,6]]

// All overlap
console.log(merge([[1,4],[2,5],[3,6]])); // [[1,6]]

// Adjacent intervals (touching)
console.log(merge([[1,3],[3,5]])); // [[1,5]]

// One interval contains another
console.log(merge([[1,10],[2,5],[3,6]])); // [[1,10]]

// Same start time
console.log(merge([[1,4],[1,5]])); // [[1,5]]

// Reverse order input
console.log(merge([[4,5],[1,3],[2,4]])); // [[1,5]]

// Duplicate intervals
console.log(merge([[1,3],[1,3]])); // [[1,3]]
```

---

## Common Mistakes

### ❌ Mistake 1: Forgetting to sort
```javascript
// Wrong - assumes already sorted
function mergeWrong(intervals) {
    const result = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        // ... merge logic
    }
    return result;
}
// Will fail if not sorted!

// Correct - sort first
intervals.sort((a, b) => a[0] - b[0]);
```

### ❌ Mistake 2: Not updating end correctly
```javascript
// Wrong - doesn't handle contained intervals
if (current[1] >= intervals[i][0]) {
    current[1] = intervals[i][1]; // What if current[1] > intervals[i][1]?
}

// Correct - use max
if (current[1] >= intervals[i][0]) {
    current[1] = Math.max(current[1], intervals[i][1]);
}
```

### ❌ Mistake 3: Forgetting last interval
```javascript
// Wrong - loses last interval
for (let i = 1; i < intervals.length; i++) {
    if (current[1] >= intervals[i][0]) {
        current[1] = Math.max(current[1], intervals[i][1]);
    } else {
        result.push(current);
        current = intervals[i];
    }
}
return result; // Missing current!

// Correct - add last interval
result.push(current);
return result;
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Can I assume intervals are non-empty? Can intervals have same start? Yes."

2. **Approach**: "Sort by start time first. Then merge consecutive overlapping intervals."

3. **Key insight**: "After sorting, overlapping intervals are consecutive. Only check current end vs next start."

4. **Overlap condition**: "current.end >= next.start means overlap"

5. **Complexity**: "O(n log n) for sort, O(n) for merge. Overall O(n log n)"

### Follow-up Questions:

**Q: What if intervals are already sorted?**
A: Can skip sorting step, making it O(n) time

**Q: Can you solve without extra space?**
```javascript
function mergeInPlace(intervals) {
    if (intervals.length <= 1) return intervals;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    let writeIndex = 0;
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[writeIndex][1] >= intervals[i][0]) {
            // Merge
            intervals[writeIndex][1] = Math.max(
                intervals[writeIndex][1], 
                intervals[i][1]
            );
        } else {
            // No overlap, move write pointer
            writeIndex++;
            intervals[writeIndex] = intervals[i];
        }
    }
    
    // Trim array
    intervals.length = writeIndex + 1;
    return intervals;
}
```

**Q: What if we need to track which intervals were merged?**
```javascript
function mergeWithTracking(intervals) {
    if (intervals.length <= 1) return intervals;
    
    // Add index to each interval
    const indexed = intervals.map((interval, i) => [...interval, i]);
    indexed.sort((a, b) => a[0] - b[0]);
    
    const result = [];
    let current = [...indexed[0]];
    let mergedIndices = [indexed[0][2]];
    
    for (let i = 1; i < indexed.length; i++) {
        if (current[1] >= indexed[i][0]) {
            current[1] = Math.max(current[1], indexed[i][1]);
            mergedIndices.push(indexed[i][2]);
        } else {
            result.push([current[0], current[1], mergedIndices]);
            current = [...indexed[i]];
            mergedIndices = [indexed[i][2]];
        }
    }
    
    result.push([current[0], current[1], mergedIndices]);
    return result;
}
```

---

## Related Problems

- [57. Insert Interval](https://leetcode.com/problems/insert-interval/)
- [435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- [252. Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)
- [253. Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
- [986. Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/)

---

## Key Takeaways

✅ Sort intervals by start time first  
✅ Merge consecutive overlapping intervals  
✅ Overlap: current.end >= next.start  
✅ Use max when updating end  
✅ Don't forget last interval  
✅ O(n log n) time due to sorting  

**Pattern**: Merge intervals → Sort + single pass merge!
