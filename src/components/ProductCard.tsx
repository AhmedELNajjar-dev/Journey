import React, { useState } from 'react';
import ImageSlider from './ImageSlider';
import { Product, Size } from '../types';
import { useCart } from '../context/CartContext';
import { useStock } from '../context/StockContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();
  const { stock } = useStock();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [stockError, setStockError] = useState<string | null>(null);
  const currentStock = stock[product.id];

  // Calculate discounted price if exists
  const discountedPrice = product.discountPrice
    ? product.discountPrice
    : product.price;

  // Calculate the discount percentage
  const discountPercentage = product.discountPrice
    ? ((product.price - product.discountPrice) / product.price) * 100
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) return;

    const availableStock = currentStock[selectedSize];
    const cartDispatch = () => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { product, size: selectedSize }
      });
      setSelectedSize(null);
      setStockError(null);
    };

    try {
      if (availableStock <= 0) {
        setStockError(`Size ${selectedSize} is out of stock`);
        return;
      }
      cartDispatch();
    } catch (error) {
      if (error instanceof Error) {
        setStockError(error.message);
      } else {
        setStockError('An error occurred while adding to cart');
      }
    }
  };

  return (
    <div className="rounded-xl shadow-lg overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <ImageSlider images={product.images} productName={product.name} />
      </div>

      <div className=" p-4">
        <h3 className="text-lg text-white font-semibold">{product.name}</h3>
        <p className="text-white mt-1">{product.description}</p>
        
        {/* Display price and discount */}
        <div className="flex items-center gap-2 mt-2">
          {product.discountPrice ? (
            <>
              <p className="text-sm font-bold text-red-500 line-through">
                {product.price} EGP
              </p>
              <p className="text-sm text-white font-bold ">
                {product.discountPrice} EGP
              </p>
              <p className="text-xs font-bold text-green-500">
                {discountPercentage.toFixed(0)}% OFF
              </p>
            </>
          ) : (
            <p className="text-sm  text white font-bold">{product.price} EGP</p>
          )}
        </div>

        {stockError && (
          <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
            {stockError}
          </div>
        )}

        <div className="mt-3">
          <p className="text-sm text-white font-medium">Available Sizes:(Choose size)</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {product.sizes.map((size) => (
              <div key={size} className="flex items-center">
                <button
                  onClick={() => {
                    setSelectedSize(size);
                    setStockError(null);
                  }}
                  disabled={currentStock[size] === 0}
                  className={`px-3 py-1.5 text-sm text-white border-2 shadow-lg rounded-md transition-colors ${
                    selectedSize === size
                      ? currentStock[size] > 0
                        ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white border-blue-800 shadow-xl scale-105'  // Brighter background, border, and shadow
                        : 'bg-red-500 text-black border-red-500'
                      : currentStock[size] === 0
                      ? 'text-red-500 border-gray-200 cursor-not-allowed'
                      : 'hover:bg-blue-500 border-black-300'
                  }`}
                >
                  {currentStock[size] === 0
                    ? `${size} - Sold Out`
                    : `${size}`}
                    {/* : `${size} (${currentStock[size]} left)`} */}
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`mt-4 w-full py-2 px-4 border-2 rounded-lg transition-all duration-200 ${
            selectedSize
              ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white border-blue-800 shadow-xl scale-105 text-white hover:opacity-90'
              : 'bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white cursor-not-allowed'
          }`}
        >
          {selectedSize ? 'Add to Cart' : 'Select a Size'}
        </button>
      </div>
    </div>
  );
}
