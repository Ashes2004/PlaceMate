"use client";
import React, { useState } from "react";
import {
  User,
  Building,
  DollarSign,
  FileText,
  Target,
  Calendar,
  MapPin,
  Briefcase,
  Send,
  CheckCircle,
} from "lucide-react";
import { db } from "@/utils/firebase"; // adjust path
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";


export default function InterviewForm() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    ctc: "",
    description: "",
    interviewExperience: "",
    tips: "",
    year: "",
    onCampus: "On Campus",
    type: "Full Time",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMarkdownChange = ({ text }) => {
    setFormData({ ...formData, interviewExperience: text });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "interviewExperiences"), formData);
      setSubmitted(true);
      setFormData({
        role: "",
        company: "",
        ctc: "",
        description: "",
        interviewExperience: "",
        tips: "",
        year: "",
        onCampus: "On Campus",
        type: "Full Time",
      });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    setTimeout(() => {
        router.push('/explore');
    }, 1500);
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h2>
          <p className="text-green-700">
            Your interview experience has been submitted successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Share Your Interview Experience
          </h1>
          <p className="text-gray-600 text-lg">
            Help fellow students by sharing your journey and insights
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                <User className="h-5 w-5 text-blue-600" />
                Basic Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="role"
                      placeholder="e.g., Software Engineer"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      placeholder="e.g., Google"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    CTC (Annual)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="ctc"
                      placeholder="e.g., 15 LPA"
                      value={formData.ctc}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Year
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      name="year"
                      placeholder="e.g., 2025"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Short Description
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    name="description"
                    placeholder="Brief overview of your experience..."
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Interview Experience Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Interview Experience
              </h3>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Detailed Experience (Markdown Supported)
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <textarea
                    name="interviewExperience"
                    placeholder="Share your detailed interview experience here...

                        Include details like:
                        - Application process
                        - Interview rounds
                        - Questions asked
                        - Technical challenges
                        - Your overall experience"
                    value={formData.interviewExperience}
                    onChange={handleChange}
                    rows="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Share details about the interview process, questions asked,
                  rounds, etc.
                </p>
              </div>
            </div>

            {/* Tips Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                <Target className="h-5 w-5 text-blue-600" />
                Tips & Advice
              </h3>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tips for Juniors
                </label>
                <div className="relative">
                  <Target className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    name="tips"
                    placeholder="Share valuable tips and advice for other students..."
                    value={formData.tips}
                    onChange={handleChange}
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Additional Details
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Campus Type
                  </label>
                  <select
                    name="onCampus"
                    value={formData.onCampus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="On Campus">On Campus</option>
                    <option value="Off Campus">Off Campus</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Position Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Experience
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>
            Your shared experience will help other students prepare better for
            their interviews.
          </p>
        </div>
      </div>
    </div>
  );
}
