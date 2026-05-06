# 📊 Click Counter (Hit Counter Design)

## 🧩 Problem Statement

Design a system that tracks the number of clicks received in the **last 300 seconds (5 minutes)**.

### Requirements:

* `recordClick(timestamp)` → Record a click at a given timestamp
* `getRecentClicks(timestamp)` → Return number of clicks in the past 300 seconds from the given timestamp
* Timestamps:

  * Are in **seconds**
  * Always **increasing for recordClick**
  * Can be **any value for getRecentClicks**
* Multiple clicks can occur at the same timestamp

---

## ✅ Example

```javascript
ClickCounter tracker = new ClickCounter();

tracker.recordClick(1);
tracker.recordClick(2);
tracker.recordClick(3);

tracker.getRecentClicks(4);   // returns 3

tracker.recordClick(300);

tracker.getRecentClicks(300); // returns 4
tracker.getRecentClicks(301); // returns 3
```

---

## 🛠 Approach 1: Queue (Sliding Window)

### 💡 Idea

* Store all timestamps in a queue
* Remove timestamps older than `(currentTimestamp - 300)`
* Remaining queue size = valid clicks

### ✅ Implementation

```javascript
class ClickCounter {
  constructor() {
    this.queue = [];
  }

  recordClick(timestamp) {
    this.queue.push(timestamp);
  }

  getRecentClicks(timestamp) {
    while (this.queue.length && this.queue[0] <= timestamp - 300) {
      this.queue.shift();
    }
    return this.queue.length;
  }
}
```

---

### ⏱ Complexity

| Operation       | Time Complexity                  |
| --------------- | -------------------------------- |
| recordClick     | O(1)                             |
| getRecentClicks | O(N) worst-case (amortized O(1)) |

---

## ⚡ Approach 2: Optimized (Fixed 300 Buckets)

### 💡 Idea

* Use two arrays of size 300:

  * `times[]` → stores latest timestamp
  * `counts[]` → number of clicks at that timestamp
* Use `timestamp % 300` as index
* Overwrite old data automatically

---

### ✅ Implementation

```javascript
class ClickCounter {
  constructor() {
    this.times = new Array(300).fill(0);
    this.counts = new Array(300).fill(0);
  }

  recordClick(timestamp) {
    const index = timestamp % 300;

    if (this.times[index] !== timestamp) {
      this.times[index] = timestamp;
      this.counts[index] = 1;
    } else {
      this.counts[index]++;
    }
  }

  getRecentClicks(timestamp) {
    let total = 0;

    for (let i = 0; i < 300; i++) {
      if (timestamp - this.times[i] < 300) {
        total += this.counts[i];
      }
    }

    return total;
  }
}
```

---

### ⏱ Complexity

| Operation       | Time Complexity       |
| --------------- | --------------------- |
| recordClick     | O(1)                  |
| getRecentClicks | O(1) (fixed 300 loop) |

### 📦 Space Complexity

* O(300) → Constant space

---

## 🚀 Key Insights

* This is a **sliding window problem**
* Tradeoff:

  * Queue → Simple but may grow large
  * Bucket array → Optimal and scalable
* Bucket approach is preferred in **high traffic systems**

---

## 🔥 Follow-up Discussion

### ❓ What if timestamps are not sorted?

* Use sorting or a more advanced structure (e.g., min-heap)

### ❓ What if window is larger (e.g., 1 hour)?

* Increase bucket size accordingly (3600)

### ❓ How to scale this system?

* Use distributed counters (e.g., Redis)
* Partition by user/session
* Apply rate limiting patterns

---

## 🧠 Real-World Use Cases

* Rate limiting APIs
* Tracking active users
* Monitoring traffic spikes
* Analytics dashboards

---

## 📌 Conclusion

* Start with **queue-based solution**
* Optimize using **fixed-size bucket approach**
* Clearly explain trade-offs in interviews

---
