# Efficient Sorting Algorithms (Merge Sort, Quick Sort, Heap Sort)

## 📚 Theory

Efficient sorting algorithms achieve **O(n log n)** time complexity and are used in production systems. The three main efficient sorting algorithms are:

1. **Merge Sort**: Divide and conquer with guaranteed O(n log n)
2. **Quick Sort**: Fast average case with in-place sorting
3. **Heap Sort**: In-place with guaranteed O(n log n)

## 🎯 Intuition

### Merge Sort
Think of sorting two decks of cards:
- Split deck in half
- Sort each half recursively
- Merge the two sorted halves

Like organizing files: break into folders, sort each folder, then combine.

### Quick Sort
Think of organizing books by height:
- Pick a "pivot" book
- Put shorter books to the left, taller to the right
- Repeat for each group

Like organizing a closet: pick an item, group similar items, repeat.

### Heap Sort
Think of a tournament bracket:
- Find the maximum (winner)
- Remove it and find next maximum
- Repeat until done

Like repeatedly picking the tallest person from a group.

## 💻 Implementation

### JavaScript Implementation

```javascript
/**
 * ============================================
 * MERGE SORT
 * ============================================
 */

/**
 * Merge Sort - Main function
 * Time: O(n log n), Space: O(n)
 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}


/**
 * Merge two sorted arrays
 */
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Add remaining elements
  return result.concat(left.slice(i)).concat(right.slice(j));
}


/**
 * Merge Sort - In-place (less space)
 */
function mergeSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  mergeSortInPlace(arr, left, mid);
  mergeSortInPlace(arr, mid + 1, right);
  mergeInPlace(arr, left, mid, right);

  return arr;
}


/**
 * Merge in-place
 */
function mergeInPlace(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}


/**
 * ============================================
 * QUICK SORT
 * ============================================
 */

/**
 * Quick Sort - Lomuto partition scheme
 * Time: O(n log n) average, O(n²) worst, Space: O(log n)
 */
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}


/**
 * Lomuto Partition Scheme
 */
function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}


/**
 * Quick Sort - Hoare partition scheme (more efficient)
 */
function quickSortHoare(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partitionHoare(arr, left, right);
    quickSortHoare(arr, left, pivotIndex);
    quickSortHoare(arr, pivotIndex + 1, right);
  }
  return arr;
}


/**
 * Hoare Partition Scheme
 */
function partitionHoare(arr, left, right) {
  const pivot = arr[Math.floor((left + right) / 2)];
  let i = left - 1;
  let j = right + 1;

  while (true) {
    do {
      i++;
    } while (arr[i] < pivot);

    do {
      j--;
    } while (arr[j] > pivot);

    if (i >= j) return j;

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}


/**
 * Quick Sort - Randomized pivot
 */
function quickSortRandomized(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partitionRandomized(arr, left, right);
    quickSortRandomized(arr, left, pivotIndex - 1);
    quickSortRandomized(arr, pivotIndex + 1, right);
  }
  return arr;
}


/**
 * Partition with randomized pivot
 */
function partitionRandomized(arr, left, right) {
  const randomIndex = Math.floor(Math.random() * (right - left + 1)) + left;
  [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]];
  return partition(arr, left, right);
}


/**
 * ============================================
 * HEAP SORT
 * ============================================
 */

/**
 * Heap Sort
 * Time: O(n log n), Space: O(1)
 */
function heapSort(arr) {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Heapify the reduced heap
    heapify(arr, i, 0);
  }

  return arr;
}


/**
 * Heapify subtree rooted at index i
 */
function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}


/**
 * ============================================
 * HYBRID SORTING
 * ============================================
 */

/**
 * Intro Sort - Hybrid of Quick Sort, Heap Sort, and Insertion Sort
 * Used in many standard libraries
 */
function introSort(arr, maxDepth = Math.floor(Math.log2(arr.length)) * 2) {
  return introSortHelper(arr, 0, arr.length - 1, maxDepth);
}


/**
 * Intro Sort Helper
 */
function introSortHelper(arr, left, right, maxDepth) {
  const size = right - left + 1;

  // Use insertion sort for small arrays
  if (size < 16) {
    return insertionSortRange(arr, left, right);
  }

  // Use heap sort if recursion depth exceeds limit
  if (maxDepth === 0) {
    return heapSortRange(arr, left, right);
  }

  // Use quick sort
  const pivotIndex = partition(arr, left, right);
  introSortHelper(arr, left, pivotIndex - 1, maxDepth - 1);
  introSortHelper(arr, pivotIndex + 1, right, maxDepth - 1);

  return arr;
}


/**
 * Insertion sort for a range
 */
function insertionSortRange(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= left && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}


/**
 * Heap sort for a range
 */
function heapSortRange(arr, left, right) {
  const segment = arr.slice(left, right + 1);
  heapSort(segment);
  for (let i = 0; i < segment.length; i++) {
    arr[left + i] = segment[i];
  }
  return arr;
}


/**
 * ============================================
 * UTILITY FUNCTIONS
 * ============================================
 */

/**
 * Find Kth largest element using Quick Select
 */
function findKthLargest(arr, k) {
  return quickSelect(arr, 0, arr.length - 1, arr.length - k);
}


/**
 * Quick Select algorithm
 */
function quickSelect(arr, left, right, k) {
  if (left === right) return arr[left];

  const pivotIndex = partition(arr, left, right);

  if (k === pivotIndex) {
    return arr[k];
  } else if (k < pivotIndex) {
    return quickSelect(arr, left, pivotIndex - 1, k);
  } else {
    return quickSelect(arr, pivotIndex + 1, right, k);
  }
}
```

