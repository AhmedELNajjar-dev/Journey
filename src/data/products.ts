import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Stellar Art Hoodie',
    description: 'Immerse yourself in cosmic elegance—a timeless blend of classical art and celestial charm.',
    price: 400,
    images: [
      
      '/images/products/Art/1-art.png'
    ],
    sizes: ['L', 'XL', 'XXL'],
    gender: 'unisex',
    color: 'black',
    stock: {
      'L': 20,
      'XL': 8,
      'XXL': 0
    }
  },
  {
    id: '2',
    name: 'Eternal Rose Hoodie',
    description: 'Elegance in full bloom. Celebrate the timeless beauty of roses with this artfully designed hoodie, perfect for any casual look.',
    price: 400,
    images: [
      '/images/products/Rose/2-rose.png',
      
    ],
    sizes: ['L', 'XL', 'XXL'],
    gender: 'unisex',
    color: 'black',
    stock: {
      'L': 15,
      'XL': 10,
      'XXL': 5
    }
  },
  {
    id: '3',
    name: 'Beacon of Hope Hoodie',
    description: 'Carry the light of hope wherever you go with this powerful design—a symbol of strength and perseverance.',
    price: 400,
    images: [
      // '/images/products/hoodie2-front.jpg',
      '/images/products/Hope/3-Hope.png'
      // '/images/products/hoodie2-back.jpg'
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
    id: '4',
    name: 'Wild Moon Hoodie',
    description: 'Unleash your spirit with the Wild Moon Hoodie,where celestial vibes meet untamed adventure.',
    price: 400,
    images: [
      // '/images/products/hoodie2-front.jpg',
      '/images/products/staywild/4-stay_wild.png'
      // '/images/products/hoodie2-back.jpg'
    ],
    sizes: ['L', 'XL', 'XXL'],
    gender: 'unisex',
    color: 'black',
    stock: {
      'L': 0,
      'XL': 0,
      'XXL': 0
    }
  }
];