# 48. Non-overlapping Intervals

**LeetCode Link**: [435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)

**Difficulty**: Medium

**Topics**: Array, Dynamic Programming, Greedy, Sorting, Intervals

---

## Problem Statement

Given an array of intervals `intervals` where `intervals[i] = [starti, endi]`, return the **minimum number of intervals you need to remove** to make the rest of the intervals non-overlapping.

### Examples

**Example 1:**
```
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
```

**Example 2:**
```
Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
```

**Example 3:**
```
Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any intervals since they're already non-overlapping.
```

### Constraints
- `1 <= intervals.length <= 10^5`
- `intervals[i].length == 2`
- `-5 * 10^4 <= starti < endi <= 5 * 10^4`

---

## Approach: Greedy (Sort by End Time) ✅

### Intuition
Sort by end time. Keep interval with earliest end. If next overlaps, remove it (count++). Otherwise, update end.

### Implementation

```javascript
/**
 * Greedy - O(n log n) time, O(1) space
 * @param {number[][]} intervals
 * @return {number}
 */
function eraseOverlapIntervals(intervals) {
    if (intervals.length <= 1) {
        return 0;
    }
    
    // Sort by end time
    intervals.sort((a, b) => a[1] - b[1]);
    
    let count = 0;
    let end = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) {
            // Overlap detected, remove this interval
            count++;
        } else {
            // No overlap, update end
            end = intervals[i][1];
        }
    }
    
    return count;
}

// Test
console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]])); // 2
console.log(eraseOverlapIntervals([[1,2],[2,3]])); // 0
```

### Complexity Analysis
- **Time Complexity**: `O(n log n)` - Sorting dominates
- **Space Complexity**: `O(1)` - Only counter and end variable

---

## Visual Example

```
intervals = [[1,2],[2,3],[3,4],[1,3]]

Step 1: Sort by end time
────────────────────────
[1,2] end=2
[2,3] end=3
[1,3] end=3
[3,4] end=4

After sort: [[1,2],[2,3],[1,3],[3,4]]

Step 2: Greedy selection
────────────────────────
end = 2 (from [1,2])
count = 0

i=1: [2,3]
  start=2 >= end=2 → No overlap
  end = 3
  count = 0

i=2: [1,3]
  start=1 < end=3 → Overlap!
  Remove [1,3]
  count = 1

i=3: [3,4]
  start=3 >= end=3 → No overlap
  end = 4
  count = 1

Result: 1 interval removed ✓
```

---

## Why Sort by End Time?

```
Intuition: Activity Selection Problem
─────────────────────────────────────

Goal: Keep maximum number of non-overlapping intervals
Strategy: Always pick interval that ends earliest

Example:
[1,10] vs [1,2]

If we pick [1,10]:
  ████████████
  Blocks many future intervals

If we pick [1,2]:
  ██
  Leaves more room for future intervals

Greedy choice: Pick [1,2] (earliest end)
This maximizes number we can keep!

minimum removals = total - maximum non-overlapping
```

---

## Alternative: Sort by Start Time

```javascript
/**
 * Alternative - Sort by start time (also works!)
 */
function eraseOverlapIntervalsAlt(intervals) {
    if (intervals.length <= 1) return 0;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    let count = 0;
    let end = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) {
            // Overlap: remove interval with later end
            count++;
            end = Math.min(end, intervals[i][1]);
        } else {
            // No overlap
            end = intervals[i][1];
        }
    }
    
    return count;
}
```

**Note**: Both approaches work, but sort by end is more intuitive.

---

## Edge Cases

```javascript
// Single interval
console.log(eraseOverlapIntervals([[1,2]])); // 0

// Two intervals, no overlap
console.log(eraseOverlapIntervals([[1,2],[3,4]])); // 0

// Two intervals, overlap
console.log(eraseOverlapIntervals([[1,3],[2,4]])); // 1

// Adjacent (touching) intervals
console.log(eraseOverlapIntervals([[1,2],[2,3]])); // 0 (not overlapping)

// All same intervals
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]])); // 2

// Nested intervals
console.log(eraseOverlapIntervals([[1,10],[2,3],[4,5]])); // 1

// One interval contains all others
console.log(eraseOverlapIntervals([[1,100],[2,3],[4,5],[6,7]])); // 1
```

---

## Common Mistakes

### ❌ Mistake 1: Sorting by start time without adjusting logic
```javascript
// Wrong - sorts by start but uses end-sort logic
intervals.sort((a, b) => a[0] - b[0]);

for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < end) {
        count++;
        // Missing: end = Math.min(end, intervals[i][1])
    }
}

// Correct - if sorting by start, pick minimum end
if (intervals[i][0] < end) {
    count++;
    end = Math.min(end, intervals[i][1]);
}
```

### ❌ Mistake 2: Wrong overlap condition
```javascript
// Wrong - uses <= instead of <
if (intervals[i][0] <= end) {
    // Treats touching intervals as overlapping!
}

// Correct - use < for overlap
if (intervals[i][0] < end) {
    // [1,2] and [2,3] don't overlap
}
```

### ❌ Mistake 3: Trying to track which to remove
```javascript
// Wrong approach - trying to identify specific intervals
const toRemove = [];
// Complex logic to track intervals...

// Correct approach - just count
let count = 0;
// Increment when overlap detected
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Count minimum removals? Not which specific ones? Yes."

2. **Key insight**: "Activity selection problem. Greedy: keep interval with earliest end time."

3. **Strategy**: "Sort by end time. If next interval starts before current ends, it overlaps → remove it."

4. **Why greedy works**: "Keeping earliest-ending interval maximizes room for future intervals."

5. **Complexity**: "O(n log n) for sort, O(n) for counting. Overall O(n log n)"

### Follow-up Questions:

**Q: Can you return which intervals to keep instead?**
```javascript
function keepNonOverlapping(intervals) {
    if (intervals.length <= 1) return intervals;
    
    // Add indices
    const indexed = intervals.map((interval, i) => [...interval, i]);
    indexed.sort((a, b) => a[1] - b[1]);
    
    const kept = [indexed[0]];
    let end = indexed[0][1];
    
    for (let i = 1; i < indexed.length; i++) {
        if (indexed[i][0] >= end) {
            kept.push(indexed[i]);
            end = indexed[i][1];
        }
    }
    
    return kept.map(interval => [interval[0], interval[1]]);
}
```

**Q: What's the maximum number of non-overlapping intervals we can keep?**
```javascript
function maxNonOverlapping(intervals) {
    if (intervals.length <= 1) return intervals.length;
    
    intervals.sort((a, b) => a[1] - b[1]);
    
    let count = 1; // Keep first interval
    let end = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= end) {
            count++;
            end = intervals[i][1];
        }
    }
    
    return count;
}

// Relation: minRemovals = total - maxKeep
```

**Q: What if we want to minimize total length removed?**
A: Different problem! Would need DP, not greedy.

---

## Related Problems

- [452. Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)
- [253. Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
- [56. Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- [1024. Video Stitching](https://leetcode.com/problems/video-stitching/)

---

## Key Takeaways

✅ Classic activity selection / greedy problem  
✅ Sort by end time for optimal strategy  
✅ Keep interval with earliest end  
✅ Overlap: next.start < current.end  
✅ Count removals, don't track which  
✅ O(n log n) time optimal  

**Pattern**: Non-overlapping intervals → Greedy with end-time sort!
