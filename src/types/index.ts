import React from 'react';

export type Size =  'M' | 'L' | 'XL';
// export type Size = /*'XS' | 'S' | 'M' |*/ 'L' | 'XL' | 'XXL';
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number; // Optional property for discounted price
  images: string[];
  sizes: Size[];
  gender: 'male' | 'female' | 'unisex';
  color: string;
  stock: Record<Size, number>;
}

export interface FilterOptions {
  gender: string;
  size: string;
  color: string;
  searchQuery: string;
}

// export const VALID_SIZES: Size[] = [/*'XS', 'S', 'M', */'L', 'XL', 'XXL'];
export const VALID_SIZES: Size[] = ['M', 'L', 'XL',];
export function isValidSize(size: string): size is Size {
  return VALID_SIZES.includes(size.toUpperCase() as Size);
}