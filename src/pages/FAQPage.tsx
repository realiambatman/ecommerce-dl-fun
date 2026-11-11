import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "General Questions",
      faqs: [
        {
          question: "What does 'refurbished' mean?",
          answer: "Refurbished phones are pre-owned devices that have been professionally restored to like-new condition. Our certified technicians thoroughly test, clean, and repair each device to ensure it meets our strict quality standards."
        },
        {
          question: "Are refurbished phones reliable?",
          answer: "Yes! Our refurbished phones undergo a rigorous 30+ point inspection process. Each device is tested for functionality, battery health, and cosmetic condition. We only sell devices that meet our high-quality standards."
        },
        {
          question: "What's the difference between refurbished and used phones?",
          answer: "Unlike used phones sold by individuals, our refurbished phones are professionally restored by certified technicians. They're thoroughly tested, cleaned, and come with a warranty and return policy."
        },
        {
          question: "Do refurbished phones come with accessories?",
          answer: "Yes, all our refurbished phones come with essential accessories including a charger, cable, and SIM removal tool. Original packaging may vary, but we ensure you have everything needed to use your device."
        }
      ]
    },
    {
      title: "Ordering & Payment",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely through encrypted checkout."
        },
        {
          question: "Can I cancel my order?",
          answer: "Yes, you can cancel your order within 2 hours of placing it, as long as it hasn't been shipped. Contact our customer service team immediately if you need to cancel."
        },
        {
          question: "Do you offer financing options?",
          answer: "Currently, we don't offer direct financing, but you can use services like PayPal Pay in 4 or your credit card's installment options at checkout."
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely. We use industry-standard SSL encryption and PCI DSS compliance to protect your payment information. We never store your full credit card details on our servers."
        }
      ]
    },
    {
      title: "Shipping & Delivery",
      faqs: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 5-7 business days and is free on orders over ₹15,000. Express shipping (2-3 days) costs ₹299, and priority shipping (1-2 days) costs ₹599."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we only ship within the United States. We're working on expanding to international markets in the future."
        },
        {
          question: "Can I track my order?",
          answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can track your package on our website or directly on the carrier's website."
        },
        {
          question: "What if my package is lost or stolen?",
          answer: "If your package is marked as delivered but you didn't receive it, contact us within 48 hours. We'll work with the carrier to investigate and provide a resolution."
        }
      ]
    },
    {
      title: "Device Condition & Quality",
      faqs: [
        {
          question: "What do the condition grades mean?",
          answer: "Excellent: Like new with minimal signs of use (95%+ original condition). Good: Minor cosmetic imperfections only visible upon close inspection. Fair: Noticeable scratches/marks but functions perfectly."
        },
        {
          question: "What's the battery health of refurbished phones?",
          answer: "All our refurbished phones have a minimum battery health of 85%. Most devices have 90%+ battery health. If battery capacity falls below 80% within the warranty period, we'll replace it free of charge."
        },
        {
          question: "Are the phones unlocked?",
          answer: "Yes, all our refurbished phones are factory unlocked and work with all major carriers (Verizon, AT&T, T-Mobile, etc.). You can use your existing SIM card or switch carriers anytime."
        },
        {
          question: "Do you test all phone functions?",
          answer: "Absolutely. Every device undergoes comprehensive testing including camera, speakers, microphone, touchscreen, buttons, charging port, WiFi, Bluetooth, and cellular connectivity."
        }
      ]
    },
    {
      title: "Warranty & Returns",
      faqs: [
        {
          question: "What's covered under the warranty?",
          answer: "Our 12-month warranty covers manufacturing defects, hardware failures, battery issues (if capacity drops below 80%), display problems, camera malfunctions, and speaker/microphone defects."
        },
        {
          question: "What's not covered under warranty?",
          answer: "Physical damage from drops, water damage, software issues, normal wear and tear, damage from unauthorized repairs, and lost or stolen devices are not covered."
        },
        {
          question: "How do I return a device?",
          answer: "Contact our customer service within 30 days of delivery. We'll provide a prepaid return label. The device must be in original condition with all accessories included."
        },
        {
          question: "How long do refunds take?",
          answer: "Once we receive your returned device, refunds are processed within 5-7 business days. Credit card refunds appear in 3-5 business days, while PayPal refunds are usually instant."
        }
      ]
    },
    {
      title: "Technical Support",
      faqs: [
        {
          question: "What if my phone won't turn on?",
          answer: "First, try charging it for at least 30 minutes with the included charger. If it still won't turn on, contact our technical support team for troubleshooting assistance."
        },
        {
          question: "Can you help with software setup?",
          answer: "While we don't provide extensive software support, our team can help with basic setup questions and point you to helpful resources for your specific device."
        },
        {
          question: "What if I need a replacement charger?",
          answer: "If your included charger stops working within the warranty period, we'll replace it free of charge. You can also purchase additional chargers from our accessories section."
        },
        {
          question: "Do you provide software updates?",
          answer: "Software updates come directly from the device manufacturer (Apple, Samsung, etc.). We ensure all devices are running the latest available software at the time of sale."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our refurbished phones, shipping, warranty, and more.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-accent-600"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="max-w-4xl mx-auto">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No FAQs found matching your search.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="btn btn-primary"
            >
              Clear Search
            </button>
          </div>
        ) : (
          filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={faqIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-lg pr-4">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Contact Section */}
      <div className="max-w-2xl mx-auto mt-16 text-center">
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@dreamlandgadgets.com" className="btn btn-primary">
              Email Support
            </a>
            <a href="tel:+15551234567" className="btn btn-outline">
              Call Us: (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;