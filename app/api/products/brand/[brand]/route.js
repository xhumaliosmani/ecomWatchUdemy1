import connect from "@/utils/config/dbConnection";
import { Product } from "@/utils/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connect();

  const { brand } = params;

  try {
    function createFlexibleSearchPattern(input) {
      const stripped = input.replace(/\s+/g, "").toLowerCase();
      return stripped.split("").join("\\s*");
    }

    const flexiblePattern = createFlexibleSearchPattern(brand);

    const brandRegex = new RegExp(flexiblePattern, "i");

    const foundProducts = await Product.find({ brand: brandRegex })
      .populate("user")
      .sort({ createdAt: -1 });

    if (foundProducts && foundProducts.length > 0) {
      return NextResponse.json(foundProducts);
    } else {
      return new NextResponse(
        { error: "error fetching brand products with this name" },
        { status: 404 }
      );
    }
  } catch (error) {
    return new NextResponse(
      { error: "error fetching brand products" },
      { status: 500 }
    );
  }
}
