import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';

const SITE_NAME = 'Dreamland Gadgets';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Premium Refurbished Phones',
  '/products': 'Shop Refurbished Phones',
  '/cart': 'Your Cart',
  '/checkout': 'Checkout',
  '/account': 'My Account',
  '/contact': 'Contact Us',
  '/track-order': 'Track Your Order',
  '/shipping': 'Shipping Information',
  '/returns': 'Returns & Warranty',
  '/faq': 'FAQ',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Service',
  '/sitemap': 'Sitemap',
};

const Layout = () => {
  const { pathname } = useLocation();

  // Keep the document title in sync with the current route.
  // Product detail pages set their own title once the product is known.
  useEffect(() => {
    if (pathname.startsWith('/products/')) return;
    const pageTitle = PAGE_TITLES[pathname.replace(/\/+$/, '') || '/'] ?? 'Page Not Found';
    document.title = `${SITE_NAME} | ${pageTitle}`;
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
