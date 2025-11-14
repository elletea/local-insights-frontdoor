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
      description: 'Which neighborhoods drive the highest customer spend?',
      stat: '2.3x',
      statLabel: 'revenue difference between top & bottom locations',
    },
    {
      id: 'competition',
      icon: '🎯',
      title: 'Competitive Analysis',
      description: 'How does your pricing compare to similar businesses nearby?',
      stat: '18%',
      statLabel: 'average price gap between competitors in same area',
    },
    {
      id: 'trends',
      icon: '📈',
      title: 'Growth Trends',
      description: 'Which business types are growing fastest in your market?',
      stat: '47%',
      statLabel: 'YoY growth for top-performing coffee shop category',
    },
    {
      id: 'customer',
      icon: '👥',
      title: 'Customer Behavior',
      description: 'When do customers spend the most across the week?',
      stat: '34%',
      statLabel: 'higher weekend average order values',
    },
  ];

  return (
    <div className="mb-12 animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-slate-900 mb-3">
          What else do you want to know?
        </h3>
        <p className="text-lg text-slate-600">
          Square tracks billions of transactions. We can answer questions most business
          owners don't even know to ask.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {insights.map((insight) => (
          <button
            key={insight.id}
            onClick={() => setSelectedInterest(insight.id)}
            className={`text-left p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
              selectedInterest === insight.id
                ? 'border-blue-600 bg-blue-50 shadow-lg'
                : 'border-slate-200 bg-white hover:border-blue-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{insight.icon}</div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  {insight.title}
                </h4>
                <p className="text-slate-600 mb-4">{insight.description}</p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {insight.stat}
                  </div>
                  <div className="text-xs text-slate-600">{insight.statLabel}</div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
        <h4 className="text-3xl font-bold mb-4">
          Ready to see insights for your business?
        </h4>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Get a personalized report showing how your market compares to others, hidden
          opportunities in your area, and data-backed recommendations to grow revenue.
        </p>

        <button
          onClick={onRequestInsights}
          className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 mb-4"
        >
          Get My Free Market Report
        </button>

        <p className="text-sm text-blue-200">
          ✓ No credit card required ✓ Takes 30 seconds ✓ 100% privacy-safe data
        </p>

        <div className="mt-8 pt-8 border-t border-blue-800">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-sm text-blue-100">
                Instant insights from real transaction data
              </div>
            </div>
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <div className="text-sm text-blue-100">
                Privacy-safe aggregated data only
              </div>
            </div>
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-sm text-blue-100">
                Actionable recommendations you can use today
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
