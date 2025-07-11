"use client";

import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase"; // adjust path if needed

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    department: "",
    rollNumber: "",
    startYear: "",
    endYear: "",
    resumeScore: 0,
    isAdmin: false,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCred.user;
        const profile = {
          email: formData.email,
          department: formData.department,
          rollNumber: formData.rollNumber,
          startYear: formData.startYear,
          endYear: formData.endYear,
          isAdmin: false,
          createdAt: new Date(),
        };

        await setDoc(doc(db, "users", user.uid), profile);

        alert("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert("Login successful!");
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => setIsSignUp((prev) => !prev)}
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full mt-1 px-4 py-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full mt-1 px-4 py-2 border rounded-md"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Sign Up Only Fields */}
        {isSignUp && (
          <>
            

            <div>
              <label className="block text-sm font-medium">Department</label>
              <input
                type="text"
                name="department"
                required
                className="w-full mt-1 px-4 py-2 border rounded-md"
                value={formData.department}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                required
                className="w-full mt-1 px-4 py-2 border rounded-md"
                value={formData.rollNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Start Year</label>
              <input
                type="number"
                name="startYear"
                required
                className="w-full mt-1 px-4 py-2 border rounded-md"
                value={formData.startYear}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">End Year</label>
              <input
                type="number"
                name="endYear"
                required
                className="w-full mt-1 px-4 py-2 border rounded-md"
                value={formData.endYear}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* Error */}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
