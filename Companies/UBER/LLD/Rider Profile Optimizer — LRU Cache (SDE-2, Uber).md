# Rider Profile Optimizer — LRU Cache (SDE-2, Uber)

> **Interview Context:** Classic SDE-2 system design + DSA hybrid — tests **LRU cache design**, **doubly linked list manipulation**, **HashMap + DLL combination**, and **O(1) get/set operations**.

---

## Problem Statement

Build an in-memory **Profile Manager** that acts as a high-performance LRU (Least Recently Used) cache for `RiderProfile` objects fetched from a slow remote database.

### Requirements

| # | Requirement | Detail |
|---|---|---|
| 1 | **O(1) access** | `getProfile(riderId)` and `saveProfile(riderId, data)` must run in constant time on average |
| 2 | **Memory constraint** | Store at most `MAX_CAPACITY` profiles (e.g., 1000) |
| 3 | **Eviction policy** | When full, evict the **Least Recently Used** profile — the one not accessed for the longest time |
| 4 | **Freshness rule** | Any `get` or `save` on an existing profile marks it as freshly used — moves it to top of priority |

---

## Core Insight — Why HashMap + Doubly Linked List?

The two requirements in tension are **O(1) lookup** and **O(1) eviction with recency ordering**.

| Structure | Lookup | Recency Order | Verdict |
|---|---|---|---|
| Array | O(N) | Easy | Too slow for lookup |
| HashMap only | O(1) | ✗ No order | Can't track LRU |
| Linked List only | O(N) | O(1) reorder | Too slow for lookup |
| **HashMap + DLL** | **O(1)** | **O(1) reorder** | ✅ Perfect |

The HashMap holds `riderId → node` for instant lookup. The Doubly Linked List maintains recency order — **head = most recently used**, **tail = least recently used (evict first)**.

---

## Data Structure Design

```
HashMap:                    Doubly Linked List (head = MRU, tail = LRU):
──────────────────          ─────────────────────────────────────────────
1 → NodeRider(1)      HEAD ←→ [id:1, 'Alpha'] ←→ [id:3, 'Rajini'] ←→ [id:2, 'Beta'] → TAIL
3 → NodeRider(3)             (most recent)                              (evict next)
2 → NodeRider(2)
```

Every node has `prev` and `next` pointers — so any node can be removed and reinserted at head in **O(1)** without traversal.

---

## Implementation

```javascript
class NodeRider {
  constructor(riderId, data) {
    this.riderId = riderId;
    this.data    = data;
    this.prev    = null;
    this.next    = null;
  }
}

class ProfileManager {
  constructor(capacity) {
    this.capacity = capacity;
    this.map      = new Map();   // riderId → NodeRider
    this.head     = null;        // Most Recently Used
    this.tail     = null;        // Least Recently Used (evict candidate)
  }

  // ─── Core Public API ────────────────────────────────────────────────

  getProfile(riderId) {
    if (!this.map.has(riderId)) return null;
    const node = this.map.get(riderId);
    this._moveToHead(node);      // mark as recently used
    return node.data;
  }

  saveProfile(riderId, data) {
    if (this.map.has(riderId)) {
      // Update existing — refresh recency
      const node = this.map.get(riderId);
      node.data = data;
      this._moveToHead(node);
    } else {
      // Insert new node at head
      const newNode = new NodeRider(riderId, data);
      this.map.set(riderId, newNode);
      newNode.next = this.head;
      if (this.head) this.head.prev = newNode;
      this.head = newNode;
      if (!this.tail) this.tail = newNode;

      // Evict LRU if over capacity
      if (this.map.size > this.capacity) {
        this._removeTail();
      }
    }
  }

  // Direct removal by riderId (utility method)
  removeRiderId(riderId) {
    if (!this.map.has(riderId)) return null;
    const node = this.map.get(riderId);

    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;

    if (node === this.head) this.head = node.next;
    if (node === this.tail) this.tail = node.prev;

    this.map.delete(riderId);
    return node.data;
  }

  // ─── Private Helpers ────────────────────────────────────────────────

  // Detach node from its current position and reinsert at head
  _moveToHead(node) {
    if (node === this.head) return;                  // already MRU

    if (node.prev) node.prev.next = node.next;       // bridge over node
    if (node.next) node.next.prev = node.prev;

    if (node === this.tail) this.tail = node.prev;   // update tail if needed

    node.prev  = null;
    node.next  = this.head;
    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;
  }

  // Remove the tail node (LRU eviction)
  _removeTail() {
    if (!this.tail) return;
    this.map.delete(this.tail.riderId);

    if (this.tail.prev) {
      this.tail       = this.tail.prev;
      this.tail.next  = null;
    } else {
      // Last node removed — list is now empty
      this.head = null;
      this.tail = null;
    }
  }
}
```

