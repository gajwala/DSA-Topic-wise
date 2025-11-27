
# Complete Sorting Algorithms & Problems Guide

## Table of Contents
1. [Sorting Fundamentals](#sorting-fundamentals)
2. [Comparison-Based Sorting](#comparison-based-sorting)
3. [Non-Comparison Sorting](#non-comparison-sorting)
4. [Sorting Patterns & Techniques](#sorting-patterns--techniques)
5. [50 Sorting Problems with Solutions](#50-sorting-problems-with-solutions)

---

## Sorting Fundamentals

### What is Sorting?
Sorting is the process of arranging elements in a specific order (ascending or descending). It's one of the most fundamental operations in computer science.

### Why Sorting?
- **Search Optimization**: Binary search requires sorted data
- **Data Analysis**: Finding min/max, median, percentiles
- **Algorithm Efficiency**: Many algorithms work better with sorted data
- **Data Presentation**: Organized display for users

### Stability in Sorting
A sorting algorithm is **stable** if it preserves the relative order of equal elements.

```javascript
Input:  [(1, 'a'), (2, 'b'), (1, 'c'), (2, 'd')]
Stable: [(1, 'a'), (1, 'c'), (2, 'b'), (2, 'd')]  // Original order of 1's preserved
```

### In-Place Sorting
An algorithm is **in-place** if it uses O(1) or O(log n) extra space.

---

## Comparison-Based Sorting

### 1. Bubble Sort
Repeatedly swaps adjacent elements if they're in wrong order.

```javascript
function bubbleSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break; // Already sorted
    }
    
    return arr;
}
```

**Time Complexity:**
- Best: O(n) - already sorted
- Average: O(n²)
- Worst: O(n²)

**Space:** O(1)  
**Stable:** Yes  
**In-place:** Yes

---

### 2. Selection Sort
Finds minimum element and places it at beginning.

```javascript
function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    
    return arr;
}
```

**Time Complexity:** O(n²) all cases  
**Space:** O(1)  
**Stable:** No  
**In-place:** Yes

---

### 3. Insertion Sort
Builds sorted array one item at a time.

```javascript
function insertionSort(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
    
    return arr;
}
```

**Time Complexity:**
- Best: O(n) - already sorted
- Average: O(n²)
- Worst: O(n²)

**Space:** O(1)  
**Stable:** Yes  
**In-place:** Yes

**Best for:** Small arrays, nearly sorted data

---

### 4. Merge Sort
Divide and conquer algorithm that divides array into halves.

```javascript
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

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
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// In-place merge sort
function mergeSortInPlace(arr, left = 0, right = arr.length - 1) {
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);
    mergeSortInPlace(arr, left, mid);
    mergeSortInPlace(arr, mid + 1, right);
    mergeInPlace(arr, left, mid, right);
    
    return arr;
}

function mergeInPlace(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }
    
    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
}
```

**Time Complexity:** O(n log n) all cases  
**Space:** O(n)  
**Stable:** Yes  
**In-place:** No (can be made in-place with extra complexity)

---

### 5. Quick Sort
Divide and conquer using pivot element.

```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Randomized Quick Sort (better average case)
function quickSortRandom(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = randomPartition(arr, low, high);
        quickSortRandom(arr, low, pi - 1);
        quickSortRandom(arr, pi + 1, high);
    }
    return arr;
}

function randomPartition(arr, low, high) {
    const randomIdx = Math.floor(Math.random() * (high - low + 1)) + low;
    [arr[randomIdx], arr[high]] = [arr[high], arr[randomIdx]];
    return partition(arr, low, high);
}

// 3-way Quick Sort (handles duplicates well)
function quickSort3Way(arr, low = 0, high = arr.length - 1) {
    if (low >= high) return arr;
    
    let lt = low;
    let gt = high;
    let i = low + 1;
    const pivot = arr[low];
    
    while (i <= gt) {
        if (arr[i] < pivot) {
            [arr[lt], arr[i]] = [arr[i], arr[lt]];
            lt++;
            i++;
        } else if (arr[i] > pivot) {
            [arr[i], arr[gt]] = [arr[gt], arr[i]];
            gt--;
        } else {
            i++;
        }
    }
    
    quickSort3Way(arr, low, lt - 1);
    quickSort3Way(arr, gt + 1, high);
    
    return arr;
}
```

**Time Complexity:**
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n²) - when pivot is always min/max

**Space:** O(log n) - recursion stack  
**Stable:** No  
**In-place:** Yes

---

### 6. Heap Sort
Uses heap data structure to sort.

```javascript
function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

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
```

**Time Complexity:** O(n log n) all cases  
**Space:** O(1)  
**Stable:** No  
**In-place:** Yes

---

### 7. Shell Sort
Generalized insertion sort with gap sequence.

```javascript
function shellSort(arr) {
    const n = arr.length;
    
    // Start with large gap, then reduce
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j;
            
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            
            arr[j] = temp;
        }
    }
    
    return arr;
}
```

**Time Complexity:** O(n log n) to O(n²) depending on gap sequence  
**Space:** O(1)  
**Stable:** No  
**In-place:** Yes

---

## Non-Comparison Sorting

### 1. Counting Sort
Counts occurrences of each element.

```javascript
function countingSort(arr, max = Math.max(...arr)) {
    const count = Array(max + 1).fill(0);
    const output = Array(arr.length);
    
    // Count occurrences
    for (let num of arr) {
        count[num]++;
    }
    
    // Calculate cumulative count
    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    return output;
}
```

**Time Complexity:** O(n + k) where k is range  
**Space:** O(n + k)  
**Stable:** Yes  
**Best for:** Small range of integers

---

### 2. Radix Sort
Sorts digit by digit.

```javascript
function radixSort(arr) {
    const max = Math.max(...arr);
    
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    
    return arr;
}

function countingSortByDigit(arr, exp) {
    const n = arr.length;
    const output = Array(n);
    const count = Array(10).fill(0);
    
    // Count occurrences of digits
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
    }
    
    // Cumulative count
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    // Copy to original
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}
```

**Time Complexity:** O(d × (n + k)) where d is digits  
**Space:** O(n + k)  
**Stable:** Yes

---

### 3. Bucket Sort
Distributes elements into buckets.

```javascript
function bucketSort(arr, bucketSize = 5) {
    if (arr.length === 0) return arr;
    
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = Array(bucketCount).fill(null).map(() => []);
    
    // Distribute elements
    for (let num of arr) {
        const bucketIdx = Math.floor((num - min) / bucketSize);
        buckets[bucketIdx].push(num);
    }
    
    // Sort each bucket and concatenate
    const result = [];
    for (let bucket of buckets) {
        insertionSort(bucket);
        result.push(...bucket);
    }
    
    return result;
}
```

**Time Complexity:**
- Average: O(n + k)
- Worst: O(n²)

**Space:** O(n + k)  
**Stable:** Yes (if underlying sort is stable)

---

## Sorting Patterns & Techniques

### 1. Two-Pointer Technique

```javascript
// Dutch National Flag (Sort 0s, 1s, 2s)
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
    
    return nums;
}
```

### 2. Custom Comparator

```javascript
// Sort by multiple criteria
function customSort(arr) {
    return arr.sort((a, b) => {
        // First by length
        if (a.length !== b.length) {
            return a.length - b.length;
        }
        // Then alphabetically
        return a.localeCompare(b);
    });
}
```

### 3. Partial Sorting

```javascript
// Find kth smallest without fully sorting
function quickSelect(arr, k) {
    if (arr.length === 1) return arr[0];
    
    const pivot = arr[0];
    const left = arr.filter(x => x < pivot);
    const equal = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    if (k <= left.length) {
        return quickSelect(left, k);
    } else if (k <= left.length + equal.length) {
        return pivot;
    } else {
        return quickSelect(right, k - left.length - equal.length);
    }
}
```

### 4. Stable Sort for Objects

```javascript
function stableSort(arr, compareFn) {
    // Add index to maintain stability
    const indexed = arr.map((item, index) => ({ item, index }));
    
    indexed.sort((a, b) => {
        const result = compareFn(a.item, b.item);
        return result !== 0 ? result : a.index - b.index;
    });
    
    return indexed.map(({ item }) => item);
}
```

---

## 50 Sorting Problems with Solutions

### Easy Problems (1-15)

#### Problem 1: Sort an Array

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortArray(nums) {
    // Using merge sort
    return mergeSort(nums);
}

// Or using built-in
function sortArrayBuiltIn(nums) {
    return nums.sort((a, b) => a - b);
}
```

#### Problem 2: Merge Sorted Array

```javascript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void}
 */
function merge(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;
    
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
    
    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
}
```

#### Problem 3: Sort Colors (Dutch National Flag)

```javascript
/**
 * @param {number[]} nums
 * @return {void}
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

#### Problem 4: Merge Two Sorted Lists

```javascript
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    current.next = list1 || list2;
    return dummy.next;
}
```

#### Problem 5: Relative Sort Array

```javascript
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
function relativeSortArray(arr1, arr2) {
    const order = new Map();
    arr2.forEach((num, i) => order.set(num, i));
    
    return arr1.sort((a, b) => {
        const orderA = order.has(a) ? order.get(a) : 1000 + a;
        const orderB = order.has(b) ? order.get(b) : 1000 + b;
        return orderA - orderB;
    });
}
```

#### Problem 6: Squares of a Sorted Array

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortedSquares(nums) {
    const n = nums.length;
    const result = Array(n);
    let left = 0, right = n - 1;
    
    for (let i = n - 1; i >= 0; i--) {
        if (Math.abs(nums[left]) > Math.abs(nums[right])) {
            result[i] = nums[left] * nums[left];
            left++;
        } else {
            result[i] = nums[right] * nums[right];
            right--;
        }
    }
    
    return result;
}
```

#### Problem 7: Sort Array By Parity

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortArrayByParity(nums) {
    let left = 0, right = nums.length - 1;
    
    while (left < right) {
        if (nums[left] % 2 > nums[right] % 2) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
        }
        
        if (nums[left] % 2 === 0) left++;
        if (nums[right] % 2 === 1) right--;
    }
    
    return nums;
}
```

#### Problem 8: Height Checker

```javascript
/**
 * @param {number[]} heights
 * @return {number}
 */
function heightChecker(heights) {
    const expected = [...heights].sort((a, b) => a - b);
    let count = 0;
    
    for (let i = 0; i < heights.length; i++) {
        if (heights[i] !== expected[i]) {
            count++;
        }
    }
    
    return count;
}
```

#### Problem 9: Maximum Product of Three Numbers

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function maximumProduct(nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    
    // Either three largest or two smallest * largest
    return Math.max(
        nums[n-1] * nums[n-2] * nums[n-3],
        nums[0] * nums[1] * nums[n-1]
    );
}
```

#### Problem 10: Third Maximum Number

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function thirdMax(nums) {
    const unique = [...new Set(nums)].sort((a, b) => b - a);
    return unique.length >= 3 ? unique[2] : unique[0];
}

// O(n) solution
function thirdMaxOptimal(nums) {
    let first = -Infinity, second = -Infinity, third = -Infinity;
    
    for (let num of nums) {
        if (num === first || num === second || num === third) continue;
        
        if (num > first) {
            third = second;
            second = first;
            first = num;
        } else if (num > second) {
            third = second;
            second = num;
        } else if (num > third) {
            third = num;
        }
    }
    
    return third === -Infinity ? first : third;
}
```

#### Problem 11: Intersection of Two Arrays

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function intersection(nums1, nums2) {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);
    
    return [...set1].filter(num => set2.has(num));
}

// Using sorting
function intersectionSort(nums1, nums2) {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);
    
    const result = new Set();
    let i = 0, j = 0;
    
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) {
            result.add(nums1[i]);
            i++;
            j++;
        } else if (nums1[i] < nums2[j]) {
            i++;
        } else {
            j++;
        }
    }
    
    return [...result];
}
```

#### Problem 12: Intersection of Two Arrays II

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function intersect(nums1, nums2) {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);
    
    const result = [];
    let i = 0, j = 0;
    
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) {
            result.push(nums1[i]);
            i++;
            j++;
        } else if (nums1[i] < nums2[j]) {
            i++;
        } else {
            j++;
        }
    }
    
    return result;
}
```

#### Problem 13: Valid Anagram

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const sortedS = s.split('').sort().join('');
    const sortedT = t.split('').sort().join('');
    
    return sortedS === sortedT;
}

// Without sorting
function isAnagramHash(s, t) {
    if (s.length !== t.length) return false;
    
    const count = {};
    
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    
    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }
    
    return true;
}
```

