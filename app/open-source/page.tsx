import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Source - Car Parts Detection System",
  description: "Learn about our open source contributions and how you can get involved in the Car Parts Detection System project.",
};

export default function OpenSourcePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Open Source</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Open Source Commitment</h2>
          <p className="text-gray-600 mb-4">
            We believe in the power of open source and community collaboration. Our core detection models and tools are open source, allowing developers and researchers to contribute, learn, and improve automotive AI technology.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Components</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Detection Models</h3>
              <p className="text-gray-600">
                Our core AI models for car part detection are available on GitHub. Contribute to improving detection accuracy and performance.
              </p>
              <a href="https://github.com/iblameyuvraj/carpartsdetection" className="text-blue-600 hover:underline mt-4 inline-block">
                View on GitHub →
              </a>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">API Libraries</h3>
              <p className="text-gray-600">
                Open source client libraries for various programming languages to integrate with our detection API.
              </p>
              <a href="/contact" className="text-blue-600 hover:underline mt-4 inline-block">
                View on GitHub →
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Contribute</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              We welcome contributions from the community! Here&apos;s how you can get involved:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Report bugs and suggest features</li>
              <li>Submit pull requests for improvements</li>
              <li>Improve documentation</li>
              <li>Share your use cases and success stories</li>
              <li>Help others in the community</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Community Guidelines</h2>
          <p className="text-gray-600 mb-4">
            We maintain a welcoming and inclusive community. Please read our contribution guidelines and code of conduct before participating.
          </p>
          <div className="flex gap-4">
            <a href="/contributing" className="text-blue-600 hover:underline">
              Contribution Guidelines →
            </a>
            <a href="/code-of-conduct" className="text-blue-600 hover:underline">
              Code of Conduct →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
} 