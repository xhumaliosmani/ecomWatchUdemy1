import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import useCartStore from "@/store/cartStore";
import { Heart, ShoppingCart, Trash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const obeserver = useRef();

  const lastItemElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (obeserver.current) obeserver.current.disconnect();
      obeserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoadingMore(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const res = await axios.get(`/api/wishlist?page=${page}&limit=10`);
        if (res.data && Array.isArray(res.data.items)) {
          setWishlistItems((prevItem) => {
            const newItem = res.data.items.filter(
              (item) => !prevItem._id === item._id
            );
            return [...prevItem, ...newItem];
          });
          setHasMore(res.data.hasMore);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchWishlist();
  }, [page]);

  const removeFromWishlist = async () => {
    try {
      await axios.delete("/api/wishlist", { data: { productId } });
      toast.success("Removed from wishlist");
      setWishlistItems((prevItem) =>
        prevItem.filter((item) => item._id !== productId)
      );
      if (wishlistItems.length <= 10 && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product) => {
    addItem(product);
    toast.success("Added product to cart");
  };

  return (
    <Card className="w-full bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-[#3a4063] to-[#535C91] p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
          <Heart className="mr-2" /> Your Wishlist
        </h2>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-4">
        {wishlistItems.length === 0 && !loading ? (
          <p className="text-center text-gray-500 py-8">
            Your wishlist is empty.
          </p>
        ) : (
          wishlistItems.map((item, index) => (
            <div
              key={item._id}
              ref={
                index === wishlistItems.length - 1 ? lastItemElementRef : null
              }
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100 group animate-fadeIn"
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto mb-4 sm:mb-0">
                <Image
                  height={500}
                  width={500}
                  src={item.images[0] || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <Link href={`/product/${item._id}`}>
                    <p className="font-semibold text-lg text-gray-800 hover:text-[#535C91] transition-colors duration-200 cursor-pointer">
                      {item.name}
                    </p>
                  </Link>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none bg-white text-red-500 border-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none flex items-center justify-center"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  <Trash className="mr-2 h-4 w-4" /> Remove
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 sm:flex-none bg-[#535C91] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-[#3a4063] focus:outline-none flex items-center justify-center"
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </div>
          ))
        )}
        {(loading || loadingMore) && (
          <div className="flex flex-col justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#535C91] mb-4"></div>
            <p className="text-gray-600 font-medium">
              Loading more items, please wait...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Wishlist;
