import React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-t from-pink-500/5 via-background to-transparent backdrop-blur-xl">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl font-bold">Terms & Conditions</h1>
        <p className="mt-4 text-lg">Updated on: {new Date().toLocaleDateString()}</p>
      </div>
      </section>

      {/* Terms Section */}
      <section className="py-8 my-2 mx-auto max-w-6xl bg-gradient-to-b from-pink-500/5 via-background to-transparent">
      <div className="container mx-auto px-4 space-y-8">
        <div>
        <h2 className="text-2xl font-bold">Welcome to Ashirwad Balaji</h2>
        <p className="mt-4">
          By accessing or using this website, you agree to the terms and conditions outlined below. Please read them carefully before using our services.
        </p>
        </div>

        {/* Content Section */}
        <div className="shadow rounded-lg p-6">
        <h3 className="text-xl font-bold">1. Use of Content</h3>
        <p className="mt-2">
          All materials, including blogs, notes, and PDFs, are for personal, non-commercial use only. Unauthorized reproduction, distribution, or resale of our content is strictly prohibited.
        </p>

        <h3 className="mt-6 text-xl font-bold">2. Payments and Downloads</h3>
        <p className="mt-2">
          Certain resources, such as PDFs, may require a nominal fee (₹5-10) for access. After successful payment, users can download the purchased content. Refunds are not provided for digital purchases.
        </p>

        <h3 className="mt-6 text-xl font-bold">3. Intellectual Property</h3>
        <p className="mt-2">
          All content on Ashirwad Balaji is owned by Siddharth Sharma. Unauthorized use of the material may result in legal action.
        </p>

        <h3 className="mt-6 text-xl font-bold">4. Disclaimer</h3>
        <p className="mt-2">
          We strive to provide accurate and up-to-date information, but we do not guarantee the completeness or accuracy of our content. Users should use the content at their own discretion.
        </p>

        <h3 className="mt-6 text-xl font-bold">5. User Conduct</h3>
        <p className="mt-2">
          Users must not engage in activities that disrupt the website s operation, such as hacking, spamming, or distributing malicious software.
        </p>

        <h3 className="mt-6 text-xl font-bold">6. Updates to Terms</h3>
        <p className="mt-2">
          We reserve the right to update these terms at any time. Continued use of the site after changes indicates acceptance of the revised terms.
        </p>
        </div>
      </div>
      </section>
    </div>
  );
}
