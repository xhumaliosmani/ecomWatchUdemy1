import connect from "@/utils/config/dbConnection";
import Review from "@/utils/models/Review";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Order from "@/utils/models/Order";
import mongoose from "mongoose";
import { Product } from "@/utils/models/Product";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ canReview: false }, { status: 200 });
    }

    const { productId, rating, comment } = await req.json();
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "invalid product id" },
        { status: 400 }
      );
    }

    const objectIdProductId = new mongoose.Types.ObjectId(productId);

    const hasPurchased = await Order.findOne({
      user: session.user._id,
      "cartProducts.product": objectIdProductId,
      status: "delivered",
      paid: true,
    });

    if (!hasPurchased) {
      console.log("user has not purchased the product");
      return NextResponse.json({ canReview: false }, { status: 200 });
    }

    const existingReview = await Review.findOne({
      user: session.user._id,
      product: objectIdProductId,
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "you have already reviewed this" },
        { status: 400 }
      );
    }

    const newReview = new Review({
      user: session.user._id,
      product: objectIdProductId,
      rating,
      comment,
    });
    await newReview.save();

    const product = await Product.findById(objectIdProductId);

    if (!product) {
      return NextResponse.json({ error: "prod not found" }, { status: 404 });
    }

    product.reviews.push(newReview._id);
    product.numReviews = product.review.length;
    const allReveiws = await Review.find({ product: objectIdProductId });
    const avgRating =
      allReveiws.reduce((acc, item) => item.rating + acc, 0) /
      allReveiws.length;
    product.averageRating = avgRating;

    await product.save();

    return NextResponse.json(
      {
        message: "Review added sucessfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error at the review api route main" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ canReview: false }, { status: 200 });
    }

    const { reviewId, rating, comment } = await req.json();

    const review = await Review.findOne({
      _id: reviewId,
      user: session.user._id,
    });

    if (!review) {
      return NextResponse.json(
        { error: "failed to find review" },
        { status: 404 }
      );
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    const product = await Product.findById(review.product);
    const allReviews = await Review.find({ product: review.product });
    const avgRating =
      allReviews.reduce((acc, item) => item.rating + acc, 0) /
      allReviews.length;
    product.averageRating = avgRating;
    await product.save();

    return NextResponse.json({ message: "Review updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error at the review api route main" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    const page = parseInt(searchParams.get("page") || 1);
    const limit = parseInt(searchParams.get("limit") || 5);
    if (!productId) {
      return NextResponse.json(
        { error: "prod id is required" },
        { status: 400 }
      );
    }
    const skip = (page - 1) * limit;
    const reviews = await Review.find({ product: productId })
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments({ product: productId });
    const hasMore = total > skip + reviews.length;

    return NextResponse.json({ reviews, hasMore }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error at the review api route main" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ canReview: false }, { status: 200 });
    }
    const { reviewId } = await req.json();

    const review = await Review.findOne({
      _id: reviewId,
      user: session.user._id,
    });

    if (!review) {
      return NextResponse.json(
        { error: "failed to getr review" },
        { status: 404 }
      );
    }

    const productId = review.product;
    await Review.deleteOne({ _id: reviewId });

    const product = await Product.findById(productId);

    product.reviews = product.review.filter((r) => r.toString() !== reviewId);

    product.numReviews = product.review.length;

    if (product.numReviews > 0) {
      const allReviews = await Review.find({ product: productId });
      const avgRating =
        allReviews.reduce((acc, item) => item.rating + acc, 0) /
        allReviews.length;
      product.averageRating = avgRating;
    } else {
      product.averageRating = 0;
    }
    await product.save();

    return NextResponse.json(
      { message: "Sucessfully deleted review" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error at the review api route main" },
      { status: 500 }
    );
  }
}
