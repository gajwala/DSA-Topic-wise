# Function vs Class — Which is Better for a Promise Polyfill?

Both are functionally identical in JavaScript — `class` is just syntactic sugar over the prototype system. But here's the honest breakdown:

---

## For a Promise Polyfill Specifically — `function` is Better

---

## Full Code — `function` (Prototype-based)

```js
function MyPromise(executor) {
  this.state = "pending";
  this.value = undefined;
  this.reason = undefined;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (this.state !== "pending") return;
    this.state = "fulfilled";
    this.value = value;
    this.onFulfilledCallbacks.forEach((fn) => fn(value));
  };

  const reject = (reason) => {
    if (this.state !== "pending") return;
    this.state = "rejected";
    this.reason = reason;
    this.onRejectedCallbacks.forEach((fn) => fn(reason));
  };

  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

// .then()
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (r) => {
          throw r;
        };

  return new MyPromise((resolve, reject) => {
    const handle = (fn, value) => {
      setTimeout(() => {
        try {
          const result = fn(value);
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      }, 0);
    };

    if (this.state === "fulfilled") {
      handle(onFulfilled, this.value);
    } else if (this.state === "rejected") {
      handle(onRejected, this.reason);
    } else {
      this.onFulfilledCallbacks.push((value) => handle(onFulfilled, value));
      this.onRejectedCallbacks.push((reason) => handle(onRejected, reason));
    }
  });
};

// .catch()
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

// .finally()
MyPromise.prototype.finally = function (callback) {
  return this.then(
    (value) => MyPromise.resolve(callback()).then(() => value),
    (reason) =>
      MyPromise.resolve(callback()).then(() => {
        throw reason;
      })
  );
};

// Promise.resolve()
MyPromise.resolve = function (value) {
  if (value instanceof MyPromise) return value;
  return new MyPromise((resolve) => resolve(value));
};

// Promise.reject()
MyPromise.reject = function (reason) {
  return new MyPromise((_, reject) => reject(reason));
};

// Promise.all()
MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve([]);
    promises.forEach((p, i) => {
      MyPromise.resolve(p).then((value) => {
        results[i] = value;
        if (++completed === promises.length) resolve(results);
      }, reject);
    });
  });
};

// Promise.allSettled()
MyPromise.allSettled = function (promises) {
  return new MyPromise((resolve) => {
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve([]);
    promises.forEach((p, i) => {
      MyPromise.resolve(p).then(
        (value) => {
          results[i] = { status: "fulfilled", value };
          if (++completed === promises.length) resolve(results);
        },
        (reason) => {
          results[i] = { status: "rejected", reason };
          if (++completed === promises.length) resolve(results);
        }
      );
    });
  });
};

// Promise.race()
MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach((p) => MyPromise.resolve(p).then(resolve, reject));
  });
};

// Promise.any()
MyPromise.any = function (promises) {
  return new MyPromise((resolve, reject) => {
    const errors = [];
    let rejected = 0;
    if (promises.length === 0)
      return reject(new AggregateError([], "All promises were rejected"));
    promises.forEach((p, i) => {
      MyPromise.resolve(p).then(resolve, (reason) => {
        errors[i] = reason;
        if (++rejected === promises.length)
          reject(new AggregateError(errors, "All promises were rejected"));
      });
    });
  });
};
```

---

## Full Code — `class` (Syntactic Sugar)

