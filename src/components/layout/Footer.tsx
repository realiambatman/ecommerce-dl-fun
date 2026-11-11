import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Mail, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Linkedin,
  MapPin,
  Clock,
  CreditCard,
  Shield
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Demo only: there is no mailing list backend, so just acknowledge the signup
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-navy-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for exclusive deals and phone recommendations.
              </p>
            </div>
            <div>
              <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  required
                  aria-label="Email address"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    setIsSubscribed(false);
                  }}
                  placeholder="Enter your email" 
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-navy-900 px-6 py-3 rounded-lg font-medium transition-colors">
                  Subscribe
                </button>
              </form>
              {isSubscribed && (
                <p className="mt-2 text-sm text-yellow-500" role="status">
                  Thanks for subscribing!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-500 rounded-lg p-2">
                <Smartphone className="h-6 w-6 text-navy-900" />
              </div>
              <div>
                <h4 className="font-bold text-xl">Dreamland Gadgets</h4>
                <p className="text-sm text-gray-400">Premium Refurbished Phones</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">
              Your trusted source for premium refurbished phones. Quality assured, thoroughly tested, and backed by our comprehensive warranty.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span>123 Tech Street, Digital City, 12345</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-5 w-5 text-yellow-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-5 w-5 text-yellow-500" />
                <span>support@dreamlandgadgets.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM EST</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Shop All Phones
                </Link>
              </li>
              <li>
                <Link to="/products?category=iphone" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  iPhones
                </Link>
              </li>
              <li>
                <Link to="/products?category=samsung" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Samsung Phones
                </Link>
              </li>
              <li>
                <Link to="/products?category=google" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Google Pixels
                </Link>
              </li>
              <li>
                <Link to="/products?category=oneplus" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  OnePlus Phones
                </Link>
              </li>
              <li>
                <Link to="/products?category=deals" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Special Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/account" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Returns & Warranty
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Security */}
          <div>
            <h4 className="text-lg font-bold mb-6">Trust & Security</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                <div>
                  <h5 className="font-medium mb-1">12-Month Warranty</h5>
                  <p className="text-sm text-gray-300">Comprehensive coverage on all devices</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                <div>
                  <h5 className="font-medium mb-1">Secure Payments</h5>
                  <p className="text-sm text-gray-300">SSL encrypted checkout</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h5 className="font-medium mb-3">Accepted Payments</h5>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-white/10 rounded p-2 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/320px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                </div>
                <div className="bg-white/10 rounded p-2 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/320px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                </div>
                <div className="bg-white/10 rounded p-2 flex items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/320px-PayPal.svg.png" alt="PayPal" className="h-6" />
                </div>
                <div className="bg-white/10 rounded p-2 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white whitespace-nowrap leading-6">Apple Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              &copy; {currentYear} Dreamland Gadgets. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-4 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;