# 94. Merge k Sorted Lists (Heap Approach)

**LeetCode Link**: [23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

**Difficulty**: Hard

**Topics**: Linked List, Divide and Conquer, Heap, Merge Sort

---

## Problem Statement

You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

### Examples

**Example 1:**
```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
```

**Example 2:**
```
Input: lists = []
Output: []
```

### Constraints
- `k == lists.length`
- `0 <= k <= 10^4`
- `0 <= lists[i].length <= 500`
- `-10^4 <= lists[i][j] <= 10^4`

---

## Approach: Min-Heap of K Heads ✅

### Implementation

```javascript
/**
 * Min-Heap of list heads - O(N log k) time
 * N = total nodes, k = number of lists
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
    const dummy = new ListNode(0);
    let tail = dummy;
    
    const heap = [];
    for (let i = 0; i < lists.length; i++) {
        if (lists[i]) {
            heap.push({ val: lists[i].val, node: lists[i], listIndex: i });
        }
    }
    
    heap.sort((a, b) => a.val - b.val);
    
    while (heap.length > 0) {
        const { node, listIndex } = heap.shift();
        tail.next = node;
        tail = tail.next;
        
        if (node.next) {
            const nextNode = node.next;
            const insert = { val: nextNode.val, node: nextNode, listIndex };
            heap.push(insert);
            heap.sort((a, b) => a.val - b.val);
        }
    }
    
    return dummy.next;
}

// With proper min-heap (for O(log k) extract):
class MinHeap {
    constructor() {
        this.heap = [];
    }
    push(item) {
        this.heap.push(item);
        this.bubbleUp(this.heap.length - 1);
    }
    pop() {
        if (this.heap.length === 0) return null;
        const top = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.bubbleDown(0);
        return top;
    }
    bubbleUp(i) {
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.heap[i].val >= this.heap[p].val) break;
            [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
            i = p;
        }
    }
    bubbleDown(i) {
        const n = this.heap.length;
        while (true) {
            let smallest = i;
            const L = 2*i+1, R = 2*i+2;
            if (L < n && this.heap[L].val < this.heap[smallest].val) smallest = L;
            if (R < n && this.heap[R].val < this.heap[smallest].val) smallest = R;
            if (smallest === i) break;
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            i = smallest;
        }
    }
}

function mergeKListsWithHeap(lists) {
    const heap = new MinHeap();
    for (const list of lists) {
        if (list) heap.push({ val: list.val, node: list });
    }
    const dummy = new ListNode(0);
    let tail = dummy;
    while (heap.heap.length > 0) {
        const { node } = heap.pop();
        tail.next = node;
        tail = tail.next;
        if (node.next) heap.push({ val: node.next.val, node: node.next });
    }
    return dummy.next;
}
```

### Complexity Analysis
- **Time**: O(N log k) with heap; N = total nodes
- **Space**: O(k) for heap

---

## Key Takeaways

✅ Push all list heads into min-heap  
✅ Pop min, append to result, push its next if exists  
✅ O(N log k) time, O(k) space  
✅ Same problem as Linked List #44; heap is one of two main approaches  
✅ Pattern: Merge k sorted → Min-heap of k heads  

**Pattern**: Merge k sorted lists → Min-heap!

**Heaps Complete! (7/7) ✅**
