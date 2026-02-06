# 74. Word Ladder

**LeetCode Link**: [127. Word Ladder](https://leetcode.com/problems/word-ladder/)

**Difficulty**: Hard

**Topics**: String, Breadth-First Search, Hash Table

---

## Problem Statement

A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words such that:
- First word is `beginWord`
- Last word is `endWord`
- Only one letter is changed at a time
- Each transformed word must exist in `wordList`

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the **number of words** in the **shortest transformation sequence**, or `0` if no such sequence exists.

### Examples

**Example 1:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: hit -> hot -> dot -> dog -> cog (5 words)
```

**Example 2:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
```

### Constraints
- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`

---

## Approach: BFS (Optimal!) ✅

### Implementation

```javascript
/**
 * BFS - O(M²*N) time, O(M*N) space
 * M = word length, N = wordList size
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue = [[beginWord, 1]];
    const visited = new Set([beginWord]);
    
    while (queue.length > 0) {
        const [word, steps] = queue.shift();
        if (word === endWord) return steps;
        
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) {
                const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, steps + 1]);
                }
            }
        }
    }
    
    return 0;
}
```

### Complexity Analysis
- **Time**: `O(M² * N)` - For each word, try M positions × 26 letters; N words in set
- **Space**: `O(M * N)`

---

## Key Takeaways

✅ Shortest path ⇒ BFS  
✅ Each word = node; one-letter change = edge  
✅ Generate neighbors by changing each position to 'a'-'z'  
✅ Use Set for O(1) lookup  
✅ Return steps (number of words in path)  

**Pattern**: Shortest path in implicit graph → BFS!
