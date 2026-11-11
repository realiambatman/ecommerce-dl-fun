import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  Heart,
  Bell,
  LogOut
} from 'lucide-react';
import { useCart } from '../../context/cart';
import Logo from '../common/Logo';

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

  const menuPanel =
    'absolute top-full w-60 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg transition-all duration-150';
  const menuItem = 'block rounded-lg px-3 py-2 text-[0.95rem] text-ink-800 hover:bg-gray-100';

  return (
    <>
      {/* Top banner */}
      <div className="bg-accent-800 px-4 py-2 text-center text-[0.8rem] text-accent-50 sm:text-sm">
        <p>
          Free shipping on orders over ₹15,000 | 12-month warranty on all devices
        </p>
      </div>

      <header
        className={`sticky top-0 z-50 w-full border-b bg-canvas/90 backdrop-blur-md transition-[border-color,box-shadow] duration-200 ${
          isScrolled ? 'border-gray-200 shadow-sm' : 'border-transparent'
        }`}
      >
        <div className="container">
          {/* Main header content */}
          <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
            <Link to="/" className="rounded-lg" aria-label="Dreamland Gadgets home">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
              <Link to="/" className="nav-link">Home</Link>

              <div className="group relative">
                <button
                  className="nav-link gap-1"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen === 'phones'}
                  onClick={() => handleDropdown('phones')}
                >
                  Phones
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>
                <div
                  className={`${menuPanel} left-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
                    isDropdownOpen === 'phones' ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
                  }`}
                >
                  <Link to="/products?category=iphone" className={menuItem}>iPhone</Link>
                  <Link to="/products?category=samsung" className={menuItem}>Samsung</Link>
                  <Link to="/products?category=google" className={menuItem}>Google Pixel</Link>
                  <Link to="/products?category=oneplus" className={menuItem}>OnePlus</Link>
                  <div className="my-1.5 border-t border-gray-200"></div>
                  <Link to="/products" className={`${menuItem} font-medium text-accent-700`}>View All Phones</Link>
                </div>
              </div>

              <Link to="/products?category=deals" className="nav-link">Deals</Link>
              <Link to="/products" className="nav-link">Shop</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="icon-button"
                aria-label="Search"
                aria-expanded={isSearchOpen}
              >
                <Search className="h-5 w-5" />
              </button>

              <Link to="/account?tab=wishlist" className="icon-button hidden sm:inline-flex" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Link>

              <Link to="/account?tab=notifications" className="icon-button hidden sm:inline-flex" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Link>

              <div className="group relative hidden sm:block">
                <Link to="/account" className="icon-button" aria-label="Account">
                  <User className="h-5 w-5" />
                </Link>
                <div className={`${menuPanel} invisible right-0 w-48 -translate-y-1 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100`}>
                  <Link to="/account" className={menuItem}>My Account</Link>
                  <Link to="/account?tab=orders" className={menuItem}>Orders</Link>
                  <Link to="/account?tab=wishlist" className={menuItem}>Wishlist</Link>
                  <div className="my-1.5 border-t border-gray-200"></div>
                  <button className={`${menuItem} w-full text-left text-red-700`}>
                    Sign Out
                  </button>
                </div>
              </div>

              <Link
                to="/cart"
                className="relative ml-1 inline-flex h-10 items-center gap-2 rounded-full bg-ink-900 px-3.5 text-sm font-medium text-white transition-colors hover:bg-ink-700"
                aria-label="Cart"
              >
                <ShoppingCart className="h-[1.1rem] w-[1.1rem]" />
                <span className="hidden sm:inline">Cart</span>
                {cartItemsCount > 0 && (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-300 px-1 text-xs font-semibold text-ink-900">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              <button
                className="icon-button lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
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
            <form className="relative animate-fade-in pb-4" role="search" onSubmit={handleSearchSubmit}>
              <input
                type="search"
                aria-label="Search for phones"
                placeholder="Search for phones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="field h-12 rounded-full pl-12"
                autoFocus
              />
              <Search className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            </form>
          )}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full max-h-[calc(100vh-100%)] overflow-y-auto border-t border-gray-200 bg-canvas shadow-lg lg:hidden">
            <nav className="container py-4" aria-label="Mobile">
              <Link
                to="/account"
                className="mb-4 flex items-center rounded-xl border border-gray-200 bg-white p-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-50">
                  <User className="h-5 w-5 text-accent-700" />
                </div>
                <div>
                  <span className="block font-medium text-ink-900">Account</span>
                  <span className="text-sm text-gray-600">Sign in or register</span>
                </div>
              </Link>

              <div className="space-y-0.5">
                <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                <div className="my-2 border-t border-gray-200"></div>
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
                <div className="my-2 border-t border-gray-200"></div>
                <Link to="/products?category=deals" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Deals
                </Link>
                <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Link>
              </div>

              <div className="my-4 border-t border-gray-200"></div>

              <div className="space-y-0.5">
                <Link to="/account?tab=orders" className="mobile-nav-link flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShoppingCart className="mr-3 h-5 w-5 text-gray-500" />
                  My Orders
                </Link>
                <Link to="/account?tab=wishlist" className="mobile-nav-link flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  <Heart className="mr-3 h-5 w-5 text-gray-500" />
                  Wishlist
                </Link>
                <Link to="/account?tab=notifications" className="mobile-nav-link flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  <Bell className="mr-3 h-5 w-5 text-gray-500" />
                  Notifications
                </Link>
              </div>

              <div className="my-4 border-t border-gray-200"></div>

              <button className="mobile-nav-link flex w-full items-center text-left text-red-700">
                <LogOut className="mr-3 h-5 w-5" />
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
