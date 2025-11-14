'use client';

interface InsightHeroProps {
  onExplore: () => void;
}

export default function InsightHero({ onExplore }: InsightHeroProps) {
  return (
    <section className="text-center mb-12">
      <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
        Live Business Intelligence from 4M+ Square Merchants
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
        Coffee shops in San Francisco
        <br />
        average{' '}
        <span className="text-blue-600">$18.50</span>
        {' '}per order
      </h1>

      <div className="relative inline-block">
        <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 opacity-30 blur-xl" />
        <h2 className="relative text-3xl md:text-5xl font-bold text-slate-900 mb-8">
          <span className="text-orange-600">BUT</span> between 7-9am,
          <br />
          that jumps to{' '}
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            $24.20
          </span>
        </h2>
      </div>

      <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
        Discover the hidden patterns in local business data that most owners miss.
        <br />
        <span className="font-semibold text-slate-900">
          What else could you be missing about your market?
        </span>
      </p>

      <button
        onClick={onExplore}
        className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        Explore This Insight
        <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
          →
        </span>
      </button>

      <p className="mt-4 text-sm text-slate-500">
        No credit card required • See insights in 30 seconds
      </p>
    </section>
  );
}
