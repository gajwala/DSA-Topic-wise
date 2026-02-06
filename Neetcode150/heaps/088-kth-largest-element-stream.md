# 88. Kth Largest Element in a Stream

**LeetCode Link**: [703. Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/)

**Difficulty**: Easy

**Topics**: Tree, Design, Binary Search Tree, Heap (Priority Queue), Data Stream

---

## Problem Statement

Design a class to find the `kth` largest element in a stream. Note that it is the `kth` largest element in the **sorted order**, not the `kth` distinct element.

Implement `KthLargest` class:
- `KthLargest(int k, int[] nums)` Initializes the object with the integer `k` and the stream of integers `nums`.
- `int add(int val)` Appends the integer `val` to the stream and returns the element representing the kth largest element in the stream.

### Examples

**Example 1:**
```
Input: ["KthLargest", "add", "add", "add", "add", "add"]
       [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output: [null, 4, 5, 5, 8, 8]
Explanation: kth largest with k=3. After adds: 4, 5, 5, 8, 8.
```

### Constraints
- `1 <= k <= 10^4`
- `0 <= nums.length <= 10^4`
- `-10^4 <= nums[i], val <= 10^4`
- At most `10^4` calls to add

---

## Approach: Min-Heap of Size K ✅

### Implementation

```javascript
/**
 * Min-Heap of size k - kth largest is the minimum in the heap
 * O(log k) per add
 */
class KthLargest {
    /**
     * @param {number} k
     * @param {number[]} nums
     */
    constructor(k, nums) {
        this.k = k;
        this.heap = [];
        for (const num of nums) {
            this.add(num);
        }
    }
    
    /**
     * @param {number} val
     * @return {number}
     */
    add(val) {
        if (this.heap.length < this.k) {
            this.heap.push(val);
            this.bubbleUp(this.heap.length - 1);
        } else if (val > this.heap[0]) {
            this.heap[0] = val;
            this.bubbleDown(0);
        }
        return this.heap[0];
    }
    
    bubbleUp(i) {
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.heap[i] >= this.heap[parent]) break;
            [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
            i = parent;
        }
    }
    
    bubbleDown(i) {
        const n = this.heap.length;
        while (true) {
            let smallest = i;
            const left = 2 * i + 1, right = 2 * i + 2;
            if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
            if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
            if (smallest === i) break;
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            i = smallest;
        }
    }
}
```

### Complexity Analysis
- **Time**: O(n log k) init, O(log k) per add
- **Space**: O(k)

---

## Key Takeaways

✅ Keep only k largest: use min-heap of size k  
✅ kth largest = heap minimum (peek)  
✅ If heap size < k, push and bubble up  
✅ If val > min, replace min and bubble down  
✅ O(log k) per add  
✅ Pattern: kth largest in stream → min-heap size k  

**Pattern**: Kth largest in stream → Min-heap of size K!
