import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { formatPrice } from '../utils/pricing';

interface TrackingItem {
  name: string;
  quantity: number;
  price: number;
}

interface TrackingEvent {
  status: string;
  date: string;
  time: string;
  completed: boolean;
}

interface TrackingData {
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  trackingNumber: string;
  items: TrackingItem[];
  timeline: TrackingEvent[];
}

const TrackOrderPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setNotFound(false);
    
    // Simulate an API call. Only the demo order number DG12345 returns a result.
    setTimeout(() => {
      if (orderNumber.trim().toLowerCase() === 'dg12345') {
        setTrackingData({
          orderNumber: 'DG12345',
          status: 'shipped',
          estimatedDelivery: '2024-01-15',
          trackingNumber: 'TRK789456123',
          items: [
            { name: 'iPhone 13 Pro 256GB', quantity: 1, price: 64999 }
          ],
          timeline: [
            { status: 'Order Placed', date: '2024-01-10', time: '10:30 AM', completed: true },
            { status: 'Payment Confirmed', date: '2024-01-10', time: '10:35 AM', completed: true },
            { status: 'Processing', date: '2024-01-11', time: '2:15 PM', completed: true },
            { status: 'Shipped', date: '2024-01-12', time: '9:00 AM', completed: true },
            { status: 'Out for Delivery', date: '2024-01-15', time: 'Pending', completed: false },
            { status: 'Delivered', date: '2024-01-15', time: 'Pending', completed: false }
          ]
        });
      } else {
        setTrackingData(null);
        setNotFound(true);
      }
      setIsLoading(false);
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order placed':
      case 'payment confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
      case 'out for delivery':
        return <Truck className="h-5 w-5 text-yellow-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enter your order number and email address to track your shipment and get real-time updates.
        </p>
      </div>

      {/* Tracking Form */}
      <div className="max-w-md mx-auto mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Order Number *
              </label>
              <input
                type="text"
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g., DG12345"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary py-3"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-navy-900 mr-2"></div>
                  Tracking...
                </div>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Track Order
                </>
              )}
            </button>
          </form>

          {notFound && (
            <p className="mt-4 text-sm text-red-500 text-center" role="alert">
              Order not found. Please check your order number and email.
            </p>
          )}

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Try order number: <span className="font-mono bg-gray-100 px-2 py-1 rounded">DG12345</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tracking Results */}
      {trackingData && (
        <div className="max-w-4xl mx-auto">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Order #{trackingData.orderNumber}</h2>
                <p className="text-gray-600">
                  Estimated delivery: <span className="font-medium">{new Date(trackingData.estimatedDelivery).toLocaleDateString()}</span>
                </p>
                <p className="text-gray-600">
                  Tracking number: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{trackingData.trackingNumber}</span>
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  trackingData.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  trackingData.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {trackingData.status.charAt(0).toUpperCase() + trackingData.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-3">Items in this order:</h3>
              {trackingData.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-600 ml-2">× {item.quantity}</span>
                  </div>
                  <span className="font-medium">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-6">Tracking Timeline</h3>
            <div className="space-y-4">
              {trackingData.timeline.map((event, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-medium ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {event.status}
                        </h4>
                        <p className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {event.date} {event.time !== 'Pending' && `at ${event.time}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < trackingData.timeline.length - 1 && (
                    <div className="absolute left-[9px] top-6 w-0.5 h-6 bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="max-w-2xl mx-auto mt-12 text-center">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you're having trouble tracking your order or have questions about your shipment, 
            our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@dreamlandgadgets.com" className="btn btn-outline">
              Email Support
            </a>
            <a href="tel:+15551234567" className="btn btn-primary">
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;