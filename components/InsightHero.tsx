'use client';

import { useState } from 'react';
import CountingNumber from './CountingNumber';

interface InsightHeroProps {
  onExplore: () => void;
}

export default function InsightHero({ onExplore }: InsightHeroProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      {/* Main Stat Card */}
      <div
        className="bg-white rounded-3xl p-10 shadow-2xl transition-all hover:shadow-3xl hover:scale-[1.02] cursor-pointer"
        onMouseEnter={() => setHoveredCard('average')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="text-sm text-gray-400 mb-4">San Francisco Coffee Shops</div>
        <div className="text-6xl font-bold text-black mb-3">
          $<CountingNumber end={18.5} decimals={2} />
        </div>
        <div className="text-lg text-gray-600">Average Order Value</div>
        {hoveredCard === 'average' && (
          <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500 animate-fade-in">
            Based on 127,000+ transactions this month
          </div>
        )}
      </div>

      {/* BUT Card - The Hook */}
      <div
        className="bg-black rounded-3xl p-10 shadow-2xl text-white relative overflow-hidden transition-all hover:shadow-3xl hover:scale-[1.02] cursor-pointer"
        onMouseEnter={() => setHoveredCard('peak')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="absolute top-6 right-6 text-5xl font-black opacity-10">BUT</div>
        <div className="relative">
          <div className="text-sm mb-4 font-medium text-gray-400">Morning Rush (7-9am)</div>
          <div className="text-6xl font-bold mb-3">
            $<CountingNumber end={24.2} decimals={2} />
          </div>
          <div className="text-lg text-gray-300">31% higher than average</div>
          {hoveredCard === 'peak' && (
            <div className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-400 animate-fade-in">
              Peak performance window most owners miss
            </div>
          )}
        </div>
      </div>

      {/* Insight Description Card */}
      <div className="md:col-span-2 bg-white rounded-3xl p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-4 right-4 text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          Live insight
        </div>
        <h2 className="text-3xl font-bold text-black mb-4">
          What else are you missing about your market?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Discover hidden patterns in local business data from 4M+ Square merchants.
          Most business owners never see insights like this.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={onExplore}
            className="group bg-black text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-900 transition-all hover:scale-[1.02] inline-flex items-center gap-2"
          >
            Explore This Insight
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <div className="text-sm text-gray-400">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
            1,847 business owners viewed today
          </div>
        </div>
      </div>
    </div>
  );
}
