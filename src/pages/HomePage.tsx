import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Truck, CreditCard, Star, ArrowRight } from 'lucide-react';
import ProductSlider from '../components/products/ProductSlider';
import { featuredProducts, newArrivals } from '../data/products';
import BrandLogos from '../components/home/BrandLogos';
import TestimonialSlider from '../components/home/TestimonialSlider';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Premium Phones,
                <span className="text-accent-600"> Renewed</span> for You
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-300">
                Discover certified pre-owned smartphones that look and perform like new, backed by our 12-month warranty and 30-day money-back guarantee.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link 
                  to="/products" 
                  className="btn bg-accent-600 hover:bg-accent-700 text-white px-8 py-3 text-lg font-medium rounded-full transition-all"
                >
                  Shop Now
                  <ChevronRight className="ml-2 h-5 w-5 inline-block" />
                </Link>
                <Link 
                  to="/products?category=deals" 
                  className="btn bg-white/10 hover:bg-white/20 text-white px-8 py-3 text-lg font-medium rounded-full backdrop-blur-sm transition-all"
                >
                  View Deals
                </Link>
              </div>
              
              {/* Trust Badges */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/10 rounded-full p-3 mb-3">
                    <Shield className="h-6 w-6 text-accent-600" />
                  </div>
                  <span className="text-white text-sm">12-Month Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/10 rounded-full p-3 mb-3">
                    <Truck className="h-6 w-6 text-accent-600" />
                  </div>
                  <span className="text-white text-sm">Free Shipping over ₹15,000</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/10 rounded-full p-3 mb-3">
                    <Star className="h-6 w-6 text-accent-600" />
                  </div>
                  <span className="text-white text-sm">30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/10 rounded-full p-3 mb-3">
                    <CreditCard className="h-6 w-6 text-accent-600" />
                  </div>
                  <span className="text-white text-sm">Secure Payment</span>
                </div>
              </div>
            </div>
            
            {/* Hero Images */}
            <div className="relative hidden lg:block">
              <div className="relative z-10 transform translate-x-12">
                <img 
                  src="https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                  alt="Featured Phone" 
                  className="rounded-lg shadow-2xl"
                />
              </div>
              <div className="absolute top-1/4 -left-8 z-0 w-3/4">
                <img 
                  src="https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                  alt="Secondary Phone" 
                  className="rounded-lg shadow-2xl opacity-75 blur-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
          <p className="text-sm mb-2">Scroll to explore</p>
          <div className="animate-bounce">
            <ArrowRight className="h-6 w-6 transform rotate-90" />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <Shield className="h-12 w-12 text-accent-600 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-medium text-lg">12-Month Warranty</h3>
                <p className="text-gray-600">Full coverage on all devices</p>
              </div>
            </div>
            
            <div className="flex items-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <Truck className="h-12 w-12 text-accent-600 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-medium text-lg">Free Shipping</h3>
                <p className="text-gray-600">On orders over ₹15,000</p>
              </div>
            </div>
            
            <div className="flex items-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <CreditCard className="h-12 w-12 text-accent-600 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-medium text-lg">Secure Payment</h3>
                <p className="text-gray-600">100% secure checkout</p>
              </div>
            </div>
            
            <div className="flex items-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <Star className="h-12 w-12 text-accent-600 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-medium text-lg">Quality Assured</h3>
                <p className="text-gray-600">30-day satisfaction guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Devices</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular refurbished phones, thoroughly tested and certified to look and work like new.
            </p>
          </div>
          
          <ProductSlider products={featuredProducts} />
          
          <div className="text-center mt-10">
            <Link to="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Banner */}
      <section className="py-20 bg-ink-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-12 md:mb-0 md:mr-12 max-w-2xl">
              <h2 className="text-4xl font-bold mb-6 text-white">Why Choose Refurbished?</h2>
              <p className="text-xl mb-8 text-gray-300">
                Buying refurbished isn't just good for your wallet - it's good for the planet too. Each refurbished phone saves up to 80kg of carbon emissions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-accent-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-1">1</div>
                  <p className="ml-4 text-gray-300">Save up to 70% compared to buying new</p>
                </div>
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-accent-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-1">2</div>
                  <p className="ml-4 text-gray-300">Reduce electronic waste and help the environment</p>
                </div>
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-accent-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-1">3</div>
                  <p className="ml-4 text-gray-300">Get flagship features without the flagship price</p>
                </div>
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-accent-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-1">4</div>
                  <p className="ml-4 text-gray-300">All devices thoroughly tested and certified</p>
                </div>
              </div>
              <Link to="/products" className="btn bg-accent-600 hover:bg-accent-700 text-white px-8 py-3 text-lg font-medium rounded-full transition-all">
                Browse Our Selection
                <ChevronRight className="ml-2 h-5 w-5 inline-block" />
              </Link>
            </div>
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                  alt="Refurbished Phone" 
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent-600 text-white rounded-lg p-4 shadow-lg">
                  <p className="font-bold text-xl">Save up to</p>
                  <p className="text-4xl font-bold">70%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">New Arrivals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Just added to our collection, these refurbished smartphones are ready to find a new home.
            </p>
          </div>
          
          <ProductSlider products={newArrivals} />
        </div>
      </section>
      
      {/* Brands */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Brands We Carry</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer premium refurbished devices from all major manufacturers.
            </p>
          </div>
          
          <BrandLogos />
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Thousands of satisfied customers have trusted us for their refurbished phone needs.
            </p>
          </div>
          
          <TestimonialSlider />
        </div>
      </section>
      
      {/* CTA */}
      <section className="relative py-24">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Make a
              <span className="text-accent-600"> Smart Choice</span>?
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Join thousands of satisfied customers who've discovered premium quality at unbeatable prices. 
              Our certified refurbished phones offer flagship features without the flagship price tag.
            </p>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-transform">
                <div className="text-accent-600 text-2xl font-bold mb-2">30+</div>
                <p className="text-white">Quality Checks</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-transform">
                <div className="text-accent-600 text-2xl font-bold mb-2">12</div>
                <p className="text-white">Months Warranty</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-transform">
                <div className="text-accent-600 text-2xl font-bold mb-2">40%</div>
                <p className="text-white">Average Savings</p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="btn bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 text-lg font-medium rounded-full transition-all hover:shadow-lg"
              >
                Shop Now
                <ChevronRight className="ml-2 h-5 w-5 inline-block" />
              </Link>
              <Link 
                to="/products?category=deals" 
                className="btn bg-white/20 hover:bg-white/30 text-white px-8 py-4 text-lg font-medium rounded-full backdrop-blur-sm transition-all hover:shadow-lg"
              >
                View Special Deals
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <div className="w-full h-16 bg-gradient-to-b from-transparent to-white/10 backdrop-blur-sm"></div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;