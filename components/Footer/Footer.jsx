import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";


const Footer = () => {
  const socialLinks = [
    {
      Icon: FaFacebookF,
      href: "https://facebook.com/yourwatchbrand",
      color: "blue",
    },
    {
      Icon: FaTwitter,
      href: "https://twitter.com/yourwatchbrand",
      color: "blue",
    },
    {
      Icon: FaInstagram,
      href: "https://instagram.com/yourwatchbrand",
      color: "blue",
    },
    {
      Icon: FaLinkedinIn,
      href: "https://linkedin.com/company/yourwatchbrand",
      color: "blue",
    },

  ];
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
              EcommStore
            </h2>
            <p className="text-gray-300">
              Crafting timeless elegance for the modern connoisseur.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Blog", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item.toLowerCase() === "home"
                        ? "/"
                        : `/${item.toLowerCase()}`
                    }
                    className="text-gray-300 hover:text-blue-300 transition duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {["FAQ", "Shipping & Returns", "Warranty", "Privacy Policy"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item
                        .toLowerCase()
                        .replace(" & ", "-")
                        .replace(" ", "-")}`}
                      className="text-gray-300 hover:text-blue-300 transition duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-gray-900 font-bold py-2 px-4 rounded-r-md transition duration-300"
              >
                <HiOutlineMail className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 sm:mb-0">
            {socialLinks.map(({ Icon, href, color }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 hover:text-${color}-400 transition duration-300 transform hover:scale-110`}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EcommWatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
