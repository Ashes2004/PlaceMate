"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Building, Calendar, MapPin, Briefcase, DollarSign, User, Clock, BookOpen, Lightbulb } from "lucide-react";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "@/components/Header";

// Text formatter component to handle automatic formatting
const FormattedText = ({ text, className = "" }) => {
  if (!text) return null;

  // Split text into paragraphs based on double line breaks or periods followed by spaces
  const formatText = (text) => {
    // First, handle explicit line breaks
    let formatted = text.replace(/\\n/g, '\n');
    
    // Split by double line breaks first (paragraphs)
    const paragraphs = formatted.split(/\n\n+/);
    
    return paragraphs.map((paragraph, index) => {
      // Handle single line breaks within paragraphs
      const lines = paragraph.split(/\n/);
      
      return (
        <div key={index} className={`mb-4 ${index === paragraphs.length - 1 ? 'mb-0' : ''}`}>
          {lines.map((line, lineIndex) => {
            // Check if line looks like a list item
            const isListItem = /^[\d\w\-\•\*]\s*[\.\)\-\:]/.test(line.trim()) || line.trim().startsWith('•') || line.trim().startsWith('-');
            
            if (isListItem) {
              return (
                <div key={lineIndex} className="ml-4 mb-2 flex">
                  <span className="text-blue-600 mr-2 font-medium">•</span>
                  <span className="flex-1">{line.replace(/^[\d\w\-\•\*]\s*[\.\)\-\:]?\s*/, '')}</span>
                </div>
              );
            }
            
            // Check if line looks like a heading (all caps, numbers, or ends with colon)
            const isHeading = /^[\dA-Z\s\-\(\)]+:?\s*$/.test(line.trim()) && line.trim().length < 80;
            
            if (isHeading && lineIndex === 0) {
              return (
                <h4 key={lineIndex} className="font-semibold text-gray-900 mb-2">
                  {line.trim()}
                </h4>
              );
            }
            
            return (
              <p key={lineIndex} className={`${lineIndex > 0 ? 'mt-2' : ''}`}>
                {line}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className={`prose prose-gray max-w-none ${className}`}>
      {formatText(text)}
    </div>
  );
};

const InterviewDetailPage = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "interviewExperiences", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setExperience({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Experience not found.");
        }
      } catch (err) {
        console.error("Error fetching interview experience:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExperience();
    }
  }, [id]);

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
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
        
        <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 border border-white/30 shadow-xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading interview experience...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
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
        
        <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 border border-white/30 shadow-xl max-w-md">
          <p className="text-red-600 mb-6 font-medium">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
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
        
        <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 border border-white/30 shadow-xl">
          <p className="text-gray-700 font-medium">Experience not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
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
       
       
      }}
    >
      <Header/>
      {/* Glass overlay pattern */}
      <div 
        className="absolute inset-0 opacity-20 "
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="max-w-4xl mx-auto px-6 py-8 relative z-10 pt-24">
        {/* Back Button - Glass Style */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center backdrop-blur-lg bg-white/20 hover:bg-white/30 text-gray-800 hover:text-blue-600 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 border border-white/30 shadow-lg"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Experiences
          </button>
        </div>

        {/* Header Card - Premium Glass */}
        <div className="backdrop-blur-lg bg-white/20 rounded-2xl border border-white/30 shadow-xl p-8 mb-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {experience.role}
              </h1>
              <div className="flex items-center text-xl text-gray-700 mb-2">
                <div className="p-2 bg-blue-100/50 rounded-lg mr-3">
                  <Building size={20} className="text-blue-600" />
                </div>
                <span className="font-medium">{experience.company}</span>
              </div>
            </div>
            <div className="ml-4">
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                {experience.type}
              </span>
            </div>
          </div>

          {/* Quick Info Grid - Enhanced Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-sm bg-white/30 rounded-xl p-4 border border-white/40 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-md">
                  <DollarSign size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Package</p>
                  <p className="font-bold text-gray-900 text-lg">{experience.ctc || "Not specified"}</p>
                </div>
              </div>
            </div>
            
            <div className="backdrop-blur-sm bg-white/30 rounded-xl p-4 border border-white/40 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-md">
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Year</p>
                  <p className="font-bold text-gray-900 text-lg">{experience.year}</p>
                </div>
              </div>
            </div>
            
            <div className="backdrop-blur-sm bg-white/30 rounded-xl p-4 border border-white/40 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl shadow-md">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Campus</p>
                  <p className="font-bold text-gray-900 text-lg">{experience.onCampus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section - Glass Card */}
        {experience.description && (
          <div className="backdrop-blur-lg bg-white/20 rounded-2xl border border-white/30 shadow-xl p-8 mb-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl shadow-md mr-4">
                <BookOpen size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">About the Role</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
              </div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20">
              <FormattedText 
                text={experience.description} 
                className="text-gray-800 leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Interview Experience Section - Glass Card */}
        {experience.interviewExperience && (
          <div className="backdrop-blur-lg bg-white/20 rounded-2xl border border-white/30 shadow-xl p-8 mb-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl shadow-md mr-4">
                <User size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Interview Experience</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2"></div>
              </div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20">
              <FormattedText 
                text={experience.interviewExperience} 
                className="text-gray-800 leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Tips Section - Glass Card */}
        {experience.tips && (
          <div className="backdrop-blur-lg bg-white/20 rounded-2xl border border-white/30 shadow-xl p-8 mb-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-md mr-4">
                <Lightbulb size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Tips & Advice</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full mt-2"></div>
              </div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20">
              <FormattedText 
                text={experience.tips} 
                className="text-gray-800 leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Bottom Action - Glass Button */}
        <div className="text-center">
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
          >
            Back to All Experiences
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetailPage;