
# Complete Linked List Data Structures & Algorithms Guide

## Table of Contents
1. [Linked List Fundamentals](#linked-list-fundamentals)
2. [Types of Linked Lists](#types-of-linked-lists)
3. [Singly Linked List Implementation](#singly-linked-list-implementation)
4. [Doubly Linked List Implementation](#doubly-linked-list-implementation)
5. [Circular Linked List](#circular-linked-list)
6. [Common Techniques & Patterns](#common-techniques--patterns)
7. [50 Linked List Problems with Solutions](#50-linked-list-problems-with-solutions)

---

## Linked List Fundamentals

### What is a Linked List?
A linked list is a linear data structure where elements are stored in nodes. Each node contains data and a reference (pointer) to the next node in the sequence.

**Key Characteristics:**
- Dynamic size (grows/shrinks at runtime)
- Non-contiguous memory allocation
- Efficient insertion/deletion at any position
- Sequential access (no random access)

### Linked List vs Array

| Feature | Array | Linked List |
|---------|-------|-------------|
| Memory | Contiguous | Non-contiguous |
| Size | Fixed (static) | Dynamic |
| Access | O(1) random access | O(n) sequential |
| Insert/Delete (beginning) | O(n) | O(1) |
| Insert/Delete (middle) | O(n) | O(1) with pointer |
| Memory overhead | None | Extra for pointers |
| Cache locality | Better | Worse |

### When to Use Linked Lists?

**Use Linked Lists when:**
- Frequent insertions/deletions
- Size is unknown or varies significantly
- No need for random access
- Implementing queues, stacks, graphs

**Avoid Linked Lists when:**
- Need random access frequently
- Memory is limited (pointer overhead)
- Cache performance is critical
- Need to access elements by index

---

## Types of Linked Lists

### 1. Singly Linked List
Each node points to the next node, last node points to null.

```
[Data|Next] -> [Data|Next] -> [Data|Next] -> null
```

### 2. Doubly Linked List
Each node has pointers to both next and previous nodes.

```
null <- [Prev|Data|Next] <-> [Prev|Data|Next] <-> [Prev|Data|Next] -> null
```

### 3. Circular Linked List
Last node points back to the first node.

```
[Data|Next] -> [Data|Next] -> [Data|Next] -|
     ^                                      |
     |______________________________________|
```

### 4. Circular Doubly Linked List
Doubly linked list where last node's next points to first, and first node's prev points to last.

---

## Singly Linked List Implementation

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    // Add node at the beginning - O(1)
    prepend(data) {
        const newNode = new Node(data);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        
        this.size++;
        return this;
    }
    
    // Add node at the end - O(1) with tail pointer
    append(data) {
        const newNode = new Node(data);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        
        this.size++;
        return this;
    }
    
    // Insert at specific position - O(n)
    insertAt(index, data) {
        if (index < 0 || index > this.size) {
            return false;
        }
        
        if (index === 0) {
            return this.prepend(data);
        }
        
        if (index === this.size) {
            return this.append(data);
        }
        
        const newNode = new Node(data);
        let current = this.head;
        let prev = null;
        let count = 0;
        
        while (count < index) {
            prev = current;
            current = current.next;
            count++;
        }
        
        newNode.next = current;
        prev.next = newNode;
        this.size++;
        
        return this;
    }
    
    // Remove from beginning - O(1)
    removeFirst() {
        if (!this.head) return null;
        
        const removed = this.head;
        this.head = this.head.next;
        
        if (!this.head) {
            this.tail = null;
        }
        
        this.size--;
        return removed.data;
    }
    
    // Remove from end - O(n)
    removeLast() {
        if (!this.head) return null;
        
        if (this.size === 1) {
            return this.removeFirst();
        }
        
        let current = this.head;
        let newTail = current;
        
        while (current.next) {
            newTail = current;
            current = current.next;
        }
        
        this.tail = newTail;
        this.tail.next = null;
        this.size--;
        
        return current.data;
    }
    
    // Remove at specific position - O(n)
    removeAt(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }
        
        if (index === 0) {
            return this.removeFirst();
        }
        
        let current = this.head;
        let prev = null;
        let count = 0;
        
        while (count < index) {
            prev = current;
            current = current.next;
            count++;
        }
        
        prev.next = current.next;
        
        if (index === this.size - 1) {
            this.tail = prev;
        }
        
        this.size--;
        return current.data;
    }
    
    // Get node at index - O(n)
    get(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }
        
        let current = this.head;
        let count = 0;
        
        while (count < index) {
            current = current.next;
            count++;
        }
        
        return current.data;
    }
    
    // Search for value - O(n)
    search(data) {
        let current = this.head;
        let index = 0;
        
        while (current) {
            if (current.data === data) {
                return index;
            }
            current = current.next;
            index++;
        }
        
        return -1;
    }
    
    // Reverse the list - O(n)
    reverse() {
        let current = this.head;
        let prev = null;
        let next = null;
        
        this.tail = this.head;
        
        while (current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        this.head = prev;
        return this;
    }
    
    // Convert to array - O(n)
    toArray() {
        const arr = [];
        let current = this.head;
        
        while (current) {
            arr.push(current.data);
            current = current.next;
        }
        
        return arr;
    }
    
    // Print list - O(n)
    print() {
        const arr = this.toArray();
        console.log(arr.join(' -> '));
    }
    
    // Clear list - O(1)
    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    // Check if empty - O(1)
    isEmpty() {
        return this.size === 0;
    }
}
```

---

## Doubly Linked List Implementation

```javascript
class DoublyNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    // Add at beginning - O(1)
    prepend(data) {
        const newNode = new DoublyNode(data);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        
        this.size++;
        return this;
    }
    
    // Add at end - O(1)
    append(data) {
        const newNode = new DoublyNode(data);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        
        this.size++;
        return this;
    }
    
    // Insert at position - O(n)
    insertAt(index, data) {
        if (index < 0 || index > this.size) {
            return false;
        }
        
        if (index === 0) {
            return this.prepend(data);
        }
        
        if (index === this.size) {
            return this.append(data);
        }
        
        const newNode = new DoublyNode(data);
        let current = this.head;
        let count = 0;
        
        while (count < index) {
            current = current.next;
            count++;
        }
        
        newNode.prev = current.prev;
        newNode.next = current;
        current.prev.next = newNode;
        current.prev = newNode;
        
        this.size++;
        return this;
    }
    
    // Remove from beginning - O(1)
    removeFirst() {
        if (!this.head) return null;
        
        const removed = this.head;
        
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        
        this.size--;
        return removed.data;
    }
    
    // Remove from end - O(1)
    removeLast() {
        if (!this.tail) return null;
        
        const removed = this.tail;
        
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        
        this.size--;
        return removed.data;
    }
    
    // Remove at position - O(n)
    removeAt(index) {
        if (index < 0 || index >= this.size) {
            return null;
        }
        
        if (index === 0) {
            return this.removeFirst();
        }
        
        if (index === this.size - 1) {
            return this.removeLast();
        }
        
        let current = this.head;
        let count = 0;
        
        while (count < index) {
            current = current.next;
            count++;
        }
        
        current.prev.next = current.next;
        current.next.prev = current.prev;
        
        this.size--;
        return current.data;
    }
    
    // Reverse - O(n)
    reverse() {
        let current = this.head;
        let temp = null;
        
        while (current) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }
        
        temp = this.head;
        this.head = this.tail;
        this.tail = temp;
        
        return this;
    }
    
    // Print forward - O(n)
    printForward() {
        const arr = [];
        let current = this.head;
        
        while (current) {
            arr.push(current.data);
            current = current.next;
        }
        
        console.log(arr.join(' <-> '));
    }
    
    // Print backward - O(n)
    printBackward() {
        const arr = [];
        let current = this.tail;
        
        while (current) {
            arr.push(current.data);
            current = current.prev;
        }
        
        console.log(arr.join(' <-> '));
    }
}
```

---

## Circular Linked List

```javascript
class CircularLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    // Add node - O(1)
    append(data) {
        const newNode = new Node(data);
        
        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head;
        } else {
            let current = this.head;
            
            while (current.next !== this.head) {
                current = current.next;
            }
            
            current.next = newNode;
            newNode.next = this.head;
        }
        
        this.size++;
        return this;
    }
    
    // Remove node - O(n)
    remove(data) {
        if (!this.head) return null;
        
        let current = this.head;
        let prev = null;
        
        // If head needs to be removed
        if (current.data === data) {
            if (this.size === 1) {
                this.head = null;
            } else {
                // Find last node
                while (current.next !== this.head) {
                    current = current.next;
                }
                current.next = this.head.next;
                this.head = this.head.next;
            }
            this.size--;
            return data;
        }
        
        // Search for node to remove
        do {
            prev = current;
            current = current.next;
            
            if (current.data === data) {
                prev.next = current.next;
                this.size--;
                return data;
            }
        } while (current !== this.head);
        
        return null;
    }
    
    // Print list - O(n)
    print() {
        if (!this.head) {
            console.log('Empty list');
            return;
        }
        
        const arr = [];
        let current = this.head;
        
        do {
            arr.push(current.data);
            current = current.next;
        } while (current !== this.head);
        
        console.log(arr.join(' -> ') + ' -> (back to head)');
    }
}
```

---

## Common Techniques & Patterns

### 1. Two Pointers Technique

Used for finding middle, detecting cycles, removing nth from end.

```javascript
// Find middle of linked list
function findMiddle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}
```

### 2. Floyd's Cycle Detection (Tortoise and Hare)

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

### 3. Dummy Node Pattern

Simplifies edge cases for head operations.

```javascript
function removeElements(head, val) {
    const dummy = new Node(0);
    dummy.next = head;
    let current = dummy;
    
    while (current.next) {
        if (current.next.data === val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return dummy.next;
}
```

### 4. Reverse in Groups

```javascript
function reverseKGroup(head, k) {
    let current = head;
    let count = 0;
    
    // Count k nodes
    while (current && count < k) {
        current = current.next;
        count++;
    }
    
    if (count < k) return head;
    
    // Reverse k nodes
    current = head;
    let prev = null;
    let next = null;
    count = 0;
    
    while (current && count < k) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
        count++;
    }
    
    if (next) {
        head.next = reverseKGroup(next, k);
    }
    
    return prev;
}
```

### 5. Merge Technique

```javascript
function mergeTwoLists(l1, l2) {
    const dummy = new Node(0);
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.data <= l2.data) {
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

---

## 50 Linked List Problems with Solutions

### Easy Problems (1-15)

#### Problem 1: Reverse Linked List

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}

// Recursive approach
function reverseListRecursive(head) {
    if (!head || !head.next) return head;
    
    const newHead = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;
    
    return newHead;
}
```

#### Problem 2: Middle of Linked List

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
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

#### Problem 3: Linked List Cycle

```javascript
/**
 * @param {ListNode} head
 * @return {boolean}
 */
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

#### Problem 4: Merge Two Sorted Lists

```javascript
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    current.next = list1 || list2;
    return dummy.next;
}

// Recursive approach
function mergeTwoListsRecursive(list1, list2) {
    if (!list1) return list2;
    if (!list2) return list1;
    
    if (list1.val <= list2.val) {
        list1.next = mergeTwoListsRecursive(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoListsRecursive(list1, list2.next);
        return list2;
    }
}
```

#### Problem 5: Remove Duplicates from Sorted List

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function deleteDuplicates(head) {
    let current = head;
    
    while (current && current.next) {
        if (current.val === current.next.val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return head;
}
```

#### Problem 6: Intersection of Two Linked Lists

```javascript
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
function getIntersectionNode(headA, headB) {
    if (!headA || !headB) return null;
    
    let pointerA = headA;
    let pointerB = headB;
    
    // When pointer reaches end, redirect to other list's head
    while (pointerA !== pointerB) {
        pointerA = pointerA ? pointerA.next : headB;
        pointerB = pointerB ? pointerB.next : headA;
    }
    
    return pointerA;
}

// Using length difference
function getIntersectionNodeLength(headA, headB) {
    let lenA = getLength(headA);
    let lenB = getLength(headB);
    
    // Align both pointers
    while (lenA > lenB) {
        headA = headA.next;
        lenA--;
    }
    
    while (lenB > lenA) {
        headB = headB.next;
        lenB--;
    }
    
    // Find intersection
    while (headA !== headB) {
        headA = headA.next;
        headB = headB.next;
    }
    
    return headA;
}

function getLength(head) {
    let length = 0;
    while (head) {
        length++;
        head = head.next;
    }
    return length;
}
```

#### Problem 7: Remove Linked List Elements

```javascript
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
function removeElements(head, val) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let current = dummy;
    
    while (current.next) {
        if (current.next.val === val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    
    return dummy.next;
}
```

#### Problem 8: Palindrome Linked List

```javascript
/**
 * @param {ListNode} head
 * @return {boolean}
 */
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
    while (slow) {
        const next = slow.next;
        slow.next = prev;
        prev = slow;
        slow = next;
    }
    
    // Compare both halves
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

#### Problem 9: Delete Node in a Linked List

```javascript
/**
 * @param {ListNode} node
 * @return {void}
 */
function deleteNode(node) {
    // Copy next node's value and skip next node
    node.val = node.next.val;
    node.next = node.next.next;
}
```

#### Problem 10: Convert Binary to Integer

```javascript
/**
 * @param {ListNode} head
 * @return {number}
 */
function getDecimalValue(head) {
    let result = 0;
    
    while (head) {
        result = result * 2 + head.val;
        head = head.next;
    }
    
    return result;
}
```

#### Problem 11: Reverse Linked List II

```javascript
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
function reverseBetween(head, left, right) {
    if (!head || left === right) return head;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    // Move to position before left
    for (let i = 1; i < left; i++) {
        prev = prev.next;
    }
    
    // Reverse from left to right
    let current = prev.next;
    for (let i = 0; i < right - left; i++) {
        const next = current.next;
        current.next = next.next;
        next.next = prev.next;
        prev.next = next;
    }
    
    return dummy.next;
}
```

#### Problem 12: Linked List Cycle II (Find Start of Cycle)

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
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

#### Problem 13: Remove Nth Node From End

```javascript
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let fast = dummy;
    let slow = dummy;
    
    // Move fast n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    // Move both until fast reaches end
    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }
    
    // Remove nth node
    slow.next = slow.next.next;
    
    return dummy.next;
}
```

#### Problem 14: Swap Nodes in Pairs

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function swapPairs(head) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let current = dummy;
    
    while (current.next && current.next.next) {
        const first = current.next;
        const second = current.next.next;
        
        first.next = second.next;
        second.next = first;
        current.next = second;
        
        current = first;
    }
    
    return dummy.next;
}

// Recursive approach
function swapPairsRecursive(head) {
    if (!head || !head.next) return head;
    
    const newHead = head.next;
    head.next = swapPairsRecursive(newHead.next);
    newHead.next = head;
    
    return newHead;
}
```

#### Problem 15: Odd Even Linked List

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function oddEvenList(head) {
    if (!head || !head.next) return head;
    
    let odd = head;
    let even = head.next;
    const evenHead = even;
    
    while (even && even.next) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    
    odd.next = evenHead;
    return head;
}
```

### Medium Problems (16-35)

#### Problem 16: Add Two Numbers

```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        
        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        
        current.next = new ListNode(sum % 10);
        current = current.next;
        
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    return dummy.next;
}
```

#### Problem 17: Add Two Numbers II (Numbers in Normal Order)

```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbersII(l1, l2) {
    const stack1 = [];
    const stack2 = [];
    
    while (l1) {
        stack1.push(l1.val);
        l1 = l1.next;
    }
    
    while (l2) {
        stack2.push(l2.val);
        l2 = l2.next;
    }
    
    let carry = 0;
    let head = null;
    
    while (stack1.length > 0 || stack2.length > 0 || carry > 0) {
        const val1 = stack1.length > 0 ? stack1.pop() : 0;
        const val2 = stack2.length > 0 ? stack2.pop() : 0;
        
        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        
        const newNode = new ListNode(sum % 10);
        newNode.next = head;
        head = newNode;
    }
    
    return head;
}
```

#### Problem 18: Partition List

```javascript
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
function partition(head, x) {
    const beforeDummy = new ListNode(0);
    const afterDummy = new ListNode(0);
    
    let before = beforeDummy;
    let after = afterDummy;
    
    while (head) {
        if (head.val < x) {
            before.next = head;
            before = before.next;
        } else {
            after.next = head;
            after = after.next;
        }
        head = head.next;
    }
    
    after.next = null;
    before.next = afterDummy.next;
    
    return beforeDummy.next;
}
```

#### Problem 19: Rotate List

```javascript
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function rotateRight(head, k) {
    if (!head || !head.next || k === 0) return head;
    
    // Find length and make circular
    let length = 1;
    let tail = head;
    
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    
    tail.next = head; // Make circular
    
    // Find new tail
    k = k % length;
    const stepsToNewHead = length - k;
    let newTail = head;
    
    for (let i = 1; i < stepsToNewHead; i++) {
        newTail = newTail.next;
    }
    
    const newHead = newTail.next;
    newTail.next = null;
    
    return newHead;
}
```

#### Problem 20: Remove Duplicates from Sorted List II

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function deleteDuplicatesII(head) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    while (head) {
        // If duplicate exists
        if (head.next && head.val === head.next.val) {
            // Skip all duplicates
            while (head.next && head.val === head.next.val) {
                head = head.next;
            }
            prev.next = head.next;
        } else {
            prev = prev.next;
        }
        head = head.next;
    }
    
    return dummy.next;
}
```

#### Problem 21: Reorder List

```javascript
/**
 * @param {ListNode} head
 * @return {void}
 */
function reorderList(head) {
    if (!head || !head.next) return;
    
    // Find middle
    let slow = head;
    let fast = head;
    
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let prev = null;
    let current = slow.next;
    slow.next = null;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    // Merge two halves
    let first = head;
    let second = prev;
    
    while (second) {
        const temp1 = first.next;
        const temp2 = second.next;
        
        first.next = second;
        second.next = temp1;
        
        first = temp1;
        second = temp2;
    }
}
```

#### Problem 22: Copy List with Random Pointer

```javascript
/**
 * @param {Node} head
 * @return {Node}
 */
function copyRandomList(head) {
    if (!head) return null;
    
    const map = new Map();
    
    // First pass: create all nodes
    let current = head;
    while (current) {
        map.set(current, new Node(current.val));
        current = current.next;
    }
    
    // Second pass: assign next and random pointers
    current = head;
    while (current) {
        const copy = map.get(current);
        copy.next = map.get(current.next) || null;
        copy.random = map.get(current.random) || null;
        current = current.next;
    }
    
    return map.get(head);
}

// O(1) space approach
function copyRandomListOptimized(head) {
    if (!head) return null;
    
    // Step 1: Create copy nodes interleaved
    let current = head;
    while (current) {
        const copy = new Node(current.val);
        copy.next = current.next;
        current.next = copy;
        current = copy.next;
    }
    
    // Step 2: Assign random pointers
    current = head;
    while (current) {
        if (current.random) {
            current.next.random = current.random.next;
        }
        current = current.next.next;
    }
    
    // Step 3: Separate lists
    const dummy = new Node(0);
    let copyCurrent = dummy;
    current = head;
    
    while (current) {
        copyCurrent.next = current.next;
        copyCurrent = copyCurrent.next;
        current.next = current.next.next;
        current = current.next;
    }
    
    return dummy.next;
}
```

#### Problem 23: Sort List (Merge Sort)

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function sortList(head) {
    if (!head || !head.next) return head;
    
    // Find middle
    let slow = head;
    let fast = head;
    let prev = null;
    
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    
    prev.next = null; // Split list
    
    // Sort both halves
    const left = sortList(head);
    const right = sortList(slow);
    
    // Merge sorted halves
    return merge(left, right);
}

function merge(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.val <= l2.val) {
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

#### Problem 24: Insertion Sort List

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function insertionSortList(head) {
    const dummy = new ListNode(-Infinity);
    let current = head;
    
    while (current) {
        const next = current.next;
        
        // Find position to insert
        let prev = dummy;
        while (prev.next && prev.next.val < current.val) {
            prev = prev.next;
        }
        
        // Insert current
        current.next = prev.next;
        prev.next = current;
        
        current = next;
    }
    
    return dummy.next;
}
```

#### Problem 25: Flatten a Multilevel Doubly Linked List

```javascript
/**
 * @param {Node} head
 * @return {Node}
 */
function flatten(head) {
    if (!head) return null;
    
    const stack = [];
    let current = head;
    
    while (current) {
        if (current.child) {
            if (current.next) {
                stack.push(current.next);
            }
            
            current.next = current.child;
            current.child.prev = current;
            current.child = null;
        }
        
        if (!current.next && stack.length > 0) {
            const next = stack.pop();
            current.next = next;
            next.prev = current;
        }
        
        current = current.next;
    }
    
    return head;
}

// Recursive approach
function flattenRecursive(head) {
    if (!head) return null;
    
    const dummy = new Node(0);
    let prev = dummy;
    
    function dfs(node) {
        if (!node) return;
        
        const next = node.next;
        const child = node.child;
        
        prev.next = node;
        node.prev = prev;
        node.child = null;
        prev = node;
        
        dfs(child);
        dfs(next);
    }
    
    dfs(head);
    dummy.next.prev = null;
    
    return dummy.next;
}
```

#### Problem 26: Swapping Nodes in a Linked List

```javascript
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function swapNodes(head, k) {
    let first = head;
    let second = head;
    let current = head;
    
    // Move to kth node
    for (let i = 1; i < k; i++) {
        current = current.next;
    }
    
    first = current;
    
    // Move to end while tracking kth from end
    while (current.next) {
        current = current.next;
        second = second.next;
    }
    
    // Swap values
    const temp = first.val;
    first.val = second.val;
    second.val = temp;
    
    return head;
}
```

#### Problem 27: Remove Zero Sum Consecutive Nodes

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function removeZeroSumSublists(head) {
    const dummy = new ListNode(0);
    dummy.next = head;
    
    const map = new Map();
    let prefixSum = 0;
    let current = dummy;
    
    // First pass: store prefix sums
    while (current) {
        prefixSum += current.val;
        map.set(prefixSum, current);
        current = current.next;
    }
    
    // Second pass: remove zero sum sequences
    prefixSum = 0;
    current = dummy;
    
    while (current) {
        prefixSum += current.val;
        current.next = map.get(prefixSum).next;
        current = current.next;
    }
    
    return dummy.next;
}
```

#### Problem 28: Split Linked List in Parts

```javascript
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
function splitListToParts(head, k) {
    // Get length
    let length = 0;
    let current = head;
    while (current) {
        length++;
        current = current.next;
    }
    
    const partSize = Math.floor(length / k);
    let remainder = length % k;
    
    const result = [];
    current = head;
    
    for (let i = 0; i < k; i++) {
        const partHead = current;
        const currentPartSize = partSize + (remainder > 0 ? 1 : 0);
        remainder--;
        
        for (let j = 0; j < currentPartSize - 1 && current; j++) {
            current = current.next;
        }
        
        if (current) {
            const next = current.next;
            current.next = null;
            current = next;
        }
        
        result.push(partHead);
    }
    
    return result;
}
```

#### Problem 29: Next Greater Node

```javascript
/**
 * @param {ListNode} head
 * @return {number[]}
 */
function nextLargerNodes(head) {
    const values = [];
    while (head) {
        values.push(head.val);
        head = head.next;
    }
    
    const result = Array(values.length).fill(0);
    const stack = [];
    
    for (let i = 0; i < values.length; i++) {
        while (stack.length > 0 && values[stack[stack.length - 1]] < values[i]) {
            const index = stack.pop();
            result[index] = values[i];
        }
        stack.push(i);
    }
    
    return result;
}
```

#### Problem 30: Design Browser History

```javascript
class BrowserHistory {
    constructor(homepage) {
        this.current = new Node(homepage);
    }
    
    visit(url) {
        const newNode = new Node(url);
        this.current.next = newNode;
        newNode.prev = this.current;
        this.current = newNode;
    }
    
    back(steps) {
        while (steps > 0 && this.current.prev) {
            this.current = this.current.prev;
            steps--;
        }
        return this.current.val;
    }
    
    forward(steps) {
        while (steps > 0 && this.current.next) {
            this.current = this.current.next;
            steps--;
        }
        return this.current.val;
    }
}
```

#### Problem 31: Reverse Nodes in k-Group

```javascript
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function reverseKGroup(head, k) {
    // Check if there are k nodes left
    let current = head;
    let count = 0;
    
    while (current && count < k) {
        current = current.next;
        count++;
    }
    
    if (count < k) return head;
    
    // Reverse k nodes
    let prev = null;
    current = head;
    
    for (let i = 0; i < k; i++) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    // Recursively reverse remaining
    head.next = reverseKGroup(current, k);
    
    return prev;
}
```

#### Problem 32: Palindrome Linked List (Advanced)

```javascript
/**
 * @param {ListNode} head
 * @return {boolean}
 */
function isPalindromeAdvanced(head) {
    const values = [];
    let current = head;
    
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    let left = 0;
    let right = values.length - 1;
    
    while (left < right) {
        if (values[left] !== values[right]) return false;
        left++;
        right--;
    }
    
    return true;
}
```

#### Problem 33: Merge K Sorted Lists

```javascript
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
    if (lists.length === 0) return null;
    
    while (lists.length > 1) {
        const mergedLists = [];
        
        for (let i = 0; i < lists.length; i += 2) {
            const l1 = lists[i];
            const l2 = i + 1 < lists.length ? lists[i + 1] : null;
            mergedLists.push(mergeTwoLists(l1, l2));
        }
        
        lists = mergedLists;
    }
    
    return lists[0];
}

// Using Min Heap
function mergeKListsHeap(lists) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    // Create min heap with first nodes
    const heap = new MinHeap();
    
    for (let list of lists) {
        if (list) {
            heap.insert(list);
        }
    }
    
    while (!heap.isEmpty()) {
        const minNode = heap.extractMin();
        current.next = minNode;
        current = current.next;
        
        if (minNode.next) {
            heap.insert(minNode.next);
        }
    }
    
    return dummy.next;
}

