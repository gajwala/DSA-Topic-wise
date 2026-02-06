# 92. Task Scheduler

**LeetCode Link**: [621. Task Scheduler](https://leetcode.com/problems/task-scheduler/)

**Difficulty**: Medium

**Topics**: Array, Hash Table, Greedy, Heap, Counting

---

## Problem Statement

Given a characters array `tasks`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks can be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer `n` that represents the **cooldown period** between two **same tasks** — the same letter — so that the CPU must wait `n` units of time before doing the same task again.

Return the **least number of units of time** that the CPU will take to finish all the given tasks.

### Examples

**Example 1:**
```
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: A -> B -> idle -> A -> B -> idle -> A -> B
```

**Example 2:**
```
Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
```

**Example 3:**
```
Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
```

### Constraints
- `1 <= tasks.length <= 10^4`
- `tasks[i]` is upper-case English letter
- `0 <= n <= 100`

---

## Approach 1: Max-Heap + Queue (Simulation) ✅

### Implementation

```javascript
/**
 * Heap + Queue simulation - O(n * idles) time
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
function leastInterval(tasks, n) {
    const count = new Map();
    for (const t of tasks) {
        count.set(t, (count.get(t) || 0) + 1);
    }
    
    const heap = [];
    for (const [, c] of count) {
        heap.push(-c); // max-heap (negated)
    }
    heap.sort((a, b) => a - b);
    
    const queue = []; // [count, availableTime]
    let time = 0;
    
    while (heap.length > 0 || queue.length > 0) {
        time++;
        
        if (heap.length > 0) {
            const cnt = -heap.shift();
            if (cnt - 1 > 0) {
                queue.push([cnt - 1, time + n]);
            }
        }
        
        if (queue.length > 0 && queue[0][1] === time) {
            const [cnt] = queue.shift();
            heap.push(-cnt);
            heap.sort((a, b) => a - b);
        }
    }
    
    return time;
}
```

### Complexity Analysis
- **Time**: O(n) to count + O(time) simulation
- **Space**: O(1) — at most 26 letters

---

## Approach 2: Math Formula

```javascript
function leastIntervalMath(tasks, n) {
    const count = new Map();
    let maxFreq = 0;
    for (const t of tasks) {
        const c = (count.get(t) || 0) + 1;
        count.set(t, c);
        maxFreq = Math.max(maxFreq, c);
    }
    
    let maxCount = 0;
    for (const c of count.values()) {
        if (c === maxFreq) maxCount++;
    }
    
    const partCount = maxFreq - 1;
    const partLength = n - (maxCount - 1);
    const emptySlots = partCount * partLength;
    const availableTasks = tasks.length - maxFreq * maxCount;
    const idles = Math.max(0, emptySlots - availableTasks);
    
    return tasks.length + idles;
}

// Simpler formula:
function leastIntervalSimple(tasks, n) {
    const freq = new Array(26).fill(0);
    for (const t of tasks) {
        freq[t.charCodeAt(0) - 65]++;
    }
    freq.sort((a, b) => b - a);
    const maxFreq = freq[0];
    let idle = (maxFreq - 1) * n;
    for (let i = 1; i < 26 && freq[i] > 0; i++) {
        idle -= Math.min(freq[i], maxFreq - 1);
    }
    return tasks.length + Math.max(0, idle);
}
```

---

## Key Takeaways

✅ Schedule most frequent first; respect cooldown  
✅ Max-heap by count; queue for waiting tasks (available time)  
✅ Each time unit: pop from heap or idle; push back with time+n  
✅ Math: (maxFreq-1)*(n+1) + numOfMaxFreq tasks  
✅ O(n) with formula  
✅ Pattern: Schedule with cooldown → Heap + queue or math  

**Pattern**: Task scheduling with cooldown → Heap + queue!
