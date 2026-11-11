import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
  ChevronRight,
  Check,
  ShieldCheck,
  BatteryFull,
  RotateCcw,
  Star,
  Truck,
  Minus,
  Plus,
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { Product } from '../types/product';
import { useCart } from '../context/cart';
import { formatPrice } from '../utils/pricing';
import ProductSlider from '../components/products/ProductSlider';
import DeviceArt from '../components/common/DeviceArt';
import GradeBadge, { GRADES } from '../components/common/GradeBadge';

const VIEWS = [
  { id: 'pair', label: 'Front and back' },
  { id: 'back', label: 'Back' },
  { id: 'front', label: 'Front' },
] as const;

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'warranty', label: 'Warranty Info' },
  { id: 'reviews', label: 'Reviews' },
];

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [justAdded, setJustAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  
  // Fetch product data
  useEffect(() => {
    let isCurrent = true;

    const loadProduct = async () => {
      setIsLoading(true);
      const productData = id ? await getProductById(id) : null;
      const related = productData ? await getRelatedProducts(productData.category) : [];
      if (!isCurrent) return;

      setProduct(productData);
      setRelatedProducts(related.filter(p => p.id !== id));
      setQuantity(1);
      setActiveImage(0);
      setActiveTab('description');
      setJustAdded(false);
      setIsLoading(false);
    };
    
    loadProduct();
    return () => {
      isCurrent = false;
    };
  }, [id]);

  // Reflect the product in the document title
  useEffect(() => {
    if (isLoading) return;
    document.title = `Dreamland Gadgets | ${product ? product.name : 'Product Not Found'}`;
  }, [product, isLoading]);

  // Clear the "added to cart" confirmation after a short delay
  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [justAdded]);
  
  if (isLoading) {
    return (
      <div className="container py-12" aria-busy="true">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="tile aspect-square animate-pulse" />
          <div className="space-y-4 pt-4">
            <div className="h-6 w-32 animate-pulse rounded-full bg-gray-200" />
            <div className="h-10 w-3/4 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-200" />
            <p className="sr-only">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20">
        <div className="mx-auto max-w-md text-center">
          <h1 className="page-title">Product not found</h1>
          <p className="mb-8 mt-3 text-gray-600">
            The phone you are looking for does not exist or is no longer available.
          </p>
          <Link to="/products" className="btn btn-primary">
            Browse All Phones
          </Link>
        </div>
      </div>
    );
  }

  // Calculate discount percentage
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
  };

  // Plain-language description of each condition
  const getConditionText = () => {
    switch (product.condition) {
      case 'Excellent':
        return 'Like New - 95%+ of original condition with minimal signs of use';
      case 'Good':
        return 'Minor cosmetic imperfections only visible at close inspection';
      case 'Fair':
        return 'Noticeable scratches/marks but functions perfectly';
      default:
        return 'Unknown condition';
    }
  };

  const conditionText = getConditionText();
  const grade = GRADES[product.condition];
  const view = VIEWS[activeImage] ?? VIEWS[0];

  return (
    <div className="container py-6 sm:py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex flex-wrap items-center gap-y-1 text-sm text-gray-500" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-ink-900 hover:underline">Home</Link>
        <ChevronRight className="mx-1.5 h-4 w-4" aria-hidden="true" />
        <Link to="/products" className="hover:text-ink-900 hover:underline">Products</Link>
        <ChevronRight className="mx-1.5 h-4 w-4" aria-hidden="true" />
        <span className="text-ink-900" aria-current="page">{product.name}</span>
      </nav>

      <div className="mb-16 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        {/* Product images */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="tile aspect-[4/3.6] rounded-3xl sm:aspect-[4/3.4]">
            <DeviceArt
              productId={product.id}
              view={view.id}
              title={`${product.name}, ${view.label.toLowerCase()} view`}
              className="h-full w-full p-6 sm:p-10"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs text-gray-600">
              Illustration. Finish may vary.
            </span>
          </div>

          {/* Thumbnail views */}
          <div className="mt-3 flex gap-2.5">
            {VIEWS.map((v, index) => (
              <button
                key={v.id}
                onClick={() => setActiveImage(index)}
                aria-label={`Show ${v.label.toLowerCase()} view`}
                aria-pressed={activeImage === index}
                className={`tile h-20 w-20 border-2 transition-colors ${
                  activeImage === index ? 'border-accent-600' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <DeviceArt productId={product.id} view={v.id} className="h-full w-full p-1.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <GradeBadge condition={product.condition} size="md" />
            {product.badges?.includes('new') && <span className="badge badge-new">New</span>}
          </div>

          <h1 className="mt-4 font-display text-display-md font-medium sm:text-display-lg">{product.name}</h1>

          {product.capacity && <p className="mt-2 text-lg text-gray-600">{product.capacity}</p>}

          {/* Price */}
          <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-display-sm font-medium text-ink-900 sm:text-display-md">
              {formatPrice(product.price)}
            </span>

            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="badge badge-sale">Save {discountPercentage}%</span>
              </>
            )}
          </div>

          {/* Stock status */}
          <p className="mt-3 flex items-center text-sm font-medium text-accent-700">
            <span className="mr-2 h-2 w-2 rounded-full bg-accent-500" aria-hidden="true" />
            In Stock - Ready to Ship
          </p>

          {/* Condition report */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-start gap-4">
              <span
                className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent-600 font-display text-2xl font-semibold text-white"
                aria-hidden="true"
              >
                {grade.letter}
              </span>
              <div>
                <h2 className="text-base">
                  Grade {grade.letter}: {product.condition} condition
                </h2>
                <p className="mt-0.5 text-sm text-gray-600">{conditionText}</p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-gray-200 pt-4 text-sm">
              <div>
                <dt className="text-gray-500">Battery</dt>
                <dd className="font-medium text-ink-900">85% or more</dd>
              </div>
              <div>
                <dt className="text-gray-500">Inspection</dt>
                <dd className="font-medium text-ink-900">30+ points</dd>
              </div>
              <div>
                <dt className="text-gray-500">Warranty</dt>
                <dd className="font-medium text-ink-900">12 months</dd>
              </div>
            </dl>
          </div>

          {/* Add to cart */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="inline-flex h-12 items-center self-start rounded-full border border-gray-300 bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium text-ink-900" aria-live="polite">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button onClick={handleAddToCart} className="btn btn-primary h-12 flex-1">
              {justAdded ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
              {justAdded ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>

          <button className="btn btn-outline mt-3 h-12 w-full">
            <Heart className="h-5 w-5" />
            Add to Wishlist
          </button>

          {/* Benefits */}
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-gray-200 pt-6">
            {[
              { icon: ShieldCheck, title: '12-Month Warranty', text: 'Full coverage included' },
              { icon: BatteryFull, title: 'Battery Health', text: 'Minimum 85% capacity' },
              { icon: Truck, title: 'Free Shipping', text: '2-3 business days' },
              { icon: RotateCcw, title: '30-Day Returns', text: 'Hassle-free process' },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" aria-hidden="true" />
                <div>
                  <h3 className="font-sans text-[0.95rem] font-medium tracking-normal">{title}</h3>
                  <p className="text-sm text-gray-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Key features */}
          {product.features && product.features.length > 0 && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="mb-3 text-lg">Key Features</h2>
              <ul className="space-y-2.5">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Product details tabs */}
      <div className="mb-16">
        <div className="hide-scrollbar -mx-5 mb-6 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div className="inline-flex gap-1 rounded-full bg-gray-200/70 p-1" role="tablist" aria-label="Product details">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'bg-white text-ink-900 shadow-sm' : 'text-gray-600 hover:text-ink-900'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel" role="tabpanel">
          {activeTab === 'description' && (
            <div className="max-w-[68ch] space-y-4 leading-relaxed">
              <h3 className="text-xl">Product Description</h3>
              <p>
                This {product.name} has been professionally refurbished to meet our exacting standards.
                Each device undergoes a rigorous 30+ point inspection to ensure it looks and works like new.
              </p>
              <p>
                Our certified technicians have thoroughly tested all functions, replaced any worn components,
                and ensured the battery health is at least 85% of its original capacity.
              </p>
              <p>
                The device is in {product.condition.toLowerCase()} condition, meaning {conditionText.toLowerCase()}.
                It comes with all necessary accessories, including a charger, cable, and SIM removal tool.
              </p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h3 className="mb-2 text-xl">Technical Specifications</h3>
              {product.specifications ? (
                <dl className="spec-table max-w-2xl">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt>{key}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-2 text-gray-600">
                  Detailed specifications are not available for this phone yet.
                </p>
              )}
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="max-w-[68ch] leading-relaxed">
              <h3 className="mb-4 text-xl">Warranty Information</h3>
              <p className="mb-5">
                All Dreamland Gadgets refurbished phones come with our comprehensive 12-month warranty,
                covering manufacturing defects and hardware failures.
              </p>
              <div className="mb-5 rounded-xl bg-accent-50 p-5">
                <h4 className="mb-3 text-base">What's Covered:</h4>
                <ul className="space-y-2">
                  {[
                    'Hardware malfunctions and defects',
                    'Battery issues (if capacity falls below 80%)',
                    'Display and touch screen functionality',
                    'Camera, speaker, and microphone defects',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-ink-800">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p>
                For warranty claims or questions, please contact our customer support team at
                support@dreamlandgadgets.com or call us at 1-800-555-1234.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-3xl">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl">Customer Reviews</h3>
                <button className="btn btn-outline">Write a Review</button>
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl bg-gray-50 p-5">
                <span className="font-display text-display-sm font-medium text-ink-900">4.8</span>
                <div>
                  <div className="flex gap-0.5" role="img" aria-label="4.8 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent-600 text-accent-600" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">4.8 out of 5. Based on 142 reviews</p>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="py-5">
                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-medium text-ink-900">John D.</span>
                      <div className="flex gap-0.5" role="img" aria-label={`${6 - review} out of 5 stars`}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < (6 - review) ? 'fill-accent-600 text-accent-600' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="leading-relaxed">
                      {review === 1 && "Absolutely love my refurbished iPhone! Looks brand new, and the battery life is excellent. The shipping was fast, and it came in a premium package. Definitely recommend!"}
                      {review === 2 && "Great value for money. The phone is in excellent condition as described. The only reason for 4 stars is that the charger wasn't included, but otherwise perfect experience."}
                      {review === 3 && "Phone works great and arrived quickly. Very satisfied with my purchase from Dreamland Gadgets. Will definitely shop here again in the future."}
                    </p>
                  </div>
                ))}
              </div>

              <button className="btn btn-quiet mt-2 px-0">Load More Reviews</button>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="section-title mb-6">You Might Also Like</h2>
          <ProductSlider products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
