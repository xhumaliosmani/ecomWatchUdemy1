"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Package,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Orders = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const limit = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/ordersAdmin?page=${page}&limit=${limit}`
        );
        console.log(res.data);
        console.log(Math.ceil(totalOrders / limit));
        

        setOrders(res.data.orders);
        setHasMore(res.data.hasMore);
        setTotalOrders(res.data.totalOrders);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [page]);

  const handleNextPage = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleMarkAsDelivered = async (orderId) => {
    try {
      const res = await axios.put("api/orders", { orderId });
      if (res.data.order) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: "delivered" } : order
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const totalPages = Math.ceil(totalOrders / limit);

  useEffect(() => {
    if (status !== "authenticated" && !session?.user) {
      router.push("/");
    }
  }, [status, session, router]);

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Orders
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {orders.map((order) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-md rounded-lg p-4 sm:p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-semibold">
                        {order.name}
                      </h2>
                    </div>

                    <div className="flex">
                      {" "}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "delivered"
                            ? "bg-green-200 text-green-800"
                            : order.status === "processing"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      <div className="pl-4">
                        {order.status !== "delivered" && (
                          <button
                            onClick={() => handleMarkAsDelivered(order._id)}
                            className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors duration-200"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Mark as Delivered</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">
                        <strong>Email:</strong> {order.email}
                      </p>
                      <p className="text-gray-600">
                        <strong>City:</strong> {order.city}
                      </p>
                      <p className="text-gray-600">
                        <strong>Postal Code:</strong> {order.postalCode}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        <strong>Street Address:</strong> {order.streetAddress}
                      </p>
                      <p className="text-gray-600">
                        <strong>Country:</strong> {order.country}
                      </p>
                      <p className="text-gray-600">
                        <strong>Total:</strong> ${order.total}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">
                    <strong>Created At:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Products:</h3>
                    <div className="space-y-2">
                      {order.cartProducts.map((productItem, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md"
                        >
                          <Package className="w-6 h-6 text-blue-500 flex-shrink-0" />
                          <div className="flex-grow">
                            {productItem.product ? (
                              <Link
                                href={`/product/${productItem.product._id}`}
                                passHref
                              >
                                <div className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors duration-200">
                                  <p className="font-medium text-blue-600 hover:underline">
                                    {productItem.product.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Quantity: {productItem.quantity} | Price: $
                                    {productItem.product.price}
                                  </p>
                                </div>
                              </Link>
                            ) : (
                              <p className="text-red-500">
                                Product details not available
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <span className="text-lg text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={!hasMore}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 transition-colors duration-200"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