```js
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = value;
      this.onFulfilledCallbacks.forEach((fn) => fn(value));
    };

    const reject = (reason) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fn) => fn(reason));
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // .then()
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (r) => {
            throw r;
          };

    return new MyPromise((resolve, reject) => {
      const handle = (fn, value) => {
        setTimeout(() => {
          try {
            const result = fn(value);
            if (result instanceof MyPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (err) {
            reject(err);
          }
        }, 0);
      };

      if (this.state === "fulfilled") {
        handle(onFulfilled, this.value);
      } else if (this.state === "rejected") {
        handle(onRejected, this.reason);
      } else {
        this.onFulfilledCallbacks.push((value) => handle(onFulfilled, value));
        this.onRejectedCallbacks.push((reason) => handle(onRejected, reason));
      }
    });
  }

  // .catch()
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // .finally()
  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          throw reason;
        })
    );
  }

  // Promise.resolve()
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }

  // Promise.reject()
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  // Promise.all()
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let completed = 0;
      if (promises.length === 0) return resolve([]);
      promises.forEach((p, i) => {
        MyPromise.resolve(p).then((value) => {
          results[i] = value;
          if (++completed === promises.length) resolve(results);
        }, reject);
      });
    });
  }

  // Promise.allSettled()
  static allSettled(promises) {
    return new MyPromise((resolve) => {
      const results = [];
      let completed = 0;
      if (promises.length === 0) return resolve([]);
      promises.forEach((p, i) => {
        MyPromise.resolve(p).then(
          (value) => {
            results[i] = { status: "fulfilled", value };
            if (++completed === promises.length) resolve(results);
          },
          (reason) => {
            results[i] = { status: "rejected", reason };
            if (++completed === promises.length) resolve(results);
          }
        );
      });
    });
  }

  // Promise.race()
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((p) => MyPromise.resolve(p).then(resolve, reject));
    });
  }

  // Promise.any()
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      const errors = [];
      let rejected = 0;
      if (promises.length === 0)
        return reject(new AggregateError([], "All promises were rejected"));
      promises.forEach((p, i) => {
        MyPromise.resolve(p).then(resolve, (reason) => {
          errors[i] = reason;
          if (++rejected === promises.length)
            reject(new AggregateError(errors, "All promises were rejected"));
        });
      });
    });
  }
}
```

---

## Usage Examples (Same for Both)

```js
// Basic resolve/reject
const p1 = new MyPromise((resolve) => resolve(42));
p1.then((v) => console.log("Resolved:", v)); // 42

const p2 = new MyPromise((_, reject) => reject("Oops"));
p2.catch((e) => console.log("Rejected:", e)); // Oops

// Chaining
MyPromise.resolve(1)
  .then((v) => v + 1)
  .then((v) => v * 3)
  .then((v) => console.log("Chain result:", v)); // 6

// Promise.all
MyPromise.all([
  MyPromise.resolve(1),
  MyPromise.resolve(2),
  MyPromise.resolve(3),
]).then((values) => console.log("All:", values)); // [1, 2, 3]

// Promise.allSettled
MyPromise.allSettled([
  MyPromise.resolve("ok"),
  MyPromise.reject("fail"),
]).then((results) => console.log("AllSettled:", results));
// [{ status: 'fulfilled', value: 'ok' }, { status: 'rejected', reason: 'fail' }]

// Promise.race
MyPromise.race([
  new MyPromise((resolve) => setTimeout(() => resolve("slow"), 200)),
  new MyPromise((resolve) => setTimeout(() => resolve("fast"), 50)),
]).then((v) => console.log("Race winner:", v)); // fast

// Promise.any
MyPromise.any([
  MyPromise.reject("err1"),
  MyPromise.resolve("first success"),
  MyPromise.resolve("second success"),
]).then((v) => console.log("Any:", v)); // first success

// finally
MyPromise.resolve("data")
  .then((v) => {
    console.log("Got:", v);
    return v;
  })
  .finally(() => console.log("Cleanup done"))
  .then((v) => console.log("After finally:", v)); // data
```

---

## Side-by-Side Comparison

| | `function` + prototype | `class` |
|---|---|---|
| ES5 compatible | ✅ Yes | ❌ No (requires ES6+) |
| Shows internals clearly | ✅ Yes | ❌ Hidden behind syntax |
| Readability | Verbose | Clean |
| Polyfill use case | ✅ Preferred | Not ideal |
| Production app code | Verbose | ✅ Preferred |
| Needs transpilation | No | Yes (for old envs) |

---

## When to Use Which

| Use Case | Prefer |
|---|---|
| Polyfill / teaching internals | `function` + prototype |
| Production app code | `class` |
| Interview — "how does Promise work?" | `function` — shows deeper knowledge |
| Interview — "write clean code" | `class` |

---

## Conclusion

If you're writing this polyfill to **understand** how Promises work or to **support IE/old environments**, go with `function`. If you're writing it as a clean reference implementation for a modern codebase, `class` is fine.

> Under the hood, both produce the exact same prototype chain. `class` is just a cleaner way to write it.