#### Problem 14: Largest Number At Least Twice of Others

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function dominantIndex(nums) {
    let max = -1, secondMax = -1, maxIdx = -1;
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > max) {
            secondMax = max;
            max = nums[i];
            maxIdx = i;
        } else if (nums[i] > secondMax) {
            secondMax = nums[i];
        }
    }
    
    return max >= 2 * secondMax ? maxIdx : -1;
}
```

#### Problem 15: Move Zeroes

```javascript
/**
 * @param {number[]} nums
 * @return {void}
 */
function moveZeroes(nums) {
    let left = 0;
    
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== 0) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
        }
    }
}
```

### Medium Problems (16-35)

#### Problem 16: Kth Largest Element

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
    // Quick Select
    function quickSelect(left, right, kSmallest) {
        if (left === right) return nums[left];
        
        const pivotIdx = partition(left, right);
        
        if (kSmallest === pivotIdx) {
            return nums[kSmallest];
        } else if (kSmallest < pivotIdx) {
            return quickSelect(left, pivotIdx - 1, kSmallest);
        } else {
            return quickSelect(pivotIdx + 1, right, kSmallest);
        }
    }
    
    function partition(left, right) {
        const pivot = nums[right];
        let i = left;
        
        for (let j = left; j < right; j++) {
            if (nums[j] < pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        
        [nums[i], nums[right]] = [nums[right], nums[i]];
        return i;
    }
    
    return quickSelect(0, nums.length - 1, nums.length - k);
}
```

