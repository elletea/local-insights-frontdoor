'use client';

interface InsightHeroProps {
  onExplore: () => void;
}

export default function InsightHero({ onExplore }: InsightHeroProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      {/* Main Stat Card */}
      <div className="bg-white rounded-3xl p-10 shadow-2xl">
        <div className="text-sm text-gray-400 mb-4">San Francisco Coffee Shops</div>
        <div className="text-6xl font-bold text-black mb-3">$18.50</div>
        <div className="text-lg text-gray-600">Average Order Value</div>
      </div>

      {/* BUT Card - The Hook */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-10 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-6 right-6 text-5xl font-black opacity-20">BUT</div>
        <div className="relative">
          <div className="text-sm mb-4 font-medium">Morning Rush (7-9am)</div>
          <div className="text-6xl font-bold mb-3">$24.20</div>
          <div className="text-lg opacity-90">31% higher than average</div>
        </div>
      </div>

      {/* Insight Description Card */}
      <div className="md:col-span-2 bg-white rounded-3xl p-10 shadow-2xl">
        <h2 className="text-3xl font-bold text-black mb-4">
          What else are you missing about your market?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Discover hidden patterns in local business data from 4M+ Square merchants.
          Most business owners never see insights like this.
        </p>
        <button
          onClick={onExplore}
          className="group bg-black text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-900 transition-all hover:scale-[1.02] inline-flex items-center gap-2"
        >
          Explore This Insight
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
}
