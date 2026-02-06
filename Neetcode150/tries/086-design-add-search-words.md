# 86. Design Add and Search Words Data Structure

**LeetCode Link**: [211. Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)

**Difficulty**: Medium

**Topics**: String, Depth-First Search, Design, Trie

---

## Problem Statement

Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the `WordDictionary` class:
- `WordDictionary()` Initializes the object.
- `void addWord(word)` Adds `word` to the data structure, it can be matched later.
- `bool search(word)` Returns `true` if there is any string in the data structure that matches `word` or `false` otherwise. `word` may contain dots `'.'` where dots can be matched with any letter.

### Examples

**Example 1:**
```
Input: ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
       [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output: [null,null,null,null,false,true,true,true]
```

### Constraints
- `1 <= word.length <= 25`
- `word` in addWord consists of lowercase letters.
- `word` in search consists of '.' or lowercase letters.
- At most `10^4` calls to addWord and search.

---

## Approach: Trie + DFS for Wildcard ✅

### Implementation

```javascript
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

/**
 * WordDictionary - Trie with DFS for '.'
 */
class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }
    
    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEndOfWord = true;
    }
    
    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        function dfs(node, index) {
            if (index === word.length) {
                return node.isEndOfWord;
            }
            const char = word[index];
            if (char === '.') {
                for (const child of node.children.values()) {
                    if (dfs(child, index + 1)) return true;
                }
                return false;
            }
            if (!node.children.has(char)) return false;
            return dfs(node.children.get(char), index + 1);
        }
        return dfs(this.root, 0);
    }
}

// Test
const wd = new WordDictionary();
wd.addWord("bad");
wd.addWord("dad");
wd.addWord("mad");
console.log(wd.search("pad")); // false
console.log(wd.search("bad")); // true
console.log(wd.search(".ad")); // true
console.log(wd.search("b..")); // true
```

### Complexity Analysis
- **Time**: addWord O(m), search O(m) for no dots; with dots O(26^m) worst case
- **Space**: O(n * m)

---

## Key Takeaways

✅ Same Trie as before for addWord  
✅ search: when char is '.', try all children (DFS)  
✅ Base case: index === word.length → return node.isEndOfWord  
✅ O(m) add; search with dots can be expensive  
✅ Pattern: Trie + backtracking for wildcard  

**Pattern**: Trie with wildcard search → DFS over children!
