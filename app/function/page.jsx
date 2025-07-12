// "use client"
// import React, { useState } from 'react'
// import { db } from "@/utils/firebase";
// import { collection, addDoc  , serverTimestamp } from "firebase/firestore";

// const problemData = [
//   {
//     "problemTitle": "Find the Largest and Smallest element in an array",
//     "topic": "Array",
//     "link": "https://leetcode.com/problems/maximum-and-minimum-element-in-an-array/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=UdO2NeHB46c"
//   },
//   {
//     "problemTitle": "Reverse an array",
//     "topic": "Array",
//     "link": "https://leetcode.com/problems/reverse-string/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=P68JPXtFyYg"
//   },
//   {
//     "problemTitle": "Check if array is sorted",
//     "topic": "Array",
//     "link": "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=37E9ckMDdTk"
//   },
//   {
//     "problemTitle": "Find missing number in array from 1 to n",
//     "topic": "Array",
//     "link": "https://leetcode.com/problems/missing-number/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=WnPLSRLSANE"
//   },
//   {
//     "problemTitle": "Kadane's Algorithm (Maximum subarray sum)",
//     "topic": "Array",
//     "link": "https://leetcode.com/problems/maximum-subarray/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=w_KEocd__20"
//   },
//   {
//     "problemTitle": "Move all zeros to the end",
//     "topic": "Array",
//     "link": "https://leetcode.com/problems/move-zeroes/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=wvcQg43_V8U"
//   },
//   {
//     "problemTitle": "Remove duplicates from sorted array",
//     "topic": "Array",
//     "link": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=DEJAZBq0FDA"
//   },
//   {
//     "problemTitle": "Rotate array by k steps",
//     "topic": "Array",
//     "link": "https://leetcode.com/problems/rotate-array/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=BHr381Guz3Y"
//   },
//   {
//     "problemTitle": "Find the duplicate number",
//     "topic": "Array",
//     "link": "https://leetcode.com/problems/find-the-duplicate-number/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=wjYnzkAhcNk"
//   },
//   {
//     "problemTitle": "Union and intersection of two arrays",
//     "topic": "Array",
//     "link": "https://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays-2/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=5aBoRAr6CXo"
//   },
//   {
//     "problemTitle": "Reverse a string",
//     "topic": "String",
//     "link": "https://leetcode.com/problems/reverse-string/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=P68JPXtFyYg"
//   },
//   {
//     "problemTitle": "Check if string is palindrome",
//     "topic": "String",
//     "link": "https://leetcode.com/problems/valid-palindrome/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=jJXJ16kPFWg"
//   },
//   {
//     "problemTitle": "Check if two strings are anagrams",
//     "topic": "String",
//     "link": "https://leetcode.com/problems/valid-anagram/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=9UtInBqnCgA"
//   },
//   {
//     "problemTitle": "Longest Common Prefix",
//     "topic": "String",
//     "link": "https://leetcode.com/problems/longest-common-prefix/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=0sWShKIJoo4"
//   },
//   {
//     "problemTitle": "Implement strstr() / substring search",
//     "topic": "String",
//     "link": "https://leetcode.com/problems/implement-strstr/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=GTJr8OvyEVQ"
//   },
//   {
//     "problemTitle": "Count and Say",
//     "topic": "String",
//     "link": "https://leetcode.com/problems/count-and-say/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=4YFxPy_0kgA"
//   },
//   {
//     "problemTitle": "Longest Palindromic Substring",
//     "topic": "String",
//     "link": "https://leetcode.com/problems/longest-palindromic-substring/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=XYQecbcd6_c"
//   },
//   {
//     "problemTitle": "Remove all duplicates from a string",
//     "topic": "String",
//     "link": "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=2D9yW7HOVtM"
//   },
//   {
//     "problemTitle": "Frequency of characters",
//     "topic": "String",
//     "link": "https://www.geeksforgeeks.org/print-characters-frequencies-order-occurrence/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=FKl9KJLmTNs"
//   },
//   {
//     "problemTitle": "String compression",
//     "topic": "String",
//     "link": "https://leetcode.com/problems/string-compression/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=qBr4hbYU_hI"
//   },
//   {
//     "problemTitle": "Reverse a linked list",
//     "topic": "Linked List",
//     "link": "https://leetcode.com/problems/reverse-linked-list/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=G0_I-ZF0S38"
//   },
//   {
//     "problemTitle": "Detect cycle in linked list",
//     "topic": "Linked List",
//     "link": "https://leetcode.com/problems/linked-list-cycle/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=gBTe7lFR3vc"
//   },
//   {
//     "problemTitle": "Find middle of linked list",
//     "topic": "Linked List",
//     "link": "https://leetcode.com/problems/middle-of-the-linked-list/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=sGdwSH8RK-o"
//   },
//   {
//     "problemTitle": "Merge two sorted linked lists",
//     "topic": "Linked List",
//     "link": "https://leetcode.com/problems/merge-two-sorted-lists/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=XIdigk956u0"
//   },
//   {
//     "problemTitle": "Remove nth node from end",
//     "topic": "Linked List",
//     "link": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=XVuQxVej6y8"
//   },
//   {
//     "problemTitle": "Add two numbers represented by linked lists",
//     "topic": "Linked List",
//     "link": "https://leetcode.com/problems/add-two-numbers/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=wgFPrzTjm7s"
//   },
//   {
//     "problemTitle": "Intersection of two linked lists",
//     "topic": "Linked List",
//     "link": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=u4FWXfgS8jw"
//   },
//   {
//     "problemTitle": "Palindrome linked list",
//     "topic": "Linked List",
//     "link": "https://leetcode.com/problems/palindrome-linked-list/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=yOzXms1J6Nk"
//   },
//   {
//     "problemTitle": "Remove duplicates from sorted linked list",
//     "topic": "Linked List",
//     "link": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=p10f-VpO4nE"
//   },
//   {
//     "problemTitle": "Flatten a linked list",
//     "topic": "Linked List",
//     "link": "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=J_rEh9GfJ_I"
//   },
//   {
//     "problemTitle": "Valid parentheses",
//     "topic": "Stack",
//     "link": "https://leetcode.com/problems/valid-parentheses/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=WTzjTskDFMg"
//   },
//   {
//     "problemTitle": "Implement stack using arrays",
//     "topic": "Stack",
//     "link": "https://www.geeksforgeeks.org/stack-data-structure-introduction-program/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=GYptUgnIM_I"
//   },
//   {
//     "problemTitle": "Implement stack using queues",
//     "topic": "Stack",
//     "link": "https://leetcode.com/problems/implement-stack-using-queues/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=jDZQKzEtbYQ"
//   },
//   {
//     "problemTitle": "Next greater element",
//     "topic": "Stack",
//     "link": "https://leetcode.com/problems/next-greater-element-i/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=Du881K7Jtk8"
//   },
//   {
//     "problemTitle": "Largest rectangle in histogram",
//     "topic": "Stack",
//     "link": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
//     "difficulty": "Hard",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=zx5Sw9130L0"
//   },
//   {
//     "problemTitle": "Evaluate reverse polish notation",
//     "topic": "Stack",
//     "link": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=iu0082c4HDE"
//   },
//   {
//     "problemTitle": "Min stack",
//     "topic": "Stack",
//     "link": "https://leetcode.com/problems/min-stack/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=WxCuL3jleUA"
//   },
//   {
//     "problemTitle": "Trapping rain water",
//     "topic": "Stack",
//     "link": "https://leetcode.com/problems/trapping-rain-water/",
//     "difficulty": "Hard",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=m0_oSO2LbNA"
//   },
//   {
//     "problemTitle": "Balanced parentheses",
//     "topic": "Stack",
//     "link": "https://leetcode.com/problems/generate-parentheses/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=s9fokUqJ76A"
//   },
//   {
//     "problemTitle": "Infix to postfix conversion",
//     "topic": "Stack",
//     "link": "https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=PAceaOSnxQs"
//   },
//   {
//     "problemTitle": "Implement queue using arrays",
//     "topic": "Queue",
//     "link": "https://www.geeksforgeeks.org/queue-set-1introduction-and-array-implementation/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=okr-XE8yTO8"
//   },
//   {
//     "problemTitle": "Implement queue using stacks",
//     "topic": "Queue",
//     "link": "https://leetcode.com/problems/implement-queue-using-stacks/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=eanwa4StHgc"
//   },
//   {
//     "problemTitle": "Circular queue implementation",
//     "topic": "Queue",
//     "link": "https://leetcode.com/problems/design-circular-queue/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=aBwNZI6vO3U"
//   },
//   {
//     "problemTitle": "First non-repeating character in stream",
//     "topic": "Queue",
//     "link": "https://www.geeksforgeeks.org/find-first-non-repeating-character-stream-characters/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=5co5Gvp_-S0"
//   },
//   {
//     "problemTitle": "Generate binary numbers from 1 to n",
//     "topic": "Queue",
//     "link": "https://www.geeksforgeeks.org/interesting-method-generate-binary-numbers-1-n/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=YIqkgfHJN0k"
//   },
//   {
//     "problemTitle": "Level order traversal of binary tree",
//     "topic": "Queue",
//     "link": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=6ZnyEApgFYg"
//   },
//   {
//     "problemTitle": "Sliding window maximum",
//     "topic": "Queue",
//     "link": "https://leetcode.com/problems/sliding-window-maximum/",
//     "difficulty": "Hard",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=DfljaUwZsOk"
//   },
//   {
//     "problemTitle": "Queue reversal",
//     "topic": "Queue",
//     "link": "https://www.geeksforgeeks.org/reversing-a-queue/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=dLdWBY0B7Vo"
//   },
//   {
//     "problemTitle": "Interleave first half of queue with second half",
//     "topic": "Queue",
//     "link": "https://www.geeksforgeeks.org/interleave-first-half-queue-second-half/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=QJZgJAjYKvg"
//   },
//   {
//     "problemTitle": "Priority queue implementation",
//     "topic": "Queue",
//     "link": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=hOjcdrqMoQ8"
//   },
//   {
//     "problemTitle": "Binary tree inorder traversal",
//     "topic": "Tree",
//     "link": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=jmy0LaGET1I"
//   },
//   {
//     "problemTitle": "Binary tree preorder traversal",
//     "topic": "Tree",
//     "link": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=jmy0LaGET1I"
//   },
//   {
//     "problemTitle": "Binary tree postorder traversal",
//     "topic": "Tree",
//     "link": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=jmy0LaGET1I"
//   },
//   {
//     "problemTitle": "Maximum depth of binary tree",
//     "topic": "Tree",
//     "link": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=hTM3phVI6YQ"
//   },
//   {
//     "problemTitle": "Minimum depth of binary tree",
//     "topic": "Tree",
//     "link": "https://leetcode.com/problems/minimum-depth-of-binary-tree/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=QUvOkMmXQkw"
//   },
//   {
//     "problemTitle": "Check if two binary trees are identical",
//     "topic": "Tree",
//     "link": "https://leetcode.com/problems/same-tree/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=BhPf7Zck948"
//   },
//   {
//     "problemTitle": "Symmetric binary tree",
//     "topic": "Tree",
//     "link": "https://leetcode.com/problems/symmetric-tree/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=Mao9uzxwvmc"
//   },
//   {
//     "problemTitle": "Diameter of binary tree",
//     "topic": "Tree",
//     "link": "https://leetcode.com/problems/diameter-of-binary-tree/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=ey7DYc9OANo"
//   },
//   {
//     "problemTitle": "Path sum",
//     "topic": "Tree",
//     "link": "https://leetcode.com/problems/path-sum/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=LSKQyOz_P8I"
//   },
//   {
//     "problemTitle": "Binary tree right side view",
//     "topic": "Tree",
//     "link": "https://leetcode.com/problems/binary-tree-right-side-view/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=KV4mRzTjlAk"
//   },
//   {
//     "problemTitle": "Binary search",
//     "topic": "Searching",
//     "link": "https://leetcode.com/problems/binary-search/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=s4DPM8ct1pI"
//   },
//   {
//     "problemTitle": "Find first and last position of element",
//     "topic": "Searching",
//     "link": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=4sQL7R5ySUU"
//   },
//   {
//     "problemTitle": "Search in rotated sorted array",
//     "topic": "Searching",
//     "link": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=r3pMQ8-Ad5s"
//   },
//   {
//     "problemTitle": "Find peak element",
//     "topic": "Searching",
//     "link": "https://leetcode.com/problems/find-peak-element/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=kMzJy9es7Hc"
//   },
//   {
//     "problemTitle": "Square root of x",
//     "topic": "Searching",
//     "link": "https://leetcode.com/problems/sqrtx/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=1FUZw4xdxC8"
//   },
//   {
//     "problemTitle": "Search a 2D matrix",
//     "topic": "Searching",
//     "link": "https://leetcode.com/problems/search-a-2d-matrix/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=Ber2pi2C0j0"
//   },
//   {
//     "problemTitle": "Find minimum in rotated sorted array",
//     "topic": "Searching",
//     "link": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=nIVW4P8b1VA"
//   },
//   {
//     "problemTitle": "Median of two sorted arrays",
//     "topic": "Searching",
//     "link": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
//     "difficulty": "Hard",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=LPFhl65R7ww"
//   },
//   {
//     "problemTitle": "Linear search",
//     "topic": "Searching",
//     "link": "https://www.geeksforgeeks.org/linear-search/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=C46QfTjVCNU"
//   },
//   {
//     "problemTitle": "Kth largest element in array",
//     "topic": "Searching",
//     "link": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=3BdGzqgJZNc"
//   },
//   {
//     "problemTitle": "Bubble sort",
//     "topic": "Sorting",
//     "link": "https://www.geeksforgeeks.org/bubble-sort/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=xli_FI7CuzA"
//   },
//   {
//     "problemTitle": "Selection sort",
//     "topic": "Sorting",
//     "link": "https://www.geeksforgeeks.org/selection-sort/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=g-PGLbMth_g"
//   },
//   {
//     "problemTitle": "Insertion sort",
//     "topic": "Sorting",
//     "link": "https://www.geeksforgeeks.org/insertion-sort/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=JU767SDMDvA"
//   },
//   {
//     "problemTitle": "Merge sort",
//     "topic": "Sorting",
//     "link": "https://www.geeksforgeeks.org/merge-sort/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=4VqmGXwpLqc"
//   },
//   {
//     "problemTitle": "Quick sort",
//     "topic": "Sorting",
//     "link": "https://www.geeksforgeeks.org/quick-sort/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=Hoixgm4-P4M"
//   },
//   {
//     "problemTitle": "Heap sort",
//     "topic": "Sorting",
//     "link": "https://www.geeksforgeeks.org/heap-sort/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=2DmK_H7IdTo"
//   },
//   {
//     "problemTitle": "Count sort",
//     "topic": "Sorting",
//     "link": "https://www.geeksforgeeks.org/counting-sort/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=7zuGmKfUt7s"
//   },
//   {
//     "problemTitle": "Radix sort",
//     "topic": "Sorting",
//     "link": "https://www.geeksforgeeks.org/radix-sort/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=XiuSW_mEn7g"
//   },
//   {
//     "problemTitle": "Merge two sorted arrays",
//     "topic": "Sorting",
//     "link": "https://leetcode.com/problems/merge-sorted-array/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=P1Ic85RarKY"
//   },
//   {
//     "problemTitle": "Sort colors (Dutch flag problem)",
//     "topic": "Sorting",
//     "link": "https://leetcode.com/problems/sort-colors/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=4xbWSRZHqac"
//   },
//   {
//     "problemTitle": "DFS traversal",
//     "topic": "Graph",
//     "link": "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=7fujbpJ0LB4"
//   },
//   {
//     "problemTitle": "BFS traversal",
//     "topic": "Graph",
//     "link": "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=oDqjPvD54Ss"
//   },
//   {
//     "problemTitle": "Detect cycle in undirected graph",
//     "topic": "Graph",
//     "link": "https://www.geeksforgeeks.org/detect-cycle-undirected-graph/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=zQ3zgFypzX4"
//   },
//   {
//     "problemTitle": "Detect cycle in directed graph",
//     "topic": "Graph",
//     "link": "https://www.geeksforgeeks.org/detect-cycle-in-a-graph/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=rKQaZuoUR4M"
//   },
//   {
//     "problemTitle": "Topological sorting",
//     "topic": "Graph",
//     "link": "https://www.geeksforgeeks.org/topological-sorting/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=cIBFEhD77b4"
//   },
//   {
//     "problemTitle": "Number of islands",
//     "topic": "Graph",
//     "link": "https://leetcode.com/problems/number-of-islands/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=pV2kpPD66nE"
//   },
//   {
//     "problemTitle": "Clone graph",
//     "topic": "Graph",
//     "link": "https://leetcode.com/problems/clone-graph/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=mQeF6bN8hMk"
//   },
//   {
//     "problemTitle": "Course schedule",
//     "topic": "Graph",
//     "link": "https://leetcode.com/problems/course-schedule/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=EgI5nU9etnU"
//   },
//   {
//     "problemTitle": "Dijkstra's shortest path",
//     "topic": "Graph",
//     "link": "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=pVfj6mxhdMw"
//   },
//   {
//     "problemTitle": "Union Find (Disjoint Set)",
//     "topic": "Graph",
//     "link": "https://www.geeksforgeeks.org/union-find/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=ibjEGG7ylHk"
//   },
//   {
//     "problemTitle": "Fibonacci sequence",
//     "topic": "Dynamic Programming",
//     "link": "https://leetcode.com/problems/fibonacci-number/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=oBt53YbR9Kk"
//   },
//   {
//     "problemTitle": "Climbing stairs",
//     "topic": "Dynamic Programming",
//     "link": "https://leetcode.com/problems/climbing-stairs/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=Y0lT9Fck7qI"
//   },
//   {
//     "problemTitle": "House robber",
//     "topic": "Dynamic Programming",
//     "link": "https://leetcode.com/problems/house-robber/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=xlvhyfcoQa4"
//   },
//   {
//     "problemTitle": "Coin change",
//     "topic": "Dynamic Programming",
//     "link": "https://leetcode.com/problems/coin-change/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=H9bfqozjoqs"
//   },
//   {
//     "problemTitle": "Longest increasing subsequence",
//     "topic": "Dynamic Programming",
//     "link": "https://leetcode.com/problems/longest-increasing-subsequence/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=cjWnW0hdF1Y"
//   },
//   {
//     "problemTitle": "0/1 Knapsack problem",
//     "topic": "Dynamic Programming",
//     "link": "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=8LusJS5-AGo"
//   },
//   {
//     "problemTitle": "Longest common subsequence",
//     "topic": "Dynamic Programming",
//     "link": "https://leetcode.com/problems/longest-common-subsequence/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=Ua0GhsJSlWM"
//   },
//   {
//     "problemTitle": "Edit distance",
//     "topic": "Dynamic Programming",
//     "link": "https://leetcode.com/problems/edit-distance/",
//     "difficulty": "Hard",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=XYi2-LPrwm4"
//   },
//   {
//     "problemTitle": "Unique paths",
//     "topic": "Dynamic Programming",
//     "link": "https://leetcode.com/problems/unique-paths/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=IlEsdxuD4lY"
//   },
//   {
//     "problemTitle": "Maximum product subarray",
//     "topic": "Dynamic Programming",
//     "link": "https://leetcode.com/problems/maximum-product-subarray/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=lXVy6YWFcRM"
//   }
// ]

