"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { db } from "@/utils/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

export default function UserProfile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if we're in a browser environment
        if (typeof window === 'undefined') return;
        
        const user = localStorage.getItem("userId");
        if (!user) {
          router.push("/auth");
          return;
        }

        const docRef = doc(db, "users", user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(data);
          
          // Process the data to handle any Firebase Timestamp objects
          const processedData = {
            ...data,
            createdAt: data.createdAt // Keep original for processing later
          };
          
          setUserData(processedData);
          setEditData(processedData); // Initialize editData with userData
        } else {
          setError("User not found.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Calculate academic progress and year only when userData is available
  const getAcademicInfo = () => {
    if (!userData || !userData.startYear || !userData.endYear) {
      return { academicProgress: 0, academicYear: "N/A" };
    }

    const currentYear = new Date().getFullYear();
    const totalYears = parseInt(userData.endYear) - parseInt(userData.startYear);
    const completedYears = currentYear - parseInt(userData.startYear);
    const academicProgress = Math.min(Math.max((completedYears / totalYears) * 100, 0), 100);

    // Get academic year status
    const yearsPassed = currentYear - parseInt(userData.startYear);
    let academicYear;
    if (yearsPassed < 1) academicYear = "1st Year";
    else if (yearsPassed < 2) academicYear = "2nd Year";
    else if (yearsPassed < 3) academicYear = "3rd Year";
    else if (yearsPassed < 4) academicYear = "4th Year";
    else academicYear = "Graduate";

    return { academicProgress, academicYear };
  };

  const { academicProgress, academicYear } = getAcademicInfo();

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const handleSave = async () => {
    try {
      // Here you would typically update the Firebase database
      // Example: await updateDoc(doc(db, "users", localStorage.getItem("userId")), editData);
      
      setUserData({ ...editData });
      setIsEditing(false);
      
      // You might want to show a success message here
      console.log("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Helper function to format Firebase Timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    // Check if it's a Firebase Timestamp object
    if (timestamp && typeof timestamp === 'object' && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString();
    }
    
    // Check if it's already a formatted string
    if (typeof timestamp === 'string') {
      return timestamp;
    }
    
    // Check if it's a Date object
    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString();
    }
    
    return 'N/A';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌</div>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Don't render if userData is null
  if (!userData) {
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
      
      <Header />
      
      {/* Back Navigation */}
      <div className="p-6 md:p-12 max-w-6xl mx-auto">
       

        {/* Profile Header */}
        <div className="mt-24 backdrop-blur-lg bg-gradient-to-br from-white/25 to-white/10 rounded-2xl p-8 border border-white/30 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              {userData.isAdmin && (
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-sm">★</span>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-800">{userData.name || 'User'}</h1>
                {userData.isAdmin && (
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-blue-600 font-semibold text-lg mb-2">{userData.department || 'N/A'}</p>
              <p className="text-gray-600 mb-4">Roll Number: {userData.rollNumber || 'N/A'}</p>
              
              {/* Academic Status */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-800">{academicYear}</span>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors shadow-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Information */}
            <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2 backdrop-blur-sm bg-white/30 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                      {userData.name || 'N/A'}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2 backdrop-blur-sm bg-white/30 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                      {userData.email || 'N/A'}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                  <p className="text-gray-800 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                    {userData.rollNumber || 'N/A'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  {isEditing ? (
                    <select
                      value={editData.department || ''}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full px-4 py-2 backdrop-blur-sm bg-white/30 border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Department</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                      {userData.department || 'N/A'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Academic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                  <p className="text-gray-800 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                    {userData.startYear || 'N/A'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                  <p className="text-gray-800 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                    {userData.endYear || 'N/A'}
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Progress</label>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-gray-800">{Math.round(academicProgress)}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${academicProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Quick Actions */}
          <div className="space-y-6">
            
            {/* Account Stats */}
            <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                Account Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Member Since</span>
                  <span className="font-medium text-gray-800">
                    {formatTimestamp(userData.createdAt)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Account Type</span>
                  <span className={`font-medium ${userData.isAdmin ? 'text-yellow-600' : 'text-blue-600'}`}>
                    {userData.isAdmin ? 'Admin' : 'Student'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Status</span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">Active</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                {[
                  { label: "Change Password", icon: "🔒", action: () => console.log("Change Password") },
                  { label: "Privacy Settings", icon: "🛡️", action: () => console.log("Privacy Settings") },
                  { label: "Download Data", icon: "📥", action: () => console.log("Download Data") },
                  { label: "Help & Support", icon: "❓", action: () => console.log("Help & Support") },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full flex items-center gap-3 p-3 backdrop-blur-sm bg-white/10 rounded-lg border border-white/30 hover:bg-white/20 transition-colors"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-gray-800 font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Placement Progress */}
            <div className="backdrop-blur-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl p-6 border border-white/30 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                Placement Journey
              </h3>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {academicYear}
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Ready to accelerate your career preparation!
                </p>
                
                <button
                  onClick={() => router.push('/placement-dashboard')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                  View Placement Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20" />
      <Footer />
    </div>
  );
}