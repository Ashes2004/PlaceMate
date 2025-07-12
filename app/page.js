"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PlacementChatWidget from "@/components/PlacementChatWidget";
import TipOfTheDay from "@/components/TipOfTheDay";
import DashboardSkeleton from "@/components/homeLoader";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [score, setScore] = useState(0);
  const [userData, setUserData] = useState({});
  const [dsaData, setDsaData] = useState({
    totalProblem: 0,
    solvedProblem: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const resumeScore = localStorage.getItem("ResumeScore");
    if (resumeScore) {
      setScore(resumeScore);
    }
  }, []);

  // Load problems from Firebase
  useEffect(() => {
    const loadProblems = async () => {
      try {
        const q = query(
          collection(db, "dsaProblems"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);

        const problemsData = [];
        querySnapshot.forEach((doc) => {
          problemsData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        localStorage.setItem("totalDSAQuestions", problemsData.length);
        console.log("totalDSAQuestions", problemsData.length);
        const solvedProblems = JSON.parse(
          localStorage.getItem("completedProblems") || "[]"
        );

        if (problemsData) {
          setDsaData({
            totalProblem: problemsData.length,
            solvedProblem: solvedProblems.length,
          });
        }

        console.log("solved problems: ", solvedProblems);

        if (problemsData) {
          if (solvedProblems) {
            setDsaData({
              totalProblem: problemsData.length,
              solvedProblem: solvedProblems.length,
            });
          }
        }
      } catch (error) {
        console.error("Error loading problems:", error);
      }
    };

    loadProblems();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("userId");
    if (!user) {
      router.push("/auth");
    }
    const fetchUser = async () => {
      try {
        const docRef = doc(db, "users", user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(docSnap.data());
          setUserData(docSnap.data());
          localStorage.setItem("userRole", docSnap.data().isAdmin);
        } else {
          console.error("User not found.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    user && fetchUser();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "gdgEvents"));
        const today = new Date();

        const data = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((event) => new Date(event.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setEvents(data.slice(0, 2)); // Show only 2 upcoming events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Main loading effect - waits for all data to be loaded
  useEffect(() => {
    const checkLoadingStatus = () => {
      // Check if all essential data is loaded
      const user = localStorage.getItem("userId");
      const hasUserData = Object.keys(userData).length > 0;
      const hasDsaData = dsaData.totalProblem > 0 || dsaData.solvedProblem >= 0;
      
      if (user && hasUserData && hasDsaData) {
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    checkLoadingStatus();
  }, [userData, dsaData]);

  // Show skeleton loader while data is loading
  if (isLoading) {
    return <DashboardSkeleton />;
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
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {/* Glass overlay pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      <Header />

      <section className="p-6 md:p-24 pt-24 md:mt-10 max-w-6xl mx-auto relative z-10">
        {/* User Info Mobile - Glass Card */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:hidden">
          <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-4 border border-white/30 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/027/951/137/non_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-white/40 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {userData?.name || ""}
                </h1>
                <p className="text-blue-600 font-medium">
                  {userData?.department}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section - Glass Effect */}
        <div className="mb-6 backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl hidden md:block">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome back, {userData?.name || ""}
          </h2>
          <p className="text-gray-600">
            Ready to accelerate your placement journey?
          </p>
        </div>

        {/* Resume & Coding Cards - Premium Glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Resume Score Card */}
          <div className="backdrop-blur-lg bg-gradient-to-br from-white/25 to-white/10 rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex justify-between items-center">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <p className="text-blue-600 font-semibold">Resume Score</p>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {score}/100
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Your resume is well-structured but needs more impact.
                </p>
                <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  className="w-20 h-20 object-cover rounded-xl border border-white/40 shadow-lg"
                  alt="Resume"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x400/3b82f6/ffffff?text=📄")
                  }
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coding Challenges Card */}
          <div className="backdrop-blur-lg bg-gradient-to-br from-white/25 to-white/10 rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex justify-between items-center">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-green-600 font-semibold">
                    Coding Challenges
                  </p>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {dsaData.solvedProblem} / {dsaData.totalProblem}{" "}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Keep practicing to improve your coding skills.
                </p>
                <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${dsaData.totalProblem > 0 ? (dsaData.solvedProblem / dsaData.totalProblem) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  className="w-20 h-20 object-cover rounded-xl border border-white/40 shadow-lg"
                  alt="Coding"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x400/10b981/ffffff?text=💻")
                  }
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GDG Events Section - Premium Glass */}
        {events.length > 0 && (
          <div className="mb-10">
            <div className="backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-blue-600 flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                🌟 Upcoming GDG Events
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.slice(0, 2).map((event, index) => (
                  <div
                    key={event.id}
                    className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full md:w-32 h-32 object-cover rounded-lg border border-white/40 shadow-md"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/150x150/3b82f6/ffffff?text=GDG")
                      }
                    />
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {event.description}
                      </p>
                      <p className="text-sm mt-2">
                        <span className="font-medium text-blue-600 bg-blue-100/50 px-2 py-1 rounded-full">
                          {event.type}
                        </span>
                        <span className="text-gray-500 ml-2">
                          {new Date(event.date).toDateString()}
                        </span>
                      </p>
                      <div className="mt-3 flex gap-3 flex-wrap">
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors backdrop-blur-sm shadow-md"
                        >
                          Register
                        </a>
                        {index === 0 && (
                          <a
                            href="/gdg-events/dashboard"
                            className="px-4 py-2 backdrop-blur-sm bg-white/20 text-gray-700 border border-white/30 rounded-lg text-sm hover:bg-white/30 transition-colors"
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
          </div>
        )}

        {/* Quick Links - Premium Glass Grid */}
        <div className="mb-8">
          <div className="backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl">
            <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></span>
              Quick Links
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Placement Insights",
                  icon: "💼",
                  link: "/explore",
                  color: "blue",
                },
                {
                  label: "Resume Reviewer",
                  icon: "📄",
                  link: "/resumeReview",
                  color: "green",
                },
                {
                  label: "Coding Challenges",
                  icon: "</>",
                  link: "/dsaSheet/dashboard",
                  color: "purple",
                },
                {
                  label: "Interview Prep",
                  icon: "📺",
                  link: "/",
                  color: "orange",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-lg bg-white/20 rounded-xl px-4 py-6 text-center border border-white/30 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/30 group`}
                  onClick={() => router.push(item.link)}
                >
                  <div className="mb-3 text-3xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-800 group-hover:text-gray-900">
                    {item.label}
                  </p>
                  <div
                    className={`mt-2 h-1 bg-${item.color}-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tip of the Day - Glass Container */}
        <div className="backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl">
          <TipOfTheDay />
        </div>
      </section>

      <div className="h-20 md:h-0" />
      <PlacementChatWidget />
      <Footer />
    </div>
  );
}