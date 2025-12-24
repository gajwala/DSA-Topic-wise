# ✈️ Cheapest Flights Within K Stops

**LeetCode 787** | **Medium** | **Dijkstra's with Constraints**

---

## 📝 Problem Description

There are `n` cities connected by some number of flights. You are given an array `flights` where `flights[i] = [fromi, toi, pricei]` indicates that there is a flight from city `fromi` to city `toi` with cost `pricei`.

You are also given three integers `src`, `dst`, and `k`, return **the cheapest price** from `src` to `dst` with at most `k` stops. If there is no such route, return `-1`.

###

 Example 1:

**Input:**

```
n = 4
flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
src = 0
dst = 3
k = 1
```

**Output:**

```
700
```

**Explanation:**

```
The graph:
0 --100--> 1 --600--> 3
|          |
100        100
↓          ↓
2 --------200-----> 3

Optimal path with at most 1 stop: 0 → 1 → 3
Cost: 100 + 600 = 700

Path 0 → 2 → 3 requires 2 stops (not allowed with k=1)
```

### Example 2:

**Input:**

```
n = 3
flights = [[0,1,100],[1,2,100],[0,2,500]]
src = 0
dst = 2
k = 1
```

**Output:**

```
200
```

**Explanation:**

```
Path with 0 stops: 0 → 2, cost = 500
Path with 1 stop: 0 → 1 → 2, cost = 200 ✅ (cheaper)
```

### Example 3:

**Input:**

```
n = 3
flights = [[0,1,100],[1,2,100],[0,2,500]]
src = 0
dst = 2
k = 0
```

**Output:**

```
500
```

**Explanation:**

```
k=0 means no stops allowed (direct flight only)
Only option: 0 → 2, cost = 500
```

### Constraints:

- `1 <= n <= 100`
- `0 <= flights.length <= (n * (n - 1) / 2)`
- `flights[i].length == 3`
- `0 <= fromi, toi < n`
- `fromi != toi`
- `1 <= pricei <= 10^4`
- There will not be any multiple flights between two cities
- `0 <= src, dst, k < n`
- `src != dst`

---

## 💡 Intuition

This is **Dijkstra's with an additional constraint** - we must track both cost AND number of stops:

### Key Observations:

1. **State = (city, stops_used)**: Different states for same city with different stop counts
2. **Not just minimum cost**: Sometimes a more expensive path with fewer stops is better
3. **Can't use standard Dijkstra**: Need to consider paths that might be more expensive but have fewer stops

### Why Modified Dijkstra's?

| Standard Dijkstra's | This Problem |
| ------------------- | ------------ |
| Single state per node | Multiple states: (node, stops) |
| Always take minimum cost | May take higher cost with fewer stops |
| Visited once | Can visit multiple times with different stops |

### Algorithm Strategy:

```
State: (cost, city, stops_used)

Update condition:
  - If new_stops <= k AND new_cost < best_cost_at[city][stops]
  - Track best cost for each (city, stops) pair

Termination:
  - Return minimum cost to reach dst with stops <= k
```

---

## 🔍 Algorithm

### Modified Dijkstra's Steps:

1. **Initialize**:
   - Build adjacency list
   - Create `dist[city][stops]` = minimum cost to reach city using exactly 'stops' stops
   - Min-heap with `(cost, city, stops)`

2. **Main Loop**:
   - Extract `(cost, city, stops)` with minimum cost
   - If `city == dst`, return cost
   - If `stops > k`, skip
   - For each neighbor:
     - Calculate new cost
     - If within stop limit and better cost → add to heap

3. **Return** minimum cost to dst, or -1 if not found

---

