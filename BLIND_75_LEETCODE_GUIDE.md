# 🎯 Blind 75 LeetCode Problems - Complete Guide

> **The most popular curated list of 75 LeetCode problems** for technical interview preparation, created by a Facebook engineer.

## 📋 Table of Contents

1. [Array](#1-array-9-problems)
2. [Binary](#2-binary-5-problems)
3. [Dynamic Programming](#3-dynamic-programming-11-problems)
4. [Graph](#4-graph-7-problems)
5. [Interval](#5-interval-6-problems)
6. [Linked List](#6-linked-list-6-problems)
7. [Matrix](#7-matrix-4-problems)
8. [String](#8-string-9-problems)
9. [Tree](#9-tree-11-problems)
10. [Heap](#10-heap-3-problems)

**Total: 75 Problems** | **Difficulty**: 29 Easy, 38 Medium, 8 Hard

---

# 1. Array (9 Problems)

## 1.1 Two Sum

**LeetCode**: #1 | **Difficulty**: Easy

**Description**: Given array of integers `nums` and integer `target`, return indices of two numbers that add up to `target`.

**Intuition**: Use hash map to store complements. As we iterate, check if current number's complement exists.

**Brute Force**:
```javascript
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  return [];
}
```
**Time**: O(n²) | **Space**: O(1)

**Optimal Solution**:
```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```
**Time**: O(n) | **Space**: O(n)

---

## 1.2 Best Time to Buy and Sell Stock

**LeetCode**: #121 | **Difficulty**: Easy

**Description**: Given array `prices` where `prices[i]` is stock price on day `i`, find maximum profit.

**Intuition**: Track minimum price seen so far, calculate profit at each step.

**Brute Force**:
```javascript
function maxProfit(prices) {
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      maxProfit = Math.max(maxProfit, prices[j] - prices[i]);
    }
  }
  return maxProfit;
}
```
**Time**: O(n²) | **Space**: O(1)

**Optimal Solution**:
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
```
**Time**: O(n) | **Space**: O(1)

---

## 1.3 Contains Duplicate

**LeetCode**: #217 | **Difficulty**: Easy

**Description**: Return `true` if any value appears at least twice in array.

**Intuition**: Use Set to track seen elements.

**Brute Force**:
```javascript
function containsDuplicate(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
}
```
**Time**: O(n²) | **Space**: O(1)

**Optimal Solution**:
```javascript
function containsDuplicate(nums) {
  const set = new Set(nums);
  return set.size !== nums.length;
}
```
**Time**: O(n) | **Space**: O(n)

---

## 1.4 Product of Array Except Self

**LeetCode**: #238 | **Difficulty**: Medium

**Description**: Return array where `answer[i]` = product of all elements except `nums[i]`. No division allowed.

**Intuition**: Use left and right products. For each position, multiply products from left and right sides.

**Brute Force**:
```javascript
function productExceptSelf(nums) {
  const answer = [];
  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) product *= nums[j];
    }
    answer.push(product);
  }
  return answer;
}
```
**Time**: O(n²) | **Space**: O(1)

**Optimal Solution**:
```javascript
function productExceptSelf(nums) {
  const n = nums.length;
  const answer = Array(n).fill(1);
  
  // Left products
  let left = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = left;
    left *= nums[i];
  }
  
  // Right products
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= right;
    right *= nums[i];
  }
  
  return answer;
}
```
**Time**: O(n) | **Space**: O(1) excluding output

---

## 1.5 Maximum Subarray (Kadane's Algorithm)

**LeetCode**: #53 | **Difficulty**: Easy

**Description**: Find contiguous subarray with largest sum.

**Intuition**: Keep running sum, reset if it goes negative.

**Brute Force**:
```javascript
function maxSubArray(nums) {
  let maxSum = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let currentSum = 0;
    for (let j = i; j < nums.length; j++) {
      currentSum += nums[j];
      maxSum = Math.max(maxSum, currentSum);
    }
  }
  return maxSum;
}
```
**Time**: O(n²) | **Space**: O(1)

**Optimal Solution**:
```javascript
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}
```
**Time**: O(n) | **Space**: O(1)

---

## 1.6 Maximum Product Subarray

**LeetCode**: #152 | **Difficulty**: Medium

**Description**: Find contiguous subarray with largest product.

**Intuition**: Track both max and min products (negative × negative = positive).

**Brute Force**:
```javascript
function maxProduct(nums) {
  let result = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = i; j < nums.length; j++) {
      product *= nums[j];
      result = Math.max(result, product);
    }
  }
  return result;
}
```
**Time**: O(n²) | **Space**: O(1)

**Optimal Solution**:
```javascript
function maxProduct(nums) {
  let maxProd = nums[0];
  let minProd = nums[0];
  let result = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    const temp = maxProd;
    maxProd = Math.max(nums[i], maxProd * nums[i], minProd * nums[i]);
    minProd = Math.min(nums[i], temp * nums[i], minProd * nums[i]);
    result = Math.max(result, maxProd);
  }
  
  return result;
}
```
**Time**: O(n) | **Space**: O(1)

---

## 1.7 Find Minimum in Rotated Sorted Array

**LeetCode**: #153 | **Difficulty**: Medium

**Description**: Find minimum element in rotated sorted array with unique elements.

**Intuition**: Use binary search. If mid > right, minimum is in right half.

**Brute Force**:
```javascript
function findMin(nums) {
  return Math.min(...nums);
}
```
**Time**: O(n) | **Space**: O(1)

**Optimal Solution**:
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
**Time**: O(log n) | **Space**: O(1)

---

## 1.8 Search in Rotated Sorted Array

**LeetCode**: #33 | **Difficulty**: Medium

**Description**: Search for target in rotated sorted array.

**Intuition**: Binary search. Determine which half is sorted, then check if target is in that range.

**Brute Force**:
```javascript
function search(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) return i;
  }
  return -1;
}
```
**Time**: O(n) | **Space**: O(1)

**Optimal Solution**:
```javascript
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) return mid;
    
    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Right half is sorted
    else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  return -1;
}
```
**Time**: O(log n) | **Space**: O(1)

---

## 1.9 3Sum

**LeetCode**: #15 | **Difficulty**: Medium

**Description**: Find all unique triplets that sum to zero.

**Intuition**: Sort array, fix one element, use two pointers for remaining two.

**Brute Force**:
```javascript
function threeSum(nums) {
  const result = [];
  const set = new Set();
  
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          const key = triplet.join(',');
          if (!set.has(key)) {
            set.add(key);
            result.push(triplet);
          }
        }
      }
    }
  }
  
  return result;
}
```
**Time**: O(n³) | **Space**: O(n)

**Optimal Solution**:
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
**Time**: O(n²) | **Space**: O(1)

---

# 2. Binary (5 Problems)

## 2.1 Sum of Two Integers

**LeetCode**: #371 | **Difficulty**: Medium

**Description**: Calculate sum of two integers without using `+` or `-` operators.

**Intuition**: Use XOR for sum without carry, AND + left shift for carry.

**Optimal Solution**:
```javascript
function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}
```
**Time**: O(1) | **Space**: O(1)

---

## 2.2 Number of 1 Bits

**LeetCode**: #191 | **Difficulty**: Easy

**Description**: Return number of '1' bits (Hamming weight).

**Intuition**: Use `n & (n-1)` to remove rightmost 1 bit.

**Brute Force**:
```javascript
function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    count += n & 1;
    n >>>= 1;
  }
  return count;
}
```
**Time**: O(32) = O(1) | **Space**: O(1)

**Optimal Solution**:
```javascript
function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n &= n - 1;  // Remove rightmost 1
    count++;
  }
  return count;
}
```
**Time**: O(1) | **Space**: O(1)

---

## 2.3 Counting Bits

**LeetCode**: #338 | **Difficulty**: Easy

**Description**: Return array `ans` where `ans[i]` is number of 1's in binary representation of `i`.

**Intuition**: `dp[i] = dp[i >> 1] + (i & 1)` - shift right and add last bit.

**Brute Force**:
```javascript
function countBits(n) {
  const result = [];
  for (let i = 0; i <= n; i++) {
    let count = 0;
    let num = i;
    while (num) {
      count += num & 1;
      num >>= 1;
    }
    result.push(count);
  }
  return result;
}
```
**Time**: O(n log n) | **Space**: O(1)

**Optimal Solution**:
```javascript
function countBits(n) {
  const dp = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i >> 1] + (i & 1);
  }
  return dp;
}
```
**Time**: O(n) | **Space**: O(1)

---

## 2.4 Missing Number

**LeetCode**: #268 | **Difficulty**: Easy

**Description**: Given array containing `n` distinct numbers from `[0, n]`, find missing number.

**Intuition**: XOR all indices and values. XOR of duplicate cancels out.

**Brute Force**:
```javascript
function missingNumber(nums) {
  for (let i = 0; i <= nums.length; i++) {
    if (!nums.includes(i)) return i;
  }
  return -1;
}
```
**Time**: O(n²) | **Space**: O(1)

**Optimal Solution (XOR)**:
```javascript
function missingNumber(nums) {
  let missing = nums.length;
  for (let i = 0; i < nums.length; i++) {
    missing ^= i ^ nums[i];
  }
  return missing;
}
```
**Time**: O(n) | **Space**: O(1)

**Alternative (Math)**:
```javascript
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
```
**Time**: O(n) | **Space**: O(1)

---

## 2.5 Reverse Bits

**LeetCode**: #190 | **Difficulty**: Easy

**Description**: Reverse bits of a 32-bit unsigned integer.

**Intuition**: Extract each bit from right, add to result from left.

**Optimal Solution**:
```javascript
function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>= 1;
  }
  return result >>> 0;
}
```
**Time**: O(1) | **Space**: O(1)

---

# 3. Dynamic Programming (11 Problems)

## 3.1 Climbing Stairs

**LeetCode**: #70 | **Difficulty**: Easy

**Description**: Count ways to climb `n` stairs (1 or 2 steps at a time).

**Intuition**: Fibonacci pattern. `dp[i] = dp[i-1] + dp[i-2]`.

**Brute Force (Recursion)**:
```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  return climbStairs(n - 1) + climbStairs(n - 2);
}
```
**Time**: O(2^n) | **Space**: O(n)

**Optimal Solution**:
```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  
  let prev2 = 1, prev1 = 2;
  
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  
  return prev1;
}
```
**Time**: O(n) | **Space**: O(1)

---

## 3.2 Coin Change

**LeetCode**: #322 | **Difficulty**: Medium

**Description**: Minimum coins needed to make amount.

**Intuition**: DP. For each amount, try all coins: `dp[i] = min(dp[i], dp[i - coin] + 1)`.

**Brute Force (Recursion)**:
```javascript
function coinChange(coins, amount) {
  function helper(remaining) {
    if (remaining === 0) return 0;
    if (remaining < 0) return Infinity;
    
    let min = Infinity;
    for (let coin of coins) {
      min = Math.min(min, helper(remaining - coin) + 1);
    }
    return min;
  }
  
  const result = helper(amount);
  return result === Infinity ? -1 : result;
}
```
**Time**: O(amount^coins) | **Space**: O(amount)

**Optimal Solution**:
```javascript
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}
```
**Time**: O(amount × coins) | **Space**: O(amount)

---

## 3.3 Longest Increasing Subsequence

**LeetCode**: #300 | **Difficulty**: Medium

**Description**: Length of longest strictly increasing subsequence.

**Intuition**: DP or Binary Search. For each element, find longest LIS ending at it.

**Brute Force (DP)**:
```javascript
function lengthOfLIS(nums) {
  const dp = Array(nums.length).fill(1);
  let maxLen = 1;
  
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }
  
  return maxLen;
}
```
**Time**: O(n²) | **Space**: O(n)

**Optimal Solution (Binary Search)**:
```javascript
function lengthOfLIS(nums) {
  const sub = [];
  
  for (let num of nums) {
    let left = 0, right = sub.length;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (sub[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    if (left === sub.length) {
      sub.push(num);
    } else {
      sub[left] = num;
    }
  }
  
  return sub.length;
}
```
**Time**: O(n log n) | **Space**: O(n)

---

## 3.4 Longest Common Subsequence

**LeetCode**: #1143 | **Difficulty**: Medium

**Description**: Length of longest common subsequence between two strings.

**Intuition**: 2D DP. If chars match: `dp[i][j] = dp[i-1][j-1] + 1`, else: `max(dp[i-1][j], dp[i][j-1])`.

**Optimal Solution**:
```javascript
function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  
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
**Time**: O(m × n) | **Space**: O(m × n)

---

## 3.5 Word Break

**LeetCode**: #139 | **Difficulty**: Medium

**Description**: Check if string can be segmented into words from dictionary.

**Intuition**: DP. `dp[i]` = true if substring `[0, i]` can be segmented.

**Brute Force (Recursion)**:
```javascript
function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  
  function canBreak(start) {
    if (start === s.length) return true;
    
    for (let end = start + 1; end <= s.length; end++) {
      if (set.has(s.slice(start, end)) && canBreak(end)) {
        return true;
      }
    }
    
    return false;
  }
  
  return canBreak(0);
}
```
**Time**: O(2^n) | **Space**: O(n)

**Optimal Solution**:
```javascript
function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  
  return dp[s.length];
}
```
**Time**: O(n² × m) | **Space**: O(n)

---

## 3.6 Combination Sum IV

**LeetCode**: #377 | **Difficulty**: Medium

**Description**: Number of combinations that sum to target (order matters).

**Intuition**: DP. For each target, try all numbers: `dp[i] += dp[i - num]`.

**Optimal Solution**:
```javascript
function combinationSum4(nums, target) {
  const dp = Array(target + 1).fill(0);
  dp[0] = 1;
  
  for (let i = 1; i <= target; i++) {
    for (let num of nums) {
      if (i >= num) {
        dp[i] += dp[i - num];
      }
    }
  }
  
  return dp[target];
}
```
**Time**: O(target × n) | **Space**: O(target)

---

## 3.7 House Robber

**LeetCode**: #198 | **Difficulty**: Medium

**Description**: Rob houses without alerting adjacent houses.

**Intuition**: DP. `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.

**Brute Force (Recursion)**:
```javascript
function rob(nums) {
  function helper(i) {
    if (i >= nums.length) return 0;
    return Math.max(helper(i + 1), nums[i] + helper(i + 2));
  }
  return helper(0);
}
```
**Time**: O(2^n) | **Space**: O(n)

**Optimal Solution**:
```javascript
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  let prev2 = 0, prev1 = 0;
  
  for (let num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }
  
  return prev1;
}
```
**Time**: O(n) | **Space**: O(1)

---

## 3.8 House Robber II

**LeetCode**: #213 | **Difficulty**: Medium

**Description**: Houses arranged in circle. Rob maximum without alerting adjacent.

**Intuition**: Run House Robber I twice: exclude first house, then exclude last house.

**Optimal Solution**:
```javascript
function rob(nums) {
  if (nums.length === 1) return nums[0];
  
  function robLinear(houses) {
    let prev2 = 0, prev1 = 0;
    for (let num of houses) {
      const curr = Math.max(prev1, prev2 + num);
      prev2 = prev1;
      prev1 = curr;
    }
    return prev1;
  }
  
  return Math.max(
    robLinear(nums.slice(0, -1)),
    robLinear(nums.slice(1))
  );
}
```
**Time**: O(n) | **Space**: O(1)

---

## 3.9 Decode Ways

**LeetCode**: #91 | **Difficulty**: Medium

**Description**: Count ways to decode string of digits ('A'=1, 'B'=2, ..., 'Z'=26).

**Intuition**: DP. Single digit or two digits if valid.

**Optimal Solution**:
```javascript
function numDecodings(s) {
  if (s[0] === '0') return 0;
  
  const n = s.length;
  let prev2 = 1, prev1 = 1;
  
  for (let i = 1; i < n; i++) {
    let curr = 0;
    
    // Single digit
    if (s[i] !== '0') {
      curr += prev1;
    }
    
    // Two digits
    const twoDigit = parseInt(s.slice(i - 1, i + 1));
    if (twoDigit >= 10 && twoDigit <= 26) {
      curr += prev2;
    }
    
    prev2 = prev1;
    prev1 = curr;
  }
  
  return prev1;
}
```
**Time**: O(n) | **Space**: O(1)

---

## 3.10 Unique Paths

**LeetCode**: #62 | **Difficulty**: Medium

**Description**: Count paths from top-left to bottom-right in m×n grid (only right/down moves).

**Intuition**: DP. `dp[i][j] = dp[i-1][j] + dp[i][j-1]`.

**Brute Force (Recursion)**:
```javascript
function uniquePaths(m, n) {
  function helper(i, j) {
    if (i === m - 1 && j === n - 1) return 1;
    if (i >= m || j >= n) return 0;
    return helper(i + 1, j) + helper(i, j + 1);
  }
  return helper(0, 0);
}
```
**Time**: O(2^(m+n)) | **Space**: O(m+n)

**Optimal Solution**:
```javascript
function uniquePaths(m, n) {
  const dp = Array(n).fill(1);
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  
  return dp[n - 1];
}
```
**Time**: O(m × n) | **Space**: O(n)

---

## 3.11 Jump Game

**LeetCode**: #55 | **Difficulty**: Medium

**Description**: Check if you can reach last index from first (each element = max jump length).

**Intuition**: Track furthest reachable position.

**Brute Force (Recursion)**:
```javascript
function canJump(nums) {
  function helper(pos) {
    if (pos >= nums.length - 1) return true;
    
    const maxJump = nums[pos];
    for (let i = 1; i <= maxJump; i++) {
      if (helper(pos + i)) return true;
    }
    
    return false;
  }
  return helper(0);
}
```
**Time**: O(2^n) | **Space**: O(n)

**Optimal Solution**:
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
**Time**: O(n) | **Space**: O(1)

---

# 4. Graph (7 Problems)

## 4.1 Clone Graph

**LeetCode**: #133 | **Difficulty**: Medium

**Description**: Deep copy of undirected graph.

**Intuition**: Use DFS/BFS with hash map to track cloned nodes.

**Optimal Solution (DFS)**:
```javascript
function cloneGraph(node) {
  if (!node) return null;
  
  const map = new Map();
  
  function dfs(node) {
    if (map.has(node)) return map.get(node);
    
    const clone = new Node(node.val);
    map.set(node, clone);
    
    for (let neighbor of node.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }
    
    return clone;
  }
  
  return dfs(node);
}
```
**Time**: O(V + E) | **Space**: O(V)

---

## 4.2 Course Schedule

**LeetCode**: #207 | **Difficulty**: Medium

**Description**: Check if all courses can be finished given prerequisites.

**Intuition**: Detect cycle in directed graph using DFS or Kahn's algorithm.

**Optimal Solution (DFS)**:
```javascript
function canFinish(numCourses, prerequisites) {
  const graph = Array(numCourses).fill(0).map(() => []);
  
  for (let [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }
  
  const visited = new Set();
  const recStack = new Set();
  
  function hasCycle(node) {
    visited.add(node);
    recStack.add(node);
    
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        if (hasCycle(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }
    
    recStack.delete(node);
    return false;
  }
  
  for (let i = 0; i < numCourses; i++) {
    if (!visited.has(i)) {
      if (hasCycle(i)) return false;
    }
  }
  
  return true;
}
```
**Time**: O(V + E) | **Space**: O(V)

---

## 4.3 Pacific Atlantic Water Flow

**LeetCode**: #417 | **Difficulty**: Medium

**Description**: Find cells where water can flow to both Pacific and Atlantic oceans.

**Intuition**: DFS from ocean borders, find intersection.

**Optimal Solution**:
```javascript
function pacificAtlantic(heights) {
  const m = heights.length, n = heights[0].length;
  const pacific = Array(m).fill(0).map(() => Array(n).fill(false));
  const atlantic = Array(m).fill(0).map(() => Array(n).fill(false));
  
  function dfs(i, j, ocean, prevHeight) {
    if (i < 0 || i >= m || j < 0 || j >= n || ocean[i][j] ||
        heights[i][j] < prevHeight) {
      return;
    }
    
    ocean[i][j] = true;
    
    dfs(i + 1, j, ocean, heights[i][j]);
    dfs(i - 1, j, ocean, heights[i][j]);
    dfs(i, j + 1, ocean, heights[i][j]);
    dfs(i, j - 1, ocean, heights[i][j]);
  }
  
  // DFS from Pacific and Atlantic borders
  for (let i = 0; i < m; i++) {
    dfs(i, 0, pacific, heights[i][0]);
    dfs(i, n - 1, atlantic, heights[i][n - 1]);
  }
  
  for (let j = 0; j < n; j++) {
    dfs(0, j, pacific, heights[0][j]);
    dfs(m - 1, j, atlantic, heights[m - 1][j]);
  }
  
  const result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        result.push([i, j]);
      }
    }
  }
  
  return result;
}
```
**Time**: O(m × n) | **Space**: O(m × n)

---

## 4.4 Number of Islands

**LeetCode**: #200 | **Difficulty**: Medium

**Description**: Count number of islands ('1') in 2D grid.

**Intuition**: DFS/BFS to mark visited cells.

**Optimal Solution (DFS)**:
```javascript
function numIslands(grid) {
  if (!grid.length) return 0;
  
  const m = grid.length, n = grid[0].length;
  let count = 0;
  
  function dfs(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') {
      return;
    }
    
    grid[i][j] = '0';
    
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  
  return count;
}
```
**Time**: O(m × n) | **Space**: O(m × n)

---

## 4.5 Longest Consecutive Sequence

**LeetCode**: #128 | **Difficulty**: Medium

**Description**: Find length of longest consecutive elements sequence.

**Intuition**: Use Set. For each number, check if it's start of sequence (num-1 not in set).

**Brute Force**:
```javascript
function longestConsecutive(nums) {
  if (nums.length === 0) return 0;
  
  nums.sort((a, b) => a - b);
  let longest = 1, current = 1;
  
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) continue;
    
    if (nums[i] === nums[i - 1] + 1) {
      current++;
    } else {
      longest = Math.max(longest, current);
      current = 1;
    }
  }
  
  return Math.max(longest, current);
}
```
**Time**: O(n log n) | **Space**: O(1)

**Optimal Solution**:
```javascript
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let longest = 0;
  
  for (let num of numSet) {
    // Check if it's the start of a sequence
    if (!numSet.has(num - 1)) {
      let current = num;
      let streak = 1;
      
      while (numSet.has(current + 1)) {
        current++;
        streak++;
      }
      
      longest = Math.max(longest, streak);
    }
  }
  
  return longest;
}
```
**Time**: O(n) | **Space**: O(n)

---

## 4.6 Alien Dictionary

**LeetCode**: #269 | **Difficulty**: Hard

**Description**: Derive order of characters in alien language from sorted words.

**Intuition**: Build graph from word comparisons, topological sort.

**Optimal Solution**:
```javascript
function alienOrder(words) {
  const graph = new Map();
  const inDegree = new Map();
  
  // Initialize
  for (let word of words) {
    for (let char of word) {
      graph.set(char, []);
      inDegree.set(char, 0);
    }
  }
  
  // Build graph
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i], w2 = words[i + 1];
    const minLen = Math.min(w1.length, w2.length);
    
    if (w1.length > w2.length && w1.startsWith(w2)) {
      return "";
    }
    
    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) {
        graph.get(w1[j]).push(w2[j]);
        inDegree.set(w2[j], inDegree.get(w2[j]) + 1);
        break;
      }
    }
  }
  
  // Topological sort (Kahn's)
  const queue = [];
  for (let [char, degree] of inDegree) {
    if (degree === 0) queue.push(char);
  }
  
  let result = "";
  
  while (queue.length > 0) {
    const char = queue.shift();
    result += char;
    
    for (let neighbor of graph.get(char)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  return result.length === inDegree.size ? result : "";
}
```
**Time**: O(C) where C = total chars | **Space**: O(1) - max 26 chars

---

## 4.7 Graph Valid Tree

**LeetCode**: #261 | **Difficulty**: Medium

**Description**: Check if edges form a valid tree.

**Intuition**: Tree has n-1 edges, no cycles, connected.

**Optimal Solution (Union Find)**:
```javascript
function validTree(n, edges) {
  if (edges.length !== n - 1) return false;
  
  const parent = Array(n).fill(0).map((_, i) => i);
  
  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }
  
  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);
    
    if (rootX === rootY) return false;
    
    parent[rootX] = rootY;
    return true;
  }
  
  for (let [u, v] of edges) {
    if (!union(u, v)) return false;
  }
  
  return true;
}
```
**Time**: O(E × α(V)) ≈ O(E) | **Space**: O(V)

---

# 5. Interval (6 Problems)

## 5.1 Insert Interval

**LeetCode**: #57 | **Difficulty**: Medium

**Description**: Insert new interval and merge if necessary.

**Intuition**: Add non-overlapping intervals before, merge overlapping, add rest.

**Optimal Solution**:
```javascript
function insert(intervals, newInterval) {
  const result = [];
  let i = 0;
  
  // Add intervals before newInterval
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i++]);
  }
  
  // Merge overlapping intervals
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);
  
  // Add remaining intervals
  while (i < intervals.length) {
    result.push(intervals[i++]);
  }
  
  return result;
}
```
**Time**: O(n) | **Space**: O(1)

---

## 5.2 Merge Intervals

**LeetCode**: #56 | **Difficulty**: Medium

**Description**: Merge all overlapping intervals.

**Intuition**: Sort by start, merge if current start ≤ previous end.

**Optimal Solution**:
```javascript
function merge(intervals) {
  if (intervals.length <= 1) return intervals;
  
  intervals.sort((a, b) => a[0] - b[0]);
  
  const result = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      result.push(intervals[i]);
    }
  }
  
  return result;
}
```
**Time**: O(n log n) | **Space**: O(1)

---

## 5.3 Non-overlapping Intervals

**LeetCode**: #435 | **Difficulty**: Medium

**Description**: Minimum intervals to remove to make rest non-overlapping.

**Intuition**: Sort by end time, greedily keep intervals that end earliest.

**Optimal Solution**:
```javascript
function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;
  
  intervals.sort((a, b) => a[1] - b[1]);
  
  let count = 0;
  let end = intervals[0][1];
  
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < end) {
      count++;
    } else {
      end = intervals[i][1];
    }
  }
  
  return count;
}
```
**Time**: O(n log n) | **Space**: O(1)

---

## 5.4 Meeting Rooms

**LeetCode**: #252 | **Difficulty**: Easy

**Description**: Check if person can attend all meetings.

**Intuition**: Sort by start, check if any overlap.

**Optimal Solution**:
```javascript
function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }
  
  return true;
}
```
**Time**: O(n log n) | **Space**: O(1)

---

## 5.5 Meeting Rooms II

**LeetCode**: #253 | **Difficulty**: Medium

**Description**: Minimum meeting rooms required.

**Intuition**: Track overlapping meetings using start/end times or heap.

**Optimal Solution (Sorting)**:
```javascript
function minMeetingRooms(intervals) {
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
  
  let rooms = 0;
  let endPtr = 0;
  
  for (let i = 0; i < starts.length; i++) {
    if (starts[i] < ends[endPtr]) {
      rooms++;
    } else {
      endPtr++;
    }
  }
  
  return rooms;
}
```
**Time**: O(n log n) | **Space**: O(n)

---

## 5.6 Interval List Intersections

**LeetCode**: #986 | **Difficulty**: Medium

**Description**: Find intersections of two interval lists.

**Intuition**: Two pointers. Intersection exists if `max(start) <= min(end)`.

**Optimal Solution**:
```javascript
function intervalIntersection(firstList, secondList) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < firstList.length && j < secondList.length) {
    const start = Math.max(firstList[i][0], secondList[j][0]);
    const end = Math.min(firstList[i][1], secondList[j][1]);
    
    if (start <= end) {
      result.push([start, end]);
    }
    
    if (firstList[i][1] < secondList[j][1]) {
      i++;
    } else {
      j++;
    }
  }
  
  return result;
}
```
**Time**: O(m + n) | **Space**: O(1)

---

# 6. Linked List (6 Problems)

## 6.1 Reverse Linked List

**LeetCode**: #206 | **Difficulty**: Easy

**Description**: Reverse a singly linked list.

**Intuition**: Iteratively reverse pointers.

**Optimal Solution (Iterative)**:
```javascript
function reverseList(head) {
  let prev = null;
  let curr = head;
  
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  
  return prev;
}
```
**Time**: O(n) | **Space**: O(1)

**Recursive Solution**:
```javascript
function reverseList(head) {
  if (!head || !head.next) return head;
  
  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  
  return newHead;
}
```
**Time**: O(n) | **Space**: O(n)

---

## 6.2 Detect Cycle in Linked List

**LeetCode**: #141 | **Difficulty**: Easy

**Description**: Check if linked list has a cycle.

**Intuition**: Floyd's algorithm - fast and slow pointers.

**Brute Force (Hash Set)**:
```javascript
function hasCycle(head) {
  const visited = new Set();
  
  while (head) {
    if (visited.has(head)) return true;
    visited.add(head);
    head = head.next;
  }
  
  return false;
}
```
**Time**: O(n) | **Space**: O(n)

**Optimal Solution**:
```javascript
function hasCycle(head) {
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
**Time**: O(n) | **Space**: O(1)

---

## 6.3 Merge Two Sorted Lists

**LeetCode**: #21 | **Difficulty**: Easy

**Description**: Merge two sorted linked lists.

**Intuition**: Use dummy node, compare values.

**Optimal Solution**:
```javascript
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy;
  
  while (l1 && l2) {
    if (l1.val < l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }
  
  curr.next = l1 || l2;
  
  return dummy.next;
}
```
**Time**: O(m + n) | **Space**: O(1)

---

## 6.4 Merge K Sorted Lists

**LeetCode**: #23 | **Difficulty**: Hard

**Description**: Merge k sorted linked lists.

**Intuition**: Divide and conquer - merge pairs.

**Brute Force**:
```javascript
function mergeKLists(lists) {
  if (lists.length === 0) return null;
  
  let result = lists[0];
  for (let i = 1; i < lists.length; i++) {
    result = mergeTwoLists(result, lists[i]);
  }
  
  return result;
}
```
**Time**: O(kN) | **Space**: O(1)

**Optimal Solution (Divide & Conquer)**:
```javascript
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
**Time**: O(N log k) | **Space**: O(1)

---

## 6.5 Remove Nth Node From End

**LeetCode**: #19 | **Difficulty**: Medium

**Description**: Remove nth node from end in one pass.

**Intuition**: Two pointers with n gap.

**Optimal Solution**:
```javascript
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  
  let fast = dummy;
  let slow = dummy;
  
  // Move fast n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }
  
  // Move both until fast reaches end
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  
  slow.next = slow.next.next;
  
  return dummy.next;
}
```
**Time**: O(n) | **Space**: O(1)

---

## 6.6 Reorder List

**LeetCode**: #143 | **Difficulty**: Medium

**Description**: Reorder list: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...

**Intuition**: Find middle, reverse second half, merge.

**Optimal Solution**:
```javascript
function reorderList(head) {
  if (!head || !head.next) return;
  
  // Find middle
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Reverse second half
  let second = slow.next;
  slow.next = null;
  
  let prev = null;
  while (second) {
    const next = second.next;
    second.next = prev;
    prev = second;
    second = next;
  }
  second = prev;
  
  // Merge two halves
  let first = head;
  while (second) {
    const tmp1 = first.next;
    const tmp2 = second.next;
    
    first.next = second;
    second.next = tmp1;
    
    first = tmp1;
    second = tmp2;
  }
}
```
**Time**: O(n) | **Space**: O(1)

---

# 7. Matrix (4 Problems)

## 7.1 Set Matrix Zeroes

**LeetCode**: #73 | **Difficulty**: Medium

**Description**: If element is 0, set its entire row and column to 0.

**Intuition**: Use first row/column as markers.

**Brute Force**:
```javascript
function setZeroes(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const rows = new Set();
  const cols = new Set();
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        rows.add(i);
        cols.add(j);
      }
    }
  }
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rows.has(i) || cols.has(j)) {
        matrix[i][j] = 0;
      }
    }
  }
}
```
**Time**: O(m × n) | **Space**: O(m + n)

**Optimal Solution**:
```javascript
function setZeroes(matrix) {
  const m = matrix.length, n = matrix[0].length;
  let firstRowZero = false;
  
  // Check if first row has zero
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) firstRowZero = true;
  }
  
  // Use first row and column as markers
  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[0][j] = 0;
        matrix[i][0] = 0;
      }
    }
  }
  
  // Set zeros based on markers
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[0][j] === 0 || matrix[i][0] === 0) {
        matrix[i][j] = 0;
      }
    }
  }
  
  // Set first column
  if (matrix[0][0] === 0) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }
  
  // Set first row
  if (firstRowZero) {
    for (let j = 0; j < n; j++) {
      matrix[0][j] = 0;
    }
  }
}
```
**Time**: O(m × n) | **Space**: O(1)

---

## 7.2 Spiral Matrix

**LeetCode**: #54 | **Difficulty**: Medium

**Description**: Return elements of matrix in spiral order.

**Intuition**: Traverse boundaries, shrink inward.

**Optimal Solution**:
```javascript
function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  
  while (top <= bottom && left <= right) {
    // Right
    for (let j = left; j <= right; j++) {
      result.push(matrix[top][j]);
    }
    top++;
    
    // Down
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;
    
    // Left
    if (top <= bottom) {
      for (let j = right; j >= left; j--) {
        result.push(matrix[bottom][j]);
      }
      bottom--;
    }
    
    // Up
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }
  
  return result;
}
```
**Time**: O(m × n) | **Space**: O(1)

---

## 7.3 Rotate Image

**LeetCode**: #48 | **Difficulty**: Medium

**Description**: Rotate n×n matrix 90° clockwise in-place.

**Intuition**: Transpose + reverse each row.

**Optimal Solution**:
```javascript
function rotate(matrix) {
  const n = matrix.length;
  
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  
  // Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}
```
**Time**: O(n²) | **Space**: O(1)

---

## 7.4 Word Search

**LeetCode**: #79 | **Difficulty**: Medium

**Description**: Check if word exists in board.

**Intuition**: DFS with backtracking.

**Optimal Solution**:
```javascript
function exist(board, word) {
  const m = board.length, n = board[0].length;
  
  function dfs(i, j, k) {
    if (k === word.length) return true;
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) {
      return false;
    }
    
    const temp = board[i][j];
    board[i][j] = '#';
    
    const found = dfs(i + 1, j, k + 1) ||
                  dfs(i - 1, j, k + 1) ||
                  dfs(i, j + 1, k + 1) ||
                  dfs(i, j - 1, k + 1);
    
    board[i][j] = temp;
    
    return found;
  }
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  
  return false;
}
```
**Time**: O(m × n × 4^L) | **Space**: O(L)

---

# 8. String (9 Problems)

## 8.1 Longest Substring Without Repeating Characters

**LeetCode**: #3 | **Difficulty**: Medium

**Description**: Find length of longest substring without repeating characters.

**Intuition**: Sliding window with hash map.

**Brute Force**:
```javascript
function lengthOfLongestSubstring(s) {
  let maxLen = 0;
  
  for (let i = 0; i < s.length; i++) {
    const seen = new Set();
    for (let j = i; j < s.length; j++) {
      if (seen.has(s[j])) break;
      seen.add(s[j]);
      maxLen = Math.max(maxLen, j - i + 1);
    }
  }
  
  return maxLen;
}
```
**Time**: O(n²) | **Space**: O(min(n, m))

**Optimal Solution**:
```javascript
function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0;
  let maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1);
    }
    
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
}
```
**Time**: O(n) | **Space**: O(min(n, m))

---

## 8.2 Longest Repeating Character Replacement

**LeetCode**: #424 | **Difficulty**: Medium

**Description**: Longest substring with same letter after k replacements.

**Intuition**: Sliding window. Window valid if `size - maxFreq <= k`.

**Optimal Solution**:
```javascript
function characterReplacement(s, k) {
  const count = Array(26).fill(0);
  let left = 0;
  let maxCount = 0;
  let maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    const idx = s[right].charCodeAt(0) - 65;
    count[idx]++;
    maxCount = Math.max(maxCount, count[idx]);
    
    while (right - left + 1 - maxCount > k) {
      count[s[left].charCodeAt(0) - 65]--;
      left++;
    }
    
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
}
```
**Time**: O(n) | **Space**: O(1)

---

## 8.3 Minimum Window Substring

**LeetCode**: #76 | **Difficulty**: Hard

**Description**: Minimum window in s containing all characters of t.

**Intuition**: Sliding window with two hash maps.

**Optimal Solution**:
```javascript
function minWindow(s, t) {
  const need = new Map();
  const window = new Map();
  
  for (let c of t) need.set(c, (need.get(c) || 0) + 1);
  
  let left = 0, right = 0;
  let valid = 0;
  let start = 0, minLen = Infinity;
  
  while (right < s.length) {
    const c = s[right++];
    
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) valid++;
    }
    
    while (valid === need.size) {
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }
      
      const d = s[left++];
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) valid--;
        window.set(d, window.get(d) - 1);
      }
    }
  }
  
  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}
