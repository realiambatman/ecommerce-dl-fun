import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Smartphone,
  Phone,
  ChevronDown,
  Heart,
  Bell,
  LogOut
} from 'lucide-react';
import { useCart } from '../../context/cart';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsDropdownOpen('');
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : '/products');
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleDropdown = (menu: string) => {
    setIsDropdownOpen(isDropdownOpen === menu ? '' : menu);
  };

  return (
    <>
      {/* Top banner */}
      <div className="bg-ink-900 text-white py-2 px-4 text-center text-sm">
        <p>
          Free shipping on orders over ₹15,000 | 12-month warranty on all devices
        </p>
      </div>

      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-md py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Main header content */}
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-ink-900 transition-opacity hover:opacity-80"
            >
              <div className="bg-accent-600 rounded-lg p-2">
                <Smartphone className="h-6 w-6 text-ink-900" />
              </div>
              <div>
                <span className="font-bold text-xl hidden sm:block">Dreamland Gadgets</span>
                <span className="text-xs text-gray-600 hidden sm:block">Premium Refurbished Phones</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link to="/" className="nav-link px-4 py-2">Home</Link>
              
              <div className="relative group">
                <button 
                  className="nav-link px-4 py-2 flex items-center"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen === 'phones'}
                  onClick={() => handleDropdown('phones')}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Phones
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <div className={`absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 group-hover:opacity-100 group-hover:visible transition-all duration-200 group-hover:translate-y-0 ${
                  isDropdownOpen === 'phones' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <Link to="/products?category=iphone" className="block px-4 py-2 hover:bg-gray-50">iPhone</Link>
                  <Link to="/products?category=samsung" className="block px-4 py-2 hover:bg-gray-50">Samsung</Link>
                  <Link to="/products?category=google" className="block px-4 py-2 hover:bg-gray-50">Google Pixel</Link>
                  <Link to="/products?category=oneplus" className="block px-4 py-2 hover:bg-gray-50">OnePlus</Link>
                  <div className="border-t border-gray-100 my-2"></div>
                  <Link to="/products" className="block px-4 py-2 hover:bg-gray-50 text-accent-700">View All Phones</Link>
                </div>
              </div>
              
              <Link to="/products?category=deals" className="nav-link px-4 py-2">Deals</Link>
              <Link to="/products" className="nav-link px-4 py-2">Shop</Link>
              <Link to="/contact" className="nav-link px-4 py-2">Contact</Link>
            </nav>
            
            {/* Icons */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="icon-button"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <Link to="/account?tab=wishlist" className="icon-button hidden sm:flex" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Link>
              
              <Link to="/account?tab=notifications" className="icon-button hidden sm:flex" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Link>
              
              <Link to="/cart" className="icon-button relative" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              
              <div className="relative group hidden sm:block">
                <Link to="/account" className="icon-button" aria-label="Account">
                  <User className="h-5 w-5" />
                </Link>
                <div className="absolute top-full right-0 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -translate-y-2 group-hover:translate-y-0">
                  <Link to="/account" className="block px-4 py-2 hover:bg-gray-50">My Account</Link>
                  <Link to="/account?tab=orders" className="block px-4 py-2 hover:bg-gray-50">Orders</Link>
                  <Link to="/account?tab=wishlist" className="block px-4 py-2 hover:bg-gray-50">Wishlist</Link>
                  <div className="border-t border-gray-100 my-2"></div>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600">
                    Sign Out
                  </button>
                </div>
              </div>
              
              <button 
                className="lg:hidden icon-button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          
          {/* Search bar */}
          {isSearchOpen && (
            <form className="mt-4 relative" role="search" onSubmit={handleSearchSubmit}>
              <input
                type="search"
                aria-label="Search for phones"
                placeholder="Search for phones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600 bg-gray-50"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </form>
          )}
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg max-h-[calc(100vh-100%)] overflow-y-auto">
            <nav className="container mx-auto px-4 py-4">
              <div className="mb-4">
                <Link 
                  to="/account" 
                  className="flex items-center p-4 bg-gray-50 rounded-lg mb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <span className="block font-medium">Account</span>
                    <span className="text-sm text-gray-600">Sign in or register</span>
                  </div>
                </Link>
              </div>

              <div className="space-y-2">
                <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                <div className="border-t border-gray-100 my-2"></div>
                <Link to="/products" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  All Phones
                </Link>
                <Link to="/products?category=iphone" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  iPhone
                </Link>
                <Link to="/products?category=samsung" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Samsung
                </Link>
                <Link to="/products?category=google" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Google Pixel
                </Link>
                <Link to="/products?category=oneplus" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  OnePlus
                </Link>
                <div className="border-t border-gray-100 my-2"></div>
                <Link to="/products?category=deals" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Deals
                </Link>
                <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Link>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="space-y-2">
                <Link to="/account?tab=orders" className="mobile-nav-link flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  My Orders
                </Link>
                <Link to="/account?tab=wishlist" className="mobile-nav-link flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  <Heart className="h-5 w-5 mr-3" />
                  Wishlist
                </Link>
                <Link to="/account?tab=notifications" className="mobile-nav-link flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </Link>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <button className="w-full text-left text-red-600 mobile-nav-link flex items-center">
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;