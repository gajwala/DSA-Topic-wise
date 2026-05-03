# Array Method Polyfills

---

## 1. `Array.prototype.filter` — `myFilter`

```js
const arr = [1, 2, 3];

const newArr = arr.filter((val, index, array) => {
  return val > 2;
});
console.log(newArr); // [3]

Array.prototype.myFilter = function (cb) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

const newArrayPolyfill = arr.myFilter((val, index, array) => {
  return val > 2;
});
console.log(newArrayPolyfill); // [3]
```

---

## 2. `Array.prototype.find` — `myFind`

```js
const arr = [1, 2, 3];

const a = arr.find((val) => {
  return val < 3 && val > 1;
});
console.log(a); // 2

Array.prototype.myFind = function (cb) {
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index], index, this)) {
      return this[index];
    }
  }
  return undefined;
};

console.log(arr.myFind((val) => val < 3 && val > 1)); // 2
```

---

## 3. `Array.prototype.flat` — `myFlat`

```js
const arr = [1, 2, [3, 4, [5, 6]]];

Array.prototype.myFlat = function (depth = 1) {
  return this.reduce((flat, toFlatten) => {
    return flat.concat(
      Array.isArray(toFlatten) && depth > 1
        ? toFlatten.myFlat(depth - 1)
        : toFlatten
    );
  }, []);
};

console.log(arr.myFlat(1)); // [1, 2, 3, 4, [5, 6]]
console.log(arr.myFlat(2)); // [1, 2, 3, 4, 5, 6]
console.log(arr.myFlat(Infinity)); // [1, 2, 3, 4, 5, 6]
```

---

## 4. `Array.prototype.forEach` — `myForEach`

```js
const arr = [1, 2, 3];

arr.forEach((val, index, array) => {
  console.log(val);
});

Array.prototype.myForEach = function (cb) {
  for (let index = 0; index < this.length; index++) {
    cb(this[index], index, this);
  }
};

arr.myForEach((val, index, array) => {
  console.log(val);
});
// 1
// 2
// 3
```

---

## 5. `Array.prototype.reduce` — `myReduce`

```js
const arr = [1, 2, 3];

const newArr = arr.reduce((acc, curr) => {
  return acc + curr;
}, 0);
console.log(newArr); // 6

Array.prototype.myReduce = function (cb, initialValue) {
  const hasInitial = initialValue !== undefined;
  let accumulator = hasInitial ? initialValue : this[0];
  const startIndex = hasInitial ? 0 : 1;
  for (let index = startIndex; index < this.length; index++) {
    accumulator = cb(accumulator, this[index], index, this);
  }
  return accumulator;
};

const reducePolyArr = arr.myReduce((acc, curr) => {
  return acc + curr;
}, 0);
console.log(reducePolyArr); // 6
```

---

## 6. `Array.prototype.map` — `myMap`

```js
const arr = [1, 2, 3];

const newArr = arr.map((val, index, array) => {
  return val * 2;
});
console.log(newArr); // [2, 4, 6]

Array.prototype.myMap = function (cb) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(cb(this[i], i, this));
  }
  return result;
};

const newArrayPolyfill = arr.myMap((val, index, array) => {
  return val * 2;
});
console.log(newArrayPolyfill); // [2, 4, 6]
```

---

## 7. `Array.prototype.findIndex` — `myFindIndex`

```js
const arr = [1, 2, 3];

const index = arr.findIndex((val) => val > 1);
console.log(index); // 1

Array.prototype.myFindIndex = function (cb) {
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index], index, this)) {
      return index;
    }
  }
  return -1;
};

console.log(arr.myFindIndex((val) => val > 1)); // 1
```

---

## 8. `Array.prototype.some` — `mySome`

```js
const arr = [1, 2, 3];

const result = arr.some((val) => val > 2);
console.log(result); // true

Array.prototype.mySome = function (cb) {
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index], index, this)) {
      return true;
    }
  }
  return false;
};

console.log(arr.mySome((val) => val > 2)); // true
```

---

## 9. `Array.prototype.every` — `myEvery`

```js
const arr = [1, 2, 3];

const result = arr.every((val) => val > 0);
console.log(result); // true

Array.prototype.myEvery = function (cb) {
  for (let index = 0; index < this.length; index++) {
    if (!cb(this[index], index, this)) {
      return false;
    }
  }
  return true;
};

console.log(arr.myEvery((val) => val > 0)); // true
console.log(arr.myEvery((val) => val > 1)); // false
```

---

## 10. `Array.prototype.includes` — `myIncludes`