#### Problem 17: Top K Frequent Elements

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
    const freq = new Map();
    
    for (let num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    
    return Array.from(freq.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(([num]) => num);
}

// Bucket sort approach O(n)
function topKFrequentBucket(nums, k) {
    const freq = new Map();
    
    for (let num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    
    const buckets = Array(nums.length + 1).fill(null).map(() => []);
    
    for (let [num, count] of freq) {
        buckets[count].push(num);
    }
    
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i]);
    }
    
    return result.slice(0, k);
}
```

#### Problem 18: Sort List (Merge Sort on Linked List)

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function sortList(head) {
    if (!head || !head.next) return head;
    
    // Find middle
    let slow = head, fast = head, prev = null;
    
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    
    prev.next = null;
    
    const left = sortList(head);
    const right = sortList(slow);
    
    return merge(left, right);
}

function merge(l1, l2) {
    const dummy = new ListNode(0);
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
```

#### Problem 19: Wiggle Sort

```javascript
/**
 * @param {number[]} nums
 * @return {void}
 */
function wiggleSort(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        if ((i % 2 === 0 && nums[i] > nums[i + 1]) ||
            (i % 2 === 1 && nums[i] < nums[i + 1])) {
            [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
        }
    }
}
```

#### Problem 20: Wiggle Sort II

