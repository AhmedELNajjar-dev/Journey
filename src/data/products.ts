import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Stellar Art Hoodie',
    description: 'Immerse yourself in cosmic elegance—a timeless blend of classical art and celestial charm.',
    price: 800,
    discountPrice: 600, // Discounted price added
    images: [
      
      '/images/products/Art/1-art.png',
      // '/images/products/Art/1-art-2.jpg'
    ],
    sizes: ['M', 'L', 'XL'],
    gender: 'unisex',
    color: 'black',
    stock: {
      'M': 4,
      'L': 4,
      'XL': 4
    }
  },
  {
    id: '2',
    name: 'Eternal Rose Hoodie',
    description: 'Elegance in full bloom. Celebrate the timeless beauty of roses with this artfully designed hoodie, perfect for any casual look.',
    price: 800,
    discountPrice: 600, // Discounted price added
    images: [
      '/images/products/Rose/2-rose.png',
      // '/images/products/Rose/2-rose-2.jpg'
      
      
    ],
    sizes: ['M', 'L', 'XL'],
    gender: 'unisex',
    color: 'black',
    stock: {
      'M': 4,
      'L': 4,
      'XL': 4
    }
  },
  {
    id: '3',
    name: 'Beacon of Hope Hoodie',
    description: 'Carry the light of hope wherever you go with this powerful design—a symbol of strength and perseverance.',
    price: 800,
    discountPrice: 600, // Discounted price added
    images: [
      // '/images/products/hoodie2-front.jpg',
      '/images/products/Hope/3-Hope.png',
      // '/images/products/Hope/3-Hope-2.jpg'
      // '/images/products/hoodie2-back.jpg'
    ],
    sizes: ['M', 'L', 'XL'],
    gender: 'unisex',
    color: 'black',
    stock: {
      'M': 4,
      'L': 4,
      'XL': 4
    }
  },
  {
    id: '4',
    name: 'Wild Moon Hoodie',
    description: 'Unleash your spirit with the Wild Moon Hoodie,where celestial vibes meet untamed adventure.',
    price: 800,
    discountPrice: 600, // Discounted price added
    images: [
      // '/images/products/hoodie2-front.jpg',
      '/images/products/staywild/4-stay_wild.png',
      // '/images/products/staywild/4-stay_wild-2.jpg'
      // '/images/products/hoodie2-back.jpg'
    ],
    sizes: ['M', 'L', 'XL'],
    gender: 'unisex',
    color: 'black',
    stock: {
      'M': 4,
      'L': 4,
      'XL': 4
    }
  }
];