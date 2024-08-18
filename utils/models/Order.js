import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the customer's full name"],
    },
    email: {
      type: String,
      required: [true, "Please provide the customer's email"],
    },
    city: {
      type: String,
      required: [true, "Please provide the city"],
    },
    postalCode: {
      type: String,
      required: [true, "Please provide the postal code"],
    },
    streetAddress: {
      // Changed from streetAdress to streetAddress
      type: String,
      required: [true, "Please provide the customer's address"],
    },
    country: {
      type: String,
      required: [true, "Please provide the country"],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    cartProducts: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "payment_failed",
      ],
      default: "pending",
    },
    total: {
      type: Number,
      required: [true, "Total order amount is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