```javascript
/**
 * @param {number[]} nums
 * @return {void}
 */
function wiggleSortII(nums) {
    const sorted = [...nums].sort((a, b) => a - b);
    const n = nums.length;
    const mid = Math.ceil(n / 2);
    
    let left = mid - 1;
    let right = n - 1;
    
    for (let i = 0; i < n; i++) {
        if (i % 2 === 0) {
            nums[i] = sorted[left--];
        } else {
            nums[i] = sorted[right--];
        }
    }
}
```

#### Problem 21: Largest Number

```javascript
/**
 * @param {number[]} nums
 * @return {string}
 */
function largestNumber(nums) {
    const strs = nums.map(String);
    
    strs.sort((a, b) => (b + a).localeCompare(a + b));
    
    const result = strs.join('');
    return result[0] === '0' ? '0' : result;
}
```

#### Problem 22: Meeting Rooms II

```javascript
/**
 * @param {number[][]} intervals
 * @return {number}
 */
function minMeetingRooms(intervals) {
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
    
    let rooms = 0, endPtr = 0;
    
    for (let i = 0; i < intervals.length; i++) {
        if (starts[i] < ends[endPtr]) {
            rooms++;
        } else {
            endPtr++;
        }
    }
    
    return rooms;
}
```

#### Problem 23: H-Index

```javascript
/**
 * @param {number[]} citations
 * @return {number}
 */
function hIndex(citations) {
    citations.sort((a, b) => b - a);
    
    let h = 0;
    for (let i = 0; i < citations.length; i++) {
        if (citations[i] >= i + 1) {
            h = i + 1;
        } else {
            break;
        }
    }
    
    return h;
}

// O(n) using counting sort
function hIndexLinear(citations) {
    const n = citations.length;
    const buckets = Array(n + 1).fill(0);
    
    for (let c of citations) {
        if (c >= n) {
            buckets[n]++;
        } else {
            buckets[c]++;
        }
    }
    
    let count = 0;
    for (let i = n; i >= 0; i--) {
        count += buckets[i];
        if (count >= i) {
            return i;
        }
    }
    
    return 0;
}
```

#### Problem 24: Contains Duplicate III

```javascript
/**
 * @param {number[]} nums
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
function containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff) {
    if (valueDiff < 0) return false;
    
    const buckets = new Map();
    const w = valueDiff + 1;
    
    for (let i = 0; i < nums.length; i++) {
        const bucket = Math.floor(nums[i] / w);
        
        if (buckets.has(bucket)) return true;
        
        if (buckets.has(bucket - 1) && 
            Math.abs(nums[i] - buckets.get(bucket - 1)) < w) {
            return true;
        }
        
        if (buckets.has(bucket + 1) && 
            Math.abs(nums[i] - buckets.get(bucket + 1)) < w) {
            return true;
        }
        
        buckets.set(bucket, nums[i]);
        
        if (i >= indexDiff) {
            buckets.delete(Math.floor(nums[i - indexDiff] / w));
        }
    }
    
    return false;
}
```

#### Problem 25: Sort Transformed Array

```javascript
/**
 * @param {number[]} nums
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number[]}
 */
function sortTransformedArray(nums, a, b, c) {
    const n = nums.length;
    const result = Array(n);
    
    function quad(x) {
        return a * x * x + b * x + c;
    }
    
    let left = 0, right = n - 1;
    let index = a >= 0 ? n - 1 : 0;
    
    while (left <= right) {
        const leftVal = quad(nums[left]);
        const rightVal = quad(nums[right]);
        
        if (a >= 0) {
            if (leftVal >= rightVal) {
                result[index--] = leftVal;
                left++;
            } else {
                result[index--] = rightVal;
                right--;
            }
        } else {
            if (leftVal <= rightVal) {
                result[index++] = leftVal;
                left++;
            } else {
                result[index++] = rightVal;
                right--;
            }
        }
    }
    
    return result;
}
```

