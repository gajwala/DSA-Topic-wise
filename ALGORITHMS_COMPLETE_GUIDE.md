# Complete Algorithms Guide with Theory & Complexity

## Table of Contents
1. [Sorting Algorithms](#sorting-algorithms)
2. [Searching Algorithms](#searching-algorithms)
3. [Graph Algorithms](#graph-algorithms)
4. [Tree Algorithms](#tree-algorithms)
5. [String Algorithms](#string-algorithms)
6. [Mathematical Algorithms](#mathematical-algorithms)
7. [Greedy Algorithms](#greedy-algorithms)
8. [Dynamic Programming Algorithms](#dynamic-programming-algorithms)
9. [Backtracking Algorithms](#backtracking-algorithms)
10. [Divide & Conquer Algorithms](#divide--conquer-algorithms)
11. [Array Algorithms](#array-algorithms)
12. [Linked List Algorithms](#linked-list-algorithms)

---

## Sorting Algorithms

### 1. Bubble Sort

**Theory**: Repeatedly steps through the list, compares adjacent elements and swaps them if they're in wrong order. The pass through the list is repeated until sorted.

**Time Complexity**: 
- Best: O(n) - when array is already sorted
- Average: O(n²)
- Worst: O(n²)

**Space Complexity**: O(1)

**Stable**: Yes

**Example**:
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
        
        // If no swaps, array is sorted
        if (!swapped) break;
    }
    
    return arr;
}

// Example
console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));
// Output: [11, 12, 22, 25, 34, 64, 90]
```

---

### 2. Selection Sort

**Theory**: Divides array into sorted and unsorted regions. Repeatedly selects the smallest element from unsorted region and moves it to sorted region.

**Time Complexity**: 
- Best: O(n²)
- Average: O(n²)
- Worst: O(n²)

**Space Complexity**: O(1)

**Stable**: No

**Example**:
```javascript
function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        // Find minimum element in unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap minimum with first unsorted element
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    
    return arr;
}

// Example
console.log(selectionSort([64, 25, 12, 22, 11]));
// Output: [11, 12, 22, 25, 64]
```

---

### 3. Insertion Sort

**Theory**: Builds final sorted array one item at a time. Takes each element and inserts it into its correct position in the sorted portion.

**Time Complexity**: 
- Best: O(n) - when array is already sorted
- Average: O(n²)
- Worst: O(n²)

**Space Complexity**: O(1)

**Stable**: Yes

**Example**:
```javascript
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

// Example
console.log(insertionSort([12, 11, 13, 5, 6]));
// Output: [5, 6, 11, 12, 13]
```

---

### 4. Merge Sort

**Theory**: Divide and conquer algorithm. Divides array into two halves, recursively sorts them, then merges the sorted halves.

**Time Complexity**: 
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n log n)

**Space Complexity**: O(n)

**Stable**: Yes

**Example**:
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
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example
console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
// Output: [3, 9, 10, 27, 38, 43, 82]
```

---

### 5. Quick Sort

**Theory**: Divide and conquer algorithm. Picks a pivot element, partitions array around pivot (smaller left, larger right), recursively sorts partitions.

**Time Complexity**: 
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n²) - when pivot is always smallest/largest

**Space Complexity**: O(log n) - recursion stack

**Stable**: No

**Example**:
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

// Example
console.log(quickSort([10, 7, 8, 9, 1, 5]));
// Output: [1, 5, 7, 8, 9, 10]
```

---

### 6. Heap Sort

**Theory**: Uses binary heap data structure. Builds max heap from input, repeatedly extracts maximum element and rebuilds heap.

**Time Complexity**: 
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n log n)

**Space Complexity**: O(1)

**Stable**: No

**Example**:
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

// Example
console.log(heapSort([12, 11, 13, 5, 6, 7]));
// Output: [5, 6, 7, 11, 12, 13]
```

---

### 7. Counting Sort

**Theory**: Non-comparison sorting. Counts occurrences of each element, uses arithmetic to determine positions.

**Time Complexity**: O(n + k) where k is range of input

**Space Complexity**: O(k)

**Stable**: Yes

**Example**:
```javascript
function countingSort(arr) {
    if (arr.length === 0) return arr;
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    const count = Array(range).fill(0);
    const output = Array(arr.length);
    
    // Store count of each element
    for (let num of arr) {
        count[num - min]++;
    }
    
    // Change count[i] to actual position
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    return output;
}

// Example
console.log(countingSort([4, 2, 2, 8, 3, 3, 1]));
// Output: [1, 2, 2, 3, 3, 4, 8]
```

---

### 8. Radix Sort

**Theory**: Non-comparison sorting. Sorts by processing individual digits, starting from least significant to most significant digit.

**Time Complexity**: O(d × (n + k)) where d is number of digits

**Space Complexity**: O(n + k)

**Stable**: Yes

**Example**:
```javascript
function radixSort(arr) {
    const max = Math.max(...arr);
    
    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    
    return arr;
}

function countingSortByDigit(arr, exp) {
    const n = arr.length;
    const output = Array(n);
    const count = Array(10).fill(0);
    
    // Store count of occurrences
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
    }
    
    // Change count[i] to actual position
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    // Copy output to arr
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

// Example
console.log(radixSort([170, 45, 75, 90, 802, 24, 2, 66]));
// Output: [2, 24, 45, 66, 75, 90, 170, 802]
```

---

### 9. Bucket Sort

**Theory**: Distributes elements into buckets, sorts individual buckets, then concatenates.

**Time Complexity**: 
- Best: O(n + k)
- Average: O(n + k)
- Worst: O(n²)

**Space Complexity**: O(n + k)

**Stable**: Yes

**Example**:
```javascript
function bucketSort(arr, bucketSize = 5) {
    if (arr.length === 0) return arr;
    
    // Find min and max
    let min = arr[0];
    let max = arr[0];
    
    for (let num of arr) {
        if (num < min) min = num;
        if (num > max) max = num;
    }
    
    // Create buckets
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = Array(bucketCount).fill(null).map(() => []);
    
    // Distribute elements into buckets
    for (let num of arr) {
        const bucketIndex = Math.floor((num - min) / bucketSize);
        buckets[bucketIndex].push(num);
    }
    
    // Sort individual buckets and concatenate
    const result = [];
    for (let bucket of buckets) {
        bucket.sort((a, b) => a - b);
        result.push(...bucket);
    }
    
    return result;
}

// Example
console.log(bucketSort([0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51]));
// Output: [0.32, 0.33, 0.37, 0.42, 0.47, 0.51, 0.52]
```

---

### 10. Shell Sort

**Theory**: Generalization of insertion sort. Sorts elements at specific intervals, gradually reduces interval to 1.

**Time Complexity**: 
- Best: O(n log n)
- Average: O(n^(3/2))
- Worst: O(n²)

**Space Complexity**: O(1)

**Stable**: No

**Example**:
```javascript
function shellSort(arr) {
    const n = arr.length;
    
    // Start with large gap, then reduce
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Do gapped insertion sort
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
    }
    
    return arr;
}

// Example
console.log(shellSort([12, 34, 54, 2, 3]));
// Output: [2, 3, 12, 34, 54]
```

---

## Searching Algorithms

### 1. Linear Search

**Theory**: Sequentially checks each element until target is found or list ends.

**Time Complexity**: 
- Best: O(1) - element at first position
- Average: O(n)
- Worst: O(n)

**Space Complexity**: O(1)

**Example**:
```javascript
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

// Example
console.log(linearSearch([2, 3, 4, 10, 40], 10)); // Output: 3
console.log(linearSearch([2, 3, 4, 10, 40], 5));  // Output: -1
```

---

### 2. Binary Search

**Theory**: Efficient search in sorted array. Repeatedly divides search interval in half.

**Time Complexity**: 
- Best: O(1)
- Average: O(log n)
- Worst: O(log n)

**Space Complexity**: O(1) iterative, O(log n) recursive

**Example**:
```javascript
// Iterative
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Recursive
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
    return binarySearchRecursive(arr, target, left, mid - 1);
}

// Example
console.log(binarySearch([2, 3, 4, 10, 40], 10)); // Output: 3
```

---

### 3. Jump Search

**Theory**: For sorted arrays. Jumps ahead by fixed steps, then performs linear search in block.

**Time Complexity**: O(√n)

**Space Complexity**: O(1)

**Example**:
```javascript
function jumpSearch(arr, target) {
    const n = arr.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;
    
    // Find block where element may be present
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    
    // Linear search in block
    while (arr[prev] < target) {
        prev++;
        if (prev === Math.min(step, n)) return -1;
    }
    
    if (arr[prev] === target) return prev;
    return -1;
}

// Example
console.log(jumpSearch([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89], 55));
// Output: 10
```

---

### 4. Interpolation Search

**Theory**: For uniformly distributed sorted arrays. Estimates position based on value.

**Time Complexity**: 
- Best: O(1)
- Average: O(log log n)
- Worst: O(n)

**Space Complexity**: O(1)

**Example**:
```javascript
function interpolationSearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low === high) {
            return arr[low] === target ? low : -1;
        }
        
        // Estimate position
        const pos = low + Math.floor(
            ((target - arr[low]) * (high - low)) / 
            (arr[high] - arr[low])
        );
        
        if (arr[pos] === target) {
            return pos;
        }
        
        if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    
    return -1;
}

// Example
console.log(interpolationSearch([10, 12, 13, 16, 18, 19, 20, 21], 18));
// Output: 4
```

---

### 5. Exponential Search

**Theory**: For unbounded/infinite arrays. Finds range then applies binary search.

**Time Complexity**: O(log n)

**Space Complexity**: O(1)

**Example**:
```javascript
function exponentialSearch(arr, target) {
    if (arr[0] === target) return 0;
    
    // Find range for binary search
    let i = 1;
    while (i < arr.length && arr[i] <= target) {
        i *= 2;
    }
    
    // Binary search in found range
    return binarySearch(
        arr.slice(i / 2, Math.min(i, arr.length)),
        target
    ) + i / 2;
}

// Example
console.log(exponentialSearch([2, 3, 4, 10, 40], 10)); // Output: 3
```

---

### 6. Ternary Search

**Theory**: Divide and conquer. Divides array into three parts instead of two.

**Time Complexity**: O(log₃ n)

**Space Complexity**: O(1)

**Example**:
```javascript
function ternarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (right >= left) {
        const mid1 = left + Math.floor((right - left) / 3);
        const mid2 = right - Math.floor((right - left) / 3);
        
        if (arr[mid1] === target) return mid1;
        if (arr[mid2] === target) return mid2;
        
        if (target < arr[mid1]) {
            return ternarySearch(arr, target, left, mid1 - 1);
        } else if (target > arr[mid2]) {
            return ternarySearch(arr, target, mid2 + 1, right);
        } else {
            return ternarySearch(arr, target, mid1 + 1, mid2 - 1);
        }
    }
    
    return -1;
}

// Example
console.log(ternarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));
// Output: 4
```

---

## Graph Algorithms

### 1. Breadth-First Search (BFS)

**Theory**: Explores graph level by level. Uses queue. Finds shortest path in unweighted graph.

**Time Complexity**: O(V + E) where V = vertices, E = edges

**Space Complexity**: O(V)

**Example**:
```javascript
function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    const result = [];
    
    visited.add(start);
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);
        
        for (let neighbor of graph[vertex] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}

// Example
const graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 4],
    3: [1],
    4: [1, 2]
};
console.log(bfs(graph, 0)); // Output: [0, 1, 2, 3, 4]
```

---

### 2. Depth-First Search (DFS)

**Theory**: Explores as far as possible along each branch. Uses stack/recursion.

**Time Complexity**: O(V + E)

**Space Complexity**: O(V)

**Example**:
```javascript
// Recursive
function dfs(graph, start, visited = new Set(), result = []) {
    visited.add(start);
    result.push(start);
    
    for (let neighbor of graph[start] || []) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited, result);
        }
    }
    
    return result;
}

// Iterative
function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    const result = [];
    
    while (stack.length > 0) {
        const vertex = stack.pop();
        
        if (!visited.has(vertex)) {
            visited.add(vertex);
            result.push(vertex);
            
            for (let neighbor of graph[vertex] || []) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
    
    return result;
}

// Example
console.log(dfs(graph, 0)); // Output: [0, 1, 3, 4, 2]
```

---

### 3. Dijkstra's Algorithm

**Theory**: Finds shortest path from source to all vertices in weighted graph with non-negative weights.

**Time Complexity**: O((V + E) log V) with min-heap

**Space Complexity**: O(V)

**Example**:
```javascript
function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const pq = [[0, start]]; // [distance, vertex]
    
    // Initialize distances
    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;
    
    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [currentDist, current] = pq.shift();
        
        if (visited.has(current)) continue;
        visited.add(current);
        
        for (let [neighbor, weight] of graph[current] || []) {
            const distance = currentDist + weight;
            
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                pq.push([distance, neighbor]);
            }
        }
    }
    
    return distances;
}

// Example
const weightedGraph = {
    'A': [['B', 4], ['C', 2]],
    'B': [['A', 4], ['C', 1], ['D', 5]],
    'C': [['A', 2], ['B', 1], ['D', 8]],
    'D': [['B', 5], ['C', 8]]
};
console.log(dijkstra(weightedGraph, 'A'));
// Output: { A: 0, B: 3, C: 2, D: 8 }
```

---

### 4. Bellman-Ford Algorithm

**Theory**: Finds shortest paths from source. Works with negative weights. Detects negative cycles.

**Time Complexity**: O(V × E)

**Space Complexity**: O(V)

**Example**:
```javascript
function bellmanFord(graph, V, start) {
    const distances = Array(V).fill(Infinity);
    distances[start] = 0;
    
    // Relax edges V-1 times
    for (let i = 0; i < V - 1; i++) {
        for (let [u, v, weight] of graph) {
            if (distances[u] !== Infinity && 
                distances[u] + weight < distances[v]) {
                distances[v] = distances[u] + weight;
            }
        }
    }
    
    // Check for negative cycles
    for (let [u, v, weight] of graph) {
        if (distances[u] !== Infinity && 
            distances[u] + weight < distances[v]) {
            return "Negative cycle detected";
        }
    }
    
    return distances;
}

// Example: edges as [source, dest, weight]
const edges = [
    [0, 1, -1],
    [0, 2, 4],
    [1, 2, 3],
    [1, 3, 2],
    [1, 4, 2],
    [3, 2, 5],
    [3, 1, 1],
    [4, 3, -3]
];
console.log(bellmanFord(edges, 5, 0));
// Output: [0, -1, 2, -2, 1]
```

---

### 5. Floyd-Warshall Algorithm

**Theory**: Finds shortest paths between all pairs of vertices. Uses dynamic programming.

**Time Complexity**: O(V³)

**Space Complexity**: O(V²)

**Example**:
```javascript
function floydWarshall(graph) {
    const V = graph.length;
    const dist = graph.map(row => [...row]);
    
    // Consider each vertex as intermediate
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    return dist;
}

// Example
const INF = Infinity;
const graphMatrix = [
    [0, 5, INF, 10],
    [INF, 0, 3, INF],
    [INF, INF, 0, 1],
    [INF, INF, INF, 0]
];
console.log(floydWarshall(graphMatrix));
```

---

### 6. Kruskal's Algorithm (MST)

**Theory**: Finds Minimum Spanning Tree. Greedy approach, sorts edges by weight, adds if doesn't create cycle.

**Time Complexity**: O(E log E) or O(E log V)

**Space Complexity**: O(V)

**Example**:
```javascript
class UnionFind {
    constructor(n) {
        this.parent = Array(n).fill(0).map((_, i) => i);
        this.rank = Array(n).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) return false;
        
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        
        return true;
    }
}

function kruskal(V, edges) {
    // Sort edges by weight
    edges.sort((a, b) => a[2] - b[2]);
    
    const uf = new UnionFind(V);
    const mst = [];
    let cost = 0;
    
    for (let [u, v, weight] of edges) {
        if (uf.union(u, v)) {
            mst.push([u, v, weight]);
            cost += weight;
        }
    }
    
    return { mst, cost };
}

// Example: edges as [u, v, weight]
const kruskalEdges = [
    [0, 1, 10],
    [0, 2, 6],
    [0, 3, 5],
    [1, 3, 15],
    [2, 3, 4]
];
console.log(kruskal(4, kruskalEdges));
// Output: { mst: [[2,3,4], [0,3,5], [0,1,10]], cost: 19 }
```

---

### 7. Prim's Algorithm (MST)

**Theory**: Finds MST. Grows tree from starting vertex, adds minimum weight edge connecting tree to non-tree vertex.

**Time Complexity**: O(E log V) with min-heap

**Space Complexity**: O(V)

**Example**:
```javascript
function prim(graph, V) {
    const visited = Array(V).fill(false);
    const minHeap = [[0, 0]]; // [weight, vertex]
    const mst = [];
    let cost = 0;
    
    while (minHeap.length > 0) {
        minHeap.sort((a, b) => a[0] - b[0]);
        const [weight, u] = minHeap.shift();
        
        if (visited[u]) continue;
        
        visited[u] = true;
        cost += weight;
        
        if (weight > 0) {
            mst.push([u, weight]);
        }
        
        for (let [v, w] of graph[u] || []) {
            if (!visited[v]) {
                minHeap.push([w, v]);
            }
        }
    }
    
    return { mst, cost };
}

// Example
const primGraph = {
    0: [[1, 2], [3, 6]],
    1: [[0, 2], [2, 3], [3, 8], [4, 5]],
    2: [[1, 3], [4, 7]],
    3: [[0, 6], [1, 8]],
    4: [[1, 5], [2, 7]]
};
console.log(prim(primGraph, 5));
```

---

### 8. Topological Sort

**Theory**: Linear ordering of vertices in DAG. Vertex u comes before v if edge u→v exists.

**Time Complexity**: O(V + E)

**Space Complexity**: O(V)

**Example**:
```javascript
// Using DFS
function topologicalSort(graph, V) {
    const visited = Array(V).fill(false);
    const stack = [];
    
    function dfs(v) {
        visited[v] = true;
        
        for (let neighbor of graph[v] || []) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
        
        stack.push(v);
    }
    
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }
    
    return stack.reverse();
}

// Using Kahn's Algorithm (BFS)
function topologicalSortKahn(graph, V) {
    const inDegree = Array(V).fill(0);
    
    for (let u = 0; u < V; u++) {
        for (let v of graph[u] || []) {
            inDegree[v]++;
        }
    }
    
    const queue = [];
    for (let i = 0; i < V; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    const result = [];
    
    while (queue.length > 0) {
        const u = queue.shift();
        result.push(u);
        
        for (let v of graph[u] || []) {
            inDegree[v]--;
            if (inDegree[v] === 0) {
                queue.push(v);
            }
        }
    }
    
    return result.length === V ? result : [];
}

// Example
const dag = {
    0: [1, 2],
    1: [3],
    2: [3],
    3: [4],
    4: []
};
console.log(topologicalSort(dag, 5)); // Output: [0, 2, 1, 3, 4]
```

---

### 9. Tarjan's Algorithm (SCC)

**Theory**: Finds Strongly Connected Components in directed graph using DFS and low-link values.

**Time Complexity**: O(V + E)

**Space Complexity**: O(V)

**Example**:
```javascript
function tarjanSCC(graph, V) {
    let time = 0;
    const disc = Array(V).fill(-1);
    const low = Array(V).fill(-1);
    const onStack = Array(V).fill(false);
    const stack = [];
    const sccs = [];
    
    function dfs(u) {
        disc[u] = low[u] = time++;
        stack.push(u);
        onStack[u] = true;
        
        for (let v of graph[u] || []) {
            if (disc[v] === -1) {
                dfs(v);
                low[u] = Math.min(low[u], low[v]);
            } else if (onStack[v]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
        
        if (low[u] === disc[u]) {
            const scc = [];
            let v;
            do {
                v = stack.pop();
                onStack[v] = false;
                scc.push(v);
            } while (v !== u);
            sccs.push(scc);
        }
    }
    
    for (let i = 0; i < V; i++) {
        if (disc[i] === -1) {
            dfs(i);
        }
    }
    
    return sccs;
}

// Example
const directedGraph = {
    0: [1],
    1: [2],
    2: [0, 3],
    3: [4],
    4: [5],
    5: [3]
};
console.log(tarjanSCC(directedGraph, 6));
// Output: [[3, 5, 4], [0, 2, 1]]
```

---

### 10. A* Algorithm

**Theory**: Pathfinding algorithm. Uses heuristic to guide search. f(n) = g(n) + h(n).

**Time Complexity**: O(b^d) where b is branching factor, d is depth

**Space Complexity**: O(b^d)

**Example**:
```javascript
function astar(grid, start, goal) {
    function heuristic(a, b) {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    }
    
    const openSet = [[0, start]];
    const cameFrom = new Map();
    const gScore = new Map([[start.toString(), 0]]);
    const fScore = new Map([[start.toString(), heuristic(start, goal)]]);
    
    while (openSet.length > 0) {
        openSet.sort((a, b) => a[0] - b[0]);
        const [, current] = openSet.shift();
        
        if (current[0] === goal[0] && current[1] === goal[1]) {
            return reconstructPath(cameFrom, current);
        }
        
        const neighbors = getNeighbors(grid, current);
        
        for (let neighbor of neighbors) {
            const tentativeG = gScore.get(current.toString()) + 1;
            
            if (tentativeG < (gScore.get(neighbor.toString()) || Infinity)) {
                cameFrom.set(neighbor.toString(), current);
                gScore.set(neighbor.toString(), tentativeG);
                fScore.set(neighbor.toString(), 
                    tentativeG + heuristic(neighbor, goal));
                
                if (!openSet.some(([, n]) => n.toString() === neighbor.toString())) {
                    openSet.push([fScore.get(neighbor.toString()), neighbor]);
                }
            }
        }
    }
    
    return null;
}

function getNeighbors(grid, [x, y]) {
    const neighbors = [];
    const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
    
    for (let [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        
        if (nx >= 0 && nx < grid.length && 
            ny >= 0 && ny < grid[0].length && 
            grid[nx][ny] !== 1) {
            neighbors.push([nx, ny]);
        }
    }
    
    return neighbors;
}

function reconstructPath(cameFrom, current) {
    const path = [current];
    
    while (cameFrom.has(current.toString())) {
        current = cameFrom.get(current.toString());
        path.unshift(current);
    }
    
    return path;
}
```

---

## Tree Algorithms

### 1. Tree Traversals

#### Inorder (Left-Root-Right)

**Time Complexity**: O(n)
**Space Complexity**: O(h) where h is height

```javascript
function inorderTraversal(root) {
    const result = [];
    
    function inorder(node) {
        if (!node) return;
        
        inorder(node.left);
        result.push(node.val);
        inorder(node.right);
    }
    
    inorder(root);
    return result;
}

// Iterative
function inorderIterative(root) {
    const result = [];
    const stack = [];
    let current = root;
    
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        current = stack.pop();
        result.push(current.val);
        current = current.right;
    }
    
    return result;
}
```

#### Preorder (Root-Left-Right)

```javascript
function preorderTraversal(root) {
    const result = [];
    
    function preorder(node) {
        if (!node) return;
        
        result.push(node.val);
        preorder(node.left);
        preorder(node.right);
    }
    
    preorder(root);
    return result;
}

// Iterative
function preorderIterative(root) {
    if (!root) return [];
    
    const result = [];
    const stack = [root];
    
    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node.val);
        
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    
    return result;
}
```

#### Postorder (Left-Right-Root)

```javascript
function postorderTraversal(root) {
    const result = [];
    
    function postorder(node) {
        if (!node) return;
        
        postorder(node.left);
        postorder(node.right);
        result.push(node.val);
    }
    
    postorder(root);
    return result;
}
```

#### Level Order (BFS)

```javascript
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}
```

---

### 2. Binary Search Tree Operations

#### Insert

**Time Complexity**: O(h) average O(log n), worst O(n)

```javascript
function insertBST(root, val) {
    if (!root) return new TreeNode(val);
    
    if (val < root.val) {
        root.left = insertBST(root.left, val);
    } else {
        root.right = insertBST(root.right, val);
    }
    
    return root;
}
```

#### Search

**Time Complexity**: O(h)

```javascript
function searchBST(root, val) {
    if (!root || root.val === val) return root;
    
    if (val < root.val) {
        return searchBST(root.left, val);
    } else {
        return searchBST(root.right, val);
    }
}
```

#### Delete

**Time Complexity**: O(h)

```javascript
function deleteBST(root, key) {
    if (!root) return null;
    
    if (key < root.val) {
        root.left = deleteBST(root.left, key);
    } else if (key > root.val) {
        root.right = deleteBST(root.right, key);
    } else {
        // Node to delete found
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        
        // Node has two children
        let minNode = findMin(root.right);
        root.val = minNode.val;
        root.right = deleteBST(root.right, minNode.val);
    }
    
    return root;
}

function findMin(node) {
    while (node.left) {
        node = node.left;
    }
    return node;
}
```

---

### 3. Lowest Common Ancestor (LCA)

**Time Complexity**: O(n)
**Space Complexity**: O(h)

```javascript
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) {
        return root;
    }
    
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    if (left && right) return root;
    return left || right;
}

// For BST
function lcaBST(root, p, q) {
    if (p.val < root.val && q.val < root.val) {
        return lcaBST(root.left, p, q);
    }
    
    if (p.val > root.val && q.val > root.val) {
        return lcaBST(root.right, p, q);
    }
    
    return root;
}
```

---

### 4. Tree Height/Depth

**Time Complexity**: O(n)
**Space Complexity**: O(h)

```javascript
function maxDepth(root) {
    if (!root) return 0;
    
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

function minDepth(root) {
    if (!root) return 0;
    
    if (!root.left) return 1 + minDepth(root.right);
    if (!root.right) return 1 + minDepth(root.left);
    
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}
```

---

### 5. Balanced Binary Tree

**Time Complexity**: O(n)
**Space Complexity**: O(h)

```javascript
function isBalanced(root) {
    function checkHeight(node) {
        if (!node) return 0;
        
        const leftHeight = checkHeight(node.left);
        if (leftHeight === -1) return -1;
        
        const rightHeight = checkHeight(node.right);
        if (rightHeight === -1) return -1;
        
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }
        
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    return checkHeight(root) !== -1;
}
```

---

### 6. Diameter of Binary Tree

**Time Complexity**: O(n)
**Space Complexity**: O(h)

```javascript
function diameterOfBinaryTree(root) {
    let diameter = 0;
    
    function height(node) {
        if (!node) return 0;
        
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);
        
        diameter = Math.max(diameter, leftHeight + rightHeight);
        
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    height(root);
    return diameter;
}
```

---

### 7. Serialize and Deserialize Binary Tree

**Time Complexity**: O(n)
**Space Complexity**: O(n)

```javascript
function serialize(root) {
    if (!root) return 'null';
    
    return root.val + ',' + 
           serialize(root.left) + ',' + 
           serialize(root.right);
}

function deserialize(data) {
    const values = data.split(',');
    let index = 0;
    
    function build() {
        if (values[index] === 'null') {
            index++;
            return null;
        }
        
        const node = new TreeNode(parseInt(values[index++]));
        node.left = build();
        node.right = build();
        
        return node;
    }
    
    return build();
}
```

---

## String Algorithms

### 1. KMP (Knuth-Morris-Pratt) Pattern Matching

**Theory**: String matching algorithm. Preprocesses pattern to avoid unnecessary comparisons.

**Time Complexity**: O(n + m) where n is text length, m is pattern length
**Space Complexity**: O(m)

```javascript
function kmpSearch(text, pattern) {
    const lps = computeLPS(pattern);
    const result = [];
    let i = 0; // text index
    let j = 0; // pattern index
    
    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++;
            j++;
        }
        
        if (j === pattern.length) {
            result.push(i - j);
            j = lps[j - 1];
        } else if (i < text.length && text[i] !== pattern[j]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return result;
}

function computeLPS(pattern) {
    const lps = Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;
    
    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    
    return lps;
}

// Example
console.log(kmpSearch("ABABDABACDABABCABAB", "ABABCABAB"));
// Output: [10]
```

---

### 2. Rabin-Karp Algorithm

**Theory**: String matching using hashing. Computes hash of pattern and compares with text substrings.

**Time Complexity**: O(n + m) average, O(nm) worst
**Space Complexity**: O(1)

```javascript
function rabinKarp(text, pattern) {
    const d = 256; // Number of characters
    const q = 101; // A prime number
    const m = pattern.length;
    const n = text.length;
    let patternHash = 0;
    let textHash = 0;
    let h = 1;
    const result = [];
    
    // Calculate h = d^(m-1) % q
    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }
    
    // Calculate initial hash values
    for (let i = 0; i < m; i++) {
        patternHash = (d * patternHash + pattern.charCodeAt(i)) % q;
        textHash = (d * textHash + text.charCodeAt(i)) % q;
    }
    
    // Slide pattern over text
    for (let i = 0; i <= n - m; i++) {
        if (patternHash === textHash) {
            // Check characters one by one
            let match = true;
            for (let j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            
            if (match) result.push(i);
        }
        
        // Calculate hash for next window
        if (i < n - m) {
            textHash = (d * (textHash - text.charCodeAt(i) * h) + 
                       text.charCodeAt(i + m)) % q;
            
            if (textHash < 0) {
                textHash += q;
            }
        }
    }
    
    return result;
}

// Example
console.log(rabinKarp("GEEKS FOR GEEKS", "GEEKS"));
// Output: [0, 10]
```

---

### 3. Z Algorithm

**Theory**: Linear time pattern matching. Constructs Z array where Z[i] is length of longest substring starting from i which is also prefix.

**Time Complexity**: O(n + m)
**Space Complexity**: O(n + m)

```javascript
function zAlgorithm(text, pattern) {
    const concat = pattern + "$" + text;
    const n = concat.length;
    const z = Array(n).fill(0);
    const result = [];
    
    let l = 0, r = 0;
    
    for (let i = 1; i < n; i++) {
        if (i > r) {
            l = r = i;
            while (r < n && concat[r - l] === concat[r]) {
                r++;
            }
            z[i] = r - l;
            r--;
        } else {
            const k = i - l;
            if (z[k] < r - i + 1) {
                z[i] = z[k];
            } else {
                l = i;
                while (r < n && concat[r - l] === concat[r]) {
                    r++;
                }
                z[i] = r - l;
                r--;
            }
        }
        
        if (z[i] === pattern.length) {
            result.push(i - pattern.length - 1);
        }
    }
    
    return result;
}

// Example
console.log(zAlgorithm("GEEKS FOR GEEKS", "GEEKS"));
// Output: [0, 10]
```

---

### 4. Longest Common Substring

**Time Complexity**: O(m × n)
**Space Complexity**: O(m × n)

```javascript
function longestCommonSubstring(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    let maxLen = 0;
    let endIndex = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                
                if (dp[i][j] > maxLen) {
                    maxLen = dp[i][j];
                    endIndex = i - 1;
                }
            }
        }
    }
    
    return s1.substring(endIndex - maxLen + 1, endIndex + 1);
}

// Example
console.log(longestCommonSubstring("ABABC", "BABCA"));
// Output: "BABC"
```

---

### 5. Longest Palindromic Substring

**Time Complexity**: O(n²)
**Space Complexity**: O(1)

```javascript
function longestPalindrome(s) {
    if (s.length < 2) return s;
    
    let start = 0;
    let maxLen = 0;
    
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const len = right - left + 1;
            if (len > maxLen) {
                start = left;
                maxLen = len;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);     // Odd length
        expandAroundCenter(i, i + 1); // Even length
    }
    
    return s.substring(start, start + maxLen);
}

// Example
console.log(longestPalindrome("babad")); // Output: "bab" or "aba"
```

---

### 6. Manacher's Algorithm (Longest Palindrome)

**Theory**: Linear time algorithm for finding longest palindromic substring.

**Time Complexity**: O(n)
**Space Complexity**: O(n)

```javascript
function manacher(s) {
    // Transform string
    let t = '#';
    for (let char of s) {
        t += char + '#';
    }
    
    const n = t.length;
    const p = Array(n).fill(0);
    let center = 0;
    let right = 0;
    
    for (let i = 0; i < n; i++) {
        const mirror = 2 * center - i;
        
        if (i < right) {
            p[i] = Math.min(right - i, p[mirror]);
        }
        
        // Expand around i
        while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 &&
               t[i + p[i] + 1] === t[i - p[i] - 1]) {
            p[i]++;
        }
        
        // Update center and right
        if (i + p[i] > right) {
            center = i;
            right = i + p[i];
        }
    }
    
    // Find longest palindrome
    let maxLen = 0;
    let centerIndex = 0;
    
    for (let i = 0; i < n; i++) {
        if (p[i] > maxLen) {
            maxLen = p[i];
            centerIndex = i;
        }
    }
    
    const start = (centerIndex - maxLen) / 2;
    return s.substring(start, start + maxLen);
}

// Example
console.log(manacher("babad")); // Output: "bab" or "aba"
```

---

### 7. Trie (Prefix Tree)

**Operations Time Complexity**: O(m) where m is word length
**Space Complexity**: O(ALPHABET_SIZE × N × M)

```javascript
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let node = this.root;
        
        for (let char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        
        node.isEndOfWord = true;
    }
    
    search(word) {
        let node = this.root;
        
        for (let char of word) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char);
        }
        
        return node.isEndOfWord;
    }
    
    startsWith(prefix) {
        let node = this.root;
        
        for (let char of prefix) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char);
        }
        
        return true;
    }
}

// Example
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));   // true
console.log(trie.search("app"));     // false
console.log(trie.startsWith("app")); // true
```

---

## Mathematical Algorithms

### 1. GCD (Greatest Common Divisor) - Euclidean Algorithm

**Time Complexity**: O(log(min(a, b)))
**Space Complexity**: O(1)

```javascript
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Recursive
function gcdRecursive(a, b) {
    if (b === 0) return a;
    return gcdRecursive(b, a % b);
}

// Example
console.log(gcd(48, 18)); // Output: 6
```

---

### 2. LCM (Least Common Multiple)

**Time Complexity**: O(log(min(a, b)))
**Space Complexity**: O(1)

```javascript
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// Example
console.log(lcm(12, 18)); // Output: 36
```

---

### 3. Prime Number Algorithms

#### Sieve of Eratosthenes

**Time Complexity**: O(n log log n)
**Space Complexity**: O(n)

```javascript
function sieveOfEratosthenes(n) {
    const isPrime = Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) primes.push(i);
    }
    
    return primes;
}

// Example
console.log(sieveOfEratosthenes(30));
// Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

#### Check if Prime

**Time Complexity**: O(√n)
**Space Complexity**: O(1)

```javascript
function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    
    return true;
}

// Example
console.log(isPrime(17)); // true
console.log(isPrime(16)); // false
```

---

### 4. Fast Power (Exponentiation by Squaring)

**Time Complexity**: O(log n)
**Space Complexity**: O(1)

```javascript
function fastPower(base, exp) {
    if (exp === 0) return 1;
    
    let result = 1;
    let current = base;
    
    while (exp > 0) {
        if (exp % 2 === 1) {
            result *= current;
        }
        current *= current;
        exp = Math.floor(exp / 2);
    }
    
    return result;
}

// With modulo
function modPower(base, exp, mod) {
    let result = 1;
    base = base % mod;
    
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp = Math.floor(exp / 2);
    }
    
    return result;
}

// Example
console.log(fastPower(2, 10));      // 1024
console.log(modPower(2, 10, 1000)); // 24
```

---

### 5. Fibonacci Numbers

**Time Complexity**: O(n) for iterative, O(log n) for matrix
**Space Complexity**: O(1) for iterative

```javascript
// Iterative
function fibonacci(n) {
    if (n <= 1) return n;
    
    let prev2 = 0;
    let prev1 = 1;
    
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Matrix exponentiation O(log n)
function fibMatrix(n) {
    if (n <= 1) return n;
    
    function multiply(a, b) {
        return [
            [a[0][0]*b[0][0] + a[0][1]*b[1][0], 
             a[0][0]*b[0][1] + a[0][1]*b[1][1]],
            [a[1][0]*b[0][0] + a[1][1]*b[1][0], 
             a[1][0]*b[0][1] + a[1][1]*b[1][1]]
        ];
    }
    
    function power(matrix, n) {
        if (n === 1) return matrix;
        if (n % 2 === 0) {
            const half = power(matrix, n / 2);
            return multiply(half, half);
        }
        return multiply(matrix, power(matrix, n - 1));
    }
    
    const base = [[1, 1], [1, 0]];
    const result = power(base, n);
    
    return result[0][1];
}

// Example
console.log(fibonacci(10)); // 55
```

---

### 6. Factorial

**Time Complexity**: O(n)
**Space Complexity**: O(1) iterative, O(n) recursive

```javascript
function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Recursive
function factorialRecursive(n) {
    if (n <= 1) return 1;
    return n * factorialRecursive(n - 1);
}

// Example
console.log(factorial(5)); // 120
```

---

### 7. Combinations and Permutations

```javascript
// nCr = n! / (r! × (n-r)!)
function combinations(n, r) {
    if (r > n) return 0;
    if (r === 0 || r === n) return 1;
    
    r = Math.min(r, n - r); // Optimization
    
    let result = 1;
    for (let i = 0; i < r; i++) {
        result *= (n - i);
        result /= (i + 1);
    }
    
    return Math.round(result);
}

// nPr = n! / (n-r)!
function permutations(n, r) {
    let result = 1;
    for (let i = 0; i < r; i++) {
        result *= (n - i);
    }
    return result;
}

// Example
console.log(combinations(5, 2));  // 10
console.log(permutations(5, 2));  // 20
```

---

## Summary Tables

### Sorting Algorithm Comparison

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes |
| Radix Sort | O(d(n+k)) | O(d(n+k)) | O(d(n+k)) | O(n+k) | Yes |
| Bucket Sort | O(n+k) | O(n+k) | O(n²) | O(n+k) | Yes |

### Graph Algorithm Comparison

| Algorithm | Time | Space | Use Case |
|-----------|------|-------|----------|
| BFS | O(V+E) | O(V) | Shortest path (unweighted) |
| DFS | O(V+E) | O(V) | Connected components, cycle |
| Dijkstra | O((V+E)logV) | O(V) | Shortest path (weighted) |
| Bellman-Ford | O(VE) | O(V) | Negative weights, detect cycle |
| Floyd-Warshall | O(V³) | O(V²) | All pairs shortest path |
| Kruskal | O(E log E) | O(V) | Minimum Spanning Tree |
| Prim | O(E log V) | O(V) | Minimum Spanning Tree |
| Topological Sort | O(V+E) | O(V) | Task scheduling (DAG) |

---

**Happy Learning! 🚀**

This guide covers the most important algorithms you'll need for interviews and competitive programming!


