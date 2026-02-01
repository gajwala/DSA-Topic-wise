# 44. Merge k Sorted Lists

**LeetCode Link**: [23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

**Difficulty**: Hard

**Topics**: Linked List, Divide and Conquer, Heap (Priority Queue), Merge Sort

---

## Problem Statement

You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

### Examples

**Example 1:**
```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: Merging the lists in ascending order gives [1,1,2,3,4,4,5,6]
```

**Example 2:**
```
Input: lists = []
Output: []
```

**Example 3:**
```
Input: lists = [[]]
Output: []
```

### Constraints
- `k == lists.length`
- `0 <= k <= 10^4`
- `0 <= lists[i].length <= 500`
- `-10^4 <= lists[i][j] <= 10^4`
- `lists[i]` is sorted in **ascending** order
- The sum of `lists[i].length` will not exceed `10^4`

---

## Approach 1: Brute Force (Merge All)

```javascript
function mergeKLists(lists) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (true) {
        let minIndex = -1;
        let minValue = Infinity;
        
        // Find list with minimum head
        for (let i = 0; i < lists.length; i++) {
            if (lists[i] !== null && lists[i].val < minValue) {
                minValue = lists[i].val;
                minIndex = i;
            }
        }
        
        if (minIndex === -1) break; // All lists exhausted
        
        // Add minimum node
        current.next = lists[minIndex];
        current = current.next;
        lists[minIndex] = lists[minIndex].next;
    }
    
    return dummy.next;
}
```

**Complexity**: O(k * n) where n is total nodes - Too slow!

---

## Approach 2: Min Heap (Priority Queue) ✅

### Intuition
Use min heap to efficiently find minimum among k lists. Push all heads, extract min, push next node.

### Implementation

```javascript
/**
 * Min Heap Approach - O(n log k)
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(node) {
        this.heap.push(node);
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
    
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].val >= this.heap[parentIndex].val) break;
            
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
                this.heap[leftChild].val < this.heap[minIndex].val) {
                minIndex = leftChild;
            }
            
            if (rightChild < this.heap.length && 
                this.heap[rightChild].val < this.heap[minIndex].val) {
                minIndex = rightChild;
            }
            
            if (minIndex === index) break;
            
            [this.heap[index], this.heap[minIndex]] = 
                [this.heap[minIndex], this.heap[index]];
            index = minIndex;
        }
    }
    
    size() {
        return this.heap.length;
    }
}

function mergeKLists(lists) {
    const heap = new MinHeap();
    const dummy = new ListNode(0);
    let current = dummy;
    
    // Add all list heads to heap
    for (const list of lists) {
        if (list !== null) {
            heap.push(list);
        }
    }
    
    // Extract min and add next node
    while (heap.size() > 0) {
        const minNode = heap.pop();
        current.next = minNode;
        current = current.next;
        
        if (minNode.next !== null) {
            heap.push(minNode.next);
        }
    }
    
    return dummy.next;
}
```

### Complexity Analysis
- **Time Complexity**: `O(n log k)` where n = total nodes, k = number of lists
  - Each of n nodes: log k to insert/extract from heap
- **Space Complexity**: `O(k)` - Heap stores at most k nodes

---

## Approach 3: Divide and Conquer (Optimal!) ✅

### Intuition
Merge lists pairwise recursively. Like merge sort - O(n log k).

### Implementation

```javascript
/**
 * Divide and Conquer - O(n log k)
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKListsDivideConquer(lists) {
    if (lists.length === 0) return null;
    
    return mergeHelper(lists, 0, lists.length - 1);
}

function mergeHelper(lists, left, right) {
    // Base case: single list
    if (left === right) {
        return lists[left];
    }
    
    // Divide
    const mid = Math.floor((left + right) / 2);
    const leftList = mergeHelper(lists, left, mid);
    const rightList = mergeHelper(lists, mid + 1, right);
    
    // Conquer: merge two sorted lists
    return mergeTwoLists(leftList, rightList);
}

function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 !== null && l2 !== null) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    current.next = l1 !== null ? l1 : l2;
    
    return dummy.next;
}

// Test
const list1 = new ListNode(1, new ListNode(4, new ListNode(5)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const list3 = new ListNode(2, new ListNode(6));

const result = mergeKListsDivideConquer([list1, list2, list3]);
// Result: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
```

### Complexity Analysis
- **Time Complexity**: `O(n log k)`
  - log k levels of merging
  - Each level processes all n nodes
- **Space Complexity**: `O(log k)` - Recursion stack

---

## Visual Example

```
lists = [[1,4,5], [1,3,4], [2,6]]

Divide and Conquer:
───────────────────

Level 0: [[1,4,5], [1,3,4], [2,6]]
          /                  \
Level 1: [1,4,5]    [1,3,4],[2,6]
                      /        \
Level 2:           [1,3,4]    [2,6]
                      \        /
Level 3:            [1,2,3,4,6]
          \                    /
Level 4:     [1,1,2,3,4,4,5,6]

Total: log(3) + 1 ≈ 2 levels of merging
```

---

## Comparison of Approaches

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Brute Force | O(kn) | O(1) | Too slow |
| Min Heap | O(n log k) | O(k) | Good, intuitive |
| Divide & Conquer | O(n log k) | O(log k) | Optimal space |

---

## Edge Cases

```javascript
// Empty array
console.log(mergeKLists([])); // null

// Array with empty lists
console.log(mergeKLists([null, null])); // null

// Single list
const single = new ListNode(1, new ListNode(2));
console.log(mergeKLists([single])); // 1 -> 2

// Two lists
const l1 = new ListNode(1);
const l2 = new ListNode(2);
console.log(mergeKLists([l1, l2])); // 1 -> 2

// Lists with different lengths
const short = new ListNode(1);
const long = new ListNode(2, new ListNode(3, new ListNode(4)));
console.log(mergeKLists([short, long])); // 1 -> 2 -> 3 -> 4

// All same values
const same1 = new ListNode(1, new ListNode(1));
const same2 = new ListNode(1, new ListNode(1));
console.log(mergeKLists([same1, same2])); // 1 -> 1 -> 1 -> 1
```

---

## Interview Tips

### What to say:

1. **Clarify**: "k lists, each sorted? Merge into single sorted list? Yes."

2. **Three approaches**:
   - Brute force: Compare all k heads repeatedly - O(kn)
   - Min heap: Efficiently find minimum - O(n log k)
   - Divide & conquer: Merge pairwise - O(n log k), better space

3. **Why heap is O(n log k)**: "n total nodes, each insertion/extraction is log k"

4. **Why divide & conquer is O(n log k)**: "log k levels, each level merges n nodes"

5. **Trade-off**: "Heap is more intuitive, divide & conquer has better space complexity"

### Follow-up Questions:

**Q: Which approach is better in practice?**
A: Divide & conquer for better space complexity, but heap is more intuitive

**Q: What if lists are not sorted?**
```javascript
function mergeKListsUnsorted(lists) {
    // Collect all nodes
    const nodes = [];
    for (const list of lists) {
        let current = list;
        while (current !== null) {
            nodes.push(current);
            current = current.next;
        }
    }
    
    // Sort by value
    nodes.sort((a, b) => a.val - b.val);
    
    // Rebuild list
    const dummy = new ListNode(0);
    let current = dummy;
    for (const node of nodes) {
        current.next = node;
        current = current.next;
    }
    current.next = null;
    
    return dummy.next;
}
```

**Q: Can you do it iteratively instead of recursively?**
```javascript
function mergeKListsIterative(lists) {
    if (lists.length === 0) return null;
    
    while (lists.length > 1) {
        const merged = [];
        
        for (let i = 0; i < lists.length; i += 2) {
            const l1 = lists[i];
            const l2 = i + 1 < lists.length ? lists[i + 1] : null;
            merged.push(mergeTwoLists(l1, l2));
        }
        
        lists = merged;
    }
    
    return lists[0];
}
```

---

## Related Problems

- [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
- [88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
- [148. Sort List](https://leetcode.com/problems/sort-list/)

---

## Key Takeaways

✅ Three approaches: brute force, heap, divide & conquer  
✅ Min heap: O(n log k) time, O(k) space  
✅ Divide & conquer: O(n log k) time, O(log k) space  
✅ Heap finds minimum efficiently among k lists  
✅ Divide & conquer like merge sort  

**Pattern**: Merge k sorted structures → Min heap or divide & conquer!

**Linked List Complete! (11/11) ✅**
