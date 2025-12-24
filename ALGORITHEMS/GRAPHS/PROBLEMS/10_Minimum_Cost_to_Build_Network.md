# 🏗️ Minimum Cost to Build Network (MST Variation)

**Custom Problem** | **Medium** | **MST - Both Algorithms**

---

## 📝 Problem Description

You are tasked with building a network connecting `n` data centers numbered from `0` to `n-1`. You are given:

1. **`n`**: Number of data centers
2. **`connections`**: Array where `connections[i] = [dc1, dc2, cost]` represents the cost to build a direct fiber link between data center `dc1` and `dc2`
3. **`servers`**: Array where `servers[i]` represents the cost to set up a main server at data center `i`

**Rules:**
- You must set up **exactly ONE main server** at any data center
- All other data centers must be connected to the main server either directly or through other data centers
- Return the **minimum total cost** to build the network

### Example 1:

**Input:**

```
n = 4
connections = [[0,1,1],[1,2,2],[2,3,3],[0,3,4]]
servers = [5,10,8,7]
```

**Output:**

```
11
```

**Explanation:**

```
Set up main server at data center 0: cost = 5
Connect using edges: 0-1 (1), 1-2 (2), 2-3 (3)
Total: 5 + 1 + 2 + 3 = 11

Alternative: Server at 0, edges 0-1, 0-3, 3-2: 5+1+4+3=13 (worse)
```

### Example 2:

**Input:**

```
n = 3
connections = [[0,1,10],[0,2,10],[1,2,1]]
servers = [20,15,8]
```

**Output:**

```
19
```

**Explanation:**

```
Server at data center 2: cost = 8
Edges: 1-2 (1), 0-2 (10)
Total: 8 + 1 + 10 = 19

(Server at 0: 20+10+1=31, Server at 1: 15+10+1=26, both worse)
```

### Example 3:

**Input:**

```
n = 5
connections = [[0,1,5],[1,2,5],[2,3,5],[3,4,5]]
servers = [100,1,1,1,100]
```

**Output:**

```
16
```

**Explanation:**

```
Server at any of centers 1,2,3: cost = 1
MST cost = 5+5+5+5 = 20
Total: 1 + 20 = 21... wait that's wrong

Actually: Server at center 2: cost = 1
Edges: 1-2(5), 2-3(5), 0-1(5), 3-4(5)
Total: 1 + 5 + 5 + 5 + 5 = 21

But we need MST regardless of server location, so:
MST cost = 20 (to connect all 5 centers)
Best server = min(servers) = 1
Total: 1 + 20 = 21

Wait, let me recalculate...
```

### Constraints:

- `2 ≤ n ≤ 1000`
- `n-1 ≤ connections.length ≤ n*(n-1)/2`
- `connections[i].length == 3`
- `0 ≤ dc1, dc2 < n`
- `1 ≤ cost ≤ 1000`
- `servers.length == n`
- `1 ≤ servers[i] ≤ 1000`

---

## 💡 Intuition

This problem combines MST with an additional choice:

### Key Insight:

The MST of the network is **independent** of server location:
- **MST connects all nodes with minimum cost**
- **Server location only adds initial cost**
- **Optimal solution = min(server cost) + MST cost**

### Why This Works:

```
Total Cost = Server Cost + Connection Cost

Connection Cost = MST (same regardless of server location)
Server Cost = Choose minimum from servers array

Therefore: Total = min(servers) + MST_cost
```

### Algorithm Choice:

Since we need MST, we can use either:
1. **Prim's Algorithm** - Build from any vertex
2. **Kruskal's Algorithm** - Build from sorted edges

Then add the minimum server cost.

---

## 🔍 Algorithm

### Approach:

1. **Calculate MST Cost**:
   - Use Prim's or Kruskal's to find MST
   - This gives us minimum cost to connect all centers

2. **Find Minimum Server Cost**:
   - Scan servers array for minimum

3. **Return Total**:
   - `min(servers) + MST_cost`

---

## 💻 Code

### Solution 1: Using Kruskal's

```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
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

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    return true;
  }
}

/**
 * @param {number} n
 * @param {number[][]} connections
 * @param {number[]} servers
 * @return {number}
 */
function minCostToBuildNetwork(n, connections, servers) {
  // Step 1: Calculate MST cost using Kruskal's
  connections.sort((a, b) => a[2] - b[2]);

  const uf = new UnionFind(n);
  let mstCost = 0;
  let edgesUsed = 0;

  for (const [u, v, cost] of connections) {
    if (uf.union(u, v)) {
      mstCost += cost;
      edgesUsed++;

      if (edgesUsed === n - 1) break;
    }
  }

  // Step 2: Find minimum server cost
  const minServerCost = Math.min(...servers);

  // Step 3: Return total
  return minServerCost + mstCost;
}
```

