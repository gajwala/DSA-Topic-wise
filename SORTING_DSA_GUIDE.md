# Sorting Algorithms - Complete Guide

A comprehensive guide to fundamental sorting algorithms with intuitions, implementations, and complexity analysis.

---

## Table of Contents
1. [Bubble Sort](#1-bubble-sort)
2. [Selection Sort](#2-selection-sort)
3. [Insertion Sort](#3-insertion-sort)
4. [Merge Sort](#4-merge-sort)
5. [Quick Sort](#5-quick-sort)
6. [Heap Sort](#6-heap-sort)
7. [Counting Sort](#7-counting-sort)
8. [Radix Sort](#8-radix-sort)
9. [Bucket Sort](#9-bucket-sort)
10. [Comparison Table](#comparison-table)

---

## 1. Bubble Sort

### Description
Bubble Sort is the simplest sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.

### Intuition
Think of bubbles rising to the surface - in each pass, the largest unsorted element "bubbles up" to its correct position at the end of the array. After the first pass, the largest element is in its final position. After the second pass, the second-largest is in place, and so on.

### Algorithm Steps
1. Start at the beginning of the array
2. Compare each pair of adjacent elements
3. If they are in wrong order, swap them
4. Continue until reaching the end of the unsorted portion
5. Repeat for n-1 passes (where n is the array length)
6. After each pass, the last unsorted element is in its final position

### Implementation

```python
def bubble_sort(arr):
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        # Flag to optimize by detecting if array is already sorted
        swapped = False
        
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            # Swap if element found is greater than next element
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swapping happened, array is sorted
        if not swapped:
            break
    
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
print("Original array:", arr)
sorted_arr = bubble_sort(arr.copy())
print("Sorted array:", sorted_arr)
```

```javascript
function bubbleSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return arr;
}
```

### Complexity Analysis

| Case | Time Complexity | Description |
|------|----------------|-------------|
| Best | O(n) | Already sorted array (with optimization flag) |
| Average | O(n²) | Random order array |
| Worst | O(n²) | Reverse sorted array |

**Space Complexity:** O(1) - In-place sorting, only uses a constant amount of extra space

### When to Use
- Small datasets
- Nearly sorted data
- Educational purposes
- When simplicity is more important than efficiency

### Pros and Cons

**Pros:**
- Simple to understand and implement
- Stable sorting algorithm (maintains relative order of equal elements)
- In-place sorting (no extra memory needed)
- Can detect if list is already sorted

**Cons:**
- Very inefficient for large datasets
- O(n²) time complexity in average and worst cases
- Rarely used in practice

---

## 2. Selection Sort

### Description
Selection Sort divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire list. The algorithm repeatedly selects the smallest (or largest) element from the unsorted portion and moves it to the end of the sorted portion.

### Intuition
Imagine sorting a deck of cards by repeatedly finding the smallest card in your unsorted pile and placing it in your sorted pile. You scan through all remaining cards, find the minimum, and place it at the end of your growing sorted sequence.

### Algorithm Steps
1. Set the first position as the current position
2. Find the minimum element in the unsorted array (from current position to end)
3. Swap the minimum element with the element at current position
4. Move the current position one step to the right
5. Repeat steps 2-4 until the entire array is sorted

### Implementation

```python
def selection_sort(arr):
    n = len(arr)
    
    # Traverse through all array elements
    for i in range(n):
        # Find the minimum element in remaining unsorted array
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example usage
arr = [64, 25, 12, 22, 11]
print("Original array:", arr)
sorted_arr = selection_sort(arr.copy())
print("Sorted array:", sorted_arr)
```

```javascript
function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n; i++) {
        let minIdx = i;
        
        // Find minimum element in unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap minimum with current position
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    
    return arr;
}
```

### Complexity Analysis

| Case | Time Complexity | Description |
|------|----------------|-------------|
| Best | O(n²) | Even if sorted, must scan to find minimum |
| Average | O(n²) | Random order array |
| Worst | O(n²) | Reverse sorted array |

**Space Complexity:** O(1) - In-place sorting

### When to Use
- Small datasets
- When memory write is costly (makes minimum number of swaps: O(n))
- When simplicity is preferred
- When auxiliary memory is limited

### Pros and Cons

**Pros:**
- Simple implementation
- In-place sorting
- Performs well on small lists
- Minimum number of swaps: O(n)

**Cons:**
- O(n²) time complexity in all cases
- Not stable (may change relative order of equal elements)
- Not adaptive (doesn't benefit from partially sorted data)

---

## 3. Insertion Sort

### Description
Insertion Sort builds the final sorted array one item at a time. It iterates through an input array and removes one element per iteration, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain.

### Intuition
Think of how you sort playing cards in your hands. You pick up cards one by one and insert each card into its correct position among the cards you've already sorted. You shift cards to the right to make room for the new card.

### Algorithm Steps
1. Start with the second element (index 1)
2. Compare it with elements in the sorted portion (to its left)
3. Shift all larger elements one position to the right
4. Insert the current element in its correct position
5. Move to the next unsorted element
6. Repeat steps 2-5 until the array is sorted

### Implementation

```python
def insertion_sort(arr):
    n = len(arr)
    
    # Traverse through 1 to n
    for i in range(1, n):
        key = arr[i]  # Element to be inserted
        j = i - 1
        
        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Insert the key at its correct position
        arr[j + 1] = key
    
    return arr

# Example usage
arr = [12, 11, 13, 5, 6]
print("Original array:", arr)
sorted_arr = insertion_sort(arr.copy())
print("Sorted array:", sorted_arr)
```

```javascript
function insertionSort(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        
        // Shift elements greater than key
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
    
    return arr;
}
```

### Complexity Analysis

| Case | Time Complexity | Description |
|------|----------------|-------------|
| Best | O(n) | Already sorted array |
| Average | O(n²) | Random order array |
| Worst | O(n²) | Reverse sorted array |

**Space Complexity:** O(1) - In-place sorting

### When to Use
- Small datasets (typically n < 10-20)
- Nearly sorted data (performs excellently)
- Online sorting (can sort data as it's received)
- As part of more complex algorithms (like Timsort)

### Pros and Cons

**Pros:**
- Simple implementation
- Efficient for small datasets
- Adaptive: O(n) for nearly sorted data
- Stable sorting algorithm
- In-place sorting
- Online algorithm (can sort as data arrives)

**Cons:**
- O(n²) time complexity for average and worst cases
- Inefficient for large datasets

---

## 4. Merge Sort

### Description
Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the two sorted halves. The merge step is key to the algorithm's efficiency.

### Intuition
Think of organizing a large stack of papers. Instead of sorting them all at once, you split the stack in half, give each half to a friend to sort, and when they return the sorted halves, you merge them by repeatedly picking the smaller front paper from either sorted pile.

### Algorithm Steps
1. **Divide:** Split the array into two halves
2. **Conquer:** Recursively sort each half
3. **Combine:** Merge the two sorted halves into a single sorted array

**Merge Process:**
1. Create two temporary arrays for left and right halves
2. Compare elements from both arrays
3. Place the smaller element into the result array
4. Continue until all elements are merged

### Implementation

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Divide the array into two halves
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    
    # Recursively sort both halves
    left = merge_sort(left)
    right = merge_sort(right)
    
    # Merge the sorted halves
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    # Merge the two arrays
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

# In-place version (more memory efficient)
def merge_sort_inplace(arr, left, right):
    if left < right:
        mid = (left + right) // 2
        
        # Sort first and second halves
        merge_sort_inplace(arr, left, mid)
        merge_sort_inplace(arr, mid + 1, right)
        
        # Merge the sorted halves
        merge_inplace(arr, left, mid, right)

def merge_inplace(arr, left, mid, right):
    # Create temporary arrays
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    
    i = j = 0
    k = left
    
    # Merge back into original array
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    # Copy remaining elements
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1

# Example usage
arr = [38, 27, 43, 3, 9, 82, 10]
print("Original array:", arr)
sorted_arr = merge_sort(arr.copy())
print("Sorted array:", sorted_arr)

# In-place version
arr2 = [38, 27, 43, 3, 9, 82, 10]
merge_sort_inplace(arr2, 0, len(arr2) - 1)
print("Sorted array (in-place):", arr2)
```

```javascript
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    return merge(mergeSort(left), mergeSort(right));
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
```

### Complexity Analysis

| Case | Time Complexity | Description |
|------|----------------|-------------|
| Best | O(n log n) | Already sorted array |
| Average | O(n log n) | Random order array |
| Worst | O(n log n) | Reverse sorted array |

**Space Complexity:** O(n) - Requires additional space for temporary arrays during merge

**Recurrence Relation:** T(n) = 2T(n/2) + O(n)

### When to Use
- Large datasets
- When stable sort is required
- When predictable O(n log n) performance is needed
- External sorting (sorting data that doesn't fit in memory)
- Linked lists (can be done in O(1) space)

### Pros and Cons

**Pros:**
- Guaranteed O(n log n) time complexity in all cases
- Stable sorting algorithm
- Predictable performance
- Works well with large datasets
- Parallelizable (can sort subarrays independently)

**Cons:**
- Requires O(n) additional space
- Not in-place (for arrays)
- Slower than Quick Sort in practice for random data
- Not adaptive (doesn't benefit from partially sorted data)

---

## 5. Quick Sort

### Description
Quick Sort is a divide-and-conquer algorithm that picks an element as a pivot and partitions the array around the pivot. Elements smaller than the pivot go to the left, and larger elements go to the right. The process is then recursively applied to the subarrays.

### Intuition
Imagine organizing books on a shelf. Pick a book (pivot), then arrange all shorter books to its left and all taller books to its right. The pivot book is now in its final position. Repeat this process for the books on the left and right until all books are in order.

### Algorithm Steps
1. **Choose a pivot** element from the array
2. **Partition:** Rearrange the array so that:
   - All elements smaller than pivot come before it
   - All elements greater than pivot come after it
   - Pivot is in its final sorted position
3. **Recursively** apply steps 1-2 to the subarrays before and after the pivot

**Partition Methods:**
- **Lomuto Partition:** Simple, uses last element as pivot
- **Hoare Partition:** More efficient, uses two pointers from both ends

### Implementation

```python
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition the array and get pivot index
        pivot_idx = partition(arr, low, high)
        
        # Recursively sort elements before and after partition
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)
    
    return arr

# Lomuto Partition Scheme
def partition(arr, low, high):
    # Choose rightmost element as pivot
    pivot = arr[high]
    i = low - 1  # Index of smaller element
    
    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # Place pivot in correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Hoare Partition Scheme (more efficient)
def hoare_partition(arr, low, high):
    pivot = arr[low]  # Choose first element as pivot
    i = low - 1
    j = high + 1
    
    while True:
        # Find leftmost element greater than or equal to pivot
        i += 1
        while arr[i] < pivot:
            i += 1
        
        # Find rightmost element smaller than or equal to pivot
        j -= 1
        while arr[j] > pivot:
            j -= 1
        
        # If pointers cross, return partition index
        if i >= j:
            return j
        
        # Swap elements
        arr[i], arr[j] = arr[j], arr[i]

def quick_sort_hoare(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pivot_idx = hoare_partition(arr, low, high)
        quick_sort_hoare(arr, low, pivot_idx)
        quick_sort_hoare(arr, pivot_idx + 1, high)
    
    return arr

# Randomized Quick Sort (avoids worst case)
import random

def randomized_partition(arr, low, high):
    # Choose random pivot
    random_idx = random.randint(low, high)
    arr[random_idx], arr[high] = arr[high], arr[random_idx]
    return partition(arr, low, high)

def randomized_quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pivot_idx = randomized_partition(arr, low, high)
        randomized_quick_sort(arr, low, pivot_idx - 1)
        randomized_quick_sort(arr, pivot_idx + 1, high)
    
    return arr

# Example usage
arr = [10, 7, 8, 9, 1, 5]
print("Original array:", arr)
sorted_arr = quick_sort(arr.copy())
print("Sorted array:", sorted_arr)
```

```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIdx = partition(arr, low, high);
        
        quickSort(arr, low, pivotIdx - 1);
        quickSort(arr, pivotIdx + 1, high);
    }
    
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}
```

### Complexity Analysis

| Case | Time Complexity | Description |
|------|----------------|-------------|
| Best | O(n log n) | Pivot always divides array in half |
| Average | O(n log n) | Random pivot selection |
| Worst | O(n²) | Pivot is always smallest/largest (sorted array) |

**Space Complexity:** 
- O(log n) - Best case (balanced recursion tree)
- O(n) - Worst case (unbalanced recursion tree)

**Note:** Randomized Quick Sort has expected O(n log n) time complexity

### When to Use
- Large datasets
- When average-case performance matters more than worst-case
- When in-place sorting is needed
- General-purpose sorting (used in many standard libraries)
- When data is random or nearly random

### Pros and Cons

**Pros:**
- Very fast in practice (faster than Merge Sort on average)
- In-place sorting (uses only O(log n) extra space)
- Cache-friendly (good locality of reference)
- Tail recursion can be optimized
- Can be parallelized

**Cons:**
- O(n²) worst-case time (though rare with randomization)
- Not stable (changes relative order of equal elements)
- Sensitive to pivot choice
- Recursive (can cause stack overflow on very large arrays)

---

## 6. Heap Sort

### Description
Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and moving it to the sorted region.

### Intuition
Think of a heap as a tournament tree where the best player (largest/smallest value) is always at the root. To sort, we repeatedly extract the champion (root), reorganize the remaining competitors into a valid tournament, and place each extracted champion in its final position.

### Algorithm Steps
1. **Build a Max Heap** from the input array (largest element at root)
2. **Extract elements** one by one:
   - Swap root (maximum) with last element
   - Reduce heap size by 1
   - Heapify the root to maintain heap property
3. Repeat step 2 until heap size becomes 1

**Heapify:** Process of rearranging elements to maintain heap property
- Compare parent with children
- Swap with largest child if needed
- Recursively heapify affected subtree

### Implementation

```python
def heap_sort(arr):
    n = len(arr)
    
    # Build a max heap
    # Start from last non-leaf node and heapify each node
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        # Move current root to end
        arr[0], arr[i] = arr[i], arr[0]
        
        # Heapify the reduced heap
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    """
    Maintain max heap property for subtree rooted at index i
    n is size of heap
    """
    largest = i  # Initialize largest as root
    left = 2 * i + 1
    right = 2 * i + 2
    
    # If left child exists and is greater than root
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # If right child exists and is greater than largest so far
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    # If largest is not root
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        
        # Recursively heapify the affected subtree
        heapify(arr, n, largest)

# Min Heap version (for ascending sort)
def min_heapify(arr, n, i):
    smallest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] < arr[smallest]:
        smallest = left
    
    if right < n and arr[right] < arr[smallest]:
        smallest = right
    
    if smallest != i:
        arr[i], arr[smallest] = arr[smallest], arr[i]
        min_heapify(arr, n, smallest)

# Example usage
arr = [12, 11, 13, 5, 6, 7]
print("Original array:", arr)
sorted_arr = heap_sort(arr.copy())
print("Sorted array:", sorted_arr)
```

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

### Complexity Analysis

| Case | Time Complexity | Description |
|------|----------------|-------------|
| Best | O(n log n) | All cases |
| Average | O(n log n) | Random order array |
| Worst | O(n log n) | All cases (guaranteed) |

**Space Complexity:** O(1) - In-place sorting (excluding recursion stack)

**Building Heap:** O(n) time  
**Heapify Operation:** O(log n) time  
**Total:** O(n) + n × O(log n) = O(n log n)

### When to Use
- When guaranteed O(n log n) time is needed
- When memory is limited (in-place, O(1) space)
- When worst-case performance matters
- Implementing priority queues
- Top-K problems

### Pros and Cons

**Pros:**
- Guaranteed O(n log n) time complexity in all cases
- In-place sorting (O(1) extra space)
- No worst-case degradation (unlike Quick Sort)
- Good for systems with limited memory
- No need for recursion stack (can be implemented iteratively)

**Cons:**
- Not stable (changes relative order of equal elements)
- Poor cache performance (non-sequential memory access)
- Slower than Quick Sort in practice
- More complex implementation than simple sorts

---

## 7. Counting Sort

### Description
Counting Sort is a non-comparison based sorting algorithm that works by counting the number of objects having distinct key values, then doing arithmetic to calculate the position of each object in the output sequence. It's efficient when the range of input values is not significantly greater than the number of elements.

### Intuition
Think of sorting exam scores (0-100). Instead of comparing scores, create 101 buckets (one for each possible score). Count how many students got each score, then read out the scores in order, repeating each score as many times as it appeared.

### Algorithm Steps
1. **Find the range:** Determine the minimum and maximum values
2. **Create count array:** Size = (max - min + 1)
3. **Count occurrences:** Increment count for each element
4. **Calculate positions:** Transform count array to cumulative sum
5. **Build output:** Place elements in correct positions
6. **Copy back:** Transfer sorted elements to original array

### Implementation

```python
def counting_sort(arr):
    if not arr:
        return arr
    
    # Find the range of elements
    min_val = min(arr)
    max_val = max(arr)
    range_size = max_val - min_val + 1
    
    # Create count array
    count = [0] * range_size
    output = [0] * len(arr)
    
    # Store count of each element
    for num in arr:
        count[num - min_val] += 1
    
    # Change count[i] to contain actual position in output
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    
    # Build output array (iterate in reverse for stability)
    for i in range(len(arr) - 1, -1, -1):
        num = arr[i]
        output[count[num - min_val] - 1] = num
        count[num - min_val] -= 1
    
    # Copy output array back to arr
    for i in range(len(arr)):
        arr[i] = output[i]
    
    return arr

# Simplified version (not stable, but easier to understand)
def counting_sort_simple(arr):
    if not arr:
        return arr
    
    min_val = min(arr)
    max_val = max(arr)
    range_size = max_val - min_val + 1
    
    # Count occurrences
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1
    
    # Reconstruct array
    index = 0
    for i in range(range_size):
        while count[i] > 0:
            arr[index] = i + min_val
            index += 1
            count[i] -= 1
    
    return arr

# Example usage
arr = [4, 2, 2, 8, 3, 3, 1]
print("Original array:", arr)
sorted_arr = counting_sort(arr.copy())
print("Sorted array:", sorted_arr)

# Works with negative numbers
arr2 = [4, -2, 2, 8, -3, 3, 1]
print("\nOriginal array with negatives:", arr2)
sorted_arr2 = counting_sort(arr2.copy())
print("Sorted array:", sorted_arr2)
```

```javascript
function countingSort(arr) {
    if (arr.length === 0) return arr;
    
    const minVal = Math.min(...arr);
    const maxVal = Math.max(...arr);
    const rangeSize = maxVal - minVal + 1;
    
    const count = new Array(rangeSize).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences
    for (let num of arr) {
        count[num - minVal]++;
    }
    
    // Calculate cumulative count
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array (stable version)
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        output[count[num - minVal] - 1] = num;
        count[num - minVal]--;
    }
    
    return output;
}
```

### Complexity Analysis

| Metric | Complexity | Description |
|--------|-----------|-------------|
| Time | O(n + k) | n = number of elements, k = range of input |
| Space | O(n + k) | Count array + output array |

**Best, Average, Worst Case:** All O(n + k)

### When to Use
- Small range of integer keys
- Range (k) is not significantly larger than number of elements (n)
- When linear time sorting is needed
- Stable sort is required
- As subroutine in Radix Sort

### Pros and Cons

**Pros:**
- Linear time complexity O(n + k)
- Stable sorting algorithm
- Simple to implement
- No comparisons needed
- Efficient when k = O(n)

**Cons:**
- Only works with integers or objects with integer keys
- Inefficient when range k >> n
- Requires O(k) extra space
- Not in-place
- Not suitable for large ranges

---

## 8. Radix Sort

### Description
Radix Sort is a non-comparison based sorting algorithm that sorts integers by processing individual digits. It processes digits from least significant to most significant (LSD) or most significant to least (MSD), using a stable sort (like Counting Sort) as a subroutine.

### Intuition
Think of sorting a deck of playing cards. First, sort by rank (A, 2, 3, ... K), then sort by suit while maintaining rank order. Similarly, Radix Sort processes one digit position at a time, from rightmost to leftmost, maintaining stability to preserve previous sorting.

### Algorithm Steps
1. Find the maximum number to determine number of digits
2. For each digit position (starting from least significant):
   - Use a stable sort (usually Counting Sort) to sort by that digit
   - Maintain relative order of elements with same digit
3. After processing all digits, array is sorted

### Implementation

```python
def radix_sort(arr):
    if not arr:
        return arr
    
    # Handle negative numbers by splitting and sorting separately
    positives = [x for x in arr if x >= 0]
    negatives = [abs(x) for x in arr if x < 0]
    
    # Sort positive numbers
    if positives:
        positives = radix_sort_positive(positives)
    
    # Sort negative numbers (as positive) and reverse
    if negatives:
        negatives = radix_sort_positive(negatives)
        negatives = [-x for x in reversed(negatives)]
    
    return negatives + positives

def radix_sort_positive(arr):
    if not arr:
        return arr
    
    # Find maximum number to determine number of digits
    max_num = max(arr)
    
    # Do counting sort for every digit
    exp = 1  # Current digit place (1, 10, 100, ...)
    while max_num // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    
    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10  # Digits 0-9
    
    # Count occurrences of each digit
    for num in arr:
        digit = (num // exp) % 10
        count[digit] += 1
    
    # Calculate cumulative count
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build output array (stable sort)
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1
    
    # Copy output array back
    for i in range(n):
        arr[i] = output[i]

# Alternative: Radix Sort with base customization
def radix_sort_custom_base(arr, base=10):
    if not arr:
        return arr
    
    max_num = max(arr)
    exp = 1
    
    while max_num // exp > 0:
        counting_sort_base(arr, exp, base)
        exp *= base
    
    return arr

def counting_sort_base(arr, exp, base):
    n = len(arr)
    output = [0] * n
    count = [0] * base
    
    for num in arr:
        digit = (num // exp) % base
        count[digit] += 1
    
    for i in range(1, base):
        count[i] += count[i - 1]
    
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % base
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1
    
    for i in range(n):
        arr[i] = output[i]

# Example usage
arr = [170, 45, 75, 90, 802, 24, 2, 66]
print("Original array:", arr)
sorted_arr = radix_sort(arr.copy())
print("Sorted array:", sorted_arr)

# With negative numbers
arr2 = [170, -45, 75, -90, 802, 24, -2, 66]
print("\nOriginal array with negatives:", arr2)
sorted_arr2 = radix_sort(arr2.copy())
print("Sorted array:", sorted_arr2)
```

```javascript
function radixSort(arr) {
    if (arr.length === 0) return arr;
    
    // Find maximum number
    const max = Math.max(...arr.map(Math.abs));
    
    // Do counting sort for every digit
    let exp = 1;
    while (Math.floor(max / exp) > 0) {
        countingSortByDigit(arr, exp);
        exp *= 10;
    }
    
    return arr;
}

function countingSortByDigit(arr, exp) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    // Count occurrences
    for (let num of arr) {
        const digit = Math.floor(Math.abs(num) / exp) % 10;
        count[digit]++;
    }
    
    // Cumulative count
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(Math.abs(arr[i]) / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    // Copy back
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}
```

### Complexity Analysis

| Metric | Complexity | Description |
|--------|-----------|-------------|
| Time | O(d × (n + k)) | d = digits, n = elements, k = base (usually 10) |
| Space | O(n + k) | For counting sort subroutine |

**With base 10 (k = 10):** O(d × n)  
**For integers with maximum value M:** d = log₁₀(M), so O(n × log₁₀(M))

### When to Use
- Sorting integers or strings with fixed length
- When range of values is large but number of digits is small
- Linear time sorting is needed
- Stable sort is required
- Working with fixed-precision integers

### Pros and Cons

**Pros:**
- Can achieve linear time O(n) when d is constant
- Stable sorting algorithm
- No comparisons needed
- Efficient for integers with limited digits
- Better than comparison sorts for appropriate data

**Cons:**
- Only works with integers or fixed-length strings
- Requires stable sort as subroutine
- Not in-place (needs extra space)
- Efficiency depends on number of digits
- Not suitable for floating-point numbers or variable-length data

---

## 9. Bucket Sort

### Description
Bucket Sort is a distribution-based sorting algorithm that divides the input into several groups called buckets. Each bucket is then sorted individually using a different sorting algorithm or by recursively applying bucket sort. Finally, the sorted buckets are concatenated to produce the sorted array.

### Intuition
Imagine sorting a large collection of coins. First, separate them into buckets by denomination (pennies, nickels, dimes, quarters). Since coins within each bucket are similar in value, sorting each bucket is easier. Finally, concatenate all buckets in order to get the sorted collection.

### Algorithm Steps
1. **Create buckets:** Determine number of buckets and create empty buckets
2. **Distribute elements:** Place each element into appropriate bucket based on its value
3. **Sort buckets:** Sort each bucket individually (using insertion sort or recursively)
4. **Concatenate:** Combine all sorted buckets in order

### Implementation

```python
def bucket_sort(arr):
    if not arr:
        return arr
    
    # Find minimum and maximum values
    min_val = min(arr)
    max_val = max(arr)
    
    # Create buckets
    bucket_count = len(arr)
    bucket_range = (max_val - min_val) / bucket_count
    buckets = [[] for _ in range(bucket_count)]
    
    # Distribute elements into buckets
    for num in arr:
        if num == max_val:
            # Edge case: put maximum value in last bucket
            buckets[-1].append(num)
        else:
            # Calculate bucket index
            index = int((num - min_val) / bucket_range)
            buckets[index].append(num)
    
    # Sort individual buckets (using insertion sort)
    for bucket in buckets:
        insertion_sort_bucket(bucket)
    
    # Concatenate all buckets
    sorted_arr = []
    for bucket in buckets:
        sorted_arr.extend(bucket)
    
    return sorted_arr

def insertion_sort_bucket(arr):
    """Helper function: insertion sort for small buckets"""
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

# Bucket Sort for floating-point numbers in range [0, 1)
def bucket_sort_float(arr):
    """Optimized version for floats between 0 and 1"""
    if not arr:
        return arr
    
    n = len(arr)
    buckets = [[] for _ in range(n)]
    
    # Distribute elements into buckets
    for num in arr:
        index = int(num * n)  # Map [0, 1) to bucket index
        if index == n:  # Handle edge case for num = 1.0
            index = n - 1
        buckets[index].append(num)
    
    # Sort each bucket
    for bucket in buckets:
        insertion_sort_bucket(bucket)
    
    # Concatenate buckets
    result = []
    for bucket in buckets:
        result.extend(bucket)
    
    return result

# Bucket Sort with custom number of buckets
def bucket_sort_custom(arr, num_buckets=None):
    if not arr:
        return arr
    
    if num_buckets is None:
        num_buckets = len(arr)
    
    min_val = min(arr)
    max_val = max(arr)
    bucket_range = (max_val - min_val + 1) / num_buckets
    
    buckets = [[] for _ in range(num_buckets)]
    
    # Distribute elements
    for num in arr:
        index = min(int((num - min_val) / bucket_range), num_buckets - 1)
        buckets[index].append(num)
    
    # Sort each bucket
    for bucket in buckets:
        bucket.sort()  # Can use any sorting algorithm
    
    # Concatenate
    result = []
    for bucket in buckets:
        result.extend(bucket)
    
    return result

# Example usage
arr = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51]
print("Original array (floats):", arr)
sorted_arr = bucket_sort_float(arr.copy())
print("Sorted array:", sorted_arr)

arr2 = [29, 25, 3, 49, 9, 37, 21, 43]
print("\nOriginal array (integers):", arr2)
sorted_arr2 = bucket_sort(arr2.copy())
print("Sorted array:", sorted_arr2)
```

```javascript
function bucketSort(arr) {
    if (arr.length === 0) return arr;
    
    const minVal = Math.min(...arr);
    const maxVal = Math.max(...arr);
    const bucketCount = arr.length;
    const bucketRange = (maxVal - minVal) / bucketCount;
    
    // Create buckets
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    // Distribute elements
    for (let num of arr) {
        let index;
        if (num === maxVal) {
            index = bucketCount - 1;
        } else {
            index = Math.floor((num - minVal) / bucketRange);
        }
        buckets[index].push(num);
    }
    
    // Sort each bucket
    for (let bucket of buckets) {
        insertionSort(bucket);
    }
    
    // Concatenate buckets
    return buckets.flat();
}

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

### Complexity Analysis

| Case | Time Complexity | Description |
|------|----------------|-------------|
| Best | O(n + k) | Uniform distribution, k = number of buckets |
| Average | O(n + n²/k + k) | ≈ O(n) when k ≈ n |
| Worst | O(n²) | All elements in one bucket |

**Space Complexity:** O(n + k) - For buckets and elements

**Assumption:** Elements are uniformly distributed across buckets

### When to Use
- Data is uniformly distributed over a range
- Input is uniformly distributed floats (e.g., [0, 1))
- External sorting (when data doesn't fit in memory)
- Parallel processing (buckets can be sorted independently)
- When input range is known

### Pros and Cons

**Pros:**
- Linear time O(n) for uniformly distributed data
- Stable if stable sort is used for buckets
- Simple to implement
- Parallelizable (independent bucket sorting)
- Good cache performance

**Cons:**
- Performance depends on uniform distribution
- Worst-case O(n²) if all elements in one bucket
- Requires knowledge of input range
- Extra space for buckets
- Not suitable for non-uniform data

---

## Comparison Table

### Time Complexity Comparison

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | No* |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| **Counting Sort** | O(n + k) | O(n + k) | O(n + k) | O(k) | Yes |
| **Radix Sort** | O(nk) | O(nk) | O(nk) | O(n + k) | Yes |
| **Bucket Sort** | O(n + k) | O(n) | O(n²) | O(n) | Yes* |

*Selection Sort can be made stable with modifications  
*Bucket Sort stability depends on the subroutine used

### When to Use Each Algorithm

| Algorithm | Best Use Case |
|-----------|---------------|
| **Bubble Sort** | Teaching, very small datasets, nearly sorted data |
| **Selection Sort** | Small datasets, minimal memory writes needed |
| **Insertion Sort** | Small datasets, nearly sorted data, online sorting |
| **Merge Sort** | Stable sort needed, linked lists, external sorting |
| **Quick Sort** | General purpose, large random data, in-place needed |
| **Heap Sort** | Guaranteed O(n log n), limited memory |
| **Counting Sort** | Small integer range, linear time needed |
| **Radix Sort** | Fixed-length integers/strings, linear time needed |
| **Bucket Sort** | Uniformly distributed data, parallel processing |

### Stability Explanation

**Stable Sort:** Maintains the relative order of equal elements
- **Stable:** Bubble, Insertion, Merge, Counting, Radix, Bucket
- **Unstable:** Selection, Quick, Heap

**Why stability matters:**
- Sorting objects with multiple keys
- Maintaining chronological order
- Cascading sorts (sort by one field, then another)

### In-Place vs Out-of-Place

**In-Place (O(1) extra space):**
- Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, Heap Sort

**Out-of-Place (O(n) extra space):**
- Merge Sort, Counting Sort, Radix Sort, Bucket Sort

### Adaptive vs Non-Adaptive

**Adaptive (benefits from partially sorted data):**
- Bubble Sort (with flag), Insertion Sort

**Non-Adaptive (same performance regardless of input order):**
- Selection Sort, Merge Sort, Heap Sort, Counting Sort, Radix Sort

---

## Practical Sorting in Standard Libraries

### Python
- **`sorted()` and `list.sort()`:** Uses **Timsort** (hybrid of Merge + Insertion Sort)
- Stable, adaptive, O(n log n) worst case
- Optimized for real-world data

### JavaScript
- **`Array.sort()`:** 
  - V8 engine: Uses **Timsort**
  - Previously used Quick Sort (unstable)
- Stable since ES2019

### Java
- **`Arrays.sort()`:** 
  - Primitives: **Dual-Pivot Quick Sort**
  - Objects: **Timsort**

### C++ STL
- **`std::sort()`:** **Introsort** (hybrid: Quick Sort + Heap Sort + Insertion Sort)
- Guarantees O(n log n) worst case

---

## Advanced Topics

### Hybrid Sorting Algorithms

**Timsort (Python, Java for objects):**
- Combination of Merge Sort and Insertion Sort
- Identifies natural runs in data
- Highly optimized for real-world data

**Introsort (C++ STL):**
- Starts with Quick Sort
- Switches to Heap Sort if recursion depth exceeds threshold
- Uses Insertion Sort for small subarrays

### Parallel Sorting
- Merge Sort: Easily parallelizable (independent subarray sorting)
- Quick Sort: Can parallelize partitioning
- Bucket Sort: Independent bucket sorting

### External Sorting
When data doesn't fit in memory:
- External Merge Sort
- Distribution-based sorts (Bucket Sort)

---

## Key Takeaways

1. **No universal best algorithm** - choice depends on:
   - Data size and distribution
   - Memory constraints
   - Stability requirements
   - Worst-case guarantees needed

2. **Comparison-based sorts** have O(n log n) lower bound
3. **Non-comparison sorts** can be faster but have restrictions
4. **In practice:** Most libraries use hybrid algorithms
5. **For learning:** Start with simple sorts, then master divide-and-conquer

---

## Practice Problems

1. Implement each sorting algorithm from scratch
2. Modify Quick Sort to use median-of-three pivot selection
3. Implement iterative Merge Sort (without recursion)
4. Create a hybrid sort that switches from Quick Sort to Insertion Sort for small subarrays
5. Sort an array of objects by multiple fields using stable sorts
6. Implement external sorting for large files
7. Optimize Bubble Sort to sort in both directions (Cocktail Sort)
8. Implement three-way Quick Sort for arrays with many duplicates

---

## Resources

- **Visualization:** [VisuAlgo.net](https://visualgo.net/en/sorting)
- **Animation:** [Sorting Algorithm Animations](https://www.toptal.com/developers/sorting-algorithms)
- **Interactive:** [USF Sorting Visualizations](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)

---

*Last Updated: November 2025*

