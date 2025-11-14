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
    <div className="min-h-screen bg-[#2C2E3A]">
      {/* Header */}
      <header className="py-6">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center">
              <div className="w-6 h-6 bg-[#2C2E3A] rounded-lg" />
            </div>
            <span className="text-2xl font-bold text-white">Square Insights</span>
          </div>
          <div className="text-sm text-gray-400">
            4M+ businesses
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
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
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur rounded-3xl p-8 text-center">
            <div className="text-4xl font-bold text-white mb-2">4M+</div>
            <div className="text-sm text-gray-400">Active Businesses</div>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-3xl p-8 text-center">
            <div className="text-4xl font-bold text-white mb-2">$200B+</div>
            <div className="text-sm text-gray-400">Annual Transactions</div>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-3xl p-8 text-center">
            <div className="text-4xl font-bold text-white mb-2">195</div>
            <div className="text-sm text-gray-400">Countries Worldwide</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center">
        <p className="text-sm text-gray-500">
          Data insights from aggregated Square transaction data. Individual business data remains private.
        </p>
        <p className="text-xs mt-3 text-gray-600">
          © 2024 Square, Inc. | Privacy Policy | Terms of Service
        </p>
      </footer>
    </div>
  );
}