class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    insert(node) {
        this.heap.push(node);
        this.heapifyUp(this.heap.length - 1);
    }
    
    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        
        return min;
    }
    
    heapifyUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[index].val < this.heap[parent].val) {
                [this.heap[index], this.heap[parent]] = 
                [this.heap[parent], this.heap[index]];
                index = parent;
            } else {
                break;
            }
        }
    }
    
    heapifyDown(index) {
        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let smallest = index;
            
            if (left < this.heap.length && 
                this.heap[left].val < this.heap[smallest].val) {
                smallest = left;
            }
            
            if (right < this.heap.length && 
                this.heap[right].val < this.heap[smallest].val) {
                smallest = right;
            }
            
            if (smallest !== index) {
                [this.heap[index], this.heap[smallest]] = 
                [this.heap[smallest], this.heap[index]];
                index = smallest;
            } else {
                break;
            }
        }
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
}
```

#### Problem 34: Design LRU Cache

```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.head = new DoublyNode(0, 0);
        this.tail = new DoublyNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    get(key) {
        if (!this.cache.has(key)) return -1;
        
        const node = this.cache.get(key);
        this.remove(node);
        this.add(node);
        
        return node.val;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            this.remove(this.cache.get(key));
        }
        
        const node = new DoublyNode(key, value);
        this.add(node);
        this.cache.set(key, node);
        
        if (this.cache.size > this.capacity) {
            const lru = this.head.next;
            this.remove(lru);
            this.cache.delete(lru.key);
        }
    }
    
    add(node) {
        const prevEnd = this.tail.prev;
        prevEnd.next = node;
        node.prev = prevEnd;
        node.next = this.tail;
        this.tail.prev = node;
    }
    
    remove(node) {
        const prev = node.prev;
        const next = node.next;
        prev.next = next;
        next.prev = prev;
    }
}

