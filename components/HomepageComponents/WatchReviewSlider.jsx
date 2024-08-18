import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import trustpilot from "@/public/trustpilotsvg.svg";
import customerImage1 from "@/public/customer1.jpg";
import customerImage2 from "@/public/customer2.jpg";
import customerImage3 from "@/public/customer3.jpg";
import watch1 from "@/public/watch3.png";
import watch2 from "@/public/watch4.png";
import watch3 from "@/public/watch12.png";

const reviews = [
  {
    id: 1,
    rating: 5,
    text: "The 2 watches (Seiko Panerai Luminor and Seiko Datejust) are great! The finishing and the quality of the watches are really high. The communication with the seller was impeccable and the support too. I'll buy for sure other watches from Moddy's.",
    author: "Giovanni",
    date: "Mar 20, 2024",
    customerImage: customerImage1,
    watchImage: watch1,
  },
  {
    id: 2,
    rating: 4,
    text: "Everything, from communication, shipment and support, Seikomoddys went over and beyond to make sure I was happy. The watch looks amazing, even better than expected. When it came to adjust the bracelet with the provided tools, they even supported me with a video back to back, to identify my error. Highly recommended them!",
    author: "Ferid Ben Othman",
    date: "Sep 11, 2023",
    customerImage: customerImage2,
    watchImage: watch2,
  },
  {
    id: 3,
    rating: 5,
    text: "I couldn't be happier with my custom Seiko from Moddys. The craftsmanship is outstanding, and the NH35 automatic movement ensures precision. The watch was assembled with such attention to detail, using high-end materials. It's truly a unique piece that stands out. Highly recommend!",
    author: "Muhammad Hussain",
    date: "Nov 3, 2023",
    customerImage: customerImage3,
    watchImage: watch3,
  },
];

const WatchReviewSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  return (
    <div className="mx-auto sm:h-[48rem] h-[30rem] px-4 sm:px-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden">
      <hr className="border-gray-300" />
      <div className="sm:px-12 flex sm:pb-12 justify-center items-center">
        <Image
          quality={100}
          width={50}
          height={30}
          src={trustpilot}
          alt="Trustpilot"
          className="h-20 sm:h-[10rem] w-auto"
        />
      </div>
      <div className="relative flex justify-center pt-14 sm:pt-0 items-center h-[300px] sm:h-[500px]">
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:-left-6 bg-white p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 z-20"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        </button>
        <div className="flex items-center overflow-hidden w-full">
          {[-1, 0, 1].map((offset) => {
            const reviewIndex =
              (currentIndex + offset + reviews.length) % reviews.length;
            const review = reviews[reviewIndex];
            return (
              <motion.div
                key={reviewIndex}
                initial={{
                  scale: offset === 0 ? 1 : 0.8,
                  opacity: 1,
                }}
                animate={{
                  scale: offset === 0 ? 1 : 0.8,
                  opacity: 1,
                }}
                transition={{ duration: 0.3 }}
                className={`flex-shrink-0 w-full sm:w-1/3 ${
                  offset === 0 ? "z-10" : "z-0"
                }`}
              >
                <div className="bg-white p-4 rounded-xl mb-12 shadow-xl flex flex-col h-[26rem] sm:h-[27rem]">
                  <div className="flex items-center mb-2">
                    <p className="pr-1">Stars:</p>
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed flex-grow overflow-hidden">
                    "{review.text}"
                  </p>

                  <div className="flex justify-center mb-4">
                    <Image
                      src={review.watchImage}
                      alt="Purchased Watch"
                      width={150}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex items-center">
                    <Image
                      src={review.customerImage}
                      alt={review.author}
                      width={48}
                      height={48}
                      className="rounded-lg mr-3"
                    />
                    <div>
                      <p className="font-bold text-base">{review.author}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:-right-6 bg-white p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 z-20"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        </button>
      </div>
      <div className="flex justify-center mt-2 pt-10 sm:pt-0">
        {reviews.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full mx-1 transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "bg-green-500 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchReviewSlider;
