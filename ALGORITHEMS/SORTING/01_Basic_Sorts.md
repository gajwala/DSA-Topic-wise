# Basic Sorting Algorithms (Bubble, Selection, Insertion)

## 📚 Theory

Basic sorting algorithms are simple, intuitive sorting techniques that are easy to understand and implement. While not the most efficient for large datasets, they are:
- **Easy to understand** and teach
- **Good for small datasets**
- **Foundation** for understanding more complex algorithms

The three basic sorting algorithms are:
1. **Bubble Sort**: Compare adjacent elements and swap
2. **Selection Sort**: Find minimum and place it at the beginning
3. **Insertion Sort**: Build sorted array one element at a time

## 🎯 Intuition

### Bubble Sort
Think of bubbles rising to the surface:
- Larger elements "bubble up" to the end
- Compare neighbors, swap if wrong order
- Repeat until no swaps needed

### Selection Sort
Think of sorting cards in your hand:
- Find the smallest card
- Put it in the first position
- Repeat for remaining cards

### Insertion Sort
Think of sorting cards as you pick them up:
- Pick one card at a time
- Insert it into the correct position in your sorted hand
- Continue until all cards are picked

## 💻 Implementation

### JavaScript Implementation

```javascript
/**
 * ============================================
 * BUBBLE SORT
 * ============================================
 */

/**
 * Bubble Sort - Basic version
 * Time: O(n²), Space: O(1)
 */
function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}


/**
 * Bubble Sort - Optimized (early termination)
 */
function bubbleSortOptimized(arr) {
  const n = arr.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no swaps, array is sorted
    if (!swapped) break;
  }

  return arr;
}


/**
 * ============================================
 * SELECTION SORT
 * ============================================
 */

/**
 * Selection Sort
 * Time: O(n²), Space: O(1)
 */
function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    // Find minimum element in unsorted portion
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap minimum with first unsorted element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}


/**
 * Selection Sort - Find maximum (reverse)
 */
function selectionSortMax(arr) {
  const n = arr.length;

  for (let i = n - 1; i > 0; i--) {
    // Find maximum element in unsorted portion
    let maxIndex = i;

    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j;
      }
    }

    // Swap maximum with last unsorted element
    if (maxIndex !== i) {
      [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
    }
  }

  return arr;
}


/**
 * ============================================
 * INSERTION SORT
 * ============================================
 */

/**
 * Insertion Sort
 * Time: O(n²), Space: O(1)
 */
function insertionSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }

  return arr;
}


/**
 * Insertion Sort - With binary search for position
 */
function insertionSortBinarySearch(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];

    // Find position using binary search
    let left = 0;
    let right = i - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] > key) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    // Shift elements and insert
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }
    arr[left] = key;
  }

  return arr;
}


/**
 * ============================================
 * HELPER FUNCTIONS
 * ============================================
 */

/**
 * Check if array is sorted
 */
function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}


/**
 * Sort array in descending order
 */
function bubbleSortDescending(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] < arr[j + 1]) {  // Changed condition
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}


/**
 * Sort objects by property
 */
function bubbleSortObjects(arr, key) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j][key] > arr[j + 1][key]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}


/**
 * Count comparisons and swaps
 */
function bubbleSortWithStats(arr) {
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
      }
    }
  }

  return { sorted: arr, comparisons, swaps };
}
```

## 🔍 Example Walkthrough

### Bubble Sort Example: [5, 2, 8, 1, 9]

**Pass 1:**
```
[5, 2, 8, 1, 9]  →  [2, 5, 8, 1, 9]  (swap 5,2)
[2, 5, 8, 1, 9]  →  [2, 5, 8, 1, 9]  (no swap)
[2, 5, 8, 1, 9]  →  [2, 5, 1, 8, 9]  (swap 8,1)
[2, 5, 1, 8, 9]  →  [2, 5, 1, 8, 9]  (no swap)
Result: [2, 5, 1, 8, 9] (9 is in place)
```

**Pass 2:**
```
[2, 5, 1, 8, 9]  →  [2, 5, 1, 8, 9]  (no swap)
[2, 5, 1, 8, 9]  →  [2, 1, 5, 8, 9]  (swap 5,1)
[2, 1, 5, 8, 9]  →  [2, 1, 5, 8, 9]  (no swap)
Result: [2, 1, 5, 8, 9] (8 is in place)
```

**Pass 3, 4:** Continue until sorted: `[1, 2, 5, 8, 9]`

### Selection Sort Example: [5, 2, 8, 1, 9]

```
[5, 2, 8, 1, 9]  →  [1, 2, 8, 5, 9]  (min=1, swap with pos 0)
[1, 2, 8, 5, 9]  →  [1, 2, 8, 5, 9]  (min=2, already in place)
[1, 2, 8, 5, 9]  →  [1, 2, 5, 8, 9]  (min=5, swap with pos 2)
[1, 2, 5, 8, 9]  →  [1, 2, 5, 8, 9]  (min=8, already in place)
Result: [1, 2, 5, 8, 9]
```

