# 19. Minimum Window Substring

**LeetCode Link**: [76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)

**Difficulty**: Hard

**Topics**: Hash Table, String, Sliding Window

---

## Problem Statement

Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

### Examples

**Example 1:**
```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
```

**Example 2:**
```
Input: s = "a", t = "a"
Output: "a"
```

**Example 3:**
```
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
```

### Constraints
- `m == s.length`
- `n == t.length`
- `1 <= m, n <= 10^5`
- `s` and `t` consist of uppercase and lowercase English letters

---

## Approach: Sliding Window (Optimal!) ✅

### Intuition
Expand window until all characters found, then shrink while valid. Track minimum window.

### Implementation

```javascript
/**
 * Sliding Window - O(m + n)
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {
    if (t.length > s.length) return "";
    
    // Count characters needed
    const need = new Map();
    for (const char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let left = 0;
    let minLen = Infinity;
    let minStart = 0;
    let required = need.size;
    let formed = 0;
    const windowCounts = new Map();
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);
        
        // Check if frequency matches
        if (need.has(char) && windowCounts.get(char) === need.get(char)) {
            formed++;
        }
        
        // Try to shrink window
        while (formed === required && left <= right) {
            // Update minimum window
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            
            // Remove left character
            const leftChar = s[left];
            windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);
            
            if (need.has(leftChar) && windowCounts.get(leftChar) < need.get(leftChar)) {
                formed--;
            }
            
            left++;
        }
    }
    
    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

// Test
console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindow("a", "a")); // "a"
console.log(minWindow("a", "aa")); // ""
```

### Complexity Analysis
- **Time Complexity**: `O(m + n)` where m = s.length, n = t.length
- **Space Complexity**: `O(m + n)` for hash maps

---

## Key Takeaways

✅ Expand to find valid window  
✅ Shrink to minimize while valid  
✅ Track character frequencies  
✅ O(m + n) optimal time  

**Pattern**: Minimum window with all characters → Sliding window!

**Sliding Window Complete! (6/6) ✅**
