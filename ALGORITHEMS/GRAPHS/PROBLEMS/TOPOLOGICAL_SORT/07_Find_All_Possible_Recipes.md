# 🍳 Find All Possible Recipes from Given Supplies

**LeetCode 2115** | **Medium** | **Topological Sort - Multiple Targets**

---

## 📝 Problem Description

You have information about `n` different recipes. You are given a string array `recipes` and a 2D string array `ingredients`. The `ith` recipe has the name `recipes[i]`, and you can **create** it if you have **all** the needed ingredients from `ingredients[i]`. Ingredients to a recipe may need to be created from **other** recipes, i.e., `ingredients[i]` may contain a string that is in `recipes`.

You are also given a string array `supplies` containing all the ingredients that you initially have, and you have an infinite supply of all of them.

Return *a list of all the recipes that you can create*. You may return the answer in **any order**.

Note that two recipes may contain each other in their ingredients.

### Example 1:

**Input:**

```
recipes = ["bread"]
ingredients = [["yeast","flour"]]
supplies = ["yeast","flour","corn"]
```

**Output:**

```
["bread"]
```

**Explanation:**

```
We can create "bread" since we have "yeast" and "flour".
```

### Example 2:

**Input:**

```
recipes = ["bread","sandwich"]
ingredients = [["yeast","flour"],["bread","meat"]]
supplies = ["yeast","flour","meat"]
```

**Output:**

```
["bread","sandwich"]
```

**Explanation:**

```
Step 1: Create "bread" using "yeast" and "flour"
Step 2: Create "sandwich" using "bread" (from step 1) and "meat"
```

### Example 3:

**Input:**

```
recipes = ["bread","sandwich","burger"]
ingredients = [["yeast","flour"],["bread","meat"],["sandwich","meat","bread"]]
supplies = ["yeast","flour","meat"]
```

**Output:**

```
["bread","sandwich","burger"]
```

### Constraints:

- `n == recipes.length == ingredients.length`
- `1 <= n <= 100`
- `1 <= ingredients[i].length, supplies.length <= 100`
- `1 <= recipes[i].length, ingredients[i][j].length, supplies[k].length <= 10`
- `recipes[i], ingredients[i][j], supplies[k]` consist only of lowercase English letters
- All the values of `recipes` and `supplies` combined are unique
- Each `ingredients[i]` does not contain any duplicate values

---

## 💡 Intuition

This is **topological sort with dependency resolution**:

### Key Insight:

```
Recipe = Node in graph
Ingredient that is also a recipe = Edge (dependency)
Supplies = Nodes with in-degree 0 (already available)

Problem: Find which recipes can be created (reachable from supplies)
```

### Graph Construction:

```
Example: recipes = ["bread","sandwich"]
         ingredients = [["yeast","flour"],["bread","meat"]]
         supplies = ["yeast","flour","meat"]

Dependency graph:
yeast (supply) ─┐
                ├─→ bread ─→ sandwich
flour (supply) ─┘
meat (supply) ──────────────┘

"bread" depends on: yeast, flour (both available)
"sandwich" depends on: bread, meat
```

### Approach:

1. **Build dependency graph**: Recipe → ingredients
2. **Calculate in-degrees**: Count unsatisfied dependencies
3. **Kahn's algorithm**: Start with items in supplies (in-degree 0)
4. **Collect recipes**: Track which recipes become available

---

## 🔍 Algorithm

### Kahn's Algorithm Adaptation:

1. **Initialize**:
   - Track all recipes and supplies
   - Build graph: recipe → list of ingredients
   - Calculate in-degrees (number of unmet dependencies)

