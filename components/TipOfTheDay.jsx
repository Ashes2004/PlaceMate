"use client";
import React, { useEffect, useState } from "react";

const placementTips = [
  {
    tip: "Start your placement prep by identifying your weak CS subjects and revising core concepts.",
    author: "PlaceMate Bot",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    tip: "Maintain a study schedule that balances coding, aptitude, and CS theory daily.",
    author: "PlaceMate Bot",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    tip: "Practice problem-solving on platforms like LeetCode, Codeforces, and GFG consistently.",
    author: "PlaceMate Bot",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    tip: "Create a strong resume focused on projects, internships, and your role in them.",
    author: "PlaceMate Bot",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    tip: "Prepare STAR-format answers for HR and behavioral questions ahead of interviews.",
    author: "PlaceMate Bot",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
];

export default function TipOfTheDay() {
  const [tipData, setTipData] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * placementTips.length);
    setTipData(placementTips[randomIndex]);
  }, []);

  if (!tipData) return null;

  return (
    <div>
      <h3 className="font-bold text-lg mb-4">Tip of the Day</h3>
      <div className="rounded-xl overflow-hidden relative h-48 sm:h-56 lg:h-64 shadow-md">
        <img
          src={tipData.image}
          alt="Tip background"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/800x600/4a5568/ffffff?text=Placement+Tip";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <p className="text-white text-lg font-semibold mb-1">
            "{tipData.tip}"
          </p>
          <p className="text-gray-300 text-sm">— {tipData.author}</p>
        </div>
      </div>
    </div>
  );
}