class DoublyNode {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}
```

#### Problem 35: Design LFU Cache

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
        
        const val = this.keyToVal.get(key);
        this.updateFreq(key);
        
        return val;
    }
    
    put(key, value) {
        if (this.capacity === 0) return;
        
        if (this.keyToVal.has(key)) {
            this.keyToVal.set(key, value);
            this.updateFreq(key);
            return;
        }
        
        if (this.keyToVal.size >= this.capacity) {
            const keysWithMinFreq = this.freqToKeys.get(this.minFreq);
            const keyToRemove = keysWithMinFreq.values().next().value;
            
            keysWithMinFreq.delete(keyToRemove);
            this.keyToVal.delete(keyToRemove);
            this.keyToFreq.delete(keyToRemove);
        }
        
        this.keyToVal.set(key, value);
        this.keyToFreq.set(key, 1);
        
        if (!this.freqToKeys.has(1)) {
            this.freqToKeys.set(1, new Set());
        }
        this.freqToKeys.get(1).add(key);
        
        this.minFreq = 1;
    }
    
    updateFreq(key) {
        const freq = this.keyToFreq.get(key);
        this.keyToFreq.set(key, freq + 1);
        
        this.freqToKeys.get(freq).delete(key);
        
        if (freq === this.minFreq && this.freqToKeys.get(freq).size === 0) {
            this.minFreq++;
        }
        
        if (!this.freqToKeys.has(freq + 1)) {
            this.freqToKeys.set(freq + 1, new Set());
        }
        this.freqToKeys.get(freq + 1).add(key);
    }
}
```

