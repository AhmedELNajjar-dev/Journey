import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Journey Hoodie',
    description: 'Our signature hoodie with the Journey explorer logo',
    price: 400,
    images: [
      '/images/products/hoodie1-front.jpg',
      '/images/products/hoodie1-back.jpg'
    ],
    sizes: ['L', 'XL', 'XXL'],
    gender: 'unisex',
    color: 'offwhite',
    stock: {
      'L': 20,
      'XL': 8,
      'XXL': 0
    }
  },
  {
    id: '2',
    name: 'Urban Explorer Hoodie',
    description: 'Comfortable urban style hoodie perfect for city adventures',
    price: 400,
    images: [
      '/images/products/hoodie2-front.jpg',
      '/images/products/hoodie2-back.jpg'
    ],
    sizes: ['L', 'XL', 'XXL'],
    gender: 'unisex',
    color: 'black',
    stock: {
      'L': 0,
      'XL': 0,
      'XXL': 0
    }
  },
  {
    id: '3',
    name: 'Desert Journey Hoodie',
    description: 'Elegant beige hoodie perfect for casual wear',
    price: 400,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['L', 'XL', 'XXL'],
    gender: 'unisex',
    color: 'beige',
    stock: {
      'L': 15,
      'XL': 10,
      'XXL': 5
    }
  }
];