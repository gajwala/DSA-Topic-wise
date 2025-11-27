
# Complete Two Pointers Pattern Guide

## Table of Contents
1. [What is Two Pointers?](#what-is-two-pointers)
2. [When to Use Two Pointers](#when-to-use-two-pointers)
3. [Two Pointers Patterns](#two-pointers-patterns)
4. [Opposite Direction Pointers](#opposite-direction-pointers)
5. [Same Direction Pointers](#same-direction-pointers)
6. [Fast & Slow Pointers](#fast--slow-pointers)
7. [Three Pointers](#three-pointers)
8. [Advanced Two Pointers](#advanced-two-pointers)
9. [Complete Problem Set (50+ Problems)](#complete-problem-set)

---

## What is Two Pointers?

**Two Pointers** is a technique using two pointers to iterate through data structure(s), often reducing time complexity from O(n²) to O(n).

### Key Concepts:
- Two pointers move through array/string
- Can move in **opposite** or **same** direction
- Often used with **sorted** arrays
- Reduces nested loops

### Visual Example:

```
Opposite Direction:
[1, 2, 3, 4, 5, 6, 7, 8, 9]
 ↑                       ↑
left                  right

Same Direction:
[1, 2, 3, 4, 5, 6, 7, 8, 9]
 ↑  ↑
slow fast

Fast & Slow:
[1, 2, 3, 4, 5, 6, 7, 8, 9]
 ↑     ↑
slow  fast (moves 2x speed)
```

---

## When to Use Two Pointers

### Problem Characteristics:
1. ✅ **Sorted array** or can be sorted
2. ✅ Need to find **pairs/triplets** with condition
3. ✅ **In-place** modification needed
4. ✅ Need to **remove/move** elements
5. ✅ **Palindrome** checking
6. ✅ **Partition** problems

### Common Keywords:
- "sorted array"
- "two sum", "three sum"
- "remove duplicates"
- "reverse"
- "palindrome"
- "partition"
- "merge sorted arrays"

### NOT Two Pointers:
- ❌ Unsorted array without sorting option
- ❌ Need to track more complex state
- ❌ Random access required
- ❌ Need to maintain relative order (sometimes)

---

## Two Pointers Patterns

### Pattern 1: Opposite Direction
- **Start**: left = 0, right = n-1
- **Move**: Move based on condition
- **Use**: Two Sum, Palindrome, Partition

### Pattern 2: Same Direction
- **Start**: slow = 0, fast = 0 or 1
- **Move**: Fast moves ahead, slow follows
- **Use**: Remove duplicates, Move zeros

### Pattern 3: Fast & Slow
- **Start**: slow = head, fast = head
- **Move**: slow moves 1, fast moves 2
- **Use**: Cycle detection, Middle element

### Pattern 4: Multiple Pointers
- **Start**: Multiple pointers tracking different positions
- **Use**: Three Sum, Four Sum

---

## Opposite Direction Pointers

---

### EASY PROBLEMS

---

### Problem 1: Two Sum II (Sorted Array) (Easy)

**Problem**: Find two numbers that add up to target in sorted array.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        
        if (sum === target) {
            return [left + 1, right + 1]; // 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [-1, -1];
}

// Example
console.log(twoSum([2, 7, 11, 15], 9));  // [1, 2]
console.log(twoSum([2, 3, 4], 6));       // [1, 3]
console.log(twoSum([-1, 0], -1));        // [1, 2]
```

---

### Problem 2: Valid Palindrome (Easy)

**Problem**: Check if string is palindrome (alphanumeric only, case-insensitive).

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

function isAlphanumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
}

// Example
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                     // false
console.log(isPalindrome(" "));                              // true
```

---

### Problem 3: Reverse String (Easy)

**Problem**: Reverse string in-place.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}

// Example
const s = ['h','e','l','l','o'];
reverseString(s);
console.log(s); // ['o','l','l','e','h']
```

---

### Problem 4: Container With Most Water (Medium)

**Problem**: Find two lines that form container with maximum water.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, width * minHeight);
        
        // Move pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

// Example
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49
console.log(maxArea([1,1]));               // 1
```

---

### Problem 5: Sort Colors (Dutch National Flag) (Medium)

**Problem**: Sort array with 0s, 1s, and 2s in-place.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function sortColors(nums) {
    let left = 0;       // boundary for 0s
    let right = nums.length - 1; // boundary for 2s
    let current = 0;
    
    while (current <= right) {
        if (nums[current] === 0) {
            [nums[left], nums[current]] = [nums[current], nums[left]];
            left++;
            current++;
        } else if (nums[current] === 2) {
            [nums[current], nums[right]] = [nums[right], nums[current]];
            right--;
            // Don't increment current
        } else {
            current++;
        }
    }
}

// Example
const arr = [2,0,2,1,1,0];
sortColors(arr);
console.log(arr); // [0,0,1,1,2,2]
```

---

### Problem 6: Reverse Words in String III (Easy)

**Problem**: Reverse characters in each word but keep word order.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function reverseWords(s) {
    const words = s.split(' ');
    
    for (let i = 0; i < words.length; i++) {
        words[i] = reverseWord(words[i]);
    }
    
    return words.join(' ');
}

function reverseWord(word) {
    const chars = word.split('');
    let left = 0;
    let right = chars.length - 1;
    
    while (left < right) {
        [chars[left], chars[right]] = [chars[right], chars[left]];
        left++;
        right--;
    }
    
    return chars.join('');
}

// Example
console.log(reverseWords("Let's take LeetCode contest"));
// "s'teL ekat edoCteeL tsetnoc"
```

---

## Same Direction Pointers

---

### Problem 7: Remove Duplicates from Sorted Array (Easy)

**Problem**: Remove duplicates in-place, return new length.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    
    let slow = 0;
    
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    
    return slow + 1;
}

// Example
const nums = [1,1,2];
const len = removeDuplicates(nums);
console.log(len);              // 2
console.log(nums.slice(0, len)); // [1, 2]
```

---

### Problem 8: Remove Element (Easy)

**Problem**: Remove all occurrences of val in-place.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function removeElement(nums, val) {
    let slow = 0;
    
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== val) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    
    return slow;
}

// Example
const nums2 = [3,2,2,3];
const len2 = removeElement(nums2, 3);
console.log(len2);                // 2
console.log(nums2.slice(0, len2)); // [2, 2]
```

---

### Problem 9: Move Zeroes (Easy)

**Problem**: Move all 0s to end maintaining relative order of non-zeros.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function moveZeroes(nums) {
    let slow = 0;
    
    // Move all non-zeros to front
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            slow++;
        }
    }
}

// Example
const nums3 = [0,1,0,3,12];
moveZeroes(nums3);
console.log(nums3); // [1,3,12,0,0]
```

---

### Problem 10: Remove Duplicates from Sorted Array II (Medium)

**Problem**: Allow at most two duplicates.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function removeDuplicates(nums) {
    if (nums.length <= 2) return nums.length;
    
    let slow = 2;
    
    for (let fast = 2; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow - 2]) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    
    return slow;
}

// Example
const nums4 = [1,1,1,2,2,3];
const len4 = removeDuplicates(nums4);
console.log(len4);                // 5
console.log(nums4.slice(0, len4)); // [1,1,2,2,3]
```

---

### Problem 11: Sort Array By Parity (Easy)

**Problem**: Move even integers to front, odd to back.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function sortArrayByParity(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        if (nums[left] % 2 > nums[right] % 2) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
        }
        
        if (nums[left] % 2 === 0) left++;
        if (nums[right] % 2 === 1) right--;
    }
    
    return nums;
}

// Example
console.log(sortArrayByParity([3,1,2,4])); // [2,4,3,1] or [4,2,3,1]
```

---

### Problem 12: Squares of Sorted Array (Easy)

**Problem**: Return sorted squares of sorted array (can have negatives).

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function sortedSquares(nums) {
    const n = nums.length;
    const result = Array(n);
    let left = 0;
    let right = n - 1;
    let pos = n - 1;
    
    while (left <= right) {
        const leftSquare = nums[left] * nums[left];
        const rightSquare = nums[right] * nums[right];
        
        if (leftSquare > rightSquare) {
            result[pos] = leftSquare;
            left++;
        } else {
            result[pos] = rightSquare;
            right--;
        }
        
        pos--;
    }
    
    return result;
}

// Example
console.log(sortedSquares([-4,-1,0,3,10])); // [0,1,9,16,100]
console.log(sortedSquares([-7,-3,2,3,11])); // [4,9,9,49,121]
```

---

## Three Sum & Variants

---

### MEDIUM PROBLEMS

---

### Problem 13: Three Sum (Medium)

**Problem**: Find all triplets that sum to zero.

**Time Complexity**: O(n²)  
**Space Complexity**: O(1) excluding output

```javascript
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // Skip duplicates
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

// Example
console.log(threeSum([-1,0,1,2,-1,-4]));
// [[-1,-1,2],[-1,0,1]]
```

---

### Problem 14: Three Sum Closest (Medium)

**Problem**: Find triplet sum closest to target.

**Time Complexity**: O(n²)  
**Space Complexity**: O(1)

```javascript
function threeSumClosest(nums, target) {
    nums.sort((a, b) => a - b);
    let closest = nums[0] + nums[1] + nums[2];
    
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (Math.abs(sum - target) < Math.abs(closest - target)) {
                closest = sum;
            }
            
            if (sum < target) {
                left++;
            } else if (sum > target) {
                right--;
            } else {
                return sum; // Exact match
            }
        }
    }
    
    return closest;
}

// Example
console.log(threeSumClosest([-1,2,1,-4], 1)); // 2 (-1+2+1)
console.log(threeSumClosest([0,0,0], 1));     // 0
```

---

### Problem 15: Four Sum (Medium)

**Problem**: Find all quadruplets that sum to target.

**Time Complexity**: O(n³)  
**Space Complexity**: O(1) excluding output

```javascript
function fourSum(nums, target) {
    nums.sort((a, b) => a - b);
    const result = [];
    const n = nums.length;
    
    for (let i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        for (let j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            
            let left = j + 1;
            let right = n - 1;
            
            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                
                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    
    return result;
}

// Example
console.log(fourSum([1,0,-1,0,-2,2], 0));
// [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

---

### Problem 16: Trapping Rain Water (Hard)

**Problem**: Calculate trapped rainwater between bars.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}

// Example
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log(trap([4,2,0,3,2,5]));             // 9
```

---

## Fast & Slow Pointers

---

### Problem 17: Linked List Cycle (Easy)

**Problem**: Detect if linked list has cycle.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function hasCycle(head) {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) return true;
    }
    
    return false;
}
```

---

### Problem 18: Linked List Cycle II (Medium)

**Problem**: Find node where cycle begins.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function detectCycle(head) {
    if (!head || !head.next) return null;
    
    let slow = head;
    let fast = head;
    
    // Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            // Find start of cycle
            slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    
    return null;
}
```

---

### Problem 19: Middle of Linked List (Easy)

**Problem**: Find middle node of linked list.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function middleNode(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}
```

---

### Problem 20: Happy Number (Easy)

**Problem**: Determine if number is happy (sum of squares of digits eventually reaches 1).

**Time Complexity**: O(log n)  
**Space Complexity**: O(1)

```javascript
function isHappy(n) {
    function getNext(num) {
        let sum = 0;
        while (num > 0) {
            const digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    }
    
    let slow = n;
    let fast = getNext(n);
    
    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }
    
    return fast === 1;
}

// Example
console.log(isHappy(19)); // true
console.log(isHappy(2));  // false
```

---

### Problem 21: Find Duplicate Number (Medium)

**Problem**: Find duplicate in array of n+1 integers (1 to n).

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function findDuplicate(nums) {
    let slow = nums[0];
    let fast = nums[0];
    
    // Find intersection point
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);
    
    // Find entrance to cycle
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
}

// Example
console.log(findDuplicate([1,3,4,2,2])); // 2
console.log(findDuplicate([3,1,3,4,2])); // 3
```

---

### Problem 22: Palindrome Linked List (Easy)

**Problem**: Check if linked list is palindrome.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function isPalindrome(head) {
    if (!head || !head.next) return true;
    
    // Find middle
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let prev = null;
    let curr = slow;
    
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    
    // Compare
    let left = head;
    let right = prev;
    
    while (right) {
        if (left.val !== right.val) return false;
        left = left.next;
        right = right.next;
    }
    
    return true;
}
```

---

## String Two Pointers

---

### Problem 23: Reverse Vowels of String (Easy)

**Problem**: Reverse only vowels in string.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function reverseVowels(s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    const chars = s.split('');
    let left = 0;
    let right = chars.length - 1;
    
    while (left < right) {
        while (left < right && !vowels.has(chars[left])) {
            left++;
        }
        while (left < right && !vowels.has(chars[right])) {
            right--;
        }
        
        [chars[left], chars[right]] = [chars[right], chars[left]];
        left++;
        right--;
    }
    
    return chars.join('');
}

// Example
console.log(reverseVowels("hello"));   // "holle"
console.log(reverseVowels("leetcode")); // "leotcede"
```

---

### Problem 24: Valid Palindrome II (Easy)

**Problem**: Check if palindrome after deleting at most one character.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function validPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) {
            // Try skipping left or right
            return isPalindrome(s, left + 1, right) || 
                   isPalindrome(s, left, right - 1);
        }
        left++;
        right--;
    }
    
    return true;
}

