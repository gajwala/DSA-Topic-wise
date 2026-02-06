# 133. Detect Squares

**LeetCode**: [2013. Detect Squares](https://leetcode.com/problems/detect-squares/)

**Difficulty**: Medium | **Topics**: Array, Hash Table, Design, Counting

---

## Problem

Design a class that supports: (1) Adding points to the plane; (2) Counting axis-aligned squares that can be formed with a given query point as one of the corners. Return the count for each query.

---

## Solution: Store points by (x,y); for query (qx,qy), pick same-x and same-y points to form square

```javascript
class DetectSquares {
    constructor() {
        this.points = new Map(); // "x,y" -> count
        this.xToY = new Map();   // x -> Set of y
    }
    add(point) {
        const [x, y] = point;
        const key = `${x},${y}`;
        this.points.set(key, (this.points.get(key) || 0) + 1);
        if (!this.xToY.has(x)) this.xToY.set(x, new Map());
        const ym = this.xToY.get(x);
        ym.set(y, (ym.get(y) || 0) + 1);
    }
    count(point) {
        const [qx, qy] = point;
        let total = 0;
        for (const [x, ym] of this.xToY) {
            if (x === qx) continue;
            const side = Math.abs(x - qx);
            const c1 = (this.points.get(`${x},${qy}`) || 0) * (this.points.get(`${qx},${qy + side}`) || 0) * (this.points.get(`${x},${qy + side}`) || 0);
            const c2 = (this.points.get(`${x},${qy}`) || 0) * (this.points.get(`${qx},${qy - side}`) || 0) * (this.points.get(`${x},${qy - side}`) || 0);
            total += c1 + c2;
        }
        return total;
    }
}
```

**Time:** O(1) add, O(n) count | **Space:** O(n). **Pattern:** For query (qx,qy), iterate x; side = |x-qx|; count squares with corners (qx,qy), (x,qy), (qx,qy±side), (x,qy±side) using point counts.
