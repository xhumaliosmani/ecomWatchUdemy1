"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderIdComponent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  if (orderId) {
    return (
      <Link
        href={`/orders/${orderId}`}
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        View your order
      </Link>
    );
  } else {
    return <p className="text-sm text-gray-500">Order details not available</p>;
  }
}
