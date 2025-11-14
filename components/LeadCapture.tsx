'use client';

import { useState } from 'react';

export default function LeadCapture() {
  const [formData, setFormData] = useState({
    email: '',
    businessType: '',
    location: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to your backend
    console.log('Lead captured:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-10 mb-6 text-center animate-fade-in">
        <div className="text-6xl mb-6">🎉</div>
        <h3 className="text-3xl font-bold text-black mb-4">
          Report is on its way!
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          Check your email in the next 5 minutes for personalized insights about your market.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <a
            href="#"
            className="p-6 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all text-left"
          >
            <div className="text-3xl mb-3">📊</div>
            <div className="font-bold text-black mb-2">Square Dashboard</div>
            <div className="text-sm text-gray-600">
              Track your business in real-time
            </div>
          </a>
          <a
            href="#"
            className="p-6 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all text-left"
          >
            <div className="text-3xl mb-3">💬</div>
            <div className="font-bold text-black mb-2">Talk to a Specialist</div>
            <div className="text-sm text-gray-600">
              Get personalized growth advice
            </div>
          </a>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Square sellers get access to:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
              Real-time analytics
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
              Customer tracking
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
              Inventory optimization
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 mb-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold text-black mb-3 text-center">
          Get Your Market Report
        </h3>
        <p className="text-gray-600 text-center mb-8">
          We'll send insights specific to your market in the next 5 minutes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-black focus:outline-none transition-colors text-black"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="businessType" className="block text-sm font-semibold text-black mb-2">
              Business Type (Optional)
            </label>
            <select
              id="businessType"
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-black focus:outline-none transition-colors text-black"
            >
              <option value="">Select a category...</option>
              <option value="coffee">Coffee Shop / Cafe</option>
              <option value="restaurant">Restaurant</option>
              <option value="retail">Retail Store</option>
              <option value="salon">Salon / Spa</option>
              <option value="fitness">Fitness / Wellness</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-black mb-2">
              Location (Optional)
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-black focus:outline-none transition-colors text-black"
              placeholder="City or ZIP code"
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-900 transition-all hover:scale-[1.02]"
          >
            Send My Free Report
          </button>

          <p className="text-xs text-center text-gray-400">
            By submitting, you agree to receive insights from Square. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
}
