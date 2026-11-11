import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
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
  ShieldCheck,
} from 'lucide-react';
import Logo from '../common/Logo';

const shopLinks = [
  { to: '/products', label: 'Shop All Phones' },
  { to: '/products?category=iphone', label: 'iPhones' },
  { to: '/products?category=samsung', label: 'Samsung Phones' },
  { to: '/products?category=google', label: 'Google Pixels' },
  { to: '/products?category=oneplus', label: 'OnePlus Phones' },
  { to: '/products?category=deals', label: 'Special Deals' },
];

const serviceLinks = [
  { to: '/account', label: 'My Account' },
  { to: '/track-order', label: 'Track Your Order' },
  { to: '/shipping', label: 'Shipping Information' },
  { to: '/returns', label: 'Returns & Warranty' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact Us' },
];

const socials = [
  { label: 'Facebook', icon: Facebook },
  { label: 'Instagram', icon: Instagram },
  { label: 'Twitter', icon: Twitter },
  { label: 'YouTube', icon: Youtube },
  { label: 'LinkedIn', icon: Linkedin },
];

const payments = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay'];

const footerLink = 'text-gray-600 underline-offset-4 transition-colors hover:text-ink-900 hover:underline';

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
    <footer className="mt-20 border-t border-gray-200 bg-gray-100 text-gray-600">
      <div className="container">
        {/* Newsletter Section */}
        <div className="grid items-center gap-6 border-b border-gray-200 py-10 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="text-2xl">Stay Updated</h3>
            <p className="mt-1">
              Subscribe to our newsletter for exclusive deals and phone recommendations.
            </p>
          </div>
          <div>
            <form className="flex flex-col gap-2 sm:flex-row" onSubmit={handleNewsletterSubmit}>
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
                className="field h-12 flex-1 rounded-full px-5"
              />
              <button type="submit" className="btn btn-primary h-12 px-6">
                Subscribe
              </button>
            </form>
            {isSubscribed && (
              <p className="mt-2 text-sm font-medium text-accent-700" role="status">
                Thanks for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Company Info */}
          <div>
            <Logo />
            <p className="mt-5 max-w-sm">
              Your trusted source for premium refurbished phones. Quality assured, thoroughly tested, and backed by our comprehensive warranty.
            </p>

            {/* Contact Info */}
            <ul className="mt-6 space-y-3 text-[0.95rem]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-[1.1rem] w-[1.1rem] flex-shrink-0 text-accent-600" aria-hidden="true" />
                <span>123 Tech Street, Digital City, 12345</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-[1.1rem] w-[1.1rem] flex-shrink-0 text-accent-600" aria-hidden="true" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-[1.1rem] w-[1.1rem] flex-shrink-0 text-accent-600" aria-hidden="true" />
                <span className="break-all">support@dreamlandgadgets.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-[1.1rem] w-[1.1rem] flex-shrink-0 text-accent-600" aria-hidden="true" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM EST</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-base">Quick Links</h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4 text-base">Customer Service</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Security */}
          <div>
            <h4 className="mb-4 text-base">Trust & Security</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" aria-hidden="true" />
                <div>
                  <h5 className="font-sans text-[0.95rem] font-medium tracking-normal">12-Month Warranty</h5>
                  <p className="text-sm">Comprehensive coverage on all devices</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-600" aria-hidden="true" />
                <div>
                  <h5 className="font-sans text-[0.95rem] font-medium tracking-normal">Secure Payments</h5>
                  <p className="text-sm">SSL encrypted checkout</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h5 className="mb-2.5 font-sans text-sm font-medium tracking-normal">Accepted Payments</h5>
              <ul className="flex flex-wrap gap-2">
                {payments.map((name) => (
                  <li
                    key={name}
                    className="rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-ink-800"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-6 text-sm md:flex-row">
          <div>&copy; {currentYear} Dreamland Gadgets. All rights reserved.</div>

          {/* Social Links */}
          <div className="flex gap-1">
            {socials.map(({ label, icon: Icon }) => (
              <a key={label} href="#" aria-label={label} className="icon-button h-9 w-9 text-gray-500 hover:bg-gray-200">
                <Icon className="h-[1.1rem] w-[1.1rem]" />
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex gap-5">
            <Link to="/privacy" className={footerLink}>
              Privacy Policy
            </Link>
            <Link to="/terms" className={footerLink}>
              Terms of Service
            </Link>
            <Link to="/sitemap" className={footerLink}>
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