### Hard Problems (36-50)

#### Problem 36: Reverse Alternate K Nodes

```javascript
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function reverseAlternateKGroup(head, k) {
    let current = head;
    let count = 0;
    
    // Check if k nodes exist
    while (current && count < k) {
        current = current.next;
        count++;
    }
    
    if (count < k) return head;
    
    // Reverse k nodes
    let prev = null;
    current = head;
    
    for (let i = 0; i < k; i++) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    // Skip next k nodes
    head.next = current;
    count = 0;
    while (current && count < k - 1) {
        current = current.next;
        count++;
    }
    
    // Recursively process remaining
    if (current) {
        current.next = reverseAlternateKGroup(current.next, k);
    }
    
    return prev;
}
```

#### Problem 37: Sort List with Different Values

```javascript
/**
 * Sort 0s, 1s, and 2s (Dutch National Flag)
 * @param {ListNode} head
 * @return {ListNode}
 */
function sortColors(head) {
    const dummy0 = new ListNode(0);
    const dummy1 = new ListNode(0);
    const dummy2 = new ListNode(0);
    
    let current0 = dummy0;
    let current1 = dummy1;
    let current2 = dummy2;
    
    let current = head;
    
    while (current) {
        if (current.val === 0) {
            current0.next = current;
            current0 = current0.next;
        } else if (current.val === 1) {
            current1.next = current;
            current1 = current1.next;
        } else {
            current2.next = current;
            current2 = current2.next;
        }
        current = current.next;
    }
    
    current2.next = null;
    current1.next = dummy2.next;
    current0.next = dummy1.next;
    
    return dummy0.next;
}
```