#### Problem 26: Minimum Number of Arrows

```javascript
/**
 * @param {number[][]} points
 * @return {number}
 */
function findMinArrowShots(points) {
    if (points.length === 0) return 0;
    
    points.sort((a, b) => a[1] - b[1]);
    
    let arrows = 1;
    let end = points[0][1];
    
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > end) {
            arrows++;
            end = points[i][1];
        }
    }
    
    return arrows;
}
```

#### Problem 27: Queue Reconstruction by Height

```javascript
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
function reconstructQueue(people) {
    // Sort by height desc, then by k asc
    people.sort((a, b) => {
        if (a[0] !== b[0]) return b[0] - a[0];
        return a[1] - b[1];
    });
    
    const result = [];
    
    for (let person of people) {
        result.splice(person[1], 0, person);
    }
    
    return result;
}
```

#### Problem 28: Valid Triangle Number

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function triangleNumber(nums) {
    nums.sort((a, b) => a - b);
    let count = 0;
    
    for (let i = nums.length - 1; i >= 2; i--) {
        let left = 0, right = i - 1;
        
        while (left < right) {
            if (nums[left] + nums[right] > nums[i]) {
                count += right - left;
                right--;
            } else {
                left++;
            }
        }
    }
    
    return count;
}
```

#### Problem 29: Minimum Increment to Make Array Unique

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function minIncrementForUnique(nums) {
    nums.sort((a, b) => a - b);
    let moves = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] <= nums[i - 1]) {
            const increment = nums[i - 1] + 1 - nums[i];
            moves += increment;
            nums[i] = nums[i - 1] + 1;
        }
    }
    
    return moves;
}
```

#### Problem 30: Pancake Sorting

```javascript
/**
 * @param {number[]} arr
 * @return {number[]}
 */
function pancakeSort(arr) {
    const result = [];
    
    for (let size = arr.length; size > 0; size--) {
        // Find max element's index in current size
        let maxIdx = 0;
        for (let i = 0; i < size; i++) {
            if (arr[i] > arr[maxIdx]) {
                maxIdx = i;
            }
        }
        
        // Move max to front, then to end
        if (maxIdx !== size - 1) {
            if (maxIdx !== 0) {
                flip(arr, maxIdx);
                result.push(maxIdx + 1);
            }
            flip(arr, size - 1);
            result.push(size);
        }
    }
    
    return result;
}

function flip(arr, k) {
    let left = 0, right = k;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}
```

#### Problem 31: Group Anagrams

```javascript
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
    const map = new Map();
    
    for (let str of strs) {
        const key = str.split('').sort().join('');
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
}

// Without sorting
function groupAnagramsCount(strs) {
    const map = new Map();
    
    for (let str of strs) {
        const count = Array(26).fill(0);
        for (let char of str) {
            count[char.charCodeAt(0) - 97]++;
        }
        const key = count.join('#');
        
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
}
```

#### Problem 32: Custom Sort String

```javascript
/**
 * @param {string} order
 * @param {string} s
 * @return {string}
 */
function customSortString(order, s) {
    const priority = new Map();
    order.split('').forEach((char, i) => priority.set(char, i));
    
    return s.split('').sort((a, b) => {
        const priorityA = priority.has(a) ? priority.get(a) : 26;
        const priorityB = priority.has(b) ? priority.get(b) : 26;
        return priorityA - priorityB;
    }).join('');
}
```

#### Problem 33: Advantage Shuffle (Greedy)

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
function advantageCount(nums1, nums2) {
    nums1.sort((a, b) => a - b);
    
    const n = nums1.length;
    const result = Array(n);
    const used = new Set();
    
    const sortedIndices = Array.from({length: n}, (_, i) => i)
        .sort((a, b) => nums2[b] - nums2[a]);
    
    let left = 0, right = n - 1;
    
    for (let i of sortedIndices) {
        if (nums1[right] > nums2[i]) {
            result[i] = nums1[right--];
        } else {
            result[i] = nums1[left++];
        }
    }
    
    return result;
}
```

#### Problem 34: Maximum Gap

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function maximumGap(nums) {
    if (nums.length < 2) return 0;
    
    nums.sort((a, b) => a - b);
    
    let maxGap = 0;
    for (let i = 1; i < nums.length; i++) {
        maxGap = Math.max(maxGap, nums[i] - nums[i - 1]);
    }
    
    return maxGap;
}

// O(n) using bucket sort
function maximumGapLinear(nums) {
    if (nums.length < 2) return 0;
    
    const n = nums.length;
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    
    if (min === max) return 0;
    
    const bucketSize = Math.ceil((max - min) / (n - 1));
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    
    const buckets = Array(bucketCount).fill(null)
        .map(() => ({ min: Infinity, max: -Infinity }));
    
    for (let num of nums) {
        const idx = Math.floor((num - min) / bucketSize);
        buckets[idx].min = Math.min(buckets[idx].min, num);
        buckets[idx].max = Math.max(buckets[idx].max, num);
    }
    
    let maxGap = 0;
    let prevMax = min;
    
    for (let bucket of buckets) {
        if (bucket.min === Infinity) continue;
        maxGap = Math.max(maxGap, bucket.min - prevMax);
        prevMax = bucket.max;
    }
    
    return maxGap;
}
```

