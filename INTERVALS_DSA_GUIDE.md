
# Complete Intervals Data Structures & Algorithms Guide

## Table of Contents
1. [Intervals Fundamentals](#intervals-fundamentals)
2. [Common Patterns & Techniques](#common-patterns--techniques)
3. [Interval Operations](#interval-operations)
4. [50 Interval Problems with Solutions](#50-interval-problems-with-solutions)

---

## Intervals Fundamentals

### What are Intervals?
An interval is a range defined by a start and end point. Intervals are commonly used to represent time ranges, ranges of values, or any continuous segment.

**Representation:**
```javascript
// Array representation
const interval = [start, end];

// Object representation
const interval = { start: 1, end: 5 };

// Class representation
class Interval {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
```

### Key Concepts

1. **Overlapping Intervals**: Two intervals overlap if they share at least one point
   - `[1, 5]` and `[3, 7]` overlap
   - `[1, 3]` and `[4, 6]` don't overlap

2. **Merging Intervals**: Combining overlapping intervals into one
   - `[1, 5]` + `[3, 7]` = `[1, 7]`

3. **Non-overlapping Intervals**: Intervals that don't share any points
   - `[1, 3]` and `[4, 6]`

4. **Point in Interval**: Check if a point lies within an interval
   - Point `4` is in `[1, 5]`

### Types of Interval Problems

1. **Merge Intervals**: Combine overlapping intervals
2. **Insert Interval**: Add a new interval and merge if needed
3. **Interval Intersection**: Find common parts of intervals
4. **Remove Intervals**: Delete parts covered by another interval
5. **Meeting Rooms**: Schedule optimization
6. **Interval Coverage**: Minimum intervals to cover a range

---

## Common Patterns & Techniques

### 1. Sorting Intervals

Most interval problems require sorting first.

```javascript
// Sort by start time
intervals.sort((a, b) => a[0] - b[0]);

// Sort by end time
intervals.sort((a, b) => a[1] - b[1]);

// Sort by start, then by end
intervals.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
});
```

### 2. Overlap Detection

```javascript
function isOverlapping(interval1, interval2) {
    return interval1[0] <= interval2[1] && interval2[0] <= interval1[1];
}

// Alternative
function hasOverlap(a, b) {
    return Math.max(a[0], b[0]) <= Math.min(a[1], b[1]);
}
```

### 3. Merging Logic

```javascript
function merge(interval1, interval2) {
    return [
        Math.min(interval1[0], interval2[0]),
        Math.max(interval1[1], interval2[1])
    ];
}
```

### 4. Sweep Line Algorithm

Used for processing events (start/end points) in order.

```javascript
function sweepLine(intervals) {
    const events = [];
    
    for (let [start, end] of intervals) {
        events.push([start, 1]);  // Start event
        events.push([end, -1]);   // End event
    }
    
    events.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });
    
    let active = 0;
    let maxActive = 0;
    
    for (let [time, type] of events) {
        active += type;
        maxActive = Math.max(maxActive, active);
    }
    
    return maxActive;
}
```

---

## Interval Operations

### Basic Operations

```javascript
class IntervalOperations {
    // Check if two intervals overlap
    static overlaps(a, b) {
        return a[0] <= b[1] && b[0] <= a[1];
    }
    
    // Merge two intervals
    static merge(a, b) {
        if (!this.overlaps(a, b)) return null;
        return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
    }
    
    // Check if interval a contains interval b
    static contains(a, b) {
        return a[0] <= b[0] && a[1] >= b[1];
    }
    
    // Find intersection of two intervals
    static intersection(a, b) {
        const start = Math.max(a[0], b[0]);
        const end = Math.min(a[1], b[1]);
        return start <= end ? [start, end] : null;
    }
    
    // Find union of two intervals
    static union(a, b) {
        if (!this.overlaps(a, b)) return [a, b];
        return [this.merge(a, b)];
    }
    
    // Get interval length
    static length(interval) {
        return interval[1] - interval[0];
    }
    
    // Check if point is in interval
    static containsPoint(interval, point) {
        return interval[0] <= point && point <= interval[1];
    }
}
```

---

## 50 Interval Problems with Solutions

### Easy Problems (1-15)

#### Problem 1: Merge Intervals

```javascript
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
    if (intervals.length <= 1) return intervals;
    
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    const result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = result[result.length - 1];
        
        if (current[0] <= last[1]) {
            // Overlapping - merge
            last[1] = Math.max(last[1], current[1]);
        } else {
            // Non-overlapping - add new interval
            result.push(current);
        }
    }
    
    return result;
}

// Example
console.log(merge([[1,3],[2,6],[8,10],[15,18]])); 
// Output: [[1,6],[8,10],[15,18]]
```

#### Problem 2: Insert Interval

```javascript
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insert(intervals, newInterval) {
    const result = [];
    let i = 0;
    
    // Add all intervals before newInterval
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }
    
    // Merge overlapping intervals
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);
    
    // Add remaining intervals
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }
    
    return result;
}

// Example
console.log(insert([[1,3],[6,9]], [2,5]));
// Output: [[1,5],[6,9]]
```

#### Problem 3: Non-overlapping Intervals

```javascript
/**
 * @param {number[][]} intervals
 * @return {number}
 */
function eraseOverlapIntervals(intervals) {
    if (intervals.length === 0) return 0;
    
    // Sort by end time (greedy approach)
    intervals.sort((a, b) => a[1] - b[1]);
    
    let count = 0;
    let end = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) {
            // Overlapping - remove this interval
            count++;
        } else {
            // Non-overlapping - update end
            end = intervals[i][1];
        }
    }
    
    return count;
}

// Example
console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]));
// Output: 1
```

#### Problem 4: Meeting Rooms

```javascript
/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
function canAttendMeetings(intervals) {
    if (intervals.length === 0) return true;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i-1][1]) {
            return false;
        }
    }
    
    return true;
}

// Example
console.log(canAttendMeetings([[0,30],[5,10],[15,20]]));
// Output: false
```

#### Problem 5: Meeting Rooms II

```javascript
/**
 * @param {number[][]} intervals
 * @return {number}
 */
function minMeetingRooms(intervals) {
    if (intervals.length === 0) return 0;
    
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
    
    let rooms = 0;
    let endPointer = 0;
    
    for (let i = 0; i < intervals.length; i++) {
        if (starts[i] < ends[endPointer]) {
            rooms++;
        } else {
            endPointer++;
        }
    }
    
    return rooms;
}

// Using Min Heap
function minMeetingRoomsHeap(intervals) {
    if (intervals.length === 0) return 0;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    const heap = [intervals[0][1]]; // Min heap of end times
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= heap[0]) {
            heap.shift(); // Remove earliest ending meeting
        }
        heap.push(intervals[i][1]);
        heap.sort((a, b) => a - b);
    }
    
    return heap.length;
}
```

#### Problem 6: Interval List Intersections

```javascript
/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
function intervalIntersection(firstList, secondList) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < firstList.length && j < secondList.length) {
        const start = Math.max(firstList[i][0], secondList[j][0]);
        const end = Math.min(firstList[i][1], secondList[j][1]);
        
        if (start <= end) {
            result.push([start, end]);
        }
        
        // Move pointer for interval that ends first
        if (firstList[i][1] < secondList[j][1]) {
            i++;
        } else {
            j++;
        }
    }
    
    return result;
}

// Example
console.log(intervalIntersection(
    [[0,2],[5,10],[13,23],[24,25]],
    [[1,5],[8,12],[15,24],[25,26]]
));
// Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
```

#### Problem 7: Summary Ranges

```javascript
/**
 * @param {number[]} nums
 * @return {string[]}
 */
function summaryRanges(nums) {
    const result = [];
    
    for (let i = 0; i < nums.length; i++) {
        const start = nums[i];
        
        while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
            i++;
        }
        
        if (start === nums[i]) {
            result.push(`${start}`);
        } else {
            result.push(`${start}->${nums[i]}`);
        }
    }
    
    return result;
}

// Example
console.log(summaryRanges([0,1,2,4,5,7]));
// Output: ["0->2","4->5","7"]
```

#### Problem 8: Missing Ranges

```javascript
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
function findMissingRanges(nums, lower, upper) {
    const result = [];
    let prev = lower - 1;
    
    for (let i = 0; i <= nums.length; i++) {
        const curr = i < nums.length ? nums[i] : upper + 1;
        
        if (prev + 1 < curr) {
            result.push(formatRange(prev + 1, curr - 1));
        }
        
        prev = curr;
    }
    
    return result;
}

function formatRange(start, end) {
    return start === end ? `${start}` : `${start}->${end}`;
}

// Example
console.log(findMissingRanges([0,1,3,50,75], 0, 99));
// Output: ["2","4->49","51->74","76->99"]
```

#### Problem 9: Data Stream as Disjoint Intervals

```javascript
class SummaryRanges {
    constructor() {
        this.intervals = [];
    }
    
    addNum(val) {
        const newInterval = [val, val];
        
        if (this.intervals.length === 0) {
            this.intervals.push(newInterval);
            return;
        }
        
        const result = [];
        let i = 0;
        let added = false;
        
        while (i < this.intervals.length) {
            const curr = this.intervals[i];
            
            if (curr[1] + 1 < val) {
                result.push(curr);
            } else if (curr[0] > val + 1) {
                if (!added) {
                    result.push(newInterval);
                    added = true;
                }
                result.push(curr);
            } else {
                newInterval[0] = Math.min(newInterval[0], curr[0]);
                newInterval[1] = Math.max(newInterval[1], curr[1]);
            }
            i++;
        }
        
        if (!added) {
            result.push(newInterval);
        }
        
        this.intervals = result;
    }
    
    getIntervals() {
        return this.intervals;
    }
}
```

#### Problem 10: Merge Sorted Intervals

```javascript
/**
 * @param {number[][]} intervals1
 * @param {number[][]} intervals2
 * @return {number[][]}
 */
function mergeSortedIntervals(intervals1, intervals2) {
    const merged = [...intervals1, ...intervals2];
    return merge(merged); // Use merge function from Problem 1
}
```

#### Problem 11: Employee Free Time

```javascript
/**
 * @param {number[][][]} schedule
 * @return {number[][]}
 */
function employeeFreeTime(schedule) {
    // Flatten all intervals
    const intervals = [];
    for (let employee of schedule) {
        for (let interval of employee) {
            intervals.push(interval);
        }
    }
    
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Merge intervals
    const merged = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        const last = merged[merged.length - 1];
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            merged.push(intervals[i]);
        }
    }
    
    // Find gaps
    const result = [];
    for (let i = 1; i < merged.length; i++) {
        result.push([merged[i-1][1], merged[i][0]]);
    }
    
    return result;
}
```

#### Problem 12: Partition Labels

```javascript
/**
 * @param {string} s
 * @return {number[]}
 */
function partitionLabels(s) {
    const lastIndex = new Map();
    
    // Store last occurrence of each character
    for (let i = 0; i < s.length; i++) {
        lastIndex.set(s[i], i);
    }
    
    const result = [];
    let start = 0;
    let end = 0;
    
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, lastIndex.get(s[i]));
        
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1;
        }
    }
    
    return result;
}

// Example
console.log(partitionLabels("ababcbacadefegdehijhklij"));
// Output: [9,7,8]
```

#### Problem 13: Minimum Number of Arrows to Burst Balloons

```javascript
/**
 * @param {number[][]} points
 * @return {number}
 */
function findMinArrowShots(points) {
    if (points.length === 0) return 0;
    
    // Sort by end position
    points.sort((a, b) => a[1] - b[1]);
    
    let arrows = 1;
    let end = points[0][1];
    
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > end) {
            arrows++;
            end = points[i][1];
        }
    }
    
    return arrows;
}

// Example
console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]]));
// Output: 2
```

#### Problem 14: Remove Covered Intervals

```javascript
/**
 * @param {number[][]} intervals
 * @return {number}
 */
function removeCoveredIntervals(intervals) {
    // Sort by start (ascending), then by end (descending)
    intervals.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return b[1] - a[1];
    });
    
    let count = 0;
    let prevEnd = 0;
    
    for (let [start, end] of intervals) {
        if (end > prevEnd) {
            count++;
            prevEnd = end;
        }
    }
    
    return count;
}

// Example
console.log(removeCoveredIntervals([[1,4],[3,6],[2,8]]));
// Output: 2
```

#### Problem 15: Teemo Attacking

```javascript
/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
function findPoisonedDuration(timeSeries, duration) {
    if (timeSeries.length === 0) return 0;
    
    let total = 0;
    
    for (let i = 0; i < timeSeries.length - 1; i++) {
        total += Math.min(timeSeries[i + 1] - timeSeries[i], duration);
    }
    
    return total + duration;
}
```

### Medium Problems (16-30)

#### Problem 16: My Calendar I

```javascript
class MyCalendar {
    constructor() {
        this.bookings = [];
    }
    
    book(start, end) {
        for (let [s, e] of this.bookings) {
            if (start < e && s < end) {
                return false;
            }
        }
        this.bookings.push([start, end]);
        return true;
    }
}
```

#### Problem 17: My Calendar II

```javascript
class MyCalendarTwo {
    constructor() {
        this.bookings = [];
        this.overlaps = [];
    }
    
    book(start, end) {
        // Check triple booking
        for (let [s, e] of this.overlaps) {
            if (start < e && s < end) {
                return false;
            }
        }
        
        // Add new overlaps
        for (let [s, e] of this.bookings) {
            if (start < e && s < end) {
                this.overlaps.push([
                    Math.max(start, s),
                    Math.min(end, e)
                ]);
            }
        }
        
        this.bookings.push([start, end]);
        return true;
    }
}
```

#### Problem 18: My Calendar III

```javascript
class MyCalendarThree {
    constructor() {
        this.timeline = new Map();
    }
    
    book(start, end) {
        this.timeline.set(start, (this.timeline.get(start) || 0) + 1);
        this.timeline.set(end, (this.timeline.get(end) || 0) - 1);
        
        let active = 0;
        let maxBookings = 0;
        
        const times = Array.from(this.timeline.keys()).sort((a, b) => a - b);
        
        for (let time of times) {
            active += this.timeline.get(time);
            maxBookings = Math.max(maxBookings, active);
        }
        
        return maxBookings;
    }
}
```

#### Problem 19: Range Module

```javascript
class RangeModule {
    constructor() {
        this.intervals = [];
    }
    
    addRange(left, right) {
        const newIntervals = [];
        let i = 0;
        
        // Add intervals before [left, right)
        while (i < this.intervals.length && this.intervals[i][1] < left) {
            newIntervals.push(this.intervals[i]);
            i++;
        }
        
        // Merge overlapping intervals
        while (i < this.intervals.length && this.intervals[i][0] <= right) {
            left = Math.min(left, this.intervals[i][0]);
            right = Math.max(right, this.intervals[i][1]);
            i++;
        }
        newIntervals.push([left, right]);
        
        // Add remaining intervals
        while (i < this.intervals.length) {
            newIntervals.push(this.intervals[i]);
            i++;
        }
        
        this.intervals = newIntervals;
    }
    
    queryRange(left, right) {
        for (let [start, end] of this.intervals) {
            if (start <= left && right <= end) {
                return true;
            }
        }
        return false;
    }
    
    removeRange(left, right) {
        const newIntervals = [];
        
        for (let [start, end] of this.intervals) {
            if (end <= left || start >= right) {
                newIntervals.push([start, end]);
            } else {
                if (start < left) {
                    newIntervals.push([start, left]);
                }
                if (end > right) {
                    newIntervals.push([right, end]);
                }
            }
        }
        
        this.intervals = newIntervals;
    }
}
```

#### Problem 20: Car Pooling

```javascript
/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
function carPooling(trips, capacity) {
    const events = [];
    
    for (let [passengers, from, to] of trips) {
        events.push([from, passengers]);
        events.push([to, -passengers]);
    }
    
    events.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });
    
    let current = 0;
    
    for (let [location, change] of events) {
        current += change;
        if (current > capacity) return false;
    }
    
    return true;
}
```

#### Problem 21: Corporate Flight Bookings

```javascript
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
function corpFlightBookings(bookings, n) {
    const result = Array(n).fill(0);
    
    for (let [first, last, seats] of bookings) {
        result[first - 1] += seats;
        if (last < n) {
            result[last] -= seats;
        }
    }
    
    // Prefix sum
    for (let i = 1; i < n; i++) {
        result[i] += result[i - 1];
    }
    
    return result;
}
```

#### Problem 22: Video Stitching

```javascript
/**
 * @param {number[][]} clips
 * @param {number} time
 * @return {number}
 */
function videoStitching(clips, time) {
    clips.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return b[1] - a[1];
    });
    
    let count = 0;
    let currentEnd = 0;
    let nextEnd = 0;
    let i = 0;
    
    while (i < clips.length && currentEnd < time) {
        while (i < clips.length && clips[i][0] <= currentEnd) {
            nextEnd = Math.max(nextEnd, clips[i][1]);
            i++;
        }
        
        if (nextEnd === currentEnd) return -1;
        
        count++;
        currentEnd = nextEnd;
    }
    
    return currentEnd >= time ? count : -1;
}
```

#### Problem 23: Minimum Number of Taps

```javascript
/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
function minTaps(n, ranges) {
    const intervals = [];
    
    for (let i = 0; i < ranges.length; i++) {
        const start = Math.max(0, i - ranges[i]);
        const end = Math.min(n, i + ranges[i]);
        intervals.push([start, end]);
    }
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    let count = 0;
    let currentEnd = 0;
    let nextEnd = 0;
    let i = 0;
    
    while (currentEnd < n) {
        while (i < intervals.length && intervals[i][0] <= currentEnd) {
            nextEnd = Math.max(nextEnd, intervals[i][1]);
            i++;
        }
        
        if (nextEnd === currentEnd) return -1;
        
        count++;
        currentEnd = nextEnd;
    }
    
    return count;
}
```

#### Problem 24: Smallest Range Covering K Lists

```javascript
/**
 * @param {number[][]} nums
 * @return {number[]}
 */
function smallestRange(nums) {
    const heap = [];
    let max = -Infinity;
    
    // Initialize heap with first element from each list
    for (let i = 0; i < nums.length; i++) {
        heap.push([nums[i][0], i, 0]);
        max = Math.max(max, nums[i][0]);
    }
    
    heap.sort((a, b) => a[0] - b[0]);
    
    let range = [heap[0][0], max];
    
    while (true) {
        const [val, listIdx, elemIdx] = heap.shift();
        
        if (elemIdx + 1 === nums[listIdx].length) break;
        
        const nextVal = nums[listIdx][elemIdx + 1];
        heap.push([nextVal, listIdx, elemIdx + 1]);
        heap.sort((a, b) => a[0] - b[0]);
        
        max = Math.max(max, nextVal);
        
        if (max - heap[0][0] < range[1] - range[0]) {
            range = [heap[0][0], max];
        }
    }
    
    return range;
}
```

#### Problem 25: Count of Range Sum

```javascript
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
function countRangeSum(nums, lower, upper) {
    const prefixSum = [0];
    
    for (let num of nums) {
        prefixSum.push(prefixSum[prefixSum.length - 1] + num);
    }
    
    let count = 0;
    
    for (let i = 0; i < prefixSum.length; i++) {
        for (let j = i + 1; j < prefixSum.length; j++) {
            const sum = prefixSum[j] - prefixSum[i];
            if (sum >= lower && sum <= upper) {
                count++;
            }
        }
    }
    
    return count;
}

// Optimized with merge sort
function countRangeSumOptimized(nums, lower, upper) {
    const prefixSum = [0];
    
    for (let num of nums) {
        prefixSum.push(prefixSum[prefixSum.length - 1] + num);
    }
    
    function mergeSort(arr, start, end) {
        if (start >= end) return 0;
        
        const mid = Math.floor((start + end) / 2);
        let count = mergeSort(arr, start, mid) + mergeSort(arr, mid + 1, end);
        
        let j = mid + 1;
        let k = mid + 1;
        
        for (let i = start; i <= mid; i++) {
            while (j <= end && arr[j] - arr[i] < lower) j++;
            while (k <= end && arr[k] - arr[i] <= upper) k++;
            count += k - j;
        }
        
        // Merge
        const temp = [];
        let i = start;
        j = mid + 1;
        
        while (i <= mid && j <= end) {
            if (arr[i] <= arr[j]) {
                temp.push(arr[i++]);
            } else {
                temp.push(arr[j++]);
            }
        }
        
        while (i <= mid) temp.push(arr[i++]);
        while (j <= end) temp.push(arr[j++]);
        
        for (let i = 0; i < temp.length; i++) {
            arr[start + i] = temp[i];
        }
        
        return count;
    }
    
    return mergeSort(prefixSum, 0, prefixSum.length - 1);
}
```

#### Problem 26: Maximum Length of Pair Chain

```javascript
/**
 * @param {number[][]} pairs
 * @return {number}
 */
function findLongestChain(pairs) {
    pairs.sort((a, b) => a[1] - b[1]);
    
    let count = 1;
    let end = pairs[0][1];
    
    for (let i = 1; i < pairs.length; i++) {
        if (pairs[i][0] > end) {
            count++;
            end = pairs[i][1];
        }
    }
    
    return count;
}
```

#### Problem 27: Non-overlapping Intervals with Weight

```javascript
/**
 * @param {number[][]} intervals - [start, end, weight]
 * @return {number}
 */
function maxWeightNonOverlapping(intervals) {
    intervals.sort((a, b) => a[1] - b[1]);
    
    const dp = Array(intervals.length).fill(0);
    dp[0] = intervals[0][2];
    
    for (let i = 1; i < intervals.length; i++) {
        let lastNonOverlap = -1;
        
        for (let j = i - 1; j >= 0; j--) {
            if (intervals[j][1] <= intervals[i][0]) {
                lastNonOverlap = j;
                break;
            }
        }
        
        const include = intervals[i][2] + 
                       (lastNonOverlap >= 0 ? dp[lastNonOverlap] : 0);
        const exclude = dp[i - 1];
        
        dp[i] = Math.max(include, exclude);
    }
    
    return dp[dp.length - 1];
}
```

#### Problem 28: Maximum Profit in Job Scheduling

```javascript
/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
function jobScheduling(startTime, endTime, profit) {
    const jobs = [];
    
    for (let i = 0; i < startTime.length; i++) {
        jobs.push([startTime[i], endTime[i], profit[i]]);
    }
    
    jobs.sort((a, b) => a[1] - b[1]);
    
    const dp = [[0, 0]]; // [endTime, maxProfit]
    
    for (let [start, end, p] of jobs) {
        // Binary search for last non-overlapping job
        let left = 0;
        let right = dp.length - 1;
        
        while (left < right) {
            const mid = Math.ceil((left + right) / 2);
            if (dp[mid][0] <= start) {
                left = mid;
            } else {
                right = mid - 1;
            }
        }
        
        const maxProfit = Math.max(dp[dp.length - 1][1], dp[left][1] + p);
        dp.push([end, maxProfit]);
    }
    
    return dp[dp.length - 1][1];
}
```

#### Problem 29: Exam Room

```javascript
class ExamRoom {
    constructor(n) {
        this.n = n;
        this.students = [];
    }
    
    seat() {
        if (this.students.length === 0) {
            this.students.push(0);
            return 0;
        }
        
        let maxDist = this.students[0];
        let seat = 0;
        
        for (let i = 1; i < this.students.length; i++) {
            const dist = Math.floor((this.students[i] - this.students[i-1]) / 2);
            if (dist > maxDist) {
                maxDist = dist;
                seat = this.students[i-1] + dist;
            }
        }
        
        if (this.n - 1 - this.students[this.students.length - 1] > maxDist) {
            seat = this.n - 1;
        }
        
        this.students.push(seat);
        this.students.sort((a, b) => a - b);
        
        return seat;
    }
    
    leave(p) {
        const index = this.students.indexOf(p);
        if (index !== -1) {
            this.students.splice(index, 1);
        }
    }
}
```

#### Problem 30: Maximum Gap (Intervals Approach)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function maximumGap(nums) {
    if (nums.length < 2) return 0;
    
    nums.sort((a, b) => a - b);
    
    let maxGap = 0;
    
    for (let i = 1; i < nums.length; i++) {
        maxGap = Math.max(maxGap, nums[i] - nums[i-1]);
    }
    
    return maxGap;
}
```

### Hard Problems (31-50)

#### Problem 31: The Skyline Problem

```javascript
/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
function getSkyline(buildings) {
    const events = [];
    
    for (let [left, right, height] of buildings) {
        events.push([left, -height]); // Start (negative for sorting)
        events.push([right, height]);  // End
    }
    
    events.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });
    
    const result = [];
    const heights = [0];
    
    for (let [x, h] of events) {
        if (h < 0) {
            heights.push(-h);
        } else {
            const index = heights.indexOf(h);
            heights.splice(index, 1);
        }
        
        heights.sort((a, b) => b - a);
        const maxHeight = heights[0];
        
        if (result.length === 0 || result[result.length - 1][1] !== maxHeight) {
            result.push([x, maxHeight]);
        }
    }
    
    return result;
}
```

#### Problem 32: Count Ways to Group Overlapping Ranges

```javascript
/**
 * @param {number[][]} ranges
 * @return {number}
 */
function countWays(ranges) {
    const MOD = 1e9 + 7;
    
    ranges.sort((a, b) => a[0] - b[0]);
    
    let groups = 1;
    let currentEnd = ranges[0][1];
    
    for (let i = 1; i < ranges.length; i++) {
        if (ranges[i][0] > currentEnd) {
            groups++;
            currentEnd = ranges[i][1];
        } else {
            currentEnd = Math.max(currentEnd, ranges[i][1]);
        }
    }
    
    // 2^groups ways
    let result = 1;
    for (let i = 0; i < groups; i++) {
        result = (result * 2) % MOD;
    }
    
    return result;
}
```

#### Problem 33: Falling Squares

```javascript
/**
 * @param {number[][]} positions
 * @return {number[]}
 */
function fallingSquares(positions) {
    const intervals = [];
    const result = [];
    let maxHeight = 0;
    
    for (let [left, sideLength] of positions) {
        const right = left + sideLength;
        let baseHeight = 0;
        
        // Find overlapping intervals
        for (let [l, r, h] of intervals) {
            if (left < r && l < right) {
                baseHeight = Math.max(baseHeight, h);
            }
        }
        
        const newHeight = baseHeight + sideLength;
        intervals.push([left, right, newHeight]);
        maxHeight = Math.max(maxHeight, newHeight);
        result.push(maxHeight);
    }
    
    return result;
}
```

#### Problem 34: Rectangle Area II

```javascript
/**
 * @param {number[][]} rectangles
 * @return {number}
 */
function rectangleArea(rectangles) {
    const MOD = 1e9 + 7;
    const events = [];
    
    for (let [x1, y1, x2, y2] of rectangles) {
        events.push([y1, 1, x1, x2]);
        events.push([y2, -1, x1, x2]);
    }
    
    events.sort((a, b) => a[0] - b[0]);
    
    let area = 0;
    let prevY = 0;
    const active = [];
    
    for (let [y, type, x1, x2] of events) {
        area = (area + getWidth(active) * (y - prevY)) % MOD;
        
        if (type === 1) {
            active.push([x1, x2]);
        } else {
            const index = active.findIndex(a => a[0] === x1 && a[1] === x2);
            active.splice(index, 1);
        }
        
        prevY = y;
    }
    
    return area;
}

function getWidth(intervals) {
    if (intervals.length === 0) return 0;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    let width = 0;
    let currentEnd = -Infinity;
    
    for (let [start, end] of intervals) {
        if (start > currentEnd) {
            width += end - start;
            currentEnd = end;
        } else if (end > currentEnd) {
            width += end - currentEnd;
            currentEnd = end;
        }
    }
    
    return width;
}
```

#### Problem 35: Divide Intervals Into Groups

```javascript
/**
 * @param {number[][]} intervals
 * @return {number}
 */
function minGroups(intervals) {
    const events = [];
    
    for (let [start, end] of intervals) {
        events.push([start, 1]);
        events.push([end + 1, -1]);
    }
    
    events.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });
    
    let groups = 0;
    let current = 0;
    
    for (let [time, change] of events) {
        current += change;
        groups = Math.max(groups, current);
    }
    
    return groups;
}
```

#### Problem 36: Maximum Intervals Overlap

```javascript
/**
 * @param {number[][]} intervals
 * @return {number}
 */
