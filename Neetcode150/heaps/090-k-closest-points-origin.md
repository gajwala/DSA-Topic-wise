# 90. K Closest Points to Origin

**LeetCode Link**: [973. K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)

**Difficulty**: Medium

**Topics**: Array, Math, Divide and Conquer, Geometry, Sorting, Heap, Quickselect

---

## Problem Statement

Given an array of `points` where `points[i] = [xi, yi]` represents a point on the **X-Y** plane and an integer `k`, return the `k` **closest** points to the origin `(0, 0)`.

The distance between two points on the X-Y plane is the Euclidean distance: √(x1 - x2)² + (y1 - y2)².

### Examples

**Example 1:**
```
Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
```

**Example 2:**
```
Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
```

### Constraints
- `1 <= k <= points.length <= 10^4`
- `-10^4 <= xi, yi <= 10^4`

---

## Approach 1: Max-Heap of Size K ✅

### Implementation

```javascript
/**
 * Max-Heap of size k - O(n log k) time, O(k) space
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
function kClosest(points, k) {
    const dist = (p) => p[0]*p[0] + p[1]*p[1];
    const heap = []; // max-heap by distance (store [-dist, point])
    
    for (const p of points) {
        const d = dist(p);
        if (heap.length < k) {
            heap.push([-d, p]);
            bubbleUp(heap.length - 1);
        } else if (d < -heap[0][0]) {
            heap[0] = [-d, p];
            bubbleDown(0);
        }
    }
    
    function bubbleUp(i) {
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (heap[i][0] <= heap[p][0]) break;
            [heap[i], heap[p]] = [heap[p], heap[i]];
            i = p;
        }
    }
    
    function bubbleDown(i) {
        const n = heap.length;
        while (true) {
            let largest = i;
            const L = 2*i+1, R = 2*i+2;
            if (L < n && heap[L][0] > heap[largest][0]) largest = L;
            if (R < n && heap[R][0] > heap[largest][0]) largest = R;
            if (largest === i) break;
            [heap[i], heap[largest]] = [heap[largest], heap[i]];
            i = largest;
        }
    }
    
    return heap.map(([, p]) => p);
}
```

### Complexity Analysis
- **Time**: O(n log k)
- **Space**: O(k)

---

## Approach 2: Sort

```javascript
function kClosestSort(points, k) {
    const dist = (p) => p[0]*p[0] + p[1]*p[1];
    points.sort((a, b) => dist(a) - dist(b));
    return points.slice(0, k);
}
```

**Time**: O(n log n), **Space**: O(1) in-place

---

## Key Takeaways

✅ K closest = keep k smallest by distance  
✅ Use max-heap of size k; compare with squared distance (no sqrt needed)  
✅ If heap full and current point closer than max, replace  
✅ Return heap points  
✅ O(n log k) with heap; O(n log n) with sort  
✅ Pattern: K smallest/largest → Heap of size K or sort  

**Pattern**: K closest → Max-heap of size K (by distance)!
