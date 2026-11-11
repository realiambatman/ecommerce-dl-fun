import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle, CreditCard, Lock, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/cart';
import { TAX_RATE, formatPrice, getDiscount, getShippingFee } from '../utils/pricing';

const COUNTRIES: Record<string, string> = {
  IN: 'India',
  US: 'United States',
  CA: 'Canada',
  UK: 'United Kingdom',
  AU: 'Australia',
};

const PAYMENT_METHODS: Record<string, string> = {
  'credit-card': 'Credit / Debit Card',
  paypal: 'PayPal',
  'apple-pay': 'Apple Pay',
};

const emptyShippingInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  addressLine2: '',
  city: '',
  state: '',
  zip: '',
  country: 'IN',
};

const CheckoutPage = () => {
  const { cartItems, promoCode, clearCart, getTotalPrice } = useCart();
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [shippingInfo, setShippingInfo] = useState(emptyShippingInfo);
  const [placedOrder, setPlacedOrder] = useState<{ orderNumber: string; total: number } | null>(null);
  
  // Calculate order summary
  const subtotal = getTotalPrice();
  const shipping = getShippingFee(subtotal);
  const discount = getDiscount(subtotal, promoCode);
  const tax = Math.round((subtotal - discount) * TAX_RATE * 100) / 100;
  const total = subtotal - discount + shipping + tax;
  
  // Completed steps can be revisited; later steps are reached by submitting the current one
  const goToStep = (step: number) => {
    if (step <= activeStep) {
      setActiveStep(step);
    }
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Demo only: no payment is taken and nothing is sent to a server
  const handlePlaceOrder = () => {
    const orderNumber = `DG${Math.floor(10000 + Math.random() * 90000)}`;
    setPlacedOrder({ orderNumber, total });
    clearCart();
    window.scrollTo(0, 0);
  };

  if (placedOrder) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-accent-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
          <p className="text-gray-600 mb-2">
            Order <span className="font-mono bg-gray-100 px-2 py-1 rounded">#{placedOrder.orderNumber}</span> for{' '}
            <span className="font-medium">{formatPrice(placedOrder.total)}</span> has been placed.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            This is a demo storefront: no payment was taken and no order was actually created.
          </p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add a phone to your cart before checking out.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to="/cart" className="flex items-center text-accent-700 hover:text-accent-800">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold mx-auto">Checkout</h1>
      </div>
      
      {/* Progress steps */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
        
        {[1, 2, 3].map((step) => (
          <button 
            key={step}
            className={`relative z-10 flex flex-col items-center ${
              step <= activeStep ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
            type="button"
            onClick={() => goToStep(step)}
            disabled={step > activeStep}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step < activeStep ? 'bg-accent-600 text-white' : 
              step === activeStep ? 'bg-accent-600 text-white' : 
              'bg-gray-200 text-gray-500'
            }`}>
              {step}
            </div>
            <span className={`mt-2 font-medium ${
              step === activeStep ? 'text-ink-900' : 'text-gray-500'
            }`}>
              {step === 1 ? 'Shipping' : step === 2 ? 'Payment' : 'Review'}
            </span>
          </button>
        ))}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main checkout form */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            {/* Step 1: Shipping */}
            {activeStep === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveStep(2);
                }}
              >
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address*
                  </label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
                    required
                  />
                  <input 
                    type="text" 
                    id="addressLine2" 
                    name="addressLine2"
                    value={shippingInfo.addressLine2}
                    onChange={handleShippingChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province*
                    </label>
                    <input 
                      type="text" 
                      id="state" 
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP/Postal Code*
                    </label>
                    <input 
                      type="text" 
                      id="zip" 
                      name="zip"
                      value={shippingInfo.zip}
                      onChange={handleShippingChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country*
                  </label>
                  <select 
                    id="country" 
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleShippingChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    {Object.entries(COUNTRIES).map(([code, name]) => (
                      <option key={code} value={code}>{name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center mb-6">
                  <input 
                    type="checkbox" 
                    id="saveAddress" 
                    className="mr-2 accent-accent-600"
                  />
                  <label htmlFor="saveAddress" className="text-sm text-gray-700">
                    Save this address for future orders
                  </label>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className="btn btn-primary"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}
            
            {/* Step 2: Payment */}
            {activeStep === 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveStep(3);
                }}
              >
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <input 
                      type="radio" 
                      id="credit-card" 
                      name="payment-method"
                      checked={paymentMethod === 'credit-card'}
                      onChange={() => setPaymentMethod('credit-card')}
                      className="mr-2 accent-accent-600"
                    />
                    <label htmlFor="credit-card" className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-gray-700" />
                      <span>Credit / Debit Card</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <input 
                      type="radio" 
                      id="paypal" 
                      name="payment-method"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                      className="mr-2 accent-accent-600"
                    />
                    <label htmlFor="paypal">PayPal</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="apple-pay" 
                      name="payment-method"
                      checked={paymentMethod === 'apple-pay'}
                      onChange={() => setPaymentMethod('apple-pay')}
                      className="mr-2 accent-accent-600"
                    />
                    <label htmlFor="apple-pay">Apple Pay</label>
                  </div>
                </div>
                
                {paymentMethod === 'credit-card' && (
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="mb-4">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card*
                      </label>
                      <input 
                        type="text" 
                        id="cardName" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number*
                      </label>
                      <input 
                        type="text" 
                        id="cardNumber" 
                        inputMode="numeric"
                        autoComplete="off"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="XXXX XXXX XXXX XXXX"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date*
                        </label>
                        <input 
                          type="text" 
                          id="expiry" 
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV*
                        </label>
                        <input 
                          type="text" 
                          id="cvv" 
                          inputMode="numeric"
                          autoComplete="off"
                          maxLength={4}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button 
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="btn btn-primary"
                  >
                    Continue to Review
                  </button>
                </div>
              </form>
            )}
            
            {/* Step 3: Review */}
            {activeStep === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Review Your Order</h2>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p className="text-gray-700">
                    {shippingInfo.firstName} {shippingInfo.lastName}<br />
                    {shippingInfo.address}<br />
                    {shippingInfo.addressLine2 && (
                      <>
                        {shippingInfo.addressLine2}<br />
                      </>
                    )}
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}<br />
                    {COUNTRIES[shippingInfo.country]}
                  </p>
                  <p className="text-gray-700 mt-2">
                    {shippingInfo.email}<br />
                    {shippingInfo.phone}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-gray-700 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-gray-700" />
                    {PAYMENT_METHODS[paymentMethod]}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Items ({cartItems.length})</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-12 h-12 object-cover rounded-md mr-4"
                                />
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-right font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => setActiveStep(2)}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handlePlaceOrder}
                    className="btn btn-primary"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
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
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-xl">{formatPrice(total)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
              <Lock className="h-4 w-4 mr-1" />
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;