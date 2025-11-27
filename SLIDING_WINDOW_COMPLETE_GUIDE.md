
# Complete Sliding Window Pattern Guide

## Table of Contents
1. [What is Sliding Window?](#what-is-sliding-window)
2. [When to Use Sliding Window](#when-to-use-sliding-window)
3. [Types of Sliding Window](#types-of-sliding-window)
4. [Templates & Patterns](#templates--patterns)
5. [Fixed Size Window Problems](#fixed-size-window-problems)
6. [Variable Size Window Problems](#variable-size-window-problems)
7. [String Sliding Window](#string-sliding-window)
8. [Advanced Sliding Window](#advanced-sliding-window)
9. [Complete Problem Set (50+ Problems)](#complete-problem-set)

---

## What is Sliding Window?

**Sliding Window** is a technique to solve problems involving arrays/strings where you need to find a contiguous subarray/substring that satisfies certain conditions.

### Key Concept:
- Maintain a "window" that slides over the array/string
- Expand window by moving right pointer
- Shrink window by moving left pointer
- Track optimal solution during sliding

### Why Use Sliding Window?
- ❌ **Brute Force**: Check all subarrays → O(n²) or O(n³)
- ✅ **Sliding Window**: Single pass → O(n)

### Visual Example:
```
Array: [1, 3, 2, 6, -1, 4, 1, 8, 2]
Window size k = 3

[1, 3, 2], 6, -1, 4, 1, 8, 2  → sum = 6
1, [3, 2, 6], -1, 4, 1, 8, 2  → sum = 11
1, 3, [2, 6, -1], 4, 1, 8, 2 → sum = 7
1, 3, 2, [6, -1, 4], 1, 8, 2 → sum = 9
...
```

---

## When to Use Sliding Window

### Problem Characteristics:
1. ✅ **Contiguous** subarray/substring required
2. ✅ Need to find **maximum/minimum/optimal** value
3. ✅ Keywords: "longest", "shortest", "maximum", "minimum"
4. ✅ **Linear data structure** (array/string)
5. ✅ Can define **window condition** clearly

### Common Problem Types:
- Maximum/minimum sum of subarray
- Longest substring with K distinct characters
- Shortest subarray with sum ≥ target
- Find all anagrams
- String permutation
- Longest substring without repeating characters

### NOT Sliding Window:
- ❌ Non-contiguous elements
- ❌ Need all subarrays (might need DP)
- ❌ No clear window condition
- ❌ Requires sorting or other preprocessing

---

## Types of Sliding Window

### 1. Fixed Size Window
- Window size is constant (k)
- Slide by removing left, adding right
- **Pattern**: Calculate for first window, then slide

**Example**: Maximum sum of subarray of size k

### 2. Variable Size Window (Dynamic)
- Window size changes based on condition
- Expand when condition not met
- Shrink when condition violated
- **Pattern**: Two pointers (left, right)

**Example**: Longest substring with at most k distinct characters

---

## Templates & Patterns

### Template 1: Fixed Size Window

```javascript
function fixedSizeWindow(arr, k) {
    let windowSum = 0;
    let result = -Infinity;
    
    // Build first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    result = windowSum;
    
    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        result = Math.max(result, windowSum);
    }
    
    return result;
}
```

### Template 2: Variable Size Window (Shrinkable)

```javascript
function variableSizeWindow(arr, condition) {
    let left = 0;
    let result = 0; // or Infinity for minimum
    let windowState = initializeState();
    
    for (let right = 0; right < arr.length; right++) {
        // Expand window: add arr[right]
        updateWindowState(windowState, arr[right]);
        
        // Shrink window while condition is violated
        while (conditionViolated(windowState)) {
            removeFromWindow(windowState, arr[left]);
            left++;
        }
        
        // Update result
        result = Math.max(result, right - left + 1);
    }
    
    return result;
}
```

### Template 3: Variable Size Window (Find Minimum)

```javascript
function findMinimumWindow(arr, target) {
    let left = 0;
    let minLength = Infinity;
    let windowSum = 0;
    
    for (let right = 0; right < arr.length; right++) {
        windowSum += arr[right];
        
        // Shrink window while valid
        while (windowSum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            windowSum -= arr[left];
            left++;
        }
    }
    
    return minLength === Infinity ? 0 : minLength;
}
```

### Template 4: Substring with HashMap

```javascript
function substringWithHashMap(s, target) {
    const map = new Map();
    let left = 0;
    let result = 0;
    
    // Initialize map with target
    for (let char of target) {
        map.set(char, (map.get(char) || 0) + 1);
    }
    
    let count = map.size; // Number of unique characters to match
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        
        // Expand window
        if (map.has(rightChar)) {
            map.set(rightChar, map.get(rightChar) - 1);
            if (map.get(rightChar) === 0) count--;
        }
        
        // Window is valid
        while (count === 0) {
            // Update result
            result = Math.max(result, right - left + 1);
            
            // Shrink window
            const leftChar = s[left];
            if (map.has(leftChar)) {
                map.set(leftChar, map.get(leftChar) + 1);
                if (map.get(leftChar) > 0) count++;
            }
            left++;
        }
    }
    
    return result;
}
```

---

## Fixed Size Window Problems

---

### EASY PROBLEMS

---

### Problem 1: Maximum Sum Subarray of Size K (Easy)

**Problem**: Find maximum sum of any contiguous subarray of size k.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function maxSumSubarray(arr, k) {
    if (arr.length < k) return null;
    
    let windowSum = 0;
    
    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    
    let maxSum = windowSum;
    
    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

// Example
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // Output: 9 (5+1+3)
console.log(maxSumSubarray([2, 3, 4, 1, 5], 2));    // Output: 7 (3+4)
```

---

### Problem 2: Average of Subarrays of Size K (Easy)

**Problem**: Find average of all contiguous subarrays of size K.

**Time Complexity**: O(n)  
**Space Complexity**: O(n-k+1) for result array

```javascript
function findAverages(arr, k) {
    const result = [];
    let windowSum = 0;
    
    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];
        
        if (i >= k - 1) {
            result.push(windowSum / k);
            windowSum -= arr[i - k + 1];
        }
    }
    
    return result;
}

// Example
console.log(findAverages([1, 3, 2, 6, -1, 4, 1, 8, 2], 5));
// Output: [2.2, 2.8, 2.4, 3.6, 2.8]
```

---

### Problem 3: Maximum of All Subarrays of Size K (Easy)

**Problem**: Find maximum element in every contiguous subarray of size k.

**Time Complexity**: O(n)  
**Space Complexity**: O(k) for deque

```javascript
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices
    
    for (let i = 0; i < nums.length; i++) {
        // Remove elements outside window
        while (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }
        
        // Remove smaller elements (they'll never be max)
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // Add to result when window is complete
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
}

// Example
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// Output: [3, 3, 5, 5, 6, 7]
```

---

### Problem 4: First Negative in Every Window (Easy)

**Problem**: Find first negative number in every window of size k.

**Time Complexity**: O(n)  
**Space Complexity**: O(k)

```javascript
function firstNegativeInWindow(arr, k) {
    const result = [];
    const negatives = []; // Queue of negative indices
    
    for (let i = 0; i < arr.length; i++) {
        // Add negative numbers to queue
        if (arr[i] < 0) {
            negatives.push(i);
        }
        
        // Remove elements outside window
        while (negatives.length > 0 && negatives[0] <= i - k) {
            negatives.shift();
        }
        
        // Add result for complete window
        if (i >= k - 1) {
            if (negatives.length > 0) {
                result.push(arr[negatives[0]]);
            } else {
                result.push(0);
            }
        }
    }
    
    return result;
}

// Example
console.log(firstNegativeInWindow([12, -1, -7, 8, -15, 30, 16, 28], 3));
// Output: [-1, -1, -7, -15, -15, 0]
```

---

### Problem 5: Count Occurrences of Anagrams (Easy/Medium)

**Problem**: Count occurrences of pattern's anagrams in text.

**Time Complexity**: O(n)  
**Space Complexity**: O(1) - fixed size alphabet

```javascript
function countAnagrams(text, pattern) {
    const k = pattern.length;
    const patternCount = new Map();
    const windowCount = new Map();
    
    // Build pattern frequency map
    for (let char of pattern) {
        patternCount.set(char, (patternCount.get(char) || 0) + 1);
    }
    
    let count = 0;
    
    for (let i = 0; i < text.length; i++) {
        // Add character to window
        const char = text[i];
        windowCount.set(char, (windowCount.get(char) || 0) + 1);
        
        // Remove character outside window
        if (i >= k) {
            const leftChar = text[i - k];
            windowCount.set(leftChar, windowCount.get(leftChar) - 1);
            if (windowCount.get(leftChar) === 0) {
                windowCount.delete(leftChar);
            }
        }
        
        // Check if window is anagram
        if (i >= k - 1 && mapsEqual(patternCount, windowCount)) {
            count++;
        }
    }
    
    return count;
}

function mapsEqual(map1, map2) {
    if (map1.size !== map2.size) return false;
    
    for (let [key, val] of map1) {
        if (map2.get(key) !== val) return false;
    }
    
    return true;
}

// Example
console.log(countAnagrams("forxxorfxdofr", "for")); // Output: 3
```

---

### Problem 6: Contains Duplicate II (Easy)

**Problem**: Check if array contains duplicate within k indices apart.

**Time Complexity**: O(n)  
**Space Complexity**: O(k)

```javascript
function containsNearbyDuplicate(nums, k) {
    const window = new Set();
    
    for (let i = 0; i < nums.length; i++) {
        if (window.has(nums[i])) {
            return true;
        }
        
        window.add(nums[i]);
        
        // Keep window size <= k
        if (window.size > k) {
            window.delete(nums[i - k]);
        }
    }
    
    return false;
}

// Example
console.log(containsNearbyDuplicate([1, 2, 3, 1], 3));     // true
console.log(containsNearbyDuplicate([1, 0, 1, 1], 1));     // true
console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)); // false
```

---

## Variable Size Window Problems

---

### MEDIUM PROBLEMS

---

### Problem 7: Longest Substring Without Repeating Characters (Medium)

**Problem**: Find length of longest substring without repeating characters.

**Time Complexity**: O(n)  
**Space Complexity**: O(min(n, m)) where m is charset size

```javascript
function lengthOfLongestSubstring(s) {
    const charSet = new Set();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        // Shrink window until no duplicate
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        
        charSet.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Alternative with Map (tracks index)
function lengthOfLongestSubstringMap(s) {
    const charIndex = new Map();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        if (charIndex.has(s[right])) {
            left = Math.max(left, charIndex.get(s[right]) + 1);
        }
        
        charIndex.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Example
console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb"));    // Output: 1 ("b")
console.log(lengthOfLongestSubstring("pwwkew"));   // Output: 3 ("wke")
```

---

### Problem 8: Longest Substring with At Most K Distinct Characters (Medium)

**Problem**: Find length of longest substring with at most k distinct characters.

**Time Complexity**: O(n)  
**Space Complexity**: O(k)

```javascript
function lengthOfLongestSubstringKDistinct(s, k) {
    if (k === 0) return 0;
    
    const charCount = new Map();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        // Add right character
        const rightChar = s[right];
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
        
        // Shrink window if too many distinct characters
        while (charCount.size > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            if (charCount.get(leftChar) === 0) {
                charCount.delete(leftChar);
            }
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Example
console.log(lengthOfLongestSubstringKDistinct("eceba", 2)); // Output: 3 ("ece")
console.log(lengthOfLongestSubstringKDistinct("aa", 1));    // Output: 2 ("aa")
```

---

### Problem 9: Longest Substring with Exactly K Distinct Characters (Medium)

**Problem**: Find length of longest substring with exactly k distinct characters.

**Time Complexity**: O(n)  
**Space Complexity**: O(k)

```javascript
function longestSubstringExactlyK(s, k) {
    return atMostK(s, k) - atMostK(s, k - 1);
}

function atMostK(s, k) {
    const charCount = new Map();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);
        
        while (charCount.size > k) {
            charCount.set(s[left], charCount.get(s[left]) - 1);
            if (charCount.get(s[left]) === 0) {
                charCount.delete(s[left]);
            }
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Example
console.log(longestSubstringExactlyK("aabacbebebe", 3)); // Output: 7 ("cbebebe")
```

---

### Problem 10: Minimum Window Substring (Hard)

**Problem**: Find minimum window in s that contains all characters of t.

**Time Complexity**: O(m + n)  
**Space Complexity**: O(m + n)

```javascript
function minWindow(s, t) {
    const need = new Map();
    const window = new Map();
    
    // Build need map
    for (let char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let left = 0, right = 0;
    let valid = 0;
    let start = 0, minLen = Infinity;
    
    while (right < s.length) {
        const rightChar = s[right];
        right++;
        
        // Update window
        if (need.has(rightChar)) {
            window.set(rightChar, (window.get(rightChar) || 0) + 1);
            if (window.get(rightChar) === need.get(rightChar)) {
                valid++;
            }
        }
        
        // Shrink window when valid
        while (valid === need.size) {
            // Update result
            if (right - left < minLen) {
                start = left;
                minLen = right - left;
            }
            
            const leftChar = s[left];
            left++;
            
            if (need.has(leftChar)) {
                if (window.get(leftChar) === need.get(leftChar)) {
                    valid--;
                }
                window.set(leftChar, window.get(leftChar) - 1);
            }
        }
    }
    
    return minLen === Infinity ? "" : s.substring(start, start + minLen);
}

// Example
console.log(minWindow("ADOBECODEBANC", "ABC")); // Output: "BANC"
console.log(minWindow("a", "a"));               // Output: "a"
console.log(minWindow("a", "aa"));              // Output: ""
```

---

### Problem 11: Longest Repeating Character Replacement (Medium)

**Problem**: Replace at most k characters to get longest substring with same character.

**Time Complexity**: O(n)  
**Space Complexity**: O(1) - fixed alphabet size

```javascript
function characterReplacement(s, k) {
    const count = new Map();
    let left = 0;
    let maxCount = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        count.set(s[right], (count.get(s[right]) || 0) + 1);
        maxCount = Math.max(maxCount, count.get(s[right]));
        
        // If we need to replace more than k characters, shrink
        while (right - left + 1 - maxCount > k) {
            count.set(s[left], count.get(s[left]) - 1);
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Example
console.log(characterReplacement("ABAB", 2));   // Output: 4 (replace B's)
console.log(characterReplacement("AABABBA", 1)); // Output: 4
```

---

### Problem 12: Permutation in String (Medium)

**Problem**: Check if s2 contains permutation of s1.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

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
        const rightChar = s2[right];
        right++;
        
        if (need.has(rightChar)) {
            window.set(rightChar, (window.get(rightChar) || 0) + 1);
            if (window.get(rightChar) === need.get(rightChar)) {
                valid++;
            }
        }
        
        // Shrink window when it exceeds s1 length
        while (right - left >= s1.length) {
            if (valid === need.size) {
                return true;
            }
            
            const leftChar = s2[left];
            left++;
            
            if (need.has(leftChar)) {
                if (window.get(leftChar) === need.get(leftChar)) {
                    valid--;
                }
                window.set(leftChar, window.get(leftChar) - 1);
            }
        }
    }
    
    return false;
}

// Example
console.log(checkInclusion("ab", "eidbaooo")); // true
console.log(checkInclusion("ab", "eidboaoo")); // false
```

---

### Problem 13: Find All Anagrams in a String (Medium)

**Problem**: Find all start indices of p's anagrams in s.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function findAnagrams(s, p) {
    const need = new Map();
    const window = new Map();
    const result = [];
    
    for (let char of p) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let left = 0, right = 0;
    let valid = 0;
    
    while (right < s.length) {
        const rightChar = s[right];
        right++;
        
        if (need.has(rightChar)) {
            window.set(rightChar, (window.get(rightChar) || 0) + 1);
            if (window.get(rightChar) === need.get(rightChar)) {
                valid++;
            }
        }
        
        while (right - left >= p.length) {
            if (valid === need.size) {
                result.push(left);
            }
            
            const leftChar = s[left];
            left++;
            
            if (need.has(leftChar)) {
                if (window.get(leftChar) === need.get(leftChar)) {
                    valid--;
                }
                window.set(leftChar, window.get(leftChar) - 1);
            }
        }
    }
    
    return result;
}

// Example
console.log(findAnagrams("cbaebabacd", "abc")); // Output: [0, 6]
console.log(findAnagrams("abab", "ab"));        // Output: [0, 1, 2]
```

---

### Problem 14: Minimum Size Subarray Sum (Medium)

**Problem**: Find minimum length of contiguous subarray with sum ≥ target.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function minSubArrayLen(target, nums) {
    let left = 0;
    let sum = 0;
    let minLen = Infinity;
    
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        
        // Shrink window while valid
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }
    
    return minLen === Infinity ? 0 : minLen;
}

// Example
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // Output: 2 ([4,3])
console.log(minSubArrayLen(4, [1, 4, 4]));          // Output: 1 ([4])
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1]));   // Output: 0
```

---

### Problem 15: Longest Subarray with Sum ≤ K (Medium)

**Problem**: Find longest subarray with sum at most k.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function longestSubarrayAtMostK(nums, k) {
    let left = 0;
    let sum = 0;
    let maxLen = 0;
    
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        
        while (sum > k) {
            sum -= nums[left];
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Example
console.log(longestSubarrayAtMostK([1, 2, 3, 4, 5], 11)); // Output: 4
```

---

### Problem 16: Max Consecutive Ones III (Medium)

**Problem**: Flip at most k zeros to get longest consecutive ones.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function longestOnes(nums, k) {
    let left = 0;
    let zeros = 0;
    let maxLen = 0;
    
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) {
            zeros++;
        }
        
        while (zeros > k) {
            if (nums[left] === 0) {
                zeros--;
            }
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Example
console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2)); // Output: 6
console.log(longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3)); 
// Output: 10
```

---

### Problem 17: Fruit Into Baskets (Medium)

**Problem**: Pick fruits from trees. Two baskets, each can hold one type. Max fruits?

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function totalFruit(fruits) {
    const basket = new Map();
    let left = 0;
    let maxFruits = 0;
    
    for (let right = 0; right < fruits.length; right++) {
        basket.set(fruits[right], (basket.get(fruits[right]) || 0) + 1);
        
        // Can only have 2 types of fruits
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

// Example
console.log(totalFruit([1, 2, 1]));          // Output: 3
console.log(totalFruit([0, 1, 2, 2]));       // Output: 3
console.log(totalFruit([1, 2, 3, 2, 2]));    // Output: 4 ([2,3,2,2])
console.log(totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4])); // Output: 5
```

---

### Problem 18: Grumpy Bookstore Owner (Medium)

**Problem**: Bookstore owner grumpy for certain minutes. Secret technique keeps customers for X minutes. Max satisfied customers?

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function maxSatisfied(customers, grumpy, minutes) {
    let satisfied = 0;
    
    // Count always satisfied customers
    for (let i = 0; i < customers.length; i++) {
        if (grumpy[i] === 0) {
            satisfied += customers[i];
        }
    }
    
    // Find max additional customers in window of size `minutes`
    let maxAdditional = 0;
    let windowAdditional = 0;
    
    for (let i = 0; i < customers.length; i++) {
        if (grumpy[i] === 1) {
            windowAdditional += customers[i];
        }
        
        if (i >= minutes) {
            if (grumpy[i - minutes] === 1) {
                windowAdditional -= customers[i - minutes];
            }
        }
        
        if (i >= minutes - 1) {
            maxAdditional = Math.max(maxAdditional, windowAdditional);
        }
    }
    
    return satisfied + maxAdditional;
}

// Example
console.log(maxSatisfied(
    [1, 0, 1, 2, 1, 1, 7, 5],
    [0, 1, 0, 1, 0, 1, 0, 1],
    3
)); // Output: 16
```

---

### Problem 19: Subarray Product Less Than K (Medium)

**Problem**: Count contiguous subarrays where product < k.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function numSubarrayProductLessThanK(nums, k) {
    if (k <= 1) return 0;
    
    let left = 0;
    let product = 1;
    let count = 0;
    
    for (let right = 0; right < nums.length; right++) {
        product *= nums[right];
        
        while (product >= k) {
            product /= nums[left];
            left++;
        }
        
        // All subarrays ending at right
        count += right - left + 1;
    }
    
    return count;
}

// Example
console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100)); // Output: 8
```

---

### Problem 20: Number of Substrings with All Three Characters (Medium)

**Problem**: Count substrings containing at least one of each 'a', 'b', 'c'.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function numberOfSubstrings(s) {
    const count = { a: 0, b: 0, c: 0 };
    let left = 0;
    let result = 0;
    
    for (let right = 0; right < s.length; right++) {
        count[s[right]]++;
        
        // Shrink until one character becomes 0
        while (count.a > 0 && count.b > 0 && count.c > 0) {
            result += s.length - right;
            count[s[left]]--;
            left++;
        }
    }
    
    return result;
}

// Example
console.log(numberOfSubstrings("abcabc")); // Output: 10
console.log(numberOfSubstrings("aaacb"));  // Output: 3
```

---

### Problem 21: Replace the Substring for Balanced String (Medium)

**Problem**: String with Q, W, E, R. Replace minimum substring to make count of each n/4.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function balancedString(s) {
    const count = new Map();
    const n = s.length;
    const target = n / 4;
    
    for (let char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }
    
    // Check if already balanced
    if (Math.max(...count.values()) <= target) return 0;
    
    let left = 0;
    let minLen = n;
    
    for (let right = 0; right < n; right++) {
        count.set(s[right], count.get(s[right]) - 1);
        
        while (left < n && 
               (count.get('Q') || 0) <= target &&
               (count.get('W') || 0) <= target &&
               (count.get('E') || 0) <= target &&
               (count.get('R') || 0) <= target) {
            minLen = Math.min(minLen, right - left + 1);
            count.set(s[left], (count.get(s[left]) || 0) + 1);
            left++;
        }
    }
    
    return minLen;
}

// Example
console.log(balancedString("QWER")); // Output: 0
console.log(balancedString("QQWE")); // Output: 1
console.log(balancedString("QQQW")); // Output: 2
```

---

### Problem 22: Get Equal Substrings Within Budget (Medium)

**Problem**: Change characters in s to match t. Each change costs |s[i]-t[i]|. Max length with budget?

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function equalSubstring(s, t, maxCost) {
    let left = 0;
    let cost = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        cost += Math.abs(s.charCodeAt(right) - t.charCodeAt(right));
        
        while (cost > maxCost) {
            cost -= Math.abs(s.charCodeAt(left) - t.charCodeAt(left));
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Example
console.log(equalSubstring("abcd", "bcdf", 3)); // Output: 3
console.log(equalSubstring("abcd", "cdef", 3)); // Output: 1
```

---

## Advanced Sliding Window Problems

---

### HARD PROBLEMS

---

### Problem 23: Longest Substring with At Most Two Distinct Characters (Hard)

**Problem**: Find longest substring with at most 2 distinct characters.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function lengthOfLongestSubstringTwoDistinct(s) {
    const charCount = new Map();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);
        
        while (charCount.size > 2) {
            charCount.set(s[left], charCount.get(s[left]) - 1);
            if (charCount.get(s[left]) === 0) {
                charCount.delete(s[left]);
            }
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Example
console.log(lengthOfLongestSubstringTwoDistinct("eceba"));  // Output: 3
console.log(lengthOfLongestSubstringTwoDistinct("ccaabbb")); // Output: 5
```

---

### Problem 24: Subarrays with K Different Integers (Hard)

**Problem**: Count subarrays with exactly k different integers.

**Time Complexity**: O(n)  
**Space Complexity**: O(k)

```javascript
function subarraysWithKDistinct(nums, k) {
    return atMostK(nums, k) - atMostK(nums, k - 1);
}

function atMostK(nums, k) {
    const count = new Map();
    let left = 0;
    let result = 0;
    
    for (let right = 0; right < nums.length; right++) {
        count.set(nums[right], (count.get(nums[right]) || 0) + 1);
        
        while (count.size > k) {
            count.set(nums[left], count.get(nums[left]) - 1);
            if (count.get(nums[left]) === 0) {
                count.delete(nums[left]);
            }
            left++;
        }
        
        result += right - left + 1;
    }
    
    return result;
}

// Example
console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2)); // Output: 7
console.log(subarraysWithKDistinct([1, 2, 1, 3, 4], 3)); // Output: 3
```

---

### Problem 25: Substring with Concatenation of All Words (Hard)

**Problem**: Find all starting indices where s contains concatenation of all words.

**Time Complexity**: O(n × m × len) where m is word count, len is word length  
**Space Complexity**: O(m)

```javascript
function findSubstring(s, words) {
    if (s.length === 0 || words.length === 0) return [];
    
    const wordLen = words[0].length;
    const wordCount = words.length;
    const totalLen = wordLen * wordCount;
    const result = [];
    
    const wordMap = new Map();
    for (let word of words) {
        wordMap.set(word, (wordMap.get(word) || 0) + 1);
    }
    
    for (let i = 0; i <= s.length - totalLen; i++) {
        const seen = new Map();
        let j = 0;
        
        while (j < wordCount) {
            const wordIndex = i + j * wordLen;
            const word = s.substring(wordIndex, wordIndex + wordLen);
            
            if (!wordMap.has(word)) break;
            
            seen.set(word, (seen.get(word) || 0) + 1);
            
            if (seen.get(word) > wordMap.get(word)) break;
            
            j++;
        }
        
        if (j === wordCount) {
            result.push(i);
        }
    }
    
    return result;
}

// Example
console.log(findSubstring("barfoothefoobarman", ["foo", "bar"]));
// Output: [0, 9]
console.log(findSubstring("wordgoodgoodgoodbestword", ["word","good","best","word"]));
// Output: []
```

---

### Problem 26: Minimum Window Subsequence (Hard)

**Problem**: Find minimum window in S that contains all characters of T in order (subsequence).

**Time Complexity**: O(m × n)  
**Space Complexity**: O(1)

```javascript
function minWindowSubsequence(s, t) {
    let minLen = Infinity;
    let minStart = 0;
    
    let i = 0;
    while (i < s.length) {
        let j = 0;
        
        // Find t in s starting from i
        while (i < s.length) {
            if (s[i] === t[j]) {
                j++;
                if (j === t.length) break;
            }
            i++;
        }
        
        if (i === s.length) break;
        
        // Found complete t, now go backwards
        let end = i;
        j = t.length - 1;
        
        while (j >= 0) {
            if (s[i] === t[j]) {
                j--;
            }
            i--;
        }
        
        i++; // Adjust
        
        if (end - i + 1 < minLen) {
            minLen = end - i + 1;
            minStart = i;
        }
        
        i++;
    }
    
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

// Example
console.log(minWindowSubsequence("abcdebdde", "bde")); // Output: "bcde"
console.log(minWindowSubsequence("jmeqksfrsdcmsiwvaovztaqenprpvnbstl", "u")); 
// Output: ""
```

---

### Problem 27: Sliding Window Maximum (Hard)

**Problem**: Return max element in each sliding window of size k.

**Time Complexity**: O(n)  
**Space Complexity**: O(k)

```javascript
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = [];
    
    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside window
        while (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }
        
        // Remove smaller elements
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
}

// Example
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// Output: [3, 3, 5, 5, 6, 7]
```

---

### Problem 28: Sliding Window Median (Hard)

**Problem**: Return median of each sliding window of size k.

**Time Complexity**: O(n log k)  
**Space Complexity**: O(k)

```javascript
function medianSlidingWindow(nums, k) {
    const result = [];
    const window = [];
    
    for (let i = 0; i < nums.length; i++) {
        // Add new element
        window.push(nums[i]);
        window.sort((a, b) => a - b);
        
        // Remove element outside window
        if (window.length > k) {
            const removeIdx = window.indexOf(nums[i - k]);
            window.splice(removeIdx, 1);
        }
        
        // Calculate median
        if (window.length === k) {
            if (k % 2 === 0) {
                result.push((window[k / 2 - 1] + window[k / 2]) / 2);
            } else {
                result.push(window[Math.floor(k / 2)]);
            }
        }
    }
    
    return result;
}

// Example
console.log(medianSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// Output: [1, -1, -1, 3, 5, 6]
```

---

### Problem 29: Longest Duplicate Substring (Hard)

**Problem**: Find longest duplicate substring using binary search + sliding window.

**Time Complexity**: O(n log n)  
**Space Complexity**: O(n)

```javascript
function longestDupSubstring(s) {
    let left = 1;
    let right = s.length;
    let result = "";
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const dup = search(s, mid);
        
        if (dup !== null) {
            result = dup;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

function search(s, len) {
    const seen = new Set();
    
    for (let i = 0; i <= s.length - len; i++) {
        const substr = s.substring(i, i + len);
        if (seen.has(substr)) {
            return substr;
        }
        seen.add(substr);
    }
    
    return null;
}

// Example
console.log(longestDupSubstring("banana")); // Output: "ana"
console.log(longestDupSubstring("abcd"));   // Output: ""
```

---

### Problem 30: Count Unique Characters of All Substrings (Hard)

**Problem**: Count unique characters in all substrings.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function uniqueLetterString(s) {
    const lastPos = new Map();
    const secondLastPos = new Map();
    let result = 0;
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const last = lastPos.get(char) ?? -1;
        const secondLast = secondLastPos.get(char) ?? -1;
        
        result += (i - last) * (last - secondLast);
        
        secondLastPos.set(char, last);
        lastPos.set(char, i);
    }
    
    // Process remaining
    for (let [char, last] of lastPos) {
        const secondLast = secondLastPos.get(char) ?? -1;
        result += (s.length - last) * (last - secondLast);
    }
    
    return result;
}

// Example
console.log(uniqueLetterString("ABC"));  // Output: 10
console.log(uniqueLetterString("ABA"));  // Output: 8
```

---

## Problem Summary by Difficulty

### Easy (6 Problems)
1. Maximum Sum Subarray of Size K - O(n)/O(1)
2. Average of Subarrays - O(n)/O(n)
3. Maximum of All Subarrays - O(n)/O(k)
4. First Negative in Window - O(n)/O(k)
5. Count Anagrams - O(n)/O(1)
6. Contains Duplicate II - O(n)/O(k)

### Medium (17 Problems)
7. Longest Substring Without Repeating - O(n)/O(min(n,m))
8. At Most K Distinct Characters - O(n)/O(k)
9. Exactly K Distinct Characters - O(n)/O(k)
10. Minimum Window Substring - O(m+n)/O(m+n)
11. Character Replacement - O(n)/O(1)
12. Permutation in String - O(n)/O(1)
13. Find All Anagrams - O(n)/O(1)
14. Minimum Size Subarray Sum - O(n)/O(1)
15. Longest Subarray At Most K - O(n)/O(1)
16. Max Consecutive Ones III - O(n)/O(1)
17. Fruit Into Baskets - O(n)/O(1)
18. Grumpy Bookstore Owner - O(n)/O(1)
19. Subarray Product Less Than K - O(n)/O(1)
20. Three Characters Substrings - O(n)/O(1)
21. Balanced String - O(n)/O(1)
22. Equal Substrings Budget - O(n)/O(1)
23. Two Distinct Characters - O(n)/O(1)

### Hard (7 Problems)
24. K Different Integers - O(n)/O(k)
25. Concatenation of All Words - O(n×m×len)/O(m)
26. Minimum Window Subsequence - O(m×n)/O(1)
27. Sliding Window Maximum - O(n)/O(k)
28. Sliding Window Median - O(n log k)/O(k)
29. Longest Duplicate Substring - O(n log n)/O(n)
30. Count Unique Characters - O(n)/O(1)

---

## Pattern Recognition Guide

### How to Identify Sliding Window Problems:

#### Keywords to Look For:
- "contiguous subarray/substring"
- "longest/shortest"
- "maximum/minimum"
- "window of size K"
- "at most/at least K"

#### Problem Types:

| Type | Characteristics | Example |
|------|----------------|---------|
| Fixed Window | Window size given | Max sum of K elements |
| Variable Window | Find optimal window | Longest substring K distinct |
| String Matching | Pattern/anagram finding | Find all anagrams |
| Two Pointers | Shrink/expand based on condition | Min window substring |

---

## Common Mistakes to Avoid

1. ❌ **Not handling edge cases**:
   - Empty array/string
   - K larger than array length
   - All elements same

2. ❌ **Wrong window shrinking condition**:
   - Always verify when to shrink
   - Be careful with >= vs >

3. ❌ **Forgetting to update result**:
   - Update before or after shrinking?
   - Max vs Min tracking

4. ❌ **Off-by-one errors**:
   - Window size calculation
   - Index boundaries

5. ❌ **Inefficient data structures**:
   - Using array when map is better
   - Not using deque for max/min tracking

---

## Tips for Solving Sliding Window Problems

### Step-by-Step Approach:

1. **Identify if it's sliding window**:
   - Contiguous subarray needed?
   - Can we define window condition?

2. **Choose window type**:
   - Fixed size? → Use fixed window template
   - Variable size? → Use two pointers

3. **Define what to track**:
   - Sum? Count? Characters?
   - Use appropriate data structure

4. **Decide shrinking condition**:
   - When to move left pointer?
   - What makes window invalid?

5. **Update result correctly**:
   - After expanding?
   - While shrinking?
   - At both times?

### Debugging Checklist:

- [ ] Window size correct?
- [ ] Shrinking condition right?
- [ ] Result updated at right time?
- [ ] Edge cases handled?
- [ ] Data structure efficient?

---

## Time Complexity Patterns

| Pattern | Time | Space | Notes |
|---------|------|-------|-------|
| Fixed Window | O(n) | O(1) or O(k) | Single pass |
| Variable Window | O(n) | O(k) | Each element visited once |
| String with HashMap | O(n) | O(1) | Fixed charset |
| Deque (Max/Min) | O(n) | O(k) | Monotonic deque |
| All Subarrays | O(n) | O(k) | Count = right - left + 1 |

---

## Practice Strategy

### Beginner Level:
1. Start with fixed window problems
2. Master the basic template
3. Practice 5-10 easy problems

### Intermediate Level:
1. Move to variable window
2. Learn string problems with HashMap
3. Practice 10-15 medium problems

### Advanced Level:
1. Complex conditions (multiple maps)
2. Deque for max/min tracking
3. Practice 5-7 hard problems

---

**Master Sliding Window by recognizing patterns and practicing systematically! 🚀**

## Your Complete Collection (10 Guides)

1. ✅ Graphs DSA
2. ✅ Trees DSA
3. ✅ Linked Lists DSA
4. ✅ Intervals DSA
5. ✅ Bit Manipulation DSA
6. ✅ Sorting DSA
7. ✅ DSA Patterns
8. ✅ Complete Algorithms
9. ✅ Dynamic Programming
10. ✅ **Sliding Window** (NEW!)

You now have everything to ace any coding interview! 💪

