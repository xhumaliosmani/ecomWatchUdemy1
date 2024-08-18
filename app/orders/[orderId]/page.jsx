"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckCircleIcon,
  TruckIcon,
  CalendarIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

export default function OrderDetails({ params }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = params;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/${orderId}`);
        if (res.status === 200) {
          console.log(res.data);
          
          setOrder(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if(loading){
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-400"></div>
        </div>
    )
  }
  if(error){
    return <div className="text-center text-red-500">{error}</div>
  }
  if(!order){
    return <div className="text-center mt-8">Order Not Found</div>
  }

  const formatDate = (dateString)=> {
    const options = {year: "numeric", month: "long", day:"numeric"};
    return new Date(dateString).toLocaleDateString(undefined, options);
  }


  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
          <h1 className="text-3xl font-bold text-white">Order Summary</h1>
          <p className="text-indigo-100">Thank you for your purchase!</p>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <CalendarIcon className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-gray-600">
                Order Date: {formatDate(order.createdAt)}
              </span>
            </div>
            <div className="flex items-center">
              <CreditCardIcon className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-gray-600">
                Payment Status: {order.paid ? "Paid" : "Pending"}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Items
            </h2>
            <div className="space-y-4">
              {order.cartProducts.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                >
                  <Link
                    className="flex items-center space-x-4"
                    href={`/product/${item.product._id}`}
                  >
                    <Image
                      height={500}
                      width={500}
                      src={item?.product?.images[0]}
                      alt={item?.product?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-500">
                        {item.product.description.slice(0, 50) + " ..."}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </Link>
                  <span className="text-lg font-semibold text-gray-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-indigo-600">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Shipping Information
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {order.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Address:</span>{" "}
                {order.streetAddress}, {order.city}, {order.postalCode}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Country:</span> {order.country}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex items-center">
              <TruckIcon className="h-6 w-6 text-indigo-500 mr-2" />
              <span className="text-lg font-medium text-gray-900">
                Order Status: {order.status}
              </span>
            </div>
            <div className="mt-4 bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-700">
                  Your order is: {order.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 mt-6">
          <p className="text-sm text-gray-500 text-center">
            If you have any questions about your order, please contact our
            customer support.
          </p>
        </div>
      </div>
    </div>
  );
}
