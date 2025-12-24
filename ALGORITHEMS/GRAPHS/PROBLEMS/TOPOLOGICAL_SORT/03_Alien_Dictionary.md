# 👽 Alien Dictionary

**LeetCode 269** | **Hard** | **Topological Sort - Graph Construction**

---

## 📝 Problem Description

There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.

You are given a list of strings `words` from the alien language's dictionary, where the strings in `words` are **sorted lexicographically** by the rules of this new language.

Return *a string of the unique letters in the new alien language sorted in **lexicographically increasing order** by the new language's rules*. If there is no solution, return `""`. If there are multiple solutions, return **any of them**.

### Example 1:

**Input:**

```
words = ["wrt","wrf","er","ett","rftt"]
```

**Output:**

```
"wertf"
```

**Explanation:**

```
Comparisons:
"wrt" < "wrf" → t < f
"wrf" < "er"  → w < e
"er" < "ett"  → r < t
"ett" < "rftt" → e < r

Graph edges:
t → f
w → e
r → t
e → r

Topological sort: w → e → r → t → f
Result: "wertf"
```

### Example 2:

**Input:**

```
words = ["z","x"]
```

**Output:**

```
"zx"
```

**Explanation:**

```
"z" < "x" → z < x
Result: "zx"
```

### Example 3:

**Input:**

```
words = ["z","x","z"]
```

**Output:**

```
""
```

**Explanation:**

```
"z" < "x" and "x" < "z" → contradiction!
Cycle detected → impossible → return ""
```

### Constraints:

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- `words[i]` consists of only lowercase English letters

---

## 💡 Intuition

This is a **topological sort with graph construction**:

### Key Steps:

1. **Build Graph**: Compare adjacent words to find character order
2. **Topological Sort**: Find valid ordering
3. **Handle Special Cases**: Cycles, prefix issues

### Graph Construction:

```
Compare adjacent words:
"wrt" vs "wrf"
 ↓
 w = w (same)
 r = r (same)
 t ≠ f → t comes before f
 
Create edge: t → f
```

### Prefix Edge Case:

```
["abc", "ab"] → INVALID!

Longer word cannot come before its prefix.
"abc" < "ab" is impossible.
Return "".
```

### Multiple Solutions:

```
words = ["z","x","y"]

z < x, z < y (but x and y not compared)

Valid: "zxy" or "zyx" ✅
```

---

## 🔍 Algorithm

### Main Steps:

1. **Extract All Characters**: Get set of unique chars
2. **Build Graph**:
   - Compare each pair of adjacent words
   - Find first differing character
   - Add edge from char1 → char2
   - Handle prefix case
3. **Topological Sort**: Use DFS or Kahn's
4. **Validate**: Check for cycles

### Building Graph from Words:

```javascript
for (let i = 0; i < words.length - 1; i++) {
  const word1 = words[i];
  const word2 = words[i + 1];

  // Find first difference
  for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
    if (word1[j] !== word2[j]) {
      // word1[j] comes before word2[j]
      graph.get(word1[j]).push(word2[j]);
      inDegree[word2[j]]++;
      break;
    }
  }

  // Check prefix case
  if (word1.length > word2.length && word1.startsWith(word2)) {
    return ""; // Invalid
  }
}
```

---

## 💻 Code

### Solution 1: DFS-Based

```javascript
/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function (words) {
  // Step 1: Extract all unique characters
  const chars = new Set();
  for (const word of words) {
    for (const char of word) {
      chars.add(char);
    }
  }

  // Step 2: Build graph
  const graph = new Map();
  for (const char of chars) {
    graph.set(char, []);
  }

  // Compare adjacent words
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];

    // Check prefix case
    if (
      word1.length > word2.length &&
      word1.startsWith(word2)
    ) {
      return ""; // Invalid ordering
    }

    // Find first difference
    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (word1[j] !== word2[j]) {
        graph.get(word1[j]).push(word2[j]);
        break;
      }
    }
  }

  // Step 3: Topological sort with DFS
  const state = new Map(); // 0=unvisited, 1=visiting, 2=visited
  for (const char of chars) {
    state.set(char, 0);
  }

  const result = [];

  function dfs(char) {
    if (state.get(char) === 1) return false; // Cycle
    if (state.get(char) === 2) return true; // Already visited

    state.set(char, 1); // Mark visiting

    for (const neighbor of graph.get(char)) {
      if (!dfs(neighbor)) return false;
    }

    state.set(char, 2); // Mark visited
    result.push(char);
    return true;
  }

  // DFS from all unvisited nodes
  for (const char of chars) {
    if (state.get(char) === 0) {
      if (!dfs(char)) return ""; // Cycle detected
    }
  }

  return result.reverse().join("");
};
```

