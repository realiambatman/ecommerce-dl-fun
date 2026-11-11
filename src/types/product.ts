export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  capacity?: string;
  condition: 'Excellent' | 'Good' | 'Fair';
  badges?: ('sale' | 'new' | 'refurbished')[];
  features?: string[];
  specifications?: Record<string, string>;
}