# 17. Longest Repeating Character Replacement

**LeetCode Link**: [424. Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)

**Difficulty**: Medium

**Topics**: Hash Table, String, Sliding Window

---

## Problem Statement

You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

### Examples

**Example 1:**
```
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with 'B's (or vice versa).
```

**Example 2:**
```
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace one 'B' with 'A' to get "AAAA" or replace one 'A' with 'B' to get "BBBB".
```

### Constraints
- `1 <= s.length <= 10^5`
- `s` consists of only uppercase English letters
- `0 <= k <= s.length`

---

## Approach: Sliding Window (Optimal!) ✅

### Intuition
Use sliding window. Window is valid if: `window_length - max_frequency <= k`

**Key Insight**: We can replace up to `k` characters. So if we have a window where the most frequent character appears `maxFreq` times, we need `window_length - maxFreq` replacements.

### Implementation

```javascript
/**
 * Sliding Window - O(n)
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
function characterReplacement(s, k) {
    const count = new Map();
    let left = 0;
    let maxFreq = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        // Add right character
        count.set(s[right], (count.get(s[right]) || 0) + 1);
        
        // Update max frequency in current window
        maxFreq = Math.max(maxFreq, count.get(s[right]));
        
        // Check if window is valid
        const windowLen = right - left + 1;
        const replacements = windowLen - maxFreq;
        
        if (replacements > k) {
            // Shrink window
            count.set(s[left], count.get(s[left]) - 1);
            left++;
        }
        
        // Update max length
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Test
console.log(characterReplacement("ABAB", 2)); // 4
console.log(characterReplacement("AABABBA", 1)); // 4
console.log(characterReplacement("AAAA", 0)); // 4
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Single pass
- **Space Complexity**: `O(1)` - At most 26 letters

---

## Visual Example

```
s = "AABABBA", k = 1

Valid window condition: windowLen - maxFreq <= k

Step 1: "A" (maxFreq=1, need 0 replacements) ✓
Step 2: "AA" (maxFreq=2, need 0 replacements) ✓
Step 3: "AAB" (maxFreq=2, need 1 replacement) ✓
Step 4: "AABA" (maxFreq=3, need 1 replacement) ✓
Step 5: "AABAB" (maxFreq=3, need 2 replacements) ✗
        Shrink: "ABAB" (maxFreq=2, need 2 replacements) ✗
        Shrink: "BAB" (maxFreq=2, need 1 replacement) ✓
...

Max length = 4 ("AAAA" or "BBBB" after replacements)
```

---

## Key Takeaways

✅ Window valid if: `windowLen - maxFreq <= k`  
✅ Track character frequencies in window  
✅ Expand right, shrink left when invalid  
✅ O(n) time, O(1) space  

**Pattern**: Max length with k operations → Sliding window!
