import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
  productName: string;
}

export default function ImageSlider({ images, productName }: ImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(new Array(images.length).fill(false));
  const sliderRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  // Preload images
  useEffect(() => {
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, [images]);

  const changeImage = (direction: 'next' | 'prev') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    const nextIndex = direction === 'next'
      ? (currentImageIndex + 1) % images.length
      : currentImageIndex === 0 
        ? images.length - 1 
        : currentImageIndex - 1;

    // Only change if the next image is loaded
    if (imageLoaded[nextIndex]) {
      setCurrentImageIndex(nextIndex);
      setTimeout(() => setIsTransitioning(false), 300);
    } else {
      setIsTransitioning(false);
    }
  };

  const nextImage = () => changeImage('next');
  const prevImage = () => changeImage('prev');

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    // Calculate swipe distance
    const distance = touchStart - currentTouch;
    const progress = Math.min(Math.abs(distance) / sliderRef.current!.offsetWidth, 1);
    
    // Apply real-time transform based on swipe
    if (sliderRef.current) {
      const transform = -distance * progress;
      sliderRef.current.style.transform = `translateX(${transform}px)`;
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    // Reset transform
    if (sliderRef.current) {
      sliderRef.current.style.transform = '';
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="relative aspect-square overflow-hidden bg-gray-100">
      <div 
        ref={sliderRef}
        className="relative w-full h-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Current Image */}
        <img
          src={images[currentImageIndex]}
          alt={`${productName} view ${currentImageIndex + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-out
            ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
          style={{ willChange: 'transform, opacity' }}
        />
        
        {/* Next Image (preloaded) */}
        <img
          src={images[(currentImageIndex + 1) % images.length]}
          alt={`${productName} next view`}
          className="hidden"
        />
      </div>
      
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 hover:bg-white transition-all duration-200 hover:shadow-lg disabled:opacity-50 transform hover:scale-110"
        disabled={isTransitioning}
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 hover:bg-white transition-all duration-200 hover:shadow-lg disabled:opacity-50 transform hover:scale-110"
        disabled={isTransitioning}
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentImageIndex 
                ? 'bg-white w-6' 
                : 'bg-white/50 w-1.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
}