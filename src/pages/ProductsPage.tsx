import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { getAllProducts } from '../data/products';
import { Product } from '../types/product';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get filter values from URL params
  const categoryParam = searchParams.get('category') || '';
  const brandParam = searchParams.get('brand') || '';
  const conditionParam = searchParams.get('condition') || '';
  const priceRangeParam = searchParams.get('priceRange') || '';
  const searchParam = (searchParams.get('search') || '').trim();
  
  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    };
    
    loadProducts();
  }, []);
  
  // Filter products when filter parameters or products change
  useEffect(() => {
    let result = [...products];
    
    // Apply search query from the header search box
    if (searchParam) {
      const query = searchParam.toLowerCase();
      result = result.filter(product =>
        [product.name, product.brand, product.category, product.capacity ?? '']
          .some(field => field.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (categoryParam) {
      result = result.filter(product => {
        if (categoryParam === 'deals') {
          return product.originalPrice !== undefined && product.originalPrice > product.price;
        }
        return product.category === categoryParam;
      });
    }
    
    // Apply brand filter
    if (brandParam) {
      result = result.filter(product => product.brand === brandParam);
    }
    
    // Apply condition filter
    if (conditionParam) {
      result = result.filter(product => product.condition === conditionParam);
    }
    
    // Apply price range filter
    if (priceRangeParam) {
      const [min, max] = priceRangeParam.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        result = result.filter(product => product.price >= min && product.price <= max);
      }
    }
    
    setFilteredProducts(result);
  }, [products, searchParam, categoryParam, brandParam, conditionParam, priceRangeParam]);
  
  // Update URL params when filters change
  const updateFilters = (filterName: string, value: string) => {
    setSearchParams(prevParams => {
      const nextParams = new URLSearchParams(prevParams);
      if (value) {
        nextParams.set(filterName, value);
      } else {
        nextParams.delete(filterName);
      }
      return nextParams;
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchParams({});
  };
  
  // Available filter options
  const categories = [
    { value: 'iphone', label: 'iPhone' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'google', label: 'Google Pixel' },
    { value: 'oneplus', label: 'OnePlus' },
    { value: 'deals', label: 'Special Deals' },
  ];
  
  const brands = [
    { value: 'apple', label: 'Apple' },
    { value: 'samsung', label: 'Samsung' },
    { value: 'google', label: 'Google' },
    { value: 'oneplus', label: 'OnePlus' },
    { value: 'xiaomi', label: 'Xiaomi' },
  ];
  
  const conditions = [
    { value: 'Excellent', label: 'Excellent' },
    { value: 'Good', label: 'Good' },
    { value: 'Fair', label: 'Fair' },
  ];
  
  const priceRanges = [
    { value: '0-25000', label: 'Under ₹25,000' },
    { value: '25000-40000', label: '₹25,000 - ₹40,000' },
    { value: '40000-60000', label: '₹40,000 - ₹60,000' },
    { value: '60000-100000', label: '₹60,000 - ₹1,00,000' },
    { value: '100000-1000000', label: 'Over ₹1,00,000' },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shop Refurbished Phones</h1>
        
        {/* Mobile filter button */}
        <button 
          className="md:hidden flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <aside 
          className={`
            md:w-1/4 lg:w-1/5 bg-white p-4 rounded-lg shadow-sm
            ${isFilterOpen ? 'fixed inset-0 z-50 overflow-auto' : 'hidden md:block'}
          `}
        >
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="text-xl font-bold">Filters</h2>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Close filters"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Active filters */}
          {(searchParam || categoryParam || brandParam || conditionParam || priceRangeParam) && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Active Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-yellow-600 hover:text-yellow-700"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchParam && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                    &ldquo;{searchParam}&rdquo;
                    <button 
                      onClick={() => updateFilters('search', '')}
                      aria-label="Remove search filter"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
                {categoryParam && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {categories.find(c => c.value === categoryParam)?.label || categoryParam}
                    <button 
                      onClick={() => updateFilters('category', '')}
                      aria-label="Remove category filter"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
                {brandParam && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {brands.find(b => b.value === brandParam)?.label || brandParam}
                    <button 
                      onClick={() => updateFilters('brand', '')}
                      aria-label="Remove brand filter"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
                {conditionParam && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {conditionParam}
                    <button 
                      onClick={() => updateFilters('condition', '')}
                      aria-label="Remove condition filter"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
                {priceRangeParam && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {priceRanges.find(p => p.value === priceRangeParam)?.label || `₹${priceRangeParam.replace('-', ' - ₹')}`}
                    <button 
                      onClick={() => updateFilters('priceRange', '')}
                      aria-label="Remove price filter"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Category filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`category-${category.value}`}
                    name="category"
                    checked={categoryParam === category.value}
                    onChange={() => updateFilters('category', category.value)}
                    className="mr-2 accent-yellow-500"
                  />
                  <label htmlFor={`category-${category.value}`} className="text-sm cursor-pointer">
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Brand filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Brand</h3>
            <div className="space-y-2">
              {brands.map(brand => (
                <div key={brand.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`brand-${brand.value}`}
                    name="brand"
                    checked={brandParam === brand.value}
                    onChange={() => updateFilters('brand', brand.value)}
                    className="mr-2 accent-yellow-500"
                  />
                  <label htmlFor={`brand-${brand.value}`} className="text-sm cursor-pointer">
                    {brand.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Condition filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Condition</h3>
            <div className="space-y-2">
              {conditions.map(condition => (
                <div key={condition.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`condition-${condition.value}`}
                    name="condition"
                    checked={conditionParam === condition.value}
                    onChange={() => updateFilters('condition', condition.value)}
                    className="mr-2 accent-yellow-500"
                  />
                  <label htmlFor={`condition-${condition.value}`} className="text-sm cursor-pointer">
                    {condition.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price range filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map(range => (
                <div key={range.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`price-${range.value}`}
                    name="priceRange"
                    checked={priceRangeParam === range.value}
                    onChange={() => updateFilters('priceRange', range.value)}
                    className="mr-2 accent-yellow-500"
                  />
                  <label htmlFor={`price-${range.value}`} className="text-sm cursor-pointer">
                    {range.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Apply button (mobile only) */}
          <div className="md:hidden mt-6">
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="w-full btn btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </aside>
        
        {/* Products grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center bg-white rounded-lg">
              <p className="text-lg mb-4">No products match your filters.</p>
              <button 
                onClick={clearFilters}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <p className="mb-4 text-gray-600">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;