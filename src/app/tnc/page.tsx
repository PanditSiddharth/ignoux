import React from "react";

export default function Terms() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold">Terms & Conditions</h1>
          <p className="mt-4 text-lg">Updated on: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-600">Welcome to ignoux.in</h2>
            <p className="mt-4 text-gray-700">
              By accessing or using this website, you agree to the terms and conditions outlined below. Please read them carefully before using our services.
            </p>
          </div>

          {/* Content Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800">1. Use of Content</h3>
            <p className="mt-2 text-gray-700">
              All materials, including blogs, notes, and PDFs, are for personal, non-commercial use only. Unauthorized reproduction, distribution, or resale of our content is strictly prohibited.
            </p>

            <h3 className="mt-6 text-xl font-bold text-gray-800">2. Payments and Downloads</h3>
            <p className="mt-2 text-gray-700">
              Certain resources, such as PDFs, may require a nominal fee (₹5-10) for access. After successful payment, users can download the purchased content. Refunds are not provided for digital purchases.
            </p>

            <h3 className="mt-6 text-xl font-bold text-gray-800">3. Intellectual Property</h3>
            <p className="mt-2 text-gray-700">
              All content on ignoux.in is owned by Siddharth Sharma. Unauthorized use of the material may result in legal action.
            </p>

            <h3 className="mt-6 text-xl font-bold text-gray-800">4. Disclaimer</h3>
            <p className="mt-2 text-gray-700">
              We strive to provide accurate and up-to-date information, but we do not guarantee the completeness or accuracy of our content. Users should use the content at their own discretion.
            </p>

            <h3 className="mt-6 text-xl font-bold text-gray-800">5. User Conduct</h3>
            <p className="mt-2 text-gray-700">
              Users must not engage in activities that disrupt the website s operation, such as hacking, spamming, or distributing malicious software.
            </p>

            <h3 className="mt-6 text-xl font-bold text-gray-800">6. Updates to Terms</h3>
            <p className="mt-2 text-gray-700">
              We reserve the right to update these terms at any time. Continued use of the site after changes indicates acceptance of the revised terms.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ignoux.in. All rights reserved. By Siddharth Sharma.
          </p>
        </div>
      </footer>
    </div>
  );
}
