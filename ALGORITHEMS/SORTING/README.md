# 🔢 Sorting Algorithms - Complete Guide (JavaScript)

Welcome to the **complete guide** on Sorting Algorithms! This repository contains detailed explanations, implementations, and examples of all major sorting algorithms in JavaScript.

## 📚 Table of Contents

### Basic Sorting Algorithms ⭐

1. **[Basic Sorts - Bubble, Selection, Insertion](./01_Basic_Sorts.md)**
   - Simple, intuitive sorting techniques
   - Time: O(n²) | Space: O(1)
   - Best for learning and small datasets

### Efficient Sorting Algorithms ⭐⭐

2. **[Efficient Sorts - Merge, Quick, Heap](./02_Efficient_Sorts.md)**
   - Production-grade sorting algorithms
   - Time: O(n log n) | Space varies
   - Best for large datasets

### Specialized Sorting Algorithms ⭐⭐⭐

3. **[Non-Comparison Sorts - Counting, Radix, Bucket](./03_Specialized_Sorts.md)** *(Coming Soon)*
   - Linear time sorting for specific cases
   - Time: O(n) | Space: O(n+k)
   - Best for integers or specific ranges

### 📊 **[Complete Comparison & Summary](./00_Complete_Comparison.md)** *(Coming Soon)*
   - Side-by-side algorithm comparison
   - Decision tree for algorithm selection
   - Time/space complexity table
   - Quick reference templates

---

## 🚀 Quick Start Guide

### For Complete Beginners:
1. Start with [Basic Sorts](./01_Basic_Sorts.md)
   - Bubble Sort - easiest to understand
   - Selection Sort - minimizes swaps
   - Insertion Sort - best for small/nearly sorted arrays
2. Practice 5-10 easy problems
3. Understand why O(n²) is slow

### For Intermediate:
1. Master [Efficient Sorts](./02_Efficient_Sorts.md)
   - Merge Sort - guaranteed O(n log n)
   - Quick Sort - fastest average case
   - Heap Sort - O(1) space
2. Understand divide-and-conquer
3. Practice 10-15 medium problems

### For Advanced:
1. Study specialized sorts
2. Understand when to use each algorithm
3. Learn hybrid algorithms (IntroSort, TimSort)
4. Practice hard problems

---

## 📈 Complexity Quick Reference

| Algorithm | Best | Average | Worst | Space | Stable? | Best For |
|-----------|------|---------|-------|-------|---------|----------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ | Teaching, nearly sorted |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | ❌ | Minimizing swaps |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ | Small/nearly sorted |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ | Guaranteed speed, linked lists |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ | General purpose, fast |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ | Memory constrained |
| **Counting Sort** | O(n+k) | O(n+k) | O(n+k) | O(k) | ✅ | Small range integers |
| **Radix Sort** | O(d·n) | O(d·n) | O(d·n) | O(n+k) | ✅ | Fixed-length integers |
| **Bucket Sort** | O(n+k) | O(n+k) | O(n²) | O(n+k) | ✅ | Uniform distribution |

**Legend**: n = array size, k = range, d = digits, h = height

---

## 🎯 Quick Algorithm Selection Guide

```
What's your input size?
├─ Small (< 50 elements)
│  ├─ Nearly sorted? → Insertion Sort
│  ├─ Teaching/learning? → Bubble Sort
│  └─ Minimize swaps? → Selection Sort
│
├─ Medium to Large (50+)
│  ├─ Need stability? → Merge Sort
│  ├─ Need guaranteed O(n log n)? → Merge Sort or Heap Sort
│  ├─ Memory limited? → Heap Sort or Quick Sort
│  └─ General purpose? → Quick Sort
│
└─ Special cases
   ├─ Integers in small range? → Counting Sort
   ├─ Fixed-length integers? → Radix Sort
   └─ Uniformly distributed? → Bucket Sort
```

---

## 🔍 When to Use Which Algorithm

### Bubble Sort
- ✅ Teaching/learning sorting concepts
- ✅ Array is nearly sorted
- ✅ Need simple, stable sort
- ❌ Production code
- ❌ Large datasets

### Selection Sort
- ✅ Minimizing number of writes
- ✅ Small dataset
- ✅ Simple implementation
- ❌ Need stability
- ❌ Large datasets

### Insertion Sort
- ✅ **Nearly sorted data** (Best choice!)
- ✅ Small datasets (< 50 elements)
- ✅ Online sorting (data arrives gradually)
- ✅ Part of hybrid algorithms
- ❌ Large random datasets

