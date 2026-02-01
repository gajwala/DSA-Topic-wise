# 43. LRU Cache

**LeetCode Link**: [146. LRU Cache](https://leetcode.com/problems/lru-cache/)

**Difficulty**: Medium

**Topics**: Hash Table, Linked List, Design, Doubly-Linked List

---

## Problem Statement

Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the `LRUCache` class:

- `LRUCache(int capacity)` Initialize the LRU cache with **positive** size `capacity`.
- `int get(int key)` Return the value of the `key` if the key exists, otherwise return `-1`.
- `void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, **evict** the least recently used key.

The functions `get` and `put` must each run in **O(1)** average time complexity.

### Examples

**Example 1:**
```
Input:
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]

Output:
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation:
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
```

### Constraints
- `1 <= capacity <= 3000`
- `0 <= key <= 10^4`
- `0 <= value <= 10^5`
- At most `2 * 10^5` calls will be made to `get` and `put`

---

## Approach: Hash Map + Doubly Linked List (Optimal!) ✅

### Intuition
Use hash map for O(1) access and doubly linked list for O(1) removal/insertion. Most recent at head, least recent at tail.

### Implementation

```javascript
/**
 * Node for doubly linked list
 */
class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * LRU Cache - O(1) for both get and put
 */
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // key -> ListNode
        
        // Dummy head and tail for easy insertion/deletion
        this.head = new ListNode(0, 0);
        this.tail = new ListNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }
        
        const node = this.cache.get(key);
        
        // Move to front (most recently used)
        this.remove(node);
        this.addToFront(node);
        
        return node.value;
    }
    
    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        // If key exists, remove old node
        if (this.cache.has(key)) {
            this.remove(this.cache.get(key));
        }
        
        // Create new node and add to front
        const node = new ListNode(key, value);
        this.cache.set(key, node);
        this.addToFront(node);
        
        // Check capacity
        if (this.cache.size > this.capacity) {
            // Remove least recently used (node before tail)
            const lru = this.tail.prev;
            this.remove(lru);
            this.cache.delete(lru.key);
        }
    }
    
    /**
     * Remove node from list
     */
    remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    /**
     * Add node right after head (most recent)
     */
    addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }
}

// Test
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));    // 1
cache.put(3, 3);              // Evicts key 2
console.log(cache.get(2));    // -1 (not found)
cache.put(4, 4);              // Evicts key 1
console.log(cache.get(1));    // -1 (not found)
console.log(cache.get(3));    // 3
console.log(cache.get(4));    // 4
```

### Complexity Analysis
- **Time Complexity**: `O(1)` for both get and put
- **Space Complexity**: `O(capacity)` - Store up to capacity items

---

## Visual Example

```
Initial: LRUCache(2)
List: head <-> tail
Cache: {}

After put(1, 1):
List: head <-> [1:1] <-> tail
Cache: {1 -> [1:1]}

After put(2, 2):
List: head <-> [2:2] <-> [1:1] <-> tail
Cache: {1 -> [1:1], 2 -> [2:2]}

After get(1): (move 1 to front)
List: head <-> [1:1] <-> [2:2] <-> tail
Cache: {1 -> [1:1], 2 -> [2:2]}

After put(3, 3): (evict LRU = 2)
List: head <-> [3:3] <-> [1:1] <-> tail
Cache: {1 -> [1:1], 3 -> [3:3]}

After put(4, 4): (evict LRU = 1)
List: head <-> [4:4] <-> [3:3] <-> tail
Cache: {3 -> [3:3], 4 -> [4:4]}
```

---

## Alternative: Using JavaScript Map (Simpler)

```javascript
/**
 * LRU Cache using Map (insertion order preserved)
 */
class LRUCacheSimple {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    
    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }
        
        // Move to end (most recent)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        
        return value;
    }
    
    put(key, value) {
        // If exists, delete to re-insert at end
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        
        this.cache.set(key, value);
        
        // Evict oldest if over capacity
        if (this.cache.size > this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
}
```

**Note**: Map in JavaScript maintains insertion order, making this work!

---

## Edge Cases

```javascript
const cache = new LRUCache(2);

// Get from empty cache
console.log(cache.get(1)); // -1

// Single capacity
const single = new LRUCache(1);
single.put(1, 1);
single.put(2, 2); // Evicts 1
console.log(single.get(1)); // -1
console.log(single.get(2)); // 2

// Update existing key
cache.put(1, 1);
cache.put(1, 10); // Update, don't evict
console.log(cache.get(1)); // 10

// Access makes it recently used
cache.put(2, 2);
cache.put(3, 3);
cache.get(1);     // 1 becomes most recent
cache.put(4, 4);  // Evicts 2 (not 1)
console.log(cache.get(2)); // -1
console.log(cache.get(1)); // 1
```

---

## Common Mistakes

### ❌ Mistake 1: Using array for O(n) operations
```javascript
// Wrong - O(n) for removal
class LRUCacheWrong {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = []; // Array
    }
    
    get(key) {
        const index = this.cache.findIndex(item => item.key === key); // O(n)!
        // ...
    }
}

// Correct - O(1) with hash map
this.cache = new Map();
```

### ❌ Mistake 2: Not updating on get
```javascript
// Wrong - get doesn't mark as recently used
get(key) {
    if (!this.cache.has(key)) return -1;
    return this.cache.get(key).value; // Didn't move to front!
}

// Correct - move to front
get(key) {
    if (!this.cache.has(key)) return -1;
    const node = this.cache.get(key);
    this.remove(node);
    this.addToFront(node); // Mark as recently used
    return node.value;
}
```

### ❌ Mistake 3: Not using dummy nodes
```javascript
// Wrong - complex edge case handling
remove(node) {
    if (node.prev === null) { // Head case
        this.head = node.next;
    }
    // ... lots of edge cases
}

// Correct - dummy nodes simplify
this.head = new ListNode(0, 0);
this.tail = new ListNode(0, 0);
this.head.next = this.tail;
this.tail.prev = this.head;
```

---

## Interview Tips

### What to say:

1. **Clarify**: "get and put must be O(1)? Capacity is fixed? Yes."

2. **Data structures**: "Use hash map for O(1) lookup + doubly linked list for O(1) removal/insertion"

3. **Key insight**: "Most recent at head, least recent at tail. Dummy nodes simplify operations."

4. **Operations**:
   - get: Move node to front (mark as recent)
   - put: Add to front, evict from tail if over capacity

5. **Complexity**: "O(1) time for all operations, O(capacity) space"

### Follow-up Questions:

**Q: What if we need LFU (Least Frequently Used) instead?**
A: Different problem (LeetCode 460) - track frequency counts

**Q: Can you implement with single linked list?**
A: No, need O(1) removal which requires access to previous node

**Q: What if capacity can change dynamically?**
```javascript
setCapacity(newCapacity) {
    this.capacity = newCapacity;
    
    // Evict if over new capacity
    while (this.cache.size > this.capacity) {
        const lru = this.tail.prev;
        this.remove(lru);
        this.cache.delete(lru.key);
    }
}
```

---

## Related Problems

- [460. LFU Cache](https://leetcode.com/problems/lfu-cache/)
- [1756. Design Most Recently Used Queue](https://leetcode.com/problems/design-most-recently-used-queue/)

---

## Key Takeaways

✅ Hash map + doubly linked list for O(1) operations  
✅ Most recent at head, least recent at tail  
✅ Dummy nodes simplify insertion/deletion  
✅ get operation moves node to front  
✅ Evict from tail when over capacity  

**Pattern**: LRU cache → Hash map + doubly linked list!
