# 🔍 Sequence Reconstruction

**LeetCode 444** | **Medium** | **Topological Sort - Unique Ordering**

---

## 📝 Problem Description

Check whether the original sequence `org` can be uniquely reconstructed from the sequences in `seqs`. The `org` sequence is a permutation of the integers from `1` to `n`, with `1 ≤ n ≤ 10^4`. Reconstruction means building a shortest common supersequence of the sequences in `seqs` (i.e., a shortest sequence so that all sequences in `seqs` are subsequences of it). Determine whether there is only one sequence that can be reconstructed from `seqs` and it is the `org` sequence.

### Example 1:

**Input:**

```
org = [1,2,3]
seqs = [[1,2],[1,3]]
```

**Output:**

```
false
```

**Explanation:**

```
From seqs:
1 < 2 (from [1,2])
1 < 3 (from [1,3])

But no relationship between 2 and 3!
Possible orderings: [1,2,3] or [1,3,2]
Not unique → false
```

### Example 2:

**Input:**

```
org = [1,2,3]
seqs = [[1,2],[1,3],[2,3]]
```

**Output:**

```
true
```

**Explanation:**

```
From seqs:
1 < 2 (from [1,2])
1 < 3 (from [1,3])
2 < 3 (from [2,3])

Only possible ordering: [1,2,3] ✅
Matches org!
```

### Example 3:

**Input:**

```
org = [4,1,5,2,6,3]
seqs = [[5,2,6,3],[4,1,5,2]]
```

**Output:**

```
true
```

### Constraints:

- `1 <= n <= 10^4`
- `org` is a permutation of `{1, 2, ..., n}`
- `seqs[i]` is a subsequence of `org`

---

## 💡 Intuition

This problem checks if **topological sort produces unique ordering**:

### Key Insight:

```
Unique topological ordering exists ↔ At each step, exactly ONE node has in-degree 0
```

### Why Multiple Orderings Happen:

```
Example: [1,2], [1,3]

Graph:
  1
 / \
2   3

At step 2, BOTH 2 and 3 have in-degree 0
Can choose either → NOT unique!
```

### Unique Ordering Conditions:

1. **Single source at each step**: Only one node with in-degree 0
2. **Covers all numbers**: Graph includes all nodes from 1 to n
3. **Matches org**: The unique ordering equals org

### Strategy:

Use **Kahn's algorithm** and check:
- Queue size = 1 at each step (uniqueness)
- Extracted node matches org at each position
- All nodes processed (completeness)

---

## 🔍 Algorithm

### Kahn's Algorithm with Uniqueness Check:

1. **Build graph** from subsequences
2. **Calculate in-degrees**
3. **Modified Kahn's**:
   - At each step, check queue size = 1
   - Check if node matches org[index]
   - Process only if both conditions met
4. **Verify**: All n nodes processed

### Building Graph from Sequences:

```javascript
for (const seq of seqs) {
  for (let i = 0; i < seq.length - 1; i++) {
    // seq[i] comes before seq[i+1]
    graph.get(seq[i]).add(seq[i + 1]);
    // Use Set to avoid duplicate edges
  }
}
```

---

## 💻 Code

### Solution 1: Kahn's with Uniqueness Check

```javascript
/**
 * @param {number[]} org
 * @param {number[][]} seqs
 * @return {boolean}
 */
var sequenceReconstruction = function (org, seqs) {
  const n = org.length;

  // Build graph and calculate in-degrees
  const graph = new Map();
  const inDegree = new Map();

  // Initialize for all nodes in org
  for (const num of org) {
    graph.set(num, new Set());
    inDegree.set(num, 0);
  }

  // Check if seqs covers all numbers
  const allNums = new Set();
  for (const seq of seqs) {
    for (const num of seq) {
      allNums.add(num);
      // Check if num is in valid range
      if (num < 1 || num > n) return false;
    }
  }

  // Must have all numbers from org
  if (allNums.size < n) return false;

  // Build graph from sequences
  for (const seq of seqs) {
    for (let i = 0; i < seq.length - 1; i++) {
      const from = seq[i];
      const to = seq[i + 1];

      // Add edge if not already present
      if (!graph.get(from).has(to)) {
        graph.get(from).add(to);
        inDegree.set(to, inDegree.get(to) + 1);
      }
    }
  }

  // Kahn's algorithm with uniqueness check
  const queue = [];

  for (const [num, degree] of inDegree) {
    if (degree === 0) {
      queue.push(num);
    }
  }

  let index = 0;

  while (queue.length > 0) {
    // Must have exactly ONE choice for unique ordering
    if (queue.length !== 1) return false;

    const num = queue.shift();

    // Must match org sequence
    if (num !== org[index]) return false;

    index++;

    // Reduce in-degree for neighbors
    for (const neighbor of graph.get(num)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);

      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  // Check if all nodes processed
  return index === n;
};
```