#### Problem 38: Clone Graph Using Linked List

```javascript
/**
 * @param {Node} head
 * @return {Node}
 */
function cloneLinkedListWithRandomPointer(head) {
    if (!head) return null;
    
    // Step 1: Interweave original and copy nodes
    let current = head;
    while (current) {
        const copy = new Node(current.val);
        copy.next = current.next;
        current.next = copy;
        current = copy.next;
    }
    
    // Step 2: Assign random pointers
    current = head;
    while (current) {
        if (current.random) {
            current.next.random = current.random.next;
        }
        current = current.next.next;
    }
    
    // Step 3: Separate lists
    const dummy = new Node(0);
    let copyCurrent = dummy;
    current = head;
    
    while (current) {
        copyCurrent.next = current.next;
        copyCurrent = copyCurrent.next;
        current.next = current.next.next;
        current = current.next;
    }
    
    return dummy.next;
}
```

#### Problem 39: Flatten Binary Tree to Linked List

```javascript
/**
 * @param {TreeNode} root
 * @return {void}
 */
function flattenTreeToList(root) {
    if (!root) return;
    
    let prev = null;
    
    function flatten(node) {
        if (!node) return;
        
        flatten(node.right);
        flatten(node.left);
        
        node.right = prev;
        node.left = null;
        prev = node;
    }
    
    flatten(root);
}
```

