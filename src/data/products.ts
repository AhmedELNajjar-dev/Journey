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
    // stock: {
    //   'XS': 0,
    //   'S': 10,
    //   'M': 15,
    //   'L': 20,
    //   'XL': 8,
    //   'XXL': 0
    // }
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
    // stock: {
    //   'XS': 0,
    //   'S': 0,
    //   'M': 12,
    //   'L': 18,
    //   'XL': 15,
    //   'XXL': 5
    // }
  }
];