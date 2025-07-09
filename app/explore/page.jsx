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

// Simplified Story Card Component
const StoryCard = ({ id, role, company, ctc, year, onCampus, type, description }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
    {/* Header */}
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{role}</h3>
          <p className="text-gray-600 flex items-center">
            <Building size={16} className="mr-1" />
            {company}
          </p>
        </div>
        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
          {type}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      {/* Key Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <DollarSign size={16} className="mr-2 text-green-600" />
          <span className="font-medium">{ctc || 'Not disclosed'}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2 text-blue-600" />
          <span className="font-medium">{year}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 col-span-2">
          <MapPin size={16} className="mr-2 text-red-600" />
          <span className="font-medium">{onCampus}</span>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-700 text-sm line-clamp-3 mb-4 leading-relaxed">
          {description}
        </p>
      )}

      {/* Action Button */}
      <div className="flex justify-end">
        <button 
          onClick={() => window.location.href = `/interviewExperience/${id}`}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
        >
          <Eye size={16} />
          <span>Read Experience</span>
        </button>
      </div>
    </div>
  </div>
);

// Filter Dropdown Component
const FilterButton = ({ children, options, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="text-sm font-medium">{selectedValue || children}</span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div 
            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-100"
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
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
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

// Main Page Component
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

  // Mock data for demonstration
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

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stories...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
         <Header/>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
     
        <div className="text-center mb-8 pt-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Experiences</h1>
          <p className="text-gray-600">Learn from others' placement journeys</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by role, company, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <FilterButton options={companies} selectedValue={selectedCompany} onSelect={setSelectedCompany}>Company</FilterButton>
          <FilterButton options={roles} selectedValue={selectedRole} onSelect={setSelectedRole}>Role</FilterButton>
          <FilterButton options={years} selectedValue={selectedYear} onSelect={setSelectedYear}>Year</FilterButton>
          <FilterButton options={campusOptions} selectedValue={selectedCampus} onSelect={setSelectedCampus}>Campus</FilterButton>
          <FilterButton options={typeOptions} selectedValue={selectedType} onSelect={setSelectedType}>Type</FilterButton>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <span className="text-sm text-gray-500">
            {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
          </span>
        </div>

        {/* Stories Grid */}
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredStories.map((story) => (
              <StoryCard key={story.id} {...story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No stories found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCompany('');
                setSelectedRole('');
                setSelectedYear('');
                setSelectedCampus('');
                setSelectedType('');
                setSearchTerm('');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Add Story Button */}
        <div className="flex justify-center">
          <button
            onClick={() => window.location.href = '/placementStory'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 font-medium transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Share Your Experience</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacementStories;