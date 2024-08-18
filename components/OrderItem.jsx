import React from "react";
import { Button } from "@/components/ui/button";

const OrderItem = ({ order }) => {
  // Function to safely format the total
  const formatTotal = (total) => {
    if (typeof total === "number") {
      return total.toFixed(2);
    } else if (typeof total === "string" && !isNaN(parseFloat(total))) {
      return parseFloat(total).toFixed(2);
    }
    return "N/A"; // or any default value you prefer
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100 animate-fadeIn">
      <div>
        <p className="font-semibold text-lg text-gray-800">
          Order #{order._id ? order._id.slice(-6) : "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          Placed on:{" "}
          {order.createdAt
            ? new Date(order.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
        <p className="text-sm text-gray-500">Status: {order.status || "N/A"}</p>
        <p className="text-sm font-medium text-indigo-600">
          Total: ${formatTotal(order.total)}
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="bg-white text-[#535C91] border-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-slate-50 hover:border-[#1B1A55] focus:outline-none"
        onClick={() => (window.location.href = `/orders/${order._id}`)}
      >
        View Details
      </Button>
    </div>
  );
};

export default OrderItem;
