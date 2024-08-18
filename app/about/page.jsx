import React from "react";
import { Clock, Watch, Star, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import About1 from "@/public/about1.jpg";
import About2 from "@/public/about2.jpg";
import About3 from "@/public/about3.jpg";
import About4 from "@/public/about4.jpg";
import About5 from "@/public/about5.jpg";
import ReviewImg from "@/public/profile.jpg";
import Link from "next/link";

const AboutPage = () => {
  const categories = [
    { name: "Luxury", image: About3, link: "/products/brand/rolex" },
    { name: "Sports", image: About4, link: "/products/brand/patekphilipe" },
    { name: "Classic", image: About5, link: "/products/brand/audemarspiguet" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About EcommWatch
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Crafting Time, Delivering Excellence
          </p>
          <Image
            width={800}
            height={800}
            src={About1}
            alt="EcommWatch storefront"
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </header>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Our Story
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                width={500}
                height={500}
                src={About2}
                alt="Founder's image"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-lg mb-4">
                Founded in 2010, EcommWatch began with a simple yet powerful
                vision: to make exquisite timepieces accessible to watch
                enthusiasts worldwide. Our journey started in a small workshop,
                fueled by passion and craftsmanship.
              </p>
              <p className="text-lg">
                Today, we've grown into a leading online destination for premium
                watches, but our core values remain unchanged. We continue to
                blend tradition with innovation, offering a curated selection of
                watches that speak to both style and substance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Timeless Quality</h3>
              <p>
                We believe in offering watches that stand the test of time, both
                in style and durability.
              </p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p>
                Your satisfaction is our top priority. We're here to guide you
                to the perfect timepiece.
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">
                Continuous Innovation
              </h3>
              <p>
                We constantly evolve, bringing you the latest in watch
                technology and design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collection Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Link href={category.link}>
                  <Image
                    src={category.image}
                    alt={`${category.name} watches`}
                    className="w-full h-48 object-cover"
                    width={500}
                    height={500}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {category.name} Watches
                    </h3>
                    <p className="text-gray-600">
                      Discover our exquisite range of{" "}
                      {category.name.toLowerCase()} timepieces, crafted for the
                      discerning collector.
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-blue-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-4">
              <Image
                width={500}
                height={500}
                src={ReviewImg}
                alt="Customer"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h4 className="text-xl font-semibold">John Doe</h4>
                <p className="text-gray-600">Watch Enthusiast</p>
              </div>
            </div>
            <p className="text-lg italic">
              "EcommWatch has been my go-to for premium timepieces for years.
              Their collection is unparalleled, and their customer service is
              simply outstanding. I always feel confident in my purchases from
              them."
            </p>
            <div className="flex mt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the EcommWatch Family
          </h2>
          <p className="text-xl mb-8">
            Discover your perfect timepiece today and experience the EcommWatch
            difference.
          </p>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-100 transition duration-300">
            <Link href={"/products/brand/rolex"}>Shop Now</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
