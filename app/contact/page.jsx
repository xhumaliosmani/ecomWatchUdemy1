import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Video,
  Headphones,
} from "lucide-react";
import Image from "next/image";
import ContactHero from "@/public/contact-hero.jpg";
import ContactOffice from "@/public/contact-office.jpg";
const ContactPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Contact EcomWatch
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            We're Here to Help with Your Watch Needs
          </p>
          <Image
            width={800}
            height={400}
            src={ContactHero}
            alt="EcomWatch support team"
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </header>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p>123 Watch Street, Timepiece City, TC 12345</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Phone className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p>(123) 456-7890</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Mail className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p>support@ecomwatch.com</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Our Hours</h3>
              <p>
                Mon-Fri: 9am-6pm
                <br />
                Sat-Sun: 10am-4pm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Support Channels Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                width={500}
                height={500}
                src={ContactOffice}
                alt="Our support team"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Our Support Channels
              </h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <MessageCircle className="w-8 h-8 text-blue-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold">Live Chat</h3>
                    <p>Get instant answers from our support team</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Video className="w-8 h-8 text-blue-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold">
                      Video Consultation
                    </h3>
                    <p>
                      Schedule a one-on-one video call with our watch experts
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Headphones className="w-8 h-8 text-blue-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold">Phone Support</h3>
                    <p>Call us for immediate assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                What are your shipping options?
              </h3>
              <p>
                We offer standard (5-7 business days) and express (2-3 business
                days) shipping options.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Do you offer international shipping?
              </h3>
              <p>
                Yes, we ship to most countries worldwide. Shipping costs and
                delivery times may vary.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                What is your return policy?
              </h3>
              <p>
                We offer a 30-day return policy for most items. Please check our
                Returns page for more details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with EcomWatch
          </h2>
          <p className="text-xl mb-8">
            Subscribe to our newsletter for the latest watch news and exclusive
            offers.
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow p-2 rounded-l-full"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 font-bold py-2 px-6 rounded-r-full hover:bg-blue-100 transition duration-300"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
