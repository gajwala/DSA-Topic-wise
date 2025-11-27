
# Complete Bit Manipulation Data Structures & Algorithms Guide

## Table of Contents
1. [Bit Manipulation Fundamentals](#bit-manipulation-fundamentals)
2. [Bitwise Operators](#bitwise-operators)
3. [Common Bit Tricks](#common-bit-tricks)
4. [Advanced Techniques](#advanced-techniques)
5. [50 Bit Manipulation Problems with Solutions](#50-bit-manipulation-problems-with-solutions)

---

## Bit Manipulation Fundamentals

### What is Bit Manipulation?
Bit manipulation involves performing operations directly on binary representations of numbers. It's extremely fast and memory-efficient.

### Binary Number System

```
Decimal  →  Binary
0        →  0000
1        →  0001
2        →  0010
3        →  0011
4        →  0100
5        →  0101
6        →  0110
7        →  0111
8        →  1000
```

### Position and Place Value

```
Binary: 1 0 1 1 0 1 0 1
Position: 7 6 5 4 3 2 1 0
Value:  128+0+32+16+0+4+0+1 = 181
```

### Why Use Bit Manipulation?

1. **Speed**: Bitwise operations are extremely fast (single CPU cycle)
2. **Memory**: Compact representation (flags, permissions)
3. **Efficiency**: Replaces complex arithmetic operations
4. **Elegance**: Concise solutions to specific problems

---

## Bitwise Operators

### 1. AND (`&`)
Returns 1 only if both bits are 1.

```javascript
5 & 3
  0101  (5)
& 0011  (3)
------
  0001  (1)

// Usage: Check if bit is set
function isBitSet(num, pos) {
    return (num & (1 << pos)) !== 0;
}
```

### 2. OR (`|`)
Returns 1 if at least one bit is 1.

```javascript
5 | 3
  0101  (5)
| 0011  (3)
------
  0111  (7)

// Usage: Set a bit
function setBit(num, pos) {
    return num | (1 << pos);
}
```

### 3. XOR (`^`)
Returns 1 if bits are different.

```javascript
5 ^ 3
  0101  (5)
^ 0011  (3)
------
  0110  (6)

// Properties:
// a ^ a = 0
// a ^ 0 = a
// a ^ b ^ b = a
```

### 4. NOT (`~`)
Inverts all bits.

```javascript
~5
~0101  (5)
------
 1010  (-6 in two's complement)

// Note: ~n = -(n+1)
```

### 5. Left Shift (`<<`)
Shifts bits to the left, fills with 0s.

```javascript
5 << 1
0101  (5)
------
1010  (10)

// Equivalent to: n * 2^shift
// 5 << 1 = 5 * 2 = 10
// 5 << 2 = 5 * 4 = 20
```

### 6. Right Shift (`>>`)
Shifts bits to the right.

```javascript
5 >> 1
0101  (5)
------
0010  (2)

// Equivalent to: floor(n / 2^shift)
// 5 >> 1 = floor(5 / 2) = 2
// 5 >> 2 = floor(5 / 4) = 1
```

### 7. Zero-fill Right Shift (`>>>`)
Shifts right, fills with 0s (unsigned).

```javascript
-5 >>> 1
// Treats number as unsigned 32-bit integer
```

---

## Common Bit Tricks

### 1. Check if Number is Even or Odd

```javascript
function isEven(n) {
    return (n & 1) === 0;
}

function isOdd(n) {
    return (n & 1) === 1;
}
```

### 2. Check if Number is Power of 2

```javascript
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

// Explanation:
// Power of 2: 8 = 1000
// 8 - 1 = 7 = 0111
// 8 & 7 = 0000 = 0
```

### 3. Count Set Bits (Hamming Weight)

```javascript
function countSetBits(n) {
    let count = 0;
    while (n > 0) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}

// Brian Kernighan's Algorithm (faster)
function countSetBitsFast(n) {
    let count = 0;
    while (n > 0) {
        n &= (n - 1); // Removes rightmost set bit
        count++;
    }
    return count;
}
```

### 4. Get, Set, Clear, Toggle Bit

```javascript
// Get bit at position i
function getBit(num, i) {
    return (num >> i) & 1;
}

// Set bit at position i to 1
function setBit(num, i) {
    return num | (1 << i);
}

// Clear bit at position i (set to 0)
function clearBit(num, i) {
    return num & ~(1 << i);
}

// Toggle bit at position i
function toggleBit(num, i) {
    return num ^ (1 << i);
}
```

### 5. Swap Two Numbers Without Temp Variable

```javascript
function swap(a, b) {
    a = a ^ b;
    b = a ^ b;  // b = a ^ b ^ b = a
    a = a ^ b;  // a = a ^ b ^ a = b
    return [a, b];
}
```

### 6. Find Missing Number (XOR method)

```javascript
function findMissing(arr, n) {
    let xor1 = 0, xor2 = 0;
    
    for (let i = 0; i < n - 1; i++) {
        xor1 ^= arr[i];
    }
    
    for (let i = 1; i <= n; i++) {
        xor2 ^= i;
    }
    
    return xor1 ^ xor2;
}
```

### 7. Find Single Number (all others appear twice)

```javascript
function singleNumber(nums) {
    let result = 0;
    for (let num of nums) {
        result ^= num;
    }
    return result;
}
```

### 8. Multiply/Divide by Power of 2

```javascript
function multiplyByPowerOf2(n, power) {
    return n << power;
}

function divideByPowerOf2(n, power) {
    return n >> power;
}
```

### 9. Get Rightmost Set Bit

```javascript
function getRightmostSetBit(n) {
    return n & -n;
}

// Example: 12 = 1100
// -12 in two's complement = ...11110100
// 12 & -12 = 0100 = 4
```

### 10. Clear All Bits from MSB to i

```javascript
function clearBitsMSBtoI(num, i) {
    const mask = (1 << i) - 1;
    return num & mask;
}
```

---

## Advanced Techniques

### 1. Generate All Subsets (Power Set)

```javascript
function getAllSubsets(arr) {
    const n = arr.length;
    const totalSubsets = 1 << n; // 2^n
    const result = [];
    
    for (let i = 0; i < totalSubsets; i++) {
        const subset = [];
        for (let j = 0; j < n; j++) {
            if (i & (1 << j)) {
                subset.push(arr[j]);
            }
        }
        result.push(subset);
    }
    
    return result;
}
```

### 2. Gray Code

```javascript
function grayCode(n) {
    const result = [];
    const total = 1 << n;
    
    for (let i = 0; i < total; i++) {
        result.push(i ^ (i >> 1));
    }
    
    return result;
}
```

### 3. Bit Masking for DP

```javascript
// Traveling Salesman Problem using bit masking
function tsp(dist, mask, pos, dp) {
    const n = dist.length;
    
    if (mask === (1 << n) - 1) {
        return dist[pos][0];
    }
    
    if (dp[mask][pos] !== -1) {
        return dp[mask][pos];
    }
    
    let ans = Infinity;
    
    for (let city = 0; city < n; city++) {
        if ((mask & (1 << city)) === 0) {
            const newAns = dist[pos][city] + 
                          tsp(dist, mask | (1 << city), city, dp);
            ans = Math.min(ans, newAns);
        }
    }
    
    dp[mask][pos] = ans;
    return ans;
}
```

### 4. Count Trailing Zeros

```javascript
function countTrailingZeros(n) {
    if (n === 0) return 32; // or word size
    
    let count = 0;
    while ((n & 1) === 0) {
        count++;
        n >>= 1;
    }
    return count;
}

// Using bit trick
function countTrailingZerosFast(n) {
    return Math.log2(n & -n);
}
```

### 5. Reverse Bits

```javascript
function reverseBits(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result <<= 1;
        result |= (n & 1);
        n >>= 1;
    }
    return result >>> 0; // Convert to unsigned 32-bit
}
```

---

## 50 Bit Manipulation Problems with Solutions

### Easy Problems (1-15)

#### Problem 1: Number of 1 Bits

```javascript
/**
 * @param {number} n
 * @return {number}
 */
function hammingWeight(n) {
    let count = 0;
    while (n !== 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}

// Alternative
function hammingWeightLoop(n) {
    let count = 0;
    while (n) {
        count += n & 1;
        n >>>= 1;
    }
    return count;
}
```

#### Problem 2: Reverse Bits

```javascript
/**
 * @param {number} n
 * @return {number}
 */
function reverseBits(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>>= 1;
    }
    return result >>> 0;
}
```

#### Problem 3: Single Number

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function singleNumber(nums) {
    let result = 0;
    for (let num of nums) {
        result ^= num;
    }
    return result;
}
```

#### Problem 4: Power of Two

```javascript
/**
 * @param {number} n
 * @return {boolean}
 */
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}
```

#### Problem 5: Power of Four

```javascript
/**
 * @param {number} n
 * @return {boolean}
 */
function isPowerOfFour(n) {
    // Must be power of 2 and set bit at odd position
    return n > 0 && 
           (n & (n - 1)) === 0 && 
           (n & 0x55555555) !== 0;
}

// Alternative
function isPowerOfFourAlt(n) {
    if (n <= 0) return false;
    if ((n & (n - 1)) !== 0) return false;
    return (n - 1) % 3 === 0;
}
```

#### Problem 6: Hamming Distance

```javascript
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
function hammingDistance(x, y) {
    let xor = x ^ y;
    let count = 0;
    
    while (xor) {
        count += xor & 1;
        xor >>>= 1;
    }
    
    return count;
}
```

#### Problem 7: Complement of Base 10 Integer

```javascript
/**
 * @param {number} n
 * @return {number}
 */
function bitwiseComplement(n) {
    if (n === 0) return 1;
    
    let bitCount = Math.floor(Math.log2(n)) + 1;
    let mask = (1 << bitCount) - 1;
    
    return n ^ mask;
}

// Alternative
function bitwiseComplementAlt(n) {
    if (n === 0) return 1;
    
    let temp = n;
    let mask = 0;
    
    while (temp > 0) {
        mask = (mask << 1) | 1;
        temp >>= 1;
    }
    
    return n ^ mask;
}
```

#### Problem 8: Missing Number

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function missingNumber(nums) {
    let xor = nums.length;
    
    for (let i = 0; i < nums.length; i++) {
        xor ^= i ^ nums[i];
    }
    
    return xor;
}

// Using sum formula
function missingNumberSum(nums) {
    const n = nums.length;
    const expectedSum = n * (n + 1) / 2;
    const actualSum = nums.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}
```

#### Problem 9: Convert Binary Number in Linked List to Integer

```javascript
/**
 * @param {ListNode} head
 * @return {number}
 */
function getDecimalValue(head) {
    let result = 0;
    while (head) {
        result = (result << 1) | head.val;
        head = head.next;
    }
    return result;
}
```

#### Problem 10: Number Complement

```javascript
/**
 * @param {number} num
 * @return {number}
 */
function findComplement(num) {
    let bitLength = num.toString(2).length;
    let mask = (1 << bitLength) - 1;
    return num ^ mask;
}
```

#### Problem 11: XOR Operation in Array

```javascript
/**
 * @param {number} n
 * @param {number} start
 * @return {number}
 */
function xorOperation(n, start) {
    let result = 0;
    for (let i = 0; i < n; i++) {
        result ^= start + 2 * i;
    }
    return result;
}
```

#### Problem 12: Sort Integers by Number of 1 Bits

```javascript
/**
 * @param {number[]} arr
 * @return {number[]}
 */
function sortByBits(arr) {
    function countBits(n) {
        let count = 0;
        while (n) {
            count += n & 1;
            n >>>= 1;
        }
        return count;
    }
    
    return arr.sort((a, b) => {
        const countA = countBits(a);
        const countB = countBits(b);
        
        if (countA !== countB) {
            return countA - countB;
        }
        return a - b;
    });
}
```

#### Problem 13: Binary Number with Alternating Bits

```javascript
/**
 * @param {number} n
 * @return {boolean}
 */
function hasAlternatingBits(n) {
    const xor = n ^ (n >> 1);
    return (xor & (xor + 1)) === 0;
}

// Alternative
function hasAlternatingBitsAlt(n) {
    let prev = n & 1;
    n >>= 1;
    
    while (n > 0) {
        const curr = n & 1;
        if (curr === prev) return false;
        prev = curr;
        n >>= 1;
    }
    
    return true;
}
```

#### Problem 14: Prime Number of Set Bits

```javascript
/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
function countPrimeSetBits(left, right) {
    const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]);
    
    function countBits(n) {
        let count = 0;
        while (n) {
            count++;
            n &= (n - 1);
        }
        return count;
    }
    
    let result = 0;
    for (let i = left; i <= right; i++) {
        if (primes.has(countBits(i))) {
            result++;
        }
    }
    
    return result;
}
```

#### Problem 15: Binary Gap

```javascript
/**
 * @param {number} n
 * @return {number}
 */
function binaryGap(n) {
    let maxGap = 0;
    let lastPos = -1;
    let pos = 0;
    
    while (n > 0) {
        if (n & 1) {
            if (lastPos !== -1) {
                maxGap = Math.max(maxGap, pos - lastPos);
            }
            lastPos = pos;
        }
        n >>= 1;
        pos++;
    }
    
    return maxGap;
}
```

### Medium Problems (16-35)

#### Problem 16: Single Number II

```javascript
/**
 * All elements appear 3 times except one
 * @param {number[]} nums
 * @return {number}
 */
function singleNumberII(nums) {
    let ones = 0, twos = 0;
    
    for (let num of nums) {
        ones = (ones ^ num) & ~twos;
        twos = (twos ^ num) & ~ones;
    }
    
    return ones;
}

// Alternative using bit counting
function singleNumberIIAlt(nums) {
    let result = 0;
    
    for (let i = 0; i < 32; i++) {
        let sum = 0;
        for (let num of nums) {
            sum += (num >> i) & 1;
        }
        result |= (sum % 3) << i;
    }
    
    return result;
}
```

#### Problem 17: Single Number III

```javascript
/**
 * Two numbers appear once, all others appear twice
 * @param {number[]} nums
 * @return {number[]}
 */
function singleNumberIII(nums) {
    let xor = 0;
    for (let num of nums) {
        xor ^= num;
    }
    
    // Find rightmost set bit
    const rightmost = xor & -xor;
    
    let num1 = 0, num2 = 0;
    for (let num of nums) {
        if (num & rightmost) {
            num1 ^= num;
        } else {
            num2 ^= num;
        }
    }
    
    return [num1, num2];
}
```

#### Problem 18: Bitwise AND of Numbers Range

```javascript
/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
function rangeBitwiseAnd(left, right) {
    let shift = 0;
    
    while (left !== right) {
        left >>= 1;
        right >>= 1;
        shift++;
    }
    
    return left << shift;
}

// Alternative
function rangeBitwiseAndAlt(left, right) {
    while (left < right) {
        right &= (right - 1);
    }
    return right;
}
```

#### Problem 19: Gray Code

```javascript
/**
 * @param {number} n
 * @return {number[]}
 */
function grayCode(n) {
    const result = [];
    const total = 1 << n;
    
    for (let i = 0; i < total; i++) {
        result.push(i ^ (i >> 1));
    }
    
    return result;
}

// Iterative approach
function grayCodeIterative(n) {
    const result = [0];
    
    for (let i = 0; i < n; i++) {
        const size = result.length;
        for (let j = size - 1; j >= 0; j--) {
            result.push(result[j] | (1 << i));
        }
    }
    
    return result;
}
```

#### Problem 20: Repeated DNA Sequences

```javascript
/**
 * @param {string} s
 * @return {string[]}
 */
function findRepeatedDnaSequences(s) {
    const seen = new Set();
    const repeated = new Set();
    
    const map = { 'A': 0, 'C': 1, 'G': 2, 'T': 3 };
    
    for (let i = 0; i <= s.length - 10; i++) {
        let hash = 0;
        for (let j = i; j < i + 10; j++) {
            hash = (hash << 2) | map[s[j]];
        }
        
        if (seen.has(hash)) {
            repeated.add(s.substring(i, i + 10));
        } else {
            seen.add(hash);
        }
    }
    
    return Array.from(repeated);
}
```

#### Problem 21: Maximum XOR of Two Numbers

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function findMaximumXOR(nums) {
    let max = 0;
    let mask = 0;
    
    for (let i = 31; i >= 0; i--) {
        mask |= (1 << i);
        const prefixes = new Set();
        
        for (let num of nums) {
            prefixes.add(num & mask);
        }
        
        const temp = max | (1 << i);
        
        for (let prefix of prefixes) {
            if (prefixes.has(temp ^ prefix)) {
                max = temp;
                break;
            }
        }
    }
    
    return max;
}
```

#### Problem 22: UTF-8 Validation

```javascript
/**
 * @param {number[]} data
 * @return {boolean}
 */
function validUtf8(data) {
    let count = 0;
    
    for (let byte of data) {
        if (count === 0) {
            if ((byte >> 5) === 0b110) {
                count = 1;
            } else if ((byte >> 4) === 0b1110) {
                count = 2;
            } else if ((byte >> 3) === 0b11110) {
                count = 3;
            } else if ((byte >> 7)) {
                return false;
            }
        } else {
            if ((byte >> 6) !== 0b10) {
                return false;
            }
            count--;
        }
    }
    
    return count === 0;
}
```

#### Problem 23: Total Hamming Distance

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function totalHammingDistance(nums) {
    let total = 0;
    const n = nums.length;
    
    for (let i = 0; i < 32; i++) {
        let ones = 0;
        
        for (let num of nums) {
            ones += (num >> i) & 1;
        }
        
        total += ones * (n - ones);
    }
    
    return total;
}
```

#### Problem 24: Integer Replacement

```javascript
/**
 * @param {number} n
 * @return {number}
 */
function integerReplacement(n) {
    let count = 0;
    
    while (n !== 1) {
        if (n % 2 === 0) {
            n /= 2;
        } else if (n === 3 || ((n >> 1) & 1) === 0) {
            n--;
        } else {
            n++;
        }
        count++;
    }
    
    return count;
}
```

#### Problem 25: Counting Bits

```javascript
/**
 * @param {number} n
 * @return {number[]}
 */
function countBits(n) {
    const result = Array(n + 1).fill(0);
    
    for (let i = 1; i <= n; i++) {
        result[i] = result[i >> 1] + (i & 1);
    }
    
    return result;
}

// Alternative DP
function countBitsDP(n) {
    const result = Array(n + 1).fill(0);
    
    for (let i = 1; i <= n; i++) {
        result[i] = result[i & (i - 1)] + 1;
    }
    
    return result;
}
```

#### Problem 26: Maximum Product of Word Lengths

```javascript
/**
 * @param {string[]} words
 * @return {number}
 */
function maxProduct(words) {
    const n = words.length;
    const masks = Array(n);
    
    // Create bitmask for each word
    for (let i = 0; i < n; i++) {
        let mask = 0;
        for (let char of words[i]) {
            mask |= 1 << (char.charCodeAt(0) - 97);
        }
        masks[i] = mask;
    }
    
    let maxProd = 0;
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if ((masks[i] & masks[j]) === 0) {
                maxProd = Math.max(maxProd, 
                    words[i].length * words[j].length);
            }
        }
    }
    
    return maxProd;
}
```

#### Problem 27: Subsets

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {
    const result = [];
    const n = nums.length;
    const total = 1 << n;
    
    for (let i = 0; i < total; i++) {
        const subset = [];
        for (let j = 0; j < n; j++) {
            if (i & (1 << j)) {
                subset.push(nums[j]);
            }
        }
        result.push(subset);
    }
    
    return result;
}
```

#### Problem 28: Binary Watch

```javascript
/**
 * @param {number} turnedOn
 * @return {string[]}
 */
function readBinaryWatch(turnedOn) {
    const result = [];
    
    function countBits(n) {
        let count = 0;
        while (n) {
            count++;
            n &= (n - 1);
        }
        return count;
    }
    
    for (let h = 0; h < 12; h++) {
        for (let m = 0; m < 60; m++) {
            if (countBits(h) + countBits(m) === turnedOn) {
                result.push(`${h}:${m.toString().padStart(2, '0')}`);
            }
        }
    }
    
    return result;
}
```

#### Problem 29: Find the Duplicate Number (Bit Manipulation)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function findDuplicate(nums) {
    let duplicate = 0;
    const n = nums.length - 1;
    
    for (let bit = 0; bit < 32; bit++) {
        let mask = 1 << bit;
        let baseCount = 0;
        let numsCount = 0;
        
        for (let i = 0; i <= n; i++) {
            if (i & mask) baseCount++;
            if (nums[i] & mask) numsCount++;
        }
        
        if (numsCount > baseCount) {
            duplicate |= mask;
        }
    }
    
    return duplicate;
}
```

#### Problem 30: Majority Element (Bit Manipulation)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function majorityElement(nums) {
    let result = 0;
    
    for (let i = 0; i < 32; i++) {
        let count = 0;
        
        for (let num of nums) {
            if (num & (1 << i)) {
                count++;
            }
        }
        
        if (count > nums.length / 2) {
            result |= (1 << i);
        }
    }
    
    return result;
}
```

#### Problem 31: Divide Two Integers (Bit Manipulation)

```javascript
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
function divide(dividend, divisor) {
    if (dividend === -2147483648 && divisor === -1) {
        return 2147483647;
    }
    
    const negative = (dividend < 0) !== (divisor < 0);
    
    let a = Math.abs(dividend);
    let b = Math.abs(divisor);
    let result = 0;
    
    while (a >= b) {
        let temp = b;
        let multiple = 1;
        
        while (a >= (temp << 1) && (temp << 1) > 0) {
            temp <<= 1;
            multiple <<= 1;
        }
        
        a -= temp;
        result += multiple;
    }
    
    return negative ? -result : result;
}
```

#### Problem 32: Reverse Integer (Bit Manipulation)

```javascript
/**
 * @param {number} x
 * @return {number}
 */
function reverse(x) {
    const negative = x < 0;
    x = Math.abs(x);
    
    let result = 0;
    
    while (x > 0) {
        result = result * 10 + (x % 10);
        x = Math.floor(x / 10);
    }
    
    if (result > 2147483647) return 0;
    
    return negative ? -result : result;
}
```

#### Problem 33: Sum of Two Integers (No + operator)

```javascript
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function getSum(a, b) {
    while (b !== 0) {
        const carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}
```

#### Problem 34: Subsets II (with duplicates)

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsetsWithDup(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    const n = nums.length;
    const total = 1 << n;
    const seen = new Set();
    
    for (let i = 0; i < total; i++) {
        const subset = [];
        for (let j = 0; j < n; j++) {
            if (i & (1 << j)) {
                subset.push(nums[j]);
            }
        }
        
        const key = subset.join(',');
        if (!seen.has(key)) {
            seen.add(key);
            result.push(subset);
        }
    }
    
    return result;
}
```

#### Problem 35: Minimum Flips to Make OR Equal

```javascript
/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
function minFlips(a, b, c) {
    let flips = 0;
    
    for (let i = 0; i < 32; i++) {
        const bitA = (a >> i) & 1;
        const bitB = (b >> i) & 1;
        const bitC = (c >> i) & 1;
        
        if (bitC === 0) {
            flips += bitA + bitB;
        } else {
            if (bitA === 0 && bitB === 0) {
                flips++;
            }
        }
    }
    
    return flips;
}
```

### Hard Problems (36-50)

#### Problem 36: Maximum XOR with Element from Array

```javascript
/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
function maximizeXor(nums, queries) {
    class TrieNode {
        constructor() {
            this.children = {};
            this.value = -1;
        }
    }
    
    class Trie {
        constructor() {
            this.root = new TrieNode();
        }
        
        insert(num) {
            let node = this.root;
            for (let i = 31; i >= 0; i--) {
                const bit = (num >> i) & 1;
                if (!node.children[bit]) {
                    node.children[bit] = new TrieNode();
                }
                node = node.children[bit];
            }
            node.value = num;
        }
        
        findMaxXor(num) {
            let node = this.root;
            for (let i = 31; i >= 0; i--) {
                const bit = (num >> i) & 1;
                const toggleBit = 1 - bit;
                
                if (node.children[toggleBit]) {
                    node = node.children[toggleBit];
                } else if (node.children[bit]) {
                    node = node.children[bit];
                } else {
                    return -1;
                }
            }
            return node.value ^ num;
        }
    }
    
    nums.sort((a, b) => a - b);
    const indexed = queries.map((q, i) => [...q, i]);
    indexed.sort((a, b) => a[1] - b[1]);
    
    const result = Array(queries.length);
    const trie = new Trie();
    let j = 0;
    
    for (let [x, m, i] of indexed) {
        while (j < nums.length && nums[j] <= m) {
            trie.insert(nums[j]);
            j++;
        }
        result[i] = trie.findMaxXor(x);
    }
    
    return result;
}
```

#### Problem 37: Concatenated Words

```javascript
/**
 * @param {string[]} words
 * @return {string[]}
 */
function findAllConcatenatedWords(words) {
    const wordSet = new Set(words);
    const memo = new Map();
    
    function canForm(word, original) {
        if (word === original && wordSet.has(word)) {
            return false;
        }
        
        if (memo.has(word)) {
            return memo.get(word);
        }
        
        if (word.length === 0) return true;
        if (!wordSet.has(word) && word !== original) return false;
        
        for (let i = 1; i <= word.length; i++) {
            const prefix = word.substring(0, i);
            const suffix = word.substring(i);
            
            if (wordSet.has(prefix) && canForm(suffix, original)) {
                memo.set(word, true);
                return true;
            }
        }
        
        memo.set(word, false);
        return false;
    }
    
    const result = [];
    
    for (let word of words) {
        memo.clear();
        if (canForm(word, word)) {
            result.push(word);
        }
    }
    
    return result;
}
```

#### Problem 38: K-th Symbol in Grammar

```javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
function kthGrammar(n, k) {
    if (n === 1) return 0;
    
    const parent = kthGrammar(n - 1, Math.ceil(k / 2));
    const isOdd = k % 2 === 1;
    
    if (parent === 0) {
        return isOdd ? 0 : 1;
    } else {
        return isOdd ? 1 : 0;
    }
}

// Bit manipulation approach
function kthGrammarBit(n, k) {
    return Integer.bitCount(k - 1) & 1;
}
```

#### Problem 39: Beautiful Arrangement

```javascript
/**
 * @param {number} n
 * @return {number}
 */
function countArrangement(n) {
    let count = 0;
    
    function backtrack(pos, mask) {
        if (pos > n) {
            count++;
            return;
        }
        
        for (let i = 1; i <= n; i++) {
            if ((mask & (1 << i)) === 0 && 
                (pos % i === 0 || i % pos === 0)) {
                backtrack(pos + 1, mask | (1 << i));
            }
        }
    }
    
    backtrack(1, 0);
    return count;
}
```

#### Problem 40: Number of Valid Words for Puzzle

```javascript
/**
 * @param {string[]} words
 * @param {string[]} puzzles
 * @return {number[]}
 */
function findNumOfValidWords(words, puzzles) {
    const wordMasks = new Map();
    
    for (let word of words) {
        let mask = 0;
        for (let char of word) {
            mask |= 1 << (char.charCodeAt(0) - 97);
        }
        wordMasks.set(mask, (wordMasks.get(mask) || 0) + 1);
    }
    
    const result = [];
    
    for (let puzzle of puzzles) {
        const firstBit = 1 << (puzzle[0].charCodeAt(0) - 97);
        let puzzleMask = 0;
        
        for (let char of puzzle) {
            puzzleMask |= 1 << (char.charCodeAt(0) - 97);
        }
        
        let count = 0;
        let submask = puzzleMask;
        
        while (submask > 0) {
            if (submask & firstBit) {
                count += wordMasks.get(submask) || 0;
            }
            submask = (submask - 1) & puzzleMask;
        }
        
        result.push(count);
    }
    
    return result;
}
```

#### Problem 41: Largest Combination with Bitwise AND Greater Than Zero

```javascript
/**
 * @param {number[]} candidates
 * @return {number}
 */
function largestCombination(candidates) {
    let maxCount = 0;
    
    for (let bit = 0; bit < 24; bit++) {
        let count = 0;
        
        for (let num of candidates) {
            if (num & (1 << bit)) {
                count++;
            }
        }
        
        maxCount = Math.max(maxCount, count);
    }
    
    return maxCount;
}
```

#### Problem 42: Shortest Path Visiting All Nodes

```javascript
/**
 * @param {number[][]} graph
 * @return {number}
 */
function shortestPathLength(graph) {
    const n = graph.length;
    const target = (1 << n) - 1;
    const queue = [];
    const visited = new Set();
    
    for (let i = 0; i < n; i++) {
        const state = 1 << i;
        queue.push([i, state, 0]);
        visited.add(`${i},${state}`);
    }
    
    while (queue.length > 0) {
        const [node, state, dist] = queue.shift();
        
        if (state === target) return dist;
        
        for (let neighbor of graph[node]) {
            const newState = state | (1 << neighbor);
            const key = `${neighbor},${newState}`;
            
            if (!visited.has(key)) {
                visited.add(key);
                queue.push([neighbor, newState, dist + 1]);
            }
        }
    }
    
    return -1;
}
```

#### Problem 43: Smallest Sufficient Team

```javascript
/**
 * @param {string[]} req_skills
 * @param {string[][]} people
 * @return {number[]}
 */
function smallestSufficientTeam(req_skills, people) {
    const n = req_skills.length;
    const target = (1 << n) - 1;
    
    const skillToIndex = new Map();
    req_skills.forEach((skill, i) => skillToIndex.set(skill, i));
    
    const peopleMasks = people.map(person => {
        let mask = 0;
        for (let skill of person) {
            if (skillToIndex.has(skill)) {
                mask |= 1 << skillToIndex.get(skill);
            }
        }
        return mask;
    });
    
    const dp = Array(1 << n).fill(null);
    dp[0] = [];
    
    for (let mask = 0; mask < (1 << n); mask++) {
        if (dp[mask] === null) continue;
        
        for (let i = 0; i < people.length; i++) {
            const newMask = mask | peopleMasks[i];
            
            if (dp[newMask] === null || 
                dp[newMask].length > dp[mask].length + 1) {
                dp[newMask] = [...dp[mask], i];
            }
        }
    }
    
    return dp[target];
}
```

#### Problem 44: Maximum Students Taking Exam

```javascript
/**
 * @param {character[][]} seats
 * @return {number}
 */
function maxStudents(seats) {
    const m = seats.length;
    const n = seats[0].length;
    
    function isValid(mask, row) {
        for (let j = 0; j < n; j++) {
            if (mask & (1 << j)) {
                if (seats[row][j] === '#') return false;
                if (j > 0 && (mask & (1 << (j - 1)))) return false;
            }
        }
        return true;
    }
    
    function noAdjacent(curr, prev) {
        for (let j = 0; j < n; j++) {
            if (curr & (1 << j)) {
                if (j > 0 && (prev & (1 << (j - 1)))) return false;
                if (j < n - 1 && (prev & (1 << (j + 1)))) return false;
            }
        }
        return true;
    }
    
    const dp = Array(m).fill(null)
        .map(() => Array(1 << n).fill(-1));
    
    function solve(row, prevMask) {
        if (row === m) return 0;
        if (dp[row][prevMask] !== -1) return dp[row][prevMask];
        
        let maxCount = 0;
        
        for (let mask = 0; mask < (1 << n); mask++) {
            if (isValid(mask, row) && noAdjacent(mask, prevMask)) {
                const count = countBits(mask) + solve(row + 1, mask);
                maxCount = Math.max(maxCount, count);
            }
        }
        
        dp[row][prevMask] = maxCount;
        return maxCount;
    }
    
    function countBits(n) {
        let count = 0;
        while (n) {
            count++;
            n &= (n - 1);
        }
        return count;
    }
    
    return solve(0, 0);
}
```

#### Problem 45: Partition to K Equal Sum Subsets

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function canPartitionKSubsets(nums, k) {
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % k !== 0) return false;
    
    const target = sum / k;
    nums.sort((a, b) => b - a);
    
    if (nums[0] > target) return false;
    
    const n = nums.length;
    const dp = Array(1 << n).fill(-1);
    dp[0] = 0;
    
    for (let mask = 0; mask < (1 << n); mask++) {
        if (dp[mask] === -1) continue;
        
        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) continue;
            
            const newMask = mask | (1 << i);
            const newSum = dp[mask] + nums[i];
            
            if (newSum <= target) {
                dp[newMask] = newSum % target;
            }
        }
    }
    
    return dp[(1 << n) - 1] === 0;
}
```

#### Problem 46: Find XOR Sum of All Pairs Bitwise AND

```javascript
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
function getXORSum(arr1, arr2) {
    let xor1 = 0;
    let xor2 = 0;
    
    for (let num of arr1) {
        xor1 ^= num;
    }
    
    for (let num of arr2) {
        xor2 ^= num;
    }
    
    return xor1 & xor2;
}
```

#### Problem 47: Minimize XOR

```javascript
/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
function minimizeXor(num1, num2) {
    function countBits(n) {
        let count = 0;
        while (n) {
            count++;
            n &= (n - 1);
        }
        return count;
    }
    
    const target = countBits(num2);
    let result = 0;
    let count = 0;
    
    // Set bits from MSB
    for (let i = 31; i >= 0 && count < target; i--) {
        if (num1 & (1 << i)) {
            result |= (1 << i);
            count++;
        }
    }
    
    // Set remaining bits from LSB
    for (let i = 0; i < 32 && count < target; i++) {
        if ((result & (1 << i)) === 0) {
            result |= (1 << i);
            count++;
        }
    }
    
    return result;
}
```

#### Problem 48: Maximum Score Words Formed by Letters

```javascript
/**
 * @param {string[]} words
 * @param {character[]} letters
 * @param {number[]} score
 * @return {number}
 */
function maxScoreWords(words, letters, score) {
    const freq = Array(26).fill(0);
    
    for (let char of letters) {
        freq[char.charCodeAt(0) - 97]++;
    }
    
    function getScore(word, freq) {
        const tempFreq = [...freq];
        let totalScore = 0;
        
        for (let char of word) {
            const idx = char.charCodeAt(0) - 97;
            if (tempFreq[idx] === 0) return -1;
            tempFreq[idx]--;
            totalScore += score[idx];
        }
        
        return totalScore;
    }
    
    let maxScore = 0;
    const n = words.length;
    
    for (let mask = 0; mask < (1 << n); mask++) {
        const tempFreq = [...freq];
        let currentScore = 0;
        let valid = true;
        
        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                const wordScore = getScore(words[i], tempFreq);
                if (wordScore === -1) {
                    valid = false;
                    break;
                }
                currentScore += wordScore;
                
                for (let char of words[i]) {
                    tempFreq[char.charCodeAt(0) - 97]--;
                }
            }
        }
        
        if (valid) {
            maxScore = Math.max(maxScore, currentScore);
        }
    }
    
    return maxScore;
}
```

#### Problem 49: Construct Target Array with Multiple Sums

```javascript
/**
 * @param {number[]} target
 * @return {boolean}
 */
