# Complete Dynamic Programming Guide

## Table of Contents
1. [What is Dynamic Programming?](#what-is-dynamic-programming)
2. [DP Fundamentals](#dp-fundamentals)
3. [DP Patterns](#dp-patterns)
4. [1D Dynamic Programming](#1d-dynamic-programming)
5. [2D Dynamic Programming](#2d-dynamic-programming)
6. [Knapsack Problems](#knapsack-problems)
7. [String DP Problems](#string-dp-problems)
8. [Tree DP Problems](#tree-dp-problems)
9. [State Machine DP](#state-machine-dp)
10. [Advanced DP Patterns](#advanced-dp-patterns)
11. [Complete Problem Set (60+ Problems)](#complete-problem-set)

---

## What is Dynamic Programming?

**Dynamic Programming** is an optimization technique that solves complex problems by breaking them down into simpler subproblems. It stores the results of subproblems to avoid redundant calculations.

### Key Characteristics:
1. **Optimal Substructure**: Optimal solution contains optimal solutions to subproblems
2. **Overlapping Subproblems**: Same subproblems are solved multiple times

### DP vs Divide & Conquer:
- **Divide & Conquer**: Independent subproblems (Merge Sort, Quick Sort)
- **Dynamic Programming**: Overlapping subproblems (Fibonacci, LCS)

### Two Approaches:

#### 1. Top-Down (Memoization)
- Recursive approach
- Store computed results in cache
- Solve subproblems as needed

#### 2. Bottom-Up (Tabulation)
- Iterative approach
- Build solution from smallest subproblem
- Fill table systematically

---

## DP Fundamentals

### Step-by-Step Approach to Solve DP Problems:

```
1. Identify if it's a DP problem
   - Ask: Can I break this into subproblems?
   - Ask: Do subproblems overlap?
   - Ask: Can I express solution in terms of smaller solutions?

2. Define the state
   - What information do I need to solve subproblem?
   - How many dimensions needed?

3. Write the recurrence relation
   - Express dp[i] in terms of previous states
   - Identify base cases

4. Determine iteration order
   - Which subproblems need to be solved first?

5. Optimize space if possible
   - Can we use O(1) or O(n) instead of O(n²)?
```

### Example: Fibonacci

```javascript
// Problem: Find nth Fibonacci number

// Naive Recursive: O(2^n)
function fibNaive(n) {
    if (n <= 1) return n;
    return fibNaive(n - 1) + fibNaive(n - 2);
}

// Top-Down Memoization: O(n) time, O(n) space
function fibMemo(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// Bottom-Up Tabulation: O(n) time, O(n) space
function fibTab(n) {
    if (n <= 1) return n;
    
    const dp = Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Space Optimized: O(n) time, O(1) space
function fibOptimized(n) {
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
```

---

## DP Patterns

### Pattern 1: Linear DP (1D)
- Single array dp[i]
- Examples: Climbing Stairs, House Robber, Maximum Subarray

### Pattern 2: Grid DP (2D)
- 2D array dp[i][j]
- Examples: Unique Paths, Minimum Path Sum

### Pattern 3: Knapsack DP
- Choose or not choose items
- Examples: 0/1 Knapsack, Coin Change, Target Sum

### Pattern 4: Longest Common Subsequence (LCS)
- Two sequences comparison
- Examples: LCS, Edit Distance, Shortest Common Supersequence

### Pattern 5: Longest Increasing Subsequence (LIS)
- Subsequence problems
- Examples: LIS, Russian Doll Envelopes

### Pattern 6: Palindrome DP
- Check/count/find palindromes
- Examples: Longest Palindromic Substring, Palindrome Partitioning

### Pattern 7: State Machine DP
- Multiple states at each position
- Examples: Stock Buy/Sell problems

### Pattern 8: Interval DP
- Merge intervals
- Examples: Burst Balloons, Matrix Chain Multiplication

---

## 1D Dynamic Programming

---

### EASY PROBLEMS

---

### Problem 1: Climbing Stairs (Easy)

**Problem**: You're climbing stairs with n steps. Each time you can climb 1 or 2 steps. How many distinct ways can you reach the top?

**Approach**: dp[i] = ways to reach step i = dp[i-1] + dp[i-2]

**Time Complexity**: O(n)  
**Space Complexity**: O(1) optimized

```javascript
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1; // dp[0]
    let prev1 = 2; // dp[1]
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// With array (easier to understand)
function climbStairsArray(n) {
    if (n <= 2) return n;
    
    const dp = Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Example
console.log(climbStairs(5)); // Output: 8
// Ways: 1+1+1+1+1, 1+1+1+2, 1+1+2+1, 1+2+1+1, 2+1+1+1, 1+2+2, 2+1+2, 2+2+1
```

---

### Problem 2: Min Cost Climbing Stairs (Easy)

**Problem**: Array cost where cost[i] is cost of ith step. You can start from step 0 or 1. Find minimum cost to reach top.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function minCostClimbingStairs(cost) {
    const n = cost.length;
    
    let prev2 = cost[0];
    let prev1 = cost[1];
    
    for (let i = 2; i < n; i++) {
        const current = cost[i] + Math.min(prev1, prev2);
        prev2 = prev1;
        prev1 = current;
    }
    
    return Math.min(prev1, prev2);
}

// Example
console.log(minCostClimbingStairs([10, 15, 20])); // Output: 15
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); 
// Output: 6
```

---

### Problem 3: N-th Tribonacci Number (Easy)

**Problem**: T(n) = T(n-1) + T(n-2) + T(n-3), T(0) = 0, T(1) = T(2) = 1

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function tribonacci(n) {
    if (n === 0) return 0;
    if (n <= 2) return 1;
    
    let t0 = 0, t1 = 1, t2 = 1;
    
    for (let i = 3; i <= n; i++) {
        const current = t0 + t1 + t2;
        t0 = t1;
        t1 = t2;
        t2 = current;
    }
    
    return t2;
}

// Example
console.log(tribonacci(4));  // Output: 4 (0,1,1,2,4)
console.log(tribonacci(25)); // Output: 1389537
```

---

### Problem 4: Delete and Earn (Easy)

**Problem**: Given array, you can delete nums[i] to earn nums[i] points, but must delete all nums[i]-1 and nums[i]+1. Find max points.

**Time Complexity**: O(n + max(nums))  
**Space Complexity**: O(max(nums))

```javascript
function deleteAndEarn(nums) {
    if (nums.length === 0) return 0;
    
    const max = Math.max(...nums);
    const points = Array(max + 1).fill(0);
    
    // Calculate total points for each number
    for (let num of nums) {
        points[num] += num;
    }
    
    // House robber problem
    let prev2 = 0;
    let prev1 = 0;
    
    for (let i = 0; i < points.length; i++) {
        const current = Math.max(prev1, prev2 + points[i]);
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Example
console.log(deleteAndEarn([3, 4, 2])); // Output: 6
console.log(deleteAndEarn([2, 2, 3, 3, 3, 4])); // Output: 9
```

---

### MEDIUM PROBLEMS

---

### Problem 5: House Robber (Medium)

**Problem**: Rob houses in a row. Can't rob two adjacent houses. Find maximum money.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

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

// Example
console.log(rob([1, 2, 3, 1]));    // Output: 4 (1+3)
console.log(rob([2, 7, 9, 3, 1])); // Output: 12 (2+9+1)
```

---

### Problem 6: House Robber II (Medium)

**Problem**: Houses arranged in circle. Can't rob first and last together.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function robCircular(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    function robLinear(start, end) {
        let prev2 = 0;
        let prev1 = 0;
        
        for (let i = start; i <= end; i++) {
            const current = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
    
    // Either rob first to second-last, or second to last
    return Math.max(
        robLinear(0, nums.length - 2),
        robLinear(1, nums.length - 1)
    );
}

// Example
console.log(robCircular([2, 3, 2]));    // Output: 3
console.log(robCircular([1, 2, 3, 1])); // Output: 4
```

---

### Problem 7: Maximum Subarray (Kadane's Algorithm) (Medium)

**Problem**: Find contiguous subarray with largest sum.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Example
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Output: 6 (4,-1,2,1)
console.log(maxSubArray([1])); // Output: 1
console.log(maxSubArray([5, 4, -1, 7, 8])); // Output: 23
```

---

### Problem 8: Maximum Product Subarray (Medium)

**Problem**: Find contiguous subarray with largest product.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function maxProduct(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    let minEndingHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < 0) {
            [maxEndingHere, minEndingHere] = [minEndingHere, maxEndingHere];
        }
        
        maxEndingHere = Math.max(nums[i], maxEndingHere * nums[i]);
        minEndingHere = Math.min(nums[i], minEndingHere * nums[i]);
        
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Example
console.log(maxProduct([2, 3, -2, 4])); // Output: 6 (2,3)
console.log(maxProduct([-2, 0, -1]));   // Output: 0
```

---

### Problem 9: Jump Game (Medium)

**Problem**: Given array where each element represents max jump length. Can you reach last index?

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function canJump(nums) {
    let maxReach = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) return true;
    }
    
    return true;
}

// Example
console.log(canJump([2, 3, 1, 1, 4])); // true
console.log(canJump([3, 2, 1, 0, 4])); // false
```

---

### Problem 10: Jump Game II (Medium)

**Problem**: Find minimum number of jumps to reach last index.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function jump(nums) {
    let jumps = 0;
    let currentEnd = 0;
    let farthest = 0;
    
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        
        if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }
    
    return jumps;
}

// Example
console.log(jump([2, 3, 1, 1, 4])); // Output: 2 (1->3->4)
console.log(jump([2, 3, 0, 1, 4])); // Output: 2
```

---

### Problem 11: Decode Ways (Medium)

**Problem**: '1'-'26' map to 'A'-'Z'. Count ways to decode a string of digits.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function numDecodings(s) {
    if (s[0] === '0') return 0;
    
    const n = s.length;
    let prev2 = 1; // dp[i-2]
    let prev1 = 1; // dp[i-1]
    
    for (let i = 1; i < n; i++) {
        let current = 0;
        
        // Single digit
        if (s[i] !== '0') {
            current += prev1;
        }
        
        // Two digits
        const twoDigit = parseInt(s.substring(i - 1, i + 1));
        if (twoDigit >= 10 && twoDigit <= 26) {
            current += prev2;
        }
        
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Example
console.log(numDecodings("12"));   // Output: 2 ("AB" or "L")
console.log(numDecodings("226"));  // Output: 3 ("BZ", "VF", "BBF")
console.log(numDecodings("06"));   // Output: 0
```

---

### Problem 12: Word Break (Medium)

**Problem**: Given string s and dictionary, determine if s can be segmented into space-separated dictionary words.

**Time Complexity**: O(n² × m) where m is average word length  
**Space Complexity**: O(n)

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

// Example
console.log(wordBreak("leetcode", ["leet", "code"])); // true
console.log(wordBreak("applepenapple", ["apple", "pen"])); // true
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); // false
```

---

### Problem 13: Longest Increasing Subsequence (Medium)

**Problem**: Find length of longest strictly increasing subsequence.

**Time Complexity**: O(n²) DP, O(n log n) Binary Search  
**Space Complexity**: O(n)

```javascript
// DP Approach: O(n²)
function lengthOfLIS(nums) {
    const n = nums.length;
    const dp = Array(n).fill(1);
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

// Binary Search Approach: O(n log n)
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

// Example
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // Output: 4 (2,3,7,18)
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3])); // Output: 4 (0,1,2,3)
```

---

### Problem 14: Longest Palindromic Subsequence (Medium)

**Problem**: Find length of longest palindromic subsequence in string.

**Time Complexity**: O(n²)  
**Space Complexity**: O(n²)

```javascript
function longestPalindromeSubseq(s) {
    const n = s.length;
    const dp = Array(n).fill(null).map(() => Array(n).fill(0));
    
    // Every single character is palindrome of length 1
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }
    
    // Check for subsequences of length 2 to n
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[0][n - 1];
}

// Example
console.log(longestPalindromeSubseq("bbbab")); // Output: 4 ("bbbb")
console.log(longestPalindromeSubseq("cbbd"));  // Output: 2 ("bb")
```

---

### Problem 15: Palindrome Partitioning II (Hard)

**Problem**: Find minimum cuts needed for palindrome partitioning.

**Time Complexity**: O(n²)  
**Space Complexity**: O(n²)

```javascript
function minCut(s) {
    const n = s.length;
    const dp = Array(n);
    const isPalindrome = Array(n).fill(null).map(() => Array(n).fill(false));
    
    // Build palindrome table
    for (let len = 1; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            
            if (len === 1) {
                isPalindrome[i][j] = true;
            } else if (len === 2) {
                isPalindrome[i][j] = s[i] === s[j];
            } else {
                isPalindrome[i][j] = s[i] === s[j] && isPalindrome[i + 1][j - 1];
            }
        }
    }
    
    // Calculate minimum cuts
    for (let i = 0; i < n; i++) {
        if (isPalindrome[0][i]) {
            dp[i] = 0;
        } else {
            dp[i] = i; // Max cuts possible
            
            for (let j = 0; j < i; j++) {
                if (isPalindrome[j + 1][i]) {
                    dp[i] = Math.min(dp[i], dp[j] + 1);
                }
            }
        }
    }
    
    return dp[n - 1];
}

// Example
console.log(minCut("aab"));  // Output: 1 ("aa|b")
console.log(minCut("aba"));  // Output: 0 ("aba")
console.log(minCut("ab"));   // Output: 1 ("a|b")
```

---

## 2D Dynamic Programming

---

### EASY PROBLEMS

---

### Problem 16: Unique Paths (Easy/Medium)

**Problem**: Robot in m×n grid. Can only move right or down. Count paths from top-left to bottom-right.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(m × n), can optimize to O(n)

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

// Space optimized O(n)
function uniquePathsOptimized(m, n) {
    const dp = Array(n).fill(1);
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }
    
    return dp[n - 1];
}

// Example
console.log(uniquePaths(3, 7)); // Output: 28
console.log(uniquePaths(3, 2)); // Output: 3
```

---

### Problem 17: Unique Paths II (Medium)

**Problem**: Same as above but with obstacles.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(m × n)

```javascript
function uniquePathsWithObstacles(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    
    if (obstacleGrid[0][0] === 1) return 0;
    
    const dp = Array(m).fill(null).map(() => Array(n).fill(0));
    dp[0][0] = 1;
    
    // First column
    for (let i = 1; i < m; i++) {
        dp[i][0] = obstacleGrid[i][0] === 0 ? dp[i - 1][0] : 0;
    }
    
    // First row
    for (let j = 1; j < n; j++) {
        dp[0][j] = obstacleGrid[0][j] === 0 ? dp[0][j - 1] : 0;
    }
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 0) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    }
    
    return dp[m - 1][n - 1];
}

// Example
console.log(uniquePathsWithObstacles([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
])); // Output: 2
```

---

### Problem 18: Minimum Path Sum (Medium)

**Problem**: Find path from top-left to bottom-right with minimum sum.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(m × n), can optimize to O(n)

```javascript
function minPathSum(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dp = Array(m).fill(null).map(() => Array(n).fill(0));
    
    dp[0][0] = grid[0][0];
    
    // First column
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    
    // First row
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    
    return dp[m - 1][n - 1];
}

// Example
console.log(minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
])); // Output: 7 (1→3→1→1→1)
```

---

### Problem 19: Triangle (Medium)

**Problem**: Find minimum path sum from top to bottom in triangle.

**Time Complexity**: O(n²)  
**Space Complexity**: O(n)

```javascript
function minimumTotal(triangle) {
    const n = triangle.length;
    const dp = [...triangle[n - 1]];
    
    for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        }
    }
    
    return dp[0];
}

// Example
console.log(minimumTotal([
    [2],
    [3, 4],
    [6, 5, 7],
    [4, 1, 8, 3]
])); // Output: 11 (2+3+5+1)
```

---

### MEDIUM PROBLEMS

---

### Problem 20: Longest Common Subsequence (Medium)

**Problem**: Find length of longest subsequence common to both strings.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(m × n), can optimize to O(min(m,n))

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

// Example
console.log(longestCommonSubsequence("abcde", "ace")); // Output: 3 ("ace")
console.log(longestCommonSubsequence("abc", "abc"));   // Output: 3
console.log(longestCommonSubsequence("abc", "def"));   // Output: 0
```

---

### Problem 21: Edit Distance (Hard)

**Problem**: Minimum operations (insert, delete, replace) to convert word1 to word2.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(m × n)

```javascript
function minDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    // Base cases
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

// Example
console.log(minDistance("horse", "ros"));    // Output: 3
console.log(minDistance("intention", "execution")); // Output: 5
```

---

### Problem 22: Distinct Subsequences (Hard)

**Problem**: Count distinct subsequences of s which equals t.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(m × n)

```javascript
function numDistinct(s, t) {
    const m = s.length;
    const n = t.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    // Empty string is subsequence of any string
    for (let i = 0; i <= m; i++) {
        dp[i][0] = 1;
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    
    return dp[m][n];
}

// Example
console.log(numDistinct("rabbbit", "rabbit")); // Output: 3
console.log(numDistinct("babgbag", "bag"));    // Output: 5
```

---

### Problem 23: Interleaving String (Hard)

**Problem**: Check if s3 is formed by interleaving of s1 and s2.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(m × n)

```javascript
function isInterleave(s1, s2, s3) {
    const m = s1.length;
    const n = s2.length;
    
    if (m + n !== s3.length) return false;
    
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(false));
    dp[0][0] = true;
    
    // First column
    for (let i = 1; i <= m; i++) {
        dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
    }
    
    // First row
    for (let j = 1; j <= n; j++) {
        dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
                       (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
        }
    }
    
    return dp[m][n];
}

// Example
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac")); // true
console.log(isInterleave("aabcc", "dbbca", "aadbbbaccc")); // false
```

---

### Problem 24: Maximal Square (Medium)

**Problem**: Find largest square containing only 1's in binary matrix.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(m × n)

```javascript
function maximalSquare(matrix) {
    if (matrix.length === 0) return 0;
    
    const m = matrix.length;
    const n = matrix[0].length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    let maxSide = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (matrix[i - 1][j - 1] === '1') {
                dp[i][j] = Math.min(
                    dp[i - 1][j],
                    dp[i][j - 1],
                    dp[i - 1][j - 1]
                ) + 1;
                maxSide = Math.max(maxSide, dp[i][j]);
            }
        }
    }
    
    return maxSide * maxSide;
}

// Example
console.log(maximalSquare([
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","0","1","0"]
])); // Output: 4
```

---

### Problem 25: Dungeon Game (Hard)

**Problem**: Find minimum initial health needed to save princess.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(m × n)

```javascript
function calculateMinimumHP(dungeon) {
    const m = dungeon.length;
    const n = dungeon[0].length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(Infinity));
    
    dp[m][n - 1] = dp[m - 1][n] = 1;
    
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const minHealth = Math.min(dp[i + 1][j], dp[i][j + 1]);
            dp[i][j] = Math.max(1, minHealth - dungeon[i][j]);
        }
    }
    
    return dp[0][0];
}

// Example
console.log(calculateMinimumHP([
    [-2, -3, 3],
    [-5, -10, 1],
    [10, 30, -5]
])); // Output: 7
```

---

## Knapsack Problems

---

### Problem 26: 0/1 Knapsack (Classic)

**Problem**: Items with weights and values. Max capacity W. Maximize value.

**Time Complexity**: O(n × W)  
**Space Complexity**: O(n × W), can optimize to O(W)

```javascript
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
    
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

// Space optimized
function knapsackOptimized(weights, values, capacity) {
    const dp = Array(capacity + 1).fill(0);
    
    for (let i = 0; i < weights.length; i++) {
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    
    return dp[capacity];
}

// Example
console.log(knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7)); // Output: 9
```

---

### Problem 27: Partition Equal Subset Sum (Medium)

**Problem**: Check if array can be partitioned into two subsets with equal sum.

**Time Complexity**: O(n × sum)  
**Space Complexity**: O(sum)

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

// Example
console.log(canPartition([1, 5, 11, 5])); // true (11 = 1+5+5)
console.log(canPartition([1, 2, 3, 5]));  // false
```

---

### Problem 28: Target Sum (Medium)

**Problem**: Assign +/- to each number to reach target sum. Count ways.

**Time Complexity**: O(n × sum)  
**Space Complexity**: O(sum)

```javascript
function findTargetSumWays(nums, target) {
    const sum = nums.reduce((a, b) => a + b, 0);
    
    if (Math.abs(target) > sum || (sum + target) % 2 !== 0) {
        return 0;
    }
    
    const newTarget = (sum + target) / 2;
    const dp = Array(newTarget + 1).fill(0);
    dp[0] = 1;
    
    for (let num of nums) {
        for (let j = newTarget; j >= num; j--) {
            dp[j] += dp[j - num];
        }
    }
    
    return dp[newTarget];
}

// Example
console.log(findTargetSumWays([1, 1, 1, 1, 1], 3)); // Output: 5
```

---

### Problem 29: Coin Change (Medium)

**Problem**: Fewest coins to make up amount. Infinite supply of coins.

**Time Complexity**: O(amount × n)  
**Space Complexity**: O(amount)

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

// Example
console.log(coinChange([1, 2, 5], 11)); // Output: 3 (5+5+1)
console.log(coinChange([2], 3));        // Output: -1
```

---

### Problem 30: Coin Change 2 (Medium)

**Problem**: Count combinations to make up amount.

**Time Complexity**: O(amount × n)  
**Space Complexity**: O(amount)

```javascript
function change(amount, coins) {
    const dp = Array(amount + 1).fill(0);
    dp[0] = 1;
    
    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    
    return dp[amount];
}

// Example
console.log(change(5, [1, 2, 5])); // Output: 4
// Ways: 5, 2+2+1, 2+1+1+1, 1+1+1+1+1
```

---

### Problem 31: Unbounded Knapsack

**Problem**: Items can be used unlimited times.

**Time Complexity**: O(n × W)  
**Space Complexity**: O(W)

```javascript
function unboundedKnapsack(weights, values, capacity) {
    const dp = Array(capacity + 1).fill(0);
    
    for (let w = 0; w <= capacity; w++) {
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
    }
    
    return dp[capacity];
}

// Example
console.log(unboundedKnapsack([1, 3, 4, 5], [10, 40, 50, 70], 8));
// Output: 110
```

---

### Problem 32: Perfect Squares (Medium)

**Problem**: Find least number of perfect square numbers that sum to n.

**Time Complexity**: O(n × √n)  
**Space Complexity**: O(n)

```javascript
function numSquares(n) {
    const dp = Array(n + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j * j <= i; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }
    
    return dp[n];
}

// Example
console.log(numSquares(12)); // Output: 3 (4+4+4)
console.log(numSquares(13)); // Output: 2 (4+9)
```

---

## Stock Buy/Sell Problems (State Machine DP)

---

### Problem 33: Best Time to Buy and Sell Stock (Easy)

**Problem**: One transaction allowed. Max profit?

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (let price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}

// Example
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // Output: 5 (buy at 1, sell at 6)
```

---

### Problem 34: Best Time to Buy and Sell Stock II (Medium)

**Problem**: Unlimited transactions. Max profit?

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function maxProfitII(prices) {
    let profit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    
    return profit;
}

// Example
console.log(maxProfitII([7, 1, 5, 3, 6, 4])); // Output: 7 (1→5, 3→6)
```

---

### Problem 35: Best Time to Buy and Sell Stock III (Hard)

**Problem**: At most 2 transactions. Max profit?

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function maxProfitIII(prices) {
    let buy1 = -Infinity, sell1 = 0;
    let buy2 = -Infinity, sell2 = 0;
    
    for (let price of prices) {
        buy1 = Math.max(buy1, -price);
        sell1 = Math.max(sell1, buy1 + price);
        buy2 = Math.max(buy2, sell1 - price);
        sell2 = Math.max(sell2, buy2 + price);
    }
    
    return sell2;
}

// Example
console.log(maxProfitIII([3, 3, 5, 0, 0, 3, 1, 4])); // Output: 6
```

---

### Problem 36: Best Time to Buy and Sell Stock IV (Hard)

**Problem**: At most k transactions. Max profit?

**Time Complexity**: O(n × k)  
**Space Complexity**: O(k)

```javascript
function maxProfitIV(k, prices) {
    if (k === 0 || prices.length === 0) return 0;
    
    if (k >= prices.length / 2) {
        // Unlimited transactions
        let profit = 0;
        for (let i = 1; i < prices.length; i++) {
            profit += Math.max(0, prices[i] - prices[i - 1]);
        }
        return profit;
    }
    
    const buy = Array(k + 1).fill(-Infinity);
    const sell = Array(k + 1).fill(0);
    
    for (let price of prices) {
        for (let j = k; j >= 1; j--) {
            sell[j] = Math.max(sell[j], buy[j] + price);
            buy[j] = Math.max(buy[j], sell[j - 1] - price);
        }
    }
    
    return sell[k];
}

// Example
console.log(maxProfitIV(2, [2, 4, 1])); // Output: 2
console.log(maxProfitIV(2, [3, 2, 6, 5, 0, 3])); // Output: 7
```

---

### Problem 37: Best Time to Buy and Sell Stock with Cooldown (Medium)

**Problem**: After selling, must cooldown for 1 day.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function maxProfitWithCooldown(prices) {
    let sold = 0;
    let held = -Infinity;
    let reset = 0;
    
    for (let price of prices) {
        const preSold = sold;
        
        sold = held + price;
        held = Math.max(held, reset - price);
        reset = Math.max(reset, preSold);
    }
    
    return Math.max(sold, reset);
}

// Example
console.log(maxProfitWithCooldown([1, 2, 3, 0, 2])); // Output: 3
```

---

### Problem 38: Best Time to Buy and Sell Stock with Transaction Fee (Medium)

**Problem**: Pay transaction fee for each transaction.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function maxProfitWithFee(prices, fee) {
    let cash = 0;
    let hold = -prices[0];
    
    for (let i = 1; i < prices.length; i++) {
        cash = Math.max(cash, hold + prices[i] - fee);
        hold = Math.max(hold, cash - prices[i]);
    }
    
    return cash;
}

// Example
console.log(maxProfitWithFee([1, 3, 2, 8, 4, 9], 2)); // Output: 8
```

---

## Advanced DP Problems

---

### Problem 39: Regular Expression Matching (Hard)

**Problem**: Implement regex matching with '.' and '*'.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(m × n)

```javascript
function isMatch(s, p) {
    const m = s.length;
    const n = p.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(false));
    
    dp[0][0] = true;
    
    // Handle patterns like a*, a*b*, etc.
    for (let j = 2; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2]; // Zero occurrences
                
                if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {
                    dp[i][j] = dp[i][j] || dp[i - 1][j]; // One or more
                }
            } else if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }
    
    return dp[m][n];
}

