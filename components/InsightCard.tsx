'use client';

import { useState, useEffect, useRef } from 'react';

const businessTypes = ['coffee shops', 'retailers', 'salons', 'bakeries'];

// Different images for each business type
const businessImages = [
  '/coffee-machine.png', // coffee shops
  '/plants.jpg', // retailers
  '/coffee-machine.png', // salons - placeholder for now
  '/coffee-machine.png', // bakeries - placeholder for now
];

// Different insights for each business type
const insights = [
  'lunch hour drives the highest order value.',
  'weekend shopping generates peak sales.',
  'Friday appointments command premium pricing.',
  'morning hours see the strongest demand.',
];

// Metrics for the chart dropdown
const metrics = [
  'Average order value',
  'Peak sales hours',
  'Customer frequency',
  'Weekend vs weekday sales',
];

// Locations for the location dropdown
const locations = [
  'San Francisco',
  'Mission District',
  'Hayes Valley',
  'Castro',
  'Marina',
];

export default function InsightCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChartDropdownOpen, setIsChartDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hideRightPanel, setHideRightPanel] = useState(false);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mapRevealed, setMapRevealed] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRevealMap = () => {
    setMapRevealed(true);

    // Animate the scroll to reveal the map
    let startTime: number | null = null;
    const duration = 1000; // 1 second animation

    const animateScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setScrollY(easeProgress * 800); // Animate from 0 to 800

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const handleBusinessTypeClick = (index: number) => {
    if (index === currentIndex) return;

    setIsAnimating(true);
    setIsDropdownOpen(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 400);
  };

  const handleExpand = () => {
    // 1. Hide right panel and move/grow card immediately
    setHideRightPanel(true);

    // 2. Wait for panel slide & card movement (700ms), then show expanded content
    setTimeout(() => {
      setIsExpanded(true);
    }, 700);

    // 3. Show CTA after chart data loads (2200ms = 700ms + 1500ms)
    setTimeout(() => {
      setShowCTA(true);
    }, 2200);
  };

  // Handle scroll to reveal the map
  useEffect(() => {
    if (!isExpanded || !containerRef.current) return;

    const handleScroll = (e: WheelEvent) => {
      if (!mapRevealed && e.deltaY > 0) {
        setMapRevealed(true);
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleScroll);

    return () => {
      container.removeEventListener('wheel', handleScroll);
    };
  }, [isExpanded, mapRevealed]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden">
      {/* Background Image - Full width container */}
      <div className={`absolute left-0 top-0 h-full overflow-hidden transition-all duration-700 ${
        mapRevealed ? 'w-1/2' : 'w-full'
      }`}>
        {/* Coffee shop image - always visible as base layer */}
        <img
          src={businessImages[currentIndex]}
          alt={`${businessTypes[currentIndex]} background`}
          className={`absolute left-0 top-0 w-full h-full object-cover transition-opacity duration-500 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Map that slides up from bottom on scroll - only when expanded and revealed */}
        {isExpanded && mapRevealed && (
          <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
            <img
              src="/map-streets.png"
              alt="Interactive neighborhood map"
              className="absolute w-full h-full object-cover transition-transform duration-300 ease-out"
              style={{
                transform: `translateY(${100 - Math.min(100, (scrollY / 800) * 100)}%)`,
              }}
            />
          </div>
        )}

      </div>

      {/* Chart Card Overlay */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 bg-white rounded-[10px] shadow-lg flex flex-col transition-all duration-700 ${
          hideRightPanel
            ? 'left-1/2 -translate-x-1/2 w-[591px] p-10 gap-10'
            : 'left-[25%] -translate-x-1/2 w-[360px] p-5 gap-[30px]'
        }`}
      >
        {/* Dropdowns - Metric and Location */}
        <div className="flex gap-5 w-full">
          <div
            className="relative transition-all duration-700"
            style={{
              flex: showCTA && !mapRevealed ? '1' : '2',
            }}
          >
            <button
              onClick={() => setIsChartDropdownOpen(!isChartDropdownOpen)}
              className="w-full bg-white border border-[#d3d3d3] rounded-[30px] h-[56px] flex items-center justify-center px-5 py-[10px] hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-base text-[rgba(0,0,0,0.9)]">
                {metrics[selectedMetric]}
              </span>
            </button>

            {/* Metric Dropdown Menu */}
            {isChartDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#d3d3d3] rounded-2xl shadow-lg overflow-hidden z-10">
                {metrics.map((metric, index) => (
                  <button
                    key={metric}
                    onClick={() => {
                      setSelectedMetric(index);
                      setIsChartDropdownOpen(false);
                    }}
                    className={`w-full px-5 py-3 text-left font-medium text-base hover:bg-gray-50 transition-colors ${
                      selectedMetric === index
                        ? 'bg-gray-100 text-black'
                        : 'text-[rgba(0,0,0,0.9)]'
                    }`}
                  >
                    {metric}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location matters CTA button - appears when showCTA is true */}
          {isExpanded && showCTA && !mapRevealed && (
            <div className="flex-1">
              <button
                onClick={handleRevealMap}
                className="w-full bg-black text-white rounded-[30px] h-[56px] flex items-center justify-center px-5 py-[10px] hover:bg-gray-800 transition-colors font-medium text-base animate-[popIn_800ms_ease-in-out_forwards]"
              >
                ... and location matters
              </button>
            </div>
          )}

          {/* Location dropdown - only appears when map is revealed */}
          {isExpanded && mapRevealed && (
            <div className="relative flex-1 animate-[fadeIn_500ms_ease-in-out_forwards]">
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="w-full bg-white border border-[#d3d3d3] rounded-[30px] h-[56px] flex items-center justify-center px-5 py-[10px] hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-base text-[rgba(0,0,0,0.9)]">
                  {locations[selectedLocation]}
                </span>
              </button>

              {/* Location Dropdown Menu */}
              {isLocationDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#d3d3d3] rounded-2xl shadow-lg overflow-hidden z-10">
                  {locations.map((location, index) => (
                    <button
                      key={location}
                      onClick={() => {
                        setSelectedLocation(index);
                        setIsLocationDropdownOpen(false);
                      }}
                      className={`w-full px-5 py-3 text-left font-medium text-base hover:bg-gray-50 transition-colors ${
                        selectedLocation === index
                          ? 'bg-gray-100 text-black'
                          : 'text-[rgba(0,0,0,0.9)]'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="flex flex-col gap-[40px] w-full">
          <div className={`flex gap-[10px] h-[320px] transition-all duration-700 ${
            hideRightPanel ? 'w-full' : 'w-[320px]'
          }`}>
            {/* Y Axis Labels - Always visible */}
            <div className="flex flex-col justify-between pb-[25px] text-xs text-[#666666] tracking-[0.12px]">
              <span>$20</span>
              <span>$15</span>
              <span>$10</span>
              <span>$5</span>
              <span>0</span>
            </div>

            {/* Chart Area */}
            <div className="flex-1 flex flex-col gap-[10px] relative">
              {/* Grid Lines - Always visible, grows with card */}
              <div className="absolute left-[3px] right-0 top-0 bottom-[24px] flex flex-col justify-between z-0">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-[1px] bg-[#f0f0f0] transition-all duration-700" />
                ))}
              </div>

              {/* Bars - Fade out old, fade in new */}
              <div className="flex gap-[12px] items-end justify-end h-[295px] px-[10px] pb-px relative z-10">
                {isExpanded ? (
                  <>
                    {/* Expanded view: 9 bars with different colors */}
                    <div className="flex-1 flex flex-col justify-end h-[294px] opacity-0 animate-[fadeIn_500ms_ease-in-out_forwards] group relative">
                      <div className="w-full h-[219px] bg-[#dadada] rounded-t-[6px] transition-all duration-200 group-hover:brightness-90 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$17.50</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-end h-[294px] opacity-0 animate-[fadeIn_500ms_ease-in-out_100ms_forwards] group relative">
                      <div className="w-full h-[281px] bg-black rounded-t-[6px] transition-all duration-200 group-hover:brightness-125 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$22.50</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-end h-[294px] opacity-0 animate-[fadeIn_500ms_ease-in-out_150ms_forwards] group relative">
                      <div className="w-full h-[275px] bg-black rounded-t-[6px] transition-all duration-200 group-hover:brightness-125 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$22.00</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-end h-[294px] opacity-0 animate-[fadeIn_500ms_ease-in-out_200ms_forwards] group relative">
                      <div className="w-full h-[273px] bg-black rounded-t-[6px] transition-all duration-200 group-hover:brightness-125 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$21.80</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-end h-[294px] opacity-0 animate-[fadeIn_500ms_ease-in-out_250ms_forwards] group relative">
                      <div className="w-full h-[214px] bg-[#dadada] rounded-t-[6px] transition-all duration-200 group-hover:brightness-90 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$17.10</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-end h-[294px] opacity-0 animate-[fadeIn_500ms_ease-in-out_300ms_forwards] group relative">
                      <div className="w-full h-[223px] bg-[#dadada] rounded-t-[6px] transition-all duration-200 group-hover:brightness-90 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$17.80</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-end h-[294px] opacity-0 animate-[fadeIn_500ms_ease-in-out_350ms_forwards] group relative">
                      <div className="w-full h-[202px] bg-[#666666] rounded-t-[6px] transition-all duration-200 group-hover:brightness-110 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$16.20</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-end h-[294px] opacity-0 animate-[fadeIn_500ms_ease-in-out_400ms_forwards] group relative">
                      <div className="w-full h-[243px] bg-[#666666] rounded-t-[6px] transition-all duration-200 group-hover:brightness-110 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$19.40</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-end h-[294px] opacity-0 animate-[fadeIn_500ms_ease-in-out_450ms_forwards] group relative">
                      <div className="w-full h-[233px] bg-[#666666] rounded-t-[6px] transition-all duration-200 group-hover:brightness-110 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$18.60</div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Collapsed view: 4 bars */}
                    <div className="flex-1 flex flex-col justify-end h-[294px] transition-opacity duration-300 group relative">
                      <div className="w-full h-[241px] bg-black rounded-t-[6px] transition-all duration-200 group-hover:brightness-125 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$19.30</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-end h-[294px] transition-opacity duration-300 group relative">
                      <div className="w-full h-[223px] bg-black rounded-t-[6px] transition-all duration-200 group-hover:brightness-125 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$17.80</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-end h-[294px] transition-opacity duration-300 group relative">
                      <div className="w-full h-[219px] bg-black rounded-t-[6px] transition-all duration-200 group-hover:brightness-125 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$17.50</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-end h-[294px] transition-opacity duration-300 group relative">
                      <div className="w-full h-[273px] bg-black rounded-t-[6px] transition-all duration-200 group-hover:brightness-125 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">$21.80</div>
                    </div>
                  </>
                )}
              </div>

              {/* X Axis Labels - Fade transition */}
              <div className="flex gap-[12px] items-start justify-start px-[10px] text-xs text-[#666666] tracking-[0.12px]">
                {isExpanded ? (
                  <>
                    <div className="flex-1 text-center opacity-0 animate-[fadeIn_300ms_ease-in-out_forwards]">6am</div>
                    <div className="flex-1 text-center opacity-0 animate-[fadeIn_300ms_ease-in-out_50ms_forwards]">7am</div>
                    <div className="flex-1 text-center opacity-0 animate-[fadeIn_300ms_ease-in-out_100ms_forwards]">8am</div>
                    <div className="flex-1 text-center opacity-0 animate-[fadeIn_300ms_ease-in-out_150ms_forwards]">9am</div>
                    <div className="flex-1 text-center opacity-0 animate-[fadeIn_300ms_ease-in-out_200ms_forwards]">10am</div>
                    <div className="flex-1 text-center opacity-0 animate-[fadeIn_300ms_ease-in-out_250ms_forwards]">11am</div>
                    <div className="flex-1 text-center opacity-0 animate-[fadeIn_300ms_ease-in-out_300ms_forwards]">12pm</div>
                    <div className="flex-1 text-center opacity-0 animate-[fadeIn_300ms_ease-in-out_350ms_forwards]">1pm</div>
                    <div className="flex-1 text-center opacity-0 animate-[fadeIn_300ms_ease-in-out_400ms_forwards]">2pm</div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 text-center transition-opacity duration-300">11am</div>
                    <div className="flex-1 text-center transition-opacity duration-300">12pm</div>
                    <div className="flex-1 text-center transition-opacity duration-300">1pm</div>
                    <div className="flex-1 text-center transition-opacity duration-300">2pm</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Insight Text - Only visible when expanded */}
        {isExpanded && (
          <div className="flex flex-col gap-[10px] w-full text-[#101010]">
            <p className="font-serif text-[24px] leading-[1.2] tracking-[-0.48px]">
              {mapRevealed
                ? "Here's the data: Morning rush drives 31% higher order value"
                : "Our data shows morning rush between 7-9am beats lunch by 31%"
              }
            </p>
            <p className="font-normal text-[18px] leading-[1.5] tracking-[-0.36px]">
              {mapRevealed ? (
                <>
                  <span className="text-[#666666]">General data shows $18.50 average.</span>{' '}
                  <span className="font-semibold">With a LOCAL lens: $24.20 during 7-9am in {locations[selectedLocation]}.</span>
                </>
              ) : (
                "Average order value jumps from $18.50 to 24.20 during these hours."
              )}
            </p>
          </div>
        )}
      </div>



      {/* Content Card - Right Side */}
      <div className={`absolute top-0 w-[50%] h-full bg-white overflow-hidden flex items-center justify-center transition-all duration-700 ${
        hideRightPanel ? 'right-[-50%] opacity-0 pointer-events-none' : 'right-0 opacity-100'
      }`}>
        <div className="w-[589px] flex flex-col items-center gap-16">
          {/* Heading */}
          <div className="w-full text-center flex flex-col gap-12">
            {/* Text with Dropdown */}
            <div className="flex items-center justify-center gap-[10px]">
              <p className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-black">
                Most
              </p>

              {/* Dropdown Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="border border-[#959595] rounded-full pl-6 pr-4 py-4 flex items-center gap-[8px] hover:bg-gray-50 transition-colors"
                >
                  <span className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-black whitespace-nowrap">
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

              <p className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-black">
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
          <button
            onClick={handleExpand}
            className="bg-black text-white px-10 py-6 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors"
          >
            See what the data reveals
          </button>
        </div>
      </div>
    </div>
  );
}