function isPalindrome(s, left, right) {
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
}

// Example
console.log(validPalindrome("aba"));    // true
console.log(validPalindrome("abca"));   // true
console.log(validPalindrome("abc"));    // false
```

---

### Problem 25: Longest Palindrome by Concatenating (Medium)

**Problem**: Find longest palindrome by concatenating pairs.

**Time Complexity**: O(n)  
**Space Complexity**: O(n)

```javascript
function longestPalindrome(words) {
    const count = new Map();
    let length = 0;
    let hasCenter = false;
    
    for (let word of words) {
        count.set(word, (count.get(word) || 0) + 1);
    }
    
    for (let [word, freq] of count) {
        const reversed = word.split('').reverse().join('');
        
        if (word === reversed) {
            const pairs = Math.floor(freq / 2);
            length += pairs * 4;
            if (freq % 2 === 1) hasCenter = true;
        } else if (word < reversed) {
            const pairs = Math.min(freq, count.get(reversed) || 0);
            length += pairs * 4;
        }
    }
    
    return length + (hasCenter ? 2 : 0);
}

// Example
console.log(longestPalindrome(["lc","cl","gg"])); // 6
console.log(longestPalindrome(["ab","ty","yt","lc","cl","ab"])); // 8
```

---

## Advanced Problems

---

### Problem 26: Partition Labels (Medium)

**Problem**: Partition string so each letter appears in at most one part.

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function partitionLabels(s) {
    const lastIndex = new Map();
    
    // Record last occurrence
    for (let i = 0; i < s.length; i++) {
        lastIndex.set(s[i], i);
    }
    
    const result = [];
    let start = 0;
    let end = 0;
    
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, lastIndex.get(s[i]));
        
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1;
        }
    }
    
    return result;
}

// Example
console.log(partitionLabels("ababcbacadefegdehijhklij"));
// [9,7,8]
```

