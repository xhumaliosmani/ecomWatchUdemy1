"use client";

import React, { useEffect, useState } from "react";
import useCartStore from "../store/cartStore";
import Link from "next/link";
import { Button } from "./ui/button";
import MobileCart from "./MobileCart";

const CartIconMobile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const { items, getTotalItems } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setItemCount(getTotalItems());
  }, [items, getTotalItems]);

  if (isLoading) {
    return null; // Or a loading placeholder if you prefer
  }

  return (
    <div>
      <nav className="bg-inherit z-20 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between h-14">
            <div className="flex items-center">
              <div
                className="relative flex items-center cursor-pointer pl-4"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                {" "}
                <p className="mr-2 font-medium border px-2 py-1 rounded-md bg-slate-50/50">
                  Your Cart:{" "}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700 hover:text-gray-900 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <MobileCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default CartIconMobile;
