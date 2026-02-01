# 2. Valid Anagram

**LeetCode Link**: [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/)

**Difficulty**: Easy

**Topics**: Hash Table, String, Sorting

---

## Problem Statement

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Examples

**Example 1:**
```
Input: s = "anagram", t = "nagaram"
Output: true
```

**Example 2:**
```
Input: s = "rat", t = "car"
Output: false
```

### Constraints
- `1 <= s.length, t.length <= 5 * 10^4`
- `s` and `t` consist of lowercase English letters

---

## Approach 1: Brute Force (Generate All Permutations)

### Intuition
Generate all permutations of `s` and check if any equals `t`.

### Algorithm
1. Generate all permutations of `s`
2. Check if `t` exists in permutations
3. Return result

### Implementation

```javascript
/**
 * Brute Force - Generate Permutations (NOT RECOMMENDED)
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    // Generate all permutations of s
    function generatePermutations(str) {
        if (str.length <= 1) return [str];
        
        const permutations = [];
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            const remaining = str.slice(0, i) + str.slice(i + 1);
            const subPermutations = generatePermutations(remaining);
            
            for (const perm of subPermutations) {
                permutations.push(char + perm);
            }
        }
        return permutations;
    }
    
    const permutations = generatePermutations(s);
    return permutations.includes(t);
}

// Test
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false
```

### Complexity Analysis
- **Time Complexity**: `O(n! × n)` - Factorial! Extremely slow
- **Space Complexity**: `O(n!)` - Store all permutations

### Why is this terrible?
For `n = 10`:
- Number of permutations = `10! = 3,628,800`
- For `n = 20`: `20! = 2.4 × 10^18` - Would take years!
- **NEVER use this approach**

---

## Approach 2: Sorting

### Intuition
If two strings are anagrams, sorting them will produce the same result.

### Algorithm
1. If lengths differ, return `false`
2. Sort both strings
3. Compare if sorted strings are equal

### Implementation

```javascript
/**
 * Sorting Approach
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
    // Early exit if lengths differ
    if (s.length !== t.length) {
        return false;
    }
    
    // Sort both strings and compare
    const sortedS = s.split('').sort().join('');
    const sortedT = t.split('').sort().join('');
    
    return sortedS === sortedT;
}

// Test
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false
```

### Complexity Analysis
- **Time Complexity**: `O(n log n)` - Sorting dominates
- **Space Complexity**: `O(n)` - Space for sorted arrays

### Better, but can we do linear time?

---

## Approach 3: Character Count with Hash Map (Optimal) ✅

### Intuition
Anagrams have the same character frequencies. Count characters and compare.

### Algorithm
1. If lengths differ, return `false` (early exit)
2. Count frequency of each character in `s`
3. Decrement frequency for each character in `t`
4. If all frequencies are 0, return `true`

### Implementation

