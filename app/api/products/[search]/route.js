import connect from "@/utils/config/dbConnection";
import { Product } from "@/utils/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await connect();
  const { params } = res;
  const searchTerm = params?.search;

  // Function to convert search term to a more flexible regex pattern
  function createFlexibleSearchRegex(searchTerm) {
    // Escape special regex characters to avoid errors and unintended behavior
    const escapedSearchTerm = searchTerm.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      "\\$&"
    );
    // Insert optional whitespace between each character
    const regexPattern = escapedSearchTerm.split("").join("\\s*");
    return new RegExp(regexPattern, "i"); // Case insensitive regex
  }

  const searchTermRegex = createFlexibleSearchRegex(searchTerm);

  const foundProducts = await Product.find({
    $or: [
      { name: { $regex: searchTermRegex } },
      { shortDescription: { $regex: searchTermRegex } },
    ],
  })
    .populate("user")
    .sort({ createdAt: -1 });

  if (foundProducts) {
    return NextResponse.json(foundProducts);
  } else {
    return new NextResponse("Cant fetch products, something went wrong", {
      status: 500,
    });
  }
}