```
**Time**: O(m + n) | **Space**: O(m)

---

## 8.4 Valid Anagram

**LeetCode**: #242 | **Difficulty**: Easy

**Description**: Check if two strings are anagrams.

**Intuition**: Count characters.

**Brute Force**:
```javascript
function isAnagram(s, t) {
  return s.split('').sort().join('') === t.split('').sort().join('');
}
```
**Time**: O(n log n) | **Space**: O(1)

**Optimal Solution**:
```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  
  const count = Array(26).fill(0);
  
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  
  return count.every(c => c === 0);
}
```
**Time**: O(n) | **Space**: O(1)

---

## 8.5 Group Anagrams

**LeetCode**: #49 | **Difficulty**: Medium

**Description**: Group strings that are anagrams.

**Intuition**: Use sorted string or character count as key.

**Optimal Solution**:
```javascript
function groupAnagrams(strs) {
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
**Time**: O(n × k) | **Space**: O(n × k)

---

## 8.6 Valid Parentheses

**LeetCode**: #20 | **Difficulty**: Easy

**Description**: Check if parentheses are valid.

**Intuition**: Use stack to match pairs.

**Optimal Solution**:
```javascript
function isValid(s) {
  const stack = [];
  const pairs = { '(': ')', '{': '}', '[': ']' };
  
  for (let char of s) {
    if (char in pairs) {
      stack.push(char);
    } else {
      if (pairs[stack.pop()] !== char) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}
```
**Time**: O(n) | **Space**: O(n)

---

## 8.7 Valid Palindrome

**LeetCode**: #125 | **Difficulty**: Easy

**Description**: Check if string is palindrome (alphanumeric only).

**Intuition**: Two pointers from both ends.

**Optimal Solution**:
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

function isAlphanumeric(c) {
  return /[a-zA-Z0-9]/.test(c);
}
```
**Time**: O(n) | **Space**: O(1)

---

## 8.8 Longest Palindromic Substring

**LeetCode**: #5 | **Difficulty**: Medium

**Description**: Find longest palindromic substring.

**Intuition**: Expand around center for each position.

**Brute Force**:
```javascript
function longestPalindrome(s) {
  let longest = "";
  
  function isPalindrome(str) {
    return str === str.split('').reverse().join('');
  }
  
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const substr = s.slice(i, j + 1);
      if (isPalindrome(substr) && substr.length > longest.length) {
        longest = substr;
      }
    }
  }
  
  return longest;
}
```
**Time**: O(n³) | **Space**: O(1)

**Optimal Solution**:
```javascript
function longestPalindrome(s) {
  let start = 0, maxLen = 0;
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }
  
  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(i, i);
    const len2 = expandAroundCenter(i, i + 1);
    const len = Math.max(len1, len2);
    
    if (len > maxLen) {
      maxLen = len;
      start = i - Math.floor((len - 1) / 2);
    }
  }
  
  return s.substring(start, start + maxLen);
}
```
**Time**: O(n²) | **Space**: O(1)

---

## 8.9 Palindromic Substrings

**LeetCode**: #647 | **Difficulty**: Medium

**Description**: Count palindromic substrings.

**Intuition**: Expand around center, count all.

**Optimal Solution**:
```javascript
function countSubstrings(s) {
  let count = 0;
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      count++;
      left--;
      right++;
    }
  }
  
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i);       // Odd length
    expandAroundCenter(i, i + 1);   // Even length
  }
  
  return count;
}
```
**Time**: O(n²) | **Space**: O(1)

---

# 9. Tree (11 Problems)

## 9.1 Maximum Depth of Binary Tree

**LeetCode**: #104 | **Difficulty**: Easy

**Description**: Find maximum depth of binary tree.

**Intuition**: Recursively get max of left and right depths.

**Optimal Solution**:
```javascript
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```
**Time**: O(n) | **Space**: O(h)

---

## 9.2 Same Tree

**LeetCode**: #100 | **Difficulty**: Easy

**Description**: Check if two trees are identical.

**Intuition**: Recursively compare values and subtrees.

**Optimal Solution**:
```javascript
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  
  return p.val === q.val &&
         isSameTree(p.left, q.left) &&
         isSameTree(p.right, q.right);
}
```
**Time**: O(n) | **Space**: O(h)

---

## 9.3 Invert Binary Tree

**LeetCode**: #226 | **Difficulty**: Easy

**Description**: Invert a binary tree.

**Intuition**: Recursively swap left and right children.

**Optimal Solution**:
```javascript
function invertTree(root) {
  if (!root) return null;
  
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  
  return root;
}
```
**Time**: O(n) | **Space**: O(h)

---

## 9.4 Binary Tree Maximum Path Sum

**LeetCode**: #124 | **Difficulty**: Hard

**Description**: Maximum path sum in binary tree.

**Intuition**: For each node, calculate max path through it.

**Optimal Solution**:
```javascript
function maxPathSum(root) {
  let maxSum = -Infinity;
  
  function maxGain(node) {
    if (!node) return 0;
    
    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);
    
    const pathSum = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, pathSum);
    
    return node.val + Math.max(leftGain, rightGain);
  }
  
  maxGain(root);
  return maxSum;
}
```
**Time**: O(n) | **Space**: O(h)

---

## 9.5 Binary Tree Level Order Traversal

**LeetCode**: #102 | **Difficulty**: Medium

**Description**: Return level order traversal.

**Intuition**: BFS with queue.

**Optimal Solution**:
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
**Time**: O(n) | **Space**: O(n)

---

## 9.6 Serialize and Deserialize Binary Tree

**LeetCode**: #297 | **Difficulty**: Hard

**Description**: Serialize and deserialize binary tree.

**Intuition**: Use preorder traversal with null markers.

**Optimal Solution**:
```javascript
function serialize(root) {
  if (!root) return 'null';
  return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);
}