---

### Problem 27: Minimum Window Subsequence (Hard)

**Problem**: Find minimum window in s1 containing s2 as subsequence.

**Time Complexity**: O(m × n)  
**Space Complexity**: O(1)

```javascript
function minWindowSubsequence(s1, s2) {
    let minLen = Infinity;
    let minStart = 0;
    
    let i = 0;
    while (i < s1.length) {
        let j = 0;
        
        // Find s2 in s1
        while (i < s1.length) {
            if (s1[i] === s2[j]) {
                j++;
                if (j === s2.length) break;
            }
            i++;
        }
        
        if (i === s1.length) break;
        
        // Go backwards to find start
        let end = i;
        j = s2.length - 1;
        
        while (j >= 0) {
            if (s1[i] === s2[j]) {
                j--;
            }
            i--;
        }
        
        i++;
        
        if (end - i + 1 < minLen) {
            minLen = end - i + 1;
            minStart = i;
        }
        
        i++;
    }
    
    return minLen === Infinity ? "" : s1.substring(minStart, minStart + minLen);
}

// Example
console.log(minWindowSubsequence("abcdebdde", "bde")); // "bcde"
```

---

### Problem 28: Boats to Save People (Medium)

**Problem**: Each boat can carry at most 2 people with weight limit. Min boats needed?

