"use client"
import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronDown, Plus } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Story Card Component
const StoryCard = ({ type, title, description, image , ctc , year }) => (
  <div className="flex items-start justify-between border-2 border-gray-400 rounded-xl p-3 shadow-sm hover:shadow-md transition mb-6 max-w-4xl w-full overflow-hidden">
    <div className="flex-1 pr-2">
      
      <div className="text-sm text-gray-600 font-medium mb-1">{type}</div>
      <h3 className="text-md font-semibold text-gray-900 mb-1">{title}</h3>
      <div className='flex gap-4'>
      <p className="text-gray-400 text-sm leading-relaxed">{ctc}</p>
      <p className="text-gray-400 text-sm leading-relaxed">{year}</p>
      </div>
      <p className="text-gray-600 text-[12px] leading-relaxed">{description}</p>
    </div>
    <div className="w-24 h-full rounded-lg overflow-hidden flex-shrink-0">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);


// Filter Button Component
const FilterButton = ({ children, options, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
      >
        <span>{selectedValue || children}</span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
          <div 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
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
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
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

// Main Component
const PlacementStories = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const stories = [
    {
      type: "Placement",
      title: "Software Engineer at TechCorp",
      description: "A student shares their experience at TechCorp, detailing the interview process, technical challenges, and overall company culture.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzTYRnUqcaeU51j8A47yS_2oZBGc6O6qVrqEculM1HmjdNvSxlwGX5AO25mcKOED7z-yccYzrFS_WcBXGG5TeZlghUz6aUoZGGiwli144MNrWivf5ngkhCalF8sWkBsaVCKh0V2rHDkJjP-MmLGxfPmzSWT555D9LAZH2MgYWkEiC_RlKAWHWqltEIVefOLpcHLAyyzlO5_hjBVeWCxxFAoktK5b9KfSjbZdpe3vksuG7tUpR9cjPJHf9FmT9ofgMwOg8viUOssIc",
      ctc: "12 LPA",
      year: "2024",
      company: "TechCorp",
      role: "Software Engineer"
    },
    {
      type: "Internship",
      title: "Data Analyst at DataGenius",
      description: "An intern recounts their time at DataGenius, focusing on the projects they worked on, the skills they developed, and the mentorship they received.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuADmDz44z8KCF7Q8FsQVJbwQU26afa4M8kPxxTM7oydjnwr27j-z6QZJmGokeSJ7y2mDiaaflC2LM9PI0E5ROHvSTvA2QVl_v78-6IBsGl38emxijqZyxkMOMPVP7bwQvx6CjUPpvMBiWbjKAYuaSEnyqCDnb5T89w4XCQ3clmYzU2KLXzdRg-cFLlLF5_e3cqIKPI_VtMyg96SZSAcjFWAaUEFiDuScPTtEjqEfV55oXO7yrtwUs8gtDZ-mpJr8EEI5st4eu_ifDo",
      ctc: "8 LPA",
      year: "2023",
      company: "DataGenius",
      role: "Data Analyst"
    },
    {
      type: "Placement",
      title: "Product Manager at Innovate Solutions",
      description: "A student describes their journey to becoming a Product Manager at Innovate Solutions, highlighting the case studies, behavioral questions, and product sense evaluations.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3kysfxhl2_cm7OAmB-PnLAKddGWQ-XUqiZvV3db8G3SzNWqDWHjLq6sj2p4FReyov59fvnMFG1lcAZpvKpWQfMbwL_TxY4mFUX2krE3gU1kSIhMaq21i6B13CXzOR4u2Ya1xtcJ1j0wlXLmGq9q_XDHkSA5BZMoYAxnhLpDmt-N88PtVX8bX3k4LQjfcXm11BIuilNEll-yrEsLV4GqgsByEOiy9nyRctfsO3v4VBgB1rACPVhi2wqY6U_dnWDez8lK9eOnhnEtM",
      ctc: "15 LPA",
      year: "2024",
      company: "Innovate Solutions",
      role: "Product Manager"
    }
  ];

  const companies = [...new Set(stories.map(story => story.company))];
  const roles = [...new Set(stories.map(story => story.role))];
  const years = [...new Set(stories.map(story => story.year))];

  const filteredStories = stories.filter(story => {
    return (
      (selectedCompany === '' || story.company === selectedCompany) &&
      (selectedRole === '' || story.role === selectedRole) &&
      (selectedYear === '' || story.year === selectedYear)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
     <Header/>

      {/* Content */}
      <div className="max-w-4xl md:max-w-screen md:px-20 mx-auto px-4 py-6 md:pt-24">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search stories"
            className="w-full max-w-md pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-3 mb-8">
          <FilterButton 
            options={companies}
            selectedValue={selectedCompany}
            onSelect={setSelectedCompany}
          >
            Company
          </FilterButton>
          <FilterButton 
            options={roles}
            selectedValue={selectedRole}
            onSelect={setSelectedRole}
          >
            Role
          </FilterButton>
          <FilterButton 
            options={years}
            selectedValue={selectedYear}
            onSelect={setSelectedYear}
          >
            Year
          </FilterButton>
        </div>

        {/* Stories Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6"> Placement Stories</h2>
          
          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story, index) => (
              <StoryCard
                key={index}
                type={story.type}
                title={story.title}
                description={story.description}
                image={story.image}
                ctc={story.ctc}
                year={story.year}
              />
            ))}
          </div>
        </div>

        {/* Add Story Button */}
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2">
            <Plus size={20} />
            <span className="font-medium">Add Story</span>
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PlacementStories;