import { RotateCcw, Shield, Clock, CheckCircle } from 'lucide-react';

const ReturnsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Returns & Warranty</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We stand behind the quality of our refurbished phones. Learn about our hassle-free return policy and comprehensive warranty coverage.
        </p>
      </div>

      {/* Return Policy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="bg-accent-600 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Clock className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2">30-Day Returns</h3>
          <p className="text-gray-600">Full refund within 30 days of purchase</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="bg-blue-500 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <RotateCcw className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2">Easy Process</h3>
          <p className="text-gray-600">Simple online return initiation</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="bg-accent-600 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Shield className="h-8 w-8 text-ink-900" />
          </div>
          <h3 className="font-bold text-lg mb-2">12-Month Warranty</h3>
          <p className="text-gray-600">Comprehensive hardware coverage</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="bg-purple-500 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2">Quality Guarantee</h3>
          <p className="text-gray-600">Satisfaction guaranteed or money back</p>
        </div>
      </div>

      {/* Return Policy Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Return Policy</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">30-Day Return Window</h3>
              <p className="text-gray-600">
                You have 30 days from the date of delivery to return your device for a full refund. 
                The device must be in its original condition with all accessories.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Return Conditions</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Device must be in original condition</li>
                <li>• All original accessories must be included</li>
                <li>• Original packaging preferred but not required</li>
                <li>• No physical damage beyond normal wear</li>
                <li>• Factory reset must be performed</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Return Process</h3>
              <ol className="text-gray-600 space-y-1">
                <li>1. Contact customer service to initiate return</li>
                <li>2. Receive prepaid return shipping label</li>
                <li>3. Package device securely and ship back</li>
                <li>4. Refund processed within 5-7 business days</li>
              </ol>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Refund Method</h3>
              <p className="text-gray-600">
                Refunds are processed to the original payment method. Credit card refunds typically 
                appear within 3-5 business days, while PayPal refunds are usually instant.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Warranty Coverage</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">12-Month Hardware Warranty</h3>
              <p className="text-gray-600">
                All refurbished devices come with a comprehensive 12-month warranty covering 
                manufacturing defects and hardware failures.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">What's Covered</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Display and touchscreen issues</li>
                <li>• Camera malfunctions</li>
                <li>• Speaker and microphone problems</li>
                <li>• Battery capacity below 80%</li>
                <li>• Charging port defects</li>
                <li>• Button functionality issues</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">What's Not Covered</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Physical damage from drops or impacts</li>
                <li>• Water damage</li>
                <li>• Software issues or viruses</li>
                <li>• Normal wear and tear</li>
                <li>• Damage from unauthorized repairs</li>
                <li>• Lost or stolen devices</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Warranty Claims</h3>
              <p className="text-gray-600">
                To file a warranty claim, contact our support team with your order number and 
                description of the issue. We'll guide you through the diagnostic process.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Return Process Steps */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
        <h2 className="text-2xl font-bold mb-6">How to Return Your Device</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-accent-600 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-ink-900">1</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Contact Us</h3>
            <p className="text-gray-600">
              Email support@dreamlandgadgets.com or call us to initiate your return
            </p>
          </div>

          <div className="text-center">
            <div className="bg-accent-600 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-ink-900">2</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Get Return Label</h3>
            <p className="text-gray-600">
              We'll email you a prepaid return shipping label within 24 hours
            </p>
          </div>

          <div className="text-center">
            <div className="bg-accent-600 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-ink-900">3</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Ship It Back</h3>
            <p className="text-gray-600">
              Package your device securely and drop it off at any carrier location
            </p>
          </div>

          <div className="text-center">
            <div className="bg-accent-600 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-ink-900">4</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Get Refunded</h3>
            <p className="text-gray-600">
              Receive your full refund within 5-7 business days of our receipt
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-lg mb-2">Can I exchange my device for a different model?</h3>
            <p className="text-gray-600 mb-4">
              We don't offer direct exchanges, but you can return your current device and place a new order for the model you prefer.
            </p>

            <h3 className="font-medium text-lg mb-2">What if I lost the original accessories?</h3>
            <p className="text-gray-600 mb-4">
              Missing accessories may result in a partial refund deduction. Contact us to discuss your specific situation.
            </p>

            <h3 className="font-medium text-lg mb-2">How long does warranty repair take?</h3>
            <p className="text-gray-600">
              Most warranty repairs are completed within 7-10 business days. We'll provide a loaner device if the repair takes longer.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Can I return a device bought on sale?</h3>
            <p className="text-gray-600 mb-4">
              Yes, our return policy applies to all purchases regardless of sale price or promotional offers.
            </p>

            <h3 className="font-medium text-lg mb-2">What if my device stops working after 30 days?</h3>
            <p className="text-gray-600 mb-4">
              After 30 days, hardware issues are covered under our 12-month warranty. Contact us for warranty service.
            </p>

            <h3 className="font-medium text-lg mb-2">Do I need to pay for return shipping?</h3>
            <p className="text-gray-600">
              No, we provide prepaid return shipping labels for all returns and warranty claims within the US.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;