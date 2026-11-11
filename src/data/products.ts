import { Product } from '../types/product';

// Sample product data
export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    price: 64999,
    originalPrice: 89999,
    category: 'iphone',
    brand: 'apple',
    capacity: '256GB',
    condition: 'Excellent',
    badges: ['sale'],
    features: [
      '6.1-inch Super Retina XDR display',
      'Pro camera system with 12MP cameras',
      'A15 Bionic chip',
      'Up to 22 hours of video playback',
      'Face ID for secure authentication'
    ],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Processor': 'A15 Bionic',
      'Storage': '256GB',
      'Rear Camera': 'Triple 12MP',
      'Front Camera': '12MP TrueDepth',
      'Battery': 'Up to 22 hours video',
      'OS': 'iOS 15 (upgradable)',
      'Connectivity': '5G, Wi-Fi 6, Bluetooth 5.0',
      'Dimensions': '146.7 x 71.5 x 7.65 mm',
      'Weight': '204g'
    }
  },
  {
    id: '2',
    name: 'Samsung Galaxy S22 Ultra',
    price: 79999,
    originalPrice: 109999,
    category: 'samsung',
    brand: 'samsung',
    capacity: '128GB',
    condition: 'Excellent',
    badges: ['sale'],
    features: [
      '6.8-inch Dynamic AMOLED 2X display',
      '108MP camera with 100x Space Zoom',
      'Snapdragon 8 Gen 1 processor',
      'S Pen support built-in',
      '5000mAh battery with fast charging'
    ]
  },
  {
    id: '3',
    name: 'Google Pixel 6 Pro',
    price: 49999,
    originalPrice: 69999,
    category: 'google',
    brand: 'google',
    capacity: '256GB',
    condition: 'Good',
    badges: ['sale'],
    features: [
      '6.7-inch LTPO OLED display',
      'Google Tensor chip',
      '50MP wide + 12MP ultrawide + 48MP telephoto cameras',
      'Android 12 with 3 years of updates',
      '5003mAh battery'
    ]
  },
  {
    id: '4',
    name: 'iPhone 12',
    price: 44999,
    originalPrice: 59999,
    category: 'iphone',
    brand: 'apple',
    capacity: '128GB',
    condition: 'Excellent',
    badges: ['sale'],
    features: [
      '6.1-inch Super Retina XDR display',
      'A14 Bionic chip',
      'Dual 12MP camera system',
      'Face ID',
      'Ceramic Shield front'
    ]
  },
  {
    id: '5',
    name: 'OnePlus 9 Pro',
    price: 45999,
    originalPrice: 64999,
    category: 'oneplus',
    brand: 'oneplus',
    capacity: '256GB',
    condition: 'Good',
    badges: ['sale'],
    features: [
      '6.7-inch Fluid AMOLED display',
      'Snapdragon 888 processor',
      'Hasselblad quad camera system',
      'OxygenOS based on Android 11',
      '4500mAh battery with Warp Charge 65T'
    ]
  },
  {
    id: '6',
    name: 'Samsung Galaxy Z Flip 3',
    price: 59999,
    originalPrice: 84999,
    category: 'samsung',
    brand: 'samsung',
    capacity: '128GB',
    condition: 'Excellent',
    badges: ['sale'],
    features: [
      'Foldable 6.7-inch Dynamic AMOLED 2X display',
      'Snapdragon 888 processor',
      'Dual 12MP cameras',
      'Water resistant design',
      '3300mAh battery'
    ]
  }
];

export const newArrivals: Product[] = [
  {
    id: '7',
    name: 'iPhone 14 Pro',
    price: 119999,
    category: 'iphone',
    brand: 'apple',
    capacity: '128GB',
    condition: 'Excellent',
    badges: ['new'],
    features: [
      '6.1-inch Super Retina XDR display with ProMotion',
      'A16 Bionic chip',
      '48MP main camera with 4x optical zoom',
      'Dynamic Island',
      'Always-On display'
    ]
  },
  {
    id: '8',
    name: 'Samsung Galaxy S23',
    price: 74999,
    category: 'samsung',
    brand: 'samsung',
    capacity: '256GB',
    condition: 'Excellent',
    badges: ['new'],
    features: [
      '6.1-inch Dynamic AMOLED 2X display',
      'Snapdragon 8 Gen 2 processor',
      'Triple camera system with 50MP main sensor',
      'Android 13',
      '3900mAh battery'
    ]
  },
  {
    id: '9',
    name: 'Google Pixel 7',
    price: 54999,
    category: 'google',
    brand: 'google',
    capacity: '128GB',
    condition: 'Excellent',
    badges: ['new'],
    features: [
      '6.3-inch OLED display',
      'Google Tensor G2 chip',
      '50MP wide + 12MP ultrawide cameras',
      'Android 13',
      '4355mAh battery'
    ]
  },
  {
    id: '10',
    name: 'OnePlus 11',
    price: 61999,
    category: 'oneplus',
    brand: 'oneplus',
    capacity: '256GB',
    condition: 'Excellent',
    badges: ['new'],
    features: [
      '6.7-inch AMOLED display with 120Hz',
      'Snapdragon 8 Gen 2 processor',
      'Hasselblad triple camera system',
      'OxygenOS based on Android 13',
      '5000mAh battery with 100W charging'
    ]
  }
];

// Combine all products for the product listing page
const allProducts = [...featuredProducts, ...newArrivals];

// Get all products
export const getAllProducts = (): Promise<Product[]> => {
  return Promise.resolve(allProducts);
};

// Get product by ID
export const getProductById = (id: string): Promise<Product | null> => {
  const product = allProducts.find(p => p.id === id) || null;
  return Promise.resolve(product);
};

// Get related products based on category
export const getRelatedProducts = (category: string): Promise<Product[]> => {
  const related = allProducts.filter(p => p.category === category);
  return Promise.resolve(related);
};