function deserialize(data) {
  const values = data.split(',');
  let i = 0;
  
  function build() {
    if (values[i] === 'null') {
      i++;
      return null;
    }
    
    const node = new TreeNode(parseInt(values[i++]));
    node.left = build();
    node.right = build();
    
    return node;
  }
  
  return build();
}
```
**Time**: O(n) | **Space**: O(n)

---

## 9.7 Subtree of Another Tree

**LeetCode**: #572 | **Difficulty**: Easy

**Description**: Check if subRoot is subtree of root.

**Intuition**: Check if same at each node.

**Optimal Solution**:
```javascript
function isSubtree(root, subRoot) {
  if (!root) return false;
  
  if (isSameTree(root, subRoot)) return true;
  
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val &&
         isSameTree(p.left, q.left) &&
         isSameTree(p.right, q.right);
}
```
**Time**: O(m × n) | **Space**: O(h)

---

## 9.8 Construct Binary Tree from Preorder and Inorder

**LeetCode**: #105 | **Difficulty**: Medium

**Description**: Build tree from preorder and inorder arrays.

**Intuition**: First element of preorder is root, find it in inorder to split left/right.

**Optimal Solution**:
```javascript
function buildTree(preorder, inorder) {
  const map = new Map();
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }
  
  let preIdx = 0;
  
  function build(left, right) {
    if (left > right) return null;
    
    const val = preorder[preIdx++];
    const root = new TreeNode(val);
    
    const mid = map.get(val);
    
    root.left = build(left, mid - 1);
    root.right = build(mid + 1, right);
    
    return root;
  }
  
  return build(0, inorder.length - 1);
}
```
**Time**: O(n) | **Space**: O(n)

---

## 9.9 Validate Binary Search Tree

**LeetCode**: #98 | **Difficulty**: Medium

**Description**: Check if tree is valid BST.

**Intuition**: Recursively check with min/max bounds.

**Optimal Solution**:
```javascript
function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    
    if (node.val <= min || node.val >= max) return false;
    
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  }
  
  return validate(root, -Infinity, Infinity);
}
```
**Time**: O(n) | **Space**: O(h)

---

## 9.10 Kth Smallest Element in BST

**LeetCode**: #230 | **Difficulty**: Medium

**Description**: Find kth smallest element in BST.

**Intuition**: Inorder traversal gives sorted order.

**Optimal Solution**:
```javascript
function kthSmallest(root, k) {
  let count = 0;
  let result = null;
  
  function inorder(node) {
    if (!node || result !== null) return;
    
    inorder(node.left);
    
    count++;
    if (count === k) {
      result = node.val;
      return;
    }
    
    inorder(node.right);
  }
  
  inorder(root);
  return result;
}
```
**Time**: O(n) | **Space**: O(h)

---

## 9.11 Lowest Common Ancestor of BST

**LeetCode**: #235 | **Difficulty**: Easy

**Description**: Find LCA of two nodes in BST.

**Intuition**: If both < root, go left. If both > root, go right. Else, root is LCA.

**Optimal Solution**:
```javascript
function lowestCommonAncestor(root, p, q) {
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else {
      return root;
    }
  }
  return null;
}
```
**Time**: O(h) | **Space**: O(1)

---

# 10. Heap (3 Problems)

## 10.1 Merge K Sorted Lists (with Heap)

**LeetCode**: #23 | **Difficulty**: Hard

**Description**: Merge k sorted linked lists using heap.

**Intuition**: Use min-heap to track smallest elements.

**Optimal Solution**:
```javascript
function mergeKLists(lists) {
  // Using array as simple heap
  const heap = [];
  
  // Add first node from each list
  for (let list of lists) {
    if (list) heap.push(list);
  }
  
  heap.sort((a, b) => a.val - b.val);
  
  const dummy = new ListNode(0);
  let curr = dummy;
  
  while (heap.length > 0) {
    const node = heap.shift();
    curr.next = node;
    curr = curr.next;
    
    if (node.next) {
      heap.push(node.next);
      heap.sort((a, b) => a.val - b.val);
    }
  }
  
  return dummy.next;
}
```
**Time**: O(N log k) | **Space**: O(k)

---

## 10.2 Top K Frequent Elements

**LeetCode**: #347 | **Difficulty**: Medium

**Description**: Return k most frequent elements.

**Intuition**: Count frequency, use bucket sort or heap.

**Brute Force**:
```javascript
function topKFrequent(nums, k) {
  const map = new Map();
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(pair => pair[0]);
}
```
**Time**: O(n log n) | **Space**: O(n)

**Optimal Solution (Bucket Sort)**:
```javascript
function topKFrequent(nums, k) {
  const map = new Map();
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  
  const buckets = Array(nums.length + 1).fill(0).map(() => []);
  
  for (let [num, freq] of map) {
    buckets[freq].push(num);
  }
  
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }
  
  return result.slice(0, k);
}
```
**Time**: O(n) | **Space**: O(n)

---

## 10.3 Find Median from Data Stream

**LeetCode**: #295 | **Difficulty**: Hard

**Description**: Maintain median of stream of numbers.

**Intuition**: Use two heaps - max heap for smaller half, min heap for larger half.

**Optimal Solution**:
```javascript
class MedianFinder {
  constructor() {
    this.small = []; // Max heap (use negative values)
    this.large = []; // Min heap
  }
  
