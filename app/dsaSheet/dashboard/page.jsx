"use client"
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function SheetDashboard() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [completedProblems, setCompletedProblems] = useState(new Set());
  const [filterTopic, setFilterTopic] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProblem, setEditingProblem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Load problems from Firebase
  useEffect(() => {
    const loadProblems = async () => {
      try {
        const q = query(collection(db, "dsaProblems"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const problemsData = [];
        querySnapshot.forEach((doc) => {
          problemsData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setProblems(problemsData);
      } catch (error) {
        console.error("Error loading problems:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  // Load admin status and completed problems from localStorage
  useEffect(() => {
    // Check admin status
    const adminStatus = localStorage.getItem('userRole');
    setIsAdmin(adminStatus === 'true');

    // Load completed problems
    const completed = JSON.parse(localStorage.getItem('completedProblems') || '[]');
    setCompletedProblems(new Set(completed));
  }, []);

  // Handle problem completion toggle
  const handleToggleCompletion = (problemId) => {
    const newCompleted = new Set(completedProblems);
    
    if (newCompleted.has(problemId)) {
      newCompleted.delete(problemId);
    } else {
      newCompleted.add(problemId);
    }
    
    setCompletedProblems(newCompleted);
    localStorage.setItem('completedProblems', JSON.stringify([...newCompleted]));
  };

  // Handle problem update
  const handleUpdateProblem = async (problemId) => {
    if (!editForm.problemTitle || !editForm.topic || !editForm.link || !editForm.difficulty) {
      alert('Please fill in all required fields');
      return;
    }

    setUpdateLoading(true);
    try {
      const problemRef = doc(db, "dsaProblems", problemId);
      await updateDoc(problemRef, {
        ...editForm,
        updatedAt: new Date()
      });

      // Update local state
      setProblems(problems.map(p => 
        p.id === problemId ? { ...p, ...editForm } : p
      ));

      setEditingProblem(null);
      setEditForm({});
      alert('Problem updated successfully!');
    } catch (error) {
      console.error("Error updating problem:", error);
      alert('Failed to update problem');
    } finally {
      setUpdateLoading(false);
    }
  };

  // Handle problem deletion
  const handleDeleteProblem = async (problemId) => {
    if (!confirm('Are you sure you want to delete this problem?')) return;

    setDeleteLoading(problemId);
    try {
      await deleteDoc(doc(db, "dsaProblems", problemId));
      
      // Update local state
      setProblems(problems.filter(p => p.id !== problemId));
      
      // Remove from completed if it was completed
      const newCompleted = new Set(completedProblems);
      newCompleted.delete(problemId);
      setCompletedProblems(newCompleted);
      localStorage.setItem('completedProblems', JSON.stringify([...newCompleted]));
      
      alert('Problem deleted successfully!');
    } catch (error) {
      console.error("Error deleting problem:", error);
      alert('Failed to delete problem');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Start editing a problem
  const startEditing = (problem) => {
    setEditingProblem(problem.id);
    setEditForm({
      problemTitle: problem.problemTitle,
      topic: problem.topic,
      link: problem.link,
      difficulty: problem.difficulty,
      solutionVideoLink: problem.solutionVideoLink || ''
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingProblem(null);
    setEditForm({});
  };

  // Get unique topics for filter
  const topics = [...new Set(problems.map(p => p.topic))].sort();

  // Filter problems based on search and filters
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.problemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = filterTopic === 'all' || problem.topic === filterTopic;
    const matchesDifficulty = filterDifficulty === 'all' || problem.difficulty === filterDifficulty;
    
    return matchesSearch && matchesTopic && matchesDifficulty;
  });

  // Calculate progress stats
  const totalProblems = problems.length;
  const completedCount = completedProblems.size;
  const progressPercentage = totalProblems > 0 ? Math.round((completedCount / totalProblems) * 100) : 0;

  // Difficulty colors
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '🟢';
      case 'Medium': return '🟡';
      case 'Hard': return '🔴';
      default: return '⚪';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 border border-white/30 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <span className="text-blue-700 font-medium">Loading problems...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full overflow-x-hidden relative"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(199, 210, 254, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(147, 197, 253, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(156, 163, 175, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, 
            rgba(248, 250, 252, 0.95) 0%,
            rgba(241, 245, 249, 0.9) 25%,
            rgba(226, 232, 240, 0.85) 50%,
            rgba(203, 213, 225, 0.8) 75%,
            rgba(148, 163, 184, 0.75) 100%
          )
        `,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}
    >
      {/* Glass overlay pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      <Header />
      
      <div className="max-w-7xl mx-auto py-10 px-4 relative z-10 pt-24">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30 shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <h1 className="text-3xl font-bold text-blue-700">DSA Problems Sheet</h1>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-600 text-sm">Track your Data Structures & Algorithms progress</p>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="mb-8 backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span>📊</span> Your Progress
            </h2>
            <div className="text-2xl font-bold text-blue-600">
              {completedCount}/{totalProblems} ({progressPercentage}%)
            </div>
          </div>
          
          <div className="w-full bg-gray-200/50 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-center text-sm">
            <div className="backdrop-blur-lg bg-white/20 rounded-xl p-3 border border-white/30">
              <div className="text-lg font-bold text-gray-800">{totalProblems}</div>
              <div className="text-gray-600">Total</div>
            </div>
            <div className="backdrop-blur-lg bg-white/20 rounded-xl p-3 border border-white/30">
              <div className="text-lg font-bold text-green-600">{completedCount}</div>
              <div className="text-gray-600">Completed</div>
            </div>
            <div className="backdrop-blur-lg bg-white/20 rounded-xl p-3 border border-white/30">
              <div className="text-lg font-bold text-orange-600">{totalProblems - completedCount}</div>
              <div className="text-gray-600">Remaining</div>
            </div>
            <div className="backdrop-blur-lg bg-white/20 rounded-xl p-3 border border-white/30">
              <div className="text-lg font-bold text-blue-600">{progressPercentage}%</div>
              <div className="text-gray-600">Complete</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">🔍 Search</label>
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 text-gray-800 placeholder-gray-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">📚 Topic</label>
              <select
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
                className="w-full px-4 py-2 backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 text-gray-800"
              >
                <option value="all">All Topics</option>
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">⚡ Difficulty</label>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="w-full px-4 py-2 backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 text-gray-800"
              >
                <option value="all">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="backdrop-blur-lg bg-white/20 rounded-2xl border border-white/30 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10 border-b border-white/20">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Problem</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Topic</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Difficulty</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Links</th>
                  {isAdmin && <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredProblems.length === 0 ? (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 5} className="px-6 py-8 text-center text-gray-500">
                      No problems found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProblems.map((problem) => (
                    <tr key={problem.id} className="hover:bg-white/10 transition-colors">
                      <td className="px-6 py-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={completedProblems.has(problem.id)}
                            onChange={() => handleToggleCompletion(problem.id)}
                            className="w-5 h-5 rounded border-2 border-white/30 text-blue-600 focus:ring-blue-500 focus:ring-2 bg-white/20"
                          />
                          {/* <span className="ml-2 text-sm text-gray-600">
                            {completedProblems.has(problem.id) ? '✅' : '⬜'}
                          </span> */}
                        </label>
                      </td>
                      <td className="px-6 py-4">
                        {editingProblem === problem.id ? (
                          <input
                            type="text"
                            value={editForm.problemTitle}
                            onChange={(e) => setEditForm({...editForm, problemTitle: e.target.value})}
                            className="w-full px-3 py-1 backdrop-blur-lg bg-white/20 border border-white/30 rounded-lg text-sm"
                          />
                        ) : (
                          <div className="font-medium text-gray-800">{problem.problemTitle}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingProblem === problem.id ? (
                          <input
                            type="text"
                            value={editForm.topic}
                            onChange={(e) => setEditForm({...editForm, topic: e.target.value})}
                            className="w-full px-3 py-1 backdrop-blur-lg bg-white/20 border border-white/30 rounded-lg text-sm"
                          />
                        ) : (
                          <span className="px-3 py-1 text-sm bg-blue-100/50 text-blue-700 rounded-full">
                            {problem.topic}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingProblem === problem.id ? (
                          <select
                            value={editForm.difficulty}
                            onChange={(e) => setEditForm({...editForm, difficulty: e.target.value})}
                            className="w-full px-3 py-1 backdrop-blur-lg bg-white/20 border border-white/30 rounded-lg text-sm"
                          >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                          </select>
                        ) : (
                          <span className={`px-3 py-1 text-sm rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                            {getDifficultyIcon(problem.difficulty)} {problem.difficulty}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {editingProblem === problem.id ? (
                            <>
                              <input
                                type="url"
                                value={editForm.link}
                                onChange={(e) => setEditForm({...editForm, link: e.target.value})}
                                placeholder="Problem link"
                                className="w-full px-3 py-1 backdrop-blur-lg bg-white/20 border border-white/30 rounded-lg text-sm mb-1"
                              />
                              <input
                                type="url"
                                value={editForm.solutionVideoLink}
                                onChange={(e) => setEditForm({...editForm, solutionVideoLink: e.target.value})}
                                placeholder="Video link (optional)"
                                className="w-full px-3 py-1 backdrop-blur-lg bg-white/20 border border-white/30 rounded-lg text-sm"
                              />
                            </>
                          ) : (
                            <>
                              <a 
                                href={problem.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                🔗 Problem
                              </a>
                              {problem.solutionVideoLink && (
                                <a 
                                  href={problem.solutionVideoLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                  🎥 Video
                                </a>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                      {isAdmin && (
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {editingProblem === problem.id ? (
                              <>
                                <button
                                  onClick={() => handleUpdateProblem(problem.id)}
                                  disabled={updateLoading}
                                  className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 disabled:opacity-50"
                                >
                                  {updateLoading ? '⏳' : '✅'}
                                </button>
                                <button
                                  onClick={cancelEditing}
                                  className="px-3 py-1 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600"
                                >
                                  ❌
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => startEditing(problem)}
                                  className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                                >
                                  ✏️
                                </button>
                                <button
                                  onClick={() => handleDeleteProblem(problem.id)}
                                  disabled={deleteLoading === problem.id}
                                  className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 disabled:opacity-50"
                                >
                                  {deleteLoading === problem.id ? '⏳' : '🗑️'}
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 text-center">
          <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30 shadow-xl">
            <p className="text-gray-600">
              Showing {filteredProblems.length} of {totalProblems} problems
              {filterTopic !== 'all' && ` • Topic: ${filterTopic}`}
              {filterDifficulty !== 'all' && ` • Difficulty: ${filterDifficulty}`}
              {searchTerm && ` • Search: "${searchTerm}"`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}