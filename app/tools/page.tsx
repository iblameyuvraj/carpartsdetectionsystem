import { Metadata } from "next";
import { Code2Icon, DatabaseIcon, FileJsonIcon, TerminalIcon, WebhookIcon, ZapIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Developer Tools - Car Parts Detection System",
  description: "Explore our suite of developer tools and utilities for integrating with the Car Parts Detection System.",
};

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Developer Tools</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">API Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg">
              <div className="flex items-center mb-4">
                <WebhookIcon className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold">API Client</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Official API client libraries for Python, JavaScript, and Java. Easy integration with your applications.
              </p>
              <a href="/docs/api-client" className="text-blue-600 hover:underline">
                View Documentation →
              </a>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center mb-4">
                <TerminalIcon className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold">CLI Tool</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Command-line interface for batch processing and automation of detection tasks.
              </p>
              <a href="/docs/cli" className="text-blue-600 hover:underline">
                View Documentation →
              </a>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center mb-4">
                <FileJsonIcon className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold">API Explorer</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Interactive API documentation and testing tool for exploring endpoints.
              </p>
              <a href="/api-explorer" className="text-blue-600 hover:underline">
                Try it Now →
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Development Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg">
              <div className="flex items-center mb-4">
                <Code2Icon className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold">SDK</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Software Development Kit for building custom detection applications.
              </p>
              <a href="/docs/sdk" className="text-blue-600 hover:underline">
                Get Started →
              </a>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center mb-4">
                <DatabaseIcon className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold">Data Tools</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Utilities for data preprocessing, annotation, and model training.
              </p>
              <a href="/docs/data-tools" className="text-blue-600 hover:underline">
                Learn More →
              </a>
            </div>

            <div className="p-6 border rounded-lg">
              <div className="flex items-center mb-4">
                <ZapIcon className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold">Performance Tools</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Monitoring and optimization tools for production deployments.
              </p>
              <a href="/docs/performance" className="text-blue-600 hover:underline">
                View Tools →
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600 mb-4">
              New to our platform? Check out our getting started guides and tutorials to begin integrating with our tools.
            </p>
            <div className="flex gap-4">
              <a href="/docs/quickstart" className="text-blue-600 hover:underline">
                Quick Start Guide →
              </a>
              <a href="/docs/tutorials" className="text-blue-600 hover:underline">
                Tutorials →
              </a>
              <a href="/docs/examples" className="text-blue-600 hover:underline">
                Example Projects →
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 