### Solution 2: Kahn's Algorithm (BFS)

```javascript
/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function (words) {
  // Step 1: Extract all characters
  const chars = new Set();
  for (const word of words) {
    for (const char of word) {
      chars.add(char);
    }
  }

  // Step 2: Build graph and calculate in-degrees
  const graph = new Map();
  const inDegree = new Map();

  for (const char of chars) {
    graph.set(char, []);
    inDegree.set(char, 0);
  }

  // Compare adjacent words
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];

    // Prefix check
    if (
      word1.length > word2.length &&
      word1.startsWith(word2)
    ) {
      return "";
    }

    // Find first difference
    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (word1[j] !== word2[j]) {
        graph.get(word1[j]).push(word2[j]);
        inDegree.set(word2[j], inDegree.get(word2[j]) + 1);
        break;
      }
    }
  }

  // Step 3: Kahn's algorithm
  const queue = [];
  for (const [char, degree] of inDegree) {
    if (degree === 0) {
      queue.push(char);
    }
  }

  const result = [];

  while (queue.length > 0) {
    const char = queue.shift();
    result.push(char);

    for (const neighbor of graph.get(char)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);

      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  // Check if all characters are included
  return result.length === chars.size ? result.join("") : "";
};
```

---

## ⏱️ Time and Space Complexity

### Time Complexity: O(C)

where C = total length of all words

- Extract characters: O(C)
- Build graph: O(C)
- Topological sort: O(V + E) where V = unique chars, E = edges
- **Total: O(C)** (since V, E are bounded by alphabet size)

### Space Complexity: O(1) or O(26)

- Graph: O(V + E) = O(26) for lowercase English letters
- State/InDegree: O(V) = O(26)
- **Effectively O(1)** for fixed alphabet

---

## 🎯 Dry Run

### Input:

```
words = ["wrt","wrf","er","ett","rftt"]
```

### Step 1: Extract Characters

```
chars = {w, r, t, f, e}
```

### Step 2: Build Graph

| Comparison | First Diff | Edge | Graph Update |
| ---------- | ---------- | ---- | ------------ |
| "wrt" vs "wrf" | t ≠ f at index 2 | t → f | t:[f] |
| "wrf" vs "er" | w ≠ e at index 0 | w → e | w:[e] |
| "er" vs "ett" | r ≠ t at index 1 | r → t | r:[t] |
| "ett" vs "rftt" | e ≠ r at index 0 | e → r | e:[r] |

**Final Graph:**

```
w → [e]
e → [r]
r → [t]
t → [f]
f → []
```

### Step 3: Topological Sort (Kahn's)

**In-Degrees:**

```
w: 0
e: 1
r: 1
t: 1
f: 1
```

| Step | Queue | Process | InDegree Update | Result |
| ---- | ----- | ------- | --------------- | ------ |
| Init | [w] | - | [0,1,1,1,1] | [] |
| 1 | [e] | w | [0,0,1,1,1] | [w] |
| 2 | [r] | e | [0,0,0,1,1] | [w,e] |
| 3 | [t] | r | [0,0,0,0,1] | [w,e,r] |
| 4 | [f] | t | [0,0,0,0,0] | [w,e,r,t] |
| 5 | [] | f | [0,0,0,0,0] | [w,e,r,t,f] |

**Result: "wertf"** ✅

---

## 🎓 Key Takeaways

1. **Graph Construction**: Core challenge is building graph from comparisons
2. **Prefix Check**: Critical edge case to handle
3. **First Difference**: Only first differing char matters
4. **Cycle Detection**: Invalid if ordering has contradictions
5. **Bounded Alphabet**: O(1) space for fixed character set
6. **Both Approaches**: DFS and Kahn's both work well

---

## 📚 Related Problems

1. **Course Schedule II** (LeetCode 210) - Similar topological sort
2. **Sequence Reconstruction** (LeetCode 444) - Verify ordering
3. **Verify Alien Dictionary** (LeetCode 953) - Given ordering, verify words
4. **Largest Component Size** (LeetCode 952) - Graph connectivity

---

