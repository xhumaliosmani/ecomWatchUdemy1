
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Tag,
  Droplet,
  Watch,
  Star,
  Heart,
  Box,
  Ruler,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import HeroImageFallback from "@/public/heroimage1.jpg";

const FeaturedProduct = () => {
  const [featuredWatch1, setFeaturedWatch1] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedProduct = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await axios.get(`api/product/featured?t=${timestamp}`);
      setFeaturedWatch1(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch featured product"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProduct();
  }, []);

  return (
    <header className="relative bg-gradient-to-r from-slate-300 to-slate-400 text-white sm:h-[58rem] flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[10px] opacity-50"
          animate={{
            backgroundImage: [
              "radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10%)",
              "radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10%)",
            ],
            backgroundPosition: ["0% 0%", "100% 100%"],
            backgroundSize: ["20px 20px", "30px 30px"],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundImage: [
              "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
              "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
            ],
            backgroundSize: ["100px 100px", "150px 150px"],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-2 text-center text-slate-800"
        >
          Presenting The Nautilus
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-2xl mb-8 text-center text-slate-700"
        >
          A Timepiece for Every Moment
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-2xl overflow-hidden text-gray-800"
        >
          <div className="md:flex">
            <div className="relative group">
              <Image
                src={featuredWatch1?.images[0] || HeroImageFallback}
                alt={featuredWatch1?.name || "Featured watch"}
                width={800}
                height={600}
                quality={100}
                className="w-full md:h-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 duration-300 group-hover:scale-105 group-hover:opacity-100 transition flex items-center justify-center">
                <Link
                  href={"/products/brand/patekphilipe"}
                  className="bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-200 transition duration-300"
                >
                  View Watches
                </Link>
              </div>
            </div>
            <div className="md:w-3/5 p-6 md:p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-bold">{featuredWatch1?.name}</h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                {featuredWatch1?.description.slice(0, 500)}
                {"... "}
                <Link
                  className="text-blue-400 bg-blue-100/40 px-2 rounded-lg "
                  href={`/products/brand/${featuredWatch1?.brand}`}
                >
                  Read More
                </Link>
              </p>
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-blue-600">
                  ${featuredWatch1?.price.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through ml-4">
                  ${featuredWatch1?.originalPrice.toLocaleString()}
                </span>
                <span className="ml-4 hidden md:block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Save $
                  {(
                    featuredWatch1?.originalPrice - featuredWatch1?.price
                  ).toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-blue-500" />
                  <span>
                    <strong>Brand:</strong> {featuredWatch1?.brand}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  <span>
                    <strong>Movement:</strong> Automatic
                  </span>
                </div>
                <div className="flex items-center">
                  <Droplet className="w-5 h-5 mr-2 text-blue-500" />
                  <span>
                    <strong>Water Resistance:</strong> {featuredWatch1?.water}
                  </span>
                </div>
                <div className="flex items-center">
                  <Box className="w-5 h-5 mr-2 text-blue-500" />
                  <span>
                    <strong>Case Material:</strong>{" "}
                    {featuredWatch1?.casematerial}
                  </span>
                </div>
                <div className="flex items-center">
                  <Ruler className="w-5 h-5 mr-2 text-blue-500" />
                  <span>
                    <strong>Thickness:</strong> {featuredWatch1?.thickness}
                  </span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-500" />
                  <span>
                    <strong>Glass:</strong> {featuredWatch1?.glass}
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Additional Features:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 grid grid-cols-2 gap-2">
                  <li>Luminova: {featuredWatch1?.luminova}</li>
                  <li>Crown: {featuredWatch1?.crown}</li>
                  <li>Band Size: {featuredWatch1?.bandsize}</li>
                  <li>Lugs: {featuredWatch1?.lugs}</li>
                  <li>Condition: {featuredWatch1?.condition}</li>
                  <li>Bracelet: {featuredWatch1?.bracelet}</li>
                </ul>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <Watch className="w-5 h-5 mr-2" />
                <span className="flex items-center">
                  {featuredWatch1?.averageRating.toFixed(1)}
                  <Star className="w-4 h-4 text-yellow-400 ml-1" />
                </span>
                <span className="mx-2">|</span>
                <span>{featuredWatch1?.numReviews} reviews</span>
              </div>
              <div className="flex space-x-4">
                <Link
                  href={`/products/brand/patekphilipe`}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 text-center text-lg font-semibold"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default FeaturedProduct;