#### Problem 35: Sort Characters By Frequency

```javascript
/**
 * @param {string} s
 * @return {string}
 */
function frequencySort(s) {
    const freq = new Map();
    
    for (let char of s) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    
    return Array.from(freq.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([char, count]) => char.repeat(count))
        .join('');
}

// Bucket sort O(n)
function frequencySortBucket(s) {
    const freq = new Map();
    
    for (let char of s) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    
    const buckets = Array(s.length + 1).fill(null).map(() => []);
    
    for (let [char, count] of freq) {
        buckets[count].push(char);
    }
    
    let result = '';
    for (let i = buckets.length - 1; i >= 0; i--) {
        for (let char of buckets[i]) {
            result += char.repeat(i);
        }
    }
    
    return result;
}
```

### Hard Problems (36-50)

#### Problem 36: Count of Smaller Numbers After Self

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
function countSmaller(nums) {
    const result = Array(nums.length).fill(0);
    const indices = Array.from({length: nums.length}, (_, i) => i);
    
    function mergeSort(left, right) {
        if (left >= right) return;
        
        const mid = Math.floor((left + right) / 2);
        mergeSort(left, mid);
        mergeSort(mid + 1, right);
        merge(left, mid, right);
    }
    
    function merge(left, mid, right) {
        const temp = [];
        let i = left, j = mid + 1;
        let rightCount = 0;
        
        while (i <= mid && j <= right) {
            if (nums[indices[j]] < nums[indices[i]]) {
                rightCount++;
                temp.push(indices[j++]);
            } else {
                result[indices[i]] += rightCount;
                temp.push(indices[i++]);
            }
        }
        
        while (i <= mid) {
            result[indices[i]] += rightCount;
            temp.push(indices[i++]);
        }
        
        while (j <= right) {
            temp.push(indices[j++]);
        }
        
        for (let i = left; i <= right; i++) {
            indices[i] = temp[i - left];
        }
    }
    
    mergeSort(0, nums.length - 1);
    return result;
}
```

#### Problem 37: Reverse Pairs

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function reversePairs(nums) {
    let count = 0;
    
    function mergeSort(left, right) {
        if (left >= right) return;
        
        const mid = Math.floor((left + right) / 2);
        mergeSort(left, mid);
        mergeSort(mid + 1, right);
        
        // Count reverse pairs
        let j = mid + 1;
        for (let i = left; i <= mid; i++) {
            while (j <= right && nums[i] > 2 * nums[j]) {
                j++;
            }
            count += j - (mid + 1);
        }
        
        merge(left, mid, right);
    }
    
    function merge(left, mid, right) {
        const temp = [];
        let i = left, j = mid + 1;
        
        while (i <= mid && j <= right) {
            if (nums[i] <= nums[j]) {
                temp.push(nums[i++]);
            } else {
                temp.push(nums[j++]);
            }
        }
        
        while (i <= mid) temp.push(nums[i++]);
        while (j <= right) temp.push(nums[j++]);
        
        for (let i = 0; i < temp.length; i++) {
            nums[left + i] = temp[i];
        }
    }
    
    mergeSort(0, nums.length - 1);
    return count;
}
```

#### Problem 38: Merge k Sorted Lists

```javascript
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
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

#### Problem 39: Count of Range Sum

```javascript
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
function countRangeSum(nums, lower, upper) {
    const prefixSum = [0];
    
    for (let num of nums) {
        prefixSum.push(prefixSum[prefixSum.length - 1] + num);
    }
    
    let count = 0;
    
    function mergeSort(left, right) {
        if (left >= right) return;
        
        const mid = Math.floor((left + right) / 2);
        mergeSort(left, mid);
        mergeSort(mid + 1, right);
        
        let j = mid + 1, k = mid + 1;
        
        for (let i = left; i <= mid; i++) {
            while (j <= right && prefixSum[j] - prefixSum[i] < lower) j++;
            while (k <= right && prefixSum[k] - prefixSum[i] <= upper) k++;
            count += k - j;
        }
        
        merge(left, mid, right);
    }
    
    function merge(left, mid, right) {
        const temp = [];
        let i = left, j = mid + 1;
        
        while (i <= mid && j <= right) {
            if (prefixSum[i] <= prefixSum[j]) {
                temp.push(prefixSum[i++]);
            } else {
                temp.push(prefixSum[j++]);
            }
        }
        
        while (i <= mid) temp.push(prefixSum[i++]);
        while (j <= right) temp.push(prefixSum[j++]);
        
        for (let i = 0; i < temp.length; i++) {
            prefixSum[left + i] = temp[i];
        }
    }
    
    mergeSort(0, prefixSum.length - 1);
    return count;
}
```

#### Problem 40: Shortest Subarray to be Removed to Make Array Sorted

```javascript
/**
 * @param {number[]} arr
 * @return {number}
 */
