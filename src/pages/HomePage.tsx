import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import ProductSlider from '../components/products/ProductSlider';
import { featuredProducts, newArrivals } from '../data/products';
import BrandLogos from '../components/home/BrandLogos';
import TestimonialSlider from '../components/home/TestimonialSlider';
import DeviceArt from '../components/common/DeviceArt';
import GradeBadge from '../components/common/GradeBadge';
import { GRADES } from '../data/grades';
import TrustStrip from '../components/common/TrustStrip';
import { formatPrice } from '../utils/pricing';

const heroProduct = featuredProducts[0];

const inspection = ['Battery health 85% or more', 'Display and touch', 'Cameras, speakers, microphone', 'Buttons, ports, wireless'];

const reasons = [
  'Save up to 70% compared to buying new',
  'Reduce electronic waste and help the environment',
  'Get flagship features without the flagship price',
  'All devices thoroughly tested and certified',
];

const SectionHeading = ({ title, text, to, linkLabel }: { title: string; text: string; to?: string; linkLabel?: string }) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
    <div>
      <h2 className="section-title">{title}</h2>
      <p className="mt-2 max-w-xl text-gray-600">{text}</p>
    </div>
    {to && (
      <Link to={to} className="text-link inline-flex items-center gap-1.5">
        {linkLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    )}
  </div>
);

