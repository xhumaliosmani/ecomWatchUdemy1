import { NextResponse } from "next/server";
import connect from "@/utils/config/dbConnection";
import { Product } from "@/utils/models/Product";

export async function GET(req) {
  await connect();

  try {
    const featuredProduct = await Product.find({ featured: true });
    return NextResponse.json(featuredProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "errot fetching featured product" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await connect();
  const { productId } = params;

  try {
    const updatedFeaturedProducts = await Product.updateMany(
      { featured: true },
      { featured: false }
    );
    console.log("all products featured false:", updatedFeaturedProducts);

    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      { featured: true },
      { new: true }
    );
    console.log("only the selected product is featured: ", updateProduct);

    if (!updateProduct) {
      return NextResponse.json(
        { error: "errot finding featured product" },
        { status: 404 }
      );
    }

    return NextResponse.json(updateProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "errot updating featured product" },
      { status: 500 }
    );
  }
}
