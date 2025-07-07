"use client";

import React from "react";

export default function Dashboard() {
  return (
    <section className="p-6 md:p-12 max-w-6xl mx-auto">
      {/* Header: Avatar + Name + Course */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <img
            src="/avatar.png"
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">Ethan Carter</h1>
            <p className="text-blue-600 font-medium">Computer Science</p>
          </div>
        </div>
        <button className="hidden md:block text-gray-600 hover:text-black">
          ⚙️ Settings
        </button>
      </div>

      {/* Welcome */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Welcome back, Ethan</h2>
      </div>

      {/* Resume & Challenge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Resume Score */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center">
          <div>
            <p className="text-blue-600 font-medium">Resume Score</p>
            <h3 className="text-2xl font-bold mt-1">78/100</h3>
            <p className="text-gray-600 text-sm mt-1">
              Your resume is well-structured but needs more impact.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1613061361126-13e4f2120ea6"
            className="w-24 h-24 object-cover rounded-md"
            alt="Resume"
          />
        </div>

        {/* Coding Challenge */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center">
          <div>
            <p className="text-blue-600 font-medium">Coding Challenges</p>
            <h3 className="text-2xl font-bold mt-1">3/5 Completed</h3>
            <p className="text-gray-600 text-sm mt-1">
              Keep practicing to improve your coding skills.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1603575448362-d0466e8aa69e"
            className="w-24 h-24 object-cover rounded-md"
            alt="Coding"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Placement Insights", icon: "💼" },
            { label: "Resume Builder", icon: "📄" },
            { label: "Coding Challenges", icon: "</>" },
            { label: "Interview Prep", icon: "📺" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg px-4 py-5 text-center border hover:shadow-md cursor-pointer"
            >
              <p className="text-2xl mb-2">{item.icon}</p>
              <p className="text-sm font-medium text-gray-800">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tip of the Day */}
      <div>
        <h3 className="font-bold text-lg mb-4">Tip of the Day</h3>
        <div className="rounded-xl overflow-hidden relative h-48 sm:h-56 lg:h-64 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1636486781680-5f11e7e8c33f"
            alt="Tip Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
            <p className="text-white text-lg font-semibold mb-1">
              Focus on projects that demonstrate problem-solving skills.
            </p>
            <p className="text-gray-300 text-sm">AI-generated tip</p>
          </div>
        </div>
      </div>
    </section>
  );
}
