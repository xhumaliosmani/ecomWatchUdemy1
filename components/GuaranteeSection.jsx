import React from "react";
import { Shield, RefreshCcw, Truck, Award } from "lucide-react";

const GuaranteeSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-50 via-blue-50 to-pink-50 mt-8 rounded-lg pb-12 pt-10 overflow-hidden relative shadow-lg">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-800">
          Our Commitments to You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <GuaranteeItem
            icon={<Shield className="w-8 h-8" />}
            title="Secure Checkout"
            description="Secure transactions powered by Stripe Checkout"
          />
          <GuaranteeItem
            icon={<RefreshCcw className="w-8 h-8" />}
            title="30-Day Returns"
            description="Shop with confidence, return with ease"
          />
          <GuaranteeItem
            icon={<Truck className="w-8 h-8" />}
            title="Global Shipping"
            description="Reliable delivery, wherever you are in the World!"
          />
          <GuaranteeItem
            icon={<Award className="w-8 h-8" />}
            title="Quality Assured"
            description="Quality control and assurance on all products"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
    </section>
  );
};

const GuaranteeItem = ({ icon, title, description }) => {
  return (
    <div className="group flex flex-col items-start p-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-100 hover:shadow-2xl">
      <div className="mb-4 p-4 bg-white rounded-full text-indigo-500 group-hover:text-indigo-700 transition-all duration-300 shadow-md">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <div className="mt-4 h-1 w-16 bg-indigo-200 group-hover:w-full group-hover:bg-indigo-500 transition-all duration-300"></div>
    </div>
  );
};

export default GuaranteeSection;
