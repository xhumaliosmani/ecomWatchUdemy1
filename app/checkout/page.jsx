"use client";
import React, { useEffect, useState } from "react";
import useCartStore from "../../store/cartStore.js";
import Image from "next/image";
import { Trash2, ShoppingCart, Plus, Minus, Lock } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import secureCheckout from "@/public/securecheckout.png";
import ssl from "@/public/ssl.png";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Cart = ({ ids }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const {
    items,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalPrice,
    updateItemQuantity,
  } = useCartStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const userId = session?.user?._id;

  useEffect(() => {
    setIsLoading(false);
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setIsSuccess(true);
      clearCart();
    }

    // Set email if user is logged in
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  const handleCheckout = async () => {
    try {
      console.log("Checkout data:", {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartItems: items.map((item) => ({
          id: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        user: userId,
      });

      const response = await axios.post("/api/checkout", {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartItems: items.map((item) => ({
          id: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        user: userId,
      });

      if (response.data.url) {
        window.location = response.data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const renderEmailField = () => {
    if (session?.user?.email) {
      return (
        <input
          type="email"
          value={email}
          readOnly
          className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
        />
      );
    } else {
      return (
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
        />
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Thanks for your order!</h1>
        <p>We will email you when your order will be sent.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="h-screen mb-20 sm:mb-0 sm:block hidden">
        <div className="max-w-4xl sm:mt-10 mt-4 sm:pt-16 sm:pb-20 mx-auto p-6 bg-slate-50 shadow-xl rounded-lg">
          <h2 className="text-3xl font-bold text-center py-6 text-gray-800">
            Your Cart
          </h2>
          {items.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
              <p className="mt-4 text-xl text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="max-h-[calc(60vh-300px)] overflow-y-auto">
                {items.map((item) => (
                  <div
                    className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out"
                    key={item._id}
                  >
                    <div className="flex items-center space-x-4 w-full md:w-auto">
                      <Image
                        src={item?.images[0]}
                        width={80}
                        height={80}
                        className="rounded-md object-cover shadow-lg"
                        alt={item.name}
                        unoptimized
                      />
                      <div className="flex flex-col w-full md:w-auto">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm font-bold text-gray-500">
                          <span className="font-normal">Brand: </span>
                          {item?.brand}
                        </p>
                        <p className="text-sm font-bold text-gray-500">
                          <span className="font-normal">Material: </span>
                          {item?.material}
                        </p>
                        <p className="text-sm font-bold text-gray-500">
                          <span className="font-normal">Condition: </span>
                          {item?.condition}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item._id,
                                (item.quantity || 1) - 1
                              )
                            }
                            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-150 ease-in-out"
                          >
                            <Minus className="h-4 w-4 text-gray-700" />
                          </button>
                          <span className="mx-2 text-sm">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item._id,
                                (item.quantity || 1) + 1
                              )
                            }
                            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-150 ease-in-out"
                          >
                            <Plus className="h-4 w-4 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <span className="font-bold text-lg text-gray-800">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-150 ease-in-out"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2 bg-slate-50/20 p-4 rounded-lg shadow-lg">
                <div className="flex justify-between text-lg">
                  <span>Total Items:</span>
                  <span className="font-semibold">{getTotalItems()}</span>
                </div>
                <div className="flex justify-between text-xl">
                  <span>Total Price:</span>
                  <span className="font-bold">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
                {renderEmailField()}
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleCheckout}
                  className="bg-gradient-to-b sm:w-[50%] w-full from-blue-400 to-blue-500 text-white py-2 px-4 rounded-md hover:from-blue-500 hover:to-blue-600 transition-colors duration-150 ease-in-out shadow-lg flex items-center justify-center space-x-2"
                >
                  <Lock className="h-5 w-5 text-white" />
                  <span>Proceed to Checkout</span>
                </button>
              </div>
              <div className="mt-6 flex justify-center items-center space-x-4">
                <Image
                  src={secureCheckout}
                  alt="Secure Payment"
                  width={250}
                  height={250}
                />
                <Image
                  src={ssl}
                  alt="Secure Payment"
                  width={105}
                  height={105}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile view */}
      <div className="min-h-screen mb-20 sm:mb-0 flex flex-col sm:hidden">
        <div className="max-w-4xl sm:mt-20 mt-4 sm:pt-16 sm:pb-20 mx-auto p-6 bg-slate-50 shadow-xl rounded-lg flex-grow">
          <h2 className="text-3xl font-bold text-center py-6 text-gray-800">
            Your Cart
          </h2>
          {items.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
              <p className="mt-4 text-xl text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                {items.map((item) => (
                  <div
                    className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out"
                    key={item._id}
                  >
                    <div className="flex items-center space-x-4 w-full md:w-auto">
                      <Image
                        src={item?.images[0]}
                        width={80}
                        height={80}
                        className="rounded-md object-cover shadow-lg"
                        alt={item.name}
                        unoptimized
                      />
                      <div className="flex flex-col w-full md:w-auto">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm font-bold text-gray-500">
                          <span className="font-normal">Brand: </span>
                          {item?.brand}
                        </p>
                        <p className="text-sm font-bold text-gray-500">
                          <span className="font-normal">Material: </span>
                          {item?.material}
                        </p>
                        <p className="text-sm font-bold text-gray-500">
                          <span className="font-normal">Condition: </span>
                          {item?.condition}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item._id,
                                (item.quantity || 1) - 1
                              )
                            }
                            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-150 ease-in-out"
                          >
                            <Minus className="h-4 w-4 text-gray-700" />
                          </button>
                          <span className="mx-2 text-sm">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item._id,
                                (item.quantity || 1) + 1
                              )
                            }
                            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-150 ease-in-out"
                          >
                            <Plus className="h-4 w-4 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <span className="font-bold text-lg text-gray-800">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-150 ease-in-out"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2 bg-slate-50/20 p-4 rounded-lg shadow-lg">
                <div className="flex justify-between text-lg">
                  <span>Total Items:</span>
                  <span className="font-semibold">{getTotalItems()}</span>
                </div>
                <div className="flex justify-between text-xl">
                  <span>Total Price:</span>
                  <span className="font-bold">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
                {renderEmailField()}
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleCheckout}
                  className="bg-gradient-to-b sm:w-[50%] w-full from-blue-400 to-blue-500 text-white py-2 px-4 rounded-md hover:from-blue-500 hover:to-blue-600 transition-colors duration-150 ease-in-out shadow-lg flex items-center justify-center space-x-2"
                >
                  <Lock className="h-5 w-5 text-white" />
                  <span>Proceed to Checkout</span>
                </button>
              </div>
              <div className="mt-8 flex justify-center items-center space-x-4">
                <Image
                  src={secureCheckout}
                  alt="Secure Payment"
                  width={250}
                  height={250}
                />
                <Image
                  src={ssl}
                  alt="Secure Payment"
                  width={105}
                  height={105}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
