// components/ProductDetails.js

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import useCartStore from "@/store/cartStore";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

const ProductDetails = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = async () => {
    addItem(product);
  };
  const handleToggleWishlist = async () => {
    try {
      if (isWishlisted) {
        await axios.delete("/api/wishlist", {
          data: { productId: product._id },
        });
      } else {
        await axios.post("/api/wishlist", {
          data: { productId: product._id },
        });
      }
      setIsWishlisted(isWishlisted);
    } catch (error) {
      console.log(error);
    }
  };

  // Fallback image URL
  const fallbackImageUrl = "https://via.placeholder.com/400";

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="md:w-1/2">
        <Image
          height={500}
          width={500}
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : fallbackImageUrl
          }
          alt={product.name || "Product Image"}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {product.name || "Product Name Unavailable"}
        </h1>
        <p className="text-2xl font-semibold text-gray-700">
          ${product.price ? product.price.toFixed(2) : "Price Unavailable"}
        </p>
        <p className="text-gray-600">
          {product.description || "No description available"}
        </p>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Brand:</span>{" "}
            {product.brand || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Material:</span>{" "}
            {product.material || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Bracelet:</span>{" "}
            {product.bracelet || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Condition:</span>{" "}
            {product.condition || "N/A"}
          </p>
        </div>
        <div className="flex space-x-4 pt-4">
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
          <Button
            onClick={handleToggleWishlist}
            variant="outline"
            className={`flex-1 ${
              isWishlisted ? "bg-red-100 text-red-600 border-red-600" : ""
            }`}
          >
            <Heart className="mr-2 h-5 w-5" />{" "}
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
