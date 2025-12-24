# 🏙️ Find the City With the Smallest Number of Neighbors at a Threshold Distance

**LeetCode 1334** | **Medium** | **Multiple Dijkstra's / Floyd-Warshall**

---

## 📝 Problem Description

There are `n` cities numbered from `0` to `n-1`. Given the array `edges` where `edges[i] = [fromi, toi, weighti]` represents a bidirectional and weighted edge between cities `fromi` and `toi`, and given the integer `distanceThreshold`.

Return the city with the **smallest number** of cities that are reachable through some path and whose distance is **at most** `distanceThreshold`. If there are multiple such cities, return the city with the **greatest number**.

Notice that the distance of a path connecting cities `i` and `j` is equal to the sum of the edges' weights along that path.

### Example 1:

**Input:**

```
n = 4
edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]]
distanceThreshold = 4
```

**Output:**

```
3
```

**Explanation:**

```
Graph:
    3
0 ----- 1
        |\ 
      1 | \ 4
        |  \
        2---3
          1

From city 0: Can reach [1] (dist 3) → 1 city
From city 1: Can reach [0,2,3] (dists 3,1,2) → 3 cities  
From city 2: Can reach [1,3] (dists 1,1) → 2 cities
From city 3: Can reach [1,2] (dists 2,1) → 2 cities

Cities 2 and 3 both have 2 reachable neighbors
Return 3 (greater number) ✅
```

### Example 2:

**Input:**

```
n = 5
edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]]
distanceThreshold = 2
```

**Output:**

```
0
```

**Explanation:**

```
From city 0: Can reach [1] (dist 2) → 1 city ✅
From city 1: Can reach [0,2,4] (dists 2,3,2) → wait, 3 > 2, so [0,4] → 2 cities
From city 2: Can reach [3] (dist 1) → 1 city  
From city 3: Can reach [2,4] (dists 1,1) → 2 cities
From city 4: Can reach [1,3] (dists 2,1) → 2 cities

City 0 has 1 reachable neighbor (smallest) ✅
```

### Constraints:

- `2 <= n <= 100`
- `1 <= edges.length <= n * (n - 1) / 2`
- `edges[i].length == 3`
- `0 <= fromi < toi < n`
- `1 <= weighti, distanceThreshold <= 10^4`
- All pairs `(fromi, toi)` are distinct

---

## 💡 Intuition

This problem requires finding **shortest paths from ALL cities** to all other cities:

### Approach Comparison:

| Algorithm | Time Complexity | When to Use |
| --------- | --------------- | ----------- |
| **Dijkstra (n times)** | O(n × (E + V) log V) | Sparse graphs |
| **Floyd-Warshall** | O(n³) | Dense graphs, simpler code |
| **Bellman-Ford (n times)** | O(n² × E) | If negative weights exist |

For this problem:
- **n ≤ 100**: Both approaches work fine
- **Dijkstra n times**: Run Dijkstra from each city
- **Floyd-Warshall**: All-pairs shortest path in one pass

### Algorithm Strategy:

```
1. Run Dijkstra from each city (or use Floyd-Warshall)
2. For each city, count neighbors within distanceThreshold
3. Return city with:
   - Minimum count
   - If tie: maximum city number
```

---

## 🔍 Algorithm

### Approach 1: Multiple Dijkstra's

1. **Build adjacency list** (bidirectional)
2. **For each city i** (0 to n-1):
   - Run Dijkstra from city i
   - Count cities reachable within threshold
3. **Track best city**:
   - Minimum reachable count
   - Break ties by choosing larger city number

### Approach 2: Floyd-Warshall

1. **Initialize distance matrix**
2. **Run Floyd-Warshall** for all-pairs shortest path
3. **For each city**, count reachable neighbors
4. **Return best city**

---

## 💻 Code

### Solution 1: Multiple Dijkstra's (Recommended)

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

  peek() {
    return this.heap[0] ?? null;
  }

  size() {
    return this.heap.length;
  }
}

/**
 * Run Dijkstra from a source city
 * @param {number} n - number of cities
 * @param {Map} graph - adjacency list
 * @param {number} source - source city
 * @return {number[]} - distances from source to all cities
 */
