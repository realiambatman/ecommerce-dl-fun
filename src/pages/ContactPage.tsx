import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo only: there is no backend, so the message is not sent anywhere
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions about our refurbished phones? Need help with your order? 
          We're here to help! Get in touch with our friendly customer support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <div className="bg-yellow-500 rounded-lg p-3 mr-4">
                <Phone className="h-6 w-6 text-navy-900" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500">Mon - Fri: 9:00 AM - 6:00 PM EST</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-yellow-500 rounded-lg p-3 mr-4">
                <Mail className="h-6 w-6 text-navy-900" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Email</h3>
                <p className="text-gray-600">support@dreamlandgadgets.com</p>
                <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-yellow-500 rounded-lg p-3 mr-4">
                <MapPin className="h-6 w-6 text-navy-900" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Address</h3>
                <p className="text-gray-600">123 Tech Street<br />Digital City, 12345<br />United States</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-yellow-500 rounded-lg p-3 mr-4">
                <Clock className="h-6 w-6 text-navy-900" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday: 10:00 AM - 4:00 PM EST<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">What's your return policy?</h4>
                <p className="text-sm text-gray-600">30-day hassle-free returns on all purchases.</p>
              </div>
              <div>
                <h4 className="font-medium">Do you offer international shipping?</h4>
                <p className="text-sm text-gray-600">Currently, we ship within the United States only.</p>
              </div>
              <div>
                <h4 className="font-medium">How long is the warranty?</h4>
                <p className="text-sm text-gray-600">All devices come with a 12-month warranty.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="technical">Technical Support</option>
                  <option value="warranty">Warranty Claim</option>
                  <option value="return">Return Request</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary py-3"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;