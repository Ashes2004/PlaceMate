// "use client"
// import React, { useState } from 'react'
// import { db } from "@/utils/firebase";
// import { collection, addDoc  , serverTimestamp } from "firebase/firestore";

// const problemData = [
//   {
//     "problemTitle": "Print numbers from 1 to N using recursion",
//     "topic": "Recursion",
//     "link": "https://www.geeksforgeeks.org/print-1-to-n-without-using-loops/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=yVdKa8dnKiE"
//   },
//   {
//     "problemTitle": "Factorial using recursion",
//     "topic": "Recursion",
//     "link": "https://www.geeksforgeeks.org/program-for-factorial-of-a-number/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=k0bb7UYy0pY"
//   },
//   {
//     "problemTitle": "Sum of digits using recursion",
//     "topic": "Recursion",
//     "link": "https://www.geeksforgeeks.org/sum-digit-number-using-recursion/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=euaRxhkLJtc"
//   },
//   {
//     "problemTitle": "Fibonacci using recursion",
//     "topic": "Recursion",
//     "link": "https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=oBt53YbR9Kk"
//   },
//   {
//     "problemTitle": "Power of a number using recursion",
//     "topic": "Recursion",
//     "link": "https://www.geeksforgeeks.org/write-a-c-program-to-calculate-powxn/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=wAyrtLAeWvI"
//   },
//   {
//     "problemTitle": "Reverse a string using recursion",
//     "topic": "Recursion",
//     "link": "https://www.geeksforgeeks.org/reverse-a-string-using-recursion/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=HBiuaGtZzlY"
//   },
//   {
//     "problemTitle": "Check palindrome using recursion",
//     "topic": "Recursion",
//     "link": "https://www.geeksforgeeks.org/recursive-function-check-string-palindrome/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=1xDUmJZTsOY"
//   },
//   {
//     "problemTitle": "Binary search using recursion",
//     "topic": "Recursion",
//     "link": "https://www.geeksforgeeks.org/binary-search/",
//     "difficulty": "Easy",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=P3YID7liBug"
//   },
//   {
//     "problemTitle": "Tower of Hanoi",
//     "topic": "Recursion",
//     "link": "https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=2SUvWfNJSsM"
//   },
//   {
//     "problemTitle": "Print all subsequences of a string",
//     "topic": "Recursion",
//     "link": "https://www.geeksforgeeks.org/print-subsequences-string/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=AxNNVECce8c"
//   },
//   {
//     "problemTitle": "Generate parentheses",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/generate-parentheses/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=s9fokUqJ76A"
//   },
//   {
//     "problemTitle": "N-Queens problem",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/n-queens/",
//     "difficulty": "Hard",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=i05Ju7AftcM"
//   },
//   {
//     "problemTitle": "Sudoku solver",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/sudoku-solver/",
//     "difficulty": "Hard",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=FWAIf_EVUKE"
//   },
//   {
//     "problemTitle": "Permutations",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/permutations/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=s7AvT7cGdSo"
//   },
//   {
//     "problemTitle": "Combinations",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/combinations/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=q0s6m7AiM7o"
//   },
//   {
//     "problemTitle": "Combination sum",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/combination-sum/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=GBKI9VSKdGg"
//   },
//   {
//     "problemTitle": "Subsets",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/subsets/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=REOH22Xwdkk"
//   },
//   {
//     "problemTitle": "Word search",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/word-search/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=pfiQ_PS1g8E"
//   },
//   {
//     "problemTitle": "Palindrome partitioning",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/palindrome-partitioning/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=WBgsABoClE0"
//   },
//   {
//     "problemTitle": "Letter combinations of phone number",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=0snEunUacZY"
//   },
//   {
//     "problemTitle": "Rat in a maze",
//     "topic": "Backtracking",
//     "link": "https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=bLGZhJlt4y0"
//   },
//   {
//     "problemTitle": "Knight's tour problem",
//     "topic": "Backtracking",
//     "link": "https://www.geeksforgeeks.org/the-knights-tour-problem-backtracking-1/",
//     "difficulty": "Hard",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=ab_dY3dZFHM"
//   },
//   {
//     "problemTitle": "M-coloring problem",
//     "topic": "Backtracking",
//     "link": "https://www.geeksforgeeks.org/m-coloring-problem-backtracking-5/",
//     "difficulty": "Hard",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=052VkKhIaQ4"
//   },
//   {
//     "problemTitle": "Hamiltonian path",
//     "topic": "Backtracking",
//     "link": "https://www.geeksforgeeks.org/hamiltonian-path-and-hamiltonian-circuit/",
//     "difficulty": "Hard",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=dQr4wZCiJJ4"
//   },
//   {
//     "problemTitle": "Subset sum problem",
//     "topic": "Backtracking",
//     "link": "https://www.geeksforgeeks.org/subset-sum-backtracking-4/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=kyLxTdsT8ws"
//   },
//   {
//     "problemTitle": "Print all paths from source to destination",
//     "topic": "Backtracking",
//     "link": "https://www.geeksforgeeks.org/find-paths-given-source-destination/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=uzuFARspR6g"
//   },
//   {
//     "problemTitle": "Word break II",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/word-break-ii/",
//     "difficulty": "Hard",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=WepWFGxiwRs"
//   },
//   {
//     "problemTitle": "Restore IP addresses",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/restore-ip-addresses/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=61tN4YEdiTM"
//   },
//   {
//     "problemTitle": "Beautiful arrangement",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/beautiful-arrangement/",
//     "difficulty": "Medium",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=4zABVG0AoNY"
//   },
//   {
//     "problemTitle": "Expression add operators",
//     "topic": "Backtracking",
//     "link": "https://leetcode.com/problems/expression-add-operators/",
//     "difficulty": "Hard",
//     "solutionVideoLink": "https://www.youtube.com/watch?v=v05R1OAUcag"
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