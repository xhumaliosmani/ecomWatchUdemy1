import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const EditProductButton = ({ productId }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/editProduct/${productId}`);
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
    >
      Edit Product
    </Button>
  );
};

export default EditProductButton;
