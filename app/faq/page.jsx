"use client";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import NewsletterComponent from "@/components/HomepageComponents/NewsletterComponent";

const FAQPage = () => {
  const faqs = [
    {
      question: "What types of watches do you offer?",
      answer:
        "We offer a wide range of watches, including luxury timepieces, smartwatches, vintage watches, and sports watches. Our collection features various brands and styles to suit different preferences and occasions.",
    },
    {
      question: "How do I determine my watch size?",
      answer:
        "To determine your watch size, measure your wrist circumference with a flexible tape measure. Generally, a 38-42mm case diameter suits most men's wrists, while 28-34mm is common for women. However, personal preference plays a big role in choosing the right size for you.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to most countries. Shipping rates and delivery times vary depending on the destination. You can view the shipping options available for your location during the checkout process.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. The watch must be unworn, in its original condition, and include all original packaging and documentation. Custom orders may not be eligible for return. Please refer to our Returns & Exchanges page for more details.",
    },
    {
      question: "How do I care for my watch?",
      answer:
        "To care for your watch, clean it regularly with a soft cloth, avoid exposure to extreme temperatures and magnetic fields, and service mechanical watches every 3-5 years. For water-resistant watches, ensure the crown is fully pushed in before exposing it to water. Always refer to your specific watch's care instructions for best practices.",
    },
  ];

  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Find answers to common questions about our watches and services
          </p>
        </div>
      </header>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-6">
                <button
                  className="flex justify-between items-center w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-xl font-semibold text-left">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-blue-600" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="bg-white mt-2 p-6 rounded-lg shadow-md">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Still have questions?
          </h2>
          <p className="text-xl mb-8">
            We're here to help. Contact our customer support team for
            assistance.
          </p>
          <Link
            href="/contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterComponent />
    </div>
  );
};

export default FAQPage;
