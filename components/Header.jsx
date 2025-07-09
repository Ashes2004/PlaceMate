


import React from "react";
import Link from "next/link";



export default function Header() {
  return (
    <header className="md:flex fixed top-0 w-screen justify-between items-center px-8 py-3 border-b bg-gray-50 hidden ">
      <h1 className="text-2xl font-bold">Place<span className="text-blue-600">Mate</span></h1>
      <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
        <Link href="/" className= "hover:text-black  hover:font-bold">Home</Link>
        <Link href="/explore" className= "hover:text-black hover:font-bold">Explore</Link>
        <Link href="/resumeReview" className= "hover:text-black hover:font-bold">Resume</Link>
        <Link href="/challenges" className= "hover:text-black hover:font-bold">Challenges</Link>
        <Link href="/gdg-events/dashboard" className= "hover:text-black hover:font-bold">GDG-TMSL</Link>

      </nav>
      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="text-xl">🔔</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>
       <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
          U
        </div>
      </div>

   
    </header>
  );
}
