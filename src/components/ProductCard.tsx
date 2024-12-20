import React, { useState } from 'react';
import ImageSlider from './ImageSlider';
import { Product, Size } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  const handleAddToCart = () => {
    if (selectedSize) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { product, size: selectedSize },
      });
      setSelectedSize(null); // Reset size selection after adding to cart
    }
  };

  // Calculate the offer percentage
  const offerPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <ImageSlider images={product.images} productName={product.name} />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-1">{product.description}</p>

        {/* Pricing Section */}
        <div className="mt-2">
          {product.discountPrice ? (
            <div className="flex items-center space-x-2">
              <p className="text-lg font-bold">{product.discountPrice} EGP</p>
              <p className="text-sm font-bold text-red-500 line-through">{product.price} EGP</p>
              {offerPercentage && (
                <p className="text-sm font-bold text-green-600">({offerPercentage}% OFF)</p>
              )}
            </div>
          ) : (
            <p className="text-lg font-bold">{product.price} EGP</p>
          )}
        </div>

        <div className="mt-3">
          <p className="text-sm font-medium">Available Sizes:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {product.sizes.map((size) => (
              <div key={size} className="flex items-center">
                <button
                  onClick={() => setSelectedSize(size)}
                  disabled={product.stock[size] === 0}
                  className={`px-3 py-1.5 text-sm border rounded-md transition-colors ${
                    selectedSize === size
                      ? 'bg-blue-500 text-white border-blue-500'
                      : product.stock[size] === 0
                      ? 'text-red-500 border-gray-200 cursor-not-allowed'
                      : 'hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  {product.stock[size] === 0 ? `${size} Sold Out` : `${size}`}
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`mt-4 w-full py-2 px-4 rounded-lg transition-all duration-200 ${
            selectedSize
              ? 'bg-gradient-to-r from-blue-600 to-indigo-900 text-white hover:opacity-90'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {selectedSize ? 'Add to Cart' : 'Select a Size'}
        </button>
      </div>
    </div>
  );
}