function maxOverlap(intervals) {
    const events = [];
    
    for (let [start, end] of intervals) {
        events.push([start, 1]);
        events.push([end, -1]);
    }
    
    events.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return b[1] - a[1]; // Process end before start at same time
    });
    
    let maxOverlap = 0;
    let current = 0;
    
    for (let [time, type] of events) {
        current += type;
        maxOverlap = Math.max(maxOverlap, current);
    }
    
    return maxOverlap;
}
```

#### Problem 37: Maximum CPU Load

```javascript
/**
 * @param {number[][]} jobs - [start, end, load]
 * @return {number}
 */
function maxCPULoad(jobs) {
    const events = [];
    
    for (let [start, end, load] of jobs) {
        events.push([start, load]);
        events.push([end, -load]);
    }
    
    events.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return b[1] - a[1];
    });
    
    let maxLoad = 0;
    let currentLoad = 0;
    
    for (let [time, load] of events) {
        currentLoad += load;
        maxLoad = Math.max(maxLoad, currentLoad);
    }
    
    return maxLoad;
}
```

#### Problem 38: Perfect Rectangle

```javascript
/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
function isRectangleCover(rectangles) {
    let area = 0;
    const corners = new Set();
    
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;
    
    for (let [x1, y1, x2, y2] of rectangles) {
        area += (x2 - x1) * (y2 - y1);
        
        minX = Math.min(minX, x1);
        minY = Math.min(minY, y1);
        maxX = Math.max(maxX, x2);
        maxY = Math.max(maxY, y2);
        
        const corner1 = `${x1},${y1}`;
        const corner2 = `${x1},${y2}`;
        const corner3 = `${x2},${y1}`;
        const corner4 = `${x2},${y2}`;
        
        for (let corner of [corner1, corner2, corner3, corner4]) {
            if (corners.has(corner)) {
                corners.delete(corner);
            } else {
                corners.add(corner);
            }
        }
    }
    
    if (corners.size !== 4) return false;
    
    const expectedCorners = [
        `${minX},${minY}`,
        `${minX},${maxY}`,
        `${maxX},${minY}`,
        `${maxX},${maxY}`
    ];
    
    for (let corner of expectedCorners) {
        if (!corners.has(corner)) return false;
    }
    
    const expectedArea = (maxX - minX) * (maxY - minY);
    return area === expectedArea;
}
```

#### Problem 39: Amount of New Area Painted

```javascript
/**
 * @param {number[][]} paint
 * @return {number[]}
 */
