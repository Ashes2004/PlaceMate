"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Building, Calendar, MapPin, Briefcase, DollarSign, User, Clock, BookOpen, Lightbulb } from "lucide-react";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interview experience...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md">
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Experience not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium transition-colors duration-200"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Experiences
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {experience.role}
              </h1>
              <p className="text-xl text-gray-600 flex items-center">
                <Building size={20} className="mr-2" />
                {experience.company}
              </p>
            </div>
            <span className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full">
              {experience.type}
            </span>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Package</p>
                <p className="font-semibold text-gray-900">{experience.ctc || "Not specified"}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-semibold text-gray-900">{experience.year}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Campus</p>
                <p className="font-semibold text-gray-900">{experience.onCampus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {experience.description && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-gray-100 rounded-lg mr-3">
                <BookOpen size={20} className="text-gray-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">About the Role</h2>
            </div>
            <FormattedText 
              text={experience.description} 
              className="text-gray-700 leading-relaxed"
            />
          </div>
        )}

        {/* Interview Experience Section */}
        {experience.interviewExperience && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-orange-100 rounded-lg mr-3">
                <User size={20} className="text-orange-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Interview Experience</h2>
            </div>
            <FormattedText 
              text={experience.interviewExperience} 
              className="text-gray-700 leading-relaxed"
            />
          </div>
        )}

        {/* Tips Section */}
        {experience.tips && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                <Lightbulb size={20} className="text-yellow-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Tips & Advice</h2>
            </div>
            <FormattedText 
              text={experience.tips} 
              className="text-gray-700 leading-relaxed"
            />
          </div>
        )}

        {/* Bottom Action */}
        <div className="text-center">
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm"
          >
            Back to All Experiences
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetailPage;