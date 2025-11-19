'use client';

import { useState, useRef } from 'react';

const businessTypes = ['coffee shops', 'retailers', 'salons', 'services'];

// Different images for each business type
const businessImages = [
  '/coffee-machine.png', // coffee shops
  '/plants.jpg', // retailers
  '/salon-tools.jpg', // salons
  '/services-desk.jpg', // services
];

// Different insights for each business type
const insights = [
  'lunch hour drives the highest order value.',
  'weekend shopping generates peak sales.',
  'Friday appointments command premium pricing.',
  'appointment scheduling drives consistent revenue.',
];

// Metrics for the chart dropdown
const metrics = [
  'Average order value',
  'Peak sales hours',
  'Sales growth',
];

// Locations for the location dropdown
const locations = [
  'Mission District',
  'Hayes Valley',
  'Castro',
  'Marina',
];

// Chart data for coffee shops - Average order value
const averageOrderValueData = [
  { time: '6am', value: 14.40, height: 180 },
  { time: '7am', value: 24.20, height: 294 },
  { time: '8am', value: 23.80, height: 289 },
  { time: '9am', value: 21.40, height: 260 },
  { time: '10am', value: 16.00, height: 200 },
  { time: '11am', value: 16.80, height: 210 },
  { time: '12pm', value: 15.60, height: 195 },
  { time: '1pm', value: 18.80, height: 235 },
  { time: '2pm', value: 18.00, height: 225 },
];

// Chart data for Peak sales hours (heatmap with days and hours)
const peakSalesHoursData = [
  { day: 'Mon', hours: ['low', 'low', 'medium', 'medium', 'medium', 'low', 'low', 'medium', 'low'] },
  { day: 'Tue', hours: ['low', 'low', 'medium', 'medium', 'low', 'medium', 'low', 'medium', 'low'] },
  { day: 'Wed', hours: ['medium', 'medium', 'medium', 'medium', 'low', 'medium', 'medium', 'medium', 'low'] },
  { day: 'Thu', hours: ['medium', 'peak', 'peak', 'high', 'low', 'low', 'low', 'low', 'low'] },
  { day: 'Fri', hours: ['medium', 'peak', 'peak', 'high', 'low', 'low', 'medium', 'medium', 'low'] },
  { day: 'Sat', hours: ['medium', 'high', 'high', 'medium', 'low', 'low', 'low', 'low', 'low'] },
  { day: 'Sun', hours: ['low', 'low', 'low', 'low', 'low', 'low', 'medium', 'low', 'low'] },
];

// Chart data for Sales growth (percentage growth)
const salesGrowthData = [
  { time: 'Jan', value: 5.2, height: 195 },
  { time: 'Feb', value: 8.4, height: 240 },
  { time: 'Mar', value: 12.1, height: 275 },
  { time: 'Apr', value: 15.3, height: 294 },
  { time: 'May', value: 11.8, height: 270 },
  { time: 'Jun', value: 9.6, height: 250 },
  { time: 'Jul', value: 7.2, height: 220 },
  { time: 'Aug', value: 10.5, height: 260 },
  { time: 'Sep', value: 13.7, height: 285 },
];

const chartData = averageOrderValueData;

