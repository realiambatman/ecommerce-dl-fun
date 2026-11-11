import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please read these terms carefully before using our services. By using our website and purchasing our products, you agree to these terms.
        </p>
        <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2024</p>
      </div>

      {/* Terms Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="bg-blue-500 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2">Clear Terms</h3>
          <p className="text-gray-600">Easy to understand conditions</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="bg-accent-600 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2">Fair Policies</h3>
          <p className="text-gray-600">Balanced rights and responsibilities</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="bg-accent-600 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-ink-900" />
          </div>
          <h3 className="font-bold text-lg mb-2">Important Info</h3>
          <p className="text-gray-600">Key limitations and disclaimers</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="bg-purple-500 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2">Your Rights</h3>
          <p className="text-gray-600">Protected consumer rights</p>
        </div>
      </div>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing and using the Dreamland Gadgets website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the materials on Dreamland Gadgets' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
              <li>attempt to decompile or reverse engineer any software contained on the website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">3. Product Information and Availability</h2>
            <p className="mb-4">
              We strive to provide accurate product descriptions, specifications, and pricing. However:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Product availability is subject to change without notice</li>
              <li>We reserve the right to limit quantities and discontinue products</li>
              <li>Prices are subject to change without notice</li>
              <li>We cannot guarantee that product colors displayed on your monitor will be accurate</li>
              <li>All refurbished devices are sold "as-is" with the condition grade specified</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">4. Orders and Payment</h2>
            <h3 className="text-lg font-semibold mb-2">Order Acceptance</h3>
            <p className="mb-4">
              Your receipt of an order confirmation does not signify our acceptance of your order, nor does it constitute confirmation of our offer to sell. We reserve the right to accept or decline your order for any reason.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">Payment Terms</h3>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Payment is due at the time of order</li>
              <li>We accept major credit cards, PayPal, and other specified payment methods</li>
              <li>All prices are in Indian Rupees (INR) unless otherwise specified</li>
              <li>You are responsible for any applicable taxes</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">5. Shipping and Delivery</h2>
            <p className="mb-4">
              Shipping and delivery terms are as follows:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>We ship to addresses within the United States only</li>
              <li>Delivery times are estimates and not guaranteed</li>
              <li>Risk of loss and title for products pass to you upon delivery to the carrier</li>
              <li>We are not responsible for delays caused by the shipping carrier</li>
              <li>You must inspect packages upon delivery and report damage within 48 hours</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">6. Returns and Refunds</h2>
            <p className="mb-4">
              Our return policy allows for returns within 30 days of delivery, subject to the following conditions:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Items must be in original condition with all accessories</li>
              <li>Original packaging is preferred but not required</li>
              <li>Customer is responsible for return shipping costs unless the item is defective</li>
              <li>Refunds will be processed to the original payment method</li>
              <li>Refund processing may take 5-10 business days</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">7. Warranty</h2>
            <p className="mb-4">
              All refurbished devices come with a 12-month limited warranty covering:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Manufacturing defects and hardware failures</li>
              <li>Battery capacity falling below 80%</li>
              <li>Display and touchscreen malfunctions</li>
              <li>Camera, speaker, and microphone defects</li>
            </ul>
            
            <p className="mb-6">
              The warranty does not cover physical damage, water damage, software issues, normal wear and tear, or damage from unauthorized repairs.
            </p>

            <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
            <p className="mb-6">
              In no event shall Dreamland Gadgets or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>

            <h2 className="text-2xl font-bold mb-4">9. User Accounts</h2>
            <p className="mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Safeguarding your password and account information</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your contact information is current</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">10. Prohibited Uses</h2>
            <p className="mb-4">
              You may not use our service:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">11. Intellectual Property</h2>
            <p className="mb-6">
              The service and its original content, features, and functionality are and will remain the exclusive property of Dreamland Gadgets and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
            </p>

            <h2 className="text-2xl font-bold mb-4">12. Termination</h2>
            <p className="mb-6">
              We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>

            <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
            <p className="mb-6">
              These Terms shall be interpreted and governed by the laws of the State of California, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>

            <h2 className="text-2xl font-bold mb-4">14. Changes to Terms</h2>
            <p className="mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>

            <h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p><strong>Email:</strong> legal@dreamlandgadgets.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Mail:</strong> Dreamland Gadgets Legal Department<br />
              123 Tech Street<br />
              Digital City, 12345<br />
              United States</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;