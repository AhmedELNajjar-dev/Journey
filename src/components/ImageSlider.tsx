import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  productName: string;
  onLoad?: () => void;
}

export default function ImageSlider({ images, productName, onLoad }: ImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [touchOffset, setTouchOffset] = useState(0); // To track the offset of the touch
  const touchStartX = useRef(0); // For tracking touch start position

  useEffect(() => {
    if (loadedImages.length === images.length) {
      setIsLoading(false);
      if (onLoad) onLoad(); // Trigger onLoad when all images are loaded
    }
  }, [loadedImages, images.length, onLoad]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  const changeImage = (nextIndex: number) => {
    setCurrentImageIndex(nextIndex);
  };

  const nextImage = () => changeImage((currentImageIndex + 1) % images.length);

  const prevImage = () =>
    changeImage(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setTouchOffset(0); // Reset touch offset when starting a new touch
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchMoveX = e.touches[0].clientX;
    setTouchOffset(touchMoveX - touchStartX.current); // Track the distance moved
  };

  const handleTouchEnd = () => {
    if (touchOffset > 50) {
      prevImage(); // Swipe right (previous image)
    } else if (touchOffset < -50) {
      nextImage(); // Swipe left (next image)
    }
    setTouchOffset(0); // Reset offset after the swipe ends
  };

  return (
    <div
      className="relative overflow-hidden bg-gray-100 aspect-square"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <div
        className="flex w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(-${currentImageIndex * 100 + (touchOffset / window.innerWidth) * 100}%)`,
        }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${productName} view ${idx + 1}`}
            className={`w-full h-full object-cover flex-shrink-0 ${
              loadedImages.includes(idx) ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
            onLoad={() => handleImageLoad(idx)}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 hover:bg-white transition-all duration-200 hover:shadow-lg disabled:opacity-50 transform hover:scale-110"
        disabled={isLoading}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 hover:bg-white transition-all duration-200 hover:shadow-lg disabled:opacity-50 transform hover:scale-110"
        disabled={isLoading}
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <div
            key={idx}
            onClick={() => changeImage(idx)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
              idx === currentImageIndex ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