function isPossible(target) {
    const sum = target.reduce((a, b) => a + b, 0);
    
    if (sum === target.length) return true;
    
    const maxHeap = target.slice();
    maxHeap.sort((a, b) => b - a);
    
    while (maxHeap[0] > 1) {
        const largest = maxHeap.shift();
        const rest = sum - largest;
        
        if (rest === 0 || largest < rest) return false;
        
        const newVal = largest % rest;
        if (newVal === 0) return rest === 1;
        
        maxHeap.push(newVal);
        maxHeap.sort((a, b) => b - a);
        sum = sum - largest + newVal;
    }
    
    return true;
}
```

#### Problem 50: Maximum Genetic Difference Query

```javascript
/**
 * @param {number[]} parents
 * @param {number[][]} queries
 * @return {number[]}
 */
function maxGeneticDifference(parents, queries) {
    const n = parents.length;
    const tree = Array(n).fill(null).map(() => []);
    let root = -1;
    
    for (let i = 0; i < n; i++) {
        if (parents[i] === -1) {
            root = i;
        } else {
            tree[parents[i]].push(i);
        }
    }
    
    const queryMap = new Map();
    for (let i = 0; i < queries.length; i++) {
        const [node, val] = queries[i];
        if (!queryMap.has(node)) {
            queryMap.set(node, []);
        }
        queryMap.get(node).push([val, i]);
    }
    
    const result = Array(queries.length);
    
    class Trie {
        constructor() {
            this.root = {};
        }
        
        insert(num) {
            let node = this.root;
            for (let i = 17; i >= 0; i--) {
                const bit = (num >> i) & 1;
                if (!node[bit]) node[bit] = { count: 0 };
                node = node[bit];
                node.count = (node.count || 0) + 1;
            }
        }
        
        remove(num) {
            let node = this.root;
            for (let i = 17; i >= 0; i--) {
                const bit = (num >> i) & 1;
                node = node[bit];
                node.count--;
            }
        }
        
        maxXor(num) {
            let node = this.root;
            let result = 0;
            
            for (let i = 17; i >= 0; i--) {
                const bit = (num >> i) & 1;
                const toggleBit = 1 - bit;
                
                if (node[toggleBit] && node[toggleBit].count > 0) {
                    result |= (1 << i);
                    node = node[toggleBit];
                } else {
                    node = node[bit];
                }
            }
            
            return result;
        }
    }
    
    const trie = new Trie();
    
    function dfs(node) {
        trie.insert(node);
        
        if (queryMap.has(node)) {
            for (let [val, idx] of queryMap.get(node)) {
                result[idx] = trie.maxXor(val);
            }
        }
        
        for (let child of tree[node]) {
            dfs(child);
        }
        
        trie.remove(node);
    }
    
    dfs(root);
    return result;
}
```

---

## Bit Manipulation Cheat Sheet

### Common Operations

| Operation | Code | Description |
|-----------|------|-------------|
| Check bit | `n & (1 << i)` | Check if i-th bit is set |
| Set bit | `n \| (1 << i)` | Set i-th bit to 1 |
| Clear bit | `n & ~(1 << i)` | Set i-th bit to 0 |
| Toggle bit | `n ^ (1 << i)` | Flip i-th bit |
| Remove rightmost 1 | `n & (n-1)` | Turn off rightmost set bit |
| Get rightmost 1 | `n & -n` | Isolate rightmost set bit |
| Check power of 2 | `n > 0 && (n & (n-1)) == 0` | True if power of 2 |
| Check even | `(n & 1) == 0` | True if even |
| Multiply by 2 | `n << 1` | Left shift by 1 |
| Divide by 2 | `n >> 1` | Right shift by 1 |

### XOR Properties

```
a ^ a = 0
a ^ 0 = a
a ^ b = b ^ a  (commutative)
a ^ b ^ a = b  (cancellation)
```

---

## Tips & Tricks

1. **Visualize in binary**: Always think in binary representation
2. **Use powers of 2**: Recognize `1 << n` is 2^n
3. **Test with small numbers**: Verify logic with 0, 1, 2, 3
4. **Watch for overflow**: Be careful with 32-bit operations
5. **Use bit masking**: Efficient for sets and flags
6. **XOR for pairs**: Great for finding unique elements

---

## Practice Resources

- **LeetCode**: Bit Manipulation tag
- **GeeksforGeeks**: Bit Algorithms
- **InterviewBit**: Bit Manipulation section
- **Codeforces**: Bitmasks problems

---

**Happy Coding! 🔢**