#### Problem 40: Multiply Two Linked Lists

```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {number}
 */
function multiplyTwoLists(l1, l2) {
    const MOD = 1e9 + 7;
    
    let num1 = 0;
    let num2 = 0;
    
    while (l1) {
        num1 = (num1 * 10 + l1.val) % MOD;
        l1 = l1.next;
    }
    
    while (l2) {
        num2 = (num2 * 10 + l2.val) % MOD;
        l2 = l2.next;
    }
    
    return (num1 * num2) % MOD;
}
```

#### Problem 41: Find Pair with Given Sum in DLL

```javascript
/**
 * @param {DoublyNode} head
 * @param {number} target
 * @return {number[][]}
 */
function findPairsWithSum(head, target) {
    const pairs = [];
    
    // Find tail
    let tail = head;
    while (tail && tail.next) {
        tail = tail.next;
    }
    
    // Two pointers from both ends
    let left = head;
    let right = tail;
    
    while (left && right && left !== right && left.prev !== right) {
        const sum = left.val + right.val;
        
        if (sum === target) {
            pairs.push([left.val, right.val]);
            left = left.next;
            right = right.prev;
        } else if (sum < target) {
            left = left.next;
        } else {
            right = right.prev;
        }
    }
    
    return pairs;
}
```

#### Problem 42: Subtract Two Linked Lists