---

## Visual Walkthrough

Using `capacity = 2`:

```
saveProfile(1, 'Alpha')
  HEAD → [1:'Alpha'] ← TAIL

saveProfile(1, 'Alpha => gama')         ← update existing, moveToHead
  HEAD → [1:'Alpha=>gama'] ← TAIL       (no new node, just data update)

saveProfile(3, 'Rajini')                ← new node, insert at head
  HEAD → [3:'Rajini'] ↔ [1:'Alpha=>gama'] ← TAIL
  size=2, within capacity ✓

getProfile(1)                           ← hit! moveToHead
  HEAD → [1:'Alpha=>gama'] ↔ [3:'Rajini'] ← TAIL
  returns 'Alpha=>gama'
```

If we then called `saveProfile(4, 'NewRider')`:
```
  New node → insert at head
  size=3 > capacity=2 → _removeTail() evicts [3:'Rajini']
  HEAD → [4:'NewRider'] ↔ [1:'Alpha=>gama'] ← TAIL
```

---

## Complexity Analysis

| Operation | Time | Space |
|---|---|---|
| `getProfile` | O(1) | — |
| `saveProfile` (update) | O(1) | — |
| `saveProfile` (insert) | O(1) | O(1) per node |
| `_moveToHead` | O(1) | — |
| `_removeTail` | O(1) | — |
| **Total space** | — | **O(capacity)** |

All operations are O(1) because: HashMap gives direct node access, and DLL pointer surgery (prev/next updates) never requires traversal.

---

## Edge Cases Handled

```javascript
// 1. Single node list — head and tail are same node
saveProfile(1, 'only');
// head = tail = node(1), prev = next = null

// 2. Update existing — no eviction, no new node
saveProfile(1, 'v1');
saveProfile(1, 'v2');  // map.size stays 1

// 3. getProfile on missing key
getProfile(999);  // returns null — no crash

// 4. moveToHead when already at head — early return guard
getProfile(headRiderId);  // if (node === this.head) return;

// 5. Eviction when removing the only node (size goes 1→0)
// _removeTail sets head=null, tail=null cleanly

// 6. removeRiderId on non-existent key
removeRiderId(999);  // returns null — no crash
```

---

## Common Interview Follow-ups

**Q: Why a doubly linked list and not a singly linked list?**
To remove a node in O(1) we need access to its `prev` pointer to bridge the gap. A singly linked list would require O(N) traversal to find the predecessor.

**Q: Why store the node reference in the HashMap instead of just the data?**
We need direct access to the DLL node to call `_moveToHead` and `_removeTail`. If we only stored data, we'd have to traverse the list to find the node — that would be O(N).

**Q: Can you use JavaScript's `Map` insertion order instead of a DLL?**
Yes — `Map` in JS preserves insertion order, so you can delete + re-insert a key to "refresh" it, and the oldest key is always `map.keys().next().value`. Simpler code, same O(1) complexity. The DLL approach is more universal (works in any language) and is what interviewers expect.

```javascript
// Map-based alternative (JS only)
getProfile(riderId) {
  if (!this.map.has(riderId)) return null;
  const data = this.map.get(riderId);
  this.map.delete(riderId);
  this.map.set(riderId, data);   // re-insert = move to "end" (most recent)
  return data;
}
```

**Q: What if two threads call `saveProfile` simultaneously?**
This implementation is not thread-safe. In a multi-threaded environment (e.g., Node.js worker threads or Java), you'd wrap critical sections with a mutex/lock.

**Q: How would you add TTL (time-to-live) expiry?**
Store a `timestamp` on each node. In `getProfile`, check if `Date.now() - node.timestamp > TTL` — if expired, remove and return null.

---

## LRU vs Other Eviction Policies

| Policy | Full Name | Evicts | Best For |
|---|---|---|---|
| **LRU** | Least Recently Used | Longest since last access | General caching (this impl) |
| LFU | Least Frequently Used | Fewest total accesses | Popularity-based workloads |
| FIFO | First In First Out | Oldest inserted | Simple queues |
| MRU | Most Recently Used | Most recently accessed | Scan-heavy workloads |

---

## Files

```
profile-manager/
├── README.md           ← this file
├── NodeRider.js        ← doubly linked list node
└── ProfileManager.js   ← LRU cache implementation
```