## 🔍 Example Walkthrough

### Merge Sort: [38, 27, 43, 3]

```
[38, 27, 43, 3]
    ↓ Split
[38, 27]     [43, 3]
    ↓ Split      ↓ Split
[38] [27]    [43] [3]
    ↓ Merge      ↓ Merge
[27, 38]     [3, 43]
    ↓ Merge
[3, 27, 38, 43]
```

### Quick Sort: [10, 7, 8, 9, 1, 5]

```
Pick pivot = 5
[10, 7, 8, 9, 1, 5]
Partition: elements ≤5 left, >5 right
[1, 5, 8, 9, 7, 10]
     ↓
[1] [5] [8, 9, 7, 10]
Continue recursively...
Result: [1, 5, 7, 8, 9, 10]
```

### Heap Sort: [4, 10, 3, 5, 1]

```
Build Max Heap:
     10
    /  \
   5    3
  / \
 4   1

Extract max, heapify, repeat:
[10, 5, 3, 4, 1] → [1, 3, 4, 5, 10]
```

## ⏱️ Time & Space Complexity

| Algorithm | Best | Average | Worst | Space | Stable? |
|-----------|------|---------|-------|-------|---------|
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ Yes |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ No* |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ No |

*Quick Sort can be made stable with extra space

## 🎯 When to Use Each Algorithm

### Merge Sort
✅ **Use when:**
- **Stability required**
- **Guaranteed O(n log n)** needed
- **External sorting** (large files)
- **Linked lists** (no random access needed)
- **Parallel processing** (easy to parallelize)

❌ **Avoid when:**
- Limited memory (uses O(n) extra space)
- In-place sorting required

### Quick Sort
✅ **Use when:**
- **Average case matters** (fastest in practice)
- **In-place sorting** needed
- **Random access** available (arrays)
- **Cache performance** important
- **General purpose** sorting

❌ **Avoid when:**
- **Worst case guarantee** needed
- **Stability** required
- Data already sorted or nearly sorted (without randomization)

### Heap Sort
✅ **Use when:**
- **Guaranteed O(n log n)** + **O(1) space**
- **Priority queue** operations
- **Finding top K elements**
- Memory is severely limited

❌ **Avoid when:**
- **Stability** required
- **Cache performance** matters (poor cache locality)
- Average case speed critical

## 🔑 Key Properties

### Merge Sort
- **Stable**: Yes
- **In-place**: No
- **Adaptive**: No
- **Divide and Conquer**: Yes
- **Best for**: Linked lists, external sorting

### Quick Sort
- **Stable**: No (can be made stable)
- **In-place**: Yes
- **Adaptive**: No
- **Divide and Conquer**: Yes
- **Best for**: Arrays, general purpose

### Heap Sort
- **Stable**: No
- **In-place**: Yes
- **Adaptive**: No
- **Uses Heap**: Yes
- **Best for**: Priority queues, top K problems

## 💡 Common Problem Patterns

### Pattern 1: Sort an Array
```javascript
/**
 * LeetCode 912: Sort an Array
 */
function sortArray(nums) {
  return mergeSort(nums);  // or quickSort, heapSort
}
```

### Pattern 2: Kth Largest Element
```javascript
/**
 * LeetCode 215: Kth Largest Element
 * Use Quick Select for O(n) average
 */
function findKthLargest(nums, k) {
  return quickSelect(nums, 0, nums.length - 1, nums.length - k);
}
```

### Pattern 3: Merge K Sorted Lists
```javascript
/**
 * LeetCode 23: Merge K Sorted Lists
 * Use merge sort principle
 */
function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;

  function mergeTwoLists(l1, l2) {
    const dummy = { next: null };
    let current = dummy;

    while (l1 && l2) {
      if (l1.val <= l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }

    current.next = l1 || l2;
    return dummy.next;
  }

  function mergeHelper(lists, start, end) {
    if (start === end) return lists[start];

    const mid = Math.floor((start + end) / 2);
    const left = mergeHelper(lists, start, mid);
    const right = mergeHelper(lists, mid + 1, end);

    return mergeTwoLists(left, right);
  }

  return mergeHelper(lists, 0, lists.length - 1);
}
```

## 🎓 Practice Problems

1. **Medium**:
   - Sort an Array (LeetCode 912)
   - Kth Largest Element (LeetCode 215)
   - Top K Frequent Elements (LeetCode 347)
   - Merge Intervals (LeetCode 56)
   - Sort List (LeetCode 148)

2. **Hard**:
   - Merge K Sorted Lists (LeetCode 23)
   - Count of Smaller Numbers After Self (LeetCode 315)
   - Reverse Pairs (LeetCode 493)

## 📊 Algorithm Comparison

| Criteria | Winner | Reason |
|----------|--------|--------|
| **Fastest Average** | Quick Sort | O(n log n) with best constants |
| **Guaranteed Speed** | Merge/Heap | O(n log n) worst case |
| **Least Space** | Heap Sort | O(1) extra space |
| **Stability** | Merge Sort | Only stable O(n log n) |
| **Cache Performance** | Quick Sort | Better locality |
| **Parallelizable** | Merge Sort | Independent subproblems |
| **Production Use** | Quick/Merge | Most standard libraries use hybrid |

---

**Remember**: Most languages use hybrid algorithms (IntroSort, TimSort) combining best of multiple algorithms! 🚀

