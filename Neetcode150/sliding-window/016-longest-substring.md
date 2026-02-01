# 16. Longest Substring Without Repeating Characters

**LeetCode Link**: [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

**Difficulty**: Medium

**Topics**: Hash Table, String, Sliding Window

---

## Problem Statement

Given a string `s`, find the length of the **longest substring** without repeating characters.

### Examples

**Example 1:**
```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

**Example 2:**
```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

**Example 3:**
```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
```

### Constraints
- `0 <= s.length <= 5 * 10^4`
- `s` consists of English letters, digits, symbols and spaces

---

## Approach 1: Brute Force

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

**Complexity**: O(n²) - Too slow!

---

## Approach 2: Sliding Window with Set (Optimal!) ✅

### Intuition
Use sliding window with a set to track unique characters. Expand window when unique, shrink when duplicate found.

### Implementation

```javascript
/**
 * Sliding Window - O(n) Optimal
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    const charSet = new Set();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        // Shrink window until no duplicates
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        
        // Add current character
        charSet.add(s[right]);
        
        // Update max length
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// Test
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3
console.log(lengthOfLongestSubstring("")); // 0
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Each character visited at most twice
- **Space Complexity**: `O(min(n, m))` where m is charset size

---

## Approach 3: Sliding Window with Map (Even Better!) ✅

```javascript
/**
 * Optimized with Map - Skip duplicates
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    const charIndex = new Map();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        // If character seen before, move left pointer
        if (charIndex.has(char)) {
            left = Math.max(left, charIndex.get(char) + 1);
        }
        
        // Store/update character index
        charIndex.set(char, right);
        
        // Update max length
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

**Complexity**: O(n) time, single pass!

---

## Visual Example

```
s = "abcabcbb"

Step 1: right=0, char='a'
        L
        a b c a b c b b
        |
Window: "a", length=1

Step 2: right=1, char='b'
        L
        a b c a b c b b
        |---|
Window: "ab", length=2

Step 3: right=2, char='c'
        L
        a b c a b c b b
        |-------|
Window: "abc", length=3 ✓

Step 4: right=3, char='a' (duplicate!)
          L
        a b c a b c b b
          |-------|
Move left past old 'a'
Window: "bca", length=3

Step 5: right=4, char='b' (duplicate!)
            L
        a b c a b c b b
            |-------|
Move left past old 'b'
Window: "cab", length=3

... Continue ...

Max length = 3
```

---

## Key Takeaways

✅ Sliding window with set/map  
✅ Expand right, shrink left on duplicates  
✅ O(n) single pass solution  
✅ Track character indices for optimization  

**Pattern**: Longest substring without duplicates → Sliding window!
