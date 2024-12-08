import React from 'react';
import ImageSlider from './ImageSlider'; // Adjust the path based on your folder structure
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        {/* Use the ImageSlider Component */}
        <ImageSlider images={product.images} productName={product.name} />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <p className="text-lg font-bold mt-2">{product.price} EGP</p>

        <div className="mt-3">
          <p className="text-sm font-medium">Available Sizes:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {product.sizes.map((size) => (
              <span
                key={size}
                className={`px-2 py-1 text-sm border rounded-md transition-colors ${
                  product.stock[size] === 0 ? 'text-red-500' : 'hover:bg-gray-50'
                }`}
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
          className="mt-4 block w-full bg-gradient-to-r from-blue-600 to-indigo-900 text-white text-center py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Order via WhatsApp
        </a>
      </div>
    </div>
  );
}
