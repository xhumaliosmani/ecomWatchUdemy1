import { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const ProductImageGallery = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const thumbnailRef = useRef(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (thumbnailRef.current) {
      const activeThumbnail = thumbnailRef.current.children[currentImageIndex];
      const offsetLeft = activeThumbnail.offsetLeft;
      const offsetWidth = activeThumbnail.offsetWidth;
      const containerWidth = thumbnailRef.current.offsetWidth;
      const scrollPosition =
        offsetLeft - (containerWidth / 2 - offsetWidth / 2);
      thumbnailRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentImageIndex]);

  return (
    <div className="md:w-1/2 p-6">
      <div className="relative sm:h-[45rem] h-[30rem] mb-6" {...handlers}>
        <Image
          src={product.images[currentImageIndex]}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button
            onClick={prevImage}
            className="bg-white/50 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors focus:outline-none"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <button
            onClick={nextImage}
            className="bg-white/50 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors focus:outline-none"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="relative">
        <div
          className="flex space-x-4 overflow-x-auto pb-4 pt-2 px-2 hide-scrollbar"
          ref={thumbnailRef}
        >
          {product.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`${product.name} - Image ${index + 1}`}
              width={80}
              height={80}
              objectFit="cover"
              className={`rounded-lg cursor-pointer transition-all duration-300 ${
                currentImageIndex === index
                  ? "ring-2 ring-blue-500"
                  : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
