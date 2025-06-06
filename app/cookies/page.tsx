import { Metadata } from "next";
import { CookieIcon, ShieldIcon, SettingsIcon, InfoIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy - Car Parts Detection System",
  description: "Learn about how we use cookies and manage your cookie preferences on the Car Parts Detection System.",
};

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="space-y-12">
        <section>
          <div className="flex items-start gap-4 mb-6">
            <CookieIcon className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">What are Cookies?</h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by enabling certain features and functionality.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-start gap-4 mb-6">
            <ShieldIcon className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-gray-600">
                    Required for the website to function properly. These cookies enable basic features like page navigation and access to secure areas.
                  </p>
                </div>

                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Performance Cookies</h3>
                  <p className="text-gray-600">
                    Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                </div>

                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Functionality Cookies</h3>
                  <p className="text-gray-600">
                    Remember your preferences and settings to provide enhanced, more personalized features.
                  </p>
                </div>

                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
                  <p className="text-gray-600">
                    Help us improve our website by collecting information about how visitors use it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-start gap-4 mb-6">
            <SettingsIcon className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">Managing Cookie Preferences</h2>
              <p className="text-gray-600 mb-4">
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">How to Manage Cookies</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Browser Settings: Most web browsers allow you to control cookies through their settings preferences.</li>
                  <li>Cookie Consent Tool: Use our cookie consent tool to manage your preferences.</li>
                  <li>Third-Party Cookies: You can opt out of third-party cookies through your browser settings.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-start gap-4 mb-6">
            <InfoIcon className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">Cookie Duration</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Our cookies have different lifespans:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Session Cookies: Temporary cookies that expire when you close your browser</li>
                  <li>Persistent Cookies: Remain on your device for a specified period or until manually deleted</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <p className="text-gray-600 mb-4">
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
          <p className="text-gray-600">
            Last updated: March 2024
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about our Cookie Policy, please contact us.
          </p>
          <a href="/contact" className="text-blue-600 hover:underline">
            Contact Support →
          </a>
        </section>
      </div>
    </div>
  );
} 