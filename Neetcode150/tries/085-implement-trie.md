# 85. Implement Trie (Prefix Tree)

**LeetCode Link**: [208. Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)

**Difficulty**: Medium

**Topics**: Hash Table, String, Design, Trie

---

## Problem Statement

A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure such as autocomplete and spellchecker.

Implement the Trie class:
- `Trie()` Initializes the trie object.
- `void insert(String word)` Inserts the string `word` into the trie.
- `boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted before), and `false` otherwise.
- `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.

### Examples

**Example 1:**
```
Input: ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
       [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output: [null, null, true, false, true, null, true]
```

### Constraints
- `1 <= word.length, prefix.length <= 2000`
- `word` and `prefix` consist only of lowercase English letters.
- At most `3 * 10^4` calls total to `insert`, `search`, and `startsWith`.

---

## Approach: Trie Node with Children Map ✅

### Implementation

```javascript
/**
 * Trie Node
 */
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

/**
 * Trie - O(m) per operation, m = word length
 */
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    /**
     * @param {string} word
     * @return {void}
     */
    insert(word) {
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
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) return false;
            node = node.children.get(char);
        }
        return node.isEndOfWord;
    }
    
    /**
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children.has(char)) return false;
            node = node.children.get(char);
        }
        return true;
    }
}

// Test
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));   // true
console.log(trie.search("app"));    // false
console.log(trie.startsWith("app")); // true
trie.insert("app");
console.log(trie.search("app"));    // true
```

### Complexity Analysis
- **Time**: `O(m)` per insert, search, startsWith (m = word/prefix length)
- **Space**: `O(n * m)` where n = number of words, m = avg length

---

## Using Array Instead of Map (a-z only)

```javascript
class TrieNode {
    constructor() {
        this.children = new Array(26).fill(null);
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    _index(c) {
        return c.charCodeAt(0) - 'a'.charCodeAt(0);
    }
    
    insert(word) {
        let node = this.root;
        for (const char of word) {
            const i = this._index(char);
            if (!node.children[i]) node.children[i] = new TrieNode();
            node = node.children[i];
        }
        node.isEndOfWord = true;
    }
    
    search(word) {
        let node = this.root;
        for (const char of word) {
            const i = this._index(char);
            if (!node.children[i]) return false;
            node = node.children[i];
        }
        return node.isEndOfWord;
    }
    
    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            const i = this._index(char);
            if (!node.children[i]) return false;
            node = node.children[i];
        }
        return true;
    }
}
```

---

## Key Takeaways

✅ Each node: children (Map or array[26]) + isEndOfWord  
✅ insert: traverse/create nodes, set isEndOfWord at end  
✅ search: traverse, return true only if isEndOfWord at end  
✅ startsWith: traverse, return true if path exists  
✅ O(m) per operation  

**Pattern**: Prefix/word storage → Trie!
