import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Apple, Smartphone } from 'lucide-react';

const BrandLogos = () => {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  const brands = [
    { id: 'apple', name: 'Apple', icon: <Apple className="h-10 w-10" /> },
    { id: 'samsung', name: 'Samsung', icon: <Smartphone className="h-10 w-10" /> },
    { id: 'google', name: 'Google', icon: <Smartphone className="h-10 w-10" /> },
    { id: 'oneplus', name: 'OnePlus', icon: <Smartphone className="h-10 w-10" /> },
    { id: 'xiaomi', name: 'Xiaomi', icon: <Smartphone className="h-10 w-10" /> },
    { id: 'huawei', name: 'Huawei', icon: <Smartphone className="h-10 w-10" /> },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
      {brands.map((brand) => (
        <Link
          key={brand.id}
          to={`/products?brand=${brand.id}`}
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
          onMouseEnter={() => setHoveredBrand(brand.id)}
          onMouseLeave={() => setHoveredBrand(null)}
        >
          <div className={`transition-colors duration-300 ${hoveredBrand === brand.id ? 'text-accent-600' : 'text-gray-700'}`}>
            {brand.icon}
          </div>
          <span className="mt-2 font-medium text-ink-900">{brand.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default BrandLogos;