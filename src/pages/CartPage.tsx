import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, ChevronLeft, Minus, Plus, Lock, Check } from 'lucide-react';
import { useCart } from '../context/cart';
import DeviceArt from '../components/common/DeviceArt';
import TrustStrip from '../components/common/TrustStrip';
import { FREE_SHIPPING_THRESHOLD, formatPrice, getDiscount, getShippingFee } from '../utils/pricing';

const CartPage = () => {
  const { cartItems, promoCode, removeFromCart, updateQuantity, applyPromoCode, getTotalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  
  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromoCode(couponCode)) {
      setCouponError('');
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };
  
  // Calculate cart summary
  const subtotal = getTotalPrice();
  const shipping = getShippingFee(subtotal);
  const discount = getDiscount(subtotal, promoCode);
  const total = subtotal + shipping - discount;
  
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const toFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="container pb-8">
      <header className="page-header mb-8">
        <h1 className="page-title">Your Cart</h1>
        {cartItems.length > 0 && (
          <p className="mt-2 text-gray-600">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        )}
      </header>

      {cartItems.length === 0 ? (
        <div className="panel mx-auto max-w-xl py-14 text-center">
          <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-50">
            <ShoppingCart className="h-7 w-7 text-accent-700" aria-hidden="true" />
          </span>
          <h2 className="text-2xl">Your cart is empty</h2>
          <p className="mb-7 mt-2 text-gray-600">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-12">
          {/* Cart items */}
          <div>
            <ul className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-4 p-4 sm:gap-5 sm:p-5">
                  <Link
                    to={`/products/${item.id}`}
                    className="tile h-24 w-24 flex-shrink-0 sm:h-28 sm:w-28"
                    aria-label={item.name}
                  >
                    <DeviceArt productId={item.id} className="h-full w-full p-1.5" />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-lg leading-tight">
                          <Link to={`/products/${item.id}`} className="hover:underline">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{formatPrice(item.price)} each</p>
                      </div>
                      <p className="whitespace-nowrap font-display text-lg font-medium text-ink-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                      <div className="inline-flex h-10 items-center rounded-full border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          aria-label={`Decrease quantity of ${item.name}`}
                          disabled={item.quantity <= 1}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-7 text-center text-sm font-medium text-ink-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm text-gray-600 transition-colors hover:bg-red-50 hover:text-red-700"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Link to="/products" className="btn btn-outline mt-5">
              <ChevronLeft className="h-5 w-5" />
              Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="mb-5 text-xl">Order Summary</h2>

              {/* Free shipping progress */}
              <div className="mb-5 rounded-xl bg-accent-50 p-4 text-sm text-accent-800">
                {toFreeShipping > 0 ? (
                  <p>
                    Add <span className="font-semibold">{formatPrice(toFreeShipping)}</span> more for free shipping.
                  </p>
                ) : (
                  <p className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    This order ships free.
                  </p>
                )}
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-accent-100" aria-hidden="true">
                  <div
                    className="h-full rounded-full bg-accent-600 transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>

              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-ink-900">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="font-medium text-ink-900">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-accent-700">
                    <dt>Discount ({promoCode})</dt>
                    <dd className="font-medium">-{formatPrice(discount)}</dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between border-t border-gray-200 pt-4">
                  <dt className="font-medium text-ink-900">Total</dt>
                  <dd className="font-display text-2xl font-medium text-ink-900">{formatPrice(total)}</dd>
                </div>
              </dl>

              {/* Coupon code */}
              <form onSubmit={handleCouponSubmit} className="mt-6">
                <label htmlFor="promo-code" className="field-label">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    id="promo-code"
                    type="text"
                    placeholder="Enter code"
                    className="field min-w-0 flex-1"
                    aria-invalid={couponError ? true : undefined}
                    aria-describedby="promo-status"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button type="submit" className="btn btn-secondary rounded-lg px-5">
                    Apply
                  </button>
                </div>
                <p id="promo-status" role="status" className="mt-1.5 min-h-5 text-sm">
                  {couponError ? (
                    <span className="text-red-700">{couponError}</span>
                  ) : promoCode ? (
                    <span className="text-accent-700">Coupon {promoCode} applied successfully!</span>
                  ) : null}
                </p>
              </form>

              <Link to="/checkout" className="btn btn-primary btn-lg mt-4 w-full">
                <Lock className="h-4 w-4" aria-hidden="true" />
                Proceed to Checkout
              </Link>

              <TrustStrip variant="stack" className="mt-6 border-t border-gray-200 pt-5" />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;
