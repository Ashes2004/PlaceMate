"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Calendar, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";

export default function GDGEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, "gdgEvents"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const upcoming = events.filter(e => new Date(e.date) >= new Date());
  const past = events.filter(e => new Date(e.date) < new Date());

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">🚀 GDG Events Hub</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">📅 Upcoming Events</h2>
          {loading ? <p>Loading...</p> : upcoming.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map(event => <EventCard key={event.id} {...event} />)}
            </div>
          ) : <p>No upcoming events.</p>}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">📜 Past Events</h2>
          {loading ? <p>Loading...</p> : past.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map(event => <EventCard key={event.id} {...event} />)}
            </div>
          ) : <p>No past events.</p>}
        </section>
      </div>
    </div>
  );
}

function EventCard({ title, date, type, description, location, image, registrationLink }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
      {image && (
        <img src={image} alt={title} className="w-full h-40 object-cover" />
      )}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
          <Calendar size={16} />
          {new Date(date).toLocaleDateString()}
        </div>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <MapPin size={16} />
          {location || "Online"}
        </div>
        <div className="flex justify-end mt-3">
          <a
            href={registrationLink}
            target="_blank"
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium"
          >
            {new Date(date) > new Date() ? "Register" : "View Recap"}
          </a>
        </div>
      </div>
    </div>
  );
}
