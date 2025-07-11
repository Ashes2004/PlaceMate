"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Calendar, MapPin, Clock, Users, Star, ChevronRight } from "lucide-react";
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
      
      <div className="max-w-6xl mx-auto p-6 relative z-10 pt-24">
        {/* Hero Section - Premium Glass */}
        <div className="backdrop-blur-lg bg-gradient-to-r from-white/25 to-white/15 rounded-3xl p-8 border border-white/30 shadow-2xl mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GDG Events Hub
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Connect, Learn, and Grow with Google Developer Groups. Join our vibrant community of developers and tech enthusiasts.
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-4 border border-white/30 shadow-lg">
                <div className="text-2xl font-bold text-blue-600">{events.length}</div>
                <div className="text-sm text-gray-600">Total Events</div>
              </div>
              <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-4 border border-white/30 shadow-lg">
                <div className="text-2xl font-bold text-green-600">{upcoming.length}</div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
              <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-4 border border-white/30 shadow-lg">
                <div className="text-2xl font-bold text-purple-600">{past.length}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <section className="mb-12">
          <div className="backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-semibold text-gray-800">📅 Upcoming Events</h2>
             
            </div>
            
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30 shadow-lg animate-pulse">
                    <div className="w-full h-40 bg-gray-300/50 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-300/50 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300/50 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : upcoming.length ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map(event => <EventCard key={event.id} {...event} isUpcoming={true} />)}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200/50 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg">No upcoming events at the moment.</p>
                <p className="text-gray-500 text-sm mt-2">Check back soon for new exciting events!</p>
              </div>
            )}
          </div>
        </section>

        {/* Past Events Section */}
        <section>
          <div className="backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-semibold text-gray-800">📜 Past Events</h2>
              
            </div>
            
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="backdrop-blur-lg bg-white/20 rounded-2xl p-6 border border-white/30 shadow-lg animate-pulse">
                    <div className="w-full h-40 bg-gray-300/50 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-300/50 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300/50 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : past.length ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {past.map(event => <EventCard key={event.id} {...event} isUpcoming={false} />)}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200/50 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg">No past events to show.</p>
                <p className="text-gray-500 text-sm mt-2">Events will appear here after completion.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function EventCard({ title, date, type, description, location, image, registrationLink, isUpcoming }) {
  const eventDate = new Date(date);
  const now = new Date();
  const isToday = eventDate.toDateString() === now.toDateString();
  const daysDiff = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));

  return (
    <div className="backdrop-blur-lg bg-white/20 rounded-2xl overflow-hidden border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      {/* Event Image */}
      <div className="relative overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300" 
          />
        ) : (
          <div className="w-full h-40 bg-gradient-to-br from-blue-400/30 to-purple-500/30 flex items-center justify-center">
            <div className="text-4xl opacity-60">🎯</div>
          </div>
        )}
        
        {/* Event Status Badge */}
        <div className="absolute top-3 right-3">
          {isUpcoming ? (
            <div className="bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              {isToday ? 'Today' : daysDiff > 0 ? `${daysDiff} days` : 'Soon'}
            </div>
          ) : (
            <div className="bg-gray-500/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              Completed
            </div>
          )}
        </div>
        
        {/* Event Type Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-blue-500/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            {type || 'Event'}
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {description}
        </p>
        
        {/* Event Details */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-blue-500" />
            <span className="font-medium">
              {eventDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-green-500" />
            <span>{location || "Online Event"}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users size={16} className="text-purple-500" />
            <span>Community Event</span>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="flex justify-end mt-4">
          <a
            href={registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
              ${isUpcoming 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl' 
                : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl'
              }
            `}
          >
            <span>{isUpcoming ? "Register Now" : "View Recap"}</span>
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}