# 33. Time Based Key-Value Store

**LeetCode Link**: [981. Time Based Key-Value Store](https://leetcode.com/problems/time-based-key-value-store/)

**Difficulty**: Medium

**Topics**: Hash Table, String, Binary Search, Design

---

## Problem Statement

Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.

Implement the `TimeMap` class:

- `TimeMap()` Initializes the object of the data structure.
- `void set(String key, String value, int timestamp)` Stores the key `key` with the value `value` at the given time `timestamp`.
- `String get(String key, int timestamp)` Returns a value such that `set` was called previously, with `timestamp_prev <= timestamp`. If there are multiple such values, it returns the value associated with the largest `timestamp_prev`. If there are no values, it returns `""`.

### Examples

**Example 1:**
```
Input:
["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]

Output:
[null, null, "bar", "bar", null, "bar2", "bar2"]

Explanation:
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);  // store the key "foo" with value "bar" at timestamp 1
timeMap.get("foo", 1);         // return "bar"
timeMap.get("foo", 3);         // return "bar", since there is no value at 3 and the previous one is at 1
timeMap.set("foo", "bar2", 4); // store the key "foo" with value "bar2" at timestamp 4
timeMap.get("foo", 4);         // return "bar2"
timeMap.get("foo", 5);         // return "bar2"
```

### Constraints
- `1 <= key.length, value.length <= 100`
- `key` and `value` consist of lowercase English letters and digits
- `1 <= timestamp <= 10^7`
- All the timestamps `timestamp` of `set` are strictly increasing
- At most `2 * 10^5` calls will be made to `set` and `get`

---

## Approach 1: Linear Search

```javascript
class TimeMap {
    constructor() {
        this.map = new Map(); // key -> array of [timestamp, value]
    }
    
    set(key, value, timestamp) {
        if (!this.map.has(key)) {
            this.map.set(key, []);
        }
        this.map.get(key).push([timestamp, value]);
    }
    
    get(key, timestamp) {
        if (!this.map.has(key)) return "";
        
        const values = this.map.get(key);
        let result = "";
        
        // Linear search
        for (const [ts, val] of values) {
            if (ts <= timestamp) {
                result = val;
            } else {
                break;
            }
        }
        
        return result;
    }
}
```

**Complexity**: get() is O(n) - Too slow!

---

## Approach 2: Binary Search (Optimal!) ✅

### Intuition
Timestamps are strictly increasing. Store in array, use binary search to find largest timestamp <= target.

### Implementation

```javascript
/**
 * Binary Search on Timestamps - O(log n) for get
 */
class TimeMap {
    constructor() {
        // key -> array of [timestamp, value] pairs (sorted by timestamp)
        this.map = new Map();
    }
    
    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if (!this.map.has(key)) {
            this.map.set(key, []);
        }
        // Timestamps are strictly increasing, so just push
        this.map.get(key).push([timestamp, value]);
    }
    
    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        if (!this.map.has(key)) {
            return "";
        }
        
        const values = this.map.get(key);
        
        // Binary search for largest timestamp <= target
        let left = 0;
        let right = values.length - 1;
        let result = "";
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const [ts, val] = values[mid];
            
            if (ts <= timestamp) {
                result = val; // Valid candidate
                left = mid + 1; // Look for larger timestamp
            } else {
                right = mid - 1; // Too large, search left
            }
        }
        
        return result;
    }
}

// Test
const timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);
console.log(timeMap.get("foo", 1)); // "bar"
console.log(timeMap.get("foo", 3)); // "bar"
timeMap.set("foo", "bar2", 4);
console.log(timeMap.get("foo", 4)); // "bar2"
console.log(timeMap.get("foo", 5)); // "bar2"
```

### Complexity Analysis
- **Time Complexity**: 
  - `set()`: O(1) - Append to array
  - `get()`: O(log n) - Binary search where n = number of timestamps for key
- **Space Complexity**: O(n) - Store all key-value-timestamp tuples

---

## Visual Example

```
Operations:
set("foo", "bar", 1)
set("foo", "bar2", 4)
set("foo", "bar3", 7)

Internal state:
map = {
  "foo": [[1, "bar"], [4, "bar2"], [7, "bar3"]]
}

get("foo", 5):
Binary search in [[1, "bar"], [4, "bar2"], [7, "bar3"]] for timestamp <= 5

left=0, right=2, mid=1
values[1] = [4, "bar2"]
4 <= 5 ✓ → result = "bar2", search right (left=2)

left=2, right=2, mid=2
values[2] = [7, "bar3"]
7 > 5 ✗ → search left (right=1)

left > right → Stop
Return "bar2" ✓
```

---

## Alternative: Using Built-in Binary Search

```javascript
class TimeMap {
    constructor() {
        this.map = new Map();
    }
    
    set(key, value, timestamp) {
        if (!this.map.has(key)) {
            this.map.set(key, []);
        }
        this.map.get(key).push([timestamp, value]);
    }
    
    get(key, timestamp) {
        if (!this.map.has(key)) return "";
        
        const values = this.map.get(key);
        
        // Find rightmost position where timestamp is valid
        let idx = this.binarySearchRight(values, timestamp);
        
        return idx >= 0 ? values[idx][1] : "";
    }
    
    // Find rightmost element with timestamp <= target
    binarySearchRight(arr, target) {
        let left = 0;
        let right = arr.length - 1;
        let result = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (arr[mid][0] <= target) {
                result = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
}
```

---

## Edge Cases

```javascript
const timeMap = new TimeMap();

// Key doesn't exist
console.log(timeMap.get("unknown", 1)); // ""

// Timestamp before all values
timeMap.set("foo", "bar", 5);
console.log(timeMap.get("foo", 3)); // ""

// Timestamp after all values
timeMap.set("foo", "bar2", 10);
console.log(timeMap.get("foo", 100)); // "bar2"

// Exact timestamp match
console.log(timeMap.get("foo", 5)); // "bar"

// Between two timestamps
console.log(timeMap.get("foo", 7)); // "bar" (5 <= 7 < 10)

// Multiple keys
timeMap.set("foo2", "baz", 1);
console.log(timeMap.get("foo2", 1)); // "baz"
console.log(timeMap.get("foo", 5)); // "bar" (independent)
```

---

## Interview Tips

### What to say:

1. **Clarify**: "Timestamps are strictly increasing for each key? Yes - can append without sorting."

2. **Data structure**: "Use Map where each key stores array of [timestamp, value] pairs."

3. **Key insight**: "Since timestamps are sorted, binary search to find largest timestamp <= target."

4. **Complexity**: "set() is O(1), get() is O(log n) where n is number of timestamps for that key."

### Follow-up Questions:

**Q: What if timestamps are not strictly increasing?**
A: Need to sort before binary search, or use insertion sort during set()

```javascript
set(key, value, timestamp) {
    if (!this.map.has(key)) {
        this.map.set(key, []);
    }
    
    const values = this.map.get(key);
    
    // Find insertion position
    let i = values.length - 1;
    while (i >= 0 && values[i][0] > timestamp) {
        i--;
    }
    
    // Insert at correct position
    values.splice(i + 1, 0, [timestamp, value]);
}
```

**Q: What if we need to support deletion?**
```javascript
delete(key, timestamp) {
    if (!this.map.has(key)) return false;
    
    const values = this.map.get(key);
    const idx = values.findIndex(([ts]) => ts === timestamp);
    
    if (idx !== -1) {
        values.splice(idx, 1);
        return true;
    }
    
    return false;
}
```

**Q: How to optimize space if many keys have single timestamps?**
A: Use different structure for single vs multiple timestamps per key

---

## Related Problems

- [911. Online Election](https://leetcode.com/problems/online-election/)
- [1146. Snapshot Array](https://leetcode.com/problems/snapshot-array/)
- [1396. Design Underground System](https://leetcode.com/problems/design-underground-system/)

---

## Key Takeaways

✅ Hash map + sorted arrays for time-based storage  
✅ Binary search for largest timestamp <= target  
✅ Timestamps strictly increasing → O(1) set()  
✅ O(log n) get() with binary search  
✅ Store as [timestamp, value] pairs  

**Pattern**: Time-based queries on sorted data → Binary Search!