const HomePage = () => {
  return (
    <div className="flex flex-col gap-16 sm:gap-24">
      {/* Hero Section */}
      <section className="container pt-8 sm:pt-12 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <h1 className="font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.035em] text-ink-900 sm:text-display-xl lg:text-[4.5rem]">
              Premium Phones, Renewed for You
            </h1>
            <p className="mt-6 max-w-lg text-lg text-gray-600 sm:text-xl">
              Discover certified pre-owned smartphones that look and perform like new, backed by our 12-month warranty and 30-day money-back guarantee.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Now
              </Link>
              <Link to="/products?category=deals" className="btn btn-outline btn-lg">
                View Deals
              </Link>
            </div>
          </div>

          {/* Featured device with its inspection sheet */}
          <div className="settle relative">
            <div className="tile aspect-[4/3.5] rounded-3xl sm:aspect-[4/3.1] lg:aspect-[4/3.6]">
              <DeviceArt
                productId={heroProduct.id}
                view="pair"
                title={`${heroProduct.name}, front and back`}
                className="h-full w-full p-5 pb-24 sm:p-8 sm:pb-8 sm:pr-[42%] lg:pr-[38%]"
              />
            </div>

            <div className="relative mx-4 -mt-20 rounded-2xl border border-gray-200 bg-white p-5 shadow-lg sm:absolute sm:bottom-6 sm:right-6 sm:mx-0 sm:mt-0 sm:w-[17.5rem]">
              <GradeBadge condition={heroProduct.condition} />
              <p className="mt-3 font-display text-lg font-medium text-ink-900">
                {heroProduct.name}, {heroProduct.capacity}
              </p>
              <ul className="mt-3 space-y-2 border-t border-gray-200 pt-3 text-sm">
                {inspection.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-ink-700">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-200 pt-4">
                <span className="font-display text-xl font-medium text-ink-900">{formatPrice(heroProduct.price)}</span>
                <Link to={`/products/${heroProduct.id}`} className="text-link text-sm">
                  View phone
                </Link>
              </div>
            </div>
          </div>
        </div>

        <TrustStrip className="mt-10 sm:mt-14" />
      </section>

      {/* Featured Products */}
      <section className="container">
        <SectionHeading
          title="Featured Devices"
          text="Our most popular refurbished phones, thoroughly tested and certified to look and work like new."
          to="/products"
          linkLabel="View All Products"
        />
        <ProductSlider products={featuredProducts} />
      </section>

      {/* How grading works */}
      <section className="container">
        <SectionHeading
          title="Three grades, described plainly"
          text="Grades describe looks only. Every phone passes the same 30+ checks and carries the same 12-month warranty."
        />
        <ol className="grid gap-4 md:grid-cols-3">
          {(Object.keys(GRADES) as (keyof typeof GRADES)[]).map((condition) => {
            const grade = GRADES[condition];
            return (
              <li key={condition}>
                <Link
                  to={`/products?condition=${condition}`}
                  className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-ink-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl font-medium text-ink-900">{grade.letter}</span>
                    <span className="flex items-end gap-1" aria-hidden="true">
                      {[1, 2, 3].map((step) => (
                        <span
                          key={step}
                          className={`w-2 rounded-full ${step <= grade.level ? 'bg-accent-600' : 'bg-gray-200'}`}
                          style={{ height: `${10 + step * 8}px` }}
                        />
                      ))}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl">{condition}</h3>
                  <p className="mt-1 text-gray-600">{grade.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-700">
                    Shop {condition.toLowerCase()} phones
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Banner */}
      <section className="container">
        <div className="grid overflow-hidden rounded-3xl bg-accent-800 text-white lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="p-7 sm:p-12 lg:p-16">
            <h2 className="font-display text-display-sm font-medium text-white sm:text-display-lg">
              Why Choose Refurbished?
            </h2>
            <p className="mt-5 max-w-xl text-lg text-accent-100">
              Buying refurbished isn't just good for your wallet - it's good for the planet too. Each refurbished phone saves up to 80kg of carbon emissions.
            </p>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3 text-accent-50">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-300 text-accent-900">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
            <Link
              to="/products"
              className="btn btn-lg mt-10 bg-white text-accent-900 hover:bg-accent-50 focus-visible:outline-white"
            >
              Browse Our Selection
            </Link>
          </div>
          <div className="relative flex min-h-[15rem] items-end bg-accent-700 p-7 sm:p-12">
            <DeviceArt
              productId="6"
              view="front"
              className="absolute -right-10 top-8 h-[125%] w-auto sm:right-0 lg:-right-10"
            />
            <p className="relative">
              <span className="block text-accent-100">Save up to</span>
              <span className="block font-display text-[5.5rem] font-medium leading-none tracking-[-0.04em]">70%</span>
            </p>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container">
        <SectionHeading
          title="New Arrivals"
          text="Just added to our collection, these refurbished smartphones are ready to find a new home."
          to="/products"
          linkLabel="Shop all phones"
        />
        <ProductSlider products={newArrivals} />
      </section>

      {/* Brands */}
      <section className="container">
        <SectionHeading
          title="Brands We Carry"
          text="We offer premium refurbished devices from all major manufacturers."
        />
        <BrandLogos />
      </section>

      {/* Testimonials */}
      <section className="container">
        <SectionHeading
          title="What Our Customers Say"
          text="Thousands of satisfied customers have trusted us for their refurbished phone needs."
        />
        <TestimonialSlider />
      </section>

      {/* CTA */}
      <section className="container">
        <div className="grid gap-10 border-t border-gray-300 pt-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-display-md font-medium text-ink-900 sm:text-display-lg">
              Ready to Make a Smart Choice?
            </h2>
            <p className="mt-5 max-w-xl text-lg text-gray-600">
              Join thousands of satisfied customers who've discovered premium quality at unbeatable prices.
              Our certified refurbished phones offer flagship features without the flagship price tag.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Now
              </Link>
              <Link to="/products?category=deals" className="btn btn-outline btn-lg">
                View Special Deals
              </Link>
            </div>
          </div>

          {/* Benefits */}
          <dl className="grid grid-cols-3 gap-4 self-end">
            {[
              { value: '30+', label: 'Quality Checks' },
              { value: '12', label: 'Months Warranty' },
              { value: '40%', label: 'Average Savings' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse border-l border-gray-300 pl-4 sm:pl-6">
                <dt className="mt-1 text-sm text-gray-600 sm:text-base">{stat.label}</dt>
                <dd className="font-display text-display-md font-medium text-accent-700 sm:text-display-xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
