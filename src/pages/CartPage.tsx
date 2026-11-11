import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, ChevronRight, Truck, Shield } from 'lucide-react';
import { useCart } from '../context/cart';
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="py-4 px-6 font-medium">Product</th>
                    <th className="py-4 px-6 font-medium">Price</th>
                    <th className="py-4 px-6 font-medium">Quantity</th>
                    <th className="py-4 px-6 font-medium">Total</th>
                    <th className="py-4 px-6 sr-only">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded-md mr-4"
                          />
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-sm text-red-500 hover:text-red-700 flex items-center mt-1"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {formatPrice(item.price)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-24">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </td>
                      <td className="py-4 px-6">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn btn-outline">
                <ChevronRight className="h-5 w-5 mr-1 rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-accent-700">
                    <span>Discount ({promoCode})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">{formatPrice(total)}</span>
                </div>
              </div>
              
              {/* Coupon code */}
              <form onSubmit={handleCouponSubmit} className="mb-6">
                <h3 className="font-medium mb-2">Promo Code</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Enter code" 
                    aria-label="Promo code" 
                    className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-600"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="bg-ink-900 text-white px-4 py-2 rounded-r-md hover:bg-ink-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError ? (
                  <p className="mt-1 text-sm text-red-500">{couponError}</p>
                ) : promoCode && (
                  <p className="mt-1 text-sm text-accent-700">Coupon {promoCode} applied successfully!</p>
                )}
              </form>
              
              {/* Benefits */}
              <div className="mb-6 bg-gray-50 p-4 rounded-md">
                <div className="flex items-start mb-3">
                  <Truck className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <span className="font-medium">Free shipping</span> on orders over ₹{FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <span className="font-medium">12-month warranty</span> on all purchases
                  </p>
                </div>
              </div>
              
              <Link 
                to="/checkout" 
                className="btn btn-primary w-full py-3"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;