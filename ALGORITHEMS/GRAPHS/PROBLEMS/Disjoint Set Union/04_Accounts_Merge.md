# 📧 Accounts Merge

**LeetCode 721** | **Medium** | **Union-Find - Merge Connected Components**

---

## 📝 Problem Description

Given a list of `accounts` where each element `accounts[i]` is a list of strings, where the first element `accounts[i][0]` is a name, and the rest of the elements are **emails** representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails **in sorted order**. The accounts themselves can be returned in **any order**.

### Example 1:

**Input:**

```
accounts = [
  ["John","johnsmith@mail.com","john_newyork@mail.com"],
  ["John","johnsmith@mail.com","john00@mail.com"],
  ["Mary","mary@mail.com"],
  ["John","johnnybravo@mail.com"]
]
```

**Output:**

```
[
  ["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],
  ["Mary","mary@mail.com"],
  ["John","johnnybravo@mail.com"]
]
```

**Explanation:**

```
First two "John" accounts share "johnsmith@mail.com" → merge
Third "Mary" → separate
Fourth "John" → no common emails with first two → separate

Result: 3 accounts total
```

### Example 2:

**Input:**

```
accounts = [
  ["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],
  ["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],
  ["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],
  ["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],
  ["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]
]
```

**Output:**

```
[
  ["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],
  ["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],
  ["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],
  ["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"],
  ["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"]
]
```

### Constraints:

- `1 <= accounts.length <= 1000`
- `2 <= accounts[i].length <= 10`
- `1 <= accounts[i][j].length <= 30`
- `accounts[i][0]` consists of English letters
- `accounts[i][j]` (for `j > 0`) is a valid email

---

## 💡 Intuition

This is a **Union-Find component merging** problem:

### Key Insight:

```
Emails are nodes in a graph
Accounts sharing emails → connected components

Goal: Group all emails belonging to same person
```

### Algorithm Strategy:

```
1. Treat each email as a node
2. If two emails in same account → they're connected
3. Use Union-Find to merge connected emails
4. Group by root parent (same component)
5. Sort emails, add name
```

### Why Union-Find?

- ✅ Efficiently merge components
- ✅ Transitivity: If A=B and B=C, then A=C
- ✅ Handle complex connections
- ✅ Fast grouping by root

---

## 🔍 Algorithm

### Union-Find on Emails:

1. **Assign indices** to emails (email → index map)
2. **Union emails** within each account
3. **Group by root**: Collect emails with same root
4. **Format result**: Add name, sort emails

---

## 💻 Code

### Solution: Union-Find with Email Mapping

```javascript
/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  const emailToIndex = new Map();
  const emailToName = new Map();
  let index = 0;

  // Assign index to each unique email
  for (const account of accounts) {
    const name = account[0];

    for (let i = 1; i < account.length; i++) {
      const email = account[i];

      if (!emailToIndex.has(email)) {
        emailToIndex.set(email, index++);
        emailToName.set(email, name);
      }
    }
  }

  // Initialize Union-Find
  const parent = Array(index)
    .fill(0)
    .map((_, i) => i);
  const rank = Array(index).fill(0);

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) return;

    if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }
  }

  // Union emails within each account
  for (const account of accounts) {
    const firstEmailIndex = emailToIndex.get(account[1]);

    for (let i = 2; i < account.length; i++) {
      const emailIndex = emailToIndex.get(account[i]);
      union(firstEmailIndex, emailIndex);
    }
  }

  // Group emails by root
  const components = new Map();

  for (const [email, idx] of emailToIndex) {
    const root = find(idx);

    if (!components.has(root)) {
      components.set(root, []);
    }
    components.get(root).push(email);
  }

  // Format result
  const result = [];

  for (const [root, emails] of components) {
    emails.sort(); // Sort emails alphabetically
    const firstEmail = emails[0];
    const name = emailToName.get(firstEmail);
    result.push([name, ...emails]);
  }

  return result;
};
```

---

## ⏱️ Time and Space Complexity

**Time Complexity: O(N × K × α(N×K) + N × K × log(K))**

where N = accounts, K = max emails per account

- Build email map: O(N × K)
- Union operations: O(N × K × α(N×K))
- Sort emails: O(N × K × log(K))
- **Dominant: O(N × K × log(K))**

**Space Complexity: O(N × K)**

- Email maps: O(N × K)
- Union-Find arrays: O(N × K)
- Result: O(N × K)

---

## 🎯 Dry Run

### Input:

```
accounts = [
  ["John","j1@mail.com","j2@mail.com"],
  ["John","j2@mail.com","j3@mail.com"],
  ["Mary","m1@mail.com"]
]
```

### Step 1: Email Mapping

```
j1@mail.com → 0
j2@mail.com → 1
j3@mail.com → 2
m1@mail.com → 3

parent: [0, 1, 2, 3]
```

### Step 2: Union Operations

**Account 1: ["John","j1","j2"]**

```
union(0, 1)
parent: [0, 0, 2, 3]
```

**Account 2: ["John","j2","j3"]**

```
union(1, 2) → union(find(1), find(2)) → union(0, 2)
parent: [0, 0, 0, 3]
```

**Account 3: ["Mary","m1"]**

```
Only one email, no union needed
parent: [0, 0, 0, 3]
```

### Step 3: Group by Root

```
Root 0: [j1@mail.com, j2@mail.com, j3@mail.com]
Root 3: [m1@mail.com]
```

### Step 4: Format

```
["John", "j1@mail.com", "j2@mail.com", "j3@mail.com"]
["Mary", "m1@mail.com"]
```

**Result** ✅

---

## 🎓 Key Takeaways

1. **Email as Node**: Treat emails as graph nodes
2. **Transitive Merging**: Union-Find handles chains
3. **Group by Root**: Collect emails with same root
4. **Sort Emails**: Final step for clean output
5. **Name from Any Email**: All emails in component have same owner
6. **Efficient Merging**: O(α(N)) per operation

---

## 📚 Related Problems

1. **Friend Circles** (LeetCode 547) - Similar grouping
2. **Number of Provinces** (LeetCode 547) - Count components
3. **Redundant Connection** (LeetCode 684) - Detect cycles
4. **Smallest String With Swaps** (LeetCode 1202) - Group and sort
5. **Evaluate Division** (LeetCode 399) - Weighted Union-Find

---

