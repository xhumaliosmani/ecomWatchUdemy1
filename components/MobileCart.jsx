import React, { useEffect, useState, useRef } from "react";
import useCartStore from "@/store/cartStore";
import Image from "next/image";
import { Trash2, ShoppingCart, X, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MobileCart = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    items,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalItems,
    updateItemQuantity,
  } = useCartStore();

  const cartRef = useRef(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  const handleCheckout = () => {
    window.location.href = "/checkout";
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={cartRef}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 bg-white z-50 overflow-y-auto"
          style={{ height: "100vh" }}
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
              <button onClick={onClose} className="p-2">
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-12 flex-grow flex flex-col justify-center">
                <ShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
                <p className="mt-4 text-lg text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6 flex-grow overflow-y-auto">
                  {items.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50"
                    >
                      <Image
                        src={item?.images[0]}
                        width={60}
                        height={60}
                        className="rounded-md object-cover mr-3"
                        alt={item.name}
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-sm text-gray-800 pr-2">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {item?.brand} - {item?.material}
                        </p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item._id,
                                (item.quantity || 1) - 1
                              )
                            }
                            className="p-1 bg-gray-200 rounded-full"
                          >
                            <Minus className="h-4 w-4" />
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
                            className="p-1 bg-gray-200 rounded-full"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-gray-800">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="mt-2 p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-150"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Subtotal:</span>
                    <span className="font-semibold">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Shipping:</span>
                    <span className="font-semibold">
                      Calculated at checkout
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-4">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileCart;
