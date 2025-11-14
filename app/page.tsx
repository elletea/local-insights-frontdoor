'use client';

import { useState } from 'react';
import InsightHero from '@/components/InsightHero';
import InsightChart from '@/components/InsightChart';
import EngagementFlow from '@/components/EngagementFlow';
import LeadCapture from '@/components/LeadCapture';

export default function Home() {
  const [showDeeper, setShowDeeper] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg" />
            <span className="text-xl font-bold text-slate-900">Square Insights</span>
          </div>
          <div className="text-sm text-slate-600">
            Powered by 4M+ businesses
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero "BUT" Hook */}
        <InsightHero onExplore={() => setShowDeeper(true)} />

        {/* Main Insight Chart */}
        <InsightChart />

        {/* Progressive Engagement */}
        {showDeeper && (
          <EngagementFlow
            onRequestInsights={() => setEmailCaptured(true)}
          />
        )}

        {/* Lead Capture */}
        {emailCaptured && <LeadCapture />}

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">4M+</div>
              <div className="text-sm text-slate-600">Active Businesses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$200B+</div>
              <div className="text-sm text-slate-600">Annual Transactions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">195</div>
              <div className="text-sm text-slate-600">Countries Worldwide</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 py-12 bg-slate-900 text-slate-300">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Data insights from aggregated Square transaction data. Individual business data remains private.
          </p>
          <p className="text-xs mt-4 text-slate-500">
            © 2024 Square, Inc. | Privacy Policy | Terms of Service
          </p>
        </div>
      </footer>
    </div>
  );
}