function amountPainted(paint) {
    const result = [];
    const painted = new Map();
    
    for (let [start, end] of paint) {
        let count = 0;
        let curr = start;
        
        while (curr < end) {
            if (painted.has(curr)) {
                curr = painted.get(curr);
            } else {
                painted.set(curr, curr + 1);
                count++;
                curr++;
            }
        }
        
        // Optimize jumps
        curr = start;
        while (curr < end) {
            const next = painted.get(curr);
            if (next < end) {
                painted.set(curr, end);
            }
            curr = next;
        }
        
        result.push(count);
    }
    
    return result;
}
```

#### Problem 40: Description of Paintings

```javascript
/**
 * @param {number[][]} segments
 * @return {number[][]}
 */
function splitPainting(segments) {
    const events = new Map();
    
    for (let [start, end, color] of segments) {
        events.set(start, (events.get(start) || 0) + color);
        events.set(end, (events.get(end) || 0) - color);
    }
    
    const times = Array.from(events.keys()).sort((a, b) => a - b);
    const result = [];
    let currentColor = 0;
    
    for (let i = 0; i < times.length - 1; i++) {
        currentColor += events.get(times[i]);
        
        if (currentColor > 0) {
            result.push([times[i], times[i + 1], currentColor]);
        }
    }
    
    return result;
}
```

#### Problem 41: Process Tasks Using Servers

```javascript
/**
 * @param {number[]} servers
 * @param {number[]} tasks
 * @return {number[]}
 */