```js
const arr = [1, 2, 3];

console.log(arr.includes(2)); // true
console.log(arr.includes(5)); // false

Array.prototype.myIncludes = function (value, fromIndex = 0) {
  const start = fromIndex < 0 ? Math.max(0, this.length + fromIndex) : fromIndex;
  for (let index = start; index < this.length; index++) {
    if (this[index] === value) {
      return true;
    }
  }
  return false;
};

console.log(arr.myIncludes(2)); // true
console.log(arr.myIncludes(5)); // false
```

---

## 11. `Array.prototype.indexOf` — `myIndexOf`

```js
const arr = [1, 2, 3, 2];

console.log(arr.indexOf(2)); // 1

Array.prototype.myIndexOf = function (value, fromIndex = 0) {
  const start = fromIndex < 0 ? Math.max(0, this.length + fromIndex) : fromIndex;
  for (let index = start; index < this.length; index++) {
    if (this[index] === value) {
      return index;
    }
  }
  return -1;
};

console.log(arr.myIndexOf(2));    // 1
console.log(arr.myIndexOf(2, 2)); // 3
console.log(arr.myIndexOf(5));    // -1
```

---

## 12. `Array.prototype.flatMap` — `myFlatMap`

```js
const arr = [1, 2, 3];

const result = arr.flatMap((val) => [val, val * 2]);
console.log(result); // [1, 2, 2, 4, 3, 6]

Array.prototype.myFlatMap = function (cb) {
  const result = [];
  for (let index = 0; index < this.length; index++) {
    const mapped = cb(this[index], index, this);
    if (Array.isArray(mapped)) {
      for (let j = 0; j < mapped.length; j++) {
        result.push(mapped[j]);
      }
    } else {
      result.push(mapped);
    }
  }
  return result;
};

console.log(arr.myFlatMap((val) => [val, val * 2])); // [1, 2, 2, 4, 3, 6]
```

---

## 13. `Array.prototype.fill` — `myFill`

```js
const arr = [1, 2, 3, 4, 5];

console.log(arr.fill(0, 1, 3)); // [1, 0, 0, 4, 5]

Array.prototype.myFill = function (value, start = 0, end = this.length) {
  const s = start < 0 ? Math.max(0, this.length + start) : Math.min(start, this.length);
  const e = end < 0 ? Math.max(0, this.length + end) : Math.min(end, this.length);
  for (let index = s; index < e; index++) {
    this[index] = value;
  }
  return this;
};

const arr2 = [1, 2, 3, 4, 5];
console.log(arr2.myFill(0, 1, 3)); // [1, 0, 0, 4, 5]
```

---

## 14. `Array.prototype.join` — `myJoin`

```js
const arr = [1, 2, 3];

console.log(arr.join("-")); // "1-2-3"

Array.prototype.myJoin = function (separator = ",") {
  let result = "";
  for (let index = 0; index < this.length; index++) {
    result += this[index];
    if (index < this.length - 1) {
      result += separator;
    }
  }
  return result;
};

console.log(arr.myJoin("-")); // "1-2-3"
console.log(arr.myJoin());    // "1,2,3"
```

---

## 15. `Array.prototype.reverse` — `myReverse`

```js
const arr = [1, 2, 3, 4, 5];

console.log(arr.reverse()); // [5, 4, 3, 2, 1]

Array.prototype.myReverse = function () {
  let left = 0;
  let right = this.length - 1;
  while (left < right) {
    const temp = this[left];
    this[left] = this[right];
    this[right] = temp;
    left++;
    right--;
  }
  return this;
};

const arr2 = [1, 2, 3, 4, 5];
console.log(arr2.myReverse()); // [5, 4, 3, 2, 1]
```

---

## Summary Table

| Method | Returns | Mutates Original |
|---|---|---|
| `myFilter` | New filtered array | ❌ |
| `myFind` | First matching value or `undefined` | ❌ |
| `myFlat` | New flattened array | ❌ |
| `myForEach` | `undefined` | ❌ |
| `myReduce` | Single accumulated value | ❌ |
| `myMap` | New transformed array | ❌ |
| `myFindIndex` | Index or `-1` | ❌ |
| `mySome` | `true` / `false` | ❌ |
| `myEvery` | `true` / `false` | ❌ |
| `myIncludes` | `true` / `false` | ❌ |
| `myIndexOf` | Index or `-1` | ❌ |
| `myFlatMap` | New mapped+flattened array | ❌ |
| `myFill` | Modified array | ✅ |
| `myJoin` | String | ❌ |
| `myReverse` | Modified array | ✅ |