```javascript
/**
 * @param {ListNode} l1 - larger number
 * @param {ListNode} l2 - smaller number
 * @return {ListNode}
 */
function subtractLists(l1, l2) {
    // Reverse both lists
    l1 = reverseList(l1);
    l2 = reverseList(l2);
    
    const dummy = new ListNode(0);
    let current = dummy;
    let borrow = 0;
    
    while (l1 || l2) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        
        let diff = val1 - val2 - borrow;
        
        if (diff < 0) {
            diff += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }
        
        current.next = new ListNode(diff);
        current = current.next;
        
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    // Reverse result and remove leading zeros
    let result = reverseList(dummy.next);
    
    while (result && result.val === 0 && result.next) {
        result = result.next;
    }
    
    return result;
}
```

#### Problem 43: Rearrange Linked List in Zigzag Fashion

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function zigzagList(head) {
    if (!head || !head.next) return head;
    
    let current = head;
    let flag = true; // true for <, false for >
    
    while (current && current.next) {
        if (flag) {
            // Current should be less than next
            if (current.val > current.next.val) {
                [current.val, current.next.val] = 
                [current.next.val, current.val];
            }
        } else {
            // Current should be greater than next
            if (current.val < current.next.val) {
                [current.val, current.next.val] = 
                [current.next.val, current.val];
            }
        }
        
        current = current.next;
        flag = !flag;
    }
    
    return head;
}
```

#### Problem 44: Merge Sort DLL

```javascript
/**
 * @param {DoublyNode} head
 * @return {DoublyNode}
 */
function mergeSortDLL(head) {
    if (!head || !head.next) return head;
    
    // Find middle
    let slow = head;
    let fast = head;
    
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    const mid = slow.next;
    slow.next = null;
    mid.prev = null;
    
    // Sort both halves
    const left = mergeSortDLL(head);
    const right = mergeSortDLL(mid);
    
    // Merge
    return mergeDLL(left, right);
}

function mergeDLL(l1, l2) {
    if (!l1) return l2;
    if (!l2) return l1;
    
    if (l1.val <= l2.val) {
        l1.next = mergeDLL(l1.next, l2);
        if (l1.next) l1.next.prev = l1;
        l1.prev = null;
        return l1;
    } else {
        l2.next = mergeDLL(l1, l2.next);
        if (l2.next) l2.next.prev = l2;
        l2.prev = null;
        return l2;
    }
}
```

#### Problem 45: Find Intersection Point of Y-Shaped Lists

```javascript
/**
 * @param {ListNode} head1
 * @param {ListNode} head2
 * @return {ListNode}
 */
function getIntersectionNodeYShaped(head1, head2) {
    if (!head1 || !head2) return null;
    
    let p1 = head1;
    let p2 = head2;
    
    while (p1 !== p2) {
        p1 = p1 ? p1.next : head2;
        p2 = p2 ? p2.next : head1;
    }
    
    return p1;
}
```

#### Problem 46: Clone N-ary Tree to Linked List

```javascript
/**
 * @param {Node} root
 * @return {ListNode}
 */
function serializeNaryTree(root) {
    if (!root) return null;
    
    const result = [];
    
    function dfs(node) {
        if (!node) return;
        
        result.push(node.val);
        result.push(node.children.length);
        
        for (let child of node.children) {
            dfs(child);
        }
    }
    
    dfs(root);
    
    // Convert to linked list
    const dummy = new ListNode(0);
    let current = dummy;
    
    for (let val of result) {
        current.next = new ListNode(val);
        current = current.next;
    }
    
    return dummy.next;
}
```

#### Problem 47: Quicksort on Linked List

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function quickSortList(head) {
    if (!head || !head.next) return head;
    
    // Choose pivot (last element)
    let pivot = head;
    let current = head.next;
    
    const lessDummy = new ListNode(0);
    const greaterDummy = new ListNode(0);
    
    let less = lessDummy;
    let greater = greaterDummy;
    
    while (current) {
        if (current.val < pivot.val) {
            less.next = current;
            less = less.next;
        } else {
            greater.next = current;
            greater = greater.next;
        }
        current = current.next;
    }
    
    less.next = null;
    greater.next = null;
    
    // Recursively sort
    const sortedLess = quickSortList(lessDummy.next);
    const sortedGreater = quickSortList(greaterDummy.next);
    
    // Combine
    if (!sortedLess) {
        pivot.next = sortedGreater;
        return pivot;
    }
    
    let temp = sortedLess;
    while (temp.next) {
        temp = temp.next;
    }
    
    temp.next = pivot;
    pivot.next = sortedGreater;
    
    return sortedLess;
}
```

#### Problem 48: Reverse Every Alternate Group

