# 89. Last Stone Weight

**LeetCode Link**: [1046. Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)

**Difficulty**: Easy

**Topics**: Array, Heap (Priority Queue)

---

## Problem Statement

You are given an array of integers `stones` where `stones[i]` is the weight of the `ith` stone.

We are playing a game with the stones. On each turn, we choose the **heaviest two stones** and smash them together. Suppose the heaviest two stones have weights `x` and `y` with `x <= y`. The result of this smash is:
- If `x == y`, both stones are destroyed.
- If `x != y`, the stone of weight `x` is destroyed, and the stone of weight `y` has new weight `y - x`.

At the end of the game, there is **at most one** stone left. Return the weight of the last remaining stone. If there are no stones left, return `0`.

### Examples

**Example 1:**
```
Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation: 8-7=1, 4-2=2, 2-1=1, 1-1=0. Last stone 1.
```

**Example 2:**
```
Input: stones = [1]
Output: 1
```

### Constraints
- `1 <= stones.length <= 30`
- `1 <= stones[i] <= 1000`

---

## Approach: Max-Heap ✅

### Implementation

```javascript
/**
 * Max-Heap - O(n log n) time, O(n) space
 * @param {number[]} stones
 * @return {number}
 */
function lastStoneWeight(stones) {
    // Max-heap: negate for JS (min-heap of negatives = max-heap)
    const heap = stones.map(s => -s);
    heap.sort((a, b) => a - b); // min-heap of negatives
    
    function heapPop() {
        const top = heap[0];
        heap[0] = heap[heap.length - 1];
        heap.pop();
        bubbleDown(0);
        return -top;
    }
    
    function heapPush(val) {
        heap.push(-val);
        bubbleUp(heap.length - 1);
    }
    
    function bubbleUp(i) {
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (heap[i] >= heap[p]) break;
            [heap[i], heap[p]] = [heap[p], heap[i]];
            i = p;
        }
    }
    
    function bubbleDown(i) {
        const n = heap.length;
        while (true) {
            let smallest = i;
            const L = 2 * i + 1, R = 2 * i + 2;
            if (L < n && heap[L] < heap[smallest]) smallest = L;
            if (R < n && heap[R] < heap[smallest]) smallest = R;
            if (smallest === i) break;
            [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
            i = smallest;
        }
    }
    
    while (heap.length > 1) {
        const y = heapPop();
        const x = heapPop();
        if (x !== y) heapPush(y - x);
    }
    
    return heap.length === 0 ? 0 : heapPop();
}
```

### Simpler: Sort and Simulate

```javascript
function lastStoneWeightSort(stones) {
    while (stones.length > 1) {
        stones.sort((a, b) => a - b);
        const y = stones.pop();
        const x = stones.pop();
        if (y !== x) stones.push(y - x);
    }
    return stones[0] || 0;
}
```

### Complexity Analysis
- **Time**: O(n log n) with heap; O(n² log n) with sort each time
- **Space**: O(n)

---

## Key Takeaways

✅ Always pick two largest → max-heap  
✅ Pop two, push |y-x| if different  
✅ Repeat until ≤1 stone  
✅ JS: use min-heap of negatives for max-heap  
✅ O(n log n) with heap  
✅ Pattern: repeatedly take max two → Max-heap  

**Pattern**: Repeatedly remove max two → Max-heap!