### Solution 2: DFS-Based (Alternative)

```javascript
/**
 * @param {number[]} org
 * @param {number[][]} seqs
 * @return {boolean}
 */
var sequenceReconstruction = function (org, seqs) {
  const n = org.length;

  // Build graph
  const graph = new Map();
  for (const num of org) {
    graph.set(num, new Set());
  }

  // Check coverage and build graph
  const allNums = new Set();
  for (const seq of seqs) {
    for (const num of seq) {
      allNums.add(num);
      if (num < 1 || num > n) return false;
    }

    for (let i = 0; i < seq.length - 1; i++) {
      graph.get(seq[i]).add(seq[i + 1]);
    }
  }

  if (allNums.size < n) return false;

  // Check uniqueness: for each pair (org[i], org[i+1]),
  // there should be a direct edge
  for (let i = 0; i < n - 1; i++) {
    if (!graph.get(org[i]).has(org[i + 1])) {
      return false;
    }
  }

  // Check no other edges exist that would allow different ordering
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 2; j < n; j++) {
      // If there's an edge skipping org[i+1], not unique
      if (graph.get(org[i]).has(org[j])) {
        // Check if it's redundant (path via i+1...j-1 exists)
        let redundant = true;
        for (let k = i; k < j; k++) {
          if (!graph.get(org[k]).has(org[k + 1])) {
            redundant = false;
            break;
          }
        }
        if (!redundant) return false;
      }
    }
  }

  return true;
};
```

---

## ⏱️ Time and Space Complexity

### Time Complexity: O(V + E)

- Build graph: O(E) where E = total elements in seqs
- Kahn's: O(V + E)
- Total: O(V + E)

### Space Complexity: O(V + E)

- Graph: O(V + E)
- In-degree map: O(V)

---

## 🎯 Dry Run

### Example 1:

**Input:**

```
org = [1,2,3]
seqs = [[1,2],[1,3]]
```

**Graph:**

```
  1
 / \
2   3

In-degrees: {1:0, 2:1, 3:1}
```

**Kahn's Execution:**

| Step | Queue | Process | Queue After | Match org? |
| ---- | ----- | ------- | ----------- | ---------- |
| Init | [1] | - | [1] | - |
| 1 | [1] | 1 | [2,3] | 1 = org[0] ✅ |
| 2 | [2,3] | - | - | Queue size > 1 → **false** ❌ |

**Result: false** (Not unique)

### Example 2:

**Input:**

```
org = [1,2,3]
seqs = [[1,2],[1,3],[2,3]]
```

**Graph:**

```
1 → 2 → 3
 \    /
  ---

In-degrees: {1:0, 2:1, 3:2}
```

**Kahn's Execution:**

| Step | Queue | Process | Match | Queue After | Valid? |
| ---- | ----- | ------- | ----- | ----------- | ------ |
| Init | [1] | - | - | [1] | Size=1 ✅ |
| 1 | [1] | 1 | org[0]=1 ✅ | [2] | Size=1 ✅ |
| 2 | [2] | 2 | org[1]=2 ✅ | [3] | Size=1 ✅ |
| 3 | [3] | 3 | org[2]=3 ✅ | [] | Done |

**Result: true** ✅

---

## 🎓 Key Takeaways

1. **Uniqueness Check**: Queue size must be 1 at each step
2. **Order Verification**: Extracted nodes must match org
3. **Coverage**: All numbers from org must appear
4. **Edge Redundancy**: Use Set to avoid duplicate edges
5. **Kahn's is Natural**: BFS makes uniqueness check straightforward
6. **Three Conditions**: Unique + matches org + complete

---

## 📚 Related Problems

1. **Course Schedule II** (LeetCode 210) - Basic topological sort
2. **Alien Dictionary** (LeetCode 269) - Find the ordering
3. **Verify Alien Dictionary** (LeetCode 953) - Given order, verify
4. **Longest Increasing Subsequence** (LeetCode 300) - Related ordering
5. **Reconstruct Itinerary** (LeetCode 332) - Eulerian path

---

