import { NextResponse } from "next/server";
import connect from "@/utils/config/dbConnection";
import { Product } from "@/utils/models/Product";

export async function GET() {
  await connect();
  try {
    const featuredProduct = await Product.findOne({ featured: true });

    if (!featuredProduct) {
      return NextResponse.json(
        { error: "error fetching featured product" },
        { status: 500 }
      );
    }
    return NextResponse.json(featuredProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "errot fetching product", error: error.toString() },
      { status: 500 }
    );
  }
}
