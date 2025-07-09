"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PlacementChatWidget from "@/components/PlacementChatWidget";
import TipOfTheDay from "@/components/TipOfTheDay";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [score , setScore] = useState(0);
  useEffect(()=>{
    const resumeScore = localStorage.getItem('ResumeScore');
    if(resumeScore)
    {
      setScore(resumeScore);
    }
  } , []);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "gdgEvents"));
        const today = new Date();

        const data = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((event) => new Date(event.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setEvents(data.slice(0, 1)); // Show only 1 upcoming event
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      <Header />
      <h1 className="text-2xl font-bold md:hidden px-2 py-3">
        Place<span className="text-blue-600">Mate</span>
      </h1>

      <section className="p-6 md:p-12 md:mt-10 max-w-6xl mx-auto">
        {/* User Info Mobile */}
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
        </div>

        {/* Welcome */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Welcome back, Ethan</h2>
        </div>

        {/* Resume & Coding Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Resume Score */}
          <div className="p-4 rounded-xl border-2 border-gray-400 flex justify-between items-center">
            <div className="flex-1 pr-4">
              <p className="text-blue-600 font-medium">Resume Score</p>
              <h3 className="text-lg font-bold mt-1">{score}/100</h3>
              <p className="text-gray-600 text-[13px] mt-1">
                Your resume is well-structured but needs more impact.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              className="w-20 h-20 object-cover rounded-md"
              alt="Resume"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/400x400/3b82f6/ffffff?text=📄")
              }
            />
          </div>

          {/* Coding Challenges */}
          <div className="p-4 rounded-xl border-2 border-gray-400 flex justify-between items-center">
            <div className="flex-1 pr-4">
              <p className="text-blue-600 font-medium">Coding Challenges</p>
              <h3 className="text-lg font-bold mt-1">3/5 Completed</h3>
              <p className="text-gray-600 text-[13px] mt-1">
                Keep practicing to improve your coding skills.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              className="w-20 h-20 object-cover rounded-md"
              alt="Coding"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/400x400/10b981/ffffff?text=💻")
              }
            />
          </div>
        </div>

      {/* ✅ Upcoming GDG Events Section */}
{events.length > 0 && (
  <div className="mb-10">
    <h3 className="text-xl font-bold mb-4 text-blue-600">
      🌟 Upcoming GDG Events
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
      {events.slice(0, 2).map((event, index) => (
        <div
          key={event.id}
          className="bg-white border border-blue-200 rounded-xl p-4  flex flex-col md:flex-row items-center gap-4 shadow-sm hover:shadow-md transition"
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full md:w-32 h-32 object-cover rounded-lg"
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/150x150/3b82f6/ffffff?text=GDG")
            }
          />
          <div className="flex-1">
            <h4 className="text-lg font-semibold">{event.title}</h4>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {event.description}
            </p>
            <p className="text-sm mt-2">
              <span className="font-medium text-blue-500">{event.type}</span>{" "}
              ·{" "}
              <span className="text-gray-500">
                {new Date(event.date).toDateString()}
              </span>
            </p>
            <div className="mt-3 flex gap-3 flex-wrap">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
              >
                Register
              </a>
              {index === 0 && (
                <a
                  href="/gdg-events/dashboard"
                  className="px-4 py-2 bg-gray-100 text-gray-700 border rounded-md text-sm hover:bg-gray-200"
                >
                  View All Events →
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


        {/* Quick Links */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Placement Insights", icon: "💼" , link: "/explore"},
              { label: "Resume Reviewer", icon: "📄"  , link : "/resumeReview"},
              { label: "Coding Challenges", icon: "</>" , link : "/" },
              { label: "Interview Prep", icon: "📺" , link : "/" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg px-4 py-5 text-center border hover:shadow-md cursor-pointer"
                onClick={()=>router.push(item.link)}
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

      <div className="h-20 md:h-0" />
      <PlacementChatWidget />
      <Footer />
    </div>
  );
}
