# 49. Meeting Rooms (Leetcode Premium)

**LeetCode Link**: [252. Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)

**Difficulty**: Easy

**Topics**: Array, Sorting, Intervals

---

## Problem Statement

Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, determine if a person could attend all meetings.

### Examples

**Example 1:**
```
Input: intervals = [[0,30],[5,10],[15,20]]
Output: false
Explanation: Cannot attend all meetings because [0,30] overlaps with [5,10] and [15,20]
```

**Example 2:**
```
Input: intervals = [[7,10],[2,4]]
Output: true
Explanation: No overlaps, can attend all meetings
```

### Constraints
- `0 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= starti < endi <= 10^6`

---

## Approach: Sort and Check (Optimal!) ✅

### Intuition
Sort intervals by start time. If any interval starts before the previous one ends, there's an overlap.

### Implementation

```javascript
/**
 * Sort and Check - O(n log n) time, O(1) space
 * @param {number[][]} intervals
 * @return {boolean}
 */
function canAttendMeetings(intervals) {
    if (intervals.length <= 1) {
        return true;
    }
    
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Check for overlaps
    for (let i = 1; i < intervals.length; i++) {
        // If current start < previous end, overlap exists
        if (intervals[i][0] < intervals[i - 1][1]) {
            return false;
        }
    }
    
    return true;
}

// Alternative: More explicit
function canAttendMeetingsAlt(intervals) {
    if (intervals.length <= 1) return true;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    let prevEnd = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < prevEnd) {
            return false; // Overlap
        }
        prevEnd = intervals[i][1];
    }
    
    return true;
}

// Test
console.log(canAttendMeetings([[0,30],[5,10],[15,20]])); // false
console.log(canAttendMeetings([[7,10],[2,4]])); // true
console.log(canAttendMeetings([[1,5],[8,9]])); // true
```

### Complexity Analysis
- **Time Complexity**: `O(n log n)` - Sorting dominates
- **Space Complexity**: `O(1)` - Only comparing adjacent intervals

---

## Visual Example

```
intervals = [[0,30],[5,10],[15,20]]

Step 1: Sort by start time
──────────────────────────
[0,30] start=0
[5,10] start=5
[15,20] start=15

After sort: [[0,30],[5,10],[15,20]]

Step 2: Check overlaps
──────────────────────
Compare [0,30] and [5,10]:
  [5,10].start=5 < [0,30].end=30 → Overlap! ✗

Return false
```

---

## Overlap Visualization

```
Timeline view:

Example 1: [[0,30],[5,10],[15,20]]
0        10       20       30
|========|========|========|
[--------30-------]
     [10]
          [----20]
Overlaps! Cannot attend all ✗

Example 2: [[7,10],[2,4]]
0   2    4   7    10
|===|====|===|====|
    [-4]
            [-10]
No overlaps! Can attend all ✓

Example 3: [[1,5],[5,10]]
0   1    5    10
|===|====|====|
    [-5]
         [-10]
Adjacent, no overlap! Can attend all ✓
```

---

## Edge Cases

```javascript
// Empty array
console.log(canAttendMeetings([])); // true

// Single meeting
console.log(canAttendMeetings([[1,5]])); // true

// Two meetings, no overlap
console.log(canAttendMeetings([[1,2],[3,4]])); // true

// Two meetings, overlap
console.log(canAttendMeetings([[1,3],[2,4]])); // false

// Adjacent meetings (touching but not overlapping)
console.log(canAttendMeetings([[1,5],[5,10]])); // true

// Same start time
console.log(canAttendMeetings([[1,5],[1,10]])); // false

// One meeting contains another
console.log(canAttendMeetings([[1,10],[2,5]])); // false

// All same meeting
console.log(canAttendMeetings([[1,2],[1,2],[1,2]])); // false

// Reverse order input
console.log(canAttendMeetings([[7,10],[2,4],[1,3]])); // true
```

---

## Common Mistakes

### ❌ Mistake 1: Wrong overlap condition
```javascript
// Wrong - treats adjacent as overlapping
if (intervals[i][0] <= intervals[i - 1][1]) {
    return false; // [1,5] and [5,10] would be considered overlapping!
}

// Correct - use < not <=
if (intervals[i][0] < intervals[i - 1][1]) {
    return false; // [1,5] and [5,10] are not overlapping
}
```

### ❌ Mistake 2: Not sorting first
```javascript
// Wrong - assumes sorted
for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
        return false;
    }
}

// Correct - sort first
intervals.sort((a, b) => a[0] - b[0]);
for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
        return false;
    }
}
```

### ❌ Mistake 3: Checking all pairs (O(n²))
```javascript
// Wrong - inefficient O(n²)
for (let i = 0; i < intervals.length; i++) {
    for (let j = i + 1; j < intervals.length; j++) {
        if (overlaps(intervals[i], intervals[j])) {
            return false;
        }
    }
}

// Correct - sort then check adjacent O(n log n)
intervals.sort((a, b) => a[0] - b[0]);
for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
        return false;
    }
}
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Check if person can attend all meetings? Any overlap means false? Yes."

2. **Approach**: "Sort by start time. Check if any meeting starts before previous one ends."

3. **Key insight**: "After sorting, only need to check adjacent intervals for overlap."

4. **Overlap condition**: "Overlap if current.start < previous.end"

5. **Complexity**: "O(n log n) for sort, O(n) for check. Overall O(n log n)"

### Follow-up Questions:

**Q: What if intervals are already sorted?**
A: Can skip sorting, making it O(n) time

**Q: Can you find which meetings overlap?**
```javascript
function findOverlappingMeetings(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const overlapping = [];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) {
            overlapping.push([intervals[i - 1], intervals[i]]);
        }
    }
    
    return overlapping;
}
```

**Q: What if we need minimum rooms instead? (Meeting Rooms II)**
A: Different problem - requires tracking concurrent meetings with heap/sweep line

---

## Brute Force (For Understanding)

```javascript
/**
 * Brute Force - O(n²) time
 * Check all pairs for overlap
 */
function canAttendMeetingsBruteForce(intervals) {
    for (let i = 0; i < intervals.length; i++) {
        for (let j = i + 1; j < intervals.length; j++) {
            // Check if intervals[i] and intervals[j] overlap
            const overlap = 
                (intervals[i][0] < intervals[j][1] && 
                 intervals[j][0] < intervals[i][1]);
            
            if (overlap) {
                return false;
            }
        }
    }
    
    return true;
}
```

---

## Related Problems

- [253. Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
- [56. Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- [435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- [986. Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/)

---

## Key Takeaways

✅ Sort intervals by start time  
✅ Check adjacent intervals for overlap  
✅ Overlap: current.start < previous.end  
✅ Use < not <= for overlap check  
✅ O(n log n) optimal time  
✅ Simple problem but important pattern  

**Pattern**: Check non-overlapping → Sort + adjacent check!