function findLengthOfShortestSubarray(arr) {
    const n = arr.length;
    let left = 0, right = n - 1;
    
    // Find longest sorted prefix
    while (left < n - 1 && arr[left] <= arr[left + 1]) {
        left++;
    }
    
    if (left === n - 1) return 0;
    
    // Find longest sorted suffix
    while (right > 0 && arr[right - 1] <= arr[right]) {
        right--;
    }
    
    let result = Math.min(n - left - 1, right);
    
    // Try to merge prefix and suffix
    let i = 0, j = right;
    while (i <= left && j < n) {
        if (arr[i] <= arr[j]) {
            result = Math.min(result, j - i - 1);
            i++;
        } else {
            j++;
        }
    }
    
    return result;
}
```

#### Problem 41: Minimum Number of Operations to Sort Binary Tree

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function minimumOperations(root) {
    if (!root) return 0;
    
    const queue = [root];
    let operations = 0;
    
    while (queue.length > 0) {
        const size = queue.length;
        const values = [];
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            values.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        operations += minSwapsToSort(values);
    }
    
    return operations;
}

function minSwapsToSort(arr) {
    const n = arr.length;
    const sorted = [...arr].sort((a, b) => a - b);
    const pos = new Map();
    
    sorted.forEach((val, i) => pos.set(val, i));
    
    const visited = Array(n).fill(false);
    let swaps = 0;
    
    for (let i = 0; i < n; i++) {
        if (visited[i] || pos.get(arr[i]) === i) continue;
        
        let cycleSize = 0;
        let j = i;
        
        while (!visited[j]) {
            visited[j] = true;
            j = pos.get(arr[j]);
            cycleSize++;
        }
        
        if (cycleSize > 0) {
            swaps += cycleSize - 1;
        }
    }
    
    return swaps;
}
```

#### Problem 42: Data Stream as Disjoint Intervals (Sorted)

```javascript
class SummaryRanges {
    constructor() {
        this.intervals = [];
    }
    
    addNum(val) {
        let left = 0, right = this.intervals.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (this.intervals[mid][0] < val) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        let start = val, end = val;
        
        if (left > 0 && this.intervals[left - 1][1] + 1 >= val) {
            start = this.intervals[left - 1][0];
            left--;
        }
        
        while (left < this.intervals.length && 
               this.intervals[left][0] <= end + 1) {
            end = Math.max(end, this.intervals[left][1]);
            this.intervals.splice(left, 1);
        }
        
        this.intervals.splice(left, 0, [start, end]);
    }
    
    getIntervals() {
        return this.intervals;
    }
}
```

#### Problem 43: Russian Doll Envelopes

```javascript
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
function maxEnvelopes(envelopes) {
    envelopes.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return b[1] - a[1]; // Descending by height
    });
    
    const heights = envelopes.map(e => e[1]);
    
    // Find LIS
    const tails = [];
    
    for (let height of heights) {
        let left = 0, right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < height) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(height);
        } else {
            tails[left] = height;
        }
    }
    
    return tails.length;
}
```

#### Problem 44: Count of Smaller Numbers (Segment Tree)

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
function countSmallerSegmentTree(nums) {
    const offset = 10000;
    const size = 2 * 10000 + 1;
    const tree = Array(size * 2).fill(0);
    
    function update(index, value) {
        index += size;
        tree[index] += value;
        
        while (index > 1) {
            tree[index >> 1] = tree[index] + tree[index ^ 1];
            index >>= 1;
        }
    }
    
    function query(left, right) {
        let result = 0;
        left += size;
        right += size;
        
        while (left < right) {
            if (left & 1) result += tree[left++];
            if (right & 1) result += tree[--right];
            left >>= 1;
            right >>= 1;
        }
        
        return result;
    }
    
    const result = [];
    
    for (let i = nums.length - 1; i >= 0; i--) {
        result.unshift(query(0, nums[i] + offset));
        update(nums[i] + offset, 1);
    }
    
    return result;
}
```

#### Problem 45: Make Array Non-decreasing or Non-increasing

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function minOperations(nums) {
    function minOpsToMakeNonDecreasing() {
        const dp = [...nums];
        
        for (let i = 1; i < nums.length; i++) {
            if (dp[i] < dp[i - 1]) {
                dp[i] = dp[i - 1];
            }
        }
        
        let ops = 0;
        for (let i = 0; i < nums.length; i++) {
            ops += Math.abs(nums[i] - dp[i]);
        }
        
        return ops;
    }
    
    const ops1 = minOpsToMakeNonDecreasing();
    nums.reverse();
    const ops2 = minOpsToMakeNonDecreasing();
    
    return Math.min(ops1, ops2);
}
```

