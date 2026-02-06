# 87. Word Search II

**LeetCode Link**: [212. Word Search II](https://leetcode.com/problems/word-search-ii/)

**Difficulty**: Hard

**Topics**: Array, String, Backtracking, Trie, Matrix

---

## Problem Statement

Given an `m x n` board of characters and a list of strings `words`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

### Examples

**Example 1:**
```
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
       words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
```

**Example 2:**
```
Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
```

### Constraints
- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 12`
- `1 <= words.length <= 3 * 10^4`

---

## Approach: Trie + Backtracking (DFS) ✅

### Implementation

```javascript
/**
 * Trie + DFS - O(m*n*4^L) per word length L, optimized with Trie
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
function findWords(board, words) {
    const trie = buildTrie(words);
    const rows = board.length;
    const cols = board[0].length;
    const result = new Set();
    
    function dfs(r, c, node, path) {
        if (node.word) {
            result.add(node.word);
            node.word = null; // Avoid duplicate
        }
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        const char = board[r][c];
        const next = node.children.get(char);
        if (!next) return;
        
        board[r][c] = '#'; // Mark visited
        dfs(r+1, c, next, path+char);
        dfs(r-1, c, next, path+char);
        dfs(r, c+1, next, path+char);
        dfs(r, c-1, next, path+char);
        board[r][c] = char; // Backtrack
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            dfs(r, c, trie.root, '');
        }
    }
    
    return [...result];
}

function buildTrie(words) {
    const root = { children: new Map(), word: null };
    for (const word of words) {
        let node = root;
        for (const char of word) {
            if (!node.children.has(char)) node.children.set(char, { children: new Map(), word: null });
            node = node.children.get(char);
        }
        node.word = word;
    }
    return { root };
}
```

### Complexity Analysis
- **Time**: O(W * L) build trie + O(m * n * 4^L) DFS in worst case (L = max word length)
- **Space**: O(W * L) trie + O(L) recursion

---

## Key Takeaways

✅ Build Trie from words; store full word at end node (node.word)  
✅ For each cell, DFS with current Trie node  
✅ If node.word exists, add to result and clear to avoid duplicates  
✅ Mark cell visited during DFS, backtrack after  
✅ Trie prunes when no matching child  
✅ O(m*n*4^L) but Trie cuts many branches  

**Pattern**: Multiple words in grid → Trie + backtracking!

**Tries Complete! (3/3) ✅**
