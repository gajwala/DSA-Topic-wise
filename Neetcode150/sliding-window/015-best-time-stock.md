# 15. Best Time to Buy and Sell Stock

**LeetCode Link**: [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

**Difficulty**: Easy

**Topics**: Array, Dynamic Programming, Sliding Window

---

## Problem Statement

You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.

### Examples

**Example 1:**
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
```

**Example 2:**
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: No profitable transaction, return 0.
```

### Constraints
- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

---

## Approach 1: Brute Force

```javascript
function maxProfit(prices) {
    let maxProfit = 0;
    
    for (let i = 0; i < prices.length; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            const profit = prices[j] - prices[i];
            maxProfit = Math.max(maxProfit, profit);
        }
    }
    
    return maxProfit;
}
```

**Complexity**: O(n²) - Too slow!

---

## Approach 2: Sliding Window / One Pass (Optimal!) ✅

### Intuition
Track minimum price seen so far. For each price, calculate profit if we sell today. Update maximum profit.

### Implementation

```javascript
/**
 * One Pass - O(n) time, O(1) space
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
        // Update minimum price
        minPrice = Math.min(minPrice, price);
        
        // Calculate profit if we sell today
        const profit = price - minPrice;
        
        // Update maximum profit
        maxProfit = Math.max(maxProfit, profit);
    }
    
    return maxProfit;
}

// Test
console.log(maxProfit([7,1,5,3,6,4])); // 5
console.log(maxProfit([7,6,4,3,1])); // 0
```

### Complexity Analysis
- **Time Complexity**: `O(n)` - Single pass
- **Space Complexity**: `O(1)` - Only two variables

---

## Visual Example

```
prices = [7, 1, 5, 3, 6, 4]

Day 0: price=7
  minPrice = 7
  profit = 7 - 7 = 0
  maxProfit = 0

Day 1: price=1
  minPrice = 1 (found lower!)
  profit = 1 - 1 = 0
  maxProfit = 0

Day 2: price=5
  minPrice = 1
  profit = 5 - 1 = 4
  maxProfit = 4 ✓

Day 3: price=3
  minPrice = 1
  profit = 3 - 1 = 2
  maxProfit = 4

Day 4: price=6
  minPrice = 1
  profit = 6 - 1 = 5
  maxProfit = 5 ✓

Day 5: price=4
  minPrice = 1
  profit = 4 - 1 = 3
  maxProfit = 5

Answer: 5 (Buy at 1, sell at 6)
```

---

## Key Takeaways

✅ Track minimum price seen so far  
✅ Calculate profit at each step  
✅ One pass solution - O(n)  
✅ Must sell after buying (future day)  

**Pattern**: Buy low, sell high → Track min and max profit!