2. **Start with supplies**:
   - Add all supplies to queue (they're available)
   - Mark them as "available"

3. **BFS**:
   - Process each available item
   - For recipes that use this item, reduce in-degree
   - If recipe's in-degree becomes 0, it can be created!
   - Add newly created recipe to queue

4. **Return** all recipes that were created

---

## 💻 Code

### Solution 1: Kahn's Algorithm (Optimal!)

```javascript
/**
 * @param {string[]} recipes
 * @param {string[][]} ingredients
 * @param {string[]} supplies
 * @return {string[]}
 */
var findAllRecipes = function (recipes, ingredients, supplies) {
  const recipeSet = new Set(recipes);

  // Build graph: ingredient -> recipes that need it
  const graph = new Map();
  const inDegree = new Map();

  // Initialize
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    inDegree.set(recipe, 0);

    for (const ingredient of ingredients[i]) {
      // Count only ingredients that are recipes (dependencies)
      if (recipeSet.has(ingredient)) {
        inDegree.set(recipe, inDegree.get(recipe) + 1);
      }

      // Build reverse graph
      if (!graph.has(ingredient)) {
        graph.set(ingredient, []);
      }
      graph.get(ingredient).push(recipe);
    }
  }

  // Start with supplies (available items)
  const queue = [...supplies];
  const available = new Set(supplies);
  const result = [];

  // BFS
  while (queue.length > 0) {
    const item = queue.shift();

    // If this item is a recipe we created
    if (recipeSet.has(item)) {
      result.push(item);
    }

    // Check recipes that need this item
    if (graph.has(item)) {
      for (const recipe of graph.get(item)) {
        // Reduce dependency count
        inDegree.set(recipe, inDegree.get(recipe) - 1);

        // If all dependencies met, can create this recipe
        if (inDegree.get(recipe) === 0 && !available.has(recipe)) {
          available.add(recipe);
          queue.push(recipe);
        }
      }
    }
  }

  return result;
};
```

### Solution 2: DFS with Memoization

```javascript
/**
 * @param {string[]} recipes
 * @param {string[][]} ingredients
 * @param {string[]} supplies
 * @return {string[]}
 */
var findAllRecipes = function (recipes, ingredients, supplies) {
  const supplySet = new Set(supplies);
  const recipeMap = new Map();

  // Build recipe -> ingredients map
  for (let i = 0; i < recipes.length; i++) {
    recipeMap.set(recipes[i], ingredients[i]);
  }

  const memo = new Map(); // Cache results
  const visiting = new Set(); // Detect cycles

  function canCreate(item) {
    // Already in supplies
    if (supplySet.has(item)) return true;

    // Not a recipe
    if (!recipeMap.has(item)) return false;

    // Cycle detected
    if (visiting.has(item)) return false;

    // Already computed
    if (memo.has(item)) return memo.get(item);

    visiting.add(item);

    // Check if all ingredients can be created
    const itemIngredients = recipeMap.get(item);
    for (const ingredient of itemIngredients) {
      if (!canCreate(ingredient)) {
        visiting.delete(item);
        memo.set(item, false);
        return false;
      }
    }

    visiting.delete(item);
    memo.set(item, true);
    return true;
  }

  const result = [];

  for (const recipe of recipes) {
    if (canCreate(recipe)) {
      result.push(recipe);
    }
  }

  return result;
};
```

---

## ⏱️ Time and Space Complexity

### Kahn's Algorithm:

**Time Complexity: O(R + I)**

where R = number of recipes, I = total ingredients

- Build graph: O(I)
- BFS: O(R + I)
- Total: O(R + I)

**Space Complexity: O(R + I)**

- Graph: O(I)
- In-degree map: O(R)
- Queue: O(R + S) where S = supplies

### DFS with Memoization:

**Time Complexity: O(R × I)**

- Each recipe checked once: O(R)
- Each check scans ingredients: O(I)
- With memo: O(R + I)

**Space Complexity: O(R + I)**

- Recipe map: O(R + I)
- Memo: O(R)
- Recursion: O(R)

---

## 🎯 Dry Run

### Input:

```
recipes = ["bread","sandwich","burger"]
ingredients = [["yeast","flour"],["bread","meat"],["sandwich","meat","bread"]]
supplies = ["yeast","flour","meat"]
```

### Graph Construction:

**Recipe Dependencies (only recipes, not supplies):**

```
bread: 0 recipe-dependencies
sandwich: 1 recipe-dependency (bread)
burger: 2 recipe-dependencies (sandwich, bread)
```

**Reverse Graph (who needs what):**

```
yeast → [bread]
flour → [bread]
meat → [sandwich, burger]
bread → [sandwich, burger]
sandwich → [burger]
```

### Kahn's Execution:

| Step | Queue | Process | InDegree Update | Available | Result |
| ---- | ----- | ------- | --------------- | --------- | ------ |
| Init | [yeast,flour,meat] | - | [0,1,2] | supplies | [] |
| 1 | [flour,meat] | yeast | - | - | [] |
| 2 | [meat] | flour | - | - | [] |
| 3 | [bread] | meat | sandwich:0 | +meat | [] |
| 4 | [sandwich] | bread | sandwich:0, burger:1 | +bread | [bread] |
| 5 | [burger] | sandwich | burger:0 | +sandwich | [bread,sandwich] |
| 6 | [] | burger | - | +burger | [bread,sandwich,burger] |

**Result: ["bread","sandwich","burger"]** ✅

---

## 🎓 Key Takeaways

1. **Dependency Resolution**: Like package manager installing dependencies
2. **Two-Type Nodes**: Recipes (can create) vs Supplies (already have)
3. **Reverse Graph**: Build ingredient → recipes mapping
4. **Count Recipe Dependencies**: Only count ingredients that are recipes
5. **Kahn's is Natural**: BFS-based dependency resolution
6. **Memoization for DFS**: Cache creation results

---

## 🔄 Real-World Application

This problem models:
- **Package Managers**: npm, pip, apt (install dependencies)
- **Build Systems**: Make, Gradle (compile dependencies)
- **Recipe Books**: Cooking with prerequisite dishes
- **Crafting Games**: Minecraft-style item creation

---

## 📚 Related Problems

1. **Course Schedule II** (LeetCode 210) - Similar dependency resolution
2. **Parallel Courses** (LeetCode 1136) - Minimum time to complete
3. **Minimum Height Trees** (LeetCode 310) - Tree center finding
4. **Clone Graph** (LeetCode 133) - Graph traversal
5. **Evaluate Division** (LeetCode 399) - Graph with weights

---

