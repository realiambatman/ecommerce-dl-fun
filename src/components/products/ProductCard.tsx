import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/cart';
import { formatPrice } from '../../utils/pricing';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  // Calculate discount percentage
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // The wishlist is not implemented; keep the click from following the card link
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="product-card group">
      <Link to={`/products/${product.id}`} className="block">
        <div className="product-card-img-wrapper">
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            className="product-card-img"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badges?.includes('sale') && (
              <span className="badge badge-sale">Sale</span>
            )}
            {product.badges?.includes('new') && (
              <span className="badge badge-new">New</span>
            )}
            <span className={`condition-badge condition-${product.condition.toLowerCase()}`}>
              {product.condition}
            </span>
          </div>
          
          {/* Quick actions */}
          <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleAddToCart}
              className="bg-white rounded-full p-2 shadow-sm hover:bg-yellow-500 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button 
              onClick={handleWishlistClick}
              className="bg-white rounded-full p-2 shadow-sm hover:bg-red-500 hover:text-white transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          
          {/* Capacity, if applicable */}
          {product.capacity && (
            <p className="text-gray-500 text-sm mb-1">{product.capacity}</p>
          )}
          
          {/* Price */}
          <div className="flex items-baseline mt-2">
            <span className="font-bold text-lg">{formatPrice(product.price)}</span>
            
            {product.originalPrice && (
              <>
                <span className="ml-2 text-gray-500 line-through text-sm">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="ml-2 text-green-600 text-sm font-medium">
                  Save {discountPercentage}%
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;