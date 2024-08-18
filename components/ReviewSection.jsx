import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Star, StarHalf, Pencil, BadgeCheck, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [userReview, setUserReview] = useState({ rating: 0, comment: "" });
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [canReview, setCanReview] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { data: session } = useSession();
  const reviewsPerPage = 5;

  const fetchReviews = useCallback(
    async (pageNumber = 1) => {
      if (!productId) return;
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/review?productId=${productId}&page=${pageNumber}&limit=${reviewsPerPage}`
        );
        if (pageNumber === 1) {
          setReviews(res.data.reviews);
        } else {
          setReviews((prevReviews) => [...prevReviews, ...res.data.reviews]);
        }
        setHasMore(res.data.hasMore);
      } catch (error) {
        console.log(error);
        setError("Failed to load");
      } finally {
        setLoading(false);
      }
    },
    [productId]
  );

  const fetchAllReviews = useCallback(async () => {
    async ()=> {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/review/allReviews?productId=${productId}`
        );
        setAllReviews(res.data.reviews);
      } catch (error) {
        console.log(error);
        setError("failed to load all reviews")
        
      } finally {
        setLoading(false)
      }

    }
  }, [productId]);

  const checkCanReview = useCallback(async () => {
    if (!session || !session.user || !productId) return;
    try {
      const res = await axios.get(
        `/api/review/canReview?productId=${productId}`
      );
      setCanReview(res.data.canReview);
      setAllReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
      setError("Failed to load");
    } finally {
      setLoading(false);
    }
  }, [session, productId]);

  useEffect(() => {
    fetchAllReviews();
    checkCanReview();
    fetchReviews();
  }, [fetchReviews, checkCanReview]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      return;
    }
    try {
      await axios.post("/api/review", { productId, ...userReview });
      setUserReview({ rating: 0, comment: "" });
      fetchReviews(1);
      checkCanReview();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    if (!session || !editingReview) {
      return;
    }
    try {
      await axios.put("/api/review", {
        reviewId: editingReview._id,
        ...userReview,
      });
      setUserReview({ rating: 0, comment: "" });
      setEditingReview(null);
      fetchReviews(1);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreReviews = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchReviews(nextPage);
  };

  const renderStars = (rating) => {
    const starts = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starts.push(
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        );
      } else if (i - 0.5 <= rating) {
        starts.push(
          <StarHalf
            key={i}
            className="w-5 h-5 text-yellow-400 fill-yellow-400"
          />
        );
      } else {
        starts.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return starts;
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setUserReview({ rating: review.rating, comment: review.comment });
  };

  return (
    <div className="mt-12 bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-lg p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Customer Reviews
      </h2>
      <p className="pl-2 pb-2 text-sm">
        Total Reviews: ({allReviews ? allReviews.length : 0})
      </p>

      <AnimatePresence>
        {(canReview || editingReview) && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={editingReview ? handleUpdateReview : handleReviewSubmit}
            className="mb-8 bg-white p-4 md:p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              {editingReview ? "Edit Your Review" : "Write a Review"}
            </h3>
            <div className="mb-4 md:mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`cursor-pointer w-6 h-6 md:w-8 md:h-8 transition-all duration-200 ${
                      star <= userReview.rating
                        ? "text-yellow-400 fill-yellow-400 transform scale-110"
                        : "text-gray-300 hover:text-yellow-300"
                    }`}
                    onClick={() =>
                      setUserReview({ ...userReview, rating: star })
                    }
                  />
                ))}
              </div>
            </div>
            <div className="mb-4 md:mb-6">
              <label
                htmlFor="comment"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Your Review
              </label>
              <Textarea
                id="comment"
                value={userReview.comment}
                onChange={(e) =>
                  setUserReview({ ...userReview, comment: e.target.value })
                }
                required
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                rows="4"
                placeholder="Share your thoughts about the product..."
              />
            </div>
            <div className="flex space-x-3">
              <Button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                {editingReview ? "Update Review" : "Submit Review"}
              </Button>
              {editingReview && (
                <Button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Cancel
                </Button>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {error && <p className="text-red-500 text-center py-4">{error}</p>}

      <div className="space-y-4 md:space-y-6">
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Image
                  height={500}
                  width={500}
                  src={review.user.profileImage}
                  alt={review.user.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4 object-cover border-2 border-gray-200"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {review.user.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex">{renderStars(review.rating)}</div>
            </div>
            <p className="text-gray-700 mb-4">{review.comment}</p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <button
                  disabled
                  className="flex items-center text-emerald-500 hover:text-emerald-700 transition-colors duration-200"
                >
                  <BadgeCheck className="w-5 h-5 md:w-6 md:h-6 mr-1" />
                  <span className="text-sm">Verified Purchase</span>
                </button>
              </div>
              {session &&
                session.user._id === review.user._id &&
                !editingReview && (
                  <button
                    onClick={() => handleEditReview(review)}
                    className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Pencil className="w-4 h-4 md:w-5 md:h-5 mr-1" /> Edit
                    Review
                  </button>
                )}
            </div>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMoreReviews}
            disabled={loading}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center mx-auto"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-700"></div>
            ) : (
              <>
                Load More Reviews
                <ChevronDown className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
