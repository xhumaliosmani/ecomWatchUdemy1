import { NextResponse } from "next/server";
import connect from "@/utils/config/dbConnection";
import Order from "@/utils/models/Order";
import { Product } from "@/utils/models/Product";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    console.log("Starting checkout process");
    await connect();
    console.log("Database connected");

    const body = await req.json();
    console.log("Received body:", body);

    const {
      name,
      email,
      city,
      postalCode,
      streetAddress, // Ensure this matches the field name in the frontend
      country,
      cartItems,
      user,
    } = body;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    console.log("Cart items:", cartItems);

    const productIds = cartItems.map((item) => item.id);
    const uniqueIds = [...new Set(productIds)];
    console.log("Unique product IDs:", uniqueIds);

    let productsInfos;
    try {
      productsInfos = await Product.find({ _id: { $in: uniqueIds } });
      console.log("Found products:", productsInfos);
    } catch (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { error: "Error fetching products", details: error.message },
        { status: 500 }
      );
    }

    if (!productsInfos || productsInfos.length === 0) {
      return NextResponse.json({ error: "No products found" }, { status: 400 });
    }

    let line_items = [];
    let total = 0;
    let orderCartProducts = [];

    for (const cartItem of cartItems) {
      console.log("Processing cart item:", cartItem);
      const productInfo = productsInfos.find(
        (p) => p._id.toString() === cartItem.id
      );

      if (productInfo) {
        console.log("Found product info:", productInfo);
        const quantity = cartItem.quantity || 0;
        if (quantity > 0) {
          total += productInfo.price * quantity;
          line_items.push({
            price_data: {
              currency: "usd",
              product_data: {
                name: productInfo.name,
              },
              unit_amount: Math.round(productInfo.price * 100),
            },
            quantity: quantity,
          });
          orderCartProducts.push({
            product: productInfo._id,
            quantity: quantity,
            price: productInfo.price,
          });
        }
      } else {
        console.log("Product not found for ID:", cartItem.id);
      }
    }

    console.log("Line items:", line_items);
    console.log("Total:", total);

    // Create the order
    let orderDoc;
    try {
      orderDoc = await Order.create({
        name,
        email,
        city,
        postalCode,
        streetAddress, // Ensure this matches the field name in the schema
        country,
        paid: false,
        cartProducts: orderCartProducts,
        total,
        user,
      });
      console.log("Order created:", orderDoc);
    } catch (error) {
      console.error("Error creating order:", error);
      return NextResponse.json(
        { error: "Error creating order", details: error.message },
        { status: 500 }
      );
    }

    // Create Stripe checkout session
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?orderId=${orderDoc._id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/canceled`,
        metadata: {
          orderId: orderDoc._id.toString(),
        },
      });
      console.log("Stripe session created:", session.id);
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      return NextResponse.json(
        { error: "Error creating Stripe session", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        url: session.url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
