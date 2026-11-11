import { Shield, Eye, Lock, UserCheck } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
        </p>
        <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2024</p>
      </div>

      {/* Privacy Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="bg-accent-600 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2">Data Protection</h3>
          <p className="text-gray-600">Your data is encrypted and securely stored</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="bg-blue-500 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Eye className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2">Transparency</h3>
          <p className="text-gray-600">Clear information about data usage</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="bg-purple-500 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2">No Selling</h3>
          <p className="text-gray-600">We never sell your personal information</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="bg-accent-600 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <UserCheck className="h-8 w-8 text-ink-900" />
          </div>
          <h3 className="font-bold text-lg mb-2">Your Control</h3>
          <p className="text-gray-600">Manage your privacy preferences</p>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, or contact us for support.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Name, email address, and phone number</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely by our payment providers)</li>
              <li>Order history and preferences</li>
              <li>Communications with customer support</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent on site, click patterns)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Location information (if you enable location services)</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to provide, maintain, and improve our services.
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Provide customer support</li>
              <li>Send you promotional emails (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information in the following circumstances:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li><strong>Service Providers:</strong> With trusted partners who help us operate our business (payment processors, shipping companies, email services)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>SSL encryption for all data transmission</li>
              <li>Secure servers with restricted access</li>
              <li>Regular security audits and updates</li>
              <li>Employee training on data protection</li>
              <li>PCI DSS compliance for payment processing</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your browsing experience:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Marketing Cookies:</strong> Used to show relevant advertisements</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            
            <p className="mb-6">
              You can control cookies through your browser settings, but disabling certain cookies may affect website functionality.
            </p>

            <h2 className="text-2xl font-bold mb-4">6. Your Rights and Choices</h2>
            <p className="mb-4">
              You have several rights regarding your personal information:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Restriction:</strong> Limit how we process your information</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
            <p className="mb-6">
              We retain your personal information for as long as necessary to provide our services, 
              comply with legal obligations, resolve disputes, and enforce our agreements. 
              Account information is typically retained for 7 years after account closure, 
              while marketing data may be retained until you opt out.
            </p>

            <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
            <p className="mb-6">
              Our services are not intended for children under 13 years of age. 
              We do not knowingly collect personal information from children under 13. 
              If we become aware that we have collected such information, we will delete it promptly.
            </p>

            <h2 className="text-2xl font-bold mb-4">9. International Transfers</h2>
            <p className="mb-6">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your information in accordance 
              with applicable data protection laws.
            </p>

            <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
            <p className="mb-6">
              We may update this privacy policy from time to time. We will notify you of any 
              material changes by posting the new policy on our website and updating the 
              "Last updated" date. Your continued use of our services after such changes 
              constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p><strong>Email:</strong> privacy@dreamlandgadgets.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Mail:</strong> Dreamland Gadgets Privacy Team<br />
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

export default PrivacyPage;