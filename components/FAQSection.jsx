import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the return policy?",
      answer:
        "You can return the product within 30 days of purchase for a full refund.",
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping typically takes 5-7 business days.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to many countries. Shipping costs and times may vary.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive an email with the tracking information.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay.",
    },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-8 relative">
      <div className="absolute inset-0 bg-gradient-to-br  rounded-lg transform scale-105 opacity-75 blur-lg"></div>
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-6 relative z-10">
        Frequently Asked Questions
      </h3>
      <div className="space-y-4 relative z-10">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className={`border-b border-gray-200 ${
              openIndex === index ? "bg-slate-50/50" : "bg-white"
            } rounded-lg overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center py-4 text-left focus:outline-none px-4"
            >
              <span className="text-lg font-semibold text-gray-700">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-6 h-6 text-gray-700" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-700" />
              )}
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="px-4 py-2">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