```javascript
/**
 * Hash Map Approach (Optimal)
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
    // Early exit if lengths differ
    if (s.length !== t.length) {
        return false;
    }
    
    const charCount = new Map();
    
    // Count characters in s
    for (const char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Decrement for characters in t
    for (const char of t) {
        if (!charCount.has(char)) {
            return false; // Character not in s
        }
        
        const count = charCount.get(char) - 1;
        
        if (count === 0) {
            charCount.delete(char);
        } else {
            charCount.set(char, count);
        }
    }
    
    // If map is empty, all characters matched
    return charCount.size === 0;
}

// Test
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Two passes through strings
- **Space Complexity**: `O(1)` - At most 26 letters (constant space)

---

## Approach 4: Character Count with Array (Most Optimal for English) ✅

### Intuition
Since we only have lowercase English letters (26 letters), use array instead of hash map.

### Algorithm
1. Create array of size 26 for letter counts
2. Increment count for characters in `s`
3. Decrement count for characters in `t`
4. Check if all counts are 0

### Implementation

```javascript
/**
 * Array Count Approach (Most Optimal for lowercase English)
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
    if (s.length !== t.length) {
        return false;
    }
    
    // Array for 26 letters (a-z)
    const count = new Array(26).fill(0);
    
    // Count characters
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        count[t.charCodeAt(i) - 'a'.charCodeAt(0)]--;
    }
    
    // Check if all counts are 0
    return count.every(c => c === 0);
}

// Alternative: Single loop
function isAnagramSingleLoop(s, t) {
    if (s.length !== t.length) return false;
    
    const count = new Array(26).fill(0);
    
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++; // 'a' = 97
        count[t.charCodeAt(i) - 97]--;
    }
    
    for (const c of count) {
        if (c !== 0) return false;
    }
    
    return true;
}

// Test
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Linear pass
- **Space Complexity**: `O(1)` - Fixed array size of 26

### Why is this the best?
- **Linear time**: Single pass
- **Constant space**: Fixed size array
- **Cache-friendly**: Array access faster than hash map
- **Simple**: Easy to understand and implement

---

## Visual Example

```
Input: s = "anagram", t = "nagaram"

Character Count Array (a-z indices):
Index:  0  1  2  3  4  5  6  7  8  9 ...
Char:   a  b  c  d  e  f  g  h  i  j ...

After processing 's':
Count: [3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
        a              g           m  n        r

After processing 't' (decrement):
Count: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

All zeros → Anagram! ✓
```

---

## Edge Cases

```javascript
// Different lengths
console.log(isAnagram("a", "ab")); // false

// Empty strings
console.log(isAnagram("", "")); // true

// Single character
console.log(isAnagram("a", "a")); // true
console.log(isAnagram("a", "b")); // false

// Same characters, different frequencies
console.log(isAnagram("aaab", "aabb")); // false

// All same characters
console.log(isAnagram("aaaa", "aaaa")); // true
```

---

## Follow-Up: Unicode Characters

### Problem
What if strings contain Unicode characters?

### Solution
Use hash map instead of array:

```javascript
/**
 * Unicode-safe version
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagramUnicode(s, t) {
    if (s.length !== t.length) return false;
    
    const count = new Map();
    
    // Count all characters in s
    for (const char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }
    
    // Decrement for characters in t
    for (const char of t) {
        const freq = count.get(char);
        if (!freq) return false;
        
        if (freq === 1) {
            count.delete(char);
        } else {
            count.set(char, freq - 1);
        }
    }
    
    return count.size === 0;
}

// Test with Unicode
console.log(isAnagramUnicode("你好", "好你")); // true
console.log(isAnagramUnicode("hello", "héllo")); // false
```

---

## Comparison of Approaches

| Approach | Time Complexity | Space Complexity | Best For |
|----------|----------------|------------------|----------|
| Permutations | O(n! × n) | O(n!) | ❌ Never |
| Sorting | O(n log n) | O(n) | ✅ Simple code |
| Hash Map | O(n) | O(1)* | ✅ Unicode |
| Array Count | O(n) | O(1) | ✅ English only (fastest) |

*O(1) for fixed character set (26 letters)

---

## Interview Tips

### What to discuss:

1. **Clarify inputs**: "Are the strings lowercase English only?"

2. **Length check**: "I'll check lengths first - different lengths can't be anagrams"

3. **Approach choice**:
   - "For lowercase English, I'll use a 26-element array for O(1) space"
   - "For Unicode, I'd use a hash map"

4. **Optimization**: "I can process both strings in a single loop"

### Follow-up Questions:

**Q: What if we need case-insensitive comparison?**
```javascript
function isAnagramCaseInsensitive(s, t) {
    return isAnagram(s.toLowerCase(), t.toLowerCase());
}
```

**Q: What if spaces and punctuation should be ignored?**
```javascript
function isAnagramIgnoreNonAlpha(s, t) {
    const clean = str => str.toLowerCase().replace(/[^a-z]/g, '');
    return isAnagram(clean(s), clean(t));
}
```

**Q: How to find all anagrams in an array?**
```javascript
function groupAnagrams(words) {
    const groups = new Map();
    
    for (const word of words) {
        const key = word.split('').sort().join('');
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(word);
    }
    
    return Array.from(groups.values());
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

---

## Related Problems

- [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- [438. Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)
- [567. Permutation in String](https://leetcode.com/problems/permutation-in-string/)

---

## Key Takeaways

✅ Character frequency counting is the optimal approach  
✅ Use array for fixed character sets (26 letters)  
✅ Use hash map for Unicode or unknown character sets  
✅ Always check lengths first for early exit  
✅ Sorting is acceptable but not optimal  

**Pattern**: Character frequency problems → Use counting (hash map or array)!
