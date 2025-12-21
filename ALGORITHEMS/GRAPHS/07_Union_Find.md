# Union-Find (Disjoint Set Union)

## 📚 Theory

Union-Find, also known as **Disjoint Set Union (DSU)**, is a data structure that efficiently tracks a partition of elements into disjoint (non-overlapping) sets. It provides near-constant-time operations to:
1. **Find**: Determine which set an element belongs to
2. **Union**: Merge two sets into one

With **path compression** and **union by rank/size**, operations are nearly O(1) amortized time.

## 🎯 Intuition

Think of Union-Find like managing friend groups:
- Initially, everyone is in their own group (themselves)
- When two people become friends, their groups merge
- You can quickly check if two people are in the same friend group
- The "representative" of each group is like the group leader

Or imagine connected islands:
- Each island starts separate
- Building bridges connects islands
- You can quickly check if two islands are connected

## 📝 PsudoCode
- Find Altimate parent of u and V means pu and pv
- Find Rank of pu and pv
- Connect Smaller rank to larger rank always
- The Rank can not be reduced while path compression

## 📝 Algorithm Steps

### Core Operations:

1. **Make-Set**: Create a new set containing a single element
2. **Find**: Find the representative (root) of the set containing an element
   - With path compression: flatten the tree structure
3. **Union**: Merge two sets
   - With union by rank: attach smaller tree under larger tree

## 💻 Implementation

### JavaScript Implementation
```javascript
/**
 * Union-Find (Disjoint Set Union) with path compression and union by rank
 */
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
    this.count = n; // Number of disjoint sets
  }

  /**
   * Find with path compression
   * Returns the root/representative of the set containing x
   */
  find(x) {
    if (this.parent[x] !== x) {
      // Path compression: make every node point directly to root
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  /**
   * Union by rank
   * Merge sets containing x and y
   * Returns true if union was performed, false if already in same set
   */
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return false; // Already in same set
    }

    // Union by rank: attach smaller tree under larger tree
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.count--; // Decrease number of disjoint sets
    return true;
  }

  /**
   * Check if x and y are in the same set
   */
  connected(x, y) {
    return this.find(x) === this.find(y);
  }

  /**
   * Get number of disjoint sets
   */
  getCount() {
    return this.count;
  }
}


/**
 * Union-Find with union by size (alternative to rank)
 */
class UnionFindBySize {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    // Union by size: attach smaller tree to larger tree
    if (this.size[rootX] < this.size[rootY]) {
      this.parent[rootX] = rootY;
      this.size[rootY] += this.size[rootX];
    } else {
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
    }

    return true;
  }

  getSize(x) {
    return this.size[this.find(x)];
  }
}


/**
 * Get all elements in the same set as x
 */
function getSetMembers(uf, n, x) {
  const root = uf.find(x);
  const members = [];

  for (let i = 0; i < n; i++) {
    if (uf.find(i) === root) {
      members.push(i);
    }
  }

  return members;
}


/**
 * Get all disjoint sets
 */
function getAllSets(uf, n) {
  const sets = {};

  for (let i = 0; i < n; i++) {
    const root = uf.find(i);
    if (!sets[root]) {
      sets[root] = [];
    }
    sets[root].push(i);
  }

  return Object.values(sets);
}
```

## 🔍 Example Walkthrough

Consider connecting nodes: Union(0,1), Union(1,2), Union(3,4)

**Initial State (n=5)**:
```
parent: [0, 1, 2, 3, 4]
rank:   [0, 0, 0, 0, 0]
Sets: {0}, {1}, {2}, {3}, {4}
```

**After Union(0, 1)**:
```
parent: [1, 1, 2, 3, 4]
rank:   [0, 1, 0, 0, 0]
Sets: {0,1}, {2}, {3}, {4}
Tree: 1
      |
      0
```

**After Union(1, 2)**:
```
parent: [1, 1, 1, 3, 4]
rank:   [0, 1, 0, 0, 0]
Sets: {0,1,2}, {3}, {4}
Tree:   1
       / \
      0   2
```

**After Union(3, 4)**:
```
parent: [1, 1, 1, 4, 4]
rank:   [0, 1, 0, 0, 1]
Sets: {0,1,2}, {3,4}
Trees:  1         4
       / \        |
      0   2       3
```

**Find(0)** with path compression:
```
Before: 0 → 1 (root)
After:  0 → 1 (direct connection to root)
```

## ⏱️ Time Complexity

- **Find**: **O(α(n))** amortized
  - α(n) is the inverse Ackermann function
  - Effectively constant for all practical values

- **Union**: **O(α(n))** amortized
  - Uses Find twice, then constant work

- **Space Complexity**: **O(n)**
  - Parent array: O(n)
  - Rank/size array: O(n)

**Note**: α(n) < 5 for all practical n (even for n = 2^65536)

## 🎯 When to Use Union-Find

### ✅ Best Use Cases:

1. **Dynamic Connectivity**
   - Check if elements are connected
   - Example: Network connectivity

2. **Cycle Detection in Undirected Graphs**
   - Detect if adding edge creates cycle
   - Example: Kruskal's MST algorithm

3. **Connected Components**
   - Find number of connected components
   - Example: Number of islands, provinces

4. **Minimum Spanning Tree**
   - Kruskal's algorithm uses Union-Find
   - Example: Network design

5. **Image Processing**
   - Finding connected regions
   - Example: Flood fill, image segmentation

6. **Social Networks**
   - Friend circles, groups
   - Example: Friend recommendations

### ❌ When NOT to Use Union-Find:

1. **Directed Graphs** - Use DFS/BFS instead
2. **Shortest Paths** - Use BFS/Dijkstra's
3. **Need Path Information** - Union-Find only tracks connectivity
4. **Disconnecting Sets** - Union-Find doesn't support split operations

## 🔑 Key Properties

1. **Near Constant Time**: O(α(n)) ≈ O(1) for all operations
2. **Space Efficient**: O(n) space
3. **Simple Implementation**: Easy to code and understand
4. **Path Compression**: Flattens trees automatically
5. **Union by Rank/Size**: Keeps trees balanced

## 💡 Common Problem Patterns

### Pattern 1: Number of Connected Components
```javascript
/**
 * LeetCode 323: Number of Connected Components in Undirected Graph
 */
function countComponents(n, edges) {
  const uf = new UnionFind(n);

  for (const [u, v] of edges) {
    uf.union(u, v);
  }

  return uf.getCount();
}
```

### Pattern 2: Redundant Connection
```javascript
/**
 * LeetCode 684: Redundant Connection
 * Find edge that creates a cycle
 */
function findRedundantConnection(edges) {
  const n = edges.length;
  const uf = new UnionFind(n + 1); // 1-indexed

  for (const [u, v] of edges) {
    if (!uf.union(u, v)) {
      // Union returns false if already connected (cycle detected)
      return [u, v];
    }
  }

  return [];
}
```

### Pattern 3: Number of Provinces
```javascript
/**
 * LeetCode 547: Number of Provinces
 */
function findCircleNum(isConnected) {
  const n = isConnected.length;
  const uf = new UnionFind(n);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j] === 1) {
        uf.union(i, j);
      }
    }
  }

  return uf.getCount();
}
```

### Pattern 4: Accounts Merge
```javascript
/**
 * LeetCode 721: Accounts Merge
 */
function accountsMerge(accounts) {
  const emailToId = {};
  const emailToName = {};
  let id = 0;

  // Assign ID to each unique email
  for (const account of accounts) {
    const name = account[0];
    for (let i = 1; i < account.length; i++) {
      const email = account[i];
      if (!emailToId.hasOwnProperty(email)) {
        emailToId[email] = id++;
      }
      emailToName[email] = name;
    }
  }

  const uf = new UnionFind(id);

  // Union emails from same account
  for (const account of accounts) {
    const firstEmailId = emailToId[account[1]];
    for (let i = 2; i < account.length; i++) {
      uf.union(firstEmailId, emailToId[account[i]]);
    }
  }

  // Group emails by root
  const components = {};
  for (const email in emailToId) {
    const root = uf.find(emailToId[email]);
    if (!components[root]) {
      components[root] = [];
    }
    components[root].push(email);
  }

  // Format result
  const result = [];
  for (const emails of Object.values(components)) {
    emails.sort();
    result.push([emailToName[emails[0]], ...emails]);
  }

  return result;
}
```

### Pattern 5: Making A Large Island
```javascript
/**
 * LeetCode 827: Making A Large Island
 * Flip at most one 0 to 1 to get largest island
 */
function largestIsland(grid) {
  const n = grid.length;
  const uf = new UnionFindBySize(n * n);
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  // Helper to convert 2D to 1D index
  const getIndex = (r, c) => r * n + c;

  // Union all 1s
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1) {
            uf.union(getIndex(r, c), getIndex(nr, nc));
          }
        }
      }
    }
  }

  let maxSize = 0;

  // Check current maximum island size
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        maxSize = Math.max(maxSize, uf.getSize(getIndex(r, c)));
      }
    }
  }

  // Try flipping each 0 to 1
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 0) {
        const neighbors = new Set();
        for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1) {
            neighbors.add(uf.find(getIndex(nr, nc)));
          }
        }

        let size = 1; // The flipped cell itself
        for (const root of neighbors) {
          size += uf.getSize(root);
        }

        maxSize = Math.max(maxSize, size);
      }
    }
  }

  return maxSize;
}
```

## 🎓 Practice Problems

1. **Easy**:
   - Friend Circles / Number of Provinces (LeetCode 547)
   - Find if Path Exists in Graph (LeetCode 1971)

2. **Medium**:
   - Number of Connected Components (LeetCode 323)
   - Redundant Connection (LeetCode 684)
   - Accounts Merge (LeetCode 721)
   - Satisfiability of Equality Equations (LeetCode 990)
   - Number of Operations to Make Network Connected (LeetCode 1319)

3. **Hard**:
   - Making A Large Island (LeetCode 827)
   - Remove Max Number of Edges to Keep Graph Fully Traversable (LeetCode 1579)
   - Swim in Rising Water (LeetCode 778)

## 🔧 Optimizations

1. **Path Compression**: Flattens tree during find
2. **Union by Rank**: Keeps tree height balanced
3. **Union by Size**: Alternative to rank
4. **Lazy Propagation**: For advanced operations

## ⚠️ Common Mistakes

1. **Forgetting Path Compression**: Results in O(log n) instead of O(α(n))
2. **Not Using Union by Rank/Size**: Trees become unbalanced
3. **0 vs 1 Indexing**: Be consistent with array indexing
4. **Modifying Parent Directly**: Always use find() and union()

## 🆚 Comparison with Other Approaches

| Task | Union-Find | DFS/BFS |
|------|------------|---------|
| **Connected Components** | O(n·α(n)) | O(V + E) |
| **Cycle Detection** | O(E·α(n)) | O(V + E) |
| **Dynamic Connectivity** | ✅ O(α(n)) | ❌ Must rerun |
| **Path Information** | ❌ No | ✅ Yes |
| **Implementation** | Simple | Medium |

---

**Remember**: Union-Find is the go-to data structure for dynamic connectivity problems! 🚀