**Time Complexity**: O(n log n)  
**Space Complexity**: O(1)

```javascript
function numRescueBoats(people, limit) {
    people.sort((a, b) => a - b);
    let left = 0;
    let right = people.length - 1;
    let boats = 0;
    
    while (left <= right) {
        if (people[left] + people[right] <= limit) {
            left++;
        }
        right--;
        boats++;
    }
    
    return boats;
}

// Example
console.log(numRescueBoats([1,2], 3));       // 1
console.log(numRescueBoats([3,2,2,1], 3));   // 3
console.log(numRescueBoats([3,5,3,4], 5));   // 4
```

---

### Problem 29: Advantage Shuffle (Medium)

**Problem**: Maximize number of elements in nums1 greater than nums2.

**Time Complexity**: O(n log n)  
**Space Complexity**: O(n)

```javascript
function advantageCount(nums1, nums2) {
    nums1.sort((a, b) => a - b);
    
    const n = nums1.length;
    const result = Array(n);
    const used = Array(n).fill(false);
    
    // Sort nums2 indices by value
    const indices = Array(n).fill(0).map((_, i) => i);
    indices.sort((a, b) => nums2[a] - nums2[b]);
    
    let left = 0;
    let right = n - 1;
    
    for (let i = n - 1; i >= 0; i--) {
        const idx = indices[i];
        
        if (nums1[right] > nums2[idx]) {
            result[idx] = nums1[right];
            right--;
        } else {
            result[idx] = nums1[left];
            left++;
        }
    }
    
    return result;
}

// Example
console.log(advantageCount([2,7,11,15], [1,10,4,11]));
// [2,11,7,15]
```