// Example
console.log(isMatch("aa", "a"));     // false
console.log(isMatch("aa", "a*"));    // true
console.log(isMatch("ab", ".*"));    // true
```

---

### Problem 40: Wildcard Matching (Hard)

**Problem**: Implement wildcard matching with '?' and '*'.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(m × n)

```javascript
function isMatchWildcard(s, p) {
    const m = s.length;
    const n = p.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(false));
    
    dp[0][0] = true;
    
    // Handle leading '*'
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '*') {
                dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
            } else if (p[j - 1] === '?' || p[j - 1] === s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }
    
    return dp[m][n];
}

// Example
console.log(isMatchWildcard("aa", "a"));      // false
console.log(isMatchWildcard("aa", "*"));      // true
console.log(isMatchWildcard("cb", "?a"));     // false
console.log(isMatchWildcard("adceb", "*a*b"));// true
```

---

### Problem 41: Burst Balloons (Hard)

**Problem**: Burst balloons to maximize coins. coins = nums[i-1] * nums[i] * nums[i+1]

**Time Complexity**: O(n³)  
**Space Complexity**: O(n²)

```javascript
function maxCoins(nums) {
    const n = nums.length;
    const arr = [1, ...nums, 1];
    const dp = Array(n + 2).fill(null).map(() => Array(n + 2).fill(0));
    
    for (let len = 1; len <= n; len++) {
        for (let left = 1; left <= n - len + 1; left++) {
            const right = left + len - 1;
            
            for (let i = left; i <= right; i++) {
                const coins = arr[left - 1] * arr[i] * arr[right + 1];
                dp[left][right] = Math.max(
                    dp[left][right],
                    dp[left][i - 1] + coins + dp[i + 1][right]
                );
            }
        }
    }
    
    return dp[1][n];
}

