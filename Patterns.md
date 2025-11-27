
# Complete DSA Patterns & Problem-Solving Guide

## Table of Contents
1. [Two Pointers Pattern](#two-pointers-pattern)
2. [Sliding Window Pattern](#sliding-window-pattern)
3. [Fast & Slow Pointers](#fast--slow-pointers)
4. [Binary Search Pattern](#binary-search-pattern)
5. [Dynamic Programming Patterns](#dynamic-programming-patterns)
6. [Backtracking Pattern](#backtracking-pattern)
7. [Greedy Pattern](#greedy-pattern)
8. [Divide & Conquer](#divide--conquer)
9. [Monotonic Stack/Queue](#monotonic-stackqueue)
10. [Prefix Sum Pattern](#prefix-sum-pattern)
11. [Union Find Pattern](#union-find-pattern)
12. [Topological Sort Pattern](#topological-sort-pattern)
13. [Additional Patterns](#additional-patterns)
14. [50 Pattern-Based Problems](#50-pattern-based-problems)

---

## Two Pointers Pattern

### When to Use
- Array is sorted
- Need to find pairs/triplets with specific sum
- Remove duplicates
- Partition problems

### Template

```javascript
function twoPointers(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // Process current pointers
        if (condition) {
            // Move left pointer
            left++;
        } else {
            // Move right pointer
            right--;
        }
    }
}

// Same direction pointers
function twoPointersSameDirection(arr) {
    let slow = 0;
    
    for (let fast = 0; fast < arr.length; fast++) {
        if (condition) {
            // Process and move slow pointer
            slow++;
        }
    }
}
```

### Classic Problems

#### Two Sum II (Sorted Array)
```javascript
function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        
        if (sum === target) {
            return [left + 1, right + 1];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [-1, -1];
}
```

#### Container With Most Water
```javascript
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, width * minHeight);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}
```

---

## Sliding Window Pattern

### When to Use
- Subarray/substring problems
- Find max/min in contiguous sequence
- Problems asking for "longest", "shortest", "contains all"
- Fixed or variable window size

### Template

```javascript
// Fixed size window
function fixedSlidingWindow(arr, k) {
    let windowSum = 0;
    let maxSum = 0;
    
    // Build first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

// Variable size window
function variableSlidingWindow(arr, target) {
    let left = 0;
    let windowSum = 0;
    let result = Infinity;
    
    for (let right = 0; right < arr.length; right++) {
        windowSum += arr[right];
        
        while (windowSum >= target) {
            result = Math.min(result, right - left + 1);
            windowSum -= arr[left];
            left++;
        }
    }
    
    return result === Infinity ? 0 : result;
}
```

### Classic Problems

#### Longest Substring Without Repeating Characters
```javascript
function lengthOfLongestSubstring(s) {
    const seen = new Map();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        if (seen.has(s[right])) {
            left = Math.max(left, seen.get(s[right]) + 1);
        }
        
        seen.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

#### Minimum Window Substring
```javascript
function minWindow(s, t) {
    const need = new Map();
    const window = new Map();
    
    for (let char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let left = 0, right = 0;
    let valid = 0;
    let start = 0, len = Infinity;
    
    while (right < s.length) {
        const c = s[right];
        right++;
        
        if (need.has(c)) {
            window.set(c, (window.get(c) || 0) + 1);
            if (window.get(c) === need.get(c)) {
                valid++;
            }
        }
        
        while (valid === need.size) {
            if (right - left < len) {
                start = left;
                len = right - left;
            }
            
            const d = s[left];
            left++;
            
            if (need.has(d)) {
                if (window.get(d) === need.get(d)) {
                    valid--;
                }
                window.set(d, window.get(d) - 1);
            }
        }
    }
    
    return len === Infinity ? "" : s.substring(start, start + len);
}
```

---

## Fast & Slow Pointers

### When to Use
- Detect cycles in linked list
- Find middle of linked list
- Find nth node from end
- Palindrome linked list

### Template

```javascript
function fastSlowPointers(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        // Check condition (e.g., cycle detection)
        if (slow === fast) {
            return true;
        }
    }
    
    return false;
}
```

### Classic Problems

#### Linked List Cycle Detection
```javascript
function hasCycle(head) {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) return true;
    }
    
    return false;
}
```

#### Happy Number
```javascript
function isHappy(n) {
    function getNext(num) {
        let sum = 0;
        while (num > 0) {
            const digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    }
    
    let slow = n;
    let fast = getNext(n);
    
    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }
    
    return fast === 1;
}
```

---

## Binary Search Pattern

### When to Use
- Sorted array search
- Finding boundaries
- Minimize/maximize problems with monotonic property
- Search in rotated arrays

### Templates

```javascript
// Standard binary search
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

// Find leftmost position
function binarySearchLeft(arr, target) {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

// Find rightmost position
function binarySearchRight(arr, target) {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left - 1;
}

// Binary search on answer space
function binarySearchAnswer(arr, target) {
    let left = min_possible_answer;
    let right = max_possible_answer;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (isPossible(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}
```

### Classic Problems

#### Search in Rotated Sorted Array
```javascript
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) return mid;
        
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } 
        // Right half is sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}
```

#### Find Peak Element
```javascript
function findPeakElement(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] < nums[mid + 1]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}
```

---

## Dynamic Programming Patterns

### Pattern 1: Linear DP (1D)

```javascript
// Template
function linearDP(arr) {
    const dp = Array(arr.length).fill(0);
    
    // Base case
    dp[0] = base_value;
    
    // Fill dp table
    for (let i = 1; i < arr.length; i++) {
        dp[i] = Math.max(
            dp[i - 1] + arr[i],  // Include current
            arr[i]               // Start new
        );
    }
    
    return Math.max(...dp);
}
```

#### House Robber
```javascript
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < nums.length; i++) {
        const current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}
```

### Pattern 2: Grid DP (2D)

```javascript
// Template
function gridDP(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dp = Array(m).fill(null).map(() => Array(n).fill(0));
    
    // Base cases
    dp[0][0] = grid[0][0];
    
    // Fill first row
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    
    // Fill first column
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    
    // Fill rest
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    
    return dp[m - 1][n - 1];
}
```

#### Unique Paths
```javascript
function uniquePaths(m, n) {
    const dp = Array(m).fill(null).map(() => Array(n).fill(1));
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    
    return dp[m - 1][n - 1];
}
```

### Pattern 3: Knapsack DP

```javascript
// 0/1 Knapsack
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill(null)
        .map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}
```

### Pattern 4: LCS (Longest Common Subsequence)

```javascript
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}
```

### Pattern 5: LIS (Longest Increasing Subsequence)

```javascript
function lengthOfLIS(nums) {
    const dp = Array(nums.length).fill(1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

// O(n log n) using binary search
function lengthOfLISOptimized(nums) {
    const tails = [];
    
    for (let num of nums) {
        let left = 0;
        let right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(num);
        } else {
            tails[left] = num;
        }
    }
    
    return tails.length;
}
```

---

## Backtracking Pattern

### When to Use
- Generate all combinations/permutations
- Solve constraint satisfaction problems
- Find all solutions
- Subset problems

### Template

```javascript
function backtrack(candidates, path, result) {
    // Base case
    if (isValidSolution(path)) {
        result.push([...path]);
        return;
    }
    
    // Try all possibilities
    for (let i = 0; i < candidates.length; i++) {
        // Choose
        path.push(candidates[i]);
        
        // Explore
        backtrack(candidates.slice(i + 1), path, result);
        
        // Unchoose
        path.pop();
    }
}
```

### Classic Problems

#### Permutations
```javascript
function permute(nums) {
    const result = [];
    
    function backtrack(path, used) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            
            path.push(nums[i]);
            used[i] = true;
            
            backtrack(path, used);
            
            path.pop();
            used[i] = false;
        }
    }
    
    backtrack([], Array(nums.length).fill(false));
    return result;
}
```

#### Combinations
```javascript
function combine(n, k) {
    const result = [];
    
    function backtrack(start, path) {
        if (path.length === k) {
            result.push([...path]);
            return;
        }
        
        for (let i = start; i <= n; i++) {
            path.push(i);
            backtrack(i + 1, path);
            path.pop();
        }
    }
    
    backtrack(1, []);
    return result;
}
```

#### N-Queens
```javascript
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill(null).map(() => Array(n).fill('.'));
    
    function isValid(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        
        // Check diagonal
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        
        // Check anti-diagonal
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }
    
    backtrack(0);
    return result;
}
```

---

## Greedy Pattern

### When to Use
- Optimization problems (min/max)
- Local optimal leads to global optimal
- Scheduling problems
- Interval problems

### Template

```javascript
function greedy(items) {
    // Sort by some criteria
    items.sort((a, b) => criteria(a, b));
    
    let result = 0;
    
    for (let item of items) {
        if (canTake(item)) {
            result += item;
        }
    }
    
    return result;
}
```

### Classic Problems

#### Jump Game
```javascript
function canJump(nums) {
    let maxReach = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    
    return true;
}
```

#### Gas Station
```javascript
function canCompleteCircuit(gas, cost) {
    let totalGas = 0;
    let currentGas = 0;
    let start = 0;
    
    for (let i = 0; i < gas.length; i++) {
        totalGas += gas[i] - cost[i];
        currentGas += gas[i] - cost[i];
        
        if (currentGas < 0) {
            start = i + 1;
            currentGas = 0;
        }
    }
    
    return totalGas >= 0 ? start : -1;
}
```

---

## Divide & Conquer

### When to Use
- Problem can be broken into smaller subproblems
- Merge sort, quick sort
- Find median
- Closest pair problems

### Template

```javascript
function divideAndConquer(arr, left, right) {
    // Base case
    if (left >= right) {
        return baseValue;
    }
    
    // Divide
    const mid = Math.floor((left + right) / 2);
    
    // Conquer
    const leftResult = divideAndConquer(arr, left, mid);
    const rightResult = divideAndConquer(arr, mid + 1, right);
    
    // Combine
    return combine(leftResult, rightResult);
}
```

### Classic Problems

#### Merge Sort
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
```

#### Quick Select (Kth Largest)
```javascript
function findKthLargest(nums, k) {
    function quickSelect(left, right, kSmallest) {
        if (left === right) return nums[left];
        
        const pivotIdx = partition(left, right);
        
        if (kSmallest === pivotIdx) {
            return nums[pivotIdx];
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

---

## Monotonic Stack/Queue

### When to Use
- Next greater/smaller element
- Stock span problems
- Histogram problems
- Sliding window maximum/minimum

### Template

```javascript
// Monotonic Stack (Next Greater Element)
function nextGreaterElement(arr) {
    const result = Array(arr.length).fill(-1);
    const stack = [];
    
    for (let i = 0; i < arr.length; i++) {
        while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[i]) {
            const index = stack.pop();
            result[index] = arr[i];
        }
        stack.push(i);
    }
    
    return result;
}

// Monotonic Deque (Sliding Window Maximum)
function slidingWindowMaximum(arr, k) {
    const result = [];
    const deque = [];
    
    for (let i = 0; i < arr.length; i++) {
        // Remove elements outside window
        while (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }
        
        // Remove smaller elements
        while (deque.length > 0 && arr[deque[deque.length - 1]] < arr[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        if (i >= k - 1) {
            result.push(arr[deque[0]]);
        }
    }
    
    return result;
}
```

### Classic Problems

#### Daily Temperatures
```javascript
function dailyTemperatures(temperatures) {
    const result = Array(temperatures.length).fill(0);
    const stack = [];
    
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length > 0 && 
               temperatures[stack[stack.length - 1]] < temperatures[i]) {
            const idx = stack.pop();
            result[idx] = i - idx;
        }
        stack.push(i);
    }
    
    return result;
}
```

#### Largest Rectangle in Histogram
```javascript
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];
        
        while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}
```

---

## Prefix Sum Pattern

### When to Use
- Range sum queries
- Subarray sum problems
- Count subarrays with specific property

### Template

```javascript
function prefixSum(arr) {
    const prefix = Array(arr.length + 1).fill(0);
    
    for (let i = 0; i < arr.length; i++) {
        prefix[i + 1] = prefix[i] + arr[i];
    }
    
    // Range sum from i to j
    function rangeSum(i, j) {
        return prefix[j + 1] - prefix[i];
    }
    
    return prefix;
}

// With hash map for target sum
function subarraySum(nums, k) {
    const prefixMap = new Map([[0, 1]]);
    let sum = 0;
    let count = 0;
    
    for (let num of nums) {
        sum += num;
        
        if (prefixMap.has(sum - k)) {
            count += prefixMap.get(sum - k);
        }
        
        prefixMap.set(sum, (prefixMap.get(sum) || 0) + 1);
    }
    
    return count;
}
```

### Classic Problems

#### Subarray Sum Equals K
```javascript
function subarraySum(nums, k) {
    const map = new Map([[0, 1]]);
    let sum = 0;
    let count = 0;
    
    for (let num of nums) {
        sum += num;
        count += map.get(sum - k) || 0;
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    
    return count;
}
```

#### Contiguous Array (0s and 1s equal)
```javascript
function findMaxLength(nums) {
    const map = new Map([[0, -1]]);
    let sum = 0;
    let maxLen = 0;
    
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i] === 1 ? 1 : -1;
        
        if (map.has(sum)) {
            maxLen = Math.max(maxLen, i - map.get(sum));
        } else {
            map.set(sum, i);
        }
    }
    
    return maxLen;
}
```

---

## Union Find Pattern

### When to Use
- Connected components
- Detect cycles in undirected graph
- Minimum spanning tree
- Dynamic connectivity

### Template

```javascript
class UnionFind {
    constructor(n) {
        this.parent = Array(n).fill(0).map((_, i) => i);
        this.rank = Array(n).fill(0);
        this.count = n;
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) return false;
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        
        this.count--;
        return true;
    }
    
    isConnected(x, y) {
        return this.find(x) === this.find(y);
    }
    
    getCount() {
        return this.count;
    }
}
```

### Classic Problems

#### Number of Connected Components
```javascript
function countComponents(n, edges) {
    const uf = new UnionFind(n);
    
    for (let [u, v] of edges) {
        uf.union(u, v);
    }
    
    return uf.getCount();
}
```

---

## Topological Sort Pattern

### When to Use
- Task scheduling with dependencies
- Course prerequisites
- Build order problems
- Detect cycles in directed graph

### Template

```javascript
// Kahn's Algorithm (BFS)
function topologicalSort(n, edges) {
    const graph = Array(n).fill(null).map(() => []);
    const inDegree = Array(n).fill(0);
    
    for (let [u, v] of edges) {
        graph[u].push(v);
        inDegree[v]++;
    }
    
    const queue = [];
    for (let i = 0; i < n; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        for (let neighbor of graph[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return result.length === n ? result : []; // Cycle detected
}
```

---

## Monotonic Stack/Queue

### Classic Problems

#### Trapping Rain Water
```javascript
function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}
```

---

## Additional Patterns

### Pattern: In-place Array Manipulation

```javascript
// Cyclic Sort
function cyclicSort(nums) {
    let i = 0;
    
    while (i < nums.length) {
        const correctIdx = nums[i] - 1;
        
        if (nums[i] !== nums[correctIdx]) {
            [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
        } else {
            i++;
        }
    }
    
    return nums;
}
```

### Pattern: Modified Binary Search

```javascript
function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return nums[left];
}
```

### Pattern: Tree DFS/BFS

```javascript
// DFS Template
function treeDFS(root) {
    if (!root) return null;
    
    // Process current node
    const result = processNode(root);
    
    // Recursively process children
    const left = treeDFS(root.left);
    const right = treeDFS(root.right);
    
    // Combine results
    return combineResults(result, left, right);
}

// BFS Template
function treeBFS(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            result.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
}
```

---

## 50 Pattern-Based Problems

### Two Pointers (Problems 1-8)

#### Problem 1: Three Sum
```javascript
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}
```

#### Problem 2: Remove Duplicates from Sorted Array
```javascript
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    
    let slow = 0;
    
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    
    return slow + 1;
}
```

#### Problem 3: Trapping Rain Water
```javascript
function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }
    
    return water;
}
```

#### Problem 4: Valid Palindrome
```javascript
function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        while (left < right && !isAlphanumeric(s[left])) left++;
        while (left < right && !isAlphanumeric(s[right])) right--;
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

function isAlphanumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
}
```

#### Problem 5: Partition Labels
```javascript
function partitionLabels(s) {
    const lastIndex = new Map();
    
    for (let i = 0; i < s.length; i++) {
        lastIndex.set(s[i], i);
    }
    
    const result = [];
    let start = 0, end = 0;
    
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, lastIndex.get(s[i]));
        
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1;
        }
    }
    
    return result;
}
```

#### Problem 6: Reverse String
```javascript
function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}
```

#### Problem 7: Move Zeroes
```javascript
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

#### Problem 8: Sort Array By Parity
```javascript
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

### Sliding Window (Problems 9-16)

#### Problem 9: Maximum Sum Subarray of Size K
```javascript
function maxSumSubarray(arr, k) {
    let windowSum = 0;
    let maxSum = -Infinity;
    
    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];
        
        if (i >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[i - k + 1];
        }
    }
    
    return maxSum;
}
```

#### Problem 10: Smallest Subarray with Sum >= K
```javascript
function minSubArrayLen(target, nums) {
    let left = 0;
    let sum = 0;
    let minLen = Infinity;
    
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }
    
    return minLen === Infinity ? 0 : minLen;
}
```

#### Problem 11: Longest Substring with K Distinct Characters
```javascript
function lengthOfLongestSubstringKDistinct(s, k) {
    const map = new Map();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        map.set(s[right], (map.get(s[right]) || 0) + 1);
        
        while (map.size > k) {
            map.set(s[left], map.get(s[left]) - 1);
            if (map.get(s[left]) === 0) {
                map.delete(s[left]);
            }
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

#### Problem 12: Find All Anagrams
```javascript
function findAnagrams(s, p) {
    const need = new Map();
    const window = new Map();
    
    for (let char of p) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let left = 0, right = 0;
    let valid = 0;
    const result = [];
    
    while (right < s.length) {
        const c = s[right];
        right++;
        
        if (need.has(c)) {
            window.set(c, (window.get(c) || 0) + 1);
            if (window.get(c) === need.get(c)) {
                valid++;
            }
        }
        
        while (right - left >= p.length) {
            if (valid === need.size) {
                result.push(left);
            }
            
            const d = s[left];
            left++;
            
            if (need.has(d)) {
                if (window.get(d) === need.get(d)) {
                    valid--;
                }
                window.set(d, window.get(d) - 1);
            }
        }
    }
    
    return result;
}
```

#### Problem 13: Max Consecutive Ones III
```javascript
function longestOnes(nums, k) {
    let left = 0;
    let zeros = 0;
    let maxLen = 0;
    
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeros++;
        
        while (zeros > k) {
            if (nums[left] === 0) zeros--;
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

#### Problem 14: Longest Repeating Character Replacement
```javascript
function characterReplacement(s, k) {
    const count = new Map();
    let left = 0;
    let maxCount = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        count.set(s[right], (count.get(s[right]) || 0) + 1);
        maxCount = Math.max(maxCount, count.get(s[right]));
        
        while (right - left + 1 - maxCount > k) {
            count.set(s[left], count.get(s[left]) - 1);
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

#### Problem 15: Permutation in String
```javascript
function checkInclusion(s1, s2) {
    const need = new Map();
    const window = new Map();
    
    for (let char of s1) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let left = 0, right = 0;
    let valid = 0;
    
    while (right < s2.length) {
        const c = s2[right];
        right++;
        
        if (need.has(c)) {
            window.set(c, (window.get(c) || 0) + 1);
            if (window.get(c) === need.get(c)) {
                valid++;
            }
        }
        
        while (right - left >= s1.length) {
            if (valid === need.size) return true;
            
            const d = s2[left];
            left++;
            
            if (need.has(d)) {
                if (window.get(d) === need.get(d)) {
                    valid--;
                }
                window.set(d, window.get(d) - 1);
            }
        }
    }
    
    return false;
}
```

#### Problem 16: Fruit Into Baskets
```javascript
function totalFruit(fruits) {
    const basket = new Map();
    let left = 0;
    let maxFruits = 0;
    
    for (let right = 0; right < fruits.length; right++) {
        basket.set(fruits[right], (basket.get(fruits[right]) || 0) + 1);
        
        while (basket.size > 2) {
            basket.set(fruits[left], basket.get(fruits[left]) - 1);
            if (basket.get(fruits[left]) === 0) {
                basket.delete(fruits[left]);
            }
            left++;
        }
        
        maxFruits = Math.max(maxFruits, right - left + 1);
    }
    
    return maxFruits;
}
```

### Binary Search (Problems 17-24)

#### Problem 17: First Bad Version
```javascript
function firstBadVersion(n) {
    let left = 1;
    let right = n;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (isBadVersion(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}
```

#### Problem 18: Find Minimum in Rotated Sorted Array
```javascript
function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return nums[left];
}
```

#### Problem 19: Capacity To Ship Packages
```javascript
function shipWithinDays(weights, days) {
    let left = Math.max(...weights);
    let right = weights.reduce((a, b) => a + b, 0);
    
    function canShip(capacity) {
        let daysNeeded = 1;
        let currentLoad = 0;
        
        for (let weight of weights) {
            if (currentLoad + weight > capacity) {
                daysNeeded++;
                currentLoad = weight;
            } else {
                currentLoad += weight;
            }
        }
        
        return daysNeeded <= days;
    }
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (canShip(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}
```

#### Problem 20: Koko Eating Bananas
```javascript
function minEatingSpeed(piles, h) {
    let left = 1;
    let right = Math.max(...piles);
    
    function canFinish(speed) {
        let hours = 0;
        for (let pile of piles) {
            hours += Math.ceil(pile / speed);
        }
        return hours <= h;
    }
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (canFinish(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}
```

#### Problem 21: Split Array Largest Sum
```javascript
function splitArray(nums, k) {
    let left = Math.max(...nums);
    let right = nums.reduce((a, b) => a + b, 0);
    
    function canSplit(maxSum) {
        let subarrays = 1;
        let currentSum = 0;
        
        for (let num of nums) {
            if (currentSum + num > maxSum) {
                subarrays++;
                currentSum = num;
            } else {
                currentSum += num;
            }
        }
        
        return subarrays <= k;
    }
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (canSplit(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}
```

#### Problem 22: Find K Closest Elements
```javascript
function findClosestElements(arr, k, x) {
    let left = 0;
    let right = arr.length - k;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (x - arr[mid] > arr[mid + k] - x) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return arr.slice(left, left + k);
}
```

#### Problem 23: Search in 2D Matrix
```javascript
function searchMatrix(matrix, target) {
    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0;
    let right = m * n - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const row = Math.floor(mid / n);
        const col = mid % n;
        const value = matrix[row][col];
        
        if (value === target) {
            return true;
        } else if (value < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return false;
}
```

#### Problem 24: Median of Two Sorted Arrays
```javascript
function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const partition1 = Math.floor((left + right) / 2);
        const partition2 = Math.floor((m + n + 1) / 2) - partition1;
        
        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        const minRight1 = partition1 === m ? Infinity : nums1[partition1];
        
        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        const minRight2 = partition2 === n ? Infinity : nums2[partition2];
        
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeft1, maxLeft2) + 
                       Math.min(minRight1, minRight2)) / 2;
            } else {
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            right = partition1 - 1;
        } else {
            left = partition1 + 1;
        }
    }
}
```

### Dynamic Programming (Problems 25-32)

#### Problem 25: Climbing Stairs
```javascript
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1;
    let prev1 = 2;
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}
```

#### Problem 26: Coin Change
```javascript
function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}
```

#### Problem 27: Word Break
```javascript
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[s.length];
}
```

#### Problem 28: Longest Palindromic Substring
```javascript
function longestPalindrome(s) {
    const n = s.length;
    const dp = Array(n).fill(null).map(() => Array(n).fill(false));
    let start = 0;
    let maxLen = 1;
    
    // All single characters are palindromes
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }
    
    // Check for length 2
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLen = 2;
        }
    }
    
    // Check for lengths > 2
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            
            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                start = i;
                maxLen = len;
            }
        }
    }
    
    return s.substring(start, start + maxLen);
}
```

#### Problem 29: Edit Distance
```javascript
function minDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j],      // Delete
                    dp[i][j - 1],      // Insert
                    dp[i - 1][j - 1]   // Replace
                ) + 1;
            }
        }
    }
    
    return dp[m][n];
}
```

#### Problem 30: Maximum Product Subarray
```javascript
function maxProduct(nums) {
    let maxSoFar = nums[0];
    let minSoFar = nums[0];
    let result = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const temp = maxSoFar;
        maxSoFar = Math.max(nums[i], maxSoFar * nums[i], minSoFar * nums[i]);
        minSoFar = Math.min(nums[i], temp * nums[i], minSoFar * nums[i]);
        result = Math.max(result, maxSoFar);
    }
    
    return result;
}
```

#### Problem 31: Decode Ways
```javascript
function numDecodings(s) {
    if (s[0] === '0') return 0;
    
    const n = s.length;
    let prev2 = 1;
    let prev1 = 1;
    
    for (let i = 1; i < n; i++) {
        let current = 0;
        
        if (s[i] !== '0') {
            current += prev1;
        }
        
        const twoDigit = parseInt(s.substring(i - 1, i + 1));
        if (twoDigit >= 10 && twoDigit <= 26) {
            current += prev2;
        }
        
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}
```

#### Problem 32: Partition Equal Subset Sum
```javascript
function canPartition(nums) {
    const sum = nums.reduce((a, b) => a + b, 0);
    
    if (sum % 2 !== 0) return false;
    
    const target = sum / 2;
    const dp = Array(target + 1).fill(false);
    dp[0] = true;
    
    for (let num of nums) {
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    
    return dp[target];
}
```

### Backtracking (Problems 33-40)

#### Problem 33: Subsets
```javascript
function subsets(nums) {
    const result = [];
    
    function backtrack(start, path) {
        result.push([...path]);
        
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}
```

#### Problem 34: Combination Sum
```javascript
function combinationSum(candidates, target) {
    const result = [];
    
    function backtrack(start, path, sum) {
        if (sum === target) {
            result.push([...path]);
            return;
        }
        
        if (sum > target) return;
        
        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            backtrack(i, path, sum + candidates[i]);
            path.pop();
        }
    }
    
    backtrack(0, [], 0);
    return result;
}
```

#### Problem 35: Generate Parentheses
```javascript
function generateParenthesis(n) {
    const result = [];
    
    function backtrack(path, open, close) {
        if (path.length === 2 * n) {
            result.push(path);
            return;
        }
        
        if (open < n) {
            backtrack(path + '(', open + 1, close);
        }
        
        if (close < open) {
            backtrack(path + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
}
```

#### Problem 36: Letter Combinations of Phone Number
```javascript
function letterCombinations(digits) {
    if (digits.length === 0) return [];
    
    const phone = {
        '2': 'abc', '3': 'def', '4': 'ghi',
        '5': 'jkl', '6': 'mno', '7': 'pqrs',
        '8': 'tuv', '9': 'wxyz'
    };
    
    const result = [];
    
    function backtrack(index, path) {
        if (index === digits.length) {
            result.push(path);
            return;
        }
        
        const letters = phone[digits[index]];
        for (let letter of letters) {
            backtrack(index + 1, path + letter);
        }
    }
    
    backtrack(0, '');
    return result;
}
```

#### Problem 37: Palindrome Partitioning
```javascript
function partition(s) {
    const result = [];
    
    function isPalindrome(str, left, right) {
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }
    
    function backtrack(start, path) {
        if (start === s.length) {
            result.push([...path]);
            return;
        }
        
        for (let end = start; end < s.length; end++) {
            if (isPalindrome(s, start, end)) {
                path.push(s.substring(start, end + 1));
                backtrack(end + 1, path);
                path.pop();
            }
        }
    }
    
    backtrack(0, []);
    return result;
}
```

#### Problem 38: Restore IP Addresses
```javascript
function restoreIpAddresses(s) {
    const result = [];
    
    function isValid(segment) {
        if (segment.length > 3) return false;
        if (segment[0] === '0' && segment.length > 1) return false;
        const num = parseInt(segment);
        return num >= 0 && num <= 255;
    }
    
    function backtrack(start, path) {
        if (path.length === 4) {
            if (start === s.length) {
                result.push(path.join('.'));
            }
            return;
        }
        
        for (let len = 1; len <= 3 && start + len <= s.length; len++) {
            const segment = s.substring(start, start + len);
            
            if (isValid(segment)) {
                path.push(segment);
                backtrack(start + len, path);
                path.pop();
            }
        }
    }
    
    backtrack(0, []);
    return result;
}
```

#### Problem 39: Sudoku Solver
```javascript
function solveSudoku(board) {
    function isValid(row, col, num) {
        // Check row
        for (let j = 0; j < 9; j++) {
            if (board[row][j] === num) return false;
        }
        
        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) return false;
        }
        
        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] === num) return false;
            }
        }
        
        return true;
    }
    
    function backtrack() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    for (let num = 1; num <= 9; num++) {
                        const char = num.toString();
                        
                        if (isValid(i, j, char)) {
                            board[i][j] = char;
                            
                            if (backtrack()) return true;
                            
                            board[i][j] = '.';
                        }
                    }
                    
                    return false;
                }
            }
        }
        
        return true;
    }
    
    backtrack();
}
```

#### Problem 40: Word Search
```javascript
function exist(board, word) {
    const rows = board.length;
    const cols = board[0].length;
    
    function backtrack(r, c, index) {
        if (index === word.length) return true;
        
        if (r < 0 || r >= rows || c < 0 || c >= cols || 
            board[r][c] !== word[index]) {
            return false;
        }
        
        const temp = board[r][c];
        board[r][c] = '#';
        
        const found = backtrack(r + 1, c, index + 1) ||
                     backtrack(r - 1, c, index + 1) ||
                     backtrack(r, c + 1, index + 1) ||
                     backtrack(r, c - 1, index + 1);
        
        board[r][c] = temp;
        
        return found;
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }
    
    return false;
}
```

### Monotonic Stack (Problems 41-44)

#### Problem 41: Next Greater Element I
```javascript
function nextGreaterElement(nums1, nums2) {
    const map = new Map();
    const stack = [];
    
    for (let num of nums2) {
        while (stack.length > 0 && stack[stack.length - 1] < num) {
            map.set(stack.pop(), num);
        }
        stack.push(num);
    }
    
    return nums1.map(num => map.get(num) || -1);
}
```

#### Problem 42: Remove K Digits
```javascript
function removeKdigits(num, k) {
    const stack = [];
    
    for (let digit of num) {
        while (stack.length > 0 && k > 0 && stack[stack.length - 1] > digit) {
            stack.pop();
            k--;
        }
        stack.push(digit);
    }
    
    // Remove remaining k digits
    while (k > 0) {
        stack.pop();
        k--;
    }
    
    // Remove leading zeros
    while (stack.length > 0 && stack[0] === '0') {
        stack.shift();
    }
    
    return stack.length === 0 ? '0' : stack.join('');
}
```

#### Problem 43: Maximal Rectangle
```javascript
function maximalRectangle(matrix) {
    if (matrix.length === 0) return 0;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    const heights = Array(cols).fill(0);
    let maxArea = 0;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
        }
        
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }
    
    return maxArea;
}

function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];
        
        while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}
```

#### Problem 44: Online Stock Span
```javascript
class StockSpanner {
    constructor() {
        this.stack = [];
    }
    
    next(price) {
        let span = 1;
        
        while (this.stack.length > 0 && 
               this.stack[this.stack.length - 1][0] <= price) {
            span += this.stack.pop()[1];
        }
        
        this.stack.push([price, span]);
        return span;
    }
}
```

### Prefix Sum (Problems 45-48)

#### Problem 45: Product of Array Except Self
```javascript
function productExceptSelf(nums) {
    const n = nums.length;
    const result = Array(n);
    
    // Left products
    result[0] = 1;
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Right products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
}
```

#### Problem 46: Range Sum Query
```javascript
class NumArray {
    constructor(nums) {
        this.prefix = [0];
        
        for (let num of nums) {
            this.prefix.push(this.prefix[this.prefix.length - 1] + num);
        }
    }
    
    sumRange(left, right) {
        return this.prefix[right + 1] - this.prefix[left];
    }
}
```

#### Problem 47: Continuous Subarray Sum
```javascript
function checkSubarraySum(nums, k) {
    const map = new Map([[0, -1]]);
    let sum = 0;
    
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        const remainder = sum % k;
        
        if (map.has(remainder)) {
            if (i - map.get(remainder) >= 2) {
                return true;
            }
        } else {
            map.set(remainder, i);
        }
    }
    
    return false;
}
```

#### Problem 48: Maximum Size Subarray Sum Equals k
```javascript
function maxSubArrayLen(nums, k) {
    const map = new Map([[0, -1]]);
    let sum = 0;
    let maxLen = 0;
    
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        
        if (map.has(sum - k)) {
            maxLen = Math.max(maxLen, i - map.get(sum - k));
        }
        
        if (!map.has(sum)) {
            map.set(sum, i);
        }
    }
    
    return maxLen;
}
```

### Advanced Patterns (Problems 49-50)

#### Problem 49: Trie Pattern - Implement Trie
```javascript
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEnd = false;
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
        
        node.isEnd = true;
    }
    
    search(word) {
        let node = this.root;
        
        for (let char of word) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char);
        }
        
        return node.isEnd;
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
```

#### Problem 50: Multi-Pattern - LRU Cache
```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    
    get(key) {
        if (!this.cache.has(key)) return -1;
        
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        
        return value;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        
        this.cache.set(key, value);
        
        if (this.cache.size > this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
}
```

---

## Pattern Recognition Guide

### How to Identify the Right Pattern

#### Step 1: Understand the Problem Type

| Problem Type | Likely Patterns |
|--------------|----------------|
| Find pairs/triplets with sum | Two Pointers |
| Subarray/substring max/min | Sliding Window |
| Detect cycle in linked list | Fast & Slow Pointers |
| Search in sorted array | Binary Search |
| Generate all combinations | Backtracking |
| Optimize count/cost | Greedy, DP |
| Connected components | Union Find, DFS/BFS |
| Task dependencies | Topological Sort |
| Next greater/smaller | Monotonic Stack |
| Range queries | Prefix Sum, Segment Tree |

#### Step 2: Look for Keywords

- **"Longest", "Shortest"**: Sliding Window, DP
- **"All possible"**: Backtracking
- **"Minimum/Maximum"**: Greedy, DP, Binary Search
- **"Sorted array"**: Two Pointers, Binary Search
- **"Subarray/Substring"**: Sliding Window, Prefix Sum
- **"Path", "Connected"**: DFS/BFS, Union Find
- **"Dependencies", "Order"**: Topological Sort
- **"Next greater/smaller"**: Monotonic Stack

#### Step 3: Consider Constraints

- **Small input (n ≤ 20)**: Backtracking, Bit Masking
- **Medium input (n ≤ 1000)**: O(n²) algorithms okay
- **Large input (n ≤ 10⁵)**: Need O(n log n) or O(n)
- **Very large input**: Need O(1) or O(log n)

---

## Time Complexity by Pattern

| Pattern | Typical Complexity | Space |
|---------|-------------------|-------|
| Two Pointers | O(n) | O(1) |
| Sliding Window | O(n) | O(k) |
| Binary Search | O(log n) | O(1) |
| DFS/BFS | O(V + E) | O(V) |
| Dynamic Programming | O(n²) to O(n) | O(n) to O(n²) |
| Backtracking | O(2ⁿ) to O(n!) | O(n) |
| Greedy | O(n log n) | O(1) |
| Union Find | O(α(n)) ≈ O(1) | O(n) |
| Monotonic Stack | O(n) | O(n) |
| Prefix Sum | O(n) | O(n) |

---

## Problem-Solving Strategy

### 1. Understand the Problem
- Read carefully
- Identify input/output
- Note constraints
- Create test cases

### 2. Pattern Recognition
- Identify problem type
- Look for keywords
- Consider constraints
- Match with known patterns

### 3. Plan the Solution
- Choose appropriate pattern
- Outline algorithm steps
- Consider edge cases
- Estimate time/space complexity

### 4. Implement
- Write clean code
- Use meaningful variable names
- Add comments for complex logic
- Test with examples

### 5. Optimize
- Can we reduce time complexity?
- Can we reduce space complexity?
- Are there unnecessary operations?

---

## Common Problem Categories

### Array Problems
- **Patterns**: Two Pointers, Sliding Window, Prefix Sum, Binary Search
- **Examples**: Two Sum, Subarray Sum, Maximum Subarray

### String Problems
- **Patterns**: Sliding Window, Two Pointers, DP, Backtracking
- **Examples**: Longest Substring, Palindrome, Anagrams

### Linked List Problems
- **Patterns**: Fast & Slow Pointers, Two Pointers, Recursion
- **Examples**: Reverse List, Detect Cycle, Merge Lists

### Tree Problems
- **Patterns**: DFS, BFS, Recursion, DP on Trees
- **Examples**: Traversals, LCA, Path Sum, Diameter

### Graph Problems
- **Patterns**: DFS, BFS, Union Find, Topological Sort, Dijkstra
- **Examples**: Number of Islands, Course Schedule, Shortest Path

### Dynamic Programming
- **Patterns**: Linear DP, Grid DP, Knapsack, LCS, LIS
- **Examples**: Coin Change, Edit Distance, Unique Paths

---

## Tips for Each Pattern

### Two Pointers
- Sort array if not sorted
- Watch for edge cases (empty, single element)
- Consider same vs opposite direction

### Sliding Window
- Identify window condition
- Decide fixed vs variable size
- Use hash map for character tracking

### Binary Search
- Define search space clearly
- Choose correct boundary updates
- Handle edge cases (not found)

### Dynamic Programming
- Identify subproblems
- Define state clearly
- Write recurrence relation
- Consider space optimization

### Backtracking
- Define choices clearly
- Implement pruning for efficiency
- Remember to undo choices

### Greedy
- Prove greedy choice property
- Sort by appropriate criteria
- Verify local optimal leads to global

---

## Practice Resources

- **LeetCode**: Explore cards organized by patterns
- **Blind 75**: Curated list of important problems
- **NeetCode**: Pattern-based problem categorization
- **AlgoExpert**: Problems organized by category
- **InterviewBit**: Topic-wise practice

---

## Conclusion

Mastering these patterns is key to solving any DSA problem. The strategy is:

1. **Recognize the pattern** from problem description
2. **Apply the template** for that pattern
3. **Modify for specific requirements**
4. **Optimize if needed**

With practice, pattern recognition becomes second nature. Focus on understanding WHY each pattern works, not just memorizing the code.

**Remember**: 
- Most problems use 1-3 patterns combined
- Start with brute force, then optimize
- Practice makes perfect!

---

**Happy Coding! 🎯**

