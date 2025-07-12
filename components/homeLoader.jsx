import React from "react";
import Header from "./Header";

const DashboardSkeleton = () => {
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
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {/* Glass overlay pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Header Skeleton */}
      {/* <div className="backdrop-blur-lg bg-white/20 border-b border-white/30 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="w-32 h-8 bg-white/30 rounded-lg animate-pulse"></div>
          <div className="w-20 h-8 bg-white/30 rounded-lg animate-pulse"></div>
        </div>
      </div> */}
      <Header />

      <section className="p-6 md:p-24 pt-24 md:mt-10 max-w-6xl mx-auto relative z-10">
        {/* User Info Mobile Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:hidden">
          <div className="backdrop-blur-lg bg-white/20 rounded-2xl p-4 border border-white/30 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white/30 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="w-32 h-6 bg-white/30 rounded animate-pulse"></div>
                <div className="w-24 h-4 bg-white/30 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section Skeleton */}
        <div className="mb-6 backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="w-64 h-7 bg-white/30 rounded animate-pulse mb-2"></div>
          <div className="w-48 h-5 bg-white/30 rounded animate-pulse"></div>
        </div>

        {/* Resume & Coding Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Resume Score Card Skeleton */}
          <div className="backdrop-blur-lg bg-gradient-to-br from-white/25 to-white/10 rounded-2xl p-6 border border-white/30 shadow-xl">
            <div className="flex justify-between items-center">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                  <div className="w-24 h-4 bg-white/30 rounded animate-pulse"></div>
                </div>
                <div className="w-16 h-8 bg-white/30 rounded animate-pulse mb-2"></div>
                <div className="w-full h-4 bg-white/30 rounded animate-pulse mb-1"></div>
                <div className="w-3/4 h-4 bg-white/30 rounded animate-pulse"></div>
                <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
                  <div className="bg-white/30 h-full rounded-full w-1/3 animate-pulse"></div>
                </div>
              </div>
              <div className="relative">
                <div className="w-20 h-20 bg-white/30 rounded-xl animate-pulse"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/30 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Coding Challenges Card Skeleton */}
          <div className="backdrop-blur-lg bg-gradient-to-br from-white/25 to-white/10 rounded-2xl p-6 border border-white/30 shadow-xl">
            <div className="flex justify-between items-center">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                  <div className="w-32 h-4 bg-white/30 rounded animate-pulse"></div>
                </div>
                <div className="w-20 h-8 bg-white/30 rounded animate-pulse mb-2"></div>
                <div className="w-full h-4 bg-white/30 rounded animate-pulse mb-1"></div>
                <div className="w-3/4 h-4 bg-white/30 rounded animate-pulse"></div>
                <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
                  <div className="bg-white/30 h-full rounded-full w-1/4 animate-pulse"></div>
                </div>
              </div>
              <div className="relative">
                <div className="w-20 h-20 bg-white/30 rounded-xl animate-pulse"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/30 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* GDG Events Section Skeleton */}
        <div className="mb-10">
          <div className="backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
              <div className="w-48 h-6 bg-white/30 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((_, index) => (
                <div
                  key={index}
                  className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-lg"
                >
                  <div className="w-full md:w-32 h-32 bg-white/30 rounded-lg animate-pulse"></div>
                  <div className="flex-1 space-y-3">
                    <div className="w-3/4 h-6 bg-white/30 rounded animate-pulse"></div>
                    <div className="w-full h-4 bg-white/30 rounded animate-pulse"></div>
                    <div className="w-4/5 h-4 bg-white/30 rounded animate-pulse"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-6 bg-white/30 rounded-full animate-pulse"></div>
                      <div className="w-24 h-4 bg-white/30 rounded animate-pulse"></div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-20 h-8 bg-white/30 rounded-lg animate-pulse"></div>
                      {index === 0 && (
                        <div className="w-32 h-8 bg-white/30 rounded-lg animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links Skeleton */}
        <div className="mb-8">
          <div className="backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
              <div className="w-24 h-6 bg-white/30 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className="backdrop-blur-lg bg-white/20 rounded-xl px-4 py-6 text-center border border-white/30 shadow-lg"
                >
                  <div className="w-12 h-12 bg-white/30 rounded-lg mx-auto mb-3 animate-pulse"></div>
                  <div className="w-20 h-4 bg-white/30 rounded animate-pulse mx-auto"></div>
                  <div className="mt-2 h-1 bg-white/30 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tip of the Day Skeleton */}
        <div className="backdrop-blur-lg bg-white/15 rounded-2xl p-6 border border-white/30 shadow-xl">
          <div className="w-32 h-6 bg-white/30 rounded animate-pulse mb-4"></div>
          <div className="space-y-2">
            <div className="w-full h-4 bg-white/30 rounded animate-pulse"></div>
            <div className="w-5/6 h-4 bg-white/30 rounded animate-pulse"></div>
            <div className="w-4/5 h-4 bg-white/30 rounded animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <div className="backdrop-blur-lg bg-white/20 border-t border-white/30 p-6 mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="w-24 h-5 bg-white/30 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-20 h-4 bg-white/30 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-white/30 rounded animate-pulse"></div>
                  <div className="w-24 h-4 bg-white/30 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;