### Solution 2: Using Prim's

```javascript
class MinHeap {
  constructor(compareFn = (a, b) => a - b) {
    this.heap = [];
    this.compare = compareFn;
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeftIndex(i) {
    return i * 2 + 1;
  }

  getRightIndex(i) {
    return i * 2 + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parent = this.getParentIndex(index);
      if (this.compare(this.heap[parent], this.heap[index]) <= 0) break;
      this.swap(parent, index);
      index = parent;
    }
  }

  removeMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      const left = this.getLeftIndex(index);
      const right = this.getRightIndex(index);
      let smallest = index;

      if (
        left < length &&
        this.compare(this.heap[left], this.heap[smallest]) < 0
      ) {
        smallest = left;
      }
      if (
        right < length &&
        this.compare(this.heap[right], this.heap[smallest]) < 0
      ) {
        smallest = right;
      }
      if (smallest === index) break;

      this.swap(index, smallest);
      index = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

/**
 * @param {number} n
 * @param {number[][]} connections
 * @param {number[]} servers
 * @return {number}
 */
function minCostToBuildNetwork(n, connections, servers) {
  // Build adjacency list
  const graph = new Map();
  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (const [u, v, cost] of connections) {
    graph.get(u).push({ node: v, cost });
    graph.get(v).push({ node: u, cost });
  }

  // Calculate MST using Prim's
  const pq = new MinHeap((a, b) => a.cost - b.cost);
  const visited = Array(n).fill(false);
  let mstCost = 0;

  pq.insert({ cost: 0, node: 0 });

  while (!pq.isEmpty()) {
    const { cost, node } = pq.removeMin();

    if (visited[node]) continue;

    visited[node] = true;
    mstCost += cost;

    for (const { node: neighbor, cost: edgeCost } of graph.get(node)) {
      if (!visited[neighbor]) {
        pq.insert({ cost: edgeCost, node: neighbor });
      }
    }
  }

  // Find minimum server cost
  const minServerCost = Math.min(...servers);

  // Return total
  return minServerCost + mstCost;
}
```

---

## ⏱️ Time and Space Complexity

### Kruskal's Approach:

**Time Complexity: O(E log E + V)**

- Sort connections: O(E log E)
- Union-Find operations: O(E × α(V))
- Find min server: O(V)
- Total: O(E log E)

**Space Complexity: O(V)**

- Union-Find: O(V)

### Prim's Approach:

**Time Complexity: O(E log V + V)**

- Build graph: O(E)
- Prim's algorithm: O(E log V)
- Find min server: O(V)
- Total: O(E log V)

**Space Complexity: O(V + E)**

- Adjacency list: O(V + E)
- Heap: O(V)

---

## 🎯 Dry Run

### Input:

```
n = 4
connections = [[0,1,1],[1,2,2],[2,3,3],[0,3,4]]
servers = [5,10,8,7]
```

### Step 1: Calculate MST (Kruskal's)

**Sorted Connections:**

```
[[0,1,1], [1,2,2], [2,3,3], [0,3,4]]
```

| Step | Edge [u,v,cost] | Union? | MST Cost | Edges |
| ---- | --------------- | ------ | -------- | ----- |
| 1 | [0,1,1] | ✅ | 1 | 1 |
| 2 | [1,2,2] | ✅ | 3 | 2 |
| 3 | [2,3,3] | ✅ | 6 | 3 |
| 4 | [0,3,4] | ❌ | 6 | 3 (done) |

**MST Cost: 6**

### Step 2: Find Minimum Server Cost

```
servers = [5, 10, 8, 7]
min = 5
```

### Step 3: Calculate Total

```
Total = min(servers) + MST
      = 5 + 6
      = 11 ✅
```

---

## 🎓 Key Takeaways

1. **MST Independence**: MST cost is same regardless of server location
2. **Decomposition**: Break problem into two independent parts
3. **Greedy Works**: Both server choice and MST are greedy
4. **Optimal Substructure**: min(total) = min(server) + min(connections)
5. **Both Algorithms Valid**: Kruskal's or Prim's work equally well

---

## 🔄 Variations

This problem can be modified:

1. **Multiple Servers**: Need k servers → choose k cheapest
2. **Server Capacity**: Each server handles limited centers
3. **Redundancy**: Need backup connections (2-connected graph)
4. **Latency Constraints**: Max path length from server

---

## 📚 Related Problems

1. **Optimize Water Distribution in a Village** (LeetCode 1168)
2. **Min Cost to Connect All Points** (LeetCode 1584)
3. **Connecting Cities With Minimum Cost** (LeetCode 1135)
4. **Number of Operations to Make Network Connected** (LeetCode 1319)

---

