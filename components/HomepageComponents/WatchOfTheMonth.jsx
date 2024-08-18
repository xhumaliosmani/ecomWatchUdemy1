import React from "react";
import Image from "next/image";
import Watchmonth5 from "@/public/watchmonth5.png";
import Quality from "@/public/quality1.png";
import Happy from "@/public/happy1.png";
import Swiss from "@/public/featureSwiss.png";
import Link from "next/link";
import { motion } from "framer-motion";

const WatchOfTheMonth = () => {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-extrabold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Rolex GMT Master II
        </motion.h2>
        <motion.h3
          className="text-2xl font-medium text-gray-700 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          WATCH OF THE MONTH
        </motion.h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="flex justify-center space-x-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              src={Watchmonth5}
              alt="Watch on wrist"
              width={500}
              height={200}
              className="rounded-lg shadow-lg hover:shadow-2xl"
            />
          </motion.div>

          <motion.div
            className="lg:text-left text-center lg:pr-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-lg text-gray-600 mb-8">
              The white Santeiko watch is a customer favorite, known for its
              unique and timeless design. Its square bezel and elegant dial
              offer a blend of style and function. The stainless steel bracelet
              adds durability and elegance. This watch isn't just stylish; it's
              a symbol of quality and innovation. With excellent build, the
              Seiko Mod Santos is perfect for daily wear and makes a bold
              statement. Investing in a Santeiko means owning a piece of luxury
              and reliability.
            </p>
            <Link
              href={"/products/brand/rolex"}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300"
            >
              VIEW MODEL
            </Link>
          </motion.div>
        </div>

        <hr className="my-16 border-gray-300" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Image
              src={Happy}
              alt="Guarantee"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h4 className="font-semibold text-xl mb-2">
              SATISFIED OR REFUNDED
            </h4>
            <p className="text-gray-500">Returns in the next 30 days free</p>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Image
              src={Swiss}
              alt="Spain"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h4 className="font-semibold text-xl mb-2">BASED IN SWITZERLAND</h4>
            <p className="text-gray-500">From an old workshop of Luzern</p>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Image
              src={Quality}
              alt="Premium"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h4 className="font-semibold text-xl mb-2">PREMIUM QUALITY</h4>
            <p className="text-gray-500">
              904L Stainless steel | Sapphire crystals
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WatchOfTheMonth;
