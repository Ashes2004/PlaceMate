"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TipOfTheDay from "@/components/TipOfTheDay";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      <Header />
      <h1 className="text-2xl font-bold md:hidden px-2 py-3">Place<span className="text-blue-600">Mate</span></h1>
      <section className="p-6 md:p-12 md:mt-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:hidden">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
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
          <h2 className="text-2xl font-semibold">Welcome back, Ethan</h2>
        </div>

        {/* Resume & Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Resume Score */}
          <div className="p-4 rounded-xl border-2 border-gray-400 flex justify-between items-center">
            <div className="flex-1 pr-4">
              <p className="text-blue-600 font-medium">Resume Score</p>
              <h3 className="text-lg font-bold mt-1">78/100</h3>
              <p className="text-gray-600 text-[13px] mt-1">
                Your resume is well-structured but needs more impact.
              </p>
            </div>
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                className="w-20 h-20 object-cover rounded-md"
                alt="Resume"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x400/3b82f6/ffffff?text=📄";
                }}
              />
            </div>
          </div>
          {/* Coding Challenge */}
          <div className="p-4 rounded-xl border-2 border-gray-400 flex justify-between items-center">
            <div className="flex-1 pr-4">
              <p className="text-blue-600 font-medium">Coding Challenges</p>
              <h3 className="text-lg font-bold mt-1">3/5 Completed</h3>
              <p className="text-gray-600 text-[13px] mt-1">
                Keep practicing to improve your coding skills.
              </p>
            </div>
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                className="w-20 h-20 object-cover rounded-md"
                alt="Coding"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x400/10b981/ffffff?text=💻";
                }}
              />
            </div>
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

        <TipOfTheDay />
      </section>
      <div className="h-20 md:h-0"/>

      
      <Footer/>
    </div>
  );
}