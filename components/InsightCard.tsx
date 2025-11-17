'use client';

import { useState, useEffect } from 'react';

const businessTypes = ['coffee shops', 'retailers', 'salons', 'bakeries'];

// Different images for each business type
const businessImages = [
  '/coffee-machine.png', // coffee shops
  '/plants.jpg', // retailers
  '/coffee-machine.png', // salons - placeholder for now
  '/coffee-machine.png', // bakeries - placeholder for now
];

// Different sparkline data for each business type
const sparklineData = [
  [15, 22, 18, 30, 42, 38, 45, 40, 28, 20, 25, 18, 22, 28, 35, 30], // coffee shops - morning peak
  [20, 25, 30, 28, 35, 42, 38, 45, 40, 35, 28, 32, 38, 35, 40, 38], // retailers - afternoon peak
  [18, 25, 30, 35, 42, 45, 48, 42, 38, 32, 28, 22, 25, 30, 28, 25], // salons - mid-day peak
  [30, 35, 40, 35, 30, 25, 28, 35, 42, 48, 45, 38, 35, 30, 28, 25], // bakeries - morning and evening
];

// Different insights for each business type
const insights = [
  'lunch hour drives the highest order value.',
  'weekend shopping generates peak sales.',
  'Friday appointments command premium pricing.',
  'morning hours see the strongest demand.',
];

export default function InsightCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [chartAnimating, setChartAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleBusinessTypeClick = (index: number) => {
    if (index === currentIndex) return;

    setIsAnimating(true);
    setChartAnimating(true);
    setIsDropdownOpen(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
      setTimeout(() => setChartAnimating(false), 100);
    }, 400);
  };

  return (
    <div className="relative w-full h-[975px] bg-white rounded-[10px] shadow-lg overflow-hidden">
      {/* Background Image - Left Side */}
      <div className="absolute left-0 top-0 w-[50%] h-full overflow-hidden">
        <img
          src={businessImages[currentIndex]}
          alt={`${businessTypes[currentIndex]} background`}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Content Card - Right Side */}
      <div className="absolute right-0 top-0 w-[749px] h-full bg-white rounded-[10px] overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[589px] flex flex-col items-center gap-10">
          {/* Sparkline Chart */}
          <div className="w-full flex justify-center mb-2">
            <svg width="100" height="40" className="overflow-visible">
              <polyline
                points={sparklineData[currentIndex]
                  .map((value, index) => {
                    const x = (index / (sparklineData[currentIndex].length - 1)) * 90 + 5;
                    const y = 35 - (value / 50) * 25;
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#000000"
                strokeWidth="1.5"
                className={`transition-all duration-700 ease-in-out ${
                  chartAnimating ? 'opacity-0' : 'opacity-100'
                }`}
              />
            </svg>
          </div>

          {/* Heading */}
          <div className="w-full text-center flex flex-col gap-5">
            {/* Text with Dropdown */}
            <div className="flex items-center justify-center gap-[10px]">
              <p className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-[#666666]">
                Most
              </p>

              {/* Dropdown Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="border border-[#959595] rounded-full pl-6 pr-4 py-4 flex items-center gap-[8px] hover:bg-gray-50 transition-colors"
                >
                  <span className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-[#666666] whitespace-nowrap">
                    {businessTypes[currentIndex]}
                  </span>
                  <div className="flex items-center justify-center p-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="M13.5 5.5L8 11L2.5 5.5"
                        stroke="#959595"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 bg-white border border-[#959595] rounded-2xl shadow-lg overflow-hidden z-10 min-w-full">
                    {businessTypes.map((type, index) => (
                      <button
                        key={type}
                        onClick={() => handleBusinessTypeClick(index)}
                        className={`w-full px-6 py-3 text-left font-serif text-[20px] hover:bg-gray-50 transition-colors ${
                          currentIndex === index
                            ? 'bg-gray-100 text-black'
                            : 'text-[#666666]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <p className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-[#666666]">
                think
              </p>
            </div>

            {/* Insight Text */}
            <p className="font-serif text-[48px] leading-[1.2] tracking-[-0.96px] text-black">
              <span
                className={`inline-block transition-opacity duration-500 ease-in-out ${
                  isAnimating ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {insights[currentIndex]}
              </span>
            </p>
          </div>

          {/* CTA Button */}
          <button className="bg-black text-white px-10 py-6 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors">
            See what the data reveals
          </button>
        </div>
      </div>
    </div>
  );
}
