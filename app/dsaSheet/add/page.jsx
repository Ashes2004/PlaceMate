"use client"
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";

export default function AddDSAProblem() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    problemTitle: "",
    topic: "",
    link: "",
    difficulty: "",
    solutionVideoLink: "",
  });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ Easy: 0, Medium: 0, Hard: 0 });

  // Check admin status on component mount
  useEffect(() => {
    const checkAdminStatus = () => {
      try {
        const adminStatus = localStorage.getItem('userRole');
        if (adminStatus === 'true') {
          setIsAdmin(true);
        } else {
          // Redirect to home page if not admin
          window.location.href = '/';
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
        window.location.href = '/';
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  // Load stats from Firebase
  useEffect(() => {
    const loadStats = async () => {
      try {
        const q = query(collection(db, "dsaProblems"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const statsCount = { Easy: 0, Medium: 0, Hard: 0 };
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.difficulty && statsCount.hasOwnProperty(data.difficulty)) {
            statsCount[data.difficulty]++;
          }
        });
        
        setStats(statsCount);
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    };

    if (isAdmin) {
      loadStats();
    }
  }, [isAdmin, success]); // Reload stats when a new problem is added

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!form.problemTitle || !form.topic || !form.link || !form.difficulty) {
      setError("❌ Please fill in all required fields.");
      setSubmitLoading(false);
      return;
    }

    try {
      // Create new problem object
      const newProblem = {
        problemTitle: form.problemTitle.trim(),
        topic: form.topic.trim(),
        link: form.link.trim(),
        difficulty: form.difficulty,
        solutionVideoLink: form.solutionVideoLink.trim() || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, "dsaProblems"), newProblem);
      
      console.log("Document written with ID: ", docRef.id);
      
      setSuccess("✅ DSA problem added successfully!");
      setForm({
        problemTitle: "",
        topic: "",
        link: "",
        difficulty: "",
        solutionVideoLink: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 5000);

    } catch (err) {
      console.error('Error adding DSA problem:', err);
      setError("❌ Failed to add DSA problem. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Show loading while checking admin status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 border border-white/30 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <span className="text-blue-700 font-medium">Checking authentication...</span>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if not admin (though redirect should happen)
  if (!isAdmin) {
    return null;
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

     <Header/>
      
      <div className="max-w-2xl mx-auto py-10 px-4 relative z-10 pt-24">
        {/* Title Section - Glass Effect */}
        <div className="text-center mb-8">
          <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30 shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <h1 className="text-3xl font-bold text-blue-700">Add DSA Problem</h1>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-600 text-sm">Create and manage your Data Structures & Algorithms problems</p>
          </div>
        </div>

        {/* Success/Error Messages - Glass Cards */}
        {success && (
          <div className="mb-6 backdrop-blur-lg bg-green-50/40 border border-green-200/50 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-700 font-medium">{success}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 backdrop-blur-lg bg-red-50/40 border border-red-200/50 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Form Container - Premium Glass */}
        <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 border border-white/30 shadow-xl">
          <div className="space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input 
                  label="Problem Title*" 
                  name="problemTitle" 
                  value={form.problemTitle} 
                  onChange={handleChange}
                  icon="🎯"
                  placeholder="Two Sum, Binary Search, etc."
                />
              </div>
              
              <Input 
                label="Topic*" 
                name="topic" 
                value={form.topic} 
                onChange={handleChange}
                icon="📚"
                placeholder="Arrays, Trees, Graphs, etc."
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span>⚡</span>
                  Difficulty Level*
                </label>
                <div className="relative">
                  <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                    className="
                      w-full px-4 py-3 backdrop-blur-lg bg-white/20 
                      border border-white/30 rounded-xl 
                      focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50
                      text-gray-800 appearance-none cursor-pointer
                      shadow-lg transition-all duration-300
                      hover:bg-white/30 focus:bg-white/30
                    "
                  >
                    <option value="">Select difficulty...</option>
                    <option value="Easy">🟢 Easy</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Hard">🔴 Hard</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Input 
                  label="Problem Link*" 
                  name="link" 
                  value={form.link} 
                  onChange={handleChange}
                  icon="🔗"
                  placeholder="https://leetcode.com/problems/..."
                />
              </div>
              
              <div className="md:col-span-2">
                <Input 
                  label="Solution Video Link" 
                  name="solutionVideoLink" 
                  value={form.solutionVideoLink} 
                  onChange={handleChange}
                  icon="🎥"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>

            {/* Submit Button - Premium Glass */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={submitLoading}
                className={`
                  w-full backdrop-blur-lg bg-gradient-to-r from-blue-500/80 to-blue-600/80 
                  hover:from-blue-600/90 hover:to-blue-700/90 
                  text-white font-semibold py-4 px-8 rounded-xl 
                  border border-blue-400/30 shadow-xl
                  transition-all duration-300 transform hover:scale-105
                  ${submitLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl'}
                  flex items-center justify-center gap-3
                `}
              >
                {submitLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Adding Problem...</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>Add DSA Problem</span>
                    <span>🚀</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tips - Glass Card */}
        <div className="mt-8 backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>💡</span> Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Use descriptive problem titles to help students identify the problem type</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Categorize problems by topic (Arrays, Trees, DP, etc.) for better organization</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Test all links before submitting to ensure they work correctly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Solution videos are optional but highly recommended for complex problems</span>
            </li>
          </ul>
        </div>

        {/* Stats Card */}
        <div className="mt-6 backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>📊</span> Current Stats
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="backdrop-blur-lg bg-white/20 rounded-xl p-3 border border-white/30">
              <div className="text-2xl font-bold text-green-600">
                {stats.Easy}
              </div>
              <div className="text-xs text-gray-600">Easy</div>
            </div>
            <div className="backdrop-blur-lg bg-white/20 rounded-xl p-3 border border-white/30">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.Medium}
              </div>
              <div className="text-xs text-gray-600">Medium</div>
            </div>
            <div className="backdrop-blur-lg bg-white/20 rounded-xl p-3 border border-white/30">
              <div className="text-2xl font-bold text-red-600">
                {stats.Hard}
              </div>
              <div className="text-xs text-gray-600">Hard</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", icon, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full px-4 py-3 backdrop-blur-lg bg-white/20 
            border border-white/30 rounded-xl 
            focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50
            placeholder-gray-500 text-gray-800
            shadow-lg transition-all duration-300
            hover:bg-white/30 focus:bg-white/30
          "
        />
      </div>
    </div>
  );
}