// Example
console.log(maxCoins([3, 1, 5, 8])); // Output: 167
```

---

### Problem 42: Scramble String (Hard)

**Problem**: Check if s2 is scrambled version of s1.

**Time Complexity**: O(n⁴)  
**Space Complexity**: O(n³)

```javascript
function isScramble(s1, s2) {
    if (s1 === s2) return true;
    if (s1.length !== s2.length) return false;
    
    const n = s1.length;
    const dp = Array(n).fill(null).map(() => 
        Array(n).fill(null).map(() => Array(n + 1).fill(false))
    );
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            dp[i][j][1] = s1[i] === s2[j];
        }
    }
    
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            for (let j = 0; j <= n - len; j++) {
                for (let k = 1; k < len; k++) {
                    if ((dp[i][j][k] && dp[i + k][j + k][len - k]) ||
                        (dp[i][j + len - k][k] && dp[i + k][j][len - k])) {
                        dp[i][j][len] = true;
                        break;
                    }
                }
            }
        }
    }
    
    return dp[0][0][n];
}

// Example
console.log(isScramble("great", "rgeat")); // true
console.log(isScramble("abcde", "caebd")); // false
```

---

### Problem 43: Minimum Window Subsequence (Hard)

**Problem**: Find minimum window in s1 containing s2 as subsequence.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(m × n)

```javascript
function minWindow(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(-1));
    
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    
    let start = 0;
    let minLen = Infinity;
    
    for (let i = 1; i <= m; i++) {
        if (dp[i][n] !== -1) {
            const len = i - dp[i][n];
            if (len < minLen) {
                minLen = len;
                start = dp[i][n];
            }
        }
    }
    
    return minLen === Infinity ? "" : s1.substring(start, start + minLen);
}

