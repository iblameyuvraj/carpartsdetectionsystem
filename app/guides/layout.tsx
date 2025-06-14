import React from 'react';

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4 animate-slide-down">
            Guides & Tutorials
          </h1>
          <p className="text-lg text-gray-300 animate-slide-up">
            Learn how to use our car parts detection system effectively
          </p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-gray-700/50 animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}
