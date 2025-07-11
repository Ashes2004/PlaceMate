"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, ChevronDown, Plus, Eye, Building, Calendar, MapPin, Briefcase, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

// Utility function to normalize dropdown options (case-insensitive + most capitalized)
const getCapitalizedOptions = (array) => {
  const map = new Map();
  array.forEach((val) => {
    if (!val) return;
    const lower = val.toLowerCase();
    if (!map.has(lower) || val === val.toUpperCase()) {
      map.set(lower, val);
    }
  });
  return Array.from(map.values());
};

// Premium Glass Story Card Component
const StoryCard = ({ id, role, company, ctc, year, onCampus, type, description }) => (
  <div className="backdrop-blur-lg bg-gradient-to-br from-white/25 to-white/10 rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden group">
    {/* Header with Glass Effect */}
    <div className="p-6 border-b border-white/20 bg-gradient-to-r from-white/10 to-transparent">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">
            {role}
          </h3>
          <p className="text-gray-600 flex items-center">
            <Building size={16} className="mr-1 text-blue-500" />
            {company}
          </p>
        </div>
        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
          {type}
        </span>
      </div>
    </div>

    {/* Content with Glass Overlay */}
    <div className="p-6">
      {/* Key Details with Glass Pills */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-sm backdrop-blur-sm bg-white/20 rounded-lg p-2 border border-white/30">
          <DollarSign size={16} className="mr-2 text-green-600" />
          <span className="font-medium text-gray-700">{ctc || 'Not disclosed'}</span>
        </div>
        <div className="flex items-center text-sm backdrop-blur-sm bg-white/20 rounded-lg p-2 border border-white/30">
          <Calendar size={16} className="mr-2 text-blue-600" />
          <span className="font-medium text-gray-700">{year}</span>
        </div>
        <div className="flex items-center text-sm backdrop-blur-sm bg-white/20 rounded-lg p-2 border border-white/30 col-span-2">
          <MapPin size={16} className="mr-2 text-red-600" />
          <span className="font-medium text-gray-700">{onCampus}</span>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="backdrop-blur-sm bg-white/10 rounded-lg p-3 border border-white/20 mb-4">
          <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>
      )}

      {/* Action Button with Glass Effect */}
      <div className="flex justify-end">
        <button 
          onClick={() => window.location.href = `/interviewExperience/${id}`}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg backdrop-blur-sm transform hover:scale-105"
        >
          <Eye size={16} />
          <span>Read Experience</span>
        </button>
      </div>
    </div>
  </div>
);

// Premium Glass Filter Dropdown Component
const FilterButton = ({ children, options, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 backdrop-blur-lg bg-white/20 border border-white/30 rounded-lg text-gray-700 hover:bg-white/30 transition-all duration-200 shadow-lg hover:scale-105"
      >
        <span className="text-sm font-medium">{selectedValue || children}</span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-1 w-full backdrop-blur-lg bg-white/90 border border-white/30 rounded-lg shadow-xl z-10">
          <div 
            className="px-4 py-2 hover:bg-white/50 cursor-pointer text-sm border-b border-white/30 transition-colors"
            onClick={() => {
              onSelect('');
              setIsOpen(false);
            }}
          >
            All {children}
          </div>
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-white/50 cursor-pointer text-sm transition-colors"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Page Component with Premium Glass Design
const PlacementStories = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const storiesCollection = collection(db, "interviewExperiences");
        const storiesSnapshot = await getDocs(storiesCollection);
        const storiesData = storiesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setStories(storiesData);
      } catch (err) {
        console.error("Error fetching stories:", err);
        setError("Failed to load stories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  // Create normalized dropdown options
  const companies = getCapitalizedOptions(stories.map((story) => story.company));
  const roles = getCapitalizedOptions(stories.map((story) => story.role));
  const years = getCapitalizedOptions(stories.map((story) => story.year));
  const campusOptions = getCapitalizedOptions(stories.map((story) => story.onCampus));
  const typeOptions = getCapitalizedOptions(stories.map((story) => story.type));

  // Filtering logic
  const filteredStories = stories.filter((story) => {
    const match = (value, selected) => selected === '' || value?.toLowerCase() === selected.toLowerCase();

    const matchesCompany = match(story.company, selectedCompany);
    const matchesRole = match(story.role, selectedRole);
    const matchesYear = match(String(story.year), selectedYear);
    const matchesCampus = match(story.onCampus, selectedCampus);
    const matchesType = match(story.type, selectedType);
    const matchesSearch =
      searchTerm === '' ||
      story.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCompany && matchesRole && matchesYear && matchesCampus && matchesType && matchesSearch;
  });

  // Premium Glass Loading State
  if (loading) {
    return (
      <div 
        className="min-h-screen w-full relative overflow-hidden"
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
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center backdrop-blur-lg bg-white/20 rounded-2xl p-8 border border-white/30 shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">Loading placement stories...</p>
          </div>
        </div>
      </div>
    );
  }

  // Premium Glass Error State
  if (error) {
    return (
      <div 
        className="min-h-screen w-full relative overflow-hidden"
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
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center backdrop-blur-lg bg-white/20 rounded-2xl p-8 border border-white/30 shadow-xl">
            <p className="text-red-600 mb-4 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-medium shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
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
      {/* Glass overlay pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      <Header/>
      
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Premium Glass Header */}
        <div className="text-center mb-8 pt-16">
          <div className="backdrop-blur-lg bg-white/15 rounded-2xl p-8 border border-white/30 shadow-xl max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
              Interview Experiences
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            </h1>
            <p className="text-gray-600 text-lg">Learn from others' placement journeys and success stories</p>
          </div>
        </div>

        {/* Premium Glass Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative backdrop-blur-lg bg-white/20 rounded-2xl p-1 border border-white/30 shadow-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search by role, company, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/30 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm placeholder-gray-500 text-gray-800 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Premium Glass Filters */}
        <div className="backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <FilterButton options={companies} selectedValue={selectedCompany} onSelect={setSelectedCompany}>Company</FilterButton>
            <FilterButton options={roles} selectedValue={selectedRole} onSelect={setSelectedRole}>Role</FilterButton>
            <FilterButton options={years} selectedValue={selectedYear} onSelect={setSelectedYear}>Year</FilterButton>
            <FilterButton options={campusOptions} selectedValue={selectedCampus} onSelect={setSelectedCampus}>Campus</FilterButton>
            <FilterButton options={typeOptions} selectedValue={selectedType} onSelect={setSelectedType}>Type</FilterButton>
          </div>
        </div>

        {/* Results Count with Glass Effect */}
        <div className="text-center mb-8">
          <div className="inline-block backdrop-blur-sm bg-white/20 rounded-full px-6 py-2 border border-white/30 shadow-lg">
            <span className="text-sm font-medium text-gray-700">
              {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
            </span>
          </div>
        </div>

        {/* Premium Glass Stories Grid */}
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredStories.map((story) => (
              <StoryCard key={story.id} {...story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 border border-white/30 shadow-xl max-w-md mx-auto">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-600 text-lg mb-6 font-medium">No stories found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCompany('');
                  setSelectedRole('');
                  setSelectedYear('');
                  setSelectedCampus('');
                  setSelectedType('');
                  setSearchTerm('');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-medium shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Premium Glass Add Story Button */}
        <div className="flex justify-center">
          <div className="backdrop-blur-lg bg-white/15 rounded-2xl p-4 border border-white/30 shadow-xl">
            <button
              onClick={() => window.location.href = '/placementStory'}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl flex items-center space-x-3 font-medium transition-all duration-200 shadow-lg backdrop-blur-sm hover:scale-105"
            >
              <Plus size={20} />
              <span>Share Your Experience</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementStories;