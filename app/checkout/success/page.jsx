import Link from "next/link";
import { Suspense } from "react";
import OrderIdComponent from "./OrderIdComponent";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <svg
          className="mx-auto h-16 w-16 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Payment Successful!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for your purchase. We've sent you an email with all the
          details of your order.
        </p>
        <div className="mt-8">
          <Suspense
            fallback={
              <p className="text-sm text-gray-500">Loading order details...</p>
            }
          >
            <OrderIdComponent />
          </Suspense>
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
