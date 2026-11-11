import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  ChevronRight,
  Check,
  Shield,
  BatteryFull,
  Star,
  Truck
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { Product } from '../types/product';
import { useCart } from '../context/cart';
import { formatPrice } from '../utils/pricing';
import ProductSlider from '../components/products/ProductSlider';

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
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col justify-center items-center h-64 text-center">
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <p className="text-gray-600 mb-6">
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
  
  // Get condition text and color
  const getConditionInfo = () => {
    switch (product.condition) {
      case 'Excellent':
        return {
          text: 'Like New - 95%+ of original condition with minimal signs of use',
          className: 'condition-excellent'
        };
      case 'Good':
        return {
          text: 'Minor cosmetic imperfections only visible at close inspection',
          className: 'condition-good'
        };
      case 'Fair':
        return {
          text: 'Noticeable scratches/marks but functions perfectly',
          className: 'condition-fair'
        };
      default:
        return {
          text: 'Unknown condition',
          className: 'text-gray-500'
        };
    }
  };
  
  const conditionInfo = getConditionInfo();
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-8 text-gray-500">
        <Link to="/" className="hover:text-accent-600">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to="/products" className="hover:text-accent-600">Products</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700">{product.name}</span>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-10 mb-16">
        {/* Product images */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden mb-4">
            <img 
              src={product.images ? product.images[activeImage] : product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain aspect-square"
            />
          </div>
          
          {/* Thumbnail images */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show image ${index + 1}`}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                    activeImage === index ? 'border-accent-600' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product info */}
        <div className="lg:w-1/2">
          {/* Product heading */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {product.capacity && (
              <p className="text-gray-600 mb-2">{product.capacity}</p>
            )}
            
            {/* Condition badge */}
            <div className="mb-4">
              <span className={`condition-badge ${conditionInfo.className}`}>
                {product.condition}
              </span>
              <span className="ml-2 text-sm text-gray-600">
                {conditionInfo.text}
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-baseline mb-2">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              
              {product.originalPrice && (
                <>
                  <span className="ml-3 text-gray-500 line-through text-lg">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="ml-3 text-accent-700 font-medium">
                    Save {discountPercentage}%
                  </span>
                </>
              )}
            </div>
            
            {/* Stock status */}
            <p className="text-accent-700 flex items-center">
              <Check className="h-5 w-5 mr-1" />
              In Stock - Ready to Ship
            </p>
          </div>
          
          {/* Key features */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Key Features:</h3>
            <ul className="space-y-2">
              {product.features && product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Add to cart */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mr-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="btn btn-primary flex-grow py-3"
              >
                {justAdded ? (
                  <Check className="h-5 w-5 mr-2" />
                ) : (
                  <ShoppingCart className="h-5 w-5 mr-2" />
                )}
                {justAdded ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
            
            <button className="btn btn-outline w-full py-3 mb-4">
              <Heart className="h-5 w-5 mr-2" />
              Add to Wishlist
            </button>
          </div>
          
          {/* Benefits */}
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">12-Month Warranty</h4>
                  <p className="text-sm text-gray-600">Full coverage included</p>
                </div>
              </div>
              <div className="flex items-start">
                <BatteryFull className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Battery Health</h4>
                  <p className="text-sm text-gray-600">Minimum 85% capacity</p>
                </div>
              </div>
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-600">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-start">
                <Star className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">30-Day Returns</h4>
                  <p className="text-sm text-gray-600">Hassle-free process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product details tabs */}
      <div className="mb-16">
        <div className="border-b border-gray-200 mb-6">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button 
              className={`py-3 px-6 font-medium text-sm whitespace-nowrap ${
                activeTab === 'description' 
                  ? 'border-b-2 border-accent-600 text-ink-900' 
                  : 'text-gray-500 hover:text-ink-900'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`py-3 px-6 font-medium text-sm whitespace-nowrap ${
                activeTab === 'specifications' 
                  ? 'border-b-2 border-accent-600 text-ink-900' 
                  : 'text-gray-500 hover:text-ink-900'
              }`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`py-3 px-6 font-medium text-sm whitespace-nowrap ${
                activeTab === 'warranty' 
                  ? 'border-b-2 border-accent-600 text-ink-900' 
                  : 'text-gray-500 hover:text-ink-900'
              }`}
              onClick={() => setActiveTab('warranty')}
            >
              Warranty Info
            </button>
            <button 
              className={`py-3 px-6 font-medium text-sm whitespace-nowrap ${
                activeTab === 'reviews' 
                  ? 'border-b-2 border-accent-600 text-ink-900' 
                  : 'text-gray-500 hover:text-ink-900'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-xl font-medium mb-4">Product Description</h3>
              <p className="mb-4">
                This {product.name} has been professionally refurbished to meet our exacting standards. 
                Each device undergoes a rigorous 30+ point inspection to ensure it looks and works like new.
              </p>
              <p className="mb-4">
                Our certified technicians have thoroughly tested all functions, replaced any worn components, 
                and ensured the battery health is at least 85% of its original capacity.
              </p>
              <p>
                The device is in {product.condition.toLowerCase()} condition, meaning {conditionInfo.text.toLowerCase()}.
                It comes with all necessary accessories, including a charger, cable, and SIM removal tool.
              </p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-xl font-medium mb-4">Technical Specifications</h3>
              {product.specifications ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-100 pb-2">
                      <span className="font-medium text-gray-700">{key}: </span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  Detailed specifications are not available for this phone yet.
                </p>
              )}
            </div>
          )}
          
          {activeTab === 'warranty' && (
            <div>
              <h3 className="text-xl font-medium mb-4">Warranty Information</h3>
              <p className="mb-4">
                All Dreamland Gadgets refurbished phones come with our comprehensive 12-month warranty, 
                covering manufacturing defects and hardware failures.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">What's Covered:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Hardware malfunctions and defects</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Battery issues (if capacity falls below 80%)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Display and touch screen functionality</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Camera, speaker, and microphone defects</span>
                  </li>
                </ul>
              </div>
              <p>
                For warranty claims or questions, please contact our customer support team at 
                support@dreamlandgadgets.com or call us at 1-800-555-1234.
              </p>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium">Customer Reviews</h3>
                <button className="btn btn-outline">Write a Review</button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5 text-accent-600 fill-accent-600"
                      />
                    ))}
                  </div>
                  <span className="font-medium">4.8 out of 5</span>
                </div>
                <p className="text-sm text-gray-600">Based on 142 reviews</p>
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <span className="font-medium mr-3">John D.</span>
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < (6 - review) ? 'text-accent-600 fill-accent-600' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="text-gray-700">
                      {review === 1 && "Absolutely love my refurbished iPhone! Looks brand new, and the battery life is excellent. The shipping was fast, and it came in a premium package. Definitely recommend!"}
                      {review === 2 && "Great value for money. The phone is in excellent condition as described. The only reason for 4 stars is that the charger wasn't included, but otherwise perfect experience."}
                      {review === 3 && "Phone works great and arrived quickly. Very satisfied with my purchase from Dreamland Gadgets. Will definitely shop here again in the future."}
                    </p>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 text-accent-700 hover:text-accent-800 font-medium">
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <ProductSlider products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;