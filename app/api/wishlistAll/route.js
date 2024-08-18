import connect from "@/utils/config/dbConnection";
import { Product } from "@/utils/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/utils/models/User";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "user not found or not authenticated" },
        { status: 401 }
      );
    }
    await connect();

    const user = await User.findOne({ _id: session.user._id });
    if (!user) {
      return NextResponse.json(
        { error: "user not found or not authenticated" },
        { status: 401 }
      );
    }
    const wishlisItems = await Product.find({
      _id: { $in: user.wishlist },
    });
    return NextResponse.json({ items: wishlisItems });
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error at the wishlist route" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "user not found or not authenticated" },
        { status: 401 }
      );
    }
    await connect();
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { error: "product id not found" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ _id: session.user._id });
    if (!user) {
      return NextResponse.json(
        { error: "user not found or not authenticated" },
        { status: 401 }
      );
    }
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { error: "product not found by id" },
        { status: 401 }
      );
    }

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    return NextResponse.json(
      {
        message: "Product has been wishlisted",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error at the wishlist route" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "user not found or not authenticated" },
        { status: 401 }
      );
    }
    await connect();
    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: "prod id not found" }, { status: 404 });
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();
    return NextResponse.json(
      {
        message: "product removed from wishlist",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error at the wishlist route" },
      { status: 500 }
    );
  }
}
