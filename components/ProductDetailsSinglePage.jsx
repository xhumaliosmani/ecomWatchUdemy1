import React from "react";
import ProductImageGallery from "./ProductImageGallery";
import GuaranteeSection from "./GuaranteeSection";
import ReviewSection from "./ReviewSection";
import FAQSection from "./FAQSection";
import FeaturesSection from "./FeaturesSection";
import ProdDetailsList from "./ProdDetailsList";
import ProdDetailsPrice from "./ProdDetailsPrice";

const ProductDetailsSinglePage = ({
  product,
  averageRating,
  allReviews,
  isInWishlist,
  handleAddToCart,
  toggleWishlist,
}) => {
  
  
  return (
    <div className="container mx-auto sm:px-[15rem] py-12 max-w-full">
      <div className="flex flex-col md:flex-row gap-12 bg-white rounded-t-xl shadow-lg overflow-hidden">
        <ProductImageGallery product={product} />
        <ProdDetailsPrice
          product={product}
          averageRating={averageRating}
          allReviews={allReviews}
          isInWishlist={isInWishlist}
          handleAddToCart={handleAddToCart}
          toggleWishlist={toggleWishlist}
        />
      </div>

      <ProdDetailsList product={product} />
      <GuaranteeSection />
      <ReviewSection productId={product._id.toString()} />
      <FAQSection />
      <FeaturesSection />
    </div>
  );
};

export default ProductDetailsSinglePage;