  addNum(num) {
    // Add to small heap
    this.small.push(-num);
    this.small.sort((a, b) => a - b);
    
    // Move largest from small to large
    if (this.small.length > 0 && this.large.length > 0 &&
        -this.small[0] > this.large[0]) {
      this.large.push(-this.small.shift());
      this.large.sort((a, b) => a - b);
    }
    
    // Balance heaps
    if (this.small.length > this.large.length + 1) {
      this.large.push(-this.small.shift());
      this.large.sort((a, b) => a - b);
    }
    
    if (this.large.length > this.small.length + 1) {
      this.small.push(-this.large.shift());
      this.small.sort((a, b) => a - b);
    }
  }
  
  findMedian() {
    if (this.small.length > this.large.length) {
      return -this.small[0];
    } else if (this.large.length > this.small.length) {
      return this.large[0];
    } else {
      return (-this.small[0] + this.large[0]) / 2;
    }
  }
}
```
**Time**: O(log n) addNum, O(1) findMedian | **Space**: O(n)

---

# 🎯 Summary & Tips

## Difficulty Breakdown

- **Easy**: 29 problems
- **Medium**: 38 problems
- **Hard**: 8 problems

## Study Strategy

1. **Week 1-2**: Array, Binary, String (18 problems)
2. **Week 3-4**: Dynamic Programming, Linked List (17 problems)
3. **Week 5-6**: Tree, Graph (18 problems)
4. **Week 7-8**: Matrix, Interval, Heap (13 problems)
5. **Week 9**: Review and practice

## Key Patterns to Master

1. **Two Pointers**: Fast & Slow, Opposite Direction
2. **Sliding Window**: Fixed & Variable Size
3. **Binary Search**: On arrays, rotated arrays
4. **DFS/BFS**: Trees and graphs
5. **Dynamic Programming**: 1D & 2D DP
6. **Backtracking**: With state restoration
7. **Heap/Priority Queue**: Top K, streaming data
8. **Union Find**: Connected components

## Interview Tips

✅ **Always clarify**: Edge cases, constraints, input format  
✅ **Start with brute force**: Show you can solve it  
✅ **Optimize**: Discuss time/space trade-offs  
✅ **Test**: Walk through examples  
✅ **Communicate**: Explain your thought process  

---

**🚀 Complete these 75 problems and you'll be ready for 90% of coding interviews!**

*Last Updated: November 2024*


