import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../../types/product';

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider = ({ products }: ProductSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollAmount = 300;

  const checkScrollability = () => {
    const slider = sliderRef.current;
    if (slider) {
      setCanScrollLeft(slider.scrollLeft > 8);
      setCanScrollRight(slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollability, 300);
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollability, 300);
    }
  };

  return (
    <div className="relative">
      {/* Scroll buttons */}
      {canScrollLeft && (
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:border-ink-900 sm:inline-flex"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5 text-ink-900" />
        </button>
      )}
      
      {canScrollRight && (
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:border-ink-900 sm:inline-flex"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5 text-ink-900" />
        </button>
      )}
      
      {/* Product slider */}
      <div 
        ref={sliderRef}
        className="hide-scrollbar -mx-5 flex snap-x scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:scroll-px-0 sm:px-0"
        onScroll={checkScrollability}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div key={product.id} className="w-[260px] flex-shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;