import Link from "next/link";

export default function CheckoutCanceled() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Payment Canceled
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Your payment was canceled. If you have any questions, please contact
          our support team.
        </p>
        <div className="mt-8">
          <Link
            href="/cart"
            className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Return to Cart
          </Link>
        </div>
        <div className="mt-4">
          <Link
            href="/"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
