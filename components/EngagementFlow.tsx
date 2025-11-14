'use client';

import { useState } from 'react';

interface EngagementFlowProps {
  onRequestInsights: () => void;
}

export default function EngagementFlow({ onRequestInsights }: EngagementFlowProps) {
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const insightScore = (selectedInterests.size / 4) * 100;

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
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Your Insight Discovery Score</span>
            <span className="font-bold text-black">{Math.round(insightScore)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-500"
              style={{ width: `${insightScore}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {selectedInterests.size === 0 && 'Select insights that interest you'}
            {selectedInterests.size > 0 && selectedInterests.size < 4 && `${4 - selectedInterests.size} more to unlock your full report`}
            {selectedInterests.size === 4 && '✓ All insights unlocked! Ready for your personalized report'}
          </p>
        </div>

        <h3 className="text-3xl font-bold text-black mb-4">
          What else do you want to know?
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          Select the insights that matter most to you. Each selection helps us personalize
          your report.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((insight, index) => {
            const isSelected = selectedInterests.has(insight.id);
            return (
              <button
                key={insight.id}
                onClick={() => toggleInterest(insight.id)}
                className={`text-left p-6 rounded-2xl transition-all relative ${
                  isSelected
                    ? 'bg-black text-white scale-[1.02]'
                    : 'bg-gray-100 hover:bg-gray-200 hover:scale-[1.01]'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center animate-fade-in">
                    <span className="text-black text-sm">✓</span>
                  </div>
                )}
                <div className="text-3xl mb-3">{insight.icon}</div>
                <h4 className={`text-xl font-bold mb-3 ${
                  isSelected ? 'text-white' : 'text-black'
                }`}>
                  {insight.title}
                </h4>
                <div className="flex items-baseline gap-2">
                  <div className={`text-3xl font-bold ${
                    isSelected ? 'text-white' : 'text-black'
                  }`}>
                    {insight.stat}
                  </div>
                  <div className={`text-sm ${
                    isSelected ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {insight.statLabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA Card */}
      <div className="bg-white rounded-3xl p-10 shadow-2xl text-center">
        <div className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm mb-4">
          {selectedInterests.size > 0 ? `${selectedInterests.size} insights selected` : 'Personalized for you'}
        </div>
        <h4 className="text-3xl font-bold text-black mb-4">
          Ready for your personalized report?
        </h4>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Get insights showing how your market compares, hidden opportunities in your
          area, and data-backed recommendations to grow revenue.
        </p>

        <button
          onClick={onRequestInsights}
          className={`px-10 py-5 bg-black text-white rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] ${
            selectedInterests.size === 4 ? 'animate-pulse' : ''
          }`}
        >
          {selectedInterests.size === 4 ? '🎉 Get Your Complete Report' : 'Get My Free Market Report'}
        </button>

        <p className="text-sm text-gray-400 mt-6 flex items-center justify-center gap-4 flex-wrap">
          <span>✓ No credit card</span>
          <span>✓ Instant access</span>
          <span>✓ Privacy-safe data</span>
        </p>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-2">Trusted by business owners like you</p>
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-sm text-gray-500 ml-2">+12,847 others</span>
          </div>
        </div>
      </div>
    </div>
  );
}
