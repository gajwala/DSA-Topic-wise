# 50. Meeting Rooms II (Leetcode Premium)

**LeetCode Link**: [253. Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)

**Difficulty**: Medium

**Topics**: Array, Two Pointers, Greedy, Sorting, Heap (Priority Queue), Prefix Sum

---

## Problem Statement

Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, return the **minimum number of conference rooms required**.

### Examples

**Example 1:**
```
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2
Explanation: 
- At time 0-5: need 1 room for [0,30]
- At time 5-10: need 2 rooms for [0,30] and [5,10]
- At time 10-15: need 1 room for [0,30]
- At time 15-20: need 2 rooms for [0,30] and [15,20]
- At time 20-30: need 1 room for [0,30]
Maximum concurrent: 2 rooms
```

**Example 2:**
```
Input: intervals = [[7,10],[2,4]]
Output: 1
Explanation: No overlap, only 1 room needed
```

**Example 3:**
```
Input: intervals = [[1,5],[2,6],[3,7]]
Output: 3
Explanation: At time 3-5, all three meetings overlap
```

### Constraints
- `1 <= intervals.length <= 10^4`
- `0 <= starti < endi <= 10^6`

---

## Approach 1: Chronological Ordering (Optimal!) ✅

### Intuition
Separate start and end times, sort both. When a meeting starts, increment rooms needed. When a meeting ends, decrement.

### Implementation

```javascript
/**
 * Chronological Ordering - O(n log n) time, O(n) space
 * @param {number[][]} intervals
 * @return {number}
 */
function minMeetingRooms(intervals) {
    if (intervals.length === 0) {
        return 0;
    }
    
    // Separate start and end times
    const starts = intervals.map(interval => interval[0]).sort((a, b) => a - b);
    const ends = intervals.map(interval => interval[1]).sort((a, b) => a - b);
    
    let rooms = 0;
    let maxRooms = 0;
    let endPointer = 0;
    
    for (let i = 0; i < starts.length; i++) {
        // If meeting starts before earliest ending meeting ends
        if (starts[i] < ends[endPointer]) {
            rooms++; // Need a new room
        } else {
            endPointer++; // A room gets freed
        }
        
        maxRooms = Math.max(maxRooms, rooms);
    }
    
    return maxRooms;
}

// Test
console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // 2
console.log(minMeetingRooms([[7,10],[2,4]])); // 1
console.log(minMeetingRooms([[1,5],[2,6],[3,7]])); // 3
```

### Complexity Analysis
- **Time Complexity**: `O(n log n)` - Sorting both arrays
- **Space Complexity**: `O(n)` - Two arrays for starts and ends

---

## Approach 2: Min Heap

```javascript
/**
 * Min Heap - O(n log n) time, O(n) space
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }
    
    peek() {
        return this.heap[0];
    }
    
    size() {
        return this.heap.length;
    }
    
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) break;
            
            [this.heap[index], this.heap[parentIndex]] = 
                [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    
    bubbleDown(index) {
        while (true) {
            let minIndex = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            
            if (leftChild < this.heap.length && 
                this.heap[leftChild] < this.heap[minIndex]) {
                minIndex = leftChild;
            }
            
            if (rightChild < this.heap.length && 
                this.heap[rightChild] < this.heap[minIndex]) {
                minIndex = rightChild;
            }
            
            if (minIndex === index) break;
            
            [this.heap[index], this.heap[minIndex]] = 
                [this.heap[minIndex], this.heap[index]];
            index = minIndex;
        }
    }
}

function minMeetingRoomsHeap(intervals) {
    if (intervals.length === 0) return 0;
    
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    // Min heap stores end times of ongoing meetings
    const heap = new MinHeap();
    heap.push(intervals[0][1]); // Add first meeting's end time
    
    for (let i = 1; i < intervals.length; i++) {
        // If earliest ending meeting has ended, reuse room
        if (intervals[i][0] >= heap.peek()) {
            heap.pop();
        }
        
        // Add current meeting's end time
        heap.push(intervals[i][1]);
    }
    
    return heap.size(); // Number of rooms = heap size
}
```

---

## Visual Example

