# 5. Top K Frequent Elements

**LeetCode Link**: [347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

**Difficulty**: Medium

**Topics**: Array, Hash Table, Divide and Conquer, Sorting, Heap, Bucket Sort, Counting

---

## Problem Statement

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

### Examples

**Example 1:**
```
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

**Example 2:**
```
Input: nums = [1], k = 1
Output: [1]
```

### Constraints
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `k` is in the range `[1, the number of unique elements in the array]`
- It is guaranteed that the answer is unique

---

## Approach 1: Brute Force (Count + Sort)

### Intuition
Count frequencies, sort by frequency, take top k.

### Algorithm
1. Count frequency of each element
2. Convert to array of [element, frequency] pairs
3. Sort by frequency (descending)
4. Take first k elements

### Implementation

```javascript
/**
 * Brute Force - Count and Sort
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
    // Count frequencies
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Convert to array and sort by frequency
    const sorted = Array.from(freqMap.entries())
        .sort((a, b) => b[1] - a[1]); // Sort by frequency descending
    
    // Take top k elements
    return sorted.slice(0, k).map(([num, freq]) => num);
}

// Test
console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1, 2]
console.log(topKFrequent([1], 1)); // [1]
```

### Complexity Analysis
- **Time Complexity**: `O(n log n)` - Sorting dominates
- **Space Complexity**: `O(n)` - Frequency map

### Can we do better than O(n log n)?

---

## Approach 2: Min Heap (Good for small k)

### Intuition
Use a min heap of size k. Keep only the k most frequent elements.

### Algorithm
1. Count frequencies
2. Use min heap to maintain top k elements
3. Heap size stays at k, smallest frequency at top
4. Return heap elements

### Implementation

```javascript
/**
 * Min Heap Approach
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    size() {
        return this.heap.length;
    }
    
    peek() {
        return this.heap[0];
    }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        if (this.size() === 0) return null;
        if (this.size() === 1) return this.heap.pop();
        
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return top;
    }
    
    bubbleUp(idx) {
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[idx][1] >= this.heap[parentIdx][1]) break;
            
            [this.heap[idx], this.heap[parentIdx]] = 
                [this.heap[parentIdx], this.heap[idx]];
            idx = parentIdx;
        }
    }
    
    bubbleDown(idx) {
        while (true) {
            const leftIdx = 2 * idx + 1;
            const rightIdx = 2 * idx + 2;
            let smallest = idx;
            
            if (leftIdx < this.size() && 
                this.heap[leftIdx][1] < this.heap[smallest][1]) {
                smallest = leftIdx;
            }
            
            if (rightIdx < this.size() && 
                this.heap[rightIdx][1] < this.heap[smallest][1]) {
                smallest = rightIdx;
            }
            
            if (smallest === idx) break;
            
            [this.heap[idx], this.heap[smallest]] = 
                [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}

function topKFrequent(nums, k) {
    // Count frequencies
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Min heap of size k
    const minHeap = new MinHeap();
    
    for (const [num, freq] of freqMap.entries()) {
        minHeap.push([num, freq]);
        
        // Keep heap size at k
        if (minHeap.size() > k) {
            minHeap.pop(); // Remove element with smallest frequency
        }
    }
    
    // Extract elements from heap
    return minHeap.heap.map(([num, freq]) => num);
}

// Test
console.log(topKFrequent([1,1,1,2,2,3], 2)); // [2, 1] or [1, 2]
console.log(topKFrequent([1], 1)); // [1]
```

### Complexity Analysis
- **Time Complexity**: `O(n log k)` - n insertions, each O(log k)
- **Space Complexity**: `O(n)` - Frequency map + O(k) heap

### Good when k is small, but can we do O(n)?

---

## Approach 3: Bucket Sort (Optimal) ✅

### Intuition
Maximum frequency is n (all same elements). Create buckets for each frequency (0 to n). Place elements in corresponding frequency buckets. Collect from highest frequency buckets.

### Algorithm
1. Count frequencies
2. Create buckets: `buckets[i]` = elements with frequency i
3. Iterate from highest frequency to lowest
4. Collect k elements

### Implementation

```javascript
/**
 * Bucket Sort Approach (Optimal O(n))
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
    // Step 1: Count frequencies
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Step 2: Create frequency buckets
    // buckets[i] contains elements that appear i times
    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    
    for (const [num, freq] of freqMap.entries()) {
        buckets[freq].push(num);
    }
    
    // Step 3: Collect top k from highest frequency buckets
    const result = [];
    
    // Start from highest frequency
    for (let freq = buckets.length - 1; freq >= 0 && result.length < k; freq--) {
        if (buckets[freq].length > 0) {
            result.push(...buckets[freq]);
        }
    }
    
    return result.slice(0, k); // In case we collected more than k
}

// Test
console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1, 2]
console.log(topKFrequent([1], 1)); // [1]
console.log(topKFrequent([4,1,-1,2,-1,2,3], 2)); // [-1, 2]
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Linear time!
  - O(n) to count frequencies
  - O(n) to fill buckets
  - O(n) to collect results
- **Space Complexity**: `O(n)` - Frequency map + buckets

### Why is this optimal?
- **Linear time**: Best possible for this problem
- **No sorting needed**: Buckets are naturally sorted by index
- **Efficient**: Single pass to collect results

---

## Visual Example

```
Input: nums = [1,1,1,2,2,3], k = 2

Step 1: Count frequencies
freqMap = {
  1: 3,
  2: 2,
  3: 1
}

Step 2: Create buckets (index = frequency)
buckets[0] = []
buckets[1] = [3]      ← elements that appear 1 time
buckets[2] = [2]      ← elements that appear 2 times
buckets[3] = [1]      ← elements that appear 3 times
buckets[4] = []
buckets[5] = []
buckets[6] = []

Step 3: Collect top k from highest frequency
freq = 6: buckets[6] = [] → skip
freq = 5: buckets[5] = [] → skip
freq = 4: buckets[4] = [] → skip
freq = 3: buckets[3] = [1] → result = [1] ✓
freq = 2: buckets[2] = [2] → result = [1, 2] ✓

k = 2, result.length = 2 → STOP

Result: [1, 2]
```

---

## Edge Cases

```javascript
// Single element
console.log(topKFrequent([1], 1)); // [1]

// All same
console.log(topKFrequent([1,1,1,1], 1)); // [1]

// All unique
console.log(topKFrequent([1,2,3,4], 4)); // [1,2,3,4] (any order)

// k = unique elements
console.log(topKFrequent([1,1,2,2,3,3], 3)); // [1,2,3] (any order)

// Negative numbers
console.log(topKFrequent([-1,-1,-1,2,2,3], 2)); // [-1, 2]

// Mixed
console.log(topKFrequent([1,2,2,3,3,3,4,4,4,4], 2)); // [4, 3]
```

---

## Comparison of Approaches

| Approach | Time Complexity | Space Complexity | Best For |
|----------|----------------|------------------|----------|
| Sort | O(n log n) | O(n) | ❌ Slow |
| Min Heap | O(n log k) | O(n + k) | ✅ When k is small |
| Bucket Sort | O(n) | O(n) | ✅ Optimal! |
| Quick Select | O(n) average | O(n) | ✅ Alternative optimal |

---

## Approach 4: Quick Select (Alternative O(n))

```javascript
/**
 * Quick Select Approach (Average O(n))
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
    // Count frequencies
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Convert to array
    const unique = Array.from(freqMap.keys());
    
    // Quick select to find kth most frequent
    function quickSelect(left, right, kSmallest) {
        if (left === right) return;
        
        // Choose random pivot
        const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
        
        // Partition
        const finalPivotIdx = partition(left, right, pivotIdx);
        
        if (kSmallest === finalPivotIdx) {
            return;
        } else if (kSmallest < finalPivotIdx) {
            quickSelect(left, finalPivotIdx - 1, kSmallest);
        } else {
            quickSelect(finalPivotIdx + 1, right, kSmallest);
        }
    }
    
    function partition(left, right, pivotIdx) {
        const pivotFreq = freqMap.get(unique[pivotIdx]);
        
        // Move pivot to end
        [unique[pivotIdx], unique[right]] = [unique[right], unique[pivotIdx]];
        
        let storeIdx = left;
        for (let i = left; i < right; i++) {
            if (freqMap.get(unique[i]) < pivotFreq) {
                [unique[storeIdx], unique[i]] = [unique[i], unique[storeIdx]];
                storeIdx++;
            }
        }
        
        // Move pivot to final position
        [unique[storeIdx], unique[right]] = [unique[right], unique[storeIdx]];
        
        return storeIdx;
    }
    
    const n = unique.length;
    quickSelect(0, n - 1, n - k);
    
    return unique.slice(n - k);
}

// Test
console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1, 2]
```

**Complexity**: O(n) average, O(n²) worst case

---

## Interview Tips

### What to discuss:

1. **Clarify**: "Can the answer be in any order?"

2. **Approaches**:
   - "Naive: Sort by frequency - O(n log n)"
   - "Better: Min heap of size k - O(n log k), good when k << n"
   - "Optimal: Bucket sort - O(n) time"

3. **Trade-offs**: "Bucket sort is fastest but uses O(n) space. If k is very small, heap might be more practical."

4. **Implementation**: "I'll use bucket sort for O(n) solution"

### Follow-up Questions:

**Q: What if k > number of unique elements?**
A: Return all unique elements (guaranteed not to happen per constraints)

**Q: What if we need them sorted by frequency?**
A: Bucket sort naturally gives sorted order when collecting from high to low

**Q: What if we need to handle a stream?**
A: Use min heap, update frequencies dynamically

---

## Related Problems

- [192. Word Frequency](https://leetcode.com/problems/word-frequency/)
- [451. Sort Characters By Frequency](https://leetcode.com/problems/sort-characters-by-frequency/)
- [692. Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words/)
- [973. K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)

---

## Key Takeaways

✅ Bucket sort achieves O(n) for frequency problems  
✅ Min heap is good when k is small (O(n log k))  
✅ Bucket index represents frequency (natural sorting)  
✅ Collect from highest frequency buckets first  
✅ Alternative: Quick select for O(n) average time  

**Pattern**: Top K by frequency → Bucket sort or Heap!