// Example
console.log(minWindow("abcdebdde", "bde")); // Output: "bcde"
```

---

### Problem 44: Shortest Common Supersequence (Hard)

**Problem**: Find shortest string that has s1 and s2 as subsequences.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(m × n)

```javascript
function shortestCommonSupersequence(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    // Build LCS table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Build result
    let result = '';
    let i = m, j = n;
    
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            result = str1[i - 1] + result;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            result = str1[i - 1] + result;
            i--;
        } else {
            result = str2[j - 1] + result;
            j--;
        }
    }
    
    while (i > 0) {
        result = str1[i - 1] + result;
        i--;
    }
    
    while (j > 0) {
        result = str2[j - 1] + result;
        j--;
    }
    
    return result;
}

// Example
console.log(shortestCommonSupersequence("abac", "cab")); // "cabac"
```

---

### Problem 45: Count Different Palindromic Subsequences (Hard)

**Problem**: Count distinct palindromic subsequences in string.

**Time Complexity**: O(n²)  
**Space Complexity**: O(n²)

```javascript
function countPalindromicSubsequences(s) {
    const MOD = 1e9 + 7;
    const n = s.length;
    const dp = Array(n).fill(null).map(() => Array(n).fill(0));
    
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }
    
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            
            if (s[i] === s[j]) {
                let left = i + 1;
                let right = j - 1;
                
                while (left <= right && s[left] !== s[i]) left++;
                while (left <= right && s[right] !== s[i]) right--;
                
                if (left > right) {
                    dp[i][j] = (2 * dp[i + 1][j - 1] + 2) % MOD;
                } else if (left === right) {
                    dp[i][j] = (2 * dp[i + 1][j - 1] + 1) % MOD;
                } else {
                    dp[i][j] = (2 * dp[i + 1][j - 1] - dp[left + 1][right - 1]) % MOD;
                }
            } else {
                dp[i][j] = (dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1]) % MOD;
            }
            
            dp[i][j] = (dp[i][j] + MOD) % MOD;
        }
    }
    
    return dp[0][n - 1];
}

