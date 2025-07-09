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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📤 Add GDG Event</h1>

        {success && <p className="text-green-600 mb-4">{success}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="space-y-4">
          <Input label="Event Title" name="title" value={form.title} onChange={handleChange} />
          <Input label="Description" name="description" value={form.description} onChange={handleChange} multiline />
          <Input label="Date" name="date" type="date" value={form.date} onChange={handleChange} />
          <Input label="Type (Workshop, DevFest, etc)" name="type" value={form.type} onChange={handleChange} />
          <Input label="Location (Online or Campus)" name="location" value={form.location} onChange={handleChange} />
          <Input label="Registration/Recap Link" name="registrationLink" value={form.registrationLink} onChange={handleChange} />
          <Input label="Image URL (Cover)" name="image" value={form.image} onChange={handleChange} />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition"
          >
            {loading ? "Submitting..." : "Add Event"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", multiline = false }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1 text-gray-700">{label}</label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
}
