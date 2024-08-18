"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Watch from "@/public/newsletter.jpg";
import Image from "next/image";

const NewsletterComponent = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    // For this example, we'll just simulate a successful subscription
    setStatus("success");
    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r flex justify-center from-slate-50 to-slate-100 p-8 rounded-t-2xl shadow-2xl  mx-auto mt-[2px]"
    >
      <div className="max-w-[45rem] py-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-6 "
        >
          <h2 className="text-4xl font-extrabold text-slate-800 mb-2">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-slate-700 text-lg">
            Get 15% off your first order!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <Image
            src={Watch}
            alt="Luxury Watch"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border-2 border-transparent rounded-md focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-lg"
              required
            />
          </motion.div>
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow-xl hover:bg-blue-700 transition duration-300"
            >
              Subscribe Now
            </button>
          </motion.div>
        </form>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Alert className="mt-4 bg-white shadow-lg rounded-lg p-4">
                <Check className="h-6 w-6 text-green-500" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  You've been subscribed. Check your email for the discount
                  code.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-xs text-slate-600 mt-4 text-center"
        >
          By subscribing, you agree to receive email marketing. You can
          unsubscribe at any time.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default NewsletterComponent;
