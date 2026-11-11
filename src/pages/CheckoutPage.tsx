import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Check, CreditCard, Lock, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/cart';
import DeviceArt from '../components/common/DeviceArt';
import TrustStrip from '../components/common/TrustStrip';
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
      <div className="container py-12 sm:py-20">
        <div className="panel mx-auto max-w-2xl py-12 text-center">
          <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-600 text-white">
            <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden="true" />
          </span>
          <h1 className="page-title">Thank you for your order!</h1>
          <p className="mb-2 mt-4 text-lg text-gray-600">
            Order <span className="rounded-md bg-gray-100 px-2 py-1 font-medium text-ink-900">#{placedOrder.orderNumber}</span> for{' '}
            <span className="font-medium text-ink-900">{formatPrice(placedOrder.total)}</span> has been placed.
          </p>
          <p className="mx-auto mb-8 max-w-md text-sm text-gray-500">
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
      <div className="container pb-8">
        <header className="page-header mb-8">
          <h1 className="page-title">Checkout</h1>
        </header>
        <div className="panel mx-auto max-w-xl py-14 text-center">
          <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-50">
            <ShoppingCart className="h-7 w-7 text-accent-700" aria-hidden="true" />
          </span>
          <h2 className="text-2xl">Your cart is empty</h2>
          <p className="mb-7 mt-2 text-gray-600">Add a phone to your cart before checking out.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container pb-8">
      <header className="page-header mb-8">
        <Link to="/cart" className="mb-4 inline-flex items-center text-sm font-medium text-accent-700 underline-offset-4 hover:underline">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Cart
        </Link>
        <h1 className="page-title">Checkout</h1>

        {/* Progress steps */}
        <ol className="mt-8 grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-3">
          {[1, 2, 3].map((step) => (
            <li key={step}>
              <button
                className={`group block w-full text-left ${step <= activeStep ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                type="button"
                onClick={() => goToStep(step)}
                disabled={step > activeStep}
                aria-current={step === activeStep ? 'step' : undefined}
              >
                <span
                  className={`block h-1.5 rounded-full transition-colors ${
                    step <= activeStep ? 'bg-accent-600' : 'bg-gray-300'
                  }`}
                />
                <span className="mt-3 flex items-center gap-2">
                  <span
                    className={`inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      step < activeStep
                        ? 'bg-accent-600 text-white'
                        : step === activeStep
                          ? 'bg-ink-900 text-white'
                          : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step < activeStep ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : step}
                  </span>
                  <span className={`text-sm font-medium sm:text-base ${step === activeStep ? 'text-ink-900' : 'text-gray-600'}`}>
                    {step === 1 ? 'Shipping' : step === 2 ? 'Payment' : 'Review'}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-12">
        {/* Main checkout form */}
        <div>
          <div className="panel">
            {/* Step 1: Shipping */}
            {activeStep === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveStep(2);
                }}
              >
                <h2 className="mb-6 text-2xl">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="field-label">
                      First Name*
                    </label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      className="field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="field-label">
                      Last Name*
                    </label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      className="field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="field-label">
                      Email Address*
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className="field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="field-label">
                      Phone Number*
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className="field"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="address" className="field-label">
                    Street Address*
                  </label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    className="field mb-2"
                    required
                  />
                  <input 
                    type="text" 
                    id="addressLine2" 
                    name="addressLine2"
                    value={shippingInfo.addressLine2}
                    onChange={handleShippingChange}
                    className="field"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label htmlFor="city" className="field-label">
                      City*
                    </label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className="field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="field-label">
                      State/Province*
                    </label>
                    <input 
                      type="text" 
                      id="state" 
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className="field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="field-label">
                      ZIP/Postal Code*
                    </label>
                    <input 
                      type="text" 
                      id="zip" 
                      name="zip"
                      value={shippingInfo.zip}
                      onChange={handleShippingChange}
                      className="field"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="country" className="field-label">
                    Country*
                  </label>
                  <select 
                    id="country" 
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleShippingChange}
                    className="field"
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
                    className="mr-2.5 h-4 w-4"
                  />
                  <label htmlFor="saveAddress" className="text-sm text-gray-700">
                    Save this address for future orders
                  </label>
                </div>
                
                <div className="flex justify-end border-t border-gray-200 pt-6">
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
                <h2 className="mb-6 text-2xl">Payment Method</h2>
                
                <div className="mb-6 space-y-2.5">
                  {Object.entries(PAYMENT_METHODS).map(([value, label]) => (
                    <label
                      key={value}
                      htmlFor={value}
                      className={`flex cursor-pointer items-center rounded-xl border p-4 transition-colors ${
                        paymentMethod === value
                          ? 'border-accent-600 bg-accent-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        id={value}
                        name="payment-method"
                        checked={paymentMethod === value}
                        onChange={() => setPaymentMethod(value)}
                        className="mr-3 h-4 w-4"
                      />
                      {value === 'credit-card' && <CreditCard className="mr-2 h-5 w-5 text-ink-700" aria-hidden="true" />}
                      <span className="font-medium text-ink-900">{label}</span>
                    </label>
                  ))}
                </div>
                
                {paymentMethod === 'credit-card' && (
                  <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                    <div className="mb-4">
                      <label htmlFor="cardName" className="field-label">
                        Name on Card*
                      </label>
                      <input 
                        type="text" 
                        id="cardName" 
                        className="field"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="field-label">
                        Card Number*
                      </label>
                      <input 
                        type="text" 
                        id="cardNumber" 
                        inputMode="numeric"
                        autoComplete="off"
                        className="field"
                        placeholder="XXXX XXXX XXXX XXXX"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="field-label">
                          Expiry Date*
                        </label>
                        <input 
                          type="text" 
                          id="expiry" 
                          className="field"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="field-label">
                          CVV*
                        </label>
                        <input 
                          type="text" 
                          id="cvv" 
                          inputMode="numeric"
                          autoComplete="off"
                          maxLength={4}
                          className="field"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between gap-3 border-t border-gray-200 pt-6">
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
                <h2 className="mb-6 text-2xl">Review Your Order</h2>
                
                <div className="mb-4 rounded-xl border border-gray-200 p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-base">Shipping Address</h3>
                    <button type="button" onClick={() => setActiveStep(1)} className="text-sm font-medium text-accent-700 underline-offset-4 hover:underline">Edit</button>
                  </div>
                  <p className="break-words text-gray-700">
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
                  <p className="mt-2 break-words text-gray-700">
                    {shippingInfo.email}<br />
                    {shippingInfo.phone}
                  </p>
                </div>
                
                <div className="mb-6 rounded-xl border border-gray-200 p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-base">Payment Method</h3>
                    <button type="button" onClick={() => setActiveStep(2)} className="text-sm font-medium text-accent-700 underline-offset-4 hover:underline">Edit</button>
                  </div>
                  <p className="text-gray-700 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-gray-700" />
                    {PAYMENT_METHODS[paymentMethod]}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="mb-2 text-base">Items ({cartItems.length})</h3>
                  <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex items-center gap-4 p-4">
                        <span className="tile h-14 w-14 flex-shrink-0 rounded-lg">
                          <DeviceArt productId={item.id} className="h-full w-full p-1" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-sans font-medium tracking-normal">{item.name}</h4>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <span className="whitespace-nowrap font-medium text-ink-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between gap-3 border-t border-gray-200 pt-6">
                  <button 
                    onClick={() => setActiveStep(2)}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handlePlaceOrder}
                    className="btn btn-primary btn-lg"
                  >
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Order summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="mb-5 text-xl">Order Summary</h2>

            <ul className="mb-5 space-y-3 border-b border-gray-200 pb-5">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <span className="tile h-12 w-12 flex-shrink-0 rounded-lg">
                    <DeviceArt productId={item.id} className="h-full w-full p-0.5" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm">
                    <span className="block truncate font-medium text-ink-900">{item.name}</span>
                    <span className="text-gray-500">Qty {item.quantity}</span>
                  </span>
                  <span className="whitespace-nowrap text-sm font-medium text-ink-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

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
              <div className="flex justify-between">
                <dt className="text-gray-600">Tax</dt>
                <dd className="font-medium text-ink-900">{formatPrice(tax)}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-gray-200 pt-4">
                <dt className="font-medium text-ink-900">Total</dt>
                <dd className="font-display text-2xl font-medium text-ink-900">{formatPrice(total)}</dd>
              </div>
            </dl>

            <p className="mt-5 flex items-center justify-center gap-1.5 rounded-lg bg-gray-50 py-2.5 text-sm text-gray-600">
              <Lock className="h-4 w-4" aria-hidden="true" />
              Secure checkout
            </p>

            <TrustStrip variant="stack" className="mt-5 border-t border-gray-200 pt-5" />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
