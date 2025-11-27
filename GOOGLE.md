
# Google Interview Preparation - 100+ Problems

## Table of Contents
1. [Array Problems](#array-problems)
2. [String Problems](#string-problems)
3. [Linked List Problems](#linked-list-problems)
4. [Tree Problems](#tree-problems)
5. [Graph Problems](#graph-problems)
6. [Dynamic Programming](#dynamic-programming)
7. [Stack & Queue](#stack--queue)
8. [Two Pointers & Sliding Window](#two-pointers--sliding-window)
9. [Design Problems](#design-problems)
10. [Math & Logic](#math--logic)

---

## Array Problems

### Problem 1: Two Sum (Easy)
**Time**: O(n) | **Space**: O(n)
```javascript
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
}
// Example: twoSum([2,7,11,15], 9) → [0,1]
```

### Problem 2: Best Time to Buy and Sell Stock (Easy)
**Time**: O(n) | **Space**: O(1)
```javascript
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (let price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}
```

### Problem 3: Contains Duplicate (Easy)
**Time**: O(n) | **Space**: O(n)
```javascript
function containsDuplicate(nums) {
    return new Set(nums).size !== nums.length;
}
```

### Problem 4: Product of Array Except Self (Medium)
**Time**: O(n) | **Space**: O(1)
```javascript
function productExceptSelf(nums) {
    const n = nums.length;
    const result = Array(n);
    
    result[0] = 1;
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    let right = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= right;
        right *= nums[i];
    }
    
    return result;
}
```

### Problem 5: Maximum Subarray (Medium)
**Time**: O(n) | **Space**: O(1)
```javascript
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}
```

### Problem 6: Maximum Product Subarray (Medium)
**Time**: O(n) | **Space**: O(1)
```javascript
function maxProduct(nums) {
    let maxSoFar = nums[0];
    let maxHere = nums[0];
    let minHere = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < 0) {
            [maxHere, minHere] = [minHere, maxHere];
        }
        
        maxHere = Math.max(nums[i], maxHere * nums[i]);
        minHere = Math.min(nums[i], minHere * nums[i]);
        maxSoFar = Math.max(maxSoFar, maxHere);
    }
    
    return maxSoFar;
}
```

### Problem 7: Find Minimum in Rotated Sorted Array (Medium)
**Time**: O(log n) | **Space**: O(1)
```javascript
function findMin(nums) {
    let left = 0, right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return nums[left];
}
```

### Problem 8: Search in Rotated Sorted Array (Medium)
**Time**: O(log n) | **Space**: O(1)
```javascript
function search(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) return mid;
        
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}
```

### Problem 9: Container With Most Water (Medium)
**Time**: O(n) | **Space**: O(1)
```javascript
function maxArea(height) {
    let left = 0, right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, width * minHeight);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}
```

### Problem 10: Trapping Rain Water (Hard)
**Time**: O(n) | **Space**: O(1)
```javascript
function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0, water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            leftMax = Math.max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = Math.max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }
    
    return water;
}
```

### Problem 11: Three Sum (Medium)
**Time**: O(n²) | **Space**: O(1)
```javascript
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1, right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}
```

### Problem 12: Next Permutation (Medium)
**Time**: O(n) | **Space**: O(1)
```javascript
function nextPermutation(nums) {
    let i = nums.length - 2;
    
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    
    if (i >= 0) {
        let j = nums.length - 1;
        while (nums[j] <= nums[i]) j--;
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
}
```

### Problem 13: Find First and Last Position (Medium)
**Time**: O(log n) | **Space**: O(1)
```javascript
function searchRange(nums, target) {
    function findBound(isFirst) {
        let left = 0, right = nums.length - 1;
        let result = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (nums[mid] === target) {
                result = mid;
                if (isFirst) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    return [findBound(true), findBound(false)];
}
```

### Problem 14: Meeting Rooms II (Medium)
**Time**: O(n log n) | **Space**: O(n)
```javascript
function minMeetingRooms(intervals) {
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
    
    let rooms = 0, endPtr = 0;
    
    for (let i = 0; i < intervals.length; i++) {
        if (starts[i] < ends[endPtr]) {
            rooms++;
        } else {
            endPtr++;
        }
    }
    
    return rooms;
}
```

### Problem 15: Merge Intervals (Medium)
**Time**: O(n log n) | **Space**: O(n)
```javascript
function merge(intervals) {
    if (intervals.length <= 1) return intervals;
    
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const last = result[result.length - 1];
        
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            result.push(intervals[i]);
        }
    }
    
    return result;
}
```

---

## String Problems

### Problem 16: Longest Substring Without Repeating (Medium)
**Time**: O(n) | **Space**: O(min(n,m))
```javascript
function lengthOfLongestSubstring(s) {
    const seen = new Map();
    let left = 0, maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        if (seen.has(s[right])) {
            left = Math.max(left, seen.get(s[right]) + 1);
        }
        seen.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

### Problem 17: Valid Palindrome (Easy)
**Time**: O(n) | **Space**: O(1)
```javascript
function isPalindrome(s) {
    let left = 0, right = s.length - 1;
    
    while (left < right) {
        while (left < right && !isAlphanumeric(s[left])) left++;
        while (left < right && !isAlphanumeric(s[right])) right--;
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        
        left++;
        right--;
    }
    
    return true;
}

function isAlphanumeric(c) {
    return /[a-zA-Z0-9]/.test(c);
}
```

### Problem 18: Group Anagrams (Medium)
**Time**: O(n × k log k) | **Space**: O(n × k)
```javascript
function groupAnagrams(strs) {
    const map = new Map();
    
    for (let str of strs) {
        const key = str.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(str);
    }
    
    return Array.from(map.values());
}
```

### Problem 19: Longest Palindromic Substring (Medium)
**Time**: O(n²) | **Space**: O(1)
```javascript
function longestPalindrome(s) {
    let start = 0, maxLen = 0;
    
    function expand(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const len = right - left + 1;
            if (len > maxLen) {
                start = left;
                maxLen = len;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    
    return s.substring(start, start + maxLen);
}
```

### Problem 20: Minimum Window Substring (Hard)
**Time**: O(m + n) | **Space**: O(m)
```javascript
function minWindow(s, t) {
    const need = new Map();
    const window = new Map();
    
    for (let c of t) need.set(c, (need.get(c) || 0) + 1);
    
    let left = 0, right = 0, valid = 0;
    let start = 0, minLen = Infinity;
    
    while (right < s.length) {
        const c = s[right++];
        
        if (need.has(c)) {
            window.set(c, (window.get(c) || 0) + 1);
            if (window.get(c) === need.get(c)) valid++;
        }
        
        while (valid === need.size) {
            if (right - left < minLen) {
                start = left;
                minLen = right - left;
            }
            
            const d = s[left++];
            if (need.has(d)) {
                if (window.get(d) === need.get(d)) valid--;
                window.set(d, window.get(d) - 1);
            }
        }
    }
    
    return minLen === Infinity ? "" : s.substring(start, start + minLen);
}
```

### Problem 21: Implement strStr() (Easy)
**Time**: O(n × m) | **Space**: O(1)
```javascript
function strStr(haystack, needle) {
    if (needle === "") return 0;
    
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        let j = 0;
        while (j < needle.length && haystack[i + j] === needle[j]) {
            j++;
        }
        if (j === needle.length) return i;
    }
    
    return -1;
}
```

### Problem 22: Valid Parentheses (Easy)
**Time**: O(n) | **Space**: O(n)
```javascript
function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    
    for (let c of s) {
        if (c === '(' || c === '{' || c === '[') {
            stack.push(c);
        } else {
            if (stack.length === 0 || stack.pop() !== pairs[c]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}
```

### Problem 23: Letter Combinations of Phone Number (Medium)
**Time**: O(4^n) | **Space**: O(n)
```javascript
function letterCombinations(digits) {
    if (!digits) return [];
    
    const phone = {
        '2': 'abc', '3': 'def', '4': 'ghi',
        '5': 'jkl', '6': 'mno', '7': 'pqrs',
        '8': 'tuv', '9': 'wxyz'
    };
    
    const result = [];
    
    function backtrack(i, path) {
        if (i === digits.length) {
            result.push(path);
            return;
        }
        
        for (let c of phone[digits[i]]) {
            backtrack(i + 1, path + c);
        }
    }
    
    backtrack(0, '');
    return result;
}
```

### Problem 24: Decode Ways (Medium)
**Time**: O(n) | **Space**: O(1)
```javascript
function numDecodings(s) {
    if (s[0] === '0') return 0;
    
    let prev2 = 1, prev1 = 1;
    
    for (let i = 1; i < s.length; i++) {
        let current = 0;
        
        if (s[i] !== '0') current += prev1;
        
        const two = parseInt(s.substring(i - 1, i + 1));
        if (two >= 10 && two <= 26) current += prev2;
        
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}
```

### Problem 25: Word Break (Medium)
**Time**: O(n² × m) | **Space**: O(n)
```javascript
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[s.length];
}
```

---

## Linked List Problems

### Problem 26: Reverse Linked List (Easy)
**Time**: O(n) | **Space**: O(1)
```javascript
function reverseList(head) {
    let prev = null;
    let curr = head;
    
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    
    return prev;
}
```

### Problem 27: Merge Two Sorted Lists (Easy)
**Time**: O(m + n) | **Space**: O(1)
```javascript
function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.val < l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    current.next = l1 || l2;
    return dummy.next;
}
```

### Problem 28: Linked List Cycle (Easy)
**Time**: O(n) | **Space**: O(1)
```javascript
function hasCycle(head) {
    let slow = head, fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    
    return false;
}
```

### Problem 29: Remove Nth Node From End (Medium)
**Time**: O(n) | **Space**: O(1)
```javascript
function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0, head);
    let slow = dummy, fast = dummy;
    
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    slow.next = slow.next.next;
    return dummy.next;
}
```

### Problem 30: Reorder List (Medium)
**Time**: O(n) | **Space**: O(1)
```javascript
function reorderList(head) {
    if (!head || !head.next) return;
    
    // Find middle
    let slow = head, fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let prev = null, curr = slow.next;
    slow.next = null;
    
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    
    // Merge
    let first = head, second = prev;
    while (second) {
        const tmp1 = first.next;
        const tmp2 = second.next;
        first.next = second;
        second.next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}
```

### Problem 31: Add Two Numbers (Medium)
**Time**: O(max(m,n)) | **Space**: O(max(m,n))
```javascript
function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
        l1 = l1?.next;
        l2 = l2?.next;
    }
    
    return dummy.next;
}
```

### Problem 32: Copy List with Random Pointer (Medium)
**Time**: O(n) | **Space**: O(n)
```javascript
function copyRandomList(head) {
    if (!head) return null;
    
    const map = new Map();
    let curr = head;
    
    while (curr) {
        map.set(curr, new Node(curr.val));
        curr = curr.next;
    }
    
    curr = head;
    while (curr) {
        map.get(curr).next = map.get(curr.next) || null;
        map.get(curr).random = map.get(curr.random) || null;
        curr = curr.next;
    }
    
    return map.get(head);
}
```

---

## Tree Problems

### Problem 33: Maximum Depth of Binary Tree (Easy)
**Time**: O(n) | **Space**: O(h)
```javascript
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

### Problem 34: Invert Binary Tree (Easy)
**Time**: O(n) | **Space**: O(h)
```javascript
function invertTree(root) {
    if (!root) return null;
    
    [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
    
    return root;
}
```

### Problem 35: Same Tree (Easy)
**Time**: O(n) | **Space**: O(h)
```javascript
function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    
    return p.val === q.val &&
           isSameTree(p.left, q.left) &&
           isSameTree(p.right, q.right);
}
```

### Problem 36: Subtree of Another Tree (Easy)
**Time**: O(m × n) | **Space**: O(h)
```javascript
function isSubtree(root, subRoot) {
    if (!root) return false;
    if (isSameTree(root, subRoot)) return true;
    
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
```

### Problem 37: Lowest Common Ancestor (Medium)
**Time**: O(n) | **Space**: O(h)
```javascript
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;
    
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    if (left && right) return root;
    return left || right;
}
```

### Problem 38: Binary Tree Level Order Traversal (Medium)
**Time**: O(n) | **Space**: O(n)
```javascript
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const level = [];
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
    }
    
    return result;
}
```

### Problem 39: Binary Tree Zigzag Level Order (Medium)
**Time**: O(n) | **Space**: O(n)
```javascript
function zigzagLevelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    let leftToRight = true;
    
    while (queue.length > 0) {
        const level = [];
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            
            if (leftToRight) {
                level.push(node.val);
            } else {
                level.unshift(node.val);
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
        leftToRight = !leftToRight;
    }
    
    return result;
}
```

### Problem 40: Validate BST (Medium)
**Time**: O(n) | **Space**: O(h)
```javascript
function isValidBST(root) {
    function validate(node, min, max) {
        if (!node) return true;
        
        if (node.val <= min || node.val >= max) return false;
        
        return validate(node.left, min, node.val) &&
               validate(node.right, node.val, max);
    }
    
    return validate(root, -Infinity, Infinity);
}
```

### Problem 41: Kth Smallest in BST (Medium)
**Time**: O(n) | **Space**: O(h)
```javascript
function kthSmallest(root, k) {
    const stack = [];
    let curr = root;
    
    while (true) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        
        curr = stack.pop();
        k--;
        
        if (k === 0) return curr.val;
        
        curr = curr.right;
    }
}
```

### Problem 42: Serialize and Deserialize Binary Tree (Hard)
**Time**: O(n) | **Space**: O(n)
```javascript
function serialize(root) {
    if (!root) return 'null';
    return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);
}

function deserialize(data) {
    const values = data.split(',');
    let i = 0;
    
    function build() {
        if (values[i] === 'null') {
            i++;
            return null;
        }
        
        const node = new TreeNode(parseInt(values[i++]));
        node.left = build();
        node.right = build();
        return node;
    }
    
    return build();
}
```

### Problem 43: Binary Tree Maximum Path Sum (Hard)
**Time**: O(n) | **Space**: O(h)
```javascript
function maxPathSum(root) {
    let maxSum = -Infinity;
    
    function dfs(node) {
        if (!node) return 0;
        
        const left = Math.max(0, dfs(node.left));
        const right = Math.max(0, dfs(node.right));
        
        maxSum = Math.max(maxSum, left + right + node.val);
        
        return node.val + Math.max(left, right);
    }
    
    dfs(root);
    return maxSum;
}
```

---

## Graph Problems

### Problem 44: Number of Islands (Medium)
**Time**: O(m × n) | **Space**: O(m × n)
```javascript
function numIslands(grid) {
    let count = 0;
    
    function dfs(i, j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length ||
            grid[i][j] === '0') return;
        
        grid[i][j] = '0';
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }
    
    return count;
}
```

### Problem 45: Clone Graph (Medium)
**Time**: O(V + E) | **Space**: O(V)
```javascript
function cloneGraph(node) {
    if (!node) return null;
    
    const map = new Map();
    
    function dfs(node) {
        if (map.has(node)) return map.get(node);
        
        const clone = new Node(node.val);
        map.set(node, clone);
        
        for (let neighbor of node.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }
        
        return clone;
    }
    
    return dfs(node);
}
```

### Problem 46: Course Schedule (Medium)
**Time**: O(V + E) | **Space**: O(V + E)
```javascript
function canFinish(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(null).map(() => []);
    const inDegree = Array(numCourses).fill(0);
    
    for (let [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }
    
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    let count = 0;
    while (queue.length > 0) {
        const course = queue.shift();
        count++;
        
        for (let next of graph[course]) {
            inDegree[next]--;
            if (inDegree[next] === 0) queue.push(next);
        }
    }
    
    return count === numCourses;
}
```

### Problem 47: Word Ladder (Hard)
**Time**: O(m² × n) | **Space**: O(m² × n)
```javascript
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue = [[beginWord, 1]];
    
    while (queue.length > 0) {
        const [word, level] = queue.shift();
        
        if (word === endWord) return level;
        
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) {
                const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
                
                if (wordSet.has(newWord)) {
                    queue.push([newWord, level + 1]);
                    wordSet.delete(newWord);
                }
            }
        }
    }
    
    return 0;
}
```

### Problem 48: Alien Dictionary (Hard)
**Time**: O(C) | **Space**: O(1)
```javascript
function alienOrder(words) {
    const graph = new Map();
    const inDegree = new Map();
    
    for (let word of words) {
        for (let c of word) {
            if (!graph.has(c)) {
                graph.set(c, []);
                inDegree.set(c, 0);
            }
        }
    }
    
    for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i], w2 = words[i + 1];
        const minLen = Math.min(w1.length, w2.length);
        
        if (w1.length > w2.length && w1.startsWith(w2)) return "";
        
        for (let j = 0; j < minLen; j++) {
            if (w1[j] !== w2[j]) {
                graph.get(w1[j]).push(w2[j]);
                inDegree.set(w2[j], inDegree.get(w2[j]) + 1);
                break;
            }
        }
    }
    
    const queue = [];
    for (let [char, degree] of inDegree) {
        if (degree === 0) queue.push(char);
    }
    
    let result = '';
    while (queue.length > 0) {
        const c = queue.shift();
        result += c;
        
        for (let next of graph.get(c)) {
            inDegree.set(next, inDegree.get(next) - 1);
            if (inDegree.get(next) === 0) queue.push(next);
        }
    }
    
    return result.length === inDegree.size ? result : "";
}
```

---

## Dynamic Programming

### Problem 49: Climbing Stairs (Easy)
**Time**: O(n) | **Space**: O(1)
```javascript
function climbStairs(n) {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;
    
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}
```

### Problem 50: House Robber (Medium)
**Time**: O(n) | **Space**: O(1)
```javascript
function rob(nums) {
    let prev2 = 0, prev1 = 0;
    
    for (let num of nums) {
        const curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}
```

### Problem 51: Longest Increasing Subsequence (Medium)
**Time**: O(n log n) | **Space**: O(n)
```javascript
function lengthOfLIS(nums) {
    const tails = [];
    
    for (let num of nums) {
        let left = 0, right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(num);
        } else {
            tails[left] = num;
        }
    }
    
    return tails.length;
}
```

### Problem 52: Coin Change (Medium)
**Time**: O(amount × n) | **Space**: O(amount)
```javascript
function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}
```

### Problem 53: Unique Paths (Medium)
**Time**: O(m × n) | **Space**: O(n)
```javascript
function uniquePaths(m, n) {
    const dp = Array(n).fill(1);
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }
    
    return dp[n - 1];
}
```

### Problem 54: Jump Game (Medium)
**Time**: O(n) | **Space**: O(1)
```javascript
function canJump(nums) {
    let maxReach = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    
    return true;
}
```

### Problem 55: Longest Common Subsequence (Medium)
**Time**: O(m × n) | **Space**: O(min(m,n))
```javascript
function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}
```

### Problem 56: Edit Distance (Hard)
**Time**: O(m × n) | **Space**: O(m × n)
```javascript
function minDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j],
                    dp[i][j - 1],
                    dp[i - 1][j - 1]
                ) + 1;
            }
        }
    }
    
    return dp[m][n];
}
```

### Problem 57: Word Break (Medium)
**Time**: O(n² × m) | **Space**: O(n)
```javascript
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[s.length];
}
```

### Problem 58: Partition Equal Subset Sum (Medium)
**Time**: O(n × sum) | **Space**: O(sum)
```javascript
function canPartition(nums) {
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) return false;
    
    const target = sum / 2;
    const dp = Array(target + 1).fill(false);
    dp[0] = true;
    
    for (let num of nums) {
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    
    return dp[target];
}
```

---

## Stack & Queue

### Problem 59: Implement Queue Using Stacks (Easy)
**Time**: O(1) amortized | **Space**: O(n)
```javascript
class MyQueue {
    constructor() {
        this.input = [];
        this.output = [];
    }
    
    push(x) {
        this.input.push(x);
    }
    
    pop() {
        this.peek();
        return this.output.pop();
    }
    
    peek() {
        if (this.output.length === 0) {
            while (this.input.length > 0) {
                this.output.push(this.input.pop());
            }
        }
        return this.output[this.output.length - 1];
    }
    
    empty() {
        return this.input.length === 0 && this.output.length === 0;
    }
}
```

### Problem 60: Min Stack (Easy)
**Time**: O(1) | **Space**: O(n)
```javascript
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }
    
    pop() {
        const val = this.stack.pop();
        if (val === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }
    
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}
```

### Problem 61: Evaluate RPN (Medium)
**Time**: O(n) | **Space**: O(n)
```javascript
function evalRPN(tokens) {
    const stack = [];
    const ops = new Set(['+', '-', '*', '/']);
    
    for (let token of tokens) {
        if (ops.has(token)) {
            const b = stack.pop();
            const a = stack.pop();
            
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/': stack.push(Math.trunc(a / b)); break;
            }
        } else {
            stack.push(parseInt(token));
        }
    }
    
    return stack[0];
}
```

### Problem 62: Daily Temperatures (Medium)
**Time**: O(n) | **Space**: O(n)
```javascript
function dailyTemperatures(temps) {
    const result = Array(temps.length).fill(0);
    const stack = [];
    
    for (let i = 0; i < temps.length; i++) {
        while (stack.length > 0 && temps[stack[stack.length - 1]] < temps[i]) {
            const idx = stack.pop();
            result[idx] = i - idx;
        }
        stack.push(i);
    }
    
    return result;
}
```

### Problem 63: Largest Rectangle in Histogram (Hard)
**Time**: O(n) | **Space**: O(n)
```javascript
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];
        
        while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}
```

---

## Design Problems

### Problem 64: LRU Cache (Medium)
**Time**: O(1) | **Space**: O(capacity)
```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    
    get(key) {
        if (!this.cache.has(key)) return -1;
        
        const val = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        
        this.cache.set(key, value);
        
        if (this.cache.size > this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
}
```

### Problem 65: LFU Cache (Hard)
**Time**: O(1) | **Space**: O(capacity)
```javascript
class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.minFreq = 0;
        this.keyToVal = new Map();
        this.keyToFreq = new Map();
        this.freqToKeys = new Map();
    }
    
    get(key) {
        if (!this.keyToVal.has(key)) return -1;
        
        this.increaseFreq(key);
        return this.keyToVal.get(key);
    }
    
    put(key, value) {
        if (this.capacity <= 0) return;
        
        if (this.keyToVal.has(key)) {
            this.keyToVal.set(key, value);
            this.increaseFreq(key);
            return;
        }
        
        if (this.keyToVal.size >= this.capacity) {
            this.removeMinFreqKey();
        }
        
        this.keyToVal.set(key, value);
        this.keyToFreq.set(key, 1);
        
        if (!this.freqToKeys.has(1)) {
            this.freqToKeys.set(1, new Set());
        }
        this.freqToKeys.get(1).add(key);
        this.minFreq = 1;
    }
    
    increaseFreq(key) {
        const freq = this.keyToFreq.get(key);
        this.keyToFreq.set(key, freq + 1);
        
        this.freqToKeys.get(freq).delete(key);
        if (!this.freqToKeys.has(freq + 1)) {
            this.freqToKeys.set(freq + 1, new Set());
        }
        this.freqToKeys.get(freq + 1).add(key);
        
        if (this.freqToKeys.get(freq).size === 0) {
            if (freq === this.minFreq) {
                this.minFreq++;
            }
        }
    }
    
    removeMinFreqKey() {
        const keys = this.freqToKeys.get(this.minFreq);
        const keyToRemove = keys.values().next().value;
        
        keys.delete(keyToRemove);
        this.keyToVal.delete(keyToRemove);
        this.keyToFreq.delete(keyToRemove);
    }
}
```

### Problem 66: Time Based Key-Value Store (Medium)
**Time**: O(log n) | **Space**: O(n)
```javascript
class TimeMap {
    constructor() {
        this.map = new Map();
    }
    
    set(key, value, timestamp) {
        if (!this.map.has(key)) {
            this.map.set(key, []);
        }
        this.map.get(key).push([timestamp, value]);
    }
    
    get(key, timestamp) {
        if (!this.map.has(key)) return "";
        
        const values = this.map.get(key);
        let left = 0, right = values.length - 1;
        let result = "";
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (values[mid][0] <= timestamp) {
                result = values[mid][1];
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
}
```

### Problem 67: Insert Delete GetRandom O(1) (Medium)
**Time**: O(1) | **Space**: O(n)
```javascript
class RandomizedSet {
    constructor() {
        this.map = new Map();
        this.list = [];
    }
    
    insert(val) {
        if (this.map.has(val)) return false;
        
        this.list.push(val);
        this.map.set(val, this.list.length - 1);
        return true;
    }
    
    remove(val) {
        if (!this.map.has(val)) return false;
        
        const idx = this.map.get(val);
        const lastVal = this.list[this.list.length - 1];
        
        this.list[idx] = lastVal;
        this.map.set(lastVal, idx);
        
        this.list.pop();
        this.map.delete(val);
        
        return true;
    }
    
    getRandom() {
        const randomIdx = Math.floor(Math.random() * this.list.length);
        return this.list[randomIdx];
    }
}
```

### Problem 68: Design Search Autocomplete System (Hard)
**Time**: O(n log n) | **Space**: O(n)
```javascript
class AutocompleteSystem {
    constructor(sentences, times) {
        this.sentences = new Map();
        for (let i = 0; i < sentences.length; i++) {
            this.sentences.set(sentences[i], times[i]);
        }
        this.current = "";
    }
    
    input(c) {
        if (c === '#') {
            this.sentences.set(this.current, (this.sentences.get(this.current) || 0) + 1);
            this.current = "";
            return [];
        }
        
        this.current += c;
        const candidates = [];
        
        for (let [sentence, count] of this.sentences) {
            if (sentence.startsWith(this.current)) {
                candidates.push([sentence, count]);
            }
        }
        
        candidates.sort((a, b) => {
            if (a[1] !== b[1]) return b[1] - a[1];
            return a[0].localeCompare(b[0]);
        });
        
        return candidates.slice(0, 3).map(x => x[0]);
    }
}
```

---

## Additional Important Problems

### Problem 69: Missing Number (Easy)
**Time**: O(n) | **Space**: O(1)
```javascript
function missingNumber(nums) {
    const n = nums.length;
    const expectedSum = n * (n + 1) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}
```

### Problem 70: Single Number (Easy)
**Time**: O(n) | **Space**: O(1)
```javascript
function singleNumber(nums) {
    let result = 0;
    for (let num of nums) {
        result ^= num;
    }
    return result;
}
```

### Problem 71: Majority Element (Easy)
**Time**: O(n) | **Space**: O(1)
```javascript
function majorityElement(nums) {
    let candidate = null, count = 0;
    
    for (let num of nums) {
        if (count === 0) candidate = num;
        count += num === candidate ? 1 : -1;
    }
    
    return candidate;
}
```

### Problem 72: Rotate Array (Medium)
**Time**: O(n) | **Space**: O(1)
```javascript
function rotate(nums, k) {
    k %= nums.length;
    
    function reverse(start, end) {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
        }
    }
    
    reverse(0, nums.length - 1);
    reverse(0, k - 1);
    reverse(k, nums.length - 1);
}
```

### Problem 73: Set Matrix Zeroes (Medium)
**Time**: O(m × n) | **Space**: O(1)
```javascript
function setZeroes(matrix) {
    const m = matrix.length, n = matrix[0].length;
    let firstRowZero = false, firstColZero = false;
    
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) firstColZero = true;
    }
    
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) firstRowZero = true;
    }
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    if (firstRowZero) {
        for (let j = 0; j < n; j++) matrix[0][j] = 0;
    }
    
    if (firstColZero) {
        for (let i = 0; i < m; i++) matrix[i][0] = 0;
    }
}
```

### Problem 74: Spiral Matrix (Medium)
**Time**: O(m × n) | **Space**: O(1)
```javascript
function spiralOrder(matrix) {
    const result = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
        for (let j = left; j <= right; j++) result.push(matrix[top][j]);
        top++;
        
        for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
        right--;
        
        if (top <= bottom) {
            for (let j = right; j >= left; j--) result.push(matrix[bottom][j]);
            bottom--;
        }
        
        if (left <= right) {
            for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
            left++;
        }
    }
    
    return result;
}
```

### Problem 75: Rotate Image (Medium)
**Time**: O(n²) | **Space**: O(1)
```javascript
function rotate(matrix) {
    const n = matrix.length;
    
    // Transpose
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}
```

### Problem 76: Find Peak Element (Medium)
**Time**: O(log n) | **Space**: O(1)
```javascript
function findPeakElement(nums) {
    let left = 0, right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] < nums[mid + 1]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}
```

### Problem 77: Median of Two Sorted Arrays (Hard)
**Time**: O(log(min(m,n))) | **Space**: O(1)
```javascript
function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length, n = nums2.length;
    let left = 0, right = m;
    
    while (left <= right) {
        const partition1 = Math.floor((left + right) / 2);
        const partition2 = Math.floor((m + n + 1) / 2) - partition1;
        
        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        const minRight1 = partition1 === m ? Infinity : nums1[partition1];
        
        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        const minRight2 = partition2 === n ? Infinity : nums2[partition2];
        
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            } else {
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            right = partition1 - 1;
        } else {
            left = partition1 + 1;
        }
    }
}
```

### Problem 78: Kth Largest Element (Medium)
**Time**: O(n) average | **Space**: O(1)
```javascript
function findKthLargest(nums, k) {
    function quickSelect(left, right) {
        const pivot = nums[right];
        let i = left;
        
        for (let j = left; j < right; j++) {
            if (nums[j] < pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        
        [nums[i], nums[right]] = [nums[right], nums[i]];
        
        const count = right - i + 1;
        if (count === k) return nums[i];
        if (count > k) return quickSelect(i + 1, right);
        return quickSelect(left, i - 1);
    }
    
    return quickSelect(0, nums.length - 1);
}
```

### Problem 79: Top K Frequent Elements (Medium)
**Time**: O(n) | **Space**: O(n)
```javascript
function topKFrequent(nums, k) {
    const count = new Map();
    
    for (let num of nums) {
        count.set(num, (count.get(num) || 0) + 1);
    }
    
    const buckets = Array(nums.length + 1).fill(null).map(() => []);
    
    for (let [num, freq] of count) {
        buckets[freq].push(num);
    }
    
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i]);
    }
    
    return result.slice(0, k);
}
```

### Problem 80: Longest Consecutive Sequence (Medium)
**Time**: O(n) | **Space**: O(n)
```javascript
function longestConsecutive(nums) {
    const numSet = new Set(nums);
    let maxLen = 0;
    
    for (let num of numSet) {
        if (!numSet.has(num - 1)) {
            let current = num;
            let len = 1;
            
            while (numSet.has(current + 1)) {
                current++;
                len++;
            }
            
            maxLen = Math.max(maxLen, len);
        }
    }
    
    return maxLen;
}
```

### Problem 81: Find All Duplicates (Medium)
**Time**: O(n) | **Space**: O(1)
```javascript
function findDuplicates(nums) {
    const result = [];
    
    for (let i = 0; i < nums.length; i++) {
        const idx = Math.abs(nums[i]) - 1;
        
        if (nums[idx] < 0) {
            result.push(idx + 1);
        } else {
            nums[idx] = -nums[idx];
        }
    }
    
    return result;
}
```

### Problem 82: First Missing Positive (Hard)
**Time**: O(n) | **Space**: O(1)
```javascript
function firstMissingPositive(nums) {
    const n = nums.length;
    
    // Mark numbers <= 0 or > n as n+1
    for (let i = 0; i < n; i++) {
        if (nums[i] <= 0 || nums[i] > n) {
            nums[i] = n + 1;
        }
    }
    
    // Mark presence
    for (let i = 0; i < n; i++) {
        const num = Math.abs(nums[i]);
        if (num <= n) {
            nums[num - 1] = -Math.abs(nums[num - 1]);
        }
    }
    
    // Find first positive
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) return i + 1;
    }
    
    return n + 1;
}
```

### Problem 83: Subarray Sum Equals K (Medium)
**Time**: O(n) | **Space**: O(n)
```javascript
function subarraySum(nums, k) {
    const map = new Map([[0, 1]]);
    let sum = 0, count = 0;
    
    for (let num of nums) {
        sum += num;
        count += map.get(sum - k) || 0;
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    
    return count;
}
```

### Problem 84: Longest Substring K Distinct (Medium)
**Time**: O(n) | **Space**: O(k)
```javascript
function lengthOfLongestSubstringKDistinct(s, k) {
    const map = new Map();
    let left = 0, maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        map.set(s[right], (map.get(s[right]) || 0) + 1);
        
        while (map.size > k) {
            map.set(s[left], map.get(s[left]) - 1);
            if (map.get(s[left]) === 0) map.delete(s[left]);
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

### Problem 85: Permutations (Medium)
**Time**: O(n!) | **Space**: O(n)
```javascript
function permute(nums) {
    const result = [];
    
    function backtrack(path, used) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            
            path.push(nums[i]);
            used[i] = true;
            backtrack(path, used);
            path.pop();
            used[i] = false;
        }
    }
    
    backtrack([], Array(nums.length).fill(false));
    return result;
}
```

### Problem 86: Subsets (Medium)
**Time**: O(2^n) | **Space**: O(n)
```javascript
function subsets(nums) {
    const result = [];
    
    function backtrack(start, path) {
        result.push([...path]);
        
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}
```

### Problem 87: Combination Sum (Medium)
**Time**: O(2^n) | **Space**: O(n)
```javascript
function combinationSum(candidates, target) {
    const result = [];
    
    function backtrack(start, path, sum) {
        if (sum === target) {
            result.push([...path]);
            return;
        }
        if (sum > target) return;
        
        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            backtrack(i, path, sum + candidates[i]);
            path.pop();
        }
    }
    
    backtrack(0, [], 0);
    return result;
}
```

### Problem 88: Generate Parentheses (Medium)
**Time**: O(4^n/√n) | **Space**: O(n)
```javascript
function generateParenthesis(n) {
    const result = [];
    
    function backtrack(path, open, close) {
        if (path.length === 2 * n) {
            result.push(path);
            return;
        }
        
        if (open < n) {
            backtrack(path + '(', open + 1, close);
        }
        
        if (close < open) {
            backtrack(path + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
}
```

### Problem 89: Word Search (Medium)
**Time**: O(m × n × 4^L) | **Space**: O(L)
```javascript
function exist(board, word) {
    const rows = board.length, cols = board[0].length;
    
    function dfs(i, j, idx) {
        if (idx === word.length) return true;
        
        if (i < 0 || i >= rows || j < 0 || j >= cols ||
            board[i][j] !== word[idx]) return false;
        
        const temp = board[i][j];
        board[i][j] = '#';
        
        const found = dfs(i + 1, j, idx + 1) ||
                     dfs(i - 1, j, idx + 1) ||
                     dfs(i, j + 1, idx + 1) ||
                     dfs(i, j - 1, idx + 1);
        
        board[i][j] = temp;
        return found;
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }
    
    return false;
}
```

### Problem 90: N-Queens (Hard)
**Time**: O(n!) | **Space**: O(n²)
```javascript
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill(null).map(() => Array(n).fill('.'));
    
    function isValid(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }
    
    backtrack(0);
    return result;
}
```

### Problem 91: Palindrome Partitioning (Medium)
**Time**: O(n × 2^n) | **Space**: O(n)
```javascript
function partition(s) {
    const result = [];
    
    function isPalindrome(str, left, right) {
        while (left < right) {
            if (str[left++] !== str[right--]) return false;
        }
        return true;
    }
    
    function backtrack(start, path) {
        if (start === s.length) {
            result.push([...path]);
            return;
        }
        
        for (let end = start; end < s.length; end++) {
            if (isPalindrome(s, start, end)) {
                path.push(s.substring(start, end + 1));
                backtrack(end + 1, path);
                path.pop();
            }
        }
    }
    
    backtrack(0, []);
    return result;
}
```

### Problem 92: Surrounded Regions (Medium)
**Time**: O(m × n) | **Space**: O(m × n)
```javascript
function solve(board) {
    const m = board.length, n = board[0].length;
    
    function dfs(i, j) {
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') return;
        
        board[i][j] = 'T';
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
    
    // Mark border O's and connected O's
    for (let i = 0; i < m; i++) {
        dfs(i, 0);
        dfs(i, n - 1);
    }
    
    for (let j = 0; j < n; j++) {
        dfs(0, j);
        dfs(m - 1, j);
    }
    
    // Flip
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') {
                board[i][j] = 'X';
            } else if (board[i][j] === 'T') {
                board[i][j] = 'O';
            }
        }
    }
}
```

### Problem 93: Pacific Atlantic Water Flow (Medium)
**Time**: O(m × n) | **Space**: O(m × n)
```javascript
function pacificAtlantic(heights) {
    const m = heights.length, n = heights[0].length;
    const pacific = Array(m).fill(null).map(() => Array(n).fill(false));
    const atlantic = Array(m).fill(null).map(() => Array(n).fill(false));
    
    function dfs(i, j, visited) {
        visited[i][j] = true;
        const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
        
        for (let [di, dj] of dirs) {
            const ni = i + di, nj = j + dj;
            
            if (ni >= 0 && ni < m && nj >= 0 && nj < n &&
                !visited[ni][nj] && heights[ni][nj] >= heights[i][j]) {
                dfs(ni, nj, visited);
            }
        }
    }
    
    for (let i = 0; i < m; i++) {
        dfs(i, 0, pacific);
        dfs(i, n - 1, atlantic);
    }
    
    for (let j = 0; j < n; j++) {
        dfs(0, j, pacific);
        dfs(m - 1, j, atlantic);
    }
    
    const result = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (pacific[i][j] && atlantic[i][j]) {
                result.push([i, j]);
            }
        }
    }
    
    return result;
}
```

### Problem 94: Binary Tree Right Side View (Medium)
**Time**: O(n) | **Space**: O(n)
```javascript
function rightSideView(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            
            if (i === size - 1) result.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
}
```

### Problem 95: Construct Binary Tree (Medium)
**Time**: O(n) | **Space**: O(n)
```javascript
function buildTree(preorder, inorder) {
    const map = new Map();
    inorder.forEach((val, i) => map.set(val, i));
    
    function build(preStart, preEnd, inStart, inEnd) {
        if (preStart > preEnd) return null;
        
        const rootVal = preorder[preStart];
        const root = new TreeNode(rootVal);
        const mid = map.get(rootVal);
        const leftSize = mid - inStart;
        
        root.left = build(preStart + 1, preStart + leftSize, inStart, mid - 1);
        root.right = build(preStart + leftSize + 1, preEnd, mid + 1, inEnd);
        
        return root;
    }
    
    return build(0, preorder.length - 1, 0, inorder.length - 1);
}
```

### Problem 96: Diameter of Binary Tree (Easy)
**Time**: O(n) | **Space**: O(h)
```javascript
function diameterOfBinaryTree(root) {
    let diameter = 0;
    
    function height(node) {
        if (!node) return 0;
        
        const left = height(node.left);
        const right = height(node.right);
        
        diameter = Math.max(diameter, left + right);
        
        return 1 + Math.max(left, right);
    }
    
    height(root);
    return diameter;
}
```

### Problem 97: Path Sum III (Medium)
**Time**: O(n²) | **Space**: O(h)
```javascript
function pathSum(root, targetSum) {
    function dfs(node, currentSum) {
        if (!node) return 0;
        
        currentSum += node.val;
        let count = currentSum === targetSum ? 1 : 0;
        
        count += dfs(node.left, currentSum);
        count += dfs(node.right, currentSum);
        
        return count;
    }
    
    if (!root) return 0;
    
    return dfs(root, 0) + pathSum(root.left, targetSum) + pathSum(root.right, targetSum);
}
```

### Problem 98: Flatten Binary Tree to Linked List (Medium)
**Time**: O(n) | **Space**: O(h)
```javascript
function flatten(root) {
    let prev = null;
    
    function dfs(node) {
        if (!node) return;
        
        dfs(node.right);
        dfs(node.left);
        
        node.right = prev;
        node.left = null;
        prev = node;
    }
    
    dfs(root);
}
```

### Problem 99: Binary Tree Cameras (Hard)
**Time**: O(n) | **Space**: O(h)
```javascript
function minCameraCover(root) {
    let cameras = 0;
    
    function dfs(node) {
        if (!node) return 2; // Covered
        
        const left = dfs(node.left);
        const right = dfs(node.right);
        
        if (left === 0 || right === 0) {
            cameras++;
            return 1; // Has camera
        }
        
        if (left === 1 || right === 1) {
            return 2; // Covered
        }
        
        return 0; // Not covered
    }
    
    return dfs(root) === 0 ? cameras + 1 : cameras;
}
```

### Problem 100: Recover Binary Search Tree (Hard)
**Time**: O(n) | **Space**: O(h)
```javascript
function recoverTree(root) {
    let first = null, second = null, prev = null;
    
    function inorder(node) {
        if (!node) return;
        
        inorder(node.left);
        
        if (prev && node.val < prev.val) {
            if (!first) first = prev;
            second = node;
        }
        prev = node;
        
        inorder(node.right);
    }
    
    inorder(root);
    [first.val, second.val] = [second.val, first.val];
}
```

---

## COMPLETE PROBLEM LIST (100 Total)

**Arrays (25)**
1. Two Sum
2. Best Time to Buy/Sell Stock
3. Contains Duplicate
4. Product Except Self
5. Maximum Subarray
6. Maximum Product Subarray
7. Find Min in Rotated Array
8. Search in Rotated Array
9. Container With Most Water
10. Trapping Rain Water
11. Three Sum
12. Next Permutation
13. Find First/Last Position
14. Meeting Rooms II
15. Merge Intervals
16. Missing Number
17. Single Number
18. Majority Element
19. Rotate Array
20. Set Matrix Zeroes
21. Spiral Matrix
22. Rotate Image
23. Find Peak Element
24. Median Two Sorted Arrays
25. Kth Largest Element

**Strings (20)**
26. Longest Substring No Repeat
27. Valid Palindrome
28. Group Anagrams
29. Longest Palindromic Substring
30. Minimum Window Substring
31. Implement strStr()
32. Valid Parentheses
33. Letter Combinations
34. Decode Ways
35. Word Break
36. Longest Substring K Distinct
37. Top K Frequent Elements
38. Longest Consecutive Sequence
39. Find All Duplicates
40. First Missing Positive
41. Subarray Sum Equals K
42. Permutations
43. Subsets
44. Combination Sum
45. Generate Parentheses

**Linked Lists (10)**
46. Reverse Linked List
47. Merge Two Sorted Lists
48. Linked List Cycle
49. Remove Nth From End
50. Reorder List
51. Add Two Numbers
52. Copy List Random Pointer
53. Palindrome Linked List
54. Merge K Sorted Lists
55. Reverse Nodes in K-Group

**Trees (20)**
56. Max Depth
57. Invert Tree
58. Same Tree
59. Subtree of Another
60. LCA
61. Level Order Traversal
62. Zigzag Level Order
63. Validate BST
64. Kth Smallest in BST
65. Serialize/Deserialize
66. Binary Tree Max Path Sum
67. Diameter
68. Path Sum III
69. Flatten to Linked List
70. Binary Tree Cameras
71. Recover BST
72. Binary Tree Right Side View
73. Construct from Pre/In
74. Count Complete Tree Nodes
75. Populating Next Right Pointers

**Graphs (10)**
76. Number of Islands
77. Clone Graph
78. Course Schedule
79. Word Ladder
80. Alien Dictionary
81. Word Search
82. Surrounded Regions
83. Pacific Atlantic
84. Graph Valid Tree
85. Number Connected Components

**Design (5)**
86. LRU Cache
87. LFU Cache
88. Time Based Key-Value
89. Insert Delete GetRandom
90. Autocomplete System

**Stack/Queue (5)**
91. Implement Queue Using Stacks
92. Min Stack
93. Evaluate RPN
94. Daily Temperatures
95. Largest Rectangle Histogram

**Additional (5)**
96. N-Queens
97. Palindrome Partitioning
98. Trie Implementation
99. Sliding Window Maximum
100. Burst Balloons

---

## Google Interview Tips

### Most Frequent Topics
1. **Arrays & Strings** (40%)
2. **Trees & Graphs** (30%)
3. **Dynamic Programming** (15%)
4. **Design** (10%)
5. **Others** (5%)

### Difficulty Distribution
- Easy: 25%
- Medium: 60%
- Hard: 15%

### Time Management
- **45 minutes** typical interview
- **5 min**: Clarify problem
- **5-10 min**: Discuss approach
- **20-25 min**: Code solution
- **5-10 min**: Test & optimize

### Key Focus Areas
1. ✅ Clean, readable code
2. ✅ Edge cases handling
3. ✅ Time/space complexity analysis
4. ✅ Communication skills
5. ✅ Testing mindset

---

**Practice these 100 problems to ace your Google interview! 🚀**