```
intervals = [[0,30],[5,10],[15,20]]

Chronological Ordering Approach:
─────────────────────────────────

starts: [0, 5, 15]
ends:   [10, 20, 30]

Timeline:
0        5        10       15       20       30
|--------|--------|--------|--------|--------|
start[0] start[1]  end[0]  start[2] end[1]  end[2]

Process starts array:
i=0: start=0
  0 < ends[0]=10 → Need room
  rooms=1, maxRooms=1

i=1: start=5
  5 < ends[0]=10 → Need room
  rooms=2, maxRooms=2

i=2: start=15
  15 >= ends[0]=10 → Room freed
  endPointer=1, rooms=2
  15 < ends[1]=20 → Need room
  rooms=2, maxRooms=2

Result: 2 rooms ✓
```

---

## Min Heap Visualization

```
intervals = [[0,30],[5,10],[15,20]]

Sort by start: [[0,30],[5,10],[15,20]]

Process:
────────
Meeting [0,30]:
  heap = [30]
  rooms = 1

Meeting [5,10]:
  5 < heap.peek()=30 → Can't reuse
  heap = [30, 10] → after heapify: [10, 30]
  rooms = 2

Meeting [15,20]:
  15 >= heap.peek()=10 → Can reuse!
  heap.pop() → [30]
  heap.push(20) → [20, 30]
  rooms = 2

Result: 2 rooms ✓
```

---

## Approach 3: Sweep Line Algorithm

```javascript
/**
 * Sweep Line - O(n log n) time, O(n) space
 */
function minMeetingRoomsSweepLine(intervals) {
    const events = [];
    
    // Create events: +1 for start, -1 for end
    for (const interval of intervals) {
        events.push([interval[0], 1]);  // Start event
        events.push([interval[1], -1]); // End event
    }
    
    // Sort events (if times equal, end comes before start)
    events.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1]; // End (-1) before start (1)
        }
        return a[0] - b[0];
    });
    
    let rooms = 0;
    let maxRooms = 0;
    
    for (const [time, delta] of events) {
        rooms += delta;
        maxRooms = Math.max(maxRooms, rooms);
    }
    
    return maxRooms;
}
```

---

## Edge Cases

```javascript
// Single meeting
console.log(minMeetingRooms([[1,5]])); // 1

// No overlap
console.log(minMeetingRooms([[1,2],[3,4],[5,6]])); // 1

// All overlap
console.log(minMeetingRooms([[1,10],[2,10],[3,10]])); // 3

// Adjacent meetings
console.log(minMeetingRooms([[1,5],[5,10]])); // 1

// Nested meetings
console.log(minMeetingRooms([[1,10],[2,5],[3,4]])); // 3

// Same start time
console.log(minMeetingRooms([[1,5],[1,10],[1,15]])); // 3

// Same end time
console.log(minMeetingRooms([[1,5],[2,5],[3,5]])); // 3
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Count minimum rooms needed? Maximum concurrent meetings? Yes."

2. **Three approaches**:
   - Chronological ordering: Separate and sort start/end times
   - Min heap: Track ongoing meeting end times
   - Sweep line: Count concurrent meetings at each time

3. **Key insight**: "Problem = finding maximum concurrent meetings at any point in time"

4. **Why chronological works**: "When meeting starts before earliest ending, need new room"

5. **Complexity**: "All approaches O(n log n) time, O(n) space"

### Follow-up Questions:

**Q: Which approach is best?**
A: Chronological ordering is simplest and most intuitive. Min heap is good if you need actual room assignments.

**Q: Can you assign specific room numbers?**
```javascript
function assignRooms(intervals) {
    const assignments = new Array(intervals.length);
    const indexed = intervals.map((interval, i) => [...interval, i]);
    indexed.sort((a, b) => a[0] - b[0]);
    
    const heap = new MinHeap(); // Store [endTime, roomNumber]
    let nextRoom = 0;
    
    for (const [start, end, index] of indexed) {
        if (heap.size() > 0 && start >= heap.peek()[0]) {
            const [_, room] = heap.pop();
            assignments[index] = room;
            heap.push([end, room]);
        } else {
            assignments[index] = nextRoom;
            heap.push([end, nextRoom]);
            nextRoom++;
        }
    }
    
    return assignments;
}
```

---

## Related Problems

- [252. Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)
- [56. Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- [435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- [1094. Car Pooling](https://leetcode.com/problems/car-pooling/)

---

## Key Takeaways

✅ Find maximum concurrent meetings  
✅ Chronological: separate and sort start/end times  
✅ Min heap: track ongoing meeting end times  
✅ When start < earliest end, need new room  
✅ All approaches O(n log n) time  

**Pattern**: Minimum rooms → Track concurrent events!

**Intervals Complete! (5/5) ✅**
