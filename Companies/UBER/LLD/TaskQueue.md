This is a professional **Technical Design Document** in Markdown format. It follows the "Senior Engineer" workflow: starting with clarification, moving to high-level architecture, and finishing with a robust, production-ready implementation.

---

# Technical Design Document: Asynchronous Task Manager

**Candidate:** [Your Name]  
**Position:** Senior Frontend Engineer  
**Problem:** Design a library to manage asynchronous tasks with dependencies, concurrency control, and priority.

---

## 1. Requirement Clarification
*Before coding, I confirmed the following constraints with the interviewer:*

* **Concurrency:** The system must limit the number of tasks running in parallel to avoid starving the main thread.
* **Dependencies:** Tasks form a Directed Acyclic Graph (DAG). A task can only run when all its dependencies have finished successfully.
* **Priority:** If multiple tasks are ready to run, the one with the highest priority score executes first.
* **Resilience:** Tasks should support a `maxRetries` configuration for transient failures.
* **Validation:** The system must detect circular dependencies (deadlocks) before execution.

---

## 2. High-Level Architecture

### Data Structures
* **Task Store (`Map`):** Stores all task objects for $O(1)$ lookup by ID.
* **Execution Queue (`Array`):** A sorted list of tasks that are "Ready" (dependencies met) but not yet running.
* **Adjacency List:** Using a `dependents` array within each task to allow for **Event-Driven** triggering instead of constant polling.



---

## 3. Implementation (JavaScript)

```javascript
/**
 * Task Management Library
 * Features: Concurrency, DAG Dependencies, Priority, Retries, Cycle Detection
 */

class Task {
  constructor(id, action, options = {}) {
    this.id = id;
    this.action = action; // Function returning a Promise
    this.dependencies = new Set(options.dependencies || []);
    this.priority = options.priority || 0;
    this.maxRetries = options.maxRetries || 0;
    
    this.status = 'IDLE'; // IDLE | PENDING | SUCCESS | FAILED
    this.retryCount = 0;
    this.dependents = []; // Tasks waiting for this task to finish
  }
}

class TaskRunner {
  constructor(concurrency = 2) {
    this.tasks = new Map();
    this.concurrency = concurrency;
    this.runningCount = 0;
    this.readyQueue = [];
  }

  /**
   * Register a new task in the system
   */
  addTask(id, action, options) {
    const task = new Task(id, action, options);
    this.tasks.set(id, task);
  }

  /**
   * Detects circular dependencies using DFS
   */
  hasCycle() {
    const visited = new Set();
    const stack = new Set();

    const dfs = (nodeId) => {
      if (stack.has(nodeId)) return true; // Found a back-edge
      if (visited.has(nodeId)) return false;

      visited.add(nodeId);
      stack.add(nodeId);

      const task = this.tasks.get(nodeId);
      for (const depId of task.dependencies) {
        if (dfs(depId)) return true;
      }

      stack.delete(nodeId);
      return false;
    };

    for (const taskId of this.tasks.keys()) {
      if (dfs(taskId)) return true;
    }
    return false;
  }

  /**
   * Initializes the runner and starts execution
   */
  async start() {
    if (this.hasCycle()) {
      throw new Error("Initialization Failed: Circular dependency detected.");
    }

    // 1. Build the dependent "Notification" graph
    this.tasks.forEach((task) => {
      task.dependencies.forEach((depId) => {
        const parent = this.tasks.get(depId);
        if (parent) parent.dependents.push(task.id);
      });
    });

    // 2. Initial trigger
    this._refreshAndProcess();
  }

  _refreshAndProcess() {
    // Identify tasks whose dependencies are all SUCCESS
    const available = Array.from(this.tasks.values()).filter((task) => {
      if (task.status !== 'IDLE') return false;
      return Array.from(task.dependencies).every(
        (depId) => this.tasks.get(depId)?.status === 'SUCCESS'
      );
    });

    // Sort by Priority (High to Low)
    this.readyQueue = available.sort((a, b) => b.priority - a.priority);

    this._run();
  }

  async _run() {
    while (this.runningCount < this.concurrency && this.readyQueue.length > 0) {
      const task = this.readyQueue.shift();
      this._executeTask(task);
    }
  }

  async _executeTask(task) {
    this.runningCount++;
    task.status = 'PENDING';

    try {
      console.log(`[RUNNING] Task: ${task.id}`);
      await task.action();
      task.status = 'SUCCESS';
      console.log(`[COMPLETED] Task: ${task.id}`);
    } catch (err) {
      if (task.retryCount < task.maxRetries) {
        task.retryCount++;
        task.status = 'IDLE';
        console.warn(`[RETRYING] Task: ${task.id} (${task.retryCount}/${task.maxRetries})`);
      } else {
        task.status = 'FAILED';
        console.error(`[FAILED] Task: ${task.id}`);
      }
    } finally {
      this.runningCount--;
      // Re-evaluate the graph to see which dependents are now unblocked
      this._refreshAndProcess();
    }
  }
}
```

---

## 4. Interview Follow-up Discussion Points

### Q1: How would you improve performance for thousands of tasks?
**A:** Instead of an array for `readyQueue`, I would use a **Binary Heap (Priority Queue)** to reduce the sorting complexity from $O(N \log N)$ to $O(\log N)$ for insertions.

### Q2: How can we make this "Slick" for the user (Frontend integration)?
**A:** I would implement an **Observer Pattern** or `EventEmitter`. The `TaskRunner` would emit events like `onTaskProgress` or `onStatusChange`. A React component could subscribe to these events to update a progress bar or status dashboard.

### Q3: What happens if a task in the middle fails?
**A:** With the current logic, any dependent tasks will remain in the `IDLE` status indefinitely because their requirement (`SUCCESS`) is never met. In an enterprise system, I would implement a `FAIL_FAST` policy or a way to "skip" failed branches.

---

### 5. Example Usage
```javascript
const runner = new TaskRunner(2);

const job = (id, time) => () => new Promise(res => setTimeout(res, time));

runner.addTask('A', job('A', 1000), { priority: 5 });
runner.addTask('B', job('B', 500), { priority: 10 });
runner.addTask('C', job('C', 800), { dependencies: ['A', 'B'] });

runner.start();
```
