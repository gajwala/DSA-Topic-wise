# 🎯 Top 150 DSA Problems - Interview Preparation Tracker

## 📊 Progress Overview
- **Total Problems**: 150
- **Easy**: 35 problems
- **Medium**: 80 problems
- **Hard**: 35 problems

---

## 📚 Table of Contents
1. [Array & Hashing](#1-array--hashing) (22 problems)
2. [Two Pointers](#2-two-pointers) (12 problems)
3. [Sliding Window](#3-sliding-window) (10 problems)
4. [Stack](#4-stack) (10 problems)
5. [Binary Search](#5-binary-search) (10 problems)
6. [Linked List](#6-linked-list) (12 problems)
7. [Trees](#7-trees) (18 problems)
8. [Tries](#8-tries) (4 problems)
9. [Heap / Priority Queue](#9-heap--priority-queue) (8 problems)
10. [Backtracking](#10-backtracking) (10 problems)
11. [Graphs](#11-graphs) (12 problems)
12. [Dynamic Programming](#12-dynamic-programming) (18 problems)
13. [Greedy](#13-greedy) (8 problems)
14. [Intervals](#14-intervals) (6 problems)

---

## 1. Array & Hashing

<details>
<summary><b>Easy (10 problems)</b></summary>

### 1. Contains Duplicate
- [ ] **Problem**: Given an integer array, return true if any value appears at least twice.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Array, Hash Table
- **Link**: LeetCode #217

### 2. Valid Anagram
- [ ] **Problem**: Check if two strings are anagrams of each other.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Hash Table, String, Sorting
- **Link**: LeetCode #242

### 3. Two Sum
- [ ] **Problem**: Find two numbers in array that add up to target, return indices.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Array, Hash Table
- **Link**: LeetCode #1

### 4. Replace Elements with Greatest Element on Right Side
- [ ] **Problem**: Replace every element with the greatest element to its right.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array
- **Link**: LeetCode #1299

### 5. Is Subsequence
- [ ] **Problem**: Check if string s is a subsequence of string t.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Two Pointers, String
- **Link**: LeetCode #392

### 6. Length of Last Word
- [ ] **Problem**: Return the length of the last word in a string.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: String
- **Link**: LeetCode #58

### 7. Concatenation of Array
- [ ] **Problem**: Create array ans where ans[i] = nums[i] and ans[i + n] = nums[i].
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Array
- **Link**: LeetCode #1929

### 8. Majority Element
- [ ] **Problem**: Find element that appears more than ⌊n/2⌋ times.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Hash Table, Divide and Conquer
- **Link**: LeetCode #169

### 9. Pascal's Triangle
- [ ] **Problem**: Generate the first numRows of Pascal's triangle.
- **Time**: O(n²) | **Space**: O(n²)
- **Topics**: Array, Dynamic Programming
- **Link**: LeetCode #118

### 10. Remove Element
- [ ] **Problem**: Remove all occurrences of val in nums in-place.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Two Pointers
- **Link**: LeetCode #27

</details>

<details>
<summary><b>Medium (10 problems)</b></summary>

### 11. Product of Array Except Self
- [ ] **Problem**: Return array where output[i] equals product of all elements except nums[i].
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Prefix Sum
- **Link**: LeetCode #238

### 12. Valid Sudoku
- [ ] **Problem**: Determine if a 9x9 Sudoku board is valid.
- **Time**: O(1) | **Space**: O(1)
- **Topics**: Array, Hash Table, Matrix
- **Link**: LeetCode #36

### 13. Encode and Decode Strings
- [ ] **Problem**: Design algorithm to encode/decode list of strings to/from single string.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, String, Design
- **Link**: LeetCode #271 (Premium)

### 14. Longest Consecutive Sequence
- [ ] **Problem**: Find length of longest consecutive elements sequence.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Array, Hash Table, Union Find
- **Link**: LeetCode #128

### 15. Top K Frequent Elements
- [ ] **Problem**: Return k most frequent elements in array.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Array, Hash Table, Bucket Sort
- **Link**: LeetCode #347

### 16. Group Anagrams
- [ ] **Problem**: Group anagrams together from list of strings.
- **Time**: O(m × n) | **Space**: O(m × n)
- **Topics**: Array, Hash Table, String, Sorting
- **Link**: LeetCode #49

### 17. Subarray Sum Equals K
- [ ] **Problem**: Find total number of subarrays whose sum equals k.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Array, Hash Table, Prefix Sum
- **Link**: LeetCode #560

### 18. Find All Duplicates in Array
- [ ] **Problem**: Find all elements that appear twice in array.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Hash Table
- **Link**: LeetCode #442

### 19. Longest Substring Without Repeating Characters
- [ ] **Problem**: Find length of longest substring without repeating characters.
- **Time**: O(n) | **Space**: O(min(m,n))
- **Topics**: Hash Table, String, Sliding Window
- **Link**: LeetCode #3

### 20. 3Sum
- [ ] **Problem**: Find all unique triplets that sum to zero.
- **Time**: O(n²) | **Space**: O(1)
- **Topics**: Array, Two Pointers, Sorting
- **Link**: LeetCode #15

</details>

<details>
<summary><b>Hard (2 problems)</b></summary>

### 21. First Missing Positive
- [ ] **Problem**: Find smallest missing positive integer in unsorted array.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Hash Table
- **Link**: LeetCode #41

### 22. Median of Two Sorted Arrays
- [ ] **Problem**: Find median of two sorted arrays.
- **Time**: O(log(min(m,n))) | **Space**: O(1)
- **Topics**: Array, Binary Search, Divide and Conquer
- **Link**: LeetCode #4

</details>

---

## 2. Two Pointers

<details>
<summary><b>Easy (6 problems)</b></summary>

### 23. Valid Palindrome
- [ ] **Problem**: Check if string is a palindrome (alphanumeric characters only).
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Two Pointers, String
- **Link**: LeetCode #125

### 24. Move Zeroes
- [ ] **Problem**: Move all 0's to end while maintaining relative order.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Two Pointers
- **Link**: LeetCode #283

### 25. Merge Sorted Array
- [ ] **Problem**: Merge nums2 into nums1 as one sorted array.
- **Time**: O(m + n) | **Space**: O(1)
- **Topics**: Array, Two Pointers, Sorting
- **Link**: LeetCode #88

### 26. Remove Duplicates from Sorted Array
- [ ] **Problem**: Remove duplicates in-place, return new length.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Two Pointers
- **Link**: LeetCode #26

### 27. Squares of a Sorted Array
- [ ] **Problem**: Return array of squares of each number sorted in non-decreasing order.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Array, Two Pointers, Sorting
- **Link**: LeetCode #977

### 28. Reverse String
- [ ] **Problem**: Reverse string in-place.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Two Pointers, String
- **Link**: LeetCode #344

</details>

<details>
<summary><b>Medium (6 problems)</b></summary>

### 29. Two Sum II - Input Array Sorted
- [ ] **Problem**: Find two numbers that add up to target in sorted array.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Two Pointers, Binary Search
- **Link**: LeetCode #167

### 30. 3Sum Closest
- [ ] **Problem**: Find three integers whose sum is closest to target.
- **Time**: O(n²) | **Space**: O(1)
- **Topics**: Array, Two Pointers, Sorting
- **Link**: LeetCode #16

### 31. Container With Most Water
- [ ] **Problem**: Find two lines that form container with most water.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Two Pointers, Greedy
- **Link**: LeetCode #11

### 32. Sort Colors
- [ ] **Problem**: Sort array with 0s, 1s, and 2s in-place (Dutch National Flag).
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Two Pointers, Sorting
- **Link**: LeetCode #75

### 33. Remove Nth Node From End of List
- [ ] **Problem**: Remove nth node from end of linked list.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Linked List, Two Pointers
- **Link**: LeetCode #19

### 34. Trapping Rain Water
- [ ] **Problem**: Calculate how much water can be trapped after rain.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Two Pointers, Dynamic Programming, Stack
- **Link**: LeetCode #42

</details>

---

## 3. Sliding Window

<details>
<summary><b>Easy (2 problems)</b></summary>

### 35. Best Time to Buy and Sell Stock
- [ ] **Problem**: Find maximum profit from one buy and one sell transaction.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Dynamic Programming
- **Link**: LeetCode #121

### 36. Maximum Average Subarray I
- [ ] **Problem**: Find contiguous subarray of length k with maximum average.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Sliding Window
- **Link**: LeetCode #643

</details>

<details>
<summary><b>Medium (6 problems)</b></summary>

### 37. Longest Substring Without Repeating Characters
- [ ] **Problem**: Find length of longest substring without repeating characters.
- **Time**: O(n) | **Space**: O(min(m,n))
- **Topics**: Hash Table, String, Sliding Window
- **Link**: LeetCode #3

### 38. Longest Repeating Character Replacement
- [ ] **Problem**: Find length of longest substring with same letters after k replacements.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Hash Table, String, Sliding Window
- **Link**: LeetCode #424

### 39. Permutation in String
- [ ] **Problem**: Check if one string contains permutation of another.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Hash Table, Two Pointers, String, Sliding Window
- **Link**: LeetCode #567

### 40. Maximum Subarray
- [ ] **Problem**: Find contiguous subarray with largest sum.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Divide and Conquer, Dynamic Programming
- **Link**: LeetCode #53

### 41. Fruit Into Baskets
- [ ] **Problem**: Pick maximum fruits from trees with at most 2 types.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Hash Table, Sliding Window
- **Link**: LeetCode #904

### 42. Subarray Product Less Than K
- [ ] **Problem**: Count subarrays where product is less than k.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Sliding Window
- **Link**: LeetCode #713

</details>

<details>
<summary><b>Hard (2 problems)</b></summary>

### 43. Minimum Window Substring
- [ ] **Problem**: Find minimum window substring containing all characters of t.
- **Time**: O(m + n) | **Space**: O(m + n)
- **Topics**: Hash Table, String, Sliding Window
- **Link**: LeetCode #76

### 44. Sliding Window Maximum
- [ ] **Problem**: Find maximum value in each sliding window of size k.
- **Time**: O(n) | **Space**: O(k)
- **Topics**: Array, Queue, Sliding Window, Heap, Monotonic Queue
- **Link**: LeetCode #239

</details>

---

## 4. Stack

<details>
<summary><b>Easy (4 problems)</b></summary>

### 45. Valid Parentheses
- [ ] **Problem**: Check if string of parentheses is valid.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: String, Stack
- **Link**: LeetCode #20

### 46. Min Stack
- [ ] **Problem**: Design stack that supports push, pop, top, and retrieving minimum in O(1).
- **Time**: O(1) | **Space**: O(n)
- **Topics**: Stack, Design
- **Link**: LeetCode #155

### 47. Implement Queue using Stacks
- [ ] **Problem**: Implement FIFO queue using only two stacks.
- **Time**: O(1) amortized | **Space**: O(n)
- **Topics**: Stack, Design, Queue
- **Link**: LeetCode #232

### 48. Backspace String Compare
- [ ] **Problem**: Compare two strings after processing backspaces.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Two Pointers, String, Stack
- **Link**: LeetCode #844

</details>

<details>
<summary><b>Medium (5 problems)</b></summary>

### 49. Daily Temperatures
- [ ] **Problem**: Find how many days until warmer temperature.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Array, Stack, Monotonic Stack
- **Link**: LeetCode #739

### 50. Evaluate Reverse Polish Notation
- [ ] **Problem**: Evaluate value of arithmetic expression in RPN.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Array, Math, Stack
- **Link**: LeetCode #150

### 51. Generate Parentheses
- [ ] **Problem**: Generate all combinations of well-formed parentheses.
- **Time**: O(4ⁿ/√n) | **Space**: O(n)
- **Topics**: String, Dynamic Programming, Backtracking
- **Link**: LeetCode #22

### 52. Online Stock Span
- [ ] **Problem**: Calculate span of stock's price for current day.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Stack, Design, Monotonic Stack
- **Link**: LeetCode #901

### 53. Decode String
- [ ] **Problem**: Decode encoded string with pattern k[encoded_string].
- **Time**: O(n) | **Space**: O(n)
- **Topics**: String, Stack, Recursion
- **Link**: LeetCode #394

</details>

<details>
<summary><b>Hard (1 problem)</b></summary>

### 54. Largest Rectangle in Histogram
- [ ] **Problem**: Find area of largest rectangle in histogram.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Array, Stack, Monotonic Stack
- **Link**: LeetCode #84

</details>

---

## 5. Binary Search

<details>
<summary><b>Easy (4 problems)</b></summary>

### 55. Binary Search
- [ ] **Problem**: Search for target value in sorted array.
- **Time**: O(log n) | **Space**: O(1)
- **Topics**: Array, Binary Search
- **Link**: LeetCode #704

### 56. Search Insert Position
- [ ] **Problem**: Find index where target would be inserted in sorted array.
- **Time**: O(log n) | **Space**: O(1)
- **Topics**: Array, Binary Search
- **Link**: LeetCode #35

### 57. First Bad Version
- [ ] **Problem**: Find first bad version that causes all following versions to be bad.
- **Time**: O(log n) | **Space**: O(1)
- **Topics**: Binary Search, Interactive
- **Link**: LeetCode #278

### 58. Sqrt(x)
- [ ] **Problem**: Return square root of x rounded down to nearest integer.
- **Time**: O(log n) | **Space**: O(1)
- **Topics**: Math, Binary Search
- **Link**: LeetCode #69

</details>

<details>
<summary><b>Medium (5 problems)</b></summary>

### 59. Search in Rotated Sorted Array
- [ ] **Problem**: Search for target in rotated sorted array.
- **Time**: O(log n) | **Space**: O(1)
- **Topics**: Array, Binary Search
- **Link**: LeetCode #33

### 60. Find Minimum in Rotated Sorted Array
- [ ] **Problem**: Find minimum element in rotated sorted array.
- **Time**: O(log n) | **Space**: O(1)
- **Topics**: Array, Binary Search
- **Link**: LeetCode #153

### 61. Time Based Key-Value Store
- [ ] **Problem**: Design time-based key-value data structure.
- **Time**: O(log n) | **Space**: O(n)
- **Topics**: Hash Table, String, Binary Search, Design
- **Link**: LeetCode #981

### 62. Koko Eating Bananas
- [ ] **Problem**: Find minimum eating speed to eat all bananas in h hours.
- **Time**: O(n log m) | **Space**: O(1)
- **Topics**: Array, Binary Search
- **Link**: LeetCode #875

### 63. Find Peak Element
- [ ] **Problem**: Find a peak element in array.
- **Time**: O(log n) | **Space**: O(1)
- **Topics**: Array, Binary Search
- **Link**: LeetCode #162

</details>

<details>
<summary><b>Hard (1 problem)</b></summary>

### 64. Median of Two Sorted Arrays
- [ ] **Problem**: Find median of two sorted arrays.
- **Time**: O(log(min(m,n))) | **Space**: O(1)
- **Topics**: Array, Binary Search, Divide and Conquer
- **Link**: LeetCode #4

</details>

---

## 6. Linked List

<details>
<summary><b>Easy (5 problems)</b></summary>

### 65. Reverse Linked List
- [ ] **Problem**: Reverse a singly linked list.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Linked List, Recursion
- **Link**: LeetCode #206

### 66. Merge Two Sorted Lists
- [ ] **Problem**: Merge two sorted linked lists into one sorted list.
- **Time**: O(m + n) | **Space**: O(1)
- **Topics**: Linked List, Recursion
- **Link**: LeetCode #21

### 67. Linked List Cycle
- [ ] **Problem**: Determine if linked list has a cycle.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Hash Table, Linked List, Two Pointers
- **Link**: LeetCode #141

### 68. Middle of the Linked List
- [ ] **Problem**: Find middle node of linked list.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Linked List, Two Pointers
- **Link**: LeetCode #876

### 69. Palindrome Linked List
- [ ] **Problem**: Check if linked list is a palindrome.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Linked List, Two Pointers, Stack
- **Link**: LeetCode #234

</details>

<details>
<summary><b>Medium (5 problems)</b></summary>

### 70. Reorder List
- [ ] **Problem**: Reorder list to L0→Ln→L1→Ln-1→L2→Ln-2→...
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Linked List, Two Pointers, Stack
- **Link**: LeetCode #143

### 71. Remove Nth Node From End of List
- [ ] **Problem**: Remove nth node from end of list.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Linked List, Two Pointers
- **Link**: LeetCode #19

### 72. Add Two Numbers
- [ ] **Problem**: Add two numbers represented by linked lists.
- **Time**: O(max(m,n)) | **Space**: O(max(m,n))
- **Topics**: Linked List, Math, Recursion
- **Link**: LeetCode #2

### 73. Copy List with Random Pointer
- [ ] **Problem**: Deep copy linked list with random pointer.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Hash Table, Linked List
- **Link**: LeetCode #138

### 74. LRU Cache
- [ ] **Problem**: Design LRU (Least Recently Used) cache.
- **Time**: O(1) | **Space**: O(capacity)
- **Topics**: Hash Table, Linked List, Design
- **Link**: LeetCode #146

</details>

<details>
<summary><b>Hard (2 problems)</b></summary>

### 75. Merge k Sorted Lists
- [ ] **Problem**: Merge k sorted linked lists into one sorted list.
- **Time**: O(n log k) | **Space**: O(k)
- **Topics**: Linked List, Divide and Conquer, Heap, Merge Sort
- **Link**: LeetCode #23

### 76. Reverse Nodes in k-Group
- [ ] **Problem**: Reverse nodes of linked list k at a time.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Linked List, Recursion
- **Link**: LeetCode #25

</details>

---

## 7. Trees

<details>
<summary><b>Easy (7 problems)</b></summary>

### 77. Invert Binary Tree
- [ ] **Problem**: Invert a binary tree.
- **Time**: O(n) | **Space**: O(h)
- **Topics**: Tree, Depth-First Search, Breadth-First Search
- **Link**: LeetCode #226

### 78. Maximum Depth of Binary Tree
- [ ] **Problem**: Find maximum depth of binary tree.
- **Time**: O(n) | **Space**: O(h)
- **Topics**: Tree, Depth-First Search, Breadth-First Search
- **Link**: LeetCode #104

### 79. Same Tree
- [ ] **Problem**: Check if two binary trees are identical.
- **Time**: O(n) | **Space**: O(h)
- **Topics**: Tree, Depth-First Search, Breadth-First Search
- **Link**: LeetCode #100

### 80. Subtree of Another Tree
- [ ] **Problem**: Check if one tree is a subtree of another.
- **Time**: O(m × n) | **Space**: O(h)
- **Topics**: Tree, Depth-First Search, String Matching
- **Link**: LeetCode #572

### 81. Balanced Binary Tree
- [ ] **Problem**: Check if binary tree is height-balanced.
- **Time**: O(n) | **Space**: O(h)
- **Topics**: Tree, Depth-First Search
- **Link**: LeetCode #110

### 82. Diameter of Binary Tree
- [ ] **Problem**: Find diameter of binary tree (longest path between any two nodes).
- **Time**: O(n) | **Space**: O(h)
- **Topics**: Tree, Depth-First Search
- **Link**: LeetCode #543

### 83. Merge Two Binary Trees
- [ ] **Problem**: Merge two binary trees by overlapping nodes.
- **Time**: O(n) | **Space**: O(h)
- **Topics**: Tree, Depth-First Search, Breadth-First Search
- **Link**: LeetCode #617

</details>

<details>
<summary><b>Medium (9 problems)</b></summary>

### 84. Binary Tree Level Order Traversal
- [ ] **Problem**: Return level order traversal of tree nodes.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Tree, Breadth-First Search
- **Link**: LeetCode #102

### 85. Binary Tree Right Side View
- [ ] **Problem**: Return values of nodes visible from right side.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Tree, Depth-First Search, Breadth-First Search
- **Link**: LeetCode #199

### 86. Validate Binary Search Tree
- [ ] **Problem**: Check if tree is a valid BST.
- **Time**: O(n) | **Space**: O(h)
- **Topics**: Tree, Depth-First Search, Binary Search Tree
- **Link**: LeetCode #98

### 87. Kth Smallest Element in BST
- [ ] **Problem**: Find kth smallest element in BST.
- **Time**: O(n) | **Space**: O(h)
- **Topics**: Tree, Depth-First Search, Binary Search Tree
- **Link**: LeetCode #230

### 88. Construct Binary Tree from Preorder and Inorder
- [ ] **Problem**: Build tree from preorder and inorder traversal arrays.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Array, Hash Table, Tree, Divide and Conquer
- **Link**: LeetCode #105

### 89. Lowest Common Ancestor of BST
- [ ] **Problem**: Find LCA of two nodes in BST.
- **Time**: O(h) | **Space**: O(1)
- **Topics**: Tree, Depth-First Search, Binary Search Tree
- **Link**: LeetCode #235

### 90. Lowest Common Ancestor of Binary Tree
- [ ] **Problem**: Find LCA of two nodes in binary tree.
- **Time**: O(n) | **Space**: O(h)
- **Topics**: Tree, Depth-First Search
- **Link**: LeetCode #236

### 91. Binary Tree Zigzag Level Order Traversal
- [ ] **Problem**: Return zigzag level order traversal.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Tree, Breadth-First Search
- **Link**: LeetCode #103

### 92. Path Sum III
- [ ] **Problem**: Count paths that sum to target value.
- **Time**: O(n²) | **Space**: O(h)
- **Topics**: Tree, Depth-First Search
- **Link**: LeetCode #437

</details>

<details>
<summary><b>Hard (2 problems)</b></summary>

### 93. Serialize and Deserialize Binary Tree
- [ ] **Problem**: Design algorithm to serialize/deserialize binary tree.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: String, Tree, Depth-First Search, Design
- **Link**: LeetCode #297

### 94. Binary Tree Maximum Path Sum
- [ ] **Problem**: Find maximum path sum in binary tree.
- **Time**: O(n) | **Space**: O(h)
- **Topics**: Dynamic Programming, Tree, Depth-First Search
- **Link**: LeetCode #124

</details>

---

## 8. Tries

<details>
<summary><b>Medium (4 problems)</b></summary>

### 95. Implement Trie (Prefix Tree)
- [ ] **Problem**: Implement trie with insert, search, and startsWith methods.
- **Time**: O(m) | **Space**: O(n × m)
- **Topics**: Hash Table, String, Design, Trie
- **Link**: LeetCode #208

### 96. Design Add and Search Words Data Structure
- [ ] **Problem**: Design data structure supporting adding words and searching with wildcards.
- **Time**: O(m) | **Space**: O(n × m)
- **Topics**: String, Depth-First Search, Design, Trie
- **Link**: LeetCode #211

### 97. Word Search II
- [ ] **Problem**: Find all words from dictionary that exist in board.
- **Time**: O(m × n × 4³ˡ) | **Space**: O(l)
- **Topics**: Array, String, Backtracking, Trie
- **Link**: LeetCode #212

### 98. Longest Common Prefix
- [ ] **Problem**: Find longest common prefix among array of strings.
- **Time**: O(S) | **Space**: O(1)
- **Topics**: String, Trie
- **Link**: LeetCode #14

</details>

---

## 9. Heap / Priority Queue

<details>
<summary><b>Easy (2 problems)</b></summary>

### 99. Kth Largest Element in Stream
- [ ] **Problem**: Design class to find kth largest element in stream.
- **Time**: O(log k) | **Space**: O(k)
- **Topics**: Tree, Design, Binary Search Tree, Heap
- **Link**: LeetCode #703

### 100. Last Stone Weight
- [ ] **Problem**: Find weight of last remaining stone after smashing.
- **Time**: O(n log n) | **Space**: O(n)
- **Topics**: Array, Heap
- **Link**: LeetCode #1046

</details>

<details>
<summary><b>Medium (4 problems)</b></summary>

### 101. Kth Largest Element in Array
- [ ] **Problem**: Find kth largest element in unsorted array.
- **Time**: O(n) average | **Space**: O(1)
- **Topics**: Array, Divide and Conquer, Sorting, Heap, Quickselect
- **Link**: LeetCode #215

### 102. K Closest Points to Origin
- [ ] **Problem**: Find k closest points to origin (0, 0).
- **Time**: O(n log k) | **Space**: O(k)
- **Topics**: Array, Math, Divide and Conquer, Sorting, Heap
- **Link**: LeetCode #973

### 103. Task Scheduler
- [ ] **Problem**: Find minimum intervals required to execute all tasks.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Hash Table, Greedy, Sorting, Heap
- **Link**: LeetCode #621

### 104. Top K Frequent Words
- [ ] **Problem**: Return k most frequent words sorted by frequency.
- **Time**: O(n log k) | **Space**: O(n)
- **Topics**: Hash Table, String, Trie, Sorting, Heap
- **Link**: LeetCode #692

</details>

<details>
<summary><b>Hard (2 problems)</b></summary>

### 105. Find Median from Data Stream
- [ ] **Problem**: Design data structure to find median from stream.
- **Time**: O(log n) | **Space**: O(n)
- **Topics**: Two Pointers, Design, Sorting, Heap
- **Link**: LeetCode #295

### 106. Merge k Sorted Lists
- [ ] **Problem**: Merge k sorted linked lists.
- **Time**: O(n log k) | **Space**: O(k)
- **Topics**: Linked List, Divide and Conquer, Heap, Merge Sort
- **Link**: LeetCode #23

</details>

---

## 10. Backtracking

<details>
<summary><b>Medium (8 problems)</b></summary>

### 107. Subsets
- [ ] **Problem**: Return all possible subsets (power set).
- **Time**: O(2ⁿ) | **Space**: O(n)
- **Topics**: Array, Backtracking, Bit Manipulation
- **Link**: LeetCode #78

### 108. Subsets II
- [ ] **Problem**: Return all possible subsets (with duplicates in input).
- **Time**: O(2ⁿ) | **Space**: O(n)
- **Topics**: Array, Backtracking
- **Link**: LeetCode #90

### 109. Permutations
- [ ] **Problem**: Return all possible permutations.
- **Time**: O(n!) | **Space**: O(n)
- **Topics**: Array, Backtracking
- **Link**: LeetCode #46

### 110. Permutations II
- [ ] **Problem**: Return all unique permutations (with duplicates in input).
- **Time**: O(n!) | **Space**: O(n)
- **Topics**: Array, Backtracking
- **Link**: LeetCode #47

### 111. Combination Sum
- [ ] **Problem**: Find all unique combinations that sum to target.
- **Time**: O(2ⁿ) | **Space**: O(target/min)
- **Topics**: Array, Backtracking
- **Link**: LeetCode #39

### 112. Combination Sum II
- [ ] **Problem**: Find all unique combinations that sum to target (use each number once).
- **Time**: O(2ⁿ) | **Space**: O(n)
- **Topics**: Array, Backtracking
- **Link**: LeetCode #40

### 113. Word Search
- [ ] **Problem**: Check if word exists in grid.
- **Time**: O(m × n × 4ˡ) | **Space**: O(l)
- **Topics**: Array, Backtracking, Matrix
- **Link**: LeetCode #79

### 114. Palindrome Partitioning
- [ ] **Problem**: Partition string such that every substring is a palindrome.
- **Time**: O(n × 2ⁿ) | **Space**: O(n)
- **Topics**: String, Dynamic Programming, Backtracking
- **Link**: LeetCode #131

</details>

<details>
<summary><b>Hard (2 problems)</b></summary>

### 115. N-Queens
- [ ] **Problem**: Place n queens on n×n chessboard so no two attack each other.
- **Time**: O(n!) | **Space**: O(n²)
- **Topics**: Array, Backtracking
- **Link**: LeetCode #51

### 116. Word Search II
- [ ] **Problem**: Find all words from dictionary in board.
- **Time**: O(m × n × 4³ˡ) | **Space**: O(l)
- **Topics**: Array, String, Backtracking, Trie
- **Link**: LeetCode #212

</details>

---

## 11. Graphs

<details>
<summary><b>Medium (9 problems)</b></summary>

### 117. Number of Islands
- [ ] **Problem**: Count number of islands in 2D grid.
- **Time**: O(m × n) | **Space**: O(m × n)
- **Topics**: Array, Depth-First Search, Breadth-First Search, Union Find
- **Link**: LeetCode #200

### 118. Clone Graph
- [ ] **Problem**: Return deep copy of graph.
- **Time**: O(V + E) | **Space**: O(V)
- **Topics**: Hash Table, Depth-First Search, Breadth-First Search, Graph
- **Link**: LeetCode #133

### 119. Max Area of Island
- [ ] **Problem**: Find maximum area of island in grid.
- **Time**: O(m × n) | **Space**: O(m × n)
- **Topics**: Array, Depth-First Search, Breadth-First Search, Union Find
- **Link**: LeetCode #695

### 120. Pacific Atlantic Water Flow
- [ ] **Problem**: Find cells where water can flow to both oceans.
- **Time**: O(m × n) | **Space**: O(m × n)
- **Topics**: Array, Depth-First Search, Breadth-First Search, Matrix
- **Link**: LeetCode #417

### 121. Surrounded Regions
- [ ] **Problem**: Capture all regions surrounded by 'X'.
- **Time**: O(m × n) | **Space**: O(m × n)
- **Topics**: Array, Depth-First Search, Breadth-First Search, Union Find
- **Link**: LeetCode #130

### 122. Rotting Oranges
- [ ] **Problem**: Find minimum time to rot all oranges.
- **Time**: O(m × n) | **Space**: O(m × n)
- **Topics**: Array, Breadth-First Search, Matrix
- **Link**: LeetCode #994

### 123. Course Schedule
- [ ] **Problem**: Check if you can finish all courses given prerequisites.
- **Time**: O(V + E) | **Space**: O(V + E)
- **Topics**: Depth-First Search, Breadth-First Search, Graph, Topological Sort
- **Link**: LeetCode #207

### 124. Course Schedule II
- [ ] **Problem**: Return ordering of courses to finish all courses.
- **Time**: O(V + E) | **Space**: O(V + E)
- **Topics**: Depth-First Search, Breadth-First Search, Graph, Topological Sort
- **Link**: LeetCode #210

### 125. Number of Connected Components
- [ ] **Problem**: Find number of connected components in undirected graph.
- **Time**: O(V + E) | **Space**: O(V + E)
- **Topics**: Depth-First Search, Breadth-First Search, Union Find, Graph
- **Link**: LeetCode #323 (Premium)

</details>

<details>
<summary><b>Hard (3 problems)</b></summary>

### 126. Word Ladder
- [ ] **Problem**: Find shortest transformation sequence from begin to end word.
- **Time**: O(m² × n) | **Space**: O(m² × n)
- **Topics**: Hash Table, String, Breadth-First Search
- **Link**: LeetCode #127

### 127. Alien Dictionary
- [ ] **Problem**: Find order of characters in alien language.
- **Time**: O(C) | **Space**: O(1)
- **Topics**: Array, String, Depth-First Search, Graph, Topological Sort
- **Link**: LeetCode #269 (Premium)

### 128. Minimum Number of Days to Disconnect Island
- [ ] **Problem**: Find minimum days to disconnect island.
- **Time**: O((m × n)²) | **Space**: O(m × n)
- **Topics**: Array, Depth-First Search, Breadth-First Search, Matrix
- **Link**: LeetCode #1568

</details>

---

## 12. Dynamic Programming

<details>
<summary><b>Easy (4 problems)</b></summary>

### 129. Climbing Stairs
- [ ] **Problem**: Find number of ways to climb n stairs (1 or 2 steps at a time).
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Math, Dynamic Programming, Memoization
- **Link**: LeetCode #70

### 130. Min Cost Climbing Stairs
- [ ] **Problem**: Find minimum cost to reach top of stairs.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Dynamic Programming
- **Link**: LeetCode #746

### 131. House Robber
- [ ] **Problem**: Find maximum money you can rob without robbing adjacent houses.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Dynamic Programming
- **Link**: LeetCode #198

### 132. Pascal's Triangle
- [ ] **Problem**: Generate first numRows of Pascal's triangle.
- **Time**: O(n²) | **Space**: O(n²)
- **Topics**: Array, Dynamic Programming
- **Link**: LeetCode #118

</details>

<details>
<summary><b>Medium (10 problems)</b></summary>

### 133. House Robber II
- [x] **Problem**: Houses are arranged in circle, rob maximum money.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Dynamic Programming
- **Link**: LeetCode #213

### 134. Longest Palindromic Substring
- [ ] **Problem**: Find longest palindromic substring.
- **Time**: O(n²) | **Space**: O(1)
- **Topics**: String, Dynamic Programming
- **Link**: LeetCode #5

### 135. Palindromic Substrings
- [ ] **Problem**: Count how many palindromic substrings exist.
- **Time**: O(n²) | **Space**: O(1)
- **Topics**: String, Dynamic Programming
- **Link**: LeetCode #647

### 136. Decode Ways
- [ ] **Problem**: Count ways to decode encoded message.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: String, Dynamic Programming
- **Link**: LeetCode #91

### 137. Coin Change
- [ ] **Problem**: Find minimum number of coins to make up amount.
- **Time**: O(amount × n) | **Space**: O(amount)
- **Topics**: Array, Dynamic Programming, Breadth-First Search
- **Link**: LeetCode #322

### 138. Maximum Product Subarray
- [ ] **Problem**: Find contiguous subarray with largest product.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Dynamic Programming
- **Link**: LeetCode #152

### 139. Word Break
- [ ] **Problem**: Check if string can be segmented into words from dictionary.
- **Time**: O(n² × m) | **Space**: O(n)
- **Topics**: Hash Table, String, Dynamic Programming, Trie
- **Link**: LeetCode #139

### 140. Longest Increasing Subsequence
- [ ] **Problem**: Find length of longest strictly increasing subsequence.
- **Time**: O(n log n) | **Space**: O(n)
- **Topics**: Array, Binary Search, Dynamic Programming
- **Link**: LeetCode #300

### 141. Partition Equal Subset Sum
- [ ] **Problem**: Check if array can be partitioned into two equal sum subsets.
- **Time**: O(n × sum) | **Space**: O(sum)
- **Topics**: Array, Dynamic Programming
- **Link**: LeetCode #416

### 142. Unique Paths
- [ ] **Problem**: Count unique paths from top-left to bottom-right in grid.
- **Time**: O(m × n) | **Space**: O(n)
- **Topics**: Math, Dynamic Programming, Combinatorics
- **Link**: LeetCode #62

</details>

<details>
<summary><b>Hard (4 problems)</b></summary>

### 143. Longest Common Subsequence
- [ ] **Problem**: Find length of longest common subsequence.
- **Time**: O(m × n) | **Space**: O(min(m,n))
- **Topics**: String, Dynamic Programming
- **Link**: LeetCode #1143

### 144. Edit Distance
- [ ] **Problem**: Find minimum operations to convert word1 to word2.
- **Time**: O(m × n) | **Space**: O(m × n)
- **Topics**: String, Dynamic Programming
- **Link**: LeetCode #72

### 145. Regular Expression Matching
- [ ] **Problem**: Implement regex matching with '.' and '*'.
- **Time**: O(m × n) | **Space**: O(m × n)
- **Topics**: String, Dynamic Programming, Recursion
- **Link**: LeetCode #10

### 146. Burst Balloons
- [ ] **Problem**: Find maximum coins you can collect by bursting balloons.
- **Time**: O(n³) | **Space**: O(n²)
- **Topics**: Array, Dynamic Programming
- **Link**: LeetCode #312

</details>

---

## 13. Greedy

<details>
<summary><b>Easy (2 problems)</b></summary>

### 147. Best Time to Buy and Sell Stock II
- [ ] **Problem**: Find maximum profit with multiple transactions.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Dynamic Programming, Greedy
- **Link**: LeetCode #122

### 148. Assign Cookies
- [ ] **Problem**: Maximize number of content children with cookies.
- **Time**: O(n log n) | **Space**: O(1)
- **Topics**: Array, Two Pointers, Greedy, Sorting
- **Link**: LeetCode #455

</details>

<details>
<summary><b>Medium (5 problems)</b></summary>

### 149. Jump Game
- [ ] **Problem**: Check if you can reach last index.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Dynamic Programming, Greedy
- **Link**: LeetCode #55

### 150. Jump Game II
- [ ] **Problem**: Find minimum jumps to reach last index.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Dynamic Programming, Greedy
- **Link**: LeetCode #45

### 151. Gas Station
- [ ] **Problem**: Find starting gas station index to complete circuit.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Greedy
- **Link**: LeetCode #134

### 152. Hand of Straights
- [ ] **Problem**: Check if hand can be rearranged into groups of groupSize.
- **Time**: O(n log n) | **Space**: O(n)
- **Topics**: Array, Hash Table, Greedy, Sorting
- **Link**: LeetCode #846

### 153. Merge Triplets to Form Target Triplet
- [ ] **Problem**: Check if target triplet can be formed by merging.
- **Time**: O(n) | **Space**: O(1)
- **Topics**: Array, Greedy
- **Link**: LeetCode #1899

</details>

<details>
<summary><b>Hard (1 problem)</b></summary>

### 154. Candy
- [ ] **Problem**: Distribute minimum candies to children with ratings.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Array, Greedy
- **Link**: LeetCode #135

</details>

---

## 14. Intervals

<details>
<summary><b>Medium (6 problems)</b></summary>

### 155. Insert Interval
- [ ] **Problem**: Insert new interval and merge if necessary.
- **Time**: O(n) | **Space**: O(n)
- **Topics**: Array
- **Link**: LeetCode #57

### 156. Merge Intervals
- [ ] **Problem**: Merge all overlapping intervals.
- **Time**: O(n log n) | **Space**: O(n)
- **Topics**: Array, Sorting
- **Link**: LeetCode #56

### 157. Non-overlapping Intervals
- [ ] **Problem**: Find minimum intervals to remove to make rest non-overlapping.
- **Time**: O(n log n) | **Space**: O(1)
- **Topics**: Array, Dynamic Programming, Greedy, Sorting
- **Link**: LeetCode #435

### 158. Meeting Rooms
- [ ] **Problem**: Check if person can attend all meetings.
- **Time**: O(n log n) | **Space**: O(1)
- **Topics**: Array, Sorting
- **Link**: LeetCode #252 (Premium)

### 159. Meeting Rooms II
- [ ] **Problem**: Find minimum number of conference rooms required.
- **Time**: O(n log n) | **Space**: O(n)
- **Topics**: Array, Two Pointers, Greedy, Sorting, Heap
- **Link**: LeetCode #253 (Premium)

### 160. Minimum Interval to Include Each Query
- [ ] **Problem**: Find minimum interval size that includes each query.
- **Time**: O(n log n + q log q) | **Space**: O(n + q)
- **Topics**: Array, Binary Search, Sorting, Heap
- **Link**: LeetCode #1851

</details>

---

## 🎯 Study Plan Suggestions

### Week 1-2: Foundations
- [ ] Array & Hashing (Easy + Medium)
- [ ] Two Pointers (Easy + Medium)
- [ ] Sliding Window (Easy + Medium)

### Week 3-4: Data Structures
- [ ] Stack (Easy + Medium)
- [ ] Linked List (Easy + Medium)
- [ ] Binary Search (Easy + Medium)

### Week 5-6: Trees & Graphs
- [ ] Trees (Easy + Medium)
- [ ] Tries (All)
- [ ] Graphs (Medium)

### Week 7-8: Advanced
- [ ] Dynamic Programming (Easy + Medium)
- [ ] Backtracking (Medium)
- [ ] Heap (Easy + Medium)
- [ ] Greedy (All)
- [ ] Intervals (All)

### Week 9-10: Hard Problems
- [ ] Complete all Hard problems
- [ ] Review weak areas
- [ ] Mock interviews

---

## 📈 Progress Tracking Tips

1. **Daily Goal**: Aim for 3-5 problems per day
2. **Weekly Review**: Revisit problems from previous weeks
3. **Pattern Recognition**: Focus on understanding patterns, not memorizing solutions
4. **Time Boxing**: Spend max 30-45 minutes per problem before checking solution
5. **Multiple Attempts**: Retry problems after 1 week, 2 weeks, and 1 month

---

## 🔑 Key Strategies

### Problem-Solving Framework
1. **Understand** - Read problem carefully, identify inputs/outputs
2. **Examples** - Work through 2-3 examples manually
3. **Approach** - Discuss brute force, then optimize
4. **Code** - Implement clean, readable solution
5. **Test** - Test edge cases
6. **Optimize** - Analyze time/space complexity, optimize if needed

### Common Patterns
- **Frequency Counter**: Use hash map to count occurrences
- **Multiple Pointers**: Use 2+ pointers to solve in O(n)
- **Sliding Window**: Track subset of data in larger dataset
- **Divide & Conquer**: Break problem into subproblems
- **Dynamic Programming**: Break into overlapping subproblems

---

## 📝 Notes Section

**Company-Specific Notes:**
- Google: Focus on arrays, strings, trees, graphs, and system design
- Amazon: Focus on arrays, trees, graphs, and leadership principles
- Microsoft: Focus on arrays, strings, linked lists, and recursion
- Facebook/Meta: Focus on trees, graphs, dynamic programming
- Apple: Focus on linked lists, trees, and design patterns

**Personal Weak Areas:**
- [ ] ___________________________
- [ ] ___________________________
- [ ] ___________________________

**Problems to Revisit:**
- [ ] ___________________________
- [ ] ___________________________
- [ ] ___________________________

---

**🎉 Good luck with your interview preparation!**

*Last Updated: 2024*


