# 79. Alien Dictionary

**LeetCode Link**: [269. Alien Dictionary](https://leetcode.com/problems/alien-dictionary/) (Premium)

**Difficulty**: Hard

**Topics**: String, Depth-First Search, Breadth-First Search, Graph, Topological Sort

---

## Problem Statement

There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.

You are given a list of strings `words` from the alien language's dictionary, where the strings are **sorted lexicographically** by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in **lexicographically increasing order** by the new language's rules. If there is no solution, return `""`. If there are multiple solutions, return **any** of them.

### Examples

**Example 1:**
```
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"
```

**Example 2:**
```
Input: words = ["z","x"]
Output: "zx"
```

**Example 3:**
```
Input: words = ["z","x","z"]
Output: "" (invalid - cycle)
```

### Constraints
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- `words[i]` consists of lowercase English letters

---

## Approach: Build Graph + Topological Sort ✅

### Implementation

```javascript
/**
 * Topological Sort - O(C) time where C = total chars in words
 * @param {string[]} words
 * @return {string}
 */
function alienOrder(words) {
    const graph = new Map();
    const indegree = new Map();
    
    // Initialize all unique chars
    for (const word of words) {
        for (const c of word) {
            if (!graph.has(c)) {
                graph.set(c, new Set());
                indegree.set(c, 0);
            }
        }
    }
    
    // Build graph from adjacent word pairs
    for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i], w2 = words[i + 1];
        const minLen = Math.min(w1.length, w2.length);
        
        if (w1.length > w2.length && w1.slice(0, minLen) === w2.slice(0, minLen)) {
            return ""; // Invalid: "abc" before "ab"
        }
        
        for (let j = 0; j < minLen; j++) {
            if (w1[j] !== w2[j]) {
                if (!graph.get(w1[j]).has(w2[j])) {
                    graph.get(w1[j]).add(w2[j]);
                    indegree.set(w2[j], indegree.get(w2[j]) + 1);
                }
                break;
            }
        }
    }
    
    // Kahn's BFS
    const queue = [];
    for (const [c, deg] of indegree) {
        if (deg === 0) queue.push(c);
    }
    
    let result = "";
    while (queue.length > 0) {
        const c = queue.shift();
        result += c;
        for (const next of graph.get(c)) {
            indegree.set(next, indegree.get(next) - 1);
            if (indegree.get(next) === 0) queue.push(next);
        }
    }
    
    return result.length === graph.size ? result : "";
}
```

### Complexity Analysis
- **Time**: `O(C)` - total characters
- **Space**: `O(1)` - at most 26 letters

---

## Key Takeaways

✅ Compare adjacent words to get order relations  
✅ First differing character gives edge u → v  
✅ Invalid if prefix order wrong (e.g. "ab" after "abc")  
✅ Topological sort (Kahn's) gives valid order  
✅ Cycle or wrong length → return ""  
✅ O(C) time  

**Pattern**: Order from comparisons → Build graph + topological sort!
