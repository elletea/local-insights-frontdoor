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
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-center animate-fade-in">
        <div className="text-6xl mb-6">🎉</div>
        <h3 className="text-3xl font-bold text-slate-900 mb-4">
          Your report is being generated!
        </h3>
        <p className="text-lg text-slate-600 mb-8">
          We're analyzing data from thousands of businesses in your area.
          Check your email in the next 5 minutes for your personalized insights report.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
          <h4 className="font-bold text-slate-900 mb-4">While you wait, explore:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="#"
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all text-left"
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold text-slate-900">Square Dashboard Demo</div>
              <div className="text-sm text-slate-600">
                See how Square helps track your business in real-time
              </div>
            </a>
            <a
              href="#"
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all text-left"
            >
              <div className="text-2xl mb-2">💬</div>
              <div className="font-semibold text-slate-900">Talk to a Specialist</div>
              <div className="text-sm text-slate-600">
                Get personalized advice on growing your business
              </div>
            </a>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-500 mb-4">
            Want even deeper insights? Square sellers get access to:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              Real-time sales analytics
            </span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              Customer behavior tracking
            </span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              Inventory optimization
            </span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              Team performance metrics
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold text-slate-900 mb-3 text-center">
          Get Your Personalized Market Report
        </h3>
        <p className="text-slate-600 text-center mb-8">
          Tell us a bit about your business and we'll send you insights specific to your
          market in the next 5 minutes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-600 focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="businessType" className="block text-sm font-semibold text-slate-900 mb-2">
              What type of business? (Optional)
            </label>
            <select
              id="businessType"
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-600 focus:outline-none transition-colors"
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
            <label htmlFor="location" className="block text-sm font-semibold text-slate-900 mb-2">
              Location (Optional)
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-600 focus:outline-none transition-colors"
              placeholder="City or ZIP code"
            />
            <p className="mt-2 text-xs text-slate-500">
              We'll show you insights specific to businesses in your area
            </p>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            Send Me My Free Report
          </button>

          <p className="text-xs text-center text-slate-500">
            By submitting, you agree to receive insights and updates from Square.
            <br />
            Unsubscribe anytime. We respect your privacy.
          </p>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-center gap-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="text-green-600">✓</div>
              <span>No spam</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-green-600">✓</div>
              <span>Instant delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-green-600">✓</div>
              <span>100% free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
