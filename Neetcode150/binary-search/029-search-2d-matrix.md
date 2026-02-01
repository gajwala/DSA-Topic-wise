# 29. Search a 2D Matrix

**LeetCode Link**: [74. Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)

**Difficulty**: Medium

**Topics**: Array, Binary Search, Matrix

---

## Problem Statement

Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix `matrix`. This matrix has the following properties:

- Integers in each row are sorted from left to right.
- The first integer of each row is greater than the last integer of the previous row.

### Examples

**Example 1:**
```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
```

**Example 2:**
```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
```

### Constraints
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-10^4 <= matrix[i][j], target <= 10^4`

---

## Approach 1: Brute Force

```javascript
function searchMatrix(matrix, target) {
    for (let row of matrix) {
        for (let val of row) {
            if (val === target) return true;
        }
    }
    return false;
}
```

**Complexity**: O(m * n) - Checks every element!

---

## Approach 2: Binary Search on Each Row

```javascript
function searchMatrix(matrix, target) {
    for (let row of matrix) {
        if (binarySearch(row, target)) {
            return true;
        }
    }
    return false;
}

function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return true;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}
```

**Complexity**: O(m log n) - Better but not optimal!

---

## Approach 3: Treat as 1D Array (Optimal!) ✅

### Intuition
Since rows are sorted and first element of each row > last of previous, we can treat entire matrix as one sorted array!

### Implementation

```javascript
/**
 * Binary Search on 2D Matrix as 1D Array - O(log(m*n))
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }
    
    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0;
    let right = m * n - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        // Convert 1D index to 2D coordinates
        const row = Math.floor(mid / n);
        const col = mid % n;
        const midValue = matrix[row][col];
        
        if (midValue === target) {
            return true;
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return false;
}

// Test
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)); // true
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13)); // false
```

### Complexity Analysis
- **Time Complexity**: `O(log(m * n))` - Single binary search on entire matrix
- **Space Complexity**: `O(1)` - Only pointers

---

## Approach 4: Two Binary Searches

```javascript
/**
 * First find row, then search in that row
 */
function searchMatrixTwoPass(matrix, target) {
    if (!matrix || matrix.length === 0) return false;
    
    const m = matrix.length;
    const n = matrix[0].length;
    
    // Binary search to find the correct row
    let top = 0, bottom = m - 1;
    while (top <= bottom) {
        const midRow = Math.floor((top + bottom) / 2);
        if (target < matrix[midRow][0]) {
            bottom = midRow - 1;
        } else if (target > matrix[midRow][n - 1]) {
            top = midRow + 1;
        } else {
            // Target is in this row, binary search within row
            let left = 0, right = n - 1;
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (matrix[midRow][mid] === target) {
                    return true;
                } else if (matrix[midRow][mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            return false;
        }
    }
    
    return false;
}
```

**Complexity**: O(log m + log n) - Two binary searches

---

## Visual Example

```
matrix = [[1,  3,  5,  7],
          [10, 11, 16, 20],
          [23, 30, 34, 60]]
target = 3

Treat as 1D: [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60]
Indices:     [0, 1, 2, 3,  4,  5,  6,  7,  8,  9, 10, 11]

Binary Search:
left=0, right=11, mid=5
mid=5 → row=1 (5/4), col=1 (5%4) → matrix[1][1]=11
11 > 3 → Search left

left=0, right=4, mid=2
mid=2 → row=0 (2/4), col=2 (2%4) → matrix[0][2]=5
5 > 3 → Search left

left=0, right=1, mid=0
mid=0 → row=0, col=0 → matrix[0][0]=1
1 < 3 → Search right

left=1, right=1, mid=1
mid=1 → row=0, col=1 → matrix[0][1]=3
3 == 3 → Found! ✓
```

---

## Coordinate Conversion Formula

```javascript
// Convert 1D index to 2D coordinates
const row = Math.floor(index / numCols);
const col = index % numCols;

// Convert 2D coordinates to 1D index
const index = row * numCols + col;

// Example: matrix has 4 columns
// index=5 → row=1 (5/4), col=1 (5%4) → matrix[1][1]
// index=7 → row=1 (7/4), col=3 (7%4) → matrix[1][3]
```

---

## Edge Cases

```javascript
// Single element matrix
console.log(searchMatrix([[5]], 5)); // true
console.log(searchMatrix([[5]], 1)); // false

// Single row
console.log(searchMatrix([[1, 3, 5, 7]], 5)); // true

// Single column
console.log(searchMatrix([[1], [3], [5]], 5)); // true

// Target at corners
console.log(searchMatrix([[1,3],[5,7]], 1)); // true (top-left)
console.log(searchMatrix([[1,3],[5,7]], 7)); // true (bottom-right)

// Empty matrix
console.log(searchMatrix([], 5)); // false
console.log(searchMatrix([[]], 5)); // false
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Matrix is sorted both row-wise and globally? Yes - first element of row > last of previous row."

2. **Approach**: "Treat matrix as flattened 1D sorted array. Use binary search with coordinate conversion."

3. **Key formula**: "Convert index to (row, col): row = idx / numCols, col = idx % numCols"

4. **Complexity**: "O(log(m*n)) time, O(1) space - optimal!"

### Follow-up Questions:

**Q: What if first element of each row is NOT greater than last of previous?**
A: Different problem! (Search a 2D Matrix II - use staircase approach)

**Q: What if we want to return the position?**
```javascript
function searchMatrixPosition(matrix, target) {
    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0, right = m * n - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const row = Math.floor(mid / n);
        const col = mid % n;
        const midValue = matrix[row][col];
        
        if (midValue === target) {
            return [row, col]; // Return position
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return [-1, -1]; // Not found
}
```

---

## Related Problems

- [240. Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/)
- [378. Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/)

---

## Key Takeaways

✅ Treat sorted 2D matrix as 1D array  
✅ Use formula: row = idx / cols, col = idx % cols  
✅ Single binary search - O(log(m*n))  
✅ Works because matrix is globally sorted  

**Pattern**: Sorted 2D matrix (globally) → Flatten & Binary Search!
