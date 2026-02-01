# 4. Group Anagrams

**LeetCode Link**: [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/)

**Difficulty**: Medium

**Topics**: Array, Hash Table, String, Sorting

---

## Problem Statement

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Examples

**Example 1:**
```
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

**Example 2:**
```
Input: strs = [""]
Output: [[""]]
```

**Example 3:**
```
Input: strs = ["a"]
Output: [["a"]]
```

### Constraints
- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters

---

## Approach 1: Brute Force (Compare All Pairs)

### Intuition
Compare each string with every other string to check if they're anagrams.

### Algorithm
1. For each string, create a new group
2. Compare with all other strings using anagram check
3. Add matching strings to the same group

### Implementation

```javascript
/**
 * Brute Force - O(n² × k log k)
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
    const result = [];
    const used = new Set();
    
    function isAnagram(s, t) {
        if (s.length !== t.length) return false;
        const sorted1 = s.split('').sort().join('');
        const sorted2 = t.split('').sort().join('');
        return sorted1 === sorted2;
    }
    
    for (let i = 0; i < strs.length; i++) {
        if (used.has(i)) continue;
        
        const group = [strs[i]];
        used.add(i);
        
        for (let j = i + 1; j < strs.length; j++) {
            if (!used.has(j) && isAnagram(strs[i], strs[j])) {
                group.push(strs[j]);
                used.add(j);
            }
        }
        
        result.push(group);
    }
    
    return result;
}

// Test
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

### Complexity Analysis
- **Time Complexity**: `O(n² × k log k)` where n = number of strings, k = max length
  - O(n²) to compare all pairs
  - O(k log k) to sort each string for comparison
- **Space Complexity**: `O(n)`

### Why is this bad?
- Quadratic comparisons
- Redundant sorting
- Very slow for large inputs

---

## Approach 2: Sorting as Key (Good) ✅

### Intuition
Anagrams will have the same characters when sorted. Use sorted string as hash map key.

### Algorithm
1. Create a hash map
2. For each string:
   - Sort the string
   - Use sorted string as key
   - Add original string to that key's array
3. Return all values from hash map

### Implementation

```javascript
/**
 * Sorting as Key Approach
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
    const map = new Map();
    
    for (const str of strs) {
        // Sort string to create key
        const key = str.split('').sort().join('');
        
        // Add to group
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    // Return all groups
    return Array.from(map.values());
}

// Alternative: Using object
function groupAnagramsObject(strs) {
    const groups = {};
    
    for (const str of strs) {
        const key = str.split('').sort().join('');
        
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(str);
    }
    
    return Object.values(groups);
}

// Test
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

### Complexity Analysis
- **Time Complexity**: `O(n × k log k)` where n = strings, k = max length
  - O(n) to iterate through strings
  - O(k log k) to sort each string
- **Space Complexity**: `O(n × k)` to store all strings

### Good solution, but can we avoid sorting?

---

## Approach 3: Character Count as Key (Optimal) ✅

### Intuition
Instead of sorting, use character frequency as the key. Anagrams have identical character frequencies.

### Algorithm
1. Create hash map
2. For each string:
   - Count character frequencies
   - Create unique key from frequency (e.g., "a1b2c1")
   - Add string to that key's group
3. Return all values

### Implementation

```javascript
/**
 * Character Count as Key (Optimal)
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
    const map = new Map();
    
    for (const str of strs) {
        // Create frequency key
        const count = new Array(26).fill(0);
        
        for (const char of str) {
            count[char.charCodeAt(0) - 97]++; // 'a' = 97
        }
        
        // Use count array as key (convert to string)
        const key = count.join('#'); // e.g., "1#0#0#1#1#0#..."
        
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
}

// Alternative: More readable key format
function groupAnagramsReadable(strs) {
    const map = new Map();
    
    for (const str of strs) {
        // Count characters
        const count = new Array(26).fill(0);
        for (const char of str) {
            count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        
        // Create key like "a1e1t1" for "eat"
        let key = '';
        for (let i = 0; i < 26; i++) {
            if (count[i] > 0) {
                key += String.fromCharCode(i + 97) + count[i];
            }
        }
        
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
}

// Test
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
console.log(groupAnagrams([""]));
console.log(groupAnagrams(["a"]));
```

### Complexity Analysis
- **Time Complexity**: `O(n × k)` where n = strings, k = max string length
  - O(n) to iterate through strings
  - O(k) to count characters in each string
  - **Better than sorting!**
- **Space Complexity**: `O(n × k)` to store all strings

### Why is this optimal?
- **Linear per string**: No sorting needed
- **Constant space for key**: Array of 26 elements
- **Efficient**: Best possible time complexity

---

## Visual Example

```
Input: ["eat", "tea", "tan", "ate", "nat", "bat"]

Processing "eat":
  Frequency: e=1, a=1, t=1
  Key: "1#1#0#0#1#0#..." (or "a1e1t1")
  map = { "a1e1t1": ["eat"] }

Processing "tea":
  Frequency: t=1, e=1, a=1  (same as "eat"!)
  Key: "1#1#0#0#1#0#..."
  map = { "a1e1t1": ["eat", "tea"] }

Processing "tan":
  Frequency: t=1, a=1, n=1
  Key: "1#0#0#0#1#0#0#0#0#0#0#0#0#1#..."
  map = { 
    "a1e1t1": ["eat", "tea"],
    "a1n1t1": ["tan"]
  }

Processing "ate":
  Frequency: a=1, t=1, e=1 (same as "eat"!)
  map = {
    "a1e1t1": ["eat", "tea", "ate"],
    "a1n1t1": ["tan"]
  }

Processing "nat":
  Frequency: n=1, a=1, t=1 (same as "tan"!)
  map = {
    "a1e1t1": ["eat", "tea", "ate"],
    "a1n1t1": ["tan", "nat"]
  }

Processing "bat":
  Frequency: b=1, a=1, t=1
  map = {
    "a1e1t1": ["eat", "tea", "ate"],
    "a1n1t1": ["tan", "nat"],
    "a1b1t1": ["bat"]
  }

Result: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

---

## Edge Cases

```javascript
// Empty string
console.log(groupAnagrams([""])); // [[""]]

// Single string
console.log(groupAnagrams(["a"])); // [["a"]]

// All same
console.log(groupAnagrams(["a","a","a"])); // [["a","a","a"]]

// No anagrams
console.log(groupAnagrams(["abc","def","ghi"])); // [["abc"],["def"],["ghi"]]

// All anagrams
console.log(groupAnagrams(["abc","bca","cab","bac","cba","acb"]));
// [["abc","bca","cab","bac","cba","acb"]]

// Different lengths
console.log(groupAnagrams(["a","ab","abc"])); // [["a"],["ab"],["abc"]]
```

---

## Comparison of Approaches

| Approach | Time Complexity | Space Complexity | Notes |
|----------|----------------|------------------|-------|
| Brute Force | O(n² × k log k) | O(n × k) | ❌ Too slow |
| Sorting Key | O(n × k log k) | O(n × k) | ✅ Good, common solution |
| Character Count | O(n × k) | O(n × k) | ✅ Optimal! |

---

## Interview Tips

### What to say:

1. **Clarify**: "Are all strings lowercase English letters?"

2. **Naive approach**: "I could compare every pair using sorted strings as keys"

3. **Optimization**: "Better approach: use sorted string as hash map key - O(n × k log k)"

4. **Further optimization**: "Best approach: use character frequency as key - O(n × k)"

5. **Trade-offs**: "Sorting is simpler to implement, character counting is faster"

### Follow-up Questions:

**Q: What if strings contain Unicode characters?**
A: Character counting still works with Map, but array size would be larger

**Q: What if we want case-insensitive grouping?**
```javascript
function groupAnagramsCaseInsensitive(strs) {
    const map = new Map();
    
    for (const str of strs) {
        const key = str.toLowerCase().split('').sort().join('');
        
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
}
```

**Q: What if we only want to return anagram groups with more than 1 string?**
```javascript
function groupAnagrams(strs) {
    const map = new Map();
    
    for (const str of strs) {
        const key = str.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(str);
    }
    
    // Filter groups with more than 1 string
    return Array.from(map.values()).filter(group => group.length > 1);
}
```

---

## Related Problems

- [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/)
- [438. Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)
- [249. Group Shifted Strings](https://leetcode.com/problems/group-shifted-strings/)

---

## Key Takeaways

✅ Use hash map to group items by common property  
✅ Sorted string works as anagram key  
✅ Character frequency is faster than sorting  
✅ Array of 26 for lowercase English letters  
✅ Map values give you the groups  

**Pattern**: When grouping items by similarity → Hash map with unique key representation!