#### Problem 46: Number of Matching Subsequences

```javascript
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
function numMatchingSubseq(s, words) {
    const buckets = Array(26).fill(null).map(() => []);
    
    for (let word of words) {
        buckets[word.charCodeAt(0) - 97].push({ word, index: 0 });
    }
    
    let count = 0;
    
    for (let char of s) {
        const bucket = buckets[char.charCodeAt(0) - 97];
        const size = bucket.length;
        
        for (let i = 0; i < size; i++) {
            const { word, index } = bucket.shift();
            
            if (index + 1 === word.length) {
                count++;
            } else {
                const nextChar = word.charCodeAt(index + 1) - 97;
                buckets[nextChar].push({ word, index: index + 1 });
            }
        }
    }
    
    return count;
}
```

#### Problem 47: Best Meeting Point

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
function minTotalDistance(grid) {
    const rows = [];
    const cols = [];
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                rows.push(i);
                cols.push(j);
            }
        }
    }
    
    cols.sort((a, b) => a - b);
    
    const medianRow = rows[Math.floor(rows.length / 2)];
    const medianCol = cols[Math.floor(cols.length / 2)];
    
    let distance = 0;
    
    for (let row of rows) {
        distance += Math.abs(row - medianRow);
    }
    
    for (let col of cols) {
        distance += Math.abs(col - medianCol);
    }
    
    return distance;
}
```

#### Problem 48: Maximize Sum of Array After K Negations

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function largestSumAfterKNegations(nums, k) {
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length && k > 0; i++) {
        if (nums[i] < 0) {
            nums[i] = -nums[i];
            k--;
        }
    }
    
    if (k % 2 === 1) {
        nums.sort((a, b) => a - b);
        nums[0] = -nums[0];
    }
    
    return nums.reduce((a, b) => a + b, 0);
}
```

#### Problem 49: Smallest Range II

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function smallestRangeII(nums, k) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    
    let result = nums[n - 1] - nums[0];
    
    for (let i = 0; i < n - 1; i++) {
        const high = Math.max(nums[n - 1] - k, nums[i] + k);
        const low = Math.min(nums[0] + k, nums[i + 1] - k);
        result = Math.min(result, high - low);
    }
    
    return result;
}
```

#### Problem 50: Maximum Frequency Stack (Sorted by Frequency)

```javascript
class FreqStack {
    constructor() {
        this.freq = new Map();
        this.group = new Map();
        this.maxFreq = 0;
    }
    
    push(val) {
        const f = (this.freq.get(val) || 0) + 1;
        this.freq.set(val, f);
        
        if (!this.group.has(f)) {
            this.group.set(f, []);
        }
        this.group.get(f).push(val);
        
        this.maxFreq = Math.max(this.maxFreq, f);
    }
    
    pop() {
        const val = this.group.get(this.maxFreq).pop();
        this.freq.set(val, this.freq.get(val) - 1);
        
        if (this.group.get(this.maxFreq).length === 0) {
            this.maxFreq--;
        }
        
        return val;
    }
}
```

---

## Sorting Algorithm Comparison

| Algorithm | Best | Average | Worst | Space | Stable | In-Place |
|-----------|------|---------|-------|-------|--------|----------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No | Yes |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | No |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No | Yes |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Yes |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes | No |
| Radix Sort | O(d(n+k)) | O(d(n+k)) | O(d(n+k)) | O(n+k) | Yes | No |
| Bucket Sort | O(n+k) | O(n+k) | O(n²) | O(n) | Yes | No |

---

## When to Use Which Sort?

1. **Small arrays (<50 elements)**: Insertion Sort
2. **Nearly sorted data**: Insertion Sort, Bubble Sort
3. **Need stable sort**: Merge Sort, Counting Sort
4. **Limited memory**: Heap Sort, Quick Sort
5. **Known range of values**: Counting Sort, Radix Sort
6. **General purpose**: Quick Sort, Merge Sort
7. **Guaranteed O(n log n)**: Merge Sort, Heap Sort
8. **Need in-place**: Quick Sort, Heap Sort

---

## Tips & Tricks

1. **Choose the right algorithm** for your use case
2. **Consider stability** if order matters for equal elements
3. **Watch for edge cases**: empty array, single element, duplicates
4. **Use built-in sort** when appropriate
5. **Custom comparators** for complex sorting criteria
6. **Partial sorting** (Quick Select) when you don't need full sort

---

## Practice Resources

- **LeetCode**: Sorting tag
- **GeeksforGeeks**: Sorting algorithms
- **Visualgo**: Visual sorting animations
- **InterviewBit**: Sorting section

---

**Happy Coding! 🔄**

