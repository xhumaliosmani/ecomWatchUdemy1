import { NextResponse } from "next/server";
import connect from "@/utils/config/dbConnection";
import Order from "@/utils/models/Order";
import { Product } from "@/utils/models/Product";

export async function GET(req) {
  await connect();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 5;

  const skip = (page - 1) * limit;

  try {
    //find everything
    const orders = await Order.find()
      .populate({
        path: "cartProducts.product",
        model: Product,
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments();

    const hasMore = totalOrders > skip + orders.length;

    return NextResponse.json({
      orders,
      hasMore,
      totalOrders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await connect();

  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "no orderid" }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status: "delivered",
      },
      { new: true }
    ).populate({
      path: "cartProducts.product",
      model: Product,
    });

    if (!updatedOrder) {
      return NextResponse.json({ error: "order not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "order status is updated to delivered",
      order: updatedOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "failed to upodate order status" },
      { status: 500 }
    );
  }
}