function assignTasks(servers, tasks) {
    const available = servers.map((weight, i) => [weight, i]);
    const busy = [];
    const result = [];
    
    available.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });
    
    let time = 0;
    
    for (let i = 0; i < tasks.length; i++) {
        time = Math.max(time, i);
        
        // Free up busy servers
        while (busy.length > 0 && busy[0][0] <= time) {
            const [freeTime, weight, index] = busy.shift();
            available.push([weight, index]);
            available.sort((a, b) => {
                if (a[0] !== b[0]) return a[0] - b[0];
                return a[1] - b[1];
            });
        }
        
        if (available.length === 0) {
            time = busy[0][0];
            const [freeTime, weight, index] = busy.shift();
            available.push([weight, index]);
        }
        
        const [weight, index] = available.shift();
        result.push(index);
        
        busy.push([time + tasks[i], weight, index]);
        busy.sort((a, b) => a[0] - b[0]);
    }
    
    return result;
}
```

#### Problem 42: Interval Cancellation

```javascript
/**
 * @param {number[][]} intervals
 * @param {number[]} toRemove
 * @return {number[][]}
 */
function removeIntervals(intervals, toRemove) {
    const result = [];
    const [removeStart, removeEnd] = toRemove;
    
    for (let [start, end] of intervals) {
        if (end <= removeStart || start >= removeEnd) {
            result.push([start, end]);
        } else {
            if (start < removeStart) {
                result.push([start, removeStart]);
            }
            if (end > removeEnd) {
                result.push([removeEnd, end]);
            }
        }
    }
    
    return result;
}
```

#### Problem 43: Shift 2D Grid Intervals

```javascript
/**
 * @param {number[][]} intervals
 * @param {number} shift
 * @return {number[][]}
 */