```javascript
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function reverseEveryAlternate(head, k) {
    if (!head || k <= 1) return head;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    let prevGroupEnd = dummy;
    
    let shouldReverse = true;
    
    while (true) {
        // Check if k nodes exist
        let current = prevGroupEnd.next;
        let count = 0;
        
        while (current && count < k) {
            current = current.next;
            count++;
        }
        
        if (count < k) break;
        
        if (shouldReverse) {
            // Reverse this group
            let prev = current;
            let curr = prevGroupEnd.next;
            
            for (let i = 0; i < k; i++) {
                const next = curr.next;
                curr.next = prev;
                prev = curr;
                curr = next;
            }
            
            const temp = prevGroupEnd.next;
            prevGroupEnd.next = prev;
            prevGroupEnd = temp;
        } else {
            // Skip this group
            for (let i = 0; i < k; i++) {
                prevGroupEnd = prevGroupEnd.next;
            }
        }
        
        shouldReverse = !shouldReverse;
    }
    
    return dummy.next;
}
```

#### Problem 49: Delete N Nodes After M Nodes

```javascript
/**
 * @param {ListNode} head
 * @param {number} m - keep m nodes
 * @param {number} n - delete n nodes
 * @return {ListNode}
 */
function deleteNAfterM(head, m, n) {
    let current = head;
    
    while (current) {
        // Skip m nodes
        for (let i = 1; i < m && current; i++) {
            current = current.next;
        }
        
        if (!current) break;
        
        // Delete n nodes
        let temp = current.next;
        for (let i = 0; i < n && temp; i++) {
            temp = temp.next;
        }
        
        current.next = temp;
        current = temp;
    }
    
    return head;
}
```

#### Problem 50: Segregate Even and Odd Nodes

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function segregateEvenOdd(head) {
    if (!head || !head.next) return head;
    
    const evenDummy = new ListNode(0);
    const oddDummy = new ListNode(0);
    
    let even = evenDummy;
    let odd = oddDummy;
    
    while (head) {
        if (head.val % 2 === 0) {
            even.next = head;
            even = even.next;
        } else {
            odd.next = head;
            odd = odd.next;
        }
        head = head.next;
    }
    
    odd.next = null;
    even.next = oddDummy.next;
    
    return evenDummy.next;
}
```

---

## Time Complexity Cheat Sheet

| Operation | Singly Linked List | Doubly Linked List | Array |
|-----------|-------------------|-------------------|--------|
| Access by Index | O(n) | O(n) | O(1) |
| Search | O(n) | O(n) | O(n) |
| Insert at Beginning | O(1) | O(1) | O(n) |
| Insert at End | O(1)* | O(1) | O(1)† |
| Insert at Middle | O(n) | O(n) | O(n) |
| Delete from Beginning | O(1) | O(1) | O(n) |
| Delete from End | O(n) | O(1) | O(1) |
| Delete from Middle | O(n) | O(n) | O(n) |
| Space Complexity | O(n) | O(n) | O(n) |

*With tail pointer  
†Amortized

---

## Problem-Solving Patterns & Tips

### Pattern 1: Two Pointers (Fast & Slow)
**Use for:**
- Finding middle element
- Detecting cycles
- Finding nth node from end
- Checking palindrome

### Pattern 2: Dummy Node
**Use for:**
- Simplifying edge cases at head
- Merge operations
- Partition problems

### Pattern 3: Recursion
**Use for:**
- Reversing lists
- Merging lists
- Tree-like problems

### Pattern 4: Multiple Passes
**Use for:**
- Finding length
- Problems requiring end-to-start operations
- When O(n) space is not allowed

### Pattern 5: Hash Map
**Use for:**
- Detecting duplicates
- Clone with random pointers
- Finding intersections

### Common Mistakes to Avoid

1. **Not handling null pointers**
   - Always check if node exists before accessing properties

2. **Losing reference to head**
   - Use dummy node or save head reference

3. **Infinite loops in circular lists**
   - Use proper termination conditions

4. **Not updating tail pointer**
   - Remember to update tail in insertion/deletion

5. **Memory leaks**
   - In languages with manual memory management

### Debugging Tips

1. **Draw it out**: Visualize with small examples
2. **Print intermediate states**: Check pointer positions
3. **Test edge cases**:
   - Empty list
   - Single node
   - Two nodes
   - Circular references

### Optimization Techniques

1. **Use tail pointer** for O(1) append
2. **Use dummy node** to avoid special cases
3. **Two-pointer technique** to avoid multiple passes
4. **In-place operations** to save space

---

## Practice Strategy

### Week 1: Basics
- Implement all list types from scratch
- Practice basic operations (insert, delete, search)
- Solve easy problems (1-15)

### Week 2: Techniques
- Master two-pointer technique
- Practice reversal problems
- Solve medium problems (16-25)

### Week 3: Advanced
- Cycle detection and manipulation
- Merge and sort operations
- Solve medium problems (26-35)

### Week 4: Expert
- Complex manipulations
- Design problems (LRU, LFU)
- Solve hard problems (36-50)

---

## Practice Resources

- **LeetCode**: Linked List tag (Easy → Medium → Hard)
- **HackerRank**: Data Structures - Linked Lists
- **GeeksforGeeks**: Linked List Practice Problems
- **InterviewBit**: Linked Lists section
- **Codeforces**: Data structures problems

---

## Conclusion

Linked lists are fundamental data structures that form the basis for many advanced concepts. The key to mastering linked lists is:

1. **Understanding pointer manipulation**
2. **Practicing edge case handling**
3. **Recognizing common patterns**
4. **Knowing when to use which technique**

Remember:
- Draw diagrams for complex problems
- Test with small examples first
- Consider edge cases (null, single node, cycles)
- Practice, practice, practice!

With these 50 problems and concepts, you're well-equipped to handle any linked list challenge in interviews or real-world applications.

---

**Happy Coding! 🔗**

