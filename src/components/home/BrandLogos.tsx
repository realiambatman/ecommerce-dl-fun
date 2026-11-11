import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const brands = [
  { id: 'apple', name: 'Apple' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'google', name: 'Google' },
  { id: 'oneplus', name: 'OnePlus' },
  { id: 'xiaomi', name: 'Xiaomi' },
  { id: 'huawei', name: 'Huawei' },
];

// Brand names are set as plain type; no manufacturer logos are used
const BrandLogos = () => {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {brands.map((brand) => (
        <li key={brand.id}>
          <Link
            to={`/products?brand=${brand.id}`}
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 transition-colors hover:border-ink-900"
          >
            <span className="font-display text-lg font-medium text-ink-900">{brand.name}</span>
            <ArrowUpRight
              className="h-4 w-4 text-gray-400 transition-colors group-hover:text-accent-600"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BrandLogos;
