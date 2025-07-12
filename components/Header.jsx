import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`flex fixed top-0 w-full justify-between items-center px-4 md:px-36 py-2 border-b z-50 transition-all duration-300 ${
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

        {/* Desktop Navigation with Glass Pills */}
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

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center gap-4">
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
            <Link href='/profile' className="relative">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white/30 hover:scale-110 transition-all duration-300 cursor-pointer">
                U
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
            </Link>

            {/* Profile Dropdown Indicator */}
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

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden mobile-menu-button rounded-lg p-2 border shadow-md transition-all duration-300 ${
              isScrolled 
                ? 'bg-white/80 border-gray-200 hover:bg-white' 
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 relative pr-6">
              <span className={`absolute h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? 'top-3 rotate-45' : 'top-1'
              }`}></span>
              <span className={`absolute h-0.5 w-6 bg-gray-700 top-3 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? 'top-3 -rotate-45' : 'top-5'
              }`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        
        {/* Menu Panel */}
        <div className={`mobile-menu absolute top-20 right-0 h-[calc(100vh-5rem)] w-80 max-w-[85vw] bg-white/10 backdrop-blur-md border-l border-white/20 shadow-2xl transform transition-all duration-300 rounded-tl-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="bg-white/10 rounded-lg px-3 py-1 border border-white/20">
              <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            </div>
            {/* <button 
              onClick={closeMobileMenu}
              className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
              aria-label="Close mobile menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button> */}
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-b border-white/20">
            <Link href='/profile' onClick={closeMobileMenu} className="flex items-center gap-3 hover:bg-white/10 rounded-lg p-3 transition-all duration-300 border border-white/20 bg-white/5">
              <div className="relative">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white/30">
                  U
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div>
                <p className="font-medium text-gray-800">User Profile</p>
                <p className="text-sm text-gray-600">View your profile</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-3 flex-1">
            <Link 
              href="/" 
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 text-gray-700 font-medium shadow-sm"
            >
              <span className="text-xl">🏠</span>
              Home
            </Link>
            <Link 
              href="/explore" 
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 text-gray-700 font-medium shadow-sm"
            >
              <span className="text-xl">🔍</span>
              Explore
            </Link>
            <Link 
              href="/resumeReview" 
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 text-gray-700 font-medium shadow-sm"
            >
              <span className="text-xl">📄</span>
              Resume
            </Link>
            <Link 
              href="/challenges" 
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 text-gray-700 font-medium shadow-sm"
            >
              <span className="text-xl">🎯</span>
              Challenges
            </Link>
            <Link 
              href="/gdg-events/dashboard" 
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 text-gray-700 font-medium shadow-sm"
            >
              <span className="text-xl">🚀</span>
              GDG-TMSL
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}