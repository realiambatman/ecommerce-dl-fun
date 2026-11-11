import { Truck, Clock, Shield } from 'lucide-react';

const ShippingPage = () => {
  return (
    <div className="container pb-8">
      <header className="page-header mb-10">
        <h1 className="page-title">Shipping Information</h1>
        <p className="page-lede">
          Learn about our shipping options, delivery times, and policies to ensure your refurbished phone reaches you safely and on time.
        </p>
      </header>

      {/* Shipping Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="card p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent-50 text-accent-700">
            <Truck className="h-5 w-5" />
          </div>
          <h3 className="text-lg mb-2">Standard Shipping</h3>
          <p className="text-gray-600 mb-3">5-7 business days</p>
          <p className="text-2xl text-accent-700 mb-2">FREE</p>
          <p className="text-sm text-gray-500">On orders over ₹15,000</p>
        </div>

        <div className="card p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent-50 text-accent-700">
            <Clock className="h-5 w-5" />
          </div>
          <h3 className="text-lg mb-2">Express Shipping</h3>
          <p className="text-gray-600 mb-3">2-3 business days</p>
          <p className="text-2xl text-accent-700 mb-2">₹299</p>
          <p className="text-sm text-gray-500">Available nationwide</p>
        </div>

        <div className="card p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent-50 text-accent-700">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="text-lg mb-2">Priority Shipping</h3>
          <p className="text-gray-600 mb-3">1-2 business days</p>
          <p className="text-2xl text-accent-700 mb-2">₹599</p>
          <p className="text-sm text-gray-500">Fastest delivery option</p>
        </div>
      </div>

      {/* Shipping Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="panel">
          <h2 className="text-2xl mb-6">Shipping Policies</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">Processing Time</h3>
              <p className="text-gray-600">
                All orders are processed within 1-2 business days. Orders placed on weekends or holidays 
                will be processed the next business day.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Shipping Areas</h3>
              <p className="text-gray-600">
                We currently ship to all locations within the United States. International shipping 
                is not available at this time.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Packaging</h3>
              <p className="text-gray-600">
                All devices are carefully packaged in protective materials to ensure they arrive in 
                perfect condition. We use eco-friendly packaging whenever possible.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Tracking</h3>
              <p className="text-gray-600">
                You'll receive a tracking number via email once your order ships. You can track your 
                package on our website or the carrier's website.
              </p>
            </div>
          </div>
        </div>

        <div className="panel">
          <h2 className="text-2xl mb-6">Delivery Information</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">Delivery Hours</h3>
              <p className="text-gray-600">
                Most deliveries occur between 9:00 AM and 6:00 PM, Monday through Friday. 
                Saturday delivery may be available for express and priority shipping.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Signature Required</h3>
              <p className="text-gray-600">
                For security, all orders over ₹25,000 require a signature upon delivery. 
                Please ensure someone is available to receive the package.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Delivery Attempts</h3>
              <p className="text-gray-600">
                If delivery is unsuccessful, the carrier will make up to 3 delivery attempts. 
                After that, the package will be held at a local facility for pickup.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Address Changes</h3>
              <p className="text-gray-600">
                Address changes can only be made before the order ships. Contact us immediately 
                if you need to update your shipping address.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Zones */}
      <div className="panel mb-12">
        <h2 className="text-2xl mb-6">Shipping Zones & Transit Times</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left font-medium">Zone</th>
                <th className="py-3 px-4 text-left font-medium">States</th>
                <th className="py-3 px-4 text-left font-medium">Standard</th>
                <th className="py-3 px-4 text-left font-medium">Express</th>
                <th className="py-3 px-4 text-left font-medium">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 px-4 font-medium">Zone 1</td>
                <td className="py-3 px-4">CA, NV, OR, WA</td>
                <td className="py-3 px-4">3-5 days</td>
                <td className="py-3 px-4">2-3 days</td>
                <td className="py-3 px-4">1-2 days</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Zone 2</td>
                <td className="py-3 px-4">AZ, CO, ID, MT, NM, UT, WY</td>
                <td className="py-3 px-4">4-6 days</td>
                <td className="py-3 px-4">2-3 days</td>
                <td className="py-3 px-4">1-2 days</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Zone 3</td>
                <td className="py-3 px-4">Central States</td>
                <td className="py-3 px-4">5-7 days</td>
                <td className="py-3 px-4">3-4 days</td>
                <td className="py-3 px-4">2-3 days</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Zone 4</td>
                <td className="py-3 px-4">Eastern States</td>
                <td className="py-3 px-4">6-8 days</td>
                <td className="py-3 px-4">3-4 days</td>
                <td className="py-3 px-4">2-3 days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="rounded-2xl bg-accent-50 p-6 sm:p-8">
        <h2 className="text-2xl mb-6">Shipping FAQ</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-lg mb-2">Can I change my shipping address?</h3>
            <p className="text-gray-600 mb-4">
              Yes, but only before your order ships. Contact us immediately if you need to make changes.
            </p>

            <h3 className="font-medium text-lg mb-2">Do you ship to PO boxes?</h3>
            <p className="text-gray-600 mb-4">
              We can ship to PO boxes for standard shipping only. Express and priority shipping require a physical address.
            </p>

            <h3 className="font-medium text-lg mb-2">What if my package is damaged?</h3>
            <p className="text-gray-600">
              If your package arrives damaged, please contact us within 48 hours with photos. We'll arrange a replacement immediately.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Can I expedite my order?</h3>
            <p className="text-gray-600 mb-4">
              If your order hasn't shipped yet, you can upgrade to express or priority shipping by contacting customer service.
            </p>

            <h3 className="font-medium text-lg mb-2">Do you offer weekend delivery?</h3>
            <p className="text-gray-600 mb-4">
              Saturday delivery is available for express and priority shipping in most areas for an additional fee.
            </p>

            <h3 className="font-medium text-lg mb-2">What carriers do you use?</h3>
            <p className="text-gray-600">
              We partner with FedEx, UPS, and USPS to ensure reliable delivery. The carrier is selected based on your location and shipping method.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;