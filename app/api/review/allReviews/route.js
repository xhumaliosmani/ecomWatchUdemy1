import connect from "@/utils/config/dbConnection";
import Review from "@/utils/models/Review";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "product id not found in the review route" },
        { status: 400 }
      );
    }

    const review = await Review.find({ product: productId })
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    return NextResponse.json({ review }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error at the review api route" },
      { status: 500 }
    );
  }
}
