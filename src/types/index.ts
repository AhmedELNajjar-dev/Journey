export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes: Size[];
  gender: 'male' | 'female' | 'unisex';
  color: string;
  stock: Record<Size, number>;
}

export type Size = /*'XS' | 'S' | 'M' |*/ 'L' | 'XL' | 'XXL';

export interface FilterOptions {
  gender: string;
  size: string;
  color: string;
  searchQuery: string;
}