---

### Problem 30: Minimum Operations to Reduce X to Zero (Medium)

**Problem**: Remove elements from both ends to make sum equal to x. Min operations?

**Time Complexity**: O(n)  
**Space Complexity**: O(1)

```javascript
function minOperations(nums, x) {
    const target = nums.reduce((a, b) => a + b, 0) - x;
    
    if (target === 0) return nums.length;
    if (target < 0) return -1;
    
    let left = 0;
    let sum = 0;
    let maxLen = -1;
    
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        
        while (sum > target && left <= right) {
            sum -= nums[left];
            left++;
        }
        
        if (sum === target) {
            maxLen = Math.max(maxLen, right - left + 1);
        }
    }
    
    return maxLen === -1 ? -1 : nums.length - maxLen;
}

// Example
console.log(minOperations([1,1,4,2,3], 5)); // 2
console.log(minOperations([5,6,7,8,9], 4)); // -1
console.log(minOperations([3,2,20,1,1,3], 10)); // 5
```

---

## Problem Summary

### Easy (15 Problems)
1. Two Sum II - O(n)/O(1)
2. Valid Palindrome - O(n)/O(1)
3. Reverse String - O(n)/O(1)
4. Reverse Words III - O(n)/O(n)
5. Remove Duplicates - O(n)/O(1)
6. Remove Element - O(n)/O(1)
7. Move Zeroes - O(n)/O(1)
8. Sort Array By Parity - O(n)/O(1)
9. Squares of Sorted Array - O(n)/O(n)
10. Linked List Cycle - O(n)/O(1)
11. Middle of Linked List - O(n)/O(1)
12. Happy Number - O(log n)/O(1)
13. Palindrome Linked List - O(n)/O(1)
14. Reverse Vowels - O(n)/O(n)
15. Valid Palindrome II - O(n)/O(1)

### Medium (13 Problems)
16. Container With Most Water - O(n)/O(1)
17. Sort Colors - O(n)/O(1)
18. Remove Duplicates II - O(n)/O(1)
19. Three Sum - O(n²)/O(1)
20. Three Sum Closest - O(n²)/O(1)
21. Four Sum - O(n³)/O(1)
22. Linked List Cycle II - O(n)/O(1)
23. Find Duplicate - O(n)/O(1)
24. Partition Labels - O(n)/O(1)
25. Boats to Save People - O(n log n)/O(1)
26. Advantage Shuffle - O(n log n)/O(n)
27. Min Operations to Reduce X - O(n)/O(1)
28. Longest Palindrome Concat - O(n)/O(n)

### Hard (2 Problems)
29. Trapping Rain Water - O(n)/O(1)
30. Minimum Window Subsequence - O(m×n)/O(1)

---

## Pattern Recognition Guide

| Pattern | When to Use | Example |
|---------|-------------|---------|
| Opposite Direction | Sorted array, target sum | Two Sum II |
| Same Direction | In-place modification | Remove Duplicates |
| Fast & Slow | Cycle detection | Linked List Cycle |
| Three Pointers | Partition, colors | Sort Colors |

---

**Master Two Pointers to optimize your solutions from O(n²) to O(n)! 🚀**

