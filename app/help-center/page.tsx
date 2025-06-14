"use client";

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqCategories = [
  'Getting Started',
  'Features',
  'Technical Support',
  'Billing',
  'Account',
] as const;

const faqItems: FAQItem[] = [
  {
    category: 'Getting Started',
    question: 'How do I get started with the Car Parts Detection System?',
    answer: 'To get started, sign up for an account, choose your plan, and follow our quick setup guide. You can upload your first image for detection within minutes.',
  },
  {
    category: 'Getting Started',
    question: 'What types of car parts can the system detect?',
    answer: 'Our system can detect a wide range of car parts including engines, transmissions, brakes, suspension components, and more. The detection accuracy varies by part type and image quality.',
  },
  {
    category: 'Getting Started',
    question: 'What are the minimum system requirements?',
    answer: 'You need a modern web browser (Chrome, Firefox, Safari, or Edge), a stable internet connection, and a device with a camera for real-time detection. For best results, we recommend using a device with at least 4GB RAM.',
  },
  {
    category: 'Getting Started',
    question: 'How do I upload images for detection?',
    answer: 'You can upload images through our web interface or mobile app. Supported formats include JPG, PNG, and WebP. For best results, ensure good lighting and clear visibility of the parts.',
  },
  {
    category: 'Features',
    question: 'What are the main features of the system?',
    answer: 'Key features include real-time part detection, detailed part information, compatibility checking, price estimation, and integration with major automotive databases.',
  },
  {
    category: 'Features',
    question: 'Can I use the system offline?',
    answer: 'Currently, the system requires an internet connection for real-time detection and database access. We are working on offline capabilities for future releases.',
  },
  {
    category: 'Features',
    question: 'Does the system support batch processing?',
    answer: 'Yes, our system supports batch processing of multiple images. You can upload up to 50 images at once for bulk detection and analysis.',
  },
  {
    category: 'Features',
    question: 'Can I export detection results?',
    answer: 'Yes, you can export detection results in various formats including PDF, CSV, and JSON. This is particularly useful for inventory management and reporting.',
  },
  {
    category: 'Technical Support',
    question: 'How accurate is the detection system?',
    answer: 'Our system achieves over 95% accuracy in ideal conditions. Accuracy may vary based on image quality, lighting conditions, and part visibility.',
  },
  {
    category: 'Technical Support',
    question: 'What image formats are supported?',
    answer: 'We support JPG, PNG, and WebP formats. For best results, use high-resolution images with good lighting and clear part visibility.',
  },
  {
    category: 'Technical Support',
    question: 'How do I report a detection error?',
    answer: 'You can report detection errors directly through the interface by clicking the "Report Error" button next to any detection result. Our team will review and improve the system based on your feedback.',
  },
  {
    category: 'Technical Support',
    question: 'What if the system fails to detect a part?',
    answer: 'If the system fails to detect a part, try improving the image quality, lighting, or angle. You can also use our manual override feature to select the part manually and help improve our detection algorithm.',
  },
  {
    category: 'Billing',
    question: 'How does the billing work?',
    answer: 'We offer monthly and yearly subscription plans. Billing is automatic and you can upgrade, downgrade, or cancel your subscription at any time.',
  },
  {
    category: 'Billing',
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee for all new subscriptions. Contact our support team to process your refund request.',
  },
  {
    category: 'Billing',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers. For enterprise customers, we also offer invoice-based billing with net-30 terms.',
  },
  {
    category: 'Billing',
    question: 'Are there any hidden fees?',
    answer: 'No, there are no hidden fees. The price you see is the price you pay. All features listed in your plan are included in the subscription cost.',
  },
  {
    category: 'Account',
    question: 'How do I reset my password?',
    answer: 'Click the "Forgot Password" link on the login page. We will send a password reset link to your registered email address.',
  },
  {
    category: 'Account',
    question: 'Can I transfer my account to another person?',
    answer: 'Account transfers are possible but require verification from both parties. Contact our support team to initiate the transfer process.',
  },
  {
    category: 'Account',
    question: 'How do I manage team access?',
    answer: 'Account administrators can manage team access through the dashboard. You can add/remove team members, assign roles, and control access permissions.',
  },
  {
    category: 'Account',
    question: 'Is my data secure?',
    answer: 'Yes, we take data security seriously. All data is encrypted in transit and at rest. We use industry-standard security practices and regular security audits to ensure your data remains protected.',
  },
  {
    category: 'Account',
    question: 'How long is my data stored?',
    answer: 'Detection results are stored for 90 days by default. You can adjust this period in your account settings or request longer storage periods for enterprise accounts.',
  }
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Memoize filtered FAQs to prevent unnecessary recalculations
  const filteredFaqs = useMemo(() => {
    return faqItems.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Memoize category toggle handler
  const handleCategoryToggle = useCallback((category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  }, []);

  // Memoize FAQ toggle handler
  const handleFaqToggle = useCallback((index: number) => {
    setExpandedFaq(prev => prev === index ? null : index);
  }, []);

  return (
    <div className="min-h-screen w-full text-white bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="min-h-screen flex flex-col items-center px-4 py-20">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                Help Center
              </span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions and learn how to make the most of our system.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-black/80 backdrop-blur-xl border border-gray-900 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all duration-300"
                aria-label="Search help articles"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12" role="tablist">
            {faqCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-700 text-white'
                    : 'bg-black/80 text-gray-500 hover:bg-gray-900/80'
                }`}
                role="tab"
                aria-selected={selectedCategory === category}
                aria-controls={`${category.toLowerCase().replace(/\s+/g, '-')}-panel`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={`${faq.category}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/80 backdrop-blur-xl rounded-xl border border-gray-900/50 overflow-hidden"
                >
                  <button
                    onClick={() => handleFaqToggle(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-900/50 transition-colors duration-300"
                    aria-expanded={expandedFaq === index}
                    aria-controls={`faq-${index}`}
                  >
                    <div>
                      <span className="text-sm text-purple-500 mb-1 block">{faq.category}</span>
                      <h3 className="text-lg font-semibold">{faq.question}</h3>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        id={`faq-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 py-4 bg-gray-900/50"
                      >
                        <p className="text-gray-400">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Contact Support */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="text-gray-500 mb-8">
              Our support team is here to help you with any questions or issues.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
              aria-label="Contact support team"
            >
              Contact Support
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 