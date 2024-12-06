import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    setTimeout(() => setIsTransitioning(false), 300); // Match this with CSS transition duration
  };

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
    setTimeout(() => setIsTransitioning(false), 300); // Match this with CSS transition duration
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[currentImageIndex]}
          alt={`${product.name} view ${currentImageIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 ease-in-out ${
            isTransitioning ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
          }`}
        />
        
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white transition-colors duration-200 hover:shadow-lg disabled:opacity-50"
          disabled={isTransitioning}
        >
          <ChevronLeft size={20} />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white transition-colors duration-200 hover:shadow-lg disabled:opacity-50"
          disabled={isTransitioning}
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {product.images.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentImageIndex 
                  ? 'bg-white w-4' 
                  : 'bg-white/50 w-2'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <p className="text-lg font-bold mt-2">{product.price} Egp</p>

        <div className="mt-3">
  <p className="text-sm font-medium">Available Sizes:</p>
  <div className="flex flex-wrap gap-2 mt-1">
    {product.sizes.map((size) => (
      <span
        key={size}
        className={`px-2 py-1 text-sm border rounded-md transition-colors ${
          product.stock[size] === 0 ? 'text-red-500' : 'hover:bg-gray-50'
        }`}

        // `${size}(${product.stock[size]}) `
        //title={product.stock[size] === 0 ? 'Sold Out' : `${product.stock[size]} in stock`}
      > 
        {product.stock[size] === 0 ? `${size} Sold Out` : `${size}`}
                                                       
      </span>
    ))}
  </div>
</div>

        <a
          href={`https://wa.me/201117571023?text=Hi! I'm interested in the ${product.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-center py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Order via WhatsApp
        </a>
      </div>
    </div>
  );
}