"use client"
import React, { useState } from "react";
import { Eye, EyeOff, MapPin, Users, Building, Calendar } from "lucide-react";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    department: "",
    rollNumber: "",
    startYear: "",
    endYear: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // Simulate Firebase signup
        // const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        // const user = userCred.user;
        
        // const profile = {
        //   email: formData.email,
        //   department: formData.department,
        //   rollNumber: formData.rollNumber,
        //   startYear: formData.startYear,
        //   endYear: formData.endYear,
        //   isAdmin: false,
        //   createdAt: new Date(),
        // };
        
        // await setDoc(doc(db, "users", user.uid), profile);
        
        // Save user ID to localStorage
        // localStorage.setItem('userId', user.uid);
        
        // For demo purposes, simulate successful signup
        const mockUserId = 'user_' + Date.now();
        console.log('Would save to localStorage:', mockUserId);
        
        alert("Account created successfully!");
      } else {
        // Simulate Firebase login
        // await signInWithEmailAndPassword(auth, formData.email, formData.password);
        
        // Save user ID to localStorage after successful login
        // localStorage.setItem('userId', userCredential.user.uid);
        
        // For demo purposes, simulate successful login
        const mockUserId = 'user_' + Date.now();
        console.log('Would save to localStorage:', mockUserId);
        
        alert("Login successful!");
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const backgroundStyle = {
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
  };

  return (
    <div className="min-h-screen flex" style={backgroundStyle}>
      {/* Left side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-r-3xl"></div>
        <div className="relative z-10 text-center">
          <div className="mb-8">
            
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Place<span className="text-blue-600">Mate</span></h1>
            <p className="text-lg text-gray-600">Your Campus Placement Companion</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4 bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Connect & Network</h3>
                <p className="text-sm text-gray-600">Build meaningful connections with peers and alumni</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Track GDG Opportunities</h3>
                <p className="text-sm text-gray-600">Stay updated with latest GDG opportunities</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Learn & Prepare</h3>
                <p className="text-sm text-gray-600">Learn and Practice Interview Problems</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
             
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Place<span className="text-blue-600">Mate</span></h2>
              <p className="text-gray-600">Your Campus Placement Companion</p>
            </div>

            {/* Tab Switch */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  !isSignUp 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setIsSignUp(false)}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  isSignUp 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setIsSignUp(true)}
              >
                Register
              </button>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Sign Up Only Fields */}
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <input
                      type="text"
                      name="department"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="e.g., Computer Science"
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                    <input
                      type="text"
                      name="rollNumber"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your roll number"
                      value={formData.rollNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
                      <input
                        type="number"
                        name="startYear"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="2020"
                        value={formData.startYear}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Year</label>
                      <input
                        type="number"
                        name="endYear"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="2024"
                        value={formData.endYear}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
              >
                {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
              </button>
            </div>

            {!isSignUp && (
              <div className="text-center mt-4">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;