function dijkstra(n, graph, source) {
  const dist = Array(n).fill(Infinity);
  dist[source] = 0;

  const pq = new MinHeap((a, b) => a.dist - b.dist);
  pq.insert({ city: source, dist: 0 });

  while (!pq.isEmpty()) {
    const { city, dist: d } = pq.removeMin();

    if (d > dist[city]) continue;

    for (const { neighbor, weight } of graph.get(city)) {
      const newDist = d + weight;

      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        pq.insert({ city: neighbor, dist: newDist });
      }
    }
  }

  return dist;
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
  // Build adjacency list (bidirectional)
  const graph = new Map();
  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (const [from, to, weight] of edges) {
    graph.get(from).push({ neighbor: to, weight });
    graph.get(to).push({ neighbor: from, weight });
  }

  let minReachable = Infinity;
  let resultCity = 0;

  // Run Dijkstra from each city
  for (let city = 0; city < n; city++) {
    const distances = dijkstra(n, graph, city);

    // Count cities within threshold (excluding self)
    let reachableCount = 0;
    for (let i = 0; i < n; i++) {
      if (i !== city && distances[i] <= distanceThreshold) {
        reachableCount++;
      }
    }

    // Update result:
    // 1. If fewer reachable cities, update
    // 2. If same count, choose larger city number
    if (
      reachableCount < minReachable ||
      (reachableCount === minReachable && city > resultCity)
    ) {
      minReachable = reachableCount;
      resultCity = city;
    }
  }

  return resultCity;
};
```

### Solution 2: Floyd-Warshall (Alternative)

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
  // Initialize distance matrix
  const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));

  // Distance from city to itself is 0
  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
  }

  // Add edges
  for (const [from, to, weight] of edges) {
    dist[from][to] = weight;
    dist[to][from] = weight;
  }

  // Floyd-Warshall: all-pairs shortest path
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  let minReachable = Infinity;
  let resultCity = 0;

  // For each city, count reachable neighbors
  for (let city = 0; city < n; city++) {
    let reachableCount = 0;

    for (let i = 0; i < n; i++) {
      if (i !== city && dist[city][i] <= distanceThreshold) {
        reachableCount++;
      }
    }

    // Update result (prefer higher city number on tie)
    if (
      reachableCount < minReachable ||
      (reachableCount === minReachable && city > resultCity)
    ) {
      minReachable = reachableCount;
      resultCity = city;
    }
  }

  return resultCity;
};
```

---

## ⏱️ Time and Space Complexity

### Dijkstra Approach:

**Time Complexity: O(n × (E + V) log V) = O(n × E log n)**

- Run Dijkstra n times: O(n)
- Each Dijkstra: O((E + V) log V)
- **Total: O(n × E log n)**

**Space Complexity: O(V + E)**

- Adjacency list: O(V + E)
- Distance array: O(V)
- Heap: O(V)

### Floyd-Warshall Approach:

**Time Complexity: O(n³)**

- Triple nested loop: O(n³)

**Space Complexity: O(n²)**

- Distance matrix: O(n²)

### Which to Choose?

- **Sparse graphs** (E << n²): Dijkstra
- **Dense graphs** (E ≈ n²): Floyd-Warshall
- **n ≤ 100**: Both work fine, Floyd is simpler

---

## 🎯 Dry Run

### Input:

```
n = 4
edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]]
distanceThreshold = 4
```

### Step 1: Run Dijkstra from Each City

**From City 0:**
```
dist = [0, 3, 4, 5]
Reachable within 4: cities 1,2,3 → count = 3
```

**From City 1:**
```
dist = [3, 0, 1, 2]
Reachable within 4: cities 0,2,3 → count = 3
```

**From City 2:**
```
dist = [4, 1, 0, 1]
Reachable within 4: cities 1,3 → count = 2 ✅
```

**From City 3:**
```
dist = [5, 2, 1, 0]
Reachable within 4: cities 1,2 → count = 2 ✅
```

### Step 2: Find Result

| City | Reachable Count | Notes                  |
| ---- | --------------- | ---------------------- |
| 0    | 3               | -                      |
| 1    | 3               | -                      |
| 2    | 2               | Tie for minimum        |
| 3    | 2               | Tie, but larger number |

**Result: City 3** ✅

---

## 🎓 Key Takeaways

1. **All-Pairs Shortest Path**: Need distances from every city
2. **Multiple Dijkstra's**: Run once per source
3. **Floyd-Warshall Alternative**: Simpler for dense graphs
4. **Tie-Breaking**: Choose larger city number on equal counts
5. **Threshold Check**: `distance <= threshold`
6. **Exclude Self**: Don't count city as its own neighbor

---

## 📚 Related Problems

1. **Network Delay Time** (LeetCode 743) - Single source
2. **Cheapest Flights Within K Stops** (LeetCode 787) - With constraints
3. **All Pairs Shortest Path** (Various) - Floyd-Warshall
4. **Find Eventual Safe States** (LeetCode 802) - Graph topology
5. **Minimum Cost to Make at Least One Valid Path** (LeetCode 1368)

---

