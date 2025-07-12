"use client";
import React, { useState } from "react";
import { db } from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import Header from "@/components/Header";

export default function AddGDGEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    type: "",
    location: "",
    registrationLink: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, "gdgEvents"), form);
      setSuccess("✅ Event added successfully!");
      setForm({
        title: "",
        description: "",
        date: "",
        type: "",
        location: "",
        registrationLink: "",
        image: "",
      });
    } catch (err) {
      console.error(err);
      setError("❌ Failed to add event.");
    } finally {
      setLoading(false);
    }
  };

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

      <Header />
      
      <div className="max-w-2xl mx-auto py-10 px-4 relative z-10 pt-24">
        {/* Title Section - Glass Effect */}
        <div className="text-center mb-8">
          <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30 shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <h1 className="text-3xl font-bold text-blue-700">Add GDG Event</h1>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-600 text-sm">Create and manage your Google Developer Group events</p>
          </div>
        </div>

        {/* Success/Error Messages - Glass Cards */}
        {success && (
          <div className="mb-6 backdrop-blur-lg bg-green-50/40 border border-green-200/50 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-700 font-medium">{success}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 backdrop-blur-lg bg-red-50/40 border border-red-200/50 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Form Container - Premium Glass */}
        <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 border border-white/30 shadow-xl">
          <div className="space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input 
                  label="Event Title" 
                  name="title" 
                  value={form.title} 
                  onChange={handleChange}
                  icon="🎯"
                  placeholder="Enter event title..."
                />
              </div>
              
              <div className="md:col-span-2">
                <Input 
                  label="Description" 
                  name="description" 
                  value={form.description} 
                  onChange={handleChange} 
                  multiline
                  icon="📝"
                  placeholder="Describe your event..."
                />
              </div>
              
              <Input 
                label="Date" 
                name="date" 
                type="date" 
                value={form.date} 
                onChange={handleChange}
                icon="📅"
              />
              
              <Input 
                label="Event Type" 
                name="type" 
                value={form.type} 
                onChange={handleChange}
                icon="🏷️"
                placeholder="Workshop, DevFest, etc."
              />
              
              <Input 
                label="Location" 
                name="location" 
                value={form.location} 
                onChange={handleChange}
                icon="📍"
                placeholder="Online or Campus"
              />
              
              <Input 
                label="Registration Link" 
                name="registrationLink" 
                value={form.registrationLink} 
                onChange={handleChange}
                icon="🔗"
                placeholder="https://..."
              />
              
              <div className="md:col-span-2">
                <Input 
                  label="Cover Image URL" 
                  name="image" 
                  value={form.image} 
                  onChange={handleChange}
                  icon="🖼️"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Image Preview */}
            {form.image && (
              <div className="backdrop-blur-lg bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                  <span>👀</span> Image Preview
                </p>
                <img 
                  src={form.image} 
                  alt="Event preview" 
                  className="w-full h-48 object-cover rounded-lg border border-white/30 shadow-md"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Submit Button - Premium Glass */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`
                  w-full backdrop-blur-lg bg-gradient-to-r from-blue-500/80 to-blue-600/80 
                  hover:from-blue-600/90 hover:to-blue-700/90 
                  text-white font-semibold py-4 px-8 rounded-xl 
                  border border-blue-400/30 shadow-xl
                  transition-all duration-300 transform hover:scale-105
                  ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl'}
                  flex items-center justify-center gap-3
                `}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>Add Event</span>
                    <span>🚀</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tips - Glass Card */}
        <div className="mt-8 backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>💡</span> Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Use high-quality images (at least 1200x600px) for better visibility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Include clear event descriptions to attract more participants</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Test your registration links before submitting</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", multiline = false, icon, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {label}
      </label>
      <div className="relative">
        {multiline ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={4}
            placeholder={placeholder}
            className="
              w-full px-4 py-3 backdrop-blur-lg bg-white/20 
              border border-white/30 rounded-xl 
              focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50
              placeholder-gray-500 text-gray-800
              shadow-lg transition-all duration-300
              hover:bg-white/30 focus:bg-white/30
              resize-none
            "
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="
              w-full px-4 py-3 backdrop-blur-lg bg-white/20 
              border border-white/30 rounded-xl 
              focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50
              placeholder-gray-500 text-gray-800
              shadow-lg transition-all duration-300
              hover:bg-white/30 focus:bg-white/30
            "
          />
        )}
      </div>
    </div>
  );
}