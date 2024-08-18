import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Watch1 from "@/public/watch1.png";
import Watch2 from "@/public/watch2.png";
import Watch3 from "@/public/watch3.png";
import Watch4 from "@/public/watch4.png";
import Watch5 from "@/public/watch5.png";
import Watch6 from "@/public/watch6.png";
import Watch7 from "@/public/watch7.png";
import Watch8 from "@/public/watch8.png";
import Watch9 from "@/public/watch9.png";
import Watch10 from "@/public/watch10.png";
import Watch11 from "@/public/watch11.png";
import Watch12 from "@/public/watch12.png";
import Link from "next/link";

const BestSellingWatches = () => {
  const [watches, setWatches] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchedWatches = [
      {
        id: 1,
        name: "Seiko GMT Master II",
        price: 299,
        rating: 4.8,
        image: Watch3,
        link: "/products/brand/rolex",
      },
      {
        id: 2,
        name: "Seiko Speedmaster Chronograph",
        price: 299,
        rating: 4.7,
        image: Watch2,
        link: "/products/brand/patekphilipe",
      },
      {
        id: 3,
        name: "Seiko Royal Oak",
        price: 349,
        rating: 4.9,
        image: Watch12,
        link: "/products/brand/audemarspiguet",
      },
      {
        id: 4,
        name: "Seiko Date Just",
        price: 299,
        rating: 4.6,
        image: Watch4,
        link: "/products/brand/richardmille",
      },
      {
        id: 5,
        name: "Seiko Daytona Chronograph",
        price: 499,
        rating: 5.0,
        image: Watch5,
        link: "/products/brand/omega",
      },
      {
        id: 6,
        name: "Seiko Aquanaut Automatik",
        price: 499,
        rating: 4.5,
        image: Watch6,
        link: "/products/brand/iwc",
      },
      {
        id: 7,
        name: "Seiko Classic Diver",
        price: 299,
        rating: 4.3,
        image: Watch7,
        link: "/products/brand/cartier",
      },
      {
        id: 8,
        name: "Seiko Yacht Master II",
        price: 399,
        rating: 4.8,
        image: Watch8,
        link: "/products/brand/tudor",
      },
      {
        id: 9,
        name: "Seiko Submariner",
        price: 399,
        rating: 4.7,
        image: Watch9,
        link: "/products/brand/rolex",
      },
      {
        id: 10,
        name: "Seiko Nautilus",
        price: 299,
        rating: 4.7,
        image: Watch10,
        link: "/products/brand/rolex",
      },
      {
        id: 11,
        name: "Seiko Santos",
        price: 299,
        rating: 4.7,
        image: Watch11,
        link: "/products/brand/rolex",
      },
      {
        id: 12,
        name: "Seiko OP Oyster",
        price: 299,
        rating: 4.7,
        image: Watch1,
        link: "/products/brand/rolex",
      },
    ].filter((watch) => watch && watch.image); // Ensure all watches have valid images
    setWatches(fetchedWatches);
  }, []);

  const nextWatch = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % watches.length);
  const prevWatch = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + watches.length) % watches.length
    );
  const getWatchIndex = (offset) =>
    (currentIndex + offset + watches.length) % watches.length;

  if (watches.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
          Best-selling Watches
        </h2>
        <div className="relative">
          <button
            onClick={prevWatch}
            className="absolute left-4 p-1 top-1/2 transform -translate-y-1/2 z-20 bg-white/50 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <div className="flex items-center sm:h-[27rem] h-[35rem] justify-center overflow-hidden">
            {Array.from({ length: 5 }).map((_, offset) => {
              const watch = watches[getWatchIndex(offset)];
              if (!watch) return null; // Skip rendering if watch is undefined
              return (
                <div
                  key={watch.id}
                  className={`transition-all duration-300 flex-shrink-0 w-full md:w-1/3 lg:w-1/5 px-2 ${
                    offset === 2 ? "scale-105 z-10" : "scale-95 opacity-75"
                  }`}
                >
                  <Link
                    href={watch.link}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <Image
                      width={500}
                      height={500}
                      src={watch.image}
                      alt={watch.name}
                      className="w-full sm:h-48 md:h-56 lg:h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg md:text-xl font-semibold mb-2 truncate">
                        {watch.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">From ${watch.price}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm md:text-base">
                            {watch.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <button
            onClick={nextWatch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/50 rounded-full p-1 shadow-lg"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellingWatches;
