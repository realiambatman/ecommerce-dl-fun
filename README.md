# Dreamland Gadgets Storefront

A front-end-only storefront design for a refurbished phone shop, built with React, TypeScript, Vite and Tailwind CSS. It is a UI prototype: every page of a typical shop is laid out and navigable, the catalogue comes from a mock data file, and the cart works in the browser, but there is no backend, authentication, payment gateway or order storage. It is a standalone design exercise and is not connected to any other project or service.

## What works and what is static

**Functional (client-side only)**

- Routing between all pages with React Router, including a 404 page and a "product not found" state
- Product listing with filters for category, brand, condition and price range; filters are stored in the URL query string, so they can be linked to and survive a refresh
- Header search box, which filters the product listing by name, brand, category or capacity
- Product detail page with image gallery, quantity picker, tabs and related products
- Cart: add, remove and change quantity; item count badge in the header; contents persisted in `localStorage`
- Promo code `WELCOME10` (10% off), applied in the cart and carried into checkout for the current session
- Order totals: free shipping from ₹15,000, otherwise a flat fee; 7% tax added at checkout
- Checkout: three steps (shipping, payment, review) with required-field validation; "Place Order" empties the cart and shows a confirmation with a randomly generated order number
- Order tracking form, which returns a canned result for the demo order number `DG12345` and "not found" for anything else
- Account page tabs, selectable via `?tab=` (for example `/account?tab=orders`)
- Per-page document titles

**Static or placeholder**

- No real orders or payments. Card fields are not validated, stored or sent anywhere; PayPal and Apple Pay are labels only
- No sign-in. The account page shows a hard-coded sample profile and order history; the wishlist, payment methods, notifications and settings tabs are "under construction" placeholders; "Sign Out" does nothing
- Wishlist buttons, "Write a Review", "Load More Reviews", "View Details" and the "save this address" checkbox are not wired up
- Product reviews, testimonials and ratings are hard-coded sample content
- The contact form and newsletter signup only show a confirmation; nothing is sent
- Social media links in the footer are `#` placeholders
- Shipping, returns, FAQ, privacy and terms pages are sample copy for a fictional business, as are the address, phone number and email shown on the site. Prices are in INR while some of this copy still refers to US-only shipping

## Tech stack

- React 18 and TypeScript
- Vite 5 (dev server and build)
- Tailwind CSS 3 with PostCSS and Autoprefixer
- React Router 6
- lucide-react icons
- ESLint 9 with typescript-eslint

## Prerequisites

- Node.js 18 or newer
- npm

## Setup

```bash
npm install
npm run dev
```

The dev server prints its local URL (by default http://localhost:5173).

To create and check a production build:

```bash
npm run build
npm run preview
```

The app uses `BrowserRouter`, so any static host needs to serve `index.html` for unknown paths for deep links such as `/products/3` to work.

## Environment variables

None. The app reads no environment variables and makes no API calls.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check with `tsc -b`, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Type-check only |
| `npm run lint` | Run ESLint |

## Project structure

```
index.html              HTML entry point
public/                 Favicon and robots.txt
src/
  main.tsx              React entry point
  App.tsx               Route table
  index.css             Tailwind layers and shared component classes
  components/
    common/             ScrollToTop
    home/               Brand grid, testimonial slider
    layout/             Header, Footer, Layout (sets page titles)
    products/           ProductCard, ProductSlider
  context/              Cart provider, context and useCart hook
  data/products.ts      Mock product catalogue and lookup helpers
  pages/                One component per route
  types/product.ts      Product type
  utils/pricing.ts      Price formatting, shipping, tax and promo rules
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/products` | Product listing (`?category=`, `?brand=`, `?condition=`, `?priceRange=`, `?search=`) |
| `/products/:id` | Product detail |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/account` | Account (`?tab=`) |
| `/track-order` | Order tracking demo |
| `/contact`, `/faq`, `/shipping`, `/returns` | Customer service pages |
| `/privacy`, `/terms`, `/sitemap` | Legal pages and sitemap |

## Known limitations

- Product, testimonial and payment-logo images are hot-linked from Pexels and Wikimedia Commons, so they need an internet connection and depend on those URLs staying available
- The catalogue has ten products in `src/data/products.ts`; some filter options (for example the Xiaomi and Huawei brands) have no matching products
- The promo code is kept in memory only and is lost on refresh; the cart itself persists
- The Inter font named in the Tailwind config is not bundled or loaded, so the system sans-serif font is used unless Inter is installed
- There are no automated tests
- `npm audit` still reports issues that can only be cleared with major-version upgrades (Vite, React Router, typescript-eslint); most affect development tooling only