### Insertion Sort Example: [5, 2, 8, 1, 9]

```
[5, 2, 8, 1, 9]  →  [2, 5, 8, 1, 9]  (insert 2 before 5)
[2, 5, 8, 1, 9]  →  [2, 5, 8, 1, 9]  (8 already in place)
[2, 5, 8, 1, 9]  →  [1, 2, 5, 8, 9]  (insert 1 at beginning)
[1, 2, 5, 8, 9]  →  [1, 2, 5, 8, 9]  (9 already in place)
Result: [1, 2, 5, 8, 9]
```

## ⏱️ Time & Space Complexity

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable? |
|-----------|-----------|--------------|------------|-------|---------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | ❌ No* |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |

**Best Case**:
- **Bubble Sort**: Already sorted (with optimization)
- **Selection Sort**: Always O(n²) (no optimization possible)
- **Insertion Sort**: Already sorted

**Worst Case**:
- All algorithms: Reverse sorted array

*Selection sort can be made stable with extra space

## 🎯 When to Use Each Algorithm

### Bubble Sort
✅ **Use when:**
- Teaching/learning sorting
- Array is nearly sorted
- Need simple, stable sort
- Small dataset (< 100 elements)

❌ **Avoid when:**
- Large datasets
- Performance matters
- Production code

### Selection Sort
✅ **Use when:**
- Minimizing writes/swaps is important
- Small dataset
- Memory writes are expensive
- Simple implementation needed

❌ **Avoid when:**
- Need stability
- Large datasets
- Better alternatives available

### Insertion Sort
✅ **Use when:**
- **Array is nearly sorted** (best choice!)
- Small dataset (< 50 elements)
- Online sorting (elements arrive one at a time)
- Adaptive sorting needed
- Part of more complex algorithms (TimSort, IntroSort)

❌ **Avoid when:**
- Large unsorted datasets
- Random data

## 🔑 Key Properties

### Bubble Sort
- **Stable**: Yes (equal elements maintain order)
- **In-place**: Yes
- **Adaptive**: Yes (optimized version)
- **Online**: No

### Selection Sort
- **Stable**: No (can be made stable)
- **In-place**: Yes
- **Adaptive**: No (always same time)
- **Online**: No
- **Minimum Swaps**: Makes at most n-1 swaps

### Insertion Sort
- **Stable**: Yes
- **In-place**: Yes
- **Adaptive**: Yes (fast on nearly sorted)
- **Online**: Yes (can sort as data arrives)
- **Best for Small Arrays**: Often used in hybrid algorithms

## 💡 Common Problem Patterns

### Pattern 1: Sort Colors (Dutch National Flag)
```javascript
/**
 * LeetCode 75: Sort Colors
 * Sort array with only 0s, 1s, and 2s
 */
function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}
```

### Pattern 2: Move Zeroes
```javascript
/**
 * LeetCode 283: Move Zeroes
 * Similar to insertion sort logic
 */
function moveZeroes(nums) {
  let insertPos = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[insertPos], nums[i]] = [nums[i], nums[insertPos]];
      insertPos++;
    }
  }
}
```

### Pattern 3: Insertion Sort List
```javascript
/**
 * LeetCode 147: Insertion Sort List
 * Sort a linked list using insertion sort
 */
function insertionSortList(head) {
  const dummy = { val: -Infinity, next: null };

  let current = head;

  while (current) {
    const next = current.next;

    // Find insert position
    let prev = dummy;
    while (prev.next && prev.next.val < current.val) {
      prev = prev.next;
    }

    // Insert current
    current.next = prev.next;
    prev.next = current;

    current = next;
  }

  return dummy.next;
}
```

## 🎓 Practice Problems

1. **Easy**:
   - Sort Colors (LeetCode 75)
   - Move Zeroes (LeetCode 283)
   - Merge Sorted Array (LeetCode 88)
   - Remove Duplicates from Sorted Array (LeetCode 26)

2. **Medium**:
   - Insertion Sort List (LeetCode 147)
   - Sort List (LeetCode 148)
   - Wiggle Sort (LeetCode 280)

## 📊 Comparison Summary

| Criteria | Winner | Reason |
|----------|--------|--------|
| **Simplest** | Bubble Sort | Most intuitive |
| **Fewest Swaps** | Selection Sort | Max n-1 swaps |
| **Nearly Sorted** | Insertion Sort | O(n) best case |
| **Small Arrays** | Insertion Sort | Best practical performance |
| **Teaching** | Bubble Sort | Easiest to visualize |
| **Stable** | Bubble/Insertion | Selection is not stable |

## ⚠️ Common Mistakes

1. **Off-by-one errors** in loop bounds
2. **Forgetting optimization** in bubble sort
3. **Not handling empty/single element** arrays
4. **Assuming stability** in selection sort
5. **Infinite loops** due to wrong loop conditions

---

**Remember**: These are teaching algorithms - use built-in `Array.sort()` or efficient algorithms (Merge/Quick Sort) for production! 🔢

