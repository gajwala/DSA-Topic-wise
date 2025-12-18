# Heap Data Structure - Complete Guide

## Table of Contents
1. [Theory](#theory)
2. [MinHeap Implementation](#minheap-implementation)
3. [MaxHeap Implementation](#maxheap-implementation)
4. [MinHeap with Custom Comparator](#minheap-with-custom-comparator)
5. [Visual Examples](#visual-examples)
6. [Time & Space Complexity](#time--space-complexity)
7. [Real-World Use Cases](#real-world-use-cases)
8. [Example: Minimum Spanning Tree](#example-minimum-spanning-tree)

---

## Theory

### What is a Heap?

A **Heap** is a complete binary tree that satisfies the heap property:
- **Min-Heap**: Parent node ≤ all child nodes (smallest element at root)
- **Max-Heap**: Parent node ≥ all child nodes (largest element at root)

### Key Properties

1. **Complete Binary Tree**: All levels filled except possibly the last, filled left to right
2. **Array Representation**: No need for node objects, use array indices
3. **Parent-Child Relationship**:
   - Parent index: `Math.floor((i - 1) / 2)`
   - Left child: `2 * i + 1`
   - Right child: `2 * i + 2`

### Array Representation

```
Array: [10, 15, 20, 17, 25]

Tree:
       10
      /  \
    15    20
   /  \
  17   25

Index:  0   1   2   3   4
```

---

## MinHeap Implementation

### Basic MinHeap (For Numbers)

```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) { 
    return Math.floor((i - 1) / 2); 
  }

  getLeftIndex(i) { 
    return i * 2 + 1; 
  }

  getRightIndex(i) { 
    return i * 2 + 2; 
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = this.getParentIndex(index);
      if (this.heap[parent] <= this.heap[index]) break;
      this.swap(parent, index);
      index = parent;
    }
  }

  removeMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyDown() {
    let index = 0;
    while (true) {
      let left = this.getLeftIndex(index);
      let right = this.getRightIndex(index);
      let smallest = index;

      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === index) break;
      
      this.swap(index, smallest);
      index = smallest;
    }
  }

  peek() {
    return this.heap[0] ?? null;
  }
}
```

### Usage Example

```javascript
const minHeap = new MinHeap();

// Insert elements
minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(20);
minHeap.insert(3);
minHeap.insert(8);

console.log(minHeap.peek());        // 3 (minimum element)
console.log(minHeap.removeMin());   // 3
console.log(minHeap.peek());        // 5 (next minimum)
```

### Visual: Insert Operation

**Inserting 3 into heap [5, 10, 20, 15]:**

```
Step 1: Add to end
       5
      / \
    10   20
   /  \
  15   3*

Step 2: Heapify Up - Compare with parent (10)
       5
      / \
    3*   20
   /  \
  15   10

Step 3: Heapify Up - Compare with parent (5)
       3*
      / \
    5    20
   /  \
  15   10

Final MinHeap: [3, 5, 20, 15, 10]
```

### Visual: RemoveMin Operation

**Removing min from [3, 5, 20, 15, 10]:**

```
Step 1: Replace root with last element
       10*
      / \
    5    20
   /
  15

Step 2: Heapify Down - Compare with children (5, 20)
       5
      / \
    10*   20
   /
  15

Step 3: Heapify Down - Compare with children (15)
       5
      / \
    10    20
   /
  15

Final MinHeap: [5, 10, 20, 15]
```

---

## MaxHeap Implementation

### Basic MaxHeap (For Numbers)

```javascript
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) { 
    return Math.floor((i - 1) / 2); 
  }

  getLeftIndex(i) { 
    return i * 2 + 1; 
  }

  getRightIndex(i) { 
    return i * 2 + 2; 
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = this.getParentIndex(index);
      if (this.heap[parent] >= this.heap[index]) break; // Max-Heap: parent >= child
      this.swap(parent, index);
      index = parent;
    }
  }

  removeMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return max;
  }

  heapifyDown() {
    let index = 0;
    while (true) {
      let left = this.getLeftIndex(index);
      let right = this.getRightIndex(index);
      let largest = index;

      if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
        largest = left;
      }

      if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
        largest = right;
      }

      if (largest === index) break;
      
      this.swap(index, largest);
      index = largest;
    }
  }

  peek() {
    return this.heap[0] ?? null;
  }
}
```

### Usage Example

```javascript
const maxHeap = new MaxHeap();

// Insert elements
maxHeap.insert(10);
maxHeap.insert(5);
maxHeap.insert(20);
maxHeap.insert(3);
maxHeap.insert(8);

console.log(maxHeap.peek());        // 20 (maximum element)
console.log(maxHeap.removeMax());   // 20
console.log(maxHeap.peek());        // 10 (next maximum)
```

### Visual: MaxHeap Example

```
MaxHeap: [20, 10, 8, 3, 5]

Tree:
       20
      /  \
    10    8
   /  \
  3    5

Property: Every parent ≥ its children
- 20 ≥ 10 ✓
- 20 ≥ 8 ✓
- 10 ≥ 3 ✓
- 10 ≥ 5 ✓
```

---

## MinHeap with Custom Comparator

### For Objects and Custom Comparison

```javascript
class MinHeap {
  constructor(compareFn = (a, b) => a - b) {
    this.heap = [];
    this.compare = compareFn; // Custom comparison function
  }

  getParentIndex(i) { 
    return Math.floor((i - 1) / 2); 
  }

  getLeftIndex(i) { 
    return i * 2 + 1; 
  }

  getRightIndex(i) { 
    return i * 2 + 2; 
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parent = this.getParentIndex(index);
      // Use custom compare function
      if (this.compare(this.heap[parent], this.heap[index]) <= 0) break;
      this.swap(parent, index);
      index = parent;
    }
  }

  removeMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    
    while (true) {
      const left = this.getLeftIndex(index);
      const right = this.getRightIndex(index);
      let smallest = index;

      // Use custom compare function
      if (left < length && this.compare(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }

      if (right < length && this.compare(this.heap[right], this.heap[smallest]) < 0) {
        smallest = right;
      }

      if (smallest === index) break;
      
      this.swap(index, smallest);
      index = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  peek() {
    return this.heap[0] ?? null;
  }

  size() {
    return this.heap.length;
  }
}
```

### Usage Examples with Objects

#### Example 1: Priority Queue with Tasks

```javascript
// Compare by priority (lower number = higher priority)
const taskHeap = new MinHeap((a, b) => a.priority - b.priority);

taskHeap.insert({ task: "Fix bug", priority: 1 });
taskHeap.insert({ task: "Write docs", priority: 3 });
taskHeap.insert({ task: "Code review", priority: 2 });

console.log(taskHeap.removeMin()); 
// { task: "Fix bug", priority: 1 } - Highest priority
```

#### Example 2: Event Scheduler

```javascript
// Compare by timestamp
const eventHeap = new MinHeap((a, b) => a.timestamp - b.timestamp);

eventHeap.insert({ event: "Meeting", timestamp: 1000 });
eventHeap.insert({ event: "Lunch", timestamp: 500 });
eventHeap.insert({ event: "Call", timestamp: 750 });

console.log(eventHeap.removeMin()); 
// { event: "Lunch", timestamp: 500 } - Earliest event
```

#### Example 3: Dijkstra's Algorithm

```javascript
// Compare by distance
const distHeap = new MinHeap((a, b) => a.distance - b.distance);

distHeap.insert({ node: 1, distance: 10 });
distHeap.insert({ node: 2, distance: 5 });
distHeap.insert({ node: 3, distance: 15 });

console.log(distHeap.removeMin()); 
// { node: 2, distance: 5 } - Shortest distance
```

---

## Visual Examples

### MinHeap vs MaxHeap Comparison

```
Same Input: [15, 10, 20, 8, 25, 30, 5]

MinHeap:                    MaxHeap:
       5                           30
      / \                         /  \
    8    10                     25    20
   / \   / \                   / \   /  \
  15 25 30 20                 8  15 10   5

Array: [5,8,10,15,25,30,20]   Array: [30,25,20,8,15,10,5]
Root: 5 (minimum)             Root: 30 (maximum)
```

### Heapify Process - Complete Example

**Building MinHeap from [15, 10, 20, 8]:**

```
Step 1: Insert 15
[15]
    15

Step 2: Insert 10
[15, 10] → [10, 15]  (swap)
    10
   /
  15

Step 3: Insert 20
[10, 15, 20]  (no swap needed)
    10
   /  \
  15   20

Step 4: Insert 8
[10, 15, 20, 8] → [10, 8, 20, 15] → [8, 10, 20, 15]
    8
   / \
  10  20
 /
15

Final: [8, 10, 20, 15]
```

---

## Time & Space Complexity

### Operations

| Operation | Time Complexity | Explanation |
|-----------|----------------|-------------|
| `insert()` | O(log n) | Heapify up through tree height |
| `removeMin()` / `removeMax()` | O(log n) | Heapify down through tree height |
| `peek()` | O(1) | Just return root element |
| `isEmpty()` | O(1) | Check array length |
| Build heap from array | O(n) | Heapify n/2 nodes |

### Space Complexity

| Aspect | Space Complexity |
|--------|-----------------|
| Storage | O(n) for n elements |
| Auxiliary | O(1) for operations |

### Why O(log n)?

- Heap height = log₂(n)
- Operations traverse at most the height
- Example: 1000 elements → height ≈ 10 operations max

---

## Real-World Use Cases

### 1. Priority Queue
```javascript
// Hospital Emergency Room
const erQueue = new MinHeap((a, b) => a.severity - b.severity);

erQueue.insert({ patient: "John", severity: 3 }); // Moderate
erQueue.insert({ patient: "Jane", severity: 1 }); // Critical
erQueue.insert({ patient: "Bob", severity: 5 });  // Minor

const nextPatient = erQueue.removeMin(); 
// Jane (severity: 1) - Most critical
```

### 2. Task Scheduling
```javascript
// Operating System CPU Scheduler
const cpuScheduler = new MinHeap((a, b) => a.execTime - b.execTime);

cpuScheduler.insert({ process: "P1", execTime: 100 });
cpuScheduler.insert({ process: "P2", execTime: 20 });
cpuScheduler.insert({ process: "P3", execTime: 50 });

// Shortest Job First
const nextProcess = cpuScheduler.removeMin(); // P2 (20ms)
```

### 3. Finding K Largest/Smallest Elements
```javascript
// Find 3 smallest numbers in stream
const minHeap = new MinHeap();
const numbers = [10, 5, 20, 3, 15, 8, 30];

numbers.forEach(num => minHeap.insert(num));

const smallest3 = [];
for (let i = 0; i < 3; i++) {
  smallest3.push(minHeap.removeMin());
}
console.log(smallest3); // [3, 5, 8]
```

### 4. Median Finder
```javascript
// Use MinHeap for larger half, MaxHeap for smaller half
class MedianFinder {
  constructor() {
    this.minHeap = new MinHeap(); // Larger half
    this.maxHeap = new MaxHeap(); // Smaller half
  }

  addNum(num) {
    if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
      this.maxHeap.insert(num);
    } else {
      this.minHeap.insert(num);
    }

    // Balance heaps
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.insert(this.maxHeap.removeMax());
    } else if (this.minHeap.size() > this.maxHeap.size()) {
      this.maxHeap.insert(this.minHeap.removeMin());
    }
  }

  findMedian() {
    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peek();
    }
    return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
  }
}
```

---

## Example: Minimum Spanning Tree (Prim's Algorithm)

### Problem
Find the minimum cost to connect all vertices in a weighted graph.

### Solution Using MinHeap

```javascript
class Solution {
  spanningTree(V, edges) {
    // Build adjacency list
    const adj = new Map();
    for (let i = 0; i < V; i++) {
      adj.set(i, []);
    }
    
    for (let i = 0; i < edges.length; i++) {
      const [u, v, w] = edges[i];
      adj.get(u).push({ v, w });
      adj.get(v).push({ v: u, w });
    }

    // Min-heap based on edge weight
    const pq = new MinHeap((a, b) => a.dis - b.dis);
    const visited = Array(V).fill(false);
    let sum = 0;

    // Start from node 0 with edge weight 0
    pq.insert({ dis: 0, node: 0 });

    while (!pq.isEmpty()) {
      const { dis, node } = pq.removeMin();
      
      if (visited[node]) continue;
      
      visited[node] = true;
      sum += dis; // Add edge weight to MST

      // Explore neighbors
      const neighbours = adj.get(node);
      for (let neighbour of neighbours) {
        const { v, w } = neighbour;
        if (!visited[v]) {
          pq.insert({ dis: w, node: v });
        }
      }
    }

    return sum;
  }
}
```

### Visual Example

```
Input Graph:
    0 ---2--- 1
    |         |
    6         3
    |         |
    2 ---8--- 3
    |
    7
    |
    4

Edges: [[0,1,2], [0,2,6], [1,3,3], [2,3,8], [2,4,7]]

Prim's Algorithm Steps:

Step 1: Start at node 0
Heap: [{dis:0, node:0}]
Visited: []
MST Cost: 0

Step 2: Visit node 0, add edges
Heap: [{dis:2, node:1}, {dis:6, node:2}]
Visited: [0]
MST Cost: 0

Step 3: Visit node 1 (smallest edge)
Heap: [{dis:3, node:3}, {dis:6, node:2}]
Visited: [0, 1]
MST Cost: 0 + 2 = 2

Step 4: Visit node 3
Heap: [{dis:6, node:2}, {dis:8, node:2}]
Visited: [0, 1, 3]
MST Cost: 2 + 3 = 5

Step 5: Visit node 2 (ignore duplicate edge)
Heap: [{dis:7, node:4}]
Visited: [0, 1, 3, 2]
MST Cost: 5 + 6 = 11

Step 6: Visit node 4
Heap: []
Visited: [0, 1, 3, 2, 4]
MST Cost: 11 + 7 = 18

MST Edges: 0-1(2), 1-3(3), 0-2(6), 2-4(7)
Total Cost: 18
```

### Why MinHeap is Perfect for MST?

1. **Always picks smallest edge** - O(log E) per edge
2. **Efficient exploration** - Doesn't check all edges
3. **Better than sorting** - O(E log E) vs O(E log V) with heap
4. **Dynamic updates** - Add edges as we explore

---

## Common Pitfalls

### ❌ Wrong: Direct Array Comparison
```javascript
if (this.heap[parent] < this.heap[index]) // Works for numbers only
```

### ✅ Correct: Use Comparator
```javascript
if (this.compare(this.heap[parent], this.heap[index]) < 0) // Works for all types
```

### ❌ Wrong: Forgetting to Heapify
```javascript
insert(value) {
  this.heap.push(value); // Missing heapifyUp!
}
```

### ✅ Correct: Always Heapify
```javascript
insert(value) {
  this.heap.push(value);
  this.heapifyUp(); // Restore heap property
}
```

---

## Summary

| Aspect | MinHeap | MaxHeap |
|--------|---------|---------|
| **Root** | Smallest element | Largest element |
| **Use Case** | Get minimum fast | Get maximum fast |
| **Priority Queue** | Low value = high priority | High value = high priority |
| **Sorting** | Heap sort ascending | Heap sort descending |
| **Example** | Dijkstra, Prim's | Job scheduling |

### When to Use Heap?

✅ Need frequent min/max access
✅ Priority queue operations
✅ K smallest/largest elements
✅ Streaming median
✅ Graph algorithms (Dijkstra, Prim's)

❌ Need sorted array (use sorting instead)
❌ Random access (use array/hash)
❌ FIFO/LIFO (use queue/stack)

---

## Practice Problems

1. **Kth Largest Element** - Use MinHeap of size K
2. **Merge K Sorted Lists** - Use MinHeap with K elements
3. **Top K Frequent Elements** - Use MinHeap with frequency
4. **Meeting Rooms II** - Use MinHeap for end times
5. **Dijkstra's Shortest Path** - Use MinHeap for distances

Happy Coding! 🚀

