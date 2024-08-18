import React from "react";
import { Truck, RotateCcw, Clock, DollarSign } from "lucide-react";
import Link from "next/link";
import NewsletterComponent from "@/components/HomepageComponents/NewsletterComponent";

const ShippingReturnsPage = () => {
  const shippingInfo = [
    {
      title: "Free Domestic Shipping",
      description: "Enjoy free shipping on all domestic orders over $100.",
      icon: <Truck className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "International Shipping",
      description: "We ship worldwide. Rates calculated at checkout.",
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Processing Time",
      description: "Orders typically ship within 1-2 business days.",
      icon: <Clock className="w-8 h-8 text-blue-600" />,
    },
  ];

  const returnsInfo = [
    {
      title: "30-Day Returns",
      description: "We offer a 30-day return policy for most items.",
      icon: <RotateCcw className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Condition Requirements",
      description: "Items must be unworn and in original condition with tags.",
      icon: <Truck className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Refund Processing",
      description: "Refunds are typically processed within 5-7 business days.",
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Shipping & Returns
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Everything you need to know about our shipping and return policies
          </p>
        </div>
      </header>

      {/* Shipping Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Shipping Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  {info.icon}
                  <h3 className="text-xl font-semibold ml-4">{info.title}</h3>
                </div>
                <p className="text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Returns Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Returns Policy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {returnsInfo.map((info, index) => (
              <div key={index} className="bg-gray-100 rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  {info.icon}
                  <h3 className="text-xl font-semibold ml-4">{info.title}</h3>
                </div>
                <p className="text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Policy Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Detailed Policy
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Shipping Policy</h3>
            <p className="mb-6">
              We strive to process and ship all orders within 1-2 business days.
              Domestic orders over $100 qualify for free shipping. For
              international orders, shipping rates are calculated based on
              destination and package weight. Please note that international
              customers may be responsible for duties and taxes upon delivery.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Returns Policy</h3>
            <p className="mb-6">
              We offer a 30-day return policy for most items. To be eligible for
              a return, your item must be unused and in the same condition that
              you received it. It must also be in the original packaging. Some
              items, such as custom orders or sale items, may not be eligible
              for return. Please contact our customer service team if you have
              any questions about your specific item.
            </p>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Contact Customer Service
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterComponent />
    </div>
  );
};

export default ShippingReturnsPage;