### Merge Sort
- ✅ **Guaranteed O(n log n)**
- ✅ **Need stability**
- ✅ External sorting (large files)
- ✅ Linked lists
- ✅ Parallel processing
- ❌ Memory constrained

### Quick Sort
- ✅ **General purpose** (Most common choice!)
- ✅ Fast average case
- ✅ In-place sorting
- ✅ Good cache performance
- ❌ Need worst-case guarantee
- ❌ Need stability

### Heap Sort
- ✅ **Guaranteed O(n log n) + O(1) space**
- ✅ Priority queue operations
- ✅ Finding top K elements
- ✅ Memory severely limited
- ❌ Need stability
- ❌ Cache performance matters

### Counting Sort
- ✅ **Integers in small range**
- ✅ Need linear time
- ✅ Need stability
- ❌ Large range
- ❌ Non-integer data

### Radix Sort
- ✅ **Fixed-length integers/strings**
- ✅ Large numbers of elements
- ✅ Need linear time
- ❌ Variable-length data
- ❌ Non-integer data

### Bucket Sort
- ✅ **Uniformly distributed data**
- ✅ Floating-point numbers
- ✅ Need linear time
- ❌ Skewed distribution
- ❌ Unknown distribution

---

## 💡 Top LeetCode Problems by Algorithm

### Basic Sorts:
- 75: Sort Colors (Easy/Medium)
- 283: Move Zeroes (Easy)
- 88: Merge Sorted Array (Easy)
- 147: Insertion Sort List (Medium)

### Merge Sort:
- 912: Sort an Array (Medium)
- 148: Sort List (Medium)
- 23: Merge K Sorted Lists (Hard)
- 315: Count of Smaller Numbers After Self (Hard)

### Quick Sort:
- 912: Sort an Array (Medium)
- 215: Kth Largest Element (Medium)
- 347: Top K Frequent Elements (Medium)
- 973: K Closest Points to Origin (Medium)

### Heap Sort:
- 215: Kth Largest Element (Medium)
- 347: Top K Frequent Elements (Medium)
- 692: Top K Frequent Words (Medium)

### Counting/Radix/Bucket:
- 164: Maximum Gap (Hard)
- 274: H-Index (Medium)
- 451: Sort Characters By Frequency (Medium)

---

## 🎓 Learning Path

### Week 1: Basics (Start Here!)
**Goal**: Understand sorting fundamentals

- ✅ Study Bubble Sort (2 days)
  - Understand comparison and swap
  - Implement from scratch
  - Solve 3-5 easy problems

- ✅ Study Selection Sort (1 day)
  - Compare with Bubble Sort
  - Understand minimum swaps

- ✅ Study Insertion Sort (2 days)
  - Most important basic sort
  - Understand adaptive behavior
  - Solve 3-5 easy problems

**Practice**: 10-15 easy sorting problems

---

### Week 2: Efficient Algorithms
**Goal**: Master O(n log n) sorting

- ✅ Study Merge Sort (3 days)
  - Understand divide and conquer
  - Implement recursively
  - Understand stability
  - Solve 5-7 medium problems

- ✅ Study Quick Sort (3 days)
  - Understand partitioning
  - Compare partition schemes
  - Understand randomization
  - Solve 5-7 medium problems

- ✅ Study Heap Sort (1 day)
  - Understand heap data structure
  - Compare with other sorts

**Practice**: 15-20 medium problems

---

### Week 3: Specialized & Advanced
**Goal**: Linear time sorting & optimization

- ✅ Study Counting Sort (1 day)
- ✅ Study Radix Sort (1 day)
- ✅ Study Bucket Sort (1 day)
- ✅ Hybrid algorithms (IntroSort, TimSort) (2 days)
- ✅ Practice advanced problems (2 days)

**Practice**: 10-15 hard problems

---

## 📊 Algorithm Performance Characteristics

### Time Complexity Summary
```
O(n²) - Basic Sorts
├─ Bubble Sort
├─ Selection Sort
└─ Insertion Sort (but O(n) best case!)

O(n log n) - Efficient Sorts
├─ Merge Sort (always)
├─ Quick Sort (average)
└─ Heap Sort (always)

O(n) - Specialized Sorts
├─ Counting Sort
├─ Radix Sort
└─ Bucket Sort (average)
```

### Space Complexity Summary
```
O(1) - In-place
├─ Bubble Sort
├─ Selection Sort
├─ Insertion Sort
├─ Heap Sort
└─ Quick Sort (excluding recursion)

O(n) - Extra space
├─ Merge Sort
└─ Most specialized sorts

O(log n) - Recursion
└─ Quick Sort, Merge Sort (stack)
```

