import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog - Car Parts Detection System",
  description: "Track the latest updates, improvements, and changes to the Car Parts Detection System.",
};

export default function ChangelogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Changelog</h1>
      
      <div className="space-y-12">
        <section>
          <div className="border-l-4 border-blue-500 pl-4 mb-8">
            <h2 className="text-2xl font-semibold">Version 1.2.0 - March 2024</h2>
            <p className="text-gray-500 mb-4">Major improvements and new features</p>
            <ul className="space-y-2 text-gray-600">
              <li>✨ Added support for real-time video detection</li>
              <li>🚀 Improved detection accuracy by 15%</li>
              <li>🛠️ New batch processing API endpoints</li>
              <li>📊 Enhanced analytics dashboard</li>
              <li>🐛 Fixed various UI/UX issues</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="border-l-4 border-blue-500 pl-4 mb-8">
            <h2 className="text-2xl font-semibold">Version 1.1.0 - February 2024</h2>
            <p className="text-gray-500 mb-4">Feature updates and optimizations</p>
            <ul className="space-y-2 text-gray-600">
              <li>🎯 Added support for 10 new car part types</li>
              <li>⚡ Performance optimizations for faster processing</li>
              <li>📱 Improved mobile responsiveness</li>
              <li>🔧 API stability improvements</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="border-l-4 border-blue-500 pl-4 mb-8">
            <h2 className="text-2xl font-semibold">Version 1.0.0 - January 2024</h2>
            <p className="text-gray-500 mb-4">Initial release</p>
            <ul className="space-y-2 text-gray-600">
              <li>🎉 First public release</li>
              <li>📸 Basic image upload and detection</li>
              <li>🔍 Support for common car parts</li>
              <li>📊 Basic analytics and reporting</li>
              <li>👥 User authentication and management</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Features</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <ul className="space-y-2 text-gray-600">
              <li>🔮 Advanced damage detection</li>
              <li>🤖 AI-powered part recommendations</li>
              <li>📱 Native mobile applications</li>
              <li>🌐 Multi-language support</li>
              <li>🔄 Automated workflow integrations</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
} 