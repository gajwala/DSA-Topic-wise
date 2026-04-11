function memoizeUserData(fn) {
  const cache = new Map();

  const stableStringify = (obj) => {
    if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
    if (Array.isArray(obj)) return `[${obj.map(stableStringify).join(",")}]`;
    return `{${Object.keys(obj)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${stableStringify(obj[k])}`)
      .join(",")}}`;
  };

  return (...args) => {
    const cb = args.pop();
    const key = args.map(stableStringify).join("|");
    console.log(key)

    if (cache.has(key)) {
      const entry = cache.get(key);
      if (entry.pending) {
        entry.callbacks.push(cb);
      } else {
        cb(entry.err, entry.data);
      }
      return;
    }

    cache.set(key, { pending: true, callbacks: [cb] });

    fn(...args, (err, data) => {
      const entry = cache.get(key);
      cache.set(key, { pending: false, err, data });

      for (const callback of entry.callbacks) {
        callback(err, data);
      }
    });
  };
}


async function getUserData(q, key, cb) {
  fetch(`https://dummyjson.com/products?limit=10&skip=20&select=title,price`)
    .then((res) => res.json())
    .then((data) => cb(null, data))
    .catch((err) => cb(err));
}

const memoFun = memoizeUserData(getUserData);

memoFun("test", 100, (err, data) => {
  console.log("first:", err, data);
});

memoFun("test", 100, (err, data) => {
  console.log("second:", err, data);
});
