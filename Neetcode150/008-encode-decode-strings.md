# 8. Encode and Decode Strings

**LeetCode Link**: [271. Encode and Decode Strings](https://leetcode.com/problems/encode-and-decode-strings/) **(Premium)**

**Difficulty**: Medium

**Topics**: Array, String, Design

---

## Problem Statement

Design an algorithm to encode a list of strings to a single string. The encoded string is then decoded back to the original list of strings.

Implement:
- `encode(strs)` - Encodes a list of strings to a single string
- `decode(s)` - Decodes a single string to the original list

### Examples

**Example 1:**
```
Input: strs = ["Hello","World"]
Output: ["Hello","World"]
Explanation:
  encode: "Hello" + "World" → "5#Hello5#World"
  decode: "5#Hello5#World" → ["Hello", "World"]
```

**Example 2:**
```
Input: strs = [""]
Output: [""]
```

**Example 3:**
```
Input: strs = ["a","b","c"]
Output: ["a","b","c"]
```

### Constraints
- `0 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` contains any possible characters including special characters

---

## Approach 1: Delimiter (Broken!)

### Intuition
Use a delimiter like `','` or `'|'` to separate strings. **But this fails if strings contain the delimiter!**

### Implementation

```javascript
/**
 * Naive Delimiter Approach (BROKEN!)
 * @param {string[]} strs
 * @return {string}
 */
function encode(strs) {
    return strs.join(',');
}

/**
 * @param {string} s
 * @return {string[]}
 */
function decode(s) {
    return s.split(',');
}

// Test - Breaks with delimiter in string!
console.log(encode(["Hello", "World"])); // "Hello,World" ✓
console.log(decode("Hello,World")); // ["Hello", "World"] ✓

// BREAKS:
console.log(encode(["a,b", "c"])); // "a,b,c"
console.log(decode("a,b,c")); // ["a", "b", "c"] ✗ Should be ["a,b", "c"]
```

### Why this fails?
- ❌ If any string contains the delimiter, decoding is ambiguous
- ❌ Can't distinguish between delimiter and actual character

---

## Approach 2: Escape Delimiter (Complex!)

### Intuition
Escape the delimiter character in strings. But gets complex with nested escaping.

### Implementation

```javascript
/**
 * Escape Delimiter Approach (Complex!)
 */
function encode(strs) {
    // Replace all ',' with '\,' then join with ','
    return strs.map(s => s.replace(/,/g, '\\,')).join(',');
}

function decode(s) {
    // Split by unescaped ','
    const result = [];
    let current = '';
    let i = 0;
    
    while (i < s.length) {
        if (s[i] === '\\' && s[i + 1] === ',') {
            current += ',';
            i += 2;
        } else if (s[i] === ',') {
            result.push(current);
            current = '';
            i++;
        } else {
            current += s[i];
            i++;
        }
    }
    
    result.push(current);
    return result;
}

// Test
console.log(encode(["a,b", "c"])); // "a\\,b,c"
console.log(decode("a\\,b,c")); // ["a,b", "c"] ✓
```

### Issues:
- ❌ Complex logic
- ❌ What if strings contain `'\,'`?
- ❌ Error-prone

---

## Approach 3: Length Prefix (Optimal!) ✅

### Intuition
Prefix each string with its length and a delimiter. Format: `length# string`. Since we know the length, we can read exactly that many characters.

### Algorithm

**Encode:**
1. For each string, prepend `length + '#'`
2. Concatenate all encoded strings

**Decode:**
1. Read length until '#'
2. Read exactly that many characters
3. Repeat until end

### Implementation

```javascript
/**
 * Length Prefix Encoding (Optimal!)
 * @param {string[]} strs
 * @return {string}
 */
function encode(strs) {
    let encoded = '';
    
    for (const str of strs) {
        // Format: "length#string"
        encoded += str.length + '#' + str;
    }
    
    return encoded;
}

/**
 * @param {string} s
 * @return {string[]}
 */
function decode(s) {
    const result = [];
    let i = 0;
    
    while (i < s.length) {
        // Read length until '#'
        let j = i;
        while (s[j] !== '#') {
            j++;
        }
        
        const length = parseInt(s.substring(i, j));
        
        // Read exactly 'length' characters after '#'
        const str = s.substring(j + 1, j + 1 + length);
        result.push(str);
        
        // Move to next encoded string
        i = j + 1 + length;
    }
    
    return result;
}

// Test
console.log(encode(["Hello", "World"])); // "5#Hello5#World"
console.log(decode("5#Hello5#World")); // ["Hello", "World"]

console.log(encode(["a,b", "c#d"])); // "3#a,b3#c#d"
console.log(decode("3#a,b3#c#d")); // ["a,b", "c#d"] ✓

console.log(encode([""])); // "0#"
console.log(decode("0#")); // [""]

console.log(encode(["abc", "", "xyz"])); // "3#abc0#3#xyz"
console.log(decode("3#abc0#3#xyz")); // ["abc", "", "xyz"]
```

### Complexity Analysis
- **Time Complexity**: 
  - Encode: `O(n)` where n is total length of all strings
  - Decode: `O(n)` single pass
- **Space Complexity**: `O(n)` for encoded string

### Why is this optimal?
- ✅ Works with ANY characters (including delimiters)
- ✅ Simple and elegant
- ✅ No escaping needed
- ✅ Efficient - single pass for both operations

---

## Visual Example

```
Input: ["Hello", "World", "Test"]

Encoding Process:
─────────────────
"Hello" → length = 5 → "5#Hello"
"World" → length = 5 → "5#World"
"Test"  → length = 4 → "4#Test"

Encoded: "5#Hello5#World4#Test"

Decoding Process:
─────────────────
Start at i = 0

Step 1:
  Read until '#': "5"
  Length = 5
  Read 5 chars after '#': "Hello"
  Add "Hello" to result
  Move i to position 7

Step 2:
  Read until '#': "5"
  Length = 5
  Read 5 chars after '#': "World"
  Add "World" to result
  Move i to position 14

Step 3:
  Read until '#': "4"
  Length = 4
  Read 4 chars after '#': "Test"
  Add "Test" to result
  Done!

Result: ["Hello", "World", "Test"] ✓
```

---

## Edge Cases

```javascript
// Empty list
console.log(encode([])); // ""
console.log(decode("")); // []

// Single empty string
console.log(encode([""])); // "0#"
console.log(decode("0#")); // [""]

// Multiple empty strings
console.log(encode(["", "", ""])); // "0#0#0#"
console.log(decode("0#0#0#")); // ["", "", ""]

// Strings with special characters
console.log(encode(["a#b", "c#d#e"])); // "3#a#b5#c#d#e"
console.log(decode("3#a#b5#c#d#e")); // ["a#b", "c#d#e"]

// Strings with numbers
console.log(encode(["123", "456"])); // "3#1233#456"
console.log(decode("3#1233#456")); // ["123", "456"]

// Long strings
const long = "a".repeat(200);
console.log(encode([long])); // "200#aaa...aaa"
console.log(decode("200#" + long)); // [long]
```

---

## Alternative: Chunked Encoding

```javascript
/**
 * Alternative: Use non-printable character
 * (Less portable but simpler)
 */
function encodeAlt(strs) {
    // Use ASCII 1 (SOH - Start of Heading) as delimiter
    return strs.join('\x01');
}

function decodeAlt(s) {
    return s.split('\x01');
}

// Works unless strings contain \x01
console.log(encodeAlt(["Hello", "World"])); // "Hello\x01World"
console.log(decodeAlt("Hello\x01World")); // ["Hello", "World"]
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Can strings contain any characters? Even delimiters? Yes."

2. **Naive approach**: "Simple delimiter doesn't work - ambiguous if strings contain delimiter"

3. **Escaping**: "Could escape delimiter but gets complex with nested escaping"

4. **Optimal**: "Length prefix is clean - format: `length#string`"

5. **Why it works**: "Knowing exact length, we read that many characters. No ambiguity."

### Follow-up Questions:

**Q: What if we need to minimize encoded size?**
A: Length prefix is efficient. Could use variable-length encoding for lengths, but adds complexity.

**Q: What about binary data?**
A: Length prefix works perfectly - doesn't matter what bytes are in the string.

**Q: Can we use JSON?**
```javascript
function encode(strs) {
    return JSON.stringify(strs);
}

function decode(s) {
    return JSON.parse(s);
}
```
**A:** Yes, but problem asks for custom implementation. JSON is heavier overhead.

---

## Related Problems

- [443. String Compression](https://leetcode.com/problems/string-compression/)
- [394. Decode String](https://leetcode.com/problems/decode-string/)
- [535. Encode and Decode TinyURL](https://leetcode.com/problems/encode-and-decode-tinyurl/)

---

## Key Takeaways

✅ Simple delimiters fail when strings contain delimiter  
✅ Length prefix encoding is robust for any characters  
✅ Format: `length#string` for each string  
✅ Decoding: read length, then exactly that many chars  
✅ Works with special characters, empty strings, anything!  

**Pattern**: String encoding with arbitrary content → Length prefix!