// Example
console.log(countPalindromicSubsequences("bccb")); // Output: 6
```

---

## Complete Problem Set Summary

### Easy Problems (10)
1. Climbing Stairs - O(n) / O(1)
2. Min Cost Climbing Stairs - O(n) / O(1)
3. N-th Tribonacci - O(n) / O(1)
4. Delete and Earn - O(n) / O(n)
5. Unique Paths - O(m×n) / O(n)
6. Unique Paths II - O(m×n) / O(m×n)
7. Minimum Path Sum - O(m×n) / O(n)
8. Triangle - O(n²) / O(n)
9. Best Time to Buy Stock - O(n) / O(1)
10. Best Time to Buy Stock II - O(n) / O(1)

### Medium Problems (25)
11. House Robber - O(n) / O(1)
12. House Robber II - O(n) / O(1)
13. Maximum Subarray - O(n) / O(1)
14. Maximum Product Subarray - O(n) / O(1)
15. Jump Game - O(n) / O(1)
16. Jump Game II - O(n) / O(1)
17. Decode Ways - O(n) / O(1)
18. Word Break - O(n²) / O(n)
19. LIS - O(n log n) / O(n)
20. Longest Palindromic Subsequence - O(n²) / O(n²)
21. LCS - O(m×n) / O(m×n)
22. Maximal Square - O(m×n) / O(m×n)
23. Partition Equal Subset Sum - O(n×sum) / O(sum)
24. Target Sum - O(n×sum) / O(sum)
25. Coin Change - O(amount×n) / O(amount)
26. Coin Change 2 - O(amount×n) / O(amount)
27. Perfect Squares - O(n√n) / O(n)
28. Stock with Cooldown - O(n) / O(1)
29. Stock with Fee - O(n) / O(1)
30. Interleaving String - O(m×n) / O(m×n)
31. Distinct Subsequences - O(m×n) / O(m×n)
32. 0/1 Knapsack - O(n×W) / O(W)
33. Unbounded Knapsack - O(n×W) / O(W)
34. Dungeon Game - O(m×n) / O(m×n)
35. Triangle Path - O(n²) / O(n)

### Hard Problems (10)
36. Edit Distance - O(m×n) / O(m×n)
37. Palindrome Partitioning II - O(n²) / O(n²)
38. Stock III (2 transactions) - O(n) / O(1)
39. Stock IV (k transactions) - O(n×k) / O(k)
40. Regular Expression Matching - O(m×n) / O(m×n)
41. Wildcard Matching - O(m×n) / O(m×n)
42. Burst Balloons - O(n³) / O(n²)
43. Scramble String - O(n⁴) / O(n³)
44. Minimum Window Subsequence - O(m×n) / O(m×n)
45. Shortest Common Supersequence - O(m×n) / O(m×n)

---

## DP Problem Recognition Guide

### How to Identify DP Problems:

1. **Keywords**: "maximum", "minimum", "longest", "shortest", "count ways", "possible/impossible"

2. **Problem Characteristics**:
   - Optimization (min/max)
   - Counting (how many ways)
   - Decision making (yes/no)
   - Subsequence/substring problems

3. **Ask These Questions**:
   - Can I break into smaller subproblems?
   - Do subproblems overlap?
   - Can I express solution using smaller solutions?
   - Does order matter?

### Pattern Selection Guide:

| Problem Type | Pattern | Example |
|--------------|---------|---------|
| Path counting | Grid DP | Unique Paths |
| Sequence optimization | Linear DP | House Robber |
| String comparison | 2D DP | LCS, Edit Distance |
| Subset/combination | Knapsack | Target Sum |
| Multiple states | State Machine | Stock Problems |
| Range problems | Interval DP | Burst Balloons |

---

## Space Optimization Techniques

### 1. Rolling Array
Convert 2D to 1D when only previous row needed.

### 2. Two Variables
When only last 2 states needed (Fibonacci style).

### 3. In-place Modification
Modify input array if allowed.

### 4. State Compression
Use bit masking for state representation.

---

## Tips for Solving DP Problems

1. **Start with Recursion**: Write brute force recursive solution first
2. **Add Memoization**: Cache results to avoid recomputation
3. **Convert to Tabulation**: Build bottom-up solution
4. **Optimize Space**: Reduce memory usage if possible
5. **Test Edge Cases**: Empty input, single element, all same, etc.

---

**Master Dynamic Programming by practicing these problems systematically! Start with Easy, move to Medium, then tackle Hard problems. Understanding patterns is key! 🚀**


