# 18. Permutation in String

**LeetCode Link**: [567. Permutation in String](https://leetcode.com/problems/permutation-in-string/)

**Difficulty**: Medium

**Topics**: Hash Table, Two Pointers, String, Sliding Window

---

## Problem Statement

Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.

In other words, return `true` if one of `s1`'s permutations is a substring of `s2`.

### Examples

**Example 1:**
```
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
```

**Example 2:**
```
Input: s1 = "ab", s2 = "eidboaoo"
Output: false
```

### Constraints
- `1 <= s1.length, s2.length <= 10^4`
- `s1` and `s2` consist of lowercase English letters

---

## Approach: Fixed Sliding Window (Optimal!) ✅

### Intuition
Permutation means same character frequencies. Use fixed-size sliding window (size of s1) and compare frequencies.

### Implementation

```javascript
/**
 * Fixed Sliding Window - O(n)
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;
    
    // Count frequencies in s1
    const s1Count = new Array(26).fill(0);
    for (const char of s1) {
        s1Count[char.charCodeAt(0) - 97]++;
    }
    
    // Sliding window in s2
    const windowCount = new Array(26).fill(0);
    
    for (let i = 0; i < s2.length; i++) {
        // Add right character
        windowCount[s2.charCodeAt(i) - 97]++;
        
        // Remove left character if window too large
        if (i >= s1.length) {
            windowCount[s2.charCodeAt(i - s1.length) - 97]--;
        }
        
        // Check if window matches s1
        if (i >= s1.length - 1 && arraysEqual(s1Count, windowCount)) {
            return true;
        }
    }
    
    return false;
}

function arraysEqual(arr1, arr2) {
    for (let i = 0; i < 26; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// Test
console.log(checkInclusion("ab", "eidbaooo")); // true
console.log(checkInclusion("ab", "eidboaoo")); // false
```

### Complexity Analysis
- **Time Complexity**: `O(n)` where n = s2.length
- **Space Complexity**: `O(1)` - Fixed size arrays (26)

---

## Key Takeaways

✅ Fixed-size sliding window = s1.length  
✅ Compare character frequencies  
✅ O(n) time with constant space  

**Pattern**: Find permutation in string → Fixed sliding window!
