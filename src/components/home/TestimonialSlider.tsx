import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Tech Enthusiast',
    rating: 5,
    text: 'I was skeptical about buying a refurbished phone, but my iPhone 13 Pro from Dreamland Gadgets looks brand new! The battery life is excellent, and it came with a great warranty. Couldn\'t be happier with my purchase.',
  },
  {
    id: 2,
    name: 'Sarah Miller',
    role: 'Digital Marketer',
    rating: 5,
    text: 'This is the third phone I\'ve bought from Dreamland Gadgets. Their quality is consistently excellent, shipping is fast, and customer service is top-notch. I recommend them to all my friends!',
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'College Student',
    rating: 4,
    text: 'As a student on a budget, I was thrilled to find a Samsung Galaxy S22 in excellent condition for almost half the retail price. The phone works perfectly and looks nearly new. Great value!',
  },
];

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('');

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonials[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const arrow =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-ink-900 transition-colors hover:border-ink-900';

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 lg:p-14">
      <figure className="min-h-[15rem] sm:min-h-[12rem]" aria-live="polite">
        <div className="mb-5 flex gap-0.5" role="img" aria-label={`${current.rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < current.rating ? 'fill-accent-600 text-accent-600' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <blockquote
          key={current.id}
          className="animate-fade-in max-w-3xl font-display text-xl leading-snug text-ink-900 sm:text-2xl lg:text-[1.75rem] lg:leading-[1.3]"
        >
          {current.text}
        </blockquote>
      </figure>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-gray-200 pt-6">
        <figcaption className="flex items-center gap-3">
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-50 font-display text-sm font-semibold text-accent-800"
            aria-hidden="true"
          >
            {initials(current.name)}
          </span>
          <span>
            <span className="block font-medium text-ink-900">{current.name}</span>
            <span className="block text-sm text-gray-500">{current.role}</span>
          </span>
        </figcaption>

        <div className="flex items-center gap-4">
          {/* Dots */}
          <div className="flex items-center gap-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="inline-flex h-6 items-center px-1"
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={currentIndex === index}
              >
                <span
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === index ? 'w-6 bg-accent-600' : 'w-1.5 bg-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={goToPrevious} className={arrow} aria-label="Previous testimonial">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={goToNext} className={arrow} aria-label="Next testimonial">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