// function Page() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [status, setStatus] = useState('');

//   const insertProblems = async () => {
//     setIsLoading(true);
//     setStatus('Inserting problems...');
    
//     try {
//       for (let i = 0; i < problemData.length; i++) {
        
//          const newProblem = {
//           ...problemData[i],
//           createdAt: serverTimestamp()
//         };
//         const docRef = await addDoc(collection(db, "dsaProblems"), newProblem);
//         console.log(`Problem ${i + 1} inserted with ID: ${docRef.id}`);
//         setStatus(`Inserted ${i + 1}/${problemData.length} problems...`);
//       }
      
//       setStatus('Done! All problems inserted successfully.');
//       console.log('Done! All problems inserted successfully.');
      
//     } catch (error) {
//       console.error('Error inserting problems:', error);
//       setStatus('Error occurred while inserting problems.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">DSA Problems Database</h1>
      
//       <div className="mb-4">
//         <button
//           onClick={insertProblems}
//           disabled={isLoading}
//           className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
//         >
//           {isLoading ? 'Inserting...' : 'Insert Problems to Database'}
//         </button>
//       </div>
      
//       {status && (
//         <div className="mb-4 p-3 bg-gray-100 rounded">
//           <p className="text-sm">{status}</p>
//         </div>
//       )}
      
//       <div className="mt-6">
//         <h2 className="text-lg font-semibold mb-2">Problems to be inserted:</h2>
//         <ul className="list-disc pl-5 space-y-1">
//           {problemData.map((problem, index) => (
//             <li key={index} className="text-sm">
//               <strong>{problem.problemTitle}</strong> - {problem.difficulty} ({problem.topic})
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Page;