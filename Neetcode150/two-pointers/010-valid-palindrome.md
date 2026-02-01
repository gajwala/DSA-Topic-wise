# 10. Valid Palindrome

**LeetCode Link**: [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

**Difficulty**: Easy

**Topics**: Two Pointers, String

---

## Problem Statement

A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

### Examples

**Example 1:**
```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

**Example 2:**
```
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

**Example 3:**
```
Input: s = " "
Output: true
Explanation: Empty string after removing non-alphanumeric is palindrome.
```

### Constraints
- `1 <= s.length <= 2 * 10^5`
- `s` consists only of printable ASCII characters

---

## Approach 1: Convert and Compare

### Intuition
Clean the string (lowercase + remove non-alphanumeric), then compare with its reverse.

### Implementation

```javascript
/**
 * Convert and Compare
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
    // Clean string: lowercase + keep only alphanumeric
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Compare with reverse
    const reversed = cleaned.split('').reverse().join('');
    
    return cleaned === reversed;
}

// Test
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Process string twice (clean + compare)
- **Space Complexity**: `O(n)` - Create new strings

### Can we do it without extra space?

---

## Approach 2: Two Pointers (Optimal!) ✅

### Intuition
Use two pointers from both ends. Skip non-alphanumeric characters. Compare characters in-place.

### Algorithm
1. Left pointer at start, right pointer at end
2. Move left pointer right until alphanumeric
3. Move right pointer left until alphanumeric
4. Compare characters (case-insensitive)
5. If mismatch, return false
6. Continue until pointers meet

### Implementation

```javascript
/**
 * Two Pointers - O(1) space
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric from left
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        
        // Skip non-alphanumeric from right
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        // Compare characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

function isAlphanumeric(char) {
    const code = char.charCodeAt(0);
    return (code >= 48 && code <= 57) ||  // 0-9
           (code >= 65 && code <= 90) ||  // A-Z
           (code >= 97 && code <= 122);   // a-z
}

// Alternative: Using regex
function isAlphanumericRegex(char) {
    return /[a-z0-9]/i.test(char);
}

// Test
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
console.log(isPalindrome("0P")); // false
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Single pass with two pointers
- **Space Complexity**: `O(1)` - No extra space!

### Why is this optimal?
- ✅ Single pass through string
- ✅ No extra string creation
- ✅ Constant space usage
- ✅ Early exit on mismatch

---

## Visual Example

```
Input: s = "A man, a plan, a canal: Panama"

Initial:
L                                 R
A   m a n ,   a   p l a n   a   c a n a l :   P a n a m a

Step 1: Skip non-alphanumeric
L                                                         R
A   m a n ,   a   p l a n   a   c a n a l :   P a n a m a
Compare 'A' vs 'a' (lowercase) → Match ✓

Step 2: Move pointers
    L                                                   R
A   m a n ,   a   p l a n   a   c a n a l :   P a n a m a
Skip ','
Compare 'm' vs 'm' → Match ✓

... Continue comparing ...

All characters match → Return true ✓
```

---

## Edge Cases

```javascript
// Empty string (after cleaning)
console.log(isPalindrome(" ")); // true
console.log(isPalindrome(".,!")); // true

// Single character
console.log(isPalindrome("a")); // true
console.log(isPalindrome("A")); // true

// Two characters
console.log(isPalindrome("aa")); // true
console.log(isPalindrome("ab")); // false

// Numbers
console.log(isPalindrome("0P")); // false
console.log(isPalindrome("121")); // true

// Mixed alphanumeric
console.log(isPalindrome("A1B2B1A")); // true (a1b2b1a)
console.log(isPalindrome("0a0")); // true

// All special characters with valid
console.log(isPalindrome("a.b,c:c!b?a")); // true (abccba)
```

---

## Common Mistakes

### ❌ Mistake 1: Not handling case sensitivity
```javascript
// Wrong
if (s[left] !== s[right]) return false; // Case matters!

// Correct
if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
```

### ❌ Mistake 2: Not skipping non-alphanumeric
```javascript
// Wrong
while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
}
// Doesn't skip spaces/punctuation!
```

### ❌ Mistake 3: Moving pointers incorrectly
```javascript
// Wrong
while (!isAlphanumeric(s[left])) left++;  // Missing bounds check
while (!isAlphanumeric(s[right])) right--;

// Correct  
while (left < right && !isAlphanumeric(s[left])) left++;
while (left < right && !isAlphanumeric(s[right])) right--;
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Should I ignore spaces and punctuation? Case-insensitive? Yes."

2. **Brute Force**: "Could clean string and compare with reverse - O(n) time, O(n) space"

3. **Optimization**: "Two pointers from both ends - O(n) time, O(1) space"

4. **Key points**: "Skip non-alphanumeric, compare case-insensitive"

### Follow-up Questions:

**Q: What if we keep spaces but ignore case?**
```javascript
function isPalindromeWithSpaces(s) {
    s = s.toLowerCase();
    let left = 0, right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    
    return true;
}
```

**Q: What if string is very long (streaming)?**
A: Two pointers still work, can process in chunks.

**Q: What about Unicode characters?**
```javascript
function isAlphanumericUnicode(char) {
    return /[a-z0-9]/iu.test(char); // 'u' flag for Unicode
}
```

---

## Related Problems

- [680. Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/)
- [9. Palindrome Number](https://leetcode.com/problems/palindrome-number/)
- [234. Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)
- [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

---

## Key Takeaways

✅ Two pointers optimal for palindrome checking  
✅ Skip non-alphanumeric characters  
✅ Case-insensitive comparison  
✅ O(1) space vs O(n) space with string manipulation  
✅ Bounds checking crucial when skipping characters  

**Pattern**: Palindrome validation → Two pointers from both ends!
