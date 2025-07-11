import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`md:flex fixed top-0 w-screen justify-between items-center px-36 py-2 border-b hidden z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 border-gray-200 shadow-lg backdrop-blur-md' 
          : 'bg-transparent border-white/30'
      }`}
    >
      {/* Logo with Glass Effect */}
      <div className={`rounded-lg px-3 py-1 border shadow-md transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 border-gray-200' 
          : 'bg-white/10 border-white/20'
      }`}>
        <h1 className="text-xl font-bold text-gray-800">
          Place<span className="text-blue-600">Mate</span>
        </h1>
      </div>

      {/* Navigation with Glass Pills */}
      <nav className="hidden md:flex gap-2 text-gray-700 font-medium">
        <Link 
          href="/" 
          className={`relative px-3 py-1 rounded-xl border transition-all duration-300 hover:text-gray-900 hover:font-semibold hover:scale-105 hover:shadow-md group ${
            isScrolled 
              ? 'bg-white/80 border-gray-200 hover:bg-white' 
              : 'bg-white/10 border-white/20 hover:bg-white/20'
          }`}
        >
          Home
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
        </Link>
        <Link 
          href="/explore" 
          className={`relative px-3 py-1 rounded-xl border transition-all duration-300 hover:text-gray-900 hover:font-semibold hover:scale-105 hover:shadow-md group ${
            isScrolled 
              ? 'bg-white/80 border-gray-200 hover:bg-white' 
              : 'bg-white/10 border-white/20 hover:bg-white/20'
          }`}
        >
          Explore
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
        </Link>
        <Link 
          href="/resumeReview" 
          className={`relative px-3 py-1 rounded-xl border transition-all duration-300 hover:text-gray-900 hover:font-semibold hover:scale-105 hover:shadow-md group ${
            isScrolled 
              ? 'bg-white/80 border-gray-200 hover:bg-white' 
              : 'bg-white/10 border-white/20 hover:bg-white/20'
          }`}
        >
          Resume
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
        </Link>
        <Link 
          href="/challenges" 
          className={`relative px-3 py-1 rounded-xl border transition-all duration-300 hover:text-gray-900 hover:font-semibold hover:scale-105 hover:shadow-md group ${
            isScrolled 
              ? 'bg-white/80 border-gray-200 hover:bg-white' 
              : 'bg-white/10 border-white/20 hover:bg-white/20'
          }`}
        >
          Challenges
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
        </Link>
        <Link 
          href="/gdg-events/dashboard" 
          className={`relative px-3 py-1 rounded-xl border transition-all duration-300 hover:text-gray-900 hover:font-semibold hover:scale-105 hover:shadow-md group ${
            isScrolled 
              ? 'bg-white/80 border-gray-200 hover:bg-white' 
              : 'bg-white/10 border-white/20 hover:bg-white/20'
          }`}
        >
          GDG-TMSL
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
        </Link>
      </nav>

      {/* User Actions with Glass Effect */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className={`relative rounded-full p-2 border shadow-md transition-all duration-300 hover:scale-110 cursor-pointer group ${
          isScrolled 
            ? 'bg-white/80 border-gray-200 hover:bg-white' 
            : 'bg-white/10 border-white/20 hover:bg-white/20'
        }`}>
          <span className="text-xl group-hover:animate-pulse">🔔</span>
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg animate-pulse">
            3
          </span>
        </div>

        {/* User Avatar */}
        <div className="relative">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white/30 hover:scale-110 transition-all duration-300 cursor-pointer">
            U
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
        </div>

        {/* Optional: Profile Dropdown Indicator */}
        <div className={`rounded-lg p-1 border shadow-md transition-all duration-300 cursor-pointer ${
          isScrolled 
            ? 'bg-white/80 border-gray-200 hover:bg-white' 
            : 'bg-white/10 border-white/20 hover:bg-white/20'
        }`}>
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
}