export default function InsightCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [locationInput, setLocationInput] = useState('');
  const [submittedLocation, setSubmittedLocation] = useState('');
  const [showConversionCard, setShowConversionCard] = useState(false);
  const [showExpandedChart, setShowExpandedChart] = useState(false);
  const [showLocationMap, setShowLocationMap] = useState(false);
  const [showInteractiveTool, setShowInteractiveTool] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isMetricDropdownOpen, setIsMetricDropdownOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleBusinessTypeClick = (index: number) => {
    if (index === currentIndex) return;

    setIsAnimating(true);
    setIsDropdownOpen(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 400);
  };

  const handleCTAClick = () => {
    setShowExpandedChart(true);
    // Scroll to the expanded chart section - scroll to a specific point
    setTimeout(() => {
      const expandedSection = document.getElementById('expanded-chart-section');
      if (expandedSection && scrollContainerRef.current) {
        const topPosition = expandedSection.offsetTop - scrollContainerRef.current.offsetTop;
        scrollContainerRef.current.scrollTo({
          top: topPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleLocationMattersClick = () => {
    setShowLocationMap(true);
    // Scroll to the location map section
    setTimeout(() => {
      const mapSection = document.getElementById('location-map-section');
      if (mapSection && scrollContainerRef.current) {
        const topPosition = mapSection.offsetTop - scrollContainerRef.current.offsetTop;
        scrollContainerRef.current.scrollTo({
          top: topPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleCompareClick = () => {
    setShowInteractiveTool(true);
    // Scroll to the interactive tool section
    setTimeout(() => {
      const toolSection = document.getElementById('interactive-tool-section');
      if (toolSection && scrollContainerRef.current) {
        const topPosition = toolSection.offsetTop - scrollContainerRef.current.offsetTop;
        scrollContainerRef.current.scrollTo({
          top: topPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleLocationSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && locationInput.trim()) {
      setSubmittedLocation(locationInput);
      // Show conversion card after a delay
      setTimeout(() => {
        setShowConversionCard(true);
      }, 1500);
    }
  };

  // Helper function to get current chart data based on selected metric
  const getCurrentChartData = () => {
    switch (selectedMetric) {
      case 0:
        return averageOrderValueData;
      case 1:
        return peakSalesHoursData;
      case 2:
        return salesGrowthData;
      default:
        return averageOrderValueData;
    }
  };

  // Helper function to get intensity color for heatmap
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'peak':
        return 'bg-black';
      case 'high':
        return 'bg-[#666666]';
      case 'medium':
        return 'bg-[#999999]';
      case 'low':
        return 'bg-[#dadada]';
      default:
        return 'bg-[#dadada]';
    }
  };

  // Helper function to get bar color based on value
  const getBarColor = (index: number) => {
    if (selectedMetric === 1) return 'bg-black'; // Peak sales uses heatmap, not bars

    // For Average order value and Sales growth
    const currentData = getCurrentChartData();
    const topCount = selectedMetric === 0 ? 4 : 3; // Top 4 for AOV, top 3 for Sales growth
    const sortedIndices = currentData
      .map((d: any, i: number) => ({ value: d.value, index: i }))
      .sort((a: any, b: any) => b.value - a.value)
      .slice(0, topCount)
      .map((d: any) => d.index);
    return sortedIndices.includes(index) ? 'bg-black' : 'bg-[#dadada]';
  };

  // Helper function to get brightness class for hover
  const getHoverBrightness = (color: string) => {
    return color === 'bg-black' ? 'group-hover:brightness-125' : 'group-hover:brightness-90';
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Scrollable container - both sides scroll together */}
      <div
        ref={scrollContainerRef}
        className="w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
      >
        <div className="flex">
          {/* Left: Coffee shop image - scrolls with right side */}
          <div className="w-1/2 h-screen sticky top-0">
            <img
              src={businessImages[currentIndex]}
              alt={`${businessTypes[currentIndex]} background`}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isAnimating ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>

          {/* Right: Content panel */}
          <div className="w-1/2 bg-white">
        {/* Initial View Section */}
        <div className="w-full min-h-screen flex items-center justify-center snap-start">
          <div className="w-[589px] flex flex-col items-center gap-16">
            {/* Abbreviated Chart - 4 bars */}
            <div className="bg-white rounded-[10px] w-[360px] p-5 shadow-lg flex flex-col gap-[20px]">
              {/* Metric eyebrow */}
              <div className="flex items-start justify-start w-full">
                <span className="font-medium text-xs uppercase tracking-[1.08px] text-black">
                  {metrics[selectedMetric]}
                </span>
              </div>

              {/* Chart */}
              <div className="flex gap-[10px] h-[320px]">
                {/* Y Axis Labels */}
                <div className="flex flex-col justify-between pb-[25px] text-xs text-[#666666] tracking-[0.12px]">
                  <span>$20</span>
                  <span>$15</span>
                  <span>$10</span>
                  <span>$5</span>
                  <span>0</span>
                </div>

                {/* Chart Area */}
                <div className="flex-1 flex flex-col gap-[10px] relative">
                  {/* Grid Lines */}
                  <div className="absolute left-[3px] right-0 top-0 bottom-[24px] flex flex-col justify-between z-0">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-full h-[1px] bg-[#f0f0f0]" />
                    ))}
                  </div>

                  {/* Bars - Only 4 bars */}
                  <div className="flex gap-[12px] items-end justify-end h-[295px] px-[10px] pb-px relative z-10">
                    {[
                      { height: 241, label: '11am' },
                      { height: 223, label: '12pm' },
                      { height: 219, label: '1pm' },
                      { height: 273, label: '2pm' },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col justify-end h-[294px] transition-opacity duration-300 group relative"
                      >
                        <div
                          className="w-full bg-black rounded-t-[6px] transition-all duration-200 group-hover:brightness-125 cursor-pointer"
                          style={{ height: `${item.height}px` }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* X Axis Labels */}
                  <div className="flex gap-[12px] items-start justify-start px-[10px] text-xs text-[#666666] tracking-[0.12px]">
                    <div className="flex-1 text-center transition-opacity duration-300">11am</div>
                    <div className="flex-1 text-center transition-opacity duration-300">12pm</div>
                    <div className="flex-1 text-center transition-opacity duration-300">1pm</div>
                    <div className="flex-1 text-center transition-opacity duration-300">2pm</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Heading */}
            <div className="w-full text-center flex flex-col gap-2">
              {/* Text with Dropdown */}
              <div className="flex items-center justify-center gap-[10px]">
                <p className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-black">
                  Most
                </p>

                {/* Dropdown Selector */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="border border-[#959595] rounded-full pl-4 pr-3 py-2 flex items-center gap-[6px] hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-serif text-[24px] leading-[1.1] tracking-[-0.48px] text-black whitespace-nowrap">
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
              <p className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-black max-w-[450px] mx-auto">
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
              onClick={handleCTAClick}
              className="bg-black text-white px-8 py-4 rounded-full font-medium text-base hover:bg-gray-800 transition-colors"
            >
              See what the data reveals
            </button>
          </div>
        </div>

        {/* Expanded Chart Section - appears below when CTA is clicked */}
        {showExpandedChart && (
          <div id="expanded-chart-section" className="w-full min-h-screen flex flex-col items-center justify-center gap-16 snap-start">
              {/* Expanded Chart Card - 9 bars */}
              <div className="bg-white rounded-[10px] w-[591px] p-10 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1),0px_2px_16px_0px_rgba(0,0,0,0.1)] flex flex-col gap-10">
                {/* Metric eyebrow */}
                <div className="flex items-start justify-start w-full">
                  <span className="font-medium text-xs uppercase tracking-[1.08px] text-black">
                    {metrics[selectedMetric]}
                  </span>
                </div>

                {/* Insight Text */}
                <div className="flex flex-col gap-[10px] w-full text-[#101010]">
                  <p className="font-serif text-[28px] leading-[1.1] tracking-[-0.56px]">
                    Our data shows morning rush between 7-9am beats lunch by 31%
                  </p>
                  <p className="font-normal text-sm leading-[1.5] text-[#666666]">
                    The average order value jumps from $18.50 to $24.20.
                  </p>
                </div>

                {/* Chart */}
                <div className="flex flex-col gap-[20px] w-full">
                  <div className="flex gap-[10px] h-[240px]">
                    {/* Y Axis Labels */}
                    <div className="flex flex-col justify-between pb-[20px] text-xs text-[#666666] tracking-[0.12px]">
                      <span>$25</span>
                      <span>$20</span>
                      <span>$15</span>
                      <span>$10</span>
                      <span>0</span>
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 flex flex-col gap-[10px] relative">
                      {/* Grid Lines */}
                      <div className="absolute left-[3px] right-0 top-0 bottom-[20px] flex flex-col justify-between z-0">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-full h-[1px] bg-[#f0f0f0]" />
                        ))}
                      </div>

                      {/* Bars - 9 bars */}
                      <div className="flex gap-[8px] items-end justify-end h-[220px] px-[8px] pb-px relative z-10">
                        {getCurrentChartData().map((item, index) => {
                          const barColor = getBarColor(index);
                          const hoverClass = getHoverBrightness(barColor);
                          const displayValue = selectedMetric === 0 ? `$${item.value}` : selectedMetric === 1 ? `${item.value} txns` : `${item.value}%`;
                          const scaledHeight = (item.height / 294) * 220;

                          return (
                            <div
                              key={index}
                              className="flex-1 flex flex-col justify-end h-full group relative"
                            >
                              <div
                                className={`w-full ${barColor} rounded-t-[4px] transition-all duration-200 ${hoverClass} cursor-pointer`}
                                style={{ height: `${scaledHeight}px` }}
                              />
                              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {displayValue}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* X Axis Labels */}
                      <div className="flex gap-[8px] items-start justify-start px-[8px] text-xs text-[#666666] tracking-[0.12px]">
                        {getCurrentChartData().map((item, index) => (
                          <div key={index} className="flex-1 text-center">
                            {item.time}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* "Location matters" Button */}
              <button
                onClick={handleLocationMattersClick}
                className="bg-black text-white px-8 py-4 rounded-full font-medium text-base hover:bg-gray-800 transition-colors"
              >
                Location matters
              </button>
            </div>
        )}

        {/* Location Map Section - appears on right when map shows */}
        {showLocationMap && (
          <div id="location-map-section" className="w-full min-h-screen flex flex-col items-center justify-center gap-16 snap-start relative">
            {/* Map Background */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: 'url(/map-background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Localized Data Card - positioned on top of map */}
            <div className="relative z-10 bg-white rounded-[10px] w-[591px] p-10 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1),0px_2px_16px_0px_rgba(0,0,0,0.1)] flex flex-col gap-10">
              {/* Header with Metric and Location */}
              <div className="flex items-start justify-between w-full">
                <p className="uppercase tracking-[1.08px] text-xs text-black font-medium">
                  Average order value
                </p>
                <p className="uppercase tracking-[1.08px] text-xs text-black font-medium">
                  Greenpoint, NY
                </p>
              </div>

              {/* Insight Text */}
              <div className="flex flex-col gap-[10px] w-full text-[#101010]">
                <p className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px]">
                  In Greenpoint, 7am hits peak order value at $24.20
                </p>
                <p className="font-normal text-base leading-[1.5]">
                  That's 31% higher than the city-wide average of $18.50.
                </p>
              </div>

              {/* Chart */}
              <div className="flex gap-[10px] h-[320px]">
                {/* Y Axis Labels */}
                <div className="flex flex-col justify-between pb-[25px] text-xs text-[#666666] tracking-[0.12px]">
                  <span>$20</span>
                  <span>$15</span>
                  <span>$10</span>
                  <span>$5</span>
                  <span>0</span>
                </div>

                {/* Chart Area */}
                <div className="flex-1 flex flex-col gap-[10px] relative">
                  {/* Grid Lines */}
                  <div className="absolute left-[3px] right-0 top-0 bottom-[24px] flex flex-col justify-between z-0">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-full h-[1px] bg-[#f0f0f0]" />
                    ))}
                  </div>

                  {/* Bars - 9 bars with Mission-specific data */}
                  <div className="flex gap-[12px] items-end justify-end h-[295px] px-[10px] pb-px relative z-10">
                    {[
                      { height: 219, label: '6am', highlighted: false },
                      { height: 281, label: '7am', highlighted: true },
                      { height: 275, label: '8am', highlighted: true },
                      { height: 273, label: '9am', highlighted: true },
                      { height: 214, label: '10am', highlighted: false },
                      { height: 223, label: '11am', highlighted: false },
                      { height: 202, label: '12pm', highlighted: false },
                      { height: 243, label: '1pm', highlighted: false },
                      { height: 233, label: '2pm', highlighted: false },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col justify-end h-[294px] transition-opacity duration-300 group relative"
                      >
                        <div
                          className={`w-full rounded-t-[6px] transition-all duration-200 cursor-pointer ${
                            item.highlighted
                              ? 'bg-black group-hover:brightness-125'
                              : 'bg-[#dadada] group-hover:brightness-90'
                          }`}
                          style={{ height: `${item.height}px` }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* X Axis Labels */}
                  <div className="flex gap-[12px] items-start justify-start px-[10px] text-xs text-[#666666] tracking-[0.12px]">
                    {['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm'].map((time, index) => (
                      <div key={index} className="flex-1 text-center transition-opacity duration-300">
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleCompareClick}
              className="relative z-10 bg-black text-white px-8 py-4 rounded-full font-medium text-base hover:bg-gray-800 transition-colors"
            >
              See how your business compares
            </button>
          </div>
        )}

        {/* Interactive Tool Section - appears when user clicks "See how your business compares" */}
        {showInteractiveTool && (
          <div id="interactive-tool-section" className="w-full min-h-screen flex flex-col items-center justify-start pt-32 gap-16 snap-start bg-white">
            {/* Heading */}
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-black">
                See your neighborhood insights for
              </p>
              {/* Business Type Input */}
              <input
                type="text"
                defaultValue="coffee shops"
                size={12}
                className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-black bg-transparent outline-none text-center border-0 border-b-2 border-[#dadada] pb-1 cursor-text hover:border-[#666666] focus:border-black transition-colors caret-black"
              />
            </div>

            {/* Interactive Tool Card */}
            <div className="bg-white rounded-[10px] w-[591px] p-10 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1),0px_2px_16px_0px_rgba(0,0,0,0.1)] flex flex-col gap-10">
              {/* Dropdowns Row */}
              <div className="flex items-center justify-between w-full">
                {/* Metric Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsMetricDropdownOpen(!isMetricDropdownOpen)}
                    className="flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                  >
                    <p className="uppercase tracking-[1.08px] text-xs text-black font-medium">
                      {metrics[selectedMetric]}
                    </p>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`transition-transform duration-200 ${
                        isMetricDropdownOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="M13.5 5.5L8 11L2.5 5.5"
                        stroke="#101010"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Metric Dropdown Menu */}
                  {isMetricDropdownOpen && (
                    <div className="absolute top-full mt-2 left-0 bg-white border border-[#959595] rounded-2xl shadow-lg overflow-hidden z-50 min-w-[200px]">
                      {metrics.map((metric, index) => (
                        <button
                          key={metric}
                          onClick={() => {
                            setSelectedMetric(index);
                            setIsMetricDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-xs uppercase tracking-[1.08px] hover:bg-gray-50 transition-colors ${
                            selectedMetric === index
                              ? 'bg-gray-100 text-black font-medium'
                              : 'text-[#666666] font-medium'
                          }`}
                        >
                          {metric}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Neighborhood Input */}
                <div className="relative flex items-center gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 4.99935C8.73638 4.99935 9.33334 5.5963 9.33333 6.33268C9.33333 7.06906 8.73638 7.66602 8 7.66602C7.26364 7.66599 6.66667 7.06904 6.66667 6.33268C6.66667 5.59632 7.26364 4.99937 8 4.99935Z" fill="#101010"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 0.666016C9.58759 0.666016 11.1122 1.28593 12.2383 2.39258C13.3647 3.49962 14 5.00353 14 6.57422C13.9999 8.88031 12.51 10.9828 11.1543 12.4368C10.4619 13.1795 9.77152 13.7874 9.25521 14.2096C8.9966 14.4211 8.7805 14.5873 8.62761 14.7012C8.55112 14.7581 8.49022 14.8024 8.44792 14.8327C8.42685 14.8478 8.41005 14.859 8.39844 14.8672C8.39262 14.8713 8.38809 14.8746 8.38477 14.877C8.3832 14.878 8.38086 14.8796 8.38086 14.8796L8.37956 14.8809L8 14.3327L8.37891 14.8815C8.15093 15.0389 7.84907 15.0389 7.62109 14.8815L7.61914 14.8796C7.61914 14.8796 7.61681 14.878 7.61524 14.877C7.61192 14.8746 7.60738 14.8713 7.60156 14.8672C7.58995 14.859 7.57316 14.8478 7.55208 14.8327C7.50978 14.8024 7.44888 14.7581 7.3724 14.7012C7.2195 14.5873 7.0034 14.4211 6.74479 14.2096C6.22848 13.7874 5.53809 13.1795 4.8457 12.4368C3.49003 10.9828 2.00007 8.88031 2 6.57422C2 5.00353 2.63525 3.49962 3.76172 2.39258C4.88779 1.28593 6.41241 0.666016 8 0.666016ZM8 1.99935C6.75865 1.99935 5.57027 2.4839 4.69596 3.3431C3.82204 4.20195 3.33333 5.36471 3.33333 6.57422C3.3334 8.34462 4.51006 10.1213 5.82096 11.5273C6.46188 12.2148 7.10487 12.7822 7.58854 13.1777C7.74438 13.3052 7.8839 13.4134 8 13.5026C8.11611 13.4134 8.25562 13.3052 8.41146 13.1777C8.89514 12.7822 9.53812 12.2148 10.179 11.5273C11.4899 10.1213 12.6666 8.34462 12.6667 6.57422C12.6667 5.36471 12.178 4.20195 11.304 3.3431C10.4297 2.4839 9.24135 1.99935 8 1.99935Z" fill="#101010"/>
                  </svg>
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onKeyDown={handleLocationSubmit}
                    placeholder="Neighborhood"
                    className={`uppercase tracking-[1.08px] text-xs font-medium bg-transparent border-none outline-none ${
                      locationInput ? 'text-black' : 'text-[#959595] placeholder:text-[#959595]'
                    }`}
                  />
                </div>
              </div>

              {/* Chart - shows data when location is entered */}
              <div className="flex gap-[10px] h-[320px]">
                {/* Y Axis Labels */}
                <div className="flex flex-col justify-between pb-[25px] text-xs text-[#666666] tracking-[0.12px]">
                  {selectedMetric === 1 ? (
                    // Peak sales hours - days of week
                    <>
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </>
                  ) : selectedMetric === 2 ? (
                    // Sales growth - percentages
                    <>
                      <span>20%</span>
                      <span>15%</span>
                      <span>10%</span>
                      <span>5%</span>
                      <span>0%</span>
                    </>
                  ) : (
                    // Average order value - dollars
                    <>
                      <span>$20</span>
                      <span>$15</span>
                      <span>$10</span>
                      <span>$5</span>
                      <span>0</span>
                    </>
                  )}
                </div>

                {/* Chart Area */}
                <div className="flex-1 flex flex-col gap-[10px] relative">
                  {/* Grid Lines */}
                  <div className="absolute left-[3px] right-0 top-0 bottom-[24px] flex flex-col justify-between z-0">
                    {selectedMetric === 1 ? (
                      // Peak sales hours - 8 grid lines for 7 days
                      [...Array(8)].map((_, i) => (
                        <div key={i} className="w-full h-[1px] bg-[#f0f0f0]" />
                      ))
                    ) : (
                      // Standard 5 grid lines for other metrics
                      [...Array(5)].map((_, i) => (
                        <div key={i} className="w-full h-[1px] bg-[#f0f0f0]" />
                      ))
                    )}
                  </div>

                  {/* Chart content - varies by metric */}
                  {selectedMetric === 1 ? (
                    // Peak sales hours - Heatmap
                    <div className="h-[295px] px-[10px] pb-px relative z-10">
                      {submittedLocation ? (
                        <div className="w-full h-full flex flex-col gap-[2px] animate-fade-in-up">
                          {peakSalesHoursData.map((dayData, dayIndex) => (
                            <div key={dayIndex} className="flex gap-[2px] flex-1">
                              {dayData.hours.map((intensity, hourIndex) => {
                                const intensityColor = getIntensityColor(intensity);
                                return (
                                  <div
                                    key={hourIndex}
                                    className={`flex-1 ${intensityColor} rounded-[1px] transition-all duration-300 hover:brightness-110 cursor-pointer`}
                                  />
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Empty state for heatmap
                        <div className="w-full h-full flex flex-col gap-[2px]">
                          {[...Array(7)].map((_, dayIndex) => (
                            <div key={dayIndex} className="flex gap-[2px] flex-1">
                              {[...Array(9)].map((_, hourIndex) => (
                                <div
                                  key={hourIndex}
                                  className="flex-1 bg-[#f0f0f0] rounded-[1px]"
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : selectedMetric === 2 ? (
                    // Sales growth - Line graph
                    <div className="h-[295px] px-[10px] pb-px relative z-10">
                      {submittedLocation ? (
                        <svg className="w-full h-full animate-fade-in-up" viewBox="-8 -8 516 310" preserveAspectRatio="none">
                          {/* Line path */}
                          <path
                            d={salesGrowthData.map((item, index) => {
                              const x = (index / (salesGrowthData.length - 1)) * 500;
                              const y = 294 - item.height;
                              return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
                            }).join(' ')}
                            fill="none"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Data points */}
                          {salesGrowthData.map((item, index) => {
                            const x = (index / (salesGrowthData.length - 1)) * 500;
                            const y = 294 - item.height;
                            return (
                              <g key={index} className="group cursor-pointer">
                                <circle cx={x} cy={y} r="12" fill="transparent" className="cursor-pointer" />
                                <circle
                                  cx={x}
                                  cy={y}
                                  r="7"
                                  fill="none"
                                  stroke="black"
                                  strokeWidth="1.5"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                                />
                                <circle cx={x} cy={y} r="4" fill="black" className="transition-all duration-200 pointer-events-none" />
                              </g>
                            );
                          })}
                        </svg>
                      ) : (
                        // Empty state for line graph
                        <div className="w-full h-full flex items-end justify-between">
                          {[...Array(9)].map((_, index) => (
                            <div key={index} className="w-1 h-1 bg-[#f0f0f0] rounded-full" />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Average order value - Bar chart
                    <div className="flex gap-[12px] items-end justify-end h-[295px] px-[10px] pb-px relative z-10">
                      {submittedLocation ? (
                        // Show actual data bars
                        getCurrentChartData().map((item: any, index: number) => {
                          const barColor = getBarColor(index);
                          const isHighlighted = barColor === 'bg-black';
                          return (
                            <div
                              key={index}
                              className="flex-1 flex flex-col justify-end h-[294px] group relative animate-fade-in-up"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <div
                                className={`w-full rounded-t-[6px] transition-all duration-200 cursor-pointer ${
                                  isHighlighted
                                    ? 'bg-black group-hover:brightness-125'
                                    : 'bg-[#dadada] group-hover:brightness-90'
                                }`}
                                style={{ height: `${item.height}px` }}
                              />
                            </div>
                          );
                        })
                      ) : (
                        // Show empty state bars
                        [...Array(9)].map((_, index) => (
                          <div
                            key={index}
                            className="flex-1 flex flex-col justify-end h-[294px]"
                          >
                            <div
                              className="w-full rounded-t-[6px] bg-[#f0f0f0]"
                              style={{ height: '4px' }}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* X Axis Labels */}
                  <div className="flex gap-[12px] items-start justify-start px-[10px] text-xs text-[#666666] tracking-[0.12px]">
                    {selectedMetric === 1 ? (
                      // Peak sales hours - hour labels
                      ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm'].map((hour, index) => (
                        <div key={index} className="flex-1 text-center">
                          {hour}
                        </div>
                      ))
                    ) : (
                      // Other metrics - use data time labels
                      getCurrentChartData().map((item: any, index: number) => (
                        <div key={index} className="flex-1 text-center">
                          {item.time}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Conversion Card - appears after delay when location is submitted */}
            {showConversionCard && (
              <div className="bg-black rounded-[10px] w-[591px] p-10 flex flex-col items-center gap-6 animate-fade-in">
                <p className="font-serif text-[32px] leading-[1.1] tracking-[-0.64px] text-white text-center">
                  Ready to unlock insights for your business?
                </p>
                <button className="bg-white text-black px-8 py-4 rounded-full font-medium text-base hover:bg-gray-100 transition-colors">
                  Get started
                </button>
              </div>
            )}
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}
