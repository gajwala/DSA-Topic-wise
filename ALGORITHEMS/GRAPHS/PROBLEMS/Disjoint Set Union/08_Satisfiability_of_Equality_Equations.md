# ✅ Satisfiability of Equality Equations

**LeetCode 990** | **Medium** | **Union-Find - Constraint Validation**

---

## 📝 Problem Description

You are given an array of strings `equations` that represent relationships between variables where each string `equations[i]` is of length `4` and takes one of two different forms: `"xi==yi"` or `"xi!=yi"`. Here, `xi` and `yi` are lowercase letters (not necessarily different) that represent one-letter variable names.

Return `true` *if it is possible to assign integers to variable names so as to satisfy all the given equations, or* `false` *otherwise*.

### Example 1:

**Input:**

```
equations = ["a==b","b!=a"]
```

**Output:**

```
false
```

**Explanation:**

```
a == b means a and b must be equal
b != a means b and a must NOT be equal
Contradiction! → false
```

### Example 2:

**Input:**

```
equations = ["b==a","a==b"]
```

**Output:**

```
true
```

**Explanation:**

```
Both say a and b are equal
Consistent! → true
```

### Example 3:

**Input:**

```
equations = ["a==b","b==c","a==c"]
```

**Output:**

```
true
```

---

## 💡 Intuition

**Two-pass Union-Find**:

1. **First pass**: Union all `==` equations
2. **Second pass**: Check all `!=` equations

---

## 💻 Code

```javascript
/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function (equations) {
  const parent = Array(26)
    .fill(0)
    .map((_, i) => i);

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(x, y) {
    parent[find(x)] = find(y);
  }

  // Pass 1: Union all == equations
  for (const eq of equations) {
    if (eq[1] === "=") {
      const x = eq.charCodeAt(0) - 97; // 'a' = 0
      const y = eq.charCodeAt(3) - 97;
      union(x, y);
    }
  }

  // Pass 2: Check all != equations
  for (const eq of equations) {
    if (eq[1] === "!") {
      const x = eq.charCodeAt(0) - 97;
      const y = eq.charCodeAt(3) - 97;

      if (find(x) === find(y)) {
        return false; // Contradiction!
      }
    }
  }

  return true;
};
```

---

## ⏱️ Complexity

**Time: O(N×α(26)) ≈ O(N)**
**Space: O(26) = O(1)**

---

