import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Tech Enthusiast',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    rating: 5,
    text: 'I was skeptical about buying a refurbished phone, but my iPhone 13 Pro from Dreamland Gadgets looks brand new! The battery life is excellent, and it came with a great warranty. Couldn\'t be happier with my purchase.',
  },
  {
    id: 2,
    name: 'Sarah Miller',
    role: 'Digital Marketer',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    rating: 5,
    text: 'This is the third phone I\'ve bought from Dreamland Gadgets. Their quality is consistently excellent, shipping is fast, and customer service is top-notch. I recommend them to all my friends!',
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'College Student',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    rating: 4,
    text: 'As a student on a budget, I was thrilled to find a Samsung Galaxy S22 in excellent condition for almost half the retail price. The phone works perfectly and looks nearly new. Great value!',
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstTestimonial = currentIndex === 0;
    const newIndex = isFirstTestimonial ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastTestimonial = currentIndex === testimonials.length - 1;
    const newIndex = isLastTestimonial ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="p-8 bg-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
            <img 
              src={testimonials[currentIndex].image} 
              alt={testimonials[currentIndex].name} 
              className="w-24 h-24 rounded-full object-cover border-4 border-accent-600"
            />
          </div>
          <div className="md:w-2/3 md:pl-8">
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-5 w-5 ${i < testimonials[currentIndex].rating ? 'text-accent-600 fill-accent-600' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-gray-700 italic mb-4">{testimonials[currentIndex].text}</p>
            <div>
              <h4 className="font-bold text-ink-900">{testimonials[currentIndex].name}</h4>
              <p className="text-gray-600">{testimonials[currentIndex].role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0 -ml-4">
        <button 
          onClick={goToPrevious}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6 text-ink-900" />
        </button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-0 -mr-4">
        <button 
          onClick={goToNext}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6 text-ink-900" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`h-3 w-3 rounded-full transition-all ${currentIndex === index ? 'bg-accent-600 w-6' : 'bg-gray-300'}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;