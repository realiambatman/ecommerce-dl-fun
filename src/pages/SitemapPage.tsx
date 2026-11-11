import { Link } from 'react-router-dom';
import { ExternalLink, Home, ShoppingBag, User, FileText } from 'lucide-react';

const SitemapPage = () => {
  const siteStructure = [
    {
      title: "Main Pages",
      icon: <Home className="h-5 w-5" />,
      links: [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Cart", path: "/cart" },
        { name: "Checkout", path: "/checkout" },
        { name: "Account", path: "/account" }
      ]
    },
    {
      title: "Product Categories",
      icon: <ShoppingBag className="h-5 w-5" />,
      links: [
        { name: "All Products", path: "/products" },
        { name: "iPhone", path: "/products?category=iphone" },
        { name: "Samsung", path: "/products?category=samsung" },
        { name: "Google Pixel", path: "/products?category=google" },
        { name: "OnePlus", path: "/products?category=oneplus" },
        { name: "Special Deals", path: "/products?category=deals" }
      ]
    },
    {
      title: "Customer Service",
      icon: <User className="h-5 w-5" />,
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "Track Your Order", path: "/track-order" },
        { name: "Shipping Information", path: "/shipping" },
        { name: "Returns & Warranty", path: "/returns" },
        { name: "FAQ", path: "/faq" }
      ]
    },
    {
      title: "Legal & Policies",
      icon: <FileText className="h-5 w-5" />,
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Sitemap", path: "/sitemap" }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find all the pages and sections of our website organized for easy navigation.
        </p>
      </div>

      {/* Site Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {siteStructure.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="bg-accent-600 rounded-lg p-2 mr-3">
                {section.icon}
              </div>
              <h2 className="text-xl font-bold">{section.title}</h2>
            </div>
            
            <ul className="space-y-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-accent-700 transition-colors flex items-center"
                  >
                    <span className="mr-2">•</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">Website Features</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-medium">Responsive Design</h3>
                <p className="text-gray-600 text-sm">Optimized for desktop, tablet, and mobile devices</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-medium">Search Functionality</h3>
                <p className="text-gray-600 text-sm">Find products quickly with our search feature</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-medium">Product Filtering</h3>
                <p className="text-gray-600 text-sm">Filter by brand, condition, price, and category</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-medium">Secure Checkout</h3>
                <p className="text-gray-600 text-sm">SSL encrypted payment processing</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-medium">Order Tracking</h3>
                <p className="text-gray-600 text-sm">Real-time tracking of your orders</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Popular Categories</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/products?category=iphone" className="text-gray-600 hover:text-accent-700">iPhone</Link></li>
                <li><Link to="/products?category=samsung" className="text-gray-600 hover:text-accent-700">Samsung</Link></li>
                <li><Link to="/products?category=deals" className="text-gray-600 hover:text-accent-700">Deals</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Support</h3>
              <ul className="space-y-1 text-sm">
                <li><Link to="/contact" className="text-gray-600 hover:text-accent-700">Contact</Link></li>
                <li><Link to="/faq" className="text-gray-600 hover:text-accent-700">FAQ</Link></li>
                <li><Link to="/returns" className="text-gray-600 hover:text-accent-700">Returns</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="font-medium mb-2">External Links</h3>
            <div className="space-y-2">
              <a 
                href="mailto:support@dreamlandgadgets.com" 
                className="text-gray-600 hover:text-accent-700 text-sm flex items-center"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Email Support
              </a>
              <a 
                href="tel:+15551234567" 
                className="text-gray-600 hover:text-accent-700 text-sm flex items-center"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Phone Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          Sitemap last updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
    </div>
  );
};

export default SitemapPage;