---

## 🔑 Key Concepts

### Stability
**Stable sorts** maintain relative order of equal elements:
- ✅ Stable: Bubble, Insertion, Merge
- ❌ Unstable: Selection, Quick, Heap

### In-place
**In-place sorts** use O(1) extra space:
- ✅ In-place: Bubble, Selection, Insertion, Quick, Heap
- ❌ Not in-place: Merge (O(n) space)

### Adaptive
**Adaptive sorts** perform better on partially sorted data:
- ✅ Adaptive: Insertion, Bubble (optimized)
- ❌ Non-adaptive: Selection, Merge, Heap

### Comparison-based
**Comparison sorts** compare elements:
- Bubble, Selection, Insertion, Merge, Quick, Heap
- **Theoretical lower bound**: Ω(n log n)

**Non-comparison sorts** don't compare:
- Counting, Radix, Bucket
- Can achieve O(n) time!

---

## 📖 How Each File is Structured

Every algorithm file follows this consistent structure:

1. **📚 Theory** - What is the algorithm?
2. **🎯 Intuition** - How to think about it?
3. **📝 Algorithm Steps** - Step-by-step process
4. **💻 Implementation** - Complete JavaScript code
5. **🔍 Example Walkthrough** - Detailed example
6. **⏱️ Time Complexity** - Big O analysis
7. **🎯 When to Use** - Use cases and anti-patterns
8. **🔑 Key Properties** - Important characteristics
9. **💡 Common Problem Patterns** - Practical examples
10. **🎓 Practice Problems** - LeetCode recommendations

---

## 📂 File Structure

```
SORTING_ALGORITHMS/
├── 00_Complete_Comparison.md          # Algorithm comparison guide
├── 01_Basic_Sorts.md                  # Bubble, Selection, Insertion
├── 02_Efficient_Sorts.md              # Merge, Quick, Heap
├── 03_Specialized_Sorts.md            # Counting, Radix, Bucket
└── README.md (this file)              # Complete guide
```

---

## 🎯 Pro Tips

1. **For interviews**: Master Quick Sort and Merge Sort
2. **For production**: Use built-in `Array.sort()` (usually IntroSort/TimSort)
3. **For small arrays**: Insertion Sort is surprisingly fast
4. **For nearly sorted**: Insertion Sort is the best choice
5. **For guaranteed time**: Merge Sort or Heap Sort
6. **For integers**: Consider Counting/Radix Sort
7. **Always consider**: Input size, memory, stability requirements

---

## 🔥 Common Interview Questions

### Conceptual:
- When to use Quick Sort vs Merge Sort?
- Why is Quick Sort O(n²) worst case?
- How to make sorting stable?
- What's the fastest possible comparison sort?

### Implementation:
- Implement Quick Sort with different partition schemes
- Sort an array of 0s, 1s, and 2s (Dutch National Flag)
- Find Kth largest element (Quick Select)
- Merge K sorted lists

### Optimization:
- Optimize Quick Sort for many duplicates
- Handle nearly sorted data efficiently
- Sort with limited memory
- Sort external data (files)

---

## 🚀 Next Steps

1. ⭐ **Start with [Basic Sorts](./01_Basic_Sorts.md)**
2. 📖 Master [Efficient Sorts](./02_Efficient_Sorts.md)
3. 🔬 Study specialized algorithms
4. 💪 Practice on LeetCode
5. 🧠 Understand trade-offs between algorithms

---

## 💡 Real-World Usage

### JavaScript's `Array.sort()`:
- V8 Engine (Chrome/Node.js): **TimSort**
- SpiderMonkey (Firefox): **Merge Sort**
- Both are **stable** as of ES2019

### Other Languages:
- **Python**: TimSort (hybrid Merge + Insertion)
- **Java**: Dual-Pivot Quick Sort (arrays), TimSort (objects)
- **C++ STL**: IntroSort (hybrid Quick + Heap + Insertion)
- **Go**: IntroSort variant

All modern implementations use **hybrid algorithms** combining multiple sorting techniques!

---

## 🎉 Happy Learning!

Sorting algorithms are fundamental to computer science. Master these and you'll:
- ✅ Understand algorithm design
- ✅ Ace technical interviews
- ✅ Optimize real-world applications
- ✅ Build strong CS foundations

**Remember**: The best algorithm depends on your specific use case!

---

**Created with ❤️ for students who want to truly understand sorting algorithms**

