import React from "react";
import Image from "next/image";
import {
  Shield,
  Clock,
  ThumbsUp,
  UserCheck,
  RotateCcw,
  Headphones,
  FileText,
  Award,
} from "lucide-react";
import NewsletterComponent from "@/components/HomepageComponents/NewsletterComponent";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const WarrantyComponent = () => {
  const warrantyFeatures = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "2-Year Warranty",
      description:
        "Our watches come with a comprehensive 2-year warranty, ensuring your timepiece is protected against manufacturing defects.",
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Lifetime Movement Guarantee",
      description:
        "Enjoy peace of mind with our lifetime guarantee on the watch movement, covering any functional issues for as long as you own the watch.",
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-blue-600" />,
      title: "Quality Assurance",
      description:
        "Each watch undergoes rigorous quality checks to meet the highest standards, providing you with a reliable and exquisite timepiece.",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      title: "Customer Support",
      description:
        "Our dedicated customer support team is available 24/7 to assist you with any queries or concerns regarding your purchase.",
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-blue-600" />,
      title: "30-Day Returns",
      description:
        "Not completely satisfied? Return your watch within 30 days for a full refund or exchange, no questions asked.",
    },
    {
      icon: <Headphones className="w-8 h-8 text-blue-600" />,
      title: "Expert Advice",
      description:
        "Our team of horologists is always ready to provide expert advice on watch care, maintenance, and selection.",
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Detailed Documentation",
      description:
        "Each watch comes with comprehensive documentation, including care instructions and warranty information.",
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Certified Authenticity",
      description:
        "Every timepiece is accompanied by a certificate of authenticity, guaranteeing its genuine craftsmanship.",
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Our Warranty
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We stand behind the quality of our timepieces. Our comprehensive
          warranty and support services ensure that your investment is protected
          and your satisfaction is guaranteed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {warrantyFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-4">Need More Information?</h3>
          <p className="text-gray-600 mb-6">
            Download our detailed warranty guide or contact our support team for
            personalized assistance.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline">Download Warranty Guide</Button>
            <Button>
              <Link href={"/contact"}>Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
      <NewsletterComponent />
    </div>
  );
};

export default WarrantyComponent;