## 💻 Code

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
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  // Build adjacency list
  const graph = new Map();
  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (const [from, to, price] of flights) {
    graph.get(from).push({ city: to, price });
  }

  // dist[city][stops] = minimum cost to reach city with exactly 'stops' stops
  const dist = Array.from({ length: n }, () => Array(k + 2).fill(Infinity));
  dist[src][0] = 0;

  // Min-heap: prioritize by cost
  const pq = new MinHeap((a, b) => a.cost - b.cost);
  pq.insert({ cost: 0, city: src, stops: 0 });

  while (!pq.isEmpty()) {
    const { cost, city, stops } = pq.removeMin();

    // If reached destination, return cost (guaranteed minimum due to heap)
    if (city === dst) {
      return cost;
    }

    // If exceeded stop limit, skip
    if (stops > k) continue;

    // If we've found a better path to this state, skip
    if (cost > dist[city][stops]) continue;

    // Explore neighbors
    for (const { city: nextCity, price } of graph.get(city)) {
      const newCost = cost + price;
      const newStops = stops + 1;

      // If better cost for this number of stops
      if (newCost < dist[nextCity][newStops]) {
        dist[nextCity][newStops] = newCost;
        pq.insert({ cost: newCost, city: nextCity, stops: newStops });
      }
    }
  }

  // Not reachable
  return -1;
};
```

---

## ⏱️ Time and Space Complexity

### Time Complexity: O((V + E) × K × log(V × K))

**Breakdown:**

- States: V cities × K stops = O(V × K) states
- Each state processed once
- Each edge explored: O(E × K)
- Heap operations: O(log(V × K))
- **Total: O(E × K × log(V × K))**

### Space Complexity: O(V × K)

- Adjacency list: O(V + E)
- Distance 2D array: O(V × K)
- Min-heap: O(V × K)
- **Total: O(V × K + E)**

---

## 🎯 Dry Run

### Input:

```
n = 4
flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
src = 0
dst = 3
k = 1
```

### Graph:

```
0 --100--> 1 --100--> 2
↑          |          |
|100       |600       |200
|          ↓          ↓
+---------  ---------> 3
```

### Dijkstra's Execution:

| Step | Heap (cost, city, stops) | Extract       | City | Action             | Best Paths                                     |
| ---- | ------------------------ | ------------- | ---- | ------------------ | ---------------------------------------------- |
| Init | [(0,0,0)]                | -             | -    | Start              | dist[0][0]=0                                   |
| 1    | [(100,1,1)]              | (0,0,0)       | 0    | Add neighbor 1     | dist[1][1]=100                                 |
| 2    | [(200,2,2),(700,3,2)]    | (100,1,1)     | 1    | Add 2 and 3        | dist[2][2]=200, dist[3][2]=700                 |
| 3    | [(700,3,2),(300,0,3)]    | (200,2,2)     | 2    | stops=2, skip (>k) | -                                              |
| 4    | [(300,0,3)]              | (700,3,2) | 3    | Reached dst!       | **Return 700** (but wait, this violates k=1!) |

Wait, let me reconsider. With k=1, we can have at most 1 stop, meaning at most 2 flights.

Actually the path 0→1→3 has 1 stop (at city 1), which is allowed.
Cost = 100 + 600 = 700 ✅

---

## 🎓 Key Takeaways

1. **State = (city, stops)**: Track both position and stops used
2. **Multiple Visits**: Same city can be visited with different stop counts
3. **Constraint Handling**: Check `stops <= k` before relaxing edges
4. **Early Return**: Return when destination first reached (min-heap guarantees minimum cost)
5. **2D Distance Array**: `dist[city][stops]` tracks best cost for each state
6. **Not Standard Dijkstra**: Must allow revisiting nodes with different stop counts

---

## 🔄 Alternative Approaches

### 1. **Bellman-Ford (k iterations)**:

```javascript
// Run Bellman-Ford for k+1 iterations
// Each iteration represents one more hop
// Time: O(k × E)
// Space: O(V)
```

### 2. **BFS with Priority Queue**:

```javascript
// Similar to this solution but track stops differently
// Time: O(E × K × log(V))
```

### 3. **Dynamic Programming**:

```javascript
// dp[i][stops] = min cost to reach city i with exactly 'stops' stops
// Time: O(K × E)
// Space: O(V × K)
```

---

## 📚 Related Problems

1. **Network Delay Time** (LeetCode 743) - Standard Dijkstra
2. **Path with Minimum Effort** (LeetCode 1631) - Modified Dijkstra
3. **Minimum Cost to Make at Least One Valid Path** (LeetCode 1368)
4. **Number of Ways to Arrive at Destination** (LeetCode 1976)
5. **Find the City With Smallest Number of Neighbors** (LeetCode 1334)

---

