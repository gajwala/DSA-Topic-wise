# 93. Find Median from Data Stream

**LeetCode Link**: [295. Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)

**Difficulty**: Hard

**Topics**: Two Pointers, Design, Sorting, Heap, Data Stream

---

## Problem Statement

The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle values.

Implement the `MedianFinder` class:
- `MedianFinder()` initializes the `MedianFinder` object.
- `void addNum(int num)` adds the integer `num` from the data stream to the data structure.
- `double findMedian()` returns the median of all elements so far.

### Examples

**Example 1:**
```
Input: ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
       [[], [1], [2], [], [3], []]
Output: [null, null, null, 1.5, null, 2.0]
```

### Constraints
- `-10^5 <= num <= 10^5`
- At most `5 * 10^4` calls to addNum and findMedian

---

## Approach: Two Heaps (Max-Heap + Min-Heap) ✅

### Implementation

```javascript
/**
 * Max-heap (left) + Min-heap (right)
 * Left half in max-heap, right half in min-heap
 * Median = max of left or (maxLeft + minRight)/2
 */
class MedianFinder {
    constructor() {
        this.left = []; // max-heap (negate values)
        this.right = []; // min-heap
    }
    
    /**
     * @param {number} num
     * @return {void}
     */
    addNum(num) {
        if (this.left.length === 0 || num <= -this.left[0]) {
            this.left.push(-num);
            this.bubbleUpLeft(this.left.length - 1);
        } else {
            this.right.push(num);
            this.bubbleUpRight(this.right.length - 1);
        }
        
        // Balance: left can have at most 1 more than right
        if (this.left.length > this.right.length + 1) {
            const val = -this.left[0];
            this.left[0] = this.left[this.left.length - 1];
            this.left.pop();
            this.bubbleDownLeft(0);
            this.right.push(val);
            this.bubbleUpRight(this.right.length - 1);
        } else if (this.right.length > this.left.length) {
            const val = this.right[0];
            this.right[0] = this.right[this.right.length - 1];
            this.right.pop();
            this.bubbleDownRight(0);
            this.left.push(-val);
            this.bubbleUpLeft(this.left.length - 1);
        }
    }
    
    /**
     * @return {number}
     */
    findMedian() {
        if (this.left.length > this.right.length) {
            return -this.left[0];
        }
        return (-this.left[0] + this.right[0]) / 2;
    }
    
    bubbleUpLeft(i) {
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.left[i] <= this.left[p]) break;
            [this.left[i], this.left[p]] = [this.left[p], this.left[i]];
            i = p;
        }
    }
    
    bubbleDownLeft(i) {
        const n = this.left.length;
        while (true) {
            let largest = i;
            const L = 2*i+1, R = 2*i+2;
            if (L < n && this.left[L] > this.left[largest]) largest = L;
            if (R < n && this.right[R] > this.left[largest]) largest = R;
            if (largest === i) break;
            [this.left[i], this.left[largest]] = [this.left[largest], this.left[i]];
            i = largest;
        }
    }
    
    bubbleUpRight(i) {
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.right[i] >= this.right[p]) break;
            [this.right[i], this.right[p]] = [this.right[p], this.right[i]];
            i = p;
        }
    }
    
    bubbleDownRight(i) {
        const n = this.right.length;
        while (true) {
            let smallest = i;
            const L = 2*i+1, R = 2*i+2;
            if (L < n && this.right[L] < this.right[smallest]) smallest = L;
            if (R < n && this.right[R] < this.right[smallest]) smallest = R;
            if (smallest === i) break;
            [this.right[i], this.right[smallest]] = [this.right[smallest], this.right[i]];
            i = smallest;
        }
    }
}
```

### Complexity Analysis
- **Time**: O(log n) addNum, O(1) findMedian
- **Space**: O(n)

---

## Key Takeaways

✅ Left half in max-heap, right half in min-heap  
✅ Keep size balance: left.size() >= right.size(), diff ≤ 1  
✅ Median = left.max() if odd, (left.max() + right.min())/2 if even  
✅ Add to left or right then rebalance  
✅ O(log n) add, O(1) median  
✅ Pattern: Median from stream → Two heaps  

**Pattern**: Median in stream → Max-heap + Min-heap!