function shiftIntervals(intervals, shift) {
    return intervals.map(([start, end]) => [start + shift, end + shift]);
}
```

#### Problem 44: Find Right Interval

```javascript
/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
function findRightInterval(intervals) {
    const starts = intervals.map((interval, i) => [interval[0], i]);
    starts.sort((a, b) => a[0] - b[0]);
    
    const result = [];
    
    for (let [start, end] of intervals) {
        let left = 0;
        let right = starts.length - 1;
        let index = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (starts[mid][0] >= end) {
                index = starts[mid][1];
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        result.push(index);
    }
    
    return result;
}
```

#### Problem 45: Maximum Performance of a Team

```javascript
/**
 * @param {number} n
 * @param {number[]} speed
 * @param {number[]} efficiency
 * @param {number} k
 * @return {number}
 */
function maxPerformance(n, speed, efficiency, k) {
    const MOD = 1e9 + 7;
    const engineers = [];
    
    for (let i = 0; i < n; i++) {
        engineers.push([efficiency[i], speed[i]]);
    }
    
    engineers.sort((a, b) => b[0] - a[0]);
    
    let maxPerf = 0;
    let speedSum = 0;
    const speedHeap = [];
    
    for (let [eff, spd] of engineers) {
        speedHeap.push(spd);
        speedHeap.sort((a, b) => a - b);
        speedSum += spd;
        
        if (speedHeap.length > k) {
            speedSum -= speedHeap.shift();
        }
        
        maxPerf = Math.max(maxPerf, speedSum * eff);
    }
    
    return maxPerf % MOD;
}
```

#### Problem 46: Booking Concert Tickets

```javascript
class BookMyShow {
    constructor(n, m) {
        this.rows = n;
        this.cols = m;
        this.available = Array(n).fill(m);
    }
    
    gather(k, maxRow) {
        for (let i = 0; i <= maxRow; i++) {
            if (this.available[i] >= k) {
                const startCol = this.cols - this.available[i];
                this.available[i] -= k;
                return [i, startCol];
            }
        }
        return [];
    }
    
    scatter(k, maxRow) {
        let total = 0;
        for (let i = 0; i <= maxRow; i++) {
            total += this.available[i];
        }
        
        if (total < k) return false;
        
        for (let i = 0; i <= maxRow && k > 0; i++) {
            const take = Math.min(k, this.available[i]);
            this.available[i] -= take;
            k -= take;
        }
        
        return true;
    }
}
```

#### Problem 47: Maximum Tastiness

```javascript
/**
 * @param {number[]} price
 * @param {number[]} tastiness
 * @param {number} maxAmount
 * @param {number} maxCoupons
 * @return {number}
 */
function maxTastiness(price, tastiness, maxAmount, maxCoupons) {
    const items = [];
    
    for (let i = 0; i < price.length; i++) {
        items.push([price[i], tastiness[i]]);
    }
    
    items.sort((a, b) => b[1] - a[1]);
    
    let maxTaste = 0;
    
    function backtrack(index, money, coupons, taste) {
        maxTaste = Math.max(maxTaste, taste);
        
        if (index >= items.length) return;
        
        const [p, t] = items[index];
        
        // Don't take
        backtrack(index + 1, money, coupons, taste);
        
        // Buy with money
        if (money >= p) {
            backtrack(index + 1, money - p, coupons, taste + t);
        }
        
        // Buy with coupon
        if (coupons > 0 && money >= Math.floor(p / 2)) {
            backtrack(index + 1, money - Math.floor(p / 2), coupons - 1, taste + t);
        }
    }
    
    backtrack(0, maxAmount, maxCoupons, 0);
    return maxTaste;
}
```

#### Problem 48: Minimize Maximum of Array

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function minimizeArrayValue(nums) {
    let maxVal = nums[0];
    let sum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        sum += nums[i];
        maxVal = Math.max(maxVal, Math.ceil(sum / (i + 1)));
    }
    
    return maxVal;
}
```

#### Problem 49: Count Integers in Intervals

```javascript
class CountIntervals {
    constructor() {
        this.intervals = [];
        this.count = 0;
    }
    
    add(left, right) {
        const newIntervals = [];
        let added = false;
        
        for (let [l, r] of this.intervals) {
            if (r < left || l > right) {
                newIntervals.push([l, r]);
            } else {
                this.count -= (r - l + 1);
                left = Math.min(left, l);
                right = Math.max(right, r);
            }
        }
        
        newIntervals.push([left, right]);
        this.count += (right - left + 1);
        
        newIntervals.sort((a, b) => a[0] - b[0]);
        this.intervals = newIntervals;
    }
    
    count() {
        return this.count;
    }
}
```

#### Problem 50: Time Based Key-Value Store

```javascript
class TimeMap {
    constructor() {
        this.map = new Map();
    }
    
    set(key, value, timestamp) {
        if (!this.map.has(key)) {
            this.map.set(key, []);
        }
        this.map.get(key).push([timestamp, value]);
    }
    
    get(key, timestamp) {
        if (!this.map.has(key)) return "";
        
        const values = this.map.get(key);
        let left = 0;
        let right = values.length - 1;
        let result = "";
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (values[mid][0] <= timestamp) {
                result = values[mid][1];
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
}
```

---

## Time Complexity Cheat Sheet

| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Sort intervals | O(n log n) | Most common first step |
| Merge intervals | O(n) | After sorting |
| Check overlap | O(1) | Two intervals |
| Insert interval | O(n) | Linear scan |
| Binary search | O(log n) | On sorted intervals |
| Sweep line | O(n log n) | Sort + linear scan |
| Interval tree operations | O(log n) | Insert, delete, query |

---

## Problem-Solving Patterns

### Pattern 1: Sort First
**When to use:**
- Most interval problems
- Need to process in order
- Finding overlaps/merges

### Pattern 2: Sweep Line
**When to use:**
- Multiple intervals active at once
- Counting simultaneous events
- Resource allocation

### Pattern 3: Greedy
**When to use:**
- Minimize/maximize count
- Non-overlapping selection
- Scheduling problems

### Pattern 4: Binary Search
**When to use:**
- Finding closest interval
- Range queries
- Sorted interval operations

### Pattern 5: Two Pointers
**When to use:**
- Merging sorted lists
- Finding intersections
- Comparing two interval lists

---

## Tips & Tricks

1. **Always draw examples** - Visualize intervals on a timeline
2. **Sort by start or end** - Choose based on problem requirements
3. **Watch for edge cases**:
   - Empty intervals
   - Single point intervals
   - Overlapping vs touching intervals
   - Integer overflow

4. **Common mistakes**:
   - Forgetting to sort
   - Off-by-one errors (inclusive vs exclusive)
   - Not handling edge cases

---

## Practice Resources

- **LeetCode**: Intervals tag
- **InterviewBit**: Greedy Intervals section
- **GeeksforGeeks**: Interval problems
- **Codeforces**: Greedy + sortings

---

**Happy Coding! 📊**

