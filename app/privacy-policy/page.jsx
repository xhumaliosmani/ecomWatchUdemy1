import React from "react";
import Link from "next/link";
import NewsletterComponent from "@/components/HomepageComponents/NewsletterComponent";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            How we protect and use your information
          </p>
        </div>
      </header>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-6">
              At EcommWatch, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy outlines how we collect, use, disclose, and safeguard your
              data when you visit our website or make a purchase.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>
                Personal information (e.g., name, email address, shipping
                address)
              </li>
              <li>
                Payment information (e.g., credit card details, billing address)
              </li>
              <li>Device and browser information</li>
              <li>Usage data and preferences</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your purchases and account</li>
              <li>Improve our website and services</li>
              <li>Send promotional offers and updates (with your consent)</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">4. Data Protection</h2>
            <p className="mb-6">
              We implement a variety of security measures to maintain the safety
              of your personal information. Your personal information is
              contained behind secured networks and is only accessible by a
              limited number of persons who have special access rights to such
              systems.
            </p>

            <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
            <p className="mb-6">
              We use cookies to enhance your browsing experience, analyze site
              traffic, and personalize content. You can choose to disable
              cookies through your browser settings, but this may affect your
              ability to use certain features of our website.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              6. Third-Party Disclosure
            </h2>
            <p className="mb-6">
              We do not sell, trade, or otherwise transfer your personally
              identifiable information to outside parties unless we provide
              users with advance notice. This does not include website hosting
              partners and other parties who assist us in operating our website,
              conducting our business, or serving our users.
            </p>

            <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
            <p className="mb-6">
              You have the right to access, correct, or delete your personal
              information. If you would like to exercise these rights or have
              any questions about our privacy practices, please contact us using
              the information provided below.
            </p>

            <h2 className="text-2xl font-bold mb-4">
              8. Changes to This Policy
            </h2>
            <p className="mb-6">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last Updated" date.
            </p>

            <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <address className="not-italic mb-6">
              EcommWatch
              <br />
              123 Watch Street
              <br />
              Timekeeping City, TC 12345
              <br />
              Email: privacy@ecommwatch.com
              <br />
              Phone: (123) 456-7890
            </address>

            <p className="text-sm text-gray-600">
              Last Updated: August 5, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Have Questions?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            If you have any questions about our Privacy Policy or how we handle
            your data, please don't hesitate to reach out to us.
          </p>
          <Link
            href="/contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
      <NewsletterComponent />
    </div>
  );
}
