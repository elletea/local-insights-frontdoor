'use client';

import { useState } from 'react';

interface EngagementFlowProps {
  onRequestInsights: () => void;
}

export default function EngagementFlow({ onRequestInsights }: EngagementFlowProps) {
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);

  const insights = [
    {
      id: 'location',
      icon: '📍',
      title: 'Location Intelligence',
      stat: '2.3x',
      statLabel: 'revenue difference',
    },
    {
      id: 'competition',
      icon: '🎯',
      title: 'Competitive Analysis',
      stat: '18%',
      statLabel: 'price gap',
    },
    {
      id: 'trends',
      icon: '📈',
      title: 'Growth Trends',
      stat: '47%',
      statLabel: 'YoY growth',
    },
    {
      id: 'customer',
      icon: '👥',
      title: 'Customer Behavior',
      stat: '34%',
      statLabel: 'weekend lift',
    },
  ];

  return (
    <div className="mb-6 animate-fade-in">
      <div className="bg-white rounded-3xl p-10 shadow-2xl mb-6">
        <h3 className="text-3xl font-bold text-black mb-4">
          What else do you want to know?
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          Square tracks billions of transactions. We can answer questions most business
          owners don't even know to ask.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((insight) => (
            <button
              key={insight.id}
              onClick={() => setSelectedInterest(insight.id)}
              className={`text-left p-6 rounded-2xl transition-all ${
                selectedInterest === insight.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="text-3xl mb-3">{insight.icon}</div>
              <h4 className={`text-xl font-bold mb-3 ${
                selectedInterest === insight.id ? 'text-white' : 'text-black'
              }`}>
                {insight.title}
              </h4>
              <div className="flex items-baseline gap-2">
                <div className={`text-3xl font-bold ${
                  selectedInterest === insight.id ? 'text-white' : 'text-black'
                }`}>
                  {insight.stat}
                </div>
                <div className={`text-sm ${
                  selectedInterest === insight.id ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {insight.statLabel}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="bg-white rounded-3xl p-10 shadow-2xl text-center">
        <h4 className="text-3xl font-bold text-black mb-4">
          Ready for your personalized report?
        </h4>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Get insights showing how your market compares, hidden opportunities in your
          area, and data-backed recommendations to grow revenue.
        </p>

        <button
          onClick={onRequestInsights}
          className="px-10 py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-900 transition-all hover:scale-[1.02]"
        >
          Get My Free Market Report
        </button>

        <p className="text-sm text-gray-400 mt-6">
          No credit card • Takes 30 seconds • Privacy-safe data
        </p>
      </div>
    </div>
  );
}
