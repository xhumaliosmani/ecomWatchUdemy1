import React from "react";
import {
  ShoppingCart,
  Heart,
  Watch,
  Link,
  Star,
  Gem,
  Shield,
  Activity,
  Aperture,
  Droplet,
  Layers,
  Feather,
  Zap,
} from "lucide-react";

const ProdDetailsList = ({ product }) => {
  return (
    <div className="bg-white sm:pb-[2px] rounded-b-xl mt-2 sm:mt-0 rounded-t-xl sm:rounded-none">
      <div className=" relative z-20 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-4 sm:mx-2 sm:p-8 mb-8 hover:shadow-2xl transition-all duration-300">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -left-4 w-40 h-40 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-40 h-40 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 transform-gpu sm:rounded-md ">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 antialiased">
            Product Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Watch className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  Brand
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.brand}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Link className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  Material
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.material}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  Condition
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.condition}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Gem className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  Bracelet
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.bracelet}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  Movement
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.movement}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Aperture className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  Thickness
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.thickness}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  Glass
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.glass}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  Luminova
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.luminova}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Layers className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  Case Material
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.casematerial}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Feather className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  Crown
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.crown}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  Band Size
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.bandsize}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <Layers className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  Lugs
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.lugs}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Droplet className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 antialiased">
                  Water Resistance
                </p>
                <p className="text-sm font-semibold text-gray-800 antialiased">
                  {product.water}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdDetailsList;
