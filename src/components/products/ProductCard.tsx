import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/cart';
import { formatPrice } from '../../utils/pricing';
import DeviceArt from '../common/DeviceArt';
import GradeBadge from '../common/GradeBadge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  // Calculate discount percentage
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article className="product-card group">
      <div className="tile aspect-[4/3.6]">
        <DeviceArt
          productId={product.id}
          className="h-full w-full p-4 transition-transform duration-300 ease-out group-hover:-translate-y-1"
        />

        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
          {product.badges?.includes('sale') && discountPercentage > 0 && (
            <span className="badge badge-sale">Save {discountPercentage}%</span>
          )}
          {product.badges?.includes('sale') && discountPercentage === 0 && (
            <span className="badge badge-sale">Sale</span>
          )}
          {product.badges?.includes('new') && <span className="badge badge-new">New</span>}
        </div>

        {/* The wishlist is not implemented; the button is a visual placeholder */}
        <button
          type="button"
          className="absolute right-2.5 top-2.5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <GradeBadge condition={product.condition} className="self-start" />

        <h3 className="mt-3 line-clamp-1 text-lg">
          {/* Stretched link: the whole card opens the product */}
          <Link to={`/products/${product.id}`} className="after:absolute after:inset-0 after:rounded-2xl">
            {product.name}
          </Link>
        </h3>

        {product.capacity && <p className="text-sm text-gray-500">{product.capacity}</p>}

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <span className="block font-display text-xl font-medium text-ink-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent-600 text-white transition-colors hover:bg-accent-700"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-[1.1rem] w-[1.1rem]" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
