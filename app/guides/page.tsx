import React from 'react';
import Link from 'next/link';

const guides = [
  {
    id: 1,
    title: 'Getting Started',
    description: 'Learn the basics of using our car parts detection system',
    link: '/guides/getting-started',
    instruction: 'Coming soon: Basic setup and configuration guide'
  },
  {
    id: 2,
    title: 'Uploading Images',
    description: 'How to properly upload and process car part images',
    link: '/guides/uploading-images',
    instruction: 'Coming soon: Best practices for image uploads'
  },
  {
    id: 3,
    title: 'Understanding Results',
    description: 'Learn how to interpret detection results and confidence scores',
    link: '/guides/understanding-results',
    instruction: 'Coming soon: How to read and analyze detection results'
  },
  {
    id: 4,
    title: 'Best Practices',
    description: 'Tips and tricks for getting the best detection results',
    link: '/guides/best-practices',
    instruction: 'Coming soon: Expert tips for optimal detection'
  },
];

export default function GuidesPage() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide, index) => (
          <div
            key={guide.id}
            className="group relative block p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 
                     hover:border-blue-500/50 hover:bg-gray-800/70 hover:shadow-lg hover:shadow-blue-500/10 
                     transition-all duration-300 animate-fade-in cursor-not-allowed"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={handleClick}
          >
            <div className="transform group-hover:translate-x-2 transition-transform duration-300">
              <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                {guide.title}
              </h2>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {guide.description}
              </p>
            </div>
            
            {/* Hover Instruction */}
            <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm rounded-lg p-6 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          flex items-center justify-center text-center">
              <div className="transform group-hover:scale-100 scale-95 transition-transform duration-300">
                <p className="text-blue-400 font-medium mb-2">Coming Soon</p>
                <p className="text-gray-300">{guide.instruction}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 
                    hover:border-blue-500/50 transition-all duration-300 animate-fade-in"
           style={{ animationDelay: '400ms' }}>
        <h2 className="text-xl font-semibold text-white mb-4">
          Need Help?
        </h2>
        <p className="text-gray-400 mb-4">
          If you can't find what you're looking for, our support team is here to help.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                   text-white bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 
                   transition-all duration-300"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
